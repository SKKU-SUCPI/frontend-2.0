import React from "react";
import { css } from "@emotion/react";
import FlexBox from "@/styles/components/Flexbox";
import styled from "@emotion/styled";
import useStudentActivityList from "@/hooks/student/useStudentActivityList";
import Loading from "@/components/layouts/Loading";
import { useSearchParams } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ActivityRouter from "@/components/activity/ActivityRouter";

const titleStyle = css`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0;
`;

const subtitleStyle = css`
  font-size: 1.8rem;
`;

const descriptionStyle = css`
  font-size: 1.5rem;
  color: #777;
  margin-top: 0;
`;

const filterButtonStyle = css`
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #e8e8e8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
  margin: 0;
`;

const StudentActivityList: React.FC = () => {
  ///////////////// params /////////////////
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const id = searchParams.get("id");

  ///////////////// data fetch /////////////////
  const { data, isLoading } = useStudentActivityList({
    state: null,
    page: 0,
    size: 10,
    sort: "desc",
  });

  if (isLoading) return <Loading />;

  console.log(data);

  const handleCreateActivity = () => {
    searchParams.set("id", "new");
    setSearchParams(searchParams);
  };

  return (
    <div>
      <h1 css={titleStyle}>활동 모아보기</h1>
      <h2 css={descriptionStyle}>
        활동 제출 후 검토 중인 활동을 확인할 수 있습니다.
      </h2>
      <FlexBox justify="space-between">
        <h2 css={subtitleStyle}>활동 내역</h2>
        <button css={filterButtonStyle} onClick={handleCreateActivity}>
          새로운 활동 제출
        </button>
      </FlexBox>

      {/* Modal for activity detail */}
      {id && (
        <Modal
          open={true}
          onClose={() => {
            searchParams.delete("id");
            setSearchParams(searchParams);
          }}
          aria-labelledby="activity-detail-modal"
          aria-describedby="activity-detail-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              overflow: "auto",
              // 고정 크기 설정
              width: "1200px",
              minHeight: "600px",
              maxWidth: "90vw",
              maxHeight: "80vh",

              // transition 추가
              transition: "all 1s ease-in-out",
            }}
          >
            <IconButton
              aria-label="close"
              onClick={() => {
                searchParams.delete("id");
                setSearchParams(searchParams);
              }}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            {/* 모달 강제 업데이트 */}
            <ActivityRouter key={id} id={id} />
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default StudentActivityList;
