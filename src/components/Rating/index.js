import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { Tooltip } from "@mui/material";

const labels = {
  0: "Not Applicable",
  1: "Poor",
  2: "Average",
  3: "Good",
  4: "Very Good ",
  5: "Excellent",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function HoverRating({
  answer,
  handleChangeAnswer,
  questionIndex,
  multiquestion,
  subQIndex,
}) {
  const [value, setValue] = React.useState(0.5);
  const [hover, setHover] = React.useState(-1);

  React.useEffect(() => {
    if (!answer.ratingValue) {
      setValue(0.5);
    }
  }, [questionIndex]);

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
        marginBottom: 0,
      }}
    >
      <Rating
        name="ratingValue"
        value={answer?.ratingValue}
        disabled={answer?.ratingValue === 0 ? true : false}
        size="large"
        precision={1}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
          handleChangeAnswer(
            newValue,
            multiquestion ? "multiquestion" : "ratingValue",
            questionIndex,
            "ratingValue",
            subQIndex
          );
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      <Box className="mx-2">
       
      </Box>
      {value !== null && (
        <Box sx={{ ml: 2 }} className="text-nowrap">
          {labels[hover !== -1 ? hover : answer.ratingValue]}
        </Box>
      )}
    </Box>
  );
}
