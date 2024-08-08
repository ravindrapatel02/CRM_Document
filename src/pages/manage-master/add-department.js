import AppSectionContainer from "@components/AppContainers/AppSectionContainer";
import AppNotification from "@components/AppNotification";
import AppSectionTitle from "@components/AppSectionTitle";
import AppLoader from "@components/CustomLoader";
import { Box, Button, Grid, TextField } from "@mui/material";
import { departmentValidation } from "@shared/formValidation/FormValidation";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { API_URL } from "src/api";
import { useAuthUser } from "src/hooks/AuthHooks";
import jwtAxios from "src/services/auth";

const AddDepartment = () => {
  const router = useRouter();
  const { user } = useAuthUser();
  const [isSubmit , setIsSubmit] = useState(false);
  const initialValues = {
    deptName: "",
    deptCode: "",
    spocName:'',
    spocPernerNo:'',
    spocEmail:'',
    flag: "create",
  };

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  });

  const handleSubmit = (reqObj) => {
    setIsSubmit(true);
    jwtAxios
      .post(API_URL.CREATE_DEPARTMENT, reqObj)
      .then((response) => {
        const res = response.data;
        if (res.status === "true") {
          AppNotification(true, res.message);
          setTimeout(()=>{
router.push('/manage-master/department');
          } ,3000);
        } else {
          AppNotification(false, res.message ?? "Sonething went wrong !");
          setIsSubmit(false);
        }
      })
      .catch((error) => {
        AppNotification(false, error.msg ?? "Network Error !");
        setIsSubmit(false);
      });
  };

  return (
    <React.Fragment>
    {isSubmit && <AppLoader/>}
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
          handleSubmit(values);
          setTouched({
            deptName: true,
            deptCode: true,
            spocName:true,
    spocPernerNo:true,
    spocEmail:true,
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

              <Grid item xs={12} md={6}>
                <TextField
                  name="spocName"
                  value={values.spocName}
                  fullWidth
                  onChange={(e) => {
                    setFieldValue("spocName", e.target.value);
                  }}
                  error={errors.spocName && touched.spocName ? true : false}
                  helperText={touched.spocName && errors.spocName}
                  label={
                    <span>
                   SPOC Name<span style={{ color: "#d32f2f" }}>*</span>
                    </span>
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="spocPernerNo"
                  value={values.spocPernerNo}
                  fullWidth
                  onChange={(e) => {
                    setFieldValue("spocPernerNo", e.target.value);
                  }}
                  error={errors.spocPernerNo && touched.spocPernerNo ? true : false}
                  helperText={touched.spocPernerNo && errors.spocPernerNo}
                  label={
                    <span>
                    SPOC Perner No.<span style={{ color: "#d32f2f" }}>*</span>
                    </span>
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="spocEmail"
                  value={values.spocEmail}
                  fullWidth
                  onChange={(e) => {
                    setFieldValue("spocEmail", e.target.value);
                  }}
                  error={errors.spocEmail && touched.spocEmail ? true : false}
                  helperText={touched.spocEmail && errors.spocEmail}
                  label={
                    <span>
                    SPOC Email<span style={{ color: "#d32f2f" }}>*</span>
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
                  disabled={isSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </AppSectionContainer>
    </React.Fragment>
  );
};

export default AddDepartment;
