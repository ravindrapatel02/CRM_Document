
import { configureStore } from '@reduxjs/toolkit';
import BookedSeatSlice from '../slice/BookedSeatSlice';
import allSeatSlice from '../slice/AllSeatSlice';
import LocationSlice from '../slice/LocationSlice';
import BookingDetailsSlice from '../slice/BookingDetailsSlice';
import QuestionSlice from '../slice/QuestionSlice';
// import OfficeSlice from '../slice/OfficeSlice';
import FilterQuestionSlice from '../slice/FilterQuestionSlice';
import EntitySlice from '../slice/EntitySlice';
import SectorSlice from '../slice/SectorSlice';
// import AllSeatSlice from '../slice/AllSeatSlice';
// import BookedSeatslice from '@'    

export const store = configureStore({
  reducer: {
    locationData:LocationSlice, 
    bookedData :BookedSeatSlice,
    allSeat :allSeatSlice,
    booking :BookingDetailsSlice,
    questionData:QuestionSlice,
    // office: OfficeSlice,
    filter :FilterQuestionSlice,
    entity:EntitySlice,
    sector:SectorSlice
  },
});