/** @jsxImportSource @emotion/react */
import useAdminActivityItem from "@/hooks/admin/useAdminActivityItem";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Loading from "../layouts/Loading";
import axiosInstance from "@/apis/utils/axiosInterceptor";
import useDeleteAdminSubmit from "@/hooks/admin/useDeleteAdminSubmit";
import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalDesc,
  ModalButtonContainer,
  ModalButton,
} from "@/styles/components/Modal";

const sectionStyle: React.CSSProperties = {
  marginBottom: 28,
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.125rem",
  fontWeight: 700,
  marginBottom: 14,
  color: "#1a1a1a",
  letterSpacing: "-0.02em",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.9375rem",
  color: "#444",
  fontWeight: 600,
  display: "block",
  marginBottom: 8,
};

const valueStyle: React.CSSProperties = {
  fontSize: "0.875rem",
  color: "#1a1a1a",
  padding: "10px 14px",
  backgroundColor: "#fafafa",
  borderRadius: 6,
  border: "1px solid #e0e0e0",
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
  gap: 8,
};

// 파일 카드 스타일 및 hover 효과
const fileCardStyle: React.CSSProperties = {
  border: "1px solid #e8e8e8",
  borderRadius: 6,
  padding: "10px 14px",
  marginBottom: 8,
  background: "#fafafa",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  transition: "all 0.2s",
  cursor: "pointer",
};

const fileCardHoverStyle: React.CSSProperties = {
  background: "#f0f4f8",
  borderColor: "#d0d0d0",
  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
};

