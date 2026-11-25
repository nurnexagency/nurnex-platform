# -*- coding: utf-8 -*-
"""Generate src/lib/i18n/dictionaries.ts with proper UTF-8."""
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "src" / "lib" / "i18n" / "dictionaries.ts"

# All non-ASCII via Python unicode escapes so this file stays ASCII-safe on disk.
en = {
    "nav": {
        "services": "Services",
        "demos": "Demos",
        "bootcamp": "Bootcamp",
        "bootcampFull": "6-Month Bootcamp",
        "bootcampFullHint": "Full career program \u00b7 3 & 6 month tracks",
        "fieldAccel": "1-Month Field Acceleration",
        "fieldAccelHint": "One combo track \u00b7 $400",
        "work": "Work",
        "process": "Process",
        "about": "About",
        "careers": "Careers",
        "regions": "Regions",
        "contact": "Contact",
        "emailUs": "Email Us",
        "portal": "Internal Portal Sign In",
        "language": "Language",
    },
    "hero": {
        "body": "Microsoft analytics, automation, and cloud consulting \u2014 plus websites and iOS & Android apps \u2014 for Europe, Asia, and the Middle East.",
        "ctaPrimary": "Email Us to Schedule",
        "ctaSecondary": "Explore Services",
    },
    "services": {
        "eyebrow": "Our Expertise",
        "title": "What We Deliver",
        "intro": "Microsoft analytics and automation, data platforms including Databricks and Snowflake, AI and machine learning \u2014 plus websites and mobile apps when you need the full digital stack.",
        "downloadCatalogue": "Download Full Catalogue (PDF)",
        "microsoft": "Microsoft Stack",
        "microsoftHint": "Power BI, Power Platform, Azure, Copilot readiness, training, and managed support.",
        "data": "Data Platform",
        "dataHint": "Databricks, Snowflake, Azure pipelines, and custom data ingestion \u2014 from raw sources to analytics-ready delivery.",
        "ai": "AI & Modernization",
        "aiHint": "Machine learning, applied AI, and the replacement of aging systems \u2014 built securely on the Microsoft cloud.",
        "digital": "Digital Products",
        "digitalHint": "Websites and mobile apps \u2014 with Microsoft automation and dashboards behind them when you need both.",
    },
    "contact": {
        "eyebrow": "Start Your Journey",
        "title": "Ready to Move Forward?",
        "body": "Email us to schedule a complimentary 30-minute discovery call. We'll review your Microsoft landscape, website or app needs, identify quick wins, and outline a roadmap \u2014 no commitment required.",
        "ambassador": "Prefer a regional partner first? You can also start through a Nurnex Ambassador \u2014 either path leads to the same discovery process.",
        "becomeAmbassador": "Become an Ambassador",
        "ctaPrimary": "Email Us to Schedule",
        "downloadCatalogue": "Download Catalogue (PDF)",
    },
    "footer": {
        "blurb": "Microsoft analytics, automation, and cloud consulting \u2014 plus websites and iOS & Android apps \u2014 for organizations across Europe, Asia, and the Middle East.",
        "navigation": "Navigation",
        "getInTouch": "Get in Touch",
        "rights": "All rights reserved.",
    },
}

