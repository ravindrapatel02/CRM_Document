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
    requrstType: "",
    email: "",
    contact: "",
    organization: "",
    sector: "",
    business: "",
    feedback: "",
    date: "",
    areaOfConcern: "",
    description: "",
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
                  name="feedback"
                  value={values.feedback}
                  error={errors.feedback}
                  helperText={errors.feedback}
                  fullWidth
                  onChange={(e) => {
                    setFieldValue("feedback", e.target.value);
                  }}
                  label={
                    <span>
                      Feedback on <span style={{ color: "#d32f2f" }}>*</span>
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
                  name="date"
                  value={values.date}
                  error={errors.date}
                  helperText={errors.date}
                  fullWidth
                  onChange={(e) => {
                    setFieldValue("date", e.target.value);
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
                  name="areaOfConcern"
                  value={values.areaOfConcern}
                  error={errors.areaOfConcern}
                  helperText={errors.areaOfConcern}
                  fullWidth
                  onChange={(e) => {
                    setFieldValue("areaOfConcern", e.target.value);
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
                  name="description"
                  value={values.description}
                  fullWidth
                  error={errors.description}
                  helperText={errors.description}
                  onChange={(e) => {
                    setFieldValue("description", e.target.value);
                  }}
                  label={
                    <span>
                      Details Description{" "}
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
