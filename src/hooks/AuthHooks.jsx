// ForJWT Auth
import { useJWTAuth , useJWTAuthActions} from "../services/auth/JWTAuthProvider";
import { getUserFromJwtAuth } from "../services/utility/AuthHelper";
 
export const useAuthUser = () => {
  const { 
    user, 
    isAuthenticated, isLoading } = useJWTAuth();
  return {
    isLoading,
    isAuthenticated,
    user: getUserFromJwtAuth(user),
  };
};

export const useAuthMethod = () => {
  const { signInUser, signUpUser, logout, getUserProfile , verifyOTP} = useJWTAuthActions();

  return {
    signInUser,
    logout,
    signUpUser,
    getUserProfile,
    verifyOTP,
  };
};
