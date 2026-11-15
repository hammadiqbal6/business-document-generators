import type { APIRoute } from 'astro';
import { llmsTxtResponse } from '../../lib/llmsTxt';

/**
 * Same plain-text body as `/llms.txt`.
 * Astro’s static adapter turns API `301` responses into HTML meta-refresh files,
 * which then ship as `text/plain` because of the `.txt` extension — useless for
 * crawlers. Serve the real index here instead of a faux redirect.
 */
export const GET: APIRoute = () => llmsTxtResponse();
