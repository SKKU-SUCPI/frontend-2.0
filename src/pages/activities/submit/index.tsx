import React, { useState } from "react";
import { css } from "@emotion/react";
import Modal from "@/components/overlays/Modal";
const ActivitiesSubmit: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        css={css`
          padding: 20px;
        `}
      >
        <h1>Activities Submit</h1>
        <button onClick={() => setIsModalOpen(true)}>open modal</button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="modal wrapper test"
      >
        <h1>modal wrapper test</h1>
      </Modal>
    </>
  );
};

export default ActivitiesSubmit;
