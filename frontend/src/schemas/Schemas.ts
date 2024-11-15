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

// Validation for MOH registration form
export const mohRegistrationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Please provide your email."),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Please enter your password."),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Please provide your phone number."),
  mohID: yup
    .string()
    .matches(/^MOH\d{3}$/, "MOH ID must start with 'MOH' followed by 3 digits")
    .required("Please provide your MOH ID."),
});
