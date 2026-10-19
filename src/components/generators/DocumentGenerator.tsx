import { useEffect, useMemo, useState } from 'react';
import type { ClauseItem, FieldDef, LineItem, ToolDefinition } from '../../data/tools/types';
import { emptyLineItem } from '../../data/tools/line-item-defaults';
import { validateForm } from '../../lib/validation';
import { buildDocumentBlocks } from './documentModel';
import './generator.css';

interface Props {
  tool: ToolDefinition;
  embed?: boolean;
}

function storageKey(slug: string) {
  return `docuforge:draft:${slug}`;
}

function serializeState(values: Record<string, unknown>): string {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(values))));
  } catch {
    return '';
  }
}

function deserializeState(raw: string | null): Record<string, unknown> | null {
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(escape(atob(raw))));
  } catch {
    try {
      return JSON.parse(decodeURIComponent(raw));
    } catch {
      return null;
    }
  }
}

export default function DocumentGenerator({ tool, embed = false }: Props) {
  const [values, setValues] = useState<Record<string, unknown>>(() => ({ ...tool.defaults }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');
  const [exporting, setExporting] = useState<'pdf' | 'docx' | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const fromQuery = deserializeState(params.get('d'));
    if (fromQuery) {
      setValues({ ...tool.defaults, ...fromQuery });
      return;
    }
    try {
      const raw = localStorage.getItem(storageKey(tool.slug));
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        setValues({ ...tool.defaults, ...parsed });
        setStatus('Draft restored from this browser.');
      }
    } catch {
      /* ignore */
    }
  }, [tool.slug, tool.defaults]);

  const blocks = useMemo(() => buildDocumentBlocks(tool, values), [tool, values]);

  const sections = useMemo(() => {
    const map = new Map<string, FieldDef[]>();
    for (const field of tool.fields) {
      const key = field.section || 'Details';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(field);
    }
    return [...map.entries()];
  }, [tool.fields]);

  function update(id: string, value: unknown) {
    setValues((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function saveLocal() {
    try {
      localStorage.setItem(storageKey(tool.slug), JSON.stringify(values));
      setSavedFlash(true);
      setStatus('Saved in this browser only (localStorage).');
      window.setTimeout(() => setSavedFlash(false), 1600);
    } catch {
      setStatus('Could not save locally (storage full or blocked).');
    }
  }

  function clearLocal() {
    localStorage.removeItem(storageKey(tool.slug));
    setValues({ ...tool.defaults });
    setStatus('Draft cleared; sample defaults restored.');
  }

  function shareUrl() {
    const url = new URL(window.location.href);
    url.searchParams.set('d', serializeState(values));
    navigator.clipboard?.writeText(url.toString()).then(
      () => setStatus('Shareable link copied. Canonical page stays unparameterized for SEO.'),
      () => setStatus(url.toString()),
    );
  }

  function runValidation(): boolean {
    const list = validateForm(tool.fields, values);
    const map: Record<string, string> = {};
    for (const e of list) map[e.fieldId] = e.message;
    setErrors(map);
    if (list.length) {
      setStatus(list[0].message);
      return false;
    }
    return true;
  }

  async function onExportPdf() {
    if (!runValidation()) return;
    setExporting('pdf');
    setStatus('Loading PDF engine…');
    try {
      const { exportPdf } = await import('./exportPdf');
      await exportPdf(`${tool.slug}.pdf`, blocks);
      setStatus('PDF downloaded.');
    } catch (err) {
      console.error(err);
      setStatus('PDF export failed. Try again or use print.');
    } finally {
      setExporting(null);
    }
  }

  async function onExportDocx() {
    if (!runValidation()) return;
    setExporting('docx');
    setStatus('Loading DOCX engine…');
    try {
      const { exportDocx } = await import('./exportDocx');
      await exportDocx(`${tool.slug}.docx`, blocks);
      setStatus('DOCX downloaded.');
    } catch (err) {
      console.error(err);
      setStatus('DOCX export failed.');
    } finally {
      setExporting(null);
    }
  }

  function printPreview() {
    window.print();
  }

  return (
    <div className={`generator ${embed ? 'generator--embed' : ''}`}>
      {tool.isLegalAdjacent && (
        <p className="generator__legal" role="note">
          Not legal advice. Editable sample language only—not a substitute for an attorney. For consent/health forms, also not medical advice; follow local licensing rules.
        </p>
      )}

      <div className="generator__layout">
        <form
          className="generator__form"
          onSubmit={(e) => {
            e.preventDefault();
            void onExportPdf();
          }}
          noValidate
        >
          {sections.map(([section, fields]) => (
            <fieldset key={section} className="generator__section">
              <legend>{section}</legend>
              {fields.map((field) => (
                <FieldControl
                  key={field.id}
                  field={field}
                  value={values[field.id]}
                  error={errors[field.id]}
                  onChange={(v) => update(field.id, v)}
                />
              ))}
            </fieldset>
          ))}

          <div className="generator__actions">
            <button type="button" className="btn btn--primary" onClick={() => void onExportPdf()} disabled={!!exporting}>
              {exporting === 'pdf' ? 'Exporting…' : 'Export PDF'}
            </button>
            <button type="button" className="btn" onClick={() => void onExportDocx()} disabled={!!exporting}>
              {exporting === 'docx' ? 'Exporting…' : 'Export DOCX'}
            </button>
            <button type="button" className="btn" onClick={printPreview}>
              Print
            </button>
            <button type="button" className={`btn ${savedFlash ? 'btn--flash' : ''}`} onClick={saveLocal}>
              Save locally
            </button>
            <button type="button" className="btn btn--ghost" onClick={clearLocal}>
              Reset
            </button>
            {!embed && (
              <button type="button" className="btn btn--ghost" onClick={shareUrl}>
                Copy share link
              </button>
            )}
          </div>
          {status && (
            <p className="generator__status" aria-live="polite">
              {status}
            </p>
          )}
          <p className="generator__privacy">
            Privacy: processing stays in your browser. Optional drafts use localStorage on this device only—nothing is uploaded to our servers.
          </p>
        </form>

        <aside className="generator__preview" aria-label="Live document preview">
          <div className="generator__preview-bar">
            <strong>Live preview</strong>
            <span>Updates as you type</span>
          </div>
          <div className="doc-preview" id="doc-preview">
            {blocks.map((block, i) => (
              <PreviewBlock key={i} block={block} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function FieldControl({
  field,
  value,
  error,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  error?: string;
  onChange: (v: unknown) => void;
}) {
  const id = `field-${field.id}`;
  const describedBy = error ? `${id}-error` : field.help ? `${id}-help` : undefined;

  if (field.type === 'lineItems') {
    const items = (value as LineItem[]) || [];
    return (
      <div className="field field--stack">
        <span className="field__label">{field.label}</span>
        <div className="line-items">
          {items.map((item, idx) => (
            <div className="line-items__row" key={idx}>
              <label className="sr-only" htmlFor={`${id}-desc-${idx}`}>
                Description {idx + 1}
              </label>
              <input
                id={`${id}-desc-${idx}`}
                value={item.description}
                placeholder="Description"
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...next[idx], description: e.target.value };
                  onChange(next);
                }}
              />
              <label className="sr-only" htmlFor={`${id}-qty-${idx}`}>
                Qty
              </label>
              <input
                id={`${id}-qty-${idx}`}
                type="number"
                inputMode="decimal"
                value={item.quantity}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...next[idx], quantity: Number(e.target.value) };
                  onChange(next);
                }}
              />
              <label className="sr-only" htmlFor={`${id}-unit-${idx}`}>
                Unit
              </label>
              <input
                id={`${id}-unit-${idx}`}
                value={item.unit}
                placeholder="Unit"
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...next[idx], unit: e.target.value };
                  onChange(next);
                }}
              />
              <label className="sr-only" htmlFor={`${id}-rate-${idx}`}>
                Rate
              </label>
              <input
                id={`${id}-rate-${idx}`}
                type="number"
                inputMode="decimal"
                step="0.01"
                value={item.rate}
                onChange={(e) => {
                  const next = [...items];
                  next[idx] = { ...next[idx], rate: Number(e.target.value) };
                  onChange(next);
                }}
              />
              <button
                type="button"
                className="btn btn--ghost btn--icon"
                aria-label={`Remove line ${idx + 1}`}
                onClick={() => onChange(items.filter((_, i) => i !== idx))}
              >
                ×
              </button>
            </div>
          ))}
          <button type="button" className="btn" onClick={() => onChange([...items, emptyLineItem()])}>
            Add line
          </button>
        </div>
        {error && (
          <p className="field__error" id={`${id}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  }

  if (field.type === 'clauses') {
    const clauses = (value as ClauseItem[]) || [];
    return (
      <div className="field field--stack">
        <span className="field__label">{field.label}</span>
        <div className="clauses">
          {clauses.map((clause, idx) => (
            <div className="clauses__item" key={clause.id}>
              <label className="clauses__toggle">
                <input
                  type="checkbox"
                  checked={clause.enabled}
                  onChange={(e) => {
                    const next = [...clauses];
                    next[idx] = { ...clause, enabled: e.target.checked };
                    onChange(next);
                  }}
                />
                <span>Include</span>
              </label>
              <input
                className="clauses__title"
                value={clause.title}
                aria-label={`Clause ${idx + 1} title`}
                onChange={(e) => {
                  const next = [...clauses];
                  next[idx] = { ...clause, title: e.target.value };
                  onChange(next);
                }}
              />
              <textarea
                rows={4}
                value={clause.body}
                aria-label={`Clause ${idx + 1} body`}
                onChange={(e) => {
                  const next = [...clauses];
                  next[idx] = { ...clause, body: e.target.value };
                  onChange(next);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === 'checkbox') {
    return (
      <div className="field field--check">
        <label htmlFor={id}>
          <input
            id={id}
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span>{field.label}</span>
        </label>
      </div>
    );
  }

  const common = {
    id,
    name: field.id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    required: field.required,
    placeholder: field.placeholder,
    className: error ? 'has-error' : undefined,
  } as const;

  return (
    <div className="field">
      <label htmlFor={id}>{field.label}</label>
      {field.type === 'textarea' ? (
        <textarea
          {...common}
          rows={field.rows || 3}
          value={str(value)}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : field.type === 'select' ? (
        <select {...common} value={str(value)} onChange={(e) => onChange(e.target.value)}>
          {(field.options || []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...common}
          type={field.type === 'currency' ? 'number' : field.type}
          inputMode={
            (field.inputMode as React.HTMLAttributes<HTMLInputElement>['inputMode']) ||
            (field.type === 'number' || field.type === 'currency' ? 'decimal' : undefined)
          }
          min={field.min}
          max={field.max}
          step={field.step ?? (field.type === 'currency' ? '0.01' : undefined)}
          value={value == null ? '' : String(value)}
          onChange={(e) =>
            onChange(
              field.type === 'number' || field.type === 'currency'
                ? e.target.value === ''
                  ? ''
                  : Number(e.target.value)
                : e.target.value,
            )
          }
        />
      )}
      {field.help && (
        <p className="field__help" id={`${id}-help`}>
          {field.help}
        </p>
      )}
      {error && (
        <p className="field__error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

function str(v: unknown) {
  return v == null ? '' : String(v);
}

function PreviewBlock({ block }: { block: ReturnType<typeof buildDocumentBlocks>[number] }) {
  if (block.type === 'heading') return <h2 className="doc-preview__h">{block.text}</h2>;
  if (block.type === 'subheading') return <h3 className="doc-preview__h3">{block.text}</h3>;
  if (block.type === 'paragraph') return <p className="doc-preview__p">{block.text}</p>;
  if (block.type === 'hr') return <hr />;
  if (block.type === 'kv') {
    return (
      <dl className="doc-preview__kv">
        {block.pairs?.map((p) => (
          <div key={p.label}>
            <dt>{p.label}</dt>
            <dd>{p.value}</dd>
          </div>
        ))}
      </dl>
    );
  }
  if (block.type === 'table' && block.rows) {
    return (
      <table className="doc-preview__table">
        <tbody>
          {block.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) =>
                i === 0 ? <th key={j}>{cell}</th> : <td key={j}>{cell}</td>,
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  if (block.type === 'totals') {
    return (
      <ul className="doc-preview__totals">
        {block.totals?.map((t) => (
          <li key={t.label} className={t.emphasize ? 'is-strong' : undefined}>
            <span>{t.label}</span>
            <span>{t.value}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === 'clauses') {
    return (
      <div className="doc-preview__clauses">
        {block.clauses?.map((c) => (
          <section key={c.id}>
            <h4>{c.title}</h4>
            <p>{c.body}</p>
          </section>
        ))}
      </div>
    );
  }
  return null;
}
