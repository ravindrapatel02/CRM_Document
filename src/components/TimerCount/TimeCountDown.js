import React from 'react'

export const TimeCountDown = () => {
  const [time, setTime] = React.useState(""); 

  function formatAMPM() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var second = date.getSeconds();
    var ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    second = second < 10 ? `0${second}` : second;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = +hours + ":" + minutes + ":" + second + " " + ampm;
    setTime(strTime);
  }

  setInterval(formatAMPM);
  return time;
}
