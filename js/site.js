// ⌘K / Ctrl+K quick search: a filterable list of every page, post and thought.
(function () {
  const dialog = document.querySelector('.palette');
  const indexEl = document.getElementById('search-index');
  if (!dialog || !indexEl || typeof dialog.showModal !== 'function') return;

  const items = JSON.parse(indexEl.textContent);
  const input = dialog.querySelector('input');
  const list = dialog.querySelector('ul');
  let matches = items;
  let active = 0;

  function render() {
    list.innerHTML = '';
    if (!matches.length) {
      const li = document.createElement('li');
      li.className = 'empty';
      li.textContent = 'Nothing found';
      list.appendChild(li);
      return;
    }
    matches.forEach((item, i) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.url;
      a.setAttribute('role', 'option');
      a.setAttribute('aria-selected', i === active ? 'true' : 'false');
      const title = document.createElement('span');
      title.textContent = item.title;
      const kind = document.createElement('span');
      kind.className = 'mono';
      kind.textContent = item.kind;
      a.append(title, kind);
      a.addEventListener('mousemove', () => select(i));
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  function select(i) {
    if (i === active) return;
    active = i;
    list.querySelectorAll('a').forEach((a, j) => a.setAttribute('aria-selected', j === i ? 'true' : 'false'));
    const el = list.querySelectorAll('a')[i];
    if (el) el.scrollIntoView({ block: 'nearest' });
  }

  function filter() {
    const words = input.value.toLowerCase().split(/\s+/).filter(Boolean);
    matches = items.filter((item) => {
      const hay = (item.title + ' ' + item.kind).toLowerCase();
      return words.every((w) => hay.includes(w));
    });
    active = 0;
    render();
  }

  function open() {
    input.value = '';
    filter();
    dialog.showModal();
    input.focus();
  }

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      dialog.open ? dialog.close() : open();
    }
  });
  document.querySelectorAll('[data-palette-open]').forEach((b) => b.addEventListener('click', open));

  input.addEventListener('input', filter);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); select(Math.min(active + 1, matches.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); select(Math.max(active - 1, 0)); }
    if (e.key === 'Enter' && matches[active]) { e.preventDefault(); window.location.href = matches[active].url; dialog.close(); }
  });
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

  // Show Ctrl+K instead of ⌘K off Apple devices.
  if (!/Mac|iPhone|iPad/.test(navigator.platform)) {
    document.querySelectorAll('[data-palette-open], .hint kbd:first-of-type').forEach((el) => {
      el.textContent = el.textContent.replace('⌘', 'Ctrl ');
    });
  }
})();

// Buttons with data-copy put that text on the clipboard (e.g. the email icon) and say so briefly.
(function () {
  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand('copy');
    field.remove();
    return ok ? Promise.resolve() : Promise.reject();
  }

  document.querySelectorAll('[data-copy]').forEach((button) => {
    const status = button.querySelector('.copied');
    let timer;
    button.addEventListener('click', () => {
      copy(button.dataset.copy)
        .then(() => { status.textContent = 'Email copied'; })
        .catch(() => { status.textContent = button.dataset.copy; });
      clearTimeout(timer);
      timer = setTimeout(() => { status.textContent = ''; }, 2000);
    });
  });
})();

// Links to other sites open in a new tab.
document.querySelectorAll('a[href^="http"]').forEach((a) => {
  if (a.host === location.host) return;
  a.target = '_blank';
  a.rel = 'noopener';
});

// Glosses: tap a dotted term to open its definition inline (see STYLE.md).
document.querySelectorAll('.gloss-term').forEach((term) => {
  term.addEventListener('click', () => {
    const open = term.parentElement.classList.toggle('open');
    term.setAttribute('aria-expanded', open);
  });
});

// Night mode: the toggle flips <html data-theme="dark"> and remembers the choice.
(function () {
  const root = document.documentElement;
  const meta = document.querySelector('meta[name="theme-color"]');
  const sync = () => {
    const dark = root.dataset.theme === 'dark';
    document.querySelectorAll('[data-theme-toggle]').forEach((b) => b.setAttribute('aria-pressed', dark));
    if (meta) meta.content = dark ? '#25272A' : '#F6F4EF';
  };
  document.querySelectorAll('[data-theme-toggle]').forEach((b) => b.addEventListener('click', () => {
    const dark = root.dataset.theme !== 'dark';
    if (dark) root.dataset.theme = 'dark'; else delete root.dataset.theme;
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
    sync();
  }));
  sync();
})();

// Matrix views: tabs that swap the example inside each box (see STYLE.md).
document.querySelectorAll('[data-views]').forEach((fig) => {
  const tabs = [...fig.querySelectorAll('.matrix-tab')];
  const show = (n) => {
    tabs.forEach((t, i) => {
      t.setAttribute('aria-selected', i === n);
      t.tabIndex = i === n ? 0 : -1;
    });
    fig.querySelectorAll('.quad-view').forEach((v) => {
      const on = Number(v.dataset.view) === n;
      v.classList.toggle('is-active', on);
      v.setAttribute('aria-hidden', !on);
    });
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(i));
    t.addEventListener('keydown', (e) => {
      const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!step) return;
      e.preventDefault();
      const n = (i + step + tabs.length) % tabs.length;
      show(n);
      tabs[n].focus();
    });
  });
});

// "On this page": a contents list built from a theory or framework's headings, highlighting where you are.
(function () {
  const aside = document.querySelector('.entry-toc');
  if (!aside) return;
  const heads = [...document.querySelectorAll('.entry-body .prose h2[id], .entry-body .prose h3[id]')];
  if (heads.length < 3) return;
  const list = aside.querySelector('[data-toc]');
  const links = heads.map((h) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    if (h.tagName === 'H3') a.className = 'sub';
    li.appendChild(a);
    list.appendChild(li);
    return a;
  });
  aside.hidden = false;
  const mark = () => {
    let current = 0;
    heads.forEach((h, i) => { if (h.getBoundingClientRect().top < window.innerHeight * 0.3) current = i; });
    links.forEach((a, i) => a.setAttribute('aria-current', i === current));
  };
  window.addEventListener('scroll', mark, { passive: true });
  mark();
})();
