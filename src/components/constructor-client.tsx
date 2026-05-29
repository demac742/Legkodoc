"use client";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Download,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import type { ReactElement, ReactNode } from "react";
import { startTransition, useEffect, useMemo, useState } from "react";
import {
  courtAttachmentText,
  enforcementDocumentDisplayName,
  getPowerOfAttorneyPresetPowerText,
  POWER_OF_ATTORNEY_PRESET_POWERS,
  toGenitiveFullName,
} from "@/lib/document-content";
import { numberToRussianRubles } from "@/lib/russian-money";
import type {
  ConstructorChoiceStep,
  ConstructorFieldGroupStep,
  ConstructorStep,
  DocumentField,
  DocumentTemplate,
  DocumentValues,
} from "@/lib/types";

type Props = {
  document: DocumentTemplate;
  variant?: "standalone" | "embedded";
};

type StepStatus = {
  complete: boolean;
  missing: string[];
};

type InlineConstructorProps = {
  document: DocumentTemplate;
  errors: Record<string, string>;
  fieldLookup: Map<string, DocumentField>;
  onChange: (id: string, value: string | boolean) => void;
  onDownload: () => void;
  onPayment: () => void;
  status: string;
  values: DocumentValues;
};

function withDocumentDefaults(
  slug: string,
  values: DocumentValues,
): DocumentValues {
  if (slug === "zayavlenie-v-bank-o-vzyskanii-po-ispolnitelnomu-dokumentu") {
    const debtorName = String(
      values.debtorFullName || values.debtorLegalName || "",
    );
    const hasGenitiveValue = Object.prototype.hasOwnProperty.call(
      values,
      "debtorFullNameGenitive",
    );

    return {
      ...values,
      debtorFullNameGenitive: hasGenitiveValue
        ? values.debtorFullNameGenitive
        : toGenitiveFullName(debtorName),
    };
  }

  if (slug !== "nenotarialnaya-doverennost") {
    return values;
  }

  return {
    validForUnit: "год",
    validUntilInclusive: "включительно",
    principalNamingGender: "male",
    representativeNamingGender: "male",
    ...values,
  };
}

const AUTO_WORDS_FIELD_MAP: Record<string, string> = {
  amountNumber: "amountWords",
  interestAmountNumber: "interestAmountWords",
  claimAmountNumber: "claimAmountWords",
  totalReturnAmountNumber: "totalReturnAmountWords",
};

const RUSSIAN_COUNT_ONES = [
  "",
  "один",
  "два",
  "три",
  "четыре",
  "пять",
  "шесть",
  "семь",
  "восемь",
  "девять",
];

const RUSSIAN_COUNT_TEENS = [
  "десять",
  "одиннадцать",
  "двенадцать",
  "тринадцать",
  "четырнадцать",
  "пятнадцать",
  "шестнадцать",
  "семнадцать",
  "восемнадцать",
  "девятнадцать",
];

const RUSSIAN_COUNT_TENS = [
  "",
  "",
  "двадцать",
  "тридцать",
  "сорок",
  "пятьдесят",
  "шестьдесят",
  "семьдесят",
  "восемьдесят",
  "девяносто",
];

const RUSSIAN_COUNT_HUNDREDS = [
  "",
  "сто",
  "двести",
  "триста",
  "четыреста",
  "пятьсот",
  "шестьсот",
  "семьсот",
  "восемьсот",
  "девятьсот",
];

function renderInlineConstructor(
  slug: string,
  props: InlineConstructorProps,
): ReactElement | null {
  switch (slug) {
    case "raspiska-o-poluchenii-deneg":
      return <ReceiptInlineConstructor {...props} />;
    case "zayavlenie-o-vozbuzhdenii-ispolnitelnogo-proizvodstva":
      return <EnforcementProceedingInlineConstructor {...props} />;
    case "zayavlenie-o-hode-ispolnitelnogo-proizvodstva":
      return <EnforcementProgressInfoInlineConstructor {...props} />;
    case "zayavlenie-v-bank-o-vzyskanii-po-ispolnitelnomu-dokumentu":
      return <BankEnforcementInlineConstructor {...props} />;
    case "nenotarialnaya-doverennost":
      return <PowerOfAttorneyInlineConstructor {...props} />;
    default:
      return null;
  }
}

function hasInlineConstructor(slug: string) {
  return (
    slug === "raspiska-o-poluchenii-deneg" ||
    slug === "zayavlenie-o-vozbuzhdenii-ispolnitelnogo-proizvodstva" ||
    slug === "zayavlenie-o-hode-ispolnitelnogo-proizvodstva" ||
    slug === "zayavlenie-v-bank-o-vzyskanii-po-ispolnitelnomu-dokumentu" ||
    slug === "nenotarialnaya-doverennost"
  );
}

function parseMoneyValue(value: string | boolean | undefined) {
  if (typeof value !== "string") {
    return null;
  }

  const digits = value.replace(/[^\d]/g, "");

  if (!digits) {
    return null;
  }

  const parsedValue = Number.parseInt(digits, 10);

  return Number.isFinite(parsedValue) ? parsedValue : null;
}

function numberToRussianCountWords(rawValue: string | boolean | undefined) {
  if (typeof rawValue !== "string") {
    return "";
  }

  const digits = rawValue.replace(/[^\d]/g, "");

  if (!digits) {
    return "";
  }

  const value = Number.parseInt(digits, 10);

  if (!Number.isFinite(value) || value <= 0 || value > 999) {
    return digits;
  }

  const hundreds = Math.floor(value / 100);
  const tensUnits = value % 100;
  const tens = Math.floor(tensUnits / 10);
  const units = tensUnits % 10;
  const words: string[] = [];

  if (hundreds > 0) {
    words.push(RUSSIAN_COUNT_HUNDREDS[hundreds]);
  }

  if (tensUnits >= 10 && tensUnits <= 19) {
    words.push(RUSSIAN_COUNT_TEENS[tensUnits - 10]);
  } else {
    if (tens > 0) {
      words.push(RUSSIAN_COUNT_TENS[tens]);
    }

    if (units > 0) {
      words.push(RUSSIAN_COUNT_ONES[units]);
    }
  }

  return words.join(" ");
}

function InlineNumberedRow({
  marker,
  children,
}: {
  marker: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[28px_1fr] gap-3 leading-8">
      <div className="text-right">{marker}</div>
      <div>{children}</div>
    </div>
  );
}

function InlineFieldGroup({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex max-w-full flex-wrap items-baseline gap-1 align-baseline sm:flex-nowrap">
      {children}
    </span>
  );
}

function responsiveInlineWidth(widthClass: string) {
  return widthClass
    .split(" ")
    .filter(Boolean)
    .map((className) =>
      className.startsWith("w-") || className.startsWith("min-w-")
        ? `sm:${className}`
        : className,
    )
    .join(" ");
}

export function ConstructorClient({ document, variant = "standalone" }: Props) {
  const storageKey = `document-draft:${document.slug}`;
  const usesScenarioConstructor = Boolean(document.constructorSteps?.length);
  const isEmbedded = variant === "embedded";
  const [values, setValues] = useState<DocumentValues>(() =>
    withDocumentDefaults(document.slug, {}),
  );
  const [draftReady, setDraftReady] = useState(false);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");

  const fieldLookup = useMemo(
    () => new Map(document.fields.map((field) => [field.id, field])),
    [document.fields],
  );

  const visibleFields = useMemo(
    () =>
      document.fields.filter((field) => {
        if (field.id === "returnDate") {
          return values.hasReturnDate === true;
        }

        return true;
      }),
    [document.fields, values.hasReturnDate],
  );

  const visibleConstructorSteps = useMemo(
    () =>
      (document.constructorSteps ?? []).filter((constructorStep) =>
        isVisible(constructorStep, values),
      ),
    [document.constructorSteps, values],
  );

  const stepStatuses = useMemo(
    () =>
      new Map(
        visibleConstructorSteps.map((constructorStep) => [
          constructorStep.id,
          getConstructorStepStatus(constructorStep, values, fieldLookup),
        ]),
      ),
    [fieldLookup, values, visibleConstructorSteps],
  );

  const stepCount = usesScenarioConstructor
    ? visibleConstructorSteps.length
    : visibleFields.length;
  const safeStepCount = Math.max(stepCount, 1);
  const activeStep = Math.min(step, safeStepCount - 1);
  const currentField = visibleFields[activeStep];
  const currentConstructorStep = visibleConstructorSteps[activeStep];
  const isLastStep = activeStep === safeStepCount - 1;
  const scenarioCompletedSteps = visibleConstructorSteps.filter(
    (constructorStep) => stepStatuses.get(constructorStep.id)?.complete,
  ).length;
  const scenarioCompletion = visibleConstructorSteps.length
    ? Math.round((scenarioCompletedSteps / visibleConstructorSteps.length) * 100)
    : 0;
  const legacyCompletion = Math.round(((activeStep + 1) / safeStepCount) * 100);
  const missingItems = usesScenarioConstructor
    ? getScenarioMissingItems(visibleConstructorSteps, stepStatuses)
    : [];

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);

    if (!saved) {
      startTransition(() => {
        setValues(withDocumentDefaults(document.slug, {}));
        setDraftReady(true);
      });
      return;
    }

    try {
      const parsed = JSON.parse(saved) as DocumentValues;
      startTransition(() => {
        setValues(withDocumentDefaults(document.slug, parsed));
        setDraftReady(true);
      });
    } catch {
      window.localStorage.removeItem(storageKey);
      startTransition(() => {
        setValues(withDocumentDefaults(document.slug, {}));
        setDraftReady(true);
      });
    }
  }, [document.slug, storageKey]);

  useEffect(() => {
    if (!draftReady) {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(values));
  }, [draftReady, storageKey, values]);

  function updateValue(id: string, value: string | boolean) {
    setValues((current) => {
      const nextValues: DocumentValues = withDocumentDefaults(document.slug, {
        ...current,
        [id]: value,
      });
      const wordsFieldId = AUTO_WORDS_FIELD_MAP[id];

      if (wordsFieldId && typeof value === "string") {
        nextValues[wordsFieldId] = numberToRussianRubles(value);
      }

      if (id === "validForNumber") {
        nextValues.validForWords = numberToRussianCountWords(value);
      }

      if (
        document.slug === "zayavlenie-v-bank-o-vzyskanii-po-ispolnitelnomu-dokumentu" &&
        id === "debtorFullName" &&
        typeof value === "string"
      ) {
        const previousDebtorName = String(current.debtorFullName ?? "");
        const previousGenitive = String(current.debtorFullNameGenitive ?? "");
        const previousAutoGenitive = toGenitiveFullName(previousDebtorName);

        if (!previousGenitive || previousGenitive === previousAutoGenitive) {
          nextValues.debtorFullNameGenitive = toGenitiveFullName(value);
        }
      }

      const validForNumber = String(nextValues.validForNumber ?? "");
      const validForWords = String(nextValues.validForWords ?? "");
      const validForUnit = String(nextValues.validForUnit ?? "");

      if (validForNumber || validForWords || validForUnit) {
        nextValues.validFor = [
          validForNumber,
          validForWords ? `(${validForWords})` : "",
          validForUnit,
        ]
          .filter(Boolean)
          .join(" ");
      }

      if (
        document.slug === "raspiska-o-poluchenii-deneg" &&
        (id === "amountNumber" || id === "totalReturnAmountNumber")
      ) {
        const amount = parseMoneyValue(nextValues.amountNumber);
        const totalReturnAmount = parseMoneyValue(nextValues.totalReturnAmountNumber);

        if (amount === null || totalReturnAmount === null || totalReturnAmount < amount) {
          nextValues.interestAmountNumber = "";
          nextValues.interestAmountWords = "";
        } else {
          const interestAmount = String(totalReturnAmount - amount);
          nextValues.interestAmountNumber = interestAmount;
          nextValues.interestAmountWords = numberToRussianRubles(interestAmount);
        }
      }

      return nextValues;
    });
    setErrors((current) => ({ ...current, [id]: "" }));
  }

  function buildValidationErrors() {
    const nextErrors: Record<string, string> = {};

    if (hasInlineConstructor(document.slug)) {
      return buildInlineValidationErrors(document.slug, values, fieldLookup);
    }

    if (usesScenarioConstructor) {
      for (const constructorStep of visibleConstructorSteps) {
        if (constructorStep.type === "choice") {
          validateChoiceStep(constructorStep, values, nextErrors);
        }

        if (constructorStep.type === "fieldGroup") {
          validateFieldGroupStep(constructorStep, values, fieldLookup, nextErrors);
        }
      }

      return nextErrors;
    }

    for (const field of visibleFields) {
      validateField(field, values, nextErrors);
    }

    return nextErrors;
  }

  function validateCurrentStep() {
    const nextErrors: Record<string, string> = {};

    if (usesScenarioConstructor) {
      if (!currentConstructorStep) {
        return true;
      }

      if (currentConstructorStep.type === "choice") {
        validateChoiceStep(currentConstructorStep, values, nextErrors);
      }

      if (currentConstructorStep.type === "fieldGroup") {
        validateFieldGroupStep(currentConstructorStep, values, fieldLookup, nextErrors);
      }
    } else if (currentField) {
      validateField(currentField, values, nextErrors);
    }

    setErrors((current) => ({ ...current, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  }

  function validateAll() {
    const nextErrors = buildValidationErrors();
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goNext() {
    if (!validateCurrentStep()) {
      return;
    }

    setStep(Math.min(activeStep + 1, safeStepCount - 1));
  }

  async function downloadWatermarkedPdf() {
    if (!validateAll()) {
      setStatus("Заполните обязательные поля.");
      return;
    }

    setStatus("Готовим PDF с водяным знаком...");
    const response = await fetch("/api/pdf/watermarked", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: document.slug, values }),
    });

    if (!response.ok) {
      setStatus("Не удалось сформировать PDF.");
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = window.document.createElement("a");
    link.href = url;
    link.download = `${document.slug}-watermarked.pdf`;
    link.click();
    window.URL.revokeObjectURL(url);
    setStatus("PDF с водяным знаком готов.");
  }

  async function startPayment() {
    if (!validateAll()) {
      setStatus("Заполните обязательные поля перед оплатой.");
      return;
    }

    setStatus("Создаем заказ в ЮKassa...");
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: document.slug, values }),
    });

    const data = (await response.json()) as {
      confirmationUrl?: string;
      error?: string;
    };

    if (!response.ok || !data.confirmationUrl) {
      setStatus(data.error ?? "ЮKassa не вернула ссылку на оплату.");
      return;
    }

    window.location.assign(data.confirmationUrl);
  }

  const inlineConstructorContent = renderInlineConstructor(document.slug, {
    document,
    errors,
    fieldLookup,
    onChange: updateValue,
    onDownload: downloadWatermarkedPdf,
    onPayment: startPayment,
    status,
    values,
  });

  if (inlineConstructorContent) {
    const content = inlineConstructorContent;

    if (isEmbedded) {
      return content;
    }

    return (
      <main className="page-shell section">
        <Link
          className="sans mb-8 inline-flex items-center gap-2 text-sm font-bold"
          href={`/documents/${document.slug}`}
        >
          <ArrowLeft size={16} /> Назад к странице документа
        </Link>
        {content}
      </main>
    );
  }

  if (usesScenarioConstructor) {
    const content = (
      <div>
        <section
          className={`panel overflow-hidden ${
            isEmbedded ? "shadow-[0_24px_62px_rgba(17,17,17,0.06)]" : ""
          }`}
        >
          <div className="border-b border-[#d9d9d4] bg-white/70 p-6 md:p-8">
            <p className="sans text-sm font-bold uppercase tracking-[0.14em] text-[#70706b]">
              Конструктор документа
            </p>
            {isEmbedded ? (
              <h2 className="mt-3 text-4xl font-semibold">
                Заполните документ по шагам
              </h2>
            ) : (
              <h1 className="mt-3 text-4xl font-semibold">{document.title}</h1>
            )}
            <p className="mt-4 max-w-2xl leading-7 text-[#4a4a47]">
              Выбирайте варианты и заполняйте поля. Текст справа меняется сразу,
              а черновик сохраняется в браузере.
            </p>
            <ScenarioProgress
              completion={scenarioCompletion}
              steps={visibleConstructorSteps}
              statuses={stepStatuses}
            />
          </div>

          <div className="grid gap-0">
            {visibleConstructorSteps.map((constructorStep, index) => {
              const isUnlocked = arePreviousStepsComplete(
                visibleConstructorSteps,
                stepStatuses,
                index,
              );
              const stepStatus = stepStatuses.get(constructorStep.id) ?? {
                complete: false,
                missing: [],
              };

              return (
                <ScenarioBlock
                  errors={errors}
                  fieldLookup={fieldLookup}
                  isUnlocked={isUnlocked}
                  key={constructorStep.id}
                  number={index + 1}
                  onChange={updateValue}
                  status={stepStatus}
                  step={constructorStep}
                  values={values}
                />
              );
            })}
          </div>

          <ConstructorActions
            document={document}
            missingItems={missingItems}
            onDownload={downloadWatermarkedPdf}
            onPayment={startPayment}
            status={status}
          />
        </section>
      </div>
    );

    if (isEmbedded) {
      return content;
    }

    return (
      <main className="page-shell section">
        <Link
          className="sans mb-8 inline-flex items-center gap-2 text-sm font-bold"
          href={`/documents/${document.slug}`}
        >
          <ArrowLeft size={16} /> Назад к странице документа
        </Link>
        {content}
      </main>
    );
  }

  return (
    <main className={isEmbedded ? "" : "page-shell section"}>
      {!isEmbedded ? (
        <Link
          className="sans mb-8 inline-flex items-center gap-2 text-sm font-bold"
          href={`/documents/${document.slug}`}
        >
          <ArrowLeft size={16} /> Назад к странице документа
        </Link>
      ) : null}

      <div>
        <section
          className={`panel p-6 md:p-8 ${
            isEmbedded ? "shadow-[0_24px_62px_rgba(17,17,17,0.06)]" : ""
          }`}
        >
          <LegacyProgress
            completion={legacyCompletion}
            currentStep={activeStep}
            totalSteps={visibleFields.length}
          />

          {isEmbedded ? (
            <h2 className="text-4xl font-semibold">Заполните документ</h2>
          ) : (
            <h1 className="text-4xl font-semibold">{document.title}</h1>
          )}
          <p className="mt-3 max-w-2xl leading-7 text-[#4a4a47]">
            Ответьте на вопросы. Черновик сохраняется автоматически в браузере.
          </p>

          <LegacyFieldBody
            errors={errors}
            field={currentField}
            onChange={updateValue}
            values={values}
          />

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              className="button-secondary disabled:cursor-not-allowed disabled:opacity-45"
              disabled={activeStep === 0}
              onClick={() => setStep(Math.max(activeStep - 1, 0))}
              type="button"
            >
              Назад
            </button>
            {!isLastStep ? (
              <button className="button-primary" onClick={goNext} type="button">
                Далее <ArrowRight size={18} />
              </button>
            ) : (
              <>
                <button
                  className="button-secondary"
                  onClick={downloadWatermarkedPdf}
                  type="button"
                >
                  <Download size={18} /> PDF с водяным знаком
                </button>
                <button className="button-primary" onClick={startPayment} type="button">
                  <WalletCards size={18} /> Скачать без водяного знака за{" "}
                  {document.price} ₽
                </button>
              </>
            )}
          </div>
          {status ? <p className="sans mt-5 text-sm font-bold">{status}</p> : null}
        </section>
      </div>
    </main>
  );
}

