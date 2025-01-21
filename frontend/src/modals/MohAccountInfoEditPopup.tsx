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
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Edit } from "../assets/icons/Icons";
import axios from "axios";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

interface Moh {
  user: {
    firstName: string;
    password: string;
    repassword: string;
  };
}

// Validation schema
const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  password: Yup.string().required("Password is required"),
  repassword: Yup.string().required("Re-Password is required"),
});

export default function MohEditAccountInfo() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [initialValues, setInitialValues] = React.useState({
    firstName: "",
    password: "",
    repassword: "",
  });

  let userItem = localStorage.getItem("user");
  const user = userItem ? JSON.parse(userItem) : null;
  const BASE_URL = `${import.meta.env.VITE_API_URL}`;
  const storedToken = localStorage.getItem("token");
  const token = storedToken ? JSON.parse(storedToken) : null;

  const [moh, setMoh] = React.useState<Moh>();

  // Mock function to fetch current data
  const fetchCurrentData = () => {
    // Replace this with actual data fetching logic
    return {
      firstName: user.firstName,
      password: user.password,
      repassword: user.password,
    };
  };

  const handleOpen = () => {
    const currentData = fetchCurrentData();
    setInitialValues(currentData);
    setOpen(true);
  };

  React.useEffect(() => {
    const getMoh = () => {
      setLoading(true);
      const axiosConfig = {
        method: "get",
        url: `${BASE_URL}users/moh/${user.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          console.log(response.data.age);
          setMoh(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getMoh();
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);

    // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //   event.preventDefault();
    // };
  };

  // function handleMouseDownPassword(event: MouseEvent<HTMLAnchorElement, MouseEvent>): void {
  //   throw new Error("Function not implemented.");
  // }
  console.log("Moh", moh);

  return (
    <React.Fragment>
      {loading && "Loading..."}
      <Button
        variant="outlined"
        onClick={handleOpen}
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
          fontSize: "0.875rem",
          fontWeight: "500",
          borderRadius: "0.5rem",
          padding: "0.25rem 0.75rem",
          textAlign: "center",
          marginRight: "0.5rem",
          marginBottom: "0.5rem",
          height: "auto",
          width: "auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Edit style={{ marginRight: "8px", padding: "2px" }} />
          <p className="xs:block hidden">Edit</p>
        </div>
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          sx={{
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Form data:", values);
              setSubmitting(false);
              setOpen(false);
            }}
            enableReinitialize={true} // Enable reinitialization when initialValues change
          >
            {({ isSubmitting, errors, touched, values }) => (
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
                  Password:
                </DialogContent>
                <Box
                  sx={{
                    width: 500,
                    maxWidth: "100%",
                    mb: 2,
                  }}
                >
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password"></InputLabel>
                    <Field
                      as={OutlinedInput}
                      name="password"
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      size="small"
                      variant="outlined"
                      error={touched.password && Boolean(errors.password)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                    {touched.password && errors.password && (
                      <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                        {errors.password}
                      </Typography>
                    )}
                  </FormControl>
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
                  Re-Password:
                </DialogContent>
                <Box
                  sx={{
                    width: 500,
                    maxWidth: "100%",
                    mb: 2,
                  }}
                >
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-repassword"></InputLabel>
                    <Field
                      as={OutlinedInput}
                      name="repassword"
                      id="outlined-adornment-repassword"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      size="small"
                      variant="outlined"
                      error={touched.repassword && Boolean(errors.repassword)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={(
                              event: React.MouseEvent<HTMLButtonElement>
                            ) => {
                              event.preventDefault();
                              handleClickShowPassword();
                            }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Re-Password"
                    />
                    {touched.repassword && errors.repassword && (
                      <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                        {errors.repassword}
                      </Typography>
                    )}
                  </FormControl>
                </Box>

                <Box sx={{ mt: 2 }}>
                  {touched.repassword &&
                    values.repassword &&
                    values.password &&
                    (values.repassword === values.password ? (
                      <Typography variant="body2" color="green">
                        Passwords match.
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="error">
                        Passwords do not match.
                      </Typography>
                    ))}
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
