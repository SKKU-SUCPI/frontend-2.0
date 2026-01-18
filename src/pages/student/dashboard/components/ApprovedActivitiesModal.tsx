import React from "react";
import { css } from "@emotion/react";
import ActivityPreviewItem from "./ActivityPreviwItem";
import Loading from "@/components/layouts/Loading";
import {
  ModalOverlay,
  ModalTitle,
  ModalButton,
  ModalButtonContainer,
} from "@/styles/components/Modal";

interface StudentActivity {
  id: number;
  title?: string;
  content: string;
  categoryName: string;
  state: string;
  approvedDate: string;
  activityWeight?: number;
}

interface ApprovedActivitiesModalProps {
  isOpen: boolean;
  category: "LQ" | "RQ" | "CQ" | null;
  activities: StudentActivity[];
  isLoading: boolean;
  onClose: () => void;
}

const modalContentLargeStyle = css`
  background-color: #fff;
  border-radius: 12px;
  padding: 32px;
  max-width: 800px;
  width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
`;

const modalActivitiesContainerStyle = css`
  margin-top: 24px;
  max-height: 60vh;
  overflow-y: auto;
`;

const emptyMessageStyle = css`
  text-align: center;
  padding: 40px 20px;
  color: #666;
`;

const buttonContainerStyle = css`
  margin-top: 24px;
`;

const getCategoryTitle = (category: "LQ" | "RQ" | "CQ") => {
  switch (category) {
    case "LQ":
      return "Learning Quotient (LQ)";
    case "RQ":
      return "Research Quotient (RQ)";
    case "CQ":
      return "Creative Quotient (CQ)";
    default:
      return "";
  }
};

const ApprovedActivitiesModal: React.FC<ApprovedActivitiesModalProps> = ({
  isOpen,
  category,
  activities,
  isLoading,
  onClose,
}) => {
  if (!isOpen || !category) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <div css={modalContentLargeStyle} onClick={(e) => e.stopPropagation()}>
        <ModalTitle>{getCategoryTitle(category)} - 승인된 활동 내역</ModalTitle>
        <div css={modalActivitiesContainerStyle}>
          {isLoading ? (
            <Loading />
          ) : activities.length > 0 ? (
            activities.map((activity) => (
              <ActivityPreviewItem
                key={activity.id}
                title={activity.title}
                content={activity.content}
                category={activity.categoryName as "LQ" | "RQ" | "CQ"}
                status={parseInt(activity.state) as 0 | 1 | 2}
                date={activity.approvedDate}
                activityWeight={activity.activityWeight}
              />
            ))
          ) : (
            <div css={emptyMessageStyle}>승인된 활동 내역이 없습니다.</div>
          )}
        </div>
        <ModalButtonContainer css={buttonContainerStyle}>
          <ModalButton onClick={onClose}>닫기</ModalButton>
        </ModalButtonContainer>
      </div>
    </ModalOverlay>
  );
};

export default ApprovedActivitiesModal;

