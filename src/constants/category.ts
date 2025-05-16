export interface MiddleCategory {
  name: string; // 중분류(예: 학술지 논문게재, 학술대회 발표 등)
  subCategories: string[]; // 소분류 목록(세부 산출 기준 등)
}

export interface BigCategoryData {
  name: "RQ" | "LQ" | "CQ"; // 대분류
  items: MiddleCategory[];
}

export const categoriesData: BigCategoryData[] = [
  {
    name: "RQ", // 연구/학술 관련
    items: [
      {
        name: "학술지 논문게재",
        subCategories: [
          // 인문사회계
          "(인문사회계) SCI, SSCI, A&HCI급 학술지",
          "(인문사회계) KCI 우수등재 학술지",
          "(인문사회계) KCI 등재",
          "(인문사회계) KCI 후보, 기타국제",
          // 과학기술계
          "(과학기술계) JCR 상위 5% 이내 학술지(주저/공저)",
          "(과학기술계) JCR 상위 10% 이내 학술지(주저/공저)",
          "(과학기술계) JCR 상위 20% 이내 학술지(주저/공저)",
        ],
      },
      {
        name: "학술대회 발표",
        subCategories: [
          // 인문사회계
          "(인문사회계) 저명 국제학술대회 발표(BK기준 4/3/2/1)",
          "(인문사회계) 일반 국제학술대회 발표",
          "(인문사회계) 국내학술대회 발표",
          // 과학기술계
          "(과학기술계) 학술대회 구두발표",
          "(과학기술계) 포스터발표 (*50%)",
        ],
      },
      {
        name: "공모전/ICPC",
        subCategories: [
          // 인문사회계
          "(인문사회계) 국제/대규모 공모전(ICPC, 공개SW개발자대회)",
          "(인문사회계) 교내/지역 공모전",
          // 과학기술계
          "(과학기술계) 대상/입상, 참여",
        ],
      },
    ],
  },
  {
    name: "LQ", // 리더십/교육 관련
    items: [
      {
        name: "교육활동",
        subCategories: [
          "교내외의 교육 활동(초/중/고/대멘토링, 동료 티칭 등 학과장 승인건)",
          "교육조교 활동(학부생 TA)",
        ],
      },
      {
        name: "교육 성취도",
        subCategories: [
          "학점 4.0 이상 ~ 4.5 이하",
          "학점 3.5 이상 ~ 4.0 미만",
          "학점 3.0 이상 ~ 3.5 미만",
        ],
      },
      {
        name: "오픈소스 SW활동",
        subCategories: [
          "OS커뮤니티 생성 및 활성도(5/4/3) - 운영위 심사",
          "커미터로서의 활동(5/4/3) - 운영위 심사",
        ],
      },
    ],
  },
  {
    name: "CQ", // 창의/활동 관련
    items: [
      {
        name: "산학프로젝트",
        subCategories: ["수행"],
      },
      {
        name: "인턴십",
        subCategories: ["수행"],
      },
      {
        name: "창업",
        subCategories: ["수행"],
      },
      {
        name: "해외봉사",
        subCategories: ["수행"],
      },
      {
        name: "화상강연/세미나 참여",
        subCategories: ["참여"],
      },
      {
        name: "알리미",
        subCategories: ["회장", "부회장", "임원진", "참여"],
      },
      {
        name: "학생회",
        subCategories: ["회장", "부회장", "임원진", "참여"],
      },
      {
        name: "SCG",
        subCategories: ["회장", "부회장", "임원진", "참여"],
      },
      {
        name: "미디어홍보",
        subCategories: ["회장", "부회장", "임원진", "참여"],
      },
      {
        name: "스튜디오기어",
        subCategories: ["참여"],
      },
      {
        name: "스터디그룹",
        subCategories: ["회장", "참여"],
      },
    ],
  },
];
