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

- `_layouts/default.html`: shared head, nav and footer
- `_layouts/post.html`: article page
- `_thoughts/`, `_posts/`, `_drafts/`: writing, in Markdown
- `_data/articles.yml`: Articles page categories and external links
- `index.html`, `about.html`, `lists/`, `blog/*.html`: older hand-written pages, served as-is
