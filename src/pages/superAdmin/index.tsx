/** @jsxImportSource @emotion/react */
import React, { useState, useMemo } from "react";
import { css } from "@emotion/react";
import useActivities from "@/hooks/common/useActivities";
import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalDesc,
  ModalButtonContainer,
  ModalButton,
} from "@/styles/components/Modal";

const pageContainer = css`
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;
`;

const pageTitle = css`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 32px;
  color: #333;
`;

const sectionWrapper = css`
  margin-bottom: 48px;
`;

const sectionTitle = css`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #2c2c2c;
`;

const cardStyle = css`
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  margin-bottom: 16px;
`;

const cardHeader = css`
  padding: 12px 16px;
  background: #fafafa;
  border-bottom: 1px solid #eee;
  font-weight: 600;
  font-size: 1rem;
`;

const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  
  th,
  td {
    border-top: 1px solid #f0f0f0;
    padding: 12px 16px;
    vertical-align: middle;
  }
  
  th {
    background: #fafafa;
    font-weight: 600;
    text-align: left;
    color: #666;
    font-size: 13px;
  }
  
  td {
    color: #555;
  }
`;

// const lineCellStyle = css`
//   display: flex;
//   gap: 12px;
//   align-items: center;
// `;

const badgeStyle = css`
  display: inline-block;
  background: #f5f5f5;
  color: #333;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  min-width: 80px;
  text-align: center;
`;

const inputStyle = css`
  width: 80px;
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  text-align: right;
  
  &:focus {
    outline: none;
    border-color: #4caf50;
  }
  
  /* 숫자 입력 필드의 화살표 제거 */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

const weightCardStyle = css`
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 24px;
  background: #fff;
`;

const weightGrid = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 16px;
`;

const weightItem = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const weightLabel = css`
  font-size: 14px;
  font-weight: 600;
  color: #666;
`;

const weightInputWrapper = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const weightInput = css`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  text-align: right;
  
  &:focus {
    outline: none;
    border-color: #4caf50;
  }
  
  /* 숫자 입력 필드의 화살표 제거 */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

const buttonContainer = css`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #eee;
`;

const button = css`
  padding: 12px 32px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
