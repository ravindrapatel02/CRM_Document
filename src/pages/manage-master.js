import { Box, Card, Hidden, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
import BookingTable from "../components/BookingDetails/Table";
import AppsHeader from "../components/AppsContainer/AppsHeader";
import AppSearch from "../components/AppSearchBar";
import AppsPagination from "../components/AppsPagination";
import AppsContent from "../components/AppsContainer/AppsContent";
import { useDispatch, useSelector } from "react-redux";
import { getBookingDetails } from "../redux/slice/BookingDetailsSlice";
import { useAuthUser } from "../hooks/AuthHooks";
const ROW_PER_PAGE = 10;

const BookingDeailsDashboard = () => {
  const [dataCount, setDataCount] = useState(50);
  const {bookingData} = useSelector((state) => state.booking); 
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const { user } = useAuthUser();

  useEffect(()=>{
    if(user){
    dispatch(getBookingDetails({userId :user.id}));
    }
  } ,[ ]);
 

  useEffect(() => {
    let newAllApprovedList = [...bookingData];
    let paginatedData = newAllApprovedList.splice(0, ROW_PER_PAGE);
    setData(paginatedData);
    setDataCount(bookingData.length);
    setPage(0);
  }, [bookingData]);

  const onPageChange = (event, value) => {
    setPage(value);
    let newAllApprovedList = [...bookingData];
    let paginatedData = newAllApprovedList.splice(
      value * ROW_PER_PAGE,
      ROW_PER_PAGE
    );
    setData(paginatedData);
  };

  return (
    <Grid container sx={{ display: "flex", justifyContent: "center", mb: 5 , height:'76.8vh'}}>
      <Grid item xs={10}>
        <Grid item xs={12} sx={{ textAlign: "center", padding: 4 }}>
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
             Manage Master 
          </Typography>
        </Grid>

        <Card sx={{ borderTop: 1 }}>
          <AppsHeader>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: 1,
              }}
            >
              <AppSearch
                iconPosition="right"
                overlap={false}
                onChange={(event) => onSearchCustomer(event.target.value)}
                placeholder={"Search here..."}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  ml: "auto",
                }}
              >
                <Hidden smDown>
                  <AppsPagination
                    rowsPerPage={ROW_PER_PAGE}
                    count={dataCount}
                    page={page}
                    onPageChange={onPageChange}
                  />
                </Hidden>
              </Box>
            </Box>
          </AppsHeader>
          <AppsContent
            sx={{
              paddingTop: 2.5,
              paddingBottom: 2.5,
            }}
          >
            <BookingTable data={data} />
          </AppsContent>
          <Hidden smUp>
            <AppsPagination
              rowsPerPage={ROW_PER_PAGE}
              count={dataCount}
              page={page}
              onPageChange={onPageChange}
            />
          </Hidden>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BookingDeailsDashboard;
