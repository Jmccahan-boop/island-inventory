# Swan's Island Year-End Inventory — App

A simple mobile web app for the fall closing-up inventory. It's pre-loaded
with all the spaces and items from your 2025 inventory, and shows last
year's count next to the input box for this year, so you can compare as
you go room to room.

## What's in this folder

- `index.html`, `style.css`, `app.js` — the app itself
- `data-seed.js` — your inventory structure (spaces + items) and the 2025
  counts, pulled from `2025_Year_End_Inventory.docx`
- `manifest.webmanifest`, `sw.js`, `icons/` — make it installable as an
  app icon on your home screen and usable offline

## How it works

- **Spaces** (Kitchen Closet, Kitchen Drawers, Upstairs Bathroom, etc.)
  are listed on the home screen, each showing how many items are flagged
  "need."
- Tap into a space to see each item, last year's note in grey, and a text
  box to type this year's count/notes, plus a "Need?" button to flag it
  for restocking.
- The **menu** (⋮ top right) has:
  - **Shopping / Need list** — everything flagged "need" this year, grouped by space
  - **Switch inventory** — jump back to any past inventory's numbers
  - **Start a new inventory** — pick the exact day, month, and year (via
    a date picker) to begin a fresh blank checklist, while keeping past
    inventories as reference
  - **Add a space** — for a new closet/cabinet you want to start tracking
  - **Export full inventory (text)** — copies the whole inventory
    as plain text, handy for emailing or printing
- The **Shopping / Need list** view also shows a plain-text version at
  the bottom with a "Copy to clipboard" button, so you can paste it
  straight into an email to yourself.
- You can add or delete individual items inside any space at any time —
  the checklist structure is yours to edit.
- Everything is saved right on the phone (browser local storage) — no
  account, no internet connection needed to use it day-to-day.

## Try it right now (no build needed)

1. Get these files onto your phone or a computer on the same network.
2. Easiest test: on a computer, `cd` into this folder and run
   `python3 -m http.server 8000`, then on your phone's browser go to
   `http://<your-computer's-IP>:8000`.
3. In Chrome on Android, tap the ⋮ menu → **Add to Home screen**. It'll
   behave like an installed app (own icon, full-screen, works offline)
   even before it's a "real" APK.

## Turning it into an installable Android app (.apk)

Since this is already a PWA (Progressive Web App), you don't need to
write Android/Kotlin code from scratch. Two common paths, easiest first:

1. **PWABuilder (no coding, free)** — Host these files somewhere with a
   public URL (see hosting options below), then go to
   https://www.pwabuilder.com, enter the URL, and it will generate a
   signed Android package (.apk/.aab) you can install directly or upload
   to the Play Store.
2. **Bubblewrap CLI** (Google's own tool, more control) —
   `npm install -g @bubblewrap/cli`, then `bubblewrap init --manifest=<url>/manifest.webmanifest`
   and `bubblewrap build`. Produces a signed APK locally.

### Where to host the files so PWABuilder can see them

Any of these work — pick whichever is easiest for you:
- GitHub Pages (free, just push this folder to a repo and enable Pages)
- Netlify or Vercel (drag-and-drop deploy, free tier)
- Any existing web host you already have

Once it's live at a URL, that's what you plug into PWABuilder.

## Notes on the data

- The "Spices" section reflects the 2023 spice checklist from your
  template (no quantities were tracked per spice — just presence), so
  those rows start blank for you to note counts if you'd like.
- A couple of garage cabinet items were marked in your notes as "not
  checked" in 2025 — those are included with no count so you can update
  them this round.
