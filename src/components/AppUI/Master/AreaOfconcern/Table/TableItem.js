import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';   
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
 
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
 

const TableItem = ({ data , index , setUpdateData , setOpenModal}) => { 
   
  return (
    <>
      <StyledTableRow
        key={`row-${data.seatNo}`}
         >
        <StyledTableCell  >
           
          {index +1}
        </StyledTableCell>
        <StyledTableCell>
          {data.concernType}
        </StyledTableCell>
        <StyledTableCell>
       {data.shortCode}
        </StyledTableCell>
         
        <StyledTableCell>
        <BorderColorIcon
        onClick={() => {
          setUpdateData(data);
          setOpenModal({isAdd:false , isUpdate:true});
        }}
      />
      <span className="mx-4">
        <DeleteOutlineIcon
          color="red"
          style={{ fill: "red" }}
          onClick={() => handleDelete(data)}
        ></DeleteOutlineIcon>
      </span>
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
  handleCloseModal: PropTypes.func,
};
