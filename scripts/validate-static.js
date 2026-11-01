const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const requiredFiles = [
  "index.html",
  "seccion-joven/index.html",
  "assets/styles.css",
  "assets/main.js",
  "assets/calendar.js",
  "data/institutional.json",
  "data/association-form.json",
  "templates/home.html",
  "templates/header.html"
];

const failures = [];

for (const file of requiredFiles) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    failures.push(`Missing required file: ${file}`);
  }
}

const htmlFiles = requiredFiles.filter((file) => file.endsWith(".html") && !file.startsWith("templates/"));

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  const titleCount = (html.match(/<title>/g) || []).length;
  const h1Count = (html.match(/<h1[\s>]/g) || []).length;
  const isRedirectPage = file === "index.html" && html.includes("url=seccion-joven/");

  if (titleCount !== 1) {
    failures.push(`${file}: expected exactly one <title>, found ${titleCount}`);
  }

  if (!isRedirectPage && h1Count !== 1) {
    failures.push(`${file}: expected exactly one <h1>, found ${h1Count}`);
  }

  if (!isRedirectPage) {
    for (const assetPath of ["assets/styles.css", "assets/main.js"]) {
      const relativePrefix = file.includes("/") ? "../" : "";
      if (!html.includes(`${relativePrefix}${assetPath}`)) {
        failures.push(`${file}: missing reference to ${relativePrefix}${assetPath}`);
      }
    }
  }

  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  if (new Set(ids).size !== ids.length) failures.push(`${file}: duplicate HTML IDs`);
  for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
    const reference = match[1].replaceAll('&amp;', '&');
    if (/^(?:https?:|mailto:|data:|tel:)/.test(reference)) continue;
    const [pathname, anchor] = reference.split('#');
    if (!pathname) {
      if (!anchor || !ids.includes(anchor)) failures.push(`${file}: missing anchor ${reference}`);
      continue;
    }
    let target = path.resolve(root, path.dirname(file), decodeURIComponent(pathname.split('?')[0]));
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
    if (!fs.existsSync(target)) failures.push(`${file}: missing local target ${reference}`);
    else if (anchor && target.endsWith('.html') && !fs.readFileSync(target,'utf8').includes(`id="${anchor}"`)) failures.push(`${file}: missing cross-page anchor ${reference}`);
  }
  for (const image of html.matchAll(/<img\s[^>]*>/g)) {
    if (!/\balt="[^"]+"/.test(image[0])) failures.push(`${file}: image without meaningful alt`);
  }
}

const source = JSON.parse(fs.readFileSync(path.join(root, 'data/institutional.json'),'utf8'));
const home = fs.readFileSync(path.join(root,'index.html'),'utf8');
const crypto = require('node:crypto');
for (const asset of source.assets) {
  const target = path.join(root, asset.file);
  if (!fs.existsSync(target) || crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex') !== asset.sha256) failures.push(`Original resource missing or altered: ${asset.file}`);
}
for (const item of source.history) if (!home.includes(item.url.replaceAll('&','&amp;'))) failures.push(`Historical document lost: ${item.title}`);
for (const group of source.board) for (const member of group.members) if (!home.includes(member.name.replaceAll('&','&amp;'))) failures.push(`Authority lost: ${member.name}`);
for (const sponsor of source.sponsors) if (!home.includes(sponsor.image)) failures.push(`Sponsor lost: ${sponsor.name}`);
if (source.sponsors.length !== 21 || source.history.length !== 5 || source.board.reduce((total, group)=>total+group.members.length,0) !== 24) failures.push('Institutional inventory changed; review against the source before accepting.');
if (source.events.some(event => !event.date.startsWith('2026-')) || source.news.some(item => !item.date.startsWith('2026-'))) failures.push('Only 2026 activities may appear in the main site.');
for (const event of source.events) {
  if (!fs.existsSync(path.join(root,event.image))) failures.push(`Event flyer missing: ${event.image}`);
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Static validation passed.");
