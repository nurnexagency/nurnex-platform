export type Locale = "en" | "az" | "ru" | "tr" | "ar";

export const LOCALES: { code: Locale; label: string; native: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", label: "English", native: "EN", dir: "ltr" },
  { code: "az", label: "Azerbaijani", native: "AZ", dir: "ltr" },
  { code: "ru", label: "Russian", native: "RU", dir: "ltr" },
  { code: "tr", label: "Turkish", native: "TR", dir: "ltr" },
  { code: "ar", label: "Arabic", native: "AR", dir: "rtl" },
];

export type Dict = {
  nav: {
    services: string;
    demos: string;
    bootcamp: string;
    bootcampFull: string;
    bootcampFullHint: string;
    fieldAccel: string;
    fieldAccelHint: string;
    work: string;
    process: string;
    about: string;
    careers: string;
    regions: string;
    contact: string;
    emailUs: string;
    portal: string;
    language: string;
  };
  hero: {
    body: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    downloadCatalogue: string;
    microsoft: string;
    microsoftHint: string;
    data: string;
    dataHint: string;
    ai: string;
    aiHint: string;
    digital: string;
    digitalHint: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    ambassador: string;
    becomeAmbassador: string;
    ctaPrimary: string;
    downloadCatalogue: string;
  };
  footer: {
    blurb: string;
    navigation: string;
    getInTouch: string;
    rights: string;
  };
};

const en: Dict = {
  nav: {
    services: "Services",
    demos: "Demos",
    bootcamp: "Bootcamp",
    bootcampFull: "6-Month Bootcamp",
    bootcampFullHint: "Full career program · 3 & 6 month tracks",
    fieldAccel: "1-Month Field Acceleration",
    fieldAccelHint: "One combo track · $400",
    work: "Work",
    process: "Process",
    about: "About",
    careers: "Careers",
    regions: "Regions",
    contact: "Contact",
    emailUs: "Email Us",
    portal: "Internal Portal Sign In",
    language: "Language",
  },
  hero: {
    body: "Microsoft analytics, automation, and cloud consulting — plus websites and iOS & Android apps — for Europe, Asia, and the Middle East.",
    ctaPrimary: "Email Us to Schedule",
    ctaSecondary: "Explore Services",
  },
  services: {
    eyebrow: "Our Expertise",
    title: "What We Deliver",
    intro: "Microsoft analytics and automation, data platforms including Databricks and Snowflake, AI and machine learning — plus websites and mobile apps when you need the full digital stack.",
    downloadCatalogue: "Download Full Catalogue (PDF)",
    microsoft: "Microsoft Stack",
    microsoftHint: "Power BI, Power Platform, Azure, Copilot readiness, training, and managed support.",
    data: "Data Platform",
    dataHint: "Databricks, Snowflake, Azure pipelines, and custom data ingestion — from raw sources to analytics-ready delivery.",
    ai: "AI & Modernization",
    aiHint: "Machine learning, applied AI, and the replacement of aging systems — built securely on the Microsoft cloud.",
    digital: "Digital Products",
    digitalHint: "Websites and mobile apps — with Microsoft automation and dashboards behind them when you need both.",
  },
  contact: {
    eyebrow: "Start Your Journey",
    title: "Ready to Move Forward?",
    body: "Email us to schedule a complimentary 30-minute discovery call. We'll review your Microsoft landscape, website or app needs, identify quick wins, and outline a roadmap — no commitment required.",
    ambassador: "Prefer a regional partner first? You can also start through a Nurnex Ambassador — either path leads to the same discovery process.",
    becomeAmbassador: "Become an Ambassador",
    ctaPrimary: "Email Us to Schedule",
    downloadCatalogue: "Download Catalogue (PDF)",
  },
  footer: {
    blurb: "Microsoft analytics, automation, and cloud consulting — plus websites and iOS & Android apps — for organizations across Europe, Asia, and the Middle East.",
    navigation: "Navigation",
    getInTouch: "Get in Touch",
    rights: "All rights reserved.",
  },
};

