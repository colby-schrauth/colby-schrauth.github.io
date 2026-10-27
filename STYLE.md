# House style: the field manual

How everything on colbyschrauth.com is written and illustrated. The look (Paper + Brass by day, Graphite + Brass by night; Newsreader for reading, IBM Plex Sans for every label, date and figure, Plex Mono only for code) is in `css/site.css`; this is the same idea for words and pictures. Follow it for every playbook chapter, framework, theory, project write-up and article. Notes can be looser, but use the same voice.

The short version: **find the principle, follow one specimen through the system, show who can see it, and say where it breaks.**

---

## 1. Voice

Write like a patient expert at a whiteboard: someone who has done the work, explaining it to a smart friend who hasn't.

- **Principle before tool.** Start with the job that needs doing; the tool is how you do it. Never open with a product name.
- **One concrete thing at a time.** Real-feeling names, numbers and days ("day 3", "$4,800"), not "a user" and "some revenue".
- **Plain words.** Say "sends it back", not "leverages bidirectional data flows". Jargon is allowed only after it has been glossed once (see Glosses).
- **Short.** One idea per paragraph. Most sentences under 25 words. Cut "really", "very", "just", "simply".
- **Honest about mess.** Every system breaks somewhere; say where. Numbers that are illustrative are labelled as such.
- **Second person, present tense.** "You send the event", "Jordan signs up".
- **Analogies come from data work.** Tag Manager is an ingestion layer; the CRM is the source of truth; the warehouse is where things get joined.

Words to avoid: leverage, unlock, supercharge, seamless, robust, game-changer, "in today's world", "it's important to note".

- **Titles in Title Case**, for every post, note, project, chapter, theory and framework: "Attribution Theory", "Campaign Tracking with UTMs". Small words stay lowercase unless they come first.
- **The line under a title** (date, kind, role) is written in normal case and drawn in quiet Plex Sans; never lowercase it.

## 2. Structure

Every playbook chapter (and most articles) uses this order. Frameworks are your own approach to a judgment-heavy problem (executive presence, building a data team): an opening sentence, the problem, the framework itself (usually with a figure), how you use it and where it breaks. No specimen and no "do this week".

Theories are lighter: a place to jot down interesting ideas from any field, not only business. A theory opens with one plain sentence (no "The principle" label), then the idea in plain words, and, when there's something to say, where it comes from, a framework inside it and where it breaks. No specimen, no "do this week": it stays a general idea, not a worked case or a to-do. Figures are optional. Headings are plain and short.

1. **The principle**: one sentence, the thing to remember if you forget everything else.
2. **The specimen**: who or what we're following (not in theories).
3. **The body**: the explanation, in short sections, carried by the specimen's story.
4. **At least one figure**: a trace, a schematic, a matrix or a ledger.
5. **Where it breaks**: the failure modes, as a list.
6. **Do this week**: one concrete action (not in theories).

## 3. Devices (and how to write them in Markdown)

**The principle**: a paragraph followed by `{: .principle}`.

```markdown
Tell the ad platforms about the earliest event that reliably predicts revenue.
{: .principle}
```

**The specimen**: a paragraph followed by `{: .specimen}`. Name, role, situation, separated by ` · `.

```markdown
**Jordan** · ops manager · 60-person HVAC company · found you on G2
{: .specimen}
```

**Glosses**: an inline definition the reader can tap open. Use one the first time a term appears in a piece, never twice.

```liquid
{% include gloss.html term="gclid" def="Google's click ID, added to the link when someone clicks your ad." %}
```

**Where it breaks**: a list followed by `{: .breaks}`. Each item starts with the failure in bold, then the fix.

```markdown
- **The signal is too rare.** Under ~50 a week and the platform never settles. Move one step earlier.
{: .breaks}
```

**Do this week**: a paragraph followed by `{: .takeaway}`.

## 4. Illustrations

There are only four kinds of figure, and they are always drawn from data, never by hand, so they stay consistent.

### The trace (the signature figure)

Shows **who can see the specimen, moment by moment**. Systems are rows, moments are columns, time runs left to right. A brass thread runs through every moment a system can see the specimen; where it breaks, the thread breaks.

| Mark | Meaning | Write it as |
|---|---|---|
| ● brass dot | this system sees it | `on` |
| · faint dot | this system can't see it | `off` |
| ✕ coral cross | this system *should* see it, but loses it | `lost` |
| ◎ brass ring, dashed thread | this system learns it later, because we send it back | `back` |

Define it in the page's front matter, then place it with `{% include trace.html id="name" %}`:

```yaml
traces:
  browser:
    caption: Browser tracking only
    moments: [Ad click, Sign up, Activates, Pays]
    rows:
      - system: Google Ads
        see: on lost off off
      - system: GA4
        see: lost lost off off
```

### The schematic

Shows **how the pieces connect**: stages left to right (stacked on phones), boxes inside each stage, and the boxes that matter lit in brass. Use for system maps and funnels. Place with `{% include schematic.html id="name" %}`.

