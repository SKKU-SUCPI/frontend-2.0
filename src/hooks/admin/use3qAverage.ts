import { useQuery } from "@tanstack/react-query";
import {
  get3qTotalAverage,
  get3qDepartmentAverage,
} from "@/apis/admin/get3qAverage";

const use3qTotalAverage = () => {
  return useQuery({
    queryKey: ["3qTotalAverage"],
    queryFn: get3qTotalAverage,
  });
};

const use3qDepartmentAverage = () => {
  return useQuery({
    queryKey: ["3qDepartmentAverage"],
    queryFn: get3qDepartmentAverage,
  });
};

export { use3qTotalAverage, use3qDepartmentAverage };
