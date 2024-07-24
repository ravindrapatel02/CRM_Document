import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import React, { useEffect } from "react";

const RadioTypeField = ({
  answer,
  handleChangeAnswer,
  questionIndex,
  multiquestion,
  subQIndex,
}) => { 

  return (
    <React.Fragment>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={answer.inputType==="radio" ? answer.radioValue??'' :''}
          name="radio-buttons-group"
        >
          {answer.optionList.map((item) => (
            <React.Fragment key={item}>
              <FormControlLabel
                value={item}
                control={<Radio 
                  sx={{
                    color: indigo[800],
                    '&.Mui-checked': {
                      color: indigo[600],
                    },
                  }}
                  />}
                label={item}
                
                onChange={(e) =>
                  handleChangeAnswer(
                    e.target.value,
                    multiquestion ? 'multiquestion' :'radio', 
                    questionIndex,
                    "radio",
                    subQIndex
                  )
                }
              />
            </React.Fragment>
          ))}
        </RadioGroup>
      </FormControl>
    </React.Fragment>
  );
};

export default RadioTypeField;
