declare module "pdfmake/src/printer" {
  import type { TDocumentDefinitions } from "pdfmake/interfaces";
  import type { Readable } from "node:stream";

  type FontDefinition = Buffer | string | Array<Buffer | string>;
  type FontDescriptors = Record<
    string,
    {
      bold: FontDefinition;
      bolditalics: FontDefinition;
      italics: FontDefinition;
      normal: FontDefinition;
    }
  >;

  export default class PdfPrinter {
    constructor(fontDescriptors: FontDescriptors);
    createPdfKitDocument(definition: TDocumentDefinitions): Readable & {
      destroy(error?: Error): void;
      end(): void;
    };
  }
}
