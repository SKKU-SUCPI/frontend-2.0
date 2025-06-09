import useActivityItem from "@/hooks/admin/useActivityItem";
import React from "react";
import Loading from "../layouts/Loading";

const sectionStyle: React.CSSProperties = {
  borderRadius: 12,
  padding: 24,
  marginBottom: 24,
  background: "#fff",
  borderBottom: "1px solid #eaeaea",
};
const titleStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: 700,
  marginBottom: 16,
};
const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
  marginBottom: 8,
};
const gridItemStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 4,
  marginBottom: 8,
};
const labelStyle: React.CSSProperties = {
  color: "#888",
  fontWeight: 500,
  minWidth: 90,
  display: "inline-block",
};

// 파일 카드 스타일 및 hover 효과
const fileCardStyle: React.CSSProperties = {
  border: "1.5px solid #d0d0d0",
  borderRadius: 12,
  padding: "12px 20px",
  marginBottom: 12,
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  transition: "background 0.2s, box-shadow 0.2s",
  cursor: "pointer",
};
const fileCardHoverStyle: React.CSSProperties = {
  background: "#f5f8ff",
  boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
};

function useHover() {
  const [isHovered, setIsHovered] = React.useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  return { isHovered, onMouseEnter, onMouseLeave };
}

const FileCard = ({ file }: { file: { name: string; type: string } }) => {
  const hover = useHover();
  return (
    <div
      style={{
        ...fileCardStyle,
        ...(hover.isHovered ? fileCardHoverStyle : {}),
      }}
      onMouseEnter={hover.onMouseEnter}
      onMouseLeave={hover.onMouseLeave}
    >
      <div>
        <div>{file.name}</div>
      </div>
      <div style={{ color: "#888", fontSize: 14 }}>
        {file.type.toUpperCase()}
      </div>
    </div>
  );
};

const ActivityMainContentView = ({ id }: { id: string }) => {
  const { data, isLoading } = useActivityItem(id);
  if (isLoading) return <Loading />;

  return (
    <div style={{ width: "auto", margin: "0 auto" }}>
      {/* 활동 정보 */}
      <div style={sectionStyle}>
        <div style={titleStyle}>활동 정보</div>
        <div style={gridStyle}>
          <div style={gridItemStyle}>
            <span style={labelStyle}>활동 분류</span>
            <span>{data.basicInfo.categoryName}</span>
          </div>
          <div style={gridItemStyle}>
            <span style={labelStyle}>세부 활동</span>
            <span>{data.basicInfo.activityClass}</span>
          </div>
          <div style={gridItemStyle}>
            <span style={labelStyle}>실적</span>
            <span>{data.basicInfo.activityDetail}</span>
          </div>
          <div style={gridItemStyle}>
            <span style={labelStyle}>활동 날짜</span>
            <span>
              {new Date(data.basicInfo.submitDate).toLocaleDateString("ko-KR")}
            </span>
          </div>
        </div>
      </div>
      {/* 활동 내용 */}
      <div style={sectionStyle}>
        <div style={titleStyle}>활동 내용</div>
        <div>{data.basicInfo.content}</div>
      </div>
      {/* 첨부파일 */}
      <div style={sectionStyle}>
        <div style={titleStyle}>첨부파일</div>
        {data.fileInfoList.length > 0 ? (
          data.fileInfoList.map((file: any, idx: number) => (
            <FileCard key={idx} file={file} />
          ))
        ) : (
          <div>첨부파일이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default ActivityMainContentView;
