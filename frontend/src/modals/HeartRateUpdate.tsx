import { useState } from "react";
import axios from "axios";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import IconButton from "@mui/joy/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import { CloseIcon, PlusCircle } from "../assets/icons/Icons";

const BASE_URL = import.meta.env.VITE_API_URL;

interface HeartRateUpdateModalProps {
  motherId: number;
  heartRateO: number;
}

export default function HeartRateUpdate({
  motherId,
  heartRateO,
}: HeartRateUpdateModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [heartRate, setHeartRate] = useState<number | null>(null);

  const token = localStorage.getItem("token");

  const handleSync = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${BASE_URL}device/start`,
        { motherId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsSyncing(true);
    } catch (error) {
      console.error("Error starting device:", error);
    } finally {
      // setLoading(false);
    }
  };

  const handleStop = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${BASE_URL}device/stop`,
        { motherId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await axios.get(`${BASE_URL}device/data`, {
        params: { motherId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const latestData = response.data.data[0];
      setHeartRate(latestData.heartRate);
      setIsSyncing(false);
      // setOpen(false);
    } catch (error) {
      console.error("Error stopping device:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
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

      <Modal open={open} onClose={handleClose}>
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
              {loading ? (
                <div className="max-h-10">
                  <CircularProgress />
                </div>
              ) : (
                `${heartRate ?? heartRateO} bpm`
              )}
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
              onClick={isSyncing ? handleStop : handleSync}
            >
              {isSyncing ? "Stop" : "Sync Now"}
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
}
