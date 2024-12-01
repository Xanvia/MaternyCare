import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/images/logo.png";

// Validation schema
const registrationSchema = Yup.object({
  age: Yup.number()
    .required("Age is required")
    .min(0, "Age must be a positive number"),
  phone_1: Yup.string().required("Mobile phone number is required"),
  bio: Yup.string().required("Bio is required"),
  nic: Yup.string().required("NIC is required"),
  address: Yup.string().required("Address is required"),
  delivery_date: Yup.date().required("Delivery date is required"),
});

const MotherRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("regToken");
  const parsedToken = token ? JSON.parse(token) : null;
  console.log("token from mother reg ",parsedToken);
  const formik = useFormik({
    initialValues: {
      age: "",
      phone_1: "",
      bio: "",
      nic: "",
      address: "",
      delivery_date: "",
    },
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:3000/users/mother/", values, {
          headers: { Authorization: `Bearer ${parsedToken}` },
        });

        await axios.post("http://localhost:3000/appointments/generate/prenatal", values, {
          headers: { Authorization: `Bearer ${parsedToken}` },
        });

        await axios.post("http://localhost:3000/appointments/generate/postnatal", values, {
          headers: { Authorization: `Bearer ${parsedToken}` },
        });


        toast.success("Registration successful!");
        navigate("/login");
      } catch (error) {
        toast.error("Registration failed. Please try again.");
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <ToastContainer />
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4 w-full max-w-md p-8 bg-white rounded-lg lg:max-w-lg shadow-md"
      >
        <div className="flex flex-col justify-center items-center mt-10">
          <img src={logo} alt="Materny Logo" className="w-24" />
        </div>

        <div className="text-center leading-9 font-semibold mt-5">
          <h1 className="text-3xl md:text-4xl" style={{ fontFamily: "Ubuntu" }}>
            <span style={{ color: "#0D99FF" }}>Materny</span>
            <span style={{ color: "#F580AB" }}>Care</span>
          </h1>
        </div>

        {/* Age Input */}
        <div className="w-full">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Age
          </label>
          <input
            type="number"
            name="age"
            id="age"
            className={`block w-full p-2 border rounded-lg shadow-md ${
              formik.touched.age && formik.errors.age
                ? "border-red-500"
                : "border-gray-300"
            }`}
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.age && formik.errors.age && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.age}</div>
          )}
        </div>

        {/* Mobile Phone Number Input */}
        <div className="w-full">
          <label
            htmlFor="phone_1"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mobile Phone Number
          </label>
          <input
            type="text"
            name="phone_1"
            id="phone_1"
            className={`block w-full p-2 border rounded-lg shadow-md ${
              formik.touched.phone_1 && formik.errors.phone_1
                ? "border-red-500"
                : "border-gray-300"
            }`}
            value={formik.values.phone_1}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone_1 && formik.errors.phone_1 && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.phone_1}
            </div>
          )}
        </div>

        {/* Bio Input */}
        <div className="w-full">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Bio
          </label>
          <input
            type="text"
            name="bio"
            id="bio"
            className={`block w-full p-2 border rounded-lg shadow-md ${
              formik.touched.bio && formik.errors.bio
                ? "border-red-500"
                : "border-gray-300"
            }`}
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.bio && formik.errors.bio && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.bio}</div>
          )}
        </div>

        {/* NIC Input */}
        <div className="w-full">
          <label
            htmlFor="nic"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            NIC
          </label>
          <input
            type="text"
            name="nic"
            id="nic"
            className={`block w-full p-2 border rounded-lg shadow-md ${
              formik.touched.nic && formik.errors.nic
                ? "border-red-500"
                : "border-gray-300"
            }`}
            value={formik.values.nic}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.nic && formik.errors.nic && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.nic}</div>
          )}
        </div>

        {/* Address Input */}
        <div className="w-full">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address
          </label>
          <textarea
            name="address"
            id="address"
            rows={3}
            className={`block w-full p-2 border rounded-lg shadow-md ${
              formik.touched.address && formik.errors.address
                ? "border-red-500"
                : "border-gray-300"
            }`}
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.address && formik.errors.address && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.address}
            </div>
          )}
        </div>

        {/* Delivery Date Input */}
        <div className="w-full">
          <label
            htmlFor="delivery_date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Delivery Date
          </label>
          <input
            type="date"
            name="delivery_date"
            id="delivery_date"
            className={`block w-full p-2 border rounded-lg shadow-md ${
              formik.touched.delivery_date && formik.errors.delivery_date
                ? "border-red-500"
                : "border-gray-300"
            }`}
            value={formik.values.delivery_date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.delivery_date && formik.errors.delivery_date && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.delivery_date}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default MotherRegistrationPage;
