export const API_URL = { 
  // CRM Document
  CREATE_REQUEST: '/crm/workflow/crmsubmitreq',
  GET_COMPLAINT_REQUEST: '/crm/workflow/custsubmitdetbypernnumb',
  CREATE_DEPARTMENT : '/crm/master/curddeptmaster',
  GET_DEPARTMENT: '/crm/master/deptmasterlist',
  GET_AREA_CONCERN_LIST: '/crm/master/concernmasterlist',
  ADD_AREA_OF_CONCERN: '/crm/master/curdconcernmaster',
  SEND_OTP: '/crm/workflow/generateotp',
  VERIFY_OTP: '/crm/workflow/validateotp',
  MY_TASK_LIST: '/crm/workflow/assigntasklistdetails',
  SPOC_LIST: '/crm/master/getmasterdropdownlist',
  GET_COMPLAINT_DETAILS: '/crm/workflow/getdetailsbycomplnumb',
  GET_USER_LIST: '/crm/master/getmasterdropdownlist',
  ASSIGN_TASK: '/crm/workflow/updateuserloghistory', // json
  UPDATE_TASK_STATUS: '/crm/workflow/crmsubmitreqspoc', // form data
  ASSIGN_TO_SPOC: '/crm/workflow/admintasklistlevelone',
  REPORTS: '/crm/workflow/generateReport',
  DASHBOARD: '/crm/workflow/dashboard',
  USER_SATISFACTION: '/crm/workflow/updatereqstatus',
  GET_PROGRESS_STATUS: '/crm/workflow/getreqstatusdetails',
  ADD_USER: '/crm/master/usersmasterdet',
  GET__MASTER_USER: '/crm/master/usersmasterList',
  GET_LOCATION: '/crm/master/locationdet',

};
 
