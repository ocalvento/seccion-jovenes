const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const crypto = require('node:crypto');
// Refresh changed local assets in an already-open preview without stale CSS/JS.
const versionAssets = html => html.replace(/((?:src|href)=")((?:\.\.\/)?assets\/(?:styles\.css|main\.js|calendar\.js))(?:\?v=[^"]*)?"/g, (_, prefix, file) => {
  const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file.replace(/^\.\.\//,'')))).digest('hex').slice(0,10);
  return `${prefix}${file}?v=${hash}"`;
});
const data = JSON.parse(fs.readFileSync(path.join(root, 'data/institutional.json'), 'utf8'));
const associationForm = JSON.parse(fs.readFileSync(path.join(root, 'data/association-form.json'), 'utf8'));
const escape = (text) => String(text).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const link = (member) => `<a href="${escape(member.url)}" target="_blank" rel="noopener noreferrer">${escape(member.name)} <span aria-hidden="true">↗</span></a>`;
const header = fs.readFileSync(path.join(root, 'templates/header.html'), 'utf8');
const currentDate = require('../assets/calendar').today();
const events2026 = data.events.filter(item => item.date.startsWith('2026-'));
const cards = (entries, type) => entries.map(item => {
  const imageUrl = escape(item.image);
  const isPast = item.date < currentDate;
  return `<article class="publication-card ${type}"><a class="publication-image" href="${imageUrl}" target="_blank" rel="noopener noreferrer" aria-label="Abrir flyer de ${escape(item.title)}"><img src="${imageUrl}" alt="Flyer original: ${escape(item.title)} — ${escape(item.dateLabel)}" width="${item.imageWidth}" height="${item.imageHeight}" loading="lazy" decoding="async"></a><div class="publication-body"><p class="publication-meta"><span>${isPast ? 'Realizado' : 'Próximo'}</span><time datetime="${escape(item.date)}">${escape(item.dateLabel)}</time></p><h3>${escape(item.title)}</h3><p class="event-location">${escape(item.venue)}${item.time ? `<br>${escape(item.time)} hs · ${escape(item.format)}` : ''}</p>${item.category === 'Sección Jóvenes' ? '<p class="event-organizer">Organizado por la Sección Jóvenes</p>' : ''}<a class="text-link" href="${imageUrl}" target="_blank" rel="noopener noreferrer">Ver flyer completo <span aria-hidden="true">↗</span></a></div></article>`;
}).join('\n');
const renderAssociationField = label => {
  const index = associationForm.questions.findIndex(question => question.label === label);
  if (index < 0) throw new Error(`Unknown association field: ${label}`);
  const question = associationForm.questions[index];
  const id = `solicitud-${index + 1}`;
  const text = `${escape(label)} <span aria-hidden="true">*</span>`;
  const shared = `id="${id}" name="${id}" required`;
  if (question.type === 2) return `<label class="form-full" for="${id}">${text}<select ${shared}><option value="">Seleccioná una opción</option>${associationForm.paymentOptions.map(option => `<option>${escape(option)}</option>`).join('')}</select></label>`;
  if (question.type === 1) return `<label class="form-full" for="${id}">${text}<textarea ${shared} rows="3" maxlength="1500"></textarea></label>`;
  const kinds = {'Correo electrónico':['email','email'], 'Teléfono':['tel','tel'], 'Fecha de nacimiento':['date','bday'], 'Nombre':['text','given-name'], 'Apellido':['text','family-name'], 'Banco/Estudio/Entidad':['text','organization'], 'Cargo':['text','organization-title'], 'Domicilio':['text','street-address']};
  const [type, autocomplete] = kinds[label] || ['text','off'];
  return `<label for="${id}">${text}<input ${shared} type="${type}" autocomplete="${autocomplete}"${type === 'date' ? '' : ' maxlength="200"'}${label === 'DNI' ? ' inputmode="numeric"' : ''}></label>`;
};
const replacements = {
  ASSOCIATION_FIELDS: associationForm.groups.map(group => `<fieldset class="native-association-group"><legend>${escape(group.title)}</legend>${group.title === 'Cuota social' ? `<p class="form-note">${escape(associationForm.feeNotice)}</p>` : ''}<div class="form-grid">${group.fields.map(renderAssociationField).join('\n')}</div></fieldset>`).join('\n'),
  HEADER: header.replaceAll('{{ROOT}}', ''), LOGO: escape(data.logo), INTRO: escape(data.intro),
  FEATURED_FLYER: escape(data.featuredEvent.image),
  FEATURED_WIDTH: data.featuredEvent.imageWidth,
  FEATURED_HEIGHT: data.featuredEvent.imageHeight,
  EVENTS: cards(events2026.filter(item => item.image && item.date < currentDate).sort((a,b) => b.date.localeCompare(a.date)), 'event-card'),
  NEWS: cards(events2026.filter(item => item.image && item.date >= currentDate).sort((a,b) => a.date.localeCompare(b.date)), 'news-card'),
  OFFICERS: data.board.slice(0,6).map(group => `<article class="authority-card"><h3>${escape(group.role)}</h3>${group.members.map(link).join('')}</article>`).join('\n'),
  BOARD: data.board.slice(6).map(group => `<section><h3>${escape(group.role)}</h3><ul>${group.members.map(member=>`<li>${link(member)}</li>`).join('')}</ul></section>`).join('\n'),
  HISTORY: data.history.map(item=>`<li><a href="${escape(item.url)}" target="_blank" rel="noopener noreferrer"><span class="document-type">PDF</span><span>${escape(item.title)}</span><span aria-hidden="true">↗</span></a></li>`).join('\n'),
  SPONSORS: data.sponsors.map(item=>`<li><img src="${escape(item.image)}" alt="${escape(item.name)}" width="200" height="110" loading="lazy" decoding="async"></li>`).join('\n'),
  EVENT_DATA: JSON.stringify(events2026.map(({title,date,url,time,venue,address,format})=>({title,date,url,time,venue,address,format}))).replaceAll('<','\\u003c')
};
let html = fs.readFileSync(path.join(root,'templates/home.html'),'utf8');
html = html.replace(/\{\{([A-Z_]+)\}\}/g, (_, key) => { if (!(key in replacements)) throw new Error(`Unknown placeholder ${key}`); return replacements[key]; });
fs.writeFileSync(path.join(root,'index.html'),versionAssets(html));
// Update only shared chrome on the existing page; keep its content and route.
const youngPath=path.join(root,'seccion-joven/index.html');
let young=fs.readFileSync(youngPath,'utf8');
const youngHeader=header.replaceAll('{{ROOT}}','../').replaceAll('href="../seccion-joven/"','href="../seccion-joven/" aria-current="page"');
young=young.replace(/<header class="site-header">[\s\S]*?<\/header>/,youngHeader);
young=young.replace('https://abogadosdebancos.org.ar/wp-content/uploads/2023/08/cropped-comite_profile_01-32x32.jpg','../assets/institutional/favicon.jpg');
fs.writeFileSync(youngPath,versionAssets(young));
console.log('Institutional home and shared navigation rendered.');
