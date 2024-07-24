import { useRouter } from "next/router";
import React from "react";
import { Button } from "react-bootstrap";
import { useAuthUser } from "../hooks/AuthHooks";

function UserGuide() {
  const router = useRouter();
  const { user } = useAuthUser();

  return (
    <div className="container user-guidline">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 text-center">
          <ins className="h3 text-primary">
            GUIDELINES FOR FILLING THE QUESTIONNAIRE
          </ins>
          <div className="text-start mt-5">
            <p>
              1) Please answer the questions as truthfully as possible; there is
              at least one correct answer, but there can be multiple correct
              answers, but you need to choose only 1. Since ethics has a degree
              of subjectivity different answers carry varying scores 0,1,2 &3.
            </p>
          </div>
          <div className="text-start mt-2">
            <p>
              2) Your scores and responses will not be shared with anyone and
              will be kept confidential.
            </p>
          </div>

          <div className="text-start mt-2">
            <p>
              3) The quiz is in the form of brief caselets based on hypothetical
              situations faced by employees in any organization. Employees have
              to give their responses based on the facts presented in the case.
              Some employee may feel that the facts presented in some of the
              cases are insufficient to arrive at a decision or that the nature
              of their response in a particular situation would be different
              from the given set of responses in the quiz program. We appreciate
              your dilemma but we request you in all such cases to make a
              decision based on the facts provided and also choose one of the
              responses from the available options which might be closest to
              your line of thinking. We hope to improve the quality of the
              caselets and the administration of the quiz as we learn from our
              experience in this regard..
            </p>
          </div>
          <div className="text-start mt-2">
            <p>
              4) The questionnaire may require not more than 20 minutes of your
              precious time. We once again thank you for sparing your precious
              time and in taking forward the initiative.
            </p>
          </div>

          <div className="text-start mt-4">
            <p>
              Your responses will help in improving the effectiveness of ethics
              program initiatives in the GMR. Thanks.
            </p>
          </div>
        </div>
      </div>
      {user && 
      <div className="col-md-12 text-center">
        <Button
          className="text-white"
          onClick={() => {
            router.push("/start-survey-test");
          }}
        >
          Click here to attempt the test
        </Button>
      </div>
        }
    </div>
  );
}

export default UserGuide;
