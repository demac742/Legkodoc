import type { Metadata } from "next";
import { ConstructorClient } from "@/components/constructor-client";
import { getDocumentBySlug } from "@/lib/documents";

export const metadata: Metadata = {
  title: "Заполнение: Расписка о получении денег | ЛЕГКОДОК",
  description:
    "Ответьте на простые вопросы и сформируйте PDF: расписка о получении денег.",
};

export default function ReceiptConstructorPage() {
  const document = getDocumentBySlug("raspiska-o-poluchenii-deneg");

  if (!document) {
    throw new Error("Document config not found");
  }

  return <ConstructorClient document={document} />;
}
