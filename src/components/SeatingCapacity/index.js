import {
  Box,
  Grid,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Card,
} from "@mui/material";
import React from "react";
import { Table } from "react-bootstrap";
import Legends from "../Legends";

const SeatingCapacity = ({seatcapacity}) => {
  return (
    <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: "10px" }}>
            <Grid
              item
              sx={{
                backgroundColor: "#023877",
                color: "#FFFFFF",
              }}
            >
              <Typography sx={{ fontWeight: 900, fontSize: 18, p: 1 }}>
                Seating Capacity
              </Typography>
            </Grid>
            <Grid item>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell> Type</TableCell>
                      <TableCell>Available</TableCell>
                      <TableCell>Pending</TableCell>
                      <TableCell>Booked</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                  
                  {seatcapacity && seatcapacity.length>0 && seatcapacity.map((item , index)=>(
                    <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                    key={index+1}
                  >

                    <TableCell component="th" scope="row" style={{textTransform:'capitalize'}}>
                      {item.seatType}
                    </TableCell>
                    <TableCell>
                      <Box className="available-capacity">
                        <Box className="total">
                          <span className="">
                          {item.totalAvilableCount}
                          </span>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className="pending-capacity">
                        <Box className="total">
                          <span className="">{item.totalpendingCount}</span>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className="booked-capacity">
                        <Box className="total">
                          <span className="">{item.totalApprovedCount}</span>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className="total-capacity">
                        <Box className="total">
                          <span className="">{item.totalSeatCount}</span>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                  ))}
                    


                    {/*<TableRow
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        Cube
                      </TableCell>
                      <TableCell>
                        <Box className="available-capacity">
                          <Box className="total">
                            <span className="">34</span>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box className="pending-capacity">
                          <Box className="total">
                            <span className="">03</span>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box className="booked-capacity">
                          <Box className="total">
                            <span className="">34</span>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box className="total-capacity">
                          <Box className="total">
                            <span className="">34</span>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        Desk
                      </TableCell>
                      <TableCell>
                        <Box className="available-capacity">
                          <Box className="total">
                            <span className="">34</span>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box className="pending-capacity">
                          <Box className="total">
                            <span className="">03</span>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box className="booked-capacity">
                          <Box className="total">
                            <span className="">34</span>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box className="total-capacity">
                          <Box className="total">
                            <span className="">34</span>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                    */}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Legends />
            
            {/* <Grid item mt={3}>
              <Box>
                <Typography className="mx-3 fw-bold">Legends</Typography>
              </Box>
              <Grid
                item
                sx={{ display: "flex", justifyContent: "center" }}
                mt={3}
                pb={2}
              >
                <Grid
                  item
                  xs={3}
                  md={3}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box className="totalButton">
                    <Box className="total">
                      <span></span>
                    </Box>
                    <Typography className="d-flex justify-content-center">
                      Total
                    </Typography>
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={3}
                  md={3}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box className="availableButtom">
                    <Box className="available">
                      <span></span>
                    </Box>
                    <Typography className="d-flex justify-content-center">
                      Available
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={3}
                  md={3}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box className="bookedButton">
                    <Box className="booked">
                      <span></span>
                    </Box>
                    <Typography className="d-flex justify-content-center">
                      Booked
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={3}
                  md={3}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box className="approvalButton">
                    <Box className="approval">
                      <span></span>
                    </Box>
                    <Typography
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      Approval
                      <br /> Pending
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
                    </Grid> */}
            
          </Card>
        </Grid>
  );
};

export default SeatingCapacity;
