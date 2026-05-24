# Project Roadmap

## Principle

Move phase by phase.

Do not move to the next phase until the current one works.

Start with one ideal working flow, then scale:

Catalog -> Document page -> Constructor -> PDF with watermark -> Payment -> Clean PDF

First document:

Receipt for receiving money.

## Phase 1 - Documentation

Goal:
Prepare project documentation before coding.

Done when:

- `PROJECT_BRIEF.md` exists;
- `PROJECT_CONTEXT.md` exists;
- `AGENTS.md` exists;
- `RULES.md` exists;
- `ROADMAP.md` exists.

## Phase 2 - Base project structure

Goal:
Create a clean technical foundation.

Deliver:

- Next.js;
- TypeScript;
- Tailwind CSS;
- base folder structure;
- dev / build / lint scripts;
- minimal start page.

Done when:

- project runs locally;
- start page opens;
- build and lint pass.

## Phase 3 - Home page and catalog

Goal:
Build the public entry surface.

Deliver:

- home page;
- document catalog;
- document cards;
- document categories;
- responsive layout;
- calm monochrome visual style.

Done when:

- user sees document list;
- user can open a document page;
- interface feels like a modern document service.

## Phase 4 - First document page

Goal:
Build the SEO page for the first document.

Deliver:

- URL;
- H1;
- description;
- price;
- required data block;
- how to fill block;
- what to do after download block;
- FAQ;
- disclaimer;
- "Fill online" CTA.

Done when:

- page opens;
- page has basic SEO structure;
- user can move to filling flow.

## Phase 5 - Document configuration system

Goal:
Make documents config-driven.

Deliver:

- config fields for id, slug, title, category, description, price;
- config fields for form fields, SEO, template, disclaimers.

Done when:

- first document is config-driven;
- next document can be added without rewriting core flow.

## Phase 6 - First constructor

Goal:
Build the guided flow for the receipt document.

Deliver:

- question flow;
- input fields;
- localStorage draft save;
- draft restore;
- required-field validation.

Done when:

- user can fill the receipt;
- data survives refresh;
- validation is clear.

## Phase 7 - Watermarked PDF

Goal:
Generate the free PDF version.

Deliver:

- PDF generation from user data;
- "ЛЕГКОДОК" watermark on every page;
- repeated diagonal watermark;
- readable text;
- downloadable free PDF.

Done when:

- PDF is generated;
- watermark is correct;
- clean PDF is unavailable without payment.

## Phase 8 - Payment and clean PDF

Goal:
Add one-time payment for watermark removal.

Deliver:

- order creation;
- order statuses;
- payment handoff;
- backend payment verification;
- clean PDF only after confirmed payment;
- direct download after payment.

Done when:

- user pays;
- backend confirms payment;
- user downloads clean PDF.

## Phase 9 - SEO foundation

Goal:
Prepare the site for indexing.

Deliver:

- title and meta description;
- human-readable URLs;
- sitemap.xml;
- robots.txt;
- Open Graph;
- FAQ blocks;
- internal links.

Done when:

- home and document page have basic SEO metadata;
- sitemap and robots exist;
- pages are understandable for users and search engines.

## Phase 10 - Next documents

Goal:
Add documents only after the first flow is stable.

Priority order:

1. Loan agreement
2. Car sale agreement
3. Car handover act
4. Apartment rent agreement
5. Service agreement

Each new document must include:

- config;
- fields;
- template;
- price;
- SEO page;
- disclaimer;
- PDF generation.

## Phase 11 - Future features

Not for MVP:

- account area;
- server-side drafts;
- reusable profile autofill;
- DOCX;
- email delivery;
- admin panel;
- promo codes;
- document bundles;
- document history.
