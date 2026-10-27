---
title: Attribution Theory
order: 1
summary: How you explain why something happened decides what you expect next, and what you do about it.
date: 2026-10-26

matrices:
  causes:
    caption: "Same four boxes, whatever happened: the one you pick decides what you do next"
    note: Columns = where the cause sits · rows = whether it lasts · pick a tab to swap the example
    cols: ["Internal | it was me", "External | it was the world"]
    rows: [One-time, Lasting]
    cells:
      - name: Effort
      - name: Luck
      - name: Ability
      - name: Difficulty
    views:
      - label: The theory
        cells:
          - eg: How hard you tried, this time
            act: adjust the effort; expect a different result
          - eg: Timing, chance, a bad break
            act: don't learn too much from it
          - eg: Your skill, your approach, your system
            act: change the approach, or keep it
          - eg: The conditions, the field you play in
            act: adapt, or pick a different game
      - label: A missed target
        cells:
          - eg: "“We didn't push hard enough this quarter.”"
            act: fix it and recover
          - eg: "“A big deal slipped to next month.”"
            act: explain it and re-phase
          - eg: "“Our pricing doesn't convert.”"
            act: change the plan
          - eg: "“The market shrank.”"
            act: reset the target
      - label: A won deal
        cells:
          - eg: "“We out-prepared them.”"
            act: do the prep again next time
          - eg: "“Their budget freed up at the right moment.”"
            act: enjoy it; don't build a playbook on it
          - eg: "“We're built for buyers like this.”"
            act: go find more buyers like them
          - eg: "“There was no real competition.”"
            act: expect the next one to be harder
      - label: A diet that didn't stick
        cells:
          - eg: "“I stopped trying after week two.”"
            act: recommit, and plan for week two
          - eg: "“The holidays hit.”"
            act: restart when they pass
          - eg: "“I just don't have the willpower.”"
            act: the most discouraging read; check it last
          - eg: "“The plan was too strict to live with.”"
            act: pick a plan you can keep
      - label: An argument with a friend
        cells:
          - eg: "“I wasn't really listening.”"
            act: apologize, and listen next time
          - eg: "“We were both exhausted.”"
            act: let it go; talk tomorrow
          - eg: "“We just see the world differently.”"
            act: learn how they see it
          - eg: "“It's a hard subject for both of us.”"
            act: pick a better time to raise it
---

How you explain why something happened decides what you expect next, and what you do about it.

## The idea

Every time something goes well or badly, you explain it, usually without noticing. A missed target, a deal won, a diet that didn't stick, an argument with a friend: each gets a story about *why*.

Those stories sort on two questions. Was the cause in me, or in the world? Is it a one-off, or will it keep happening? Where you land decides what you feel and what you do next.

{% include matrix.html id="causes" %}

The four boxes are the classic causes from the research: effort, luck, ability and difficulty. Tap through the examples. Whatever happened, the box you put it in leads to the same kind of move.

## Where it comes from

**Fritz Heider** (1958) noticed that people explain events like amateur scientists, in one of two ways: it was the *person* (effort, skill) or the *situation* (luck, circumstances). That split is the internal-versus-external axis.

**Bernard Weiner** (1970s–80s) built that into a full theory. He sorted every cause on three dimensions, not two:

1. **Locus.** Inside the person, or outside?
2. **Stability.** Temporary, or lasting?
3. **Controllability.** Can anyone actually change it?

Each dimension drives something different:

| Dimension | What it shapes | Example |
|---|---|---|
| Locus | **How you feel about yourself** | Success you caused brings pride; failure you caused brings shame |
| Stability | **What you expect next** | A lasting cause means expect it again; a one-off means expect a bounce back |
| Controllability | **How others judge you** | Failing from no effort draws blame; failing from illness draws sympathy |

Stability is the one that predicts the future. People who explain a setback as lasting stop expecting things to improve, and often stop trying.

## The dimension the 2×2 drops

The two-axis version quietly assumes internal means "I can change it" and external means "I can't". Weiner kept those apart, and real causes split them:

| Cause | Locus | Can it be changed? |
|---|---|---|
| Effort | Internal | **Yes** |
| Natural talent | Internal | **No** |
| Being sick on the day | Internal | **No** |
| A rival's move | External | **Yes, you can respond** |
| The weather | External | No |

What decides whether acting helps is control, not where the cause sits. Ask the third question of every cause, even the ones the 2×2 files as external.

## How people decide which box

**Harold Kelley's** {% include gloss.html term="covariation model" def="Kelley's 1967 idea that people judge a cause by checking what varies with the effect: across other people, across time, and across situations." %} describes three checks people run, mostly without knowing it:

- **Consensus: does it happen to others too?** If everyone struggled, the cause is probably the situation.
- **Consistency: does it happen every time?** Every time suggests something lasting; once suggests a one-off.
- **Distinctiveness: does it happen only here?** If it shows up in one place and nowhere else, the cause is probably specific to that place or person.

Done on purpose, these turn an explanation from a hunch into an argument: "here's the box, and here's how I know."

## The biases it explains

- **The {% include gloss.html term="self-serving bias" def="The habit of crediting wins to ourselves and blaming losses on circumstances." %}.** We credit our wins to ability and blame our losses on luck or difficulty. It protects how we feel and teaches us nothing.
- **The {% include gloss.html term="fundamental attribution error" def="Lee Ross's 1977 name for over-explaining other people's behavior by their character and under-weighting their situation." %}.** We explain other people's failures by their character ("he's careless") and our own by the situation ("I was swamped").

The two together mean the same event gets opposite explanations depending on whose it is.

## Close relatives

- **Locus of control** (Julian Rotter, 1966). The personality version: some people habitually believe outcomes are up to them, others that they're up to fate.
- **Explanatory style** (Martin Seligman). The same axes, plus one more: does it affect everything, or just this? Reading setbacks as lasting and everywhere is the pattern behind pessimism and learned helplessness.
- **Common cause versus special cause** (Walter Shewhart, then W. Edwards Deming). Quality control's version of the stability axis: noise built into the system, or a specific event you can point to.

## A framework inside it: the cause matrix

Applied to a missed business target, the four boxes become four moves. **Fix and recover** a one-time internal cause (a launch slip). **Explain and re-phase** a one-time external one (seasonality). **Change the plan** for a lasting internal one (pricing). **Reset the target** for a lasting external one (a new competitor). Short name: *fix, re-phase, change, reset*. It's one stage of a larger framework, [Solving a Business Problem]({{ '/frameworks/solving-a-business-problem.html' | relative_url }}).

## Where it breaks

- **Causes don't sit still.** A one-off that keeps happening isn't a one-off anymore. Re-check the box when the pattern changes.
- **Locus isn't control.** An external cause you can respond to behaves like an internal one in practice.
- **Most causes are mixed.** A bad result can be part effort, part luck. Forcing it into one box loses the truth.
- **The comfortable box is a magnet.** For our own failures, "external, one-time" asks the least of us, so explanations drift there. Run the consensus check before you believe it.
{: .breaks}
