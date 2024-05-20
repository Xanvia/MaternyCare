import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteForever from "@mui/icons-material/DeleteForever";

import IconButton from "@mui/joy/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

export default function AlertDialogModal() {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="danger"
        endDecorator={<DeleteForever />}
        onClick={() => setOpen(true)}
        sx={{
          borderColor: "#F580AB",
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
              onClick={() => setOpen(false)}
            >
              Update
            </Button>

            {/* <Button
              variant="outlined"
              sx={{
                borderColor: "#0D99FF",
                color: "#000000",
                "&:hover": {
                  borderColor: "#80CAFF",
                },
                width: { xs: "50%", md: "40%" },
                fontSize: "1rem",
              }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button> */}

            <TextField
              id="outlined-number-small"
              label=""
              type="number"
              size="small"
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