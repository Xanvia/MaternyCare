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
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State / Province is required"),
    city: Yup.string().required("City / District is required"),
    postalcode: Yup.string().required("Postal code is required"),
    gs: Yup.string().required("GS Division number is required"),
  });

  export default function EditLocationInfo() {
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
              Edit Personal information
            </DialogTitle>
            <Divider />
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                age: "",
                bio: "",
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
                    First Name:
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
                      name="firstName"
                      fullWidth
                      size="small"
                      variant="outlined"
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
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
                    Last Name:
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
                      name="lastName"
                      fullWidth
                      size="small"
                      variant="outlined"
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
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
                    Email address:
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
                      name="email"
                      fullWidth
                      size="small"
                      variant="outlined"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
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
                    Phone:
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
                      name="phone"
                      fullWidth
                      size="small"
                      variant="outlined"
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
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
                    Age:
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
                    name="age"
                    fullWidth
                    size="small"
                    variant="outlined"
                    inputProps={{
                        type: "number",
                        min: 0,
                        step: 1,
                    }}
                    error={touched.age && Boolean(errors.age)}
                    helperText={touched.age && errors.age}
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
                Bio:
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
                      name="bio"
                      fullWidth
                      size="small"
                      variant="outlined"
                      error={touched.bio && Boolean(errors.bio)}
                      helperText={touched.bio && errors.bio}
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
  