import AppSectionContainer from "@components/AppContainers/AppSectionContainer";
import AppNotification from "@components/AppNotification";
import AppSectionTitle from "@components/AppSectionTitle";
import AppLoader from "@components/CustomLoader";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { getAreaOfConcern } from "@redux/slice/AreaOfConcernSlice";
import { getDepartment } from "@redux/slice/DepartmentSlice";
import { createConsernValidation } from "@shared/formValidation/FormValidation";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "src/api";
import { useAuthUser } from "src/hooks/AuthHooks";
import jwtAxios from "src/services/auth";

const RegisterComplaint = () => {
  const dispatch = useDispatch();
  const { user } = useAuthUser();
  const [submit, setSubmit] = useState(false);
  const router = useRouter();
  useEffect(() => {
    dispatch(getAreaOfConcern());
    dispatch(getDepartment());
  }, []);

  const { deptData } = useSelector((state) => state.department);
  const { areaConcernData } = useSelector((state) => state.areaConcern);

  const initialValues = {
    firstName: "",
    lastName: "",
    custType: "",
    deptName: "",
    complType: "",
    emailId: "",
    contactNo: "",
    organization: "",
    feedbackType: "",
    feedbackTypeDate: "",
    areaConcern: "",
    detailsDesc: "",
    file: "",
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    setSubmit(true);
    formData.append("firstName", values.firstName);

    formData.append("lastName", values.lastName);
    // formData.append("custType", "None-GMR");
    formData.append("deptName", values.deptName);
    formData.append("complType", values.complType);
    formData.append("emailId", values.emailId);
    formData.append("contactNo", values.contactNo);
    formData.append("crmCustComplReqdtls[0].organization", values.organization);
    formData.append("crmCustComplReqdtls[0].feedbackType", values.feedbackType);
    formData.append("crmCustComplReqdtls[0].areaConcern", values.areaConcern);
    formData.append("crmCustComplReqdtls[0].detailsDesc", values.detailsDesc);
    formData.append(
      "crmCustComplReqdtls[0].feedbackDate",
      new Date(values.feedbackTypeDate)
    );
    values.file && formData.append("crmCustComplReqdtls[0].upldFile", values.file);
    formData.append("crmCustComplReqdtls[0].selConsent", values.selConsent);

    jwtAxios
      .post(API_URL.CREATE_REQUEST, formData)
      .then((response) => {
        const res = response.data;
        if (res.status === "true") {
          AppNotification(
            true,
            res.message ?? "Complaint submitted successfully !"
          );
          setTimeout(() => {
            router.push(user !== null ? "/complaint-view-status" : '/');
          }, 3000);
        } else {
          setSubmit(false);
          AppNotification(false, res.message ?? "Something went wrong !");
        }
      })
      .catch((error) => {
        setSubmit(false);
        AppNotification(false, error.message ?? "Network Error !");
      });
  };

  return (
    <AppSectionContainer>
      {submit && <AppLoader />}
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <AppSectionTitle
          primaryText={"Customer Complaint Form"}
          secondaryText={""}
        />
      </Box>
      {deptData &&
        deptData.length > 0 &&
        areaConcernData &&
        areaConcernData.length > 0 ? (
        <Formik
          initialValues={initialValues}
          validationSchema={createConsernValidation}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ values, setFieldValue, errors }) => (
            <Form initialtouched={{ zip: true }}>
              <Grid container spacing={2} mt={5}>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="firstName"
                    value={values.firstName}
                    fullWidth
                    onChange={(e) => {
                      setFieldValue("firstName", e.target.value);
                    }}
                    error={errors.firstName ? true : false}
                    helperText={errors.firstName}
                    label={
                      <span>
                        First Name <span style={{ color: "#d32f2f" }}>*</span>
                      </span>
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="lastName"
                    value={values.lastName}
                    fullWidth
                    onChange={(e) => {
                      setFieldValue("lastName", e.target.value);
                    }}
                    label={
                      <span>
                        Last Name
                      </span>
                    }
                    error={errors.lastName ? true : false}
                    helperText={errors.lastName}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    name="complType"
                    select
                    value={values.complType}
                    fullWidth
                    error={errors.complType ? true : false}
                    helperText={errors.complType}
                    onChange={(e) => {
                      setFieldValue("complType", e.target.value);
                    }}
                    label={
                      <span>
                        Customer Type
                        <span style={{ color: "#d32f2f" }}>*</span>
                      </span>
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    <MenuItem disabled selected>
                      Customer Type
                    </MenuItem>
                    <MenuItem value="Airlines">Airlines</MenuItem>
                    <MenuItem value="Agents">Agents</MenuItem>
                    <MenuItem value="CHA">CHA</MenuItem>
                    <MenuItem value="Direct Customer">Direct Customer</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="email"
                    value={values.emailId}
                    fullWidth
                    error={errors.emailId ? true : false}
                    helperText={errors.emailId}
                    onChange={(e) => {
                      setFieldValue("emailId", e.target.value);
                    }}
                    label={
                      <span>
                        Email Id <span style={{ color: "#d32f2f" }}>*</span>
                      </span>
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    name="contactNo"
                    value={values.contactNo}
                    fullWidth
                    error={errors.contactNo ? true : false}
                    helperText={errors.contactNo}
                    onChange={(e) => {
                      setFieldValue("contactNo", e.target.value);
                    }}
                    label={
                      <span>
                        Contact No. <span style={{ color: "#d32f2f" }}>*</span>
                      </span>
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    name="organization"
                    value={values.organization}
                    fullWidth
                    error={errors.organization ? true : false}
                    helperText={errors.organization}
                    onChange={(e) => {
                      setFieldValue("organization", e.target.value);
                    }}
                    label={
                      <span>
                        Organization <span style={{ color: "#d32f2f" }}>*</span>
                      </span>
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    name="feedbackType"
                    select
                    value={values.feedbackType}
                    error={errors.feedbackType ? true : false}
                    helperText={errors.feedbackType}
                    fullWidth
                    onChange={(e) => {
                      setFieldValue("feedbackType", e.target.value);
                    }}
                    label={
                      <span>
                        Service Type
                        <span style={{ color: "#d32f2f" }}>*</span>
                      </span>
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    <MenuItem disabled selected>
                      Service Type
                    </MenuItem>
                    <MenuItem value="Domestic Outbound">
                      Domestic Outbound
                    </MenuItem>
                    <MenuItem value="Domestic Inbound">
                      Domestic Inbound
                    </MenuItem>
                    <MenuItem value="Exports">Exports</MenuItem>
                    <MenuItem value="Imports">Imports</MenuItem>
                    <MenuItem value="Courier Exports">Courier Exports</MenuItem>
                    <MenuItem value="Courier Imports">Courier Imports</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    type="date"
                    name="feedbackTypeDate"
                    value={values.feedbackTypeDate}
                    error={errors.feedbackTypeDate ? true : false}
                    helperText={errors.feedbackTypeDate}
                    fullWidth
                    onChange={(e) => {
                      setFieldValue("feedbackTypeDate", e.target.value);
                    }}
                    label={
                      <span>
                        Date <span style={{ color: "#d32f2f" }}>*</span>
                      </span>
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    name="areaConcern"
                    select
                    value={values.areaConcern}
                    error={errors.areaConcern ? true : false}
                    helperText={errors.areaConcern}
                    fullWidth
                    onChange={(e) => {
                      setFieldValue("areaConcern", e.target.value);
                    }}
                    label={
                      <span>
                        Area Of Concern
                        <span style={{ color: "#d32f2f" }}>*</span>
                      </span>
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    <MenuItem disabled selected>
                      Area of concern
                    </MenuItem>
                    {areaConcernData &&
                      areaConcernData.length > 0 &&
                      areaConcernData.map((item, index) => (
                        <MenuItem
                          value={item.shortCode}
                          key={index + "_" + item.id}
                        >
                          {item.concernType}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    name="detailsDesc"
                    value={values.detailsDesc}
                    fullWidth
                    error={errors.detailsDesc ? true : false}
                    helperText={errors.detailsDesc}
                    onChange={(e) => {
                      setFieldValue("detailsDesc", e.target.value);
                    }}
                    label={
                      <span>
                        Details descriptions{" "}
                        <span style={{ color: "#d32f2f" }}>*</span>
                      </span>
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="file"
                    name="file"
                    //   value={values.file}
                    fullWidth
                    onChange={(e) => {
                      setFieldValue("file", e.target.files[0]);
                    }}
                    label={<span>Attachments</span>}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <FormControl>
                    <RadioGroup
                      name="selConsent"
                      value={values.selConsent}
                      onChange={(e) =>
                        setFieldValue("selConsent", e.target.value)
                      }
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio />}
                        label=<div>
                          I <b>{values.firstName + values.lastName}</b>, hereby voluntarily agree that you may collect, use, process and store my “Personal Information” . I understand that the purpose of collection, usage, processing and/or storage of my Personal Information is to use it for compliance with the security procedures (such as regulated access to the office premises by issue of complaint) practiced by the Company by itself and/or through third party vendors/agencies for the overall security of its buildings, premises, installations and people. I further acknowledge and agree that my Personal Information may be shared by the Company with third party Vendors/agencies engaged by the Company in connection with the Purpose"

                        </div>
                      />
                      {errors.selConsent && errors.selConsent.length > 3 && (
                        <Typography variant="body1" style={{ color: "red" }}>
                          {" "}
                          {errors.selConsent}
                        </Typography>
                      )}
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item md={12} textAlign={"center"} mt={3}>
                  <Button
                    sx={{
                      position: "relative",
                      minWidth: 100,
                    }}
                    disabled={submit}
                    color="primary"
                    variant="contained"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      ) : (
        <AppLoader />
      )}
    </AppSectionContainer>
  );
};

export default RegisterComplaint;
