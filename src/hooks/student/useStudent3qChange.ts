import { useQuery } from "@tanstack/react-query";
import getStudent3qChange from "@/apis/student/getStudent3qChange";

const useStudent3qChange = () => {
  return useQuery({
    queryKey: ["student3qChange"],
    queryFn: getStudent3qChange,
  });
};

export default useStudent3qChange;
