import type { DocumentTemplate } from "./types";
import {
  bankEnforcementCollectionSeoTemplate,
  enforcementProceedingSeoTemplate,
  enforcementProgressInfoSeoTemplate,
  powerOfAttorneySeoTemplate,
  receiptMoneySeoTemplate,
} from "./document-seo-templates";

export const documents: DocumentTemplate[] = [
  {
    ...{
        "id": "receipt-money",
        "slug": "raspiska-o-poluchenii-deneg",
        "title": "Расписка о получении денег",
        "category": "Деньги и долги",
        "description": "Документ для подтверждения передачи денег между физическими лицами.",
        "price": 49,
        "fields": [
            {
                "id": "otherDocument1Description",
                "label": "Иной документ 1",
                "type": "text",
                "required": true,
                "placeholder": "укажите название документов"
            },
            {
                "id": "otherDocument1Pages",
                "label": "Листов в ином документе 1",
                "type": "number",
                "required": true,
                "placeholder": "1"
            },
            {
                "id": "addOtherDocument2",
                "label": "Добавить еще иной документ",
                "type": "radio",
                "required": false,
                "options": [
                    "yes",
                    "no"
                ]
            },
            {
                "id": "otherDocument2Description",
                "label": "Иной документ 2",
                "type": "text",
                "required": true,
                "placeholder": "укажите название документа"
            },
            {
                "id": "otherDocument2Pages",
                "label": "Листов в ином документе 2",
                "type": "number",
                "required": true,
                "placeholder": "1"
            },
            {
                "id": "addOtherDocument3",
                "label": "Добавить еще иной документ",
                "type": "radio",
                "required": false,
                "options": [
                    "yes",
                    "no"
                ]
            },
            {
                "id": "otherDocument3Description",
                "label": "Иной документ 3",
                "type": "text",
                "required": true,
                "placeholder": "укажите название документа"
            },
            {
                "id": "otherDocument3Pages",
                "label": "Листов в ином документе 3",
                "type": "number",
                "required": true,
                "placeholder": "1"
            },
            {
                "id": "addOtherDocument4",
                "label": "Добавить еще иной документ",
                "type": "radio",
                "required": false,
                "options": [
                    "yes",
                    "no"
                ]
            },
            {
                "id": "otherDocument4Description",
                "label": "Иной документ 4",
                "type": "text",
                "required": true,
                "placeholder": "укажите название документа"
            },
            {
                "id": "otherDocument4Pages",
                "label": "Листов в ином документе 4",
                "type": "number",
                "required": true,
                "placeholder": "1"
            },
            {
                "id": "addOtherDocument5",
                "label": "Добавить еще иной документ",
                "type": "radio",
                "required": false,
                "options": [
                    "yes",
                    "no"
                ]
            },
            {
                "id": "otherDocument5Description",
                "label": "Иной документ 5",
                "type": "text",
                "required": true,
                "placeholder": "укажите название документа"
            },
            {
                "id": "otherDocument5Pages",
                "label": "Листов в ином документе 5",
                "type": "number",
                "required": true,
                "placeholder": "1"
            },
            {
                "id": "city",
                "label": "Город составления",
                "type": "text",
                "required": true,
                "placeholder": "Москва"
            },
            {
                "id": "loanDocumentType",
                "label": "Тип расписки",
                "type": "radio",
                "required": true,
                "options": [
                    "withContract",
                    "withoutContract"
                ]
            },
            {
                "id": "hasInterest",
                "label": "Проценты за пользование займом",
                "type": "radio",
                "required": true,
                "options": [
                    "true",
                    "false"
                ]
            },
            {
                "id": "hasPenalty",
                "label": "Пени за просрочку",
                "type": "radio",
                "required": true,
                "options": [
                    "true",
                    "false"
                ]
            },
            {
                "id": "paymentForm",
                "label": "Форма оплаты",
                "type": "radio",
                "required": false,
                "options": [
                    "cash",
                    "bankTransfer",
                    "notSpecified"
                ]
            },
            {
                "id": "bankTransferAccount",
                "label": "Номер банковской карты",
                "type": "text",
                "required": true,
                "placeholder": "укажите номер карты"
            },
            {
                "id": "receiverFullName",
                "label": "ФИО заемщика",
                "type": "fullName",
                "required": true,
                "placeholder": "Волгин Антон Олегович"
            },
            {
                "id": "receiverPassportSeries",
                "label": "Серия паспорта заемщика",
                "type": "text",
                "required": true,
                "placeholder": "53 16"
            },
            {
                "id": "receiverPassportNumber",
                "label": "Номер паспорта заемщика",
                "type": "text",
                "required": true,
                "placeholder": "676602"
            },
            {
                "id": "receiverPassportIssuedBy",
                "label": "Кем выдан паспорт заемщика",
                "type": "text",
                "required": true,
                "placeholder": "ОВД района Арбат города Москвы"
            },
            {
                "id": "receiverAddress",
                "label": "Адрес регистрации заемщика",
                "type": "address",
                "required": true,
                "placeholder": "г. Москва, ул. Академика Янгеля, д. 14, кв. 52"
            },
            {
                "id": "giverFullName",
                "label": "ФИО займодавца",
                "type": "fullName",
                "required": true,
                "placeholder": "Щипков Глеб Владимирович"
            },
            {
                "id": "giverPassportSeries",
                "label": "Серия паспорта займодавца",
                "type": "text",
                "required": true,
                "placeholder": "75 15"
            },
            {
                "id": "giverPassportNumber",
                "label": "Номер паспорта займодавца",
                "type": "text",
                "required": true,
                "placeholder": "750391"
            },
            {
                "id": "giverPassportIssuedBy",
                "label": "Кем выдан паспорт займодавца",
                "type": "text",
                "required": true,
                "placeholder": "ОВД района Хамовники города Москвы"
            },
            {
                "id": "giverAddress",
                "label": "Адрес регистрации займодавца",
                "type": "address",
                "required": true,
                "placeholder": "г. Челябинск, ул. Воровского, д. 79, кв. 106"
            },
            {
                "id": "amountNumber",
                "label": "Сумма займа цифрами",
                "type": "money",
                "required": true,
                "placeholder": "100000"
            },
            {
                "id": "amountWords",
                "label": "Сумма займа прописью",
                "type": "text",
                "required": true,
                "placeholder": "сто тысяч рублей",
                "helpText": "Пока поле заполняется вручную. Автозаполнение добавим позже."
            },
            {
                "id": "contractDate",
                "label": "Дата договора займа",
                "type": "date",
                "required": true
            },
            {
                "id": "interestAmountNumber",
                "label": "Проценты цифрами",
                "type": "money",
                "required": true,
                "placeholder": "100000"
            },
            {
                "id": "interestAmountWords",
                "label": "Проценты прописью",
                "type": "text",
                "required": true,
                "placeholder": "сто тысяч рублей"
            },
            {
                "id": "totalReturnAmountNumber",
                "label": "Общая сумма к возврату цифрами",
                "type": "money",
                "required": true,
                "placeholder": "200000"
            },
            {
                "id": "totalReturnAmountWords",
                "label": "Общая сумма к возврату прописью",
                "type": "text",
                "required": true,
                "placeholder": "двести тысяч рублей"
            },
            {
                "id": "returnDate",
                "label": "Дата возврата",
                "type": "date",
                "required": true
            },
            {
                "id": "penaltyRate",
                "label": "Размер пени",
                "type": "number",
                "required": true,
                "placeholder": "1"
            },
            {
                "id": "penaltyRateWords",
                "label": "Размер пени прописью",
                "type": "text",
                "required": true,
                "placeholder": "одного"
            },
            {
                "id": "witnessesMode",
                "label": "Свидетели при подписании",
                "type": "radio",
                "required": false,
                "options": [
                    "present",
                    "absent",
                    "notProvided"
                ]
            },
            {
                "id": "witnessesDetails",
                "label": "Данные свидетелей",
                "type": "textarea",
                "required": true,
                "placeholder": "ФИО свидетелей, паспортные данные или ИНН"
            },
            {
                "id": "signingPlaceMode",
                "label": "Место составления расписки",
                "type": "radio",
                "required": false,
                "options": [
                    "yes",
                    "blank",
                    "no"
                ]
            },
            {
                "id": "signingPlaceAddress",
                "label": "Адрес составления расписки",
                "type": "address",
                "required": true,
                "placeholder": "адрес, где подписана расписка"
            },
            {
                "id": "signingTimeMode",
                "label": "Время составления расписки",
                "type": "radio",
                "required": false,
                "options": [
                    "yes",
                    "blank",
                    "no"
                ]
            },
            {
                "id": "signingTime",
                "label": "Время составления расписки",
                "type": "text",
                "required": true,
                "placeholder": "14 часов 30 минут"
            },
            {
                "id": "transferredDocumentType",
                "label": "Переданный документ",
                "type": "radio",
                "required": false,
                "options": [
                    "contract",
                    "act",
                    "other",
                    "none"
                ]
            },
            {
                "id": "transferredDocumentDetails",
                "label": "Реквизиты переданного документа",
                "type": "text",
                "required": true,
                "placeholder": "номер, дата или название документа"
            },
            {
                "id": "identityConfirmationType",
                "label": "Подтверждение личности составителя",
                "type": "radio",
                "required": false,
                "options": [
                    "passport",
                    "driverLicense",
                    "notProvided"
                ]
            },
            {
                "id": "identityDocumentDetails",
                "label": "Данные водительского удостоверения",
                "type": "text",
                "required": true,
                "placeholder": "серия и номер водительского удостоверения"
            },
            {
                "id": "documentDate",
                "label": "Дата подписания",
                "type": "date",
                "required": true
            }
        ],
        "constructorSteps": [
            {
                "id": "loan-type",
                "type": "choice",
                "progressLabel": "Тип",
                "title": "Как оформляем займ?",
                "description": "Выберите, есть ли отдельный договор займа. От этого зависит основание в тексте расписки.",
                "fieldId": "loanDocumentType",
                "options": [
                    {
                        "value": "withContract",
                        "label": "Займ по договору займа",
                        "description": "В расписке будет ссылка на дату договора займа.",
                        "resultText": "В тексте расписки появится основание: деньги получены по договору займа от указанной даты. Ниже нужно будет заполнить дату договора."
                    },
                    {
                        "value": "withoutContract",
                        "label": "Займ без отдельного договора",
                        "description": "Текст зафиксирует получение денег без ссылки на договор.",
                        "resultText": ""
                    }
                ]
            },
            {
                "id": "parties",
                "type": "fieldGroup",
                "progressLabel": "Шаг",
                "title": "Кто получил и кто передал деньги?",
                "description": "Заполните данные заемщика и займодавца так, как они должны попасть в расписку.",
                "fields": [
                    "receiverFullName",
                    "receiverPassportSeries",
                    "receiverPassportNumber",
                    "receiverPassportIssuedBy",
                    "receiverAddress",
                    "giverFullName",
                    "giverPassportSeries",
                    "giverPassportNumber",
                    "giverPassportIssuedBy",
                    "giverAddress"
                ]
            },
            {
                "id": "amount",
                "type": "fieldGroup",
                "progressLabel": "Шаг",
                "title": "Какая сумма займа передана?",
                "fields": [
                    "amountNumber",
                    "amountWords"
                ]
            },
            {
                "id": "contract",
                "type": "fieldGroup",
                "progressLabel": "Основание",
                "title": "Дата договора займа",
                "description": "Этот шаг нужен только если займ оформлен по договору.",
                "visibleWhen": {
                    "fieldId": "loanDocumentType",
                    "equals": "withContract"
                },
                "fields": [
                    "contractDate"
                ]
            },
            {
                "id": "interest",
                "type": "choice",
                "progressLabel": "Проценты",
                "title": "Есть проценты за пользование займом?",
                "fieldId": "hasInterest",
                "options": [
                    {
                        "value": true,
                        "label": "Да, есть проценты",
                        "description": "В расписке появится общая сумма к возврату.",
                        "resultText": "Добавим условие о возврате основного долга и процентов. Ниже нужно указать сумму процентов и общую сумму к возврату."
                    },
                    {
                        "value": false,
                        "label": "Нет, без процентов",
                        "description": "Заемщик обязуется вернуть только сумму займа.",
                        "resultText": "В расписке останется простая формулировка: заемщик возвращает только сумму займа к указанной дате."
                    }
                ]
            },
            {
                "id": "interest-values",
                "type": "fieldGroup",
                "progressLabel": "Проценты",
                "title": "Укажите проценты и общую сумму возврата",
                "visibleWhen": {
                    "fieldId": "hasInterest",
                    "equals": true
                },
                "fields": [
                    "interestAmountNumber",
                    "interestAmountWords",
                    "totalReturnAmountNumber",
                    "totalReturnAmountWords"
                ]
            },
            {
                "id": "return",
                "type": "fieldGroup",
                "progressLabel": "Возврат",
                "title": "Когда заемщик вернет деньги?",
                "fields": [
                    "returnDate"
                ]
            },
            {
                "id": "penalty",
                "type": "choice",
                "progressLabel": "Пени",
                "title": "Включить пени за просрочку?",
                "fieldId": "hasPenalty",
                "options": [
                    {
                        "value": true,
                        "label": "Да, включить пени",
                        "description": "В расписке появится условие о проценте за каждый день просрочки.",
                        "resultText": "Добавим отдельный абзац про пени за каждый день просрочки. Ниже нужно указать размер процента цифрами и прописью."
                    },
                    {
                        "value": false,
                        "label": "Нет, без пени",
                        "description": "Текст завершится обязательством вернуть сумму в срок.",
                        "resultText": "Абзац про пени не попадет в расписку. В документе останется только срок возврата денег."
                    }
                ]
            },
            {
                "id": "penalty-values",
                "type": "fieldGroup",
                "progressLabel": "Пени",
                "title": "Укажите размер пени",
                "visibleWhen": {
                    "fieldId": "hasPenalty",
                    "equals": true
                },
                "fields": [
                    "penaltyRate",
                    "penaltyRateWords"
                ]
            },
            {
                "id": "signing",
                "type": "fieldGroup",
                "progressLabel": "Подписание",
                "title": "Дата подписания",
                "description": "В конце расписки будет ФИО заемщика, дата и строка подписи.",
                "fields": [
                    "documentDate"
                ]
            },
            {
                "id": "review",
                "type": "review",
                "progressLabel": "Проверка",
                "title": "Проверьте расписку перед скачиванием",
                "description": ""
            }
        ],
        "sampleValues": {
            "city": "Москва",
            "documentDate": "2026-05-11",
            "loanDocumentType": "withContract",
            "hasInterest": true,
            "hasPenalty": true,
            "paymentForm": "bankTransfer",
            "bankTransferAccount": "2200 1507 8841 3926",
            "receiverFullName": "Новиков Сергей Александрович",
            "receiverPassportSeries": "4512",
            "receiverPassportNumber": "673415",
            "receiverPassportIssuedBy": "ОВД района Арбат города Москвы",
            "receiverAddress": "г. Москва, ул. Академика Янгеля, д. 14, кв. 52",
            "giverFullName": "Мельников Игорь Павлович",
            "giverPassportSeries": "4508",
            "giverPassportNumber": "221904",
            "giverPassportIssuedBy": "ОВД района Хамовники города Москвы",
            "giverAddress": "г. Химки, ул. Молодежная, д. 7, кв. 18",
            "amountNumber": "120000",
            "amountWords": "сто двадцать тысяч",
            "contractDate": "2026-05-11",
            "interestAmountNumber": "8000",
            "interestAmountWords": "восемь тысяч",
            "totalReturnAmountNumber": "128000",
            "totalReturnAmountWords": "сто двадцать восемь тысяч",
            "returnDate": "2026-08-11",
            "penaltyRate": "1",
            "penaltyRateWords": "одного",
            "witnessesMode": "present",
            "witnessesDetails": "",
            "signingPlaceMode": "yes",
            "signingPlaceAddress": "г. Москва, ул. Академика Янгеля, д. 14, кв. 52",
            "signingTimeMode": "yes",
            "signingTime": "19 часов 15 минут",
            "transferredDocumentType": "contract",
            "transferredDocumentDetails": "№ 4 от «11» мая 2026 г.",
            "identityConfirmationType": "passport"
        },
        "seo": {
            "title": "Расписка о получении денег - заполнить и скачать",
            "description": "Заполните образец расписки онлайн без ворда и ручной верстки. Укажите данные и сервис автоматически подготовит документ в PDF формате.",
            "keywords": [
                "расписка о получении денег онлайн",
                "расписка о получении денег скачать",
                "образец расписки о получении денег",
                "расписка между физическими лицами",
                "долговая расписка",
                "расписка о займе",
                "расписка pdf",
                "скачать расписку pdf"
            ]
        },
        "page": {
            "suitableFor": [
                "деньги передаются между физическими лицами",
                "нужно подтвердить факт получения суммы",
                "документ нужен для личной сделки или займа"
            ],
            "notSuitableFor": [
                "нужен сложный договор с большим количеством условий",
                "сторонами выступают компании",
                "ситуация требует индивидуальной юридической консультации"
            ],
            "requiredData": [
                "ФИО и паспортные данные сторон",
                "адреса регистрации сторон",
                "сумма цифрами и прописью",
                "основание передачи денег",
                "дата и место подписания"
            ],
            "howToFill": [
                "Заполните поля конструктора на странице документа.",
                "Проверьте текст расписки перед скачиванием.",
                "После оплаты скачайте чистую версию без водяного знака."
            ],
            "afterDownload": [
                "Проверьте все данные перед подписанием.",
                "Подпишите расписку собственноручно, если это требуется для вашей ситуации."
            ],
            "articleSections": [
                {
                    "title": "Что такое расписка о получении денег",
                    "paragraphs": [
                        "Главная задача расписки — зафиксировать факт передачи денег понятным текстом: кто получил сумму, от кого, когда, где, в каком размере и на каком основании. Чем точнее описаны обстоятельства, тем меньше риск спора о том, что именно произошло."
                    ]
                },
                {
                    "title": "Какие данные обязательно указать",
                    "paragraphs": [
                        "В расписке обычно указывают полные ФИО сторон, паспортные данные, адреса регистрации, дату и место составления, сумму цифрами и прописью, основание передачи денег и подписи сторон."
                    ]
                },
                {
                    "title": "Как описать сумму, основание и срок возврата",
                    "paragraphs": [
                        "Основание передачи помогает понять смысл расписки: заем, возврат долга, оплата по договоренности, компенсация или другой расчет. Если срок возврата не нужен, его можно не включать, но если стороны договорились о конкретной дате, ее лучше указать явно."
                    ]
                },
                {
                    "title": "Наличные и перевод: что написать в расписке",
                    "paragraphs": [
                        "Если деньги переданы наличными, в расписке можно указать, что сумма получена наличными полностью. Если был банковский перевод, полезно написать, что деньги получены безналичным переводом, и при необходимости добавить реквизиты платежа или назначение.",
                        "Важно, чтобы текст не противоречил реальности. Не стоит писать «получил наличными», если фактически деньги пришли переводом. Лучше описывать способ передачи так, как он действительно был выполнен."
                    ]
                },
                {
                    "title": "Нужен ли нотариус для расписки",
                    "paragraphs": [
                        "Для обычной расписки о получении денег между физическими лицами нотариус, как правило, не является обязательным условием. Важнее, чтобы документ был составлен понятно, содержал существенные данные и был подписан тем лицом, которое получает деньги."
                    ]
                },
                {
                    "title": "Типичные ошибки при составлении",
                    "paragraphs": [
                        "Частые ошибки: не указана сумма прописью, нет паспортных данных, неясно основание передачи денег, отсутствует дата, текст говорит о будущем получении денег вместо фактического получения, подпись стоит без расшифровки.",
                        "Еще одна ошибка — оставлять в документе пустые поля или неподходящие фразы из чужого образца. Перед подписанием нужно прочитать готовую расписку целиком и убрать все, что не относится к вашей ситуации."
                    ]
                },
                {
                    "title": "Что проверить перед подписанием",
                    "paragraphs": [
                        "Перед подписанием проверьте ФИО, паспортные данные, адреса, сумму цифрами и прописью, основание передачи денег, дату, место и срок возврата, если он указан. Ошибка в одном реквизите не всегда делает документ бесполезным, но может усложнить подтверждение фактов."
                    ]
                },
                {
                    "title": "Чем отличаются проценты за пользование займом и пени за просрочку",
                    "paragraphs": [
                        "Проценты за пользование займом — это плата за сам факт того, что деньги переданы во временное пользование. Они относятся к обычному сценарию возврата: заемщик возвращает основную сумму долга и сверху согласованную сумму процентов, даже если просрочки не было.",
                        "Пени за просрочку — это отдельная мера на случай нарушения срока возврата. Они начинают начисляться только если деньги не вернули вовремя. Поэтому в расписке это разные условия: проценты описывают цену займа, а пени — последствия просрочки."
                    ]
                }
            ],
            "faq": [
                {
                    "question": "Можно ли написать расписку без нотариуса?",
                    "answer": "Да, для обычной расписки между физическими лицами нотариальное удостоверение обычно не требуется. Важно, чтобы текст был понятным, а получатель денег подписал документ."
                },
                {
                    "question": "Что указать в расписке о получении денег?",
                    "answer": "Обычно указывают ФИО и паспортные данные сторон, сумму цифрами и прописью, дату и место передачи, основание получения денег, срок возврата при необходимости и подпись получателя."
                },
                {
                    "question": "Можно ли скачать расписку бесплатно?",
                    "answer": "Да. На ЛЕГКОДОК можно бесплатно подготовить PDF с водяным знаком, чтобы проверить текст. Чистый PDF без водяного знака доступен после оплаты."
                },
                {
                    "question": "Чем расписка отличается от договора займа?",
                    "answer": "Договор займа описывает условия передачи и возврата денег, а расписка чаще подтверждает факт получения суммы. В простых случаях расписка может быть достаточной, но для сложных условий лучше использовать договор."
                },
                {
                    "question": "Нужно ли указывать паспортные данные?",
                    "answer": "Паспортные данные помогают точно определить стороны. Для бытовой расписки это снижает риск путаницы, особенно если у людей совпадают фамилии или документ понадобится через длительное время."
                },
                {
                    "question": "Нужны ли свидетели при передаче денег?",
                    "answer": "Для обычной расписки свидетели не являются обязательным условием. Но при крупной сумме или повышенном риске спора свидетели, переписка, банковские подтверждения или другие следы передачи денег могут дополнительно помочь подтвердить обстоятельства."
                },
                {
                    "question": "Можно ли указать проценты?",
                    "answer": "Да, проценты можно указать прямо в расписке, если стороны договорились о них заранее. Лучше написать размер процентов, порядок расчета и общую сумму к возврату, чтобы условие не выглядело двусмысленно."
                },
                {
                    "question": "Чем проценты за пользование займом отличаются от пени за просрочку?",
                    "answer": "Проценты за пользование займом — это плата за то, что заемщик пользуется чужими деньгами до даты возврата. Пени за просрочку — это дополнительное условие, которое срабатывает только если срок возврата нарушен. Иными словами, проценты могут быть и без просрочки, а пени появляются только при задержке."
                }
            ],
            "relatedDocuments": [
                "Договор займа"
            ]
        },
        "disclaimers": [
            "Документ является типовым шаблоном и не заменяет индивидуальную юридическую консультацию. Перед использованием проверьте данные и убедитесь, что документ подходит для вашей ситуации."
        ]
    },
    seoTemplate: receiptMoneySeoTemplate,
  },
  {
    ...{
        "id": "enforcement-proceeding-request",
        "slug": "zayavlenie-o-vozbuzhdenii-ispolnitelnogo-proizvodstva",
        "title": "Заявление о возбуждении исполнительного производства",
        "category": "Суд и взыскание",
        "description": "Заявление для подачи судебному приставу-исполнителю по исполнительному документу.",
        "price": 99,
        "fields": [
            {
                "id": "ospName",
                "label": "Отдел судебных приставов",
                "type": "text",
                "required": true,
                "placeholder": "название района"
            },
            {
                "id": "rospRegion",
                "label": "Регион отдела приставов",
                "type": "text",
                "required": true,
                "placeholder": "название области"
            },
            {
                "id": "ufsspRegion",
                "label": "Регион УФССП",
                "type": "text",
                "required": true,
                "placeholder": "название области"
            },
            {
                "id": "ospAddress",
                "label": "Адрес отдела приставов",
                "type": "address",
                "required": true,
                "placeholder": "адрес отдела судебных приставов"
            },
            {
                "id": "enforcementDocumentType",
                "label": "Тип исполнительного документа",
                "type": "radio",
                "required": true,
                "options": [
                    "writ",
                    "judicialOrder",
                    "notaryAgreement",
                    "notaryWrit",
                    "laborCommissionCertificate",
                    "administrativeRuling",
                    "other"
                ]
            },
            {
                "id": "otherEnforcementDocumentName",
                "label": "Название исполнительного документа",
                "type": "text",
                "required": true,
                "placeholder": "укажите название документа"
            },
            {
                "id": "claimantFullName",
                "label": "ФИО взыскателя",
                "type": "fullName",
                "required": true,
                "placeholder": "Иванов Иван Иванович"
            },
            {
                "id": "claimantHeaderFullName",
                "label": "ФИО взыскателя для строки «от взыскателя»",
                "type": "fullName",
                "required": true,
                "placeholder": "ФИО"
            },
            {
                "id": "claimantBirthDate",
                "label": "Дата рождения взыскателя",
                "type": "date",
                "required": true
            },
            {
                "id": "claimantPassportSeries",
                "label": "claimantPassportSeries",
                "type": "text",
                "required": true,
                "placeholder": "65 01"
            },
            {
                "id": "claimantPassportNumber",
                "label": "Номер паспорта взыскателя",
                "type": "text",
                "required": true,
                "placeholder": "123456"
            },
            {
                "id": "claimantPassportIssuedBy",
                "label": "Кем выдан паспорт взыскателя",
                "type": "text",
                "required": true,
                "placeholder": "наименование органа"
            },
            {
                "id": "claimantPassportIssuedDate",
                "label": "Дата выдачи паспорта взыскателя",
                "type": "date",
                "required": true
            },
            {
                "id": "claimantPassport",
                "label": "Паспорт взыскателя",
                "type": "passport",
                "required": false,
                "placeholder": "серия, номер, кем и когда выдан"
            },
            {
                "id": "claimantAddress",
                "label": "Адрес взыскателя",
                "type": "address",
                "required": false,
                "placeholder": "адрес регистрации"
            },
            {
                "id": "claimantRegistrationAddress",
                "label": "Адрес регистрации взыскателя",
                "type": "address",
                "required": true,
                "placeholder": "адрес регистрации"
            },
            {
                "id": "claimantActualAddress",
                "label": "Адрес фактического проживания взыскателя",
                "type": "address",
                "required": false,
                "placeholder": "адрес фактического проживания"
            },
            {
                "id": "claimantPhone",
                "label": "Телефон взыскателя",
                "type": "text",
                "required": true,
                "placeholder": "+7 999 123-45-67"
            },
            {
                "id": "claimantEmail",
                "label": "E-mail взыскателя",
                "type": "text",
                "required": true,
                "placeholder": "mail@example.com"
            },
            {
                "id": "debtorFullName",
                "label": "ФИО должника",
                "type": "fullName",
                "required": true,
                "placeholder": "Петров Петр Петрович"
            },
            {
                "id": "debtorBirthDate",
                "label": "Дата рождения должника",
                "type": "date",
                "required": true
            },
            {
                "id": "debtorPassportSeries",
                "label": "debtorPassportSeries",
                "type": "text",
                "required": true,
                "placeholder": "65 01"
            },
            {
                "id": "debtorPassportNumber",
                "label": "Номер паспорта должника",
                "type": "text",
                "required": true,
                "placeholder": "123456"
            },
            {
                "id": "debtorPassportIssuedBy",
                "label": "Кем выдан паспорт должника",
                "type": "text",
                "required": true,
                "placeholder": "наименование органа"
            },
            {
                "id": "debtorPassportIssuedDate",
                "label": "Дата выдачи паспорта должника",
                "type": "date",
                "required": true
            },
            {
                "id": "debtorAddress",
                "label": "Адрес должника",
                "type": "address",
                "required": false,
                "placeholder": "адрес должника"
            },
            {
                "id": "debtorRegistrationAddress",
                "label": "Адрес регистрации должника",
                "type": "address",
                "required": true,
                "placeholder": "адрес регистрации"
            },
            {
                "id": "debtorActualAddress",
                "label": "Адрес фактического проживания должника, если известно",
                "type": "address",
                "required": false,
                "placeholder": "адрес фактического проживания, если известно"
            },
            {
                "id": "debtorPhone",
                "label": "Телефон должника",
                "type": "text",
                "required": false,
                "placeholder": "если известен"
            },
            {
                "id": "debtorWorkplace",
                "label": "Место работы или источник дохода должника",
                "type": "text",
                "required": false,
                "placeholder": "если известно"
            },
            {
                "id": "debtorInnOrBirthDate",
                "label": "ИНН или дата рождения должника",
                "type": "text",
                "required": false,
                "placeholder": "ИНН или дата рождения"
            },
            {
                "id": "writSeries",
                "label": "writSeries",
                "type": "text",
                "required": true,
                "placeholder": "ФС"
            },
            {
                "id": "writNumber",
                "label": "Номер исполнительного листа",
                "type": "text",
                "required": true,
                "placeholder": "123456789"
            },
            {
                "id": "writIssuedDate",
                "label": "Дата выдачи исполнительного листа",
                "type": "date",
                "required": true
            },
            {
                "id": "courtName",
                "label": "Наименование суда",
                "type": "text",
                "required": true,
                "placeholder": "Пресненский районный суд г. Москвы"
            },
            {
                "id": "caseNumber",
                "label": "Номер дела",
                "type": "text",
                "required": true,
                "placeholder": "2-1234/2026"
            },
            {
                "id": "judicialOrderNumber",
                "label": "Номер судебного приказа",
                "type": "text",
                "required": true,
                "placeholder": "2-1234/2026"
            },
            {
                "id": "judicialOrderDate",
                "label": "Дата судебного приказа",
                "type": "date",
                "required": true
            },
            {
                "id": "judicialOrderCourt",
                "label": "judicialOrderCourt",
                "type": "text",
                "required": true,
                "placeholder": "судебный участок № ..."
            },
            {
                "id": "notaryAgreementNotary",
                "label": "Нотариус",
                "type": "text",
                "required": true,
                "placeholder": "ФИО нотариуса"
            },
            {
                "id": "notaryAgreementDistrict",
                "label": "Нотариальный округ",
                "type": "text",
                "required": true,
                "placeholder": "нотариальный округ"
            },
            {
                "id": "notaryAgreementRegistryNumber",
                "label": "notaryAgreementRegistryNumber",
                "type": "text",
                "required": true,
                "placeholder": "номер в реестре"
            },
            {
                "id": "notaryWritDate",
                "label": "Дата исполнительной надписи",
                "type": "date",
                "required": true
            },
            {
                "id": "notaryWritNotary",
                "label": "Нотариус",
                "type": "text",
                "required": true,
                "placeholder": "ФИО нотариуса"
            },
            {
                "id": "notaryWritRegistryNumber",
                "label": "notaryWritRegistryNumber",
                "type": "text",
                "required": true,
                "placeholder": "номер в реестре"
            },
            {
                "id": "laborCertificateNumber",
                "label": "Номер удостоверения КТС",
                "type": "text",
                "required": true,
                "placeholder": "номер удостоверения"
            },
            {
                "id": "laborCertificateDate",
                "label": "Дата выдачи удостоверения КТС",
                "type": "date",
                "required": true
            },
            {
                "id": "laborCommissionName",
                "label": "Наименование комиссии",
                "type": "text",
                "required": true,
                "placeholder": "комиссия или организация"
            },
            {
                "id": "administrativeRulingNumber",
                "label": "Номер постановления",
                "type": "text",
                "required": true,
                "placeholder": "номер постановления"
            },
            {
                "id": "administrativeRulingDate",
                "label": "Дата постановления",
                "type": "date",
                "required": true
            },
            {
                "id": "administrativeRulingIssuer",
                "label": "Орган или должностное лицо",
                "type": "text",
                "required": true,
                "placeholder": "кто вынес постановление"
            },
            {
                "id": "otherDocumentDate",
                "label": "Дата иного исполнительного документа",
                "type": "date",
                "required": true
            },
            {
                "id": "otherDocumentNumber",
                "label": "Номер иного исполнительного документа",
                "type": "text",
                "required": false,
                "placeholder": "при наличии"
            },
            {
                "id": "otherDocumentIssuer",
                "label": "Орган или лицо, выдавшее документ",
                "type": "text",
                "required": true,
                "placeholder": "кто выдал документ"
            },
            {
                "id": "claimAmountNumber",
                "label": "claimAmountNumber",
                "type": "money",
                "required": true,
                "placeholder": "150000"
            },
            {
                "id": "claimAmountWords",
                "label": "claimAmountWords",
                "type": "text",
                "required": true,
                "placeholder": "сто пятьдесят тысяч рублей"
            },
            {
                "id": "principalDebtAmount",
                "label": "Основной долг",
                "type": "money",
                "required": false,
                "placeholder": "0"
            },
            {
                "id": "penaltyAmount",
                "label": "Проценты или неустойка",
                "type": "money",
                "required": false,
                "placeholder": "0"
            },
            {
                "id": "stateDutyAmount",
                "label": "Госпошлина",
                "type": "money",
                "required": false,
                "placeholder": "0"
            },
            {
                "id": "otherAwardedAmount",
                "label": "Иные взысканные суммы",
                "type": "money",
                "required": false,
                "placeholder": "0"
            },
            {
                "id": "recipientName",
                "label": "Получатель средств",
                "type": "text",
                "required": true,
                "placeholder": "Иванов Иван Иванович"
            },
            {
                "id": "bankName",
                "label": "Банк получателя",
                "type": "text",
                "required": true,
                "placeholder": "ПАО Сбербанк"
            },
            {
                "id": "bankBik",
                "label": "БИК",
                "type": "text",
                "required": true,
                "placeholder": "044525225"
            },
            {
                "id": "bankRecipientAccount",
                "label": "bankRecipientAccount",
                "type": "text",
                "required": true,
                "placeholder": "40817810000000000001"
            },
            {
                "id": "enforcementDocumentPages",
                "label": "Листов в оригинале исполнительного документа",
                "type": "number",
                "required": false,
                "placeholder": "1"
            },
            {
                "id": "courtAttachmentType",
                "label": "courtAttachmentType",
                "type": "radio",
                "required": false,
                "options": [
                    "none",
                    "courtAct",
                    "judicialOrder",
                    "courtDecision"
                ]
            },
            {
                "id": "courtAttachmentPages",
                "label": "Листов в судебном документе",
                "type": "number",
                "required": false,
                "placeholder": "1"
            },
            {
                "id": "hasDebtorPropertyDocuments",
                "label": "Иные документы о должнике и имуществе",
                "type": "radio",
                "required": false,
                "options": [
                    "no",
                    "yes"
                ]
            },
            {
                "id": "debtorPropertyDocumentsDescription",
                "label": "Описание иных документов",
                "type": "text",
                "required": true,
                "placeholder": "название документов"
            },
            {
                "id": "debtorPropertyDocumentsPages",
                "label": "Листов в иных документах",
                "type": "number",
                "required": false,
                "placeholder": "1"
            },
            {
                "id": "city",
                "label": "Город составления",
                "type": "text",
                "required": true,
                "placeholder": "Москва"
            },
            {
                "id": "documentDate",
                "label": "Дата заявления",
                "type": "date",
                "required": true
            }
        ],
        "constructorSteps": [
            {
                "id": "bailiff-office",
                "type": "fieldGroup",
                "progressLabel": "Шаг",
                "title": "Куда подается заявление?",
                "description": "",
                "fields": [
                    "ospName",
                    "ufsspRegion",
                    "ospAddress"
                ]
            },
            {
                "id": "parties",
                "type": "fieldGroup",
                "progressLabel": "Шаг",
                "title": "Кто взыскатель и кто должник?",
                "description": "Заполните данные взыскателя и должника так, как они должны попасть в заявление.",
                "fields": [
                    "claimantFullName",
                    "claimantPassport",
                    "claimantAddress",
                    "claimantPhone",
                    "claimantEmail",
                    "debtorFullName",
                    "debtorAddress",
                    "debtorInnOrBirthDate"
                ]
            },
            {
                "id": "writ",
                "type": "fieldGroup",
                "progressLabel": "Лист",
                "title": "Шаг документа",
                "description": "Эти данные нужны приставу, чтобы идентифицировать исполнительный документ и судебное дело.",
                "fields": [
                    "writSeries",
                    "writNumber",
                    "writIssuedDate",
                    "courtName",
                    "caseNumber"
                ]
            },
            {
                "id": "amount",
                "type": "fieldGroup",
                "progressLabel": "Шаг",
                "title": "Какая сумма подлежит взысканию?",
                "fields": [
                    "claimAmountNumber",
                    "claimAmountWords"
                ]
            },
            {
                "id": "bank-details",
                "type": "fieldGroup",
                "progressLabel": "Шаг",
                "title": "Куда перечислять взысканные средства?",
                "description": "Укажите банковские реквизиты получателя. Перед подачей заявления их лучше отдельно сверить с банком.",
                "fields": [
                    "recipientName",
                    "bankName",
                    "bankBik",
                    "bankRecipientAccount"
                ]
            },
            {
                "id": "signing",
                "type": "fieldGroup",
                "progressLabel": "Подписание",
                "title": "Где и когда подписано заявление?",
                "fields": [
                    "city",
                    "documentDate"
                ]
            },
            {
                "id": "review",
                "type": "review",
                "progressLabel": "Проверка",
                "title": "Проверьте заявление перед скачиванием",
                "description": ""
            }
        ],
        "sampleValues": {
            "documentDate": "2026-05-16",
            "ospName": "Ленинского",
            "rospRegion": "Тюменской области",
            "ufsspRegion": "Тюменской области",
            "ospAddress": "г. Москва, ул. Бутырский Вал, д. 5",
            "claimantHeaderFullName": "Соколова Марина Викторовна",
            "claimantFullName": "Соколова Марина Викторовна",
            "claimantBirthDate": "1991-09-12",
            "claimantPassportSeries": "7104",
            "claimantPassportNumber": "482615",
            "claimantPassportIssuedBy": "",
            "claimantPassportIssuedDate": "2016-11-03",
            "claimantRegistrationAddress": "г. Тюмень, ул. Холодильная, д. 77, кв. 14",
            "claimantActualAddress": "г. Тюмень, ул. Холодильная, д. 77, кв. 14",
            "claimantPhone": "+7 922 345-67-10",
            "claimantEmail": "sokolova.demo@example.com",
            "debtorFullName": "Кузнецов Артем Павлович",
            "debtorBirthDate": "1986-06-24",
            "debtorPassportSeries": "7109",
            "debtorPassportNumber": "305781",
            "debtorPassportIssuedBy": "",
            "debtorPassportIssuedDate": "2010-02-18",
            "debtorRegistrationAddress": "г. Тюмень, ул. Широтная, д. 112, кв. 8",
            "debtorActualAddress": "г. Тюмень, ул. Монтажников, д. 23, кв. 51",
            "debtorPhone": "+7 932 111-48-22",
            "debtorWorkplace": "",
            "enforcementDocumentType": "writ",
            "writSeries": "ТС",
            "writNumber": "438291605",
            "writIssuedDate": "2026-04-28",
            "courtName": "Ленинским районным судом г. Тюмени",
            "caseNumber": "2-4187/2026",
            "claimAmountNumber": "184500",
            "claimAmountWords": "сто восемьдесят четыре тысячи пятьсот",
            "principalDebtAmount": "170000",
            "penaltyAmount": "9500",
            "stateDutyAmount": "5000",
            "otherAwardedAmount": "",
            "recipientName": "Соколова Марина Викторовна",
            "bankName": "АО «Альфа-Банк»",
            "bankBik": "044525593",
            "bankRecipientAccount": "40817810099910001234",
            "enforcementDocumentPages": "2",
            "courtAttachmentType": "courtDecision",
            "courtAttachmentPages": "4",
            "hasDebtorPropertyDocuments": "yes",
            "otherDocument1Description": "копия сведений о месте работы и банковских счетах должника",
            "otherDocument1Pages": "2",
            "addOtherDocument2": "yes",
            "otherDocument2Description": "копия выписки о зарегистрированном на должника недвижимом имуществе",
            "otherDocument2Pages": "1",
            "city": "Тюмень"
        },
        "seo": {
            "title": "Заявление о возбуждении исполнительного производства - заполнить и скачать",
            "description": "Заполните образец заявления о возбуждении исполнительного производства онлайн без ворда и ручной верстки. Укажите данные и сервис автоматически подготовит документ в PDF формате.",
            "keywords": [
                "заявление о возбуждении исполнительного производства онлайн",
                "заявление приставам по исполнительному документу",
                "образец заявления о возбуждении исполнительного производства",
                "заявление в фссп о возбуждении исполнительного производства",
                "заявление судебным приставам скачать pdf"
            ]
        },
        "page": {
            "suitableFor": [
                "есть исполнительный лист, судебный приказ, нотариальный документ или иной исполнительный документ",
                "нужно сформировать PDF для печати, проверки или подачи приставам"
            ],
            "notSuitableFor": [],
            "requiredData": [
                "ФИО, адреса, паспортные и контактные данные взыскателя",
                "ФИО, адреса и известные сведения о должнике",
                "тип исполнительного документа и его реквизиты",
                "сумма взыскания и состав взысканных сумм",
                "банковские реквизиты взыскателя для перечисления денег",
                "перечень приложений и количество листов, если нужно указать"
            ],
            "howToFill": [
                "Выберите тип исполнительного документа, чтобы конструктор показал только нужные поля.",
                "Укажите данные взыскателя, должника, сумму взыскания и банковские реквизиты.",
                "Отметьте приложения: оригинал исполнительного документа, судебные копии и иные документы при наличии.",
                "Проверьте предпросмотр и скачайте PDF с водяным знаком перед оплатой чистой версии."
            ],
            "afterDownload": [
                "Проверьте шапку заявления, сумму взыскания, банковские реквизиты и приложения."
            ],
            "articleSections": [
                {
                    "title": "Заявление о возбуждении исполнительного производства",
                    "paragraphs": [
                        "Онлайн-конструктор помогает собрать этот текст без ручной верстки. Вы выбираете тип исполнительного документа, заполняете поля по смыслу, а сервис формирует аккуратный PDF с нужными разделами и без лишних пустых строк."
                    ]
                },
                {
                    "title": "Что можно указать в заявлении",
                    "paragraphs": [
                        "В заявлении можно указать исполнительный лист, судебный приказ, нотариальное соглашение об алиментах, исполнительную надпись нотариуса, удостоверение комиссии по трудовым спорам, постановление по административному делу или иной исполнительный документ."
                    ]
                },
                {
                    "title": "Какие данные нужны для заполнения",
                    "paragraphs": [
                        "Для заполнения подготовьте исполнительный документ, данные взыскателя, известные сведения о должнике, сумму взыскания, банковские реквизиты и информацию о приложениях. Чем точнее заполнены реквизиты, тем проще проверить готовый PDF перед подачей.",
                        "Необязательные сведения можно не указывать. Если поле не заполнено, оно не должно попадать в итоговый текст и оставлять обрывки предложений."
                    ]
                },
                {
                    "title": "Подача лично или почтой",
                    "paragraphs": [
                        "При личной подаче удобно иметь экземпляр заявления с отметкой о принятии и полный комплект приложений."
                    ]
                },
                {
                    "title": "Приложения к заявлению",
                    "paragraphs": [
                        "Количество листов можно указать, если это важно для комплекта документов. Если листы не указаны, приложение не должно превращаться в незаполненный шаблонный пункт."
                    ]
                },
                {
                    "title": "Что проверить перед скачиванием PDF",
                    "paragraphs": [
                        "Отдельно стоит сверить приложения: оригинал исполнительного документа должен быть указан, а дополнительные документы должны выводиться только при выборе."
                    ]
                },
                {
                    "title": "Что проверить перед подачей приставам",
                    "paragraphs": [
                        "После скачивания PDF сравните заявление с исполнительным документом: номер, дату, суд, нотариуса, орган выдачи и сумму взыскания. Затем распечатайте документ, подпишите его и подготовьте приложения."
                    ]
                },
                {
                    "title": "Как выбрать тип исполнительного документа",
                    "paragraphs": [
                        "Тип исполнительного документа влияет на поля в заявлении. У исполнительного листа есть серия и номер, у судебного приказа важны номер, дата и судебный участок, у нотариального соглашения нужны нотариус, нотариальный округ и реестровый номер.",
                        "Если документ не подходит под готовые варианты, можно выбрать иной исполнительный документ и указать его название, дату, номер при наличии и орган или лицо, которое его выдало."
                    ]
                },
                {
                    "title": "Какие сведения о должнике помогают в заявлении",
                    "paragraphs": [
                        "В заявлении можно указать регистрацию должника, фактический адрес, телефон, место работы или другие известные сведения. Эти данные помогают сделать заявление более содержательным, но необязательные поля можно оставить пустыми."
                    ]
                },
                {
                    "title": "Что делать после подготовки заявления",
                    "paragraphs": [
                        "Готовый PDF можно использовать как основу для подачи в отдел судебных приставов. Перед подачей проверьте комплект: заявление, оригинал исполнительного документа и выбранные приложения."
                    ]
                }
            ],
            "faq": [
                {
                    "question": "Можно ли подготовить заявление по исполнительному листу?",
                    "answer": "Да. В конструкторе можно выбрать исполнительный лист и указать его серию, номер, дату выдачи, суд и номер дела."
                },
                {
                    "question": "Подходит ли шаблон для судебного приказа?",
                    "answer": "Да. Для судебного приказа заполняются номер, дата приказа и суд или судебный участок."
                },
                {
                    "question": "Можно ли указать нотариальное соглашение или исполнительную надпись?",
                    "answer": "Да. Для нотариальных документов предусмотрены отдельные поля: нотариус, нотариальный округ, дата и реестровый номер."
                },
                {
                    "question": "Обязательно ли указывать все сведения о должнике?",
                    "answer": "Нет. Обязательные поля нужно заполнить, а необязательные сведения выводятся только если они указаны пользователем."
                }
            ],
            "relatedDocuments": [
                "Заявление о взыскании денежных средств",
                "Заявление приставу о перечислении взысканных средств"
            ]
        },
        "disclaimers": [
            "Документ является типовым шаблоном и не заменяет индивидуальную юридическую консультацию. Перед использованием проверьте данные и убедитесь, что документ подходит для вашей ситуации."
        ]
    },
    seoTemplate: enforcementProceedingSeoTemplate,
  },
  {
    ...{
        "id": "bank-enforcement-collection-request",
        "slug": "zayavlenie-v-bank-o-vzyskanii-po-ispolnitelnomu-dokumentu",
        "title": "Заявление о взыскании денежных средств по исполнительному документу в банк",
        "category": "Взыскание",
        "description": "Документ для предъявления исполнительного документа в банк должника.",
        "price": 49,
        "fields": [
            {
                "id": "documentDate",
                "label": "Дата заявления",
                "type": "date",
                "required": true
            },
            {
                "id": "targetBankName",
                "label": "Банк, куда подается заявление",
                "type": "text",
                "required": true,
                "placeholder": "ПАО Сбербанк"
            },
            {
                "id": "targetBankAddress",
                "label": "Адрес банка",
                "type": "address",
                "required": true,
                "placeholder": "г. Москва, ул. Вавилова, д. 19"
            },
            {
                "id": "claimantHeaderFullName",
                "label": "ФИО взыскателя для шапки",
                "type": "fullName",
                "required": true,
                "placeholder": "Соколова Марина Викторовна"
            },
            {
                "id": "claimantFullName",
                "label": "ФИО взыскателя",
                "type": "fullName",
                "required": true,
                "placeholder": "Соколова Марина Викторовна"
            },
            {
                "id": "claimantAddress",
                "label": "Адрес взыскателя",
                "type": "address",
                "required": true,
                "placeholder": "г. Тюмень, ул. Холодильная, д. 77, кв. 14"
            },
            {
                "id": "claimantPhone",
                "label": "Телефон взыскателя",
                "type": "text",
                "required": true,
                "placeholder": "+7 922 345-67-10"
            },
            {
                "id": "claimantEmail",
                "label": "E-mail взыскателя",
                "type": "text",
                "required": true,
                "placeholder": "mail@example.com"
            },
            {
                "id": "debtorType",
                "label": "Должник является юридическим лицом?",
                "type": "radio",
                "required": true,
                "options": [
                    "individual",
                    "legal"
                ]
            },
            {
                "id": "debtorFullName",
                "label": "ФИО должника",
                "type": "fullName",
                "required": true,
                "placeholder": "Кузнецов Артем Павлович"
            },
            {
                "id": "debtorFullNameGenitive",
                "label": "Должник в родительном падеже",
                "type": "text",
                "required": false,
                "placeholder": "Кузнецова Артема Павловича"
            },
            {
                "id": "debtorLegalName",
                "label": "Наименование должника",
                "type": "text",
                "required": true,
                "placeholder": "ООО Ромашка"
            },
            {
                "id": "debtorInnOrOgrn",
                "label": "debtorInnOrOgrn",
                "type": "text",
                "required": false,
                "placeholder": ""
            },
            {
                "id": "debtorAddress",
                "label": "Адрес должника",
                "type": "address",
                "required": true,
                "placeholder": "г. Тюмень, ул. Монтажников, д. 23"
            },
            {
                "id": "enforcementDocumentType",
                "label": "Тип исполнительного документа",
                "type": "radio",
                "required": true,
                "options": [
                    "writ",
                    "judicialOrder",
                    "notaryAgreement",
                    "notaryWrit",
                    "laborCommissionCertificate",
                    "administrativeRuling",
                    "other"
                ]
            },
            {
                "id": "otherEnforcementDocumentName",
                "label": "Название исполнительного документа",
                "type": "text",
                "required": true,
                "placeholder": "укажите название документа"
            },
            {
                "id": "writSeries",
                "label": "writSeries",
                "type": "text",
                "required": true,
                "placeholder": "ФС"
            },
            {
                "id": "writNumber",
                "label": "Номер исполнительного листа",
                "type": "text",
                "required": true,
                "placeholder": "123456789"
            },
            {
                "id": "writIssuedDate",
                "label": "Дата выдачи исполнительного листа",
                "type": "date",
                "required": true
            },
            {
                "id": "courtName",
                "label": "Наименование суда",
                "type": "text",
                "required": true,
                "placeholder": "Ленинский районный суд г. Тюмени"
            },
            {
                "id": "caseNumber",
                "label": "Номер дела",
                "type": "text",
                "required": true,
                "placeholder": "2-4187/2026"
            },
            {
                "id": "judicialOrderNumber",
                "label": "Номер судебного приказа",
                "type": "text",
                "required": true,
                "placeholder": "2-1234/2026"
            },
            {
                "id": "judicialOrderDate",
                "label": "Дата судебного приказа",
                "type": "date",
                "required": true
            },
            {
                "id": "judicialOrderCourt",
                "label": "judicialOrderCourt",
                "type": "text",
                "required": true,
                "placeholder": "судебный участок № ..."
            },
            {
                "id": "notaryAgreementNotary",
                "label": "Нотариус",
                "type": "text",
                "required": true,
                "placeholder": "ФИО нотариуса"
            },
            {
                "id": "notaryAgreementDistrict",
                "label": "Нотариальный округ",
                "type": "text",
                "required": true,
                "placeholder": "нотариальный округ"
            },
            {
                "id": "notaryAgreementRegistryNumber",
                "label": "notaryAgreementRegistryNumber",
                "type": "text",
                "required": true,
                "placeholder": "номер в реестре"
            },
            {
                "id": "notaryWritDate",
                "label": "Дата исполнительной надписи",
                "type": "date",
                "required": true
            },
            {
                "id": "notaryWritNotary",
                "label": "Нотариус",
                "type": "text",
                "required": true,
                "placeholder": "ФИО нотариуса"
            },
            {
                "id": "notaryWritRegistryNumber",
                "label": "notaryWritRegistryNumber",
                "type": "text",
                "required": true,
                "placeholder": "номер в реестре"
            },
            {
                "id": "laborCertificateNumber",
                "label": "Номер удостоверения КТС",
                "type": "text",
                "required": true,
                "placeholder": "номер удостоверения"
            },
            {
                "id": "laborCertificateDate",
                "label": "Дата выдачи удостоверения КТС",
                "type": "date",
                "required": true
            },
            {
                "id": "laborCommissionName",
                "label": "Наименование комиссии",
                "type": "text",
                "required": true,
                "placeholder": "комиссия или организация"
            },
            {
                "id": "administrativeRulingNumber",
                "label": "Номер постановления",
                "type": "text",
                "required": true,
                "placeholder": "номер постановления"
            },
            {
                "id": "administrativeRulingDate",
                "label": "Дата постановления",
                "type": "date",
                "required": true
            },
            {
                "id": "administrativeRulingIssuer",
                "label": "Орган или должностное лицо",
                "type": "text",
                "required": true,
                "placeholder": "кто вынес постановление"
            },
            {
                "id": "otherDocumentDate",
                "label": "Дата иного исполнительного документа",
                "type": "date",
                "required": true
            },
            {
                "id": "otherDocumentNumber",
                "label": "Номер иного исполнительного документа",
                "type": "text",
                "required": false,
                "placeholder": "при наличии"
            },
            {
                "id": "otherDocumentIssuer",
                "label": "Орган или лицо, выдавшее документ",
                "type": "text",
                "required": true,
                "placeholder": "кто выдал документ"
            },
            {
                "id": "claimAmountNumber",
                "label": "claimAmountNumber",
                "type": "money",
                "required": true,
                "placeholder": "184500"
            },
            {
                "id": "claimAmountWords",
                "label": "claimAmountWords",
                "type": "text",
                "required": true,
                "placeholder": "сто восемьдесят четыре тысячи пятьсот рублей"
            },
            {
                "id": "principalDebtAmount",
                "label": "Основной долг",
                "type": "money",
                "required": false,
                "placeholder": "0"
            },
            {
                "id": "penaltyAmount",
                "label": "Проценты или неустойка",
                "type": "money",
                "required": false,
                "placeholder": "0"
            },
            {
                "id": "stateDutyAmount",
                "label": "Госпошлина",
                "type": "money",
                "required": false,
                "placeholder": "0"
            },
            {
                "id": "otherAwardedAmount",
                "label": "Иные взысканные суммы",
                "type": "money",
                "required": false,
                "placeholder": "0"
            },
            {
                "id": "recipientName",
                "label": "Получатель средств",
                "type": "text",
                "required": true,
                "placeholder": ""
            },
            {
                "id": "recipientBankName",
                "label": "Банк получателя",
                "type": "text",
                "required": true,
                "placeholder": "АО «Альфа-Банк»"
            },
            {
                "id": "bankRecipientAccount",
                "label": "bankRecipientAccount",
                "type": "text",
                "required": true,
                "placeholder": "40817810099910001234"
            },
            {
                "id": "bankBik",
                "label": "БИК банка получателя",
                "type": "text",
                "required": true,
                "placeholder": "044525593"
            },
            {
                "id": "enforcementDocumentPages",
                "label": "Листов в оригинале исполнительного документа",
                "type": "number",
                "required": true,
                "placeholder": "2"
            },
            {
                "id": "includeClaimantPassportCopy",
                "label": "Приложить копию паспорта взыскателя",
                "type": "radio",
                "required": false,
                "options": [
                    "yes",
                    "no"
                ]
            },
            {
                "id": "claimantPassportCopyPages",
                "label": "Листов в копии паспорта",
                "type": "number",
                "required": true,
                "placeholder": "2"
            },
            {
                "id": "includeRepresentativePower",
                "label": "Приложить доверенность представителя",
                "type": "radio",
                "required": false,
                "options": [
                    "yes",
                    "no"
                ]
            },
            {
                "id": "representativePowerPages",
                "label": "Листов в доверенности",
                "type": "number",
                "required": true,
                "placeholder": "1"
            },
            {
                "id": "includeOtherDocuments",
                "label": "Приложить иные документы",
                "type": "radio",
                "required": false,
                "options": [
                    "yes",
                    "no"
                ]
            },
            {
                "id": "otherDocument1Description",
                "label": "Иной документ 1",
                "type": "text",
                "required": true,
                "placeholder": "укажите название документа"
            },
            {
                "id": "otherDocument1Pages",
                "label": "Листов в ином документе 1",
                "type": "number",
                "required": true,
                "placeholder": "1"
            },
            {
                "id": "addOtherDocument2",
                "label": "Добавить еще иной документ",
                "type": "radio",
                "required": false,
                "options": [
                    "yes",
                    "no"
                ]
            },
            {
                "id": "otherDocument2Description",
                "label": "Иной документ 2",
                "type": "text",
                "required": true,
                "placeholder": "укажите название документа"
            },
            {
                "id": "otherDocument2Pages",
                "label": "Листов в ином документе 2",
                "type": "number",
                "required": true,
                "placeholder": "1"
            },
            {
                "id": "addOtherDocument3",
                "label": "Добавить еще иной документ",
                "type": "radio",
                "required": false,
                "options": [
                    "yes",
                    "no"
                ]
            },
            {
                "id": "otherDocument3Description",
                "label": "Иной документ 3",
                "type": "text",
                "required": true,
                "placeholder": "укажите название документа"
            },
            {
                "id": "otherDocument3Pages",
                "label": "Листов в ином документе 3",
                "type": "number",
                "required": true,
                "placeholder": "1"
            },
            {
                "id": "addOtherDocument4",
                "label": "Добавить еще иной документ",
                "type": "radio",
                "required": false,
                "options": [
                    "yes",
                    "no"
                ]
            },
            {
                "id": "otherDocument4Description",
                "label": "Иной документ 4",
                "type": "text",
                "required": true,
                "placeholder": "укажите название документа"
            },
            {
                "id": "otherDocument4Pages",
                "label": "Листов в ином документе 4",
                "type": "number",
                "required": true,
                "placeholder": "1"
            },
            {
                "id": "addOtherDocument5",
                "label": "Добавить еще иной документ",
                "type": "radio",
                "required": false,
                "options": [
                    "yes",
                    "no"
                ]
            },
            {
                "id": "otherDocument5Description",
                "label": "Иной документ 5",
                "type": "text",
                "required": true,
                "placeholder": "укажите название документа"
            },
            {
                "id": "otherDocument5Pages",
                "label": "Листов в ином документе 5",
                "type": "number",
                "required": true,
                "placeholder": "1"
            }
        ],
        "sampleValues": {
            "documentDate": "2026-05-16",
            "targetBankName": "ПАО Сбербанк",
            "targetBankAddress": "",
            "claimantHeaderFullName": "Соколова Марина Викторовна",
            "claimantFullName": "Соколова Марина Викторовна",
            "claimantAddress": "г. Тюмень, ул. Холодильная, д. 77, кв. 14",
            "claimantPhone": "+7 922 345-67-10",
            "claimantEmail": "sokolova.demo@example.com",
            "debtorType": "individual",
            "debtorFullName": "Кузнецов Артем Павлович",
            "debtorFullNameGenitive": "Кузнецова Артема Павловича",
            "debtorLegalName": "",
            "debtorInnOrOgrn": "",
            "debtorAddress": "г. Тюмень, ул. Монтажников, д. 23",
            "enforcementDocumentType": "writ",
            "writSeries": "ТС",
            "writNumber": "438291605",
            "writIssuedDate": "2026-04-28",
            "courtName": "Ленинским районным судом г. Тюмени",
            "caseNumber": "2-4187/2026",
            "claimAmountNumber": "184500",
            "claimAmountWords": "сто восемьдесят четыре тысячи пятьсот рублей",
            "principalDebtAmount": "170000",
            "penaltyAmount": "9500",
            "stateDutyAmount": "5000",
            "otherAwardedAmount": "",
            "recipientName": "Соколова Марина Викторовна",
            "recipientBankName": "АО «Альфа-Банк»",
            "bankRecipientAccount": "40817810099910001234",
            "bankBik": "044525593",
            "enforcementDocumentPages": "2",
            "includeClaimantPassportCopy": "yes",
            "claimantPassportCopyPages": "2",
            "includeRepresentativePower": "yes",
            "representativePowerPages": "1",
            "includeOtherDocuments": "no"
        },
        "seo": {
            "title": "Заявление о взыскании денежных средств по исполнительному документу в банк - заполнить и скачать",
            "description": "Заполните образец заявления о взыскании денежных средств по исполнительному документу в банк онлайн без ворда и ручной верстки. Укажите данные и сервис автоматически подготовит документ в PDF формате.",
            "keywords": [
                "заявление в банк по исполнительному документу",
                "заявление о взыскании денежных средств в банк",
                "предъявить исполнительный лист в банк образец",
                "заявление в банк по исполнительному листу",
                "заявление взыскателя в банк скачать pdf"
            ]
        },
        "page": {
            "suitableFor": [
                "у взыскателя есть исполнительный документ о взыскании денежных средств",
                "нужно предъявить документ напрямую в банк или кредитную организацию",
                "важно указать реквизиты взыскателя для перечисления денег",
                "нужно подготовить PDF для печати и подачи в банк"
            ],
            "notSuitableFor": [],
            "requiredData": [
                "название и адрес банка, куда подается заявление",
                "данные взыскателя: ФИО, адрес, телефон и e-mail",
                "тип исполнительного документа и его реквизиты",
                "сумма взыскания цифрами и прописью",
                "банковские реквизиты взыскателя для перечисления средств",
                "перечень приложений и количество листов"
            ],
            "howToFill": [
                "Укажите банк, адрес банка и данные взыскателя в шапке.",
                "Выберите, какой исполнительный документ предъявляется, чтобы текст и поля изменились автоматически.",
                "Укажите сумму взыскания и реквизиты для перечисления денег.",
                "Выберите приложения и проверьте предпросмотр перед скачиванием PDF."
            ],
            "afterDownload": [
                "Проверьте данные должника, сумму взыскания и банковские реквизиты взыскателя.",
                "Приложите оригинал исполнительного документа и выбранные приложения.",
                "Подайте комплект в банк и сохраните подтверждение подачи."
            ],
            "articleSections": [
                {
                    "title": "Заявление в банк по исполнительному документу простыми словами",
                    "paragraphs": [
                        "Это заявление помогает передать исполнительный документ прямо в банк должника. В нем банк видит, кто просит взыскать деньги, с кого нужно списать сумму, на какой счет перечислить деньги и какой документ приложен.",
                        "Конструктор задает вопросы по порядку и подставляет ответы в готовый текст, чтобы не собирать заявление вручную в Word."
                    ]
                },
                {
                    "title": "Чем подача в банк отличается от подачи приставам",
                    "paragraphs": [
                        "В банк обычно обращаются, когда взыскатель знает, где у должника открыт счет. В этом случае исполнительный документ можно предъявить напрямую в кредитную организацию.",
                        "К приставам чаще обращаются, когда банк должника неизвестен или нужны меры шире, чем списание денег со счета: розыск счетов, имущества, доходов и другие исполнительные действия."
                    ]
                },
                {
                    "title": "Что подготовить перед заполнением",
                    "paragraphs": [
                        "Положите рядом исполнительный документ, реквизиты банка должника, данные взыскателя, данные должника и реквизиты счета, на который нужно перечислить взысканные деньги.",
                        "Если какие-то дополнительные суммы не указаны в вашем исполнительном документе, их можно не заполнять: пустые пункты не попадут в итоговый текст."
                    ]
                },
                {
                    "title": "Подача в банк или обращение к приставам",
                    "paragraphs": [
                        "Подача в банк подходит, если известен банк должника и нужно взыскать деньги со счета.",
                        "Обращение к приставам может быть удобнее, если неизвестно, где у должника счета, или нужно искать имущество и доходы."
                    ]
                },
                {
                    "title": "Что приложить к заявлению",
                    "paragraphs": [
                        "Оригинал исполнительного документа обычно прикладывается к заявлению в банк.",
                        "Копия паспорта взыскателя, доверенность представителя и иные документы добавляются только при необходимости."
                    ]
                },
                {
                    "title": "Что проверить перед скачиванием PDF",
                    "paragraphs": [
                        "Проверьте название банка, данные взыскателя и должника, вид исполнительного документа, сумму, счет для перечисления и список приложений.",
                        "В готовом PDF не должно оставаться пустых мест в обязательных реквизитах."
                    ]
                }
            ],
            "faq": [
                {
                    "question": "Можно ли предъявить исполнительный лист сразу в банк?",
                    "answer": "Да, если исполнительный документ предусматривает взыскание денежных средств, взыскатель может предъявить его непосредственно в банк или иную кредитную организацию."
                },
                {
                    "question": "Подходит ли шаблон для судебного приказа?",
                    "answer": "Да. В конструкторе можно выбрать судебный приказ, и текст заявления изменится под его реквизиты."
                },
                {
                    "question": "Нужно ли прикладывать оригинал исполнительного документа?",
                    "answer": "В шаблоне оригинал исполнительного документа указывается как обязательное приложение. Перед подачей проверьте требования конкретного банка."
                }
            ],
            "relatedDocuments": [
                "Заявление о возбуждении исполнительного производства",
                "Заявление о ходе исполнительного производства"
            ]
        },
        "disclaimers": [
            "Документ является типовым шаблоном и не заменяет индивидуальную юридическую консультацию. Перед использованием проверьте данные и убедитесь, что документ подходит для вашей ситуации."
        ]
    },
    seoTemplate: bankEnforcementCollectionSeoTemplate,
  },
  {
    ...{
        "id": "enforcement-progress-info-request",
        "slug": "zayavlenie-o-hode-ispolnitelnogo-proizvodstva",
        "title": "Заявление о ходе исполнительного производства",
        "category": "Взыскание",
        "description": "Документ для запроса сведений о ходе исполнительного производства у судебного пристава.",
        "price": 49,
        "fields": [
            {
                "id": "documentDate",
                "label": "Дата заявления",
                "type": "date",
                "required": true
            },
            {
                "id": "ospName",
                "label": "Отдел судебных приставов",
                "type": "text",
                "required": true,
                "placeholder": "Ленинского района"
            },
            {
                "id": "ufsspRegion",
                "label": "Регион УФССП",
                "type": "text",
                "required": true,
                "placeholder": "Тюменской области"
            },
            {
                "id": "ospAddress",
                "label": "Адрес отдела приставов",
                "type": "address",
                "required": true,
                "placeholder": "г. Москва, ул. Бутырский Вал, д. 5"
            },
            {
                "id": "claimantHeaderFullName",
                "label": "ФИО взыскателя для строки «от взыскателя»",
                "type": "fullName",
                "required": true,
                "placeholder": "ФИО"
            },
            {
                "id": "claimantAddress",
                "label": "Адрес взыскателя в шапке",
                "type": "address",
                "required": true,
                "placeholder": "г. Тюмень, ул. Холодильная, д. 77, кв. 14"
            },
            {
                "id": "enforcementProceedingNumber",
                "label": "Номер исполнительного производства",
                "type": "text",
                "required": true,
                "placeholder": "12345/26/72001-ИП"
            },
            {
                "id": "enforcementDocumentName",
                "label": "Исполнительный документ",
                "type": "text",
                "required": true,
                "placeholder": "исполнительный лист"
            },
            {
                "id": "writSeries",
                "label": "writSeries",
                "type": "text",
                "required": true,
                "placeholder": "ФС"
            },
            {
                "id": "writNumber",
                "label": "Номер исполнительного документа",
                "type": "text",
                "required": true,
                "placeholder": "012345678"
            },
            {
                "id": "writIssuedDate",
                "label": "Дата выдачи исполнительного документа",
                "type": "date",
                "required": true
            },
            {
                "id": "enforcementBasis",
                "label": "Основание выдачи",
                "type": "text",
                "required": true,
                "placeholder": "решения Ленинского районного суда г. Тюмени"
            },
            {
                "id": "caseNumber",
                "label": "Номер дела",
                "type": "text",
                "required": true,
                "placeholder": "2-4187/2026"
            },
            {
                "id": "debtorFullName",
                "label": "ФИО должника",
                "type": "fullName",
                "required": true,
                "placeholder": "Кузнецов Артем Павлович"
            },
            {
                "id": "claimantFullName",
                "label": "ФИО взыскателя",
                "type": "fullName",
                "required": true,
                "placeholder": "Соколова Марина Викторовна"
            },
            {
                "id": "responseAddress",
                "label": "Адрес для ответа",
                "type": "address",
                "required": true,
                "placeholder": "г. Тюмень, ул. Холодильная, д. 77, кв. 14"
            },
            {
                "id": "claimantEmail",
                "label": "E-mail взыскателя",
                "type": "text",
                "required": true,
                "placeholder": "mail@example.com"
            },
            {
                "id": "claimantPhone",
                "label": "Телефон взыскателя",
                "type": "text",
                "required": true,
                "placeholder": "+7 922 345-67-10"
            },
            {
                "id": "includeEnforcementDocumentCopy",
                "label": "Приложить копию исполнительного документа или постановления",
                "type": "radio",
                "required": false,
                "options": [
                    "yes",
                    "no"
                ]
            },
            {
                "id": "includeClaimantStatusDocument",
                "label": "Приложить документ, подтверждающий статус взыскателя",
                "type": "radio",
                "required": false,
                "options": [
                    "yes",
                    "no"
                ]
            },
            {
                "id": "includeRepresentativePower",
                "label": "Приложить доверенность представителя",
                "type": "radio",
                "required": false,
                "options": [
                    "yes",
                    "no"
                ]
            },
            {
                "id": "includeOtherDocuments",
                "label": "Приложить иные документы",
                "type": "radio",
                "required": false,
                "options": [
                    "yes",
                    "no"
                ]
            },
            {
                "id": "enforcementDocumentCopyDescription",
                "label": "Название копии исполнительного документа или постановления",
                "type": "text",
                "required": true,
                "placeholder": "копия постановления о возбуждении исполнительного производства"
            },
            {
                "id": "enforcementDocumentCopyPages",
                "label": "Листов в копии исполнительного документа или постановления",
                "type": "number",
                "required": true,
                "placeholder": "1"
            },
            {
                "id": "claimantStatusDocumentDescription",
                "label": "Название документа о статусе взыскателя",
                "type": "text",
                "required": true,
                "placeholder": "документ, подтверждающий статус взыскателя"
            },
            {
                "id": "claimantStatusDocumentPages",
                "label": "Листов в документе о статусе взыскателя",
                "type": "number",
                "required": true,
                "placeholder": "1"
            },
            {
                "id": "representativePowerDescription",
                "label": "Название доверенности представителя",
                "type": "text",
                "required": true,
                "placeholder": "доверенность представителя"
            },
            {
                "id": "representativePowerPages",
                "label": "Листов в доверенности представителя",
                "type": "number",
                "required": true,
                "placeholder": "1"
            },
            {
                "id": "otherDocument1Description",
                "label": "Иной документ 1",
                "type": "text",
                "required": true,
                "placeholder": "укажите название документов"
            },
            {
                "id": "otherDocument1Pages",
                "label": "Листов в ином документе 1",
                "type": "number",
                "required": true,
                "placeholder": "1"
            },
            {
                "id": "addOtherDocument2",
                "label": "Добавить еще иной документ",
                "type": "radio",
                "required": false,
                "options": [
                    "yes",
                    "no"
                ]
            },
            {
                "id": "otherDocument2Description",
                "label": "Иной документ 2",
                "type": "text",
                "required": true,
                "placeholder": "укажите название документа"
            },
            {
                "id": "otherDocument2Pages",
                "label": "Листов в ином документе 2",
                "type": "number",
                "required": true,
                "placeholder": "1"
            },
            {
                "id": "addOtherDocument3",
                "label": "Добавить еще иной документ",
                "type": "radio",
                "required": false,
                "options": [
                    "yes",
                    "no"
                ]
            },
            {
                "id": "otherDocument3Description",
                "label": "Иной документ 3",
                "type": "text",
                "required": true,
                "placeholder": "укажите название документа"
            },
            {
                "id": "otherDocument3Pages",
                "label": "Листов в ином документе 3",
                "type": "number",
                "required": true,
                "placeholder": "1"
            },
            {
                "id": "addOtherDocument4",
                "label": "Добавить еще иной документ",
                "type": "radio",
                "required": false,
                "options": [
                    "yes",
                    "no"
                ]
            },
            {
                "id": "otherDocument4Description",
                "label": "Иной документ 4",
                "type": "text",
                "required": true,
                "placeholder": "укажите название документа"
            },
            {
                "id": "otherDocument4Pages",
                "label": "Листов в ином документе 4",
                "type": "number",
                "required": true,
                "placeholder": "1"
            },
            {
                "id": "addOtherDocument5",
                "label": "Добавить еще иной документ",
                "type": "radio",
                "required": false,
                "options": [
                    "yes",
                    "no"
                ]
            },
            {
                "id": "otherDocument5Description",
                "label": "Иной документ 5",
                "type": "text",
                "required": true,
                "placeholder": "укажите название документа"
            },
            {
                "id": "otherDocument5Pages",
                "label": "Листов в ином документе 5",
                "type": "number",
                "required": true,
                "placeholder": "1"
            }
        ],
        "sampleValues": {
            "documentDate": "2026-05-16",
            "ospName": "Ленинского района",
            "ufsspRegion": "Тюменской области",
            "ospAddress": "г. Москва, ул. Бутырский Вал, д. 5",
            "claimantHeaderFullName": "Соколова Марина Викторовна",
            "claimantAddress": "г. Тюмень, ул. Холодильная, д. 77, кв. 14",
            "enforcementProceedingNumber": "12345/26/72001-ИП",
            "enforcementDocumentName": "исполнительный лист",
            "writSeries": "ФС",
            "writNumber": "012345678",
            "writIssuedDate": "2026-04-28",
            "enforcementBasis": "решения Ленинского районного суда г. Тюмени",
            "caseNumber": "2-4187/2026",
            "debtorFullName": "Кузнецов Артем Павлович",
            "claimantFullName": "Соколова Марина Викторовна",
            "responseAddress": "г. Тюмень, ул. Холодильная, д. 77, кв. 14",
            "claimantEmail": "sokolova.demo@example.com",
            "claimantPhone": "+7 922 345-67-10",
            "includeEnforcementDocumentCopy": "yes",
            "enforcementDocumentCopyDescription": "копия постановления о возбуждении исполнительного производства",
            "enforcementDocumentCopyPages": "2",
            "includeClaimantStatusDocument": "yes",
            "claimantStatusDocumentDescription": "копия паспорта взыскателя и документы, подтверждающие статус взыскателя",
            "claimantStatusDocumentPages": "3",
            "includeRepresentativePower": "yes",
            "representativePowerDescription": "доверенность представителя",
            "representativePowerPages": "1",
            "includeOtherDocuments": "yes",
            "otherDocument1Description": "копия переписки с судебным приставом",
            "otherDocument1Pages": "2",
            "addOtherDocument2": "yes",
            "otherDocument2Description": "копия заявления о розыске счетов должника",
            "otherDocument2Pages": "1",
            "addOtherDocument3": "no"
        },
        "seo": {
            "title": "Заявление о ходе исполнительного производства - заполнить и скачать",
            "description": "Заполните образец заявления о ходе исполнительного производства онлайн без ворда и ручной верстки. Укажите данные и сервис автоматически подготовит документ в PDF формате.",
            "keywords": [
                "заявление о ходе исполнительного производства",
                "заявление приставу о ходе исполнительного производства",
                "заявление о предоставлении информации приставам",
                "образец заявления о ходе исполнительного производства",
                "заявление в фссп скачать pdf"
            ]
        },
        "page": {
            "suitableFor": [
                "исполнительное производство уже возбуждено",
                "взыскатель хочет узнать, какие действия совершил пристав",
                "нужно запросить сведения о поступлениях, запросах и причинах неисполнения"
            ],
            "notSuitableFor": [
                "нужно впервые возбудить исполнительное производство",
                "нужно обжаловать постановление или бездействие пристава",
                "нужно составить сложную жалобу с индивидуальными требованиями"
            ],
            "requiredData": [
                "номер исполнительного производства",
                "название, серия, номер и дата исполнительного документа",
                "основание выдачи и номер дела",
                "ФИО должника и взыскателя",
                "адрес, e-mail и телефон взыскателя для ответа",
                "какие приложения заявитель хочет приложить"
            ],
            "howToFill": [
                "Заполните реквизиты исполнительного документа и судебного дела.",
                "Внесите ФИО должника и взыскателя.",
                "Укажите адрес и электронную почту, куда нужно направить ответ.",
                "Выберите, какие приложения заявитель хочет приложить к заявлению.",
                "Проверьте предпросмотр и скачайте PDF с водяным знаком перед оплатой чистой версии."
            ],
            "afterDownload": [
                "Приложите только те документы, которые выбраны в разделе приложений."
            ],
            "articleSections": [
                {
                    "title": "Заявление о ходе исполнительного производства",
                    "paragraphs": [
                        "Заявление о ходе исполнительного производства подают, когда производство уже возбуждено, а взыскателю нужен письменный ответ о том, что происходит по делу.",
                        "Онлайн-конструктор помогает перенести данные в типовой текст и сформировать PDF без ручной верстки."
                    ]
                },
                {
                    "title": "Что можно запросить у пристава",
                    "paragraphs": [
                        "В заявлении можно запросить сведения о текущем состоянии производства, совершенных исполнительных действиях, мерах принудительного исполнения, направленных запросах, поступивших денежных средствах и причинах неисполнения требований исполнительного документа."
                    ]
                },
                {
                    "title": "Какие данные нужны для заполнения",
                    "paragraphs": [
                        "Перед заполнением удобно открыть постановление о возбуждении исполнительного производства, исполнительный документ и данные взыскателя для ответа.",
                        "Если часть сведений неизвестна, их лучше сначала сверить с постановлением пристава или материалами дела."
                    ]
                },
                {
                    "title": "Заявление и жалоба приставу",
                    "paragraphs": [
                        "Заявление о предоставлении информации просит сообщить сведения о ходе производства. Оно не заменяет жалобу на постановление, действие или бездействие пристава.",
                        "Если нужно требовать признания бездействия незаконным или отмены постановления, может понадобиться отдельная жалоба с другими формулировками."
                    ]
                },
                {
                    "title": "Подача лично или почтой",
                    "paragraphs": [
                        "При личной подаче удобно иметь второй экземпляр заявления для отметки о принятии.",
                        "При отправке почтой стоит сохранить чек, трек-номер и опись вложения, если она оформлялась."
                    ]
                },
                {
                    "title": "Что проверить перед скачиванием PDF",
                    "paragraphs": [
                        "Перед скачиванием проверьте адресата, данные сторон, адрес для ответа, e-mail, телефон и выбранные приложения.",
                        "В готовом PDF не должно оставаться пустых мест вместо важных реквизитов."
                    ]
                },
                {
                    "title": "Что проверить перед подачей приставам",
                    "paragraphs": [
                        "После скачивания PDF сравните заявление с постановлением о возбуждении исполнительного производства и исполнительным документом. Затем распечатайте документ, подпишите его и подготовьте приложения при наличии."
                    ]
                }
            ],
            "faq": [
                {
                    "question": "Когда подают заявление о ходе исполнительного производства?",
                    "answer": "Когда исполнительное производство уже возбуждено и взыскатель хочет получить сведения о текущем состоянии дела, действиях пристава и причинах отсутствия исполнения."
                },
                {
                    "question": "Можно ли запросить информацию о перечисленных деньгах?",
                    "answer": "Да. В шаблоне есть пункт о поступивших денежных средствах и произведенных перечислениях взыскателю."
                },
                {
                    "question": "Нужно ли прикладывать исполнительный документ?",
                    "answer": "В приложениях указана копия исполнительного документа или постановления о возбуждении производства при наличии. Перед подачей проверьте требования конкретного отдела."
                },
                {
                    "question": "Что такое исполнительный документ и какие они бывают?",
                    "answer": "Исполнительный документ - это документ, на основании которого пристав ведет взыскание. Чаще всего это исполнительный лист, судебный приказ, нотариальное соглашение об алиментах, исполнительная надпись нотариуса, удостоверение комиссии по трудовым спорам или постановление уполномоченного органа. Копию прикладывают, чтобы пристав быстрее сверил реквизиты производства, номер дела, основание взыскания и данные сторон."
                },
                {
                    "question": "Это жалоба на пристава?",
                    "answer": "Нет. Это типовое заявление о предоставлении информации. Для обжалования действий или бездействия пристава обычно используют другой документ."
                }
            ],
            "relatedDocuments": [
                "Заявление о возбуждении исполнительного производства",
                "Жалоба на бездействие судебного пристава"
            ]
        },
        "disclaimers": [
            "Документ является типовым шаблоном и не заменяет индивидуальную юридическую консультацию. Перед использованием проверьте данные и убедитесь, что документ подходит для вашей ситуации."
        ]
    },
    seoTemplate: enforcementProgressInfoSeoTemplate,
  },
  {
    ...{
        "id": "simple-power-of-attorney",
        "slug": "nenotarialnaya-doverennost",
        "title": "Доверенность",
        "category": "Полномочия и представительство",
        "description": "Простая письменная доверенность для бытовых и административных действий без нотариуса.",
        "price": 49,
        "fields": [
            {
                "id": "targetType",
                "label": "Куда нужна доверенность",
                "type": "radio",
                "required": true
            },
            {
                "id": "targetName",
                "label": "Наименование органа или адрес отделения",
                "type": "text",
                "required": true,
                "placeholder": "например: Департамент городского имущества города Москвы",
                "helpText": "Для госоргана укажите наименование органа, для почты — адрес отделения."
            },
            {
                "id": "postOfficeDepartment",
                "label": "Отделение почтовой связи",
                "type": "text",
                "required": true,
                "placeholder": "например: № 101000"
            },
            {
                "id": "governmentDisputeSubject",
                "label": "Предмет спора и стороны",
                "type": "textarea",
                "required": true,
                "placeholder": "подробно опишите предмет спора и стороны"
            },
            {
                "id": "city",
                "label": "Город составления",
                "type": "text",
                "required": true,
                "placeholder": "Москва"
            },
            {
                "id": "documentDate",
                "label": "Дата подписания",
                "type": "date",
                "required": true
            },
            {
                "id": "validForNumber",
                "label": "Срок доверенности: число",
                "type": "number",
                "required": true,
                "placeholder": "1"
            },
            {
                "id": "validForWords",
                "label": "Срок доверенности: прописью",
                "type": "text",
                "required": true,
                "placeholder": "один"
            },
            {
                "id": "validForUnit",
                "label": "Срок доверенности: единица",
                "type": "select",
                "required": true,
                "options": [
                    "год",
                    "месяц",
                    "день"
                ]
            },
            {
                "id": "validUntil",
                "label": "Дата действия до",
                "type": "date",
                "required": true
            },
            {
                "id": "validUntilInclusive",
                "label": "Окончание срока",
                "type": "select",
                "required": true,
                "options": [
                    "включительно",
                    "не указывать"
                ]
            },
            {
                "id": "validFor",
                "label": "Срок доверенности",
                "required": true,
                "placeholder": "1 (один) год",
                "type": "text"
            },
            {
                "id": "principalStatus",
                "label": "Статус доверителя",
                "type": "radio",
                "required": true
            },
            {
                "id": "principalNamingGender",
                "label": "Поле «именуемый» для доверителя",
                "type": "radio",
                "required": true
            },
            {
                "id": "principalFullName",
                "label": "ФИО доверителя",
                "type": "fullName",
                "required": true,
                "placeholder": "Иванов Иван Иванович"
            },
            {
                "id": "principalBirthDate",
                "label": "Дата рождения доверителя",
                "type": "date",
                "required": true
            },
            {
                "id": "principalPassportSeries",
                "label": "Серия паспорта доверителя",
                "type": "text",
                "required": true,
                "placeholder": "45 01"
            },
            {
                "id": "principalPassportNumber",
                "label": "Номер паспорта доверителя",
                "type": "text",
                "required": true,
                "placeholder": "123456"
            },
            {
                "id": "principalPassportIssuedBy",
                "label": "Кем выдан паспорт доверителя",
                "type": "text",
                "required": true,
                "placeholder": "ОВД района Арбат города Москвы"
            },
            {
                "id": "principalPassportIssuedDate",
                "label": "Дата выдачи паспорта доверителя",
                "type": "date",
                "required": true
            },
            {
                "id": "principalAddress",
                "label": "Адрес регистрации доверителя",
                "type": "address",
                "required": true,
                "placeholder": "г. Москва, ул. Тверская, д. 10, кв. 15"
            },
            {
                "id": "principalOgrnip",
                "label": "principalOgrnip",
                "type": "text",
                "required": true,
                "placeholder": "316774600000000"
            },
            {
                "id": "principalInn",
                "label": "ИНН доверителя",
                "type": "text",
                "required": true,
                "placeholder": "770100000000"
            },
            {
                "id": "principalOrganizationName",
                "label": "Наименование доверителя",
                "type": "text",
                "required": true,
                "placeholder": ""
            },
            {
                "id": "principalOrganizationOgrn",
                "label": "principalOrganizationOgrn",
                "type": "text",
                "required": true,
                "placeholder": "1237700000000"
            },
            {
                "id": "principalOrganizationInn",
                "label": "ИНН доверителя",
                "type": "text",
                "required": true,
                "placeholder": "7701000000"
            },
            {
                "id": "principalSignerPosition",
                "label": "Должность подписанта",
                "type": "text",
                "required": true,
                "placeholder": "генеральный директор"
            },
            {
                "id": "principalSignerFullName",
                "label": "ФИО подписанта",
                "type": "fullName",
                "required": true,
                "placeholder": "Иванов Иван Иванович"
            },
            {
                "id": "principalSignerBasis",
                "label": "Основание полномочий подписанта",
                "type": "text",
                "required": true,
                "placeholder": "Устава"
            },
            {
                "id": "representativeFullName",
                "label": "ФИО доверенного лица",
                "type": "fullName",
                "required": true,
                "placeholder": "Петров Петр Петрович"
            },
            {
                "id": "representativeBirthDate",
                "label": "Дата рождения доверенного лица",
                "type": "date",
                "required": true
            },
            {
                "id": "representativePassportSeries",
                "label": "Серия паспорта доверенного лица",
                "type": "text",
                "required": true,
                "placeholder": "45 02"
            },
            {
                "id": "representativePassportNumber",
                "label": "Номер паспорта доверенного лица",
                "type": "text",
                "required": true,
                "placeholder": "654321"
            },
            {
                "id": "representativePassportIssuedBy",
                "label": "Кем выдан паспорт доверенного лица",
                "type": "text",
                "required": true,
                "placeholder": "ОВД района Хамовники города Москвы"
            },
            {
                "id": "representativePassportIssuedDate",
                "label": "Дата выдачи паспорта доверенного лица",
                "type": "date",
                "required": true
            },
            {
                "id": "representativeAddress",
                "label": "Адрес регистрации доверенного лица",
                "type": "address",
                "required": true,
                "placeholder": "г. Москва, ул. Лесная, д. 5, кв. 8"
            },
            {
                "id": "representativeNamingGender",
                "label": "Поле «именуемый» для поверенного",
                "type": "radio",
                "required": true
            },
            {
                "id": "powerSubmitDocuments",
                "label": "Подавать заявления и документы",
                "type": "radio",
                "required": true
            },
            {
                "id": "powerReceiveDocuments",
                "label": "Получать документы и результаты услуг",
                "type": "radio",
                "required": true
            },
            {
                "id": "powerProvideInformation",
                "label": "Передавать сведения и пояснения",
                "type": "radio",
                "required": true
            },
            {
                "id": "powerMakePayments",
                "label": "Осуществлять оплату за счет доверителя",
                "type": "radio",
                "required": true
            },
            {
                "id": "hasDelegationRight",
                "label": "Право передоверия",
                "type": "radio",
                "required": true
            },
            {
                "id": "includeRepresentativeSignature",
                "label": "Указывается подпись поверенного",
                "type": "radio",
                "required": true
            },
            {
                "id": "powerSignForReceipt",
                "label": "Подписывать и получать документы",
                "type": "radio",
                "required": true
            },
            {
                "id": "powerInteractWithOfficials",
                "label": "Общаться с сотрудниками органа",
                "type": "radio",
                "required": true
            },
            {
                "id": "powerReceivePostalItems",
                "label": "Получать почтовые отправления",
                "type": "radio",
                "required": true
            },
            {
                "id": "powerFsspMaterials",
                "label": "Знакомиться с материалами у приставов",
                "type": "radio",
                "required": true
            },
            {
                "id": "includeOtherActions",
                "label": "Добавить иные действия",
                "type": "radio",
                "required": true
            },
            {
                "id": "otherAction1",
                "label": "Иное действие 1",
                "type": "textarea",
                "required": true,
                "placeholder": "например: получать копии постановлений, справок и иных документов"
            },
            {
                "id": "addOtherAction2",
                "label": "Добавить еще одно иное действие",
                "type": "radio",
                "required": true
            },
            {
                "id": "otherAction2",
                "label": "Иное действие 2",
                "type": "textarea",
                "required": true,
                "placeholder": "Опишите действие своими словами"
            },
            {
                "id": "addOtherAction3",
                "label": "Добавить еще одно иное действие",
                "type": "radio",
                "required": true
            },
            {
                "id": "otherAction3",
                "label": "Иное действие 3",
                "type": "textarea",
                "required": true,
                "placeholder": "Опишите действие своими словами"
            },
            {
                "id": "addOtherAction4",
                "label": "Добавить еще одно иное действие",
                "type": "radio",
                "required": true
            },
            {
                "id": "otherAction4",
                "label": "Иное действие 4",
                "type": "textarea",
                "required": true,
                "placeholder": "Опишите действие своими словами"
            },
            {
                "id": "addOtherAction5",
                "label": "Добавить еще одно иное действие",
                "type": "radio",
                "required": true
            },
            {
                "id": "otherAction5",
                "label": "Иное действие 5",
                "type": "textarea",
                "required": true,
                "placeholder": "Опишите действие своими словами"
            }
        ],
        "constructorSteps": [
            {
                "id": "target-type",
                "type": "choice",
                "progressLabel": "Орган",
                "title": "Для чего нужна доверенность?",
                "description": "Выберите, куда доверенное лицо будет обращаться. От этого зависит подсказка по полномочиям и ограничениям.",
                "fieldId": "targetType",
                "options": [
                    {
                        "value": "government",
                        "label": "Госорган",
                        "description": "Для представления интересов в государственном или муниципальном органе.",
                        "resultText": "В доверенности будет указано представление интересов в государственном или муниципальном органе по описанному спору."
                    },
                    {
                        "value": "post",
                        "label": "Почта",
                        "description": "Для получения писем, посылок, уведомлений и иных отправлений.",
                        "resultText": "В доверенности появятся почтовые полномочия. Отделение связи может попросить паспорт доверенного лица и оригинал доверенности."
                    },
                    {
                        "value": "other",
                        "label": "Другое",
                        "description": "Если доверенность нужна не для почты и не для госоргана.",
                        "resultText": "Вы сможете самостоятельно указать орган, организацию или другое место, куда нужна доверенность."
                    }
                ]
            },
            {
                "id": "target-name",
                "type": "fieldGroup",
                "progressLabel": "Адресат",
                "title": "Куда именно будет обращаться доверенное лицо?",
                "description": "Напишите название органа, отделения или организации. Это поможет сделать текст доверенности понятным для принимающей стороны.",
                "fields": [
                    "targetName",
                    "governmentDisputeSubject"
                ],
                "visibleWhen": {
                    "fieldId": "targetType",
                    "equals": "government"
                }
            },
            {
                "id": "target-post-name",
                "type": "fieldGroup",
                "progressLabel": "Почта",
                "title": "В каком отделении почты будет действовать поверенный?",
                "description": "Укажите номер или название отделения почтовой связи и его адрес.",
                "fields": [
                    "postOfficeDepartment",
                    "targetName"
                ],
                "visibleWhen": {
                    "fieldId": "targetType",
                    "equals": "post"
                }
            },
            {
                "id": "target-other-name",
                "type": "fieldGroup",
                "progressLabel": "Адресат",
                "title": "Куда нужна доверенность?",
                "description": "Укажите орган, организацию или другое место, если готовые варианты не подходят.",
                "fields": [
                    "targetName"
                ],
                "visibleWhen": {
                    "fieldId": "targetType",
                    "equals": "other"
                }
            },
            {
                "id": "document-details",
                "type": "fieldGroup",
                "progressLabel": "Документ",
                "title": "Где и когда подписывается доверенность?",
                "description": "Укажите город, дату подписания и срок действия. Без даты доверенность могут не принять.",
                "fields": [
                    "city",
                    "documentDate",
                    "validForNumber",
                    "validForWords",
                    "validForUnit",
                    "validUntil",
                    "validUntilInclusive"
                ]
            },
            {
                "id": "principal-status",
                "type": "choice",
                "progressLabel": "Доверитель",
                "title": "Кто выдает доверенность?",
                "fieldId": "principalStatus",
                "options": [
                    {
                        "value": "person",
                        "label": "Физическое лицо",
                        "description": "Доверенность выдает обычный гражданин от своего имени."
                    },
                    {
                        "value": "ip",
                        "label": "Индивидуальный предприниматель",
                        "description": "Доверенность выдает ИП, который действует от своего имени."
                    },
                    {
                        "value": "organization",
                        "label": "Юридическое лицо",
                        "description": "Доверенность выдает организация через руководителя или иного подписанта."
                    }
                ]
            },
            {
                "id": "principal",
                "type": "fieldGroup",
                "progressLabel": "Доверитель",
                "title": "Данные доверителя",
                "description": "Доверитель - это человек, который поручает другому лицу выполнить действия от своего имени.",
                "fields": [
                    "principalFullName",
                    "principalBirthDate",
                    "principalPassportSeries",
                    "principalPassportNumber",
                    "principalPassportIssuedBy",
                    "principalPassportIssuedDate",
                    "principalAddress",
                    "principalNamingGender"
                ],
                "visibleWhen": {
                    "fieldId": "principalStatus",
                    "equals": "person"
                }
            },
            {
                "id": "principal-ip",
                "type": "fieldGroup",
                "progressLabel": "Доверитель",
                "title": "Данные индивидуального предпринимателя",
                "description": "",
                "fields": [
                    "principalFullName",
                    "principalBirthDate",
                    "principalPassportSeries",
                    "principalPassportNumber",
                    "principalPassportIssuedBy",
                    "principalPassportIssuedDate",
                    "principalAddress",
                    "principalOgrnip",
                    "principalInn",
                    "principalNamingGender"
                ],
                "visibleWhen": {
                    "fieldId": "principalStatus",
                    "equals": "ip"
                }
            },
            {
                "id": "principal-organization",
                "type": "fieldGroup",
                "progressLabel": "Доверитель",
                "title": "Данные юридического лица",
                "description": "Укажите реквизиты организации и подписанта, который действует от ее имени.",
                "fields": [
                    "principalOrganizationName",
                    "principalOrganizationOgrn",
                    "principalOrganizationInn",
                    "principalSignerPosition",
                    "principalSignerFullName",
                    "principalSignerBasis"
                ],
                "visibleWhen": {
                    "fieldId": "principalStatus",
                    "equals": "organization"
                }
            },
            {
                "id": "representative",
                "type": "fieldGroup",
                "progressLabel": "Доверенное лицо",
                "title": "Кому доверяете действия?",
                "description": "Укажите данные человека, который будет предъявлять доверенность и свой паспорт в органе или организации.",
                "fields": [
                    "representativeFullName",
                    "representativeBirthDate",
                    "representativePassportSeries",
                    "representativePassportNumber",
                    "representativePassportIssuedBy",
                    "representativePassportIssuedDate",
                    "representativeAddress",
                    "representativeNamingGender"
                ]
            },
            {
                "id": "power-submit-documents",
                "type": "choice",
                "progressLabel": "Полномочия",
                "title": "Шаг документа",
                "fieldId": "powerSubmitDocuments",
                "options": [
                    {
                        "value": true,
                        "label": "Да",
                        "description": "Доверенное лицо сможет подать заявление, обращение, запрос или комплект документов."
                    },
                    {
                        "value": false,
                        "label": "Нет",
                        "description": "Этого полномочия не будет в тексте."
                    }
                ]
            },
            {
                "id": "power-receive-documents",
                "type": "choice",
                "progressLabel": "Полномочия",
                "title": "Шаг документа",
                "fieldId": "powerReceiveDocuments",
                "options": [
                    {
                        "value": true,
                        "label": "Да",
                        "description": "Подходит для справок, выписок, уведомлений, ответов и результатов услуг."
                    },
                    {
                        "value": false,
                        "label": "Нет",
                        "description": "Получение документов не будет указано."
                    }
                ]
            },
            {
                "id": "power-provide-information",
                "type": "choice",
                "progressLabel": "Полномочия",
                "title": "Шаг документа",
                "fieldId": "powerProvideInformation",
                "options": [
                    {
                        "value": true,
                        "label": "Да",
                        "description": "Доверенное лицо сможет передать недостающие сведения, копии и пояснения по поручению."
                    },
                    {
                        "value": false,
                        "label": "Нет",
                        "description": "В доверенности не будет такого пункта."
                    }
                ]
            },
            {
                "id": "power-sign-receipt",
                "type": "choice",
                "progressLabel": "Подпись",
                "title": "Шаг документа",
                "fieldId": "powerSignForReceipt",
                "options": [
                    {
                        "value": true,
                        "label": "Да",
                        "description": "Полезно для МФЦ, почты и органов, где просят подпись за получение документа."
                    },
                    {
                        "value": false,
                        "label": "Нет",
                        "description": "Доверенное лицо не получит это полномочие."
                    }
                ]
            },
            {
                "id": "power-interaction",
                "type": "choice",
                "progressLabel": "Общение",
                "title": "Шаг документа",
                "fieldId": "powerInteractWithOfficials",
                "options": [
                    {
                        "value": true,
                        "label": "Да",
                        "description": "В текст попадет право представлять интересы при взаимодействии с сотрудниками органа."
                    },
                    {
                        "value": false,
                        "label": "Нет",
                        "description": "Оставим только выбранные конкретные действия."
                    }
                ]
            },
            {
                "id": "power-postal",
                "type": "choice",
                "progressLabel": "Почта",
                "title": "Нужно получать почтовые отправления?",
                "fieldId": "powerReceivePostalItems",
                "options": [
                    {
                        "value": true,
                        "label": "Да",
                        "description": "Добавим письма, заказные письма, бандероли, посылки, уведомления и извещения."
                    },
                    {
                        "value": false,
                        "label": "Нет",
                        "description": "Почтовые отправления не будут указаны."
                    }
                ]
            },
            {
                "id": "power-fssp",
                "type": "choice",
                "progressLabel": "ФССП",
                "title": "Нужно знакомиться с материалами у приставов?",
                "fieldId": "powerFsspMaterials",
                "options": [
                    {
                        "value": true,
                        "label": "Да",
                        "description": "Добавим право знакомиться с материалами исполнительного производства, делать выписки и получать копии."
                    },
                    {
                        "value": false,
                        "label": "Нет",
                        "description": "Материалы у приставов не будут указаны."
                    }
                ]
            },
            {
                "id": "include-other-actions",
                "type": "choice",
                "progressLabel": "Иное",
                "title": "Добавить иные действия своими словами?",
                "description": "Если нужного полномочия нет в списке, добавьте его короткой фразой. После каждого пункта можно добавить еще один.",
                "fieldId": "includeOtherActions",
                "options": [
                    {
                        "value": true,
                        "label": "Да",
                        "description": "Откроется поле для своего полномочия."
                    },
                    {
                        "value": false,
                        "label": "Нет",
                        "description": "Иные действия не добавляем."
                    }
                ]
            },
            {
                "id": "other-action-1",
                "type": "fieldGroup",
                "progressLabel": "Иное 1",
                "title": "Какое еще действие доверяете?",
                "fields": [
                    "otherAction1"
                ],
                "visibleWhen": {
                    "fieldId": "includeOtherActions",
                    "equals": true
                }
            },
            {
                "id": "add-other-action-2",
                "type": "choice",
                "progressLabel": "Иное",
                "title": "Добавить еще иное действие?",
                "fieldId": "addOtherAction2",
                "visibleWhen": {
                    "fieldId": "includeOtherActions",
                    "equals": true
                },
                "options": [
                    {
                        "value": "yes",
                        "label": "Да",
                        "description": "Добавим еще один пункт."
                    },
                    {
                        "value": "no",
                        "label": "Нет",
                        "description": "Остановимся на этом списке."
                    }
                ]
            },
            {
                "id": "other-action-2",
                "type": "fieldGroup",
                "progressLabel": "Иное 2",
                "title": "Опишите второе иное действие",
                "fields": [
                    "otherAction2"
                ],
                "visibleWhen": {
                    "fieldId": "addOtherAction2",
                    "equals": "yes"
                }
            },
            {
                "id": "add-other-action-3",
                "type": "choice",
                "progressLabel": "Иное",
                "title": "Добавить еще иное действие?",
                "fieldId": "addOtherAction3",
                "visibleWhen": {
                    "fieldId": "addOtherAction2",
                    "equals": "yes"
                },
                "options": [
                    {
                        "value": "yes",
                        "label": "Да",
                        "description": "Добавим еще один пункт."
                    },
                    {
                        "value": "no",
                        "label": "Нет",
                        "description": "Остановимся на этом списке."
                    }
                ]
            },
            {
                "id": "other-action-3",
                "type": "fieldGroup",
                "progressLabel": "Иное 3",
                "title": "Опишите третье иное действие",
                "fields": [
                    "otherAction3"
                ],
                "visibleWhen": {
                    "fieldId": "addOtherAction3",
                    "equals": "yes"
                }
            },
            {
                "id": "add-other-action-4",
                "type": "choice",
                "progressLabel": "Иное",
                "title": "Добавить еще иное действие?",
                "fieldId": "addOtherAction4",
                "visibleWhen": {
                    "fieldId": "addOtherAction3",
                    "equals": "yes"
                },
                "options": [
                    {
                        "value": "yes",
                        "label": "Да",
                        "description": "Добавим еще один пункт."
                    },
                    {
                        "value": "no",
                        "label": "Нет",
                        "description": "Остановимся на этом списке."
                    }
                ]
            },
            {
                "id": "other-action-4",
                "type": "fieldGroup",
                "progressLabel": "Иное 4",
                "title": "Опишите четвертое иное действие",
                "fields": [
                    "otherAction4"
                ],
                "visibleWhen": {
                    "fieldId": "addOtherAction4",
                    "equals": "yes"
                }
            },
            {
                "id": "add-other-action-5",
                "type": "choice",
                "progressLabel": "Иное",
                "title": "Добавить еще иное действие?",
                "fieldId": "addOtherAction5",
                "visibleWhen": {
                    "fieldId": "addOtherAction4",
                    "equals": "yes"
                },
                "options": [
                    {
                        "value": "yes",
                        "label": "Да",
                        "description": "Добавим еще один пункт."
                    },
                    {
                        "value": "no",
                        "label": "Нет",
                        "description": "Остановимся на этом списке."
                    }
                ]
            },
            {
                "id": "other-action-5",
                "type": "fieldGroup",
                "progressLabel": "Иное 5",
                "title": "Опишите пятое иное действие",
                "fields": [
                    "otherAction5"
                ],
                "visibleWhen": {
                    "fieldId": "addOtherAction5",
                    "equals": "yes"
                }
            },
            {
                "id": "review",
                "type": "review",
                "progressLabel": "Проверка",
                "title": "Проверьте доверенность перед скачиванием",
                "description": "Убедитесь, что указаны нужные полномочия, верные данные сторон, срок действия и адресат доверенности. После этого можно скачать черновой PDF и перейти к чистой версии документа."
            }
        ],
        "sampleValues": {
            "targetType": "government",
            "targetName": "Департамент городского имущества города Москвы",
            "governmentDisputeSubject": "спор о предоставлении документов по обращению Иванова Ивана Ивановича к Департаменту городского имущества города Москвы",
            "postOfficeDepartment": "№ 101000",
            "city": "Москва",
            "documentDate": "2026-05-19",
            "validForNumber": "1",
            "validForWords": "один",
            "validForUnit": "год",
            "validFor": "1 (один) год",
            "validUntil": "2026-12-31",
            "validUntilInclusive": "включительно",
            "principalStatus": "organization",
            "principalNamingGender": "male",
            "principalFullName": "Иванов Иван Иванович",
            "principalBirthDate": "1988-04-12",
            "principalPassportSeries": "45 01",
            "principalPassportNumber": "123456",
            "principalPassportIssuedBy": "ОВД района Арбат города Москвы",
            "principalPassportIssuedDate": "2018-06-20",
            "principalAddress": "г. Москва, ул. Тверская, д. 10, кв. 15",
            "principalOgrnip": "316774600000000",
            "principalInn": "770100000000",
            "principalOrganizationName": "",
            "principalOrganizationOgrn": "1237700000000",
            "principalOrganizationInn": "7701000000",
            "principalSignerPosition": "генеральный директор",
            "principalSignerFullName": "Иванов Иван Иванович",
            "principalSignerBasis": "Устава",
            "representativeFullName": "Петров Петр Петрович",
            "representativeBirthDate": "1990-09-03",
            "representativePassportSeries": "45 02",
            "representativePassportNumber": "654321",
            "representativePassportIssuedBy": "ОВД района Хамовники города Москвы",
            "representativePassportIssuedDate": "2020-03-15",
            "representativeAddress": "г. Москва, ул. Лесная, д. 5, кв. 8",
            "representativeNamingGender": "male",
            "powerSubmitDocuments": "allowed",
            "powerReceiveDocuments": "allowed",
            "powerProvideInformation": "allowed",
            "powerMakePayments": "omit",
            "hasDelegationRight": false,
            "includeRepresentativeSignature": true,
            "powerSignForReceipt": "allowed",
            "powerInteractWithOfficials": "allowed",
            "powerReceivePostalItems": "omit",
            "powerFsspMaterials": "omit",
            "includeOtherActions": true,
            "otherAction1": "получать расписки, уведомления и иные подтверждения о приеме документов",
            "addOtherAction2": "no"
        },
        "seo": {
            "title": "Доверенность - заполнить и скачать онлайн | ЛЕГКОДОК",
            "description": "Заполните образец доверенности онлайн без ворда и ручной верстки. Укажите данные и сервис автоматически подготовит документ в PDF формате.",
            "keywords": [
                "доверенность",
                "простая доверенность",
                "доверенность без нотариуса",
                "доверенность в мфц",
                "доверенность на почту",
                "доверенность приставам",
                "доверенность для суда ознакомиться с делом"
            ]
        },
        "page": {
            "suitableFor": [
                "Для обращений в МФЦ, почту, МВД, суд, к приставам, в управляющую компанию или другую организацию.",
                "Для ситуаций, когда человеку нужно поручить простые действия без распоряжения имуществом и без нотариальной формы.",
                "Для разовой бытовой или административной задачи: получить справку, выписку, письмо, копии материалов, передать заявление."
            ],
            "notSuitableFor": [
                "Для продажи недвижимости, регистрации прав, распоряжения долями и сделок, где закон требует нотариальную доверенность.",
                "Для полноценного ведения судебного дела, если суд требует доверенность, оформленную по процессуальным правилам.",
                "Для получения денег, присужденного имущества или действий, где нужны специальные полномочия."
            ],
            "requiredData": [
                "Паспортные данные доверителя: ФИО, дата рождения, серия, номер, кем и когда выдан паспорт, адрес регистрации.",
                "Паспортные данные доверенного лица.",
                "Название органа или организации, куда будет предъявляться доверенность.",
                "Перечень полномочий, которые нужно передать доверенному лицу.",
                "Город, дата подписания и срок действия доверенности."
            ],
            "howToFill": [
                "Выберите, куда нужна доверенность: МФЦ, почта, МВД, приставы, суд или другой орган.",
                "Заполните данные доверителя и доверенного лица точно по паспорту.",
                "Отметьте да или нет по каждому полномочию, чтобы не дать лишних прав.",
                "При необходимости добавьте свои иные действия и остановитесь, когда список полный.",
                "Скачайте PDF с водяным знаком, проверьте текст и затем получите чистую версию документа."
            ],
            "afterDownload": [
                "Передайте доверенному лицу оригинал доверенности и предупредите, что ему нужен паспорт.",
                "Перед подачей уточните в конкретном органе, принимает ли он простую письменную доверенность для выбранного действия."
            ],
            "articleSections": [
                {
                    "title": "Что такое доверенность",
                    "paragraphs": [
                        "Доверенность - это письменное уполномочие, по которому одно лицо разрешает другому совершать конкретные действия от своего имени. В простых бытовых и административных ситуациях ее часто оформляют без нотариуса.",
                        "Главная задача документа - понятно указать, кто доверяет, кому доверяет, куда человек будет обращаться и какие именно действия ему разрешены."
                    ]
                },
                {
                    "title": "Когда нужна доверенность",
                    "paragraphs": [
                        "Чаще всего такая доверенность нужна, когда человек не может сам сходить в МФЦ, отделение почты, орган власти, управляющую компанию или другую организацию.",
                        "Например, доверенное лицо может подать заявление, донести документы, получить готовую справку, выписку, письмо или результат услуги."
                    ]
                },
                {
                    "title": "Какие данные понадобятся",
                    "paragraphs": [
                        "Для заполнения нужны паспортные данные доверителя и доверенного лица. Данные лучше переписывать с паспорта без сокращений: ФИО, серия, номер, кем и когда выдан, адрес регистрации.",
                        "Также заранее решите, какие действия действительно нужны. Лишние полномочия лучше не добавлять: так документ будет понятнее для органа и безопаснее для доверителя."
                    ]
                },
                {
                    "title": "Дата и срок доверенности",
                    "paragraphs": [
                        "В доверенности обязательно указывается дата подписания. Без даты документ обычно не используют, потому что непонятно, когда он выдан.",
                        "Срок действия лучше указать явно: например, на один год или до конкретной даты. Так принимающей стороне проще проверить, действует ли документ."
                    ]
                },
                {
                    "title": "Кому подходит и когда нужен другой формат",
                    "paragraphs": [
                        "Подходит для простых действий в МФЦ, почтовом отделении, МВД, у приставов, в суде для ознакомления с материалами, в управляющей компании, учебном заведении или другой организации.",
                        "Не подходит для сделок, распоряжения недвижимостью, регистрации прав, получения присужденных денег, полного ведения дела в суде и других действий, где закон или конкретный орган требует нотариальную либо специально удостоверенную доверенность."
                    ]
                },
                {
                    "title": "Особенности для суда и приставов",
                    "paragraphs": [
                        "Для суда в этом шаблоне заложены ограниченные действия: ознакомиться с материалами дела, сделать выписки, получить копии судебных актов или передать документы. Это не полноценная доверенность на судебное представительство.",
                        "Для приставов можно добавить право знакомиться с материалами исполнительного производства, получать копии постановлений и подавать заявления. Получение денег или предъявление исполнительного документа к взысканию лучше оформлять отдельными специальными полномочиями."
                    ]
                },
                {
                    "title": "Правовая основа простыми словами",
                    "paragraphs": [
                        "Гражданский кодекс допускает доверенность как письменное уполномочие одного лица другому. Но для отдельных действий закон требует нотариальную форму или специальные полномочия.",
                        "Поэтому этот шаблон рассчитан на простые поручения. Если действие связано с недвижимостью, крупными деньгами, судом по существу спора или регистрацией прав, перед использованием нужно проверить требования конкретного органа."
                    ]
                },
                {
                    "title": "Частые ошибки",
                    "paragraphs": [
                        "Первая частая ошибка - указать слишком широкий набор прав. Лучше оставить только те действия, которые действительно нужны для конкретной задачи.",
                        "Еще одна ошибка - считать простую доверенность универсальной. Орган может отказать, если для выбранного действия требуется нотариальная доверенность, личное присутствие или отдельное специальное полномочие."
                    ]
                },
                {
                    "title": "Что проверить перед скачиванием PDF",
                    "paragraphs": [
                        "Проверьте ФИО и паспортные данные обеих сторон, название органа, дату, срок действия и каждый выбранный пункт полномочий.",
                        "Если добавляли иные действия своими словами, убедитесь, что они понятны без пояснений и не противоречат выбранной цели доверенности."
                    ]
                },
                {
                    "title": "МФЦ, почта, суд, МВД и другие органы",
                    "paragraphs": [
                        "Для МФЦ обычно важны полномочия подать документы, получить результат услуги и расписаться в получении. Для почты - получить отправления, извещения и расписаться за получение.",
                        "Для суда, МВД, приставов и других органов формулировки лучше делать точными: указать конкретный орган, перечень действий, возможность подавать заявления, получать копии и расписываться в документах."
                    ]
                }
            ],
            "faq": [
                {
                    "question": "Нужно ли заверять эту доверенность у нотариуса?",
                    "answer": "Для простых действий иногда достаточно простой письменной доверенности. Но если закон или конкретный орган требует нотариальную форму, этот шаблон может не подойти."
                },
                {
                    "question": "Можно ли использовать ее для МФЦ?",
                    "answer": "Да, для простых действий: подать заявление, передать документы, получить результат услуги или справку. Для регистрации прав и отдельных действий с недвижимостью может потребоваться нотариальная доверенность."
                },
                {
                    "question": "Можно ли по этой доверенности быть представителем в суде?",
                    "answer": "Шаблон рассчитан на ограниченные действия: ознакомиться с материалами дела, получить копии, передать документы. Для полноценного ведения дела в суде нужны полномочия, оформленные по процессуальным правилам."
                },
                {
                    "question": "Можно ли добавить свои полномочия?",
                    "answer": "Да. В конструкторе есть блок иных действий: добавляйте пункт, затем выбирайте, нужен ли еще один, пока список не будет полным."
                },
                {
                    "question": "Что взять с собой доверенному лицу?",
                    "answer": "Обычно нужен оригинал доверенности и паспорт доверенного лица. Конкретный орган может попросить дополнительные документы."
                },
                {
                    "question": "Когда доступен PDF без водяного знака?",
                    "answer": "Сначала скачайте PDF с водяным знаком и проверьте данные. После оплаты доступна чистая версия документа без водяного знака."
                }
            ],
            "relatedDocuments": [
                "Заявление о ходе исполнительного производства",
                "Заявление о выдаче копии решения суда",
                "Жалоба на судебного пристава"
            ]
        },
        "disclaimers": [
            "Документ является типовым шаблоном и не заменяет индивидуальную юридическую консультацию. Перед использованием проверьте требования конкретного органа: для некоторых действий нужна нотариальная или специально удостоверенная доверенность."
        ]
    },
    seoTemplate: powerOfAttorneySeoTemplate,
  },
];

export const categories = Array.from(
  new Set(documents.map((document) => document.category)),
);

export function getDocumentBySlug(slug: string) {
  return documents.find((document) => document.slug === slug);
}
