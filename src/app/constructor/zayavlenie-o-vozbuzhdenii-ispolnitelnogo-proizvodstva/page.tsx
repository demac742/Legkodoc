import type { Metadata } from "next";
import { ConstructorClient } from "@/components/constructor-client";
import { getDocumentBySlug } from "@/lib/documents";

export const metadata: Metadata = {
  title:
    "Заполнение: Заявление о возбуждении исполнительного производства | ЛЕГКОДОК",
  description:
    "Ответьте на простые вопросы и сформируйте PDF: заявление о возбуждении исполнительного производства.",
};

export default function EnforcementConstructorPage() {
  const document = getDocumentBySlug(
    "zayavlenie-o-vozbuzhdenii-ispolnitelnogo-proizvodstva",
  );

  if (!document) {
    throw new Error("Document config not found");
  }

  return <ConstructorClient document={document} />;
}
