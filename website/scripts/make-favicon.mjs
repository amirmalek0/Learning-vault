// One-off script to generate favicon.ico + PNGs from the SVG logo.
// Run: node scripts/make-favicon.mjs
import {readFileSync, writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, resolve} from 'node:path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const svg = readFileSync(resolve(root, 'static/img/logo.svg'));

const sizes = [16, 32, 48, 64, 128, 256];

const pngBuffers = await Promise.all(
  sizes.map((size) =>
    sharp(svg, {density: 384})
      .resize(size, size)
      .png()
      .toBuffer(),
  ),
);

// Save individual PNGs for PWA / social
writeFileSync(resolve(root, 'static/img/logo-192.png'), await sharp(svg, {density: 384}).resize(192, 192).png().toBuffer());
writeFileSync(resolve(root, 'static/img/logo-512.png'), await sharp(svg, {density: 384}).resize(512, 512).png().toBuffer());

// Multi-size ICO (16/32/48 is enough for browsers)
const ico = await pngToIco(pngBuffers.slice(0, 4));
writeFileSync(resolve(root, 'static/img/favicon.ico'), ico);

console.log('Favicon + PNGs written.');
