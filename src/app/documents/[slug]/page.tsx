import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConstructorClient } from "@/components/constructor-client";
import { DocumentFaq } from "@/components/document-faq";
import { getDocumentBySlug } from "@/lib/documents";
import { SITE_URL } from "@/lib/site-url";
import { DocumentBreadcrumbs, DocumentHero } from "./document-hero";
import {
  DocumentInfoSection,
  DocumentSeoSection,
  RelatedDocumentsBlock,
} from "./document-page-sections";
import { getSampleRenderable } from "./sample-renderables";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const RICH_DOCUMENT_SLUGS = new Set([
  "raspiska-o-poluchenii-deneg",
  "nenotarialnaya-doverennost",
  "zayavlenie-o-hode-ispolnitelnogo-proizvodstva",
  "zayavlenie-o-vozbuzhdenii-ispolnitelnogo-proizvodstva",
  "zayavlenie-v-bank-o-vzyskanii-po-ispolnitelnomu-dokumentu",
]);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = getDocumentBySlug(slug);

  if (!document) {
    return {};
  }

  const canonicalPath = `/documents/${document.slug}`;

  return {
    title: document.seo.title,
    description: document.seo.description,
    keywords: document.seo.keywords,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: document.seo.title,
      description: document.seo.description,
      type: "article",
      url: canonicalPath,
    },
  };
}

export default async function DocumentPage({ params }: PageProps) {
  const { slug } = await params;
  const document = getDocumentBySlug(slug);

  if (!document) {
    notFound();
  }

  const usesRichDocumentPage = RICH_DOCUMENT_SLUGS.has(document.slug);
  const sampleRenderable = getSampleRenderable(document);
  const faqItems = document.page.faq.filter((item) => item.question && item.answer);
  const jsonLd = buildDocumentJsonLd(document, faqItems);

  return (
    <main>
      <script
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        type="application/ld+json"
      />
      {usesRichDocumentPage ? (
        <>
          <DocumentBreadcrumbs title={document.title} />
          <DocumentHero document={document} sampleRenderable={sampleRenderable} />

          <section
            className="page-shell pb-8 pt-8 md:pb-10 md:pt-10"
            id="document-constructor"
          >
            <ConstructorClient document={document} variant="embedded" />
          </section>
        </>
      ) : (
        <DefaultDocumentIntro document={document} />
      )}

      {!document.seoTemplate ? <DocumentInfoSection page={document.page} /> : null}

      <DocumentSeoSection
        document={document}
        usesRichDocumentPage={usesRichDocumentPage}
      />

      <section className="page-shell section">
        <h2 className="text-3xl font-semibold">Частые вопросы</h2>
        <DocumentFaq items={faqItems} />
        <RelatedDocumentsBlock items={document.page.relatedDocuments} />
        <p className="panel mt-8 p-5 text-sm leading-6 text-[#4a4a47]">
          {document.disclaimers[0]}
        </p>
      </section>
    </main>
  );
}

function buildDocumentJsonLd(
  document: NonNullable<ReturnType<typeof getDocumentBySlug>>,
  faqItems: NonNullable<ReturnType<typeof getDocumentBySlug>>["page"]["faq"],
) {
  const pageUrl = `${SITE_URL}/documents/${document.slug}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Главная",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: document.title,
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: document.title,
      description: document.seo.description,
      offers: {
        "@type": "Offer",
        price: document.price,
        priceCurrency: "RUB",
        availability: "https://schema.org/InStock",
        url: pageUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];
}

function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function DefaultDocumentIntro({
  document,
}: {
  document: NonNullable<ReturnType<typeof getDocumentBySlug>>;
}) {
  return (
    <>
      <section className="page-shell pt-10 md:pt-14">
        <div className="max-w-4xl">
          <p className="sans text-sm font-bold uppercase text-[#70706b]">
            {document.category}
          </p>
          <h1 className="mt-3 text-5xl font-semibold">{document.title}</h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-[#3f3f3c]">
            {document.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="button-secondary" href="/#documents-discovery">
              Вернуться в каталог
            </Link>
          </div>
        </div>
      </section>

      <section className="page-shell py-8 md:py-10">
        <ConstructorClient document={document} variant="embedded" />
      </section>
    </>
  );
}
