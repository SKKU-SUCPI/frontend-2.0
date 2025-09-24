import { useQuery } from "@tanstack/react-query";
import getActivities, {
  ActivityCriterion,
} from "@/apis/common/getActivities";

export type GroupedActivities = Record<string, ActivityCriterion[]>; // key: categoryName(LQ/RQ/CQ) or activityClass

//const GROUP_BY: "categoryName" | "activityClass" = "categoryName";

export const ACTIVITIES_QUERY_KEY = ["criteria", "activities"] as const;

function groupActivities(
  items: ActivityCriterion[]
): { byCategory: GroupedActivities; byClass: GroupedActivities } {
  const byCategory: GroupedActivities = {};
  const byClass: GroupedActivities = {};
  for (const item of items) {
    const keyCategory = item.categoryName;
    const keyClass = item.activityClass;
    if (!byCategory[keyCategory]) byCategory[keyCategory] = [];
    if (!byClass[keyClass]) byClass[keyClass] = [];
    byCategory[keyCategory].push(item);
    byClass[keyClass].push(item);
  }
  return { byCategory, byClass };
}

export default function useActivities() {
  const query = useQuery({
    queryKey: ACTIVITIES_QUERY_KEY,
    queryFn: getActivities,
    staleTime: 24 * 60 * 60 * 1000, // 1 day
    gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
  });

  const grouped = query.data ? groupActivities(query.data) : undefined;

  return {
    ...query,
    grouped,
    list: query.data,
  };
}


