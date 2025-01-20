import React, { useState } from "react";
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
import { toast } from "react-toastify";
interface ReportHealthIssueModalProps {
  open: boolean;
  onClose: () => void;
  phm: { firstName: string; phoneNumber: number; email: string };
  email: string;
  firstName: string;
  phoneNumber: number;
}

const ReportHealthIssueModal: React.FC<ReportHealthIssueModalProps> = ({
  open,
  onClose,
  phm,
  email,
  firstName,
  phoneNumber,
}) => {
  const [issueMessage, setIssueMessage] = React.useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

  const handleIssueMessageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIssueMessage(event.target.value);
  };

  const handleSend = async () => {
    const subject = "Health Issue Report";
    const message = issueMessage;

    setIsSending(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: phm.email,
          subject: subject,
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      const result = await response.json();
      console.log(result.message);

      // Optionally close the modal
      onClose();

      toast.success("Email sent successfully!");
    } catch (error) {
      toast.error("Email sent failed!");
      console.error("Error sending email:", error);
    } finally {
      setIsSending(false);
    }
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
          <p>Name: {firstName}</p>
          <Button
            variant="outlined"
            startIcon={<CallIcon />}
            href={`tel:${phoneNumber}`}
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
            disabled={isSending}
            sx={{
              backgroundColor: "#0D99FF",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#80CAFF",
              },
            }}
            onClick={handleSend}
          >
            {isSending ? "Sending..." : "Send Issue"}
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default ReportHealthIssueModal;
