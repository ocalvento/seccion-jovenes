/* Civil dates: keep comparisons independent of the server's timezone. */
(function (target) {
  'use strict';
  function today(now = new Date()) {
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Argentina/Buenos_Aires', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
    const part = type => parts.find(item => item.type === type).value;
    return `${part('year')}-${part('month')}-${part('day')}`;
  }
  function monthCells(year, month) {
    const offset = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
    const count = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    return [...Array(offset).fill(null), ...Array.from({ length: count }, (_, index) => `${year}-${String(month + 1).padStart(2, '0')}-${String(index + 1).padStart(2, '0')}`)];
  }
  function monthEvents(events, year, month) {
    const prefix = `${year}-${String(month + 1).padStart(2, '0')}-`;
    return events.filter(item => item.date.startsWith(prefix)).sort((a, b) => a.date.localeCompare(b.date));
  }
  function isUpcoming(date, current = today()) { return date >= current; }
  Object.assign(target, { today, monthCells, monthEvents, isUpcoming });
})(typeof module === 'object' && module.exports ? module.exports : (window.CommitteeCalendar = {}));
