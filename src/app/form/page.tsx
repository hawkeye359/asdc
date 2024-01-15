"use client";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
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
import { useRouter } from "next/navigation";
function Page() {
  const [paymentDone, setPaymentDone] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>();
  const [paymetnModeIsOnline, setPaymentModeIsOnline] = useState<boolean>(true);
  const [paymentId, setPaymentId] = useState<string>("");
  const [internalId, setInternalId] = useState<string>("");
  const [submittingOnline, setSubmittingOnline] = useState<boolean>(false);
  const [submittingOffline, setSubmittingOffline] = useState<boolean>(false);
  const matches = useMediaQuery("(max-width:600px)");
  const router = useRouter();
  const paymentHandler = function (response: RazorpaySuccessResponse) {
    console.log("razorpayResponse", response);
    setPaymentId(response.razorpay_payment_id);
    setPaymentDone(true);
    setSubmittingOnline(false);
    // alert(response.razorpay_payment_id);
    // alert(response.razorpay_order_id);
    // alert(response.razorpay_signature);
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit: async (values, actions) => {
      if (paymetnModeIsOnline) {
        setSubmittingOnline(true);
      } else {
        setSubmittingOffline(true);
      }
      const res = await submitForm(values);
      if (res.success) {
        if (!paymetnModeIsOnline) {
          setPaymentDone(true);
          setInternalId(res.data.internalId);
          return;
        }
        setInternalId(res.data.internalId);
        const orderRes = res.data;
        setAmount(orderRes.amount);
        const razorpayConfig = createRazorpayConfig(
          orderRes.key,
          orderRes.amount,
          orderRes.orderId,
          orderRes.name,
          orderRes.email,
          orderRes.contact,
          paymentHandler,
          () => {
            console.log("modal closed");
            setSubmittingOnline(false);
          }
        );
        let rzp1 = new Razorpay(razorpayConfig);
        console.log("razorpay object", rzp1);
        rzp1.postInit = () => {
          console.log("razorpay loaded");
          setSubmittingOnline(false);
        };
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
    if (typeof error === "string" && isError(name)) {
      return error;
    } else {
      return "";
    }
  }

  return !paymentDone ? (
    <Box
      sx={{
        width: "30rem",
        maxWidth: "90%",
        margin: matches ? "5rem auto" : "10rem auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        variant={matches ? "h5" : "h3"}
        component="h2"
        sx={{
          margin: "0 auto",
          color: "#36454F",
          fontWeight: matches ? 700 : 500,
        }}
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
            onBlur={(e) => {
              formik.setFieldTouched(COURSE, true);
            }}
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
          </Select>
          {isError(COURSE) && (
            <FormHelperText sx={{ color: "red" }}>
              {getErrorText(COURSE)}
            </FormHelperText>
          )}
        </FormControl>
        <Box
          sx={{
            display: "flex",
            flexDirection: matches ? "column" : "row",
            gap: matches ? "1rem" : "2rem",
            marginTop: "1rem",
          }}
        >
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

        <FormControl>
          <FormLabel
            sx={{
              marginTop: "1rem",
            }}
          >
            Date of birth
          </FormLabel>
          <DatePicker
            format="dd-MM-yyyy"
            label="Date of birth"
            sx={{ marginTop: "0.5rem" }}
            // onClose={() => {
            //   formik.setFieldTouched(DATE_OF_BIRTH, true);
            // }}
            onOpen={() => {
              formik.setFieldTouched(DATE_OF_BIRTH, true);
            }}
            onChange={(e) => {
              formik.setFieldValue(DATE_OF_BIRTH, e);
            }}
          ></DatePicker>
          {isError(DATE_OF_BIRTH) && (
            <FormHelperText sx={{ color: "red" }}>
              {getErrorText(DATE_OF_BIRTH)}
            </FormHelperText>
          )}
        </FormControl>
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
          style={{
            marginBottom: "1rem",
          }}
        ></TextField>
        <Link
          target="_blank"
          href="https://www.termsfeed.com/live/6d95aaee-db40-4c99-85a9-fa45375eebd8"
        >
          Refund Policy
        </Link>
        <Button
          sx={{ marginTop: "1rem", height: "3rem", position: "relative" }}
          variant="contained"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            router.push("/error");
          }}
          // disabled={submittingOffline || submittingOnline}
          disabled={true}
        >
          {submittingOnline && (
            <CircularProgress
              sx={{
                position: "absolute",
              }}
            />
          )}
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
          disabled={submittingOffline || submittingOnline}
        >
          {submittingOffline && (
            <CircularProgress
              sx={{
                position: "absolute",
              }}
            />
          )}
          SUBMIT YOUR FEE OFFLINE
        </Button>
      </form>
    </Box>
  ) : (
    <PdfDocument
      name={formik.values[FIRST_NAME] + " " + formik.values[LAST_NAME]}
      dob={
        formik.values[DATE_OF_BIRTH] ? formik.values[DATE_OF_BIRTH] : new Date()
      }
      fatherName={formik.values[FATHER_NAME]}
      motherName={formik.values[MOTHER_NAME]}
      phoneNumber={formik.values[PHONENUMBER]}
      email={formik.values[EMAIL]}
      //@ts-ignore
      coursename={findCourseFromArray(formik.values[COURSE])}
      paymentMode={paymentId ? "ONLINE" : "OFFLINE"}
      amount={paymentId ? (amount ? amount : 0) : 1628}
      paymentId={paymentId}
      id={internalId}
    />
  );
}

export default Page;