const az: Dict = {
  nav: {
    services: "Xidmətlər",
    demos: "Demolar",
    bootcamp: "Bootcamp",
    bootcampFull: "6 aylıq Bootcamp",
    bootcampFullHint: "Tam karyera proqramı · 3 və 6 aylıq",
    fieldAccel: "1 aylıq Field Acceleration",
    fieldAccelHint: "Bir kombinasiya · $400",
    work: "İşlər",
    process: "Proses",
    about: "Haqqımızda",
    careers: "Karyera",
    regions: "Regionlar",
    contact: "Əlaqə",
    emailUs: "Bizə yazın",
    portal: "Daxili portal",
    language: "Dil",
  },
  hero: {
    body: "Microsoft analitika, avtomatlaşdırma və bulud konsaltinqi — həmçinin vebsaytlar və iOS & Android tətbiqləri — Avropa, Asiya və Yaxın Şərq üçün.",
    ctaPrimary: "Görüş təyin edin",
    ctaSecondary: "Xidmətlərə baxın",
  },
  services: {
    eyebrow: "Ekspertizamız",
    title: "Nə təqdim edirik",
    intro: "Microsoft analitika və avtomatlaşdırma, Databricks və Snowflake daxil olmaqla data platformaları, AI və maşın öyrənməsi — lazım olanda vebsayt və mobil tətbiqlər də.",
    downloadCatalogue: "Tam kataloqu yükləyin (PDF)",
    microsoft: "Microsoft steki",
    microsoftHint: "Power BI, Power Platform, Azure, Copilot hazırlığı, təlim və idarə olunan dəstək.",
    data: "Data platforması",
    dataHint: "Databricks, Snowflake, Azure pipeline-ları və xüsusi data qəbulu — xammaldan analitika üçün hazır nəticəyə.",
    ai: "AI və modernizasiya",
    aiHint: "Maşın öyrənməsi, tətbiqi AI və köhnə sistemlərin əvəzlənməsi — Microsoft buludunda təhlükəsiz şəkildə.",
    digital: "Rəqəmsal məhsullar",
    digitalHint: "Vebsaytlar və mobil tətbiqlər — ehtiyac olduqda arxasında Microsoft avtomatlaşdırma və dashboard-lar.",
  },
  contact: {
    eyebrow: "Səyahətinizə başlayın",
    title: "İrəli getməyə hazırsınız?",
    body: "Pulsuz 30 dəqiqəlik kəşf zəngi üçün bizə yazın. Microsoft mühitinizi, vebsayt və ya tətbiq ehtiyaclarınızı nəzərdən keçirəcəyik, tez qələbələri müəyyənləşdirəcəyik və yol xəritəsi təqdim edəcəyik — öhdəlik yoxdur.",
    ambassador: "Əvvəlcə regional tərəfdaş istəyirsiniz? Nurnex Ambassadörü ilə də başlaya bilərsiniz — hər iki yol eyni kəşf prosesinə aparır.",
    becomeAmbassador: "Ambassadör olun",
    ctaPrimary: "Görüş təyin edin",
    downloadCatalogue: "Kataloqu yükləyin (PDF)",
  },
  footer: {
    blurb: "Microsoft analitika, avtomatlaşdırma və bulud konsaltinqi — həmçinin vebsaytlar və iOS & Android tətbiqləri — Avropa, Asiya və Yaxın Şərqdə təşkilatlar üçün.",
    navigation: "Naviqasiya",
    getInTouch: "Əlaqə",
    rights: "Bütün hüquqlar qorunur.",
  },
};

