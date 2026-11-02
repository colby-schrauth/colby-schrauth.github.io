---
title: "The Bootstrap"
category: Data
description: How to measure uncertainty for almost any statistic, using only your data and a loop. A plain-language guide with working Python and live charts.
charts: bootstrap-charts.js
---

To find out how much a number could move, resample your own data thousands of times and watch how much it moves.
{: .principle}

**The studio Maya joins** · four locations · testing a new homepage · 15 sessions per version, one left open for 18 minutes
{: .specimen}

## The problem

The studio logs 15 visits to its homepage and takes the median session: 3.10 minutes. How sure is that number? With a different 15 visitors, how far would it move?

For the **mean** there's a tidy answer. Its {% include gloss.html term="standard error" def="How much a statistic would typically move from one sample to the next." %} is s / √n: the sample's spread over the square root of its size. A 95% interval is roughly the mean ± 2 standard errors.

For most other statistics there's no formula you'd want to use:

- **Medians and percentiles.** The standard error depends on how tightly the true data is packed around that point, which you don't know.
- **Ratios**, like revenue per session. A formula exists (the {% include gloss.html term="delta method" def="A way to approximate the uncertainty of a function of averages, using their variances and covariances." %}), but it's easy to get wrong.

## The trick

Treat your sample as a stand-in for everyone. Draw from it **with replacement**, as many rows as you started with, so some sessions repeat and some get skipped. Compute the median. Do that 10,000 times.

{% include chart.html id="resample" caption="One resample: same 15 slots, drawn from your own data" button="Draw another" note="Crossed out = skipped this time · bold = drawn more than once · brass = the middle slot, this resample's median" fallback="Each resample draws 15 sessions from the original 15, so some repeat and some are left out." %}

The spread of those 10,000 medians stands in for the {% include gloss.html term="sampling distribution" def="The spread of values a statistic would take across many samples of the same size." %}. The middle 95% of them is your 95% interval. No formula needed.

{% include chart.html id="medians" caption="The middle 95% of 10,000 medians is the interval" note="Brass bars = the middle 95% · gray = the 2.5% cut from each tail · press the button to watch a fresh run fill in" fallback="10,000 bootstrap medians give a 95% interval of 2.70 to 4.90 minutes, around an observed median of 3.10." %}

The interval runs from 2.70 to 4.90 minutes. It isn't centered on 3.10, because the data is skewed. The bootstrap picks that up on its own.

Bradley Efron introduced the idea in 1979. It replaced a lot of math with a loop.

## Why not just use the mean?

Because the mean often answers the wrong question. Pick the statistic that matches what you care about, not the one with the easiest formula.

- **Skewed data.** If 99 visitors stay 2 minutes and one leaves a tab open for 10 hours, the mean is about 8 minutes, which describes nobody. The median is 2.
- **Outliers swing conclusions.** One big spender landing in version B can make B win on the mean when nothing really changed.
- **Some questions are about the tail.** For page load time, the 90th percentile matters more than the average.

The mean is still the right call for totals, and when the data isn't wildly skewed. The bootstrap just means you never settle for a worse statistic because the math is inconvenient.

## What 95% means

Think of a ring toss. A peg is hidden behind a curtain: the true median for *all* visitors. Each sample lets you throw one ring, your interval. A 95% method means about 95 of 100 throws land around the peg.

The peg doesn't move; the ring does. You can't tell whether any one throw hit. A wider ring (99%) catches the peg more often but says less about where it is. More data lets you throw a smaller ring.

## Comparing two groups

The studio's new homepage (B) has a median session of 4.60 minutes; the old one (A) has 3.60. Is the extra minute real, or luck in who landed where?

Resample each group **separately**, take each median, and record B minus A. Do that 10,000 times.

{% include chart.html id="gaps" caption="Zero sits outside the interval, so B's longer sessions probably aren't luck" note="Brass bars = the middle 95% of 10,000 gaps · the coral line is zero, no difference at all" fallback="10,000 bootstrap gaps give a 95% interval of 0.20 to 1.80 minutes. Zero is outside it." %}

The interval runs from 0.20 to 1.80 minutes. Every plausible gap is positive, so B is probably better, though the effect could be as small as about 12 seconds. If zero had landed inside, "no difference" would still be on the table.

This works like a significance test. A {% include gloss.html term="p-value" def="How often luck alone would produce a gap this big if there were truly no difference." %} below 0.05 and a 95% interval that excludes zero give the same verdict. Near the edge they can disagree slightly; the bootstrap is an approximation. The interval also tells you *how big* the effect plausibly is, which a p-value doesn't.

## In Python

The whole method is a loop. Part 1, one median:

```python
boot_medians = np.empty(N_BOOT)
for i in range(N_BOOT):
    resample = rng.choice(sessions, size=len(sessions), replace=True)
    boot_medians[i] = np.median(resample)

low, high = np.percentile(boot_medians, [2.5, 97.5])
```