function ScenarioProgress({
  completion,
  statuses,
  steps,
}: {
  completion: number;
  statuses: Map<string, StepStatus>;
  steps: ConstructorStep[];
}) {
  return (
    <div className="sans mt-7">
      <div className="flex items-center justify-between gap-4 text-sm font-bold text-[#5f5f5a]">
        <span>Заполнено {completion}%</span>
        <span>
          {steps.filter((step) => statuses.get(step.id)?.complete).length} из{" "}
          {steps.length}
        </span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e7e7e2]">
        <div
          className="h-full rounded-full bg-[#111111] transition-all"
          style={{ width: `${completion}%` }}
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {steps.map((stepItem, index) => {
          const complete = statuses.get(stepItem.id)?.complete;

          return (
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold ${
                complete
                  ? "border-[#111111] bg-[#111111] text-white"
                  : "border-[#d9d9d4] bg-white/75 text-[#6b6b66]"
              }`}
              key={stepItem.id}
            >
              {complete ? <CheckCircle2 size={14} /> : <Circle size={14} />}
              {String(index + 1).padStart(2, "0")} из {stepItem.progressLabel}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function LegacyProgress({
  completion,
  currentStep,
  totalSteps,
}: {
  completion: number;
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <div className="sans mb-8">
      <div className="flex items-center justify-between gap-4 text-sm font-bold text-[#5f5f5a]">
        <span>
          Шаг {currentStep + 1} из {totalSteps}
        </span>
        <span>{completion}%</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e7e7e2]">
        <div
          className="h-full rounded-full bg-[#111111]"
          style={{ width: `${completion}%` }}
        />
      </div>
    </div>
  );
}

function ScenarioBlock({
  errors,
  fieldLookup,
  isUnlocked,
  number,
  onChange,
  status,
  step,
  values,
}: {
  errors: Record<string, string>;
  fieldLookup: Map<string, DocumentField>;
  isUnlocked: boolean;
  number: number;
  onChange: (id: string, value: string | boolean) => void;
  status: StepStatus;
  step: ConstructorStep;
  values: DocumentValues;
}) {
  return (
    <article
      className={`border-b border-[#d9d9d4] p-6 md:p-8 ${
        isUnlocked ? "bg-white/55" : "bg-[#f4f4f1]/70"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`sans flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
            status.complete
              ? "border-[#111111] bg-[#111111] text-white"
              : "border-[#bdbdb7] bg-white text-[#4f4f4b]"
          }`}
        >
          {status.complete ? <CheckCircle2 size={18} /> : number}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="sans text-xs font-bold uppercase tracking-[0.14em] text-[#70706b]">
                {step.progressLabel}
              </p>
              <h3 className="mt-2 text-3xl font-semibold">{step.title}</h3>
            </div>
            <StepBadge complete={status.complete} />
          </div>

          {step.description ? (
            <p className="mt-3 max-w-2xl leading-7 text-[#4a4a47]">
              {step.description}
            </p>
          ) : null}

          {isUnlocked ? (
            <ScenarioStepContent
              errors={errors}
              fieldLookup={fieldLookup}
              onChange={onChange}
              step={step}
              values={values}
            />
          ) : (
            <p className="sans mt-5 rounded-md border border-[#d9d9d4] bg-white/70 p-4 text-sm font-bold text-[#666661]">
              Этот блок откроется после заполнения предыдущих вопросов.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

function StepBadge({ complete }: { complete: boolean }) {
  return (
    <span
      className={`sans inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${
        complete
          ? "border-[#111111] bg-[#111111] text-white"
          : "border-[#d9d9d4] bg-white text-[#6b6b66]"
      }`}
    >
      {complete ? <CheckCircle2 size={14} /> : <Circle size={14} />}
      {complete ? "Заполнено" : "Нужно заполнить"}
    </span>
  );
}

function ScenarioStepContent({
  errors,
  fieldLookup,
  onChange,
  step,
  values,
}: {
  errors: Record<string, string>;
  fieldLookup: Map<string, DocumentField>;
  onChange: (id: string, value: string | boolean) => void;
  step: ConstructorStep;
  values: DocumentValues;
}) {
  if (step.type === "choice") {
    return (
      <ChoiceStepBody errors={errors} onChange={onChange} step={step} values={values} />
    );
  }

  if (step.type === "fieldGroup") {
    return (
      <FieldGroupStepBody
        errors={errors}
        fieldLookup={fieldLookup}
        onChange={onChange}
        step={step}
        values={values}
      />
    );
  }

  return <ReviewStepBody />;
}

function ChoiceStepBody({
  errors,
  onChange,
  step,
  values,
}: {
  errors: Record<string, string>;
  onChange: (id: string, value: string | boolean) => void;
  step: ConstructorChoiceStep;
  values: DocumentValues;
}) {
  const selectedOption = step.options.find(
    (option) => values[step.fieldId] === option.value,
  );

  return (
    <div className="mt-6">
      <div className="grid gap-3 md:grid-cols-2">
        {step.options.map((option) => {
          const selected = values[step.fieldId] === option.value;

          return (
            <button
              aria-pressed={selected}
              className={`w-full rounded-lg border p-5 text-left transition ${
                selected
                  ? "border-[#111111] bg-[#111111] text-white"
                  : "border-[#cfcfca] bg-white hover:border-[#111111]"
              }`}
              key={String(option.value)}
              onClick={() => onChange(step.fieldId, option.value)}
              type="button"
            >
              <span className="flex items-start justify-between gap-4">
                <span className="text-xl font-semibold">{option.label}</span>
                {selected ? <CheckCircle2 className="shrink-0" size={22} /> : null}
              </span>
              {option.description ? (
                <span
                  className={`mt-2 block leading-7 ${
                    selected ? "text-[#eeeeea]" : "text-[#4a4a47]"
                  }`}
                >
                  {option.description}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      {selectedOption?.resultText ? (
        <p className="mt-4 rounded-md border border-[#d9d9d4] bg-[#f8f8f5] p-5 leading-7 text-[#343431]">
          {selectedOption.resultText}
        </p>
      ) : null}
      {errors[step.fieldId] ? <ErrorLine message={errors[step.fieldId]} /> : null}
    </div>
  );
}

function FieldGroupStepBody({
  errors,
  fieldLookup,
  onChange,
  step,
  values,
}: {
  errors: Record<string, string>;
  fieldLookup: Map<string, DocumentField>;
  onChange: (id: string, value: string | boolean) => void;
  step: ConstructorFieldGroupStep;
  values: DocumentValues;
}) {
  const fields = step.fields
    .map((fieldId) => fieldLookup.get(fieldId))
    .filter((field): field is DocumentField => Boolean(field));

  return (
    <div className="mt-6 grid gap-5 md:grid-cols-2">
      {fields.map((field) => {
        const filled = hasInputValue(values[field.id]);

        return (
          <div
            className={
              field.type === "textarea" ||
              field.type === "passport" ||
              field.type === "address"
                ? "md:col-span-2"
                : ""
            }
            key={field.id}
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <label className="field-label mb-0" htmlFor={field.id}>
                {field.label}
              </label>
              <span
                className={`sans inline-flex items-center gap-1 text-xs font-bold ${
                  filled ? "text-[#111111]" : "text-[#74746f]"
                }`}
              >
                {filled ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                {filled ? "Заполнено" : "Пусто"}
              </span>
            </div>
            {renderField(field, values, onChange)}
            {field.helpText ? (
              <p className="sans mt-2 text-sm text-[#6d6d68]">{field.helpText}</p>
            ) : null}
            {errors[field.id] ? <ErrorLine message={errors[field.id]} /> : null}
          </div>
        );
      })}
    </div>
  );
}

function ReviewStepBody() {
  return (
    <div className="mt-6 rounded-lg border border-[#d9d9d4] bg-white/75 p-5">
      <p className="leading-7 text-[#3f3f3c]">
        Проверьте ФИО, паспортные данные, суммы, дату возврата и условия о
        пени в тексте предпросмотра. После проверки можно скачать PDF с
        водяным знаком или перейти к оплате чистого PDF.
      </p>
    </div>
  );
}

function ReceiptInlineConstructor({
  document,
  errors,
  fieldLookup,
  onChange,
  onDownload,
  onPayment,
  status,
  values,
}: {
  document: DocumentTemplate;
  errors: Record<string, string>;
  fieldLookup: Map<string, DocumentField>;
  onChange: (id: string, value: string | boolean) => void;
  onDownload: () => void;
  onPayment: () => void;
  status: string;
  values: DocumentValues;
}) {
  const loanDocumentType = String(values.loanDocumentType ?? "withContract");
  const hasContract = loanDocumentType !== "withoutContract";
  const hasInterest = values.hasInterest === true;
  const hasPenalty = values.hasPenalty === true;
  const paymentForm = String(values.paymentForm ?? "cash");
  const witnessesMode = String(values.witnessesMode ?? "notProvided");
  const signingPlaceMode = String(values.signingPlaceMode ?? "no");
  const signingTimeMode = String(values.signingTimeMode ?? "no");
  const transferredDocumentType = String(values.transferredDocumentType ?? "none");
  const identityConfirmationType = String(
    values.identityConfirmationType ?? "passport",
  );
  const missingItems = Object.keys(errors)
    .filter((fieldId) => errors[fieldId])
    .map((fieldId) => fieldLookup.get(fieldId)?.label ?? fieldId);

  return (
    <section className="panel overflow-hidden shadow-[0_24px_62px_rgba(17,17,17,0.06)]">
      <div className="border-b border-[#d9d9d4] bg-white/80 p-6 text-center md:p-8">
        <p className="sans text-sm font-bold uppercase tracking-[0.14em] text-[#70706b]">
          Конструктор документа
        </p>
        <h2 className="mt-3 text-4xl font-semibold">Заполни расписку онлайн</h2>
        <p className="mx-auto mt-4 max-w-3xl leading-7 text-[#4a4a47]">
          Заполните готовый шаблон, проверьте текст расписки и скачайте
          водяной PDF-документ.
        </p>
      </div>

      <div className="bg-[#f8f7f4] p-4 md:p-8">
        <article className="document-paper mx-auto max-w-5xl rounded-lg border border-[#d9d9d4] bg-white px-5 py-7 shadow-sm md:px-10 md:py-10">
          <h3 className="text-center text-3xl font-bold">РАСПИСКА</h3>

          <div className="mt-4 grid gap-4 border-b border-[#e3e0da] pb-5 md:grid-cols-2 md:items-end">
            <label className="text-sm leading-7 text-[#3f3f3c]">
              <span className="sans mb-1 block text-xs font-bold uppercase tracking-[0.12em] text-[#70706b]">
                Город
              </span>
              г.{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="city"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="Укажите город"
                values={values}
                widthClass="w-44"
              />
            </label>
            <label className="text-sm leading-7 text-[#3f3f3c] md:text-right">
              <span className="sans mb-1 block text-xs font-bold uppercase tracking-[0.12em] text-[#70706b]">
                Дата подписания
              </span>
              <ReceiptInlineField
                errors={errors}
                fieldId="documentDate"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="дд.мм.гггг"
                values={values}
                widthClass="w-44"
              />
            </label>
          </div>

          <LoanReceiptInlineBody
            errors={errors}
            fieldLookup={fieldLookup}
            hasContract={hasContract}
            hasInterest={hasInterest}
            hasPenalty={hasPenalty}
            identityConfirmationType={identityConfirmationType}
            loanDocumentType={loanDocumentType}
            onChange={onChange}
            paymentForm={paymentForm}
            signingPlaceMode={signingPlaceMode}
            signingTimeMode={signingTimeMode}
            transferredDocumentType={transferredDocumentType}
            values={values}
            witnessesMode={witnessesMode}
          />
        </article>
      </div>

      <ReceiptInlineActions
        document={document}
        missingItems={missingItems}
        onDownload={onDownload}
        onPayment={onPayment}
        status={status}
      />
    </section>
  );
}

const POWER_OF_ATTORNEY_TARGET_OPTIONS = [
  { label: "Госорган", value: "government" },
  { label: "Почта", value: "post" },
  { label: "Другое", value: "other" },
];

const POWER_OF_ATTORNEY_PRINCIPAL_STATUS_OPTIONS = [
  { label: "Физическое лицо", value: "person" },
  { label: "Индивидуальный предприниматель", value: "ip" },
  { label: "Юридическое лицо", value: "organization" },
];

function PowerOfAttorneyInlineConstructor({
  document,
  errors,
  fieldLookup,
  onChange,
  onDownload,
  onPayment,
  status,
  values,
}: InlineConstructorProps) {
  const missingItems = Object.keys(errors)
    .filter((fieldId) => errors[fieldId])
    .map((fieldId) => fieldLookup.get(fieldId)?.label ?? fieldId);
  const targetType = String(values.targetType ?? "");
  const principalStatus = String(values.principalStatus ?? "");
  const includeOtherActions = values.includeOtherActions;
  const visibleOtherActionIndexes = includeOtherActions === true ? [1] : [];

  for (let index = 2; index <= 5; index += 1) {
    if (values[`addOtherAction${index}`] === "yes") {
      visibleOtherActionIndexes.push(index);
    } else {
      break;
    }
  }
  const paymentPreviewLine =
    powerOfAttorneyPowerDecisionValue(values.powerMakePayments) === "allowed"
      ? "Поверенный вправе осуществлять оплату за счет и от имени Доверителя."
      : powerOfAttorneyPowerDecisionValue(values.powerMakePayments) === "denied"
        ? "Поверенный не вправе осуществлять оплату или осуществлять иное встречное исполнение от имени Доверителя."
        : "";
  const delegationPreviewLines =
    values.hasDelegationRight === true
      ? [
          "Поверенный имеет право передоверия.",
          "В случае передоверия Поверенный незамедлительно сообщает об этом Доверителю и предоставляет всю информацию о лице, в пользу которого осуществляется передоверие (новом поверенном).",
        ]
      : ["Доверенность выдана без права передоверия."];
  return (
    <section className="panel overflow-hidden shadow-[0_24px_62px_rgba(17,17,17,0.06)]">
      <div className="border-b border-[#d9d9d4] bg-white/80 p-6 text-center md:p-8">
        <p className="sans text-sm font-bold uppercase tracking-[0.14em] text-[#70706b]">
          Конструктор доверенности
        </p>
        <h2 className="mt-3 text-4xl font-semibold">
          Заполните доверенность онлайн
        </h2>
        <p className="mx-auto mt-4 max-w-3xl leading-7 text-[#4a4a47]">
          Внесите данные прямо в текст документа, выберите орган и полномочия
          доверенного лица.
        </p>
      </div>

      <div className="bg-[#f8f7f4] p-4 md:p-8">
        <article className="document-paper mx-auto max-w-5xl rounded-lg border border-[#d9d9d4] bg-white px-5 py-7 shadow-sm md:px-10 md:py-10">
          <h3 className="text-center text-3xl font-bold">ДОВЕРЕННОСТЬ</h3>

          <div className="mt-4 grid gap-4 border-b border-[#e3e0da] pb-5 md:grid-cols-2 md:items-end">
            <label className="text-sm leading-7 text-[#3f3f3c]">
              <span className="sans mb-1 block text-xs font-bold uppercase tracking-[0.12em] text-[#70706b]">
                Город
              </span>
              г.{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="city"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="город"
                values={values}
                widthClass="w-44"
              />
            </label>
            <label className="text-sm leading-7 text-[#3f3f3c] md:text-right">
              <span className="sans mb-1 block text-xs font-bold uppercase tracking-[0.12em] text-[#70706b]">
                Дата подписания
              </span>
              <ReceiptInlineField
                errors={errors}
                fieldId="documentDate"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="дд.мм.гггг"
                values={values}
                widthClass="w-44"
              />
            </label>
          </div>

          <div className="mt-8 space-y-6 text-[17px] leading-9 text-[#282826] [&>p]:indent-8">
            <div className="indent-0">
              <ReceiptChoiceGroup
                label="Укажите статус доверителя"
                onChange={(value) => onChange("principalStatus", value)}
                options={POWER_OF_ATTORNEY_PRINCIPAL_STATUS_OPTIONS}
                value={principalStatus}
              />
            </div>

            {principalStatus === "organization" ? (
              <PowerOfAttorneyOrganizationPrincipalParagraph
                errors={errors}
                fieldLookup={fieldLookup}
                onChange={onChange}
                values={values}
              />
            ) : principalStatus === "ip" ? (
              <PowerOfAttorneyIpPrincipalParagraph
                errors={errors}
                fieldLookup={fieldLookup}
                onChange={onChange}
                values={values}
              />
            ) : (
          <p>
            Я,{" "}
                <PowerOfAttorneyPersonInlineFields
                  errors={errors}
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  prefix="principal"
                  values={values}
                />
                ,{" "}
                <PowerOfAttorneyNamingSelect
                  errors={errors}
                  fieldId="principalNamingGender"
                  onChange={onChange}
                  values={values}
                />{" "}
                в дальнейшем &quot;Доверитель&quot;, настоящей доверенностью уполномочиваю:
              </p>
            )}

            <p>
              <PowerOfAttorneyPersonInlineFields
                errors={errors}
                fieldLookup={fieldLookup}
                onChange={onChange}
                prefix="representative"
                values={values}
              />
              ,{" "}
              <PowerOfAttorneyNamingSelect
                errors={errors}
                fieldId="representativeNamingGender"
                onChange={onChange}
                values={values}
              />{" "}
              в дальнейшем &quot;Поверенный&quot;.
            </p>

            <div className="space-y-4 indent-0">
              <ReceiptChoiceGroup
                label="Куда нужна доверенность?"
                onChange={(value) => onChange("targetType", value)}
                options={POWER_OF_ATTORNEY_TARGET_OPTIONS}
                value={targetType}
              />
              {targetType === "post" ? (
                <p className="leading-9">
                  Доверенное лицо вправе представлять мои интересы в отделении{" "}
                  <ReceiptInlineField
                    errors={errors}
                    fieldId="postOfficeDepartment"
                    fieldLookup={fieldLookup}
                    onChange={onChange}
                    placeholder="№ отделения"
                    values={values}
                    widthClass="w-44"
                  />{" "}
                  почтовой связи, расположенном по адресу{" "}
                  <ReceiptInlineField
                    errors={errors}
                    fieldId="targetName"
                    fieldLookup={fieldLookup}
                    onChange={onChange}
                    placeholder={powerOfAttorneyTargetPlaceholder(targetType)}
                    values={values}
                    widthClass="w-96"
                  />
                  , а именно:
                </p>
              ) : targetType === "government" ? (
                <p className="leading-9">
                  Поверенный вправе в полной мере и в полном объеме представлять
                  интересы Доверителя в государственном (муниципальном) органе:{" "}
                  <ReceiptInlineField
                    errors={errors}
                    fieldId="targetName"
                    fieldLookup={fieldLookup}
                    onChange={onChange}
                    placeholder={powerOfAttorneyTargetPlaceholder(targetType)}
                    values={values}
                    widthClass="w-96"
                  />
                  {" "}в следующем споре:{" "}
                  <ReceiptInlineField
                    errors={errors}
                    fieldId="governmentDisputeSubject"
                    fieldLookup={fieldLookup}
                    onChange={onChange}
                    placeholder="подробно опишите предмет спора и стороны"
                    values={values}
                    widthClass="w-96"
                  />
                  .
                </p>
              ) : (
                <p className="leading-9">
                  Доверенное лицо вправе представлять мои интересы в{" "}
                  <ReceiptInlineField
                    errors={errors}
                    fieldId="targetName"
                    fieldLookup={fieldLookup}
                    onChange={onChange}
                    placeholder={powerOfAttorneyTargetPlaceholder(targetType)}
                    values={values}
                    widthClass="w-96"
                  />
                  , а именно:
                </p>
              )}
            </div>

            <div className="space-y-4 indent-0">
              <p className="font-semibold">Полномочия поверенного лица:</p>
              {POWER_OF_ATTORNEY_PRESET_POWERS.filter(
                (power) => power.id !== "powerMakePayments",
              ).map((power) => {
                const powerText = getPowerOfAttorneyPresetPowerText(
                  power,
                  targetType,
                );
                const currentDecision =
                  powerOfAttorneyPowerDecisionValue(values[power.id]) === "allowed"
                    ? "allowed"
                    : "omit";
                const selectedLine =
                  currentDecision === "allowed" ? `— ${powerText}.` : undefined;

                return (
                  <div
                    className="rounded-lg border border-[#ded8d0] bg-white/70 p-4"
                    key={power.id}
                  >
                    <ReceiptChoiceGroup
                      label={`${powerText}?`}
                      onChange={(value) => onChange(power.id, value)}
                      options={[
                        { label: "Добавить", value: "allowed" },
                        { label: "Не указывать в доверенности", value: "omit" },
                      ]}
                      value={currentDecision}
                    />
                    {selectedLine ? (
                      <div className="mt-4 rounded-md border border-[#e3e0da] bg-[#fbfaf7] px-4 py-3">
                        <p className="text-[16px] leading-8">{selectedLine}</p>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="space-y-4 indent-0">
              <ReceiptChoiceGroup
                label="Добавить иные действия?"
                onChange={(value) => onChange("includeOtherActions", value)}
                options={[
                  { label: "Да, добавить", value: true },
                  { label: "Нет", value: false },
                ]}
                value={powerOfAttorneyDecisionValue(values.includeOtherActions)}
              />
              {visibleOtherActionIndexes.length > 0 ? (
                <div className="space-y-4">
                  {visibleOtherActionIndexes.map((index) => (
                    <div
                      className="rounded-lg border border-[#ded8d0] bg-white/70 p-4"
                      key={index}
                    >
                      <div className="rounded-md border border-[#e3e0da] bg-[#fbfaf7] px-4 py-3">
                        <p className="mb-2 text-[16px] leading-8">
                          —{" "}
                          <PowerOfAttorneyInlineTextarea
                            errors={errors}
                            fieldId={`otherAction${index}`}
                            fieldLookup={fieldLookup}
                            onChange={onChange}
                            placeholder="Опишите действие своими словами"
                            values={values}
                          />
                        </p>
                      </div>
                      {index < 5 ? (
                        <ReceiptChoiceGroup
                          className="mt-4"
                          label={`Добавить еще иное действие ${index + 1}?`}
                          onChange={(value) =>
                            onChange(`addOtherAction${index + 1}`, value)
                          }
                          options={[
                            { label: "Да, добавить", value: "yes" },
                            { label: "Нет", value: "no" },
                          ]}
                          value={String(values[`addOtherAction${index + 1}`] ?? "")}
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="rounded-lg border border-[#ded8d0] bg-white/70 p-4">
                <ReceiptChoiceGroup
                  label="Осуществлять оплату за счет и от имени Доверителя?"
                  onChange={(value) => onChange("powerMakePayments", value)}
                  options={[
                    { label: "Вправе", value: "allowed" },
                    { label: "Не вправе", value: "denied" },
                    { label: "Не указывать в доверенности", value: "omit" },
                  ]}
                  value={powerOfAttorneyPowerDecisionValue(values.powerMakePayments)}
                />
              </div>
              {paymentPreviewLine ? (
                <p className="indent-8 text-[17px] leading-9">{paymentPreviewLine}</p>
              ) : null}
              <div className="rounded-lg border border-[#ded8d0] bg-white/70 p-4">
                <ReceiptChoiceGroup
                  label="Право передоверия:"
                  onChange={(value) => onChange("hasDelegationRight", value)}
                  options={[
                    { label: "Нет", value: false },
                    { label: "Да", value: true },
                  ]}
                  value={powerOfAttorneyDecisionValue(values.hasDelegationRight)}
                />
              </div>
              {delegationPreviewLines.map((line) => (
                <p className="indent-8 text-[17px] leading-9" key={line}>
                  {line}
                </p>
              ))}
              <div className="rounded-lg border border-[#ded8d0] bg-white/70 p-4">
                <ReceiptChoiceGroup
                  label="В доверенности указывается подпись поверенного:"
                  onChange={(value) => onChange("includeRepresentativeSignature", value)}
                  options={[
                    { label: "Нет", value: false },
                    { label: "Да", value: true },
                  ]}
                  value={powerOfAttorneyDecisionValue(values.includeRepresentativeSignature)}
                />
              </div>
              {values.includeRepresentativeSignature === true ? (
                <p className="flex items-baseline gap-x-3 overflow-x-auto whitespace-nowrap pl-8 text-[17px] leading-9">
                  <span>Подпись Поверенного удостоверяю</span>
                  <span className="flex min-w-[560px] flex-1 items-baseline gap-x-2">
                    <span className="relative top-1 block h-px min-w-36 flex-1 border-b border-[#282826]" />
                    <span>/</span>
                    <ReceiptInlineField
                      errors={errors}
                      fieldId="representativeFullName"
                      fieldLookup={fieldLookup}
                      onChange={onChange}
                      placeholder="ФИО поверенного"
                      values={values}
                      widthClass="w-72"
                    />
                    <span>/</span>
                  </span>
                </p>
              ) : null}
            </div>

            <p className="flex flex-wrap items-center gap-x-2 gap-y-2 pl-8 text-[17px] leading-9">
              <span>Доверенность выдана сроком на</span>
              <span className="inline-grid w-full grid-cols-1 items-center gap-x-2 gap-y-2 align-middle sm:w-auto sm:grid-cols-[80px_auto_112px_auto_112px]">
                <ReceiptInlineField
                  errors={errors}
                  fieldId="validForNumber"
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  placeholder="1"
                  values={values}
                  widthClass="w-full"
                />
                <span>(</span>
                <ReceiptInlineField
                  errors={errors}
                  fieldId="validForWords"
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  placeholder="один"
                  values={values}
                  widthClass="w-full"
                />
                <span>)</span>
                <InlineSelectField
                  errors={errors}
                  fieldId="validForUnit"
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  values={values}
                  widthClass="w-full"
                />
              </span>
              <span>и действует до</span>
              <span className="inline-grid w-full grid-cols-1 items-center gap-x-2 gap-y-2 align-middle sm:w-auto sm:grid-cols-[176px_144px_auto]">
                <ReceiptInlineField
                  errors={errors}
                  fieldId="validUntil"
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  placeholder="дата"
                  values={values}
                  widthClass="w-full"
                />
                <InlineSelectField
                  errors={errors}
                  fieldId="validUntilInclusive"
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  values={values}
                  widthClass="w-full"
                />
                <span>.</span>
              </span>
            </p>

            <div className="space-y-5 border-t border-[#e3e0da] pt-6 text-[17px] leading-9">
              <p className="flex items-baseline gap-x-3 overflow-x-auto whitespace-nowrap pl-8">
                <span>Подпись Доверителя</span>
                <span className="relative top-1 block h-px min-w-48 border-b border-[#282826]" />
              </p>
              <p className="flex items-baseline gap-x-3 overflow-x-auto whitespace-nowrap pl-8">
                <span>ФИО Доверителя прописью</span>
                <span className="relative top-1 block h-px min-w-96 border-b border-[#282826]" />
              </p>
            </div>
          </div>
        </article>
      </div>

      <ReceiptInlineActions
        document={document}
        missingItems={missingItems}
        onDownload={onDownload}
        onPayment={onPayment}
        status={status}
      />
    </section>
  );
}

function BankEnforcementInlineConstructor({
  document,
  errors,
  fieldLookup,
  onChange,
  onDownload,
  onPayment,
  status,
  values,
}: InlineConstructorProps) {
  const missingItems = Object.keys(errors)
    .filter((fieldId) => errors[fieldId])
    .map((fieldId) => fieldLookup.get(fieldId)?.label ?? fieldId);
  const documentType = String(values.enforcementDocumentType ?? "writ");
  const includeClaimantPassportCopy = String(
    values.includeClaimantPassportCopy ?? "yes",
  );
  const includeRepresentativePower = String(
    values.includeRepresentativePower ?? "no",
  );
  const includeOtherDocuments = String(values.includeOtherDocuments ?? "no");
  const visibleOtherDocumentIndexes = [1];

  for (let index = 2; index <= 5; index += 1) {
    if (values[`addOtherDocument${index}`] === "yes") {
      visibleOtherDocumentIndexes.push(index);
    } else {
      break;
    }
  }

  return (
    <section className="panel overflow-hidden shadow-[0_24px_62px_rgba(17,17,17,0.06)]">
      <div className="border-b border-[#d9d9d4] bg-white/80 p-6 text-center md:p-8">
        <p className="sans text-sm font-bold uppercase tracking-[0.14em] text-[#70706b]">
          Конструктор заявления
        </p>
        <h2 className="mt-3 text-4xl font-semibold">
          Заполните заявление в банк
        </h2>
        <p className="mx-auto mt-4 max-w-3xl leading-7 text-[#4a4a47]">
          Выберите исполнительный документ, данные должника и приложения прямо в
          тексте заявления.
        </p>
      </div>

      <div className="bg-[#f8f7f4] p-4 md:p-8">
        <article className="document-paper mx-auto max-w-5xl rounded-lg border border-[#d9d9d4] bg-white px-5 py-7 shadow-sm md:px-10 md:py-10">
          <div className="grid gap-7 md:grid-cols-[260px_1fr] md:items-start">
            <div className="text-[15px] leading-7 text-[#282826]">
              <ReceiptInlineField errors={errors} fieldId="documentDate" fieldLookup={fieldLookup} onChange={onChange} placeholder="дата заявления" values={values} widthClass="w-44" />
            </div>
            <div className="space-y-3 justify-self-end text-[15px] leading-7 text-[#282826] md:max-w-[520px]">
              <p>
                В{" "}
                <ReceiptInlineField errors={errors} fieldId="targetBankName" fieldLookup={fieldLookup} onChange={onChange} placeholder="название банка" values={values} widthClass="w-80" />
              </p>
              <p>
                Адрес:{" "}
                <ReceiptInlineField errors={errors} fieldId="targetBankAddress" fieldLookup={fieldLookup} onChange={onChange} placeholder="адрес банка" values={values} widthClass="w-80" />
              </p>
              <p>
                Взыскатель:{" "}
                <ReceiptInlineField errors={errors} fieldId="claimantHeaderFullName" fieldLookup={fieldLookup} onChange={onChange} placeholder="ФИО взыскателя" values={values} widthClass="w-72" />
              </p>
              <p>
                Адрес:{" "}
                <ReceiptInlineField errors={errors} fieldId="claimantAddress" fieldLookup={fieldLookup} onChange={onChange} placeholder="адрес взыскателя" values={values} widthClass="w-80" />
              </p>
              <p>
                тел.:{" "}
                <ReceiptInlineField errors={errors} fieldId="claimantPhone" fieldLookup={fieldLookup} onChange={onChange} placeholder="телефон" values={values} widthClass="w-44" />
              </p>
              <p>
                e-mail:{" "}
                <ReceiptInlineField errors={errors} fieldId="claimantEmail" fieldLookup={fieldLookup} onChange={onChange} placeholder="email" values={values} widthClass="w-56" />
              </p>
              <p>
                Должник:{" "}
                <ReceiptInlineField errors={errors} fieldId="debtorFullName" fieldLookup={fieldLookup} onChange={onChange} placeholder="ФИО/название организации" values={values} widthClass="w-72" />
              </p>
              <p>
                ИНН/ОГРН:{" "}
                <ReceiptInlineField errors={errors} fieldId="debtorInnOrOgrn" fieldLookup={fieldLookup} onChange={onChange} placeholder="для юр. лиц" values={values} widthClass="w-72" />
              </p>
              <p>
                адрес:{" "}
                <ReceiptInlineField errors={errors} fieldId="debtorAddress" fieldLookup={fieldLookup} onChange={onChange} placeholder="адрес должника" values={values} widthClass="w-80" />
              </p>
            </div>
          </div>

          <h3 className="mt-10 text-center text-3xl font-bold">
            ЗАЯВЛЕНИЕ
            <span className="mt-2 block text-2xl font-semibold">
              о взыскании денежных средств по исполнительному документу
            </span>
          </h3>

          <div className="mt-8 space-y-6 text-[17px] leading-9 text-[#282826] [&>p]:indent-8">
            <ReceiptChoiceGroup
              className="indent-0"
              label="Какой исполнительный документ предъявляется в банк?"
              onChange={(value) => onChange("enforcementDocumentType", value)}
              options={[
                { label: "Исполнительный лист", value: "writ" },
                { label: "Судебный приказ", value: "judicialOrder" },
                { label: "Нотариальное соглашение об алиментах", value: "notaryAgreement" },
                { label: "Исполнительная надпись нотариуса", value: "notaryWrit" },
                { label: "Удостоверение комиссии по трудовым спорам", value: "laborCommissionCertificate" },
                { label: "Постановление по делу об административном правонарушении", value: "administrativeRuling" },
                { label: "Иной исполнительный документ", value: "other" },
              ]}
              value={documentType}
            />

            <p>
              Взыскатель предъявляет в банк исполнительный документ:{" "}
              <EnforcementDocumentInlineFields documentType={documentType} errors={errors} fieldLookup={fieldLookup} onChange={onChange} values={values} />
              , о взыскании денежных средств с должника{" "}
              <InlineFieldGroup>
                <ReceiptInlineField
                  errors={errors}
                  fieldId="debtorFullNameGenitive"
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  placeholder="ФИО/название организации"
                  values={values}
                  widthClass="w-72"
                />
              </InlineFieldGroup>{" "}
              в пользу взыскателя{" "}
              <ReceiptInlineField errors={errors} fieldId="claimantFullName" fieldLookup={fieldLookup} onChange={onChange} placeholder="ФИО взыскателя" values={values} widthClass="w-72" />.
            </p>

            <p>
              Сумма, подлежащая взысканию по исполнительному документу,
              составляет{" "}
              <ReceiptAmountWithWordsInline errors={errors} fieldLookup={fieldLookup} numberFieldId="claimAmountNumber" numberPlaceholder="сумма" numberWidthClass="w-36" onChange={onChange} values={values} wordsFieldId="claimAmountWords" wordsPlaceholder="сумма прописью" wordsWidthClass="w-72" />{" "}
              рублей, в том числе: основной долг -{" "}
              <ReceiptInlineField errors={errors} fieldId="principalDebtAmount" fieldLookup={fieldLookup} onChange={onChange} placeholder="сумма" values={values} widthClass="w-32" />{" "}
              рублей, проценты/неустойка -{" "}
              <ReceiptInlineField errors={errors} fieldId="penaltyAmount" fieldLookup={fieldLookup} onChange={onChange} placeholder="сумма" values={values} widthClass="w-32" />{" "}
              рублей, государственная пошлина -{" "}
              <ReceiptInlineField errors={errors} fieldId="stateDutyAmount" fieldLookup={fieldLookup} onChange={onChange} placeholder="сумма" values={values} widthClass="w-32" />{" "}
              рублей, иные взысканные суммы -{" "}
              <ReceiptInlineField errors={errors} fieldId="otherAwardedAmount" fieldLookup={fieldLookup} onChange={onChange} placeholder="сумма" values={values} widthClass="w-32" />{" "}
              рублей.
            </p>

            <p>
              На основании статьи 8 Федерального закона от 02.10.2007 № 229-ФЗ
              &quot;Об исполнительном производстве&quot; исполнительный документ о
              взыскании денежных средств может быть направлен взыскателем
              непосредственно в банк или иную кредитную организацию.
            </p>

            <div className="space-y-4 indent-0">
              <p className="font-semibold">Прошу банк:</p>
              <InlineNumberedRow marker="1.">
                Принять к исполнению{" "}
                <EnforcementDocumentInlineFields documentType={documentType} errors={errors} fieldLookup={fieldLookup} onChange={onChange} values={values} />.
              </InlineNumberedRow>
              <InlineNumberedRow marker="2.">
                Проверить наличие счетов должника и списать денежные средства
                в пределах суммы взыскания.
              </InlineNumberedRow>
              <InlineNumberedRow marker="3.">
                Перечислить взысканные денежные средства по следующим реквизитам:
              </InlineNumberedRow>
              <p className="pl-10">
                Получатель{" "}
                <ReceiptInlineField errors={errors} fieldId="recipientName" fieldLookup={fieldLookup} onChange={onChange} placeholder="получатель" values={values} widthClass="w-72" />
                , банк получателя{" "}
                <ReceiptInlineField errors={errors} fieldId="recipientBankName" fieldLookup={fieldLookup} onChange={onChange} placeholder="банк" values={values} widthClass="w-64" />
                , счет получателя{" "}
                <ReceiptInlineField errors={errors} fieldId="bankRecipientAccount" fieldLookup={fieldLookup} onChange={onChange} placeholder="счет" values={values} widthClass="w-56" />
                , БИК{" "}
                <ReceiptInlineField errors={errors} fieldId="bankBik" fieldLookup={fieldLookup} onChange={onChange} placeholder="БИК" values={values} widthClass="w-36" />.
              </p>
              <InlineNumberedRow marker="4.">
                Направить взыскателю информацию о принятии исполнительного
                документа к исполнению и о произведённом исполнении.
              </InlineNumberedRow>
            </div>

            <div className="space-y-3">
              <p className="font-semibold indent-0">Приложения:</p>
              <InlineNumberedRow marker="1.">{enforcementDocumentDisplayName(values)} - оригинал на <ReceiptInlineField errors={errors} fieldId="enforcementDocumentPages" fieldLookup={fieldLookup} onChange={onChange} placeholder="листов" values={values} widthClass="w-24" /> листах.</InlineNumberedRow>
              <ReceiptChoiceGroup
                label="Приложить копию паспорта взыскателя?"
                onChange={(value) => onChange("includeClaimantPassportCopy", value)}
                options={[
                  { label: "Да, приложить", value: "yes" },
                  { label: "Нет", value: "no" },
                ]}
                value={includeClaimantPassportCopy}
              />
              {includeClaimantPassportCopy !== "no" ? (
                <InlineNumberedRow marker="2.">Копия паспорта взыскателя - на <ReceiptInlineField errors={errors} fieldId="claimantPassportCopyPages" fieldLookup={fieldLookup} onChange={onChange} placeholder="листов" values={values} widthClass="w-24" /> листах.</InlineNumberedRow>
              ) : null}
              <ReceiptChoiceGroup
                label="Приложить доверенность представителя?"
                onChange={(value) => onChange("includeRepresentativePower", value)}
                options={[
                  { label: "Да, приложить", value: "yes" },
                  { label: "Нет", value: "no" },
                ]}
                value={includeRepresentativePower}
              />
              {includeRepresentativePower === "yes" ? (
                <InlineNumberedRow marker="3.">Доверенность представителя - на <ReceiptInlineField errors={errors} fieldId="representativePowerPages" fieldLookup={fieldLookup} onChange={onChange} placeholder="листов" values={values} widthClass="w-24" /> листах.</InlineNumberedRow>
              ) : null}
              <ReceiptChoiceGroup
                label="Приложить иные документы?"
                onChange={(value) => onChange("includeOtherDocuments", value)}
                options={[
                  { label: "Да, приложить", value: "yes" },
                  { label: "Нет", value: "no" },
                ]}
                value={includeOtherDocuments}
              />
              {includeOtherDocuments === "yes" ? (
                <div className="space-y-4">
                  {visibleOtherDocumentIndexes.map((index) => (
                    <div
                      className="rounded-lg border border-[#ded8d0] bg-white/70 p-4"
                      key={index}
                    >
                      <p className="sans text-xs font-bold uppercase tracking-[0.12em] text-[#64615c]">
                        Иной документ {index}
                      </p>
                      <AttachmentInlineFields
                        descriptionFieldId={`otherDocument${index}Description`}
                        descriptionPlaceholder="название иного документа"
                        errors={errors}
                        fieldLookup={fieldLookup}
                        onChange={onChange}
                        pagesFieldId={`otherDocument${index}Pages`}
                        values={values}
                      />
                      {index < 5 ? (
                        <ReceiptChoiceGroup
                          className="mt-4"
                          label={`Добавить еще иной документ ${index + 1}?`}
                          onChange={(value) =>
                            onChange(`addOtherDocument${index + 1}`, value)
                          }
                          options={[
                            { label: "Да, добавить", value: "yes" },
                            { label: "Нет", value: "no" },
                          ]}
                          value={String(
                            values[`addOtherDocument${index + 1}`] ?? "no",
                          )}
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="grid gap-4 border-t border-[#e3e0da] pt-6 md:grid-cols-[1fr_280px] md:items-end">
              <div className="space-y-4">
                <p>
                  Взыскатель: ______________________ /{" "}
                  <ReceiptInlineField errors={errors} fieldId="claimantFullName" fieldLookup={fieldLookup} onChange={onChange} placeholder="ФИО взыскателя" values={values} widthClass="w-72" />{" "}
                  /
                </p>
                <p>
                  Тел.:{" "}
                  <ReceiptInlineField errors={errors} fieldId="claimantPhone" fieldLookup={fieldLookup} onChange={onChange} placeholder="телефон" values={values} widthClass="w-44" />
                </p>
              </div>
              <p className="text-sm leading-6 text-[#5f5f59]">
                Перед скачиванием сверьте реквизиты банка, исполнительного
                документа и счета получателя.
              </p>
            </div>
          </div>
        </article>
      </div>

      <ReceiptInlineActions
        document={document}
        missingItems={missingItems}
        onDownload={onDownload}
        onPayment={onPayment}
        status={status}
      />
    </section>
  );
}

function EnforcementProceedingInlineConstructor({
  document,
  errors,
  fieldLookup,
  onChange,
  onDownload,
  onPayment,
  status,
  values,
}: InlineConstructorProps) {
  const missingItems = Object.keys(errors)
    .filter((fieldId) => errors[fieldId])
    .map((fieldId) => fieldLookup.get(fieldId)?.label ?? fieldId);
  const documentType = String(values.enforcementDocumentType ?? "writ");
  const courtAttachmentType = String(values.courtAttachmentType ?? "none");
  const hasDebtorPropertyDocuments = String(
    values.hasDebtorPropertyDocuments ?? "no",
  );
  const visibleOtherDocumentIndexes = [1];

  for (let index = 2; index <= 5; index += 1) {
    if (values[`addOtherDocument${index}`] === "yes") {
      visibleOtherDocumentIndexes.push(index);
    } else {
      break;
    }
  }

  return (
    <section className="panel overflow-hidden shadow-[0_24px_62px_rgba(17,17,17,0.06)]">
      <div className="border-b border-[#d9d9d4] bg-white/80 p-6 text-center md:p-8">
        <p className="sans text-sm font-bold uppercase tracking-[0.14em] text-[#70706b]">
          Конструктор заявления
        </p>
        <h2 className="mt-3 text-4xl font-semibold">
          Заполните заявление приставу
        </h2>
        <p className="mx-auto mt-4 max-w-3xl leading-7 text-[#4a4a47]">
          Поля встроены прямо в текст заявления о возбуждении исполнительного
          производства и повторяют тот же порядок, что и в PDF.
        </p>
      </div>

      <div className="bg-[#f8f7f4] p-4 md:p-8">
        <article className="document-paper mx-auto max-w-5xl rounded-lg border border-[#d9d9d4] bg-white px-5 py-7 shadow-sm md:px-10 md:py-10">
          <div className="grid gap-7 md:grid-cols-[240px_1fr] md:items-start">
            <div className="text-[15px] leading-7 text-[#282826]">
              <ReceiptInlineField
                errors={errors}
                fieldId="documentDate"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="дата заявления"
                values={values}
                widthClass="w-44"
              />
            </div>
            <div className="space-y-3 justify-self-end text-[15px] leading-7 text-[#282826] md:max-w-[560px]">
              <p>
                Начальнику{" "}
                <ReceiptInlineField
                  errors={errors}
                  fieldId="ospName"
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  placeholder="название РОСП"
                  values={values}
                  widthClass="w-72"
                />{" "}
                РОСП
              </p>
              <p>
                <ReceiptInlineField
                  errors={errors}
                  fieldId="ufsspRegion"
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  placeholder="область"
                  values={values}
                  widthClass="w-64"
                />
              </p>
              <p>
                Адрес:{" "}
                <ReceiptInlineField
                  errors={errors}
                  fieldId="ospAddress"
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  placeholder="адрес отдела приставов"
                  values={values}
                  widthClass="w-80"
                />
              </p>
              <p>
                от взыскателя:{" "}
                <ReceiptInlineField
                  errors={errors}
                  fieldId="claimantHeaderFullName"
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  placeholder="ФИО взыскателя"
                  values={values}
                  widthClass="w-72"
                />
              </p>
              <p>
                адрес:{" "}
                <ReceiptInlineField
                  errors={errors}
                  fieldId="claimantRegistrationAddress"
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  placeholder="адрес регистрации взыскателя"
                  values={values}
                  widthClass="w-80"
                />
              </p>
              <p>
                тел.:{" "}
                <ReceiptInlineField
                  errors={errors}
                  fieldId="claimantPhone"
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  placeholder="телефон"
                  values={values}
                  widthClass="w-44"
                />
              </p>
              <p>
                e-mail:{" "}
                <ReceiptInlineField
                  errors={errors}
                  fieldId="claimantEmail"
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  placeholder="email"
                  values={values}
                  widthClass="w-56"
                />
              </p>
            </div>
          </div>

          <h3 className="mt-10 text-center text-3xl font-bold">
            ЗАЯВЛЕНИЕ
            <span className="mt-2 block text-2xl font-semibold">
              о возбуждении исполнительного производства
            </span>
          </h3>

          <div className="mt-8 space-y-6 text-[17px] leading-9 text-[#282826] [&>p]:indent-8">
            <ReceiptChoiceGroup
              className="indent-0"
              label="Какой исполнительный документ предъявляется приставу?"
              onChange={(value) => onChange("enforcementDocumentType", value)}
              options={[
                { label: "Исполнительный лист", value: "writ" },
                { label: "Судебный приказ", value: "judicialOrder" },
                {
                  label: "Нотариальное соглашение об алиментах",
                  value: "notaryAgreement",
                },
                {
                  label: "Исполнительная надпись нотариуса",
                  value: "notaryWrit",
                },
                {
                  label: "Удостоверение комиссии по трудовым спорам",
                  value: "laborCommissionCertificate",
                },
                {
                  label: "Постановление по делу об административном правонарушении",
                  value: "administrativeRuling",
                },
                { label: "Иной исполнительный документ", value: "other" },
              ]}
              value={documentType}
            />

            <p>
              В соответствии с ч. 1 ст. 30 Федерального закона от 02.10.2007 №
              229-ФЗ «Об исполнительном производстве» прошу принять к исполнению
              исполнительный документ:{" "}
              <EnforcementDocumentInlineFields
                documentType={documentType}
                errors={errors}
                fieldLookup={fieldLookup}
                onChange={onChange}
                values={values}
              />
              , и возбудить по нему исполнительное производство.
            </p>

            <p className="indent-0 font-semibold">Сведения о требовании:</p>

            <p>
              Взыскать с{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="debtorFullName"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="ФИО должника"
                values={values}
                widthClass="w-72"
              />
              , именуемого(ой) далее «Должник», в пользу{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="claimantFullName"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="ФИО взыскателя"
                values={values}
                widthClass="w-72"
              />
              , именуемого(ой) далее «Взыскатель», денежные средства в размере{" "}
              <ReceiptAmountWithWordsInline
                errors={errors}
                fieldLookup={fieldLookup}
                numberFieldId="claimAmountNumber"
                numberPlaceholder="сумма"
                numberWidthClass="w-36"
                onChange={onChange}
                values={values}
                wordsFieldId="claimAmountWords"
                wordsPlaceholder="сумма прописью"
                wordsWidthClass="w-72"
              />{" "}
              рублей, в том числе: основной долг -{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="principalDebtAmount"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="сумма"
                values={values}
                widthClass="w-32"
              />{" "}
              рублей, проценты/неустойка -{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="penaltyAmount"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="сумма"
                values={values}
                widthClass="w-32"
              />{" "}
              рублей, расходы по оплате государственной пошлины -{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="stateDutyAmount"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="сумма"
                values={values}
                widthClass="w-32"
              />{" "}
              рублей, иные взысканные суммы -{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="otherAwardedAmount"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="сумма"
                values={values}
                widthClass="w-32"
              />{" "}
              рублей.
            </p>

            <p className="indent-0 font-semibold">Сведения о взыскателе:</p>

            <p>
              <ReceiptInlineField
                errors={errors}
                fieldId="claimantFullName"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="ФИО взыскателя"
                values={values}
                widthClass="w-72"
              />
              , дата рождения{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="claimantBirthDate"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="дата рождения"
                values={values}
                widthClass="w-44"
              />
              , паспорт гражданина РФ: серия{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="claimantPassportSeries"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="серия"
                values={values}
                widthClass="w-24"
              />{" "}
              №{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="claimantPassportNumber"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="номер"
                values={values}
                widthClass="w-28"
              />
              , выдан{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="claimantPassportIssuedBy"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="кем выдан"
                values={values}
                widthClass="w-80"
              />{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="claimantPassportIssuedDate"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="дата выдачи"
                values={values}
                widthClass="w-44"
              />
              , адрес регистрации:{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="claimantRegistrationAddress"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="адрес регистрации"
                values={values}
                widthClass="w-80"
              />
              , адрес фактического проживания:{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="claimantActualAddress"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="если отличается"
                values={values}
                widthClass="w-80"
              />
              , телефон:{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="claimantPhone"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="телефон"
                values={values}
                widthClass="w-44"
              />
              , e-mail:{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="claimantEmail"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="email"
                values={values}
                widthClass="w-56"
              />
              .
            </p>

            <p className="indent-0 font-semibold">
              Банковские реквизиты взыскателя для перечисления денежных средств,
              взысканных с должника:
            </p>

            <p>
              Получатель:{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="recipientName"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="получатель"
                values={values}
                widthClass="w-72"
              />
              .
            </p>
            <p>
              Банк получателя:{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="bankName"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="банк получателя"
                values={values}
                widthClass="w-72"
              />
              .
            </p>
            <p>
              Счёт получателя:{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="bankRecipientAccount"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="счет получателя"
                values={values}
                widthClass="w-56"
              />
              .
            </p>
            <p>
              БИК:{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="bankBik"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="БИК"
                values={values}
                widthClass="w-36"
              />
              .
            </p>

            <p className="indent-0 font-semibold">Сведения о должнике:</p>

            <p>
              <ReceiptInlineField
                errors={errors}
                fieldId="debtorFullName"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="ФИО должника"
                values={values}
                widthClass="w-72"
              />
              , дата рождения{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="debtorBirthDate"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="дата рождения"
                values={values}
                widthClass="w-44"
              />
              , паспорт гражданина РФ: серия{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="debtorPassportSeries"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="серия"
                values={values}
                widthClass="w-24"
              />{" "}
              №{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="debtorPassportNumber"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="номер"
                values={values}
                widthClass="w-28"
              />
              , выдан{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="debtorPassportIssuedBy"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="кем выдан"
                values={values}
                widthClass="w-80"
              />{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="debtorPassportIssuedDate"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="дата выдачи"
                values={values}
                widthClass="w-44"
              />
              , адрес регистрации:{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="debtorRegistrationAddress"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="адрес регистрации"
                values={values}
                widthClass="w-80"
              />
              , адрес фактического проживания, если известно:{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="debtorActualAddress"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="если известно"
                values={values}
                widthClass="w-80"
              />
              , телефон:{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="debtorPhone"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="если известен"
                values={values}
                widthClass="w-44"
              />
              , место работы/источник дохода, если известно:{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="debtorWorkplace"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="если известно"
                values={values}
                widthClass="w-80"
              />
              .
            </p>

            <p>
              В соответствии с ч. 2 ст. 30 Федерального закона от 02.10.2007 №
              229-ФЗ «Об исполнительном производстве» для обеспечения исполнения
              требований исполнительного документа также прошу:
            </p>

            <div className="space-y-4 indent-0">
              <InlineNumberedRow marker="1.">
                Наложить запрет на совершение регистрирующим органом
                (Росреестр) регистрационных действий в отношении жилой и
                нежилой недвижимости, находящейся в собственности должника.
              </InlineNumberedRow>
              <InlineNumberedRow marker="2.">
                Установить должнику временное ограничение на выезд из
                Российской Федерации при наличии предусмотренных законом
                оснований.
              </InlineNumberedRow>
              <InlineNumberedRow marker="3.">
                В целях получения сведений об имуществе и доходах должника
                направить запросы в органы ГИБДД, Социальный фонд России,
                Росреестр, банки и иные кредитные организации.
              </InlineNumberedRow>
              <InlineNumberedRow marker="4.">
                В случае получения сведений о наличии у должника транспортных
                средств, недвижимого имущества, денежных средств на счетах,
                вкладах и иных имущественных прав наложить арест на имущество
                должника, в том числе на денежные средства, находящиеся на
                счетах в банках и иных кредитных организациях.
              </InlineNumberedRow>
            </div>

            <div className="space-y-3">
              <p className="font-semibold indent-0">Приложения:</p>
              <InlineNumberedRow marker="1.">
                {enforcementDocumentDisplayName(values)} - оригинал на{" "}
                <ReceiptInlineField
                  errors={errors}
                  fieldId="enforcementDocumentPages"
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  placeholder="листов"
                  values={values}
                  widthClass="w-24"
                />{" "}
                листах.
              </InlineNumberedRow>

              <ReceiptChoiceGroup
                label="Приложить судебный документ?"
                onChange={(value) => onChange("courtAttachmentType", value)}
                options={[
                  { label: "Не прикладывать", value: "none" },
                  { label: "Копия судебного акта", value: "courtAct" },
                  { label: "Копия судебного приказа", value: "judicialOrder" },
                  { label: "Копия решения суда", value: "courtDecision" },
                ]}
                value={courtAttachmentType}
              />
              {courtAttachmentType !== "none" ? (
                <InlineNumberedRow marker="2.">
                  {courtAttachmentText(courtAttachmentType)} - на{" "}
                  <ReceiptInlineField
                    errors={errors}
                    fieldId="courtAttachmentPages"
                    fieldLookup={fieldLookup}
                    onChange={onChange}
                    placeholder="листов"
                    values={values}
                    widthClass="w-24"
                  />{" "}
                  листах.
                </InlineNumberedRow>
              ) : null}

              <ReceiptChoiceGroup
                label="Есть иные документы о должнике и его имуществе?"
                onChange={(value) => onChange("hasDebtorPropertyDocuments", value)}
                options={[
                  { label: "Да, приложить", value: "yes" },
                  { label: "Нет", value: "no" },
                ]}
                value={hasDebtorPropertyDocuments}
              />
              {hasDebtorPropertyDocuments === "yes" ? (
                <div className="space-y-4">
                  {visibleOtherDocumentIndexes.map((index) => (
                    <div
                      className="rounded-lg border border-[#ded8d0] bg-white/70 p-4"
                      key={index}
                    >
                      <p className="sans text-xs font-bold uppercase tracking-[0.12em] text-[#64615c]">
                        Документ о должнике {index}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-[#5f5f59]">
                        Иные документы, подтверждающие сведения о должнике и его
                        имуществе.
                      </p>
                      <AttachmentInlineFields
                        descriptionFieldId={`otherDocument${index}Description`}
                        descriptionPlaceholder="описание документа"
                        errors={errors}
                        fieldLookup={fieldLookup}
                        onChange={onChange}
                        pagesFieldId={`otherDocument${index}Pages`}
                        values={values}
                      />
                      {index < 5 ? (
                        <ReceiptChoiceGroup
                          className="mt-4"
                          label={`Добавить еще документ ${index + 1}?`}
                          onChange={(value) =>
                            onChange(`addOtherDocument${index + 1}`, value)
                          }
                          options={[
                            { label: "Да, добавить", value: "yes" },
                            { label: "Нет", value: "no" },
                          ]}
                          value={String(
                            values[`addOtherDocument${index + 1}`] ?? "no",
                          )}
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="grid gap-4 border-t border-[#e3e0da] pt-6 md:grid-cols-[1fr_280px] md:items-end">
              <div className="space-y-4">
                <p>
                  Взыскатель: ______________________ /{" "}
                  <ReceiptInlineField
                    errors={errors}
                    fieldId="claimantFullName"
                    fieldLookup={fieldLookup}
                    onChange={onChange}
                    placeholder="ФИО взыскателя"
                    values={values}
                    widthClass="w-72"
                  />{" "}
                  /
                </p>
                <p>
                  Тел.:{" "}
                  <ReceiptInlineField
                    errors={errors}
                    fieldId="claimantPhone"
                    fieldLookup={fieldLookup}
                    onChange={onChange}
                    placeholder="телефон"
                    values={values}
                    widthClass="w-44"
                  />
                </p>
              </div>
              <p className="text-sm leading-6 text-[#5f5f59]">
                Перед скачиванием сверьте данные взыскателя, должника,
                исполнительного документа и банковских реквизитов.
              </p>
            </div>
          </div>
        </article>
      </div>

      <ReceiptInlineActions
        document={document}
        missingItems={missingItems}
        onDownload={onDownload}
        onPayment={onPayment}
        status={status}
      />
    </section>
  );
}

function EnforcementProgressInfoInlineConstructor({
  document,
  errors,
  fieldLookup,
  onChange,
  onDownload,
  onPayment,
  status,
  values,
}: InlineConstructorProps) {
  const missingItems = Object.keys(errors)
    .filter((fieldId) => errors[fieldId])
    .map((fieldId) => fieldLookup.get(fieldId)?.label ?? fieldId);
  const includeEnforcementDocumentCopy = String(
    values.includeEnforcementDocumentCopy ?? "no",
  );
  const includeClaimantStatusDocument = String(
    values.includeClaimantStatusDocument ?? "no",
  );
  const includeRepresentativePower = String(
    values.includeRepresentativePower ?? "no",
  );
  const includeOtherDocuments = String(values.includeOtherDocuments ?? "no");
  const visibleOtherDocumentIndexes = [1];

  for (let index = 2; index <= 5; index += 1) {
    if (values[`addOtherDocument${index}`] === "yes") {
      visibleOtherDocumentIndexes.push(index);
    } else {
      break;
    }
  }

  return (
    <section className="panel overflow-hidden shadow-[0_24px_62px_rgba(17,17,17,0.06)]">
      <div className="border-b border-[#d9d9d4] bg-white/80 p-6 text-center md:p-8">
        <p className="sans text-sm font-bold uppercase tracking-[0.14em] text-[#70706b]">
          Конструктор заявления
        </p>
        <h2 className="mt-3 text-4xl font-semibold">
          Заполните заявление о ходе производства
        </h2>
        <p className="mx-auto mt-4 max-w-3xl leading-7 text-[#4a4a47]">
          Поля встроены прямо в текст заявления о предоставлении информации по
          исполнительному производству.
        </p>
      </div>

      <div className="bg-[#f8f7f4] p-4 md:p-8">
        <article className="document-paper mx-auto max-w-5xl rounded-lg border border-[#d9d9d4] bg-white px-5 py-7 shadow-sm md:px-10 md:py-10">
          <div className="grid gap-7 md:grid-cols-[240px_1fr] md:items-start">
            <div className="text-[15px] leading-7 text-[#282826]">
              <ReceiptInlineField
                errors={errors}
                fieldId="documentDate"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="дата заявления"
                values={values}
                widthClass="w-44"
              />
            </div>
            <div className="space-y-3 justify-self-end text-[15px] leading-7 text-[#282826] md:max-w-[560px]">
              <p>
                Начальнику{" "}
                <ReceiptInlineField
                  errors={errors}
                  fieldId="ospName"
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  placeholder="название РОСП"
                  values={values}
                  widthClass="w-72"
                />{" "}
                РОСП
              </p>
              <p>
                <ReceiptInlineField
                  errors={errors}
                  fieldId="ufsspRegion"
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  placeholder="область"
                  values={values}
                  widthClass="w-64"
                />
              </p>
              <p>
                Адрес:{" "}
                <ReceiptInlineField
                  errors={errors}
                  fieldId="ospAddress"
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  placeholder="адрес отдела приставов"
                  values={values}
                  widthClass="w-80"
                />
              </p>
              <p>
                от взыскателя:{" "}
                <ReceiptInlineField
                  errors={errors}
                  fieldId="claimantHeaderFullName"
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  placeholder="ФИО взыскателя"
                  values={values}
                  widthClass="w-72"
                />
              </p>
              <p>
                Адрес:{" "}
                <ReceiptInlineField
                  errors={errors}
                  fieldId="claimantAddress"
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  placeholder="адрес взыскателя"
                  values={values}
                  widthClass="w-80"
                />
              </p>
              <p>
                тел.:{" "}
                <ReceiptInlineField
                  errors={errors}
                  fieldId="claimantPhone"
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  placeholder="телефон"
                  values={values}
                  widthClass="w-44"
                />
              </p>
              <p>
                e-mail:{" "}
                <ReceiptInlineField
                  errors={errors}
                  fieldId="claimantEmail"
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  placeholder="email"
                  values={values}
                  widthClass="w-56"
                />
              </p>
            </div>
          </div>

          <h3 className="mt-10 text-center text-3xl font-bold">
            ЗАЯВЛЕНИЕ
            <span className="mt-2 block text-2xl font-semibold">
              о предоставлении информации о ходе исполнительного производства
            </span>
          </h3>

          <div className="mt-8 space-y-6 text-[17px] leading-9 text-[#282826] [&>p]:indent-8">
            <p>
              В производстве{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="ospName"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="название РОСП"
                values={values}
                widthClass="w-64"
              />{" "}
              РОСП{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="ufsspRegion"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="регион УФССП"
                values={values}
                widthClass="w-64"
              />{" "}
              находится исполнительное производство №{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="enforcementProceedingNumber"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="номер исполнительного производства"
                values={values}
                widthClass="w-52"
              />
              , возбужденное на основании исполнительного документа:{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="enforcementDocumentName"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="исполнительный документ"
                values={values}
                widthClass="w-56"
              />{" "}
              серии{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="writSeries"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="серия"
                values={values}
                widthClass="w-24"
              />{" "}
              №{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="writNumber"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="номер"
                values={values}
                widthClass="w-36"
              />
              , выданного{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="writIssuedDate"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="дата"
                values={values}
                widthClass="w-44"
              />{" "}
              на основании{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="enforcementBasis"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="основание выдачи"
                values={values}
                widthClass="w-80"
              />{" "}
              по делу №{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="caseNumber"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="номер дела"
                values={values}
                widthClass="w-36"
              />
              , о взыскании с должника{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="debtorFullName"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="ФИО должника"
                values={values}
                widthClass="w-72"
              />{" "}
              в пользу взыскателя{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="claimantFullName"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="ФИО взыскателя"
                values={values}
                widthClass="w-72"
              />
              .
            </p>

            <p>
              До настоящего времени взыскатель не располагает полной
              информацией о ходе исполнительного производства, совершённых
              исполнительных действиях, принятых мерах принудительного
              исполнения, поступивших денежных средствах и причинах отсутствия
              фактического исполнения.
            </p>

            <p>
              На основании статьи 50 Федерального закона от 02.10.2007 №
              229-ФЗ «Об исполнительном производстве» сторона исполнительного
              производства вправе знакомиться с материалами исполнительного
              производства, делать выписки, снимать копии, заявлять ходатайства
              и получать сведения, необходимые для защиты своих прав.
            </p>

            <p className="indent-0 font-semibold">
              Прошу предоставить информацию:
            </p>

            <div className="space-y-4 indent-0">
              <InlineNumberedRow marker="1.">
                О текущем состоянии исполнительного производства №{" "}
                <ReceiptInlineField
                  errors={errors}
                  fieldId="enforcementProceedingNumber"
                  fieldLookup={fieldLookup}
                  onChange={onChange}
                  placeholder="номер производства"
                  values={values}
                  widthClass="w-52"
                />
                .
              </InlineNumberedRow>
              <InlineNumberedRow marker="2.">
                О совершённых исполнительных действиях и принятых мерах
                принудительного исполнения.
              </InlineNumberedRow>
              <InlineNumberedRow marker="3.">
                О направлении запросов в банки, регистрирующие органы,
                налоговые органы и иные организации.
              </InlineNumberedRow>
              <InlineNumberedRow marker="4.">
                О поступивших денежных средствах и произведённых перечислениях
                взыскателю.
              </InlineNumberedRow>
              <InlineNumberedRow marker="5.">
                О причинах неисполнения требований исполнительного документа в
                полном объёме.
              </InlineNumberedRow>
            </div>

            <p>
              Ответ прошу направить по адресу:{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="responseAddress"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="адрес для ответа"
                values={values}
                widthClass="w-80"
              />{" "}
              и на электронную почту:{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="claimantEmail"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="email"
                values={values}
                widthClass="w-56"
              />
              .
            </p>

            <div className="space-y-3">
              <p className="font-semibold indent-0">Приложения:</p>

              <ReceiptChoiceGroup
                label="Приложить копию исполнительного документа или постановления?"
                onChange={(value) =>
                  onChange("includeEnforcementDocumentCopy", value)
                }
                options={[
                  { label: "Да, приложить", value: "yes" },
                  { label: "Нет", value: "no" },
                ]}
                value={includeEnforcementDocumentCopy}
              />
              {includeEnforcementDocumentCopy === "yes" ? (
                <InlineNumberedRow marker="1.">
                  <ReceiptInlineField
                    errors={errors}
                    fieldId="enforcementDocumentCopyDescription"
                    fieldLookup={fieldLookup}
                    onChange={onChange}
                    placeholder="название приложения"
                    values={values}
                    widthClass="w-80"
                  />{" "}
                  - на{" "}
                  <ReceiptInlineField
                    errors={errors}
                    fieldId="enforcementDocumentCopyPages"
                    fieldLookup={fieldLookup}
                    onChange={onChange}
                    placeholder="листов"
                    values={values}
                    widthClass="w-24"
                  />{" "}
                  листах.
                </InlineNumberedRow>
              ) : null}

              <ReceiptChoiceGroup
                label="Приложить документ о статусе взыскателя?"
                onChange={(value) =>
                  onChange("includeClaimantStatusDocument", value)
                }
                options={[
                  { label: "Да, приложить", value: "yes" },
                  { label: "Нет", value: "no" },
                ]}
                value={includeClaimantStatusDocument}
              />
              {includeClaimantStatusDocument === "yes" ? (
                <InlineNumberedRow marker="2.">
                  <ReceiptInlineField
                    errors={errors}
                    fieldId="claimantStatusDocumentDescription"
                    fieldLookup={fieldLookup}
                    onChange={onChange}
                    placeholder="название документа"
                    values={values}
                    widthClass="w-80"
                  />{" "}
                  - на{" "}
                  <ReceiptInlineField
                    errors={errors}
                    fieldId="claimantStatusDocumentPages"
                    fieldLookup={fieldLookup}
                    onChange={onChange}
                    placeholder="листов"
                    values={values}
                    widthClass="w-24"
                  />{" "}
                  листах.
                </InlineNumberedRow>
              ) : null}

              <ReceiptChoiceGroup
                label="Приложить доверенность представителя?"
                onChange={(value) => onChange("includeRepresentativePower", value)}
                options={[
                  { label: "Да, приложить", value: "yes" },
                  { label: "Нет", value: "no" },
                ]}
                value={includeRepresentativePower}
              />
              {includeRepresentativePower === "yes" ? (
                <InlineNumberedRow marker="3.">
                  <ReceiptInlineField
                    errors={errors}
                    fieldId="representativePowerDescription"
                    fieldLookup={fieldLookup}
                    onChange={onChange}
                    placeholder="название доверенности"
                    values={values}
                    widthClass="w-80"
                  />{" "}
                  - на{" "}
                  <ReceiptInlineField
                    errors={errors}
                    fieldId="representativePowerPages"
                    fieldLookup={fieldLookup}
                    onChange={onChange}
                    placeholder="листов"
                    values={values}
                    widthClass="w-24"
                  />{" "}
                  листах.
                </InlineNumberedRow>
              ) : null}

              <ReceiptChoiceGroup
                label="Приложить иные документы?"
                onChange={(value) => onChange("includeOtherDocuments", value)}
                options={[
                  { label: "Да, приложить", value: "yes" },
                  { label: "Нет", value: "no" },
                ]}
                value={includeOtherDocuments}
              />
              {includeOtherDocuments === "yes" ? (
                <div className="space-y-4">
                  {visibleOtherDocumentIndexes.map((index) => (
                    <div
                      className="rounded-lg border border-[#ded8d0] bg-white/70 p-4"
                      key={index}
                    >
                      <p className="sans text-xs font-bold uppercase tracking-[0.12em] text-[#64615c]">
                        Иной документ {index}
                      </p>
                      <AttachmentInlineFields
                        descriptionFieldId={`otherDocument${index}Description`}
                        descriptionPlaceholder="название иного документа"
                        errors={errors}
                        fieldLookup={fieldLookup}
                        onChange={onChange}
                        pagesFieldId={`otherDocument${index}Pages`}
                        values={values}
                      />
                      {index < 5 ? (
                        <ReceiptChoiceGroup
                          className="mt-4"
                          label={`Добавить еще документ ${index + 1}?`}
                          onChange={(value) =>
                            onChange(`addOtherDocument${index + 1}`, value)
                          }
                          options={[
                            { label: "Да, добавить", value: "yes" },
                            { label: "Нет", value: "no" },
                          ]}
                          value={String(
                            values[`addOtherDocument${index + 1}`] ?? "no",
                          )}
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="grid gap-4 border-t border-[#e3e0da] pt-6 md:grid-cols-[1fr_280px] md:items-end">
              <div className="space-y-4">
                <p>
                  Взыскатель: ______________________ /{" "}
                  <ReceiptInlineField
                    errors={errors}
                    fieldId="claimantFullName"
                    fieldLookup={fieldLookup}
                    onChange={onChange}
                    placeholder="ФИО взыскателя"
                    values={values}
                    widthClass="w-72"
                  />{" "}
                  /
                </p>
                <p>
                  Тел.:{" "}
                  <ReceiptInlineField
                    errors={errors}
                    fieldId="claimantPhone"
                    fieldLookup={fieldLookup}
                    onChange={onChange}
                    placeholder="телефон"
                    values={values}
                    widthClass="w-44"
                  />
                </p>
              </div>
              <p className="text-sm leading-6 text-[#5f5f59]">
                Перед скачиванием сверьте номер производства, реквизиты
                исполнительного документа и адрес для ответа.
              </p>
            </div>
          </div>
        </article>
      </div>

      <ReceiptInlineActions
        document={document}
        missingItems={missingItems}
        onDownload={onDownload}
        onPayment={onPayment}
        status={status}
      />
    </section>
  );
}

function EnforcementDocumentInlineFields({
  documentType,
  errors,
  fieldLookup,
  onChange,
  values,
}: {
  documentType: string;
  errors: Record<string, string>;
  fieldLookup: Map<string, DocumentField>;
  onChange: (id: string, value: string | boolean) => void;
  values: DocumentValues;
}) {
  if (documentType === "judicialOrder") {
    return <>судебный приказ <span className="sm:whitespace-nowrap">№ <ReceiptInlineField errors={errors} fieldId="judicialOrderNumber" fieldLookup={fieldLookup} onChange={onChange} placeholder="номер" values={values} widthClass="w-36" /></span>, от <ReceiptInlineField errors={errors} fieldId="judicialOrderDate" fieldLookup={fieldLookup} onChange={onChange} placeholder="дата" values={values} widthClass="w-44" />, выданный <ReceiptInlineField errors={errors} fieldId="judicialOrderCourt" fieldLookup={fieldLookup} onChange={onChange} placeholder="суд/участок" values={values} widthClass="w-80" /></>;
  }

  if (documentType === "notaryAgreement") {
    return <>нотариальное соглашение об алиментах, удостоверенное нотариусом <ReceiptInlineField errors={errors} fieldId="notaryAgreementNotary" fieldLookup={fieldLookup} onChange={onChange} placeholder="нотариус" values={values} widthClass="w-72" />, нотариального округа <ReceiptInlineField errors={errors} fieldId="notaryAgreementDistrict" fieldLookup={fieldLookup} onChange={onChange} placeholder="округ" values={values} widthClass="w-64" />, зарегистрированное в реестре за <span className="sm:whitespace-nowrap">№ <ReceiptInlineField errors={errors} fieldId="notaryAgreementRegistryNumber" fieldLookup={fieldLookup} onChange={onChange} placeholder="номер" values={values} widthClass="w-36" /></span></>;
  }

  if (documentType === "notaryWrit") {
    return <>исполнительная надпись нотариуса от <ReceiptInlineField errors={errors} fieldId="notaryWritDate" fieldLookup={fieldLookup} onChange={onChange} placeholder="дата" values={values} widthClass="w-44" />, нотариус <ReceiptInlineField errors={errors} fieldId="notaryWritNotary" fieldLookup={fieldLookup} onChange={onChange} placeholder="нотариус" values={values} widthClass="w-72" />, реестровый <span className="sm:whitespace-nowrap">№ <ReceiptInlineField errors={errors} fieldId="notaryWritRegistryNumber" fieldLookup={fieldLookup} onChange={onChange} placeholder="номер" values={values} widthClass="w-36" /></span></>;
  }

  if (documentType === "laborCommissionCertificate") {
    return <>удостоверение комиссии по трудовым спорам <span className="sm:whitespace-nowrap">№ <ReceiptInlineField errors={errors} fieldId="laborCertificateNumber" fieldLookup={fieldLookup} onChange={onChange} placeholder="номер" values={values} widthClass="w-36" /></span>, выданное <ReceiptInlineField errors={errors} fieldId="laborCertificateDate" fieldLookup={fieldLookup} onChange={onChange} placeholder="дата" values={values} widthClass="w-44" />, <ReceiptInlineField errors={errors} fieldId="laborCommissionName" fieldLookup={fieldLookup} onChange={onChange} placeholder="комиссия" values={values} widthClass="w-80" /></>;
  }

  if (documentType === "administrativeRuling") {
    return <>постановление по делу об административном правонарушении <span className="sm:whitespace-nowrap">№ <ReceiptInlineField errors={errors} fieldId="administrativeRulingNumber" fieldLookup={fieldLookup} onChange={onChange} placeholder="номер" values={values} widthClass="w-36" /></span>, от <ReceiptInlineField errors={errors} fieldId="administrativeRulingDate" fieldLookup={fieldLookup} onChange={onChange} placeholder="дата" values={values} widthClass="w-44" />, орган/должностное лицо: <ReceiptInlineField errors={errors} fieldId="administrativeRulingIssuer" fieldLookup={fieldLookup} onChange={onChange} placeholder="орган/лицо" values={values} widthClass="w-80" /></>;
  }

  if (documentType === "other") {
    return <><ReceiptInlineField errors={errors} fieldId="otherEnforcementDocumentName" fieldLookup={fieldLookup} onChange={onChange} placeholder="название документа" values={values} widthClass="w-80" />, от <ReceiptInlineField errors={errors} fieldId="otherDocumentDate" fieldLookup={fieldLookup} onChange={onChange} placeholder="дата" values={values} widthClass="w-44" />, <span className="sm:whitespace-nowrap">№ <ReceiptInlineField errors={errors} fieldId="otherDocumentNumber" fieldLookup={fieldLookup} onChange={onChange} placeholder="при наличии" values={values} widthClass="w-36" /></span>, выдан <ReceiptInlineField errors={errors} fieldId="otherDocumentIssuer" fieldLookup={fieldLookup} onChange={onChange} placeholder="орган/лицо" values={values} widthClass="w-80" /></>;
  }

  return (
    <>
      <InlineFieldGroup>исполнительный лист</InlineFieldGroup>{" "}
      <InlineFieldGroup>
        серии
        <ReceiptInlineField
          errors={errors}
          fieldId="writSeries"
          fieldLookup={fieldLookup}
          onChange={onChange}
          placeholder="серия"
          values={values}
          widthClass="w-24"
        />
        №
        <ReceiptInlineField
          errors={errors}
          fieldId="writNumber"
          fieldLookup={fieldLookup}
          onChange={onChange}
          placeholder="номер"
          values={values}
          widthClass="w-36"
        />
      </InlineFieldGroup>
      <InlineFieldGroup>
        , выданный
        <ReceiptInlineField
          errors={errors}
          fieldId="writIssuedDate"
          fieldLookup={fieldLookup}
          onChange={onChange}
          placeholder="дата"
          values={values}
          widthClass="w-44"
        />
      </InlineFieldGroup>{" "}
      <InlineFieldGroup>
        <ReceiptInlineField
          errors={errors}
          fieldId="courtName"
          fieldLookup={fieldLookup}
          onChange={onChange}
          placeholder="название суда"
          values={values}
          widthClass="w-80"
        />
      </InlineFieldGroup>{" "}
      <InlineFieldGroup>
        по делу №
        <ReceiptInlineField
          errors={errors}
          fieldId="caseNumber"
          fieldLookup={fieldLookup}
          onChange={onChange}
          placeholder="номер дела"
          values={values}
          widthClass="w-36"
        />
      </InlineFieldGroup>
    </>
  );
}

function AttachmentInlineFields({
  descriptionFieldId,
  descriptionPlaceholder,
  errors,
  fieldLookup,
  onChange,
  pagesFieldId,
  values,
}: {
  descriptionFieldId: string;
  descriptionPlaceholder: string;
  errors: Record<string, string>;
  fieldLookup: Map<string, DocumentField>;
  onChange: (id: string, value: string | boolean) => void;
  pagesFieldId: string;
  values: DocumentValues;
}) {
  return (
    <div className="mt-3 rounded-lg border border-[#ded8d0] bg-white/70 p-4">
      <p className="indent-0">
        Приложение:{" "}
        <ReceiptInlineField
          errors={errors}
          fieldId={descriptionFieldId}
          fieldLookup={fieldLookup}
          onChange={onChange}
          placeholder={descriptionPlaceholder}
          values={values}
          widthClass="w-96"
        />{" "}
        - на{" "}
        <ReceiptInlineField
          errors={errors}
          fieldId={pagesFieldId}
          fieldLookup={fieldLookup}
          onChange={onChange}
          placeholder="листов"
          values={values}
          widthClass="w-24"
        />{" "}
        листах.
      </p>
    </div>
  );
}

function LoanReceiptInlineBody({
  errors,
  fieldLookup,
  hasContract,
  hasInterest,
  hasPenalty,
  identityConfirmationType,
  loanDocumentType,
  onChange,
  paymentForm,
  signingPlaceMode,
  signingTimeMode,
  transferredDocumentType,
  values,
  witnessesMode,
}: {
  errors: Record<string, string>;
  fieldLookup: Map<string, DocumentField>;
  hasContract: boolean;
  hasInterest: boolean;
  hasPenalty: boolean;
  identityConfirmationType: string;
  loanDocumentType: string;
  onChange: (id: string, value: string | boolean) => void;
  paymentForm: string;
  signingPlaceMode: string;
  signingTimeMode: string;
  transferredDocumentType: string;
  values: DocumentValues;
  witnessesMode: string;
}) {
  return (
    <>
      <ReceiptChoiceGroup
        className="mt-8"
        label="Основание передачи денег"
        onChange={(value) => onChange("loanDocumentType", value)}
        options={[
          { label: "Есть договор займа", value: "withContract" },
          { label: "Без договора займа", value: "withoutContract" },
        ]}
        value={loanDocumentType}
      />
      <div className="mt-8 space-y-6 text-[17px] leading-9 text-[#282826] [&>p]:indent-8">
        <p>
          Я,{" "}
          <ReceiptInlineField
            errors={errors}
            fieldId="receiverFullName"
            fieldLookup={fieldLookup}
            onChange={onChange}
            placeholder="ФИО заемщика"
            values={values}
            widthClass="w-64"
          />
          , паспорт: <ReceiptPassportInlineFields
            errors={errors}
            fieldLookup={fieldLookup}
            onChange={onChange}
            prefix="receiver"
            values={values}
          />
          , адрес регистрации:{" "}
          <ReceiptInlineField
            errors={errors}
            fieldId="receiverAddress"
            fieldLookup={fieldLookup}
            onChange={onChange}
            placeholder="адрес заемщика"
            values={values}
            widthClass="w-80"
          />
          , получил от{" "}
          <ReceiptInlineField
            errors={errors}
            fieldId="giverFullName"
            fieldLookup={fieldLookup}
            onChange={onChange}
            placeholder="ФИО займодавца"
            values={values}
            widthClass="w-64"
          />
          , паспорт: <ReceiptPassportInlineFields
            errors={errors}
            fieldLookup={fieldLookup}
            onChange={onChange}
            prefix="giver"
            values={values}
          />
          , адрес регистрации:{" "}
          <ReceiptInlineField
            errors={errors}
            fieldId="giverAddress"
            fieldLookup={fieldLookup}
            onChange={onChange}
            placeholder="адрес займодавца"
            values={values}
            widthClass="w-80"
          />
          , денежные средства в качестве займа в размере{" "}
          <ReceiptAmountWithWordsInline
            errors={errors}
            fieldLookup={fieldLookup}
            numberFieldId="amountNumber"
            numberPlaceholder="сумма"
            numberWidthClass="w-36"
            onChange={onChange}
            values={values}
            wordsFieldId="amountWords"
            wordsPlaceholder="сумма прописью"
            wordsWidthClass="w-64"
          />
          {" "}рублей
          {hasContract ? (
            <>
              {" "}по договору займа от{" "}
              <ReceiptInlineField
                errors={errors}
                fieldId="contractDate"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="дата договора"
                values={values}
                widthClass="w-44"
              />
            </>
          ) : null}
          .
        </p>

        <ReceiptChoiceGroup
          label="Есть ли проценты по займу"
          onChange={(value) => onChange("hasInterest", value)}
          options={[
            { label: "Да, с процентами", value: true },
            { label: "Нет, без процентов", value: false },
          ]}
          value={hasInterest}
        />

        {hasInterest ? (
          <p>
            Обязуюсь вернуть заимодавцу сумму займа и проценты за пользование займом в общей сумме{" "}
            <ReceiptAmountWithWordsInline
              errors={errors}
              fieldLookup={fieldLookup}
              numberFieldId="totalReturnAmountNumber"
              numberPlaceholder="общая сумма"
              numberWidthClass="w-40"
              onChange={onChange}
              values={values}
              wordsFieldId="totalReturnAmountWords"
              wordsPlaceholder="общая сумма прописью"
              wordsWidthClass="w-72"
            />
            {" "}рублей, где сумма процента составляет{" "}
            <ReceiptAmountWithWordsInline
              errors={errors}
              fieldLookup={fieldLookup}
              numberFieldId="interestAmountNumber"
              numberPlaceholder="проценты"
              numberWidthClass="w-36"
              onChange={onChange}
              values={values}
              wordsFieldId="interestAmountWords"
              wordsPlaceholder="проценты прописью"
              wordsWidthClass="w-64"
            />
            , в срок до{" "}
            <ReceiptInlineField
              errors={errors}
              fieldId="returnDate"
              fieldLookup={fieldLookup}
              onChange={onChange}
              placeholder="дата возврата"
              values={values}
              widthClass="w-44"
            />
            .
          </p>
        ) : (
          <p>
            Обязуюсь вернуть сумму займа в срок до{" "}
            <ReceiptInlineField
              errors={errors}
              fieldId="returnDate"
              fieldLookup={fieldLookup}
              onChange={onChange}
              placeholder="дата возврата"
              values={values}
              widthClass="w-44"
            />
            .
          </p>
        )}

        <ReceiptChoiceGroup
          label="Нужны ли пени"
          onChange={(value) => onChange("hasPenalty", value)}
          options={[
            { label: "Да, указать", value: true },
            { label: "Нет, без пени", value: false },
          ]}
          value={hasPenalty}
        />

        {hasPenalty ? (
          <p>
            В случае нарушения срока возврата обязуюсь дополнительно выплатить неустойку в размере{" "}
            <ReceiptInlineField
              errors={errors}
              fieldId="penaltyRate"
              fieldLookup={fieldLookup}
              onChange={onChange}
              placeholder="процент"
              values={values}
              widthClass="w-28"
            />
            % (
            <ReceiptInlineField
              errors={errors}
              fieldId="penaltyRateWords"
              fieldLookup={fieldLookup}
              onChange={onChange}
              placeholder="процент прописью"
              values={values}
              widthClass="w-56"
            />
            ) от не уплаченной в срок суммы за каждый день просрочки.
          </p>
        ) : null}

        <ReceiptChoiceGroup
          label="Как переданы деньги"
          onChange={(value) => onChange("paymentForm", value)}
          options={[
            { label: "Наличными", value: "cash" },
            { label: "Банковский перевод", value: "bankTransfer" },
            { label: "Не указывать", value: "notSpecified" },
          ]}
          value={paymentForm}
        />

        {paymentForm === "bankTransfer" ? (
          <p>
            Денежные средства переданы мне безналичным переводом на банковскую карту №{" "}
            <ReceiptInlineField
              errors={errors}
              fieldId="bankTransferAccount"
              fieldLookup={fieldLookup}
              onChange={onChange}
              placeholder="номер карты"
              values={values}
              widthClass="w-64"
            />
            .
          </p>
        ) : paymentForm === "cash" ? (
          <p>Денежные средства переданы наличными.</p>
        ) : null}

        <ReceiptChoiceGroup
          label="Были ли свидетели"
          onChange={(value) => onChange("witnessesMode", value)}
          options={[
            { label: "Да, были свидетели", value: "present" },
            { label: "Нет, свидетелей не было", value: "absent" },
            { label: "Не указывать", value: "notProvided" },
          ]}
          value={witnessesMode}
        />

        {witnessesMode === "present" ? (
          <p>
            При составлении расписки присутствовали следующие свидетели:{" "}
            <ReceiptInlineField
              errors={errors}
              fieldId="witnessesDetails"
              fieldLookup={fieldLookup}
              onChange={onChange}
              placeholder="ФИО свидетелей и их данные"
              values={values}
              widthClass="w-96"
            />
            .
          </p>
        ) : witnessesMode === "absent" ? (
          <p>При составлении расписки свидетели не присутствовали.</p>
        ) : null}

        <ReceiptChoiceGroup
          label="Указать место подписания"
          onChange={(value) => onChange("signingPlaceMode", value)}
          options={[
            { label: "Да", value: "yes" },
            { label: "Оставить пустую строку", value: "blank" },
            { label: "Нет", value: "no" },
          ]}
          value={signingPlaceMode}
        />

        {signingPlaceMode === "yes" ? (
          <p>
            Расписка подписана мной по адресу:{" "}
            <ReceiptInlineField
              errors={errors}
              fieldId="signingPlaceAddress"
              fieldLookup={fieldLookup}
              onChange={onChange}
              placeholder="адрес подписания"
              values={values}
              widthClass="w-96"
            />
            .
          </p>
        ) : signingPlaceMode === "blank" ? (
          <p>Расписка подписана мной по адресу: ______________________________.</p>
        ) : null}

        <ReceiptChoiceGroup
          label="Указать время подписания"
          onChange={(value) => onChange("signingTimeMode", value)}
          options={[
            { label: "Да", value: "yes" },
            { label: "Оставить пустую строку", value: "blank" },
            { label: "Нет", value: "no" },
          ]}
          value={signingTimeMode}
        />

        {signingTimeMode === "yes" ? (
          <p>
            Расписка подписана мной в{" "}
            <ReceiptInlineField
              errors={errors}
              fieldId="signingTime"
              fieldLookup={fieldLookup}
              onChange={onChange}
              placeholder="время"
              values={values}
              widthClass="w-44"
            />{" "}
            по московскому времени.
          </p>
        ) : signingTimeMode === "blank" ? (
          <p>Расписка подписана мной в __________ по московскому времени.</p>
        ) : null}

        <ReceiptChoiceGroup
          label="Что передано вместе с деньгами"
          onChange={(value) => onChange("transferredDocumentType", value)}
          options={[
            { label: "Договор займа", value: "contract" },
            { label: "Акт приема-передачи", value: "act" },
            { label: "Другой документ", value: "other" },
            { label: "Ничего", value: "none" },
          ]}
          value={transferredDocumentType}
        />

        {transferredDocumentType !== "none" ? (
          <p>
            При подписании настоящей расписки мной получен документ{" "}
            {transferredDocumentType === "contract"
              ? "договор займа"
              : transferredDocumentType === "act"
                ? "акт приема-передачи"
                : "другой документ"}
            :{" "}
            <ReceiptInlineField
              errors={errors}
              fieldId="transferredDocumentDetails"
              fieldLookup={fieldLookup}
              onChange={onChange}
              placeholder="например, номер или дата"
              values={values}
              widthClass="w-80"
            />
            .
          </p>
        ) : null}

        <ReceiptChoiceGroup
          label="Подтверждение личности займодавца"
          onChange={(value) => onChange("identityConfirmationType", value)}
          options={[
            { label: "Паспорт", value: "passport" },
            { label: "Водительское удостоверение", value: "driverLicense" },
            { label: "Не указывать", value: "notProvided" },
          ]}
          value={identityConfirmationType}
        />

        {identityConfirmationType === "passport" ? (
          <p>
            Личность составителя расписки подтверждена паспортом:{" "}
            <ReceiptPassportInlineFields
              errors={errors}
              fieldLookup={fieldLookup}
              onChange={onChange}
              prefix="giver"
              values={values}
            />
            .
          </p>
        ) : identityConfirmationType === "driverLicense" ? (
          <p>
            Личность составителя расписки подтверждена водительским удостоверением:{" "}
            <ReceiptInlineField
              errors={errors}
              fieldId="identityDocumentDetails"
              fieldLookup={fieldLookup}
              onChange={onChange}
              placeholder="номер и дата удостоверения"
              values={values}
              widthClass="w-80"
            />
            .
          </p>
        ) : null}

        <div className="grid gap-4 border-t border-[#e3e0da] pt-6 md:grid-cols-[1fr_280px] md:items-end">
          <div className="space-y-4">
            <p>
              <ReceiptInlineField
                errors={errors}
                fieldId="receiverFullName"
                fieldLookup={fieldLookup}
                onChange={onChange}
                placeholder="ФИО заемщика"
                values={values}
                widthClass="w-64"
              />
            </p>
            <p>Подпись: ____________________</p>
          </div>
          <p className="text-sm leading-6 text-[#5f5f59]">
            Перед скачиванием проверьте все данные: они попадут в PDF без
            дополнительных правок.
          </p>
        </div>
      </div>
    </>
  );
}
function ReceiptInlineField({
  errors,
  fieldId,
  fieldLookup,
  fixedDisplayValue,
  onChange,
  placeholder,
  values,
  widthClass,
}: {
  errors: Record<string, string>;
  fieldId: string;
  fieldLookup: Map<string, DocumentField>;
  fixedDisplayValue?: string;
  onChange: (id: string, value: string | boolean) => void;
  placeholder: string;
  values: DocumentValues;
  widthClass: string;
}) {
  const field = fieldLookup.get(fieldId);
  const inputType =
    field?.type === "date"
      ? "date"
      : field?.type === "money" || field?.type === "number"
        ? "number"
        : "text";
  const hasError = Boolean(errors[fieldId]);

  return (
    <input
      aria-invalid={hasError}
      className={`mx-0 my-1 inline-block h-9 w-full min-w-0 max-w-full rounded-[4px] border border-b-2 px-2 align-baseline text-[15px] leading-none outline-none transition placeholder:text-[#626b57] focus:border-[#111111] focus:bg-white sm:mx-1 sm:my-0 sm:h-8 sm:w-auto ${
        hasError
          ? "border-[#9b2c2c] bg-[#fff7f4]"
          : "border-[#aab39a] bg-[#f0f3ea]"
      } ${responsiveInlineWidth(widthClass)}`}
      onChange={(event) => onChange(fieldId, event.target.value)}
      placeholder={placeholder}
      type={inputType}
      value={fixedDisplayValue ?? String(values[fieldId] ?? "")}
    />
  );
}

function PowerOfAttorneyNamingSelect({
  errors,
  fieldId,
  onChange,
  values,
}: {
  errors: Record<string, string>;
  fieldId: string;
  onChange: (id: string, value: string | boolean) => void;
  values: DocumentValues;
}) {
  const hasError = Boolean(errors[fieldId]);

  return (
    <select
      aria-invalid={hasError}
      className={`mx-0 my-1 inline-block h-9 w-full min-w-0 max-w-full rounded-[4px] border border-b-2 px-2 align-baseline text-[15px] leading-none outline-none transition focus:border-[#111111] focus:bg-white sm:mx-1 sm:my-0 sm:h-8 sm:w-auto ${
        hasError
          ? "border-[#9b2c2c] bg-[#fff7f4]"
          : "border-[#aab39a] bg-[#f0f3ea]"
      }`}
      onChange={(event) => onChange(fieldId, event.target.value)}
      value={String(values[fieldId] ?? "male")}
    >
      <option value="male">именуемый</option>
      <option value="female">именуемая</option>
    </select>
  );
}

function ReceiptPassportInlineFields({
  errors,
  fieldLookup,
  onChange,
  prefix,
  values,
}: {
  errors: Record<string, string>;
  fieldLookup: Map<string, DocumentField>;
  onChange: (id: string, value: string | boolean) => void;
  prefix: "receiver" | "giver";
  values: DocumentValues;
}) {
  return (
    <>
      <span className="sm:whitespace-nowrap">
        серия{" "}
        <ReceiptInlineField
          errors={errors}
          fieldId={`${prefix}PassportSeries`}
          fieldLookup={fieldLookup}
          onChange={onChange}
          placeholder="серия"
          values={values}
          widthClass="w-24"
        />
      </span>
      ,{" "}
      <span className="sm:whitespace-nowrap">
        №{" "}
        <ReceiptInlineField
          errors={errors}
          fieldId={`${prefix}PassportNumber`}
          fieldLookup={fieldLookup}
          onChange={onChange}
          placeholder="номер"
          values={values}
          widthClass="w-28"
        />
      </span>
      , выдан{" "}
      <ReceiptInlineField
        errors={errors}
        fieldId={`${prefix}PassportIssuedBy`}
        fieldLookup={fieldLookup}
        onChange={onChange}
        placeholder="кем выдан"
        values={values}
        widthClass="w-80"
      />
    </>
  );
}

function PowerOfAttorneyIpPrincipalParagraph({
  errors,
  fieldLookup,
  onChange,
  values,
}: {
  errors: Record<string, string>;
  fieldLookup: Map<string, DocumentField>;
  onChange: (id: string, value: string | boolean) => void;
  values: DocumentValues;
}) {
  return (
    <p>
      Я,{" "}
      <PowerOfAttorneyPersonInlineFields
        errors={errors}
        fieldLookup={fieldLookup}
        onChange={onChange}
        prefix="principal"
        values={values}
      />
      ,{" "}
      {values.principalNamingGender === "female"
        ? "зарегистрированная"
        : "зарегистрированный"}{" "}
      в качестве индивидуального предпринимателя, ОГРНИП{" "}
      <ReceiptInlineField
        errors={errors}
        fieldId="principalOgrnip"
        fieldLookup={fieldLookup}
        onChange={onChange}
        placeholder="ОГРНИП"
        values={values}
        widthClass="w-44"
      />
      , ИНН{" "}
      <ReceiptInlineField
        errors={errors}
        fieldId="principalInn"
        fieldLookup={fieldLookup}
        onChange={onChange}
        placeholder="ИНН"
        values={values}
        widthClass="w-40"
      />
      ,{" "}
      <PowerOfAttorneyNamingSelect
        errors={errors}
        fieldId="principalNamingGender"
        onChange={onChange}
        values={values}
      />{" "}
      в дальнейшем &quot;Доверитель&quot;, настоящей доверенностью уполномочиваю:
    </p>
  );
}

function PowerOfAttorneyOrganizationPrincipalParagraph({
  errors,
  fieldLookup,
  onChange,
  values,
}: {
  errors: Record<string, string>;
  fieldLookup: Map<string, DocumentField>;
  onChange: (id: string, value: string | boolean) => void;
  values: DocumentValues;
}) {
  return (
    <p>
      <ReceiptInlineField
        errors={errors}
        fieldId="principalOrganizationName"
        fieldLookup={fieldLookup}
        onChange={onChange}
        placeholder="наименование доверителя"
        values={values}
        widthClass="w-80"
      />
      , ОГРН{" "}
      <ReceiptInlineField
        errors={errors}
        fieldId="principalOrganizationOgrn"
        fieldLookup={fieldLookup}
        onChange={onChange}
        placeholder="ОГРН"
        values={values}
        widthClass="w-40"
      />
      , ИНН{" "}
      <ReceiptInlineField
        errors={errors}
        fieldId="principalOrganizationInn"
        fieldLookup={fieldLookup}
        onChange={onChange}
        placeholder="ИНН"
        values={values}
        widthClass="w-36"
      />
      , именуемое в дальнейшем &quot;Доверитель&quot;, от имени которого действует{" "}
      <ReceiptInlineField
        errors={errors}
        fieldId="principalSignerPosition"
        fieldLookup={fieldLookup}
        onChange={onChange}
        placeholder="должность"
        values={values}
        widthClass="w-56"
      />{" "}
      <ReceiptInlineField
        errors={errors}
        fieldId="principalSignerFullName"
        fieldLookup={fieldLookup}
        onChange={onChange}
        placeholder="ФИО подписанта"
        values={values}
        widthClass="w-72"
      />{" "}
      на основании{" "}
      <ReceiptInlineField
        errors={errors}
        fieldId="principalSignerBasis"
        fieldLookup={fieldLookup}
        onChange={onChange}
        placeholder="основание"
        values={values}
        widthClass="w-44"
      />
      , настоящей доверенностью уполномочивает:
    </p>
  );
}

function PowerOfAttorneyPersonInlineFields({
  errors,
  fieldLookup,
  onChange,
  prefix,
  values,
}: {
  errors: Record<string, string>;
  fieldLookup: Map<string, DocumentField>;
  onChange: (id: string, value: string | boolean) => void;
  prefix: "principal" | "representative";
  values: DocumentValues;
}) {
  const fullNamePlaceholder =
    prefix === "principal" ? "ФИО доверителя" : "ФИО доверенного лица";

  return (
    <>
      <ReceiptInlineField
        errors={errors}
        fieldId={`${prefix}FullName`}
        fieldLookup={fieldLookup}
        onChange={onChange}
        placeholder={fullNamePlaceholder}
        values={values}
        widthClass="w-72"
      />
      , дата рождения{" "}
      <ReceiptInlineField
        errors={errors}
        fieldId={`${prefix}BirthDate`}
        fieldLookup={fieldLookup}
        onChange={onChange}
        placeholder="дата рождения"
        values={values}
        widthClass="w-44"
      />
      , паспорт: серия{" "}
      <ReceiptInlineField
        errors={errors}
        fieldId={`${prefix}PassportSeries`}
        fieldLookup={fieldLookup}
        onChange={onChange}
        placeholder="серия"
        values={values}
        widthClass="w-24"
      />{" "}
      №{" "}
      <ReceiptInlineField
        errors={errors}
        fieldId={`${prefix}PassportNumber`}
        fieldLookup={fieldLookup}
        onChange={onChange}
        placeholder="номер"
        values={values}
        widthClass="w-28"
      />
      , выдан{" "}
      <ReceiptInlineField
        errors={errors}
        fieldId={`${prefix}PassportIssuedBy`}
        fieldLookup={fieldLookup}
        onChange={onChange}
        placeholder="кем выдан"
        values={values}
        widthClass="w-80"
      />{" "}
      <ReceiptInlineField
        errors={errors}
        fieldId={`${prefix}PassportIssuedDate`}
        fieldLookup={fieldLookup}
        onChange={onChange}
        placeholder="дата выдачи"
        values={values}
        widthClass="w-44"
      />
      , адрес регистрации:{" "}
      <ReceiptInlineField
        errors={errors}
        fieldId={`${prefix}Address`}
        fieldLookup={fieldLookup}
        onChange={onChange}
        placeholder="адрес регистрации"
        values={values}
        widthClass="w-96"
      />
    </>
  );
}

function PowerOfAttorneyInlineTextarea({
  errors,
  fieldId,
  fieldLookup,
  onChange,
  placeholder,
  values,
}: {
  errors: Record<string, string>;
  fieldId: string;
  fieldLookup: Map<string, DocumentField>;
  onChange: (id: string, value: string | boolean) => void;
  placeholder: string;
  values: DocumentValues;
}) {
  const hasError = Boolean(errors[fieldId]);

  return (
    <textarea
      aria-invalid={hasError}
      className={`min-h-24 w-full rounded-[4px] border border-b-2 px-3 py-2 text-[15px] leading-6 outline-none transition placeholder:text-[#626b57] focus:border-[#111111] focus:bg-white ${
        hasError
          ? "border-[#9b2c2c] bg-[#fff7f4]"
          : "border-[#aab39a] bg-[#f0f3ea]"
      }`}
      onChange={(event) => onChange(fieldId, event.target.value)}
      placeholder={fieldLookup.get(fieldId)?.placeholder ?? placeholder}
      value={String(values[fieldId] ?? "")}
    />
  );
}

function InlineSelectField({
  errors,
  fieldId,
  fieldLookup,
  onChange,
  values,
  widthClass,
}: {
  errors: Record<string, string>;
  fieldId: string;
  fieldLookup: Map<string, DocumentField>;
  onChange: (id: string, value: string | boolean) => void;
  values: DocumentValues;
  widthClass: string;
}) {
  const field = fieldLookup.get(fieldId);
  const hasError = Boolean(errors[fieldId]);

  return (
    <select
      aria-invalid={hasError}
      className={`mx-0 my-1 inline-block h-9 w-full min-w-0 max-w-full rounded-[4px] border border-b-2 px-2 align-baseline text-[15px] leading-none outline-none transition focus:border-[#111111] focus:bg-white sm:mx-1 sm:my-0 sm:h-8 sm:w-auto ${
        hasError
          ? "border-[#9b2c2c] bg-[#fff7f4]"
          : "border-[#aab39a] bg-[#f0f3ea]"
      } ${responsiveInlineWidth(widthClass)}`}
      onChange={(event) => onChange(fieldId, event.target.value)}
      value={String(values[fieldId] ?? "")}
    >
      {field?.options?.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function powerOfAttorneyDecisionValue(value: string | boolean | undefined) {
  return typeof value === "boolean" ? value : "";
}

function powerOfAttorneyPowerDecisionValue(value: string | boolean | undefined) {
  if (value === true || value === "yes" || value === "allowed") {
    return "allowed";
  }

  if (value === "denied") {
    return "denied";
  }

  if (value === "omit" || value === false) {
    return "omit";
  }

  return "";
}

function powerOfAttorneyTargetPlaceholder(targetType: string) {
  if (targetType === "post") {
    return "адрес отделения";
  }

  if (targetType === "government") {
    return "укажите наименование органа";
  }

  return "куда нужна доверенность";
}

function ReceiptAmountWithWordsInline({
  errors,
  fieldLookup,
  numberFieldId,
  numberPlaceholder,
  numberWidthClass,
  onChange,
  values,
  wordsFieldId,
  wordsPlaceholder,
  wordsWidthClass,
}: {
  errors: Record<string, string>;
  fieldLookup: Map<string, DocumentField>;
  numberFieldId: string;
  numberPlaceholder: string;
  numberWidthClass: string;
  onChange: (id: string, value: string | boolean) => void;
  values: DocumentValues;
  wordsFieldId: string;
  wordsPlaceholder: string;
  wordsWidthClass: string;
}) {
  return (
    <>
      <span className="sm:whitespace-nowrap">
        <ReceiptInlineField
          errors={errors}
          fieldId={numberFieldId}
          fieldLookup={fieldLookup}
          onChange={onChange}
          placeholder={numberPlaceholder}
          values={values}
          widthClass={numberWidthClass}
        />{" "}
        (
      </span>
      <ReceiptInlineField
        errors={errors}
        fieldId={wordsFieldId}
        fieldLookup={fieldLookup}
        onChange={onChange}
        placeholder={wordsPlaceholder}
        values={values}
        widthClass={wordsWidthClass}
      />
      <span className="sm:whitespace-nowrap">)</span>
    </>
  );
}

function ReceiptChoiceGroup({
  className = "",
  label,
  onChange,
  options,
  value,
}: {
  className?: string;
  label: string;
  onChange: (value: string | boolean) => void;
  options: Array<{ label: string; value: string | boolean }>;
  value: string | boolean;
}) {
  return (
    <div
      className={`rounded-sm border border-[#d6d2ca] bg-[#fbfaf7] px-4 py-4 shadow-[inset_0_1px_0_rgba(17,17,17,0.035)] ${className}`}
    >
      <p className="sans text-center text-xs font-bold uppercase tracking-[0.12em] text-[#5f5f59]">
        {label}
      </p>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {options.map((option) => {
          const selected = value === option.value;

          return (
            <button
              aria-pressed={selected}
              className={`sans w-full rounded-full border px-4 py-2 text-sm font-bold transition sm:w-auto ${
                selected
                  ? "border-[#111111] bg-[#111111] text-white"
                  : "border-[#c6c1b8] bg-white text-[#2f2f2c] hover:border-[#111111]"
              }`}
              key={String(option.value)}
              onClick={() => onChange(option.value)}
              type="button"
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ReceiptInlineActions({
  document,
  missingItems,
  onDownload,
  onPayment,
  status,
}: {
  document: DocumentTemplate;
  missingItems: string[];
  onDownload: () => void;
  onPayment: () => void;
  status: string;
}) {
  return (
    <div className="border-t border-[#d9d9d4] bg-white p-6 md:p-8">
      {missingItems.length > 0 ? (
        <div className="mb-5 rounded-md border border-[#d8b7b0] bg-[#fff7f4] p-4">
          <p className="sans text-sm font-bold uppercase tracking-[0.12em] text-[#7a1f1f]">
            Заполните обязательные поля
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 text-[#5f3b35] md:grid-cols-2">
            {missingItems.map((item) => (
              <li className="flex gap-2" key={item}>
                <Circle className="mt-1 shrink-0" size={14} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-[1fr_320px] lg:items-center">
        <div>
          <p className="sans text-sm font-bold uppercase tracking-[0.14em] text-[#70706b]">
            Финальная проверка
          </p>
          <h3 className="mt-2 text-3xl font-semibold">
            Скачайте PDF после заполнения
          </h3>
          <p className="mt-3 leading-7 text-[#4a4a47]">
            Сначала можно скачать PDF с водяным знаком для проверки. После
            оплаты станет доступен чистый PDF без водяного знака.
          </p>
        </div>

        <div className="grid gap-3">
          <button className="button-secondary w-full" onClick={onDownload} type="button">
            <Download size={18} /> PDF с водяным знаком
          </button>
          <button className="button-primary w-full" onClick={onPayment} type="button">
            <WalletCards size={18} /> Скачать чистый PDF за {document.price} ₽
          </button>
        </div>
      </div>
      {status ? <p className="sans mt-5 text-sm font-bold">{status}</p> : null}
    </div>
  );
}

function ConstructorActions({
  document,
  missingItems,
  onDownload,
  onPayment,
  status,
}: {
  document: DocumentTemplate;
  missingItems: string[];
  onDownload: () => void;
  onPayment: () => void;
  status: string;
}) {
  const ready = missingItems.length === 0;

  return (
    <div className="bg-[#f8f8f5] p-6 md:p-8">
      <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
        <div>
          <p className="sans text-sm font-bold uppercase tracking-[0.14em] text-[#70706b]">
            Финальная проверка
          </p>
          <h3 className="mt-2 text-3xl font-semibold">
            {ready ? "Документ можно скачивать" : "Осталось заполнить поля"}
          </h3>
          {ready ? (
            <p className="mt-3 leading-7 text-[#4a4a47]">
              Бесплатный PDF будет с водяным знаком. Чистый PDF без водяного
              знака доступен после оплаты и подтверждения платежа на backend.
            </p>
          ) : (
            <ul className="mt-4 grid gap-2">
              {missingItems.map((item) => (
                <li
                  className="sans flex items-center gap-2 text-sm font-bold text-[#5c5c57]"
                  key={item}
                >
                  <Circle size={14} /> {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="panel bg-white p-5">
          <p className="sans text-sm font-bold uppercase text-[#70706b]">
            Чистый PDF
          </p>
          <p className="mt-3 text-4xl font-semibold">{document.price} ₽</p>
          <div className="mt-5 grid gap-3">
            <button className="button-secondary w-full" onClick={onDownload} type="button">
              <Download size={18} /> PDF с водяным знаком
            </button>
            <button className="button-primary w-full" onClick={onPayment} type="button">
              <WalletCards size={18} /> Оплатить чистый PDF
            </button>
          </div>
        </div>
      </div>
      {status ? <p className="sans mt-5 text-sm font-bold">{status}</p> : null}
    </div>
  );
}

function LegacyFieldBody({
  errors,
  field,
  onChange,
  values,
}: {
  errors: Record<string, string>;
  field?: DocumentField;
  onChange: (id: string, value: string | boolean) => void;
  values: DocumentValues;
}) {
  if (!field) {
    return null;
  }

  return (
    <div className="mt-10">
      <label className="field-label" htmlFor={field.id}>
        {field.label}
      </label>
      {renderField(field, values, onChange)}
      {field.helpText ? (
        <p className="sans mt-2 text-sm text-[#6d6d68]">{field.helpText}</p>
      ) : null}
      {errors[field.id] ? <ErrorLine message={errors[field.id]} /> : null}
    </div>
  );
}

function renderField(
  field: DocumentField,
  values: DocumentValues,
  onChange: (id: string, value: string | boolean) => void,
) {
  if (field.type === "textarea" || field.type === "passport" || field.type === "address") {
    return (
      <textarea
        className="field-control min-h-32"
        id={field.id}
        onChange={(event) => onChange(field.id, event.target.value)}
        placeholder={field.placeholder}
        value={String(values[field.id] ?? "")}
      />
    );
  }

  if (field.type === "checkbox") {
    return (
      <label className="sans inline-flex items-center gap-3 rounded-full border border-[#cfcfca] bg-white px-4 py-3 text-sm font-bold">
        <input
          checked={values[field.id] === true}
          onChange={(event) => onChange(field.id, event.target.checked)}
          type="checkbox"
        />
        Да
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <select
        className="field-control"
        id={field.id}
        onChange={(event) => onChange(field.id, event.target.value)}
        value={String(values[field.id] ?? "")}
      >
        <option value="">Выберите вариант</option>
        {field.options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  const inputType =
    field.type === "date"
      ? "date"
      : field.type === "money" || field.type === "number"
        ? "number"
        : "text";

  return (
    <input
      className="field-control"
      id={field.id}
      onChange={(event) => onChange(field.id, event.target.value)}
      placeholder={field.placeholder}
      type={inputType}
      value={String(values[field.id] ?? "")}
    />
  );
}

function ErrorLine({ message }: { message: string }) {
  return (
    <p className="sans mt-3 flex items-center gap-2 text-sm font-bold text-[#7a1f1f]">
      <AlertCircle size={16} /> {message}
    </p>
  );
}

function isVisible(step: ConstructorStep, values: DocumentValues) {
  if (!step.visibleWhen) {
    return true;
  }

  return values[step.visibleWhen.fieldId] === step.visibleWhen.equals;
}

function arePreviousStepsComplete(
  steps: ConstructorStep[],
  statuses: Map<string, StepStatus>,
  index: number,
) {
  return steps
    .slice(0, index)
    .every((step) => statuses.get(step.id)?.complete === true);
}

function getConstructorStepStatus(
  step: ConstructorStep,
  values: DocumentValues,
  fieldLookup: Map<string, DocumentField>,
): StepStatus {
  if (step.type === "choice") {
    return hasInputValue(values[step.fieldId])
      ? { complete: true, missing: [] }
      : { complete: false, missing: [step.title] };
  }

  if (step.type === "fieldGroup") {
    const missing = step.fields
      .map((fieldId) => fieldLookup.get(fieldId))
      .filter((field): field is DocumentField => Boolean(field?.required))
      .filter((field) => !hasInputValue(values[field.id]))
      .map((field) => field.label);

    return { complete: missing.length === 0, missing };
  }

  return { complete: true, missing: [] };
}

function getScenarioMissingItems(
  steps: ConstructorStep[],
  statuses: Map<string, StepStatus>,
) {
  return steps.flatMap((step) => statuses.get(step.id)?.missing ?? []);
}

function buildInlineValidationErrors(
  slug: string,
  values: DocumentValues,
  fieldLookup: Map<string, DocumentField>,
) {
  if (slug === "raspiska-o-poluchenii-deneg") {
    return buildReceiptInlineValidationErrors(values, fieldLookup);
  }

  if (slug === "zayavlenie-o-vozbuzhdenii-ispolnitelnogo-proizvodstva") {
    return buildEnforcementInlineValidationErrors(values, fieldLookup);
  }

  if (slug === "zayavlenie-o-hode-ispolnitelnogo-proizvodstva") {
    return buildEnforcementProgressInfoInlineValidationErrors(values, fieldLookup);
  }

  if (slug === "zayavlenie-v-bank-o-vzyskanii-po-ispolnitelnomu-dokumentu") {
    return buildBankEnforcementInlineValidationErrors(values, fieldLookup);
  }

  if (slug === "nenotarialnaya-doverennost") {
    return buildPowerOfAttorneyInlineValidationErrors(values, fieldLookup);
  }

  return {};
}

function buildReceiptInlineValidationErrors(
  values: DocumentValues,
  fieldLookup: Map<string, DocumentField>,
) {
  const requiredFields = [
    "city",
    "documentDate",
    "receiverFullName",
    "receiverPassportSeries",
    "receiverPassportNumber",
    "receiverPassportIssuedBy",
    "receiverAddress",
  ];

  requiredFields.push(
    "giverFullName",
    "giverPassportSeries",
    "giverPassportNumber",
    "giverPassportIssuedBy",
    "giverAddress",
    "amountNumber",
    "amountWords",
    "returnDate",
  );
  const loanDocumentType = String(values.loanDocumentType ?? "withContract");
  const hasContract = loanDocumentType !== "withoutContract";
  const hasInterest = values.hasInterest === true;
  const hasPenalty = values.hasPenalty === true;
  const paymentForm = String(values.paymentForm ?? "cash");
  const witnessesMode = String(values.witnessesMode ?? "notProvided");
  const signingPlaceMode = String(values.signingPlaceMode ?? "no");
  const signingTimeMode = String(values.signingTimeMode ?? "no");
  const transferredDocumentType = String(values.transferredDocumentType ?? "none");
  const identityConfirmationType = String(
    values.identityConfirmationType ?? "passport",
  );

  if (hasContract) {
    requiredFields.push("contractDate");
  }

  if (hasInterest) {
    requiredFields.push(
      "interestAmountNumber",
      "interestAmountWords",
      "totalReturnAmountNumber",
      "totalReturnAmountWords",
    );
  }

  if (hasPenalty) {
    requiredFields.push("penaltyRate", "penaltyRateWords");
  }

  if (paymentForm === "bankTransfer") {
    requiredFields.push("bankTransferAccount");
  }

  if (witnessesMode === "present") {
    requiredFields.push("witnessesDetails");
  }

  if (signingPlaceMode === "yes") {
    requiredFields.push("signingPlaceAddress");
  }

  if (signingTimeMode === "yes") {
    requiredFields.push("signingTime");
  }

  if (transferredDocumentType !== "none") {
    requiredFields.push("transferredDocumentDetails");
  }

  if (identityConfirmationType === "driverLicense") {
    requiredFields.push("identityDocumentDetails");
  }

  return requiredFields.reduce<Record<string, string>>((nextErrors, fieldId) => {
    const field = fieldLookup.get(fieldId);

    if (field) {
      validateField(field, values, nextErrors);
    }

    return nextErrors;
  }, {});
}

function buildPowerOfAttorneyInlineValidationErrors(
  values: DocumentValues,
  fieldLookup: Map<string, DocumentField>,
) {
  const requiredFields = [
    "targetType",
    "targetName",
    "city",
    "documentDate",
    "validForNumber",
    "validForWords",
    "validForUnit",
    "validUntil",
    "validUntilInclusive",
    "principalStatus",
    "representativeFullName",
    "representativeBirthDate",
    "representativePassportSeries",
    "representativePassportNumber",
    "representativePassportIssuedBy",
    "representativePassportIssuedDate",
    "representativeAddress",
    "representativeNamingGender",
    "hasDelegationRight",
    "includeRepresentativeSignature",
    ...POWER_OF_ATTORNEY_PRESET_POWERS.map((power) => power.id),
    "includeOtherActions",
  ];
  const principalStatus = String(values.principalStatus ?? "person");
  const targetType = String(values.targetType ?? "");

  if (targetType === "post") {
    requiredFields.push("postOfficeDepartment");
  }

  if (targetType === "government") {
    requiredFields.push("governmentDisputeSubject");
  }

  if (principalStatus === "organization") {
    requiredFields.push(
      "principalOrganizationName",
      "principalOrganizationOgrn",
      "principalOrganizationInn",
      "principalSignerPosition",
      "principalSignerFullName",
      "principalSignerBasis",
    );
  } else {
    requiredFields.push(
      "principalNamingGender",
      "principalFullName",
      "principalBirthDate",
      "principalPassportSeries",
      "principalPassportNumber",
      "principalPassportIssuedBy",
      "principalPassportIssuedDate",
      "principalAddress",
    );

    if (principalStatus === "ip") {
      requiredFields.push("principalOgrnip", "principalInn");
    }
  }

  if (values.includeOtherActions === true) {
    requiredFields.push("otherAction1", "addOtherAction2");

    for (let index = 2; index <= 5; index += 1) {
      if (values[`addOtherAction${index}`] === "yes") {
        requiredFields.push(`otherAction${index}`);

        if (index < 5) {
          requiredFields.push(`addOtherAction${index + 1}`);
        }
      } else {
        break;
      }
    }
  }

  return requiredFields.reduce<Record<string, string>>((nextErrors, fieldId) => {
    const field = fieldLookup.get(fieldId);

    if (field) {
      validateField(field, values, nextErrors);
    }

    return nextErrors;
  }, {});
}

function buildEnforcementInlineValidationErrors(
  values: DocumentValues,
  fieldLookup: Map<string, DocumentField>,
) {
  const requiredFields = [
    "ospName",
    "rospRegion",
    "ufsspRegion",
    "ospAddress",
    "claimantFullName",
    "claimantHeaderFullName",
    "claimantBirthDate",
    "claimantPassportSeries",
    "claimantPassportNumber",
    "claimantPassportIssuedBy",
    "claimantPassportIssuedDate",
    "claimantRegistrationAddress",
    "claimantPhone",
    "claimantEmail",
    "debtorFullName",
    "debtorBirthDate",
    "debtorPassportSeries",
    "debtorPassportNumber",
    "debtorPassportIssuedBy",
    "debtorPassportIssuedDate",
    "debtorRegistrationAddress",
    "debtorActualAddress",
    "debtorPhone",
    "debtorWorkplace",
    "claimAmountNumber",
    "claimAmountWords",
    "recipientName",
    "bankName",
    "bankBik",
    "bankRecipientAccount",
    "documentDate",
  ];
  const documentType = String(values.enforcementDocumentType ?? "writ");
  const hasDebtorPropertyDocuments = String(
    values.hasDebtorPropertyDocuments ?? "no",
  );

  if (documentType === "judicialOrder") {
    requiredFields.push(
      "judicialOrderNumber",
      "judicialOrderDate",
      "judicialOrderCourt",
    );
  } else if (documentType === "notaryAgreement") {
    requiredFields.push(
      "notaryAgreementNotary",
      "notaryAgreementDistrict",
      "notaryAgreementRegistryNumber",
    );
  } else if (documentType === "notaryWrit") {
    requiredFields.push(
      "notaryWritDate",
      "notaryWritNotary",
      "notaryWritRegistryNumber",
    );
  } else if (documentType === "laborCommissionCertificate") {
    requiredFields.push(
      "laborCertificateNumber",
      "laborCertificateDate",
      "laborCommissionName",
    );
  } else if (documentType === "administrativeRuling") {
    requiredFields.push(
      "administrativeRulingNumber",
      "administrativeRulingDate",
      "administrativeRulingIssuer",
    );
  } else if (documentType === "other") {
    requiredFields.push(
      "otherEnforcementDocumentName",
      "otherDocumentDate",
      "otherDocumentIssuer",
    );
  } else {
    requiredFields.push(
      "writSeries",
      "writNumber",
      "writIssuedDate",
      "courtName",
      "caseNumber",
    );
  }

  if (hasDebtorPropertyDocuments === "yes") {
    requiredFields.push("otherDocument1Description");

    for (let index = 2; index <= 5; index += 1) {
      if (values[`addOtherDocument${index}`] === "yes") {
        requiredFields.push(`otherDocument${index}Description`);
      } else {
        break;
      }
    }
  }

  return requiredFields.reduce<Record<string, string>>((nextErrors, fieldId) => {
    const field = fieldLookup.get(fieldId);

    if (field) {
      validateField(field, values, nextErrors);
    }

    return nextErrors;
  }, {});
}

function buildBankEnforcementInlineValidationErrors(
  values: DocumentValues,
  fieldLookup: Map<string, DocumentField>,
) {
  const requiredFields = [
    "documentDate",
    "targetBankName",
    "targetBankAddress",
    "claimantHeaderFullName",
    "claimantFullName",
    "claimantAddress",
    "claimantPhone",
    "claimantEmail",
    "debtorAddress",
    "claimAmountNumber",
    "claimAmountWords",
    "recipientName",
    "recipientBankName",
    "bankRecipientAccount",
    "bankBik",
    "enforcementDocumentPages",
  ];
  const documentType = String(values.enforcementDocumentType ?? "writ");

  if (documentType === "judicialOrder") {
    requiredFields.push(
      "judicialOrderNumber",
      "judicialOrderDate",
      "judicialOrderCourt",
    );
  } else if (documentType === "notaryAgreement") {
    requiredFields.push(
      "notaryAgreementNotary",
      "notaryAgreementDistrict",
      "notaryAgreementRegistryNumber",
    );
  } else if (documentType === "notaryWrit") {
    requiredFields.push(
      "notaryWritDate",
      "notaryWritNotary",
      "notaryWritRegistryNumber",
    );
  } else if (documentType === "laborCommissionCertificate") {
    requiredFields.push(
      "laborCertificateNumber",
      "laborCertificateDate",
      "laborCommissionName",
    );
  } else if (documentType === "administrativeRuling") {
    requiredFields.push(
      "administrativeRulingNumber",
      "administrativeRulingDate",
      "administrativeRulingIssuer",
    );
  } else if (documentType === "other") {
    requiredFields.push(
      "otherEnforcementDocumentName",
      "otherDocumentDate",
      "otherDocumentIssuer",
    );
  } else {
    requiredFields.push(
      "writSeries",
      "writNumber",
      "writIssuedDate",
      "courtName",
      "caseNumber",
    );
  }

  if (values.includeClaimantPassportCopy !== "no") {
    requiredFields.push("claimantPassportCopyPages");
  }

  if (values.includeRepresentativePower === "yes") {
    requiredFields.push("representativePowerPages");
  }

  if (values.includeOtherDocuments === "yes") {
    requiredFields.push("otherDocument1Description", "otherDocument1Pages");

    for (let index = 2; index <= 5; index += 1) {
      if (values[`addOtherDocument${index}`] !== "yes") {
        break;
      }

      requiredFields.push(
        `otherDocument${index}Description`,
        `otherDocument${index}Pages`,
      );
    }
  }

  const nextErrors = requiredFields.reduce<Record<string, string>>((acc, fieldId) => {
    const field = fieldLookup.get(fieldId);

    if (field) {
      validateField(field, values, acc);
    }

    return acc;
  }, {});

  if (!hasInputValue(values.debtorFullName) && !hasInputValue(values.debtorLegalName)) {
    const debtorField = fieldLookup.get("debtorFullName");

    if (debtorField) {
      validateField(debtorField, values, nextErrors);
    }
  }

  return nextErrors;
}

function buildEnforcementProgressInfoInlineValidationErrors(
  values: DocumentValues,
  fieldLookup: Map<string, DocumentField>,
) {
  const requiredFields = [
    "documentDate",
    "ospName",
    "ufsspRegion",
    "ospAddress",
    "claimantHeaderFullName",
    "claimantAddress",
    "enforcementProceedingNumber",
    "enforcementDocumentName",
    "writSeries",
    "writNumber",
    "writIssuedDate",
    "enforcementBasis",
    "caseNumber",
    "debtorFullName",
    "claimantFullName",
    "responseAddress",
    "claimantEmail",
    "claimantPhone",
  ];

  if (values.includeOtherDocuments === "yes") {
    requiredFields.push("otherDocument1Description", "otherDocument1Pages");

    for (let index = 2; index <= 5; index += 1) {
      if (values[`addOtherDocument${index}`] !== "yes") {
        break;
      }

      requiredFields.push(
        `otherDocument${index}Description`,
        `otherDocument${index}Pages`,
      );
    }
  }

  if (values.includeEnforcementDocumentCopy === "yes") {
    requiredFields.push(
      "enforcementDocumentCopyDescription",
      "enforcementDocumentCopyPages",
    );
  }

  if (values.includeClaimantStatusDocument === "yes") {
    requiredFields.push(
      "claimantStatusDocumentDescription",
      "claimantStatusDocumentPages",
    );
  }

  if (values.includeRepresentativePower === "yes") {
    requiredFields.push(
      "representativePowerDescription",
      "representativePowerPages",
    );
  }

  return requiredFields.reduce<Record<string, string>>((nextErrors, fieldId) => {
    const field = fieldLookup.get(fieldId);

    if (field) {
      validateField(field, values, nextErrors);
    }

    return nextErrors;
  }, {});
}

function validateChoiceStep(
  step: ConstructorChoiceStep,
  values: DocumentValues,
  errors: Record<string, string>,
) {
  if (step.required === false) {
    return;
  }

  if (!hasInputValue(values[step.fieldId])) {
    errors[step.fieldId] = "Выберите вариант, чтобы продолжить.";
  }
}

function validateFieldGroupStep(
  step: ConstructorFieldGroupStep,
  values: DocumentValues,
  fieldLookup: Map<string, DocumentField>,
  errors: Record<string, string>,
) {
  for (const fieldId of step.fields) {
    const field = fieldLookup.get(fieldId);

    if (field) {
      validateField(field, values, errors);
    }
  }
}

function validateField(
  field: DocumentField,
  values: DocumentValues,
  errors: Record<string, string>,
) {
  if (!field.required) {
    return;
  }

  if (!hasInputValue(values[field.id])) {
    errors[field.id] = "Поле обязательно.";
  }
}

function hasInputValue(value: string | boolean | undefined) {
  if (typeof value === "boolean") {
    return true;
  }

  return typeof value === "string" && value.trim().length > 0;
}




