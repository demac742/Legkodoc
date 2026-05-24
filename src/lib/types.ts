export type DocumentFieldType =
  | "text"
  | "textarea"
  | "date"
  | "number"
  | "money"
  | "select"
  | "radio"
  | "checkbox"
  | "address"
  | "passport"
  | "fullName";

export type DocumentField = {
  id: string;
  label: string;
  type: DocumentFieldType;
  required: boolean;
  placeholder?: string;
  helpText?: string;
  options?: string[];
};

export type ConstructorVisibleWhen = {
  fieldId: string;
  equals: string | boolean;
};

export type ConstructorChoiceOption = {
  value: string | boolean;
  label: string;
  description?: string;
  resultText?: string;
};

type ConstructorStepBase = {
  id: string;
  title: string;
  description?: string;
  progressLabel: string;
  visibleWhen?: ConstructorVisibleWhen;
};

export type ConstructorChoiceStep = ConstructorStepBase & {
  type: "choice";
  fieldId: string;
  required?: boolean;
  options: ConstructorChoiceOption[];
};

export type ConstructorFieldGroupStep = ConstructorStepBase & {
  type: "fieldGroup";
  fields: string[];
};

export type ConstructorReviewStep = ConstructorStepBase & {
  type: "review";
};

export type ConstructorStep =
  | ConstructorChoiceStep
  | ConstructorFieldGroupStep
  | ConstructorReviewStep;

export type DocumentPageContent = {
  suitableFor: string[];
  notSuitableFor: string[];
  requiredData: string[];
  howToFill: string[];
  afterDownload: string[];
  articleSections?: Array<{
    title: string;
    paragraphs: string[];
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  relatedDocuments: string[];
};

export type DocumentSeoTemplate = {
  signals: Array<{
    eyebrow: string;
    title: string;
    text: string;
  }>;
  useCases: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      title: string;
      text: string;
    }>;
  };
  preparation: {
    eyebrow: string;
    title: string;
    checklistTitle: string;
    howToFillTitle: string;
  };
  mistakes: {
    eyebrow: string;
    description: string;
    items: Array<{
      title: string;
      text: string;
    }>;
  };
  legalReferences: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      href: string;
      label: string;
      text: string;
    }>;
  };
};

export type DocumentTemplate = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  price: number;
  fields: DocumentField[];
  constructorSteps?: ConstructorStep[];
  sampleValues?: DocumentValues;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  seoTemplate?: DocumentSeoTemplate;
  page: DocumentPageContent;
  disclaimers: string[];
};

export type DocumentValues = Record<string, string | boolean>;

export type OrderStatus =
  | "created"
  | "pending_payment"
  | "paid"
  | "failed"
  | "expired";

export type DocumentOrder = {
  id: string;
  documentSlug: string;
  status: OrderStatus;
  amount: number;
  values: DocumentValues;
  yookassaPaymentId?: string;
  confirmationUrl?: string;
  createdAt: string;
};
