import React from "react";
import { css } from "@emotion/react";
import type { ActivityComment } from "@/types/activitiy";

const listStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 360px;
  overflow-y: auto;
`;

const itemStyle = css`
  margin: 0;
  padding: 0.75rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  color: #374151;
  font-size: 0.875rem;
`;

const dateStyle = css`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 4px;
`;

interface CommentsListProps {
  comments?: ActivityComment[];
  emptyText?: string;
  maxHeight?: number;
}

const CommentsList: React.FC<CommentsListProps> = ({ comments = [], emptyText = "등록된 댓글이 없습니다.", maxHeight }) => {
  const sorted = React.useMemo(
    () => [...comments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [comments]
  );

  return (
    <div css={[listStyle, maxHeight ? css`max-height: ${maxHeight}px;` : undefined]}>
      {sorted.length > 0 ? (
        sorted.map((c) => (
          <div key={c.id} css={itemStyle}>
            <div>{c.content}</div>
            <div css={dateStyle}>{new Date(c.date).toLocaleString("ko-KR")}</div>
          </div>
        ))
      ) : (
        <div css={itemStyle}>{emptyText}</div>
      )}
    </div>
  );
};

export default CommentsList;