const ru: Dict = {
  nav: {
    services: "Услуги",
    demos: "Демо",
    bootcamp: "Bootcamp",
    bootcampFull: "6-месячный Bootcamp",
    bootcampFullHint: "Полная программа · 3 и 6 месяцев",
    fieldAccel: "1 месяц Field Acceleration",
    fieldAccelHint: "Один комбинированный трек · $400",
    work: "Проекты",
    process: "Процесс",
    about: "О нас",
    careers: "Карьера",
    regions: "Регионы",
    contact: "Контакты",
    emailUs: "Напишите нам",
    portal: "Внутренний портал",
    language: "Язык",
  },
  hero: {
    body: "Microsoft-аналитика, автоматизация и облачный консалтинг — а также сайты и приложения iOS & Android — для Европы, Азии и Ближнего Востока.",
    ctaPrimary: "Запланировать звонок",
    ctaSecondary: "Смотреть услуги",
  },
  services: {
    eyebrow: "Наша экспертиза",
    title: "Что мы делаем",
    intro: "Microsoft-аналитика и автоматизация, платформы данных включая Databricks и Snowflake, ИИ и машинное обучение — плюс сайты и мобильные приложения.",
    downloadCatalogue: "Скачать полный каталог (PDF)",
    microsoft: "Стек Microsoft",
    microsoftHint: "Power BI, Power Platform, Azure, готовность к Copilot, обучение и управляемая поддержка.",
    data: "Платформа данных",
    dataHint: "Databricks, Snowflake, Azure pipelines и кастомный приём данных — от сырых источников до аналитики.",
    ai: "ИИ и модернизация",
    aiHint: "Машинное обучение, прикладной ИИ и замена устаревших систем — безопасно на облаке Microsoft.",
    digital: "Цифровые продукты",
    digitalHint: "Сайты и мобильные приложения — с Microsoft-автоматизацией и дашбордами, когда нужно и то, и другое.",
  },
  contact: {
    eyebrow: "Начните путь",
    title: "Готовы двигаться дальше?",
    body: "Напишите нам, чтобы назначить бесплатный 30-минутный discovery-звонок. Мы разберём ваш Microsoft-ландшафт, потребности в сайте или приложении, найдём быстрые победы и наметим дорожную карту — без обязательств.",
    ambassador: "Сначала нужен региональный партнёр? Можно начать через амбассадора Nurnex — оба пути ведут к одному discovery-процессу.",
    becomeAmbassador: "Стать амбассадором",
    ctaPrimary: "Запланировать звонок",
    downloadCatalogue: "Скачать каталог (PDF)",
  },
  footer: {
    blurb: "Microsoft-аналитика, автоматизация и облачный консалтинг — а также сайты и приложения iOS & Android — для организаций в Европе, Азии и на Ближнем Востоке.",
    navigation: "Навигация",
    getInTouch: "Связаться",
    rights: "Все права защищены.",
  },
};

const tr: Dict = {
  nav: {
    services: "Hizmetler",
    demos: "Demolar",
    bootcamp: "Bootcamp",
    bootcampFull: "6 Aylık Bootcamp",
    bootcampFullHint: "Tam kariyer programı · 3 ve 6 ay",
    fieldAccel: "1 Aylık Field Acceleration",
    fieldAccelHint: "Tek kombinasyon · $400",
    work: "İşler",
    process: "Süreç",
    about: "Hakkımızda",
    careers: "Kariyer",
    regions: "Bölgeler",
    contact: "İletişim",
    emailUs: "Bize yazın",
    portal: "İç portal girişi",
    language: "Dil",
  },
  hero: {
    body: "Microsoft analitik, otomasyon ve bulut danışmanlığı — ayrıca web siteleri ve iOS & Android uygulamaları — Avrupa, Asya ve Orta Doğu için.",
    ctaPrimary: "Görüşme planlayın",
    ctaSecondary: "Hizmetleri keşfedin",
  },
  services: {
    eyebrow: "Uzmanlığımız",
    title: "Neler sunuyoruz",
    intro: "Microsoft analitik ve otomasyon, Databricks ve Snowflake dahil veri platformları, YZ ve makine öğrenmesi — ihtiyaç halinde web siteleri ve mobil uygulamalar.",
    downloadCatalogue: "Tam kataloğu indir (PDF)",
    microsoft: "Microsoft yığını",
    microsoftHint: "Power BI, Power Platform, Azure, Copilot hazırlığı, eğitim ve yönetilen destek.",
    data: "Veri platformu",
    dataHint: "Databricks, Snowflake, Azure pipeline’ları ve özel veri alımı — ham kaynaktan analitiğe hazır teslimata.",
    ai: "YZ ve modernizasyon",
    aiHint: "Makine öğrenmesi, uygulamalı YZ ve eski sistemlerin değiştirilmesi — Microsoft bulutunda güvenli şekilde.",
    digital: "Dijital ürünler",
    digitalHint: "Web siteleri ve mobil uygulamalar — gerektiğinde arkasında Microsoft otomasyon ve paneller.",
  },
  contact: {
    eyebrow: "Yolculuğunuza başlayın",
    title: "İlerlemeye hazır mısınız?",
    body: "Ücretsiz 30 dakikalık keşif görüşmesi için bize yazın. Microsoft ortamınızı, web veya uygulama ihtiyaçlarınızı gözden geçirir, hızlı kazanımları belirler ve bir yol haritası çıkarırız — taahhüt yok.",
    ambassador: "Önce bölgesel bir ortak mı istiyorsunuz? Nurnex Elçisi ile de başlayabilirsiniz — her iki yol da aynı keşif sürecine çıkar.",
    becomeAmbassador: "Elçi olun",
    ctaPrimary: "Görüşme planlayın",
    downloadCatalogue: "Kataloğu indir (PDF)",
  },
  footer: {
    blurb: "Microsoft analitik, otomasyon ve bulut danışmanlığı — ayrıca web siteleri ve iOS & Android uygulamaları — Avrupa, Asya ve Orta Doğu’daki kuruluşlar için.",
    navigation: "Gezinme",
    getInTouch: "İletişime geçin",
    rights: "Tüm hakları saklıdır.",
  },
};

