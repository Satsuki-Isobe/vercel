import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'jam-news',
  apiKey: process.env.API_KEY,
});