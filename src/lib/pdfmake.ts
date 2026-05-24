import PdfPrinter from "pdfmake/src/printer";
import pdfFonts from "pdfmake/build/vfs_fonts";

type FontsModule = {
  default?: FontsModule;
  pdfMake?: FontsModule;
  vfs?: Record<string, string>;
};

function findVfs(module: FontsModule, depth = 0): Record<string, string> | undefined {
  if ("Roboto-Regular.ttf" in module) {
    return module as Record<string, string>;
  }

  if (module.vfs || depth > 4) {
    return module.vfs;
  }

  return (
    (module.default ? findVfs(module.default, depth + 1) : undefined) ??
    (module.pdfMake ? findVfs(module.pdfMake, depth + 1) : undefined)
  );
}

const robotoVfs = findVfs(pdfFonts as unknown as FontsModule);

if (!robotoVfs) {
  throw new Error("Roboto fonts were not found in pdfmake vfs.");
}

export const pdfPrinter = new PdfPrinter({
  Roboto: {
    normal: Buffer.from(robotoVfs["Roboto-Regular.ttf"], "base64"),
    bold: Buffer.from(robotoVfs["Roboto-Medium.ttf"], "base64"),
    italics: Buffer.from(robotoVfs["Roboto-Italic.ttf"], "base64"),
    bolditalics: Buffer.from(robotoVfs["Roboto-MediumItalic.ttf"], "base64"),
  },
});