```yaml
schematics:
  ladder:
    caption: Jordan's path, and the signal we chose
    stages:
      - name: Day 0
        nodes: ["Signs up"]
      - name: Day 3
        nodes: ["Invites 3+ teammates | the signal"]
    lit: ["Invites 3+ teammates"]
```

A node can carry a small note after a `|`.

### The matrix

Shows **where things sit on two axes**: a 2×2 whose four boxes each call for a different move. Columns are one axis, rows the other. It has two modes, and a page often uses both: the map first, then the specimen placed on it.

- **The map** names each box, gives examples and says what to do (`name`, `eg`, `act`). It explains the idea. Each `act` is labelled "What it leads to" (change it with `act_label`), never just an arrow.
- **Placed** puts the specimen's own items in their boxes, each with its share of the whole (`causes`). The box holding the most is lit in brass.

| Mark | Meaning | Write it as |
|---|---|---|
| ● brass dot | you can act on it | `Name \| 55` |
| · faint dot | you can't act on it | `Name \| 10 \| can't` |
| brass box | where most of it sits | the box's name in `lit` |

A map can also carry **views**: tabs above the grid that swap what's inside each box while the box names stay put, with a soft fade between them. Use it to show one idea holding across very different situations. Each view has a `label` and four `cells` (`eg`, `act`) in reading order. The first view is the general one and shows as one large tab across the top; the rest sit underneath it in a row labelled "Examples".

```yaml
    cells: [{name: Effort}, {name: Luck}, {name: Ability}, {name: Difficulty}]
    views:
      - label: The theory
        cells:
          - eg: How hard you tried, this time
            act: adjust the effort
          # ...three more
      - label: A won deal
        cells:
          - eg: "“We out-prepared them.”"
            act: do the prep again next time
          # ...
```

The dots mean the same as in the trace: brass is within reach, faint is out of it. Place with `{% include matrix.html id="name" %}`. Cells run left to right, top to bottom.

```yaml
matrices:
  map:
    caption: Where the cause sits decides what you do next
    cols: ["Internal | we caused it", "External | the market did"]
    rows: [One-time, Lasting]
    cells:
      - name: Fix and recover
        eg: Launch slip, outage, tracking bug
        act: fix it, then reforecast
      # ...three more, in reading order
  studio:
    caption: Most of the miss is one lasting cause the studio controls
    cols: [Internal, External]
    rows: [One-time, Lasting]
    cells:
      - name: Fix and recover
        causes: ["Booking app outage | 10 | can't"]
      # ...
    lit: [Change the plan]
```

### The ledger

Shows **numbers side by side**. A plain Markdown table: the first column names the thing, headers are short, and the row that matters has its key cells in `**bold**` (they turn brass).

### Rules for every figure

- **Square and simple.** Sharp corners, thin lines, boxes that share their edges like a grid. No rounded cards, shadows, icons, stock images, clip art, gradients or 3D.
- **One plain font.** Figures use IBM Plex Sans, like every label on the site: sentence case, regular weight for labels, semibold only for names and the title. No monospace, no letter-spaced capitals.
- **Mostly neutral, with a tiny bit of color.** Text, muted gray and brass, always through the CSS color variables so figures work in day and night mode. Categories get a small square key in one of four muted tones (terracotta, sage, slate, ochre: `--key-1` to `--key-4`), never a colored fill. Brass marks the one thing that matters; coral appears only on a break.
- **Clear lines.** Boxes are separated by the darker figure line (`--grid`), not the faint page rule.
- **The title says what to notice**, at the top, in bold: "Same four boxes, whatever happened", not "Attribution diagram".
- **An optional note underneath** says how to read it, in small gray text: "Columns = where the cause sits · rows = whether it lasts". Write it as `note:`.
- Illustrative numbers are said to be illustrative, in the text or the note.

## 5. The cast

Recurring specimens, so readers meet the same people across pieces. Reuse them before inventing new ones, and keep their details consistent.

| Specimen | Business type | Details |
|---|---|---|
| **Dana** | B2B services | COO of a $40M e-commerce company; finds PRIORA through a Google search; signs a $60k engagement after six weeks |
| **Maya** | Multi-location studio | Sees a $39 intro offer on Instagram; books through Google Maps at the Austin studio; becomes a $79/month member (worth about $950 in year one). When the story is the business's, the specimen is **the studio Maya joins**: four locations, $79/month memberships |
| **Jordan** | B2B SaaS | Ops manager at a 60-person HVAC company; reads a blog post, compares on G2, signs up with Google; invites three teammates on day 3; pays $4,800/year on day 16 |

## 6. Before publishing

- [ ] Opens with a principle, not a tool
- [ ] One specimen, followed throughout (theories: none)
- [ ] Every term glossed once on first use
- [ ] At least one figure (trace, schematic, matrix or ledger), with a title that says what to notice
- [ ] A "where it breaks" list
- [ ] A "do this week" action (theories: none)
- [ ] Illustrative numbers labelled
- [ ] No words from the avoid list
