import React from "react";
import RadioTypeField from "./RadioTypeField";
import TextTypeField from "./TextTypeField";
import CheckboxTypeField from "./CheckboxTypeField";
import RatingTypeField from "./RatingTypeField";
import { alphabet } from "@/src/shared/constants/AppConst";

const MultiQuestion = ({ answer, handleChangeAnswer, questionIndex }) => {
  return (
    <React.Fragment>
      {answer.multiquestion.map((fields, index) => (
        <React.Fragment key={index + fields.subActivity}>
          <div className={`${index > 0 ? "mt-4" : "no-class"}`}>
            {questionIndex+1 + "("+alphabet[index] + ") ." + fields.subActivity}
          </div>

          {fields.inputType === "text" && (
            <TextTypeField
            answer={fields}
            multiquestion={true}
            handleChangeAnswer={handleChangeAnswer}
            questionIndex={questionIndex}
            subQIndex={index}
            />
          )}

          {fields.inputType === "radio" && (
            <RadioTypeField
              answer={fields}
              multiquestion={true}
              handleChangeAnswer={handleChangeAnswer}
              questionIndex={questionIndex}
              subQIndex={index}
            />
          )}
          {fields.inputType === "checkbox" && (
            <CheckboxTypeField
            answer={fields}
            multiquestion={true}
            handleChangeAnswer={handleChangeAnswer}
            questionIndex={questionIndex}
            subQIndex={index}
            />
          )}
          {fields.inputType === "rating" && (
            <RatingTypeField
            answer={fields}
            multiquestion={true}
            handleChangeAnswer={handleChangeAnswer}
            questionIndex={questionIndex}
            subQIndex={index}
            />
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default MultiQuestion;
