import { useState } from "react";

interface StudentFilter {
  name: string | null;
  department: string | null;
  sort: string;
}

const useStudentFilter = () => {
  const [filter, setFilter] = useState<StudentFilter>({
    name: null,
    department: null,
    sort: "desc",
  });

  const updateFilter = (key: keyof StudentFilter, value: any) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilter = () => {
    setFilter({
      name: null,
      department: null,
      sort: "desc",
    });
  };

  return { filter, updateFilter, resetFilter };
};

export default useStudentFilter;
