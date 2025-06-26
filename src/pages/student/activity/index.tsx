import React, { useEffect } from "react";
import { css } from "@emotion/react";
import FlexBox from "@/styles/components/Flexbox";
import useStudentActivityList from "@/hooks/student/useStudentActivityList";
import Loading from "@/components/layouts/Loading";
import { useSearchParams } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ActivityRouter from "@/components/activity/ActivityRouter";
import Pagination from "@mui/material/Pagination";
import ActivityListItem from "@/pages/admin/activiy/list/components/ActivityListItem";
import GenericFilter from "@/components/filter/GenericFilter";
import { studentActivityListFilterConfig } from "@/components/filter/filterConfig";
import useFilter from "@/hooks/filter/useFilter";
import { useQueryClient } from "@tanstack/react-query";

const titleStyle = css`
  font-size: 2.5rem;
  font-weight: bold;
`;

const filterButtonStyle = css`
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
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

const StudentActivityList: React.FC = () => {
  ///////////////// params /////////////////
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const id = searchParams.get("id");

  // 페이지 변경 시 상단으로 스크롤
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const {
    filter,
    handleFilterChange,
    resetFilter,
    appliedFilter,
    applyFilter,
  } = useFilter(studentActivityListFilterConfig);

  ///////////////// data fetch /////////////////
  const queryClient = useQueryClient();
  const { data, isLoading } = useStudentActivityList({
    state: appliedFilter.state,
    page: page ? parseInt(page) - 1 : 0,
    size: 10,
    sort: appliedFilter.sort,
  });

  if (isLoading) return <Loading />;

  const totalPages = data?.totalPage || 1;

  const handleCreateActivity = () => {
    searchParams.set("id", "new");
    setSearchParams(searchParams);
  };

  return (
    <div>
      <FlexBox justify="space-between">
        <h1 css={titleStyle}>활동 내역</h1>
        <button css={filterButtonStyle} onClick={handleCreateActivity}>
          + 새로운 활동 제출
        </button>
      </FlexBox>

      <GenericFilter
        filterConfig={studentActivityListFilterConfig}
        filters={filter}
        onFilterChange={handleFilterChange}
        onReset={resetFilter}
        onApply={() => {
          applyFilter();
          queryClient.invalidateQueries({
            queryKey: ["studentActivityList"],
          });
        }}
        appliedFilter={appliedFilter}
      />

      {data.content.map((item: any, index: number) => (
        <ActivityListItem
          key={index}
          activityId={item.id}
          content={item.content}
          categoryName={item.categoryName}
          activityClass={item.activityClass}
          activityDetail={item.activityDetail}
          state={item.state}
          submitDate={item.submitDate}
        />
      ))}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        <Pagination
          count={totalPages}
          page={parseInt(page)}
          onChange={(_, value) => {
            setSearchParams((prev) => {
              prev.set("page", value.toString());
              return prev;
            });
          }}
          color="primary"
          showFirstButton
          showLastButton
          size="large"
        />
      </Box>

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
