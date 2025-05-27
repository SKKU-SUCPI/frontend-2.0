import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      {/* 상단 네비게이션 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "32px 40px 0 32px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 40,
              height: 40,
              background: "#1DB954",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
            }}
          >
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 24 }}>
              S
            </span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 28, color: "#222" }}>
            SUCPI
          </span>
        </div>
        <div style={{ color: "#888", fontSize: 16, display: "flex", gap: 24 }}>
          <span>서비스 안내</span>
          <span>문의하기</span>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        {/* 왼쪽 설명 */}
        <div style={{ width: 500, marginRight: 80 }}>
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: "#222",
              lineHeight: 1.2,
            }}
          >
            학생 역량 관리
            <br />
            <span style={{ color: "#1DB954" }}>플랫폼 SUCPI</span>
          </div>
          <div
            style={{
              margin: "32px 0 40px 0",
              color: "#555",
              fontSize: 18,
              lineHeight: 1.6,
            }}
          >
            SUCPI는 학생들의 Learning, Research, Communication Quotient를
            체계적으로 관리하고 성장을 지원하는 통합 플랫폼입니다.
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                background: "#F6FBF7",
                borderRadius: 12,
                padding: 20,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 24, color: "#1DB954" }}>📊</span>
              <div>
                <div style={{ fontWeight: 700, color: "#222" }}>
                  실시간 분석
                </div>
                <div style={{ color: "#888", fontSize: 14 }}>
                  성과 데이터 시각화
                </div>
              </div>
            </div>
            <div
              style={{
                background: "#F6FBF7",
                borderRadius: 12,
                padding: 20,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 24, color: "#1DB954" }}>👥</span>
              <div>
                <div style={{ fontWeight: 700, color: "#222" }}>
                  학과별 비교
                </div>
                <div style={{ color: "#888", fontSize: 14 }}>
                  동료와의 성과 비교
                </div>
              </div>
            </div>
            <div
              style={{
                background: "#F6FBF7",
                borderRadius: 12,
                padding: 20,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 24, color: "#1DB954" }}>🎯</span>
              <div>
                <div style={{ fontWeight: 700, color: "#222" }}>성취 추적</div>
                <div style={{ color: "#888", fontSize: 14 }}>
                  목표 달성 관리
                </div>
              </div>
            </div>
            <div
              style={{
                background: "#F6FBF7",
                borderRadius: 12,
                padding: 20,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 24, color: "#1DB954" }}>🗂️</span>
              <div>
                <div style={{ fontWeight: 700, color: "#222" }}>활동 관리</div>
                <div style={{ color: "#888", fontSize: 14 }}>
                  체계적인 활동 기록
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 로그인 박스 */}
        <div
          style={{
            width: 400,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
            padding: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontWeight: 800,
              fontSize: 24,
              color: "#222",
              marginBottom: 12,
            }}
          >
            SUCPI 로그인
          </div>
          <div style={{ color: "#888", fontSize: 16, marginBottom: 24 }}>
            대학교 통합 인증 시스템으로 로그인하세요
          </div>
          <button
            style={{
              width: "100%",
              background: "#1DB954",
              color: "#fff",
              fontWeight: 700,
              fontSize: 18,
              border: "none",
              borderRadius: 8,
              padding: "16px 0",
              marginBottom: 16,
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/login");
            }}
          >
            대학교 계정으로 로그인
          </button>
          <div style={{ color: "#888", fontSize: 15 }}>
            문제가 있으신가요?{" "}
            <span
              style={{ color: "#1DB954", fontWeight: 600, cursor: "pointer" }}
            >
              도움말
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
