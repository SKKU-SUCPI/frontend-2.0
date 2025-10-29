import useAdminActivityLists from "@/hooks/admin/useAdminActivityLists";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import ActivityListItem from "./components/ActivityListItem";
import { css } from "@emotion/react";
import Loading from "@/components/layouts/Loading";
import ActivityDetailModal from "@/components/activity/ActivityDetailModal";
import { adminActivityListFilterConfig } from "@/components/filter/filterConfig";
import useFilter from "@/hooks/filter/useFilter";
import GenericFilter from "@/components/filter/GenericFilter";
import { useQueryClient } from "@tanstack/react-query";

const titleStyle = css`
  font-size: 2.5rem;
  font-weight: bold;
`;

const AdminActivityList = () => {
  ///////////////// params /////////////////
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const id = searchParams.get("id");
  const {
    filter,
    handleFilterChange,
    resetFilter,
    applyFilter,
    appliedFilter,
  } = useFilter(adminActivityListFilterConfig);

  ///////////////// data fetch /////////////////
  const queryClient = useQueryClient();
  const { data, isLoading } = useAdminActivityLists({
    page: page ? parseInt(page) - 1 : 0,
    size: 10,
    sort: appliedFilter.sort,
    state: appliedFilter.state,
    name: appliedFilter.name,
  });

  // 페이지 변경 시 상단으로 스크롤
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (isLoading) return <Loading />;

  const totalPages = data?.totalPage || 1;

  ///////////////// render /////////////////
  return (
    <div>
      <h1 css={titleStyle}>활동 내역</h1>

      <GenericFilter
        filterConfig={adminActivityListFilterConfig}
        filters={filter}
        appliedFilter={appliedFilter}
        onFilterChange={handleFilterChange}
        onReset={resetFilter}
        onApply={() => {
          applyFilter();
          queryClient.invalidateQueries({
            queryKey: ["adminActivityLists"],
          });
        }}
      />

      {data.content.map((item: any, index: number) => (
        <ActivityListItem
          key={index}
          activityId={item.basicInfo.id}
          title={item.basicInfo.title}
          content={item.basicInfo.content}
          categoryName={item.basicInfo.categoryName}
          activityClass={item.basicInfo.activityClass}
          activityDetail={item.basicInfo.activityDetail}
          state={item.basicInfo.state}
          submitDate={item.basicInfo.submitDate}
          departmemt={item.department}
          studentId={item.studentId}
          userName={item.userName}
          score={item.basicInfo.activityWeight}
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

export default AdminActivityList;
