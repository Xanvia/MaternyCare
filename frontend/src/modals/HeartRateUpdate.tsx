import React, { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";

import IconButton from "@mui/joy/IconButton";
import { CloseIcon } from "../assets/icons/Icons";
import { PlusCircle } from "../assets/icons/Icons";
import CircularWithValueLabel from "../components/CircularProgress";

// interface HeartRateUpdateProps {
//   onUpdate: (heartRate: number) => void;
// }

export default function HeartRateUpdate() {
  const [open, setOpen] = useState<boolean>(false);
  const min = 110;
  const max = 160;
  const [heartRate, setHeartRate] = useState(125);
  const [sync, setSync] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      setHeartRate(Math.floor(Math.random() * (max - min + 1)) + min);
    }
  }, [sync, loading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Set loading to false after 5 seconds initially

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  const handleSync = () => {
    setLoading(true);
    setTimeout(() => {
      setSync(!sync);
      setLoading(false);
    }, 2000); // Show loader for 10 seconds
  };

  const handleUpdate = () => {
    setOpen(false);
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
    </React.Fragment>
  );
}
