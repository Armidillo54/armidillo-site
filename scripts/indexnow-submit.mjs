// IndexNow submission script
// Reads sitemap.xml, extracts URLs, submits the batch to IndexNow (Bing + Yandex)
// Usage: node scripts/indexnow-submit.mjs

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const HOST = 'armidillo.com';
const KEY = 'd8781ae57ca3027c39c5fce1686fe1ab';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

const sitemapPath = join(__dirname, '..', 'sitemap.xml');
const sitemap = readFileSync(sitemapPath, 'utf-8');

const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

if (urls.length === 0) {
  console.error('No URLs found in sitemap.xml');
  process.exit(1);
}

console.log(`Submitting ${urls.length} URLs to IndexNow...`);

const body = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls,
};

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

const text = await res.text();
console.log(`Status: ${res.status} ${res.statusText}`);
if (text) console.log(`Response: ${text}`);

// IndexNow returns 200 (accepted) or 202 (accepted, queued). Both are success.
if (res.status === 200 || res.status === 202) {
  console.log('✓ Submission accepted');
  process.exit(0);
}

console.error('✗ Submission failed');
process.exit(1);
