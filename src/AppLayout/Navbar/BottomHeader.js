import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useAuthMethod, useAuthUser } from "src/hooks/AuthHooks";
import { useRouter } from "next/router";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { otpValidation } from "@shared/formValidation/FormValidation";
import OTPInput from "react-otp-input";
import TimerCount from "@components/AppUI/TimerCount";
import AppNotification from "@components/AppNotification";
import AppLoader from "@components/CustomLoader";
import { API_URL } from "src/api";
import jwtAxios from "src/services/auth";
 
export const BottomHeader = () => {
  const route = useRouter();
  const { user } = useAuthUser();
  const [show, setShow] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const { signInUser, logout, verifyOTP } = useAuthMethod();

  const [fieldStatus, setFieldStatus] = React.useState({
    isOTP: false,
    isText: true,
    isSubmit: false,
    optError: false,
  });
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [OTP, setOTP] = React.useState("");
  const [fieldValue, setDFieldValue] = useState("");

  useEffect(() => {
    if (user) {
      setShowModal(!setShowModal);
    }
  }, [user]);

  const handleUserLogin = async (value) => {
    signInUser(value);
  };

  useEffect(() => {
    if (showModal === false) {
      setFieldStatus({
        isOTP: false,
        isText: true,
        isSubmit: false,
        optError: false,
      });
    }
  }, []);

  const handleOTPSend = (mobileNo) => {
    setMinutes(0);
    setSeconds(30);
    setFieldStatus({ ...fieldStatus, isSubmit: true });
    jwtAxios
      .post(API_URL.SEND_OTP, { mobileNo: mobileNo })
      .then((response) => {
        const res = response.data;
        if (res.status === "true") {
          AppNotification(true, res.message);
          setFieldStatus({
            ...fieldStatus,
            isText: false,
            isOTP: true,
            isSubmit: false,
          });
        } else {
          AppNotification(false, res.message ?? "Something went wrong !!");
          setFieldStatus({
            ...fieldStatus,
            isText: true,
            isOTP: false,
            isSubmit: false,
          });
        }
      })
      .catch((error) => {
        AppNotification(false, error.message ?? "Network Error !!");
        setFieldStatus({
          ...fieldStatus,
          isText: true,
          isOTP: false,
          isSubmit: false,
        });
      });
  };

  const handleOtpVerify = () => {
    setFieldStatus({ ...fieldStatus, isSubmit: true });
    const obj = {
      mobileNo: fieldValue,
      otp: OTP,
    };
    verifyOTP(obj);
    
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setShowModal(false);
    }
  };

  return (
    <header>
      <div className="container">
        <div className="navSec">
          <div className="row">
            <div className="col-md-9">
              <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                <div>
                  <button
                    className={
                      show ? "navbar-toggler collapsed" : "navbar-toggler"
                    }
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapsibleNavbar"
                    onClick={() => setShow(!show)}
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div
                    className={
                      show
                        ? "collapse navbar-collapse show"
                        : "collapse navbar-collapse"
                    }
                    id="collapsibleNavbar"
                  >
                    <ul className="navbar-nav">
                      <li
                        className={`nav-item  ${
                          route.pathname === "/" ? "routematch" : ""
                        } `}
                      >
                        <Link className="nav-link" href="/" title="Home">
                          Home
                        </Link>
                      </li>
                      <li
                        className={`nav-item dropdown ${
                          route.pathname === "/register-complaint" ||
                          route.pathname === "/complaint-view-status"
                            ? "routematch"
                            : ""
                        }`}
                      >
                        <Link
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="navbarDropdown"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Complaint
                        </Link>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdown"
                        >
                          <Link
                            className="dropdown-item"
                            href="/register-complaint"
                            title=" Register Complaint"
                          >
                            Register Complaint
                          </Link>
                          {user && user?.role[0] === "CRM_USER" && (
                            <Link
                              className="dropdown-item"
                              href="/complaint-view-status"
                              title="View Status"
                            >
                              View Status
                            </Link>
                          )}
                        </div>
                      </li>
                      {user && user.role[0] !== "CRM_USER" && (
                        <li
                          className={`nav-item  ${
                            route.pathname === "/my-activity"
                              ? "routematch"
                              : ""
                          } `}
                        >
                          <Link
                            className="nav-link"
                            href="/my-activity"
                            title="My Activity"
                          >
                            My Activity
                          </Link>
                        </li>
                      )}
                      {user && user?.role[0] === "CRM_ADMIN" && (
                        <li className="nav-item dropdown">
                          <Link
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Master Management
                          </Link>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                          >
                            <Link
                              className="dropdown-item"
                              href="/manage-master/department"
                              title="Department"
                            >
                              Department
                            </Link>
                            <Link
                              className="dropdown-item"
                              href="/manage-master/area-of-concern"
                              title="Area Of Concern"
                            >
                              Area Of Concern
                            </Link>
                          </div>
                        </li>
                      )}
                      {user && user.role[0] !== "CRM_USER" && (
                        <li
                          className={`nav-item  ${
                            route.pathname === "/user-dashboard"
                              ? "routematch"
                              : ""
                          } `}
                        >
                          <Link
                            className="nav-link"
                            href="/user-dashboard"
                            title="Dashboard"
                          >
                            Dashboard
                          </Link>
                        </li>
                      )}

                      {user && user.role[0] !== "CRM_USER" && (
                        <li
                          className={`nav-item  ${
                            route.pathname === "/reports" ? "routematch" : ""
                          } `}
                        >
                          <Link
                            className="nav-link"
                            href="/reports"
                            title="Report"
                          >
                            Report
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            <div className="col-md-3">
              <div className="text-right">
                <Link href={"/"}>
                  {user ? (
                    <button
                      className="btn uGuide-btn"
                      onClick={() => {
                        logout();
                        setFieldStatus({
                          isOTP: false,
                          isText: true,
                          isSubmit: false,
                          optError: false,
                        });
                        setOTP("");
                      }}
                    >
                      <i className="fa fa-power-off"></i>
                      <span className="mx-2">Logout</span>
                    </button>
                  ) : (
                    <button
                      className="btn uGuide-btn"
                      onClick={() => setShowModal(!showModal)}
                    >
                      <span className="mx-2">Login</span>
                    </button>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={showModal}
        onBackdropClick={() => false}
        fullWidth
        maxWidth="sm"
         
      >
        {fieldStatus.isSubmit && <AppLoader />}

        <DialogTitle
          sx={{ m: 0, p: 2, textAlign: "center" }}
          id="customized-dialog-title"
        >
          Login
          <span>
            <LockOutlinedIcon />
          </span>
          <IconButton
            aria-label="close"
            onClick={() => setShowModal(!showModal)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {fieldStatus.isText && (
            <Formik
              initialValues={{ username: "" }}
              validationSchema={otpValidation}
              onSubmit={(values) => handleOTPSend(values.username)}
            >
              {({ values, errors, setFieldValue }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        name="username"
                        fullWidth
                        value={values.username}
                        placeholder="Enter email / phone"
                        error={!!errors.username}
                        helperText={errors.username}
                        onChange={(e) => {
                          setFieldValue("username", e.target.value);
                          setDFieldValue(e.target.value);
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      <Button
                        sx={{ position: "relative", minWidth: 100 }}
                        color="primary"
                        variant="contained"
                        type="submit"
                        disabled={fieldStatus.isSubmit}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          )}
          {fieldStatus.isOTP && (
            <>
              <Grid item>
                <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                  <p className="fw-bold">Please enter OTP to verify</p>
                </Grid>
                <Grid sx={{ display: "flex", justifyContent: "center" }}>
                  <OTPInput
                    value={OTP}
                    onChange={setOTP}
                    numInputs={6}
                    inputType="tel"
                    inputStyle={{
                      height: 40,
                      width: 40,
                      border: "1px solid black",
                    }}
                    shouldAutoFocus={true}
                    renderSeparator={
                      <span style={{ textAlign: "center" }}> - </span>
                    }
                    renderInput={(props) => <input {...props} />}
                  />
                </Grid>
                <TimerCount
                  fieldValue={fieldValue}
                  handleOTPSend={handleOTPSend}
                  setSeconds={setSeconds}
                  seconds={seconds}
                  setMinutes={setMinutes}
                  minutes={minutes}
                />
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 3,
                  }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={handleOtpVerify}
                    disabled={fieldStatus.isSubmit}
                  >
                    {!fieldStatus.isSubmit ? "Verify OTP" : "Please wait..."}
                  </button>
                </Grid>
              </Grid>
            </>
          )}
        </DialogContent>
      </Dialog>
    </header>
  );
};
