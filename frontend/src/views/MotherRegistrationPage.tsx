import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/images/logo.png";
import { ErrorIcon } from "../assets/icons/Icons";

// Validation schema
const registrationSchema = Yup.object({
  age: Yup.number()
    .required("Age is required")
    .min(0, "Age must be a positive number"),
  phone_1: Yup.string().required("Mobile phone number is required"),
  bio: Yup.string().required("Bio is required"),
  address: Yup.string().required("Address is required"),
  delivery_date: Yup.date().required("Delivery date is required"),
});

const MotherRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("regToken");
  const parsedToken = token ? JSON.parse(token) : null;
  const formik = useFormik({
    initialValues: {
      age: 18,
      phone_1: "",
      bio: "",
      address: "",
      delivery_date: "",
    },
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}users/mother/`,
          values,
          {
            headers: { Authorization: `Bearer ${parsedToken}` },
          }
        );

        await axios.post(
          `${import.meta.env.VITE_API_URL}appointments/generate/prenatal`,
          values,
          {
            headers: { Authorization: `Bearer ${parsedToken}` },
          }
        );

        await axios.post(
          `${import.meta.env.VITE_API_URL}appointments/generate/postnatal`,
          values,
          {
            headers: { Authorization: `Bearer ${parsedToken}` },
          }
        );

        toast.success("Registration successful!");
        navigate("/login");
      } catch (error) {
        toast.error("Registration failed. Please try again.");
      }
    },
  });

  return (
    <div className="flex items-center justify-center md:min-h-screen overflow-auto py-4 sm:pt-0 mt-8">
      <ToastContainer />
      <form
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center w-full max-w-md"
      >
        <img
          src={logo}
          alt="MaternyCare Logo"
          className="w-16 h-auto mb-4 mt-4 sm:mt-0" // Adjusted size classes
        />
        <header className="text-blue_primary lg:text-2xl ss:text-2xl text-lg lg:mb-4 mb-2">
          Materny<span className="text-pink_primary">Care</span>
        </header>
        {[
          { field: "age", placeholder: "Age" },
          { field: "phone_1", placeholder: "Phone Number" },
          { field: "bio", placeholder: "Bio" },
          { field: "address", placeholder: "Address" },
          { field: "delivery_date", placeholder: "Expected Delivery Date" },
        ].map(({ field, placeholder }) => (
          <div
            key={field}
            className="w-full flex flex-col items-center lg:mb-3 mb-2"
          >
            <label
              htmlFor={field}
              className="w-11/12 text-gray-700 lg:text-sm md:text-xs sm:text-xs text-xs mb-1"
            >
              {placeholder}
            </label>
            <input
              className={`shadow appearance-none rounded-b-xl py-2 px-2 w-11/12 text-gray-700 leading-tight focus:shadow-outline 
              lg:text-sm md:text-xs sm:text-xs text-xs
            ${
              formik.touched[field as keyof typeof formik.values] &&
              formik.errors[field as keyof typeof formik.values]
                ? "border-solid border-red-500"
                : "border-none"
            }`}
              value={formik.values[field as keyof typeof formik.values]}
              placeholder={field !== "delivery_date" ? placeholder : ""}
              id={field}
              name={field}
              type={field === "delivery_date" ? "date" : "text"}
              onChange={formik.handleChange}
            />
            <div className="w-11/12 mb-1 flex flex-col items-start mt-1">
              {formik.touched[field as keyof typeof formik.values] &&
              formik.errors[field as keyof typeof formik.values] ? (
                <div className="text-red-500 text-xs">
                  <ErrorIcon /> {formik.errors[field as keyof typeof formik.values]}
                </div>
              ) : null}
            </div>
          </div>
        ))}
        <button
          className="py-3 rounded-xl w-11/12 text-white h-12 bg-blue_primary hover:bg-[#33C2FF] lg:text-sm md:text-sm sm:text-xs text-xs"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default MotherRegistrationPage;