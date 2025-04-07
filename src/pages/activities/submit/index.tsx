import React, { useState } from "react";
import { css } from "@emotion/react";
import Modal from "@/components/overlays/Modal";
import ActivityDetail from "../components/ActivityDetail";

const ActivitiesSubmit: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewType, setViewType] = useState<"submit" | "review" | "history">(
    "submit"
  );
  const openModal = (viewType: "submit" | "review" | "history") => {
    setViewType(viewType);
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        css={css`
          padding: 20px;
        `}
      >
        <h1>Activities Submit</h1>
        <button onClick={() => openModal("submit")}>제출모드(학생)</button>
        <button onClick={() => openModal("history")}>
          읽기모드(학생, 관리자 공통)
        </button>
        <button onClick={() => openModal("review")}>리뷰모드(관리자)</button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="제출 상세보기"
      >
        <ActivityDetail activity_id={1} view_type={viewType} />
      </Modal>
    </>
  );
};

export default ActivitiesSubmit;
