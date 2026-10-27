---
title: Solving a Business Problem
order: 1
summary: Six questions that turn any vague business problem into a sized answer, a recommendation and a forecast.
date: 2026-10-27

schematics:
  stages:
    caption: Every problem moves from the decision to a forecast, one question per stage
    note: Pick an example to see each stage in a real situation (numbers are illustrative)
    numbered: true
    stages:
      - name: Clarify
      - name: Validate
      - name: Decompose
      - name: Diagnose
      - name: Recommend
      - name: Forecast
    views:
      - label: The framework
        cells:
          - eg: What decision is this for?
          - eg: Is the problem real?
          - eg: What adds up to it?
          - eg: Where, why, how much?
          - eg: What do we do?
          - eg: What happens next?
      - label: A doctor's visit
        cells:
          - eg: "Intake: where does it hurt?"
          - eg: Check the thermometer
          - eg: Review each body system
          - eg: Run tests
          - eg: A treatment plan
          - eg: A prognosis
      - label: A missed target
        cells:
          - eg: A reforecast by Friday
          - eg: Same revenue definition?
          - eg: Customers × frequency × value
          - eg: "One region's checkout: 60%"
          - eg: Fix checkout; re-phase Q4
          - eg: 3% short; caught up by Q1
      - label: Rising churn
        cells:
          - eg: Fund a retention team?
          - eg: Cancellations or failed cards?
          - eg: Cohort × plan × reason
          - eg: Last spring's discount cohort
          - eg: A win-back offer
          - eg: Normal in two quarters
      - label: Should we raise prices?
        cells:
          - eg: Approve +10% for January?
          - eg: Is margin the constraint?
          - eg: Customers × price − churn
          - eg: Small accounts react most
          - eg: Raise for new and large first
          - eg: +6% revenue, +1% churn

matrices:
  causes:
    caption: Where a cause sits decides what to do about it
    note: Columns = who caused it · rows = whether it lasts · the theory behind it is attribution theory
    cols: ["Internal | we caused it", "External | the market did"]
    rows: [One-time, Lasting]
    cells:
      - name: Fix and recover
        eg: A launch slip, an outage, a tracking bug
        act: fix it, then reforecast
      - name: Explain and re-phase
        eg: Seasonality, a big deal that slipped
        act: adjust the timing, not the plan
      - name: Change the plan
        eg: Pricing, positioning, the sales motion
        act: a strategy decision
      - name: Reset expectations
        eg: A new competitor, a market shift
        act: escalate and reset the goal

bridges:
  swap:
    caption: Conversion explains most of the miss, so that's where the work goes
    note: Each step swaps one driver from plan to actual, keeping the steps before it · the bars start at $4.0M so the steps are visible
    floor: 4.0
    ceiling: 5.0
    start: {label: Plan, value: 5.0, show: "$5.00M"}
    steps:
      - {label: Visitors, value: -0.25, show: "−$250K"}
      - {label: Conversion, value: -0.475, show: "−$475K"}
      - {label: Order value, value: -0.0855, show: "−$86K"}
    end: {label: Actual, value: 4.1895, show: "$4.19M"}
    lit: Conversion

grids:
  corner:
    caption: "Every square is $1: the corner is lost only because both fell"
    note: Each column = one customer · each row = $1 of price · the full grid = the $100 plan
    plan: [10, 10]
    actual: [8, 8]
    labels:
      kept: "Actual revenue | 8 customers × $8 = $64"
      cols: "Lost to fewer customers only | 2 missing customers × $8 = $16"
      rows: "Lost to a lower price only | 8 customers × $2 less = $16"
      corner: "Lost to both at once: the corner | 2 missing customers × $2 less = $4"
    total: "Total lost: $16 + $16 + $4 = $36"
---

Every vague business problem gets the same six questions. The job is never to find *a* cause; it's to turn an anxious question into a sized answer someone can act on.

## The problem

"We're missing target." "Churn is up." "Should we raise prices?" Each tempts you to open a dashboard first. A good answer does the opposite: it questions the request, breaks the problem into parts that add up, sizes the few that matter, and ends with a decision.

## The framework

Six stages, one question each. Don't memorize them; play a doctor. When you blank, ask **what would a good doctor ask next?**

{% include schematic.html id="stages" %}

### 1. Clarify

Five questions, counted on one hand:

| Finger | The link | The question |
|---|---|---|
| Thumb | Up or down is a decision | What decision, and by when? |
| Index | Point to where it hurts | Which metric, how far off, since when? |
| Middle | The tallest finger measures | How was the goal set? |
| Ring | A ring marks something new | What changed? |
| Pinky | A pinky promise is a belief | What do you already believe? |

The middle finger matters most: many problems turn out to be bad goals.

### 2. Validate

Make sure the numbers are measured the same way: tracking, definitions, refunds and discounts. Nobody should build conclusions on a broken number.

