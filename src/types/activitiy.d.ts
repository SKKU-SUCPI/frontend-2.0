export interface StudentActivityListItem {
  id: number;
  title?: string;  // TODO: title 널처리 수정 필요
  content: string;
  categoryName: "LQ" | "RQ" | "CQ";
  activityClass: string;
  activityDetail: string;
  state: 0 | 1 | 2;
  submitDate: string;
  activityWeight?: number;
}

export interface ActivityComment {
  id: number;
  content: string;
  date: string; // ISO string
  userId: number;
  userName: string;
}


