import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Grid, TextField } from "@mui/material";
import AppLoader from "@components/CustomLoader";
import { departmentValidation } from "@shared/formValidation/FormValidation";
import jwtAxios from "src/services/auth";
import { API_URL } from "src/api";
import { useDispatch } from "react-redux";
import { getDepartment } from "@redux/slice/DepartmentSlice";
import AppNotification from "@components/AppNotification";

const UpdateDepartmentModal = (props) => {
  const { open, updateDetails, handleCloseModal } = props;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);

  const [initialValues, setInitialValues] = useState({
    deptName: "",
    deptCode: "",
    // spocName: "",
    // spocPernerNo: "",
    // spocEmail: "",
    id: "",
    flag: "update",
  });

  useEffect(() => {
    if (updateDetails) {
      setInitialValues({
        deptName: updateDetails.deptName,
        deptCode: updateDetails.deptCode,
        id: updateDetails.id,
        // spocName: updateDetails.spocName,
        // spocPernerNo: updateDetails.spocPernerNo,
        // spocEmail: updateDetails.spocEmail,
        flag: "update",
      });

      setLoading(false);
    }
  }, [updateDetails]);

  const handleUpdate = (reqObj) => {
    setSubmit(true);
    jwtAxios
      .post(API_URL.CREATE_DEPARTMENT, reqObj)
      .then((response) => {
        const res = response.data;
        if (res.status === "true") {
          AppNotification(
            true,
            res.message ?? "Department updated successfully !"
          );
          dispatch(getDepartment());
          setTimeout(() => {
            handleCloseModal();
          }, 3000);
        } else {
          AppNotification(false, res.message ?? "something went wrong !");
          setSubmit(false);
        }
      })
      .catch((error) => {
        AppNotification(true, error.msg ?? "Network Error !");
        setSubmit(false);
      });
  };
  return (
    <Dialog
      onClose={handleCloseModal}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Update Department
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseModal}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {!loading ? (
          <Formik
            initialValues={initialValues}
            validationSchema={departmentValidation}
            onSubmit={(values) => {
              handleUpdate(values);
            }}
          >
            {({ values, errors, setFieldValue }) => (
              <Form initialtouched={{ zip: true }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="deptName"
                      fullWidth
                      value={values.deptName}
                      placeholder="Enter department name"
                      error={errors.deptName ? true : false}
                      helperText={errors.deptName && errors.deptName}
                      onChange={(e) => {
                        setFieldValue("deptName", e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="deptCode"
                      fullWidth
                      value={values.deptCode}
                      error={errors.deptCode ? true : false}
                      helperText={errors.deptCode && errors.deptCode}
                      onChange={(e) => {
                        setFieldValue("deptCode", e.target.value);
                      }}
                      placeholder="Enter department code"
                    />
                  </Grid>

                  {/*<Grid item xs={12} md={6}>
                  <TextField
                    name="spocName"
                    fullWidth
                    value={values.spocName}
                    error={errors.spocName ? true : false}
                    helperText={errors.spocName && errors.spocName}
                    onChange={(e) => {
                      setFieldValue("spocName", e.target.value);
                    }}
                    placeholder="Enter spoc name"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField
                  name="spocPernerNo"
                  fullWidth
                  value={values.spocPernerNo}
                  error={errors.spocPernerNo ? true : false}
                  helperText={errors.spocPernerNo && errors.spocPernerNo}
                  onChange={(e) => {
                    setFieldValue("spocPernerNo", e.target.value);
                  }}
                  placeholder="Enter spoc perner no."
                />
              </Grid>
              <Grid item xs={12} md={6}>
              <TextField
                name="spocEmail"
                fullWidth
                value={values.spocEmail}
                error={errors.spocEmail ? true : false}
                helperText={errors.spocEmail && errors.spocEmail}
                onChange={(e) => {
                  setFieldValue("spocEmail", e.target.value);
                }}
                placeholder="Enter spoc email"
              />
            </Grid>*/}
                  <Grid
                    item
                    xs={12}
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Button
                      sx={{
                        position: "relative",
                        minWidth: 100,
                      }}
                      color="primary"
                      variant="contained"
                      type="submit"
                      disabled={submit}
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
      </DialogContent>
      {/*<DialogActions>
        <Button autoFocus onClick={handleCloseModal}>
          Save changes
        </Button>
      </DialogActions>*/}
    </Dialog>
  );
};

export default UpdateDepartmentModal;
