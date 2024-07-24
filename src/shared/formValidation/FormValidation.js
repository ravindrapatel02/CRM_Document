import * as yup from 'yup';
// const phoneRegExp = /^\(?([6-9]{1})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{5})$/;

export const createConsernValidation = yup.object({
  firstName: yup.string().required('Please enter first name'),
  lastName: yup.string().required('Please enter last name'),
  requrstType: yup.string().required('Please select request type'),
  email: yup.string().required('Please enter email'),
  contact: yup.string().required('Please enter contact number'),
  sector: yup.string().required('Please select sector'),
  business: yup.string().required('Please select business'),
  feedback: yup.string().required('Please select feedback '),
  organization:yup.string().required('Please select organization '),
  date: yup.string().required('Please enter date'),
  areaOfConcern: yup.string().required('Please enter area of concern'),
  description: yup.string().required('Please enter description'),
});
  