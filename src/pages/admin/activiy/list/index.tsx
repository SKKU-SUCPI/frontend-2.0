import useAdminActivityLists from "@/hooks/admin/useAdminActivityLists";
import { useSearchParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import ActivityListItem from "./components/ActivityListItem";
import { css } from "@emotion/react";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Loading from "@/components/layouts/Loading";
import ActivityRouter from "@/components/activity/ActivityRouter";
const titleStyle = css`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0;
`;

const descriptionStyle = css`
  font-size: 1.5rem;
  color: #777;
  margin-top: 0;
`;

const AdminActivityList = () => {
  ///////////////// params /////////////////
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const id = searchParams.get("id");

  ///////////////// data fetch /////////////////
  const { data, isLoading } = useAdminActivityLists({
    name: null,
    page: page ? parseInt(page) - 1 : 0,
    size: 10,
    sort: "desc",
  });

  if (isLoading) return <Loading />;

  const totalPages = data?.totalPage || 1;

  ///////////////// render /////////////////
  return (
    <div>
      <h1 css={titleStyle}>활동 모아보기</h1>
      <h2 css={descriptionStyle}>
        활동 제출 후 검토 중인 활동을 확인할 수 있습니다.
      </h2>
      {data.content.map((item: any, index: number) => (
        <ActivityListItem
          key={index}
          activityId={item.basicInfo.id}
          content={item.basicInfo.content}
          categoryName={item.basicInfo.categoryName}
          activityClass={item.basicInfo.activityClass}
          activityDetail={item.basicInfo.activityDetail}
          state={item.basicInfo.state}
          submitDate={item.basicInfo.submitDate}
          departmemt={item.department}
          studentId={item.studentId}
          userName={item.userName}
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

export default AdminActivityList;