const ar: Dict = {
  nav: {
    services: "الخدمات",
    demos: "العروض",
    bootcamp: "المعسكر",
    bootcampFull: "معسكر 6 أشهر",
    bootcampFullHint: "برنامج مهني كامل · 3 و 6 أشهر",
    fieldAccel: "Field Acceleration لمدة شهر",
    fieldAccelHint: "مسار واحد · $400",
    work: "أعمالنا",
    process: "العملية",
    about: "من نحن",
    careers: "الوظائف",
    regions: "المناطق",
    contact: "تواصل",
    emailUs: "راسلنا",
    portal: "بوابة داخلية",
    language: "اللغة",
  },
  hero: {
    body: "استشارات Microsoft للتحليلات والأتمتة والسحابة — بالإضافة إلى مواقع وتطبيقات iOS وAndroid — لأوروبا وآسيا والشرق الأوسط.",
    ctaPrimary: "حدد موعدًا",
    ctaSecondary: "استكشف الخدمات",
  },
  services: {
    eyebrow: "خبرتنا",
    title: "ماذا نقدّم",
    intro: "تحليلات وأتمتة Microsoft، ومنصات بيانات تشمل Databricks وSnowflake، والذكاء الاصطناعي والتعلم الآلي — بالإضافة إلى المواقع وتطبيقات الجوال عند الحاجة.",
    downloadCatalogue: "تحميل الكتالوج الكامل (PDF)",
    microsoft: "حزمة Microsoft",
    microsoftHint: "Power BI وPower Platform وAzure واستعداد Copilot والتدريب والدعم المُدار.",
    data: "منصة البيانات",
    dataHint: "Databricks وSnowflake وخطوط Azure واستيعاب بيانات مخصص — من المصادر الخام إلى التسليم الجاهز للتحليل.",
    ai: "الذكاء الاصطناعي والتحديث",
    aiHint: "التعلم الآلي والذكاء الاصطناعي التطبيقي واستبدال الأنظمة القديمة — بأمان على سحابة Microsoft.",
    digital: "المنتجات الرقمية",
    digitalHint: "مواقع وتطبيقات جوال — مع أتمتة Microsoft ولوحات معلومات خلفها عند الحاجة.",
  },
  contact: {
    eyebrow: "ابدأ رحلتك",
    title: "هل أنت مستعد للخطوة التالية؟",
    body: "راسلنا لجدولة مكالمة اكتشاف مجانية لمدة 30 دقيقة. سنراجع بيئة Microsoft واحتياجات الموقع أو التطبيق ونحدد مكاسب سريعة ونرسم خارطة طريق — دون التزام.",
    ambassador: "تفضل شريكًا إقليميًا أولًا؟ يمكنك البدء عبر سفير Nurnex — كلا المسارين يؤديان إلى نفس عملية الاكتشاف.",
    becomeAmbassador: "كن سفيرًا",
    ctaPrimary: "حدد موعدًا",
    downloadCatalogue: "تحميل الكتالوج (PDF)",
  },
  footer: {
    blurb: "استشارات Microsoft للتحليلات والأتمتة والسحابة — بالإضافة إلى مواقع وتطبيقات iOS وAndroid — للمؤسسات في أوروبا وآسيا والشرق الأوسط.",
    navigation: "التنقل",
    getInTouch: "تواصل معنا",
    rights: "جميع الحقوق محفوظة.",
  },
};

export const dictionaries: Record<Locale, Dict> = { en, az, ru, tr, ar };
