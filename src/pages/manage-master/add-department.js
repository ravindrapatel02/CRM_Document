import AppSectionContainer from "@components/AppContainers/AppSectionContainer";
import AppNotification from "@components/AppNotification";
import AppSectionTitle from "@components/AppSectionTitle";
import { Box, Button, Grid, TextField } from "@mui/material";
import { departmentValidation } from "@shared/formValidation/FormValidation";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { API_URL } from "src/api";
import jwtAxios from "src/services/auth";

const AddDepartment = () => {
  const router = useRouter();
  const initialValues = {
    deptName: "",
    deptCode: "",
    flag: "create",
  };

  const handleSubmit = (reqObj) => {
    jwtAxios
      .post(API_URL.CREATE_DEPARTMENT, reqObj)
      .then((response) => {
        console.log(response);
        const res = response.data;
        if (res.status === "true") {
          AppNotification(true, res.message);
          setTimeout(()=>{
router.push('/manage-master/department');
          } ,3000);
        } else {
          AppNotification(false, res.message ?? "Sonething went wrong !");
        }
      })
      .catch((error) => {
        AppNotification(false, error.msg ?? "Network Error !");
      });
  };

  return (
    <AppSectionContainer>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <AppSectionTitle primaryText={"Add Department"} secondaryText={""} />
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={departmentValidation}
        onSubmit={(values, { setSubmitting, setTouched }) => {
          console.log(values);
          handleSubmit(values);
          setTouched({
            deptName: true,
            deptCode: true,
          });
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <Grid container spacing={2} mt={5}>
              <Grid item xs={12} md={6}>
                <TextField
                  name="deptName"
                  value={values.deptName}
                  fullWidth
                  onChange={(e) => {
                    setFieldValue("deptName", e.target.value);
                  }}
                  error={errors.deptName && touched.deptName ? true : false}
                  helperText={touched.deptName && errors.deptName}
                  label={
                    <span>
                      Department Name{" "}
                      <span style={{ color: "#d32f2f" }}>*</span>
                    </span>
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {console.log("errors-->", errors)}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="deptCode"
                  value={values.deptCode}
                  fullWidth
                  onChange={(e) => {
                    setFieldValue("deptCode", e.target.value);
                  }}
                  error={errors.deptCode && touched.deptCode ? true : false}
                  helperText={touched.deptCode && errors.deptCode}
                  label={
                    <span>
                      Short Code<span style={{ color: "#d32f2f" }}>*</span>
                    </span>
                  }
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

export default AddDepartment;
