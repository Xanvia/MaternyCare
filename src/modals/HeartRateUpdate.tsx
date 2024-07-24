// HeartRateUpdate.js
import { useState, useContext } from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import IconButton from "@mui/joy/IconButton";
import CircularWithValueLabel from "../components/CircularProgress";
import { CloseIcon, PlusCircle } from "../assets/icons/Icons";
import { HeartRateContext } from "../contexts/HeartRateContextProvider";

export default function HeartRateUpdate() {
  const [open, setOpen] = useState(false);
  // const [sync, setSync] = useState(false);
  const [loading, setLoading] = useState(false);

  const heartRateContext = useContext(HeartRateContext);
  const heartRate = heartRateContext?.heartRate;

  const handleSync = () => {
    const newHeartRate = Math.floor(Math.random() * (160 - 110 + 1)) + 110;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    heartRateContext?.updateHeartRate(newHeartRate);
  };

  const handleUpdate = () => {
    setOpen(false);
  };

  return (
    <>
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
            Update Heart Rate
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
            Below is the synced heart rate data from the device
            <h1 className="text-3xl">
              {loading ? <CircularWithValueLabel /> : `${heartRate} bpm`}
            </h1>
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
              onClick={handleUpdate}
            >
              Update
            </Button>
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
              onClick={handleSync}
            >
              Sync Now
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
}
