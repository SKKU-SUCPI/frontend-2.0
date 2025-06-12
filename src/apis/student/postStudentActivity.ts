import axiosInstance from "@/apis/utils/axiosInterceptor";

const postStudentActivity = async ({
  activityId,
  content,
}: {
  activityId: number;
  content: string;
}) => {
  const response = await axiosInstance.post("/student/submits", {
    activityId,
    content,
  });
  return response.data;
};

export default postStudentActivity;
