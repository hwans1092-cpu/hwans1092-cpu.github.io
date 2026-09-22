/* SAP Learning Hub 자료실 — 전체 계층 데이터
   노션 "SAP Learning Hub" 원본 구조를 그대로 옮긴 것.
   journey → course(= 노트 HTML 1건) → 노션 페이지 n개(= 노트 안의 LESSON n개)

   st: "done" 변환 완료 · "todo" 변환 대기 · "ref" 다른 저니의 노트를 링크로 재사용
   src: 노션 원본 페이지 ID (재변환·대조용)
*/
window.HUB = {
  updated: "2026-09-15",
  journeys: [
    {
      key: "sd", label: "SD", color: "#4338CA",
      title: "Implementing Sales in SAP S/4HANA Cloud Private Edition",
      desc: "SAP S/4HANA Cloud Private Edition, Sales 컨설턴트 인증 학습 경로. 수주부터 출하·청구·가격결정까지.",
      src: "3b2a087b-1d4b-81dd-b5c8-cc38a6faf5b5",
      courses: [
        { no:1,  code:"S46000",     slug:"s46000-sales-essentials",   title:"SAP S/4HANA Sales Essentials",        hours:"6 hr+",  pages:4, st:"done" },
        { no:2,  code:"S46001",     slug:"s46001-availability-check", title:"가용성확인(ATP)과 BOP",                hours:"3 hr+",  pages:2, st:"done" },
        { no:3,  code:"S46050",     slug:"s46050-fundamental-customizing", title:"Sales 기본 Customizing",         hours:"7 hr",   pages:4, st:"done" },
        { no:4,  code:"S46051",     slug:"s46051-outline-agreements", title:"Outline Agreement — 계약·일정계약",     hours:"3 hr+",  pages:2, st:"done" },
        { no:5,  code:"S46052",     slug:"s46052-incompletion",       title:"Incompletion Procedure",              hours:"40 min", pages:1, st:"done" },
        { no:6,  code:"S46055",     slug:"s46055-output-control",     title:"Output Control 구성",                  hours:"3 hr+",  pages:2, st:"done" },
        { no:7,  code:"S46056",     slug:"s46056-text-control",       title:"Text Control 설정",                    hours:"3 hr+",  pages:2, st:"done" },
        { no:8,  code:"S46100",     slug:"s46100-delivery-processing",title:"납품(Delivery) 처리 구성",              hours:"11 hr+", pages:6, st:"done" },
        { no:9,  code:"S46150",     slug:"s46150-billing",            title:"청구(Billing) 구성",                   hours:"12 hr+", pages:6, st:"done" },
        { no:10, code:"S46200",     slug:"s46200-pricing",            title:"Pricing 구성 — Condition Technique",   hours:"14 hr+", pages:7, st:"done" },
        { no:11, code:"SL_RISE419", slug:"rise-methodology",          title:"RISE with SAP Methodology",           hours:"1 hr+",  pages:1, st:"done", shared:true },
        { no:12, code:"S4C03",      slug:"s4c03-implementing-pce",    title:"S/4HANA Cloud Private Edition 구현",   hours:"12 hr+", pages:8, st:"done", shared:true }
      ]
    },
    {
      key: "fi", label: "FI", color: "#047857",
      title: "Implementing Financial Accounting in SAP S/4HANA",
      desc: "재무회계 컨설턴트 인증 경로. 조직단위·전표통제부터 결산마감·자산회계까지.",
      src: "3b3a087b-1d4b-81dc-9d3b-d860174668f0",
      courses: [
        { no:1, code:"S4F12",      slug:"s4f12-core-settings",     title:"FI 핵심 설정 — 조직단위·원장·전표통제", hours:"13 hr+", pages:2, st:"done" },
        { no:2, code:"S4F13",      slug:"s4f13-additional",        title:"추가 설정 — 지급·독촉·특수G/L·검증대체", hours:"14 hr+", pages:7, st:"done" },
        { no:3, code:"S4F15",      slug:"s4f15-financial-closing", title:"결산마감 구성",                        hours:"13 hr+", pages:9, st:"done" },
        { no:4, code:"S4F17",      slug:"s4f17-asset-accounting",  title:"자산회계 구성",                        hours:"22 hr+", pages:6, st:"done" },
        { no:5, code:"S4C03",      slug:"../sd/s4c03-implementing-pce", title:"S/4HANA Cloud PCE 구현",          hours:"12 hr+", pages:8, st:"ref", refJourney:"sd" },
        { no:6, code:"SL_RISE419", slug:"../sd/rise-methodology",  title:"RISE with SAP Methodology",            hours:"1 hr+",  pages:1, st:"ref", refJourney:"sd" }
      ]
    },
    {
      key: "mm", label: "MM", color: "#B45309",
      title: "Sourcing and Procurement (SAP S/4HANA Cloud PCE)",
      desc: "구매 컨설턴트 인증 경로. 구매프로세스·소스결정·재고관리·송장검증·크로스펑셔널 Customizing.",
      src: "3b3a087b-1d4b-81a4-b3df-f8793f6048fc",
      courses: [
        { no:1, code:"S4500",      slug:"s4500-business-processes", title:"구매 비즈니스 프로세스 전반",      hours:"9 Units", pages:5,  st:"done" },
        { no:2, code:"S4520",      slug:"s4520-purchasing",         title:"Purchasing — 소스결정·승인·문서유형", hours:"9 Units", pages:9,  st:"done" },
        { no:3, code:"S45250",     slug:"s45250-cbp-forecasting",   title:"소비기반계획(CBP)과 예측",          hours:"3 hr+",   pages:3,  st:"done" },
        { no:4, code:"S4510",      slug:"s4510-inventory",          title:"재고관리와 실사재고조사",            hours:"10 Units",pages:10, st:"done" },
        { no:5, code:"S4515",      slug:"s4515-invoice-verification",title:"송장검증(Invoice Verification)",   hours:"7 Units", pages:7,  st:"done" },
        { no:6, code:"S4550",      slug:"s4550-cross-functional",   title:"MM 크로스펑셔널 Customizing",       hours:"7 Units", pages:10, st:"done" },
        { no:7, code:"SL_RISE419", slug:"../sd/rise-methodology",   title:"RISE with SAP Methodology",         hours:"1 hr+",   pages:1,  st:"ref", refJourney:"sd" }
      ]
    },
    {
      key: "pp", label: "PP", color: "#BE185D",
      title: "Implementing Manufacturing in SAP S/4HANA Cloud PCE",
      desc: "생산계획·제조 컨설턴트 인증 경로. 이산/프로세스 생산, 기준정보, MRP·PP/DS, 능력계획, 생산오더.",
      src: "3b4a087b-1d4b-8172-b5ce-f27b91622c29",
      courses: [
        { no:1,  code:"S4C03",      slug:"../sd/s4c03-implementing-pce", title:"S/4HANA Cloud PCE 구현",       hours:"12 hr+", pages:8, st:"ref", refJourney:"sd" },
        { no:2,  code:"SL_RISE419", slug:"../sd/rise-methodology",       title:"RISE with SAP Methodology",     hours:"1 hr+",  pages:1, st:"ref", refJourney:"sd" },
        { no:3,  code:"S42000",     slug:"s42000-manufacturing-basics",  title:"제조 기초 — 공급망계획 개요",     hours:"2 hr",   pages:1, st:"done" },
        { no:4,  code:"S42010",     slug:"s42010-pp-processes",          title:"생산계획 프로세스",               hours:"2 hr+",  pages:1, st:"done" },
        { no:5,  code:"S42020",     slug:"s42020-discrete-shopfloor",    title:"이산생산 현장관리",               hours:"6 hr+",  pages:2, st:"done" },
        { no:6,  code:"S42025",     slug:"s42025-process-shopfloor",     title:"프로세스생산 현장관리",            hours:"6 hr+",  pages:2, st:"done" },
        { no:7,  code:"S42100",     slug:"s42100-basic-data",            title:"제조 기준정보 — 자재·BOM·작업장·라우팅", hours:"12 hr+", pages:8, st:"done" },
        { no:8,  code:"S42220",     slug:"s42220-production-planning",   title:"생산계획 — 수요관리·MRP Live",     hours:"6 hr+",  pages:2, st:"done" },
        { no:9,  code:"S42240",     slug:"s42240-ppds",                  title:"PP/DS 고급 생산계획",              hours:"14 hr+", pages:4, st:"done" },
        { no:10, code:"S42300",     slug:"s42300-capacity-planning",     title:"능력계획(Capacity Planning)",      hours:"5 hr+",  pages:1, st:"done" },
        { no:11, code:"S4260",      slug:"s4260-production-orders",      title:"생산오더 관리",                    hours:"6 hr+",  pages:3, st:"done" }
      ]
    },
    {
      key: "tadm10", label: "BASIS", color: "#0F766E",
      title: "Technical Implementation and Operation I (TADM10)",
      desc: "54시간 21 Unit. 커널·워크프로세스, 사용자/권한, RFC·IDoc, Fiori 기반, 모니터링, 시작·중지, HTTP 통신.",
      src: "3b4a087b-1d4b-8115-9edd-db443e72947d",
      courses: [
        { no:1, code:"U1-3",   slug:"tadm10-01-foundation",     title:"전략 개관 · 시스템 커널 · 소프트웨어 개발",      hours:"Unit 1-5",   pages:3, st:"done" },
        { no:2, code:"U6-8",   slug:"tadm10-02-authorization",  title:"사용자·권한(ABAP · Java) · 통신 기술(RFC·IDoc)", hours:"Unit 6-8",   pages:3, st:"done" },
        { no:3, code:"U9-11",  slug:"tadm10-03-fiori-monitoring",title:"SAP Fiori 기초 · 시스템 모니터링·트러블슈팅",   hours:"Unit 9-11",  pages:4, st:"done" },
        { no:4, code:"U12-15", slug:"tadm10-04-start-stop",     title:"시작·중지와 시스템 구성 도구",                  hours:"Unit 12-15", pages:5, st:"done" },
        { no:5, code:"U16",    slug:"tadm10-05-http",           title:"HTTP 통신 — ICM · ICF · Gateway · Web Dispatcher", hours:"Unit 16", pages:5, st:"done" },
        { no:6, code:"U17-21", slug:"tadm10-06-fiori-landscape",title:"Fiori 랜드스케이프 · 앱 구현 · SAPconnect",      hours:"Unit 17-21", pages:5, st:"done" }
      ]
    },
    {
      key: "iee2e", label: "E2E", color: "#7C3AED",
      title: "IEE2E — Exploring End-to-End Business Processes",
      desc: "모듈을 가로지르는 E2E 프로세스 개관. FI/CO 기초, Recruit-to-Retire, Source-to-Pay.",
      src: "3a9a087b-1d4b-80a0-ae16-e7d53ca18ab1",
      courses: [
        { no:1, code:"U1", slug:"iee2e-01-e2e-processes",  title:"E2E 프로세스와 통합 과제",        hours:"—", pages:1, st:"done" },
        { no:2, code:"U2", slug:"iee2e-02-business-suite", title:"SAP Business Suite 개관",         hours:"—", pages:1, st:"done" },
        { no:3, code:"U3", slug:"iee2e-03-central-objects",title:"핵심 개념과 오브젝트",             hours:"—", pages:1, st:"done" },
        { no:4, code:"U4", slug:"iee2e-04-fico",           title:"FI/CO — G/L·AP·AR·자산·병행회계·간접비", hours:"—", pages:6, st:"done" },
        { no:5, code:"U5", slug:"iee2e-05-recruit-to-retire", title:"Recruit-to-Retire (HXM)",      hours:"—", pages:1, st:"done" },
        { no:6, code:"U6", slug:"iee2e-06-source-to-pay",  title:"Source-to-Pay (조달)",            hours:"—", pages:1, st:"done" }
      ]
    }
  ],
  standalone: [
    { slug:"fi-e2e-guide",  title:"FI End-to-End 프로세스 가이드", src:"3b4a087b-1d4b-8160-b83e-f250458dce24", st:"done" },
    { slug:"knowledge-map", title:"SAP S/4HANA 통합 지식맵",       src:"3cfa087b-1d4b-81e1-88bd-e4f54cce71f1", st:"done" }
  ]
};
