
import { 
  useAuthMethod,
   useAuthUser } from "../../hooks/AuthHooks";

import { Modal } from "react-bootstrap";
import { ErrorMessage, Form, Formik, Field } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const validationSchema = yup.object({
  username: yup.string().required("Please enter username"),
  password: yup.string().required("Please enter password"),
});

const UserLogin = () => {
  const router = useRouter()
  const { signInUser } = useAuthMethod();
  const  user  = useAuthUser();

  const handleUserLogin = async (value) => {
    signInUser(value);
  };
  const [show, setShow] = useState(false);

  useEffect(() => {
    user && setShow(false);
  }, [user]);

  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);
  const initialValues = {
    username: "",
    password: "",
  };

  const handleClick = ()=>{
    if(user.attemptSurvey ==='false'){
      Swal.fire({
        title: "You have been already attempted the survey.",
        // text: "",
        icon: "error",
        showCancelButton: false,
        cancelButtonColor: "#d33",
        confirmButtonColor:"#16487b",
        confirmButtonText: "Okay"
      }).then(function () {
        // Redirect the user
        router.push('/')
      });
    }else{
      router.push('/start-survey-test');
    }
  }

  // const clickForSSOLogin = () =>{
	// 	window.location.replace(
	// 		'https://login.microsoftonline.com/c1d2e768-4a59-4122-8bba-91643841b807/oauth2/v2.0/authorize?response_type=code&client_id=ad2278d2-8546-4f49-b7e3-f110747950c4&state=12350&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default&redirect_uri=https%3A%2F%2Ffmssurvey.gmrgroup.in%2F',
	// 	  );
	// };
 
  return (
    <>
      {user ? (
        <div className="mt-4">
      
         
      <Link href="/start-survey-test" className="flash login-message">
          Click here to start the Test
      </Link> 
        </div>
      ) : (
        <span className="login-message">
          {" "}
          <ins className="flash " onClick={modalShow}>
            Please click here for Login{" "}
          </ins>{" "}
        </span>
      )}
      
      <Modal show={show} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleUserLogin(values);
            }}
          >
            {( ) => (
              <Form initialtouched={{ zip: true }}>
                <div className="form-div mb-3">
                  <Field
                    name="username"
                    className="form-control border-none"
                    placeholder="User Name"
                    // variant={
                    //           errors.username && touched.username ? "error" : "focus"
                    //         }
                  />
                  <ErrorMessage name={"username"}>
                    {(msg) => (
                      <div style={{ color: "red", textAlign: "left" }}>
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="form-div mb-3">
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                  />

                  <ErrorMessage name={"password"}>
                    {(msg) => (
                      <div style={{ color: "red", textAlign: "left" }}>
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="form-div">
                  <button type="submit" className="btn btn-primary w-100">
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
                    </Modal> 
    </>
  );
};

export default UserLogin;
 