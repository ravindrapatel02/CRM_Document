import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import jwtAxios from "src/services/auth";
import { API_URL } from "src/api";
import AppNotification from "@components/AppNotification";
import { useDispatch } from "react-redux";
import { getDepartment } from "@redux/slice/DepartmentSlice";
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

const TableItem = ({ data, setUpdateDetails, handleUpdateModal, index }) => {
  const dispatch = useDispatch();

  const handleDelete = (data) => {
    const obj = {
      deptId: data.id,
      flag: "delete", 
    };

    jwtAxios
      .post(API_URL.CREATE_DEPARTMENT, obj)
      .then((response) => {
        const res = response.data;
        if (res.status === "true") {
          AppNotification(
            true,
            res.message ?? "Department deleted successfully !"
          );
          setTimeout(() => {
            dispatch(getDepartment());
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
      <StyledTableRow key={`row-${data.seatNo}`}>
        <StyledTableCell>{index + 1}</StyledTableCell>
        <StyledTableCell>{data.userName}</StyledTableCell>
        <StyledTableCell>{data.userPernerNo}</StyledTableCell>
        <StyledTableCell>{data.roleName}</StyledTableCell>
        <StyledTableCell>{data.deptName}</StyledTableCell>
        <StyledTableCell>{data.location}</StyledTableCell>
        <StyledTableCell>{data.managerPernNo}</StyledTableCell>
        <StyledTableCell>{data.managerName}</StyledTableCell>
        <StyledTableCell>{data.userEmailId}</StyledTableCell>
        <StyledTableCell>
          <BorderColorIcon
            onClick={() => {
              handleUpdateModal();
              setUpdateDetails(data);
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
  handleOpenModal: PropTypes.func,
  setUpdateDetails: PropTypes.func,
};
