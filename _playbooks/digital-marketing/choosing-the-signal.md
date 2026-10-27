---
title: Choosing the Signal
playbook: digital-marketing
part: Measure
order: 6
description: How to pick the one event worth telling the ad platforms about, the earliest one that predicts revenue.
schematics:
  ladder:
    caption: Every step closer to money is rarer and slower. The signal sits where the two meet.
    stages:
      - name: Day 0
        nodes: ["Visits the site | 4,000 a week"]
      - name: Day 0
        nodes: ["Signs up | 400 a week"]
      - name: Day 1
        nodes: ["Creates a training | 180 a week"]
      - name: Day 3
        nodes: ["Invites 3+ teammates | 60 a week · the signal"]
      - name: Day 16
        nodes: ["Pays | 24 a week"]
    lit: ["Invites 3+ teammates"]
---

Tell the ad platforms about the earliest event that reliably predicts revenue. Nothing earlier, nothing later.
{: .principle}

**Jordan** · ops manager · 60-person HVAC company · signs up for a free trial of a training tool
{: .specimen}

## The platforms are prediction machines

Google, Meta and LinkedIn don't place your ads by hand. Each runs a model that predicts who is likely to do *something*, and bids to reach them. You decide what that something is: the {% include gloss.html term="conversion" def="The action you tell an ad platform counts as a win. It learns to find more people who do it." %}.

The model learns from examples. Each time someone converts, it studies who they were and where they clicked, then looks for more people like them. That means it needs two things from you: **enough examples, quickly**. Meta, for instance, wants about 50 conversions a week in a campaign before it stops "learning" and settles down.

So the question isn't "what do we care about?" The answer to that is always money. The question is: **which event arrives early and often enough to teach the model, while still meaning money?**

## Early or accurate: pick the crossing point

Follow Jordan from his first visit to his first payment. Each step is closer to revenue, and each is rarer and later than the one before.

{% include schematic.html id="ladder" %}

If you tell the platforms "signups", you get plenty of examples on day 0, but most signups never pay. The model learns to find people who sign up, including students, competitors and the curious. If you tell them "payments", every example is real money, but there are only 24 a week and each one arrives 16 days after the click. The model learns too slowly to be useful.

The signal you want is the crossing point: the earliest step that is still a strong predictor of paying.

## Measure it, don't guess

This is a data question, and it has two numbers. For each candidate step, ask:

- **Of the people who did this, how many went on to pay?** If it's high, the signal is trustworthy. Data people call this {% include gloss.html term="precision" def="Of everyone the signal flags, the share who really pay." %}.
- **Of the people who paid, how many did this first?** If it's high, the signal doesn't miss many good customers. This is {% include gloss.html term="recall" def="Of everyone who really pays, the share the signal caught." %}.

Here are Jordan's candidates, measured on signups from a few months back, old enough to know who paid. The numbers are illustrative.

| Candidate signal | When | Per week | Went on to pay | Of payers, did this first |
|---|---|---|---|---|
| Signs up | day 0 | 400 | 6% | 100% |
| Creates a training | day 1 | 180 | 12% | 92% |
| **Invites 3+ teammates within 7 days** | **day 3** | **60** | **34%** | **85%** |
| Pays | day 16 | 24 | 100% | 100% |

"Invites 3+ teammates" wins. It arrives on day 3, happens 60 times a week (enough for the model), and someone who does it is more than five times as likely to pay as the average signup. It still catches 85% of eventual payers.

If you have a warehouse, the whole analysis is one query:

```sql
-- For each candidate event: how often, how early, and how predictive of paying.
select
  e.event_name,
  count(distinct e.account_id)                          as accounts,
  avg(case when p.account_id is not null then 1 else 0 end) as went_on_to_pay,
  median(datediff('day', a.signed_up_at, e.first_at))   as median_day
from first_events e           -- one row per account per candidate event, first time it happened
join accounts a using (account_id)
left join paid_accounts p using (account_id)
where a.signed_up_at >= '2026-04-01' and a.signed_up_at < '2026-07-01'  -- old enough to know who paid
  and e.first_at <= a.signed_up_at + interval '14 days'
group by 1
order by median_day;
```

Then try a few thresholds (1 teammate or 3? within 3 days or 7?) and pick the earliest version that clears all three bars: **about 50 a week, several times the average pay rate, and most payers caught.**

## Give the signal a value

The platforms can also bid by value, chasing a $5,000 customer harder than a $500 one. Your signal hasn't produced any money yet, so give it the money it *predicts*:

**value = chance it pays × first-year revenue** → 34% × $4,800 ≈ **$1,630**

Send $1,630 with each "invited 3+ teammates" event, and update it every quarter as the real rate changes.

## The same idea in other businesses

The crossing point exists in every business. It just has a different name.

| Business | Cheap, early signal | The signal worth sending | Where the truth lives |
|---|---|---|---|
| B2B services (Dana) | Fills in the contact form | **Books a call and fits the size and budget** | CRM: deal won |
| Studio (Maya) | Books the $39 intro | **Shows up and rebooks within 21 days** | Booking system: membership |
| SaaS (Jordan) | Signs up | **Invites 3+ teammates within 7 days** | Stripe: payment |

## Where it breaks

- **The signal is too rare.** Under about 50 a week and the platform never settles. Move one step earlier, or pool campaigns so each gets more examples.
- **You keep changing it.** Every change sends the model back to learning. Review it quarterly, not weekly.
- **The product team games it.** A new "invite your team!" pop-up can double invites without adding a single buyer. Re-check the pay rate after product changes.
- **You send several goals as equals.** The model chases the easiest one. Make one conversion *primary*, and send the rest as *secondary*, so they're reported but not optimized.
- **The real money never follows.** Still send the payment later, so your reports show revenue and not just predictions. ([Server-side tracking](server-side-tracking.html) covers how.)
{: .breaks}

Pull signups from three to six months ago, measure three or four candidate events against who paid, and set the earliest strong one as your primary conversion.
{: .takeaway}
