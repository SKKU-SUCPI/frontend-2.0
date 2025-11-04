/** @jsxImportSource @emotion/react */
import React, { useState, useMemo, useEffect } from "react";
import { css } from "@emotion/react";
import useActivities from "@/hooks/common/useActivities";
import type { ActivityCriterion } from "@/apis/common/getActivities";
import useAuthStore from "@/stores/auth/authStore";
import useGetRatio from "@/hooks/admin/useGetRatio";
import usePutRatio from "@/hooks/superAdmin/usePutRatio";
import usePostActivity from "@/hooks/superAdmin/usePostActivity";
import usePatchActivity from "@/hooks/superAdmin/usePatchActivity";
import useDeleteActivity from "@/hooks/superAdmin/useDeleteActivity";
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

// categoryName을 categoryId로 변환
const getCategoryId = (categoryName: string): number => {
  const map: Record<string, number> = { LQ: 1, RQ: 2, CQ: 3 };
  return map[categoryName] || 1;
};

interface ActivityFormData {
  activityId?: number;
  categoryName: string;
  activityClass: string;
  activityDetail: string;
  activityWeight: number;
}

const AdminStatisticParameter: React.FC = () => {
  const { grouped, isLoading } = useActivities();
  const { userProfile } = useAuthStore();
  
  // API 훅들
  const { data: ratioData, isLoading: isLoadingRatio } = useGetRatio();
  const putRatioMutation = usePutRatio();
  const postActivityMutation = usePostActivity();
  const patchActivityMutation = usePatchActivity();
  const deleteActivityMutation = useDeleteActivity();
  
  // 3Q 가중치 상태 관리
  const [weights, setWeights] = useState({
    LQ: 30,
    RQ: 30,
    CQ: 40,
  });
  
  // 활동 추가/수정 모달 상태
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState<ActivityFormData | null>(null);
  const [activityForm, setActivityForm] = useState<ActivityFormData>({
    categoryName: 'LQ',
    activityClass: '',
    activityDetail: '',
    activityWeight: 0,
  });
  
  // 삭제 확인 모달 상태
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingActivity, setDeletingActivity] = useState<ActivityFormData | null>(null);
  
  // 가중치 저장 확인 모달 상태
  const [showWeightConfirm, setShowWeightConfirm] = useState(false);
  
  // 권한 없음 모달
  const [showPermissionDenied, setShowPermissionDenied] = useState(false);
  
  // 비율 데이터 로드 시 state 업데이트
  useEffect(() => {
    if (ratioData) {
      setWeights({
        LQ: ratioData.lq,
        RQ: ratioData.rq,
        CQ: ratioData.cq,
      });
    }
  }, [ratioData]);
  
  // 3Q 가중치 변경 핸들러
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
  
  // 권한 체크
  const isSuperAdmin = userProfile?.role === 'super-admin';
  
  // 3Q 가중치 저장
  const handleSaveWeights = () => {
    if (!isSuperAdmin) {
      setShowPermissionDenied(true);
      return;
    }
    setShowWeightConfirm(true);
  };
  
  const handleWeightReset = () => {
    if (ratioData) {
      setWeights({
        LQ: ratioData.lq,
        RQ: ratioData.rq,
        CQ: ratioData.cq,
      });
    }
  };
  
  const handleConfirmWeightSave = async () => {
    try {
      await putRatioMutation.mutateAsync({
        lq: weights.LQ,
        rq: weights.RQ,
        cq: weights.CQ,
      });
      alert('3Q 가중치가 저장되었습니다.');
      setShowWeightConfirm(false);
    } catch (error) {
      const message = error instanceof Error && 'response' in error && 
        typeof error.response === 'object' && error.response !== null &&
        'data' in error.response && typeof error.response.data === 'object' && 
        error.response.data !== null && 'message' in error.response.data
        ? String(error.response.data.message)
        : '가중치 저장에 실패했습니다.';
      alert(message);
    }
  };
  
  // 활동 추가 모달 열기
  const handleAddActivity = () => {
    setEditingActivity(null);
    setActivityForm({
      categoryName: 'LQ',
      activityClass: '',
      activityDetail: '',
      activityWeight: 0,
    });
    setShowActivityModal(true);
  };
  
  // 활동 수정 모달 열기
  const handleEditActivity = (activity: ActivityCriterion) => {
    const formData: ActivityFormData = {
      activityId: activity.activityId,
      categoryName: activity.categoryName,
      activityClass: activity.activityClass,
      activityDetail: activity.activityDetail,
      activityWeight: activity.activityWeight,
    };
    setEditingActivity(formData);
    setActivityForm(formData);
    setShowActivityModal(true);
  };
  
  // 활동 폼 변경 핸들러
  const handleActivityFormChange = (field: keyof ActivityFormData, value: string | number) => {
    setActivityForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };
  
  // 활동 저장 (추가 또는 수정)
  const handleSaveActivity = async () => {
    if (!isSuperAdmin) {
      setShowPermissionDenied(true);
      return;
    }
    
    // 유효성 검사
    if (!activityForm.activityClass.trim() || !activityForm.activityDetail.trim()) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    
    if (activityForm.activityWeight <= 0) {
      alert('점수는 0보다 커야 합니다.');
      return;
    }
    
    try {
      if (editingActivity) {
        // 활동 수정
        await patchActivityMutation.mutateAsync({
          activities: [{
            activityId: activityForm.activityId!,
            activityClass: activityForm.activityClass,
            activityDetail: activityForm.activityDetail,
            activityWeight: activityForm.activityWeight,
          }]
        });
        alert('활동이 수정되었습니다.\n\n※ 이 활동에 속한 모든 학생 내역이 새로운 설정에 따라 재계산됩니다.');
      } else {
        // 활동 추가
        await postActivityMutation.mutateAsync({
          categoryId: getCategoryId(activityForm.categoryName),
          activityClass: activityForm.activityClass,
          activityDetail: activityForm.activityDetail,
          activityWeight: activityForm.activityWeight,
        });
        alert('활동이 추가되었습니다.');
      }
      
      setShowActivityModal(false);
      setEditingActivity(null);
    } catch (error) {
      const message = error instanceof Error && 'response' in error && 
        typeof error.response === 'object' && error.response !== null &&
        'data' in error.response && typeof error.response.data === 'object' && 
        error.response.data !== null && 'message' in error.response.data
        ? String(error.response.data.message)
        : '작업에 실패했습니다.';
      alert(message);
    }
  };
  
  // 활동 삭제 확인 모달 열기
  const handleDeleteActivity = (activity: ActivityCriterion) => {
    const formData: ActivityFormData = {
      activityId: activity.activityId,
      categoryName: activity.categoryName,
      activityClass: activity.activityClass,
      activityDetail: activity.activityDetail,
      activityWeight: activity.activityWeight,
    };
    setDeletingActivity(formData);
    setShowDeleteConfirm(true);
  };
  
  // 활동 삭제 확인
  const handleConfirmDelete = async () => {
    if (!isSuperAdmin) {
      setShowPermissionDenied(true);
      setShowDeleteConfirm(false);
      return;
    }
    
    if (deletingActivity && deletingActivity.activityId) {
      try {
        await deleteActivityMutation.mutateAsync(deletingActivity.activityId);
        alert('활동이 삭제되었습니다.');
        setShowDeleteConfirm(false);
        setDeletingActivity(null);
      } catch (error) {
        const message = error instanceof Error && 'response' in error && 
          typeof error.response === 'object' && error.response !== null &&
          'data' in error.response && typeof error.response.data === 'object' && 
          error.response.data !== null && 'message' in error.response.data
          ? String(error.response.data.message)
          : '활동 삭제에 실패했습니다.';
        alert(message);
      }
    }
  };
  
  if (isLoading || isLoadingRatio) {
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
          <div css={css`display: flex; justify-content: flex-end; gap: 12px; margin-top: 16px;`}>
            <button css={secondaryButton} onClick={handleWeightReset}>
              초기화
            </button>
            <button 
              css={primaryButton} 
              onClick={handleSaveWeights}
              disabled={!isWeightValid}
            >
              가중치 저장
            </button>
          </div>
        </div>
      </div>
      
      {/* 활동별 점수 설정 */}
      <div css={sectionWrapper}>
        <div css={css`display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;`}>
          <h2 css={sectionTitle} style={{ marginBottom: 0 }}>활동별 평가 기준 관리</h2>
          <button css={primaryButton} onClick={handleAddActivity}>
            + 새 활동 추가
          </button>
        </div>
        {grouped?.byCategory &&
          Object.entries(grouped.byCategory).map(([category, rows]) => (
            <div key={category} css={cardStyle}>
              <div css={cardHeader}>{categoryLabelMap[category] ?? `${category} 영역`}</div>
              <table css={tableStyle}>
                <thead>
                  <tr>
                    <th style={{ width: '120px' }}>분류</th>
                    <th>활동 내용</th>
                    <th style={{ width: '100px', textAlign: 'center' }}>점수</th>
                    <th style={{ width: '160px', textAlign: 'center' }}>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((activity) => (
                    <tr key={activity.activityId}>
                      <td>
                        <span css={badgeStyle}>{activity.activityClass}</span>
                      </td>
                      <td>{activity.activityDetail}</td>
                      <td style={{ textAlign: 'center', fontWeight: 600 }}>
                        {activity.activityWeight}
                      </td>
                      <td>
                        <div css={css`display: flex; gap: 8px; justify-content: center;`}>
                          <button 
                            css={css`
                              padding: 6px 12px;
                              border: 1px solid #4caf50;
                              background: white;
                              color: #4caf50;
                              border-radius: 4px;
                              font-size: 13px;
                              cursor: pointer;
                              &:hover { background: #f1f8f4; }
                            `}
                            onClick={() => handleEditActivity(activity)}
                          >
                            수정
                          </button>
                          <button 
                            css={css`
                              padding: 6px 12px;
                              border: 1px solid #dc2626;
                              background: white;
                              color: #dc2626;
                              border-radius: 4px;
                              font-size: 13px;
                              cursor: pointer;
                              &:hover { background: #fef2f2; }
                            `}
                            onClick={() => handleDeleteActivity(activity)}
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </div>
      
      {/* 3Q 가중치 저장 확인 모달 */}
      {showWeightConfirm && (
        <ModalOverlay onClick={() => setShowWeightConfirm(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>3Q 가중치 저장</ModalTitle>
            <ModalDesc>
              변경된 3Q 가중치를 저장하시겠습니까?
              <div css={css`margin-top: 12px; text-align: left; padding: 12px; background: #f5f5f5; border-radius: 4px;`}>
                <div>LQ: {weights.LQ}%</div>
                <div>RQ: {weights.RQ}%</div>
                <div>CQ: {weights.CQ}%</div>
              </div>
            </ModalDesc>
            <ModalButtonContainer>
              <ModalButton variant="cancel" onClick={() => setShowWeightConfirm(false)}>
                취소
              </ModalButton>
              <ModalButton variant="primary" onClick={handleConfirmWeightSave}>
                저장
              </ModalButton>
            </ModalButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
      
      {/* 활동 추가/수정 모달 */}
      {showActivityModal && (
        <ModalOverlay onClick={() => setShowActivityModal(false)}>
    <div
      css={css`
              background: white;
              border-radius: 8px;
              width: 600px;
              max-width: 90%;
              box-sizing: border-box;
              overflow: hidden;
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <div css={css`
              padding: 28px;
              max-height: 90vh;
              overflow-y: auto;
              box-sizing: border-box;
            `}>
              <div css={css`
                font-size: 1.25rem;
                font-weight: 600;
                margin-bottom: 24px;
              `}>
                {editingActivity ? '활동 수정' : '새 활동 추가'}
              </div>
              
              {editingActivity && (
                <div css={css`
                  background: #fff3cd;
                  border: 1px solid #ffc107;
                  padding: 12px;
                  border-radius: 4px;
                  margin-bottom: 20px;
                  font-size: 13px;
                  color: #856404;
                  box-sizing: border-box;
                `}>
                  ⚠️ 이 활동을 수정하면 해당 활동에 속한 모든 학생 내역이 새로운 설정에 따라 재계산됩니다.
                </div>
              )}
              
              <div css={css`
                display: flex;
                flex-direction: column;
                gap: 20px;
              `}>
                <div>
                  <label css={css`
                    display: block;
                    font-weight: 600;
                    margin-bottom: 8px;
                    font-size: 14px;
                  `}>
                    활동 영역 *
                  </label>
                  <select
                    value={activityForm.categoryName}
                    onChange={(e) => handleActivityFormChange('categoryName', e.target.value)}
                    css={css`
                      width: 100%;
                      padding: 10px 12px;
                      border: 1px solid #ddd;
                      border-radius: 4px;
                      font-size: 14px;
                      box-sizing: border-box;
                      &:focus { outline: none; border-color: #4caf50; }
                    `}
                  >
                    <option value="LQ">LQ - 학습 능력 지수</option>
                    <option value="RQ">RQ - 연구 능력 지수</option>
                    <option value="CQ">CQ - 교류 능력 지수</option>
                  </select>
                </div>
                
                <div>
                  <label css={css`
                    display: block;
                    font-weight: 600;
                    margin-bottom: 8px;
                    font-size: 14px;
                  `}>
                    활동 구분 *
                  </label>
                  <input
                    type="text"
                    placeholder="예: 교육활동, 학생회, 인턴십"
                    value={activityForm.activityClass}
                    onChange={(e) => handleActivityFormChange('activityClass', e.target.value)}
                    css={css`
                      width: 100%;
                      padding: 10px 12px;
                      border: 1px solid #ddd;
                      border-radius: 4px;
                      font-size: 14px;
                      box-sizing: border-box;
                      &:focus { outline: none; border-color: #4caf50; }
                    `}
                  />
                </div>
                
                <div>
                  <label css={css`
                    display: block;
                    font-weight: 600;
                    margin-bottom: 8px;
                    font-size: 14px;
                  `}>
                    활동 내용 *
                  </label>
                  <input
                    type="text"
                    placeholder="예: 교육조교 활동(학부생 TA, 학기당), 회장"
                    value={activityForm.activityDetail}
                    onChange={(e) => handleActivityFormChange('activityDetail', e.target.value)}
                    css={css`
                      width: 100%;
                      padding: 10px 12px;
                      border: 1px solid #ddd;
                      border-radius: 4px;
                      font-size: 14px;
                      box-sizing: border-box;
                      &:focus { outline: none; border-color: #4caf50; }
                    `}
                  />
                </div>
                
                <div>
                  <label css={css`
                    display: block;
                    font-weight: 600;
                    margin-bottom: 8px;
                    font-size: 14px;
                  `}>
                    점수 *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="0"
                    value={activityForm.activityWeight || ''}
                    onChange={(e) => handleActivityFormChange('activityWeight', parseFloat(e.target.value) || 0)}
                    css={css`
                      width: 100%;
                      padding: 10px 12px;
                      border: 1px solid #ddd;
                      border-radius: 4px;
                      font-size: 14px;
                      box-sizing: border-box;
                      &:focus { outline: none; border-color: #4caf50; }
                      &::-webkit-inner-spin-button,
                      &::-webkit-outer-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                      }
                      -moz-appearance: textfield;
                    `}
                  />
                </div>
              </div>
              
              <div css={css`
                display: flex;
                gap: 12px;
                justify-content: flex-end;
                margin-top: 24px;
              `}>
                <button css={secondaryButton} onClick={() => setShowActivityModal(false)}>
                  취소
                </button>
                <button css={primaryButton} onClick={handleSaveActivity}>
                  {editingActivity ? '수정' : '추가'}
                </button>
              </div>
            </div>
          </div>
        </ModalOverlay>
      )}
      
      {/* 활동 삭제 확인 모달 */}
      {showDeleteConfirm && deletingActivity && (
        <ModalOverlay onClick={() => setShowDeleteConfirm(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>활동 삭제</ModalTitle>
            <ModalDesc>
              <div css={css`margin-bottom: 16px;`}>
                다음 활동을 삭제하시겠습니까?
              </div>
              <div css={css`
                padding: 12px;
                background: #f5f5f5;
                border-radius: 4px;
                text-align: left;
                margin-bottom: 16px;
              `}>
                <div><strong>영역:</strong> {categoryLabelMap[deletingActivity.categoryName]}</div>
                <div><strong>구분:</strong> {deletingActivity.activityClass}</div>
                <div><strong>내용:</strong> {deletingActivity.activityDetail}</div>
                <div><strong>점수:</strong> {deletingActivity.activityWeight}</div>
              </div>
              <div css={css`
                background: #fee;
                border: 1px solid #fcc;
                padding: 12px;
                border-radius: 4px;
                font-size: 13px;
                color: #c33;
              `}>
                ⚠️ <strong>경고:</strong> 이 활동에 속하는 모든 학생 내역이 삭제되고, 해당 학생들의 점수에서 제외됩니다. 이 작업은 되돌릴 수 없습니다.
              </div>
            </ModalDesc>
            <ModalButtonContainer>
              <ModalButton variant="cancel" onClick={() => setShowDeleteConfirm(false)}>
                취소
              </ModalButton>
              <ModalButton variant="danger" onClick={handleConfirmDelete}>
                삭제
              </ModalButton>
            </ModalButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
      
      {/* 권한 없음 모달 */}
      {showPermissionDenied && (
        <ModalOverlay onClick={() => setShowPermissionDenied(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>권한 없음</ModalTitle>
            <ModalDesc>
              이 작업을 수행하려면 Super Admin 권한이 필요합니다.
            </ModalDesc>
            <ModalButtonContainer>
              <ModalButton variant="primary" onClick={() => setShowPermissionDenied(false)}>
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