Part 2, the gap between two groups. Each is resampled on its own:

```python
boot_gaps = np.empty(N_BOOT)
for i in range(N_BOOT):
    a = rng.choice(group_a, size=len(group_a), replace=True)
    b = rng.choice(group_b, size=len(group_b), replace=True)
    boot_gaps[i] = np.median(b) - np.median(a)

low, high = np.percentile(boot_gaps, [2.5, 97.5])
```

SciPy does the same in one call. It uses {% include gloss.html term="BCa" def="Bias-corrected and accelerated: a refinement of the percentile interval that adjusts for skew." %} by default and gives 0.20 to 1.90, nearly the same:

```python
from scipy import stats

def median_gap(a, b):
    return np.median(b) - np.median(a)

res = stats.bootstrap((group_a, group_b), median_gap,
                      n_resamples=10_000, random_state=42)
print(res.confidence_interval)
```

<details markdown="1">
<summary>The full script, with its data</summary>

```python
import numpy as np
from scipy import stats

rng = np.random.default_rng(42)  # fixed seed so results are reproducible
N_BOOT = 10_000

# Part 1: how uncertain is the median session length?
sessions = np.array([2.1, 3.4, 1.8, 4.2, 2.9, 3.1, 5.6, 2.4,
                     3.8, 2.2, 4.9, 3.0, 2.7, 6.1, 18.5])

boot_medians = np.empty(N_BOOT)
for i in range(N_BOOT):
    resample = rng.choice(sessions, size=len(sessions), replace=True)
    boot_medians[i] = np.median(resample)

low, high = np.percentile(boot_medians, [2.5, 97.5])
print(f"Median: {np.median(sessions):.2f}  95% CI: [{low:.2f}, {high:.2f}]")
# Median: 3.10  95% CI: [2.70, 4.90]

# Part 2: did the new homepage (B) change the median session length?
group_a = np.array([3.1, 2.4, 4.0, 3.6, 2.8, 4.4, 3.9, 2.2,
                    5.1, 3.3, 4.7, 2.9, 3.5, 4.1, 12.0])   # old page
group_b = np.array([4.2, 3.8, 5.0, 4.6, 3.9, 5.5, 4.4, 3.1,
                    6.0, 4.8, 5.2, 3.6, 4.9, 4.3, 15.2])   # new page

boot_gaps = np.empty(N_BOOT)
for i in range(N_BOOT):
    a = rng.choice(group_a, size=len(group_a), replace=True)
    b = rng.choice(group_b, size=len(group_b), replace=True)
    boot_gaps[i] = np.median(b) - np.median(a)

low, high = np.percentile(boot_gaps, [2.5, 97.5])
print(f"Gap: {np.median(group_b) - np.median(group_a):.2f}  95% CI: [{low:.2f}, {high:.2f}]")
# Gap: 1.00  95% CI: [0.20, 1.80]

# The same, in one call (BCa by default)
def median_gap(a, b):
    return np.median(b) - np.median(a)

res = stats.bootstrap((group_a, group_b), median_gap,
                      n_resamples=N_BOOT, random_state=42)
print(res.confidence_interval)
# about [0.20, 1.90]
```

</details>

Two experiments worth running. Change the 12.0 in group A to 120.0: the medians barely move, the mean jumps. Then delete a few rows from each group: the gap interval widens and may swallow zero. Smaller sample, wider ring.

The numbers here are illustrative, made up so every step is easy to follow. The charts run the real bootstrap in your browser.

## Names worth knowing

- **Percentile bootstrap.** Taking the 2.5th and 97.5th percentiles, as here.
- **BCa bootstrap.** The more accurate upgrade when the distribution is skewed. SciPy's default.
- **Permutation test.** The close cousin: shuffle the group labels to simulate no difference, then see how unusual your real gap is.
- **Estimation statistics.** Reporting effect sizes with intervals, not just p-values.

## Where it breaks

- **Very small samples.** Fifteen rows is a thin stand-in for everyone. Press "Run it again" above: the interval's edges jump between data values from run to run. Collect more data before you trust the edges.
- **Extreme statistics, like the maximum.** A resample can never exceed the largest value you saw, so the interval is stuck below it. Use a model of the tail instead.
- **Dependent data, like time series.** Resampling single rows breaks the order that matters. Use the {% include gloss.html term="block bootstrap" def="Resampling chunks of consecutive observations, so the patterns inside each chunk survive." %}.
- **A biased sample.** The bootstrap measures luck, not bias. If the 15 sessions all came from one location, no amount of resampling fixes that.
{: .breaks}

Take one median or ratio you report each week, run the ten-line loop on it, and put the interval next to the number.
{: .takeaway}
