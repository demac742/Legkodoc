type YooKassaPaymentResponse = {
  id: string;
  status: string;
  confirmation?: {
    type: string;
    confirmation_url?: string;
  };
};

export function isYooKassaConfigured() {
  return Boolean(process.env.YOOKASSA_SHOP_ID && process.env.YOOKASSA_SECRET_KEY);
}

export async function createYooKassaPayment(input: {
  orderId: string;
  amount: number;
  description: string;
  returnUrl: string;
}) {
  const shopId = process.env.YOOKASSA_SHOP_ID;
  const secretKey = process.env.YOOKASSA_SECRET_KEY;

  if (!shopId || !secretKey) {
    throw new Error("YOOKASSA_SHOP_ID and YOOKASSA_SECRET_KEY are required");
  }

  const credentials = Buffer.from(`${shopId}:${secretKey}`).toString("base64");
  const response = await fetch("https://api.yookassa.ru/v3/payments", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
      "Idempotence-Key": input.orderId,
    },
    body: JSON.stringify({
      amount: {
        value: input.amount.toFixed(2),
        currency: "RUB",
      },
      capture: true,
      confirmation: {
        type: "redirect",
        return_url: input.returnUrl,
      },
      description: input.description,
      metadata: {
        orderId: input.orderId,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`YooKassa payment failed: ${errorText}`);
  }

  return (await response.json()) as YooKassaPaymentResponse;
}
