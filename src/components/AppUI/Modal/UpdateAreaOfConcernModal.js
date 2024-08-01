import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import {
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AppLoader from "@components/CustomLoader";
import { areaOfConcernValidation } from "@shared/formValidation/FormValidation";
import jwtAxios from "src/services/auth";
import { API_URL } from "src/api";
import AppNotification from "@components/AppNotification";
import { getAreaOfConcern } from "@redux/slice/AreaOfConcernSlice";

const UpdateAreaOfConcernModal = ({ open, handleCloseModal, data }) => {
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    concernType: "",
    shortCode: "",
    flag: "create",
  });
  useEffect(() => {
    if (data) {
      setInitialValues({
        concernType: data.concernType,
        shortCode: data.shortCode,
        concernId: data.id,
        flag: "update",
      });
      setLoading(false);
    }
  }, [data]);

  const handleUpdate = (reqObj) => {
    setSubmit(true);
    jwtAxios
      .post(API_URL.ADD_AREA_OF_CONCERN, reqObj)
      .then((response) => {
        const res = response.data;
        if (res.status === "true") {
          AppNotification(
            true,
            res.message ?? "Department updated successfully!"
          );
          dispatch(getAreaOfConcern());
          setTimeout(() => {
            handleCloseModal();
          }, 3000);
        } else {
          AppNotification(false, res.message ?? "Something went wrong!");
          setSubmit(false);
        }
      })
      .catch((error) => {
        AppNotification(true, error.msg ?? "Network Error!");
        setSubmit(false);
      });
  };

  return (
    <Dialog
      onClose={handleCloseModal}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Update Area of Concern
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
      </DialogTitle>
      <DialogContent dividers>
        {!loading ? (
          <Formik
            initialValues={initialValues}
            validationSchema={areaOfConcernValidation}
            onSubmit={(values) => handleUpdate(values)}
          >
            {({ values, errors, setFieldValue }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="concernType"
                      fullWidth
                      value={values.concernType}
                      placeholder="Enter area of concern"
                      error={!!errors.concernType}
                      helperText={errors.concernType}
                      onChange={(e) =>
                        setFieldValue("concernType", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="shortCode"
                      fullWidth
                      value={values.shortCode}
                      placeholder="Enter short code"
                      error={!!errors.shortCode}
                      helperText={errors.shortCode}
                      onChange={(e) =>
                        setFieldValue("shortCode", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <Button
                      sx={{ position: "relative", minWidth: 100 }}
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
    </Dialog>
  );
};

export default UpdateAreaOfConcernModal;
