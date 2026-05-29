import PdfPrinter from "pdfmake/src/printer";
import pdfFonts from "pdfmake/build/vfs_fonts";

type FontsModule = {
  default?: FontsModule;
  pdfMake?: FontsModule;
  vfs?: Record<string, string>;
};

const TIMES_NEW_ROMAN_FONT_PATHS = {
  normal: "C:\\Windows\\Fonts\\times.ttf",
  bold: "C:\\Windows\\Fonts\\timesbd.ttf",
  italics: "C:\\Windows\\Fonts\\timesi.ttf",
  bolditalics: "C:\\Windows\\Fonts\\timesbi.ttf",
} as const;

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

const hasTimesNewRomanFonts = process.platform === "win32";

export const PDF_FONT_NAME = hasTimesNewRomanFonts ? "TimesNewRoman" : "Roboto";

export const pdfPrinter = new PdfPrinter({
  ...(hasTimesNewRomanFonts
    ? {
        TimesNewRoman: {
          normal: TIMES_NEW_ROMAN_FONT_PATHS.normal,
          bold: TIMES_NEW_ROMAN_FONT_PATHS.bold,
          italics: TIMES_NEW_ROMAN_FONT_PATHS.italics,
          bolditalics: TIMES_NEW_ROMAN_FONT_PATHS.bolditalics,
        },
      }
    : {}),
  Roboto: {
    normal: Buffer.from(robotoVfs["Roboto-Regular.ttf"], "base64"),
    bold: Buffer.from(robotoVfs["Roboto-Medium.ttf"], "base64"),
    italics: Buffer.from(robotoVfs["Roboto-Italic.ttf"], "base64"),
    bolditalics: Buffer.from(robotoVfs["Roboto-MediumItalic.ttf"], "base64"),
  },
});
