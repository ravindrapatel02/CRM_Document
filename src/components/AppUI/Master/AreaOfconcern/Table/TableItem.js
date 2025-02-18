import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';   
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { API_URL } from 'src/api';
import AppNotification from '@components/AppNotification';
import { getAreaOfConcern } from '@redux/slice/AreaOfConcernSlice';
import jwtAxios from 'src/services/auth';
 
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
  const handleDelete = (data) => {
    const obj = {
      concernId: data.id,
      flag: "delete", 
    };

    jwtAxios
      .post(API_URL.ADD_AREA_OF_CONCERN, obj)
      .then((response) => {
        const res = response.data;
        if (res.status === "true") {
          AppNotification(
            true,
            res.message ?? "Area concern deleted successfully !"
          );
          setTimeout(() => {
            
                dispatch(getAreaOfConcern());
          }, 3000);
        } else {
          AppNotification(false, res.message ?? "Something went wrong !");
        }
      })
      .catch((error) => {
        AppNotification(false, error.message ?? "Network Error !");
      });
  };
  return (
    <>
      <StyledTableRow
        key={`row-${data.id}`}
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
