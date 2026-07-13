const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const requiredFiles = [
  "index.html",
  "seccion-joven/index.html",
  "assets/styles.css",
  "assets/main.js"
];

const failures = [];

for (const file of requiredFiles) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    failures.push(`Missing required file: ${file}`);
  }
}

const htmlFiles = requiredFiles.filter((file) => file.endsWith(".html"));

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
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Static validation passed.");
