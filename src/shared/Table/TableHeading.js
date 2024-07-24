import React from "react";
import { TableCell } from "@mui/material";
import TableHeader from "@/src/components/AppTable/TableHeader"; 

 

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
        Type
      </TableCell>
      <TableCell
        sx={{
          background: "#f5f7f6 !important",
        }}
        align="left"
      >
        Requesting For
      </TableCell>
      <TableCell
        sx={{
          background: "#f5f7f6 !important",
        }}
        align="left"
      >
        Booking in the Name of
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
        Seat No.
      </TableCell>
      
      <TableCell
        sx={{
          background: "#f5f7f6 !important",
        }}
        align="left"
      >
        From Date
      </TableCell>
      <TableCell
        sx={{
          background: "#f5f7f6 !important",
        }}
        align="left"
      >
        To Date
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
