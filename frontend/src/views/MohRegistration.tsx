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
      try {
        const response = await axios.post(
          "http://localhost:3000/moh-register/",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("MOH Registration successful!");
      } catch (error) {
        if ((error as any).response) {
          toast.error((error as any).response.data.message || "Registration failed");
        } else {
          toast.error("An error occurred");
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
        <img src={logo} alt="MaternyCare Logo" className="logo-size" />
        <header className="text-blue_primary text-4xl mb-6">
          Materny<span className="text-pink_primary">Care</span>
        </header>

        {["email", "password", "phoneNumber", "mohID"].map((field) => (
          <div key={field} className="w-full mb-4 flex flex-col items-center">
            <input
              className={`input-style ${
                formik.touched[field] && formik.errors[field]
                  ? "border-red-500"
                  : "border-none"
              }`}
              value={formik.values[field]}
              placeholder={field}
              id={field}
              name={field}
              type={field === "password" ? "password" : "text"}
              onChange={formik.handleChange}
            />
            {formik.touched[field] && formik.errors[field] && (
              <div className="error-style">
                <ErrorIcon /> {formik.errors[field]}
              </div>
            )}
          </div>
        ))}

        <button className="btn-style" type="submit">
          Register MOH
        </button>
      </form>
    </div>
  );
};

export default MOHRegistration;
