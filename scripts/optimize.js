import { glob } from "glob";
import { readFile, writeFile } from "node:fs/promises";
import { minify as minifyHtml } from "html-minifier-terser";
import { transform as transformCss } from "lightningcss";
import { minify as minifyJs } from "terser";
import { PurgeCSS } from "purgecss";

const SITE_DIR = "./_site";

console.log("Optimizing Jekyll site...\n");

// -----------------------------------------------------------------------------
// Find files
// -----------------------------------------------------------------------------

const htmlFiles = await glob(`${SITE_DIR}/**/*.html`);
const cssFiles = await glob(`${SITE_DIR}/**/*.css`);
const jsFiles = await glob(`${SITE_DIR}/**/*.js`);

console.log(`Found ${htmlFiles.length} HTML files`);
console.log(`Found ${cssFiles.length} CSS files`);
console.log(`Found ${jsFiles.length} JavaScript files\n`);

// -----------------------------------------------------------------------------
// Purge unused CSS
// -----------------------------------------------------------------------------

console.log("→ Removing unused CSS");

if (cssFiles.length > 0) {
  const purgeResults = await new PurgeCSS().purge({
    content: [
      `${SITE_DIR}/**/*.html`,
      `${SITE_DIR}/**/*.js`
    ],
    css: cssFiles
  });

  await Promise.all(
    purgeResults.map(async (result) => {
      await writeFile(result.file, result.css);
    })
  );
}

// -----------------------------------------------------------------------------
// Minify HTML
// -----------------------------------------------------------------------------

console.log("→ Minifying HTML");

await Promise.all(
  htmlFiles.map(async (file) => {
    const source = await readFile(file, "utf8");

    const output = await minifyHtml(source, {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeTagWhitespace: true,
      useShortDoctype: true,
      minifyCSS: true,
      minifyJS: true
    });

    await writeFile(file, output);
  })
);

// -----------------------------------------------------------------------------
// Minify CSS
// -----------------------------------------------------------------------------

console.log("→ Minifying CSS");

await Promise.all(
  cssFiles.map(async (file) => {
    const source = await readFile(file);

    const { code } = transformCss({
      filename: file,
      code: source,
      minify: true
    });

    await writeFile(file, code);
  })
);

// -----------------------------------------------------------------------------
// Minify JavaScript
// -----------------------------------------------------------------------------

console.log("→ Minifying JavaScript");

await Promise.all(
  jsFiles.map(async (file) => {
    const source = await readFile(file, "utf8");

    const { code } = await minifyJs(source, {
      compress: true,
      mangle: true,
      format: {
        comments: false
      }
    });

    if (code) {
      await writeFile(file, code);
    }
  })
);

console.log("\n✓ Optimization complete");
