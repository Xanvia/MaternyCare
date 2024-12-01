import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// Validation schema
const validationSchema = Yup.object({
  appointment_description: Yup.string().required("Appointment description is required"),
  appointment_state: Yup.string().required("Appointment state is required"),
  fixedDate: Yup.string().required("Date is required"),
});

interface AddAppointmentModalProps {
  userId: string;
}

export default function AddAppointmentModal({
  userId,
}: AddAppointmentModalProps) {
  const [open, setOpen] = React.useState<boolean>(false);

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
            initialValues={{
              appointment_description: "",
              appointment_state: "",
              fixedDate: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              const axiosConfig = {
                method: "post",
                url: `${BASE_URL}appointments/${userId}`,
                data: {
                  appointment_description: values.appointment_description,
                  appointment_state: values.appointment_state,
                  fixedDate: values.fixedDate,
                },
              };
              axios(axiosConfig)
                .then((response) => {
                  console.log(response.data);
                  setSubmitting(false);
                  setOpen(false);
                  toast.success(
                    "The appointment has been added successfully!."
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
                  Appointment Description:
                </DialogContent>
                <Box
                  sx={{
                    width: 500,
                    maxWidth: "100%",
                  }}
                >
                  <Field
                    as={TextField}
                    name="appointment_description"
                    fullWidth
                    size="small"
                    variant="outlined"
                    error={
                      touched.appointment_description &&
                      Boolean(errors.appointment_description)
                    }
                    helperText={
                      touched.appointment_description && errors.appointment_description
                    }
                  />
                </Box>

                {/* Dropdown for Appointment State */}
                <DialogContent
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    color: "#666666",
                    fontWeight: "bold",
                  }}
                >
                  Select Mother's State:
                </DialogContent>
                <Box
                  sx={{
                    width: 500,
                    maxWidth: "100%",
                  }}
                >
                  <Field
                    as={Select}
                    name="appointment_state"
                    fullWidth
                    size="small"
                    variant="outlined"
                    displayEmpty
                    onChange={(event: any) =>
                      setFieldValue("appointment_state", event.target.value)
                    }
                    error={
                      touched.appointment_state &&
                      Boolean(errors.appointment_state)
                    }
                  >
                    {/* <MenuItem value="" disabled>
                      Select Mother's State
                    </MenuItem> */}
                    <MenuItem value="postnatal">Postnatal</MenuItem>
                    <MenuItem value="prenatal">Prenatal</MenuItem>
                  </Field>
                </Box>
                {touched.appointment_state && errors.appointment_state && (
                  <Box sx={{ color: "red", fontSize: "0.875rem", mt: 1 }}>
                    {errors.appointment_state}
                  </Box>
                )}

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
                  Appointment Date:
                </DialogContent>
                <Box
                  sx={{
                    width: 500,
                    maxWidth: "100%",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      onChange={(date) => {
                        const formattedDate = dayjs(date).format("YYYY-MM-DD");
                        setFieldValue("fixedDate", formattedDate);
                      }}
                    />
                  </LocalizationProvider>
                  {touched.fixedDate && errors.fixedDate && (
                    <Box sx={{ color: "red", fontSize: "0.875rem", mt: 1 }}>
                      {errors.fixedDate}
                    </Box>
                  )}
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
