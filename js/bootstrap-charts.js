// Live charts for "The Bootstrap" post, drawn with Observable Plot (loaded by the page, see _layouts/default.html).
// Every chart runs the real bootstrap in the browser. The first draw uses a fixed seed so the numbers match the
// text; "Run it again" uses fresh randomness. Colors are read from the CSS tokens and redrawn when night mode flips.
(function () {
  if (!window.Plot) return;

  var sessions = [2.1, 3.4, 1.8, 4.2, 2.9, 3.1, 5.6, 2.4, 3.8, 2.2, 4.9, 3.0, 2.7, 6.1, 18.5];
  var groupA = [3.1, 2.4, 4.0, 3.6, 2.8, 4.4, 3.9, 2.2, 5.1, 3.3, 4.7, 2.9, 3.5, 4.1, 12.0];
  var groupB = [4.2, 3.8, 5.0, 4.6, 3.9, 5.5, 4.4, 3.1, 6.0, 4.8, 5.2, 3.6, 4.9, 4.3, 15.2];
  var N = 10000;
  var SEED = 7; // reproduces the guide's intervals: [2.70, 4.90] and [0.20, 1.80]
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Small seeded random number generator (mulberry32), so the first draw is the same for every reader.
  function seeded(s) {
    return function () {
      s = (s + 0x6D2B79F5) | 0;
      var t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function median(a) {
    var s = a.slice().sort(function (x, y) { return x - y; }), m = s.length >> 1;
    return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
  }
  // Linear-interpolated percentile, the same method as NumPy's default.
  function percentile(sorted, p) {
    var h = (sorted.length - 1) * p / 100, lo = Math.floor(h);
    return sorted[lo] + (sorted[Math.ceil(h)] - sorted[lo]) * (h - lo);
  }
  function resample(rand, a) {
    return a.map(function () { return a[Math.floor(rand() * a.length)]; });
  }
  var round1 = function (x) { return Math.round(x * 10) / 10; };
  var fmt = function (x) { return x.toFixed(2); };
  var minutes = function (x) { return fmt(x) + ' min'; };

  function tokens() {
    var css = getComputedStyle(document.documentElement);
    var get = function (name) { return css.getPropertyValue(name).trim(); };
    return {
      text: get('--text'), strong: get('--strong'), muted: get('--muted'), surface: get('--surface'), bg: get('--bg'),
      grid: get('--grid'), rule: get('--rule'), accent: get('--accent'), brk: get('--break'), sans: get('--sans')
    };
  }
  function plotStyle(t) {
    return { fontFamily: t.sans, fontSize: '13px', color: t.muted, background: 'transparent', overflow: 'visible' };
  }
  function tipStyle(t) { return { fill: t.bg, stroke: t.grid, textPadding: 8 }; }

  // ---- Figure 1: one resample ------------------------------------------------------------------------------------

  // Drawn as plain HTML slots, the house figure parts: 15 square boxes per row, sorted, with the median slot lit.
  function drawResample(fig, state) {
    var picked = state.picked;
    var counts = {}; picked.forEach(function (v) { counts[v] = (counts[v] || 0) + 1; });
    var sortedSample = sessions.slice().sort(function (a, b) { return a - b; });
    var sortedPick = picked.slice().sort(function (a, b) { return a - b; });
    var m = median(picked);
    var skipped = sessions.filter(function (v) { return !counts[v]; }).length;
    var repeated = Object.keys(counts).filter(function (k) { return counts[k] > 1; }).length;

    function row(label, values, kind) {
      var wrap = document.createElement('div');
      wrap.className = 'slots-row';
      var name = document.createElement('p');
      name.className = 'slots-label';
      name.textContent = label;
      var list = document.createElement('ol');
      list.className = 'slots';
      values.forEach(function (v, i) {
        var li = document.createElement('li');
        li.className = 'slot';
        li.textContent = v.toFixed(1);
        if (kind === 'sample' && !counts[v]) { li.classList.add('is-skipped'); li.title = v.toFixed(1) + ' min · skipped this time'; }
        else if (kind === 'sample') li.title = v.toFixed(1) + ' min · drawn ' + counts[v] + (counts[v] > 1 ? ' times' : ' time');
        if (kind === 'pick') {
          if (counts[v] > 1) li.classList.add('is-repeat');
          if (i === 7) { li.classList.add('is-median'); li.title = 'The middle slot: this resample\'s median, ' + v.toFixed(1) + ' min'; }
          else li.title = v.toFixed(1) + ' min';
        }
        list.appendChild(li);
      });
      wrap.append(name, list);
      return wrap;
    }
    fig.plot.replaceChildren(row('Your 15 sessions, smallest to largest', sortedSample, 'sample'), row('One resample, drawn with replacement', sortedPick, 'pick'));
    fig.status.textContent = 'Median of this resample: ' + fmt(m) + ' min · ' + skipped + ' of 15 skipped · ' + repeated + ' drawn more than once';
  }

  function maxOf(rows, key) { return rows.reduce(function (a, d) { return Math.max(a, d[key]); }, 0); }

  // ---- Figures 2 and 3: the bootstrap distribution ---------------------------------------------------------------

  function counted(values) {
    var c = new Map();
    values.forEach(function (v) { var k = round1(v); c.set(k, (c.get(k) || 0) + 1); });
    return Array.from(c, function (e) { return { x: e[0], n: e[1] }; }).sort(function (a, b) { return a.x - b.x; });
  }

  function drawDistribution(fig, opts, values, done) {
    var t = tokens(), w = fig.plot.clientWidth;
    var sorted = Float64Array.from(values).sort();
    var lo = percentile(sorted, 2.5), hi = percentile(sorted, 97.5);
    var bars = counted(values);
    var top = Math.max(opts.yMax, maxOf(bars, 'n'));
    var half = 0.035;
    var inside = function (d) { return d.x >= lo - 1e-6 && d.x <= hi + 1e-6; };
    var bracketY = top * 1.12;
    var marks = [
      Plot.ruleY([0], { stroke: t.grid }),
      Plot.rectY(bars, {
        x1: function (d) { return d.x - half; }, x2: function (d) { return d.x + half; }, y: 'n',
        fill: function (d) { return inside(d) ? t.accent : t.grid; }, rx1y2: 3, rx2y2: 3
      }),
      Plot.ruleX([opts.observed], { y1: 0, y2: top * 1.02, stroke: t.strong, strokeWidth: 1.5 }),
      Plot.text([opts.observed], { x: function (d) { return d; }, y: top * 1.02, text: function () { return 'observed ' + fmt(opts.observed); }, dx: 6, textAnchor: 'start', fill: t.strong })
    ];
    if (opts.zero) {
      marks.push(
        Plot.ruleX([0], { y1: 0, y2: top * 0.72, stroke: t.brk, strokeWidth: 1.5 }),
        Plot.text([0], { x: function (d) { return d; }, y: top * 0.72, text: function () { return 'zero: no difference'; }, dy: -10, fill: t.brk })
      );
    }
    if (done) {
      // The 95% interval, drawn as a brass bracket above the bars.
      marks.push(
        Plot.link([{ a: lo, b: hi }], { x1: 'a', x2: 'b', y1: bracketY, y2: bracketY, stroke: t.accent, strokeWidth: 2 }),
        Plot.ruleX([lo, hi], { x: function (d) { return d; }, y1: top * 1.08, y2: top * 1.16, stroke: t.accent, strokeWidth: 2 }),
        Plot.text([{ a: lo, b: hi }], { x: function (d) { return (d.a + d.b) / 2; }, y: bracketY, dy: -12, text: function (d) { return '95% interval  ' + fmt(d.a) + ' to ' + fmt(d.b); }, fill: t.strong, fontWeight: 600 })
      );
    }
    marks.push(Plot.tip(bars, Plot.pointerX({
      x: 'x', y: 'n',
      title: function (d) { return opts.tipLabel + ' ' + minutes(d.x) + '\n' + d.n.toLocaleString() + ' resamples' + (inside(d) ? '' : ' (outside the 95%)'); },
      ...tipStyle(t)
    })));

    var chart = Plot.plot({
      width: w, height: 300, marginLeft: 48, marginRight: 12, marginTop: 40, marginBottom: 40,
      style: plotStyle(t),
      x: { domain: opts.domain, label: opts.xLabel, labelAnchor: 'right', labelArrow: 'none' },
      y: { domain: [0, top * 1.2], label: 'resamples', labelArrow: 'none', grid: true, ticks: 4, tickFormat: function (d) { return d.toLocaleString(); } },
      marks: marks
    });
    // Recessive gridlines, per the house style.
    chart.querySelectorAll('[aria-label="y-grid"] line').forEach(function (l) { l.setAttribute('stroke', t.rule); l.setAttribute('stroke-opacity', '1'); });
    fig.plot.replaceChildren(chart);
    fig.status.textContent = done
      ? values.length.toLocaleString() + ' resamples · 95% interval ' + fmt(lo) + ' to ' + fmt(hi) + ' min'
      : values.length.toLocaleString() + ' of ' + N.toLocaleString() + ' resamples…';
  }

  // Runs the bootstrap, drawing as it goes so the reader watches the shape form.
  function run(fig, opts, rand, animate) {
    var values = [], batch = animate && !reduceMotion ? 250 : N;
    fig.values = values; fig.done = false; fig.button.disabled = true;
    (function step() {
      for (var i = 0; i < batch && values.length < N; i++) values.push(opts.stat(rand));
      var done = values.length >= N;
      fig.done = done;
      drawDistribution(fig, opts, values, done);
      if (done) fig.button.disabled = false; else requestAnimationFrame(step);
    })();
  }

  // ---- Wiring ----------------------------------------------------------------------------------------------------

  function figure(name) {
    var el = document.querySelector('[data-chart="' + name + '"]');
    if (!el) return null;
    return { el: el, plot: el.querySelector('.chart-plot'), status: el.querySelector('.chart-status'), button: el.querySelector('button') };
  }

  var redraws = [];

  var one = figure('resample');
  if (one) {
    var oneRand = seeded(SEED), oneState = { picked: resample(oneRand, sessions) };
    var redrawOne = function () { drawResample(one, oneState); };
    one.button.addEventListener('click', function () { oneState.picked = resample(Math.random, sessions); redrawOne(); });
    redraws.push(redrawOne); redrawOne();
  }

  var specs = {
    medians: {
      stat: function (r) { return median(resample(r, sessions)); },
      observed: median(sessions), domain: [1.9, 6.3], yMax: 2200,
      xLabel: 'median session length (min)', tipLabel: 'median'
    },
    gaps: {
      stat: function (r) { return median(resample(r, groupB)) - median(resample(r, groupA)); },
      observed: median(groupB) - median(groupA), domain: [-0.9, 3.1], yMax: 1100, zero: true,
      xLabel: 'gap, B minus A (min)', tipLabel: 'gap'
    }
  };

  // Both distributions share one seeded stream, in the same order as the guide's script.
  var sharedRand = seeded(SEED);
  var firstRuns = [];
  Object.keys(specs).forEach(function (name) {
    var fig = figure(name);
    if (!fig) return;
    var opts = specs[name];
    fig.button.addEventListener('click', function () { run(fig, opts, Math.random, true); });
    redraws.push(function () { if (fig.values) drawDistribution(fig, opts, fig.values, fig.done); });
    firstRuns.push(function () { run(fig, opts, sharedRand, false); });
  });
  firstRuns.forEach(function (f) { f(); });

  // Redraw on night mode and on resize.
  var redrawAll = function () { redraws.forEach(function (f) { f(); }); };
  new MutationObserver(redrawAll).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  var lastWidth = 0, pending;
  new ResizeObserver(function (entries) {
    var w = Math.round(entries[0].contentRect.width);
    if (w === lastWidth) return;
    lastWidth = w; clearTimeout(pending); pending = setTimeout(redrawAll, 80);
  }).observe(document.querySelector('.prose'));
})();
