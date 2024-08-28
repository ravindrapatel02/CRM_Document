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
     0-2 Days
    </TableCell>
    <TableCell
      sx={{
        background: "#f5f7f6 !important",
      }}
      align="left"
    >
      3-4 Days
    </TableCell>
    <TableCell
      sx={{
        background: "#f5f7f6 !important",
      }}
      align="left"
    >
      5-6 Days
    </TableCell>
    <TableCell
      sx={{
        background: "#f5f7f6 !important",
      }}
      align="left"
    >
      {'>6'} Days
    </TableCell>
    
  </TableHeader>
  );
};

export default TableHeading;
