import AppSectionContainer from '@components/AppContainers/AppSectionContainer';
import AppSectionTitle from '@components/AppSectionTitle';
import { Box, Button, Grid, TextField } from '@mui/material';
import { areaOfConcernValidation } from '@shared/formValidation/FormValidation';
import { Form, Formik } from 'formik';
import React from 'react'

const AddAreaofConcern = () =>{
    const initialValues = {
        concernType:'',
         concernCode:'',
      };

    
      const handleSubmit =(reqObj)=>{
        jwtAxios.post('add-department' , reqObj).then((response)=>{
            // console.log('response' , response.data);
        }).catch((error)=>{
            console.log('error==>>' , error);
        });
    };

    useEffect(() => {
      if (!user) {
        router.push("/");
      }
    } ,[]);
    
  return (
    <AppSectionContainer>
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <AppSectionTitle
        primaryText={"Add Concern"}
        secondaryText={""}
      />
    </Box>

    <Formik
      initialValues={initialValues}
      validationSchema={areaOfConcernValidation}
      onSubmit={(values) => {
           handleSubmit(values);
      }}
    >
      {({ values, setFieldValue, errors }) => (
        <Form initialtouched={{ zip: true }}>
          <Grid container spacing={2} mt={5}>
            <Grid item xs={12} md={6}>
              <TextField
                name="concernType"
                value={values.concernType }
                fullWidth
                onChange={(e) => {
                  setFieldValue("concernType", e.target.value);
                }}
                error={errors.concernType ? true :false}
                helperText={errors.concernType}
                label={
                  <span>
                  Concern Type <span style={{ color: "#d32f2f" }}>*</span>
                  </span>
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField
              name="concernCode"
              value={values.concernCode }
              fullWidth
              onChange={(e) => {
                setFieldValue("concernCode", e.target.value);
              }}
              error={errors.concernCode ? true :false}
              helperText={errors.concernCode}
              label={
                <span>
                Concern Code<span style={{ color: "#d32f2f" }}>*</span>
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
  )
}

export default AddAreaofConcern