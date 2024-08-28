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
       Department
      </TableCell>
      <TableCell
      sx={{
        background: "#f5f7f6 !important",
      }}
      align="left"
    >
     Open
    </TableCell>
      <TableCell
        sx={{
          background: "#f5f7f6 !important",
        }}
        align="left"
      >
       Close
      </TableCell>
      <TableCell
        sx={{
          background: "#f5f7f6 !important",
        }}
        align="left"
      >
        Total
      </TableCell>
      
    </TableHeader>
  );
};

export default TableHeading;
