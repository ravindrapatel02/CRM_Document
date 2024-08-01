import AppSectionContainer from "@components/AppContainers/AppSectionContainer";
import AppNotification from "@components/AppNotification";
import AppSectionTitle from "@components/AppSectionTitle";
import AppLoader from "@components/CustomLoader";
import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import { getAreaOfConcern } from "@redux/slice/AreaOfConcernSlice";
import { getDepartment } from "@redux/slice/DepartmentSlice";
import { createConsernValidation } from "@shared/formValidation/FormValidation";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "src/api";
import jwtAxios from "src/services/auth";

const RegisterComplaint = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(getAreaOfConcern());
    dispatch(getDepartment());
  }, []);

  const { deptData, loading } = useSelector((state) => state.department);
  const { areaConcernData } = useSelector((state) => state.areaConcern);

  console.log(deptData);
  console.log(areaConcernData);

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
    formData.append("firstName", values.firstName);

    formData.append("lastName", values.lastName);
    // formData.append("custType", "None-GMR");
    formData.append("deptName", values.deptName);
    formData.append("complType", values.requrstType);
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
    formData.append("upldFile", values.file);

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
            router.push("/complaint-view-status");
          }, 3000);
        } else {
          AppNotification(true, res.message ?? "Something went wrong !");
        }
        console.log(response.data);
      })
      .catch((error) => {
        AppNotification(true, error.message ?? "Network Error !");
      });
  };

  return (
    <AppSectionContainer>
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
                        Last Name <span style={{ color: "#d32f2f" }}>*</span>
                      </span>
                    }
                    error={errors.lastName ? true : false}
                    helperText={errors.lastName}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                {/*<Grid item xs={12} md={6}>
              <TextField
                name="custType"
                select
                value={values.custType}
                fullWidth
                error={errors.custType}
                helperText={errors.custType}
                onChange={(e) => {
                  setFieldValue("custType", e.target.value);
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
                <MenuItem value="GMR">
                  GMR
                </MenuItem>
                <MenuItem value="Non-GMR">Non-GMR</MenuItem>
               
              </TextField>
            </Grid>*/}
                <Grid item xs={12} md={6}>
                  <TextField
                    name="deptName"
                    select
                    value={values.deptName}
                    fullWidth
                    error={errors.deptName ? true : false}
                    helperText={errors.deptName}
                    onChange={(e) => {
                      setFieldValue("deptName", e.target.value);
                    }}
                    label={
                      <span>
                        Department
                        <span style={{ color: "#d32f2f" }}>*</span>
                      </span>
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    <MenuItem disabled selected>
                      Department
                    </MenuItem>
                    {deptData &&
                      deptData.length > 0 &&
                      deptData.map((item, index) => (
                        <MenuItem
                          value={item.deptName}
                          key={index + "_" + item.id}
                        >
                          {item.deptName}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="requrstType"
                    select
                    value={values.requrstType}
                    fullWidth
                    error={errors.requrstType ? true : false}
                    helperText={errors.requrstType}
                    onChange={(e) => {
                      setFieldValue("requrstType", e.target.value);
                    }}
                    label={
                      <span>
                        Request Type
                        <span style={{ color: "#d32f2f" }}>*</span>
                      </span>
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    <MenuItem disabled selected>
                      Request Type
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
                        Feedback Type{" "}
                        <span style={{ color: "#d32f2f" }}>*</span>
                      </span>
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    <MenuItem disabled selected>
                      Feedback Type
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
                          value={item.concernType}
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

                <Grid item md={12} textAlign={"center"} mt={3}>
                  <Button
                    sx={{
                      position: "relative",
                      minWidth: 100,
                    }}
                    //   disabled={submited}
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
