import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ЛЕГКОДОК | Юридические документы онлайн",
  description:
    "Заполните юридический документ онлайн, проверьте PDF с водяным знаком и оплатите чистую версию.",
  openGraph: {
    title: "ЛЕГКОДОК",
    description:
      "Онлайн-сервис для быстрого заполнения простых юридических документов.",
    type: "website",
  },
};

const legalItems = [
  { title: "Пользовательское соглашение" },
  { title: "Оферта" },
  { title: "Политика конфиденциальности", href: "/privacy" },
  { title: "Согласие на обработку персональных данных" },
  { title: "Политика cookie" },
];

const supportItems = ["Контакты", "Реквизиты", "Возврат и отмена оплаты"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <header className="border-b border-[#d9d9d4] bg-[#f6f6f4]/90 backdrop-blur">
          <div className="page-shell flex items-center justify-between py-4">
            <Link className="brand-logo text-lg font-black tracking-normal" href="/">
              ЛЕГКОДОК
            </Link>
            <nav className="sans flex items-center gap-4 text-sm text-[#3a3a3a]">
              <Link href="/documents">Документы</Link>
              <Link href="/documents/raspiska-o-poluchenii-deneg">
                Расписка
              </Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="border-t border-[#d8d2ca] bg-[linear-gradient(180deg,rgba(252,251,248,0.98)_0%,rgba(244,240,233,0.92)_100%)]">
          <div className="page-shell py-0">
            <div className="overflow-hidden rounded-t-[34px] border-x border-t border-[#d8d2ca] bg-[rgba(255,255,255,0.58)] shadow-[0_-16px_40px_rgba(17,17,17,0.03)]">
              <div className="border-b border-[#d8d2ca] px-5 pb-6 pt-8 md:px-8 md:pb-8 md:pt-12">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
                  <div className="min-w-0">
                    <div className="sans text-[42px] font-normal uppercase leading-[0.92] tracking-[-0.02em] text-[#111111] md:text-[64px] lg:text-[92px] xl:text-[108px]">
                      ЛЕГКОДОК
                    </div>
                  </div>

                  <div className="grid gap-2 self-center text-[14px] leading-6 text-[#5b5751] lg:justify-self-end lg:text-right">
                    <p>О сервисе</p>
                    <p>Пользовательское соглашение</p>
                    <p>Оферта</p>
                  </div>
                </div>
              </div>

              <div className="grid border-b border-[#d8d2ca] md:grid-cols-3">
                <div className="border-b border-[#d8d2ca] px-5 py-6 md:border-b-0 md:border-r md:px-6 lg:px-8">
                  <p className="sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#7d766d]">
                    Навигация
                  </p>
                  <div className="mt-4 space-y-2.5 text-[15px] leading-6 text-[#262522]">
                    <Link
                      className="block transition hover:text-[#111111]"
                      href="/documents"
                    >
                      Документы
                    </Link>
                    <span className="block">Категории</span>
                    <span className="block">Как это работает</span>
                  </div>
                </div>

                <div className="border-b border-[#d8d2ca] px-5 py-6 md:border-b-0 md:border-r md:px-6 lg:px-8">
                  <p className="sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#7d766d]">
                    Правовое
                  </p>
                  <div className="mt-4 space-y-2.5 text-[15px] leading-6 text-[#262522]">
                    {legalItems.map((item) =>
                      item.href ? (
                        <Link
                          className="block transition hover:text-[#111111]"
                          href={item.href}
                          key={item.title}
                        >
                          {item.title}
                        </Link>
                      ) : (
                        <span className="block" key={item.title}>
                          {item.title}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div className="px-5 py-6 md:px-6 lg:px-8">
                  <p className="sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#7d766d]">
                    Поддержка
                  </p>
                  <div className="mt-4 space-y-2.5 text-[15px] leading-6 text-[#262522]">
                    {supportItems.map((item) => (
                      <span className="block" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 px-5 py-4 text-[13px] leading-6 text-[#7b766f] md:flex-row md:items-end md:justify-between md:px-8">
                <p className="max-w-[60ch]">
                  Документ является типовым шаблоном и не заменяет
                  индивидуальную юридическую консультацию. Перед использованием
                  проверьте данные и убедитесь, что документ подходит для вашей
                  ситуации.
                </p>
                <div className="flex flex-wrap gap-4 text-[#5b5751]">
                  <Link
                    className="transition hover:text-[#111111]"
                    href="/privacy"
                  >
                    Политика конфиденциальности
                  </Link>
                  <span>© ЛЕГКОДОК</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
