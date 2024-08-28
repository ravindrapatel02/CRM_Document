import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(() => ({
  fontSize: 14,
  padding: 20,
  '&:first-of-type': {
    paddingLeft: 20,
  },
  '&:last-of-type': {
    paddingRight: 20,
  },
}));
const TableItemEmpty = ({text}) => {
  return (
    <TableRow className='item-hover'>
      <StyledTableCell colSpan={12} align='center'>{text}</StyledTableCell>
    </TableRow>
  );
};

export default TableItemEmpty;

TableItemEmpty.propTypes = {
  text: PropTypes.string.isRequired,
};
