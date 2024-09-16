import * as yup from "yup";
// const phoneRegExp = /^\(?([6-9]{1})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{5})$/;

export const createConsernValidation = yup.object({
  firstName: yup.string().required("Please enter first name"),
  // lastName: yup.string().required("Please enter last name"),
  complType: yup.string().required("Please select request type"),
  emailId: yup.string().required("Please enter email"),
  // deptName: yup.string().required("Please select the department"),
  contactNo: yup.string().required("Please enter contact number"),
  feedbackType: yup.string().required("Please select feedback "),
  organization: yup.string().required("Please select organization "),
  feedbackTypeDate: yup.string().required("Please enter date"),
  areaConcern: yup.string().required("Please select area of concern"),
  detailsDesc: yup.string().required("Please enter description"),
  selConsent: yup.string().required("Please accept the consent"),
});

export const departmentValidation = yup.object({
  deptName: yup.string().required("Please enter department name."),
  deptCode: yup.string().required("Please enter department short name."),
  // spocName: yup.string().required("Please enter SPOC name."),
  // spocPernerNo: yup.string().required("Please enter spoc perner no."),
  // spocEmail: yup
  //   .string()
  //   .required("Please enter spoc email")
  //   .email("Please enter valid email"),
});

export const areaOfConcernValidation = yup.object({
  concernType: yup.string().required("Please enter concern type"),
  shortCode: yup.string().required("Please enter concern short code"),
});

const phoneRegExp = /^[6-9]\d{9}$/;

export const otpValidation = yup.object({
  username: yup
    .string()
    .required("Please enter email / phone")
    .test(
      "is-valid-email-or-phone",
      "Invalid email or phone number",
      (value) =>
        // Check if the value is either a valid email or a valid phone number
        yup.string().email().isValidSync(value) || phoneRegExp.test(value)
    ),
});

export const userValidation = yup.object({
  userPernerNo: yup.string().required("Please enter userID."),
  userName: yup.string().required("Please enter name."),
  location: yup.string().required("Please enter SPOC name."),
  deptName: yup.string().required("Please select depertment"),
  roleName: yup.string().required("Please select role."),
  userEmailId: yup
    .string()
    .required("Please enter spoc email")
    .email("Please enter valid email"),
  userMobileNo: yup
    .string()
    .required("Please enter phone")
    .test("is-valid-phone", "Invalid phone number", (value) =>
      // Check if the value is either a valid email or a valid phone number
      phoneRegExp.test(value)
    ),
    "managerPernNo":yup.string().required("Please enter maanager perner no."),
    "managerName": yup.string().required("Please manager name."),
    "managerEmailId":yup
    .string()
    .required("Please enter spoc email")
    .email("Please enter valid email"),
});