az = {
    "nav": {
        "services": "Xidm\u0259tl\u0259r",
        "demos": "Demolar",
        "bootcamp": "Bootcamp",
        "bootcampFull": "6 ayl\u0131q Bootcamp",
        "bootcampFullHint": "Tam karyera proqram\u0131 \u00b7 3 v\u0259 6 ayl\u0131q",
        "fieldAccel": "1 ayl\u0131q Field Acceleration",
        "fieldAccelHint": "Bir kombinasiya \u00b7 $400",
        "work": "\u0130\u015fl\u0259r",
        "process": "Proses",
        "about": "Haqq\u0131m\u0131zda",
        "careers": "Karyera",
        "regions": "Regionlar",
        "contact": "\u018flaq\u0259",
        "emailUs": "Biz\u0259 yaz\u0131n",
        "portal": "Daxili portal",
        "language": "Dil",
    },
    "hero": {
        "body": "Microsoft analitika, avtomatla\u015fd\u0131rma v\u0259 bulud konsaltinqi \u2014 h\u0259m\u00e7inin vebsaytlar v\u0259 iOS & Android t\u0259tbiql\u0259ri \u2014 Avropa, Asiya v\u0259 Yax\u0131n \u015e\u0259rq \u00fc\u00e7\u00fcn.",
        "ctaPrimary": "G\u00f6r\u00fc\u015f t\u0259yin edin",
        "ctaSecondary": "Xidm\u0259tl\u0259r\u0259 bax\u0131n",
    },
    "services": {
        "eyebrow": "Ekspertizam\u0131z",
        "title": "N\u0259 t\u0259qdim edirik",
        "intro": "Microsoft analitika v\u0259 avtomatla\u015fd\u0131rma, Databricks v\u0259 Snowflake daxil olmaqla data platformalar\u0131, AI v\u0259 ma\u015f\u0131n \u00f6yr\u0259nm\u0259si \u2014 laz\u0131m olanda vebsayt v\u0259 mobil t\u0259tbiql\u0259r d\u0259.",
        "downloadCatalogue": "Tam kataloqu y\u00fckl\u0259yin (PDF)",
        "microsoft": "Microsoft steki",
        "microsoftHint": "Power BI, Power Platform, Azure, Copilot haz\u0131rl\u0131\u011f\u0131, t\u0259lim v\u0259 idar\u0259 olunan d\u0259st\u0259k.",
        "data": "Data platformas\u0131",
        "dataHint": "Databricks, Snowflake, Azure pipeline-lar\u0131 v\u0259 x\u00fcsusi data q\u0259bulu \u2014 xammaldan analitika \u00fc\u00e7\u00fcn haz\u0131r n\u0259tic\u0259y\u0259.",
        "ai": "AI v\u0259 modernizasiya",
        "aiHint": "Ma\u015f\u0131n \u00f6yr\u0259nm\u0259si, t\u0259tbiqi AI v\u0259 k\u00f6hn\u0259 sisteml\u0259rin \u0259v\u0259zl\u0259nm\u0259si \u2014 Microsoft buludunda t\u0259hl\u00fck\u0259siz \u015f\u0259kild\u0259.",
        "digital": "R\u0259q\u0259msal m\u0259hsullar",
        "digitalHint": "Vebsaytlar v\u0259 mobil t\u0259tbiql\u0259r \u2014 ehtiyac olduqda arxas\u0131nda Microsoft avtomatla\u015fd\u0131rma v\u0259 dashboard-lar.",
    },
    "contact": {
        "eyebrow": "S\u0259yah\u0259tiniz\u0259 ba\u015flay\u0131n",
        "title": "\u0130r\u0259li getm\u0259y\u0259 haz\u0131rs\u0131n\u0131z?",
        "body": "Pulsuz 30 d\u0259qiq\u0259lik k\u0259\u015ff z\u0259ngi \u00fc\u00e7\u00fcn biz\u0259 yaz\u0131n. Microsoft m\u00fchitinizi, vebsayt v\u0259 ya t\u0259tbiq ehtiyaclar\u0131n\u0131z\u0131 n\u0259z\u0259rd\u0259n ke\u00e7ir\u0259c\u0259yik, tez q\u0259l\u0259b\u0259l\u0259ri m\u00fc\u0259yy\u0259nl\u0259\u015fdir\u0259c\u0259yik v\u0259 yol x\u0259rit\u0259si t\u0259qdim ed\u0259c\u0259yik \u2014 \u00f6hd\u0259lik yoxdur.",
        "ambassador": "\u018fvv\u0259lc\u0259 regional t\u0259r\u0259fda\u015f ist\u0259yirsiniz? Nurnex Ambassad\u00f6r\u00fc il\u0259 d\u0259 ba\u015flaya bil\u0259rsiniz \u2014 h\u0259r iki yol eyni k\u0259\u015ff prosesin\u0259 apar\u0131r.",
        "becomeAmbassador": "Ambassad\u00f6r olun",
        "ctaPrimary": "G\u00f6r\u00fc\u015f t\u0259yin edin",
        "downloadCatalogue": "Kataloqu y\u00fckl\u0259yin (PDF)",
    },
    "footer": {
        "blurb": "Microsoft analitika, avtomatla\u015fd\u0131rma v\u0259 bulud konsaltinqi \u2014 h\u0259m\u00e7inin vebsaytlar v\u0259 iOS & Android t\u0259tbiql\u0259ri \u2014 Avropa, Asiya v\u0259 Yax\u0131n \u015e\u0259rqd\u0259 t\u0259\u015fkilatlar \u00fc\u00e7\u00fcn.",
        "navigation": "Naviqasiya",
        "getInTouch": "\u018flaq\u0259",
        "rights": "B\u00fct\u00fcn h\u00fcquqlar qorunur.",
    },
}

