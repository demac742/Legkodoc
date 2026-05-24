import type { DocumentTemplate, DocumentValues } from "./types";

export type DocumentRenderable = {
  headerLines: string[];
  title: string;
  bodyParagraphs: string[];
  footerLines: string[];
};

function value(values: DocumentValues, key: string, fallback = "____________") {
  const raw = values[key];
  return typeof raw === "string" && raw.trim() ? raw.trim() : fallback;
}

function applyDocumentTypography(text: string) {
  return text
    .replace(/(^|[\s,;:([{])((?:г|ул|д|кв)\.)\s+/giu, "$1$2\u00A0")
    .replace(
      /(\d{1,2})\s+(января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря)\s+(\d{4})\s+(года|г\.)/giu,
      "$1\u00A0$2\u00A0$3\u00A0$4",
    )
    .replace(
      /(«\d{1,2}»)\s+(января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря)\s+(\d{4})\s+(года|г\.)/giu,
      "$1\u00A0$2\u00A0$3\u00A0$4",
    )
    .replace(/\b(серия|серии)\s+([^\s,;.]+)\s+№\s+([^\s,;.]+)/giu, "$1\u00A0$2\u00A0№\u00A0$3")
    .replace(/№\s+/g, "№\u00A0");
}

const russianMonthGenitive = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

function formatQuotedDate(date: string) {
  if (!date) {
    return "«___» __________ 20___ г.";
  }

  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  const day = new Intl.DateTimeFormat("ru-RU", { day: "2-digit" }).format(parsed);
  const month = russianMonthGenitive[parsed.getMonth()];
  const year = new Intl.DateTimeFormat("ru-RU", { year: "numeric" }).format(parsed);

  return `«${day}»\u00A0${month}\u00A0${year}\u00A0г.`;
}

function formatSignatureDate(date: string) {
  return formatQuotedDate(date);
}

function passportData(values: DocumentValues, prefix: "receiver" | "giver") {
  return `паспорт гражданина РФ: серия ${value(values, `${prefix}PassportSeries`)} № ${value(values, `${prefix}PassportNumber`)}, выдан ${value(values, `${prefix}PassportIssuedBy`)}`;
}

function passportShortData(values: DocumentValues, prefix: "receiver" | "giver") {
  return `серия ${value(values, `${prefix}PassportSeries`)} № ${value(values, `${prefix}PassportNumber`)} выдан ${value(values, `${prefix}PassportIssuedBy`)}`;
}

function buildReceiptRenderable(values: DocumentValues): DocumentRenderable {
  const hasContract = values.loanDocumentType !== "withoutContract";
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
  const amountNumber = value(values, "amountNumber");
  const amountWords = value(values, "amountWords");
  const returnDate = value(values, "returnDate", "");
  const contractBasis = hasContract
    ? ` по договору займа от ${formatQuotedDate(value(values, "contractDate", ""))}`
    : "";

  const returnParagraph = hasInterest
    ? `Обязуюсь вернуть займодавцу сумму займа и проценты за пользование займом в общей сумме ${value(values, "totalReturnAmountNumber")} (${value(values, "totalReturnAmountWords")}) рублей, из которых ${amountNumber} (${amountWords}) рублей составляет сумма основного долга, ${value(values, "interestAmountNumber")} (${value(values, "interestAmountWords")}) рублей составляют проценты за пользование суммой займа, в срок не позднее ${formatQuotedDate(returnDate)}.`
    : `Обязуюсь вернуть займодавцу сумму займа в размере ${amountNumber} (${amountWords}) рублей в срок не позднее ${formatQuotedDate(returnDate)}.`;

  const penaltyParagraph = hasInterest
    ? `В случае нарушения срока возврата суммы займа и процентов за пользование суммой займа обязуюсь дополнительно выплатить займодавцу неустойку в размере ${value(values, "penaltyRate")}% (${value(values, "penaltyRateWords")}) процента от не уплаченной в срок суммы за каждый день просрочки.`
    : `В случае нарушения срока возврата суммы займа обязуюсь дополнительно выплатить займодавцу неустойку в размере ${value(values, "penaltyRate")}% (${value(values, "penaltyRateWords")}) процента от не уплаченной в срок суммы за каждый день просрочки.`;
  const witnessParagraph =
    witnessesMode === "present"
      ? `При составлении расписки присутствовали следующие свидетели: ${value(values, "witnessesDetails")}.`
      : witnessesMode === "absent"
        ? "При составлении расписки свидетели не присутствовали."
        : "";
  const placeParagraph =
    signingPlaceMode === "yes"
      ? `Расписка подписана мной при нахождении по следующему адресу: ${value(values, "signingPlaceAddress")}.`
      : signingPlaceMode === "blank"
        ? "Расписка подписана мной при нахождении по следующему адресу: ______________________________."
        : "";
  const timeParagraph =
    signingTimeMode === "yes"
      ? `Расписка подписана мной в ${value(values, "signingTime")} по московскому времени.`
      : signingTimeMode === "blank"
        ? "Расписка подписана мной в __________ по московскому времени."
        : "";
  const transferredDocumentName =
    transferredDocumentType === "contract"
      ? "договор займа"
      : transferredDocumentType === "act"
        ? "акт приема-передачи"
        : "иной документ";
  const transferredDocumentParagraph =
    transferredDocumentType !== "none"
      ? `При подписании настоящей расписки мной получен ${transferredDocumentName}: ${value(values, "transferredDocumentDetails")}.`
      : "";
  const paymentFormParagraph =
    paymentForm === "cash"
      ? "Денежные средства переданы мне наличными."
      : paymentForm === "bankTransfer"
        ? `Денежные средства переданы мне безналичным переводом на банковскую карту № ${value(values, "bankTransferAccount")}.`
        : "";
  const identityParagraph =
    identityConfirmationType === "passport"
      ? `Личность составителя расписки подтверждена паспортом: ${passportShortData(values, "receiver")}.`
      : identityConfirmationType === "driverLicense"
        ? `Личность составителя расписки подтверждена водительским удостоверением: ${value(values, "identityDocumentDetails")}.`
        : "";

  return {
    headerLines: [
      `г. ${value(values, "city")}`,
      formatSignatureDate(value(values, "documentDate", "")),
    ].map(applyDocumentTypography),
    title: "РАСПИСКА",
    bodyParagraphs: [
      `Я, ${value(values, "receiverFullName")}, ${passportData(values, "receiver")}, адрес регистрации: ${value(values, "receiverAddress")}, получил от ${value(values, "giverFullName")}, ${passportData(values, "giver")}, адрес регистрации: ${value(values, "giverAddress")}, денежные средства в качестве займа в размере ${amountNumber} (${amountWords}) рублей${contractBasis}.`,
      returnParagraph,
      ...(hasPenalty ? [penaltyParagraph] : []),
      ...[
        paymentFormParagraph,
        witnessParagraph,
        placeParagraph,
        timeParagraph,
        transferredDocumentParagraph,
        identityParagraph,
      ].filter(Boolean),
    ].map(applyDocumentTypography),
    footerLines: [
      value(values, "receiverFullName"),
      "Подпись: ____________________",
    ].map(applyDocumentTypography),
  };
}

function optionalValue(values: DocumentValues, key: string, fallback = "____________") {
  const raw = values[key];
  return typeof raw === "string" && raw.trim() ? raw.trim() : fallback;
}

function maybeValue(values: DocumentValues, key: string) {
  const raw = values[key];
  return typeof raw === "string" && raw.trim() ? raw.trim() : "";
}

function joinSentenceParts(parts: Array<string | undefined | null>) {
  return parts.filter((part) => typeof part === "string" && part.trim()).join(", ");
}

function toGenitiveWord(word: string, index: number, totalWords: number) {
  const cleanWord = word.trim();

  if (!cleanWord) {
    return cleanWord;
  }

  const lowerWord = cleanWord.toLowerCase();
  const isLastWord = index === totalWords - 1;

  if (lowerWord.endsWith("оглы") || lowerWord.endsWith("кызы")) {
    return cleanWord;
  }

  if (isLastWord) {
    if (lowerWord.endsWith("вна")) {
      return `${cleanWord.slice(0, -1)}ы`;
    }

    if (lowerWord.endsWith("ична")) {
      return `${cleanWord.slice(0, -1)}ы`;
    }

    if (lowerWord.endsWith("ич")) {
      return `${cleanWord}а`;
    }

    if (lowerWord.endsWith("на")) {
      return `${cleanWord.slice(0, -1)}ы`;
    }
  }

  if (lowerWord.endsWith("ова") || lowerWord.endsWith("ева")) {
    return `${cleanWord.slice(0, -1)}й`;
  }

  if (lowerWord.endsWith("ина") || lowerWord.endsWith("ына")) {
    return `${cleanWord.slice(0, -1)}й`;
  }

  if (lowerWord.endsWith("ая")) {
    return `${cleanWord.slice(0, -2)}ой`;
  }

  if (lowerWord.endsWith("яя")) {
    return `${cleanWord.slice(0, -2)}ей`;
  }

  if (lowerWord.endsWith("ий") || lowerWord.endsWith("ый") || lowerWord.endsWith("ой")) {
    return `${cleanWord.slice(0, -2)}ого`;
  }

  if (lowerWord.endsWith("а")) {
    const previousChar = lowerWord.slice(-2, -1);
    const ending = ["г", "к", "х", "ж", "ч", "ш", "щ", "ц"].includes(previousChar)
      ? "и"
      : "ы";
    return `${cleanWord.slice(0, -1)}${ending}`;
  }

  if (lowerWord.endsWith("я")) {
    return `${cleanWord.slice(0, -1)}и`;
  }

  if (lowerWord.endsWith("ь") || lowerWord.endsWith("й")) {
    return `${cleanWord.slice(0, -1)}я`;
  }

  return `${cleanWord}а`;
}

export function toGenitiveFullName(fullName: string) {
  if (!fullName.trim()) {
    return fullName;
  }

  const words = fullName.trim().split(/\s+/);

  if (words.length < 2 || words.length > 3) {
    return fullName;
  }

  return words
    .map((word, index) => toGenitiveWord(word, index, words.length))
    .join(" ");
}

function enforcementDocumentType(values: DocumentValues) {
  return String(values.enforcementDocumentType ?? "writ");
}

function writSeriesAndNumber(values: DocumentValues) {
  return `серии\u00A0${value(values, "writSeries")}\u00A0№\u00A0${value(values, "writNumber")}`;
}

export function enforcementDocumentDisplayName(values: DocumentValues) {
  const type = enforcementDocumentType(values);

  if (type === "judicialOrder") {
    return "Судебный приказ";
  }

  if (type === "notaryAgreement") {
    return "Нотариальное соглашение об алиментах";
  }

  if (type === "notaryWrit") {
    return "Исполнительная надпись нотариуса";
  }

  if (type === "laborCommissionCertificate") {
    return "Удостоверение комиссии по трудовым спорам";
  }

  if (type === "administrativeRuling") {
    return "Постановление по делу об административном правонарушении";
  }

  if (type === "other") {
    return optionalValue(values, "otherEnforcementDocumentName", "")
      || "Иной исполнительный документ";
  }

  return "Исполнительный лист";
}

function enforcementDocumentTitleDative(values: DocumentValues) {
  const type = enforcementDocumentType(values);

  if (type === "judicialOrder") {
    return "судебному приказу";
  }

  if (type === "notaryAgreement") {
    return "нотариальному соглашению об алиментах";
  }

  if (type === "notaryWrit") {
    return "исполнительной надписи нотариуса";
  }

  if (type === "laborCommissionCertificate") {
    return "удостоверению комиссии по трудовым спорам";
  }

  if (type === "administrativeRuling") {
    return "постановлению по делу об административном правонарушении";
  }

  if (type === "other") {
    return "исполнительному документу";
  }

  return "исполнительному листу";
}

function enforcementDocumentDescription(values: DocumentValues) {
  const type = enforcementDocumentType(values);

  if (type === "judicialOrder") {
    return `судебный приказ № ${value(values, "judicialOrderNumber")}, от ${formatQuotedDate(value(values, "judicialOrderDate", ""))}, вынесенный ${value(values, "judicialOrderCourt")}`;
  }

  if (type === "notaryAgreement") {
    return `нотариальное соглашение об алиментах, удостоверенное нотариусом ${value(values, "notaryAgreementNotary")}, нотариального округа ${value(values, "notaryAgreementDistrict")}, зарегистрированное в реестре за № ${value(values, "notaryAgreementRegistryNumber")}`;
  }

  if (type === "notaryWrit") {
    return `исполнительная надпись нотариуса от ${formatQuotedDate(value(values, "notaryWritDate", ""))}, совершенная нотариусом ${value(values, "notaryWritNotary")}, реестровый № ${value(values, "notaryWritRegistryNumber")}`;
  }

  if (type === "laborCommissionCertificate") {
    return `удостоверение комиссии по трудовым спорам № ${value(values, "laborCertificateNumber")}, выданное ${formatQuotedDate(value(values, "laborCertificateDate", ""))}, ${value(values, "laborCommissionName")}`;
  }

  if (type === "administrativeRuling") {
    return `постановление по делу об административном правонарушении № ${value(values, "administrativeRulingNumber")}, от ${formatQuotedDate(value(values, "administrativeRulingDate", ""))}, вынесенное ${value(values, "administrativeRulingIssuer")}`;
  }

  if (type === "other") {
    const number = optionalValue(values, "otherDocumentNumber", "");
    const numberPart = number ? `, № ${number}` : "";

    return `${value(values, "otherEnforcementDocumentName")}, от ${formatQuotedDate(value(values, "otherDocumentDate", ""))}${numberPart}, выданный ${value(values, "otherDocumentIssuer")}`;
  }

  return `исполнительный лист ${writSeriesAndNumber(values)}, выданный ${formatQuotedDate(value(values, "writIssuedDate", ""))} ${value(values, "courtName")} по делу № ${value(values, "caseNumber")}`;
}

export function courtAttachmentText(type: string) {
  if (type === "judicialOrder") {
    return "Копия судебного приказа";
  }

  if (type === "courtDecision") {
    return "Копия решения суда";
  }

  return "Копия судебного акта";
}

function applicationLine(index: number, text: string, pages?: string) {
  const cleanPages = pages?.trim();

  return cleanPages
    ? `${index}. ${text} - на ${cleanPages} листах.`
    : `${index}. ${text}.`;
}

function buildEnforcementApplications(values: DocumentValues) {
  const lines = [
    applicationLine(
      1,
      `${enforcementDocumentDisplayName(values)} - оригинал`,
      optionalValue(values, "enforcementDocumentPages", ""),
    ),
  ];
  const courtAttachmentType = String(values.courtAttachmentType ?? "none");

  if (courtAttachmentType !== "none") {
    lines.push(
      applicationLine(
        lines.length + 1,
        courtAttachmentText(courtAttachmentType),
        optionalValue(values, "courtAttachmentPages", ""),
      ),
    );
  }

  if (values.hasDebtorPropertyDocuments === "yes") {
    for (let index = 1; index <= 5; index += 1) {
      if (index > 1 && values[`addOtherDocument${index}`] !== "yes") {
        break;
      }

      lines.push(
        applicationLine(
          lines.length + 1,
          `Иные документы, подтверждающие сведения о должнике и его имуществе: ${value(values, `otherDocument${index}Description`)}`,
          optionalValue(values, `otherDocument${index}Pages`, ""),
        ),
      );
    }
  }

  return lines;
}

function buildEnforcementRenderable(values: DocumentValues): DocumentRenderable {
  const claimantDetails = joinSentenceParts([
    value(values, "claimantFullName"),
    `дата рождения: ${formatQuotedDate(value(values, "claimantBirthDate", ""))}`,
    `паспорт гражданина РФ: серия ${value(values, "claimantPassportSeries")} № ${value(values, "claimantPassportNumber")}`,
    `выдан ${value(values, "claimantPassportIssuedBy")} ${formatQuotedDate(value(values, "claimantPassportIssuedDate", ""))}`,
    `адрес регистрации: ${value(values, "claimantRegistrationAddress")}`,
    maybeValue(values, "claimantActualAddress")
      ? `адрес фактического проживания: ${value(values, "claimantActualAddress")}`
      : "",
    `телефон: ${value(values, "claimantPhone")}`,
    `e-mail: ${value(values, "claimantEmail")}`,
  ]);
  const debtorDetails = joinSentenceParts([
    value(values, "debtorFullName"),
    `дата рождения: ${formatQuotedDate(value(values, "debtorBirthDate", ""))}`,
    `паспорт гражданина РФ: серия ${value(values, "debtorPassportSeries")} № ${value(values, "debtorPassportNumber")}`,
    `выдан ${value(values, "debtorPassportIssuedBy")} ${formatQuotedDate(value(values, "debtorPassportIssuedDate", ""))}`,
    `адрес регистрации: ${value(values, "debtorRegistrationAddress")}`,
    maybeValue(values, "debtorActualAddress")
      ? `адрес фактического проживания, если известно: ${value(values, "debtorActualAddress")}`
      : "",
    maybeValue(values, "debtorPhone")
      ? `телефон: ${value(values, "debtorPhone")}`
      : "",
    maybeValue(values, "debtorWorkplace")
      ? `место работы/источник дохода, если известно: ${value(values, "debtorWorkplace")}`
      : "",
  ]);
  const claimBreakdown = joinSentenceParts([
    maybeValue(values, "principalDebtAmount")
      ? `основной долг - ${value(values, "principalDebtAmount")} рублей`
      : "",
    maybeValue(values, "penaltyAmount")
      ? `проценты/неустойка - ${value(values, "penaltyAmount")} рублей`
      : "",
    maybeValue(values, "stateDutyAmount")
      ? `расходы по оплате государственной пошлины - ${value(values, "stateDutyAmount")} рублей`
      : "",
    maybeValue(values, "otherAwardedAmount")
      ? `иные взысканные суммы - ${value(values, "otherAwardedAmount")} рублей`
      : "",
  ]);
  const bodyParagraphs = [
    `В соответствии с ч. 1 ст. 30 Федерального закона от 02.10.2007 № 229-ФЗ «Об исполнительном производстве» прошу принять к исполнению исполнительный документ: ${enforcementDocumentDescription(values)}, и возбудить по нему исполнительное производство.`,
    "Сведения о требовании:",
    `Взыскать с ${value(values, "debtorFullName")}, именуемого(ой) далее «Должник», в пользу ${value(values, "claimantFullName")}, именуемого(ой) далее «Взыскатель», денежные средства в размере ${value(values, "claimAmountNumber")} (${value(values, "claimAmountWords")}) рублей${claimBreakdown ? `, в том числе: ${claimBreakdown}` : ""}.`,
    "Сведения о взыскателе:",
    `${claimantDetails}.`,
    "Банковские реквизиты взыскателя для перечисления денежных средств, взысканных с должника:",
    `Получатель: ${value(values, "recipientName")}.`,
    `Банк получателя: ${value(values, "bankName")}.`,
    `Счёт получателя: ${value(values, "bankRecipientAccount")}.`,
    `БИК: ${value(values, "bankBik")}.`,
    "Сведения о должнике:",
    `${debtorDetails}.`,
    "В соответствии с ч. 2 ст. 30 Федерального закона от 02.10.2007 № 229-ФЗ «Об исполнительном производстве» для обеспечения исполнения требований исполнительного документа также прошу:",
    "1. Наложить запрет на совершение регистрирующим органом (Росреестр) регистрационных действий в отношении жилой и нежилой недвижимости, находящейся в собственности должника.",
    "2. Установить должнику временное ограничение на выезд из Российской Федерации при наличии предусмотренных законом оснований.",
    "3. В целях получения сведений об имуществе и доходах должника направить запросы в органы ГИБДД (о наличии транспортных средств), Социальный фонд России (о месте работы и доходах), Росреестр (о наличии недвижимого имущества), банки и иные кредитные организации (о наличии счетов и денежных средств).",
    "4. В случае получения сведений о наличии у должника транспортных средств, недвижимого имущества, денежных средств на счетах, вкладах и иных имущественных прав наложить арест на имущество должника, в том числе на денежные средства, находящиеся на счетах в банках и иных кредитных организациях.",
    "Приложения:",
    ...buildEnforcementApplications(values),
  ].map(applyDocumentTypography);

  return {
    headerLines: [
      formatQuotedDate(value(values, "documentDate", "")),
      `Начальнику ${value(values, "ospName")} РОСП ${value(values, "rospRegion")}`,
      `УФССП России по ${value(values, "ufsspRegion")}`,
      `Адрес: ${value(values, "ospAddress")}`,
      `от взыскателя: ${value(values, "claimantHeaderFullName")}`,
      `адрес: ${value(values, "claimantRegistrationAddress")}`,
      `тел.: ${value(values, "claimantPhone")}`,
      `e-mail: ${value(values, "claimantEmail")}`,
    ].map(applyDocumentTypography),
    title: "ЗАЯВЛЕНИЕ\nо возбуждении исполнительного производства",
    bodyParagraphs,
    footerLines: [
      `Взыскатель: ______________________ /${value(values, "claimantFullName")}/`,
      `Тел.: ${value(values, "claimantPhone")}`,
    ].map(applyDocumentTypography),
  };
}

function buildEnforcementProgressInfoRenderable(
  values: DocumentValues,
): DocumentRenderable {
  const applicationDescriptions: string[] = [];

  if (values.includeEnforcementDocumentCopy === "yes") {
    applicationDescriptions.push(
      `${value(values, "enforcementDocumentCopyDescription")} - на ${value(values, "enforcementDocumentCopyPages")} листах.`,
    );
  }

  if (values.includeClaimantStatusDocument === "yes") {
    applicationDescriptions.push(
      `${value(values, "claimantStatusDocumentDescription")} - на ${value(values, "claimantStatusDocumentPages")} листах.`,
    );
  }

  if (values.includeRepresentativePower === "yes") {
    applicationDescriptions.push(
      `${value(values, "representativePowerDescription")} - на ${value(values, "representativePowerPages")} листах.`,
    );
  }

  if (values.includeOtherDocuments === "yes") {
    for (let index = 1; index <= 5; index += 1) {
      if (index > 1 && values[`addOtherDocument${index}`] !== "yes") {
        break;
      }

      applicationDescriptions.push(
        `${value(values, `otherDocument${index}Description`)} - на ${value(values, `otherDocument${index}Pages`)} листах.`,
      );
    }
  }

  const applicationLines = applicationDescriptions.map(
    (line, index) => `${index + 1}. ${line}`,
  );

  return {
    headerLines: [
      formatQuotedDate(value(values, "documentDate", "")),
      `Начальнику ${value(values, "ospName")} РОСП`,
      value(values, "ufsspRegion"),
      `Адрес: ${value(values, "ospAddress")}`,
      `от взыскателя: ${value(values, "claimantHeaderFullName")}`,
      `Адрес: ${value(values, "claimantAddress")}`,
      `тел.: ${value(values, "claimantPhone")}`,
      `e-mail: ${value(values, "claimantEmail")}`,
    ].map(applyDocumentTypography),
    title:
      "ЗАЯВЛЕНИЕ\nо предоставлении информации о ходе исполнительного производства",
    bodyParagraphs: [
      `В производстве ${value(values, "ospName")} РОСП ${value(values, "ufsspRegion")} находится исполнительное производство № ${value(values, "enforcementProceedingNumber")}, возбужденное на основании исполнительного документа: ${value(values, "enforcementDocumentName")} серии ${value(values, "writSeries")} № ${value(values, "writNumber")}, выданного ${formatQuotedDate(value(values, "writIssuedDate", ""))} на основании ${value(values, "enforcementBasis")} по делу № ${value(values, "caseNumber")}, о взыскании с должника ${value(values, "debtorFullName")} в пользу взыскателя ${value(values, "claimantFullName")}.`,
      "До настоящего времени взыскатель не располагает полной информацией о ходе исполнительного производства, совершённых исполнительных действиях, принятых мерах принудительного исполнения, поступивших денежных средствах и причинах отсутствия фактического исполнения.",
      "На основании статьи 50 Федерального закона от 02.10.2007 № 229-ФЗ «Об исполнительном производстве» сторона исполнительного производства вправе знакомиться с материалами исполнительного производства, делать выписки, снимать копии, заявлять ходатайства и получать сведения, необходимые для защиты своих прав.",
      "Прошу предоставить информацию:",
      `1. О текущем состоянии исполнительного производства № ${value(values, "enforcementProceedingNumber")}.`,
      "2. О совершённых исполнительных действиях и принятых мерах принудительного исполнения.",
      "3. О направлении запросов в банки, регистрирующие органы, налоговые органы и иные организации.",
      "4. О поступивших денежных средствах и произведённых перечислениях взыскателю.",
      "5. О причинах неисполнения требований исполнительного документа в полном объёме.",
      `Ответ прошу направить по адресу: ${value(values, "responseAddress")} и на электронную почту: ${value(values, "claimantEmail")}.`,
      ...(applicationLines.length ? ["Приложения:", ...applicationLines] : []),
    ].map(applyDocumentTypography),
    footerLines: [
      `Взыскатель: ______________________ /${value(values, "claimantFullName")}/`,
      `Тел.: ${value(values, "claimantPhone")}`,
    ].map(applyDocumentTypography),
  };
}

function bankDebtorName(values: DocumentValues) {
  const legalName = maybeValue(values, "debtorLegalName");
  const fullName = maybeValue(values, "debtorFullName");

  if (fullName) {
    return fullName;
  }

  if (legalName) {
    return legalName;
  }

  return value(values, "debtorFullName");
}

function bankDebtorIdentifierLabel() {
  return "ИНН/ОГРН";
}

function bankDebtorNameGenitive(values: DocumentValues) {
  return optionalValue(values, "debtorFullNameGenitive", "")
    || toGenitiveFullName(bankDebtorName(values));
}

function buildBankSubmissionApplications(values: DocumentValues) {
  const lines = [
    applicationLine(
      1,
      `Исполнительный документ: ${enforcementDocumentDisplayName(values)} - оригинал`,
      optionalValue(values, "enforcementDocumentPages", ""),
    ),
  ];

  if (values.includeClaimantPassportCopy !== "no") {
    lines.push(
      applicationLine(
        lines.length + 1,
        "Копия паспорта взыскателя",
        optionalValue(values, "claimantPassportCopyPages", ""),
      ),
    );
  }

  if (values.includeRepresentativePower === "yes") {
    lines.push(
      applicationLine(
        lines.length + 1,
        "Доверенность представителя",
        optionalValue(values, "representativePowerPages", ""),
      ),
    );
  }

  if (values.includeOtherDocuments === "yes") {
    for (let index = 1; index <= 5; index += 1) {
      if (index > 1 && values[`addOtherDocument${index}`] !== "yes") {
        break;
      }

      lines.push(
        applicationLine(
          lines.length + 1,
          value(values, `otherDocument${index}Description`),
          optionalValue(values, `otherDocument${index}Pages`, ""),
        ),
      );
    }
  }

  return lines;
}

function buildBankSubmissionRenderable(values: DocumentValues): DocumentRenderable {
  const claimBreakdown = joinSentenceParts([
    maybeValue(values, "principalDebtAmount")
      ? `основной долг - ${value(values, "principalDebtAmount")} рублей`
      : "",
    maybeValue(values, "penaltyAmount")
      ? `проценты/неустойка - ${value(values, "penaltyAmount")} рублей`
      : "",
    maybeValue(values, "stateDutyAmount")
      ? `государственная пошлина - ${value(values, "stateDutyAmount")} рублей`
      : "",
    maybeValue(values, "otherAwardedAmount")
      ? `иные взысканные суммы - ${value(values, "otherAwardedAmount")} рублей`
      : "",
  ]);

  return {
    headerLines: [
      formatQuotedDate(value(values, "documentDate", "")),
      `В ${value(values, "targetBankName")}`,
      `Адрес: ${value(values, "targetBankAddress")}`,
      `Взыскатель: ${value(values, "claimantHeaderFullName")}`,
      `Адрес: ${value(values, "claimantAddress")}`,
      `тел.: ${value(values, "claimantPhone")}`,
      `e-mail: ${value(values, "claimantEmail")}`,
      `Должник: ${bankDebtorName(values)}`,
      maybeValue(values, "debtorInnOrOgrn")
        ? `${bankDebtorIdentifierLabel()}: ${value(values, "debtorInnOrOgrn")}`
        : "",
      `адрес: ${value(values, "debtorAddress")}`,
    ]
      .filter(Boolean)
      .map(applyDocumentTypography),
    title:
      `ЗАЯВЛЕНИЕ\nо взыскании денежных средств по ${enforcementDocumentTitleDative(values)}`,
    bodyParagraphs: [
      `Взыскатель предъявляет в банк ${enforcementDocumentDescription(values)}, о взыскании денежных средств с должника ${bankDebtorNameGenitive(values)} в пользу взыскателя ${value(values, "claimantFullName")}.`,
      `Сумма, подлежащая взысканию по исполнительному документу, составляет ${value(values, "claimAmountNumber")} (${value(values, "claimAmountWords")}) рублей${claimBreakdown ? `, в том числе: ${claimBreakdown}` : ""}.`,
      "На основании статьи 8 Федерального закона от 02.10.2007 № 229-ФЗ «Об исполнительном производстве» исполнительный документ о взыскании денежных средств может быть направлен взыскателем непосредственно в банк или иную кредитную организацию.",
      "Прошу банк:",
      `1. Принять к исполнению ${enforcementDocumentDescription(values)}.`,
      "2. Списать денежные средства со счетов должника в пределах суммы, указанной в исполнительном документе.",
      "3. Перечислить взысканные денежные средства по следующим реквизитам:",
      `Получатель ${value(values, "recipientName")},`,
      `Банк получателя ${value(values, "recipientBankName")},`,
      `Счёт получателя ${value(values, "bankRecipientAccount")},`,
      `БИК ${value(values, "bankBik")}.`,
      "4. Направить взыскателю информацию о принятии исполнительного документа к исполнению и о произведённом исполнении.",
      "Приложения:",
      ...buildBankSubmissionApplications(values),
    ].map(applyDocumentTypography),
    footerLines: [
      `Взыскатель: ______________________ /${value(values, "claimantFullName")}/`,
      `Тел.: ${value(values, "claimantPhone")}`,
    ].map(applyDocumentTypography),
  };
}

function powerOfAttorneyPersonDetails(
  values: DocumentValues,
  prefix: "principal" | "representative",
  options: { includeBirthAndCode?: boolean; useGenitiveFullName?: boolean } = {},
) {
  const includeBirthAndCode = options.includeBirthAndCode ?? true;
  const fullName = value(values, `${prefix}FullName`);
  const parts = [
    options.useGenitiveFullName ? toGenitiveFullName(fullName) : fullName,
    includeBirthAndCode
      ? `дата рождения ${formatQuotedDate(value(values, `${prefix}BirthDate`, ""))}`
      : "",
    `паспорт: серия ${value(values, `${prefix}PassportSeries`)} № ${value(values, `${prefix}PassportNumber`)}`,
    `выдан ${value(values, `${prefix}PassportIssuedBy`)} ${formatQuotedDate(value(values, `${prefix}PassportIssuedDate`, ""))}`,
    `адрес регистрации: ${value(values, `${prefix}Address`)}`,
  ];

  return joinSentenceParts(parts.filter(Boolean));
}

function powerOfAttorneyPrincipalParagraph(
  values: DocumentValues,
  includeBirthAndCode: boolean,
) {
  const principalStatus = String(values.principalStatus ?? "person");
  const principalNamingWord =
    values.principalNamingGender === "female" ? "именуемая" : "именуемый";

  if (principalStatus === "organization") {
    const parts = [
      value(values, "principalOrganizationName"),
      `ОГРН ${value(values, "principalOrganizationOgrn")}`,
      `ИНН ${value(values, "principalOrganizationInn")}`,
      "именуемое в дальнейшем \"Доверитель\"",
      `от имени которого действует ${value(values, "principalSignerPosition")} ${value(values, "principalSignerFullName")}`,
      `на основании ${value(values, "principalSignerBasis")}`,
    ];

    return `${joinSentenceParts(parts)}, настоящей доверенностью уполномочивает:`;
  }

  if (principalStatus === "ip") {
    const details = powerOfAttorneyPersonDetails(values, "principal", {
      includeBirthAndCode,
    });
    const registeredWord =
      values.principalNamingGender === "female"
        ? "зарегистрированная"
        : "зарегистрированный";

    return `Я, ${details}, ${registeredWord} в качестве индивидуального предпринимателя, ОГРНИП ${value(values, "principalOgrnip")}, ИНН ${value(values, "principalInn")}, ${principalNamingWord} в дальнейшем "Доверитель", настоящей доверенностью уполномочиваю:`;
  }

  return `Я, ${powerOfAttorneyPersonDetails(values, "principal", {
    includeBirthAndCode,
  })}, ${principalNamingWord} в дальнейшем "Доверитель", настоящей доверенностью уполномочиваю:`;
}

function buildPowerOfAttorneyFooterLines(values: DocumentValues) {
  const footerLines: string[] = [];

  if (values.includeRepresentativeSignature === true) {
    footerLines.push(
      `Подпись Поверенного удостоверяю ______________________ /${value(values, "representativeFullName")}/`,
    );
  }

  footerLines.push(
    "Подпись Доверителя ______________________",
    "ФИО Доверителя прописью ______________________________",
  );

  return footerLines;
}

function powerDecision(value: DocumentValues[string]) {
  if (value === true || value === "yes" || value === "allowed") {
    return "allowed";
  }

  if (value === "denied") {
    return "denied";
  }

  return "omit";
}

function paymentPowerDecision(value: DocumentValues[string]) {
  return powerDecision(value);
}

function powerOfAttorneyTarget(values: DocumentValues) {
  const targetName = value(values, "targetName");
  const targetType = String(values.targetType ?? "government");

  if (targetType === "government") {
    return `государственном (муниципальном) органе: ${targetName}`;
  }

  if (targetType === "post") {
    return `отделении ${value(values, "postOfficeDepartment")} почтовой связи, расположенном по адресу ${targetName}`;
  }

  return targetName;
}

function powerOfAttorneyGovernmentIntro(values: DocumentValues) {
  return `Поверенный вправе в полной мере и в полном объеме представлять интересы Доверителя в государственном (муниципальном) органе: ${value(values, "targetName")} в следующем споре: ${value(values, "governmentDisputeSubject")}.`;
}

export const POWER_OF_ATTORNEY_PRESET_POWERS = [
  {
    id: "powerSubmitDocuments",
    generalText:
      "получать заявления, обращения, жалобы, отзывы, ходатайства и иные документы",
    mfcText:
      "получать заявления, обращения, жалобы, отзывы, ходатайства и иные документы",
    postText: "предъявлять и получать документы, связанные с выдачей отправлений",
  },
  {
    id: "powerSignDocuments",
    generalText:
      "подписывать заявления, обращения, жалобы, отзывы, ходатайства и иные документы",
    mfcText:
      "подписывать заявления, обращения, жалобы, отзывы, ходатайства и иные документы",
    postText:
      "подписывать заявления, обращения, жалобы, отзывы, ходатайства и иные документы",
  },
  {
    id: "powerReviewEvidence",
    generalText:
      "представлять доказательства и знакомиться с доказательствами, представленными иными лицами, участвующими в деле",
    mfcText:
      "представлять доказательства и знакомиться с доказательствами, представленными иными лицами, участвующими в деле",
    postText:
      "представлять доказательства и знакомиться с доказательствами, представленными иными лицами, участвующими в деле",
  },
  {
    id: "powerMakeStatements",
    generalText:
      "делать заявления, приводить свои доводы по всем возникающим в ходе рассмотрения дела вопросам",
    mfcText:
      "делать заявления, приводить свои доводы по всем возникающим в ходе рассмотрения дела вопросам",
    postText:
      "делать заявления, приводить свои доводы по всем возникающим в ходе рассмотрения дела вопросам",
  },
  {
    id: "powerMakePayments",
    generalText: "осуществлять оплату за счет и от имени Доверителя",
    mfcText: "осуществлять оплату за счет и от имени Доверителя",
    postText: "осуществлять оплату за счет и от имени Доверителя",
  },
  {
    id: "powerInteractWithOfficials",
    generalText: "представлять мои интересы при взаимодействии с сотрудниками организации",
    mfcText: "совершать иные действия, связанные с исполнением настоящего поручения",
    postText: "совершать иные действия, необходимые для получения корреспонденции",
  },
] as const;

export function getPowerOfAttorneyPresetPowerText(
  power: (typeof POWER_OF_ATTORNEY_PRESET_POWERS)[number],
  targetType: string,
) {
  if (targetType === "mfc") {
    return power.mfcText;
  }
 
  if (targetType === "post") {
    return power.postText;
  }

  return power.generalText;
}

function formatPowerOfAttorneyPowerLines(powers: string[]) {
  return powers.map((power, index) => {
    const ending = index === powers.length - 1 ? "." : ";";

    return `— ${power}${ending}`;
  });
}

function buildPowerOfAttorneyPaymentText(values: DocumentValues) {
  const paymentPower = POWER_OF_ATTORNEY_PRESET_POWERS.find(
    (power) => power.id === "powerMakePayments",
  );

  if (!paymentPower) {
    return "";
  }

  const decision = paymentPowerDecision(values[paymentPower.id]);

  if (decision === "allowed") {
    return "Поверенный вправе осуществлять оплату за счет и от имени Доверителя.";
  }

  if (decision === "denied") {
    return "Поверенный не вправе осуществлять оплату или осуществлять иное встречное исполнение от имени Доверителя.";
  }

  return "";
}

function buildPowerOfAttorneyDelegationParagraphs(values: DocumentValues) {
  if (values.hasDelegationRight === true) {
    return [
      "Поверенный имеет право передоверия.",
      "В случае передоверия Поверенный незамедлительно сообщает об этом Доверителю и предоставляет всю информацию о лице, в пользу которого осуществляется передоверие (новом поверенном).",
    ];
  }

  return ["Доверенность выдана без права передоверия."];
}

function buildPowerOfAttorneyPowerTexts(values: DocumentValues) {
  const targetType = String(values.targetType ?? "government");
  const selectedPowers: string[] = POWER_OF_ATTORNEY_PRESET_POWERS.flatMap(
    (power) => {
      if (power.id === "powerMakePayments") {
        return [];
      }

      const text = getPowerOfAttorneyPresetPowerText(power, targetType);
      const decision = powerDecision(values[power.id]);

      if (decision === "allowed") {
        return [text];
      }

      return [];
    },
  );

  if (powerDecision(values.includeOtherActions) === "allowed") {
    for (let index = 1; index <= 5; index += 1) {
      if (index > 1 && values[`addOtherAction${index}`] !== "yes") {
        break;
      }

      const action = maybeValue(values, `otherAction${index}`);

      if (action) {
        selectedPowers.push(action);
      }
    }
  }

  if (selectedPowers.length === 0) {
    if (targetType === "post") {
      selectedPowers.push("почтовые отправления (письма, заказные письма, бандероли, посылки)");
    } else {
      selectedPowers.push(
        "подавать заявления, обращения, жалобы, отзывы, ходатайства и иные документы",
      );
    }
  }

  return selectedPowers;
}

export function buildPowerOfAttorneyPowerLines(values: DocumentValues) {
  return formatPowerOfAttorneyPowerLines(buildPowerOfAttorneyPowerTexts(values));
}

function buildPowerOfAttorneyRenderable(values: DocumentValues): DocumentRenderable {
  const targetType = String(values.targetType ?? "government");
  const includeBirthAndCode = targetType !== "post";
  const representativeNamingWord =
    values.representativeNamingGender === "female" ? "именуемая" : "именуемый";
  const targetIntro =
    targetType === "government"
      ? powerOfAttorneyGovernmentIntro(values)
      : `представлять мои интересы в ${powerOfAttorneyTarget(values)}, а именно:`;
  const powerLinesParagraph = buildPowerOfAttorneyPowerLines(values).join("\n");
  const paymentParagraph = buildPowerOfAttorneyPaymentText(values);
  const delegationParagraphs = buildPowerOfAttorneyDelegationParagraphs(values);

  return {
    headerLines: [
      `г. ${value(values, "city")}`,
      formatSignatureDate(value(values, "documentDate", "")),
    ].map(applyDocumentTypography),
    title: "ДОВЕРЕННОСТЬ",
    bodyParagraphs: [
      powerOfAttorneyPrincipalParagraph(values, includeBirthAndCode),
      `${powerOfAttorneyPersonDetails(values, "representative", {
        includeBirthAndCode,
        useGenitiveFullName: true,
      })}, ${representativeNamingWord} в дальнейшем "Поверенный",`,
      targetIntro,
      "Полномочия поверенного лица:",
      powerLinesParagraph,
      paymentParagraph,
      ...delegationParagraphs,
      `Доверенность выдана сроком на ${value(values, "validFor")} и действует до ${formatQuotedDate(value(values, "validUntil", ""))}${value(values, "validUntilInclusive") === "включительно" ? " включительно" : ""}.`,
    ]
      .filter(Boolean)
      .map(applyDocumentTypography),
    footerLines: buildPowerOfAttorneyFooterLines(values).map(applyDocumentTypography),
  };
}

export function buildDocumentRenderable(
  document: DocumentTemplate,
  values: DocumentValues,
) {
  switch (document.slug) {
    case "nenotarialnaya-doverennost":
      return buildPowerOfAttorneyRenderable(values);
    case "zayavlenie-v-bank-o-vzyskanii-po-ispolnitelnomu-dokumentu":
      return buildBankSubmissionRenderable(values);
    case "zayavlenie-o-hode-ispolnitelnogo-proizvodstva":
      return buildEnforcementProgressInfoRenderable(values);
    case "zayavlenie-o-vozbuzhdenii-ispolnitelnogo-proizvodstva":
      return buildEnforcementRenderable(values);
    case "raspiska-o-poluchenii-deneg":
    default:
      return buildReceiptRenderable(values);
  }
}

