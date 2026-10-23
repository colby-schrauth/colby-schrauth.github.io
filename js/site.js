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
