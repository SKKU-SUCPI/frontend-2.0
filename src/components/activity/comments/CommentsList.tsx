/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { css } from "@emotion/react";
import type { ActivityComment } from "@/types/activitiy";
import useAuthStore from "@/stores/auth/authStore";
import usePatchSubmitComment from "@/hooks/admin/usePatchSubmitComment";
import useDeleteSubmitComment from "@/hooks/admin/useDeleteSubmitComment";
import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  ModalDesc,
  ModalButtonContainer,
  ModalButton,
} from "@/styles/components/Modal";

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
  position: relative;
`;

const dateStyle = css`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 4px;
`;

const authorStyle = css`
  font-size: 0.75rem;
  color: #4b5563;
  font-weight: 600;
  margin-bottom: 4px;
`;

const buttonContainerStyle = css`
  display: flex;
  gap: 6px;
  margin-top: 8px;
`;

const buttonStyle = css`
  padding: 4px 10px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s;
`;

const editButtonStyle = css`
  ${buttonStyle}
  background-color: #dbeafe;
  color: #1e40af;
  &:hover {
    background-color: #bfdbfe;
  }
`;

const deleteButtonStyle = css`
  ${buttonStyle}
  background-color: #fee2e2;
  color: #991b1b;
  &:hover {
    background-color: #fecaca;
  }
`;

const saveButtonStyle = css`
  ${buttonStyle}
  background-color: #2c2c2c;
  color: #fff;
  &:hover {
    background-color: #1a1a1a;
  }
`;

const cancelButtonStyle = css`
  ${buttonStyle}
  background-color: #f5f5f5;
  color: #666;
  border: 1px solid #e0e0e0;
  &:hover {
    background-color: #e8e8e8;
  }
`;

const textareaStyle = css`
  width: 100%;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  font-family: inherit;
  resize: vertical;
  min-height: 60px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

interface CommentsListProps {
  comments?: ActivityComment[];
  emptyText?: string;
  maxHeight?: number;
}

const CommentsList: React.FC<CommentsListProps> = ({ comments = [], emptyText = "등록된 댓글이 없습니다.", maxHeight }) => {
  const { userProfile } = useAuthStore();
  const { mutate: patchComment } = usePatchSubmitComment();
  const { mutate: deleteComment } = useDeleteSubmitComment();
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [saveConfirmId, setSaveConfirmId] = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const sorted = React.useMemo(
    () => [...comments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [comments]
  );

  const isAdmin = userProfile?.role === "admin" || userProfile?.role === "super-admin";
  const currentUserId = userProfile?.id;

  const handleEditClick = (comment: ActivityComment) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const handleSaveClick = (commentId: number) => {
    setSaveConfirmId(commentId);
  };

  const handleConfirmSave = () => {
    if (saveConfirmId) {
      patchComment(
        { id: saveConfirmId, content: editContent },
        {
          onSuccess: () => {
            setEditingId(null);
            setEditContent("");
            setSaveConfirmId(null);
          },
        }
      );
    }
  };

  const handleCancelSave = () => {
    setSaveConfirmId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditContent("");
  };

  const handleDeleteClick = (commentId: number) => {
    setDeleteConfirmId(commentId);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmId) {
      deleteComment(deleteConfirmId, {
        onSuccess: () => {
          setDeleteConfirmId(null);
        },
      });
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmId(null);
  };

  const canModifyComment = (comment: ActivityComment) => {
    return isAdmin && currentUserId === comment.userId;
  };

  return (
    <>
      <div css={[listStyle, maxHeight ? css`max-height: ${maxHeight}px;` : undefined]}>
        {sorted.length > 0 ? (
          sorted.map((c) => (
            <div key={c.id} css={itemStyle}>
              <div css={authorStyle}>{c.userName}</div>
              
              {editingId === c.id ? (
                <>
                  <textarea
                    css={textareaStyle}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div css={buttonContainerStyle}>
                    <button css={saveButtonStyle} onClick={() => handleSaveClick(c.id)}>
                      저장
                    </button>
                    <button css={cancelButtonStyle} onClick={handleCancelEdit}>
                      취소
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>{c.content}</div>
                  <div css={dateStyle}>{new Date(c.date).toLocaleString("ko-KR")}</div>
                  
                  {canModifyComment(c) && (
                    <div css={buttonContainerStyle}>
                      <button css={editButtonStyle} onClick={() => handleEditClick(c)}>
                        수정
                      </button>
                      <button css={deleteButtonStyle} onClick={() => handleDeleteClick(c.id)}>
                        삭제
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <div css={itemStyle}>{emptyText}</div>
        )}
      </div>

      {/* 수정 확인 모달 */}
      {saveConfirmId && ReactDOM.createPortal(
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>댓글을 수정하시겠습니까?</ModalTitle>
            <ModalDesc>수정된 내용으로 변경됩니다.</ModalDesc>
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
      {deleteConfirmId && ReactDOM.createPortal(
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>댓글을 삭제하시겠습니까?</ModalTitle>
            <ModalDesc>삭제된 댓글은 복구할 수 없습니다.</ModalDesc>
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
    </>
  );
};

export default CommentsList;


