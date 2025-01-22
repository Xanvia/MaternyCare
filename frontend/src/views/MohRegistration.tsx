import React from "react";
import { useFormik } from "formik";
import logo from "../assets/images/logo.png";
import { mohRegistrationSchema } from "../schemas/Schemas";
import { ErrorIcon } from "../assets/icons/Icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormValues {
  mohArea: string; // Updated from password to mohArea
  phoneNumber: string;
  mohID: string;
}

const MOHRegistration: React.FC = () => {
  const token = localStorage.getItem("regToken");
  const parsedToken = token ? JSON.parse(token) : null;
  const navigate = useNavigate();
  const formik = useFormik<FormValues>({
    initialValues: {
      mohArea: "", // Updated from password to mohArea
      phoneNumber: "",
      mohID: "",
    },
    validationSchema: mohRegistrationSchema,
    onSubmit: async (values) => {
      console.log("Form data", values);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}users/moh`,
          values,
          {
            headers: {
              Authorization: `Bearer ${parsedToken}`,
            },
          }
        );
        console.log(response.data);
        toast.success("Registration successful!");
        navigate("/login");
        // Additional actions after successful registration
      } catch (error) {
        console.error(error);
        if ((error as any).response?.status === 400) {
          toast.error("Invalid registration details");
        } else {
          toast.error("An error occurred during registration");
        }
      }
    },
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <ToastContainer />
      <form
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <img
          src={logo}
          alt="MaternyCare Logo"
          className="lg:size-1/12 md:size-1/12 ss:size-1/6 sm:size-1/6 size-1/6"
        />
        <header className="text-blue_primary lg:text-4xl ss:text-4xl text-2xl lg:mb-8 mb-6">
          Materny<span className="text-pink_primary">Care</span>
        </header>
        {["mohArea", "phoneNumber", "mohID"].map((field) => (
          <div
            key={field}
            className="w-full flex flex-col items-center lg:mb-6 mb-4"
          >
            <input
              className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
              lg:text-lg md:text-base sm:text-base text-sm
            ${
              formik.touched[field as keyof FormValues] &&
              formik.errors[field as keyof FormValues]
                ? "border-solid border-red-500"
                : "border-none"
            }`}
              value={formik.values[field as keyof FormValues]}
              placeholder={
                field === "mohArea"
                  ? "MOH Area" // Custom placeholder for MOH Area
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              id={field}
              name={field}
              type={field === "phoneNumber" ? "text" : "text"} // Updated password to text for MOH Area
              onChange={formik.handleChange}
            />
            <div className="w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 mb-2 flex flex-col items-start mt-1">
              {formik.touched[field as keyof FormValues] &&
              formik.errors[field as keyof FormValues] ? (
                <div className="text-red-500 text-xs">
                  <ErrorIcon /> {formik.errors[field as keyof FormValues]}
                </div>
              ) : null}
            </div>
          </div>
        ))}
        <button
          className="py-5 rounded-xl w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-white h-16 bg-blue_primary hover:bg-[#33C2FF] lg:text-lg md:text-lg sm:text-small text-small"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default MOHRegistration;
