import React from "react";
import { useFormik } from "formik";
import logo from "../assets/images/logo.png";
import { loginSchema } from "../schemas/Schemas";
import { ErrorIcon } from "../assets/icons/Icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPasswordPopup from "../modals/ForgotPasswordPopup";

interface FormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      console.log("Form data", values);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}login/`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        localStorage.setItem("role", JSON.stringify(response.data.user.role));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        console.log(response.data.user.role);

        switch (response.data.user.role) {
          case "mother":
            navigate("/motherdashboard");
            break;
          case "phm":
            navigate("/phmdashboard");
            break;
          case "moh":
            navigate("/mohdashboard");
            break;
          case "vog":
            navigate("/vogdashboard");
            break;
          default:
            navigate("/dashboard");
        }
      } catch (error) {
        console.error(error);
        if ((error as any).response && (error as any).response.status === 401) {
          toast.error("Credentials don't match");
        } else {
          toast.error("An error occurred");
        }
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen py-4 sm:pt-0">
      <ToastContainer />
      <form
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center w-full max-w-md px-4 sm:px-0"
      >
        <img
          src={logo}
          alt="MaternyCare Logo"
          className="w-16 h-auto mb-4 mt-4 sm:mt-0"
        />
        <header className="text-blue_primary lg:text-2xl ss:text-2xl text-lg lg:mb-4 mb-2">
          Materny<span className="text-pink_primary">Care</span>
        </header>
        {["email", "password"].map((field) => (
          <div
            key={field}
            className="w-full flex flex-col items-center lg:mb-3 mb-2"
          >
            <label
              htmlFor={field}
              className="w-11/12 text-gray-700 lg:text-sm md:text-xs sm:text-xs text-xs mb-1"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
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
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              id={field}
              name={field}
              type={field === "password" ? "password" : "text"}
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
        <div className="w-11/12 flex flex-row justify-between mb-4">
          <ForgotPasswordPopup />
          <a href="" onClick={() => navigate("/landing")} className="text-[#838383] text-xs">
            Don't have an account? Sign Up
          </a>
        </div>
        <button
          className="py-3 rounded-xl w-11/12 text-white h-12 bg-blue_primary hover:bg-[#33C2FF] lg:text-sm md:text-sm sm:text-xs text-xs"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>

  );
};

export default LoginPage;