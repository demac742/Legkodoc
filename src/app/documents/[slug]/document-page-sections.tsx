import Link from "next/link";
import { documents } from "@/lib/documents";
import type {
  DocumentPageContent,
  DocumentSeoTemplate,
  DocumentTemplate,
} from "@/lib/types";

type ArticleSection = NonNullable<DocumentPageContent["articleSections"]>[number];

function normalizeDocumentTitle(value: string) {
  return value.toLowerCase().replace(/ё/g, "е").trim();
}

const documentHrefByTitle = new Map(
  documents.map((document) => [
    normalizeDocumentTitle(document.title),
    `/documents/${document.slug}`,
  ]),
);

export function DocumentInfoSection({ page }: { page: DocumentPageContent }) {
  return (
    <section className="border-y border-[#d9d9d4] bg-white/70">
      <div className="page-shell section">
        <h2 className="text-4xl font-semibold">Проверьте перед скачиванием</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <InfoBlock title="Кому подходит" items={page.suitableFor} />
          <InfoBlock title="Когда не подходит" items={page.notSuitableFor} />
          <InfoBlock title="Какие данные понадобятся" items={page.requiredData} />
          <InfoBlock title="Что делать после скачивания" items={page.afterDownload} />
        </div>
      </div>
    </section>
  );
}

export function DocumentSeoSection({
  document,
  usesRichDocumentPage,
}: {
  document: DocumentTemplate;
  usesRichDocumentPage: boolean;
}) {
  if (document.seoTemplate) {
    return (
      <DocumentSeoTemplateBlock
        documentSlug={document.slug}
        page={document.page}
        seoTemplate={document.seoTemplate}
      />
    );
  }

  if (usesRichDocumentPage) {
    return <SimpleDocumentSeoBlock document={document} />;
  }

  return null;
}

