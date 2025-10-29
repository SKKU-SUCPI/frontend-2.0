import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ActivityRouter from "./ActivityRouter";

type ActivityDetailModalProps = {
  id: string;
  open: boolean;
  onClose: () => void;
};

const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({ id, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="activity-detail-modal" aria-describedby="activity-detail-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          overflowY: "auto",
          width: "1200px",
          minHeight: "600px",
          maxWidth: "90vw",
          maxHeight: "85vh",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <ActivityRouter key={id} id={id} />
      </Box>
    </Modal>
  );
};

export default ActivityDetailModal;