ru = {
    "nav": {
        "services": "\u0423\u0441\u043b\u0443\u0433\u0438",
        "demos": "\u0414\u0435\u043c\u043e",
        "bootcamp": "Bootcamp",
        "bootcampFull": "6-\u043c\u0435\u0441\u044f\u0447\u043d\u044b\u0439 Bootcamp",
        "bootcampFullHint": "\u041f\u043e\u043b\u043d\u0430\u044f \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0430 \u00b7 3 \u0438 6 \u043c\u0435\u0441\u044f\u0446\u0435\u0432",
        "fieldAccel": "1 \u043c\u0435\u0441\u044f\u0446 Field Acceleration",
        "fieldAccelHint": "\u041e\u0434\u0438\u043d \u043a\u043e\u043c\u0431\u0438\u043d\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u0442\u0440\u0435\u043a \u00b7 $400",
        "work": "\u041f\u0440\u043e\u0435\u043a\u0442\u044b",
        "process": "\u041f\u0440\u043e\u0446\u0435\u0441\u0441",
        "about": "\u041e \u043d\u0430\u0441",
        "careers": "\u041a\u0430\u0440\u044c\u0435\u0440\u0430",
        "regions": "\u0420\u0435\u0433\u0438\u043e\u043d\u044b",
        "contact": "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b",
        "emailUs": "\u041d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u043d\u0430\u043c",
        "portal": "\u0412\u043d\u0443\u0442\u0440\u0435\u043d\u043d\u0438\u0439 \u043f\u043e\u0440\u0442\u0430\u043b",
        "language": "\u042f\u0437\u044b\u043a",
    },
    "hero": {
        "body": "Microsoft-\u0430\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u0430, \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044f \u0438 \u043e\u0431\u043b\u0430\u0447\u043d\u044b\u0439 \u043a\u043e\u043d\u0441\u0430\u043b\u0442\u0438\u043d\u0433 \u2014 \u0430 \u0442\u0430\u043a\u0436\u0435 \u0441\u0430\u0439\u0442\u044b \u0438 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f iOS & Android \u2014 \u0434\u043b\u044f \u0415\u0432\u0440\u043e\u043f\u044b, \u0410\u0437\u0438\u0438 \u0438 \u0411\u043b\u0438\u0436\u043d\u0435\u0433\u043e \u0412\u043e\u0441\u0442\u043e\u043a\u0430.",
        "ctaPrimary": "\u0417\u0430\u043f\u043b\u0430\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0437\u0432\u043e\u043d\u043e\u043a",
        "ctaSecondary": "\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0443\u0441\u043b\u0443\u0433\u0438",
    },
    "services": {
        "eyebrow": "\u041d\u0430\u0448\u0430 \u044d\u043a\u0441\u043f\u0435\u0440\u0442\u0438\u0437\u0430",
        "title": "\u0427\u0442\u043e \u043c\u044b \u0434\u0435\u043b\u0430\u0435\u043c",
        "intro": "Microsoft-\u0430\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u0430 \u0438 \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044f, \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u044b \u0434\u0430\u043d\u043d\u044b\u0445 \u0432\u043a\u043b\u044e\u0447\u0430\u044f Databricks \u0438 Snowflake, \u0418\u0418 \u0438 \u043c\u0430\u0448\u0438\u043d\u043d\u043e\u0435 \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u0435 \u2014 \u043f\u043b\u044e\u0441 \u0441\u0430\u0439\u0442\u044b \u0438 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f.",
        "downloadCatalogue": "\u0421\u043a\u0430\u0447\u0430\u0442\u044c \u043f\u043e\u043b\u043d\u044b\u0439 \u043a\u0430\u0442\u0430\u043b\u043e\u0433 (PDF)",
        "microsoft": "\u0421\u0442\u0435\u043a Microsoft",
        "microsoftHint": "Power BI, Power Platform, Azure, \u0433\u043e\u0442\u043e\u0432\u043d\u043e\u0441\u0442\u044c \u043a Copilot, \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u0435 \u0438 \u0443\u043f\u0440\u0430\u0432\u043b\u044f\u0435\u043c\u0430\u044f \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0430.",
        "data": "\u041f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0430 \u0434\u0430\u043d\u043d\u044b\u0445",
        "dataHint": "Databricks, Snowflake, Azure pipelines \u0438 \u043a\u0430\u0441\u0442\u043e\u043c\u043d\u044b\u0439 \u043f\u0440\u0438\u0451\u043c \u0434\u0430\u043d\u043d\u044b\u0445 \u2014 \u043e\u0442 \u0441\u044b\u0440\u044b\u0445 \u0438\u0441\u0442\u043e\u0447\u043d\u0438\u043a\u043e\u0432 \u0434\u043e \u0430\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u0438.",
        "ai": "\u0418\u0418 \u0438 \u043c\u043e\u0434\u0435\u0440\u043d\u0438\u0437\u0430\u0446\u0438\u044f",
        "aiHint": "\u041c\u0430\u0448\u0438\u043d\u043d\u043e\u0435 \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u0435, \u043f\u0440\u0438\u043a\u043b\u0430\u0434\u043d\u043e\u0439 \u0418\u0418 \u0438 \u0437\u0430\u043c\u0435\u043d\u0430 \u0443\u0441\u0442\u0430\u0440\u0435\u0432\u0448\u0438\u0445 \u0441\u0438\u0441\u0442\u0435\u043c \u2014 \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e \u043d\u0430 \u043e\u0431\u043b\u0430\u043a\u0435 Microsoft.",
        "digital": "\u0426\u0438\u0444\u0440\u043e\u0432\u044b\u0435 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u044b",
        "digitalHint": "\u0421\u0430\u0439\u0442\u044b \u0438 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f \u2014 \u0441 Microsoft-\u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u0435\u0439 \u0438 \u0434\u0430\u0448\u0431\u043e\u0440\u0434\u0430\u043c\u0438, \u043a\u043e\u0433\u0434\u0430 \u043d\u0443\u0436\u043d\u043e \u0438 \u0442\u043e, \u0438 \u0434\u0440\u0443\u0433\u043e\u0435.",
    },
    "contact": {
        "eyebrow": "\u041d\u0430\u0447\u043d\u0438\u0442\u0435 \u043f\u0443\u0442\u044c",
        "title": "\u0413\u043e\u0442\u043e\u0432\u044b \u0434\u0432\u0438\u0433\u0430\u0442\u044c\u0441\u044f \u0434\u0430\u043b\u044c\u0448\u0435?",
        "body": "\u041d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u043d\u0430\u043c, \u0447\u0442\u043e\u0431\u044b \u043d\u0430\u0437\u043d\u0430\u0447\u0438\u0442\u044c \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u0439 30-\u043c\u0438\u043d\u0443\u0442\u043d\u044b\u0439 discovery-\u0437\u0432\u043e\u043d\u043e\u043a. \u041c\u044b \u0440\u0430\u0437\u0431\u0435\u0440\u0451\u043c \u0432\u0430\u0448 Microsoft-\u043b\u0430\u043d\u0434\u0448\u0430\u0444\u0442, \u043f\u043e\u0442\u0440\u0435\u0431\u043d\u043e\u0441\u0442\u0438 \u0432 \u0441\u0430\u0439\u0442\u0435 \u0438\u043b\u0438 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0438, \u043d\u0430\u0439\u0434\u0451\u043c \u0431\u044b\u0441\u0442\u0440\u044b\u0435 \u043f\u043e\u0431\u0435\u0434\u044b \u0438 \u043d\u0430\u043c\u0435\u0442\u0438\u043c \u0434\u043e\u0440\u043e\u0436\u043d\u0443\u044e \u043a\u0430\u0440\u0442\u0443 \u2014 \u0431\u0435\u0437 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u0441\u0442\u0432.",
        "ambassador": "\u0421\u043d\u0430\u0447\u0430\u043b\u0430 \u043d\u0443\u0436\u0435\u043d \u0440\u0435\u0433\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0439 \u043f\u0430\u0440\u0442\u043d\u0451\u0440? \u041c\u043e\u0436\u043d\u043e \u043d\u0430\u0447\u0430\u0442\u044c \u0447\u0435\u0440\u0435\u0437 \u0430\u043c\u0431\u0430\u0441\u0441\u0430\u0434\u043e\u0440\u0430 Nurnex \u2014 \u043e\u0431\u0430 \u043f\u0443\u0442\u0438 \u0432\u0435\u0434\u0443\u0442 \u043a \u043e\u0434\u043d\u043e\u043c\u0443 discovery-\u043f\u0440\u043e\u0446\u0435\u0441\u0441\u0443.",
        "becomeAmbassador": "\u0421\u0442\u0430\u0442\u044c \u0430\u043c\u0431\u0430\u0441\u0441\u0430\u0434\u043e\u0440\u043e\u043c",
        "ctaPrimary": "\u0417\u0430\u043f\u043b\u0430\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0437\u0432\u043e\u043d\u043e\u043a",
        "downloadCatalogue": "\u0421\u043a\u0430\u0447\u0430\u0442\u044c \u043a\u0430\u0442\u0430\u043b\u043e\u0433 (PDF)",
    },
    "footer": {
        "blurb": "Microsoft-\u0430\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u0430, \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044f \u0438 \u043e\u0431\u043b\u0430\u0447\u043d\u044b\u0439 \u043a\u043e\u043d\u0441\u0430\u043b\u0442\u0438\u043d\u0433 \u2014 \u0430 \u0442\u0430\u043a\u0436\u0435 \u0441\u0430\u0439\u0442\u044b \u0438 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f iOS & Android \u2014 \u0434\u043b\u044f \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u0439 \u0432 \u0415\u0432\u0440\u043e\u043f\u0435, \u0410\u0437\u0438\u0438 \u0438 \u043d\u0430 \u0411\u043b\u0438\u0436\u043d\u0435\u043c \u0412\u043e\u0441\u0442\u043e\u043a\u0435.",
        "navigation": "\u041d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044f",
        "getInTouch": "\u0421\u0432\u044f\u0437\u0430\u0442\u044c\u0441\u044f",
        "rights": "\u0412\u0441\u0435 \u043f\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043d\u044b.",
    },
}

