import { useQuery } from "@tanstack/react-query";
import getStudent3qAverage from "@/apis/student/getStudent3qAverage";

const useStudent3qAverages = () => {
  return useQuery({
    queryKey: ["student3qAverages"],
    queryFn: getStudent3qAverage,
  });
};

export default useStudent3qAverages;
