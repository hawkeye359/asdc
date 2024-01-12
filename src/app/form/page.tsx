"use client";
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import PdfDocument from "./PdfDocument";
import React, { useState } from "react";
import styles from "./page.module.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MuiTelInput } from "mui-tel-input";
import { Formik, useFormik } from "formik";
import {
  COURSE,
  DATE_OF_BIRTH,
  EMAIL,
  FATHER_NAME,
  FIRST_NAME,
  LAST_NAME,
  MOTHER_NAME,
  PHONENUMBER,
  formFieldsName,
  formSchema,
  initialValues,
} from "./validations";
import courseArray, { findCourseFromArray } from "./courseList";
import { submitForm } from "@/API/services/submitForm";
import {
  RazorpaySuccessResponse,
  createRazorpayConfig,
} from "./createRazorpayConfig";
function Page() {
  const [paymentDone, setPaymentDone] = useState<boolean>(false);
  const [paymetnModIsOnline, setPaymentModeIsOnline] = useState<boolean>(true);
  const [paymentId, setPaymentId] = useState<string>("");
  const [internalId, setInternalId] = useState<string>("");
  const paymentHandler = function (response: RazorpaySuccessResponse) {
    console.log("razorpayResponse", response);
    setPaymentId(response.razorpay_payment_id);
    setPaymentDone(true);
    alert(response.razorpay_payment_id);
    alert(response.razorpay_order_id);
    alert(response.razorpay_signature);
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit: async (values, actions) => {
      const res = await submitForm(values);
      if (!paymetnModIsOnline) {
        setPaymentDone(true);
        return;
      }
      if (res.success) {
        setInternalId(res.data.internalId);
        const orderRes = res.data;
        const razorpayConfig = createRazorpayConfig(
          orderRes.key,
          orderRes.amount,
          orderRes.orderId,
          orderRes.name,
          orderRes.email,
          orderRes.contact,
          paymentHandler
        );
        let rzp1 = new Razorpay(razorpayConfig);
        rzp1.open();
      }
      actions.setSubmitting(false);
    },
  });
  function isError(name: formFieldsName) {
    return !!formik.errors[name] && !!formik.touched[name];
  }
  function getErrorText(name: formFieldsName) {
    const error = formik.errors[name];
    if (typeof error === "string") {
      return error;
    } else {
      return "";
    }
  }

  return !paymentDone ? (
    <Box
      sx={{
        maxWidth: "40rem",
        margin: "10rem auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        sx={{ margin: "0 auto", color: "#36454F" }}
      >
        Fill your details
      </Typography>
      <form className={styles.details_form} onSubmit={formik.handleSubmit}>
        <FormLabel>Course</FormLabel>
        <FormControl fullWidth sx={{ marginTop: "0.5rem" }}>
          <InputLabel id="demo-simple-select-label">Course</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.getFieldProps(COURSE).value}
            error={isError(COURSE)}
            label="Course"
            onChange={(e) => {
              formik.setFieldValue(COURSE, e.target.value);
            }}
          >
            {courseArray.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.value}
                </MenuItem>
              );
            })}
            {/* <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
          <Box sx={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
            <FormLabel>First Name</FormLabel>
            <TextField
              error={isError(FIRST_NAME)}
              variant="outlined"
              placeholder="First Name"
              sx={{ marginTop: "0.5rem" }}
              helperText={getErrorText(FIRST_NAME)}
              {...formik.getFieldProps(FIRST_NAME)}
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
            <FormLabel>Last Name</FormLabel>
            <TextField
              error={isError(LAST_NAME)}
              variant="outlined"
              placeholder="Last Name"
              sx={{ marginTop: "0.5rem" }}
              helperText={getErrorText(LAST_NAME)}
              {...formik.getFieldProps(LAST_NAME)}
            ></TextField>
          </Box>
        </Box>
        <FormLabel
          sx={{
            marginTop: "1rem",
          }}
        >
          Father&apos;s Name
        </FormLabel>
        <TextField
          error={isError(FATHER_NAME)}
          variant="outlined"
          placeholder="Father's name"
          sx={{ marginTop: "0.5rem" }}
          helperText={getErrorText(FATHER_NAME)}
          {...formik.getFieldProps(FATHER_NAME)}
        ></TextField>
        <FormLabel
          sx={{
            marginTop: "1rem",
          }}
        >
          Mother&apos;s Name
        </FormLabel>
        <TextField
          error={isError(MOTHER_NAME)}
          variant="outlined"
          placeholder="Mother's name"
          sx={{ marginTop: "0.5rem" }}
          helperText={getErrorText(MOTHER_NAME)}
          {...formik.getFieldProps(MOTHER_NAME)}
        ></TextField>
        <FormLabel
          sx={{
            marginTop: "1rem",
          }}
        >
          Date of birth
        </FormLabel>
        <DatePicker
          value={formik.getFieldProps(DATE_OF_BIRTH)}
          label="Date of birth"
          sx={{ marginTop: "0.5rem" }}
          onChange={(e) => {
            formik.setFieldValue(DATE_OF_BIRTH, e);
          }}
        ></DatePicker>
        <FormLabel
          sx={{
            marginTop: "1rem",
          }}
        >
          Phone number
        </FormLabel>
        <MuiTelInput
          error={isError(PHONENUMBER)}
          sx={{ marginTop: "0.5rem" }}
          helperText={getErrorText(PHONENUMBER)}
          {...formik.getFieldProps(PHONENUMBER)}
          onChange={(e) => {
            formik.setFieldValue(PHONENUMBER, e);
          }}
        ></MuiTelInput>
        <FormLabel
          sx={{
            marginTop: "1rem",
          }}
        >
          Email
        </FormLabel>
        <TextField
          variant="outlined"
          placeholder="Email"
          type="email"
          sx={{ marginTop: "0.5rem" }}
          error={isError(EMAIL)}
          helperText={getErrorText(EMAIL)}
          {...formik.getFieldProps(EMAIL)}
        ></TextField>
        <Button
          sx={{ marginTop: "2rem", height: "3rem" }}
          variant="contained"
          type="submit"
        >
          SUBMIT YOUR FEE ONLINE
        </Button>
        <Button
          sx={{ marginTop: "1rem", height: "3rem" }}
          variant="contained"
          type="button"
          onClick={() => {
            setPaymentModeIsOnline(false);
            formik.handleSubmit();
          }}
        >
          SUBMIT YOUR FEE OFFLINE
        </Button>
      </form>
    </Box>
  ) : (
    <PdfDocument
      name={formik.values[FIRST_NAME] + " " + formik.values[LAST_NAME]}
      dob={formik.values[DATE_OF_BIRTH]}
      fatherName={formik.values[FATHER_NAME]}
      motherName={formik.values[MOTHER_NAME]}
      phoneNumber={formik.values[PHONENUMBER]}
      email={formik.values[EMAIL]}
      coursename={findCourseFromArray(formik.values[COURSE])}
      paymentMode={paymentId ? "ONLINE" : "OFFLINE"}
      amount={1628}
      paymentId={paymentId}
      id={internalId}
    />
  );
}

export default Page;