tr = {
    "nav": {
        "services": "Hizmetler",
        "demos": "Demolar",
        "bootcamp": "Bootcamp",
        "bootcampFull": "6 Ayl\u0131k Bootcamp",
        "bootcampFullHint": "Tam kariyer program\u0131 \u00b7 3 ve 6 ay",
        "fieldAccel": "1 Ayl\u0131k Field Acceleration",
        "fieldAccelHint": "Tek kombinasyon \u00b7 $400",
        "work": "\u0130\u015fler",
        "process": "S\u00fcre\u00e7",
        "about": "Hakk\u0131m\u0131zda",
        "careers": "Kariyer",
        "regions": "B\u00f6lgeler",
        "contact": "\u0130leti\u015fim",
        "emailUs": "Bize yaz\u0131n",
        "portal": "\u0130\u00e7 portal giri\u015fi",
        "language": "Dil",
    },
    "hero": {
        "body": "Microsoft analitik, otomasyon ve bulut dan\u0131\u015fmanl\u0131\u011f\u0131 \u2014 ayr\u0131ca web siteleri ve iOS & Android uygulamalar\u0131 \u2014 Avrupa, Asya ve Orta Do\u011fu i\u00e7in.",
        "ctaPrimary": "G\u00f6r\u00fc\u015fme planlay\u0131n",
        "ctaSecondary": "Hizmetleri ke\u015ffedin",
    },
    "services": {
        "eyebrow": "Uzmanl\u0131\u011f\u0131m\u0131z",
        "title": "Neler sunuyoruz",
        "intro": "Microsoft analitik ve otomasyon, Databricks ve Snowflake dahil veri platformlar\u0131, YZ ve makine \u00f6\u011frenmesi \u2014 ihtiya\u00e7 halinde web siteleri ve mobil uygulamalar.",
        "downloadCatalogue": "Tam katalo\u011fu indir (PDF)",
        "microsoft": "Microsoft y\u0131\u011f\u0131n\u0131",
        "microsoftHint": "Power BI, Power Platform, Azure, Copilot haz\u0131rl\u0131\u011f\u0131, e\u011fitim ve y\u00f6netilen destek.",
        "data": "Veri platformu",
        "dataHint": "Databricks, Snowflake, Azure pipeline\u2019lar\u0131 ve \u00f6zel veri al\u0131m\u0131 \u2014 ham kaynaktan analiti\u011fe haz\u0131r teslimata.",
        "ai": "YZ ve modernizasyon",
        "aiHint": "Makine \u00f6\u011frenmesi, uygulamal\u0131 YZ ve eski sistemlerin de\u011fi\u015ftirilmesi \u2014 Microsoft bulutunda g\u00fcvenli \u015fekilde.",
        "digital": "Dijital \u00fcr\u00fcnler",
        "digitalHint": "Web siteleri ve mobil uygulamalar \u2014 gerekti\u011finde arkas\u0131nda Microsoft otomasyon ve paneller.",
    },
    "contact": {
        "eyebrow": "Yolculu\u011funuza ba\u015flay\u0131n",
        "title": "\u0130lerlemeye haz\u0131r m\u0131s\u0131n\u0131z?",
        "body": "\u00dccretsiz 30 dakikal\u0131k ke\u015fif g\u00f6r\u00fc\u015fmesi i\u00e7in bize yaz\u0131n. Microsoft ortam\u0131n\u0131z\u0131, web veya uygulama ihtiya\u00e7lar\u0131n\u0131z\u0131 g\u00f6zden ge\u00e7irir, h\u0131zl\u0131 kazan\u0131mlar\u0131 belirler ve bir yol haritas\u0131 \u00e7\u0131kar\u0131r\u0131z \u2014 taahh\u00fct yok.",
        "ambassador": "\u00d6nce b\u00f6lgesel bir ortak m\u0131 istiyorsunuz? Nurnex El\u00e7isi ile de ba\u015flayabilirsiniz \u2014 her iki yol da ayn\u0131 ke\u015fif s\u00fcrecine \u00e7\u0131kar.",
        "becomeAmbassador": "El\u00e7i olun",
        "ctaPrimary": "G\u00f6r\u00fc\u015fme planlay\u0131n",
        "downloadCatalogue": "Katalo\u011fu indir (PDF)",
    },
    "footer": {
        "blurb": "Microsoft analitik, otomasyon ve bulut dan\u0131\u015fmanl\u0131\u011f\u0131 \u2014 ayr\u0131ca web siteleri ve iOS & Android uygulamalar\u0131 \u2014 Avrupa, Asya ve Orta Do\u011fu\u2019daki kurulu\u015flar i\u00e7in.",
        "navigation": "Gezinme",
        "getInTouch": "\u0130leti\u015fime ge\u00e7in",
        "rights": "T\u00fcm haklar\u0131 sakl\u0131d\u0131r.",
    },
}

