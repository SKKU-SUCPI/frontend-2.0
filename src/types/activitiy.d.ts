export interface StudentActivityListItem {
  id: number;
  content: string;
  categoryName: "LQ" | "RQ" | "CQ";
  activityClass: string;
  activityDetail: string;
  state: 0 | 1 | 2;
  submitDate: string;
}


