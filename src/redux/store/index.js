
import { configureStore } from '@reduxjs/toolkit'; 

import DepartmentSlice from '@redux/slice/DepartmentSlice';
import AreaOfConcernSlice from '@redux/slice/AreaOfConcernSlice';
import ComplaintViewRequestSlice from '@redux/slice/ComplaintViewRequestSlice';

export const store = configureStore({
  reducer: {

    // locationData:LocationSlice, 
    // bookedData :BookedSeatSlice,
    // allSeat :allSeatSlice,
    // booking :BookingDetailsSlice,
    // questionData:QuestionSlice,
    // // office: OfficeSlice,
    // filter :FilterQuestionSlice,
    // entity:EntitySlice,
    // sector:SectorSlice
    department:DepartmentSlice,
    areaConcern : AreaOfConcernSlice,
    complaint: ComplaintViewRequestSlice,
  },
});