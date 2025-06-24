import { useQuery } from "@tanstack/react-query";
import getSubmitSummary from "@/apis/admin/getSubmitSummary";

export const transformSubmitSummary = (data: any) => {
  // data: { lq: {currentMonth, lastMonth, total}, rq: {...}, cq: {...} }
  if (!data)
    return [
      {
        color: "#0088FE",
        title: "Learning Quotient (LQ)",
        month: 0,
        change: 0,
        total: 0,
      },
      {
        color: "#00C49F",
        title: "Research Quotient (RQ)",
        month: 0,
        change: 0,
        total: 0,
      },
      {
        color: "#FFBB28",
        title: "Communication Quotient (CQ)",
        month: 0,
        change: 0,
        total: 0,
      },
    ];
  return [
    {
      color: "#0088FE",
      title: "Learning Quotient (LQ)",
      month: data.lq.currentMonth,
      change: data.lq.currentMonth - data.lq.lastMonth,
      total: data.lq.total,
    },
    {
      color: "#00C49F",
      title: "Research Quotient (RQ)",
      month: data.rq.currentMonth,
      change: data.rq.currentMonth - data.rq.lastMonth,
      total: data.rq.total,
    },
    {
      color: "#FFBB28",
      title: "Communication Quotient (CQ)",
      month: data.cq.currentMonth,
      change: data.cq.currentMonth - data.cq.lastMonth,
      total: data.cq.total,
    },
  ];
};

const useSubmitSummary = () => {
  return useQuery({
    queryKey: ["submitSummary"],
    queryFn: getSubmitSummary,
    select: (data) => transformSubmitSummary(data),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useSubmitSummary;
