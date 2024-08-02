import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import jwtAxios, { setAuthToken } from "./index";
import { useRouter } from "next/router"; 
import AppNotification from "@components/AppNotification";
import { API_URL } from "src/api";

const JWTAuthContext = createContext();
const JWTAuthActionsContext = createContext();

export const useJWTAuth = () => useContext(JWTAuthContext);
export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

const JWTAuthAuthProvider = ({ children }) => {
  const [jwtAuthData, setJWTAuthData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const router = useRouter();

  useEffect(() => {
    const getAuthUser = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      if (!token) {
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        localStorage.clear();
        return;
      }
      setAuthToken(token);
      jwtAxios
        .get("crm/user/userprofile")
        .then((res) => {
          let resData = res.data.data;
          if (resData !== null) {
            setJWTAuthData({
              user: { ...resData, role: role },
              isLoading: false,
              isAuthenticated: true,
            });
          } else {
            logout();
            localStorage.clear();
          }
        })
        .catch((error) => {
          // if (error.message === 'Request failed with status code 500') {
          logout();
          localStorage.clear();
          // }
          setJWTAuthData({
            user: undefined,
            isLoading: false,
            isAuthenticated: false,
          });
        });
    };
    getAuthUser();
  }, []);

  const userprofile = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      setJWTAuthData({
        user: undefined,
        isLoading: false,
        isAuthenticated: false,
      });
      localStorage.clear();
      return;
    }
    setAuthToken(token);
    jwtAxios
      .get("crm/user/userprofile")
      .then(
        (res) => {
          let resData = res.data;
          if (resData !== null) {
            setJWTAuthData({
              user: { ...resData, role: role },
              isLoading: false,
              isAuthenticated: true,
            });
          } else {
            logout();
            localStorage.clear();
          }
        }
        // }
      )
      .catch((error) => {
        if (error.message === "Request failed with status code 500") {
          logout();
          localStorage.clear();
        }
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
      });
  };

  const signInUser = async ({ username, password }) => {
   
    try {
      const { data } = await jwtAxios.post("auth/authenticatecrmsapp", {
        username,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      setAuthToken(data.token); 
      const res = await jwtAxios.get("crm/user/userprofile");
      let resData = res.data.data      ;
      setJWTAuthData({
        user: { ...resData, role: data.role },
        isLoading: false,
        isAuthenticated: true,
      }); 
    } catch (error) {
      AppNotification(false, error.message ?? 'UserID or Password is incorrect !!');
      setJWTAuthData({
        ...jwtAuthData,
        isAuthenticated: false,
        isLoading: false,
      }); 
    }
  };

  const signUpUser = async ({ name, email, password }) => {
    try {
      const { data } = await jwtAxios.post("users", { name, email, password });
      localStorage.setItem("token", data.token);
      setAuthToken(data.token);
      const res = await jwtAxios.get("/auth");
      setJWTAuthData({
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setJWTAuthData({
        ...jwtAuthData,
        isAuthenticated: false,
        isLoading: false,
      }); 
    }
  };

  const logout = async () => {
    localStorage.clear();
    setAuthToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
    router.push("/");
  };

  const verifyOTP =  async ({ mobileNo, otp }) => {
    
    try {
      const { data } = await jwtAxios.post("auth/authenticatecrmsapp", {
        username:mobileNo,
        otp,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      setAuthToken(data.token); 
      const res = await jwtAxios.get("crm/user/userprofile");
      let resData = res.data.data      ;
      setJWTAuthData({
        user: { ...resData, role: data.role },
        isLoading: false,
        isAuthenticated: true,
      }); 
    } catch (error) {
      AppNotification(false, error.message ?? 'UserID or Password is incorrect !!');
      setJWTAuthData({
        ...jwtAuthData,
        isAuthenticated: false,
        isLoading: false,
      }); 
    }
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...jwtAuthData,
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          signUpUser,
          signInUser,
          logout,
          userprofile,
          verifyOTP,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;

JWTAuthAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
