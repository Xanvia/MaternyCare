import * as yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;

export const loginSchema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please Enter Strong Password!" })
    .required("Password is required!"),
});
