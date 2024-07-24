import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const Legends = () => {
  return (
    <Grid item mt={3}>
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
        xs={2}
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
        xs={2}
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
        xs={2}
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
        xs={2}
        md={3}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box className="multipleButton">
          <Box className="multiple">
            <span></span>
          </Box>
          <Typography
            style={{ display: "flex", justifyContent: "center" }}
          >
            Multiple
            <br /> Request
          </Typography>
        </Box>
      </Grid>

      <Grid
      item
      xs={2}
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
  </Grid>
  )
}

export default Legends