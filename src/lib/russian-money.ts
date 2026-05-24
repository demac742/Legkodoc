const ONES_MALE = [
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

const ONES_FEMALE = [
  "",
  "одна",
  "две",
  "три",
  "четыре",
  "пять",
  "шесть",
  "семь",
  "восемь",
  "девять",
];

const TEENS = [
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

const TENS = [
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

const HUNDREDS = [
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

type UnitForms = {
  gender: "male" | "female";
  one: string;
  twoToFour: string;
  fivePlus: string;
};

const UNITS: UnitForms[] = [
  { gender: "male", one: "", twoToFour: "", fivePlus: "" },
  { gender: "female", one: "тысяча", twoToFour: "тысячи", fivePlus: "тысяч" },
  { gender: "male", one: "миллион", twoToFour: "миллиона", fivePlus: "миллионов" },
  { gender: "male", one: "миллиард", twoToFour: "миллиарда", fivePlus: "миллиардов" },
];

function pluralize(value: number, forms: Pick<UnitForms, "one" | "twoToFour" | "fivePlus">) {
  const mod100 = value % 100;
  const mod10 = value % 10;

  if (mod100 >= 11 && mod100 <= 19) {
    return forms.fivePlus;
  }

  if (mod10 === 1) {
    return forms.one;
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return forms.twoToFour;
  }

  return forms.fivePlus;
}

function tripletToWords(value: number, gender: "male" | "female") {
  if (value === 0) {
    return [];
  }

  const words: string[] = [];
  const hundreds = Math.floor(value / 100);
  const tensUnits = value % 100;
  const tens = Math.floor(tensUnits / 10);
  const units = tensUnits % 10;
  const ones = gender === "female" ? ONES_FEMALE : ONES_MALE;

  if (hundreds > 0) {
    words.push(HUNDREDS[hundreds]);
  }

  if (tensUnits >= 10 && tensUnits <= 19) {
    words.push(TEENS[tensUnits - 10]);
    return words;
  }

  if (tens > 1) {
    words.push(TENS[tens]);
  }

  if (units > 0) {
    words.push(ones[units]);
  }

  return words;
}

export function numberToRussianRubles(rawValue: string) {
  const digits = rawValue.replace(/[^\d]/g, "");

  if (!digits) {
    return "";
  }

  const value = Number.parseInt(digits, 10);

  if (!Number.isFinite(value) || value < 0) {
    return "";
  }

  if (value === 0) {
    return "ноль";
  }

  const groups: number[] = [];
  let remainder = value;

  while (remainder > 0) {
    groups.push(remainder % 1000);
    remainder = Math.floor(remainder / 1000);
  }

  const parts: string[] = [];

  for (let index = groups.length - 1; index >= 0; index -= 1) {
    const groupValue = groups[index];

    if (groupValue === 0) {
      continue;
    }

    const unit = UNITS[index] ?? UNITS[UNITS.length - 1];
    parts.push(...tripletToWords(groupValue, unit.gender));

    const unitWord = pluralize(groupValue, unit);
    if (unitWord) {
      parts.push(unitWord);
    }
  }

  return parts.join(" ").replace(/\s+/g, " ").trim();
}
