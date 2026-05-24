"use client";

import * as React from "react";
import { ArrowUpRight, FileText, Search } from "lucide-react";
import Link from "next/link";
import { documents } from "@/lib/documents";

const futureCategories = [
  {
    id: "money-and-receipts",
    eyebrow: "Деньги и расписки",
    title: "Займы, долги и расчеты",
    description:
      "Простые документы для передачи денег, займа и подтверждения расчетов.",
    items: [
      "Расписка о получении денег",
      "Договор займа",
      "Соглашение о возврате долга",
    ],
  },
  {
    id: "auto",
    eyebrow: "Авто",
    title: "Документы для купли-продажи автомобиля",
    description:
      "ДКП и акт передачи автомобиля для простой сделки между физическими лицами.",
    items: [
      "Договор купли-продажи автомобиля",
      "Акт приема-передачи автомобиля",
    ],
  },
  {
    id: "contracts-and-acts",
    eyebrow: "Договоры и акты",
    title: "Договоры и акты для частных задач",
    description:
      "Аренда квартиры, услуги и акты передачи в одном понятном формате.",
    items: [
      "Договор аренды квартиры",
      "Договор оказания услуг",
      "Акт приема-передачи",
    ],
  },
  {
    id: "powers",
    eyebrow: "Доверенности",
    title: "Простые доверенности онлайн",
    description:
      "Простая доверенность для бытового поручения или подачи документов.",
    items: ["Доверенность"],
  },
  {
    id: "court",
    eyebrow: "Суд",
    title: "Судебные заявления и ходатайства",
    description:
      "Типовые обращения в суд на тех этапах, где не требуется сложный иск.",
    items: [
      "Заявление о выдаче исполнительного листа",
      "Заявление о выдаче копии решения суда",
      "Ходатайство о рассмотрении дела без участия",
    ],
  },
  {
    id: "bailiffs",
    eyebrow: "Взыскание",
    title: "Заявления для работы с исполнением",
    description:
      "Заявления в банк и к приставам по исполнительному производству.",
    items: [
      "Заявление о взыскании денежных средств по исполнительному документу в банк",
      "Заявление о возбуждении исполнительного производства",
      "Заявление о ходе исполнительного производства",
      "Жалоба на судебного пристава",
    ],
  },
  {
    id: "housing",
    eyebrow: "Дом и квартира",
    title: "ЖКХ, жилье и обращения в организации",
    description:
      "Заявления в управляющие компании, ведомства и по коммунальным вопросам.",
    items: [
      "Заявление в управляющую компанию",
      "Заявление о перерасчете коммунальных платежей",
      "Жалоба в организацию",
    ],
  },
  {
    id: "school",
    eyebrow: "Школа",
    title: "Заявления родителей онлайн",
    description:
      "Базовые заявления для родителей в школьных и учебных ситуациях.",
    items: ["Заявление в школу на освобождение ребенка"],
  },
];

function normalize(value: string) {
  return value.toLowerCase().replace(/ё/g, "е").trim();
}

const documentHrefByTitle = new Map(
  documents.map((document) => [
    normalize(document.title),
    `/documents/${document.slug}`,
  ]),
);

const readyCategories = futureCategories
  .map((category) => ({
    ...category,
    items: category.items.filter((item) =>
      documentHrefByTitle.has(normalize(item)),
    ),
  }))
  .filter((category) => category.items.length > 0);

const searchIndex = [
  ...documents.map((document) => ({
    type: "document" as const,
    id: document.id,
    title: document.title,
    description: document.description,
    href: `/documents/${document.slug}`,
    meta: [document.category, ...document.seo.keywords].join(" "),
  })),
  ...readyCategories.map((category) => ({
    type: "category" as const,
    id: category.id,
    title: category.title,
    description: category.description,
    href:
      category.items
        .map((item) => documentHrefByTitle.get(normalize(item)))
        .find(Boolean) ?? "/#documents-discovery",
    meta: [category.eyebrow, ...category.items].join(" "),
  })),
];

