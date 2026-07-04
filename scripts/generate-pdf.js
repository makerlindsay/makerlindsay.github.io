#!/usr/bin/env node
// Usage: node scripts/generate-pdf.js [slug]
//   slug — resume page slug (default: resume-pm)
//
// Requires the Hugo dev server to be running: hugo server
// Outputs: static/lindsay-balfour-resume.pdf and static/lindsay-balfour-resume.jpg

const { chromium } = require('playwright');
const path = require('path');

const slug = process.argv[2] || 'resume-pm';
const staticDir = path.join(__dirname, '../static');
const pdfOut = path.join(staticDir, 'lindsay-balfour-resume.pdf');
const jpgOut = path.join(staticDir, 'lindsay-balfour-resume.jpg');

// Try both common dev server ports
const ports = [1313, 1314];

async function findUrl() {
  const { request } = require('playwright');
  for (const port of ports) {
    try {
      const ctx = await request.newContext();
      const res = await ctx.get(`http://localhost:${port}/${slug}`, { timeout: 2000 });
      await ctx.dispose();
      if (res.ok()) return `http://localhost:${port}/${slug}`;
    } catch {}
  }
  throw new Error(`Hugo dev server not found on ports ${ports.join(', ')}. Run: hugo server`);
}

(async () => {
  const url = await findUrl();
  console.log(`Generating from ${url}`);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Use print media for clean output (no background pattern, white page only)
  await page.emulateMedia({ media: 'print' });
  await page.goto(url, { waitUntil: 'networkidle' });

  // PDF
  await page.pdf({
    path: pdfOut,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  console.log(`PDF saved: ${pdfOut}`);

  // JPG — switch back to screen for screenshot, set white bg, clip to page size
  await page.emulateMedia({ media: 'screen' });
  await page.reload({ waitUntil: 'networkidle' });
  await page.setViewportSize({ width: 794, height: 2245 }); // 210mm × 297mm × 2 pages @96dpi
  await page.screenshot({
    path: jpgOut,
    fullPage: true,
    type: 'jpeg',
    quality: 95,
  });
  console.log(`JPG saved: ${jpgOut}`);

  await browser.close();
})();
