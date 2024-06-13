import React, { useState } from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Rings } from "react-loader-spinner";

import IconButton from "@mui/joy/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface DeleteConfirmationProps {
  noticeId: string;
}

export default function DeleteConfirmation({
  noticeId,
}: DeleteConfirmationProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const BASE_URL = "http://localhost:3000/";
  const token = localStorage.getItem("token");
  // const [loading, setLoading] = useState(false);

  const deleteNotice = () => {
    // setLoading(true);
    const axiosConfig = {
      method: "delete",
      url: `${BASE_URL}notices/${noticeId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        console.log(response.data);
        // setTimeout(() => setShowAlert(false), 3000);
        toast.success("The notice has been deleted successfully.");
        setTimeout(() => window.location.reload(), 2000);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Button
        variant="outlined"
        color="danger"
        endDecorator={<DeleteForever />}
        onClick={() => setOpen(true)}
        sx={{
          mt: 3,
          background: "white",
          color: "#F580AB",
          "&:hover": {
            borderColor: "#F9B8D0",
            color: "#F9B8D0",
          },
        }}
      >
        Delete
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: "8px",
              right: "8px",
              color: "#666666",
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              color: "#333333",
            }}
          >
            <WarningRoundedIcon />
            Are you sure?
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              color: "#666666",
            }}
          >
            Are you sure you want to delete this item? This action cannot be
            undone
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              color: "#666666",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                borderColor: "#F580AB",
                color: "#000000",
                "&:hover": {
                  borderColor: "#F9B8D0",
                },
                width: { xs: "50%", md: "40%" },
                fontSize: "1rem",
              }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              sx={{
                backgroundColor: "#F580AB",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#F9B8D0",
                },
                width: { xs: "50%", md: "40%" },
                fontSize: "1rem",
              }}
              onClick={() => {
                deleteNotice();
                setOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
