import React, { useState } from "react";
import { css } from "@emotion/react";
import FlexBox from "@/styles/components/Flexbox";
import Card from "@/styles/components/Card";
import ActivityMainContentSubmit from "./ActivityMainContentSubmit";

const containerStyle = css`
  width: 1200px;
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
`;

const mainContentStyle = css`
  flex: 1;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  width: 100%;
`;

const sideBarStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 380px;
  padding: 0 1.5rem;
  max-height: 90vh;
`;

const sideBarTitleStyle = css`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const categoryTitleStyle = css`
  font-weight: 600;
  color: #1a73e8;
  margin-bottom: 8px;
  font-size: 1rem;
`;

const subCategoryStyle = css`
  margin-left: 16px;
  margin-bottom: 12px;
`;

const subCategoryTitleStyle = css`
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
  font-size: 0.875rem;
`;

const activityTextStyle = css`
  font-size: 0.8rem;
  color: #666;
  line-height: 1.4;
  margin-left: 12px;
`;

const infoBoxStyle = css`
  background-color: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const tipBoxStyle = css`
  background-color: #d1ecf1;
  border: 1px solid #17a2b8;
  border-radius: 8px;
  padding: 16px;
`;

const ActivitySubmitForm: React.FC = () => {
  return (
    <div css={containerStyle}>
      {/* 메인 컨텐츠 영역 */}
      <div css={mainContentStyle}>
        <ActivityMainContentSubmit />
      </div>

      {/* 사이드바 영역 */}
      <div css={sideBarStyle}>
        <div css={infoBoxStyle}>
          <div style={{ fontWeight: 600, marginBottom: 8, color: "#856404" }}>
            ⚠️ 제출 전 확인사항
          </div>
          <div css={activityTextStyle} style={{ color: "#856404" }}>
            • 모든 활동은 증빙자료 첨부 필수
            <br />
            • 활동별 점수가 높을수록 더 많은 증빙 필요
            <br />• 허위 제출 시 불이익이 있을 수 있음
          </div>
        </div>

        <Card flex={false} width="100%">
          <h3 css={sideBarTitleStyle}>카테고리별 활동 안내</h3>

          <div style={{ marginBottom: 20 }}>
            <div css={categoryTitleStyle}>📚 교육활동 (LQ)</div>

            <div css={subCategoryStyle}>
              <div css={subCategoryTitleStyle}>교육활동</div>
              <div css={activityTextStyle}>
                • 교내외 교육 활동
                <br />• 교육조교(TA) 활동
              </div>
            </div>

            <div css={subCategoryStyle}>
              <div css={subCategoryTitleStyle}>학업성취도</div>
              <div css={activityTextStyle}>
                • 학점별 차등 점수 부여
                <br />• 성적증명서 필수 첨부
              </div>
            </div>

            <div css={subCategoryStyle}>
              <div css={subCategoryTitleStyle}>SW활동</div>
              <div css={activityTextStyle}>
                • 오픈소스 커뮤니티 활동
                <br />• 커미터 활동 (GitHub 링크 필수)
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div css={categoryTitleStyle}>🔬 연구활동 (RQ)</div>

            <div css={subCategoryStyle}>
              <div css={subCategoryTitleStyle}>학술지</div>
              <div css={activityTextStyle}>
                • JCR 등급별 차등 점수
                <br />
                • 주저/공저 구분
                <br />• 게재 증명서 필수
              </div>
            </div>

            <div css={subCategoryStyle}>
              <div css={subCategoryTitleStyle}>학술대회</div>
              <div css={activityTextStyle}>
                • 국제/국내 구분
                <br />
                • 구두/포스터 발표 구분
                <br />• 발표 증명서 또는 프로시딩 필수
              </div>
            </div>

            <div css={subCategoryStyle}>
              <div css={subCategoryTitleStyle}>공모전</div>
              <div css={activityTextStyle}>
                • 규모별 차등 점수
                <br />• 수상 증명서 또는 참가 확인서
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div css={categoryTitleStyle}>🌟 교류활동 (CQ)</div>

            <div css={subCategoryStyle}>
              <div css={subCategoryTitleStyle}>산학/인턴/창업</div>
              <div css={activityTextStyle}>
                • 산학프로젝트: 계약서 또는 확인서
                <br />
                • 인턴십: 재직증명서
                <br />• 창업: 사업자등록증
              </div>
            </div>

            <div css={subCategoryStyle}>
              <div css={subCategoryTitleStyle}>학생활동</div>
              <div css={activityTextStyle}>
                • 알리미/학생회/기자단
                <br />
                • 직책별 차등 점수
                <br />• 임명장 또는 활동 확인서
              </div>
            </div>

            <div css={subCategoryStyle}>
              <div css={subCategoryTitleStyle}>기타활동</div>
              <div css={activityTextStyle}>
                • 해외봉사: 봉사 확인서
                <br />
                • 세미나: 참가 확인서
                <br />• 스튜디오/스터디: 활동 증명서
              </div>
            </div>
          </div>
        </Card>
        {/* 
        <div css={tipBoxStyle}>
          <div style={{ fontWeight: 600, marginBottom: 8, color: "#0c5460" }}>
            💡 작성 팁
          </div>
          <div css={activityTextStyle} style={{ color: "#0c5460" }}>
            • 활동 날짜와 기간을 명확히 기재
            <br />
            • 본인의 역할과 기여도 구체적 서술
            <br />• 파일명은 "활동명_날짜_이름" 형식 권장
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ActivitySubmitForm;
