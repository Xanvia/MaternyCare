import * as yup from "yup";

// const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;

export const loginSchema = yup.object().shape({
  email: yup.string().required("Please provide your email."),
  password: yup
    .string()
    .min(4)
    // .matches(passwordRules, { message: "Please Enter Strong Password!" })
    .required("Please enter your password."),
});
