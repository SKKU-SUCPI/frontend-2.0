import React, { useState, useMemo } from "react";
import activityData from "@/constants/activity_table.json";

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

const labelStyle: React.CSSProperties = {
  color: "#888",
  fontWeight: 500,
  display: "block",
  marginBottom: 8,
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  border: "1px solid #d0d0d0",
  borderRadius: 8,
  fontSize: 16,
  outline: "none",
  transition: "border 0.2s",
  cursor: "pointer",
  background: "#fff",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  border: "1px solid #d0d0d0",
  borderRadius: 8,
  fontSize: 16,
  outline: "none",
  transition: "border 0.2s",
  minHeight: 120,
  resize: "vertical",
  fontFamily: "inherit",
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

const fileCardStyle: React.CSSProperties = {
  border: "1.5px solid #d0d0d0",
  borderRadius: 12,
  padding: "12px 20px",
  marginBottom: 12,
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
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

// activity_class를 한글명으로 매핑
const classNameMap: Record<string, string> = {
  education: "교육활동",
  achievement: "학업성취도",
  swActivity: "SW활동",
  journal: "학술지",
  conference: "학술대회",
  contest: "공모전",
  coop: "산학협력",
  internship: "인턴십",
  startup: "창업",
  overseaVolunteer: "해외봉사",
  seminar: "세미나",
  alimi: "알리미",
  council: "학생회",
  reporter: "기자단",
  studioContribution: "스튜디오",
  studyGroup: "스터디그룹",
};

// 카테고리 이름 매핑
const categoryNameMap: Record<number, string> = {
  1: "교과목 및 평점",
  2: "연구활동",
  3: "교내외활동",
};

const ActivityMainContentForm = () => {
  const [activityId, setActivityId] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [files, setFiles] = useState<FileData[]>([]);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // 카테고리별로 그룹화된 활동 데이터
  const groupedActivities = useMemo(() => {
    const grouped: Record<number, Record<string, any[]>> = {};

    activityData.forEach((activity) => {
      if (!grouped[activity.category_id]) {
        grouped[activity.category_id] = {};
      }

      const className =
        classNameMap[activity.activity_class] || activity.activity_class;

      if (!grouped[activity.category_id][className]) {
        grouped[activity.category_id][className] = [];
      }

      grouped[activity.category_id][className].push(activity);
    });

    return grouped;
  }, []);

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
    console.log("Submit data:", {
      activityId,
      content,
      files,
    });
    // TODO: API 호출
    setShowConfirm(false);
  };

  const handleCancelSubmit = () => {
    setShowConfirm(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 활동 선택 */}
      <div style={sectionStyle}>
        <div style={titleStyle}>활동 선택</div>
        <label style={labelStyle}>활동 항목</label>
        <select
          value={activityId}
          onChange={(e) => setActivityId(e.target.value)}
          style={selectStyle}
          required
        >
          <option value="">활동을 선택하세요</option>
          {Object.entries(groupedActivities).map(([categoryId, classes]) => (
            <optgroup
              key={categoryId}
              label={categoryNameMap[Number(categoryId)]}
            >
              {Object.entries(classes).map(([className, activities]) =>
                activities.map((activity) => (
                  <option
                    key={activity.activity_id}
                    value={activity.activity_id}
                  >
                    [{className}] {activity.activity_detail}
                  </option>
                ))
              )}
            </optgroup>
          ))}
        </select>
      </div>

      {/* 활동 내용 */}
      <div style={sectionStyle}>
        <div style={titleStyle}>활동 내용</div>
        <label style={labelStyle}>상세 내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={textareaStyle}
          placeholder="활동 내용을 구체적으로 작성해주세요.&#10;&#10;• 활동 일시 및 장소&#10;• 활동 내용 및 역할&#10;• 성과 및 느낀점"
          required
        />
      </div>

      {/* 첨부파일 */}
      <div style={sectionStyle}>
        <div style={titleStyle}>첨부파일</div>
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
                  <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                    {(file.file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
              파일을 첨부하려면 위 버튼을 클릭하세요.
            </div>
          )}
        </div>
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
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#333333";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
            }}
          >
            활동 제출
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
    </form>
  );
};

export default ActivityMainContentForm;
