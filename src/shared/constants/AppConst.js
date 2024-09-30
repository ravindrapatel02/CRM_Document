export const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
];

export function isValidBase64(str) {
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
}

export const dateTimeFromate =(date)=>{
  const dateUTC = new Date(date);
  const options = { timeZone: 'Asia/Kolkata', hour12: false };
  const dateIST = dateUTC.toLocaleString('en-IN', options);
  return dateIST;
}

export const RouteMatch = (route) => {
  const routeArray = route.split("/");
  if (routeArray.length > 1) {
    const newArray = routeArray.slice(1, routeArray.length);
    return newArray;
  }
};

export const BASE_URL = "http://10.100.3.6:8762/api/"; //GMR UAT server
// export const BASE_URL = 'https://fmssurvey.gmrgroup.in/api/';  // production
// export const BASE_URL = 'http://192.168.100.57:8762/api/'; //Velocis UAT server
