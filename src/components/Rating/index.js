import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
// import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import { Tooltip } from "@mui/material";
// import StarOutlineIcon from '@material-ui/icons/StarOutline';

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
        // emptyIcon={<StarIcon style={{ opacity: 0.55 }}  size="large" />}
      />
      <Box className="mx-2">
        {/*  <Tooltip title="Not Applicable">
 <IconButton onClick={()=>{
       
    setValue(0) ;
    handleChangeAnswer( 0, 'ratingValue', questionIndex , subCategories)
  
}}>
    <DoNotDisturbAltIcon color={`${data.selectedId && data.ratingValue===0 ? 'primary':""}`} />
</IconButton>
</Tooltip>
*/}
      </Box>
      {value !== null && (
        <Box sx={{ ml: 2 }} className="text-nowrap">
          {labels[hover !== -1 ? hover : answer.ratingValue]}
        </Box>
      )}
    </Box>
  );
}
