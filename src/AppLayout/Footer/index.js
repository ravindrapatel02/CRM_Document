import React from "react"; 
import { useAuthUser } from "src/hooks/AuthHooks";
const Footer = () => {
	const {user} = useAuthUser();
	return (
		<>
		 
		<footer className="text-center  footer-stayle">
			<div className="row w-100">
			 <div className="col-md-12 d-flex justify-content-between align-items-center">
			 <p className="copy pt-0 mb-0">©{(new Date()).getFullYear()} Copyright GMR Group. All Rights Reserved.Developed by Enterprise IT</p>
			 <p className="copy pt-0 mb-0">Login Count: {user!==null ?user?.userLoginCount :0}</p>
			 </div>
			</div>

		</footer>
</>
	);
};

export default Footer;
