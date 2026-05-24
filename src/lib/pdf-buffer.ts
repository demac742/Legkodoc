import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { pdfPrinter } from "./pdfmake";

export function createPdfBuffer(definition: TDocumentDefinitions) {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    const pdfDoc = pdfPrinter.createPdfKitDocument(definition);
    const timeout = setTimeout(() => {
      pdfDoc.destroy(new Error("PDF generation timeout"));
      reject(new Error("PDF generation timeout"));
    }, 15000);

    pdfDoc.on("data", (chunk: Buffer) => {
      chunks.push(Buffer.from(chunk));
    });

    pdfDoc.on("end", () => {
      clearTimeout(timeout);
      resolve(Buffer.concat(chunks));
    });

    pdfDoc.on("error", (error: Error) => {
      clearTimeout(timeout);
      reject(error);
    });

    pdfDoc.end();
  });
}
