import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';   
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
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

const requestingFor = [
  {
    label:'Self',
    value:'self',
  },
  {
    label:'Other',
    value:'other',
  }
];


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
          {data.type}
        </StyledTableCell>
        <StyledTableCell>
        <Box className="userDetails">
        <Autocomplete
        disablePortal
        fullWidth
        id="combo-box-demo"
        name="Requesting For" 
        options={requestingFor} 
       onChange={(e, value) => handleChange(value.value , 'requestingFor' , index)}
        inputlabelprops={{
          shrink: true,
        }}
        inputprops={{
          maxLength: 1000,
        }}
        renderInput={(params) => <TextField {...params} label="" />}
      />
      </Box>
        </StyledTableCell>
        <StyledTableCell>
        <Box className="userDetails">
        {data.requestingFor ==='self' ?
      <Typography>{data.BookingName}</Typography>
      : 
      data.requestingFor==='other' ?
      <input 
      type='text'
      onChange={(e, value) => handleChange(e.target.value , 'BookingName' , index)}
       style={{padding:'8px'}}/>
      :""
      }
         </Box>
        </StyledTableCell>

        <StyledTableCell>
        <input type='text' style={{padding:'8px'}}
        onChange={(e, value) => handleChange(e.target.value , 'depCode' , index)}
        />
        </StyledTableCell>

        <StyledTableCell>
          {data.seatNo}
        </StyledTableCell>
        <StyledTableCell>
          {data.fromDate}
        </StyledTableCell>
         <StyledTableCell>
        {data.toDate}
        </StyledTableCell>
        <StyledTableCell>
        <CancelOutlinedIcon color="error" onClick={()=>handleRemoveSelectSeat(data)}/>
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
