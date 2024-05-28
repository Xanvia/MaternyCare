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
  const BASE_URL = "http://localhost:5000/";
  // const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const deleteNotice = () => {
    // setLoading(true);
    const axiosConfig = {
      method: "delete",
      url: `${BASE_URL}notices/${noticeId}`,
      headers: {
        Authorization: `Bearer`,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        console.log(response.data);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        setTimeout(() => window.location.reload(), 1000);
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
      {showAlert && (
        <div
          className="fixed top-0 right-0 m-4 p-4 text-sm text-green-800 rounded-lg bg-green-300 dark:bg-gray-800 dark:text-green-400 z-50"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Success alert!</span> The notice has
            been deleted successfully.
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
