import { TextField } from "@mui/material";
import React from "react";
// import { getQuestion } from "@/src/redux/slice/QuestionSlice";
// import { Autocomplete, TextField } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import AppNotification from "../AppNotification";
// import { getCategory } from "@/src/redux/slice/CategorySlice";
// import { getCategory } from "@/src/redux/slice/CategorySlice";

const SurveyFilter = () => {
  // const dispatch = useDispatch();
  // const { data, error, loading, message } = useSelector(
  //   (state) => state.categoryData
  // );
  // const { surveyTitle, surveyLoading, surveyError, surveyMessage } =
  //   useSelector((state) => state.surveyTitle);

  // const [category, setCategory] = useState([]);
  // const [sueveyTitle, setSurveyTitle] = useState([]);

  // useEffect(() => {
  //   if (surveyTitle && surveyTitle.length > 0) {
  //     const arr = [];
  //     surveyTitle.forEach((ele) => {
  //       arr.push({
  //         label: ele.surveyTitles,
  //         value: ele.surveyTitles,
  //       });
  //     });
  //     setFilterData({ ...filterData, surveyTitle: arr[0].label });
  //     dispatch(getCategory({ surveyTitles: arr[0].label }));
  //     setSurveyTitle(arr);
  //   }
  // }, [surveyTitle]);

  // if (error !== null && !loading) {
  //   AppNotification(false, message);
  // }

  // if (data && data.length === 0 && !loading) {
  //   AppNotification(false, message);
  // }

  // useEffect(() => {
  //   if (data && data.length > 0) {
  //     const arr = [];
  //     data.forEach((ele) => {
  //       arr.push({
  //         value: ele.categories,
  //         label: ele.categories,
  //       });
  //     });
  //     setCategory(arr);

  //     const reqObj = {
  //       categories: data[0].categories,
  //     };
  //     setFilterData({
  //       surveyTitle: sueveyTitle[0]?.value,
  //       categories: data[0]?.categories,
  //     });
  //     dispatch(getQuestion(reqObj));
  //   }
  // }, [data]);

  return (
    <div className="row mb-5 justify-content-center mx-1 mx-sm-0 mr-1 mr-sm-0">
      <div className="col-12 col-md-7">
        <div className="row d-flex justify-conten-between">
          <div className="col-12 col-md-6 d-md-flex mt-0 mt-sm-0">
            <label className="d-flex align-items-center text-nowrap mr-2 fw-bold">
              Survey Title <span className="d-none d-sm-block">:</span>{" "}
            </label>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={'Survey 2023-2024'}
              label={null}
              // disabled
              color="success"
              id="outlined-size-small"
              // onChange={(e) =>
              //   handleChangeAnswer(e.target.value, "review", questionIndex)
              // }
              size="small"
            />
            {/*<Autocomplete
              disablePortal
              fullWidth
              id="combo-box-demo"
              name="surveyTitle"
              // getOptionLabel={(option) => option.label}
              value={filterData.surveyTitle}
              options={sueveyTitle ?? []}
              onChange={(e, value) => {
                setFilterData({ ...filterData, surveyTitle: value.value });
                dispatch(getCategory({surveyTitles : value.value}));
              }}
              // sx={{ width: 300 }}
              inputlabelprops={{
                shrink: true,
              }}
              inputprops={{
                maxLength: 1000,
              }}
              renderInput={(params) => <TextField {...params} label="" />}
            />*/}
          </div>
          <div className="col-12 col-md-6 d-md-flex mt-2 mt-sm-0">
            <label className="text-nowrap d-flex align-items-center mr-2 fw-bold">
              Survey Category <span className="d-none d-sm-block">:</span>{" "}
            </label>
            <TextField
            fullWidth
            multiline
            maxRows={4}
            value={'FMS Survey'}
            label={null}
            // disabled
            color="success"
            id="outlined-size-small"
            // onChange={(e) =>
            //   handleChangeAnswer(e.target.value, "review", questionIndex)
            // }
            size="small"
          />
            {/*<Autocomplete
              disablePortal
              fullWidth
              id="combo-box-demo"
              name="categories"
              value={filterData.categories}
              options={category ?? []}
              onChange={(e, value) => {
                setFilterData({ ...filterData, categories: value.value });
                dispatch(getQuestion({ categories: value.value }));
              }}
              inputlabelprops={{
                shrink: true,
              }}
              inputprops={{
                maxLength: 1000,
              }}
              renderInput={(params) => <TextField {...params} label="" />}
            />*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyFilter;
