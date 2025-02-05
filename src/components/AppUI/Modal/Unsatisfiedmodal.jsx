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
import jwtAxios from "src/services/auth";
import { API_URL } from "src/api";
import AppNotification from "@components/AppNotification";
import { getComplaintViewRequest } from "@redux/slice/ComplaintViewRequestSlice";
import { useAuthUser } from "src/hooks/AuthHooks";

const UnsatisfiedModal = ({ open, data, handleCloseModal }) => {
    const dispatch = useDispatch();
    const {user} = useAuthUser();
    const [submit, setSubmit] = useState(true);
    const [initialValues, setInitialValues] = useState({
        remarks: "",
        compNumber:'',
        // flag: 'not-satisfied'
    });
console.log(data);

    useEffect(() => {

        if (data && open) {

            setInitialValues({
                remarks: "",
                compNumber:data.complNumb,
                // flag: 'not-satisfied'
            });
            setSubmit(false);
        }  
    }, [open]);
 
    const handleAction = (data) => {
         
        jwtAxios
          .post(API_URL.USER_UNSATISFIED, data)
          .then((response) => {
            const res = response.data;
            if (res.status === "true") {
              AppNotification(true,res.message?? "Status has been changed !");
              setTimeout(() => {
                // dispatch(getComplaintViewRequest({ custPernerNo: user?.uid }));
                 dispatch(getComplaintViewRequest({ custPernerNo: user?.uid }));
              }, 2000);
            } else {
              AppNotification(false, res.message ?? "Failed to change status !");
            }
          })
          .catch((error) => {
            AppNotification(false, error.message ?? "Nwtwork Error");
          });
      };
console.log(initialValues);

    return (
        <React.Fragment>

            <Dialog
                onClose={handleCloseModal}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle
                    sx={{ m: 0, p: 2, textAlign: "center" }}
                    id="customized-dialog-title"
                >
                    Add Remarks
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
                    {submit ? <AppLoader /> :
                        <Formik
                            initialValues={initialValues}
                            // validationSchema={sectorValidation}
                            onSubmit={async (values) => {
                                console.log('values' , values);
                                
                                handleAction(values);
                            }}
                        >
                            {({ values, errors, setFieldValue }) => (
                                <Form>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="remarks"
                                                value={values.remarks}
                                                error={Boolean(errors.remarks)}
                                                helperText={errors.remarks}
                                                fullWidth
                                                onChange={(e) => {
                                                    setFieldValue("remarks", e.target.value);
                                                }}
                                                label={
                                                    <span>
                                                        Add Remarks
                                                        <span style={{ color: "#d32f2f" }}>*</span>
                                                    </span>
                                                }
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>

                                    </Grid>

                                    <Grid item xs={12} sx={{ textAlign: "center", mt: 5 }}>
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
                                </Form>
                            )}
                        </Formik>
                    }
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default UnsatisfiedModal;
