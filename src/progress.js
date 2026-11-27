// Pure progress logic. State shape: { [itemId]: { done: bool, date: 'YYYY-MM-DD'|null, notes: string } }
(function (root) {
  const today = () => {
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  };

  // Mark an item done/undone; the completion date is set automatically when newly completed.
  function setDone(state, id, done, date = today()) {
    const prev = state[id] || { notes: '' };
    return { ...state, [id]: { ...prev, done, date: done ? (prev.done ? prev.date : date) : null } };
  }

  function setNotes(state, id, notes) {
    const prev = state[id] || { done: false, date: null };
    return { ...state, [id]: { ...prev, notes } };
  }

  function setDate(state, id, date) {
    const prev = state[id];
    return prev && prev.done && date ? { ...state, [id]: { ...prev, date } } : state;
  }

  // Cumulative completion series per course, ordered by date; pct = completed / total * 100.
  function series(course, state) {
    const total = course.items.length;
    const done = course.items
      .map((item, order) => ({ item, order, s: state[item.id] }))
      .filter((x) => x.s && x.s.done && x.s.date)
      .sort((a, b) => a.s.date.localeCompare(b.s.date) || a.order - b.order);
    return done.map((x, i) => ({
      itemId: x.item.id, courseId: course.id, date: x.s.date,
      count: i + 1, total, pct: ((i + 1) / total) * 100,
    }));
  }

  // Table rows, newest first.
  function logRows(courses, state) {
    const rows = [];
    courses.forEach((c) => c.items.forEach((item, order) => {
      const s = state[item.id];
      if (s && s.done && s.date) {
        rows.push({ itemId: item.id, courseId: c.id, course: `${c.code}: ${c.title}`, purpose: c.purpose,
          lesson: item.group ? `${item.group} · ${item.title}` : item.title,
          date: s.date, notes: s.notes || '', order });
      }
    }));
    return rows.sort((a, b) => b.date.localeCompare(a.date) || b.order - a.order);
  }

  const api = { today, setDone, setNotes, setDate, series, logRows };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Progress = api;
})(typeof self !== 'undefined' ? self : this);
