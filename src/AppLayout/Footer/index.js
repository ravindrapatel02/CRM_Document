import React from "react"; 
const Footer = () => {
	return (
		<>
		{/*<footer >
		<p className="copy">©2023 Copyright GMR Group. All Rights Reserved.</p>
		 
		</footer>*/}
		<footer className="text-center  footer-stayle">
			<div className="row w-100">
			 <div className="col-md-12 d-flex justify-content-center">
			 <p className="copy pt-0 mb-0">©{(new Date()).getFullYear()} Copyright GMR Group. All Rights Reserved.Developed by Enterprise IT</p>
			 </div>
			</div>

		</footer>
</>
	);
};

export default Footer;
