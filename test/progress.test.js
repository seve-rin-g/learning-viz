const test = require('node:test');
const assert = require('node:assert');
const P = require('../src/progress.js');
const COURSES = require('../src/courses.js');

const course = { id: 'c', code: 'C1', title: 'T', purpose: 'P', items: [{ id: 'a', title: 'A' }, { id: 'b', title: 'B' }, { id: 'c', title: 'C', group: 'G' }, { id: 'd', title: 'D' }] };

test('seed data has 15 courses with unique item ids', () => {
  assert.strictEqual(COURSES.length, 15);
  const ids = COURSES.flatMap((c) => c.items.map((i) => i.id));
  assert.strictEqual(new Set(ids).size, ids.length);
});

test('backend certification has the 10 IBM Coursera courses', () => {
  const backend = COURSES.filter((c) => c.purpose === 'Backend Certification');
  assert.strictEqual(backend.length, 10);
  assert.deepStrictEqual(backend.map((c) => c.code), [
    'Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5',
    'Course 6', 'Course 7', 'Course 8', 'Course 9', 'Course 10',
  ]);
});

test('setDone records date automatically and keeps it on re-check; clears on uncheck', () => {
  let s = P.setDone({}, 'a', true, '2026-01-02');
  assert.strictEqual(s.a.date, '2026-01-02');
  s = P.setDone(s, 'a', true, '2026-02-01');
  assert.strictEqual(s.a.date, '2026-01-02');
  s = P.setDone(s, 'a', false);
  assert.strictEqual(s.a.date, null);
});

test('notes survive toggling', () => {
  let s = P.setNotes({}, 'a', 'hi');
  s = P.setDone(s, 'a', true, '2026-01-02');
  assert.strictEqual(s.a.notes, 'hi');
});

test('series is cumulative percentage by date', () => {
  let s = P.setDone({}, 'b', true, '2026-01-05');
  s = P.setDone(s, 'a', true, '2026-01-03');
  const out = P.series(course, s);
  assert.deepStrictEqual(out.map((p) => [p.itemId, p.pct]), [['a', 25], ['b', 50]]);
});

test('logRows are newest first', () => {
  let s = P.setDone({}, 'a', true, '2026-01-03');
  s = P.setDone(s, 'c', true, '2026-01-09');
  s = P.setNotes(s, 'c', 'n');
  const rows = P.logRows([course], s);
  assert.deepStrictEqual(rows.map((r) => r.itemId), ['c', 'a']);
  assert.strictEqual(rows[0].lesson, 'G · C');
  assert.strictEqual(rows[0].notes, 'n');
});
