import useAdminActivityItem from "@/hooks/admin/useAdminActivityItem";
import { useUpdateSubmitState } from "@/hooks/admin/useUpdateSubmitState";
import Loading from "../layouts/Loading";
import { css } from "@emotion/react";
import FlexBox from "@/styles/components/Flexbox";
import Card from "@/styles/components/Card";
import ActivityUserInfo from "./ActivityUserInfo";
import AdminActivityMainContentView from "./AdminActivityMainContentView";
import { useState } from "react";

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
  if (state === 0) color = "#ffcc00"; // 노랑 (대기)
  else if (state === 1) color = "#2ecc40"; // 초록 (승인)
  else if (state === 2) color = "#ff4d4f"; // 빨강 (반려)
  return css`
    font-size: 1.2rem;
    font-weight: bold;
    margin-right: 12px;
    color: ${color};
  `;
};

const commentInputStyle = css`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  resize: vertical;
  min-height: 100px;
  box-sizing: border-box;
`;

const buttonContainerStyle = css`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
`;

const rejectButtonStyle = css`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  background-color: white;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #f3f4f6;
  }
`;

const approveButtonStyle = css`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  background-color: #6b7280;
  color: white;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #4b5563;
  }
`;

const confirmButtonStyle = css`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #1d4ed8;
  }
`;

const transformStatus = (status: number) => {
  if (status === 0) return "대기";
  if (status === 1) return "승인";
  if (status === 2) return "반려";
};

const ActivityReview: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = useAdminActivityItem(id);
  const [comment, setComment] = useState("");
  const [confirmAction, setConfirmAction] = useState<
    "approve" | "reject" | null
  >(null);
  const { mutate: updateSubmitState } = useUpdateSubmitState();

  if (isLoading) {
    return <Loading />;
  }

  const handleApprove = () => {
    if (confirmAction === "approve") {
      updateSubmitState({
        id,
        state: "1",
        comment,
      });
      setConfirmAction(null);
      setComment("");
    } else {
      setConfirmAction("approve");
    }
  };

  const handleReject = () => {
    if (confirmAction === "reject") {
      updateSubmitState({
        id,
        state: "2",
        comment,
      });
      setConfirmAction(null);
      setComment("");
    } else {
      setConfirmAction("reject");
    }
  };

  const handleCancel = () => {
    setConfirmAction(null);
  };

  return (
    <div css={containerStyle}>
      {/* 메인 컨텐츠 영역 */}
      <div css={mainContentStyle}>
        <AdminActivityMainContentView id={id} />
      </div>

      {/* 사이드바 영역 */}
      <div css={sideBarStyle}>
        <ActivityUserInfo id={id} />

        <Card flex={false} width="100%">
          <h3 css={sideBarTitleStyle}>승인 상태</h3>
          <FlexBox height="auto">
            <span css={statusStyle(data.basicInfo.state)}>
              {transformStatus(data.basicInfo.state)}
            </span>
          </FlexBox>
        </Card>

        <Card flex={false} width="100%">
          <h3 css={sideBarTitleStyle}>승인 사유</h3>
          <div>
            <textarea
              css={commentInputStyle}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="승인 또는 거절 사유를 입력해주세요"
            />
            <div css={buttonContainerStyle}>
              {confirmAction === "approve" ? (
                <>
                  <button css={confirmButtonStyle} onClick={handleApprove}>
                    확인
                  </button>
                  <button css={rejectButtonStyle} onClick={handleCancel}>
                    취소
                  </button>
                </>
              ) : confirmAction === "reject" ? (
                <>
                  <button css={rejectButtonStyle} onClick={handleCancel}>
                    취소
                  </button>
                  <button css={confirmButtonStyle} onClick={handleReject}>
                    확인
                  </button>
                </>
              ) : (
                <>
                  <button css={rejectButtonStyle} onClick={handleReject}>
                    반려
                  </button>
                  <button css={approveButtonStyle} onClick={handleApprove}>
                    승인
                  </button>
                </>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ActivityReview;
