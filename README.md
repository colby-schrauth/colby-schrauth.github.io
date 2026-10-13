# colbyschrauth.com

Built with [Jekyll](https://jekyllrb.com) on GitHub Pages: push to `master` and the site rebuilds itself within a minute or two.

## Writing

**A thought** (short, shows on the Thoughts page):

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

## Previewing

```bash
bin/serve
```

Then open http://localhost:4000. Drafts are included, and the page reloads as you save.
First-time setup: `brew install ruby@3.3`, then `bundle install` (GitHub Pages' Jekyll doesn't run on Ruby 4).

## Layout

- `css/site.css`: the whole design (Graphite + Brass, Newsreader + IBM Plex Mono)
- `_layouts/default.html`: shared header, footer and ⌘K search (`js/site.js`)
- `_layouts/post.html`, `_layouts/list.html`: article page and top-10 list page
- `_thoughts/`, `_posts/`, `_drafts/`: writing, in Markdown
- `_data/articles.yml`: Writing page categories and links to articles published elsewhere
- `_data/books.yml`, `_data/shows.yml`: the top-10 lists on the Scrapbook
- `index.html`, `thoughts.html`, `articles.html`, `scrapbook.html`, `about.html`: the main pages
- `assets/photos/`: web-sized photos (originals are in `assets/`)
- `blog/domains.html`, `blog/surfbike.html`: unfinished, unlinked drafts in the old design
