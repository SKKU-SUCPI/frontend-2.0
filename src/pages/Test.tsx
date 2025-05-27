import { useState } from "react";
import { postStudentLogin } from "@/apis/student/postStudentLogin";
import { postAdminLogin } from "@/apis/admin/postAdminLogin";

const Test = () => {
  const [loginStatus, setLoginStatus] = useState<string>("");

  const handleLogin = async () => {
    try {
      const response = await postStudentLogin();
      setLoginStatus(`로그인 성공: ${response}`);
    } catch (error) {
      setLoginStatus(`로그인 실패: ${error}`);
    }
  };

  const handleAdminLogin = async () => {
    try {
      const response = await postAdminLogin();
      setLoginStatus(`로그인 성공: ${response}`);
    } catch (error) {
      setLoginStatus(`로그인 실패: ${error}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">로그인 테스트 페이지</h1>
      <div className="space-y-4">
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          학생 로그인 테스트
        </button>
        <button
          onClick={handleAdminLogin}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          관리자 로그인 테스트
        </button>
      </div>
      {loginStatus && (
        <div className="mt-4 p-4 border rounded">
          <p>{loginStatus}</p>
        </div>
      )}
    </div>
  );
};

export default Test;
