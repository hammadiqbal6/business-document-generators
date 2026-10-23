#!/usr/bin/env node
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const proofDir = path.join(root, 'docs/proof');
const dist = path.join(root, 'dist');

function run(cmd, args) {
  return spawnSync(cmd, args, { cwd: root, encoding: 'utf8' });
}

async function waitForServer(url) {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('Static server did not start');
}

/** Lab budgets — TBT ≤200ms matches the CWV "good" INP proxy used in docs/SEO-PLAYBOOK.md. */
const LH_BUDGET = {
  categoryMin: 95,
  lcpMaxMs: 2500,
  clsMax: 0.05,
  tbtMaxMs: 200,
};

/** CI runners are noisy at the TBT boundary; median of N runs (LHCI-style). Override with LH_RUNS=1 locally. */
const LH_RUNS = Math.max(1, Number.parseInt(process.env.LH_RUNS || '3', 10) || 3);

function score(report, cat) {
  return Math.round((report.categories[cat]?.score ?? 0) * 100);
}

function jsTransferKb(report) {
  const items = report.audits['network-requests']?.details?.items || [];
  let total = 0;
  for (const item of items) {
    if (item.resourceType === 'Script' && item.transferSize) total += item.transferSize;
  }
  return (total / 1024).toFixed(1);
}

