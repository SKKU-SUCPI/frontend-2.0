import { useQuery } from "@tanstack/react-query";
import getStudent3qInfo from "@/apis/student/getStudent3qInfo";

const useStudent3qInfo = () => {
  return useQuery({
    queryKey: ["student3qInfo"],
    queryFn: getStudent3qInfo,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useStudent3qInfo;
