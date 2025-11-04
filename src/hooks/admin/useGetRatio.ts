import { useQuery } from "@tanstack/react-query";
import getRatio from "@/apis/admin/getRatio";

export const RATIO_QUERY_KEY = ["admin", "ratio"] as const;

export default function useGetRatio() {
  return useQuery({
    queryKey: RATIO_QUERY_KEY,
    queryFn: getRatio,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}

