

import React, { useState, useEffect, Fragment } from "react";
import Box from "@mui/material/Box";
import { getProgressStatus } from "@redux/slice/ProgressStatusSlice";
import { useDispatch, useSelector } from "react-redux";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import AppLoader from "@components/CustomLoader";
import { Typography } from "@mui/material";
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { useRouter } from "next/router";


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({

    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 105,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: '#f2a718'
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: '#3ad99f',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));
  
  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    ...(ownerState.active && {
      // backgroundColor: '#f2a718'
    }),
    // ...(ownerState.completed && {
    //   backgroundColor: '#3ad99f'
    // }),
    // ...(ownerState.error && {
    //   backgroundColor: '#f44336'
    // }),
  }));
  function ColorlibStepIcon(props) {
    const { active, completed, error, className } = props;
    console.log('color===>>' , active, completed, error, className)
    return (
      <ColorlibStepIconRoot ownerState={{ completed, active, error }} className={className}>
        {error === 'REJECTED' ? <ErrorOutlineOutlinedIcon /> : error === 'RETURNED' ? <MdOutlineBackHand style={{ fontSize: '22' }} /> : (active ? <HistoryOutlinedIcon /> : (completed ? <TaskAltOutlinedIcon /> : <HourglassEmptyOutlinedIcon />))}
      </ColorlibStepIconRoot>
    );
  }


