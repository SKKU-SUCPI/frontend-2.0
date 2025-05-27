import { useState } from "react";
import {
  getStudentLogin,
  getAdminLogin,
  getSuperAdminLogin,
} from "@/apis/auth/getLogin";
import getLogout from "@/apis/auth/getLogout";
import getRefresh from "@/apis/auth/getRefresh";

const Test = () => {
  const [loginStatus, setLoginStatus] = useState<string>("");

  const handleLogin = async () => {
    try {
      const response = await getStudentLogin();
      setLoginStatus(`로그인 성공: ${response}`);
    } catch (error) {
      setLoginStatus(`로그인 실패: ${error}`);
    }
  };

  const handleAdminLogin = async () => {
    try {
      const response = await getAdminLogin();
      setLoginStatus(`로그인 성공: ${response}`);
    } catch (error) {
      setLoginStatus(`로그인 실패: ${error}`);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await getLogout();
      setLoginStatus(`로그아웃 성공: ${response}`);
    } catch (error) {
      setLoginStatus(`로그아웃 실패: ${error}`);
    }
  };

  const handleSuperAdminLogin = async () => {
    try {
      const response = await getSuperAdminLogin();
      setLoginStatus(`로그인 성공: ${response}`);
    } catch (error) {
      setLoginStatus(`로그인 실패: ${error}`);
    }
  };

  const handleRefresh = async () => {
    try {
      const response = await getRefresh();
      setLoginStatus(`리프레시 성공: ${response}`);
    } catch (error) {
      setLoginStatus(`리프레시 실패: ${error}`);
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
        <button
          onClick={handleSuperAdminLogin}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          슈퍼 관리자 로그인 테스트
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          로그아웃 테스트
        </button>
        <button
          onClick={handleRefresh}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          리프레시 테스트
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
