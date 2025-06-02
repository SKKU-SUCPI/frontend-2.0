import useActivityLists from "@/hooks/admin/useActivityLists";
import { useSearchParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import ActivityListItem from "./components/ActivityListItem";
import { css } from "@emotion/react";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
  const { data, isLoading } = useActivityLists({
    page: page ? parseInt(page) - 1 : 0,
    size: 10,
    sort: "desc",
  });

  console.log(data);

  if (isLoading) return <div>Loading...</div>;

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
          activityId={item.basicInfo.activityId}
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
              width: "90%",
              maxWidth: 800,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              maxHeight: "90vh",
              overflow: "auto",
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
            <div>활동 상세 정보 (ID: {searchParams.get("id")})</div>
            {/* 여기에 활동 상세 내용을 추가할 수 있습니다 */}
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default AdminActivityList;
