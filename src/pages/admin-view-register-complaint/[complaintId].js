import AppSectionContainer from "@components/AppContainers/AppSectionContainer";
import AppNotification from "@components/AppNotification";
import AppSectionTitle from "@components/AppSectionTitle";
import AppLoader from "@components/CustomLoader";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { getSPOCList } from "@redux/slice/SPOCListSlice";
import { BASE_URL, isValidBase64 } from "@shared/constants/AppConst";
import { createConsernValidation } from "@shared/formValidation/FormValidation";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "src/api";
import { useAuthUser } from "src/hooks/AuthHooks";
import jwtAxios from "src/services/auth";
import PageNotFound from "../404";
import { getDepartment } from "@redux/slice/DepartmentSlice";

const AdminViewRegisterComplaint = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useAuthUser();
  const [submit, setSubmit] = useState(false);
  const { deptData } = useSelector((state) => state.department);
  useEffect(() => {
    if (user) {
      const obj = {
        deptname: user.deptName,
        flag: user?.role[0] === "CRM_ADMIN" ? "CRM_SPOC" : "CRM_HOD",
      };
      dispatch(getSPOCList(obj));
      dispatch(getDepartment());
    }
  }, []);
  const { complaintId } = router.query;
  const { spocData } = useSelector((state) => state.spocList);
  const [loading, setLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [userAttachements, setUserAttachements] = useState([]);
  const [upldFileListSpoc, setUpldFileListSpoc] = useState([]);

  const [initialValues, setInitialValues] = useState({
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
    statusName: "",
    newFile: null,
  });

  useEffect(() => {
    if (complaintId) {
      if (
        typeof window !== "undefined" &&
        isValidBase64(complaintId) &&
        user &&
        user?.role[0] !== "CRM_USER"
      ) {
        jwtAxios
          .post(API_URL.GET_COMPLAINT_DETAILS, {
            complNumb: window?.atob(complaintId),
          })
          .then((response) => {
            const res = response.data;
            if (res.status === "true" && user.role[0] !== "CRM_USER") {
              const userAppList = res.data.logHistoryCustIdVal;
              const userLevel = userAppList[userAppList.length - 1].userLevel;

              setUserAttachements(res.data.upldFileList);
              setUpldFileListSpoc(res.data.upldFileListSpoc);

              setInitialValues({
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                custType: res.data.custType,
                deptName: res.data.deptName,
                complType: res.data.complType,
                emailId: res.data.emailId,
                contactNo: res.data.contactNo,
                selConsent: "yes",
                organization: res.data.crmCustComplReqdtls[0].organization,
                feedbackType: res.data.crmCustComplReqdtls[0].feedbackType,
                feedbackTypeDate:
                  res.data.crmCustComplReqdtls?.[0]?.feedbackDate?.slice(0, 10),
                areaConcern: res.data.crmCustComplReqdtls[0].areaConcern,
                detailsDesc: res.data.crmCustComplReqdtls[0].detailsDesc,
                statusName: userLevel,
                newFile: null,
              });
              setLoading(false);
            } else {
              AppNotification(false, res.message);
            }
          })
          .catch((error) => {
            AppNotification(false, error.message);
          });
      } else {
        setIsNotFound(true);
      }
    }
  }, [complaintId]);

  const handleSubmit = (reqObj, level) => {
    jwtAxios
      .post(
        level === "level-1" ? API_URL.ASSIGN_TASK : API_URL.UPDATE_TASK_STATUS,
        reqObj
      )
      .then((response) => {
        const res = response.data;
        if (res.status === "true") {
          AppNotification(
            true,
            res.message ?? "Complaint frowered successfully !"
          );
          setTimeout(() => {
            router.push("/my-activity");
          }, 3000);
        } else {
          setSubmit(false);
          AppNotification(false, res.message ?? "Something went wrong !");
        }
      })
      .catch((error) => {
        AppNotification(false, error.message ?? "Network Error !");
        setSubmit(false);
      });
  };

  if (isNotFound) {
    return <PageNotFound />;
  }

  return (
    <React.Fragment>
      {submit && <AppLoader />}
      <AppSectionContainer>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <AppSectionTitle
            primaryText={"View Customer Complaint Form"}
            secondaryText={""}
          />
          <Typography>Complaint Number: {window?.atob(complaintId)}</Typography>
        </Box>
        {!loading ? (
          <Formik
            initialValues={initialValues}
            validationSchema={createConsernValidation}
            onSubmit={(values) => {
              if (
                values.status === "approve" ||
                values.status === "reject" ||
                values.status === "return"
              ) {
                const obj = {
                  complNumb: window.atob(complaintId),
                  userId: user.id,
                  flag: values.status,
                  logRemarks: values.remarks,
                };
                handleSubmit(obj, "level-1");

                return 0;
              }

              if (values.statusName === "level-1") {
                const obj = {
                  assignToUserId: values.assignToUserId,
                  complNumb: window.atob(complaintId),
                  userId: user.id,
                  flag: "submit",
                  complPriority: values.complPriority,
                };
                handleSubmit(obj, "level-1");
              } else {
                const formData = new FormData();
                formData.append("complNumb", window.atob(complaintId));
                formData.append("logRemarks", values.remarks);
                values.newFile && formData.append("upldFile", values.newFile);
                formData.append("userId", user.id);
                formData.append("flag", values.status);
                handleSubmit(formData, "ApproverLevel");
              }
            }}
          >
            {({ values, setFieldValue, errors, handleSubmit }) => (
              <Form initialtouched={{ zip: true }}>
                <Grid container spacing={2} mt={5}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="firstName"
                      value={values.firstName}
                      disabled
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
                      disabled
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
                      name="deptName"
                      value={values.deptName}
                      disabled
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
                    ></TextField>
                  </Grid>*/}
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="complType"
                      disabled
                      value={values.complType}
                      fullWidth
                      error={errors.complType ? true : false}
                      helperText={errors.complType}
                      onChange={(e) => {
                        setFieldValue("complType", e.target.value);
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
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="email"
                      value={values.emailId}
                      disabled
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
                      disabled
                      fullWidth
                      error={errors.contactNo ? true : false}
                      helperText={errors.contactNo}
                      onChange={(e) => {
                        setFieldValue("contactNo", e.target.value);
                      }}
                      label={
                        <span>
                          Contact No.{" "}
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
                      name="organization"
                      value={values.organization}
                      disabled
                      fullWidth
                      error={errors.organization ? true : false}
                      helperText={errors.organization}
                      onChange={(e) => {
                        setFieldValue("organization", e.target.value);
                      }}
                      label={
                        <span>
                          Organization{" "}
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
                      name="feedbackType"
                      value={values.feedbackType}
                      disabled
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
                    ></TextField>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      type="date"
                      name="feedbackTypeDate"
                      disabled
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
                      value={values.areaConcern}
                      disabled
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
                    ></TextField>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      name="detailsDesc"
                      value={values.detailsDesc}
                      fullWidth
                      disabled
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
                  {userAttachements && userAttachements.length > 0 && (
                    <Grid item xs={12} md={6}>
                      <Box>
                        <Typography variant="body1">
                          User Attachement
                        </Typography>
                        <a
                          href={
                            BASE_URL +
                            `/crm/workflow/displayfile?fileURL=${userAttachements[0].fileURL}`
                          }
                          target="_blank"
                        >
                          Attachement Name - ( {userAttachements[0].fileName} )
                        </a>
                      </Box>
                    </Grid>
                  )}

                 
                  {user?.role[0] === "CRM_ADMIN" &&
                    values.statusName === "level-1" && (
                      <React.Fragment>
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
                          value={item.deptCode}
                          key={index + "_" + item.id}
                        >
                          {item.deptName}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            name="assignToUserId"
                            select
                            value={values.assignToUserId}
                            error={errors.assignToUserId ? true : false}
                            helperText={errors.assignToUserId}
                            fullWidth
                            onChange={(e) => {
                              setFieldValue("assignToUserId", e.target.value);
                            }}
                            label={
                              <span>
                                Assign to user
                                <span style={{ color: "#d32f2f" }}>*</span>
                              </span>
                            }
                            InputLabelProps={{
                              shrink: true,
                            }}
                          >
                            <MenuItem disabled selected>
                              Assign to user
                            </MenuItem>
                            {spocData &&
                              spocData.length > 0 &&
                              spocData.map((item, index) => (
                                <MenuItem
                                  value={item.userId}
                                  key={index + "_" + item.userId}
                                >
                                  {item.userName}
                                </MenuItem>
                              ))}
                          </TextField>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            name="complPriority"
                            select
                            value={values.complPriority}
                            error={errors.complPriority ? true : false}
                            helperText={errors.complPriority}
                            fullWidth
                            onChange={(e) => {
                              setFieldValue("complPriority", e.target.value);
                            }}
                            label={
                              <span>
                                Complaint Priority
                                <span style={{ color: "#d32f2f" }}>*</span>
                              </span>
                            }
                            InputLabelProps={{
                              shrink: true,
                            }}
                          >
                            <MenuItem disabled selected>
                              complaint Priority
                            </MenuItem>

                            <MenuItem value={"High-24Hrs"}>
                              {" "}
                              High-24Hrs{" "}
                            </MenuItem>
                            <MenuItem value={"Moderate-48Hrs"}>
                              {" "}
                              Moderate-48Hrs{" "}
                            </MenuItem>
                            <MenuItem value={"Low-48Hrs"}> Low-48Hrs </MenuItem>
                          </TextField>
                        </Grid>

                        <Grid item md={12} textAlign={"center"} mt={3}>
                          <div>
                            <Button
                              sx={{
                                position: "relative",
                                minWidth: 100,
                              }}
                              color="primary"
                              variant="contained"
                              disabled={submit}
                              onClick={() => {
                                setFieldValue("status", "submit");
                                handleSubmit();
                                setSubmit(true);
                              }}
                            >
                              Submit
                            </Button>
                          </div>
                        </Grid>
                      </React.Fragment>
                    )}

                  {(user?.role[0] === "CRM_SPOC" ||
                    user?.role[0] === "CRM_ADMIN") &&
                    values.statusName !== "level-1" && (
                      <React.Fragment>
                        <Grid item xs={12} md={6}>
                          <TextField
                            name="remarks"
                            multiline
                            value={values.remarks}
                            error={errors.remarks ? true : false}
                            helperText={errors.remarks}
                            fullWidth
                            onChange={(e) => {
                              setFieldValue("remarks", e.target.value);
                            }}
                            label={<span>Remarks</span>}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          ></TextField>
                        </Grid>
                        {user?.role[0] === "CRM_SPOC" && (
                          <Grid item xs={12} md={6}>
                            <TextField
                              type="file"
                              name="newFile"
                              fullWidth
                              onChange={(e) => {
                                setFieldValue("newFile", e.target.files[0]);
                              }}
                              label={<span>Attachments</span>}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </Grid>
                        )}
                        {upldFileListSpoc && upldFileListSpoc.length > 0 && (
                          <Grid item xs={12} md={6}>
                            <Box>
                              <Typography variant="body1">
                                SPOC Attachement
                              </Typography>
                              <a
                                href={
                                  BASE_URL +
                                  `/crm/workflow/displayfile?fileURL=${upldFileListSpoc[0].fileURL}`
                                }
                                target="_blank"
                              >
                                Attachement Name - ( {upldFileListSpoc[0].fileName} )
                              </a>
                            </Box>
                          </Grid>
                        )}
                        <Grid item md={12} textAlign={"center"} mt={3}>
                          <div>
                            <Button
                              sx={{
                                position: "relative",
                                minWidth: 100,
                              }}
                              color="primary"
                              variant="contained"
                              disabled={submit}
                              onClick={() => {
                                setFieldValue(
                                  "status",
                                  user?.role[0] === "CRM_ADMIN"
                                    ? "approve"
                                    : "submit"
                                );
                                handleSubmit();
                                setSubmit(true);
                              }}
                            >
                              {user?.role[0] === "CRM_ADMIN"
                                ? "Approve"
                                : "Submit"}
                            </Button>
                            {user?.role[0] === "CRM_ADMIN" && (
                              <React.Fragment>
                                <Button
                                  sx={{
                                    position: "relative",
                                    minWidth: 100,
                                    ml: 3,
                                  }}
                                  color="secondary"
                                  variant="outlined"
                                  disabled={submit}
                                  onClick={() => {
                                    setFieldValue("status", "reject");
                                    handleSubmit();
                                    setSubmit(true);
                                  }}
                                >
                                  Reject
                                </Button>
                                <Button
                                  sx={{
                                    position: "relative",
                                    minWidth: 100,
                                    ml: 3,
                                  }}
                                  color="info"
                                  variant="outlined"
                                  disabled={submit}
                                  onClick={() => {
                                    setFieldValue("status", "return");
                                    handleSubmit();
                                    setSubmit(true);
                                  }}
                                >
                                  Return
                                </Button>
                              </React.Fragment>
                            )}
                          </div>
                        </Grid>
                      </React.Fragment>
                    )}

                    

                  {user?.role[0] === "CRM_HOD" && (
                    <React.Fragment>
                      <Grid item xs={12} md={6}>
                        <TextField
                          name="remarks"
                          multiline
                          value={values.remarks}
                          error={errors.remarks ? true : false}
                          helperText={errors.remarks}
                          fullWidth
                          onChange={(e) => {
                            setFieldValue("remarks", e.target.value);
                          }}
                          label={<span>Remarks</span>}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        ></TextField>
                      </Grid>
                      <Grid item md={12} textAlign={"center"} mt={3}>
                        <div>
                          <Button
                            sx={{
                              position: "relative",
                              minWidth: 100,
                              ml: 3,
                            }}
                            disabled={submit}
                            color="info"
                            variant="outlined"
                            onClick={() => {
                              setFieldValue("status", "approve");
                              handleSubmit();
                              setSubmit(true);
                            }}
                          >
                            Approve
                          </Button>
                          <Button
                            sx={{
                              position: "relative",
                              minWidth: 100,
                              ml: 3,
                            }}
                            color="warning"
                            variant="outlined"
                            disabled={submit}
                            onClick={() => {
                              setFieldValue("status", "return");
                              handleSubmit();
                              setSubmit(true);
                            }}
                          >
                            Return
                          </Button>
                        </div>
                      </Grid>
                      
                    </React.Fragment>
                  )}
                </Grid>
              </Form>
            )}
          </Formik>
        ) : (
          <AppLoader />
        )}
      </AppSectionContainer>
    </React.Fragment>
  );
};

export default AdminViewRegisterComplaint;
