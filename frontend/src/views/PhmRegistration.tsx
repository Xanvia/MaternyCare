import React from "react";
import { useFormik } from "formik";
import logo from "../assets/images/logo.png";
// import { phmRegistrationSchema } from "../schemas/Schemas";
import { ErrorIcon } from "../assets/icons/Icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormValues {
  moh_division: string; // Updated from password to mohArea
  phm_area: string;
  phone_number: string;
  phm_id: string;
}

const PHMRegistration: React.FC = () => {
  const token = localStorage.getItem("regToken");
  const parsedToken = token ? JSON.parse(token) : null;
  const navigate = useNavigate();
  
  const formik = useFormik<FormValues>({
    initialValues: {
      moh_division: "", // Updated from password to mohArea
      phone_number: "",
      phm_id: "",
      phm_area: "",
    },
    // validationSchema: phmRegistrationSchema,
    onSubmit: async (values) => {
      console.log("Form data", values);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}users/phm`,
          values,
          {
            headers: {
              Authorization: `Bearer ${parsedToken}`
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

        {/* Input for MOH Division */}
        <div className="w-full flex flex-col items-center lg:mb-6 mb-4">
          <input
            className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
            lg:text-lg md:text-base sm:text-base text-sm
            ${formik.touched.moh_division && formik.errors.moh_division ? "border-solid border-red-500" : "border-none"}`}
            value={formik.values.moh_division}
            placeholder="MOH Division"
            id="moh_division"
            name="moh_division"
            onChange={formik.handleChange}
          />
          <div className="w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 mb-2 flex flex-col items-start mt-1">
            {formik.touched.moh_division && formik.errors.moh_division ? (
              <div className="text-red-500 text-xs">
                <ErrorIcon /> {formik.errors.moh_division}
              </div>
            ) : null}
          </div>
        </div>

        {/* Input for PHM Area */}
        <div className="w-full flex flex-col items-center lg:mb-6 mb-4">
          <input
            className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
            lg:text-lg md:text-base sm:text-base text-sm
            ${formik.touched.phm_area && formik.errors.phm_area ? "border-solid border-red-500" : "border-none"}`}
            value={formik.values.phm_area}
            placeholder="PHM Area"
            id="phm_area"
            name="phm_area"
            onChange={formik.handleChange}
          />
          <div className="w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 mb-2 flex flex-col items-start mt-1">
            {formik.touched.phm_area && formik.errors.phm_area ? (
              <div className="text-red-500 text-xs">
                <ErrorIcon /> {formik.errors.phm_area}
              </div>
            ) : null}
          </div>
        </div>

        {/* Input for Phone Number */}
        <div className="w-full flex flex-col items-center lg:mb-6 mb-4">
          <input
            className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
            lg:text-lg md:text-base sm:text-base text-sm
            ${formik.touched.phone_number && formik.errors.phone_number ? "border-solid border-red-500" : "border-none"}`}
            value={formik.values.phone_number}
            placeholder="Phone Number"
            id="phone_number"
            name="phone_number"
            onChange={formik.handleChange}
          />
          <div className="w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 mb-2 flex flex-col items-start mt-1">
            {formik.touched.phone_number && formik.errors.phone_number ? (
              <div className="text-red-500 text-xs">
                <ErrorIcon /> {formik.errors.phone_number}
              </div>
            ) : null}
          </div>
        </div>

        {/* Input for PHM ID */}
        <div className="w-full flex flex-col items-center lg:mb-6 mb-4">
          <input
            className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
            lg:text-lg md:text-base sm:text-base text-sm
            ${formik.touched.phm_id && formik.errors.phm_id ? "border-solid border-red-500" : "border-none"}`}
            value={formik.values.phm_id}
            placeholder="PHM ID"
            id="phm_id"
            name="phm_id"
            onChange={formik.handleChange}
          />
          <div className="w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 mb-2 flex flex-col items-start mt-1">
            {formik.touched.phm_id && formik.errors.phm_id ? (
              <div className="text-red-500 text-xs">
                <ErrorIcon /> {formik.errors.phm_id}
              </div>
            ) : null}
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="py-5 rounded-xl w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-white h-16 bg-blue_primary hover:bg-[#0D99FF] lg:text-lg md:text-lg sm:text-small text-small"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default PHMRegistration;