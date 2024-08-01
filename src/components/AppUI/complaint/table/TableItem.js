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
 

const TableItem = ({ data , handleRemoveSelectSeat , handleChange , index}) => { 
   
  return (
    <>
      <StyledTableRow
        key={`row-${data.seatNo}`}
         >
        <StyledTableCell  >
           
          {index +1}
        </StyledTableCell>
        <StyledTableCell>
          {data.seatType}
        </StyledTableCell>
        <StyledTableCell>
       {data.seatBookingType}
        </StyledTableCell>
        <StyledTableCell>
         {data.name}
        </StyledTableCell>
        <StyledTableCell>
          {data.workStationNo}
        </StyledTableCell>

        <StyledTableCell>
          {data.location}
        </StyledTableCell>
        <StyledTableCell>
          {data.building}
        </StyledTableCell>
        <StyledTableCell>
          {data.floor}
        </StyledTableCell>

        <StyledTableCell>
          {(data.fromDate).substring(0,10)}
        </StyledTableCell>
         <StyledTableCell>
        {(data.toDate).substring(0,10)}
        </StyledTableCell>
        <StyledTableCell>
         {data.remarks}
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