### 3. Decompose

Break the number into a {% include gloss.html term="driver tree" def="A breakdown of one number into the numbers that produce it, level by level, so each piece can be checked on its own." %} where every level is an equation: revenue = customers × frequency × order value. Give each piece one parent, fit the tree to the business, and go one level deeper than feels necessary.

### 4. Diagnose

Slice the branch that moved, then ask two questions of each cause: did we cause it, and will it last? That's [attribution theory]({{ '/theories/attribution-theory.html' | relative_url }}), and the answer decides the move.

{% include matrix.html id="causes" %}

Then size every cause as a share of the gap. "One region's mobile checkout is 60% of it" beats ten interesting charts.

### 5. Recommend

Point every action at a branch of the tree, with the share of the gap it would close. An action that doesn't point at a branch is a guess.

### 6. Forecast

Say where things will land, what would change that, and whether the goal itself should move. Stopping at the cause leaves the real question unanswered.

## Sizing the gap

A list of causes isn't a priority list until each one has a size. Sizing answers one question: if everything else had gone to plan, what did this cause cost?

### Two kinds of split

Every node in a driver tree splits its number one of two ways, and each has its own method. Take a $5.00M plan that came in at $4.19M, an $810K miss.

**When the parts add up**, like regions, each part's gap is its actual minus its plan. If a region has no plan of its own, give it one: split the total plan by its share of last year.

| Region | Last year's share | Implied plan | Actual | Gap | Share of the miss |
|---|---|---|---|---|---|
| EMEA | 30% | $1.50M | $1.04M | −$460K | **57%** |
| APAC | 20% | $1.00M | $0.70M | −$300K | 37% |
| North America | 50% | $2.50M | $2.45M | −$50K | 6% |

The implied plan is an assumption ("EMEA was expected to grow like everyone else"), so say it out loud.

**When the parts multiply**, like visitors × conversion × order value, swap in one actual at a time and watch the total fall:

{% include bridge.html id="swap" %}

The steps add up to the miss: conversion is about 59% of it, visitors 31%, order value 11%.

### The corner

There's a catch with multiplied parts. When two of them miss together, part of the loss belongs to neither alone. Draw revenue as squares and you can see it:

{% include grid.html id="corner" %}

Whichever driver you swap first is measured against the full plan of the other, so it absorbs the corner. The total never changes; the blame does.

| Swap order | Customers' share | Price's share |
|---|---|---|
| Customers first | $20 | $16 |
| Price first | $16 | $20 |

Nothing about the business decided that. The order did.

### Two fair fixes

**Average every order.** Run the swap in every possible order and average the results. Here each driver gets its own strip plus half the corner: $18 each. This is the {% include gloss.html term="Shapley value" def="Lloyd Shapley's method from game theory for splitting a shared payoff fairly: each player gets their average contribution across every order the team could have formed in." %}. Three drivers means six orders; a spreadsheet does it in seconds.

**Split by the size of each drop.** Take the natural log of actual ÷ plan for each driver and for the total. Each driver's share is its log over the total's. One division per driver, however many there are.

Most of the time they agree. When the drops are uneven, say 9 customers instead of 10 and price down from $10 to $7, they differ only in how they split the corner:

| Method | Customers | Price | Total |
|---|---|---|---|
| Average every order | $8.50 | $28.50 | $37 |
| Log method | $8.44 | $28.56 | $37 |

### When the corner matters

The corner is one miss times the other, so it's tiny for small misses and only matters when both drivers moved a lot.

| Both drivers miss by | The corner's share of the gap |
|---|---|
| 5% and 10% | about 3% |
| 20% and 20% | about 11% |
| 50% and 50% | about a third |

In one line: "When drivers multiply, part of the miss comes from both moving at once, so I split that overlap fairly and make sure the pieces add up to the gap."

## Telling it

Lead with the answer, and give every slide its own question:

| Slide | The question it answers |
|---|---|
| 1. The answer | What happened, and what should I do? |
| 2. The bridge | Where does the gap come from? |
| 3. Root cause | Why is the biggest driver happening? |
| 4. What it's not | What can I stop worrying about? |
| 5. Recommendations | What do we do? |
| 6. Outlook | What happens next? |

If someone reads only the first slide, they should be able to act.

## Where it breaks

- **Analysis before the decision.** Clarify first, every time.
- **A tree that doesn't add up.** If a level isn't an equation, fix it before slicing.
- **Causes without sizes.** A list of reasons isn't a priority list.
- **No forecast.** Always say what happens next.
- **Accounting isn't causation.** If a price cut raised conversion, sizing credits one and blames the other for one decision. Flag the link.
- **Implied plans are guesses.** Say which shares rest on an assumed plan.
- **Not every problem is a number.** A team conflict still gets clarify and recommend; skip the tree.
{: .breaks}
