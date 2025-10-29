import React, { useEffect } from "react";
import { css } from "@emotion/react";
import FlexBox from "@/styles/components/Flexbox";
import useStudentActivityList from "@/hooks/student/useStudentActivityList";
import Loading from "@/components/layouts/Loading";
import { useSearchParams } from "react-router-dom";
import ActivityDetailModal from "@/components/activity/ActivityDetailModal";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import ActivityListItem from "@/pages/admin/activiy/list/components/ActivityListItem";
import GenericFilter from "@/components/filter/GenericFilter";
import { studentActivityListFilterConfig } from "@/components/filter/filterConfig";
import useFilter from "@/hooks/filter/useFilter";
import { useQueryClient } from "@tanstack/react-query";
import { StudentActivityListItem } from "@/types/activitiy";

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

      {data.content.map((item: StudentActivityListItem, index: number) => (
        <ActivityListItem
          key={index}
          activityId={item.id}
          title={item.title}
          content={item.content}
          categoryName={item.categoryName}
          activityClass={item.activityClass}
          activityDetail={item.activityDetail}
          state={item.state}
          submitDate={item.submitDate}
          score={item.activityWeight}
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
        <ActivityDetailModal
          id={id}
          open={true}
          onClose={() => {
            searchParams.delete("id");
            setSearchParams(searchParams);
          }}
        />
      )}
    </div>
  );
};

export default StudentActivityList;
