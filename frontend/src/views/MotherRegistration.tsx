import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Grid, FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps, TextFieldVariants } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { JSX } from 'react/jsx-runtime';

interface FormValues {
  age: number;
  mobile: string;
  fixedPhone: string;
  nic: string;
  address: string;
  deliveryDate: Date | null;
}

const initialValues: FormValues = {
  age: 0,
  mobile: '',
  fixedPhone: '',
  nic: '',
  address: '',
  deliveryDate: null,
};

const validationSchema = Yup.object({
  age: Yup.number()
    .required('Age is required')
    .min(1, 'Age must be greater than 0'),
  mobile: Yup.string()
    .required('Mobile phone number is required')
    .matches(/^[0-9]+$/, 'Mobile phone number must be numeric')
    .min(10, 'Mobile phone number must be at least 10 digits'),
  fixedPhone: Yup.string()
    .required('Fixed phone number is required')
    .matches(/^[0-9]+$/, 'Fixed phone number must be numeric')
    .min(7, 'Fixed phone number must be at least 7 digits'),
  nic: Yup.string().required('NIC is required'),
  address: Yup.string().required('Address is required'),
  deliveryDate: Yup.date().required('Delivery date is required').nullable(),
});

const RegistrationForm: React.FC = () => {
  const handleSubmit = (values: FormValues) => {
    console.log('Form values:', values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Field
                  name="age"
                  as={TextField}
                  label="Age"
                  fullWidth
                  type="number"
                  error={Boolean(<ErrorMessage name="age" />)}
                  helperText={<ErrorMessage name="age" />}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  name="mobile"
                  as={TextField}
                  label="Mobile Phone Number"
                  fullWidth
                  error={Boolean(<ErrorMessage name="mobile" />)}
                  helperText={<ErrorMessage name="mobile" />}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  name="fixedPhone"
                  as={TextField}
                  label="Fixed Phone Number"
                  fullWidth
                  error={Boolean(<ErrorMessage name="fixedPhone" />)}
                  helperText={<ErrorMessage name="fixedPhone" />}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  name="nic"
                  as={TextField}
                  label="NIC"
                  fullWidth
                  error={Boolean(<ErrorMessage name="nic" />)}
                  helperText={<ErrorMessage name="nic" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="address"
                  as={TextField}
                  label="Address"
                  fullWidth
                  multiline
                  rows={4}
                  error={Boolean(<ErrorMessage name="address" />)}
                  helperText={<ErrorMessage name="address" />}
                />
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  label="Delivery Date"
                  value={null}
                  onChange={(date: any) => setFieldValue('deliveryDate', date)}
                  renderInput={(params: JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined; } & Omit<FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps, "variant">) => (
                    <TextField {...params} error={Boolean(<ErrorMessage name="deliveryDate" />)} helperText={<ErrorMessage name="deliveryDate" />} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Register
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
