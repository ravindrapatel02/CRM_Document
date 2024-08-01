import AppSectionContainer from "@components/AppContainers/AppSectionContainer";
import AppSectionTitle from "@components/AppSectionTitle";
import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import { createConsernValidation } from "@shared/formValidation/FormValidation";
import { Form, Formik } from "formik";
import React from "react";

const CreateActivity = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    custType:'',
    complType:'',
    emailId:'',
    contactNo:'',
    organization: "",
    feedbackType: "",
    feedbackTypeDate: "",
    areaConcern: "",
    detailsDesc: "",
    file: "",
  };


  return (
    <AppSectionContainer>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <AppSectionTitle
          primaryText={"Customer Complaint FORM"}
          secondaryText={""}
        />
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={createConsernValidation}
        onSubmit={(values) => {
          console.log(values);
          //    handleSubmit(values);
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
                  error={errors.firstName}
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
                  error={errors.lastName}
                  helperText={errors.lastName}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
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
            </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="requrstType"
                  select
                  value={values.email}
                  fullWidth
                  error={errors.requrstType}
                  helperText={errors.requrstType}
                  onChange={(e) => {
                    setFieldValue("requrstType", e.target.value);
                  }}
                  label={
                    <span>
                      Airlines/Agents/CHA/Direct Customer
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
                  <MenuItem value="Domestic Outbound">
                    Domestic Outbound
                  </MenuItem>
                  <MenuItem value="Domestic Inbound">Domestic Inbound</MenuItem>
                  <MenuItem value="Exports">Exports</MenuItem>
                  <MenuItem value="Imports">Imports</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="email"
                  value={values.email}
                  fullWidth
                  error={errors.email}
                  helperText={errors.email}
                  onChange={(e) => {
                    setFieldValue("email", e.target.value);
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
                  name="contact"
                  value={values.contact}
                  fullWidth
                  error={errors.contact}
                  helperText={errors.contact}
                  onChange={(e) => {
                    setFieldValue("contact", e.target.value);
                  }}
                  label={
                    <span>
                      contact No. <span style={{ color: "#d32f2f" }}>*</span>
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
                  error={errors.organization}
                  helperText={errors.organization}
                  onChange={(e) => {
                    setFieldValue("organization", e.target.value);
                  }}
                  label={
                    <span>
                      organization <span style={{ color: "#d32f2f" }}>*</span>
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
                  value={values.feedbackType}
                  error={errors.feedbackType}
                  helperText={errors.feedbackType}
                  fullWidth
                  onChange={(e) => {
                    setFieldValue("feedbackType", e.target.value);
                  }}
                  label={
                    <span>
                      feedbackType on <span style={{ color: "#d32f2f" }}>*</span>
                    </span>
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  type="date"
                  name="feedbackTypeDate"
                  value={values.feedbackTypeDate}
                  error={errors.feedbackTypeDate}
                  helperText={errors.feedbackTypeDate}
                  fullWidth
                  onChange={(e) => {
                    setFieldValue("feedbackTypeDate", e.target.value);
                  }}
                  label={
                    <span>
                      feedbackTypeDate <span style={{ color: "#d32f2f" }}>*</span>
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
                  value={values.areaConcern}
                  error={errors.areaConcern}
                  helperText={errors.areaConcern}
                  fullWidth
                  onChange={(e) => {
                    setFieldValue("areaConcern", e.target.value);
                  }}
                  label={
                    <span>
                      Area Of Concern{" "}
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
                  name="detailsDesc"
                  value={values.detailsDesc}
                  fullWidth
                  error={errors.detailsDesc}
                  helperText={errors.detailsDesc}
                  onChange={(e) => {
                    setFieldValue("detailsDesc", e.target.value);
                  }}
                  label={
                    <span>
                      Details detailsDesc{" "}
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
                  value={values.file}
                  fullWidth
                  onChange={(e) => {
                    setFieldValue("file", e.target.value);
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
    </AppSectionContainer>
  );
};

export default CreateActivity;
