import React, { useState, useMemo } from "react";
import useStudentActivitySubmit from "@/hooks/student/useStudentActivitySubmit";
import { useNavigate, useLocation } from "react-router-dom";
import useActivities from "@/hooks/common/useActivities";
import Loading from "@/components/layouts/Loading";

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

const inputBaseStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #e0e0e0",
  borderRadius: 6,
  fontSize: "0.875rem",
  outline: "none",
  transition: "all 0.2s",
  fontFamily: "inherit",
  backgroundColor: "#fafafa",
  boxSizing: "border-box",
};

const selectStyle: React.CSSProperties = {
  ...inputBaseStyle,
  cursor: "pointer",
};

const disabledSelectStyle: React.CSSProperties = {
  ...selectStyle,
  opacity: 0.6,
  cursor: "not-allowed",
  backgroundColor: "#f5f5f5",
};

const textareaStyle: React.CSSProperties = {
  ...inputBaseStyle,
  minHeight: 140,
  resize: "vertical",
  lineHeight: 1.6,
};

const fileInputStyle: React.CSSProperties = {
  display: "none",
};

const fileUploadBtnStyle: React.CSSProperties = {
  padding: "8px 16px",
  background: "#f5f5f5",
  color: "#444",
  borderRadius: 6,
  border: "1px solid #e0e0e0",
  cursor: "pointer",
  fontSize: "0.8125rem",
  fontWeight: 500,
  transition: "all 0.2s",
};

const fileCardStyle: React.CSSProperties = {
  border: "1px solid #e8e8e8",
  borderRadius: 6,
  padding: "10px 14px",
  marginBottom: 8,
  background: "#fafafa",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const removeFileBtnStyle: React.CSSProperties = {
  background: "transparent",
  color: "#999",
  border: "none",
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
  border: "none",
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
  border: "none",
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
  border: "1px solid #e0e0e0",
};

const infoBoxStyle: React.CSSProperties = {
  backgroundColor: "#fffbf0",
  border: "1px solid #f0e8d0",
  borderRadius: 6,
  padding: 14,
  marginTop: 28,
  textAlign: "left",
};

const activityTextStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  color: "#666",
  lineHeight: 1.6,
};

interface FileData {
  file: File;
  fileName: string;
  fileType: string;
}

// 영역(카테고리) 이름 매핑
const categoryNameMap: Record<string, string> = {
  LQ: "교과목 및 평점",
  RQ: "연구활동",
  CQ: "교내외활동",
};

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