function useHover() {
  const [isHovered, setIsHovered] = React.useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  return { isHovered, onMouseEnter, onMouseLeave };
}
const FileCard = ({
  file,
}: {
  file: { id: number; fileName: string; fileType: string };
}) => {
  const hover = useHover();

  const handleDownload = async () => {
    try {
      const response = await axiosInstance.get(
        `/admin/files/${file.id}/download`,
        {
          responseType: "blob", // 바이너리 데이터 받기 위해 필수
        }
      );

      // Blob 생성
      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/octet-stream",
      });

      // 다운로드 링크 생성
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${file.fileName}.${file.fileType}`; // 확장자 포함
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("다운로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <div
      style={{
        ...fileCardStyle,
        ...(hover.isHovered ? fileCardHoverStyle : {}),
      }}
      onClick={handleDownload}
      onMouseEnter={hover.onMouseEnter}
      onMouseLeave={hover.onMouseLeave}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontWeight: 500,
            fontSize: "0.8125rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {file.fileName}
        </div>
        <div style={{ fontSize: "0.6875rem", color: "#999", marginTop: 2 }}>
          {file.fileType.toUpperCase()}
        </div>
      </div>
      <div
        style={{
          color: "#1a73e8",
          fontSize: "0.75rem",
          fontWeight: 500,
        }}
      >
        다운로드
      </div>
    </div>
  );
};
const submitBtnStyle: React.CSSProperties = {
  padding: "11px 32px",
  background: "#2c2c2c",
  color: "#fff",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  fontSize: "0.875rem",
  fontWeight: 600,
  transition: "all 0.15s",
};

const AdminActivityMainContentView = ({ id }: { id: string }) => {
  const { data, isLoading } = useAdminActivityItem(id);
  const { mutate: deleteSubmit } = useDeleteAdminSubmit();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  if (isLoading) return <Loading />;

  // 삭제 확인
  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  // 삭제 확정
  const handleConfirmDelete = () => {
    deleteSubmit(data.basicInfo.id);
    setShowDeleteConfirm(false);
  };

  // 삭제 취소
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div style={{ width: "100%", padding: "4px 0" }}>
      {/* 활동 정보 */}
      <div style={sectionStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <div style={{ ...titleStyle, marginBottom: 0 }}>활동 정보</div>
          <div
            style={{
              fontSize: "0.8125rem",
              color: "#666",
              fontWeight: 500,
            }}
          >
            제출 날짜:{" "}
            {new Date(data.basicInfo.submitDate).toLocaleDateString("ko-KR")}
          </div>
        </div>
        <div style={gridStyle}>
          <div style={gridItemStyle}>
            <label style={labelStyle}>분류</label>
            <div style={valueStyle}>
              {data.basicInfo.categoryName}
              <span style={{ color: "#888", marginLeft: 6, fontSize: "0.75rem" }}>
                (가중치 {data.basicInfo.categoryRatio})
              </span>
            </div>
          </div>
          <div style={gridItemStyle}>
            <label style={labelStyle}>세부 활동</label>
            <div style={valueStyle}>{data.basicInfo.activityClass}</div>
          </div>
        </div>

        {/* 상세항목 - full width */}
        <div style={{ marginTop: 16 }}>
          <label style={labelStyle}>상세항목</label>
          <div style={valueStyle}>{data.basicInfo.activityDetail}</div>
        </div>

        {/* 점수 표시 */}
        <div
          style={{
            marginTop: 12,
            fontSize: "0.8125rem",
            color: "#2c7a2c",
            fontWeight: 600,
            padding: "6px 12px",
            backgroundColor: "#f0f8f0",
            borderRadius: 6,
            display: "inline-block",
          }}
        >
          점수: +{data.basicInfo.activityWeight}
        </div>
      </div>

      {/* 활동 내용 */}
      <div style={sectionStyle}>
        <div style={titleStyle}>활동 내용</div>
        <label style={labelStyle}>제목</label>
        <div style={valueStyle}>{data.basicInfo.title}</div>

        <label style={{ ...labelStyle, marginTop: 16 }}>상세 내용</label>
        <div
          style={{
            ...valueStyle,
            minHeight: 140,
            lineHeight: 1.6,
            whiteSpace: "pre-wrap",
          }}
        >
          {data.basicInfo.content}
        </div>
      </div>

      {/* 증빙자료 */}
      <div style={sectionStyle}>
        <div style={titleStyle}>증빙자료</div>
        {data.fileInfoList.length > 0 ? (
          data.fileInfoList.map(
            (
              file: { id: number; fileName: string; fileType: string },
              idx: number
            ) => <FileCard key={idx} file={file} />
          )
        ) : (
          <div
            style={{
              color: "#999",
              fontSize: "0.8125rem",
              padding: "20px 0",
              textAlign: "center",
              backgroundColor: "#fafafa",
              borderRadius: 6,
              border: "1px dashed #e0e0e0",
            }}
          >
            증빙자료가 없습니다
          </div>
        )}
      </div>

      {/* 삭제 버튼 */}
      <div style={{ textAlign: "center", marginTop: 28, paddingTop: 8 }}>
        <button
          type="button"
          style={{
            ...submitBtnStyle,
            background: "#dc2626",
          }}
          onClick={handleDeleteClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#b91c1c";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#dc2626";
          }}
        >
          제출내역 삭제
        </button>
      </div>

      {/* 삭제 확인 모달 */}
      {showDeleteConfirm &&
        ReactDOM.createPortal(
          <ModalOverlay>
            <ModalContent>
              <ModalTitle>제출내역을 삭제하시겠습니까?</ModalTitle>
              <ModalDesc>
                삭제 시 해당 내역과 관련된 정보가 모두 삭제됩니다.
                <br />
                승인 상태를 변경하여 수정을 요청할 수 있습니다.
                <br />
                <br />
                <strong>정말 삭제하시겠습니까?</strong>
              </ModalDesc>
              <ModalButtonContainer>
                <ModalButton variant="danger" onClick={handleConfirmDelete}>
                  삭제
                </ModalButton>
                <ModalButton variant="cancel" onClick={handleCancelDelete}>
                  취소
                </ModalButton>
              </ModalButtonContainer>
            </ModalContent>
          </ModalOverlay>,
          document.body
        )}
    </div>
  );
};

export default AdminActivityMainContentView;
