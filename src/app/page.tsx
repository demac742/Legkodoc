import type { Metadata } from "next";
import { Check, FileText } from "lucide-react";
import { HomeDiscovery } from "@/components/home-discovery";
import { RippleButton } from "../../components/animata/button/ripple-button";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ЛЕГКОДОК",
    description:
      "Онлайн-сервис для быстрого заполнения простых юридических документов.",
    type: "website",
    url: "/",
  },
};

const steps = [
  {
    index: "01",
    title: "Выберите документ",
    text: "Выберите документ из каталога или воспользуйтесь поиском. Без регистрации.",
  },
  {
    index: "02",
    title: "Ответьте на вопросы",
    text: "Конструктор ведет по логике документа, показывает только нужные поля и сохраняет черновик прямо в браузере.",
  },
  {
    index: "03",
    title: "Проверьте и скачайте документ",
    text: "Сначала бесплатно посмотрите версию с водяным знаком, затем оплатите и сразу скачайте заполненный документ без лишних шагов.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="border-b border-[#ddd8d1] bg-[linear-gradient(180deg,rgba(247,244,238,0.96)_0%,rgba(240,235,227,0.84)_100%)]">
        <div className="page-shell py-10 md:py-16">
          <div className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,1.08fr)_470px] lg:items-end">
            <div className="min-w-0 max-w-4xl">
              <h1 className="sans max-w-[9.5ch] text-[62px] font-bold leading-[0.9] text-[#18181a] md:text-[106px]">
                Документы
                <br />
                онлайн
              </h1>

              <p className="sans mt-7 max-w-3xl text-lg font-medium leading-8 text-[#343434] md:text-[31px] md:leading-[1.28]">
                Заполните шаблон за 5 минут и получите готовый документ.
              </p>

              <div className="mt-9 flex flex-wrap gap-3 text-sm text-[#4f4d48]">
                {[
                  "Без регистрации",
                  "Разовая оплата",
                  "От 49 до 149 рублей",
                ].map((item) => (
                  <span
                    className="rounded-full border border-[#dcd6ce] bg-[rgba(255,255,255,0.64)] px-4 py-2 shadow-[0_10px_22px_rgba(17,17,17,0.03)] backdrop-blur-sm"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-11 max-w-2xl rounded-[34px] border border-[#dcd5cb] bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(251,249,245,0.94)_100%)] p-6 shadow-[0_26px_68px_rgba(17,17,17,0.07)] backdrop-blur-sm md:p-7">
                <div className="flex flex-col gap-6">
                  <div className="max-w-xl">
                    <p className="sans text-xs font-bold uppercase tracking-[0.16em] text-[#7a746d]">
                      Начать с каталога
                    </p>
                    <p className="mt-3 text-[17px] leading-8 text-[#282826]">
                      Выберите нужный документ и начните заполнение прямо
                      сейчас.
                    </p>
                  </div>

                  <div className="w-full rounded-[28px] border border-[#ece6de] bg-[linear-gradient(180deg,#f8f4ef_0%,#f3eee8_100%)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                    <RippleButton
                      className="max-w-[440px]"
                      href="/#documents-discovery"
                      label="Выбрать документ"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[470px] min-w-0 lg:mx-0">
              <div className="absolute left-8 top-8 h-[470px] w-[80%] rounded-[38px] border border-[#d7d1c9] bg-[linear-gradient(180deg,#ece7df_0%,#e3ddd3_100%)] shadow-[0_24px_64px_rgba(17,17,17,0.06)]" />
              <div className="absolute right-0 top-0 h-[486px] w-[84%] rounded-[38px] border border-[#ddd7cf] bg-[linear-gradient(180deg,#f8f5f1_0%,#eee8df_100%)] shadow-[0_26px_72px_rgba(17,17,17,0.08)]" />

              <div className="relative ml-auto w-[88%] overflow-hidden rounded-[38px] border border-[#d7d1c9] bg-[linear-gradient(180deg,#ffffff_0%,#faf7f2_100%)] shadow-[0_28px_90px_rgba(17,17,17,0.10)]">
                <div className="border-b border-[#ece7df] px-7 py-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a837b]">
                        Как работает сервис
                      </p>
                      <h2 className="mt-2 text-[24px] font-semibold leading-[1.12] text-[#242320] md:text-[26px]">
                        Лёгкий путь
                        <br />
                        от шаблона до документа
                      </h2>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#ddd7cf] bg-[#f7f4ef] text-[#262626]">
                      <FileText size={18} />
                    </div>
                  </div>
                </div>

                <div className="px-7 py-6">
                  <div className="mt-1 overflow-hidden rounded-[28px] border border-[#e4ddd5] bg-[linear-gradient(180deg,#fffdfa_0%,#fbf8f3_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                    {steps.map((item, index) => (
                      <div
                        className={`grid gap-2.5 px-5 py-4 ${
                          index !== steps.length - 1
                            ? "border-b border-[#ebe5dc]/90"
                            : ""
                        }`}
                        key={item.index}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#ded7cf] bg-[linear-gradient(180deg,#f8f4ee_0%,#f1ebe3_100%)] text-[#1f1f1d] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
                            <Check size={14} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-3">
                              <span className="sans text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a837b]">
                                {item.index}
                              </span>
                              <p className="text-[15px] font-semibold leading-6 text-[#1f1f1d]">
                                {item.title}
                              </p>
                            </div>
                            <p className="mt-1.5 max-w-[30ch] text-[13px] leading-6 text-[#57534d]">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-b border-[#e3ddd4] bg-[linear-gradient(180deg,rgba(250,248,244,0.84)_0%,rgba(244,240,233,0.64)_100%)]"
        id="documents-discovery"
      >
        <div className="page-shell">
          <HomeDiscovery />
        </div>
      </section>
    </main>
  );
}
