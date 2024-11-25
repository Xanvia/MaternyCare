import * as React from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import IconButton from "@mui/joy/IconButton";
import TextField from "@mui/material/TextField";
import { CloseIcon, CallIcon } from "../assets/icons/Icons";

interface ReportHealthIssueModalProps {
  open: boolean;
  onClose: () => void;
  phm: { firstName: string; phoneNumber: number };
}

const ReportHealthIssueModal: React.FC<ReportHealthIssueModalProps> = ({
  open,
  onClose,
  phm,
}) => {
  const [issueMessage, setIssueMessage] = React.useState<string>("");

  const handleIssueMessageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIssueMessage(event.target.value);
  };

  const handleSend = () => {
    // Handle sending the issue message
    console.log("Issue message:", issueMessage);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <IconButton
          aria-label="close"
          onClick={onClose}
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
          Report Health Issue
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            color: "#666666",
          }}
        >
          <p>Name: {phm.firstName}</p>
          <Button
            variant="outlined"
            startIcon={<CallIcon />}
            href={`tel:${phm.phoneNumber}`}
            sx={{
              borderColor: "#0D99FF",
              color: "#0D99FF",
              "&:hover": {
                borderColor: "#80CAFF",
                color: "#80CAFF",
              },
            }}
          >
            Call
          </Button>
          <TextField
            label="Issue Message"
            multiline
            rows={4}
            value={issueMessage}
            onChange={handleIssueMessageChange}
            sx={{ width: "100%" }}
          />
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
            variant="contained"
            sx={{
              backgroundColor: "#0D99FF",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#80CAFF",
              },
            }}
            onClick={handleSend}
          >
            Send
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default ReportHealthIssueModal;
