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
import { Edit } from "../assets/icons/Icons";

// Validation schema
const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    message: Yup.string().required("Message is required"),
  });
  
  export default function AddNoticeModal() {
    const [open, setOpen] = React.useState<boolean>(false);
  
    return (
      <React.Fragment>
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
          Add Notice
        </Button> */}

        {/* <Button
            type="button"
            className="text-blue_primary hover:text-white border border-blue_primary hover:bg-blue_primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 text-center me-2 mb-2 h-1/2 w-auto"
          >
            <div className="flex items-center">
              <Edit className="xs:mr-2  p-0.5 " />
              <p className="xs:block hidden">Edit</p>
            </div>
        </Button> */}

        <Button
        type="button"
        onClick={() => setOpen(true)}
        className="text-blue_primary hover:text-white border border-blue_primary hover:bg-blue_primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 text-center me-2 mb-2 h-1/2 w-auto"
        >
        <div className="flex items-center">
            <Edit className="xs:mr-2 p-0.5" />
            <p className="xs:block hidden">Edit</p>
        </div>
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
              Add notice
            </DialogTitle>
            <Divider />
            <Formik
              initialValues={{ title: "", message: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                console.log("Form data:", values);
                setSubmitting(false);
                setOpen(false);
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
  