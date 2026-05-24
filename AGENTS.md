# Agent Instructions

## Project

This project is an online service for generating simple legal documents.

Core flow:

Catalog -> Document page -> Document constructor -> PDF with watermark -> Payment -> PDF without watermark

MVP is a one-time PDF purchase service, not a full SaaS platform.

## Read before coding

Default reading order:

1. `PROJECT_CONTEXT.md`
2. `RULES.md`

Read `ROADMAP.md` only when the task is about phases, sequencing, or MVP readiness.

Read `PROJECT_BRIEF.md` only when the task is product-level, ambiguous, or needs detailed context about future documents, SEO, positioning, or long-term architecture.

## Tech stack

- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: Next.js API routes / server actions
- PDF: HTML to PDF with Playwright/Puppeteer or another server-side generator
- Drafts: localStorage for MVP
- Database later: Supabase / PostgreSQL
- Payments: backend-verified clean PDF access

## Working rules

- Make small focused changes.
- Do not rewrite architecture without explicit instruction.
- Do not rename files or routes unless necessary.
- Do not change legal document meaning unless explicitly asked.
- If the task is about design, stay in black / white / gray style.
- If the task is about PDF, do not change UI unless required.
- If the task is about payment, do not change constructor or SEO pages unless required.
- Read `docs/NEW_DOCUMENT_RULES.md` only when creating a new document or new document page from scratch.
- For local work, treat `http://localhost:3021` as the default project URL for running and checking the app.
- When adding or changing document PDF text, check typography: short markers like `г.`, `ул.`, `д.`, `кв.`, `№` should stay with the next word/number via the shared typography helper.
- Do not add one-off typography regexes per document when the shared helper can cover the case.
- New document constructors should use the inline document-filling pattern from the receipt constructor by default, with fields placed inside meaningful document text blocks.
- New document templates should include `sampleValues`; document page examples must be rendered through `buildDocumentRenderable` from those values, not through slug-specific sample logic.
- For new documents, the user may provide only title, source template, and price. Use the existing receipt and enforcement proceeding pages as the reference pattern for page header, inline constructor, SEO structure, right-side sample preview, sampleValues, and PDF output. Derive slug, category, fields, fill points, conditional blocks, SEO, and FAQ yourself. Ask only when a choice changes legal meaning.
- Apply this only when creating a new document page: use the standard hero/SEO description automatically: `Заполните образец {document title phrase} онлайн без ворда и ручной верстки. Укажите данные и сервис автоматически подготовит документ в PDF формате.` Derive `{document title phrase}` yourself; ask only if the wording changes legal meaning.
- Preserve the source template text and layout as closely as possible in the preview and generated PDF. Do not rewrite or change the document text unless explicitly asked.

## Reporting

After every task, report:

- changed files;
- what was changed;
- how to test manually;
- any risks or unfinished parts.

Do not claim completion if build, lint, or manual checks fail.
