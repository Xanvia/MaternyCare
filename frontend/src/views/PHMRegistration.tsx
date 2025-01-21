import React, { useContext } from "react";
import { RoleContext } from "../contexts/RoleContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography } from "@mui/material";
import logo from "../assets/images/logo.png";

interface FormValues {
  phone_number: string;
  nic: string;
  phm_id: string; 
  phmArea: string; 
  mohDivision: string; 
}

const initialValues: FormValues = {
  phone_number: "",
  nic: "",
  phm_id: "", 
  phmArea: "", 
  mohDivision: "", 
};

const validationSchema = Yup.object({
  phone_number: Yup.string()
    .required("Mobile phone number is required")
    .matches(/^[0-9]+$/, "Mobile phone number must be numeric")
    .min(10, "Mobile phone number must be at least 10 digits"),
  nic: Yup.string()
    .required("NIC is required")
    .test("is-valid-nic", "Please add a valid NIC number", (value) => {
      if (!value) return false;
      if (value.length === 12 && /^[0-9]+$/.test(value)) return true;
      if (value.length === 10 && /^[0-9]{9}[vV]$/.test(value)) return true;
      return false;
    }),
  phm_id: Yup.string().required("PHMID is required"),
  phmArea: Yup.string().required("PHM Area is required"),
  mohDivision: Yup.string().required("MOH Division is required"),
});

const RegistrationForm: React.FC = () => {
  // const roleContext = useContext(RoleContext);
  const navigate = useNavigate();

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await axios.post("http://localhost:3000/users/phm/", {
        ...values,
        // role: roleContext?.role, // Include the role from context
      },
    // {
    //   headers:{
    //     Authorization:
    //   }
    // }
    );
      console.log(response.data);
      navigate("/phmdashboard");
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white px-4">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="w-full max-w-md bg-white rounded-lg p-6 space-y-4">
            {/* Header */}
            <Typography
              variant="h5"
              align="center"
              className="font-semibold text-blue-600"
            >
              <div className="flex justify-center mb-4">
                <img src={logo} alt="Materny Logo" className="w-20" />
              </div>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold" style={{ fontFamily: "Ubuntu" }}>
                  <span style={{ color: "#0D99FF" }}>Materny</span>
                  <span style={{ color: "#F580AB" }}>Care</span>
                </h1>
              </div>
            </Typography>

            {/* Fields */}
            <Field
              name="phone_number"
              as={TextField}
              label="Mobile Phone"
              fullWidth
              variant="outlined"
              error={Boolean(errors.phone_number && touched.phone_number)}
              helperText={<ErrorMessage name="phone_number" />}
            />

            <Field
              name="nic"
              as={TextField}
              label="NIC"
              fullWidth
              variant="outlined"
              error={Boolean(errors.nic && touched.nic)}
              helperText={<ErrorMessage name="nic" />}
            />

            <Field
              name="phm_id"
              as={TextField}
              label="PHMID"
              fullWidth
              variant="outlined"
              error={Boolean(errors.phm_id && touched.phm_id)}
              helperText={<ErrorMessage name="phm_id" />}
            />

            <Field
              name="phmArea"
              as={TextField}
              label="PHM Area"
              fullWidth
              variant="outlined"
              error={Boolean(errors.phmArea && touched.phmArea)}
              helperText={<ErrorMessage name="phmArea" />}
            />

            <Field
              name="mohDivision"
              as={TextField}
              label="MOH Division"
              fullWidth
              variant="outlined"
              error={Boolean(errors.mohDivision && touched.mohDivision)}
              helperText={<ErrorMessage name="mohDivision" />}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: "#0D99FF", height: '56px', fontSize: '16px' }} // Adjust height and font size
              fullWidth
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;