import axiosInstance from "@/apis/utils/axiosInterceptor";

const postStudentActivity = async ({
  activityId,
  title,
  content,
}: {
  activityId: number;
  title: string;
  content: string;
}) => {
  const response = await axiosInstance.post("/student/submits", {
    activityId,
    title,
    content,
  });
  return response.data;
};

export default postStudentActivity;
