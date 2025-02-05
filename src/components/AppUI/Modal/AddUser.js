import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Grid, MenuItem, TextField } from "@mui/material";
import { userValidation } from "@shared/formValidation/FormValidation";
import jwtAxios from "src/services/auth";
import { API_URL } from "src/api";
import { useDispatch, useSelector } from "react-redux";
import AppNotification from "@components/AppNotification";
import { getLocation } from "@redux/slice/LocationSlice";
import { getUserList } from "@redux/slice/UserSlice";
import { getDepartment } from "@redux/slice/DepartmentSlice";

const AddUser = (props) => {
  const { open, handleCloseModal } = props;
  const { locationData } = useSelector((state) => state.location);
  const {deptData} = useSelector((state)=>state.department)
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false); 
  useEffect(() => {
    dispatch(getLocation());
    dispatch(getDepartment());
  }, []);
 
  const initialValues = {
    // userPernerNo: "",
    userName: "",
    location: "",
    userPernerNo: "",
    userMobileNo: "",
    userEmailId: "",
    managerPernNo: "",
    managerName: "",
    managerEmailId: "",
    roleName: "",
    flag: "create",
  };

  const handleUpdate = (reqObj) => {
    setSubmit(true);
    jwtAxios
      .post(API_URL.ADD_USER, reqObj)
      .then((response) => {
        const res = response.data;
        if (res.status === "true") {
          AppNotification(
            true,
            res.message ?? "Department updated successfully !"
          );
          dispatch(getUserList());
          setTimeout(() => {
            handleCloseModal();
          }, 3000);
        } else {
          AppNotification(false, res.message ?? "something went wrong !");
          setSubmit(false);
        }
      })
      .catch((error) => {
        AppNotification(false, error.msg ?? "Network Error !");
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
        Add User
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
        <Formik
          initialValues={initialValues}
          validationSchema={userValidation}
          onSubmit={(values) => {
            handleUpdate(values);
          }}
        >
          {({ values, errors, setFieldValue }) => (
            <Form initialtouched={{ zip: true }}>
              <Grid container spacing={2}>
                {/* <Grid item xs={12} md={6}>
                  <TextField
                    name="userPernerNo"
                    fullWidth
                    value={values.userPernerNo}
                    label="Enter user ID"
                    error={errors.userPernerNo ? true : false}
                    helperText={errors.userPernerNo && errors.userPernerNo}
                    onChange={(e) => {
                      setFieldValue("userPernerNo", e.target.value);
                    }}
                  />
                </Grid> */}
                <Grid item xs={12} md={6}>
                  <TextField
                    name="userName"
                    fullWidth
                    value={values.userName}
                    error={errors.userName ? true : false}
                    helperText={errors.userName && errors.userName}
                    onChange={(e) => {
                      setFieldValue("userName", e.target.value);
                    }}
                    label="Enter user name"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    name="location"
                    select
                    fullWidth
                    value={values.location}
                    error={errors.location ? true : false}
                    helperText={errors.location && errors.location}
                    onChange={(e) => {
                      setFieldValue("location", e.target.value);
                    }}
                    label={
                      <span>
                        Select Location
                        <span style={{ color: "#d32f2f" }}>*</span>
                      </span>
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    <MenuItem disabled value="">
                      Location
                    </MenuItem>
                    {locationData &&
                      locationData.map((item) => (
                        <MenuItem value={item.locationName} key={item.id}>
                          {item.locationName}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                  select
                    name="deptName"
                    fullWidth
                    value={values.deptName}
                    error={errors.deptName ? true : false}
                    helperText={errors.deptName && errors.deptName}
                    onChange={(e) => {
                      setFieldValue("deptName", e.target.value);
                    }}
                    label="Enter department name"
                    >
                    <MenuItem disabled value="">
                    Department
                  </MenuItem>
                  {deptData &&
                    deptData.map((item) => (
                      <MenuItem value={item.deptId} key={item.deptId}>
                        {item.deptName}
                      </MenuItem>
                    ))}
                </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    name="userMobileNo"
                    fullWidth
                    value={values.userMobileNo}
                    error={errors.userMobileNo ? true : false}
                    helperText={errors.userMobileNo && errors.userMobileNo}
                    onChange={(e) => {
                      setFieldValue("userMobileNo", e.target.value);
                      setFieldValue("userPernerNo", e.target.value);
                    }}
                    label="Enter mobile number"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="userEmailId"
                    fullWidth
                    value={values.userEmailId}
                    error={errors.userEmailId ? true : false}
                    helperText={errors.userEmailId && errors.userEmailId}
                    onChange={(e) => {
                      setFieldValue("userEmailId", e.target.value);
                    }}
                    label="Enter email id"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="roleName"
                    select
                    fullWidth
                    value={values.roleName}
                    error={errors.roleName ? true : false}
                    helperText={errors.roleName && errors.roleName}
                    onChange={(e) => {
                      setFieldValue("roleName", e.target.value);
                    }}
                    label={
                      <span>
                        Select role
                        <span style={{ color: "#d32f2f" }}>*</span>
                      </span>
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    <MenuItem disabled value="">
                      {" "}
                      User role{" "}
                    </MenuItem>
                    <MenuItem value={"CRM_ADMIN"}>CRM ADMIN</MenuItem>
                    <MenuItem value={"CRM_DEPT_SPOC"}> CRM DEPT SPOC</MenuItem>
                    <MenuItem value={"CRM_HOD"}>CRM HOD</MenuItem>
                  </TextField>
                </Grid>
                {/* <Grid item xs={12} md={6}>
                <TextField
                  name="managerPernNo"
                  fullWidth
                  value={values.managerPernNo}
                  error={errors.managerPernNo ? true : false}
                  helperText={errors.managerPernNo && errors.managerPernNo}
                  onChange={(e) => {
                    setFieldValue("managerPernNo", e.target.value);
                  }}
                  label="Enter manager perner no."
                />
              </Grid>
              <Grid item xs={12} md={6}>
              <TextField
                name="managerName"
                fullWidth
                value={values.managerName}
                error={errors.managerName ? true : false}
                helperText={errors.managerName && errors.managerName}
                onChange={(e) => {
                  setFieldValue("managerName", e.target.value);
                }}
                label="Enter manager name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField
              name="managerEmailId"
              fullWidth
              value={values.managerEmailId}
              error={errors.managerEmailId ? true : false}
              helperText={errors.managerEmailId && errors.managerEmailId}
              onChange={(e) => {
                setFieldValue("managerEmailId", e.target.value);
              }}
              label="Enter manager email id"
            />
          </Grid> */}
                 
                
                
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
      </DialogContent>
      {/*<DialogActions>
        <Button autoFocus onClick={handleCloseModal}>
          Save changes
        </Button>
      </DialogActions>*/}
    </Dialog>
  );
};

export default AddUser;