`;

const primaryButton = css`
  ${button}
  background: #4caf50;
  color: white;
  
  &:hover {
    background: #45a049;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const secondaryButton = css`
  ${button}
  background: #f5f5f5;
  color: #666;
  border: 1px solid #e0e0e0;
  
  &:hover {
    background: #e8e8e8;
  }
`;

const loadingText = css`
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 14px;
`;

const categoryLabelMap: Record<string, string> = {
  LQ: "LQ 학습 능력 지수",
  RQ: "RQ 연구 능력 지수",
  CQ: "CQ 교류 능력 지수",
};

// interface ActivityWeight {
//   activityId: number;
//   weight: number;
// }

const AdminStatisticParameter: React.FC = () => {
  const { grouped, isLoading, list } = useActivities();
  
  // 활동 점수 상태 관리
  const [activityWeights, setActivityWeights] = useState<Record<number, number>>({});
  
  // 3Q 가중치 상태 관리
  const [weights, setWeights] = useState({
    LQ: 30,
    RQ: 30,
    CQ: 40,
  });
  
  // 확인 모달 상태
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmType, setConfirmType] = useState<'save' | 'reset' | null>(null);
  
  // 초기화 완료 플래그
  const [initialized, setInitialized] = React.useState(false);
  
  // 초기 데이터로 활동 점수 초기화 (한 번만 실행)
  React.useEffect(() => {
    if (!initialized && list && list.length > 0) {
      const initialWeights: Record<number, number> = {};
      list.forEach((activity) => {
        initialWeights[activity.activityId] = activity.activityWeight;
      });
      setActivityWeights(initialWeights);
      setInitialized(true);
    }
  }, [list, initialized]);
  
  const handleWeightChange = (activityId: number, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setActivityWeights(prev => ({
        ...prev,
        [activityId]: numValue,
      }));
    }
  };
  
  const handle3QWeightChange = (category: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      setWeights(prev => ({
        ...prev,
        [category]: numValue,
      }));
    }
  };
  
  const totalWeight = useMemo(() => {
    return weights.LQ + weights.RQ + weights.CQ;
  }, [weights]);
  
  const isWeightValid = Math.abs(totalWeight - 100) < 0.1;
  
  const handleSave = () => {
    setConfirmType('save');
    setShowConfirmModal(true);
  };
  
  const handleReset = () => {
    setConfirmType('reset');
    setShowConfirmModal(true);
  };
  
  const handleConfirm = () => {
    if (confirmType === 'save') {
      // TODO: API 호출로 저장
      console.log('Saving activity weights:', activityWeights);
      console.log('Saving 3Q weights:', weights);
      alert('저장되었습니다. (API 연동 예정)');
    } else if (confirmType === 'reset') {
      // 초기값으로 리셋
      if (list && list.length > 0) {
        const initialWeights: Record<number, number> = {};
        list.forEach((activity) => {
          initialWeights[activity.activityId] = activity.activityWeight;
        });
        setActivityWeights(initialWeights);
      }
      setWeights({ LQ: 33.3, RQ: 33.3, CQ: 33.4 });
    }
    setShowConfirmModal(false);
    setConfirmType(null);
  };
  
  const handleCancel = () => {
    setShowConfirmModal(false);
    setConfirmType(null);
  };
  
  if (isLoading) {
    return (
      <div css={pageContainer}>
        <div css={loadingText}>데이터를 불러오는 중...</div>
      </div>
    );
  }
  
  return (
    <div css={pageContainer}>
      <h1 css={pageTitle}>파라미터 설정</h1>
      
      {/* 3Q 영역 가중치 설정 */}
      <div css={sectionWrapper}>
        <h2 css={sectionTitle}>3Q 영역 가중치 설정</h2>
        <div css={weightCardStyle}>
          <div>각 영역의 가중치를 설정합니다. 합계는 100%가 되어야 합니다.</div>
          <div css={weightGrid}>
            {Object.entries(categoryLabelMap).map(([key, label]) => (
              <div key={key} css={weightItem}>
                <label css={weightLabel}>{label}</label>
                <div css={weightInputWrapper}>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={weights[key as keyof typeof weights]}
                    onChange={(e) => handle3QWeightChange(key, e.target.value)}
                    css={weightInput}
                  />
                  <span>%</span>
                </div>
              </div>
            ))}
          </div>
          <div css={css`margin-top: 16px; font-size: 14px; color: ${isWeightValid ? '#4caf50' : '#dc2626'};`}>
            합계: {totalWeight.toFixed(1)}% {isWeightValid ? '✓' : '(100%가 되어야 합니다)'}
          </div>
        </div>
      </div>
      
      {/* 활동별 점수 설정 */}
      <div css={sectionWrapper}>
        <h2 css={sectionTitle}>활동별 평가 기준 점수 설정</h2>
        {grouped?.byCategory &&
          Object.entries(grouped.byCategory).map(([category, rows]) => (
            <div key={category} css={cardStyle}>
              <div css={cardHeader}>{categoryLabelMap[category] ?? `${category} 영역`}</div>
              <table css={tableStyle}>
                <thead>
                  <tr>
                    <th style={{ width: '120px' }}>분류</th>
                    <th>활동 내용</th>
                    <th style={{ width: '120px', textAlign: 'center' }}>점수</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((activity) => (
                    <tr key={activity.activityId}>
                      <td>
                        <span css={badgeStyle}>{activity.activityClass}</span>
                      </td>
                      <td>{activity.activityDetail}</td>
                      <td style={{ textAlign: 'center' }}>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          value={activityWeights[activity.activityId] ?? activity.activityWeight}
                          onChange={(e) => handleWeightChange(activity.activityId, e.target.value)}
                          css={inputStyle}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </div>
      
      {/* 버튼 */}
      <div css={buttonContainer}>
        <button css={secondaryButton} onClick={handleReset}>
          초기화
        </button>
        <button 
          css={primaryButton} 
          onClick={handleSave}
          disabled={!isWeightValid}
        >
          저장하기
        </button>
      </div>
      
      {/* 확인 모달 */}
      {showConfirmModal && (
        <ModalOverlay onClick={handleCancel}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>
              {confirmType === 'save' ? '변경사항 저장' : '초기화'}
            </ModalTitle>
            <ModalDesc>
              {confirmType === 'save'
                ? '변경된 설정을 저장하시겠습니까?'
                : '모든 설정을 초기값으로 되돌리시겠습니까?'}
            </ModalDesc>
            <ModalButtonContainer>
              <ModalButton variant="cancel" onClick={handleCancel}>
                취소
              </ModalButton>
              <ModalButton 
                variant={confirmType === 'reset' ? 'danger' : 'primary'}
                onClick={handleConfirm}
              >
                확인
              </ModalButton>
            </ModalButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

export default AdminStatisticParameter;
