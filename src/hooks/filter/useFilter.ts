import { useState, useMemo } from "react";

const useFilter = (filterConfig: any) => {
  // 초기 상태 생성 - config의 defaultValue 기반
  const initialState = useMemo(() => {
    return filterConfig.reduce((acc: any, config: any) => {
      acc[config.id] = config.defaultValue;
      return acc;
    }, {});
  }, [filterConfig]);

  // 실시간 변경되는 필터 상태 (UI용)
  const [filter, setFilter] = useState(initialState);

  // 적용된 필터 상태 (API 호출용)
  const [appliedFilter, setAppliedFilter] = useState(initialState);

  // 개별 필터 값 변경 (실시간)
  const handleFilterChange = (filterId: any, value: any) => {
    setFilter((prev: any) => ({ ...prev, [filterId]: value }));
  };

  // 필터 적용 (Apply 버튼용)
  const applyFilter = () => {
    setAppliedFilter({ ...filter });
  };

  // 필터 초기화
  const resetFilter = () => {
    setFilter(initialState);
    setAppliedFilter(initialState);
  };

  return {
    filter, // 실시간 변경되는 필터 (UI용)
    appliedFilter, // 적용된 필터 (API 호출용)
    handleFilterChange,
    applyFilter, // Apply 버튼용
    resetFilter,
  };
};

export default useFilter;
