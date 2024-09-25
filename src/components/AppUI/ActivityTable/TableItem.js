import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';    
import Link from 'next/link';
import { dateTimeFromate } from '@shared/constants/AppConst';
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    cursor: 'pointer',
  },
}));

const StyledTableCell = styled(TableCell)(() => ({
  fontSize: 14,
  padding: 8,
  verticalAlign: 'middle !important',
  '&:first-of-type': {
    paddingLeft: 20,
  },
  '&:last-of-type': {
    paddingRight: 20,
  },
}));
 

const TableItem = ({ data , index}) => { 

  return (
    <>
    <StyledTableRow key={`row-${data.seatNo}`}>
    <StyledTableCell>{index + 1}</StyledTableCell>
    <StyledTableCell>
    <Link href={`/admin-view-register-complaint/${window.btoa(data.complNumb)}`}>
    {data.complNumb}
    </Link> 
    </StyledTableCell>
    <StyledTableCell>
    {dateTimeFromate(data.feedbackDate)}
  </StyledTableCell>
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
    <StyledTableCell>{data.statusName}</StyledTableCell>
  </StyledTableRow>
    </>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired, 
};
