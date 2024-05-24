import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import TextField from '@mui/material/TextField';
import IconButton from "@mui/joy/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";

export default function AddNotice() {
    const [open, setOpen] = React.useState<boolean>(false);
    return (
      <React.Fragment>
        <Button
          variant="outlined"
          onClick={() => setOpen(true)}
          sx={{
            borderColor: "#0D99FF",
            color: "#0D99FF",
            "&:hover": {
              borderColor: "#80CAFF",
              color: "#80CAFF",
            },
          }}
        >
          Add Notice
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
              Add notice
            </DialogTitle>
            <Divider />
            <DialogContent
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1,
                color: "#666666",
                fontWeight: "bold",
              }}
            >
              Title:
            </DialogContent>

            <Box
                sx={{
                    width: 500,
                    maxWidth: '100%',
                }}
                >
                <TextField fullWidth label="" id="fullWidth" size="small"/>
            </Box>

            <DialogContent
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1,
                color: "#666666",
                fontWeight: "bold",
              }}
            >
              Message:
            </DialogContent>

            <Box
                sx={{
                    width: 500,
                    maxWidth: '100%',
                }}
                >
                <TextField fullWidth label="" id="fullWidth" size="small"/>
            </Box>


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
                  backgroundColor: "#F580AB",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#F9B8D0",
                  },
  
                  width: { xs: "50%", md: "100%" },
                  fontSize: "1rem",
                }}
                onClick={() => setOpen(false)}
              >
                Update
              </Button>

              <Button
                variant="outlined"
                sx={{
                  borderColor: "#F580AB",
                  color: "#000000",
                  "&:hover": {
                    borderColor: "#F9B8D0",
                  },
                  width: { xs: "50%", md: "100%" },
                  fontSize: "1rem",
                }}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      </React.Fragment>
    );
  }
  