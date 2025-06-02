import axiosInstance from "@/apis/utils/axiosInterceptor";
// {
//   "id": 0,
//   "name": "string",
//   "department": "string",
//   "studentId": "string",
//   "role": "string"
// }
const getProfile = async () => {
  const response = await axiosInstance.get("/auth/profile");
  return response.data.data;
};

export default getProfile;
