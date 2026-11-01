(() => {
  'use strict';
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  function setMenu(open) {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Cerrar menú principal' : 'Abrir menú principal');
    mobileMenu.hidden = !open;
    mobileMenu.toggleAttribute('data-open', open);
  }
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') { setMenu(false); menuToggle.focus(); }
    });
    window.matchMedia('(min-width:981px)').addEventListener('change', event => { if (event.matches) setMenu(false); });
  }
  // Local layout only; submission must be wired to the WordPress form handler.
  const associationPreview = document.querySelector('[data-native-association-preview]');
  if (associationPreview) associationPreview.addEventListener('submit', event => event.preventDefault());
  const grid = document.querySelector('[data-calendar-grid]');
  const data = document.getElementById('committee-events');
  if (grid && data && window.CommitteeCalendar) {
    const calendar = window.CommitteeCalendar;
    const events = JSON.parse(data.textContent);
    const currentDate = calendar.today();
    const [initialYear, initialMonth] = currentDate.split('-').map(Number);
    const nextEvent = events.filter(item => calendar.isUpcoming(item.date, currentDate)).sort((a,b) => a.date.localeCompare(b.date))[0];
    const [agendaYear, agendaMonth] = (nextEvent ? nextEvent.date : currentDate).split('-').map(Number);
    let year = agendaYear, month = agendaMonth - 1, selected = null;
    const heading = document.getElementById('calendar-month');
    const monthPicker = document.querySelector('[data-calendar-month]');
    const detail = document.querySelector('[data-calendar-detail]');
    const formatMonth = new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric', timeZone: 'UTC' });
    const formatDate = new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
    const safeUrl = url => { if (/^#[a-z][a-z0-9-]*$/.test(url)) return Boolean(document.getElementById(url.slice(1))); if (/^assets\/(events-2026|institutional)\/[a-z0-9-]+\.(jpeg|jpg|png)$/.test(url)) return true; try { const parsed = new URL(url); return parsed.protocol === 'https:' && parsed.hostname === 'abogadosdebancos.org.ar'; } catch { return false; } };
    function appendText(tag, text, className) {
      const node = document.createElement(tag); node.textContent = text;
      if (className) node.className = className;
      detail.append(node); return node;
    }
    function renderDetail() {
      detail.replaceChildren();
      const items = selected ? events.filter(item => item.date === selected) : calendar.monthEvents(events, year, month);
      appendText('p', selected ? 'Actividad seleccionada' : 'Actividades del mes', 'eyebrow');
      if (!items.length) {
        appendText('h3', 'Sin actividades publicadas para este mes.');
        appendText('p', 'Consultá las próximas fechas y modalidades con la administración del Comité.');
        const contact = appendText('a', 'Consultar próximas actividades ↗', 'text-link');
        contact.href = 'mailto:administracion@abogadosdebancos.org.ar?subject=Pr%C3%B3ximas%20actividades%20del%20Comit%C3%A9';
      } else {
        appendText('h3', selected ? formatDate.format(new Date(`${selected}T12:00:00Z`)) : 'Encuentros del mes');
        const list = document.createElement('ul');
        items.forEach(item => {
          const row = document.createElement('li');
          const time = document.createElement('time'); time.dateTime = item.date;
          time.textContent = `${formatDate.format(new Date(`${item.date}T12:00:00Z`))} · ${calendar.isUpcoming(item.date, currentDate) ? 'Próxima actividad' : 'Archivo de encuentros'}`;
          const link = document.createElement('a'); link.textContent = item.title;
          if (safeUrl(item.url)) link.href = item.url;
          row.append(time, link);
          if (item.venue) { const venue = document.createElement('p'); venue.className = 'event-location'; venue.textContent = `${item.venue}${item.time ? ` · ${item.time} hs` : ''}`; row.append(venue); }
          list.append(row);
        }); detail.append(list);
      }
      const archive = appendText('a', 'Ver encuentros de 2026 ↗', 'text-link');
      archive.href = '#actividades-2026';
    }
    function render() {
      heading.textContent = formatMonth.format(new Date(Date.UTC(year, month, 1)));
      monthPicker.value = `${year}-${String(month + 1).padStart(2, '0')}`;
      grid.replaceChildren();
      ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].forEach(day => { const label = document.createElement('span'); label.className = 'weekday'; label.textContent = day; grid.append(label); });
      calendar.monthCells(year, month).forEach(date => {
        const count = date ? events.filter(item => item.date === date).length : 0;
        const node = document.createElement(count ? 'button' : 'span');
        if (date) {
          node.textContent = String(Number(date.slice(-2)));
          if (date === currentDate) { node.className = 'today'; node.setAttribute('aria-current', 'date'); }
          if (count) {
            node.type = 'button'; node.setAttribute('aria-label', `${formatDate.format(new Date(`${date}T12:00:00Z`))}, ${count} actividad${count > 1 ? 'es' : ''}`);
            node.setAttribute('aria-pressed', String(selected === date));
            node.addEventListener('click', () => {
              selected = date; renderDetail();
              grid.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button === node)));
            });
          }
        } else node.setAttribute('aria-hidden', 'true');
        grid.append(node);
      }); renderDetail();
    }
    function moveMonth(delta) {
      const date = new Date(Date.UTC(year, month + delta, 1)); year = date.getUTCFullYear(); month = date.getUTCMonth(); selected = null; render();
    }
    document.querySelector('[data-calendar-prev]').addEventListener('click', () => moveMonth(-1));
    monthPicker.addEventListener('change', () => {
      if (!monthPicker.value || !monthPicker.validity.valid) return;
      const [chosenYear, chosenMonth] = monthPicker.value.split('-').map(Number);
      year = chosenYear; month = chosenMonth - 1; selected = null; render();
    });
    document.querySelector('[data-calendar-next]').addEventListener('click', () => moveMonth(1));
    document.querySelector('[data-calendar-today]').addEventListener('click', () => { year = initialYear; month = initialMonth - 1; selected = null; render(); });
    render();
  }
})();
