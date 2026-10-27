---
name: theory
description: Write, add or edit a theory or framework page on colbyschrauth.com in the house style. Use whenever Colby wants to jot down a theory they came across (from any field), turn notes into a theory or framework page, or change an existing one in _theories/ or _frameworks/.
---

# Writing a theory or framework

Theories are interesting ideas Colby came across, from any field (attribution theory). Frameworks are Colby's own approach to a judgment-heavy problem (executive presence, building a data team). Playbooks are step-by-step and are not covered here.

Before writing, read `STYLE.md` (voice, figures) and the matching template: `_theories/_template.md` or `_frameworks/_template.md`. `_theories/attribution-theory.md` and `_frameworks/solving-a-business-problem.md` are the reference examples.

## The page

1. **File.** `_theories/<slug>.md` or `_frameworks/<slug>.md`. Keep `published: false` until Colby says it's ready.
2. **Title in Title Case.** "Attribution Theory", "Building a Data Team". Small words (a, and, of, the, with) stay lowercase unless first.
3. **Front matter.** `title`, `order`, `summary`, `date`. The summary shows on the list page only, so it can echo the opening sentence. Don't set `kind`: the section adds "Theory" or "Framework" automatically.
4. **Opening sentence.** One plain sentence, the idea to remember. No "The principle" label, no `{: .principle}`.
5. **Sections**, only the ones there's something to say for:
   - Theory: *The idea* (required), *Where it comes from* (who, when), more sections for its dimensions, related ideas and biases, *A framework inside it* (optional), *Where it breaks* (`{: .breaks}` list).
   - Framework: *The problem*, *The framework*, *Where it breaks*. No separate "How I use it": memory aids and real situations go inside the stage they belong to, or become example tabs on the figure.
6. **Keep it general.** No worked example or specimen and no "Do this week". In theories, no percentages or sizing either; examples belong in the figure's tabs (below), as one-liners. A framework can include its own mechanics when they are the method (the sizing section of Solving a Business Problem), with the smallest numbers that make the idea visible.
7. **Elegant and minimal.** A sentence or two per idea. A table only for a true comparison, a figure only where the shape matters, and no more than two or three of each on a page. Cut anything the reader doesn't need to act on the idea.
8. **Long is fine when it's navigable.** Pages get an automatic "On this page" sidebar from their headings, so a deep section (like Sizing the gap) belongs on the same page with its own sub-headings, not a separate page.
9. **Facts.** Names, dates and attributions must be right. If unsure, say so to Colby instead of guessing.

## The figure

Use a figure only when the idea has a shape: a schematic for stages, a grid for anything that multiplies, a bridge for how a total moved from plan to actual, a ledger (plain table) for side-by-side facts. For two axes, use the matrix (`_includes/matrix.html`) with `views`: the first view is the general one (one large tab), and each example (a missed target, a won deal, a diet, an argument) is a tab underneath. See the matrix section of `STYLE.md` for the YAML.

- The `caption` is a title that says what to notice, in sentence case.
- Add a `note` on how to read it ("Columns = … · rows = …").
- Each `act` is shown under "What it leads to"; write it as a short action.
- Square, plain sans-serif, mostly neutral with the small color keys. Don't add new colors or rounded cards.

## Before showing Colby

- Build or preview the site (`bin/serve`, http://localhost:4001) and check the page in light mode, night mode and at phone width.
- Check the list page (`/theories/` or `/frameworks/`) and that the entry shows up in ⌘K search.
- Don't commit or push until Colby asks.
