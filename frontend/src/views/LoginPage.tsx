import React from "react";
import { useFormik } from "formik";
import logo from "../assets/images/logo.png";

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
    onSubmit: values => {
      console.log('Form data', values);
    }
  });

  return (
    <div className="flex items-center justify-center mt-9">
      <form autoComplete="off" onSubmit={formik.handleSubmit} className="flex flex-col items-center w-full">
      <img src={logo} alt="" />
      <header className="text-blue_primary text-4xl mb-14">Materny<span className="text-pink_primary">Care</span></header>
      <div className="w-full flex flex-col items-center mb-12">
        <input
          className={`shadow appearance-none border-none rounded-b-xl py-4 px-4 w-5/12	 text-gray-700 leading-tight focus:outline-[#0D99FF] focus:shadow-outline text-lg`}
          value={formik.values.name}
          placeholder="Name"
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
        />
      </div>
      <div className="w-full mb-9 flex flex-col items-center">
        <input
          className={`shadow appearance-none border-none rounded-b-xl py-4 px-4 w-5/12	 text-gray-700 leading-tight focus:outline-[#0D99FF] focus:shadow-outline text-lg`}
          value={formik.values.password}
          placeholder="Password"
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
        />
      </div>
      <div className="w-5/12 mb-9 flex flex-col items-start">
      <a href="" className="text-[#838383] text-xs">Forgot Password?</a>
      </div>
      <button
      className={`text-xl py-5 rounded-xl text-white w-5/12 h-16 bg-blue_primary hover:bg-[#33C2FF]`} 
      type="submit">Login
      </button>
    </form>
    </div>
    
  );
};

export default LoginPage;
