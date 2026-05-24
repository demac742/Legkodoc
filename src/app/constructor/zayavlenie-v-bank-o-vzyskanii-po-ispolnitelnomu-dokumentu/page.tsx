import type { Metadata } from "next";
import { ConstructorClient } from "@/components/constructor-client";
import { getDocumentBySlug } from "@/lib/documents";

export const metadata: Metadata = {
  title:
    "Заполнение: Заявление в банк по исполнительному документу | ЛЕГКОДОК",
  description:
    "Ответьте на простые вопросы и сформируйте PDF: заявление о взыскании денежных средств по исполнительному документу в банк.",
};

export default function BankEnforcementConstructorPage() {
  const document = getDocumentBySlug(
    "zayavlenie-v-bank-o-vzyskanii-po-ispolnitelnomu-dokumentu",
  );

  if (!document) {
    throw new Error("Document config not found");
  }

  return <ConstructorClient document={document} />;
}
