import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/joy/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Validation schema
const validationSchema = Yup.object({
  feedback: Yup.string().required("Description is required"),
});

interface FeedbackPopupProps {
  appointmentId: string;
  checkedByphm: boolean;
  feedback: string;
}

export default function FeedbackPopup({
  appointmentId,
  // checkedByphm,
  feedback,
}:FeedbackPopupProps) {
  //console.log("Appointment ID:", appointmentId);
  const [open, setOpen] = React.useState<boolean>(false);
  //const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  const BASE_URL = "http://localhost:3000/";
  
  return (
    <React.Fragment>
      <ToastContainer />
      <Button
        variant="outlined"
        className="w-10/12"
        onClick={() => setOpen(true)}
        sx={{
          minHeight: "20px",
          padding:"0 12px",
          fontSize:"12px",
          borderRadius:"5px",
          borderColor: "#0D99FF",
          //backgroundColor: "#f5f5f5",
          color: "#0D99FF",
          "&:hover": {
            borderColor: "#80CAFF",
            color: "#80CAFF",
          },
        }}
      >
        Feedback
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
            Give Feedback
          </DialogTitle>
          <Divider />
          <Formik
            initialValues={{feedback: feedback}}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              const axiosConfig = {
                method: "put",
                url: `${BASE_URL}appointments/${appointmentId}`,
                data: {
                  feedback: values.feedback,
                },
              };
              axios(axiosConfig)
                .then((response) => {
                  console.log(response.data);
                  setSubmitting(false);
                  setOpen(false);
                  toast.success("The appointment has been added successfully Updated!.");
                  setTimeout(() => window.location.reload(), 1500);
                })
                .catch((err) => {
                  console.log(err);
                  setSubmitting(false);
                  toast.error("Failed to update the appointment.");
                });
            }}
            
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <DialogContent
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    color: "#666666",
                    fontWeight: "bold",
                  }}
                >
                  Write your feedback about appointment
                  <div className="text-xs">
                  (This feedback is visible only to MOH)
                  </div>
                  <div>
                    
                  </div>
                </DialogContent>
                <Box
                  sx={{
                    width: 500,
                    maxWidth: "100%",
                  }}
                >
                  <Field
                    as={TextField}
                    name="feedback"
                    fullWidth
                    size="small"
                    variant="outlined"
                    multiline
                    rows={4}
                    error={touched.feedback && Boolean(errors.feedback)}
                    helperText={touched.feedback && errors.feedback}
                  />
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
                      backgroundColor: "#0D99FF",
                      color: "#ffffff",
                      "&:hover": {
                        backgroundColor: "#80CAFF",
                      },
                      width: { xs: "50%", md: "100%" },
                      fontSize: "1rem",
                    }}
                    type="submit"
                    disabled={isSubmitting}
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
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
