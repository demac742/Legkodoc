# New Document Rules

Read this file only when creating a new document or new document page from scratch.

Do not read this file for edits to existing documents, pages, SEO, PDF, constructors, design, payment, or bugs unless the user explicitly asks.

Use the existing project rules in `AGENTS.md`, `PROJECT_BRIEF.md`, and `ROADMAP.md` as the base. This file adds only the extra rules below.

## Page and config

- Use the main document route: `/documents/[slug]`.
- Add new documents through `src/lib/documents.ts` and `DocumentTemplate` whenever possible.
- Do not create a separate custom page implementation for a document unless the shared route cannot support it.
- H1 format: `[Document Title] - заполнить и скачать онлайн`.
- Use the standard description under H1 already defined in `AGENTS.md`.
- Use `price` as the displayed document price.

## Preview and sampleValues

- Show the filled sample on the right from `sampleValues`.
- Build preview through the shared renderable flow, not through slug-specific sample logic.
- Preview and final PDF must use the same template/render logic.

## Constructor and SEO

- Build the constructor from `fields` and `constructorSteps`.
- Keep one shared SEO page structure for all documents.
- Write SEO block text uniquely for the specific document.
- Do not add negative sections like `Кому не подходит` for new documents.
- Explain legal terms, abbreviations, document numbers, and where to get required details.

## PDF and exceptions

- Preview and PDF must match the provided source template as closely as possible in text, structure, header, spacing, paragraphs, signatures, and overall layout.
- Slug-specific solutions are allowed only as an exception, with a short reason in the task report.
