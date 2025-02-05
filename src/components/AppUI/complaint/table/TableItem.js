import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import jwtAxios from "src/services/auth";
import AppNotification from "@components/AppNotification";
import { useDispatch } from "react-redux";
import { useAuthUser } from "src/hooks/AuthHooks";
import { getComplaintViewRequest } from "@redux/slice/ComplaintViewRequestSlice";
import { API_URL } from "src/api";
import Link from "next/link";
import { DateTimeFormate, OnlyDateFormate } from "src/utils";
import { firstUpperCase } from "@shared/constants/AppConst";
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
}));

const StyledTableCell = styled(TableCell)(() => ({
  fontSize: 14,
  padding: 8,
  verticalAlign: "middle !important",
  "&:first-of-type": {
    paddingLeft: 20,
  },
  "&:last-of-type": {
    paddingRight: 20,
  },
}));

const TableItem = ({ data, index , handleOpenModal }) => {
  const dispatch = useDispatch();
  const { user } = useAuthUser();
  
  const handleAction = (data, status) => {
    const obj = {
      complNumb: data.complNumb,
      flag: status,
    };
    jwtAxios
      .post(API_URL.USER_SATISFACTION, obj)
      .then((response) => {
        const res = response.data;
        if (res.status === "true") {
          AppNotification(true,res.message?? "Status has been changed !");
          setTimeout(() => {
            dispatch(getComplaintViewRequest({ custPernerNo: user?.uid }));
          }, 2000);
        } else {
          AppNotification(false, res.message ?? "Failed to change status !");
        }
      })
      .catch((error) => {
        AppNotification(false, error.message ?? "Nwtwork Error");
      });
  };

  return (
    <>
      <StyledTableRow key={`row-${data.complNumb}`}>
        <StyledTableCell>{index + 1}</StyledTableCell>
        <StyledTableCell>
      <Link href={`/admin-view-register-complaint/${window.btoa(data.complNumb)}`}>
        {data.complNumb}
        </Link> 
           
        </StyledTableCell>
        <StyledTableCell>{
        OnlyDateFormate(data.feedbackDate)
        }</StyledTableCell>
        <StyledTableCell>{DateTimeFormate(data.createdOn)}</StyledTableCell>
        
        <StyledTableCell>
          {data.firstName + " " + data.lastName}
        </StyledTableCell>
        <StyledTableCell>{data.emailId}</StyledTableCell>
        <StyledTableCell>{data.contactNo}</StyledTableCell>
        <StyledTableCell>{data.deptName}</StyledTableCell>
        <StyledTableCell>{data.complType}</StyledTableCell>
        <StyledTableCell>{data.feedbackType}</StyledTableCell>
        <StyledTableCell>{data.organization}</StyledTableCell>

        <StyledTableCell>{data.areaConcern}</StyledTableCell>
        <StyledTableCell>{firstUpperCase(data.status)}</StyledTableCell>

        <StyledTableCell>
          {data.status === "Accepted" && (
            <Box sx={{ "& button": { m: 1 } }}>
              <div>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => handleAction(data, "satisfied")}
                >
                  Satisfied
                </Button>


                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  // onClick={() => handleAction(data, "not-satisfied")}
                  onClick={() => handleOpenModal(data)}
                >
                  Not Satisfied
                </Button>
              </div>
            </Box>
          )}
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
  handleRemoveSelectSeat: PropTypes.func,
  handleChange: PropTypes.func,
};
