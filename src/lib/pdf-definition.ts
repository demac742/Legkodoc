import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { buildDocumentRenderable } from "./document-content";
import type { DocumentTemplate, DocumentValues } from "./types";

const watermarkPattern = Array.from({ length: 9 }, () =>
  Array.from({ length: 4 }, () => ({
    text: "ЛЕГКОДОК",
    color: "#111111",
    opacity: 0.08,
    bold: true,
    fontSize: 24,
    margin: [0, 18],
  })),
);

const receiptPdfLayout = {
  pageMargins: [48, 32, 48, 36] as [number, number, number, number],
  titleFontSize: 18,
  titleBottomMargin: 18,
  headerFontSize: 12.5,
  headerLineHeight: 1.15,
  paragraphFontSize: 12.5,
  paragraphLineHeight: 1.18,
  paragraphFirstTopMargin: 20,
  paragraphTopMargin: 9,
  leadingIndent: 28,
  footerFontSize: 12.5,
  footerLineHeight: 1.18,
  footerFirstTopMargin: 18,
  footerTopMargin: 8,
} as const;

function splitNumberedListParagraph(paragraph: string) {
  const match = paragraph.match(/^(\d+\.)\s+(.*)$/u);
  return match ? { marker: match[1], text: match[2] } : null;
}

