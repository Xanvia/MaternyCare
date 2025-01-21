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
import axios from "axios";
import { toast } from "react-toastify";

interface Moh {
  id: number;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  NIC: string;
  phoneNumber: string;
  mohArea: string;
  mohID: string;
}

// Validation schema
const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  NIC: Yup.string().required("NIC is required"),
  mohArea: Yup.string().required("MOH Area is required"),
  mohID: Yup.string().required("MOH ID is required"),
});

export default function MohEditPersonalInfo() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);
  const [initialValues, setInitialValues] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    NIC: "",
    mohArea: "",
    mohID: "",
  });

  const userItem = localStorage.getItem("user");
  const user = userItem ? JSON.parse(userItem) : null;
  const BASE_URL = `${import.meta.env.VITE_API_URL}`;
  const storedToken = localStorage.getItem("token");
  const token = storedToken ? JSON.parse(storedToken) : null;

  const [moh, setMoh] = React.useState<Moh>();

  // Mock function to fetch current data
  const fetchCurrentData = () => {
    return {
      firstName: moh?.user.firstName || "",
      lastName: moh?.user.lastName || "",
      email: moh?.user.email || "",
      phoneNumber: moh?.phoneNumber || "",
      NIC: moh?.NIC || "",
      mohArea: moh?.mohArea || "",
      mohID: moh?.mohID || "",
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
  }, [user.id, token]);

  const handleUpdate = async (values: typeof initialValues) => {
    try {
      const response = await axios.put(
        `${BASE_URL}users/moh/${moh?.id}/personal-info`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Update response:", response.data);
      setOpen(false);
      toast.success("Personal Information Updated");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

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
            Edit Personal information
          </DialogTitle>
          <Divider />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleUpdate(values);
            }}
            enableReinitialize={true}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                {[
                  { label: "First Name", name: "firstName" },
                  { label: "Last Name", name: "lastName" },
                  { label: "Email", name: "email" },
                  { label: "Phone", name: "phoneNumber" },
                  { label: "NIC", name: "NIC" },
                  { label: "MOH Area", name: "mohArea" },
                  { label: "MOH ID", name: "mohID" },
                ].map((field, index) => (
                  <React.Fragment key={index}>
                    <DialogContent
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 1,
                        color: "#666666",
                        fontWeight: "bold",
                      }}
                    >
                      {field.label}:
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
                        name={field.name}
                        fullWidth
                        size="small"
                        variant="outlined"
                        error={
                          touched[field.name as keyof typeof touched] &&
                          Boolean(errors[field.name as keyof typeof errors])
                        }
                        helperText={
                          touched[field.name as keyof typeof touched] &&
                          errors[field.name as keyof typeof errors]
                        }
                      />
                    </Box>
                  </React.Fragment>
                ))}

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
