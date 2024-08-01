import React, { useEffect } from "react";

const TimerCount = ({
    handleOTPSend,
    fieldValue,
  minutes,
  setMinutes,
  seconds,
  setSeconds,
}) => {
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const getresendOTP = () => {
    handleOTPSend(fieldValue);
  };

  return (
    <div> 
        {minutes === 0 && seconds === 0 ? (
          <div className="d-flex justify-content-center mt-2">
            Don not recive a code ??{" "}
            <span
              className="fw-bold text-decoration-underline mx-1"
              style={{cursor:'pointer'}}
              onClick={getresendOTP}
            >
              Resend
            </span>
          </div>
        ) : (
          <div className="fw-bold d-flex justify-content-center mt-2">
            Resend OTP in {minutes}:{seconds < 10 ? `0${seconds}` : seconds} sec{" "}
          </div>
        )}
       
    </div>
  );
};

export default TimerCount;
