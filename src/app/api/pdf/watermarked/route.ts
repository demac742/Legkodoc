import { NextResponse } from "next/server";
import { getDocumentBySlug } from "@/lib/documents";
import { createPdfBuffer } from "@/lib/pdf-buffer";
import { buildPdfDefinition } from "@/lib/pdf-definition";
import type { DocumentValues } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    slug?: string;
    values?: DocumentValues;
  };
  const document = body.slug ? getDocumentBySlug(body.slug) : undefined;

  if (!document) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  try {
    const definition = buildPdfDefinition(document, body.values ?? {}, {
      watermark: true,
    });
    const buffer = await createPdfBuffer(definition);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${document.slug}-watermarked.pdf"`,
      },
    });
  } catch (error) {
    console.error("Watermarked PDF generation failed", error);
    const message = error instanceof Error ? error.message : "PDF generation failed";
    return NextResponse.json(
      { error: "PDF generation failed", message },
      { status: 500 },
    );
  }
}
