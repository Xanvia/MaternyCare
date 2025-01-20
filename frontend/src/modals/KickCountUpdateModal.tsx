import React, { useState } from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import IconButton from "@mui/joy/IconButton";
import TextField from "@mui/material/TextField";
import { CloseIcon, PlusCircle } from "../assets/icons/Icons";
import axios from "axios";

const BASE_URL = `${process.env.BASE_URL}`;

interface KickCountUpdateModalProps {
  motherId: number;
  // onUpdate: () => void;
}

export default function KickCountUpdateModal({
  motherId,
}: // onUpdate,
KickCountUpdateModalProps) {
  const [open, setOpen] = useState(false);
  const [newKickCount, setNewKickCount] = useState(0);

  const handleKickCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewKickCount(Number(event.target.value));
  };

  const handleUpdateKickCount = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}mother/update-kick-count`,
        {
          motherId,
          kickCount: newKickCount,
        },
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        }
      );
      // onUpdate(); // Call the onUpdate function to refresh the data in the parent component
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating kick count:", error);
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        sx={{
          borderColor: "#0D99FF",
          color: "#0D99FF",
          width: "100%",
          "&:hover": {
            borderColor: "#80CAFF",
            color: "#80CAFF",
          },
        }}
      >
        <PlusCircle className="mr-2" />
        Update
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
            Update kick count
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
            Please enter the new kick count. Confirm the update to save changes.
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
              variant="solid"
              sx={{
                backgroundColor: "#0D99FF",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#80CAFF",
                },
                width: { xs: "50%", md: "40%" },
                fontSize: "1rem",
              }}
              onClick={handleUpdateKickCount}
            >
              Update
            </Button>
            <TextField
              id="outlined-number-small"
              label=""
              type="number"
              size="small"
              value={newKickCount}
              onChange={handleKickCountChange}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                sx: {
                  height: "36px", // Adjust the height of the input field
                },
              }}
              sx={{
                width: { xs: "50%", md: "40%" },
                fontSize: "1rem",
              }}
            />
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
