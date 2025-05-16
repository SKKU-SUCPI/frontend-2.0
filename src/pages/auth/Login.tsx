import React from "react";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/stores/auth/userStore";

const Login: React.FC = () => {
  console.log("Login");
  return (
    <div
      css={css`
        padding: 20px;
      `}
    >
      {(() => {
        const navigate = useNavigate();
        const { setUser } = useUserStore();

        const handleStudentLogin = () => {
          // 학생 로그인 처리
          setUser({
            user_id: 1,
            user_role: 0,
            user_name: "홍길동",
            user_hakbun: "2020123456",
            user_hakgwa_cd: "CS",
            user_year: 2020,
          });
          navigate("/student");
        };

        const handleAdminLogin = () => {
          // 관리자 로그인 처리
          setUser({
            user_id: 2,
            user_role: 1,
            user_name: "김관리",
            user_hakbun: "2010987654",
            user_hakgwa_cd: "AD",
            user_year: 2010,
          });
          navigate("/admin");
        };

        return (
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 16px;
              max-width: 300px;
              margin: 0 auto;
            `}
          >
            <h1
              css={css`
                text-align: center;
                margin-bottom: 20px;
              `}
            >
              로그인
            </h1>

            <button
              css={css`
                padding: 10px;
                background-color: #4caf50;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
                &:hover {
                  background-color: #45a049;
                }
              `}
              onClick={handleStudentLogin}
            >
              학생 로그인
            </button>

            <button
              css={css`
                padding: 10px;
                background-color: #2196f3;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
                &:hover {
                  background-color: #0b7dda;
                }
              `}
              onClick={handleAdminLogin}
            >
              관리자 로그인
            </button>
          </div>
        );
      })()}
    </div>
  );
};

export default Login;
