import React from "react";
import { useFormik } from "formik";

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
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          value={formik.values.name}
          placeholder="Name"
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          value={formik.values.password}
          placeholder="Password"
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginPage;
