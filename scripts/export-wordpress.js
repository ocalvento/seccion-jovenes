// Export the approved markup into scoped Gutenberg HTML blocks for staging.
// Does not connect to WordPress or modify a live site.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const data = JSON.parse(read('data/institutional.json'));
const media = JSON.parse(read('wordpress/staging-media.json'));
const urls = new Map(data.assets.filter(a => a.source.startsWith('https:')).map(a => [a.file, a.source.replace('https://abogadosdebancos.org.ar/', media.base)]));
for (const url of [...media.flyers, ...(media.young || [])]) {
  const filename = url.split('/').pop();
  const local = [...data.assets, ...data.events.map(e=>({file:e.image}))].find(a => a.file && a.file.endsWith('/' + filename));
  urls.set(local ? local.file : 'assets/images/' + filename, url);
}
function rewrite(text) {
  for (const [local, url] of [...urls].sort((a,b) => b[0].length-a[0].length)) {
    text = text.split('../' + local).join(url).split(local).join(url);
  }
  return text.replaceAll('https://abogadosdebancos.org.ar/wp-content/', media.base + 'wp-content/')
    .replaceAll('../index.html', media.base).replaceAll('index.html', media.base)
    .replace(/(?:\.\.\/)?seccion-joven\//g, media.youngPage || '#jovenes');
}
// Prefix rules recursively, preserving media queries and animation keyframes.
function scopeCSS(css) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');
  let output = '', start = 0;
  while (start < css.length) {
    const open = css.indexOf('{', start);
    if (open === -1) break;
    const selector = css.slice(start, open).trim();
    let end = open + 1, depth = 1, quote = null;
    for (; end < css.length && depth; end++) {
      const c = css[end];
      if (quote) { if (c === quote && css[end-1] !== '\\') quote = null; }
      else if (c === '"' || c === "'") quote = c;
      else if (c === '{') depth++;
      else if (c === '}') depth--;
    }
    const body = css.slice(open+1, end-1);
    if (/^@(media|supports|container)/.test(selector)) output += `${selector}{${scopeCSS(body)}}\n`;
    else if (selector.startsWith('@')) output += `${selector}{${body}}\n`;
    else output += selector.split(',').map(s => {
      s = s.trim();
      if (/^(:root|html|body)$/.test(s)) return '.committee-home';
      if (s.includes('.institutional-home')) return s.replaceAll('.institutional-home', '.committee-home');
      return '.committee-home ' + s;
    }).join(',') + '{' + body + '}\n';
    start = end;
  }
  return output;
}
let css = read('assets/styles.css').replaceAll("'institutional/", "'assets/institutional/");
css = rewrite(scopeCSS(css));
css += `
body.page-id-2489 #content > .ast-container,
body:has(.committee-home) #content > .ast-container { max-width:none; padding:0; display:block; }
body:has(.committee-home) #primary { margin:0; padding:0; width:100%; }
body:has(.committee-home) .entry-header { display:none; }
body:has(.committee-home) .site-main > article { padding:0; margin:0; }
body:has(.committee-home) .entry-content > .committee-home { max-width:none; margin:0; padding:0; }
.committee-home { width:100%; font-family:Montserrat,Arial,sans-serif; }
.committee-home h1,.committee-home h2,.committee-home h3 { font-family:inherit; font-weight:600; margin-top:0; color:inherit; }
.committee-home p { margin-top:0; }
.committee-home .institutional-hero h1 { color:white; line-height:1.16; }
.committee-home .container { float:none; }
.committee-home a { text-decoration:none; }
.committee-home .grid { margin:0; }
.committee-home .sponsor-grid { margin:0; }
.committee-home section { scroll-margin-top:95px; }
.committee-home .wpforms-container { margin:20px 0 0; }
.committee-home .wpforms-container .wpforms-field { padding:12px 0; }
.committee-home .wpforms-container input.wpforms-field-large,
.committee-home .wpforms-container textarea.wpforms-field-large,
.committee-home .wpforms-container select.wpforms-field-large { max-width:100%; width:100%; border-radius:2px; border:1px solid #d9e5eb; box-shadow:none; }
.committee-home .wpforms-container .wpforms-field-label { font-size:14px; font-weight:600; color:#4c4c4c; }
.committee-home .wpforms-container .wpforms-field-description { line-height:1.7; font-size:13px; margin-top:16px; white-space:pre-line; }
.committee-home .wpforms-container button[type=submit] { background:#4696db; color:white; border-radius:2px; box-shadow:none; }
`;
const htmlBlock = html => `<!-- wp:html -->\n${html}\n<!-- /wp:html -->`;
function exportPage(source, young = false) {
  let content = source.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];
  if (!young) content = content.replace('aria-labelledby="jovenes-titulo"', 'id="jovenes" aria-labelledby="jovenes-titulo"');
  content = rewrite(content);
  content = content.replace('Vista previa del formulario. El envío se habilitará al implementarlo en WordPress; esta versión no envía ni guarda tus datos.', 'Formulario en preparación. El envío se habilitará cuando se configure y verifique la recepción de solicitudes; esta vista previa no envía ni guarda tus datos.');
  if(!young && media.associationFormId) {
    if(!/^\d+$/.test(String(media.associationFormId))) throw new Error('Invalid WPForms ID');
    content=content.replace(/<form class="association-form"[\s\S]*?<\/form>/,`<div class="association-form"><p class="eyebrow">Solicitud de ingreso</p><h3>Completá tu solicitud</h3><p class="association-description">La información que nos brindes permitirá evaluar tu incorporación al Comité.</p>[wpforms id="${media.associationFormId}" title="false" description="false"]<p class="form-note">El envío de la solicitud no implica la incorporación automática al Comité.</p></div>`);
  }
  if(!young && !media.youngPage) {
    content=content.replace(/<a class="outline-button" href="#jovenes">Conocé la Sección Jóvenes[\s\S]*?<\/a>/,'<a class="outline-button" href="mailto:administracion@abogadosdebancos.org.ar?subject=Quiero%20participar%20de%20la%20Secci%C3%B3n%20J%C3%B3venes">Contactá a la Sección Jóvenes <span aria-hidden="true">↗</span></a>');
  }
  // Keep each top-level section independently editable in the block editor.
  const sections = content.trim().split(/\n\s*\n/).filter(Boolean).map(htmlBlock).join('\n\n');
  const scripts = young ? '' : htmlBlock(rewrite(source.match(/<script type="application\/json" id="committee-events">[\s\S]*?<\/script>/)[0]) + '\n<script>\n' + read('assets/calendar.js') + '\n' + read('assets/main.js') + '\n</script>');
  const className = young ? 'committee-home committee-young' : 'committee-home institutional-home';
  return htmlBlock('<style>\n' + css + '\n</style>') + '\n' +
    `<!-- wp:group {"className":"${className}","layout":{"type":"default"}} -->\n<div class="wp-block-group ${className}">\n` +
    sections + '\n' + scripts + '\n</div>\n<!-- /wp:group -->\n';
}
fs.writeFileSync(path.join(root, 'wordpress/home-blocks.html'), exportPage(read('index.html')));
fs.writeFileSync(path.join(root, 'wordpress/young-blocks.html'), exportPage(read('seccion-joven/index.html'), true));
const homeSource=read('index.html');
const mainContent=homeSource.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];
const sections=[];
let depth=0,begin=0;
for(const match of mainContent.matchAll(/<section\b[^>]*>|<\/section>/g)) {
  if(match[0].startsWith('</')) { if(--depth===0) sections.push(mainContent.slice(begin,match.index+match[0].length)); }
  else { if(depth++===0) begin=match.index; }
}
for(const [file,title,ids] of [
  ['events-blocks.html','Eventos y actividades',['jornada-destacada','eventos','novedades']],
  ['news-blocks.html','Novedades del Comité',['novedades']]
]) {
  const body=sections.filter(section=>ids.some(id=>new RegExp(`^<section[^>]*id="${id}"`).test(section))).join('\n\n').replace(/<h1\b/g,'<h2').replaceAll('</h1>','</h2>');
  const heading=`<section class="section"><div class="container"><p class="eyebrow">Comité de Abogados de Bancos · 2026</p><h1>${title}</h1></div></section>`;
  let result=exportPage(homeSource.replace(/<main[^>]*>[\s\S]*?<\/main>/,`<main>${heading}\n\n${body}</main>`));
  const idsHere=new Set([...result.matchAll(/id="([^"]+)"/g)].map(m=>m[1]));
  result=result.replace(/href="#([^"]+)"/g,(all,id)=>idsHere.has(id)?all:`href="${media.base}#${id}"`);
  fs.writeFileSync(path.join(root,'wordpress',file),result);
}
console.log('Exported staging Gutenberg blocks; no remote changes.');
