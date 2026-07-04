#!/usr/bin/env node
// Usage: node scripts/generate-pdf.js [slug] [output]
//   slug   — resume page slug (default: resume-pm)
//   output — output file path (default: static/lindsay-balfour-resume.pdf)
//
// Requires the Hugo dev server to be running: hugo server

const { chromium } = require('playwright');
const path = require('path');

const slug = process.argv[2] || 'resume-pm';
const output = process.argv[3] || path.join(__dirname, '../static/lindsay-balfour-resume.pdf');
const url = `http://localhost:1313/${slug}`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle' });

  await page.pdf({
    path: output,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  console.log(`Saved: ${output}`);
})();
