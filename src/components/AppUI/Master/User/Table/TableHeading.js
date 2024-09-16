import React from "react";
import { TableCell } from "@mui/material";
import TableHeader from "@components/AppTable/TableHeader";

const TableHeading = () => {
  return (
    <TableHeader>
      <TableCell
        sx={{
          background: "#f5f7f6 !important",
        }}
        align="left"
      >
        S.No.
      </TableCell>
      <TableCell
        sx={{
          background: "#f5f7f6 !important",
        }}
        align="left"
      >
        User Name
      </TableCell>

      <TableCell sx={{ background: "#f5f7f6 !important" }} align="left">
        {" "}
        User ID
      </TableCell>
      <TableCell sx={{ background: "#f5f7f6 !important" }} align="left">
        {" "}
        User Role
      </TableCell>
      <TableCell sx={{ background: "#f5f7f6 !important" }} align="left">
        {" "}
        Department
      </TableCell>
      <TableCell sx={{ background: "#f5f7f6 !important" }} align="left">
        {" "}
        Location
      </TableCell>
      <TableCell sx={{ background: "#f5f7f6 !important" }} align="left">
        {" "}
        Manager perner no.
      </TableCell>
      <TableCell sx={{ background: "#f5f7f6 !important" }} align="left">
        {" "}
        Manager name
      </TableCell>
      <TableCell sx={{ background: "#f5f7f6 !important" }} align="left">
        {" "}
       manager email-ID
      </TableCell>
      <TableCell
        sx={{
          background: "#f5f7f6 !important",
        }}
        align="left"
      >
        Action
      </TableCell>
    </TableHeader>
  );
};

export default TableHeading;
