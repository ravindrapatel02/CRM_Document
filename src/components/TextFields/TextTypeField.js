import { TextField } from "@mui/material";
import React from "react";

const TextTypeField = ({
  answer,
  handleChangeAnswer,
  questionIndex,
  multiquestion,
  subQIndex,
}) => {
  return (
    <React.Fragment>
      <TextField
        fullWidth
        multiline
        className={multiquestion ? 'mt-3' :""}
        label="Write your answer"
        color="success"
        value={answer.textValue}
        id="outlined-size-small" 
        onChange={(e) =>
          handleChangeAnswer(
            e.target.value,
            multiquestion ? 'multiquestion' :'textValue', 
            questionIndex,
            "textValue",
            subQIndex
          )
        }
        size="small"
      />
    </React.Fragment>
  );
};

export default TextTypeField;
