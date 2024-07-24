import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppNotification from "../components/AppNotification";
import Swal from "sweetalert2";
import { SubmitAnswer } from "../redux/slice/SubmitAnswer";
import { useRouter } from "next/router";
import { getQuestion } from "../redux/slice/QuestionSlice";
import { useAuthUser } from "../hooks/AuthHooks";
import { ErrorMessage, Field, Form, Formik } from "formik";

const labels = {
  0.5: "",
  0: "Not Applicable",
  1: "Poor",
  2: "Average",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

import * as yup from "yup";
// import { getOffice } from "../redux/slice/OfficeSlice";
import TextFields from "../components/TextFields";
import AppLoader from "../components/CustomLoader";
import { getLocation } from "../redux/slice/LocationSlice";
import { getEntity } from "../redux/slice/EntitySlice";
import { getSector } from "../redux/slice/SectorSlice";

const validationSchema = yup.object({
  gender: yup.string().required("Please select gender"),
  sector: yup.string().required("Please select sector"),
  entity: yup.string().required("Please enter entity"),
  location: yup.string().required("Please enter location"),
  jrl: yup.string().required("Please enter JRl"),
});

const JRLData = [
  { name: "PA/PB/M1/LA/LB/M2" },
  { name: "PC/PD/LC/LD/M3/M4" },
  { name: "PE/PF/LE/LF" },
  { name: "LG/LH/LI/LJ" },
  { name: "Trainee/GET/MT" },
  { name: "consultant" },
  { name: "Other" },
];
function SampleTest() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuthUser();

  const { questionData, error, message, loading } = useSelector(
    (state) => state.questionData
  );

  const { data } = useSelector((state) => state.locationData);
  const { sectorData } = useSelector((state) => state.sector);
  const { entityData } = useSelector((state) => state.entity);
  const [questionIndex, setQuestionIndex] = useState(0);

  if (!user) {
    router.push("/");
  }

  useEffect(() => {
    dispatch(getQuestion());
    dispatch(getLocation());
    dispatch(getSector());
  }, [dispatch]);

  const [answer, setAnswer] = useState([]);

  const [isSubmit, setIsSubmit] = useState(false);
  const [disabled, setDisabled] = useState({
    back: true,
    next: false,
  });

  if (error !== null && !loading) {
    AppNotification(false, message);
  }

  if (questionData && questionData.length === 0 && !loading) {
    AppNotification(false, message);
  } 

  useEffect(() => {
    if (questionData && questionData.length > 0) {
      var filterBy = router.query.details.split(",");
      filterBy.push("show");
      const arrar = [];
      questionData.forEach((item) => {
        if (filterBy.includes(item.serviceType)) {
          arrar.push({
            quesId: item.quesId,
            inputType: item.inputType,
            optionList: item.optionList ?? [],
            question: item.activity,
            checkboxValue: [],
            ...(item.inputType === "multiquestion" && {
              multiquestion: item.subQuesdtls,
            }),
            selectedId: false,
          });
        }
      });

      setAnswer(arrar);
      setQuestionIndex(0);
    }
  }, [questionData]);

  const backQuestion = () => {
    if (
      answer[questionIndex].rating <= 2 &&
      answer[questionIndex].review.length < 3 &&
      answer[questionIndex].selectedId
    ) {
      // setShow(true);
      return 0;
    }

    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      questionIndex === 1
        ? setDisabled({ back: true, next: false })
        : setDisabled({ back: false, next: false });
    }
  };
  const nextQuestion = () => {
    if (
      answer[questionIndex].rating <= 2 &&
      answer[questionIndex].review.length < 3 &&
      answer[questionIndex].selectedId
    ) {
      // setShow(true);
      return 0;
    }
    if (questionIndex + 1 < answer.length) {
      setQuestionIndex(questionIndex + 1);
      questionIndex + 2 === answer.length
        ? setDisabled({ back: false, next: true })
        : setDisabled({ back: false, next: false });
    }
  };

  const handleChangeAnswer = (value, name, index, name2, index2) => {
    const list = [...answer];
    if (name === "radio") {
      if (value === "No") {
        list[index]["radioValue"] = value;
        list[index]["selectedId"] = true;

        list[index + 1]["ratingValue"] = 0;
        list[index + 1]["selectedId"] = true;
        setAnswer(list);
      } else {
        list[index]["radioValue"] = value;
        list[index]["selectedId"] = true;

        // if radio value Yes

        delete list[index + 1]["ratingValue"];
        list[index + 1]["selectedId"] = false;
        setAnswer(list);
      }
      // list[index]["radioValue"] = value;
      // list[index]["selectedId"] = true;
      // setAnswer(list);
    }

    if (name === "checkboxValue") {
      // list[index][name] = value;

      let changeArray = list[index]["checkboxValue"] ?? [];
      if (changeArray.includes(value)) {
        const filterValue = changeArray.filter((ele) => ele !== value);
        list[index]["checkboxValue"] = filterValue;
        list[index]["selectedId"] = filterValue.length > 0 ? true : false;
        setAnswer(list);
      } else {
        changeArray.push(value);
        list[index]["checkboxValue"] = changeArray;
        list[index]["selectedId"] = true;
        setAnswer(list);
      }
    }
    if (name === "textValue") {
      // list[index][name] = value;
      list[index]["textValue"] = value;
      list[index]["selectedId"] = true;
      setAnswer(list);
    }
    if (name === "ratingValue") {
      // list[index][name] = value;
      list[index]["ratingValue"] = value;
      list[index]["selectedId"] = true;
      setAnswer(list);
    }
    if (name === "multiquestion") {
      if (name2 === "radio") {
        const newArray = [...list[index][name]]; // Create a new copy of the array
        let arrayObj = newArray[index2];
        newArray[index2] = { ...arrayObj, radioValue: value };
        list[index]["selectedId"] = true;
        // Update the outer array with the new inner array
        list[index][name] = newArray;
        setAnswer(list);
      }
      if (name2 === "ratingValue") {
        const newArray = [...list[index][name]]; // Create a new copy of the array
        let arrayObj = newArray[index2];
        newArray[index2] = { ...arrayObj, ratingValue: value };
        list[index]["selectedId"] = true;
        // Update the outer array with the new inner array
        list[index][name] = newArray;
        setAnswer(list);
      }
      if (name2 === "textValue") {
        const newArray = [...list[index][name]]; // Create a new copy of the array
        let arrayObj = newArray[index2];
        newArray[index2] = { ...arrayObj, textValue: value };
        list[index]["selectedId"] = true;
        // Update the outer array with the new inner array
        list[index][name] = newArray;
        setAnswer(list);
      }
      if (name2 === "checkboxValue") {
        const newArray = [...list[index][name]]; // Create a new copy of the array
        let arrayObj = newArray[index2];
        const newAyyar = newArray[index2]["checkboxValue"] ?? [];
        newAyyar.push(value);
        newArray[index2] = { ...arrayObj, checkboxValue: newAyyar };
        list[index]["selectedId"] = true;
        // // Update the outer array with the new inner array
        list[index][name] = newArray;
        setAnswer(list);
      }
    }
  };

  const handleSubmit = (values) => {
    if (
      answer[questionIndex].rating <= 2 &&
      answer[questionIndex].review.length < 3 &&
      answer[questionIndex].selectedId
    ) {
      return 0;
    }

    var isSubmit = true;
    for (var i = 0; i < answer.length; i++) {
      if (!answer[i].selectedId) {
        isSubmit = false;
      }
    }

    Swal.fire({
      title: isSubmit ? "Are you sure?" : "Please mark all the questions.",
      text: isSubmit && "Do you want to submit survey",
      icon: "warning",
      showCancelButton: isSubmit ? true : false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: isSubmit ? "Yes" : "OK",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (isSubmit) {
          setIsSubmit(true);
          const arr = [];
          answer.forEach((ele) => {
            if (ele.inputType === "radio") {
              arr.push({
                gender: values.gender,
                sector: values.sector,
                entity: values.entity,
                location: values.location,
                office: values.office,
                jrl: values.jrl,
                finalRemarks: values.finalRemarks,
                srviceType: router.query.details,
                userName: user.displayName,
                userPernNo: user.uid,
                email: user.email,
                activity: ele.question,
                inputType: ele.inputType,
                optionList: [ele.radioValue],
                quesId: ele.quesId,
              });
            }
            if (ele.inputType === "checkbox") {
              arr.push({
                gender: values.gender,
                sector: values.sector,
                entity: values.entity,
                location: values.location,
                office: values.office,
                jrl: values.jrl,
                srviceType: router.query.details,
                finalRemarks: values.finalRemarks,

                userName: user.displayName,
                userPernNo: user.uid,
                email: user.email,
                activity: ele.question,
                inputType: ele.inputType,
                optionList: ele.checkboxValue,
                quesId: ele.quesId,
              });
            }
            if (ele.inputType === "text") {
              arr.push({
                gender: values.gender,
                sector: values.sector,
                entity: values.entity,
                location: values.location,
                office: values.office,
                jrl: values.jrl,
                srviceType: router.query.details,
                finalRemarks: values.finalRemarks,

                userName: user.displayName,
                userPernNo: user.uid,
                email: user.email,
                activity: ele.question,
                inputType: ele.inputType,
                optionList: [ele.textValue],
                quesId: ele.quesId,
              });
            }
            if (ele.inputType === "rating") {
              arr.push({
                gender: values.gender,
                sector: values.sector,
                entity: values.entity,
                location: values.location,
                office: values.office,
                jrl: values.jrl,
                srviceType: router.query.details,
                finalRemarks: values.finalRemarks,

                userName: user.displayName,
                userPernNo: user.uid,
                email: user.email,
                activity: ele.question,
                inputType: ele.inputType,
                optionList: [labels[ele.ratingValue]],
                quesId: ele.quesId,
              });
            }

            if (ele.inputType === "multiquestion") {
              const subArray = [];
              ele.multiquestion.forEach((item) => {
                if (item.inputType === "radio") {
                  subArray.push({
                    subQuesId: item.subQuesId,
                    subActivity: item.subActivity,
                    inputType: item.inputType,
                    optionList: [item.radioValue],
                  });
                }
                if (item.inputType === "rating") {
                  subArray.push({
                    subQuesId: item.subQuesId,
                    subActivity: item.subActivity,
                    inputType: item.inputType,
                    optionList: [labels[item.ratingValue]],
                  });
                }
                if (item.inputType === "text") {
                  subArray.push({
                    subQuesId: item.subQuesId,
                    subActivity: item.subActivity,
                    inputType: item.inputType,
                    optionList: [item.textValue],
                  });
                }
                if (item.inputType === "checkbox") {
                  subArray.push({
                    subQuesId: item.subQuesId,
                    subActivity: item.subActivity,
                    inputType: item.inputType,
                    optionList: item.checkboxValue,
                  });
                }
              });
              arr.push({
                gender: values.gender,
                sector: values.sector,
                entity: values.entity,
                location: values.location,
                office: values.office,
                jrl: values.jrl,
                srviceType: router.query.details,
                finalRemarks: values.finalRemarks,

                userName: user.displayName,
                userPernNo: user.uid,
                email: user.email,
                activity: ele.question,
                inputType: ele.inputType,
                subQuesdtls: subArray,
                quesId: ele.quesId,
                optionList: [],
              });
            }
          });
          const { status, message } = await SubmitAnswer(arr); // submit api call

          if (status === "true") {
            AppNotification(true, message);
            setTimeout(() => {
              setIsSubmit(false);
              router.push("/");
            }, 3000);
          } else {
            AppNotification(false, message);
            setIsSubmit(false);
          }
        }
      }
    });
  };

  console.log(answer);

  return (
    <div className="test-content">
      {isSubmit && <AppLoader />}
      <div className="quizBg ">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-7">
              <div className="qBox">
                <div className="qBox-title text-nowrap">
                  Question: {questionIndex + 1}
                </div>
                {answer[questionIndex] &&
                  Object.keys(answer[questionIndex]).length > 0 && (
                    <div key={answer[questionIndex]}>
                      <div className="qBox-number">
                        {answer[questionIndex].question}
                      </div>
                      <div>
                        <TextFields
                          answer={answer[questionIndex]}
                          handleChangeAnswer={handleChangeAnswer}
                          questionIndex={questionIndex}
                          onChangeValue={answer[questionIndex].onChangeValue}
                        />
                      </div>
                      <div></div>
                    </div>
                  )}
              </div>
              <div className="text-right">
                <button
                  className="btn btn-primary w-25"
                  onClick={backQuestion}
                  disabled={disabled.back}
                >
                  Back
                </button>{" "}
                <button
                  className="btn btn-primary w-25"
                  onClick={nextQuestion}
                  disabled={disabled.next}
                >
                  Next
                </button>
              </div>
            </div>

            <div className="col-lg-4 col-md-5">
              <div className="qStatus">
                <div className="qTitle">Question Status</div>
                <ul className="d-grid">
                  {answer &&
                    answer.length > 0 &&
                    answer.map((item, index) => (
                      <li
                        key={index}
                        className={item.selectedId ? "completed" : ""}
                        onClick={() => {
                          setQuestionIndex(index);
                          questionIndex === 1
                            ? setDisabled({ back: true, next: false })
                            : setDisabled({ back: false, next: false });
                        }}
                      >
                        {index + 1}
                      </li>
                    ))}
                </ul>
              </div>

              <div className="qFBottom mb-5">
                <div className="attempted">
                  <span></span>Attempted
                </div>
                <div className="nAttempted">
                  <span></span>Not Attempted
                </div>
              </div>

              <div className="qStatus">
                <div className="qTitle">Please Enter Your Details</div>

                <Formik
                  initialValues={{
                    gender: "",
                    sector: "",
                    entity: "",
                    location: "",
                    jrl:"",
                    office: "",
                    remarks: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    handleSubmit(values);
                  }}
                >
                  {({ values, setFieldValue }) => (
                    <Form initialtouched={{ zip: true }}>
                      <div className="col-11 col-md-11 col-sm-11  mb-3 mt-3">
                        <Field
                          as="select"
                          name="gender"
                          className="form-control"
                          placeholder="Please select gender"
                          // value={values.gender}
                        >
                          <option value={""} disabled>
                            Gender{" "}
                          </option>
                          <option value={"Male"}> Male </option>
                          <option value={"Female"}>Female</option>
                        </Field>

                        <ErrorMessage name={"gender"}>
                          {(msg) => (
                            <div style={{ color: "red", textAlign: "left" }}>
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="col-11 col-md-11 col-sm-11  mb-3">
                        <Field
                          as="select"
                          name="location"
                          className="form-control"
                        >
                          <option value={""} disabled>
                            Location
                          </option>
                          {data.map((item, index) => (
                            <option value={item.locationName} key={index}>
                              {item.locationName}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name={"location"}>
                          {(msg) => (
                            <div style={{ color: "red", textAlign: "left" }}>
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="col-11 col-md-11 col-sm-11  mb-3">
                        <Field
                          as="select"
                          name="sector"
                          className="form-control"
                          onChange={(e) => {
                            setFieldValue("sector", e.target.value);
                            dispatch(getEntity({ sectorId: e.target.value }));
                          }}
                        >
                          <option value={""} disabled>
                            Sector
                          </option>
                          {sectorData.map((item, index) => (
                            <option value={item.sectorId} key={index}>
                              {item.sectorName}
                            </option>
                          ))}
                        </Field>

                        <ErrorMessage name={"sector"}>
                          {(msg) => (
                            <div style={{ color: "red", textAlign: "left" }}>
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>

                      <div className="col-11 col-md-11 col-sm-11  mb-3">
                        <Field
                          as="select"
                          name="entity"
                          className="form-control"
                          // placeholder="Please enter location"
                          onChange={(e) => {
                            setFieldValue("entity", e.target.value);
                            // dispatch(
                            //   getOffice({ locationName: e.target.value })
                            // );
                          }}
                        >
                          <option value={""} disabled>
                            Entity
                          </option>
                          {entityData.map((item, index) => (
                            <option value={item.businessName} key={index}>
                              {item.businessName}
                            </option>
                          ))}
                        </Field>

                        <ErrorMessage name={"entity"}>
                          {(msg) => (
                            <div style={{ color: "red", textAlign: "left" }}>
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="col-11 col-md-11 col-sm-11  mb-3">
                        {/*<Field
                      as="select"
                      name="jrl"
                      className="form-control"
                      
                    >
                      <option value={""} disabled>
                        JRL
                      </option>
                      {JRL.map((item, index) => (
                        <option value={item.name} key={index}>
                          {item.name}
                        </option>
                      ))}
                      </Field>*/}
                        <Field
                          as="select"
                          name="jrl"
                          className="form-control"
                          // placeholder="Please enter location"
                          // onChange={(e) => {
                          //   setFieldValue("jrl", e.target.value);
                          //   // dispatch(
                          //   //   getOffice({ locationName: e.target.value })
                          //   // );
                          // }}
                        >
                          <option value={""} disabled>
                            JRL
                          </option>
                          {JRLData.map((item, index) => (
                            <option value={item.name} key={index}>
                              {item.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name={"jrl"}>
                          {(msg) => (
                            <div style={{ color: "red", textAlign: "left" }}>
                              {msg}
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="col-11 col-md-11 col-sm-11  mb-3">
                        <Field
                          type="text"
                          as={"textarea"}
                          name="finalRemarks"
                          className="form-control"
                          placeholder="Final remarks (optional) "
                        />
                      </div>

                      <div className="col-11 col-md-11 col-sm-11  mb-3">
                        <button type="submit" className="btn btn-primary w-100">
                          Submit
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SampleTest;
