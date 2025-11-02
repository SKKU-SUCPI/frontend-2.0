/** @jsxImportSource @emotion/react */
import useStudentActivityItem from "@/hooks/student/useStudentActivityItem";
import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import Loading from "../layouts/Loading";
import axiosInstance from "@/apis/utils/axiosInterceptor";
import useDeleteStudentActivity from "@/hooks/student/useDeleteStudentActivity";
import usePatchStudentActivity from "@/hooks/student/usePatchStudentActivity";
import usePostStudentActivityAddFiles from "@/hooks/student/usePostStudentActivityAddFiles";
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
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#e0e0e0",
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
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#e8e8e8",
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

const fileNameStyle: React.CSSProperties = {
  fontWeight: 500,
  fontSize: "0.8125rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const fileMetaStyle: React.CSSProperties = {
  fontSize: "0.6875rem",
  color: "#999",
  marginTop: 2,
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
      <div style={fileInfoFlexStyle}>
        <div style={fileNameStyle}>
          {file.fileName}
        </div>
        <div style={fileMetaStyle}>
          {file.fileType.toUpperCase()}
        </div>
      </div>
      <div style={downloadTextStyle}>
        다운로드
      </div>
    </div>
  );
};

const fileInputStyle: React.CSSProperties = {
  display: "none",
};

const fileUploadBtnStyle: React.CSSProperties = {
  padding: "8px 16px",
  background: "#f5f5f5",
  color: "#444",
  borderRadius: 6,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#e0e0e0",
  cursor: "pointer",
  fontSize: "0.8125rem",
  fontWeight: 500,
  transition: "all 0.2s",
};

const removeFileBtnStyle: React.CSSProperties = {
  background: "transparent",
  color: "#999",
  borderWidth: "0",
  borderStyle: "none",
  cursor: "pointer",
  fontSize: "0.75rem",
  padding: "4px 8px",
  transition: "color 0.2s",
};

const submitBtnStyle: React.CSSProperties = {
  padding: "11px 32px",
  background: "#2c2c2c",
  color: "#fff",
  borderRadius: 6,
  borderWidth: "0",
  borderStyle: "none",
  cursor: "pointer",
  fontSize: "0.875rem",
  fontWeight: 600,
  transition: "all 0.15s",
};

const confirmBtnContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: 10,
  justifyContent: "center",
  alignItems: "center",
};

const confirmBtnStyle: React.CSSProperties = {
  padding: "10px 28px",
  borderRadius: 6,
  borderWidth: "0",
  borderStyle: "none",
  cursor: "pointer",
  fontSize: "0.875rem",
  fontWeight: 600,
  transition: "all 0.15s",
};

const confirmSubmitStyle: React.CSSProperties = {
  ...confirmBtnStyle,
  background: "#2c2c2c",
  color: "#fff",
};

const confirmCancelStyle: React.CSSProperties = {
  ...confirmBtnStyle,
  background: "#f5f5f5",
  color: "#666",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#e0e0e0",
};

const contentContainerStyle: React.CSSProperties = {
  width: "100%",
  padding: "4px 0",
};

const headerContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 14,
};

const titleWithoutMarginStyle: React.CSSProperties = {
  ...titleStyle,
  marginBottom: 0,
};

const submittedDateStyle: React.CSSProperties = {
  fontSize: "0.8125rem",
  color: "#666",
  fontWeight: 500,
};

const fileInfoFlexStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 0,
};

const downloadTextStyle: React.CSSProperties = {
  color: "#1a73e8",
  fontSize: "0.75rem",
  fontWeight: 500,
};

interface FileData {
  file: File;
  fileName: string;
  fileType: string;
}