ar = {
    "nav": {
        "services": "\u0627\u0644\u062e\u062f\u0645\u0627\u062a",
        "demos": "\u0627\u0644\u0639\u0631\u0648\u0636",
        "bootcamp": "\u0627\u0644\u0645\u0639\u0633\u0643\u0631",
        "bootcampFull": "\u0645\u0639\u0633\u0643\u0631 6 \u0623\u0634\u0647\u0631",
        "bootcampFullHint": "\u0628\u0631\u0646\u0627\u0645\u062c \u0645\u0647\u0646\u064a \u0643\u0627\u0645\u0644 \u00b7 3 \u0648 6 \u0623\u0634\u0647\u0631",
        "fieldAccel": "Field Acceleration \u0644\u0645\u062f\u0629 \u0634\u0647\u0631",
        "fieldAccelHint": "\u0645\u0633\u0627\u0631 \u0648\u0627\u062d\u062f \u00b7 $400",
        "work": "\u0623\u0639\u0645\u0627\u0644\u0646\u0627",
        "process": "\u0627\u0644\u0639\u0645\u0644\u064a\u0629",
        "about": "\u0645\u0646 \u0646\u062d\u0646",
        "careers": "\u0627\u0644\u0648\u0638\u0627\u0626\u0641",
        "regions": "\u0627\u0644\u0645\u0646\u0627\u0637\u0642",
        "contact": "\u062a\u0648\u0627\u0635\u0644",
        "emailUs": "\u0631\u0627\u0633\u0644\u0646\u0627",
        "portal": "\u0628\u0648\u0627\u0628\u0629 \u062f\u0627\u062e\u0644\u064a\u0629",
        "language": "\u0627\u0644\u0644\u063a\u0629",
    },
    "hero": {
        "body": "\u0627\u0633\u062a\u0634\u0627\u0631\u0627\u062a Microsoft \u0644\u0644\u062a\u062d\u0644\u064a\u0644\u0627\u062a \u0648\u0627\u0644\u0623\u062a\u0645\u062a\u0629 \u0648\u0627\u0644\u0633\u062d\u0627\u0628\u0629 \u2014 \u0628\u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u0645\u0648\u0627\u0642\u0639 \u0648\u062a\u0637\u0628\u064a\u0642\u0627\u062a iOS \u0648Android \u2014 \u0644\u0623\u0648\u0631\u0648\u0628\u0627 \u0648\u0622\u0633\u064a\u0627 \u0648\u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637.",
        "ctaPrimary": "\u062d\u062f\u062f \u0645\u0648\u0639\u062f\u064b\u0627",
        "ctaSecondary": "\u0627\u0633\u062a\u0643\u0634\u0641 \u0627\u0644\u062e\u062f\u0645\u0627\u062a",
    },
    "services": {
        "eyebrow": "\u062e\u0628\u0631\u062a\u0646\u0627",
        "title": "\u0645\u0627\u0630\u0627 \u0646\u0642\u062f\u0651\u0645",
        "intro": "\u062a\u062d\u0644\u064a\u0644\u0627\u062a \u0648\u0623\u062a\u0645\u062a\u0629 Microsoft\u060c \u0648\u0645\u0646\u0635\u0627\u062a \u0628\u064a\u0627\u0646\u0627\u062a \u062a\u0634\u0645\u0644 Databricks \u0648Snowflake\u060c \u0648\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0648\u0627\u0644\u062a\u0639\u0644\u0645 \u0627\u0644\u0622\u0644\u064a \u2014 \u0628\u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0648\u062a\u0637\u0628\u064a\u0642\u0627\u062a \u0627\u0644\u062c\u0648\u0627\u0644 \u0639\u0646\u062f \u0627\u0644\u062d\u0627\u062c\u0629.",
        "downloadCatalogue": "\u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0643\u062a\u0627\u0644\u0648\u062c \u0627\u0644\u0643\u0627\u0645\u0644 (PDF)",
        "microsoft": "\u062d\u0632\u0645\u0629 Microsoft",
        "microsoftHint": "Power BI \u0648Power Platform \u0648Azure \u0648\u0627\u0633\u062a\u0639\u062f\u0627\u062f Copilot \u0648\u0627\u0644\u062a\u062f\u0631\u064a\u0628 \u0648\u0627\u0644\u062f\u0639\u0645 \u0627\u0644\u0645\u064f\u062f\u0627\u0631.",
        "data": "\u0645\u0646\u0635\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a",
        "dataHint": "Databricks \u0648Snowflake \u0648\u062e\u0637\u0648\u0637 Azure \u0648\u0627\u0633\u062a\u064a\u0639\u0627\u0628 \u0628\u064a\u0627\u0646\u0627\u062a \u0645\u062e\u0635\u0635 \u2014 \u0645\u0646 \u0627\u0644\u0645\u0635\u0627\u062f\u0631 \u0627\u0644\u062e\u0627\u0645 \u0625\u0644\u0649 \u0627\u0644\u062a\u0633\u0644\u064a\u0645 \u0627\u0644\u062c\u0627\u0647\u0632 \u0644\u0644\u062a\u062d\u0644\u064a\u0644.",
        "ai": "\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0648\u0627\u0644\u062a\u062d\u062f\u064a\u062b",
        "aiHint": "\u0627\u0644\u062a\u0639\u0644\u0645 \u0627\u0644\u0622\u0644\u064a \u0648\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0627\u0644\u062a\u0637\u0628\u064a\u0642\u064a \u0648\u0627\u0633\u062a\u0628\u062f\u0627\u0644 \u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0642\u062f\u064a\u0645\u0629 \u2014 \u0628\u0623\u0645\u0627\u0646 \u0639\u0644\u0649 \u0633\u062d\u0627\u0628\u0629 Microsoft.",
        "digital": "\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0627\u0644\u0631\u0642\u0645\u064a\u0629",
        "digitalHint": "\u0645\u0648\u0627\u0642\u0639 \u0648\u062a\u0637\u0628\u064a\u0642\u0627\u062a \u062c\u0648\u0627\u0644 \u2014 \u0645\u0639 \u0623\u062a\u0645\u062a\u0629 Microsoft \u0648\u0644\u0648\u062d\u0627\u062a \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u062e\u0644\u0641\u0647\u0627 \u0639\u0646\u062f \u0627\u0644\u062d\u0627\u062c\u0629.",
    },
    "contact": {
        "eyebrow": "\u0627\u0628\u062f\u0623 \u0631\u062d\u0644\u062a\u0643",
        "title": "\u0647\u0644 \u0623\u0646\u062a \u0645\u0633\u062a\u0639\u062f \u0644\u0644\u062e\u0637\u0648\u0629 \u0627\u0644\u062a\u0627\u0644\u064a\u0629\u061f",
        "body": "\u0631\u0627\u0633\u0644\u0646\u0627 \u0644\u062c\u062f\u0648\u0644\u0629 \u0645\u0643\u0627\u0644\u0645\u0629 \u0627\u0643\u062a\u0634\u0627\u0641 \u0645\u062c\u0627\u0646\u064a\u0629 \u0644\u0645\u062f\u0629 30 \u062f\u0642\u064a\u0642\u0629. \u0633\u0646\u0631\u0627\u062c\u0639 \u0628\u064a\u0626\u0629 Microsoft \u0648\u0627\u062d\u062a\u064a\u0627\u062c\u0627\u062a \u0627\u0644\u0645\u0648\u0642\u0639 \u0623\u0648 \u0627\u0644\u062a\u0637\u0628\u064a\u0642 \u0648\u0646\u062d\u062f\u062f \u0645\u0643\u0627\u0633\u0628 \u0633\u0631\u064a\u0639\u0629 \u0648\u0646\u0631\u0633\u0645 \u062e\u0627\u0631\u0637\u0629 \u0637\u0631\u064a\u0642 \u2014 \u062f\u0648\u0646 \u0627\u0644\u062a\u0632\u0627\u0645.",
        "ambassador": "\u062a\u0641\u0636\u0644 \u0634\u0631\u064a\u0643\u064b\u0627 \u0625\u0642\u0644\u064a\u0645\u064a\u064b\u0627 \u0623\u0648\u0644\u064b\u0627\u061f \u064a\u0645\u0643\u0646\u0643 \u0627\u0644\u0628\u062f\u0621 \u0639\u0628\u0631 \u0633\u0641\u064a\u0631 Nurnex \u2014 \u0643\u0644\u0627 \u0627\u0644\u0645\u0633\u0627\u0631\u064a\u0646 \u064a\u0624\u062f\u064a\u0627\u0646 \u0625\u0644\u0649 \u0646\u0641\u0633 \u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u0627\u0643\u062a\u0634\u0627\u0641.",
        "becomeAmbassador": "\u0643\u0646 \u0633\u0641\u064a\u0631\u064b\u0627",
        "ctaPrimary": "\u062d\u062f\u062f \u0645\u0648\u0639\u062f\u064b\u0627",
        "downloadCatalogue": "\u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0643\u062a\u0627\u0644\u0648\u062c (PDF)",
    },
    "footer": {
        "blurb": "\u0627\u0633\u062a\u0634\u0627\u0631\u0627\u062a Microsoft \u0644\u0644\u062a\u062d\u0644\u064a\u0644\u0627\u062a \u0648\u0627\u0644\u0623\u062a\u0645\u062a\u0629 \u0648\u0627\u0644\u0633\u062d\u0627\u0628\u0629 \u2014 \u0628\u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u0645\u0648\u0627\u0642\u0639 \u0648\u062a\u0637\u0628\u064a\u0642\u0627\u062a iOS \u0648Android \u2014 \u0644\u0644\u0645\u0624\u0633\u0633\u0627\u062a \u0641\u064a \u0623\u0648\u0631\u0648\u0628\u0627 \u0648\u0622\u0633\u064a\u0627 \u0648\u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637.",
        "navigation": "\u0627\u0644\u062a\u0646\u0642\u0644",
        "getInTouch": "\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627",
        "rights": "\u062c\u0645\u064a\u0639 \u0627\u0644\u062d\u0642\u0648\u0642 \u0645\u062d\u0641\u0648\u0638\u0629.",
    },
}


