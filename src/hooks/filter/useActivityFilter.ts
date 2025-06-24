import { useState } from "react";

interface ActivityFilter {
  name: string | null;
  state: number | null;
  sort: string;
}

const useActivityFilter = () => {
  const [filter, setFilter] = useState<ActivityFilter>({
    name: null,
    state: null,
    sort: "desc",
  });

  const updateFilter = (key: keyof ActivityFilter, value: any) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilter = () => {
    setFilter({
      name: null,
      state: null,
      sort: "desc",
    });
  };

  return { filter, updateFilter, resetFilter };
};

export default useActivityFilter;
