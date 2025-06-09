import activityTable from "./activity_table.json";

interface Activity {
  activity_id: number;
  category_id: number;
  activity_class: string;
  activity_name: string;
  activity_detail: string;
  activity_weight: number;
  activity_domain: number;
}

export const getActivityById = (activityId: number): Activity | undefined => {
  return activityTable.find((activity) => activity.activity_id === activityId);
};
