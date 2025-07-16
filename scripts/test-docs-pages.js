// scripts/test-docs-pages.js
const fetch = require('node-fetch');

const BASE_URL = 'https://devlander-software.github.io/discord-notify';
const PAGES = [
  '/',
  '/API.md',
  '/API_README.md',
  '/CHANGELOG_GUIDE.md',
  '/GITHUB_RELEASES.md',
  '/api/',
  '/api/globals.md',
  '/api/interfaces/DiscordNotifyConfig.md',
  '/api/interfaces/DiscordNotifier.md',
  '/api/interfaces/SendArgs.md',
  '/api/interfaces/DiscordEmbed.md',
  '/api/interfaces/DiscordField.md',
  '/api/interfaces/FileAttachment.md',
  '/api/interfaces/DiscordWebhookPayload.md',
  '/api/interfaces/DiscordWebhookResponse.md',
  '/api/functions/default.md',
];

async function testPage(path) {
  const url = BASE_URL + path;
  try {
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error(`Status ${res.status}`);
    }
    const text = await res.text();
    if (!text || text.length < 100) {
      throw new Error('Page content too short or empty');
    }
    console.log(`✅ ${url} exists and is accessible.`);
  } catch (err) {
    console.error(`❌ ${url} failed: ${err.message}`);
    process.exitCode = 1;
  }
}

(async () => {
  for (const page of PAGES) {
    await testPage(page);
  }
  if (process.exitCode !== 1) {
    console.log('🎉 All documentation pages are accessible!');
  }
})(); 