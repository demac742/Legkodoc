import { NextResponse } from "next/server";
import { getDocumentBySlug } from "@/lib/documents";
import { orders } from "@/lib/order-store";
import { createPdfBuffer } from "@/lib/pdf-buffer";
import { buildPdfDefinition } from "@/lib/pdf-definition";

type RouteContext = {
  params: Promise<{ orderId: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { orderId } = await params;
  const order = orders.get(orderId);

  if (!order || order.status !== "paid") {
    return NextResponse.json(
      { error: "Clean PDF is available only after verified payment" },
      { status: 403 },
    );
  }

  const document = getDocumentBySlug(order.documentSlug);
  if (!document) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  try {
    const definition = buildPdfDefinition(document, order.values, {
      watermark: false,
    });
    const buffer = await createPdfBuffer(definition);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${document.slug}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Clean PDF generation failed", error);
    return NextResponse.json(
      { error: "PDF generation failed" },
      { status: 500 },
    );
  }
}
