import type { ClauseItem, LineItem } from './types';

export const emptyLineItem = (): LineItem => ({
  description: '',
  quantity: 1,
  unit: 'ea',
  rate: 0,
});

export const sampleLineItems = (items: LineItem[]): LineItem[] => items;

export const clause = (
  id: string,
  title: string,
  body: string,
  enabled = true,
): ClauseItem => ({ id, title, body, enabled });