export function buildPdfDefinition(
  document: DocumentTemplate,
  values: DocumentValues,
  options: { watermark: boolean },
): TDocumentDefinitions {
  const renderable = buildDocumentRenderable(document, values);
  const isReceipt = document.slug === "raspiska-o-poluchenii-deneg";
  const isPowerOfAttorney = document.slug === "nenotarialnaya-doverennost";
  const isEnforcement =
    document.slug === "zayavlenie-o-vozbuzhdenii-ispolnitelnogo-proizvodstva" ||
    document.slug === "zayavlenie-o-hode-ispolnitelnogo-proizvodstva" ||
    document.slug === "zayavlenie-v-bank-o-vzyskanii-po-ispolnitelnomu-dokumentu";
  const hasParagraphIndent = isReceipt || isPowerOfAttorney || isEnforcement;
  const isTitleFirstDocument = isReceipt || isPowerOfAttorney;
  const background = options.watermark
    ? ([
        {
          stack: watermarkPattern.map((row) => ({
            columns: row,
            columnGap: 42,
          })),
          absolutePosition: { x: -80, y: 20 },
          angle: -35,
        },
      ] as unknown as TDocumentDefinitions["background"])
    : undefined;

  const headerContent =
    isTitleFirstDocument && renderable.headerLines.length >= 2
      ? [
          {
            columns: [
              {
                width: "auto",
                text: renderable.headerLines[0],
                style: "headerLine",
                alignment: "left",
              },
              {
                width: "*",
                text: renderable.headerLines[1],
                style: "headerLine",
                alignment: "right",
              },
            ],
            columnGap: isPowerOfAttorney ? 16 : 0,
          },
        ]
      : isEnforcement && renderable.headerLines.length >= 2
        ? [
            {
              columns: [
                {
                  width: 180,
                  text: renderable.headerLines[0],
                  style: "headerLine",
                  alignment: "left",
                },
                {
                  width: "*",
                  stack: renderable.headerLines.slice(1).map((line, index) => ({
                    text: line,
                    style: "headerLine",
                    alignment: "left",
                    margin: [0, index === 0 ? 0 : 4, 0, 0],
                  })),
                },
              ],
              columnGap: 28,
            },
          ]
        : renderable.headerLines.map((line, index) => ({
          text: line,
          style: "headerLine",
          alignment: "left",
          margin: [0, index === 0 ? 0 : 4, 0, 0],
        }));

  const bodyContent = renderable.bodyParagraphs.map((paragraph, index) => {
    const isPowerOfAttorneyLabel =
      isPowerOfAttorney && paragraph === "Полномочия поверенного лица:";
    const isPowerOfAttorneyIntro = isPowerOfAttorney && index === 0;
    const isPowerOfAttorneyBulletBlock =
      isPowerOfAttorney &&
      paragraph
        .split("\n")
        .every((line) => line.trim().startsWith("—"));
    const listItem = isPowerOfAttorney
      ? null
      : splitNumberedListParagraph(paragraph);

    if (listItem) {
      return {
        columns: [
          {
            width: 24,
            text: listItem.marker,
            style: "listMarker",
          },
          {
            width: "*",
            text: listItem.text,
            style: "listParagraph",
          },
        ],
        columnGap: 8,
        margin: [0, index === 0 ? 24 : 8, 0, 0],
      };
    }

    return {
      text: paragraph,
      style:
        paragraph.endsWith(":") &&
        !isPowerOfAttorneyIntro &&
        !isPowerOfAttorneyLabel
          ? "subheading"
          : "paragraph",
      alignment: "justify",
      leadingIndent:
        hasParagraphIndent &&
        (!paragraph.endsWith(":") || isPowerOfAttorneyIntro) &&
        !isPowerOfAttorneyBulletBlock
          ? isPowerOfAttorney
            ? 28
            : receiptPdfLayout.leadingIndent
          : 0,
      margin: [
        0,
        index === 0
          ? isReceipt
            ? receiptPdfLayout.paragraphFirstTopMargin
            : isPowerOfAttorney
              ? 14
              : 24
          : isReceipt
            ? receiptPdfLayout.paragraphTopMargin
            : isPowerOfAttorney
              ? 8
              : 8,
        0,
        0,
      ],
    };
  });

  const footerContent = renderable.footerLines.map((line, index) => ({
    text: line,
    style: "footerLine",
    margin: [
      0,
      index === 0
        ? isReceipt
          ? receiptPdfLayout.footerFirstTopMargin
          : isPowerOfAttorney
            ? 14
            : 24
        : isReceipt
          ? receiptPdfLayout.footerTopMargin
          : isPowerOfAttorney
            ? 12
            : 8,
      0,
      0,
    ],
  }));

  const receiptTitleFirstContent =
    isTitleFirstDocument
      ? [
          {
            text: renderable.title,
            style: "title",
            margin: [
              0,
              0,
              0,
              isPowerOfAttorney ? 10 : receiptPdfLayout.titleBottomMargin,
            ],
          },
          ...headerContent.map((item, index) => ({
            ...item,
            margin: [0, index === 0 ? 0 : 3, 0, 0],
          })),
        ]
      : [
          ...headerContent,
          {
            text: renderable.title,
            style: "title",
            margin: [0, 24, 0, 18],
          },
        ];

  return {
    pageSize: "A4",
    pageMargins: isReceipt
      ? receiptPdfLayout.pageMargins
      : isPowerOfAttorney
        ? [57, 45, 57, 45]
        : [56, 56, 56, 56],
    background,
    content: [
      ...(isReceipt
        || isPowerOfAttorney
        ? []
        : [
            {
              text: document.title,
              style: "documentName",
            },
          ]),
      ...receiptTitleFirstContent,
      ...bodyContent,
      ...footerContent,
      ...(isReceipt || isPowerOfAttorney
        ? []
        : [
            {
              text: document.disclaimers[0],
              style: "disclaimer",
              margin: [0, 28, 0, 0],
            },
          ]),
    ] as unknown as TDocumentDefinitions["content"],
    styles: {
      documentName: {
        fontSize: 10,
        color: "#707070",
        alignment: "right",
      },
      headerLine: {
        fontSize: isReceipt
          ? receiptPdfLayout.headerFontSize
          : isPowerOfAttorney
            ? 11
            : 11,
        lineHeight: isReceipt
          ? receiptPdfLayout.headerLineHeight
          : isPowerOfAttorney
            ? 1.2
            : 1.2,
      },
      title: {
        fontSize: isReceipt
          ? receiptPdfLayout.titleFontSize
          : isPowerOfAttorney
            ? 12
            : 18,
        bold: true,
        alignment: "center",
      },
      paragraph: {
        fontSize: isReceipt
          ? receiptPdfLayout.paragraphFontSize
          : isPowerOfAttorney
            ? 11
            : 12,
        lineHeight: isReceipt
          ? receiptPdfLayout.paragraphLineHeight
          : isPowerOfAttorney
            ? 1.25
            : 1.35,
        alignment: "justify",
      },
      subheading: {
        fontSize: 12,
        bold: true,
        lineHeight: 1.35,
      },
      footerLine: {
        fontSize: isReceipt
          ? receiptPdfLayout.footerFontSize
          : isPowerOfAttorney
            ? 11
            : 12,
        lineHeight: isReceipt
          ? receiptPdfLayout.footerLineHeight
          : isPowerOfAttorney
            ? 1.25
            : 1.3,
      },
      listMarker: {
        fontSize: 12,
        lineHeight: 1.35,
        alignment: "left",
      },
      listParagraph: {
        fontSize: 12,
        lineHeight: 1.35,
        alignment: "justify",
      },
      disclaimer: {
        fontSize: 9,
        color: "#707070",
        lineHeight: 1.25,
      },
    },
    defaultStyle: {
      font: "Roboto",
    },
    info: {
      title: document.title,
      subject: "ЛЕГКОДОК",
      creator: "ЛЕГКОДОК",
      producer: "ЛЕГКОДОК",
    },
  };
}

