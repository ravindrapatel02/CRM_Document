import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';    
import Link from 'next/link';
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
   console.log(data)
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
    {data.feedbackDate ? data.feedbackDate.substring(0,10) :''}
  </StyledTableCell>
    <StyledTableCell>
      {data.firstName + " " + data.lastName}
    </StyledTableCell>
    <StyledTableCell>{data.emailId}</StyledTableCell>
     
  </StyledTableRow>
    </>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired, 
};
