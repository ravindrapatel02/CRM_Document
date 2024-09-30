import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';     
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
    <StyledTableRow key={`row-${data.deptname}`}>
    <StyledTableCell>{index + 1}</StyledTableCell>
    <StyledTableCell> 
    {data.deptname} 
    </StyledTableCell>
    <StyledTableCell>
    {data.open }
  </StyledTableCell>
    <StyledTableCell>
      {data.closed}
    </StyledTableCell>
    <StyledTableCell>{data.total}</StyledTableCell>
     
  </StyledTableRow>
    </>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired, 
};
