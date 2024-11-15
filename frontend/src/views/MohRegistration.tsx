import React from "react";
import { useFormik } from "formik";
import logo from "../assets/images/logo.png";
import { mohRegistrationSchema } from "../schemas/Schemas";
import { ErrorIcon } from "../assets/icons/Icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormValues {
  email: string;
  password: string;
  phoneNumber: string;
  mohID: string;
}

const MOHRegistration: React.FC = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
      phoneNumber: "",
      mohID: "",
    },
    validationSchema: mohRegistrationSchema,
    onSubmit: async (values) => {
      console.log("Form data", values);
      try {
        const response = await axios.post(
          "http://localhost:3000/moh-registration/",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        toast.success("Registration successful!");
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
        {["email", "password", "phoneNumber", "mohID"].map((field) => (
          <div key={field} className="w-full flex flex-col items-center lg:mb-6 mb-4">
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
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              id={field}
              name={field}
              type={field === "password" ? "password" : "text"}
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
