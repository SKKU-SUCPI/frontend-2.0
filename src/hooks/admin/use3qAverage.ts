import { useQuery } from "@tanstack/react-query";
import {
  get3qTotalAverage,
  get3qDepartmentAverage,
} from "@/apis/admin/get3qAverage";

const use3qTotalAverage = () => {
  return useQuery({
    queryKey: ["3qTotalAverage"],
    queryFn: get3qTotalAverage,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

const use3qDepartmentAverage = () => {
  return useQuery({
    queryKey: ["3qDepartmentAverage"],
    queryFn: get3qDepartmentAverage,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export { use3qTotalAverage, use3qDepartmentAverage };
