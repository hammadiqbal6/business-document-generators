module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        '/index.html',
        '/hubs/estimates-invoices/index.html',
        '/tools/construction-estimate-template/index.html',
        '/tools/photography-contract-template/index.html',
        '/tools/podcast-script-template/index.html',
        '/tools/tattoo-consent-form-template/index.html',
      ],
      // Median of 3 runs (LHCI default recommendation) — reduces TBT flake on CI runners.
      numberOfRuns: 3,
      settings: {
        formFactor: 'mobile',
        screenEmulation: { mobile: true },
        throttlingMethod: 'simulate',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }],
        // Align with CWV "good" INP proxy (≤200ms); 150ms was flaky at the Lighthouse p10 boundary.
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
      },
    },
  },
};
