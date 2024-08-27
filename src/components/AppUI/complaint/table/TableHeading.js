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
       Complaint No.
      </TableCell>
      <TableCell
      sx={{
        background: "#f5f7f6 !important",
      }}
      align="left"
    >
     Complaint Date
    </TableCell>
      <TableCell
        sx={{
          background: "#f5f7f6 !important",
        }}
        align="left"
      >
        Requester Name
      </TableCell>
      <TableCell
        sx={{
          background: "#f5f7f6 !important",
        }}
        align="left"
      >
        Email Id
      </TableCell>
      <TableCell
        sx={{
          background: "#f5f7f6 !important",
        }}
        align="left"
      >
        Contact No
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
        Complaint Type
      </TableCell>
      <TableCell
        sx={{
          background: "#f5f7f6 !important",
        }}
        align="left"
      >
        Feedback Type
      </TableCell>

      <TableCell
        sx={{
          background: "#f5f7f6 !important",
        }}
        align="left"
      >
        Organization
      </TableCell>
      <TableCell
        sx={{
          background: "#f5f7f6 !important",
        }}
        align="left"
      >
        Area fo Concern
      </TableCell>

      <TableCell
        sx={{
          background: "#f5f7f6 !important",
        }}
        align="left"
      >
        Status
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
