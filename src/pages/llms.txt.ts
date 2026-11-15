import type { APIRoute } from 'astro';
import { llmsTxtResponse } from '../lib/llmsTxt';

/** Build-time llms.txt — every tool and guide with one-liners; origin from PUBLIC_SITE_URL. */
export const GET: APIRoute = () => llmsTxtResponse();
