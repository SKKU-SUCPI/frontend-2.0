import { useQuery } from "@tanstack/react-query";
import getStudent3qAverage from "@/apis/student/getStudent3qAverage";

const useStudent3qAverages = () => {
  return useQuery({
    queryKey: ["student3qAverages"],
    queryFn: getStudent3qAverage,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useStudent3qAverages;
