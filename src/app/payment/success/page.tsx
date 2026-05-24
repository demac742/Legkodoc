import { Download } from "lucide-react";
import Link from "next/link";

type PageProps = {
  searchParams: Promise<{ orderId?: string }>;
};

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
  const { orderId } = await searchParams;

  return (
    <main className="page-shell section">
      <section className="panel max-w-2xl p-8">
        <p className="sans text-sm font-bold uppercase text-[#70706b]">
          оплата
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Проверяем статус платежа</h1>
        <p className="mt-5 leading-7 text-[#4a4a47]">
          Если ЮKassa уже отправила webhook об успешной оплате, чистый PDF можно
          скачать по кнопке ниже. Если статус ещё не дошёл, обновите страницу
          через несколько секунд.
        </p>
        {orderId ? (
          <a className="button-primary mt-7" href={`/api/pdf/clean/${orderId}`}>
            <Download size={18} /> Скачать PDF без водяного знака
          </a>
        ) : (
          <p className="sans mt-7 text-sm font-bold">Номер заказа не найден.</p>
        )}
        <div className="mt-7">
          <Link className="sans text-sm font-bold underline" href="/documents">
            Вернуться в каталог
          </Link>
        </div>
      </section>
    </main>
  );
}
