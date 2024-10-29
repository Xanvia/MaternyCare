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
import { format } from "date-fns";

// Validation schema
const validationSchema = Yup.object({
  title: Yup.string().required("Name is required"),
  subtitle: Yup.string().required("Address is required"),
  appointmentDate: Yup.string().required("Appointment Date is required"),
});

export default function AddMotherModal() {
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
          borderColor: "#BA97FE",
          color: "#BA97FE",
          "&:hover": {
            borderColor: "#DDCDFE",
            color: "#DDCDFE",
          },
        }}
      >
        Add
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
            Add Mother
          </DialogTitle>
          <Divider />
          <Formik
            initialValues={{ title: "", subtitle: "", appointmentDate: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              // Format the date
              const formattedDate = format(new Date(values.appointmentDate), 'dd/MM/yyyy');
            
              const axiosConfig = {
                method: "post",
                url: `${BASE_URL}notices`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                data: {
                  title: values.title,
                  subtitle: values.subtitle,
                  appointmentDate: formattedDate,
                },
              };
              axios(axiosConfig)
                .then((response) => {
                  console.log(response.data);
                  setSubmitting(false);
                  setOpen(false);
                  toast.success("The notice has been added successfully!.");
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
                  Name:
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
                  Address:
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
                  Appointment Date:
                </DialogContent>
                <Box
                  sx={{
                    width: 500,
                    maxWidth: "100%",
                  }}
                >
                  <Field
                    as={TextField}
                    name="appointmentDate"
                    type="date"
                    fullWidth
                    size="small"
                    variant="outlined"
                    error={
                      touched.appointmentDate &&
                      Boolean(errors.appointmentDate)
                    }
                    helperText={touched.appointmentDate && errors.appointmentDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                    Add
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





//-----------------------------------------------------------------

// import * as React from "react";
// import Button from "@mui/joy/Button";
// import Divider from "@mui/joy/Divider";
// import DialogTitle from "@mui/joy/DialogTitle";
// import DialogContent from "@mui/joy/DialogContent";
// import DialogActions from "@mui/joy/DialogActions";
// import Modal from "@mui/joy/Modal";
// import ModalDialog from "@mui/joy/ModalDialog";
// import TextField from "@mui/material/TextField";
// import IconButton from "@mui/joy/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import { Box } from "@mui/material";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { dateCalendarClasses, DateField, PickersTextField, pickersTextFieldClasses } from "@mui/x-date-pickers";

// // Validation schema
// const validationSchema = Yup.object({
//   title: Yup.string().required("Name is required"),
//   subtitle: Yup.string().required("Address is required"),
//   message: Yup.string().required("Appointment date is required"),
// });

// export default function AddMotherModal() {
//   const [open, setOpen] = React.useState<boolean>(false);
//   const token = localStorage.getItem("token");

//   const BASE_URL = "http://localhost:3000/";

//   return (
//     <React.Fragment>
//       <ToastContainer />
//       <Button
//         variant="outlined"
//         onClick={() => setOpen(true)}
//         sx={{
//           borderColor: "#BA97FE",
//           color: "#BA97FE",
//           "&:hover": {
//             borderColor: "#DDCDFE",
//             color: "#DDCDFE",
//           },
//         }}
//       >
//         Add
//       </Button>
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <ModalDialog variant="outlined" role="alertdialog">
//           <IconButton
//             aria-label="close"
//             onClick={() => setOpen(false)}
//             sx={{
//               position: "absolute",
//               top: "8px",
//               right: "8px",
//               color: "#666666",
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//           <DialogTitle
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               gap: 1,
//               color: "#333333",
//             }}
//           >
//             Add Mother
//           </DialogTitle>
//           <Divider />
//           <Formik
//             initialValues={{ title: "", message: "", subtitle: "" }}
//             validationSchema={validationSchema}
//             onSubmit={(values, { setSubmitting }) => {
//               const axiosConfig = {
//                 method: "post",
//                 url: `${BASE_URL}notices`,
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//                 data: {
//                   title: values.title,
//                   subtitle: values.subtitle,
//                   message: values.message,
//                 },
//               };
//               axios(axiosConfig)
//                 .then((response) => {
//                   console.log(response.data);
//                   setSubmitting(false);
//                   setOpen(false);
//                   toast.success("The notice has been added successfully!.");
//                   setTimeout(() => window.location.reload(), 1500);
//                 })
//                 .catch((err) => {
//                   console.log(err);
//                   setSubmitting(false);
//                 });
//             }}
//           >
//             {({ isSubmitting, errors, touched }) => (
//               <Form>
//                 <DialogContent
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     gap: 1,
//                     color: "#666666",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Name:
//                 </DialogContent>
//                 <Box
//                   sx={{
//                     width: 500,
//                     maxWidth: "100%",
//                   }}
//                 >
//                   <Field
//                     as={TextField}
//                     name="title"
//                     fullWidth
//                     size="small"
//                     variant="outlined"
//                     error={touched.title && Boolean(errors.title)}
//                     helperText={touched.title && errors.title}
//                   />
//                 </Box>
//                 <DialogContent
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     gap: 1,
//                     color: "#666666",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Address:
//                 </DialogContent>
//                 <Box
//                   sx={{
//                     width: 500,
//                     maxWidth: "100%",
//                   }}
//                 >
//                   <Field
//                     as={TextField}
//                     name="subtitle"
//                     fullWidth
//                     size="small"
//                     variant="outlined"
//                     error={touched.subtitle && Boolean(errors.subtitle)}
//                     helperText={touched.subtitle && errors.subtitle}
//                   />
//                 </Box>
//                 <DialogContent
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     gap: 1,
//                     color: "#666666",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Appointment Date:
//                 </DialogContent>
//                 <Box
//                   sx={{
//                     width: 500,
//                     maxWidth: "100%",
//                   }}
//                 >
//                   <Field
//                     as={TextField}
//                     name="message"

//                     fullWidth
//                     size="small"
//                     variant="outlined"
//                     multiline
//                     rows={4}
//                     error={touched.message && Boolean(errors.message)}
//                     helperText={touched.message && errors.message}
//                   />
//                 </Box>
//                 <DialogActions
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     gap: 1,
//                     color: "#666666",
//                   }}
//                 >
//                   <Button
//                     variant="solid"
//                     sx={{
//                       backgroundColor: "#0D99FF",
//                       color: "#ffffff",
//                       "&:hover": {
//                         backgroundColor: "#80CAFF",
//                       },
//                       width: { xs: "50%", md: "100%" },
//                       fontSize: "1rem",
//                     }}
//                     type="submit"
//                     disabled={isSubmitting}
//                   >
//                     Add
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     sx={{
//                       borderColor: "#0D99FF",
//                       color: "#000000",
//                       "&:hover": {
//                         borderColor: "#80CAFF",
//                       },
//                       width: { xs: "50%", md: "100%" },
//                       fontSize: "1rem",
//                     }}
//                     onClick={() => setOpen(false)}
//                   >
//                     Cancel
//                   </Button>
//                 </DialogActions>
//               </Form>
//             )}
//           </Formik>
//         </ModalDialog>
//       </Modal>
//     </React.Fragment>
//   );
// }