const ActivityMainContentForm = () => {
  // 3단계 드롭다운 상태
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // LQ, RQ, CQ
  const [selectedClass, setSelectedClass] = useState<string>(""); // education, achievement, etc
  const [activityId, setActivityId] = useState<string>("");
  
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [files, setFiles] = useState<FileData[]>([]);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const { mutate: submitActivity } = useStudentActivitySubmit();
  const { list: activities, isLoading } = useActivities();

  const navigate = useNavigate();
  const location = useLocation();

  // 영역별로 그룹화
  const categorizedActivities = useMemo(() => {
    if (!activities) return {};
    
    const grouped: Record<string, typeof activities> = {};
    activities.forEach((activity) => {
      if (!grouped[activity.categoryName]) {
        grouped[activity.categoryName] = [];
      }
      grouped[activity.categoryName].push(activity);
    });
    return grouped;
  }, [activities]);

  // 선택된 영역의 분류 목록
  const availableClasses = useMemo(() => {
    if (!selectedCategory || !categorizedActivities[selectedCategory]) return [];
    
    const classes = new Set<string>();
    categorizedActivities[selectedCategory].forEach((activity) => {
      classes.add(activity.activityClass);
    });
    return Array.from(classes);
  }, [selectedCategory, categorizedActivities]);

  // 선택된 영역과 분류에 해당하는 상세항목 목록
  const availableDetails = useMemo(() => {
    if (!selectedCategory || !selectedClass || !categorizedActivities[selectedCategory]) return [];
    
    return categorizedActivities[selectedCategory].filter(
      (activity) => activity.activityClass === selectedClass
    );
  }, [selectedCategory, selectedClass, categorizedActivities]);

  // 선택된 활동의 점수 가져오기
  const selectedActivityScore = useMemo(() => {
    if (!activityId || !availableDetails.length) return null;
    const selected = availableDetails.find(
      (activity) => activity.activityId === Number(activityId)
    );
    return selected ? selected.activityWeight : null;
  }, [activityId, availableDetails]);

  // 영역 변경 시
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedClass("");
    setActivityId("");
  };

  // 분류 변경 시
  const handleClassChange = (activityClass: string) => {
    setSelectedClass(activityClass);
    setActivityId("");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirmSubmit = () => {
    submitActivity(
      {
        activityId: Number(activityId),
        title,
        content,
        files: files.map((file) => file.file),
      },
      {
        onSuccess: (data) => {
          setSelectedCategory("");
          setSelectedClass("");
          setActivityId("");
          setTitle("");
          setContent("");
          setFiles([]);
          setShowConfirm(false);
          const params = new URLSearchParams(location.search);
          params.set("id", data.data.id.toString());
          navigate(`/student/activity?${params.toString()}`);
        },
      }
    );
  };

  const handleCancelSubmit = () => {
    setShowConfirm(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "100%" }}>
      {/* 활동 선택 */}
      <div style={sectionStyle}>
        <div style={titleStyle}>활동 선택</div>
        
        {/* 안내 문구 */}
        <div style={{ 
          fontSize: "0.8125rem", 
          color: "#666", 
          marginBottom: 16,
          padding: "10px 14px",
          backgroundColor: "#f9f9f9",
          borderRadius: 6,
          border: "1px solid #e8e8e8"
        }}>
          💡 항목과 평가기준은 [홈 상단 → 평가기준] 표를 확인해주세요
        </div>

        {/* 1단계, 2단계: 분류와 세부 활동을 한 줄에 배치 */}
        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          {/* 1단계: 분류 선택 */}
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>분류</label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              style={selectStyle}
              required
              onFocus={(e) => {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.borderColor = "#999";
              }}
              onBlur={(e) => {
                e.currentTarget.style.backgroundColor = "#fafafa";
                e.currentTarget.style.borderColor = "#e0e0e0";
              }}
            >
              <option value="">분류를 선택하세요</option>
              {Object.keys(categorizedActivities).map((category) => (
                <option key={category} value={category}>
                  {categoryNameMap[category]} ({category})
                </option>
              ))}
            </select>
          </div>

          {/* 2단계: 세부 활동 선택 */}
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>세부 활동</label>
            <select
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
              style={!selectedCategory ? disabledSelectStyle : selectStyle}
              required
              disabled={!selectedCategory}
              onFocus={(e) => {
                if (selectedCategory) {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.borderColor = "#999";
                }
              }}
              onBlur={(e) => {
                if (selectedCategory) {
                  e.currentTarget.style.backgroundColor = "#fafafa";
                  e.currentTarget.style.borderColor = "#e0e0e0";
                }
              }}
            >
              <option value="">세부 활동을 선택하세요</option>
              {availableClasses.map((activityClass) => (
                <option key={activityClass} value={activityClass}>
                  {classNameMap[activityClass] || activityClass}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3단계: 상세항목 선택 */}
        <label style={labelStyle}>상세항목</label>
        <select
          value={activityId}
          onChange={(e) => setActivityId(e.target.value)}
          style={!selectedClass ? disabledSelectStyle : selectStyle}
          required
          disabled={!selectedClass}
          onFocus={(e) => {
            if (selectedClass) {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.borderColor = "#999";
            }
          }}
          onBlur={(e) => {
            if (selectedClass) {
              e.currentTarget.style.backgroundColor = "#fafafa";
              e.currentTarget.style.borderColor = "#e0e0e0";
            }
          }}
        >
          <option value="">상세항목을 선택하세요</option>
          {availableDetails.map((activity) => (
            <option key={activity.activityId} value={activity.activityId}>
              {activity.activityDetail}
            </option>
          ))}
        </select>

        {/* 선택된 활동의 점수 표시 */}
        {selectedActivityScore !== null && (
          <div style={{
            marginTop: 8,
            fontSize: "0.8125rem",
            color: "#2c7a2c",
            fontWeight: 600,
            padding: "6px 12px",
            backgroundColor: "#f0f8f0",
            borderRadius: 6,
            display: "inline-block",
          }}>
            점수: +{selectedActivityScore}
          </div>
        )}
      </div>

      {/* 활동 내용 */}
      <div style={sectionStyle}>
        <div style={titleStyle}>활동 내용</div>
        <label style={labelStyle}>제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            ...inputBaseStyle,
            marginBottom: 16,
          }}
          placeholder="활동 제목을 입력하세요"
          required
          onFocus={(e) => {
            e.currentTarget.style.backgroundColor = "#fff";
            e.currentTarget.style.borderColor = "#999";
          }}
          onBlur={(e) => {
            e.currentTarget.style.backgroundColor = "#fafafa";
            e.currentTarget.style.borderColor = "#e0e0e0";
          }}
        />
        <label style={labelStyle}>상세 내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={textareaStyle}
          placeholder="활동 내용을 구체적으로 작성해주세요.&#10;&#10;• 활동 일시 및 장소&#10;• 활동 내용 및 역할&#10;• 성과 및 느낀점"
          required
          onFocus={(e) => {
            e.currentTarget.style.backgroundColor = "#fff";
            e.currentTarget.style.borderColor = "#999";
          }}
          onBlur={(e) => {
            e.currentTarget.style.backgroundColor = "#fafafa";
            e.currentTarget.style.borderColor = "#e0e0e0";
          }}
        />
      </div>

      {/* 증빙자료 */}
      <div style={sectionStyle}>
        <div style={titleStyle}>증빙자료</div>
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
              border: "1px dashed #e0e0e0"
            }}>
              파일을 첨부하려면 위 버튼을 클릭하세요
            </div>
          )}
        </div>
      </div>

      {/* 제출 버튼 */}
      <div style={{ textAlign: "center", marginTop: 28, paddingTop: 8 }}>
        {!showConfirm ? (
          <button
            type="submit"
            style={submitBtnStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1a1a1a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#2c2c2c";
            }}
          >
            활동 제출하기
          </button>
        ) : (
          <div style={confirmBtnContainerStyle}>
            <button
              type="button"
              style={confirmSubmitStyle}
              onClick={handleConfirmSubmit}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1a1a1a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#2c2c2c";
              }}
            >
              제출
            </button>
            <button
              type="button"
              style={confirmCancelStyle}
              onClick={handleCancelSubmit}
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

      {/* 제출 전 확인사항 */}
      <div style={infoBoxStyle}>
        <div style={{ fontWeight: 600, fontSize: "0.8125rem", marginBottom: 6, color: "#8b7043" }}>
          ⚠️ 제출 전 확인사항
        </div>
        <div style={{ ...activityTextStyle, color: "#8b7043" }}>
          • 모든 활동은 증빙자료 첨부 필수
          <br />
          • 활동별 점수가 높을수록 더 많은 증빙 필요
          <br />• 허위 제출 시 불이익이 있을 수 있음
        </div>
      </div>
    </form>
  );
};

export default ActivityMainContentForm;