export default function ApprovalTimeline() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { complaintId } = router.query;
  const { progressData } = useSelector((state) => state.progessStatus);
  useEffect(() => {
    dispatch(getProgressStatus({ id: window?.atob(complaintId) }));
  }, []);

  const [rejectedStep, setRejectedStep] = useState(null);
  const [returnedStep, setReturnedStep] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedStep, setSelectedStep] = useState(0);
 

  useEffect(() => {
    let approvedByEveryone = progressData.every(el => el.status === "approved");

    let rejectedIndex = progressData.findIndex(el => el.status === "rejected");

    let returnedIndex = progressData.findIndex(el => el.status === "returned");

    let pendingIndex = progressData.findIndex(el => el.status === "pending");


    // ALL STEPS APPROVED
    if (approvedByEveryone) {
      let approvedIndex = progressData.length;
      setActiveStep(approvedIndex);
      setSelectedStep(approvedIndex - 1);
      setRejectedStep(null);
      setReturnedStep(null);
      // setPendingWithUserId([]);
    }

    // REJECTED
    if (rejectedIndex !== -1) {
      setActiveStep(rejectedIndex);
      setSelectedStep(rejectedIndex);
      setRejectedStep(rejectedIndex);
      setReturnedStep(null);
      // setPendingWithUserId([]);
    }

    // RETURNED
    if (returnedIndex !== -1) {
      setActiveStep(returnedIndex);
      setSelectedStep(returnedIndex);
      setRejectedStep(null);
      setReturnedStep(returnedIndex);
      // setPendingWithUserId([]);
    }

    if (pendingIndex !== -1) {
      setActiveStep(pendingIndex);
      setSelectedStep(pendingIndex);
      setRejectedStep(null);
      setReturnedStep(null);
      // let pendingIds = steps[pendingIndex].approvers.map(el => el.approverId);
      // setPendingWithUserId(pendingIds);
    }
  }, [progressData]);



  return (
    <Box
      sx={{
        pb: 4,
        ".MuiStepper-root": {
          alignItems: "stretch",
        },
      }}
    >
    {progressData.length > 0 ? <>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />} sx={{
          overflow: "auto",
          ".MuiStep-root": {
            p: 4,
            pb: 8,
            minWidth: "160px",
          },
          ".MuiStep-root.Mui-selected": {
            backgroundColor: (theme) => theme.palette.background.default,
            borderRadius: '4px 4px 0 0'
          },


          // COMPLETED
          ".MuiStep-root.Mui-completed .MuiStepLabel-iconContainer > div": {
            background: '#3ad99f'
          },
          ".MuiStep-root.Mui-completed": {
            cursor: 'pointer',
          },

          // ACTIVE
          ".MuiStep-root.Mui-active .MuiStepLabel-iconContainer > div": {
            background: '#f2a718'
          },
          ".MuiStep-root.Mui-active": {
            cursor: 'pointer'
          },

          // REJECTED
          ".MuiStep-root.Mui-rejected .MuiStepLabel-iconContainer > div": {
            background: '#f44336'
          },
          ".MuiStep-root.Mui-rejected .MuiStepConnector-line": {
            background: '#f44336'
          },

          // RETURNED
          ".MuiStep-root.Mui-returned .MuiStepLabel-iconContainer > div": {
            background: '#3696e1'
          },
          ".MuiStep-root.Mui-returned .MuiStepConnector-line": {
            background: '#3696e1'
          },
          ".MuiStep-root.Mui-returned .MuiStepLabel-labelContainer .MuiStepLabel-label ": {
            color: '#3696e1'
          },
        }}>
          {progressData.map((label, index) => {
            const labelProps = {};
            if (rejectedStep === index) {
              labelProps.error = 'REJECTED';
            }
            if (returnedStep === index) {
              labelProps.error = 'RETURNED';
            }
            return (
              <Step
                key={label.apprLevel}
                // completed={index}
                completed={label.status ==='created' || label.status ==='approved' || label.status==='forward'}
                className={`${activeStep === index ? 'Mui-active' : ''} ${selectedStep === index ? 'Mui-selected' : ''} ${rejectedStep === index ? "Mui-rejected" : ''} ${returnedStep === index ? "Mui-returned" : ''} text-center`}
              >
                <Typography component="h2" sx={{ fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap', mb: 3, textAlign: 'center' }}>
                  {label.apprLevel}
                </Typography>
                <StepLabel 
                StepIconComponent={ColorlibStepIcon} 
                // StepIconComponent={'HEllo'}
                {...labelProps}>
                  {/*<Typography sx={{ fontSize: '15px', fontWeight: '500' }}>
                    {label.description ? label.description.length > 50 ? label.description.substring(0, 50) + '...' : label.description : ""}
                  </Typography>*/}
                   
                     {/* <Typography sx={{ fontSize: '13px' }}>
                        { label.currentStateId && label.currentStateId }
                      </Typography>*/}
                      <Typography sx={{ fontSize: '13px' }}>
                        { label.stateName  }
                      </Typography>
                      <Typography sx={{ fontSize: '13px' }}>{"( "+label.apprName +" )"}</Typography>
                      <Typography sx={{ fontSize: '13px' }}>
                      Created on: { label.createdOn.substring(0,10)  }
                    </Typography>
                    
                    <Typography sx={{ fontSize: '13px' }}>
                       { label.logRemarks && `Remarks: ${label.logRemarks}` }
                    </Typography>
                  <Typography>
                  
                  </Typography>
                  <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, mt: 2 }}>
                    {label.approvedDate && <EventOutlinedIcon sx={{ fontSize: 14, mr: 1 }} />}
                    {label.approvedDate}
                  </Typography>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Fragment>
        
       
         {/* {user.displayName === approverTimelineData?.data?.respList.map((item) => item.approverName).toString().split(',')[0] && approverTimelineData?.data?.respList.map((item) => item.statusKey).includes('pending'||'returned') ?
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: (theme) => theme.palette.background.default,
                p: 4,
                pt: 6
              }}
            >
              <ApprovalForm handleComplete={handleComplete} approverTimelineData={approverTimelineData} activeStep={activeStep} />
            </Box> :
            (steps[selectedStep]?.description ? <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: (theme) => theme.palette.background.default,
                p: 4,
                pt: 6
              }}
            >
              <ApprovalDesc data={steps[selectedStep]} />
            </Box> : "")
          }*/}
        </Fragment>
      </> : <div>
        <AppLoader />
      </div>
      }

    </Box>
  );
}
