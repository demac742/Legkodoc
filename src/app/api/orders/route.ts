import { NextResponse } from "next/server";
import { getDocumentBySlug } from "@/lib/documents";
import { orders } from "@/lib/order-store";
import type { DocumentOrder, DocumentValues } from "@/lib/types";
import { createYooKassaPayment, isYooKassaConfigured } from "@/lib/yookassa";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    slug?: string;
    values?: DocumentValues;
  };
  const document = body.slug ? getDocumentBySlug(body.slug) : undefined;

  if (!document) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  if (!isYooKassaConfigured()) {
    return NextResponse.json(
      {
        error:
          "ЮKassa не настроена. Добавьте YOOKASSA_SHOP_ID и YOOKASSA_SECRET_KEY в .env.local.",
      },
      { status: 503 },
    );
  }

  const origin = new URL(request.url).origin;
  const order: DocumentOrder = {
    id: crypto.randomUUID(),
    documentSlug: document.slug,
    status: "created",
    amount: document.price,
    values: body.values ?? {},
    createdAt: new Date().toISOString(),
  };

  const payment = await createYooKassaPayment({
    orderId: order.id,
    amount: document.price,
    description: `ЛЕГКОДОК: ${document.title}`,
    returnUrl: `${origin}/payment/success?orderId=${order.id}`,
  });

  order.status = "pending_payment";
  order.yookassaPaymentId = payment.id;
  order.confirmationUrl = payment.confirmation?.confirmation_url;
  orders.set(order.id, order);

  return NextResponse.json({
    orderId: order.id,
    status: order.status,
    confirmationUrl: order.confirmationUrl,
  });
}
