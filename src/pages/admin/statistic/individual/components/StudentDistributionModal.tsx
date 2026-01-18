import React from "react";
import { css } from "@emotion/react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import IndividualDistribution from "@/components/graphs/IndividualDistribution";
import TotalDistribution from "@/components/graphs/TotalDistribution";

interface StudentDistributionModalProps {
  open: boolean;
  onClose: () => void;
  studentName: string;
  studentId: string;
  tlq: number;
  trq: number;
  tcq: number;
}

const dialogContentStyle = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px;
  background: #f8f9fa;
`;

const cardStyle = css`
  padding: 32px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const dividerStyle = css`
  height: 2px;
  background: linear-gradient(to right, transparent, #e0e0e0, transparent);
  margin: 16px 0;
`;

const titleContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const studentInfoStyle = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const studentNameStyle = css`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
`;

const studentIdStyle = css`
  font-size: 1rem;
  color: #666;
`;

const StudentDistributionModal: React.FC<StudentDistributionModalProps> = ({
  open,
  onClose,
  studentName,
  studentId,
  tlq,
  trq,
  tcq,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        style: {
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle>
        <div css={titleContainerStyle}>
          <div css={studentInfoStyle}>
            <span css={studentNameStyle}>{studentName} 학생 정규분포 분석</span>
            <span css={studentIdStyle}>학번: {studentId}</span>
          </div>
          <IconButton
            onClick={onClose}
            aria-label="닫기"
            sx={{
              color: "#666",
              "&:hover": {
                color: "#333",
                background: "#f5f5f5",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <div css={dialogContentStyle}>
          {/* 개별 3Q 지수 분포 */}
          <div css={cardStyle}>
            <IndividualDistribution tlq={tlq} trq={trq} tcq={tcq} />
          </div>

          <div css={dividerStyle} />

          {/* 총 3Q 점수 분포 */}
          <div css={cardStyle}>
            <TotalDistribution tlq={tlq} trq={trq} tcq={tcq} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDistributionModal;

