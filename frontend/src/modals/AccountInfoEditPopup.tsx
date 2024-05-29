import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/joy/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Edit } from "../assets/icons/Icons";

// Validation schema
const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    passord: Yup.string().required("Passwword is required"),
    stage: Yup.string().required("Stage is required"),
    babycount: Yup.string().required("Baby count is required"),
    gs: Yup.string().required("GS Division number is required"),
  });
  