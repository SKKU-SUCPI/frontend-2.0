import useStudentActivityItem from "@/hooks/student/useStudentActivityItem";
import React, { useState, useRef } from "react";
import Loading from "../layouts/Loading";
import axiosInstance from "@/apis/utils/axiosInterceptor";
import useStudentActivityReSubmit from "@/hooks/student/useStudentActivityReSubmit";
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
const FileCard = ({
  file,
}: {
  file: { id: number; fileName: string; fileType: string };
}) => {
  const hover = useHover();

  const handleDownload = async () => {
    try {
      const response = await axiosInstance.get(
        `/student/files/${file.id}/download`,
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
      <div>
        <div>{file.fileName}</div>
      </div>
      <div style={{ color: "#888", fontSize: 14 }}>
        {file.fileType.toUpperCase()}
      </div>
    </div>
  );
};

const fileInputStyle: React.CSSProperties = {
  display: "none",
};

const fileUploadBtnStyle: React.CSSProperties = {
  padding: "10px 20px",
  background: "#ffffff",
  color: "#333",
  borderRadius: 8,
  border: "1.5px solid #333",
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 500,
  transition: "all 0.2s",
};

const removeFileBtnStyle: React.CSSProperties = {
  background: "#ffffff",
  color: "#ff4d4f",
  border: "1px solid #ff4d4f",
  borderRadius: 6,
  padding: "4px 12px",
  cursor: "pointer",
  fontSize: 12,
  transition: "all 0.2s",
};

const submitBtnStyle: React.CSSProperties = {
  padding: "14px 40px",
  background: "#333333",
  color: "#fff",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  fontSize: 16,
  fontWeight: 600,
  transition: "all 0.2s",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const confirmBtnContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  alignItems: "center",
};

const confirmBtnStyle: React.CSSProperties = {
  padding: "12px 32px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  fontSize: 15,
  fontWeight: 600,
  transition: "all 0.2s",
};

const confirmSubmitStyle: React.CSSProperties = {
  ...confirmBtnStyle,
  background: "#4285f4",
  color: "#fff",
};

const confirmCancelStyle: React.CSSProperties = {
  ...confirmBtnStyle,
  background: "#ff4d4f",
  color: "#fff",
};

interface FileData {
  file: File;
  fileName: string;
  fileType: string;
}

const StudentActivityMainContentView = ({ id }: { id: string }) => {
  const { data, isLoading } = useStudentActivityItem(id);
  const [files, setFiles] = useState<FileData[]>([]);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: submit } = useStudentActivityReSubmit();

  if (isLoading) return <Loading />;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        fileName: file.name.split(".")[0],
        fileType: file.name.split(".").pop() || "unknown",
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirmSubmit = () => {
    submit({
      submitId: data.basicInfo.id,
      files: files.map((file) => file.file),
    });
    setFiles([]);
    setShowConfirm(false);
  };

  const handleCancelSubmit = () => {
    setShowConfirm(false);
  };

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
      {data.basicInfo.state === 2 && (
        <form onSubmit={handleSubmit}>
          <div style={sectionStyle}>
            <div style={titleStyle}>추가 증빙 자료</div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              style={fileInputStyle}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={fileUploadBtnStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f5f5f5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ffffff";
              }}
            >
              파일 첨부
            </button>

            <div style={{ marginTop: 16 }}>
              {files.length > 0 ? (
                files.map((file, idx) => (
                  <div key={idx} style={fileCardStyle}>
                    <div>
                      <div style={{ fontWeight: 500 }}>{file.fileName}</div>
                      <div
                        style={{ fontSize: 12, color: "#666", marginTop: 4 }}
                      >
                        {(file.file.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <span style={{ color: "#888", fontSize: 14 }}>
                        {file.fileType.toUpperCase()}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(idx)}
                        style={removeFileBtnStyle}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#ffebeb";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#ffffff";
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ color: "#888", marginTop: 12 }}>
                  추가 증빙 자료를 첨부하려면 위 버튼을 클릭하세요.
                </div>
              )}
            </div>

            {/* 제출 버튼 */}
            <div style={{ textAlign: "center", marginTop: 32 }}>
              {!showConfirm ? (
                <button
                  type="submit"
                  style={submitBtnStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#000000";
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#333333";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 4px rgba(0,0,0,0.1)";
                  }}
                >
                  추가 증빙 자료 제출
                </button>
              ) : (
                <div style={confirmBtnContainerStyle}>
                  <button
                    type="button"
                    style={confirmSubmitStyle}
                    onClick={handleConfirmSubmit}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#3367d6";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#4285f4";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    제출
                  </button>
                  <button
                    type="button"
                    style={confirmCancelStyle}
                    onClick={handleCancelSubmit}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#e53935";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#ff4d4f";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    취소
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default StudentActivityMainContentView;
