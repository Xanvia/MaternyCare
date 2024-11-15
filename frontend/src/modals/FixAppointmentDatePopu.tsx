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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Validation schema
const validationSchema = Yup.object({
  fixedDate: Yup.string().required("Date is required"),
  appointment_type: Yup.string().required("Description is required"),
});

interface FixAppointmentDatePopupProps {
  appointmentId: string;
  fixedDate: string;
  appointment_type: string;
}

export default function FixAppointmentDatePopup({
  appointmentId,
  fixedDate,
  appointment_type,
}:FixAppointmentDatePopupProps) {
  //console.log("Appointment ID:", appointmentId);
  const [open, setOpen] = React.useState<boolean>(false);
  const token = localStorage.getItem("token");
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
        {fixedDate === null ? "Set" : "Update"}
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
            {fixedDate === null ? "Set Appointment" : "Update Appointment"}
          </DialogTitle>
          <Divider />
          <Formik
            initialValues={{ fixedDate: fixedDate, appointment_type: appointment_type}}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              const axiosConfig = {
                method: "put",
                url: `${BASE_URL}appointments/${appointmentId}`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                data: {
                  fixedDate: values.fixedDate,
                  appointment_type: values.appointment_type,
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
            {({ isSubmitting, errors, touched , setFieldValue}) => (
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
                  {fixedDate === null ? "Set Appointment Date:" : "Update Appointment Date:"}
                </DialogContent>
                <Box
                  sx={{
                    width: 500,
                    maxWidth: "100%",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      name="fixedDate"
                      value={fixedDate ? dayjs(fixedDate) : null}
                      onChange={(value) => setFieldValue("fixedDate", value? value.format("YYYY-MM-DD") : null)}
                      slotProps={{
                        textField: {
                          error: touched.fixedDate && Boolean(errors.fixedDate),
                          helperText: touched.fixedDate && errors.fixedDate,
                          sx: {
                            '& .MuiOutlinedInput-root': {
                              '&:focus-within': {
                                outline: 'none', // Remove focus outline
                                borderColor: 'inherit', // Maintain border color
                              },
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
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
                  {fixedDate === null ? "Set Appointment Description:" : "Update Appointment Description:"}
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
                {/* <DialogContent
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
                </Box> */}
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
