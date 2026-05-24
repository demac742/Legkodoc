declare module "pdfmake/build/vfs_fonts" {
  const pdfFonts: {
    default?: typeof pdfFonts;
    pdfMake?: typeof pdfFonts;
    vfs?: Record<string, string>;
    "Roboto-Regular.ttf"?: string;
    "Roboto-Medium.ttf"?: string;
    "Roboto-Italic.ttf"?: string;
    "Roboto-MediumItalic.ttf"?: string;
  };

  export default pdfFonts;
}
