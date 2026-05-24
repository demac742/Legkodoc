import { NextResponse } from "next/server";
import { orders } from "@/lib/order-store";

type YooKassaWebhook = {
  event?: string;
  object?: {
    id?: string;
    status?: string;
    metadata?: {
      orderId?: string;
    };
  };
};

export async function POST(request: Request) {
  const body = (await request.json()) as YooKassaWebhook;
  const orderId = body.object?.metadata?.orderId;

  if (!orderId) {
    return NextResponse.json({ ok: true });
  }

  const order = orders.get(orderId);
  if (!order) {
    return NextResponse.json({ ok: true });
  }

  if (body.object?.status === "succeeded" || body.event === "payment.succeeded") {
    order.status = "paid";
  }

  if (body.object?.status === "canceled" || body.event === "payment.canceled") {
    order.status = "failed";
  }

  orders.set(order.id, order);

  return NextResponse.json({ ok: true });
}