def js_str(s: str) -> str:
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n") + '"'


def emit_dict(name: str, d: dict) -> str:
    lines = [f"const {name}: Dict = {{"]
    for section, vals in d.items():
        lines.append(f"  {section}: {{")
        items = list(vals.items())
        for i, (k, v) in enumerate(items):
            comma = "," if i < len(items) - 1 else ","
            lines.append(f"    {k}: {js_str(v)}{comma}")
        lines.append("  },")
    lines.append("};")
    return "\n".join(lines)


HEADER = '''export type Locale = "en" | "az" | "ru" | "tr" | "ar";

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
'''

FOOTER = """
export const dictionaries: Record<Locale, Dict> = { en, az, ru, tr, ar };
"""

parts = [
    HEADER,
    emit_dict("en", en),
    "",
    emit_dict("az", az),
    "",
    emit_dict("ru", ru),
    "",
    emit_dict("tr", tr),
    "",
    emit_dict("ar", ar),
    FOOTER,
]

OUT.write_text("\n".join(parts), encoding="utf-8", newline="\n")
text = OUT.read_text(encoding="utf-8")
for sample in ["Xidm\u0259tl\u0259r", "\u0423\u0441\u043b\u0443\u0433\u0438", "\u0627\u0644\u062e\u062f\u0645\u0627\u062a", "\u0130leti\u015fim"]:
    assert sample in text, f"missing {sample!r}"
print("Wrote", OUT, "bytes", OUT.stat().st_size)
