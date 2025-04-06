import { css } from "@emotion/react";
import styled from "@emotion/styled";
import FlexBox from "@/styles/components/Flexbox";

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

const infoGridStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const infoRowStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const infoLabelStyle = css`
  font-size: 0.875rem;
  color: #6b7280;
`;

const infoValueStyle = css`
  font-size: 1rem;
  font-weight: 500;
`;

const contentStyle = css`
  margin-top: 1rem;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const fileListStyle = css`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const fileItemStyle = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  cursor: pointer;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const fileNameStyle = css`
  flex: 1;
`;

const fileSizeStyle = css`
  color: #6b7280;
  font-size: 0.875rem;
`;

interface ReadViewProps {
  category_class: string;
  activity_class: string;
  activity_detail: string;
  activity_date: string;
  activity_title: string;
  activity_content: string;
  files: { id: number; name: string; size: string }[];
}

const ReadView: React.FC<ReadViewProps> = ({
  category_class,
  activity_class,
  activity_detail,
  activity_date,
  activity_title,
  activity_content,
  files,
}) => {
  return (
    <>
      <div>
        <div css={titleStyle}>활동 정보</div>
        <div css={infoGridStyle}>
          <FlexBox direction="column" gap="0.5rem" align="flex-start">
            <span css={infoLabelStyle}>활동 제목</span>
            <span css={infoValueStyle}>{activity_title}</span>
          </FlexBox>
          <div css={infoRowStyle}>
            <FlexBox direction="column" gap="0.5rem" align="flex-start">
              <span css={infoLabelStyle}>활동 분류</span>
              <span css={infoValueStyle}>{category_class}</span>
            </FlexBox>
            <FlexBox direction="column" gap="0.5rem" align="flex-start">
              <span css={infoLabelStyle}>세부 활동</span>
              <span css={infoValueStyle}>{activity_class}</span>
            </FlexBox>
          </div>
          <div css={infoRowStyle}>
            <FlexBox direction="column" gap="0.5rem" align="flex-start">
              <span css={infoLabelStyle}>실적</span>
              <span css={infoValueStyle}>{activity_detail}</span>
            </FlexBox>
            <FlexBox direction="column" gap="0.5rem" align="flex-start">
              <span css={infoLabelStyle}>활동 날짜</span>
              <span css={infoValueStyle}>{activity_date}</span>
            </FlexBox>
          </div>
        </div>
      </div>
      <Divider />
      <div>
        <div css={titleStyle}>활동 내용</div>
        <div css={contentStyle}>{activity_content}</div>
      </div>
      <Divider />
      <div>
        <div css={titleStyle}>첨부파일</div>
        <div css={fileListStyle}>
          {files.map((file) => (
            <div key={file.id} css={fileItemStyle}>
              <span css={fileNameStyle}>{file.name}</span>
              <span css={fileSizeStyle}>{file.size}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReadView;
