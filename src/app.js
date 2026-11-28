(function () {
  const KEY = 'learning-viz-state-v1';
  const PALETTES = {
    'MS in CS-AI': ['#f2b134', '#f28e2b', '#cb6f00'],
    'TouchDesigner Curriculum': ['#d62728', '#f04b52'],
    'Backend Certification': [
      '#2166ac', '#2878b5', '#4b70b7', '#6e66b5', '#905bad',
      '#b3519d', '#d24d8a', '#e45a8a', '#e96e99', '#f08ca5',
    ],
  };
  const LINE_STYLES = [
    { dash: null, legend: 'solid' },
    { dash: '8 4', legend: 'dashed' },
    { dash: '2 3', legend: 'dotted' },
  ];
  const NS = 'http://www.w3.org/2000/svg';
  const { COURSES, Progress: P } = window;
  const $ = (s) => document.querySelector(s);
  const indexInPurpose = (c) => COURSES.filter((course) => course.purpose === c.purpose).indexOf(c);
  const colorOf = (c) => PALETTES[c.purpose][indexInPurpose(c)];
  const lineStyleOf = (c) => LINE_STYLES[indexInPurpose(c) % LINE_STYLES.length];

  let state = {};
  try { state = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { state = {}; }
  const save = () => localStorage.setItem(KEY, JSON.stringify(state));

  const el = (tag, attrs = {}, text) => {
    const e = document.createElementNS(tag === 'svg' || attrs._svg ? NS : 'http://www.w3.org/1999/xhtml', tag);
    Object.entries(attrs).forEach(([k, v]) => k !== '_svg' && e.setAttribute(k, v));
    if (text !== undefined) e.textContent = text;
    return e;
  };
  const svgEl = (tag, attrs, text) => el(tag, { ...attrs, _svg: 1 }, text);

  const tip = $('#tip');
  function showTip(ev, d) {
    tip.replaceChildren();
    [[`${d.course}`, 'b'], [d.lesson, 'div'], [`${d.date} — ${d.pct.toFixed(0)}% complete (${d.count}/${d.total})`, 'div'],
      [d.notes ? `Notes: ${d.notes}` : '', 'div']].forEach(([t, tag]) => {
      if (t) tip.append(el(tag, {}, t), el('br'));
    });
    tip.hidden = false;
    tip.style.left = `${Math.min(ev.clientX + 12, innerWidth - 300)}px`;
    tip.style.top = `${ev.clientY + 12}px`;
  }
  const hideTip = () => { tip.hidden = true; };

  function highlight(itemId, on) {
    document.querySelectorAll('.pt').forEach((p) => p.classList.toggle('hl', on && p.dataset.item === itemId));
    document.querySelectorAll('#log tbody tr').forEach((r) => r.classList.toggle('hl', on && r.dataset.item === itemId));
  }

  function renderPlot(rows) {
    const W = 900, H = 380, m = { l: 48, r: 20, t: 12, b: 34 };
    const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Cumulative progress' });
    const all = COURSES.map((c) => ({ c, pts: P.series(c, state).map((p) => {
      const r = rows.find((x) => x.itemId === p.itemId);
      return { ...p, course: r.course, lesson: r.lesson, notes: r.notes };
    }) }));
    const days = all.flatMap((s) => s.pts.map((p) => Date.parse(p.date)));
    const DAY = 864e5;
    let t0 = days.length ? Math.min(...days) - DAY : Date.now() - 7 * DAY;
    let t1 = Math.max(days.length ? Math.max(...days) : 0, Date.parse(P.today())) + DAY;
    if (t1 - t0 < 7 * DAY) t1 = t0 + 7 * DAY;
    const x = (t) => m.l + ((t - t0) / (t1 - t0)) * (W - m.l - m.r);
    const y = (v) => H - m.b - (v / 100) * (H - m.t - m.b);

    [0, 25, 50, 75, 100].forEach((v) => {
      svg.append(svgEl('line', { class: 'grid', x1: m.l, x2: W - m.r, y1: y(v), y2: y(v) }),
        svgEl('text', { x: m.l - 6, y: y(v) + 4, 'text-anchor': 'end' }, `${v}%`));
    });
    for (let i = 0; i <= 6; i++) {
      const t = t0 + ((t1 - t0) * i) / 6;
      svg.append(svgEl('text', { x: x(t), y: H - 10, 'text-anchor': 'middle' }, new Date(t).toISOString().slice(0, 10)));
    }

    all.forEach(({ c, pts }) => {
      if (!pts.length) return;
      const color = colorOf(c);
      const lineStyle = lineStyleOf(c);
      let d = `M${x(Date.parse(pts[0].date) - DAY)},${y(0)}`;
      let prev = 0;
      pts.forEach((p) => { const px = x(Date.parse(p.date)); d += `H${px}V${y(p.pct)}`; prev = p.pct; });
      d += `H${x(Math.max(t1 - DAY, Date.parse(pts[pts.length - 1].date)))}`;
      svg.append(svgEl('path', {
        d, fill: 'none', stroke: color, 'stroke-width': 2,
        ...(lineStyle.dash ? { 'stroke-dasharray': lineStyle.dash } : {}),
      }));
      pts.forEach((p) => {
        const dot = svgEl('circle', { class: 'pt', r: 5, cx: x(Date.parse(p.date)), cy: y(p.pct), fill: color, 'data-item': p.itemId });
        dot.addEventListener('mousemove', (ev) => { showTip(ev, p); highlight(p.itemId, true); });
        dot.addEventListener('mouseleave', () => { hideTip(); highlight(p.itemId, false); });
        svg.append(dot);
      });
    });
    $('#plot').replaceChildren(svg);

    const legend = $('#legend');
    legend.replaceChildren();
    [...new Set(COURSES.map((c) => c.purpose))].forEach((purpose) => {
      const g = el('div', {}, `${purpose}: `);
      COURSES.filter((c) => c.purpose === purpose).forEach((c) => {
        const s = el('span', { style: 'margin-right:.8rem' });
        const sw = el('i', { style: `border-top:2px ${lineStyleOf(c).legend} ${colorOf(c)}` });
        const done = c.items.filter((i) => state[i.id] && state[i.id].done).length;
        s.append(sw, `${c.code} (${done}/${c.items.length})`);
        g.append(s);
      });
      legend.append(g);
    });
  }

  function renderLog(rows) {
    const tbody = $('#log tbody');
    tbody.replaceChildren();
    rows.forEach((r) => {
      const tr = el('tr', { 'data-item': r.itemId });
      tr.append(el('td', { class: 'date' }, r.date), el('td', {}, r.course), el('td', {}, r.lesson), el('td', {}, r.notes));
      tr.addEventListener('mouseenter', () => highlight(r.itemId, true));
      tr.addEventListener('mouseleave', () => highlight(r.itemId, false));
      tbody.append(tr);
    });
    $('#empty').hidden = rows.length > 0;
  }

  function renderCourses() {
    const root = $('#courses');
    const open = new Set([...root.querySelectorAll('details[open]')].map((d) => d.dataset.course));
    root.replaceChildren();
    [...new Set(COURSES.map((c) => c.purpose))].forEach((purpose) => {
      root.append(el('h3', {}, purpose));
      COURSES.filter((c) => c.purpose === purpose).forEach((c) => {
        const det = el('details', { 'data-course': c.id });
        if (open.has(c.id)) det.open = true;
        det.append(el('summary', {}, `${c.code}: ${c.title}`));
        let group = null;
        c.items.forEach((item) => {
          if (item.group && item.group !== group && c.items.some((i) => i.group !== item.group)) {
            det.append(el('div', { class: 'group' }, item.group));
          }
          group = item.group;
          const s = state[item.id] || {};
          const row = el('div', { class: 'item' });
          const label = el('label');
          const cb = el('input', { type: 'checkbox' });
          cb.checked = !!s.done;
          cb.addEventListener('change', () => { state = P.setDone(state, item.id, cb.checked); commit(); });
          label.append(cb, ` ${item.title}`);
          const date = el('input', { type: 'date', 'aria-label': 'Completed on' });
          date.value = s.date || '';
          date.disabled = !s.done;
          date.addEventListener('change', () => { state = P.setDate(state, item.id, date.value); commit(); });
          const notes = el('textarea', { placeholder: 'Notes', rows: 1, 'aria-label': 'Notes' });
          notes.value = s.notes || '';
          notes.addEventListener('change', () => { state = P.setNotes(state, item.id, notes.value); commit(false); });
          row.append(label, date, notes);
          det.append(row);
        });
        root.append(det);
      });
    });
  }

  function commit(rerenderCourses = true) {
    save();
    const rows = P.logRows(COURSES, state);
    renderPlot(rows);
    renderLog(rows);
    if (rerenderCourses) renderCourses();
  }

  $('#export').addEventListener('click', () => {
    const a = el('a', { href: URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })), download: 'learning-progress.json' });
    a.click();
  });
  $('#import').addEventListener('change', async (ev) => {
    const f = ev.target.files[0];
    if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      if (data && typeof data === 'object' && !Array.isArray(data)) { state = data; commit(); }
    } catch (e) { alert('Could not read that file.'); }
    ev.target.value = '';
  });

  commit();
})();
