import React from "react";
import TextTypeField from "./TextTypeField";
import RadioTypeField from "./RadioTypeField";
import CheckboxTypeField from "./CheckboxTypeField";
import RatingTypeField from "./RatingTypeField";
import MultiQuestion from "./MultiQuestion";

const TextFields = ({ answer, handleChangeAnswer, questionIndex, onChangeValue }) => {

  const { inputType } = answer;

  return (
    <React.Fragment>
      {inputType === "text" && (
        <TextTypeField
          answer={answer}
          handleChangeAnswer={handleChangeAnswer}
          questionIndex={questionIndex}
          onChangeValue={onChangeValue}
        />
      )}

      {inputType === "radio" && (
        <RadioTypeField
         answer={answer}
          handleChangeAnswer={handleChangeAnswer}
          questionIndex={questionIndex}
          // onChangeValue={onChangeValue}
        />
      )}
      {inputType === "checkbox" && (
        <CheckboxTypeField
          answer={answer}
          handleChangeAnswer={handleChangeAnswer}
          questionIndex={questionIndex}
        />
      )}
      {inputType === "rating" && (
        <RatingTypeField
          answer={answer}
          handleChangeAnswer={handleChangeAnswer}
          questionIndex={questionIndex}
        />
      )}
      {inputType ==="multiquestion" && (
        <MultiQuestion 
        answer={answer}
          handleChangeAnswer={handleChangeAnswer}
          questionIndex={questionIndex}
        />
      )}
    </React.Fragment>
  );
};

export default TextFields;
