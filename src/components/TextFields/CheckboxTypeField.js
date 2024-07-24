import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { indigo} from '@mui/material/colors'
import React from 'react'

const CheckboxTypeField = ({
  // answer , handleChangeAnswer , questionIndex
  answer,
  handleChangeAnswer,
  questionIndex,
  multiquestion,
  subQIndex,
}) => {
 
  return (
    <React.Fragment> 
    <FormGroup>
    {answer.optionList.map((item)=>(
      <React.Fragment key={item}>
      <FormControlLabel
      control={
        <Checkbox
        checked={answer.inputType==="checkbox"? answer?.checkboxValue?.includes(item) :''}
        // checked={gilad} onChange={handleChange} 
      value={item}
      sx={{
        color: indigo[800],
        '&.Mui-checked': {
          color: indigo[600],
        },
      }}
        name="gilad" />
      }
      onChange={(e)=>{
        handleChangeAnswer(
          e.target.value,
          multiquestion ? 'multiquestion' :'checkboxValue', 
          questionIndex,
          "checkboxValue",
          subQIndex
        )
         
      }
      }
      label={item}
    />
      </React.Fragment>
    ))}
         
        </FormGroup>
    </React.Fragment>
  )
}

export default CheckboxTypeField