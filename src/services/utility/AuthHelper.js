export const getUserFromJwtAuth = (user) => {   
    if (user)
      return {
        id: user.userId,
        uid: user.userCode,
        displayName: user.userName,
        email: user.emailId ? user.emailId : '',
        photoURL: user?.avatar ? user.avatar : '',
        role: [user.role], 
        userLoginCount:user.userLoginCount,
        contactNo:user.contactNo,
        address:user.address,
        attemptSurvey:user.attemptSurvey,
        deptName:user.deptName,
      };
    return user;
  };