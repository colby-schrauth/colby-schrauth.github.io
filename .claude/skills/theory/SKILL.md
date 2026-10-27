---
name: theory
description: Write, add or edit a theory or framework page on colbyschrauth.com in the house style. Use whenever Colby wants to jot down a theory they came across (from any field), turn notes into a theory or framework page, or change an existing one in _theories/ or _frameworks/.
---

# Writing a theory or framework

Theories are interesting ideas Colby came across, from any field (attribution theory). Frameworks are Colby's own approach to a judgment-heavy problem (executive presence, building a data team). Playbooks are step-by-step and are not covered here.

Before writing, read `STYLE.md` (voice, figures) and the matching template: `_theories/_template.md` or `_frameworks/_template.md`. `_theories/attribution-theory.md` is the reference example.

## The page

1. **File.** `_theories/<slug>.md` or `_frameworks/<slug>.md`. Keep `published: false` until Colby says it's ready.
2. **Title in Title Case.** "Attribution Theory", "Building a Data Team". Small words (a, and, of, the, with) stay lowercase unless first.
3. **Front matter.** `title`, `order`, `summary`, `date`. The summary shows on the list page only, so it can echo the opening sentence. Don't set `kind`: the section adds "Theory" or "Framework" automatically.
4. **Opening sentence.** One plain sentence, the idea to remember. No "The principle" label, no `{: .principle}`.
5. **Sections**, only the ones there's something to say for:
   - Theory: *The idea* (required), *Where it comes from* (who, when), more sections for its dimensions, related ideas and biases, *A framework inside it* (optional), *Where it breaks* (`{: .breaks}` list).
   - Framework: *The problem*, *The framework*, *How I use it*, *Where it breaks*.
6. **Keep it general.** No worked example or specimen, no percentages or sizing, no "Do this week". Examples belong in the figure's tabs (below), as one-liners.
7. **Facts.** Names, dates and attributions must be right. If unsure, say so to Colby instead of guessing.

## The figure

Use a figure only when the idea has a shape. For two axes, use the matrix (`_includes/matrix.html`) with `views`: the first view is the general one (one large tab), and each example (a missed target, a won deal, a diet, an argument) is a tab underneath. See the matrix section of `STYLE.md` for the YAML.

- The `caption` is a title that says what to notice, in sentence case.
- Add a `note` on how to read it ("Columns = … · rows = …").
- Each `act` is shown under "What it leads to"; write it as a short action.
- Square, plain sans-serif, mostly neutral with the small color keys. Don't add new colors or rounded cards.

## Before showing Colby

- Build or preview the site (`bin/serve`, http://localhost:4001) and check the page in light mode, night mode and at phone width.
- Check the list page (`/theories/` or `/frameworks/`) and that the entry shows up in ⌘K search.
- Don't commit or push until Colby asks.
