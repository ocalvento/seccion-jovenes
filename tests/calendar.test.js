const { test } = require('node:test');
const assert = require('node:assert/strict');
const calendar = require('../assets/calendar');
const { events } = require('../data/institutional.json');

test('near UTC midnight, the civil day remains the Buenos Aires day', () => {
  assert.equal(calendar.today(new Date('2026-10-22T01:30:00Z')), '2026-10-21');
  assert.equal(calendar.today(new Date('2026-10-22T03:00:00Z')), '2026-10-22');
});
test('past July dates do not become upcoming in October', () => {
  assert.equal(calendar.isUpcoming('2026-07-16', '2026-10-21'), false);
  assert.equal(calendar.isUpcoming('2026-10-21', '2026-10-21'), true);
  assert.equal(calendar.isUpcoming('2026-10-22', '2026-10-21'), true);
});
test('the calendar handles leap years, Monday starts and month boundaries', () => {
  assert.equal(calendar.monthCells(2024, 1).filter(Boolean).length, 29);
  assert.equal(calendar.monthCells(2026, 1).filter(Boolean).length, 28);
  assert.equal(calendar.monthCells(2024, 0)[0], '2024-01-01');
  assert.deepEqual(calendar.monthCells(2026, 9).slice(0, 4), [null, null, null, '2026-10-01']);
});
test('the 2026 flyers populate the correct months without older activities', () => {
  assert.equal(events.length, 9);
  assert.ok(events.every(event => event.date.startsWith('2026-')));
  assert.equal(calendar.monthEvents(events, 2026, 2)[0].date, '2026-03-31');
  assert.equal(calendar.monthEvents(events, 2026, 6)[0].title, 'Liderazgo joven en el mercado financiero');
  assert.equal(calendar.monthEvents(events, 2026, 9)[0].date, '2026-10-27');
  assert.deepEqual(calendar.monthEvents(events, 2024, 2), []);
  const upcoming = events.filter(event => calendar.isUpcoming(event.date, '2026-10-22'));
  assert.deepEqual(upcoming.map(event => event.date), ['2026-10-27', '2026-11-13']);
  assert.equal(events.filter(event => !calendar.isUpcoming(event.date, '2026-10-22')).length, 7);
  assert.equal(calendar.monthEvents(events, 2026, 6)[0].time, '18:30');
});
