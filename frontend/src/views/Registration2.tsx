/*
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/images/logo.png";

// Validation schema using Yup
const registrationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  contactNumber: Yup.string().required("Contact number is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please re-enter your password"),
  nic: Yup.string().required("NIC is required"),
  babyCount: Yup.number().required("Baby count is required"),
});

const Registration2: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      contactNumber: "",
      contactNumberOther: "",
      email: "",
      dateOfBirth: "",
      hospital: "",
      patientId: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      password: "",
      rePassword: "",
      babyCount: "",
      nic: "",
    },
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:3000/register2/", values, {
          headers: { "Content-Type": "application/json" },
        });
        toast.success("Registration successful!");
        navigate("/login");
      } catch (error) {
        toast.error("Registration failed. Please try again.");
      }
    },
  });

  // Next Step function with validation
  const nextStep = async () => {
    const stepFields = {
      1: ["firstName", "lastName", "contactNumber"], // Fields for Step 1
      2: ["email", "dateOfBirth", "hospital", "patientId"], // Fields for Step 2
      3: ["addressLine1", "addressLine2", "addressLine3", "password", "rePassword"], // Fields for Step 3
      4: ["nic", "babyCount"], // Fields for Step 4
    };

    await formik.validateForm();
    const hasErrors = stepFields[step].some((field) => formik.errors[field]);

    if (!hasErrors) {
      setStep((prev) => prev + 1); // Move to the next step
    } else {
      formik.setTouched(stepFields[step].reduce((acc, field) => ({ ...acc, [field]: true }), {})); // Show errors
      toast.error("Please complete all required fields before proceeding.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer />
      <form onSubmit={formik.handleSubmit} className="space-y-4 w-full max-w-md p-8 shadow-lg bg-white rounded-lg">
        <div className="flex flex-col justify-center items-center mt-10">
          <img src={logo} alt="Materny Logo" className="w-24" />
        </div>
        <div className="mt-0 text-center leading-9 font-semibold">
          <h1 className="text-3xl md:text-4xl" style={{ fontFamily: "Ubuntu" }}>
            <span style={{ color: "#0D99FF" }}>Materny</span>
            <span style={{ color: "#F580AB" }}>Care</span>
          </h1>
        </div>
        
        {step === 1 && (
          <>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className={`block w-full p-4 border rounded-lg shadow-md ${
                formik.touched.firstName && formik.errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.firstName}</div>
            )}
            <div className="w-full">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className={`block w-full p-4 border rounded-lg shadow-md ${
                  formik.touched.lastName && formik.errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.lastName}</div>
              )}
            </div>

            <div className="w-full">
              <input
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                className={`block w-full p-4 border rounded-lg shadow-md ${
                  formik.touched.contactNumber && formik.errors.contactNumber ? "border-red-500" : "border-gray-300"
                }`}
                value={formik.values.contactNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.contactNumber && formik.errors.contactNumber && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.contactNumber}</div>
              )}
            </div>

            <div className="w-full">
              <input
                type="text"
                name="contactNumberOther"
                placeholder="Contact Number (Other)"
                className="block w-full p-4 border rounded-lg shadow-md border-gray-300"
                value={formik.values.contactNumberOther}
                onChange={formik.handleChange}
              />
            </div>
            <button
              type="button"
              className="w-full p-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 shadow-md"
              onClick={nextStep}
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={`block w-full p-4 border rounded-lg shadow-md ${
                formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
              }`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            )}
            <div className="w-full">
              <input
                type="date"
                name="dateOfBirth"
                placeholder="Date of Birth"
                className="block w-full p-4 border rounded-lg shadow-md border-gray-300"
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full">
              <input
                type="text"
                name="hospital"
                placeholder="Hospital"
                className="block w-full p-4 border rounded-lg shadow-md border-gray-300"
                value={formik.values.hospital}
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full">
              <input
                type="text"
                name="patientId"
                placeholder="Patient ID"
                className="block w-full p-4 border rounded-lg shadow-md border-gray-300"
                value={formik.values.patientId}
                onChange={formik.handleChange}
              />
            </div>
            <button
              type="button"
              className="w-full p-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 shadow-md"
              onClick={nextStep}
            >
              Next
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              type="text"
              name="addressLine1"
              placeholder="Address Line 1"
              className="block w-full p-4 border rounded-lg shadow-md border-gray-300"
              value={formik.values.addressLine1}
              onChange={formik.handleChange}
            />
            <div className="w-full">
              <input
                type="text"
                name="addressLine2"
                placeholder="Address Line 2"
                className="block w-full p-4 border rounded-lg shadow-md border-gray-300"
                value={formik.values.addressLine2}
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full">
              <input
                type="text"
                name="addressLine3"
                placeholder="Address Line 3"
                className="block w-full p-4 border rounded-lg shadow-md border-gray-300"
                value={formik.values.addressLine3}
                onChange={formik.handleChange}
              />
            </div>
            <div className="w-full">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={`block w-full p-4 border rounded-lg shadow-md ${
                  formik.touched.password && formik.errors.password ? "border-red-500" : "border-gray-300"
                }`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              )}
            </div>
            <div className="w-full">
              <input
                type="password"
                name="rePassword"
                placeholder="Re-enter Password"
                className={`block w-full p-4 border rounded-lg shadow-md ${
                  formik.touched.rePassword && formik.errors.rePassword ? "border-red-500" : "border-gray-300"
                }`}
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.rePassword && formik.errors.rePassword && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.rePassword}</div>
              )}
            </div>
            <button
              type="button"
              className="w-full p-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 shadow-md"
              onClick={nextStep}
            >
              Next
            </button>
          </>
        )}

      
        {step === 4 && (
          <>
            <input
              type="text"
              name="nic"
              placeholder="NIC"
              className={`block w-full p-4 border rounded-lg shadow-md ${
                formik.touched.nic && formik.errors.nic ? "border-red-500" : "border-gray-300"
              }`}
              value={formik.values.nic}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.nic && formik.errors.nic && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.nic}</div>
            )}
            <div className="w-full">
              <input
                type="number"
                name="babyCount"
                placeholder="Baby Count"
                className={`block w-full p-4 border rounded-lg shadow-md ${
                  formik.touched.babyCount && formik.errors.babyCount ? "border-red-500" : "border-gray-300"
                }`}
                value={formik.values.babyCount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.babyCount && formik.errors.babyCount && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.babyCount}</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full p-4 text-white bg-green-500 rounded-lg hover:bg-green-600 shadow-md"
            >
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Registration2;

*/