export function HomeDiscovery() {
  const [query, setQuery] = React.useState("");
  const normalizedQuery = normalize(query);

  const searchResults = normalizedQuery
    ? searchIndex.filter((item) => {
        const haystack = normalize(
          `${item.title} ${item.description} ${item.meta}`,
        );
        return haystack.includes(normalizedQuery);
      })
    : [];

  return (
    <section className="section pt-0">
      <div>
        <div className="rounded-[34px] border border-[#ddd8d1] bg-[linear-gradient(180deg,rgba(255,255,255,0.84)_0%,rgba(248,245,240,0.78)_100%)] p-5 shadow-[0_18px_60px_rgba(17,17,17,0.04)] backdrop-blur-sm md:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold leading-tight text-[#1c1c1c] sm:text-4xl md:text-6xl">
                Какой документ нужен?
              </h2>
              <p className="mt-3 text-base leading-7 text-[#5a5a55] md:text-lg">
                Найдите документ по названию, ситуации, категории или ключевым
                словам.
              </p>
            </div>
          </div>

          <label className="mt-6 flex items-center gap-3 rounded-[26px] border border-[#ddd9d2] bg-[rgba(255,255,255,0.72)] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] focus-within:border-[#111111]">
            <Search className="text-[#6f6f69]" size={20} />
            <input
              className="w-full bg-transparent text-base outline-none placeholder:text-[#8b8b85]"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Введите название документа или ситуацию"
              type="text"
              value={query}
            />
          </label>

          {normalizedQuery ? (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {searchResults.length > 0 ? (
                searchResults.slice(0, 6).map((item) => (
                  <Link
                    className="rounded-[24px] border border-[#ddd9d2] bg-white/88 px-5 py-4 transition hover:border-[#111111]"
                    href={item.href}
                    key={`${item.type}-${item.id}`}
                  >
                    <p className="sans text-xs font-bold uppercase text-[#7a7a73]">
                      {item.type === "document" ? "Документ" : "Категория"}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#5a5a55]">
                      {item.description}
                    </p>
                  </Link>
                ))
              ) : (
                <div className="rounded-[24px] border border-dashed border-[#d6d2cb] bg-[#fbfaf7] px-5 py-4 text-sm leading-6 text-[#5f5f59] md:col-span-2">
                  Пока такого документа нет. Попробуйте изменить запрос или
                  посмотреть категории ниже.
                </div>
              )}
            </div>
          ) : null}
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-semibold leading-tight text-[#1c1c1c] sm:text-4xl md:text-6xl">
            Категории документов
          </h2>
        </div>

        <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {readyCategories.map((category) => {
            const primaryHref =
              category.items
                .map((item) => documentHrefByTitle.get(normalize(item)))
                .find(Boolean) ?? null;

            const articleContent = (
              <article className="relative z-20 flex min-h-[280px] flex-col overflow-hidden rounded-[28px] border border-[#45413c] bg-[linear-gradient(180deg,#413d39_0%,#2a2725_48%,#171615_100%)] p-5 text-white shadow-[0_26px_62px_rgba(17,17,17,0.20)] transition duration-300 md:mt-[18px] md:h-[320px] md:rounded-[36px] md:p-6 md:shadow-[0_36px_92px_rgba(17,17,17,0.26)] md:group-hover:-translate-y-1">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.025)_0%,rgba(255,255,255,0)_42%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_18%,rgba(0,0,0,0.08)_52%,rgba(255,255,255,0)_100%)] opacity-[0.16] mix-blend-soft-light" />
                <div className="absolute inset-x-6 top-0 h-px bg-white/6" />
                <div className="pointer-events-none absolute -right-12 bottom-0 h-32 w-36 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.025)_0%,rgba(255,255,255,0)_74%)]" />

                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div>
                    <p className="sans text-[11px] font-bold uppercase tracking-[0.12em] text-white/54">
                      {category.eyebrow}
                    </p>
                    <h3 className="mt-3 max-w-[18ch] text-[24px] font-semibold leading-[1.08] text-white md:max-w-[13ch] md:text-[28px] md:leading-[1.02]">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-white/72 transition group-hover:border-white/16 group-hover:bg-white/[0.05] group-hover:text-white/84">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <p className="relative z-10 mt-5 max-w-[30ch] text-sm leading-7 text-white/62">
                  {category.description}
                </p>

                <div className="relative z-10 mt-auto flex items-center justify-between text-white/64">
                  <div className="sans inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em]">
                    <FileText size={14} />
                    {category.items.length} документов
                  </div>
                  <span className="sans text-[11px] font-bold uppercase tracking-[0.12em] text-white/38">
                    Открыть
                  </span>
                </div>
              </article>
            );

            return (
              <div className="group relative block md:h-[392px] md:pt-3" key={category.id}>
                <div className="pointer-events-none absolute left-10 top-4 z-0 hidden h-[216px] w-[58%] rounded-[30px] border border-[#bbb4aa] bg-[linear-gradient(180deg,#c8c1b8_0%,#a79f95_100%)] shadow-[0_18px_40px_rgba(17,17,17,0.10)] transition duration-300 group-hover:-translate-y-7 group-hover:rotate-[-4deg] md:block" />
                <div className="pointer-events-none absolute right-8 top-8 z-0 hidden h-[204px] w-[54%] rounded-[28px] border border-[#c6bfb5] bg-[linear-gradient(180deg,#ddd6cc_0%,#bdb5aa_100%)] shadow-[0_20px_46px_rgba(17,17,17,0.11)] transition duration-300 group-hover:-translate-y-8 group-hover:translate-x-3 group-hover:rotate-[5deg] md:block" />

                {primaryHref ? (
                  <Link className="block" href={primaryHref}>
                    {articleContent}
                  </Link>
                ) : (
                  articleContent
                )}

                <div className="relative z-30 mt-3 space-y-2 opacity-100 md:absolute md:inset-x-4 md:bottom-0 md:mt-0 md:opacity-0 md:transition md:duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  {category.items.slice(0, 3).map((item, index) => {
                    const itemHref = documentHrefByTitle.get(normalize(item));
                    const itemCard = (
                      <div
                        className="flex items-center gap-3 rounded-[18px] border border-[#ddd8d0] bg-white/97 px-4 py-3 shadow-[0_10px_24px_rgba(17,17,17,0.08)] transition duration-300 hover:border-[#111111] md:shadow-[0_16px_34px_rgba(17,17,17,0.10)]"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-[#e2ddd6] bg-[#f5f2ed] text-[#2f2f2d]">
                          <FileText size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="sans text-[10px] font-bold uppercase tracking-[0.08em] text-[#8a857d]">
                            Документ {String(index + 1).padStart(2, "0")}
                          </p>
                          <p className="mt-1 text-sm leading-5 text-[#1f1f1d] md:truncate md:leading-6">
                            {item}
                          </p>
                        </div>
                      </div>
                    );

                    return itemHref ? (
                      <Link
                        className="block pointer-events-auto"
                        href={itemHref}
                        key={item}
                      >
                        {itemCard}
                      </Link>
                    ) : (
                      <div className="pointer-events-none" key={item}>
                        {itemCard}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
