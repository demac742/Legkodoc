import Link from "next/link";
import type { DocumentRenderable } from "@/lib/document-content";
import type { DocumentTemplate } from "@/lib/types";

export function DocumentBreadcrumbs({ title }: { title: string }) {
  return (
    <nav
      aria-label="Путь страницы"
      className="border-b border-[#ddd8d1] bg-[#f8f6f2]"
    >
      <div className="page-shell py-3">
        <ol className="sans flex flex-wrap items-center gap-2 text-sm font-bold text-[#6d6760]">
          <li>
            <Link className="transition hover:text-[#111111]" href="/">
              Главная
            </Link>
          </li>
          <li aria-hidden="true" className="text-[#9a938b]">
            →
          </li>
          <li className="text-[#272522]">{title}</li>
        </ol>
      </div>
    </nav>
  );
}

export function DocumentHero({
  document,
  sampleRenderable,
}: {
  document: DocumentTemplate;
  sampleRenderable: DocumentRenderable | null;
}) {
  const heroBenefits = [
    {
      title: "PDF за 2-3 минуты",
      text: "Без Word, ручной верстки и лишнего оформления.",
    },
    {
      title: "Без регистрации",
      text: `Сначала проверьте PDF с водяным знаком, затем скачайте чистую версию за ${document.price} рублей.`,
    },
  ];

  return (
    <section className="border-b border-[#ddd8d1] bg-[linear-gradient(180deg,rgba(249,247,243,0.96)_0%,rgba(243,239,232,0.88)_100%)]">
      <div className="page-shell py-10 md:py-14">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_520px] xl:items-start">
          <div className="max-w-4xl">
            <p className="sans text-sm font-bold uppercase tracking-[0.14em] text-[#7a746d]">
              Онлайн-сервис для подготовки документов
            </p>
            <h1
              className={`mt-4 font-semibold leading-[1.02] text-[#18181a] text-balance ${
                document.slug === "zayavlenie-v-bank-o-vzyskanii-po-ispolnitelnomu-dokumentu"
                  ? "max-w-[18ch] text-[28px] sm:text-[36px] md:text-[46px] xl:text-[52px]"
                  : "max-w-[760px] text-[30px] sm:text-[38px] md:text-[52px] xl:text-[56px]"
              }`}
            >
              {document.seo.title.replace(" | ЛЕГКОДОК", "")}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#343434] md:text-[31px] md:leading-[1.32]">
              {document.seo.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="button-primary" href="#document-constructor">
                Заполнить документ
              </Link>
              <Link className="button-secondary" href="/#documents-discovery">
                Вернуться в каталог
              </Link>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {heroBenefits.map((item) => (
                <article
                  className="rounded-[28px] border border-[#ddd8d1] bg-white/88 p-5 shadow-[0_16px_44px_rgba(17,17,17,0.05)]"
                  key={item.title}
                >
                  <p className="sans text-sm font-bold uppercase tracking-[0.08em] text-[#1f1f1d]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-base leading-7 text-[#5a5a55]">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <DocumentSampleCard
            document={document}
            sampleRenderable={sampleRenderable}
          />
        </div>
      </div>
    </section>
  );
}

function DocumentSampleCard({
  document,
  sampleRenderable,
}: {
  document: DocumentTemplate;
  sampleRenderable: DocumentRenderable | null;
}) {
  if (!sampleRenderable) {
    return null;
  }

  const titleLines =
    document.slug === "zayavlenie-v-bank-o-vzyskanii-po-ispolnitelnomu-dokumentu"
      ? [
          "ЗАЯВЛЕНИЕ",
          "о взыскании денежных средств по",
          "исполнительному листу",
        ]
      : sampleRenderable.title.split("\n");
  const usesAddressHeader = sampleRenderable.headerLines.length > 2;
  const titleFirstPreview =
    document.slug === "raspiska-o-poluchenii-deneg" ||
    document.slug === "nenotarialnaya-doverennost";
  const headerBlock = usesAddressHeader ? (
    <div className="grid grid-cols-[0.58fr_1fr] gap-4 text-[8px]">
      <p>{sampleRenderable.headerLines[0]}</p>
      <div className="grid gap-1 text-left">
        {sampleRenderable.headerLines.slice(1).map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  ) : (
      <div
        className={
          titleFirstPreview
            ? "grid grid-cols-[1fr_1fr] gap-4 text-[8px]"
            : "mt-5 grid grid-cols-[1fr_1fr] gap-4 text-[8px]"
        }
      >
        <p>{sampleRenderable.headerLines[0]}</p>
        <p className="text-right">{sampleRenderable.headerLines[1]}</p>
      </div>
  );
  const titleBlock = (
    <h3
      className={`${titleFirstPreview ? "mb-5" : "mt-5"} text-center text-[13px] font-semibold tracking-[0.05em]`}
    >
      {titleLines.map((line, index) => (
        <span
          className={`block ${
            document.slug ===
              "zayavlenie-v-bank-o-vzyskanii-po-ispolnitelnomu-dokumentu" &&
            index > 0
              ? ""
              : "uppercase"
          }`}
          key={line}
        >
          {line}
        </span>
      ))}
    </h3>
  );

  return (
    <aside className="rounded-[34px] border border-[#ddd8d1] bg-white/92 p-5 shadow-[0_22px_62px_rgba(17,17,17,0.07)] md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="sans text-xs font-bold uppercase tracking-[0.14em] text-[#7a746d]">
            Образец
          </p>
          <h2 className="mt-2 text-[28px] font-semibold leading-tight text-[#1c1c1c]">
            Пример документа
          </h2>
        </div>
        <span className="sans rounded-full border border-[#dcd6ce] bg-[#f6f3ee] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#4f4d48]">
          PDF
        </span>
      </div>

      <div className="mt-5 rounded-[28px] border border-[#e3ddd4] bg-[#f8f6f2] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
        <article className="mx-auto aspect-[210/297] w-full max-w-[420px] rounded-[20px] border border-[#dad4cc] bg-white px-6 py-7 text-[8.2px] leading-[1.5] text-[#262624] shadow-[0_14px_32px_rgba(17,17,17,0.08)]">
          {titleFirstPreview ? titleBlock : null}
          {headerBlock}
          {!titleFirstPreview ? titleBlock : null}

          <div className="mt-5 space-y-3 text-justify">
            {sampleRenderable.bodyParagraphs.map((paragraph, index) => {
              const match = paragraph.match(/^(\d+\.)\s+(.+)$/);
              const lines = paragraph.split("\n");
              const isPowerOfAttorneyLabel =
                document.slug === "nenotarialnaya-doverennost" &&
                paragraph === "Полномочия поверенного лица:";
              const isPowerOfAttorneyBulletBlock =
                document.slug === "nenotarialnaya-doverennost" &&
                lines.every((line) => line.trim().startsWith("—"));
              const isSubheading =
                paragraph.endsWith(":") &&
                !(document.slug === "nenotarialnaya-doverennost" && index === 0) &&
                !isPowerOfAttorneyLabel;

              if (match) {
                return (
                  <p
                    className="grid grid-cols-[14px_1fr] gap-1 text-left"
                    key={`${paragraph}-${index}`}
                  >
                    <span>{match[1]}</span>
                    <span>{match[2]}</span>
                  </p>
                );
              }

              if (lines.length > 1) {
                return (
                  <p
                    className={
                      isPowerOfAttorneyBulletBlock
                        ? "indent-0"
                        : document.slug === "nenotarialnaya-doverennost" && index === 0
                          ? "indent-4 font-normal"
                          : "indent-4"
                    }
                    key={`${paragraph}-${index}`}
                  >
                    {lines.map((line, lineIndex) => (
                      <span
                        className={
                          isPowerOfAttorneyBulletBlock || lineIndex > 0
                            ? "block indent-0"
                            : "block"
                        }
                        key={`${line}-${lineIndex}`}
                      >
                        {line}
                      </span>
                    ))}
                  </p>
                );
              }

              return (
                <p
                  className={isSubheading ? "font-semibold" : "indent-4 font-normal"}
                  key={`${paragraph}-${index}`}
                >
                  {paragraph}
                </p>
              );
            })}
          </div>

          <div className="mt-6 grid gap-3 text-[8.2px]">
            {sampleRenderable.footerLines.map((line, index) => (
              <p key={`${line}-${index}`}>{line}</p>
            ))}
          </div>
        </article>
      </div>

      <p className="mt-5 text-base leading-7 text-[#5a5a55]">
        Это пример уже заполненного документа с вымышленными данными. В
        конструкторе ниже вы сможете подставить свои данные и скачать PDF:
        {` ${document.title.toLowerCase()}.`}
      </p>
    </aside>
  );
}
