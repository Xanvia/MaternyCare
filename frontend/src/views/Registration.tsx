// import { useContext, useState } from "react";
// import { RoleContext } from "../contexts/RoleContextProvider";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import logo from "../assets/images/logo.png";

// const Registration = () => {
//   const roleContext = useContext(RoleContext);
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     rePassword: "",
//     role: roleContext?.role,
//   });

//   const handleChange = (e: { target: { name: any; value: any } }) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     // Perform validation and submit form

//     try {
//       const response = await axios.post("http://localhost:3000/register", form);
//       console.log("user reg data ", response.data);
//       // localStorage.setItem("role", JSON.stringify(response.data.user.role));
//       // localStorage.setItem("user", JSON.stringify(response.data.user));
//       localStorage.setItem("regToken", JSON.stringify(response.data.token));
//       console.log("reg token from user reg ", response.data.token);
//       console.log("Registration successful");

//       switch (response.data.user.role) {
//         case "mother":
//           navigate("/mother/registration");
//           break;
//         case "phm":
//           navigate("/phmdashboard");
//           break;
//         case "moh":
//           navigate("/mohregistration");
//           break;
//         default:
//           navigate("/dashboard");
//       }

//       // Handle successful registration here
//     } catch (error) {
//       console.error(error);
//       // Handle errors here
//     }
//   };
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <ToastContainer />
//       <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
//       <img
//           src={logo}
//           alt=""
//           className="lg:size-1/12 md:size-1/12 ss:size-1/6 sm:size-1/6 size-1/6"
//         />
//         <header className="text-blue_primary lg:text-4xl ss:text-4xl text-2xl lg:mb-8 mb-6">
//           Registration <span className="text-pink_primary">Form</span>
//         </header>
//         <div className="w-5/12 flex flex-col items-center lg:mb-9 mb-4">
//           <input
//             type="text"
//             name="firstName"
//             value={form.firstName}
//             onChange={handleChange}
//             placeholder="First Name"
//             className="block w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         <div className="w-5/12 flex flex-col items-center lg:mb-9 mb-4">
//           <input
//             type="text"
//             name="lastName"
//             value={form.lastName}
//             onChange={handleChange}
//             placeholder="Last Name"
//             className="block w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         <div className="w-5/12 flex flex-col items-center lg:mb-9 mb-4">
//         <input
//           type="email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="block w-full p-2 border border-gray-300 rounded"
//         />
//         </div>

//         <div className="w-5/12 flex flex-col items-center lg:mb-9 mb-4">
//         <input
//           type="password"
//           name="password"
//           value={form.password}
//           onChange={handleChange}
//           placeholder="Password"
//           className="block w-full p-2 border border-gray-300 rounded"
//         />
//         </div>

//         <button
//           type="submit"
//           className="block w-5/12 p-2 bg-blue-500 text-white rounded"
//         >
//           Next
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Registration;

import React from "react";
import { useFormik } from "formik";
import logo from "../assets/images/logo.png";
import { ErrorIcon } from "../assets/icons/Icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registrationSchema } from "../schemas/registrationSchema";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Registration: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registrationSchema,

    onSubmit: async (values) => {
      if (values.password !== values.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      console.log("Form data", values);
      try {
        const emailCheckResponse = await axios.post(
          "http://localhost:3000/check-email",
          { email: values.email },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (emailCheckResponse.data.exists) {
          toast.error("Email is already registered");
          return;
        }

        const response = await axios.post(
          "http://localhost:3000/register/",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("regToken", JSON.stringify(response.data.token));
        toast.success("Registration successful");

        switch (response.data.user.role) {
          case "mother":
            navigate("/mother/registration");
            break;
          case "phm":
            navigate("/phmdashboard");
            break;
          case "moh":
            navigate("/mohregistration");
            break;
          case "admin":
            navigate("/login");
            break;
          default:
            navigate("/dashboard");
        }
      } catch (error) {
        console.error(error);
        if ((error as any).response && (error as any).response.status === 400) {
          toast.error("Registration failed");
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
            formik.touched.firstName && formik.errors.firstName
              ? "border-solid border-red-500"
              : "border-none"
          }`}
            value={formik.values.firstName}
            placeholder="First Name"
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
          />
          <div className="w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 mb-2 flex flex-col items-start mt-1">
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-500 text-xs">
                <ErrorIcon /> {formik.errors.firstName}
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-full flex flex-col items-center lg:mb-9 mb-4">
          <input
            className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight focus:shadow-outline 
            lg:text-lg md:text-base sm:text-base text-sm
          ${
            formik.touched.lastName && formik.errors.lastName
              ? "border-solid border-red-500"
              : "border-none"
          }`}
            value={formik.values.lastName}
            placeholder="Last Name"
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
          />
          <div className="w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 mb-2 flex flex-col items-start mt-1">
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-500 text-xs">
                <ErrorIcon /> {formik.errors.lastName}
              </div>
            ) : null}
          </div>
        </div>
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
          <div className="w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 mb-2 flex flex-col items-start mt-1">
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-xs">
                <ErrorIcon /> {formik.errors.email}
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-full mb-4 flex flex-col items-center">
          <input
            className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight  focus:shadow-outline 
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
        <div className="w-full mb-4 flex flex-col items-center">
          <input
            className={`shadow appearance-none rounded-b-xl py-4 px-4 w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-gray-700 leading-tight  focus:shadow-outline 
            lg:text-lg md:text-base sm:text-base text-sm
          ${
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? "border-solid border-red-500"
              : "border-none"
          }`}
            value={formik.values.confirmPassword}
            placeholder="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
          />
          <div className="w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 mb-2 flex flex-col items-start mt-1">
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 text-xs">
                <ErrorIcon />
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
        </div>
        <button
          className={`py-5 rounded-xl w-11/12 lg:w-5/12 sm:w-8/12 ss:w-10/12 text-white h-16 bg-blue_primary hover:bg-[#33C2FF] lg:text-lg md:text-lg sm:text-small text-small`}
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
