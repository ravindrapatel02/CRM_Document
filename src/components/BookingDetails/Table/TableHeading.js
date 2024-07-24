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
        Seat No.
      </TableCell>

      <TableCell
      sx={{
        background: "#f5f7f6 !important",
      }}
      align="left"
    >
      Location
    </TableCell>
    <TableCell
    sx={{
      background: "#f5f7f6 !important",
    }}
    align="left"
  >
   Building
  </TableCell>
  <TableCell
  sx={{
    background: "#f5f7f6 !important",
  }}
  align="left"
>
 Floor
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
        Remarks
      </TableCell>
      <TableCell
        sx={{
          background: "#f5f7f6 !important",
        }}
        align="left"
      >
        Status
      </TableCell>
    </TableHeader>
  );
};

export default TableHeading;
