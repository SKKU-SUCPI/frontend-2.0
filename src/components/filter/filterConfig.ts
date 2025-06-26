// Admin
const adminActivityListFilterConfig = [
  {
    id: "name",
    label: "학생 이름",
    type: "text",
    defaultValue: null,
  },
  {
    id: "state",
    label: "상태",
    type: "select",
    defaultValue: null,
    options: [
      { id: 0, label: "대기" },
      { id: 1, label: "승인" },
      { id: 2, label: "반려" },
      { id: null, label: "전체" },
    ],
  },
  {
    id: "sort",
    label: "정렬",
    type: "select",
    defaultValue: "desc",
    options: [
      { id: "desc", label: "최신순" },
      { id: "asc", label: "오래된순" },
    ],
  },
];

const adminActivityDashboardFilterConfig = [
  {
    id: "startDate",
    label: "시작일",
    type: "date",
    defaultValue: null,
  },
  {
    id: "endDate",
    label: "종료일",
    type: "date",
    defaultValue: null,
  },
];

const adminStudentListFilterConfig = [
  {
    id: "name",
    label: "학생 이름",
    type: "text",
    defaultValue: null,
    width: 100,
  },
  {
    id: "department",
    label: "학과",
    type: "select",
    defaultValue: null,
    width: 100,
    options: [
      { id: null, label: "전체" },
      { id: "소프트웨어학과", label: "SW" },
      { id: "지능형소프트웨어학과", label: "ISW" },
      { id: "글로벌융합학과", label: "SCO" },
    ],
  },
  {
    id: "sort",
    label: "정렬",
    type: "select",
    defaultValue: null,
    options: [
      { id: null, label: "없음" },
      { id: "lqScore,desc", label: "LQ ↓" },
      { id: "rqScore,desc", label: "RQ ↓" },
      { id: "cqScore,desc", label: "CQ ↓" },
      { id: "lqScore,asc", label: "LQ ↑" },
      { id: "rqScore,asc", label: "RQ ↑" },
      { id: "cqScore,asc", label: "CQ ↑" },
    ],
  },
];

// Student
const studentActivityListFilterConfig = [
  {
    id: "state",
    label: "상태",
    type: "select",
    defaultValue: null,
    options: [
      { id: 0, label: "대기" },
      { id: 1, label: "승인" },
      { id: 2, label: "반려" },
      { id: null, label: "전체" },
    ],
  },
  {
    id: "sort",
    label: "정렬",
    type: "select",
    defaultValue: "desc",
    options: [
      { id: "desc", label: "최신순" },
      { id: "asc", label: "오래된순" },
    ],
  },
];

export {
  adminActivityListFilterConfig,
  adminActivityDashboardFilterConfig,
  adminStudentListFilterConfig,
  studentActivityListFilterConfig,
};
