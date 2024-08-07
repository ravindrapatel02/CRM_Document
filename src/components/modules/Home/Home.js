import React from "react";

const Home = () => {
  const backgroundStyle = {
    width: '100%',
    height: '81.7vh',
    backgroundImage: 'url("./images/complaint-ghome.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return <div style={backgroundStyle}></div>;
};

export default Home;

// import { Typography } from "@mui/material";
// import Link from "next/link";
// import React from "react";

// const Home = () => {
//   return (
//     <React.Fragment>
//       <div
//         className="bannerBox"
//         style={{
//           backgroundImage: `url(./images/bannerBg.jpg)`,
//           width: "100%",
//           objectFit: "cover",
//           backgroundRepeat: "no-repeat",
//           backgroundPosition: "center",
//           position: "relative",
//           backgroundSize: "contain",
//         }}
//       >
//         {/*<div className="container">
//           <div className="row">
//             <div className="col-md-12 col-lg-12">
//               <div className="cntWrapper">
//                 <div className="content">
//                   <Typography variant="h2" className="">
//                     GMR
//                   </Typography>
//                   <h1 className="text-">Complaint Resolution & Management</h1>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-12 col-lg-12">
//               <div className="row">
//                 <div className="col-md-6 col-lg-3 col-sm-12 d-flex justify-content-center mb-3 mb-sm-0">
//                   <Link href={"/my-activity"} className="text-decoration-none">
//                     <div className="card">
//                       <div className="card-body my-activity text-center">
//                         <img src="/images/myTask.png" alt="my-task" />
//                         <Typography mt={2} fontWeight={600}>
//                           My Activity
//                         </Typography>
//                       </div>
//                     </div>
//                   </Link>
//                 </div>

//                 <div className="col-md-6 col-lg-3 col-sm-12 d-flex justify-content-center mb-3 mb-sm-0">
//                   <Link
//                     href={"/manage-master"}
//                     className="text-decoration-none"
//                   >
//                     <div className="card text-center">
//                       <div className="card-body manage-master">
//                         <img src="/images/manage-task.png" alt="my-task" />

//                         <Typography mt={2} fontWeight={600}>
//                           Master Management
//                         </Typography>
//                       </div>
//                     </div>
//                   </Link>
//                 </div>
//                 <div className="col-md-6 col-lg-3 col-sm-12 d-flex justify-content-center mb-3 mb-sm-0">
//                   <Link
//                     href={"/manage-master"}
//                     className="text-decoration-none"
//                   >
//                     <div className="card text-center">
//                       <div className="card-body dashboard">
//                         <img src="/images/dashboard.png" alt="my-task" />
//                         <Typography mt={2} fontWeight={600}>
//                           Dashboard
//                         </Typography>
//                       </div>
//                     </div>
//                   </Link>
//                 </div>

//                 <div className="col-md-6 col-lg-3 col-sm-12 d-flex justify-content-center mb-3 mb-sm-0">
//                   <Link
//                     href={"/manage-master"}
//                     className="text-decoration-none"
//                   >
//                     <div className="card ">
//                       <div className="card-body graphical-dashboard text-center">
//                         <img
//                           src="/images/graphical-dashboard.png"
//                           alt="my-task"
//                         />
//                         <Typography mt={2} fontWeight={600}>
//                           Report
//                         </Typography>
//                       </div>
//                     </div>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>*/}
//       </div>
//     </React.Fragment>
//   );
// };

// export default Home;
