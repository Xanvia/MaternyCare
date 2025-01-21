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
  email : Yup.string().required("User Email is required"),
  nic: Yup.string().required("NIC number is required"),
  newPassword: Yup.string().required("Password is required"),
});

// interface AddAppointmentModalProps {
//   userId: string;
// }

export default function ForgotPasswordPopup() {
  const [open, setOpen] = React.useState<boolean>(false);

  const BASE_URL = `${import.meta.env.VITE_API_URL}`;

  return (
    <React.Fragment>
      <ToastContainer />
        <Button 
        onClick={() => setOpen(true)} 
        className="text-[#838383] text-xs"
        sx={{
            backgroundColor: 'transparent', // Sets the background to transparent
            textTransform: 'none', // Prevents text from being capitalized
            fontSize: '0.75rem', // Equivalent to `xs` for text size
            color: '#838383', // Ensures the text color is as required
            '&:hover': {
                backgroundColor: 'transparent', // Maintains transparency on hover
            },
        }}
        >
            Forgot Password?
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
            Forgot Password
          </DialogTitle>
          <Divider />
          <Formik
            initialValues={{
              email: "",
              nic: "",
              newPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              const axiosConfig = {
                method: "put",
                url: `${BASE_URL}forgotPassword`,
                data: {
                  email: values.email,
                  nic: values.nic,
                  newPassword: values.newPassword,
                },
              };
              axios(axiosConfig)
                .then((response) => {
                  console.log(response.data);
                  setSubmitting(false);
                  setOpen(false);
                  toast.success(
                    "The password has been changed successfully!."
                  );
                  setTimeout(() => window.location.reload(), 1500);
                })
                .catch((err) => {
                  console.log(err);
                  setSubmitting(false);
                });
            }}
          >
            {({ isSubmitting, setFieldValue, errors, touched }) => (
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
                  Enter your Email:
                </DialogContent>
                <Box
                  sx={{
                    width: 500,
                    maxWidth: "100%",
                  }}
                >
                  <Field
                    as={TextField}
                    name="email"
                    fullWidth
                    size="small"
                    variant="outlined"
                    error={
                      touched.email &&
                      Boolean(errors.email)
                    }
                    helperText={
                      touched.email && errors.email
                    }
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
                  Enter your NIC:
                </DialogContent>
                <Box
                  sx={{
                    width: 500,
                    maxWidth: "100%",
                  }}
                >
                  <Field
                    as={TextField}
                    name="nic"
                    fullWidth
                    size="small"
                    variant="outlined"
                    error={
                      touched.nic &&
                      Boolean(errors.nic)
                    }
                    helperText={
                      touched.nic && errors.nic
                    }
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
                  Enter your New Password:
                </DialogContent>
                <Box
                  sx={{
                    width: 500,
                    maxWidth: "100%",
                  }}
                >
                  <Field
                    as = {TextField}
                    type = "password"
                    name="newPassword"
                    fullWidth
                    size="small"
                    variant="outlined"
                    error={
                      touched.newPassword &&
                      Boolean(errors.newPassword)
                    }
                    helperText={
                      touched.newPassword && errors.newPassword
                    }
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
                    Create
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
