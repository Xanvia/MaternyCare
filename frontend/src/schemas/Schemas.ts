import * as yup from "yup";
import { ErrorIcon } from "../assets/icons/Icons";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;

export const loginSchema = yup.object().shape({
    name: yup.string().required(`${ErrorIcon} Name is required!`),
    password: yup.string().min(5).matches(passwordRules, {message: "Please Enter Strong Password!"}).required(`${ErrorIcon} Password is required!`),
});