# colbyschrauth.com

Built with [Jekyll](https://jekyllrb.com) on GitHub Pages: push to `master` and the site rebuilds itself within a minute or two.

## Writing

Everything is written and illustrated in the house style in [STYLE.md](STYLE.md): the voice, the structure of a chapter, and the six kinds of figure (traces, schematics, matrices, grids, bridges and ledgers).

**A note** (short, shows in the Notes section of the Writing page):

```bash
bin/new thought "Title of the Thought"
```

Creates `_thoughts/YYYY-MM-DD-title-of-the-thought.md`. Write in it, then commit and push.

**A post** (a full article at `/blog/<slug>.html`, listed on the Articles page):

```bash
bin/new post "Title of the Post"
```

Creates `_drafts/title-of-the-post.md`. Drafts are never published, so take your time. When it's ready:

```bash
bin/publish _drafts/title-of-the-post.md
```

That moves it into `_posts/` with today's date. Commit and push.

Set `location` in front matter (or `LOCATION="Kyoto, Japan" bin/new ...`) and, for posts, set `category` to one of the headings in `_data/articles.yml`.

**An article published elsewhere**: add it as a link under its category in `_data/articles.yml`.

**A playbook chapter**: add a Markdown file to `_playbooks/<playbook>/` (copy an existing chapter for the front matter). Set `part` to one of that playbook's parts in `_data/playbooks.yml`, `order` to its chapter number, and `status: outline` while it's still a sketch (delete that line when it's done). A new playbook gets an entry in `_data/playbooks.yml` and an `index.md` overview with `order: 0`.

**A theory** (an interesting idea you came across, from any field): add a Markdown file to `_theories/` (copy `_theories/_template.md`; only the title, summary and the opening sentence are required). `order` sets its place on the Theories page; `published: false` keeps it off the site until you delete that line.

Or ask Claude: the `/theory` skill (`.claude/skills/theory/`) writes theories and frameworks in the house style.

**A framework** (your own approach to a judgment-heavy problem, like executive presence or building a data team): the same, in `_frameworks/` (copy `_frameworks/_template.md`). Theories are other people's ideas; frameworks are yours; playbooks are step-by-step.

**A project**: add a Markdown file to `_projects/` (copy an existing one for the front matter). `order` sets its place on the Projects page; the body is its write-up page.

## Previewing

```bash
bin/serve
```

Then open http://localhost:4000. Drafts are included, and the page reloads as you save.
First-time setup: `brew install ruby@3.3`, then `bundle install` (GitHub Pages' Jekyll doesn't run on Ruby 4).

## Layout

- `css/site.css`: the whole design (Paper + Brass by day, Graphite + Brass with the night-mode toggle; Newsreader for reading, IBM Plex Sans for every label, date and figure, IBM Plex Mono only for code)
- `_layouts/default.html`: shared header, footer and ⌘K search (`js/site.js`)
- `_layouts/post.html`, `_layouts/list.html`: article page and top-10 list page
- `_thoughts/`, `_posts/`, `_drafts/`: writing, in Markdown
- `_projects/`, `_layouts/project.html`: the Projects page and each project's write-up
- `_frameworks/`, `_theories/`, `_layouts/entry.html`: the Frameworks and Theories pages, and each entry's own page
- `_playbooks/`, `_layouts/playbook.html`, `_data/playbooks.yml`: the Playbook section (one folder per playbook)
- `_data/articles.yml`: Writing page categories and links to articles published elsewhere
- `_data/books.yml`, `_data/shows.yml`: the top-10 lists on the Scrapbook
- `index.html`, `articles.html` (Writing, with Notes), `scrapbook.html` (Favorites, with Toolkit), `about.html`: the main pages
- `thoughts.html`, `toolkit.html`: forward old links to their sections on Writing and Favorites
- `assets/photos/`: web-sized photos (originals are in `assets/`)
- `blog/domains.html`, `blog/surfbike.html`: unfinished, unlinked drafts in the old design