const StudentActivityMainContentView = ({ id }: { id: string }) => {
  const { data, isLoading } = useStudentActivityItem(id);
  const [files, setFiles] = useState<FileData[]>([]);
  const [showSaveConfirm, setShowSaveConfirm] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [showFileConfirm, setShowFileConfirm] = useState<boolean>(false);
  const [showApprovedWarning, setShowApprovedWarning] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { mutate: deleteActivity } = useDeleteStudentActivity();
  const { mutate: patchActivity } = usePatchStudentActivity();
  const { mutate: addFiles } = usePostStudentActivityAddFiles();

  if (isLoading) return <Loading />;

  // 수정 모드 진입
  const handleEditClick = () => {
    // 승인된 제출내역(state=1)은 수정할 수 없음
    if (data.basicInfo.state === 1) {
      setShowApprovedWarning(true);
      return;
    }
    setEditTitle(data.basicInfo.title);
    setEditContent(data.basicInfo.content);
    setIsEditMode(true);
  };

  // 승인 경고 모달 닫기
  const handleCloseApprovedWarning = () => {
    setShowApprovedWarning(false);
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditTitle("");
    setEditContent("");
    setFiles([]);
  };

  // 삭제 확인
  const handleDeleteClick = () => {
    // 승인된 제출내역(state=1)은 삭제할 수 없음
    if (data.basicInfo.state === 1) {
      setShowApprovedWarning(true);
      return;
    }
    setShowDeleteConfirm(true);
  };

  // 삭제 확정
  const handleConfirmDelete = () => {
    deleteActivity(data.basicInfo.id);
    setShowDeleteConfirm(false);
  };

  // 삭제 취소
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

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

  // 저장 버튼 클릭 시 확인 모달 표시
  const handleSaveClick = () => {
    setShowSaveConfirm(true);
  };

  // 저장 확정
  const handleConfirmSave = () => {
    // 제목과 내용 수정
    patchActivity(
      {
        submitId: data.basicInfo.id,
        title: editTitle,
        content: editContent,
      },
      {
        onSuccess: () => {
          setShowSaveConfirm(false);
          // 파일이 있으면 파일 추가 확인
          if (files.length > 0) {
            setShowFileConfirm(true);
          } else {
            // 파일이 없으면 수정 완료
            setIsEditMode(false);
          }
        },
      }
    );
  };

  // 저장 취소
  const handleCancelSave = () => {
    setShowSaveConfirm(false);
  };

  // 파일 추가 확정
  const handleConfirmAddFiles = () => {
    addFiles(
      {
        submitId: data.basicInfo.id,
        files: files.map((f) => f.file),
      },
      {
        onSuccess: () => {
          setIsEditMode(false);
          setShowFileConfirm(false);
          setFiles([]);
        },
      }
    );
  };

  // 파일 추가 취소
  const handleCancelAddFiles = () => {
    setShowFileConfirm(false);
    setIsEditMode(false);
    setFiles([]);
  };

  return (
    <div style={contentContainerStyle}>
      {/* 활동 정보 */}
      <div style={sectionStyle}>
        <div style={headerContainerStyle}>
          <div style={titleWithoutMarginStyle}>활동 정보</div>
          <div style={submittedDateStyle}>
            제출 날짜: {new Date(data.basicInfo.submitDate).toLocaleDateString("ko-KR")}
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
          <div style={valueStyle}>
            {data.basicInfo.activityDetail}
          </div>
        </div>
        
        {/* 점수 표시 */}
        <div style={{
          marginTop: 12,
          fontSize: "0.8125rem",
          color: "#2c7a2c",
          fontWeight: 600,
          padding: "6px 12px",
          backgroundColor: "#f0f8f0",
          borderRadius: 6,
          display: "inline-block",
        }}>
          점수: +{data.basicInfo.activityWeight}
        </div>
      </div>

      {/* 제목 */}
      <div style={sectionStyle}>
        <div style={titleStyle}>활동 내용</div>
        <label style={labelStyle}>제목</label>
        {isEditMode ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#e0e0e0",
              borderRadius: 6,
              fontSize: "0.875rem",
              outline: "none",
              transition: "all 0.2s",
              fontFamily: "inherit",
              backgroundColor: "#fff",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.borderColor = "#999";
            }}
            onBlur={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.borderColor = "#e0e0e0";
            }}
          />
        ) : (
          <div style={valueStyle}>{data.basicInfo.title}</div>
        )}
      </div>

      {/* 활동 내용 */}
      <div style={sectionStyle}>
        <label style={labelStyle}>상세 내용</label>
        {isEditMode ? (
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#e0e0e0",
              borderRadius: 6,
              fontSize: "0.875rem",
              outline: "none",
              transition: "all 0.2s",
              minHeight: 140,
              resize: "vertical",
              lineHeight: 1.6,
              fontFamily: "inherit",
              backgroundColor: "#fff",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.borderColor = "#999";
            }}
            onBlur={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.borderColor = "#e0e0e0";
            }}
          />
        ) : (
          <div style={{
            ...valueStyle,
            minHeight: 140,
            lineHeight: 1.6,
            whiteSpace: "pre-wrap",
          }}>
            {data.basicInfo.content}
          </div>
        )}
      </div>

      {/* 증빙자료 */}
      <div style={sectionStyle}>
        <div style={titleStyle}>증빙자료</div>
        {data.fileInfoList.length > 0 ? (
          data.fileInfoList.map((file: { id: number; fileName: string; fileType: string }, idx: number) => (
            <FileCard key={idx} file={file} />
          ))
        ) : (
          <div style={{ 
            color: "#999", 
            fontSize: "0.8125rem",
            padding: "20px 0",
            textAlign: "center",
            backgroundColor: "#fafafa",
            borderRadius: 6,
            borderWidth: "1px",
            borderStyle: "dashed",
            borderColor: "#e0e0e0"
          }}>
            증빙자료가 없습니다
          </div>
        )}
      </div>
      {/* 추가 증빙 자료 (수정 모드일 때만) */}
      {isEditMode && (
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
                e.currentTarget.style.background = "#e8e8e8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#f5f5f5";
              }}
            >
              + 파일 첨부
            </button>

            <div style={{ marginTop: 12 }}>
              {files.length > 0 ? (
                files.map((file, idx) => (
                  <div key={idx} style={fileCardStyle}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ 
                        fontWeight: 500, 
                        fontSize: "0.8125rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}>
                        {file.fileName}
                      </div>
                      <div style={{ fontSize: "0.6875rem", color: "#999", marginTop: 2 }}>
                        {(file.file.size / 1024 / 1024).toFixed(2)} MB · {file.fileType.toUpperCase()}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(idx)}
                      style={removeFileBtnStyle}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#d32f2f";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#999";
                      }}
                    >
                      삭제
                    </button>
                  </div>
                ))
              ) : (
                <div style={{ 
                  color: "#999", 
                  fontSize: "0.8125rem",
                  marginTop: 10,
                  padding: "20px 0",
                  textAlign: "center",
                  backgroundColor: "#fafafa",
                  borderRadius: 6,
                  borderWidth: "1px",
                  borderStyle: "dashed",
                  borderColor: "#e0e0e0"
                }}>
                  추가 증빙 자료를 첨부하려면 위 버튼을 클릭하세요
                </div>
              )}
            </div>
        </div>
      )}

      {/* 수정/삭제 버튼 또는 저장/취소 버튼 */}
      <div style={{ textAlign: "center", marginTop: 28, paddingTop: 8 }}>
        {!isEditMode ? (
          <div style={confirmBtnContainerStyle}>
            <button
              type="button"
              style={submitBtnStyle}
              onClick={handleEditClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1a1a1a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#2c2c2c";
              }}
            >
              수정
            </button>
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
              삭제
            </button>
          </div>
        ) : (
          <div style={confirmBtnContainerStyle}>
            <button
              type="button"
              style={confirmSubmitStyle}
              onClick={handleSaveClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1a1a1a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#2c2c2c";
              }}
            >
              저장
            </button>
            <button
              type="button"
              style={confirmCancelStyle}
              onClick={handleCancelEdit}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#e8e8e8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#f5f5f5";
              }}
            >
              취소
            </button>
          </div>
        )}
      </div>

      {/* 저장 확인 모달 */}
      {showSaveConfirm && ReactDOM.createPortal(
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>수정 사항을 저장하시겠습니까?</ModalTitle>
            <ModalDesc>제목과 내용이 수정됩니다.</ModalDesc>
            <ModalButtonContainer>
              <ModalButton variant="primary" onClick={handleConfirmSave}>
                저장
              </ModalButton>
              <ModalButton variant="cancel" onClick={handleCancelSave}>
                취소
              </ModalButton>
            </ModalButtonContainer>
          </ModalContent>
        </ModalOverlay>,
        document.body
      )}

      {/* 삭제 확인 모달 */}
      {showDeleteConfirm && ReactDOM.createPortal(
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>정말 삭제하시겠습니까?</ModalTitle>
            <ModalDesc>삭제된 활동은 복구할 수 없습니다.</ModalDesc>
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

      {/* 파일 추가 확인 모달 */}
      {showFileConfirm && ReactDOM.createPortal(
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>파일을 추가하시겠습니까?</ModalTitle>
            <ModalDesc>⚠️ 기존 파일은 모두 삭제되고 새 파일로 교체됩니다.</ModalDesc>
            <ModalButtonContainer>
              <ModalButton variant="primary" onClick={handleConfirmAddFiles}>
                추가
              </ModalButton>
              <ModalButton variant="cancel" onClick={handleCancelAddFiles}>
                취소
              </ModalButton>
            </ModalButtonContainer>
          </ModalContent>
        </ModalOverlay>,
        document.body
      )}

      {/* 승인된 제출내역 수정 불가 경고 모달 */}
      {showApprovedWarning && ReactDOM.createPortal(
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>승인된 제출내역은 수정할 수 없습니다</ModalTitle>
            <ModalDesc>이미 승인된 활동은 수정이 불가능합니다.</ModalDesc>
            <ModalButtonContainer>
              <ModalButton variant="primary" onClick={handleCloseApprovedWarning}>
                확인
              </ModalButton>
            </ModalButtonContainer>
          </ModalContent>
        </ModalOverlay>,
        document.body
      )}
    </div>
  );
};

export default StudentActivityMainContentView;