function median(values) {
  const sorted = [...values].filter((v) => typeof v === 'number' && !Number.isNaN(v)).sort((a, b) => a - b);
  if (!sorted.length) return 0;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function medianRow(rows) {
  const pick = (key) => median(rows.map((r) => r[key]));
  const last = rows[rows.length - 1];
  return {
    ...last,
    performance: Math.round(pick('performance')),
    accessibility: Math.round(pick('accessibility')),
    bestPractices: Math.round(pick('bestPractices')),
    seo: Math.round(pick('seo')),
    lcp: pick('lcp'),
    cls: pick('cls'),
    tbt: pick('tbt'),
    // Keep transfer size from the last run (stable across runs for static dist).
    jsGzipKb: last.jsGzipKb,
    runs: rows.length,
  };
}

function passesLhBudget(r) {
  return (
    r.performance >= LH_BUDGET.categoryMin &&
    r.accessibility >= LH_BUDGET.categoryMin &&
    r.bestPractices >= LH_BUDGET.categoryMin &&
    r.seo >= LH_BUDGET.categoryMin &&
    !(r.lcp > LH_BUDGET.lcpMaxMs) &&
    !(r.cls > LH_BUDGET.clsMax) &&
    !(r.tbt > LH_BUDGET.tbtMaxMs)
  );
}

function lighthouseSummaryMd(rows, date, version) {
  const header = `| Page | Form | Perf | A11y | BP | SEO | LCP (ms) | CLS | TBT (ms) | JS transfer (KB) |\n|------|------|------|------|-----|-----|----------|-----|----------|------------------|\n`;
  const lines = rows.map(
    (r) =>
      `| ${r.page} | ${r.formFactor} | ${r.performance} | ${r.accessibility} | ${r.bestPractices} | ${r.seo} | ${Math.round(r.lcp || 0)} | ${(r.cls || 0).toFixed(3)} | ${Math.round(r.tbt || 0)} | ${r.jsGzipKb} |`,
  );
  return `# Lighthouse summary\n\nGenerated: ${date} UTC\nTool: Lighthouse CLI v${version}\nCommand: \`npm run proof\` (serves dist on port 3456; up to ${LH_RUNS} run(s) per URL, median when re-run)\n\nBudget: categories ≥${LH_BUDGET.categoryMin}, LCP ≤${LH_BUDGET.lcpMaxMs}ms, CLS ≤${LH_BUDGET.clsMax}, TBT ≤${LH_BUDGET.tbtMaxMs}ms\n\n${header}${lines.join('\n')}\n`;
}

function proofReadme(meta) {
  const lhPass = meta.lhSummary.every(passesLhBudget);
  return `# Proof artifacts

Regenerated: **${meta.runAt}** (UTC)

Reproduce everything:

\`\`\`bash
npm run proof
\`\`\`

## Index

| Check | Tool | Version | Date (UTC) | Result | Reproduce |
|-------|------|---------|------------|--------|-----------|
| Unit tests | Vitest | ${meta.vitestVersion} | ${meta.runAt} | ${meta.testExit === 0 ? 'PASS' : 'FAIL'} | \`npm test\` → [tests.txt](./tests.txt) |
| SEO / links / budget | Node audit scripts | repo | ${meta.runAt} | ${meta.auditExit === 0 ? 'PASS' : 'FAIL'} | \`npm run audit\` → [seo-audit.txt](./seo-audit.txt) |
| Lighthouse | Lighthouse CLI | ${meta.lhVersion} | ${meta.runAt} | ${lhPass ? 'PASS' : 'FAIL'} | [lighthouse/SUMMARY.md](./lighthouse/SUMMARY.md) |
| Structured data | Node extractor | repo | ${meta.runAt} | see validation log | [structured-data/](./structured-data/) |
| Sitemap / robots | Node script | repo | ${meta.runAt} | see file | [sitemap-robots.txt](./sitemap-robots.txt) |
| Mobile UX | Playwright | — | ${meta.runAt} | see viewport log | [mobile/](./mobile/) |
| AdSense readiness | Node script | repo | ${meta.runAt} | see checklist | [adsense-readiness.md](./adsense-readiness.md) |
| Bundle sizes | Node script | repo | ${meta.runAt} | see file | [bundle-size.txt](./bundle-size.txt) |
| Build | Astro | ${meta.astroVersion} | ${meta.runAt} | PASS | \`npm run build\` |

Numbers in Lighthouse JSON/HTML reports are machine-generated; do not edit by hand.

After production deploy, re-run [Google Rich Results Test](https://search.google.com/test/rich-results) on live URLs (see \`structured-data/README-snippet.txt\`).
`;
}

async function main() {
  const runAt = new Date().toISOString();
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  const lhVersion = run('npx', ['lighthouse', '--version']).stdout.trim();

  console.log('=== proof: build ===');
  const build = run('npm', ['run', 'build']);
  if (build.status !== 0) {
    console.error(build.stdout + build.stderr);
    process.exit(1);
  }

  // Clear generated proof dirs but keep committed verification screenshots (e.g. mobile-seo/).
  const preserveDirs = new Set(['mobile-seo']);
  if (fs.existsSync(proofDir)) {
    for (const entry of fs.readdirSync(proofDir, { withFileTypes: true })) {
      if (preserveDirs.has(entry.name)) continue;
      fs.rmSync(path.join(proofDir, entry.name), { recursive: true, force: true });
    }
  }
  fs.mkdirSync(path.join(proofDir, 'lighthouse'), { recursive: true });
  fs.mkdirSync(path.join(proofDir, 'structured-data'), { recursive: true });
  fs.mkdirSync(path.join(proofDir, 'mobile'), { recursive: true });

  console.log('=== proof: tests ===');
  const tests = run('npm', ['test']);
  fs.writeFileSync(
    path.join(proofDir, 'tests.txt'),
    `# npm test — ${runAt}\n\n${tests.stdout}\n${tests.stderr}\nExit code: ${tests.status}\n`,
  );
  if (tests.status !== 0) process.exit(tests.status);

  console.log('=== proof: audit ===');
  const audit = run('node', ['scripts/audit/run-all.mjs']);
  fs.writeFileSync(
    path.join(proofDir, 'seo-audit.txt'),
    `# npm run audit — ${runAt}\n\n${audit.stdout}\n${audit.stderr}\nExit code: ${audit.status}\n`,
  );
  if (audit.status !== 0) process.exit(audit.status);

  console.log('=== proof: bundle-size ===');
  const bundle = run('node', ['scripts/proof/bundle-size.mjs', dist]);
  fs.writeFileSync(path.join(proofDir, 'bundle-size.txt'), `# bundle-size — ${runAt}\n\n${bundle.stdout}\n`);
  if (bundle.status !== 0) process.exit(bundle.status);

  const sitemapRobots = run('node', ['scripts/proof/sitemap-robots.mjs', dist]);
  fs.writeFileSync(path.join(proofDir, 'sitemap-robots.txt'), sitemapRobots.stdout);

  const sd = run('node', ['scripts/proof/structured-data.mjs', dist, path.join(proofDir, 'structured-data')]);
  fs.writeFileSync(path.join(proofDir, 'structured-data', 'validation-log.txt'), sd.stdout + sd.stderr);
  if (sd.status !== 0) process.exit(sd.status);

  const adsense = run('node', ['scripts/proof/adsense-readiness.mjs', dist]);
  fs.writeFileSync(path.join(proofDir, 'adsense-readiness.md'), adsense.stdout);

  console.log('=== proof: lighthouse + mobile ===');
  const server = spawn('npx', ['serve', 'dist', '-l', '3456'], { cwd: root, stdio: 'ignore' });
  await waitForServer('http://127.0.0.1:3456/');

  const lhPages = [
    { name: 'home', url: '/index.html', formFactor: 'mobile' },
    { name: 'hub-estimates-invoices', url: '/hubs/estimates-invoices/index.html', formFactor: 'mobile' },
    { name: 'hub-contracts', url: '/hubs/contracts/index.html', formFactor: 'mobile' },
    { name: 'hub-forms', url: '/hubs/forms/index.html', formFactor: 'mobile' },
    { name: 'hub-creative-templates', url: '/hubs/creative-templates/index.html', formFactor: 'mobile' },
    { name: 'tool-construction-estimate', url: '/tools/construction-estimate-template/index.html', formFactor: 'mobile' },
    { name: 'tool-contractor-invoice', url: '/tools/contractor-invoice/index.html', formFactor: 'mobile' },
    { name: 'tool-photography-contract', url: '/tools/photography-contract-template/index.html', formFactor: 'mobile' },
    { name: 'tool-podcast-script', url: '/tools/podcast-script-template/index.html', formFactor: 'mobile' },
    { name: 'tool-tattoo-consent', url: '/tools/tattoo-consent-form-template/index.html', formFactor: 'mobile' },
    { name: 'tool-simple-nda', url: '/tools/simple-nda/index.html', formFactor: 'mobile' },
    { name: 'home-desktop', url: '/index.html', formFactor: 'desktop' },
  ];

  const lhSummary = [];
  for (const page of lhPages) {
    const base = `http://127.0.0.1:3456${page.url}`;
    const outBase = path.join(proofDir, 'lighthouse', page.name);
    const tmpDir = path.join(proofDir, 'lighthouse', `.tmp-${page.name}`);
    fs.mkdirSync(tmpDir, { recursive: true });
    const extraArgs =
      page.formFactor === 'desktop'
        ? ['--preset=desktop', '--screen-emulation.disabled']
        : ['--form-factor=mobile', '--throttling-method=simulate'];
    const runRows = [];
    for (let i = 0; i < LH_RUNS; i++) {
      const runOut = path.join(tmpDir, `run${i + 1}`);
      const r = run('npx', [
        'lighthouse',
        base,
        '--output=html',
        '--output=json',
        '--output-path',
        runOut,
        '--quiet',
        '--chrome-flags=--headless --no-sandbox',
        ...extraArgs,
      ]);
      if (r.status !== 0) {
        console.error(r.stderr || r.stdout);
        server.kill();
        process.exit(1);
      }
      const jsonPath = fs.existsSync(`${runOut}.report.json`)
        ? `${runOut}.report.json`
        : `${runOut}.json`;
      const htmlPath = fs.existsSync(`${runOut}.report.html`)
        ? `${runOut}.report.html`
        : `${runOut}.html`;
      const report = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      const audits = report.audits;
      runRows.push({
        page: page.name,
        formFactor: page.formFactor,
        performance: score(report, 'performance'),
        accessibility: score(report, 'accessibility'),
        bestPractices: score(report, 'best-practices'),
        seo: score(report, 'seo'),
        lcp: audits['largest-contentful-paint']?.numericValue,
        cls: audits['cumulative-layout-shift']?.numericValue,
        tbt: audits['total-blocking-time']?.numericValue ?? 0,
        jsGzipKb: jsTransferKb(report),
        _jsonPath: jsonPath,
        _htmlPath: htmlPath,
      });

      // Fast path: first run clearly inside budget → skip extra runs (common on warm local/CI).
      // Near the TBT boundary or any miss → finish all LH_RUNS and take the median.
      if (i === 0 && LH_RUNS > 1) {
        const first = runRows[0];
        const clearlyGreen =
          passesLhBudget(first) &&
          first.performance >= 98 &&
          (first.tbt || 0) <= LH_BUDGET.tbtMaxMs * 0.5;
        if (clearlyGreen) break;
      }
    }

    // Persist the median-representative run (closest TBT to median) as the canonical artifact.
    const med = medianRow(runRows);
    const representative =
      runRows
        .slice()
        .sort(
          (a, b) => Math.abs((a.tbt || 0) - med.tbt) - Math.abs((b.tbt || 0) - med.tbt),
        )[0] || runRows[runRows.length - 1];
    fs.copyFileSync(representative._jsonPath, `${outBase}.json`);
    fs.copyFileSync(representative._htmlPath, `${outBase}.html`);
    fs.copyFileSync(representative._jsonPath, `${outBase}.report.json`);
    fs.copyFileSync(representative._htmlPath, `${outBase}.report.html`);
    fs.rmSync(tmpDir, { recursive: true, force: true });

    lhSummary.push({
      page: med.page,
      formFactor: med.formFactor,
      performance: med.performance,
      accessibility: med.accessibility,
      bestPractices: med.bestPractices,
      seo: med.seo,
      lcp: med.lcp,
      cls: med.cls,
      tbt: med.tbt,
      jsGzipKb: med.jsGzipKb,
      runs: med.runs,
    });
  }

  fs.writeFileSync(path.join(proofDir, 'lighthouse', 'SUMMARY.md'), lighthouseSummaryMd(lhSummary, runAt, lhVersion));

  const mobile = run('node', ['scripts/proof/mobile-capture.mjs', 'http://127.0.0.1:3456', proofDir]);
  fs.writeFileSync(path.join(proofDir, 'mobile', 'viewport-check.txt'), `# mobile capture — ${runAt}\n\n${mobile.stdout}\n`);
  server.kill();
  if (mobile.status !== 0) process.exit(mobile.status);

  const failLh = lhSummary.filter((r) => !passesLhBudget(r));
  if (failLh.length) {
    console.error('Lighthouse budget failures:', failLh);
    process.exit(1);
  }

  fs.writeFileSync(
    path.join(proofDir, 'README.md'),
    proofReadme({
      runAt,
      lhVersion,
      astroVersion: pkg.dependencies?.astro || 'unknown',
      vitestVersion: pkg.devDependencies?.vitest || 'unknown',
      testExit: tests.status,
      auditExit: audit.status,
      lhSummary,
    }),
  );

  console.log('Proof complete: docs/proof/');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
