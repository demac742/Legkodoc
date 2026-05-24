import type { DocumentPageContent } from "@/lib/types";

type DocumentFaqProps = {
  items: DocumentPageContent["faq"];
};

export function DocumentFaq({ items }: DocumentFaqProps) {
  return (
    <div className="mt-6 grid gap-4">
      {items.map((item) => (
        <details className="panel p-5" key={item.question}>
          <summary className="cursor-pointer text-xl font-semibold">
            {item.question}
          </summary>
          <p className="mt-3 leading-7 text-[#4a4a47]">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
