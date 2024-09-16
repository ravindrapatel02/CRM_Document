
import { configureStore } from '@reduxjs/toolkit'; 

import DepartmentSlice from '@redux/slice/DepartmentSlice';
import AreaOfConcernSlice from '@redux/slice/AreaOfConcernSlice';
import ComplaintViewRequestSlice from '@redux/slice/ComplaintViewRequestSlice';
import MyTaskSlice from '@redux/slice/MyTaskSlice';
import SPOCListSlice from '@redux/slice/SPOCListSlice';
import ReportsSlice from '@redux/slice/ReportsSlice';
import DashboardSlice from '@redux/slice/DashboardSlice';
import ProgressStatusSlice from '@redux/slice/ProgressStatusSlice';
import UserSlice from '@redux/slice/UserSlice';
import LocationSlice from '@redux/slice/LocationSlice';

export const store = configureStore({
  reducer: { 
    department:DepartmentSlice,
    areaConcern : AreaOfConcernSlice,
    complaint: ComplaintViewRequestSlice,
    taskList :MyTaskSlice,
    spocList: SPOCListSlice,
    reports: ReportsSlice,
    dashboard: DashboardSlice,
    progessStatus:ProgressStatusSlice,
    user: UserSlice,
    location :LocationSlice,
  },
});