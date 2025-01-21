import * as yup from "yup";

// Validation for login form
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
  nic: yup
    .string()
    .matches(
      /^(\d{9}[vVxX]|\d{12})$/,
      "NIC must be 9 digits followed by 'v', 'V', 'x', or 'X' or 12 digits"
    )
    .required("Please provide your NIC."),
  mohArea: yup
    .string()
    .min(3, "MOH Area must be at least 3 characters")
    .required("Please provide the MOH Area."), // Updated from password to MOH Area
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Please provide your phone number."),
  mohID: yup.string().required("Please provide your MOH ID."),
});
