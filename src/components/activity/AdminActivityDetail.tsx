/** @jsxImportSource @emotion/react */
import useAdminActivityItem from "@/hooks/admin/useAdminActivityItem";
import { useUpdateSubmitState } from "@/hooks/admin/useUpdateSubmitState";
import usePostSubmitComment from "@/hooks/admin/usePostSubmitComment";
import Loading from "../layouts/Loading";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Card from "@/styles/components/Card";
import ActivityUserInfo from "./ActivityUserInfo";
import AdminActivityMainContentView from "./AdminActivityMainContentView";
import CommentsList from "./comments/CommentsList";
import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalDesc,
  ModalButtonContainer,
  ModalButton,
} from "@/styles/components/Modal";

const stateLabelStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  color: "#555",
};

const containerStyle = css`
  width: 1000px;
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
  width: 300px;
  padding: 0 1.5rem;
`;

const sideBarTitleStyle = css`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const statusStyle = (state: number) => {
  let color = "#888";
  if (state === 0) color = "#ffcc00"; // 대기
  else if (state === 1) color = "#2ecc40"; // 승인
  else if (state === 2) color = "#ff4d4f"; // 반려
  return css`
    font-size: 1.2rem;
    font-weight: bold;
    color: ${color};
  `;
};

const transformStatus = (status: number) => {
  if (status === 0) return "대기";
  if (status === 1) return "승인";
  if (status === 2) return "반려";
};

const AdminActivityDetail: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = useAdminActivityItem(id);
  const { mutate: updateSubmitState } = useUpdateSubmitState();
  const { mutate: postComment } = usePostSubmitComment();

  const [selectedState, setSelectedState] = useState<string>("0");
  const [comment, setComment] = useState("");
  const [showStateConfirm, setShowStateConfirm] = useState<boolean>(false);
  const [showCommentConfirm, setShowCommentConfirm] = useState<boolean>(false);

  useEffect(() => {
    if (data?.basicInfo?.state !== undefined) {
      setSelectedState(String(data.basicInfo.state));
    }
  }, [data?.basicInfo?.state]);

  if (isLoading) return <Loading />;

  // 상태 변경 확인
  const handleChangeState = () => {
    setShowStateConfirm(true);
  };

  // 상태 변경 확정
  const handleConfirmStateChange = () => {
    updateSubmitState({ id, state: selectedState });
    setShowStateConfirm(false);
  };

  // 상태 변경 취소
  const handleCancelStateChange = () => {
    setShowStateConfirm(false);
  };

  // 댓글 등록 확인
  const handlePostComment = () => {
    const trimmed = comment.trim();
    if (!trimmed) return;
    setShowCommentConfirm(true);
  };

  // 댓글 등록 확정
  const handleConfirmPostComment = () => {
    const trimmed = comment.trim();
    postComment({ id, content: trimmed });
    setComment("");
    setShowCommentConfirm(false);
  };

  // 댓글 등록 취소
  const handleCancelPostComment = () => {
    setShowCommentConfirm(false);
  };

  return (
    <>
      <div css={containerStyle}>
        <div css={mainContentStyle}>
          <AdminActivityMainContentView id={id} />
        </div>

        <div css={sideBarStyle}>
          <ActivityUserInfo id={id} />

          <Card flex={false} width="100%">
            <h3 css={sideBarTitleStyle}>승인 상태</h3>
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 4px;
              `}
            >
              <span css={statusStyle(data.basicInfo.state)}>
                {transformStatus(data.basicInfo.state)}
              </span>
            </div>
            <div
              css={css`
                display: flex;
                gap: 8px;
                margin-top: 8px;
                align-items: center;
              `}
            >
              <label htmlFor="stateSelect" style={stateLabelStyle}>
                상태 변경
              </label>
              <select
                id="stateSelect"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "#e5e7eb",
                  borderRadius: 6,
                  background: "#fff",
                }}
              >
                <option value="0">대기</option>
                <option value="1">승인</option>
                <option value="2">반려</option>
              </select>
              <button
                onClick={handleChangeState}
                css={css`
                  padding: 8px 12px;
                  border: 1px solid #d1d5db;
                  border-radius: 6px;
                  background-color: #6b7280;
                  color: #fff;
                  font-weight: 600;
                  cursor: pointer;
                  white-space: nowrap;
                  &:hover { background-color: #4b5563; }
                `}
              >
                변경
              </button>
            </div>
          </Card>

          <Card flex={false} width="100%">
            <h3 css={sideBarTitleStyle}>댓글</h3>
            <CommentsList comments={data.comment} />
          </Card>

          <Card flex={false} width="100%">
            <h3 css={sideBarTitleStyle}>댓글 등록</h3>
            <div>
              <textarea
                css={css`
                  width: 100%;
                  padding: 0.75rem;
                  border: 1px solid #e5e7eb;
                  border-radius: 0.375rem;
                  margin-bottom: 1rem;
                  font-size: 0.875rem;
                  resize: vertical;
                  min-height: 100px;
                  box-sizing: border-box;
                `}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="승인/반려 사유 등 댓글을 입력해주세요"
              />
              <div
                css={css`
                  display: flex;
                  gap: 1rem;
                `}
              >
                <button
                  css={css`
                    flex: 1;
                    padding: 0.5rem;
                    border: 1px solid #e5e7eb;
                    border-radius: 0.25rem;
                    background-color: #10b981;
                    color: white;
                    font-weight: 600;
                    cursor: pointer;
                    &:hover { background-color: #059669; }
                  `}
                  onClick={handlePostComment}
                >
                  댓글 등록
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 상태 변경 확인 모달 */}
      {showStateConfirm &&
        ReactDOM.createPortal(
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>상태를 변경하시겠습니까?</ModalTitle>
              <ModalDesc>
                선택한 상태로 제출내역이 변경됩니다.
              </ModalDesc>
              <ModalButtonContainer>
                <ModalButton variant="primary" onClick={handleConfirmStateChange}>
                  변경
                </ModalButton>
                <ModalButton variant="cancel" onClick={handleCancelStateChange}>
                  취소
                </ModalButton>
              </ModalButtonContainer>
            </ModalContent>
          </ModalOverlay>,
          document.body
        )}

      {/* 댓글 등록 확인 모달 */}
      {showCommentConfirm &&
        ReactDOM.createPortal(
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>댓글을 등록하시겠습니까?</ModalTitle>
              <ModalDesc>
                작성한 댓글이 학생에게 공개됩니다.
              </ModalDesc>
              <ModalButtonContainer>
                <ModalButton variant="primary" onClick={handleConfirmPostComment}>
                  등록
                </ModalButton>
                <ModalButton variant="cancel" onClick={handleCancelPostComment}>
                  취소
                </ModalButton>
              </ModalButtonContainer>
            </ModalContent>
          </ModalOverlay>,
          document.body
        )}
    </>
  );
};

export default AdminActivityDetail;


