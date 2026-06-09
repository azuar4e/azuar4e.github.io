import { readFileSync } from 'node:fs';
import algoliasearch from 'algoliasearch';

const appId = process.env.ALGOLIA_APP_ID;
const adminKey = process.env.ALGOLIA_ADMIN_KEY;

if (!appId || !adminKey) {
  console.error('Missing ALGOLIA_APP_ID or ALGOLIA_ADMIN_KEY environment variables.');
  process.exit(1);
}

const client = algoliasearch(appId, adminKey);

const indices = [
  { name: 'miblog_algolia_es', file: 'public/es/search.json' },
  { name: 'miblog_algolia_en', file: 'public/en/search.json' },
];

for (const { name, file } of indices) {
  const records = JSON.parse(readFileSync(file, 'utf8'));
  const index = client.initIndex(name);

  console.log(`Syncing ${records.length} records to ${name}...`);
  await index.replaceAllObjects(records);
  console.log(`Done: ${name}`);
}
