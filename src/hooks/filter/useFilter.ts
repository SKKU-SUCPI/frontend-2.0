import { useState, useMemo } from "react";

const useFilter = (filterConfig: any) => {
  const initialState = useMemo(() => {
    return filterConfig.reduce((acc: any, config: any) => {
      acc[config.id] = config.defaultValue;
      return acc;
    }, {});
  }, [filterConfig]);

  const [filter, setFilter] = useState(initialState);

  const handleFilterChange = (filterId: any, value: any) => {
    setFilter((prev: any) => ({ ...prev, [filterId]: value }));
  };

  const resetFilter = () => {
    setFilter(initialState);
  };

  return { filter, handleFilterChange, resetFilter };
};

export default useFilter;
