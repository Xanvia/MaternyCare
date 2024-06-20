import React from "react";
import { useFormik } from "formik";
import logo from "../assets/images/logo.png";
import { loginSchema } from "../schemas/Schemas";
import { ErrorIcon } from "../assets/icons/Icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          "http://localhost:3000/login/",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        // localStorage.setItem(
        //   "name",
        //   JSON.stringify(response.data.user.firstName)
        // );
        localStorage.setItem("role", JSON.stringify(response.data.user.role));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        console.log(response.data.user.role);

        switch (response.data.user.role) {
          case "mother":
            navigate("/dashboard");
            break;
          case "phm":
            navigate("/phmdashboard");
            break;
          case "moh":
            navigate("/phmdashboard");
            break;
          default:
            navigate("/dashboard");
        }

        // Handle successful login here
      } catch (error) {
        console.error(error);
        // Handle errors here
        if ((error as any).response && (error as any).response.status === 401) {
          toast.error("Credentials don't match");
        } else {
          toast.error("An error occured");
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
          alt=""
          className="lg:size-1/12 md:size-1/12 ss:size-1/6 sm:size-1/6 size-1/6"
        />
        <header className="text-blue_primary lg:text-4xl ss:text-4xl text-2xl lg:mb-8 mb-6">
          Materny<span className="text-pink_primary">Care</span>
        </header>
        <div className="w-full flex flex-col items-center lg:mb-9 mb-4">
          <input
            className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
            lg:text-lg md:text-base sm:text-base text-sm
          ${
            formik.touched.email && formik.errors.email
              ? "border-solid border-red-500"
              : "border-none"
          }`}
            value={formik.values.email}
            placeholder="Email"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
          />
          {/* Display error message with icon */}
          <div className="w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 mb-2 flex flex-col items-start mt-1">
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-xs">
                {" "}
                <ErrorIcon /> {formik.errors.email}
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-full mb-4 flex flex-col items-center">
          <input
            className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12	 text-gray-700 leading-tight  focus:shadow-outline 
            lg:text-lg md:text-base sm:text-base text-sm
          ${
            formik.touched.password && formik.errors.password
              ? "border-solid border-red-500"
              : "border-none"
          }`}
            value={formik.values.password}
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
          />
          <div className="w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 mb-2 flex flex-col items-start mt-1">
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-xs">
                <ErrorIcon />
                {formik.errors.password}
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 mb-4 flex flex-row justify-between">
          <a href="" className="text-[#838383] text-xs ">
            Forgot Password?
          </a>
          <a href="" className="text-[#838383] text-xs ">
            Don't have an account? Sign Up
          </a>
        </div>
        <button
          className={`py-5 rounded-xl w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-white h-16 bg-blue_primary hover:bg-[#33C2FF] lg:text-lg md:text-lg sm:text-small text-small`}
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
