import React from "react";
import HoverRating from "../Rating";

const RatingTypeField = ({
  answer,
  handleChangeAnswer,
  questionIndex,
  multiquestion,
  subQIndex,
}) => {
  return (
    <React.Fragment>
      <HoverRating
        answer={answer}
        multiquestion={multiquestion}
        handleChangeAnswer={handleChangeAnswer}
        questionIndex={questionIndex}
        subQIndex={subQIndex}
      />
    </React.Fragment>
  );
};

export default RatingTypeField;
