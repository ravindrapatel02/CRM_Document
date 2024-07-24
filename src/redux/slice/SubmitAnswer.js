import { API_URL } from "src/api";
import jwtAxios from "src/services/auth";

 
export const SubmitAnswer = async (data) => {
  try { 
    const response = await jwtAxios.post(API_URL.SUBMIT_ANSWER, data);
    const result = response.data;
    return result;
  } catch (error) {
    return error.message
  }
};
