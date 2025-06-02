import React, { useState } from "react";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import {
  getStudentLogin,
  getAdminLogin,
  getSuperAdminLogin,
} from "@/apis/auth/getLogin";
import useRefresh from "@/hooks/auth/useRefresh";
import postSSOLogin from "@/apis/auth/postSSOLogin";
// 하드코딩된 계정 정보
const HARDCODED_ACCOUNTS = {
  student: {
    id: "student",
    password: "1234",
    redirect: "/student",
  },
  admin: {
    id: "admin",
    password: "1234",
    redirect: "/admin",
  },
  superadmin: {
    id: "super",
    password: "1234",
    redirect: "/superAdmin",
  },
};

const Login: React.FC = () => {
  const { run } = useRefresh();
  return (
    <div
      css={css`
        padding: 20px;
      `}
    >
      {(() => {
        const navigate = useNavigate();
        const [id, setId] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState("");

        const handleLogin = async () => {
          setError("");

          // 입력된 계정 정보로 로그인 시도
          const account = Object.values(HARDCODED_ACCOUNTS).find(
            (acc) => acc.id === id && acc.password === password
          );

          if (account) {
            try {
              // 계정 타입에 따라 적절한 로그인 API 호출
              if (account.id === "student") {
                await getStudentLogin();
                await run();
              } else if (account.id === "admin") {
                await getAdminLogin();
                await run();
              } else if (account.id === "super") {
                await getSuperAdminLogin();
                await run();
              }
              navigate(account.redirect);
            } catch (error) {
              setError("로그인 중 오류가 발생했습니다.");
              console.error(error);
              setId("");
              setPassword("");
            }
          } else {
            setError("아이디 또는 비밀번호가 올바르지 않습니다.");
            setId("");
            setPassword("");
          }
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
            <p>SSO 도입 전 임시 로그인 페이지</p>
            <p>SSO 도입 시 해당 페이지 삭제</p>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 12px;
              `}
            >
              <input
                type="text"
                placeholder="아이디"
                value={id}
                onChange={(e) => setId(e.target.value)}
                css={css`
                  padding: 10px;
                  border: 1px solid #ddd;
                  border-radius: 4px;
                  font-size: 16px;
                  &:focus {
                    outline: none;
                    border-color: #2196f3;
                  }
                `}
              />
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                css={css`
                  padding: 10px;
                  border: 1px solid #ddd;
                  border-radius: 4px;
                  font-size: 16px;
                  &:focus {
                    outline: none;
                    border-color: #2196f3;
                  }
                `}
              />
              {error && (
                <p
                  css={css`
                    color: #f44336;
                    margin: 0;
                    font-size: 14px;
                  `}
                >
                  {error}
                </p>
              )}
            </div>
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
              onClick={handleLogin}
            >
              로그인
            </button>
            <button
              css={css`
                padding: 10px;
                background-color: green;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
              `}
              onClick={() => {
                postSSOLogin();
                run();
              }}
            >
              SSO 테스트
            </button>{" "}
          </div>
        );
      })()}
    </div>
  );
};

export default Login;