export function RelatedDocumentsBlock({ items }: { items: string[] }) {
  const relatedDocuments = items.flatMap((item) => {
    const href = documentHrefByTitle.get(normalizeDocumentTitle(item));

    return href ? [{ href, title: item }] : [];
  });

  if (relatedDocuments.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 border-t border-[#d9d9d4] pt-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="sans text-sm font-bold uppercase tracking-[0.14em] text-[#70706b]">
            Следующий шаг
          </p>
          <h3 className="mt-2 text-3xl font-semibold">Похожие документы</h3>
        </div>
        <p className="max-w-xl leading-7 text-[#4a4a47]">
          Если текущий шаблон не закрывает всю ситуацию, можно посмотреть
          похожие документы и выбрать более подходящий формат.
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {relatedDocuments.map((item) => (
          <Link
            className="group rounded-[22px] border border-[#d9d9d4] bg-white/82 p-5 transition hover:border-[#111111] hover:bg-white"
            href={item.href}
            key={item.title}
          >
            <span className="block text-2xl font-semibold">{item.title}</span>
            <span className="mt-3 block leading-7 text-[#4a4a47]">
              Открыть в каталоге
              <span className="ml-2 transition group-hover:ml-3" aria-hidden="true">
                →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <article className="rounded-[24px] border border-[#d9d9d4] bg-[#f8f8f5] p-6 shadow-[0_14px_34px_rgba(17,17,17,0.035)] md:p-7">
      <h3 className="text-2xl font-semibold md:text-3xl">{title}</h3>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li className="flex gap-3 leading-7 text-[#42423f]" key={item}>
            <span className="mt-[10px] h-2 w-2 shrink-0 rounded-full bg-[#111111]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function SimpleDocumentSeoBlock({ document }: { document: DocumentTemplate }) {
  return (
    <section className="border-b border-[#d9d9d4] bg-[#f8f7f4]">
      <div className="page-shell section">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="panel p-6 md:p-8">
            <p className="sans text-sm font-bold uppercase tracking-[0.14em] text-[#70706b]">
              Справочная информация
            </p>
            <h2 className="mt-3 text-4xl font-semibold">{document.title}</h2>
            <p className="mt-5 text-lg leading-8 text-[#3f3f3c]">
              {document.description} Конструктор помогает собрать типовой текст,
              проверить данные перед скачиванием и получить PDF с водяным знаком
              для предварительной проверки.
            </p>
          </article>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <SeoSignalCard
              eyebrow="01"
              title="Заполнение онлайн"
              text="Поля сгруппированы по смыслу: стороны, реквизиты документа, сумма и дополнительные данные."
            />
            <SeoSignalCard
              eyebrow="02"
              title="PDF можно проверить"
              text="Бесплатная версия формируется с водяным знаком, чтобы сначала сверить текст и реквизиты."
            />
            <SeoSignalCard
              eyebrow="03"
              title="Чистый файл после оплаты"
              text="PDF без водяного знака доступен только после подтверждения оплаты на backend."
            />
          </div>
        </div>

        <section className="mt-10">
          <article className="panel p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="sans text-sm font-bold uppercase tracking-[0.14em] text-[#70706b]">
                  Подготовка
                </p>
                <h3 className="mt-3 text-3xl font-semibold">
                  Что понадобится для заполнения
                </h3>
                <p className="mt-4 leading-7 text-[#4a4a47]">
                  Перед заполнением подготовьте данные из исходных документов,
                  сведения о сторонах и реквизиты, которые должны попасть в
                  итоговый PDF.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <SeoChecklist
                  title="Какие данные подготовить"
                  items={document.page.requiredData}
                />
                <article className="rounded-lg border border-[#d9d9d4] bg-white/78 p-6">
                  <h4 className="text-2xl font-semibold">Как заполнить онлайн</h4>
                  <BulletList items={document.page.howToFill} />
                </article>
              </div>
            </div>
          </article>
        </section>
      </div>
    </section>
  );
}

function DocumentSeoTemplateBlock({
  documentSlug,
  page,
  seoTemplate,
}: {
  documentSlug: string;
  page: DocumentPageContent;
  seoTemplate: DocumentSeoTemplate;
}) {
  const sections = page.articleSections ?? [];
  const intro = sections[0];
  const supportingSection = sections[1];
  const requiredData = sections[2];
  const interestAndPenalty = sections.find(isInterestPenaltySection);
  const showInterestAndPenalty =
    documentSlug === "raspiska-o-poluchenii-deneg" &&
    Boolean(interestAndPenalty?.paragraphs[0] && interestAndPenalty.paragraphs[1]);
  const topicSections = sections
    .slice(3)
    .filter((section) => section !== interestAndPenalty)
    .filter((section) => !isMistakesSection(section));

  return (
    <section className="border-b border-[#d9d9d4] bg-[#f8f7f4]">
      <div className="page-shell section">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="panel p-6 md:p-8">
            <p className="sans text-sm font-bold uppercase tracking-[0.14em] text-[#70706b]">
              Справочная информация
            </p>
            <h2 className="mt-3 text-4xl font-semibold">Разобраться за 2 минуты</h2>
            <div className="mt-5 grid gap-4 text-lg leading-8 text-[#3f3f3c]">
              {intro?.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {seoTemplate.signals.map((item) => (
              <SeoSignalCard
                eyebrow={item.eyebrow}
                key={item.title}
                text={item.text}
                title={item.title}
              />
            ))}
          </div>
        </div>

        <SeoUseCasesBlock useCases={seoTemplate.useCases} />

        {supportingSection ? (
          <div className="mt-10">
            <SeoArticleCard compact section={supportingSection} />
          </div>
        ) : null}

        <SeoPreparationBlock
          howToFill={page.howToFill}
          preparation={seoTemplate.preparation}
          requiredData={page.requiredData}
          section={requiredData}
        />

        <div className="mt-10 grid gap-6">
          <SeoTopicSections sections={topicSections} />
          {showInterestAndPenalty ? (
            <InterestPenaltyBlock section={interestAndPenalty} />
          ) : null}
          <LegalReferencePanel legalReferences={seoTemplate.legalReferences} />
        </div>

        <SeoMistakesBlock mistakes={seoTemplate.mistakes} />

      </div>
    </section>
  );
}

function SeoTopicSections({ sections }: { sections: ArticleSection[] }) {
  if (sections.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="sans text-sm font-bold uppercase tracking-[0.14em] text-[#70706b]">
            Детали документа
          </p>
          <h3 className="mt-2 text-3xl font-semibold">
            Что важно понимать перед заполнением
          </h3>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section) => {
          if (isComparisonSection(section)) {
            return <SeoComparisonCard key={section.title} section={section} />;
          }

          if (isSplitSection(section)) {
            return (
              <SeoArticleCard
                compact
                key={section.title}
                section={section}
                variant="split"
              />
            );
          }

          return <SeoArticleCard compact key={section.title} section={section} />;
        })}
      </div>
    </section>
  );
}

function SeoComparisonCard({ section }: { section: ArticleSection }) {
  const comparisonLabels = getComparisonLabels(section.title);

  return (
    <article className="panel overflow-hidden">
      <div className="border-b border-[#d9d9d4] p-6">
        <p className="sans text-xs font-bold uppercase tracking-[0.14em] text-[#70706b]">
          Сравнение
        </p>
        <h3 className="mt-2 text-3xl font-semibold">{section.title}</h3>
      </div>
      <div className="grid gap-0">
        {section.paragraphs.map((paragraph, index) => (
          <div
            className="border-t border-[#d9d9d4] p-6 leading-7 text-[#3f3f3c] first:border-t-0"
            key={paragraph}
          >
            <p className="sans mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#70706b]">
              {comparisonLabels[index] ?? `Пункт ${index + 1}`}
            </p>
            <p>{paragraph}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function SeoPreparationBlock({
  requiredData,
  howToFill,
  preparation,
  section,
}: {
  requiredData: string[];
  howToFill: string[];
  preparation: DocumentSeoTemplate["preparation"];
  section?: ArticleSection;
}) {
  if (!section) {
    return null;
  }

  return (
    <section className="mt-10">
      <article className="panel p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="sans text-sm font-bold uppercase tracking-[0.14em] text-[#70706b]">
              {preparation.eyebrow}
            </p>
            <h3 className="mt-3 text-3xl font-semibold">{preparation.title}</h3>
            <div className="mt-4 grid gap-4 leading-7 text-[#4a4a47]">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <SeoChecklist title={preparation.checklistTitle} items={requiredData} />
            <article className="rounded-lg border border-[#d9d9d4] bg-white/78 p-6">
              <h4 className="text-2xl font-semibold">{preparation.howToFillTitle}</h4>
              <BulletList items={howToFill} />
            </article>
          </div>
        </div>
      </article>
    </section>
  );
}

function InterestPenaltyBlock({ section }: { section?: ArticleSection }) {
  if (!section) {
    return null;
  }

  const [interestText, penaltyText] = section.paragraphs;

  return (
    <article className="overflow-hidden rounded-[28px] border border-[#d9d9d4] bg-white shadow-[0_18px_48px_rgba(17,17,17,0.045)]">
      <div className="border-b border-[#d9d9d4] bg-[#f8f7f4] p-6 md:p-7">
        <p className="sans text-xs font-bold uppercase tracking-[0.14em] text-[#70706b]">
          Условия займа
        </p>
        <h3 className="mt-2 max-w-3xl text-3xl font-semibold">
          Проценты и пени: что указывать в расписке
        </h3>
        <p className="mt-4 max-w-3xl leading-7 text-[#4a4a47]">
          Эти условия часто путают при заполнении расписки, но в документе они
          отвечают за разные ситуации.
        </p>
      </div>

      <div className="grid gap-0 md:grid-cols-2">
        <div className="border-b border-[#d9d9d4] p-6 md:border-b-0 md:border-r md:p-7">
          <p className="sans text-xs font-bold uppercase tracking-[0.14em] text-[#70706b]">
            Проценты
          </p>
          <h4 className="mt-2 text-2xl font-semibold">
            Плата за пользование займом
          </h4>
          <p className="mt-4 leading-7 text-[#3f3f3c]">{interestText}</p>
        </div>

        <div className="p-6 md:p-7">
          <p className="sans text-xs font-bold uppercase tracking-[0.14em] text-[#70706b]">
            Пени
          </p>
          <h4 className="mt-2 text-2xl font-semibold">
            Последствия просрочки
          </h4>
          <p className="mt-4 leading-7 text-[#3f3f3c]">{penaltyText}</p>
        </div>
      </div>

      <div className="border-t border-[#d9d9d4] bg-[#f8f7f4] px-6 py-5 leading-7 text-[#3f3f3c] md:px-7">
        Проценты могут быть и без просрочки, а пени появляются только при
        нарушении срока возврата. Поэтому в конструкторе они вынесены в разные
        условия.
      </div>
    </article>
  );
}

function SeoUseCasesBlock({
  useCases,
}: {
  useCases: DocumentSeoTemplate["useCases"];
}) {
  return (
    <section className="mt-10 border-y border-[#d9d9d4] py-8">
      <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="sans text-sm font-bold uppercase tracking-[0.14em] text-[#70706b]">
            {useCases.eyebrow}
          </p>
          <h3 className="mt-3 text-3xl font-semibold">{useCases.title}</h3>
          <p className="mt-4 text-lg leading-8 text-[#3f3f3c]">
            {useCases.description}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {useCases.items.map((item) => (
            <article
              className="rounded-lg border border-[#d9d9d4] bg-white/78 p-5"
              key={item.title}
            >
              <h4 className="text-xl font-semibold">{item.title}</h4>
              <p className="mt-3 leading-7 text-[#4a4a47]">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SeoMistakesBlock({
  mistakes,
}: {
  mistakes: DocumentSeoTemplate["mistakes"];
}) {
  return (
    <section className="mt-10">
      <div className="panel p-6 md:p-8">
        <div className="grid gap-5 lg:grid-cols-[0.68fr_1.32fr]">
          <div>
            <p className="sans text-sm font-bold uppercase tracking-[0.14em] text-[#70706b]">
              {mistakes.eyebrow}
            </p>
            <h3 className="mt-3 text-3xl font-semibold">
              Частые ошибки и финальная проверка
            </h3>
            <p className="mt-4 leading-7 text-[#4a4a47]">
              {mistakes.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {mistakes.items.map((item) => (
              <article
                className="rounded-lg border border-[#d9d9d4] bg-[#f8f8f5] p-5"
                key={item.title}
              >
                <h4 className="text-xl font-semibold">{item.title}</h4>
                <p className="mt-3 leading-7 text-[#4a4a47]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SeoSignalCard({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="panel p-5">
      <p className="sans text-xs font-bold uppercase tracking-[0.16em] text-[#70706b]">
        {eyebrow}
      </p>
      <h3 className="mt-3 text-2xl font-semibold">{title}</h3>
      <p className="mt-3 leading-7 text-[#4a4a47]">{text}</p>
    </div>
  );
}

function SeoArticleCard({
  compact = false,
  section,
  variant = "default",
}: {
  compact?: boolean;
  section?: ArticleSection;
  variant?: "default" | "split";
}) {
  if (!section) {
    return null;
  }

  const splitLabels = getSplitLabels(section.title);
  const content =
    variant === "split" ? (
      <div className="grid gap-4 md:grid-cols-2">
        {section.paragraphs.map((paragraph, index) => (
          <p
            className="rounded-md border border-[#d9d9d4] bg-white/70 p-5 leading-7 text-[#3f3f3c]"
            key={paragraph}
          >
            <span className="sans mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-[#70706b]">
              {splitLabels[index] ?? `Вариант ${index + 1}`}
            </span>
            {paragraph}
          </p>
        ))}
      </div>
    ) : (
      <div className="grid gap-4 text-lg leading-8 text-[#3f3f3c]">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    );

  return (
    <article className={`panel ${compact ? "p-6" : "p-6 md:p-8"}`}>
      <h3 className="text-3xl font-semibold">{section.title}</h3>
      <div className={compact ? "mt-4" : "mt-5"}>{content}</div>
    </article>
  );
}

function SeoChecklist({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="panel p-6">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <BulletList items={items} />
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 grid gap-3">
      {items.map((item) => (
        <li className="flex gap-3 leading-7 text-[#42423f]" key={item}>
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#111111]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function LegalReferencePanel({
  legalReferences,
}: {
  legalReferences: DocumentSeoTemplate["legalReferences"];
}) {
  return (
    <article className="panel p-6 md:p-8">
      <p className="sans text-xs font-bold uppercase tracking-[0.14em] text-[#70706b]">
        {legalReferences.eyebrow}
      </p>
      <h3 className="mt-2 text-3xl font-semibold">{legalReferences.title}</h3>
      <p className="mt-4 text-lg leading-8 text-[#3f3f3c]">
        {legalReferences.description}
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {legalReferences.items.map((reference) => (
          <div
            className="rounded-md border border-[#d9d9d4] bg-white/70 p-4"
            key={reference.href}
          >
            <span className="sans text-sm font-bold">{reference.label}</span>
            <span className="mt-2 block leading-6 text-[#4a4a47]">
              {reference.text}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

function getComparisonLabels(title?: string) {
  const normalizedTitle = title?.toLowerCase() ?? "";

  if (normalizedTitle.includes("расписк") && normalizedTitle.includes("договор")) {
    return ["Расписка", "Договор займа"];
  }

  if (
    normalizedTitle.includes("судебн") &&
    normalizedTitle.includes("несудебн")
  ) {
    return ["Судебный документ", "Несудебный документ"];
  }

  return ["Пункт 1", "Пункт 2"];
}

function isInterestPenaltySection(section: ArticleSection) {
  const normalizedTitle = section.title.toLowerCase();

  return normalizedTitle.includes("процент") && normalizedTitle.includes("пени");
}

function isMistakesSection(section: ArticleSection) {
  return section.title.toLowerCase().includes("ошиб");
}

function isComparisonSection(section: ArticleSection) {
  if (section.paragraphs.length < 2) {
    return false;
  }

  const normalizedTitle = section.title.toLowerCase();

  return (
    normalizedTitle.includes("разница") ||
    normalizedTitle.includes("отлич") ||
    normalizedTitle.includes("сравн") ||
    (normalizedTitle.includes("расписк") &&
      normalizedTitle.includes("договор")) ||
    (normalizedTitle.includes("заявлен") &&
      normalizedTitle.includes("жалоб")) ||
    (normalizedTitle.includes("судебн") &&
      normalizedTitle.includes("несудебн"))
  );
}

function isSplitSection(section: ArticleSection) {
  if (section.paragraphs.length < 2) {
    return false;
  }

  const normalizedTitle = section.title.toLowerCase();

  return (
    normalizedTitle.includes("налич") ||
    normalizedTitle.includes("перевод") ||
    normalizedTitle.includes("лично") ||
    normalizedTitle.includes("почт")
  );
}

function getSplitLabels(title: string) {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes("налич") || normalizedTitle.includes("перевод")) {
    return ["Наличные", "Перевод"];
  }

  if (normalizedTitle.includes("лично") || normalizedTitle.includes("почт")) {
    return ["Лично", "Почтой"];
  }

  return ["Пункт 1", "Пункт 2"];
}
