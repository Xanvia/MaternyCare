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
import UpdateIcon from "@mui/icons-material/Update";
import { Box } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UpdateNoticeProps {
  noticeId: string;
  noticeTitle: string;
  noticeMessage: string;
}

// Validation schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  // subtitle: Yup.string().required("Subtitle is required"),
  message: Yup.string().required("Message is required"),
});

export default function UpdateNoticeModal({
  noticeId,
  noticeTitle,
  noticeMessage,
}: UpdateNoticeProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const token = localStorage.getItem("token");

  const BASE_URL = "http://localhost:3000/";

  return (
    <React.Fragment>
      <ToastContainer />
      {/* <Button
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
      </Button> */}
      <Button
        variant="outlined"
        color="danger"
        endDecorator={<UpdateIcon />}
        onClick={() => setOpen(true)}
        sx={{
          mt: 3,
          background: "white",
          color: "#F580AB",
          "&:hover": {
            borderColor: "#F9B8D0",
            color: "#F9B8D0",
          },
          width: {
            xs: "100%", // full width on extra-small devices
            sm: "100%", // full width on small devices
            md: "auto%", // full width on medium devices
            lg: "auto", // default width on large devices and above
          },
        }}
      >
        Update Notice
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
            Update notice
          </DialogTitle>
          <Divider />
          <Formik
            initialValues={{
              title: noticeTitle,
              message: noticeMessage,
              subtitle: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              const axiosConfig = {
                method: "put",
                url: `${BASE_URL}notices/${noticeId}`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                data: {
                  title: values.title,
                  subtitle: values.subtitle,
                  message: values.message,
                },
              };
              axios(axiosConfig)
                .then((response) => {
                  console.log(response.data);
                  setSubmitting(false);
                  setOpen(false);
                  toast.success("The notice has been updated successfully!.");
                  setTimeout(() => window.location.reload(), 1500);
                })
                .catch((err) => {
                  console.log(err);
                  setSubmitting(false);
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
                  Title:
                </DialogContent>
                <Box
                  sx={{
                    width: 500,
                    maxWidth: "100%",
                  }}
                >
                  <Field
                    as={TextField}
                    name="title"
                    fullWidth
                    size="small"
                    variant="outlined"
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                  />
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
                  Subtitle:
                </DialogContent>
                <Box
                  sx={{
                    width: 500,
                    maxWidth: "100%",
                  }}
                >
                  <Field
                    as={TextField}
                    name="subtitle"
                    fullWidth
                    size="small"
                    variant="outlined"
                    error={touched.subtitle && Boolean(errors.subtitle)}
                    helperText={touched.subtitle && errors.subtitle}
                  />
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
                    maxWidth: "100%",
                  }}
                >
                  <Field
                    as={TextField}
                    name="message"
                    fullWidth
                    size="small"
                    variant="outlined"
                    multiline
                    rows={4}
                    error={touched.message && Boolean(errors.message)}
                    helperText={touched.message && errors.message}
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
                    Update
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
