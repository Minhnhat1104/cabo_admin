import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import React from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
};

interface MiModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: any;
  Footer: any;
}

const MiModal = (props: MiModalProps) => {
  const { open, title, onClose, children, Footer } = props;

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box p={2}>
            <Typography fontWeight={600}>{title}</Typography>
          </Box>
          <Divider />
          <Box p={2}>{children}</Box>
          <Divider />
          {Footer}
        </Box>
      </Modal>
    </div>
  );
};

export default MiModal;
