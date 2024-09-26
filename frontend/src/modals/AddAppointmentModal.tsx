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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // This adapter is required
import dayjs from "dayjs";

// Validation schema
const validationSchema = Yup.object({
  appointment_type: Yup.string().required("Appointment type is required"),
  startDate: Yup.string().required("Date is required"),
});

export default function AddAppointmentModal() {
  const [open, setOpen] = React.useState<boolean>(false);
  const token = localStorage.getItem("token");

  const BASE_URL = "http://localhost:3000/";

  return (
    <React.Fragment>
      <ToastContainer />
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
        Add Appointment
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
            Add Appointment
          </DialogTitle>
          <Divider />
          <Formik
            initialValues={{ appointment_type: "", startDate: "", endDate: "", month: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              const axiosConfig = {
                method: "post",
                url: `${BASE_URL}appointments`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                data: {
                  appointment_type: values.appointment_type,
                  startDate: values.startDate,
                  endDate: values.endDate,
                  month: values.month,
                },
              };
              axios(axiosConfig)
                .then((response) => {
                  console.log(response.data);
                  setSubmitting(false);
                  setOpen(false);
                  toast.success("The appointment has been added successfully!.");
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
                  Appointment Type:
                </DialogContent>
                <Box
                  sx={{
                    width: 500,
                    maxWidth: "100%",
                  }}
                >
                  <Field
                    as={TextField}
                    name="appointment_type"
                    fullWidth
                    size="small"
                    variant="outlined"
                    error={touched.appointment_type && Boolean(errors.appointment_type)}
                    helperText={touched.appointment_type && errors.appointment_type}
                  />
                </Box>

                {/* Date Picker */}
                <DialogContent
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    color: "#666666",
                    fontWeight: "bold",
                  }}
                >
                  Date:
                </DialogContent>
                <Box
                  sx={{
                    width: 500,
                    maxWidth: "100%",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start Date"
                      onChange={(date) => {
                        const formattedDate = dayjs(date).format("DD");
                        const endDate = dayjs(date).add(5, "day").format("DD");
                        const month = dayjs(date).format("MMMM").toUpperCase();

                        setFieldValue("startDate", formattedDate);
                        setFieldValue("endDate", endDate);
                        setFieldValue("month", month);
                      }}
                    //   renderInput={(params) => (
                    //     <TextField
                    //       {...params}
                    //       fullWidth
                    //       size="small"
                    //       variant="outlined"
                    //       error={touched.startDate && Boolean(errors.startDate)}
                    //       helperText={touched.startDate && errors.startDate}
                    //     />
                    //   )}
                    />
                  </LocalizationProvider>
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
