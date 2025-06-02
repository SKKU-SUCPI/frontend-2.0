const transformTotalAverage = (data: {
  rq: number;
  lq: number;
  cq: number;
}) => {
  if (!data) return [];
  return [
    {
      name: "RQ",
      description: "Research Quotient",
      score: Math.round(data?.rq * 100) / 100,
    },
    {
      name: "LQ",
      description: "Learning Quotient",
      score: Math.round(data?.lq * 100) / 100,
    },
    {
      name: "CQ",
      description: "Communication Quotient",
      score: Math.round(data?.cq * 100) / 100,
    },
  ];
};

const transformDepartmentAverage = (
  data: Record<string, { lq: number; rq: number; cq: number }>
) => {
  if (!data) return { RQ: [], LQ: [], CQ: [] };
  const convertName = (name: string) => {
    if (name === "sw") return "소프트웨어";
    if (name === "soc") return "글로벌융합";
    if (name === "intelligentSw") return "지능형소프트";
    return name;
  };

  const RQ: { name: string; score: number }[] = [];
  const LQ: { name: string; score: number }[] = [];
  const CQ: { name: string; score: number }[] = [];

  Object.entries(data).forEach(([dept, scores]) => {
    RQ.push({
      name: convertName(dept),
      score: Math.round(scores.rq * 100) / 100,
    });
    LQ.push({
      name: convertName(dept),
      score: Math.round(scores.lq * 100) / 100,
    });
    CQ.push({
      name: convertName(dept),
      score: Math.round(scores.cq * 100) / 100,
    });
  });

  return { RQ, LQ, CQ };
};

export { transformTotalAverage, transformDepartmentAverage };
