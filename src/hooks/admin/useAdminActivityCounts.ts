import { useQueries } from "@tanstack/react-query";
import { getAdminActivityCount } from "@/apis/admin/getAdminActivityCount";

export const useAdminActivityCounts = (
  startDate: string | null,
  endDate: string | null
) => {
  // 1부터 57까지의 activityId 배열 생성
  const activityIds = Array.from({ length: 57 }, (_, i) => i + 1);

  // 날짜를 ISO 형식으로 변환
  const formatDateToISO = (dateString: string | null): string | null => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toISOString();
  };

  const isoStartDate = formatDateToISO(startDate);
  const isoEndDate = formatDateToISO(endDate);

  const queries = useQueries({
    queries: activityIds.map((activityId) => ({
      queryKey: ["adminActivityCounts", activityId, isoStartDate, isoEndDate],
      queryFn: () =>
        getAdminActivityCount(activityId, isoStartDate, isoEndDate),
    })),
  });

  // 모든 쿼리가 로딩 중인지 확인
  const isLoading = queries.some((query) => query.isLoading);

  // 에러가 있는지 확인
  const error = queries.find((query) => query.error)?.error;

  // 데이터를 객체 형태로 변환
  const data = queries.reduce((acc, query, index) => {
    if (query.data) {
      acc[activityIds[index]] = query.data.total;
    }
    return acc;
  }, {} as Record<number, any>);

  return {
    data,
    isLoading,
    error,
  };
};
