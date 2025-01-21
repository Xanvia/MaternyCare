import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import IconButton from "@mui/joy/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, DialogContentText } from "@mui/material";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import axios from "axios";

const AddRatingModal = ({ phmId }: { phmId: number }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [rating, setRating] = React.useState<number | null>(null);

  const BASE_URL = "http://localhost:3000/";
  const storedToken = localStorage.getItem("token");
  const token = storedToken ? JSON.parse(storedToken) : null;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      if (!rating) {
        alert("Please select a rating before submitting.");
        return;
      }

      const response = await axios.post(
        `${BASE_URL}phm/rate`,
        {
          phmId,
          starPoints: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Rating submitted successfully:", response.data);
      alert("Rating submitted successfully!");
      handleClose();
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Failed to submit rating. Please try again.");
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          borderColor: "#0D99FF",
          color: "#0D99FF",
          "&:hover": {
            borderColor: "#80CAFF",
            color: "#80CAFF",
          },
        }}
      >
        Rate PHM
      </Button>
      <Modal open={open} onClose={handleClose}>
        <ModalDialog variant="outlined" role="alertdialog">
          <IconButton
            aria-label="close"
            onClick={handleClose}
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
            Rate PHM
          </DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText>
              Please evaluate this PHM based on the feedback provided by the
              mothers.
            </DialogContentText>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Typography component="legend"></Typography>
              <Rating
                name="phm-rating"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                max={10}
                size="large"
              />
            </Box>
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
                width: { xs: "50%", md: "100%" },
                fontSize: "1rem",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#0D99FF",
                color: "#000000",
                "&:hover": {
                  borderColor: "#80CAFF",
                },
                width: { xs: "50%", md: "100%" },
                fontSize: "1rem",
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default AddRatingModal;
