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
    username: Yup.string().required("Username is required"),
    passord: Yup.string().required("Passwword is required"),
    stage: Yup.string().required("Stage is required"),
    babycount: Yup.string().required("Baby count is required"),
    gs: Yup.string().required("GS Division number is required"),
  });
  
  export default function EditAccountInfo() {
    const [open, setOpen] = React.useState<boolean>(false);
  
    return (
      <React.Fragment>

        <Button
            variant="outlined"
            onClick={() => setOpen(true)}
            sx={{
                color: "#0D99FF",
                borderColor: "#0D99FF",
                "&:hover": {
                color: "#ffffff",
                backgroundColor: "#0D99FF",
                borderColor: "#0D99FF",
                },
                "&:focus": {
                outline: "none",
                boxShadow: "0 0 0 4px rgba(128, 202, 255, 0.5)",
                },
                fontSize: "0.875rem", // text-sm
                fontWeight: "500", // font-medium
                borderRadius: "0.5rem", // rounded-lg
                padding: "0.25rem 0.75rem", // px-3 py-1
                textAlign: "center",
                marginRight: "0.5rem", // mr-2
                marginBottom: "0.5rem", // mb-2
                height: "auto", // h-1/2
                width: "auto", // w-auto
            }}
            >
            <div style={{ display: "flex", alignItems: "center" }}>
                <Edit style={{ marginRight: "8px", padding: "2px" }} />
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
              Edit Account information
            </DialogTitle>
            <Divider />
            <Formik
              initialValues={{
                username: "",
                password: "",
                stage: "",
                babycount: "",
                gs: "",
              }}
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
                    User Name:
                  </DialogContent>
                  <Box
                    sx={{
                      width: 500,
                      maxWidth: "100%",
                      mb: 2,
                    }}
                  >
                    <Field
                      as={TextField}
                      name="username"
                      fullWidth
                      size="small"
                      variant="outlined"
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
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
                    Password:
                  </DialogContent>
                  <Box
                    sx={{
                      width: 500,
                      maxWidth: "100%",
                      mb: 2,
                    }}
                  >
                    <Field
                      as={TextField}
                      name="password"
                      fullWidth
                      size="small"
                      variant="outlined"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
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
                    Stage:
                  </DialogContent>
                  <Box
                    sx={{
                      width: 500,
                      maxWidth: "100%",
                      mb: 2,
                    }}
                  >
                    <Field
                      as={TextField}
                      name="stage"
                      fullWidth
                      size="small"
                      variant="outlined"
                      error={touched.stage && Boolean(errors.stage)}
                      helperText={touched.stage && errors.stage}
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
                    Baby count:
                </DialogContent>
                <Box
                    sx={{
                    width: 500,
                    maxWidth: "100%",
                    mb: 2,
                    }}
                >
                    <Field
                    as={TextField}
                    name="babycount"
                    fullWidth
                    size="small"
                    variant="outlined"
                    inputProps={{
                        type: "number",
                        min: 0,
                        step: 1,
                    }}
                    error={touched.babycount && Boolean(errors.babycount)}
                    helperText={touched.babycount && errors.babycount}
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
                GS Division number:
                </DialogContent>
                <Box
                    sx={{
                      width: 500,
                      maxWidth: "100%",
                      mb: 2,
                    }}
                >
                    <Field
                      as={TextField}
                      name="gs"
                      fullWidth
                      size="small"
                      variant="outlined"
                      error={touched.gs && Boolean(errors.gs)}
                      helperText={touched.gs && errors.gs}
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
  