import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";

const titleStyle = css`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 2rem 0;
`;
// 폼 요소를 위한 추가 스타일
const formGroupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const labelStyle = css`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const inputStyle = css`
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    ring: 2px solid rgba(37, 99, 235, 0.2);
  }
`;

const textareaStyle = css`
  ${inputStyle};
  min-height: 150px;
  resize: vertical;
`;

const selectStyle = css`
  ${inputStyle};
`;

const submitButtonStyle = css`
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  background-color: #333333;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  letter-spacing: 0.025em;

  &:hover {
    background-color: #4b5563;
  }

  &:active {
    background-color: #1f2937;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(75, 85, 99, 0.3);
  }
`;

const errorStyle = css`
  color: #dc2626;
  font-size: 0.875rem;
`;

const fileListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const fileItemStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
`;

const fileNameStyle = css`
  font-size: 0.875rem;
  color: #111827;
  font-weight: 500;
`;

const fileSizeStyle = css`
  font-size: 0.75rem;
  color: #6b7280;
  margin-left: 0.5rem;
`;

const deleteButtonStyle = css`
  padding: 0.375rem 0.75rem;
  background-color: #333333;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #4b5563;
  }
`;

const addFileButtonStyle = css`
  width: 100%;
  padding: 0.75rem;
  background-color: #f3f4f6;
  border: 1px dashed #d1d5db;
  border-radius: 0.5rem;
  color: #4b5563;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: #e5e7eb;
    border-color: #9ca3af;
  }
`;

interface FormData {
  activity_title: string;
  category_class: string;
  activity_class: string;
  activity_detail: string;
  activity_date: string;
  activity_content: string;
  files: FileList;
}

const SubmitView = () => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleFileAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleFileDelete = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    // API 호출 로직 구현
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2 css={titleStyle}>활동 정보</h2>
          <div css={formGroupStyle}>
            <label css={labelStyle}>활동 제목</label>
            <input
              type="text"
              css={inputStyle}
              {...register("activity_title", {
                required: "활동 제목을 입력해주세요",
              })}
            />
            {errors.activity_title && (
              <span css={errorStyle}>{errors.activity_title.message}</span>
            )}
          </div>

          <div css={formGroupStyle}>
            <label css={labelStyle}>활동 분류</label>
            <select
              css={selectStyle}
              {...register("category_class", {
                required: "활동 분류를 선택해주세요",
              })}
            >
              <option value="">선택해주세요</option>
              <option value="교내활동">교내활동</option>
              <option value="교외활동">교외활동</option>
            </select>
            {errors.category_class && (
              <span css={errorStyle}>{errors.category_class.message}</span>
            )}
          </div>

          <div css={formGroupStyle}>
            <label css={labelStyle}>세부 활동</label>
            <select
              css={selectStyle}
              {...register("activity_class", {
                required: "세부 활동을 선택해주세요",
              })}
            >
              <option value="">선택해주세요</option>
              <option value="봉사활동">봉사활동</option>
              <option value="동아리활동">동아리활동</option>
              <option value="학술활동">학술활동</option>
            </select>
            {errors.activity_class && (
              <span css={errorStyle}>{errors.activity_class.message}</span>
            )}
          </div>

          <div css={formGroupStyle}>
            <label css={labelStyle}>실적</label>
            <input
              type="text"
              css={inputStyle}
              {...register("activity_detail", {
                required: "실적을 입력해주세요",
              })}
            />
            {errors.activity_detail && (
              <span css={errorStyle}>{errors.activity_detail.message}</span>
            )}
          </div>

          <div css={formGroupStyle}>
            <label css={labelStyle}>활동 날짜</label>
            <input
              type="date"
              css={inputStyle}
              {...register("activity_date", {
                required: "활동 날짜를 선택해주세요",
              })}
            />
            {errors.activity_date && (
              <span css={errorStyle}>{errors.activity_date.message}</span>
            )}
          </div>
        </div>

        <Divider />

        <div>
          <h2 css={titleStyle}>활동 내용</h2>
          <div css={formGroupStyle}>
            <textarea
              css={textareaStyle}
              {...register("activity_content", {
                required: "활동 내용을 입력해주세요",
              })}
            />
            {errors.activity_content && (
              <span css={errorStyle}>{errors.activity_content.message}</span>
            )}
          </div>
        </div>

        <Divider />

        <div>
          <h2 css={titleStyle}>첨부파일</h2>
          <div css={fileListStyle}>
            {files.map((file, index) => (
              <div key={index} css={fileItemStyle}>
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                  `}
                >
                  <span css={fileNameStyle}>{file.name}</span>
                  <span css={fileSizeStyle}>({formatFileSize(file.size)})</span>
                </div>
                <button
                  type="button"
                  css={deleteButtonStyle}
                  onClick={() => handleFileDelete(index)}
                >
                  삭제
                </button>
              </div>
            ))}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileAdd}
              multiple
              style={{ display: "none" }}
            />
            <button
              type="button"
              css={addFileButtonStyle}
              onClick={() => fileInputRef.current?.click()}
            >
              <span
                css={css`
                  font-size: 1.25rem;
                  line-height: 1;
                `}
              >
                +
              </span>
              첨부파일 추가
            </button>
          </div>
        </div>

        <button type="submit" css={submitButtonStyle}>
          활동 제출하기
        </button>
      </form>
    </>
  );
};

export default SubmitView;
