---
title: Server-Side Tracking
playbook: digital-marketing
part: Measure
order: 8
description: Why browser tracking undercounts, and how sending events from your own server and warehouse fixes it.
traces:
  browser:
    caption: With browser tracking only, the platforms lose Jordan the moment he lands. Your own systems record the money, but nobody passes it on.
    moments: [Ad click, Lands, Signs up, Invites team, Pays]
    rows:
      - system: Google Ads
        see: on lost lost off off
      - system: GA4
        see: off lost lost off off
      - system: Your own record
        see: off off on on on
  server:
    caption: Same Jordan, same ad blocker. Your own record now starts at the landing, and passes everything on.
    moments: [Ad click, Lands, Signs up, Invites team, Pays]
    rows:
      - system: Google Ads
        see: on on on back back
      - system: GA4
        see: off on on on back
      - system: Your own record
        see: off on on on on
schematics:
  routes:
    caption: Three places an event can come from. The further right it starts, the more reliable it is.
    stages:
      - name: 1 · In the browser
        nodes: ["Website tags | what most sites do", "App tags"]
      - name: 2 · On your server
        nodes: ["Tagging server | data.yoursite.com", "App backend | signup, activation"]
      - name: 3 · In your warehouse
        nodes: ["Product + Stripe + CRM | joined", "Reverse ETL | e.g. Hightouch"]
      - name: The platforms
        nodes: ["Google Ads", "GA4", "Meta", "LinkedIn"]
    lit: ["Tagging server", "App backend", "Product + Stripe + CRM", "Reverse ETL"]
---

The browser is an unreliable witness. Keep your own record, and send it on yourself.
{: .principle}

**Jordan** · ops manager · 60-person HVAC company · browses on Safari with an ad blocker · accepted the cookie banner
{: .specimen}

## How tracking normally works

On most sites, every platform puts its own small script on the page: a {% include gloss.html term="tag" def="A snippet of code on your site that sends what visitors do to another company, such as Google or Meta. Also called a pixel." %}. When Jordan does something, his browser sends a note about it straight to Google, Meta, LinkedIn and anyone else listening. Your own business never keeps a copy. You're relying on Jordan's browser to deliver every message.

Increasingly, it doesn't.

## Why the browser loses things

- **Ad blockers** stop the scripts entirely. They're common among exactly the buyers B2B tools want: technical, privacy-minded people at work.
- **Safari and Firefox limit tracking cookies.** Safari, for example, deletes cookies set by these scripts after 7 days, so a returning visitor looks brand new and the original ad click is forgotten.
- **Some visitors decline consent.** That's their right, and you must respect it. This chapter is not a way around it.
- **The most valuable moments never happen in the browser.** Jordan inviting his team, his card being charged, a sales rep closing the deal: those happen in your app's backend, in Stripe and in your CRM.

Here's what each platform actually sees of Jordan with browser tracking only:

{% include trace.html id="browser" %}

Google Ads saw the click, because that happened on Google's side. After that, the ad blocker cut every thread. Meanwhile your own systems did record the signup, the invites and the payment, but nothing ties them back to the ad, and nothing sends them on. The signal from [the last chapter](choosing-the-signal.html) never arrives, so Google's model keeps optimizing blind.

## Fix one: a tagging server on your own domain

Instead of the browser talking to ten companies, it talks to one place you control, such as `data.yoursite.com`. That {% include gloss.html term="tagging server" def="A small server you run (often Google Tag Manager's server version) that receives events from your site and forwards them to each platform." %} then forwards each event to the platforms.

- **Fewer events get blocked.** The browser is talking to your own domain, not to a known tracking domain.
- **Cookies last longer.** Cookies set by your own server aren't cut to 7 days the way script cookies are.
- **You decide what leaves.** You can strip personal details before anything reaches a platform.
- **The page gets faster.** One stream replaces a pile of scripts.

You can host Google Tag Manager's server version on Google Cloud yourself, or pay a managed host to run it for you.

## Fix two: send events from your systems, not the page

This is the bigger lever. The events that matter most (signups, activation, payments) are already recorded in your own systems. Send them to the platforms from there:

- **Straight from the app backend** for things that happen in the product, like Jordan signing up or inviting his team.
- **From the warehouse** for things that are only known later or need joining, like "paid $4,800" from Stripe or "deal won" from the CRM. A {% include gloss.html term="reverse ETL" def="A tool that copies rows from your warehouse out to other apps, such as ad platforms or your CRM. Hightouch and Census are common ones." %} tool syncs these on a schedule.

Each platform has a doorway for this: Meta's Conversions API, LinkedIn's Conversions API, GA4's Measurement Protocol, and Google Ads' enhanced and offline conversions.

{% include schematic.html id="routes" %}

Run the same day again with both fixes in place:

{% include trace.html id="server" %}

Your own record now starts at the landing, because the tagging server caught it and saved the click ID. From there it hands the platforms what their scripts missed. The ringed dots are events the platforms only know about because you sent them back. That includes Jordan's payment, which no browser could ever have reported.

## How the platforms know it's Jordan

An event sent from your server has to be matched to the person who clicked the ad. There are two kinds of key:

| Key | What it is | Where you get it | Match |
|---|---|---|---|
| **Click IDs** | gclid (Google), fbclid (Meta), li_fat_id (LinkedIn) | In the landing page's URL. Save it on the user's record at signup | Exact |
| **Hashed email** | The email address, lowercased and trimmed, then scrambled with SHA-256 | Signup or booking form | Good |
| **Hashed phone** | The phone number in international format, then scrambled | Signup or booking form | Good |

{% include gloss.html term="Hashing" def="Turning a value into a fixed scramble that can't be reversed. The platform scrambles its own copy the same way and compares." %} lets the platform match Jordan without you ever sending his actual email address.

## Where it breaks

- **Everything counts twice.** If the browser tag and the server both send "signed up", the platform sees two. Give each event one ID and send that same ID from both, so the platform can drop the duplicate.
- **The hashes don't match.** "Jordan@HVAC.com " and "jordan@hvac.com" scramble differently. Lowercase and trim before hashing, every time.
- **Nobody saved the click ID.** If the gclid isn't stored at signup, nothing later can be tied to the ad. Capture it on landing and keep it with the user.
- **The news arrives too late.** Platforms only accept events within a window: about a week for Meta's website events, and up to 90 days after the click for Google Ads. Sync daily.
- **It's used to dodge consent.** Sending data about people who declined is a legal risk and a breach of trust. Pass each visitor's consent choice along and honor it on the server.
- **Raw personal data leaks out.** Only ever send hashed emails and phone numbers, never the originals.
{: .breaks}

Take the one signal you chose in the last chapter and send it from your backend, with the saved click ID and a hashed email. Add the tagging server after that.
{: .takeaway}
