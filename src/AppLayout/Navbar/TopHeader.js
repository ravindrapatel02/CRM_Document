import Link from "next/link";
import * as React from "react";
import { Avatar } from "@mui/material";
import { useAuthUser } from "src/hooks/AuthHooks";
import { TimeCountDown } from "@components/TimerCount/TimeCountDown";

const labels = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

export const TopHeader = () => {
  const { user } = useAuthUser(); 
 
  const getUserAvatar = () => {
    if (user.displayName) {
      return user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1);
    }
     
  };
  
 
  return (
    <React.Fragment>
      <div className="topBar">
        <div className="container">
          <div className="row d-flex justify-content-between">
            <div className="col-md-6 col-lg-6 col-sm-6  ">
              <div className="logo">
                <Link href="/">
                  <img src="/images/logo.png" />
                </Link>
              </div>
            </div>

            <div className="col-md-6 col-lg-6 col-sm-auto d-flex justify-content-end align-self-center">
              {!user ? (
                <ul className="list-inline text-right">
                  <li className="list-inline-item bdrNone topNavBar ">
                    <Avatar className="cursor-pointer" />
                    
                  </li>
                </ul>
              ) : (
                <ul className="list-inline text-right d-grid">
                  <li className="list-inline-item bdrNone topNavBar fw-bold">
                   {getUserAvatar()} ( {user.role[0]==="CRM_SPOC" ? 'CRM_Dept_SPOC' :user.role[0]} )
                  </li>
                  <li className="list-inline-item bdrNone topNavBar">
                    <i className="fa fa-clock-o mr-2"> <TimeCountDown/>  </i>
                    <i className="fa fa-calendar" aria-hidden="true">
                      {" "}
                      {labels[new Date().getDay()]}{" "}
                    </i>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="container topHeader">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12">
              <div className="d-flex justify-content-center text-center text-center hmiddleImg">
                <span className="show-year">Complaint Resolution & Management </span>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </React.Fragment>
  );
};
