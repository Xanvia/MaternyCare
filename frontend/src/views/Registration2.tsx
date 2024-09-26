import React, { useState } from "react";
import { useFormik } from "formik";
import logo from "../assets/images/logo.png";
import { loginSchema } from "../schemas/Schemas";
//import { ErrorIcon } from "../assets/icons/Icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormValues {
  FirstName: string;
  LastName: string;
  ContactNo: string;
  ContactNo1: string;
}

const Registration2: React.FC = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(1);

  const formik = useFormik<FormValues>({
    initialValues: {
      FirstName: "",
      LastName: "",
      ContactNo: "",
      ContactNo1: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      console.log("Form data", values);
      try {
        const response = await axios.post(
          "http://localhost:3000/Registration/",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
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

  const handleNext = () => {
    if (stage < 4) {
      setStage(stage + 1);
    } else {
      formik.handleSubmit();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <ToastContainer />
      <form autoComplete="off" className="flex flex-col items-center w-full">
        <img
          src={logo}
          alt=""
          className="lg:size-1/12 md:size-1/12 ss:size-1/6 sm:size-1/6 size-1/6"
        />
        <header className="text-blue_primary lg:text-4xl ss:text-4xl text-2xl lg:mb-8 mb-6">
          Materny<span className="text-pink_primary">Care</span>
        </header>

        {stage === 1 && (
          <>
            <div className="w-full flex flex-col items-center lg:mb-9 mb-4">
              <input
                className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
                  lg:text-lg md:text-base sm:text-base text-sm ${
                    formik.touched.FirstName && formik.errors.FirstName
                      ? "border-solid border-red-500"
                      : "border-none"
                  }`}
                value={formik.values.FirstName}
                placeholder="First Name"
                id="FirstName"
                name="FirstName"
                type="text"
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full mb-4 flex flex-col items-center">
              <input
                className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
                  lg:text-lg md:text-base sm:text-base text-sm ${
                    formik.touched.LastName && formik.errors.LastName
                      ? "border-solid border-red-500"
                      : "border-none"
                  }`}
                value={formik.values.LastName}
                placeholder="Last Name"
                id="LastName"
                name="LastName"
                type="text"
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full mb-4 flex flex-col items-center">
              <input
                className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
                  lg:text-lg md:text-base sm:text-base text-sm ${
                    formik.touched.ContactNo && formik.errors.ContactNo
                      ? "border-solid border-red-500"
                      : "border-none"
                  }`}
                value={formik.values.ContactNo}
                placeholder="Contact Number"
                id="ContactNo"
                name="ContactNo"
                type="text"
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full mb-4 flex flex-col items-center">
              <input
                className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
                  lg:text-lg md:text-base sm:text-base text-sm ${
                    formik.touched.ContactNo1 && formik.errors.ContactNo1
                      ? "border-solid border-red-500"
                      : "border-none"
                  }`}
                value={formik.values.ContactNo1}
                placeholder="Contact Number another"
                id="ContactNo1"
                name="ContactNo1"
                type="text"
                onChange={formik.handleChange}
              />
            </div>
          </>
        )}

        {stage === 2 && (
          <>
            <div className="w-full flex flex-col items-center lg:mb-9 mb-4">
              <input
                className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
                  lg:text-lg md:text-base sm:text-base text-sm ${
                    formik.touched.FirstName && formik.errors.FirstName
                      ? "border-solid border-red-500"
                      : "border-none"
                  }`}
                value={formik.values.FirstName}
                placeholder="E mail"
                id="FirstName"
                name="FirstName"
                type="text"
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full mb-4 flex flex-col items-center">
              <input
                className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
                  lg:text-lg md:text-base sm:text-base text-sm ${
                    formik.touched.LastName && formik.errors.LastName
                      ? "border-solid border-red-500"
                      : "border-none"
                  }`}
                value={formik.values.LastName}
                placeholder="Date of Birth"
                id="LastName"
                name="LastName"
                type="text"
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full mb-4 flex flex-col items-center">
              <input
                className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
                  lg:text-lg md:text-base sm:text-base text-sm ${
                    formik.touched.ContactNo && formik.errors.ContactNo
                      ? "border-solid border-red-500"
                      : "border-none"
                  }`}
                value={formik.values.ContactNo}
                placeholder="Hospital"
                id="ContactNo"
                name="ContactNo"
                type="text"
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full mb-4 flex flex-col items-center">
              <input
                className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
                  lg:text-lg md:text-base sm:text-base text-sm ${
                    formik.touched.ContactNo1 && formik.errors.ContactNo1
                      ? "border-solid border-red-500"
                      : "border-none"
                  }`}
                value={formik.values.ContactNo1}
                placeholder="Patient ID"
                id="ContactNo1"
                name="ContactNo1"
                type="text"
                onChange={formik.handleChange}
              />
            </div>
          </>
        )}

        {stage === 3 && (
          <>
            <div className="w-full flex flex-col items-center lg:mb-9 mb-4">
              <input
                className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
                  lg:text-lg md:text-base sm:text-base text-sm ${
                    formik.touched.FirstName && formik.errors.FirstName
                      ? "border-solid border-red-500"
                      : "border-none"
                  }`}
                value={formik.values.FirstName}
                placeholder="Address (line1)"
                id="FirstName"
                name="FirstName"
                type="text"
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full mb-4 flex flex-col items-center">
              <input
                className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
                  lg:text-lg md:text-base sm:text-base text-sm ${
                    formik.touched.LastName && formik.errors.LastName
                      ? "border-solid border-red-500"
                      : "border-none"
                  }`}
                value={formik.values.LastName}
                placeholder="Address (line2)"
                id="LastName"
                name="LastName"
                type="text"
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full mb-4 flex flex-col items-center">
              <input
                className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
                  lg:text-lg md:text-base sm:text-base text-sm ${
                    formik.touched.ContactNo && formik.errors.ContactNo
                      ? "border-solid border-red-500"
                      : "border-none"
                  }`}
                value={formik.values.ContactNo}
                placeholder="Password"
                id="ContactNo"
                name="ContactNo"
                type="text"
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full mb-4 flex flex-col items-center">
              <input
                className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
                  lg:text-lg md:text-base sm:text-base text-sm ${
                    formik.touched.ContactNo1 && formik.errors.ContactNo1
                      ? "border-solid border-red-500"
                      : "border-none"
                  }`}
                value={formik.values.ContactNo1}
                placeholder="Re -enter password"
                id="ContactNo1"
                name="ContactNo1"
                type="text"
                onChange={formik.handleChange}
              />
            </div>
          </>
        )}

        {stage === 4 && (
          <>
            <div className="w-full flex flex-col items-center lg:mb-9 mb-4">
              <input
                className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
                  lg:text-lg md:text-base sm:text-base text-sm ${
                    formik.touched.FirstName && formik.errors.FirstName
                      ? "border-solid border-red-500"
                      : "border-none"
                  }`}
                value={formik.values.FirstName}
                placeholder="Baby count"
                id="FirstName"
                name="FirstName"
                type="text"
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full mb-4 flex flex-col items-center">
              <input
                className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
                  lg:text-lg md:text-base sm:text-base text-sm ${
                    formik.touched.LastName && formik.errors.LastName
                      ? "border-solid border-red-500"
                      : "border-none"
                  }`}
                value={formik.values.LastName}
                placeholder="NIC"
                id="LastName"
                name="LastName"
                type="text"
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full mb-4 flex flex-col items-center">
              <input
                className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
                  lg:text-lg md:text-base sm:text-base text-sm ${
                    formik.touched.ContactNo && formik.errors.ContactNo
                      ? "border-solid border-red-500"
                      : "border-none"
                  }`}
                value={formik.values.ContactNo}
                placeholder="        "
                id="ContactNo"
                name="ContactNo"
                type="text"
                onChange={formik.handleChange}
              />
            </div>

            <div className="w-full mb-4 flex flex-col items-center">
              <input
                className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
                  lg:text-lg md:text-base sm:text-base text-sm ${
                    formik.touched.ContactNo1 && formik.errors.ContactNo1
                      ? "border-solid border-red-500"
                      : "border-none"
                  }`}
                value={formik.values.ContactNo1}
                placeholder="      "
                id="ContactNo1"
                name="ContactNo1"
                type="text"
                onChange={formik.handleChange}
              />
            </div>
          </>
        )}

        <button
          className={`py-5 rounded-xl w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-white h-16 bg-blue_primary hover:bg-[#33C2FF] lg:text-lg md:text-lg sm:text-small text-small`}
          type="button"
          onClick={handleNext}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Registration2;
