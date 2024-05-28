import React from "react";
import { useFormik } from "formik";
import logo from "../assets/images/logo.png";
import { loginSchema } from "../schemas/Schemas";
import { ErrorIcon } from "../assets/icons/Icons";

interface FormValues {
  name: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log("Form data", values);
    },
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <img src={logo} alt="" />
        <header className="text-blue_primary text-4xl lg:mb-8 mb-6">
          Materny<span className="text-pink_primary">Care</span>
        </header>
        <div className="w-full flex flex-col items-center lg:mb-9 mb-4">
          <input
            className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline text-lg
          ${
            formik.touched.name && formik.errors.name
              ? "border-solid border-red-500"
              : "border-none"
          }`}
            value={formik.values.name}
            placeholder="Name"
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
          />
          {/* Display error message with icon */}
          <div className="w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 mb-2 flex flex-col items-start mt-1">
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-xs">
                {" "}
                <ErrorIcon /> {formik.errors.name}
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-full mb-4 flex flex-col items-center">
          <input
            className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12	 text-gray-700 leading-tight  focus:shadow-outline text-lg
          ${
            formik.touched.name && formik.errors.name
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
          className={`text-xl py-5 rounded-xl w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-white h-16 bg-blue_primary hover:bg-[#33C2FF]`}
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
