import React from "react";
import { TableCell } from "@mui/material";
import TableHeader from "@components/AppTable/TableHeader";
// import TableHeader from "@/src/components/AppTable/TableHeader"; 

 

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
      Concern Type
      </TableCell>
      <TableCell
        sx={{
          background: "#f5f7f6 !important",
        }}
        align="left"
      >
      Short Code
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
