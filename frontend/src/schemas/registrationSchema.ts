import * as Yup from "yup";

export const registrationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name can't exceed 50 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name can't exceed 50 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .max(50, "Password can't exceed 50 characters")
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    //   "Password must include one uppercase letter, one lowercase letter, one number, and one special character"
    // )
    .required("Password is required"),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password"), ], "Passwords must match")
    .required("Please confirm your password"),
});
