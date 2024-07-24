import Link from "next/link";
import React, { useEffect } from "react";

import { Modal } from "react-bootstrap";
import { ErrorMessage, Form, Formik, Field } from "formik";
import * as yup from "yup";
import { useAuthMethod, useAuthUser } from "src/hooks/AuthHooks";

const validationSchema = yup.object({
  username: yup.string().required("Please enter username"),
  password: yup.string().required("Please enter password"),
});

export const BottomHeader = () => {
  const { user } = useAuthUser();
  const [show, setShow] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const { signInUser, logout } = useAuthMethod();
  const initialValues = {
    username: "",
    password: "",
  };

  useEffect(() => {
    if (user) {
      setShowModal(!setShowModal);
    }
  }, [user]);
  const handleUserLogin = async (value) => {
    signInUser(value);
  };

  return (
    <header>
      <div className="container">
        <div className="navSec">
          <div className="row">
            <div className="col-md-9">
              <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                <div>
                  <button
                    className={
                      show ? "navbar-toggler collapsed" : "navbar-toggler"
                    }
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapsibleNavbar"
                    onClick={() => setShow(!show)}
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div
                    className={
                      show
                        ? "collapse navbar-collapse show"
                        : `collapse navbar-collapse`
                    }
                    id="collapsibleNavbar"
                  >
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Link className="nav-link" href="/" title="Home">
                          Home
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" href="/my-activity" title="Home">
                          My Activity
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" href="/" title="Home">
                            Master Management
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" href="/" title="Home">
                          Dashboard
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" href="/" title="Home">
                         Report
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            <div className="col-md-3">
              <div className="text-right">
                <Link href={""}>
                  {user ? (
                    <button className="btn uGuide-btn" onClick={logout}>
                      <i className="fa fa-power-off"></i>
                      <span className="mx-2">Logout</span>
                    </button>
                  ) : (
                    <button
                      className="btn uGuide-btn"
                      onClick={() => setShowModal(!showModal)}
                    >
                      <span className="mx-2">Login</span>
                    </button>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(!showModal)}>
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
            {() => (
              <Form initialtouched={{ zip: true }}>
                <div className="form-div mb-3">
                  <Field
                    name="username"
                    className="form-control border-none"
                    placeholder="User Name"
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
    </header>
  );
};
