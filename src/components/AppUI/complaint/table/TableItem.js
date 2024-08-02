import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';   
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Autocomplete, Box, TextField } from '@mui/material';
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
      <StyledTableRow
        key={`row-${data.seatNo}`}
         >
        <StyledTableCell  >
           
          {index +1}
        </StyledTableCell>
        <StyledTableCell>
          {data.complNumb}
        </StyledTableCell>
        <StyledTableCell>
       {data.firstName +" " + data.lastName}
        </StyledTableCell>
        <StyledTableCell>
         {data.emailId}
        </StyledTableCell>
        <StyledTableCell>
          {data.contactNo}
        </StyledTableCell>

        <StyledTableCell>
          {data.complType}
        </StyledTableCell>
        <StyledTableCell>
          {data.custType}
        </StyledTableCell>
        <StyledTableCell>
          {data.orgination}
        </StyledTableCell>

        <StyledTableCell>
          {data.areaofConcern}
        </StyledTableCell>
         <StyledTableCell>
       {data.status}
        </StyledTableCell>
         
      </StyledTableRow>
    </>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired, 
  handleRemoveSelectSeat: PropTypes.func,
  handleChange :PropTypes.func,
};
