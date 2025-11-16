# QuietCV

_A calm little CV builder for people who don’t want shouting templates._

QuietCV is a minimal, bilingual (EN/DE) CV editor built with React.  
It focuses on:

- **1–2 page CVs** with a clean, German-style layout
- **English / German toggle** for all section labels and headings
- **Local-only data** – nothing is sent to a server
- **Print / Save as PDF** for easy export

You fill your CV, switch the language if needed, and export. That’s it.  
No account, no login, no hidden storage.

---

## Why?

Sometimes you just want a CV that:

- looks **quiet, modern, and readable**
- doesn’t force you into “creative” Word art
- respects **German standards** (Berufserfahrung, Ausbildung, klare Struktur)
- plays nicely with **AI/ATS bots** (clear headings, keywords, no chaos)

QuietCV is my small tool for that:  
a single-page app where you can stay focused on your story, not on fighting layouts.

---

## Features

- **Bilingual UI (EN / DE)**

  - Toggle CV language in the header
  - Section titles & helper texts switch between English and German
  - Perfect if you apply in both languages and want the same structure

- **Minimal CV layout**

  - A4 layout, optimized for **1–2 pages**
  - Main sections:
    - Profile
    - Contact
    - Work Experience (multiple entries)
    - Education (multiple entries)
    - Skills (tech / other)
    - Languages
    - Projects (optional)
    - Achievements (optional)
    - Interests

- **Profile photo**

  - Paste a picture URL **or**
  - Upload a local image (stored as a data URL)
  - Rounded preview in the header

- **Per-section helpers**

  - Achievements/tasks as **1 line = 1 bullet**
  - Skills as comma-separated lists → rendered as tags
  - Languages and interests also parsed from simple text

- **Privacy-friendly by design**

  - All data lives in your **browser memory** only
  - No backend, no database, no tracking
  - To keep your CV, use **Print → Save as PDF**

- **Tiny intro modal**
  - Short explanation when you first open QuietCV
  - Mentions one-page vs two-page logic, German standards, and privacy
  - Can be dismissed; stored in `localStorage` so it doesn’t nag you every time

---

## Tech Stack

- **Frontend:** React + Vite
- **Styling:** plain CSS, with CSS variables for themes
- **Language logic:** simple label maps for EN/DE
- **Storage:** none – everything is in-memory in the browser

No backend. No external API. No build server. Just a small SPA.

---

## Getting Started (Development)

Clone the repo:

```bash
git clone https://github.com/<your-username>/quiet-cv.git
cd quiet-cv
```
