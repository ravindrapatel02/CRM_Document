import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel, 
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthUser } from "../hooks/AuthHooks";
import AppNotification from "../components/AppNotification";

const CategoryInfoView = () => {
  // const [checkValue, setCheckValue] = useState(null);
  const { user } = useAuthUser();
  const [filter, setFilter] = useState([]);
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  console.log('user--->>', user);

  if (!user) {
    router.push("/");
  }

  const handleChangeAnswer = (value, name) => {
    if (name === "checkbox") {
      setIsSubmit(false);
      let changeArray = filter;
      if (changeArray.includes(value)) {
        const filterValue = changeArray.filter((ele) => ele !== value);
        setFilter(filterValue);
      } else {
        filter.push(value);
      }
    }
  };

  const handleSubmit = () => {
    setIsSubmit(true);
    if (filter.length === 0) {
      return 0;
    }
if(user.attemptSurvey==='true'){
    router.push({
      pathname: "/start-survey-test/",
      query: {
        details: filter.join(","),
      },
    });
  }else{
    AppNotification(false , "You have already attempt the survey, Please try again letter.")
  }
  };

  const optionList = [
    "Flight bookings",
    "Hotel accommodations",
    "Travel Insurance",
    "Visa assistance",
  ];

  return (
    <div className="container user-guidline">
      <div className="row">
        <div className="col-12">
          <div className="row d-flex justify-content-center">
            <div className="col-md-7 col-sm-12 mt-3 mb-3">
              <Card sx={{ p: 5 }}>
                {/* <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Have you availed the services of Satguru Travels and Tourism
                    in the last 6 months?
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    // value={value}
                    // onChange={handleChange}
                    onChange={(e) =>{
                     if( e.target.value === "Yes"){
                        setCheckValue(true);
                        setIsSubmit(false);
                     }else{
                         setCheckValue(false);
                         setIsSubmit(false);
                     }
                    }}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                  </FormControl>*/}

                <React.Fragment>
                  <FormGroup className="mt-2">
                    <FormLabel id="demo-controlled-radio-buttons-group">
                      Which specific service(s) did you utilize from Satguru
                      Travel? (Select all that apply)
                    </FormLabel>
                    {optionList.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        control={<Checkbox value={item} name={"checkbox"} />}
                        onChange={(e) => {
                          handleChangeAnswer(e.target.value, e.target.name);
                        }}
                        label={item}
                      />
                    ))}
                  </FormGroup>
                  {isSubmit && filter.length === 0 && (
                    <Typography variant="p" className="text-red" component="p">
                      Please select the option.
                    </Typography>
                  )}
                  <div className="d-flex justify-content-center mt-4">
                    <Button variant="contained" onClick={handleSubmit}>
                      Click here to attempt the Survey
                    </Button>
                  </div>
                </React.Fragment>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryInfoView;
