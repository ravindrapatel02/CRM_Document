import AppPageContainer from "@components/AppContainers/AppPageContainer";
import AppSectionContainer from "@components/AppContainers/AppSectionContainer";
import AppsContent from "@components/AppsContainer/AppsContent";
import AppsHeader from "@components/AppsContainer/AppsHeader";
import AppSearch from "@components/AppSearchBar";
import AppSectionTitle from "@components/AppSectionTitle";
import AppsPagination from "@components/AppsPagination";
import ActivityTable from "@components/AppUI/ActivityTable";
import { Box, Button, Card, Grid, Hidden } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from "next/router";
const ROW_PER_PAGE = 10;

const MyActivity = () => {
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [dataCount, setDataCount] = useState(50);
  const { bookingData } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  // const { user } = useAuthUser();

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
    <AppSectionContainer>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <AppSectionTitle primaryText={"My Activity"} secondaryText={""} />
      </Box>
      <AppPageContainer>
        <Grid item>
           <Box
            sx={{
              display: "flex",
              justifyContent:'flex-end',
              // flexDirection: "row",
              alignItems: "center",
              width: 1,
              pb: 2,
            }}
          >
            
            
            <Box mx={2}>
              <Button>Export</Button>
            </Box>
          </Box> 

      

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
            <ActivityTable data={data} />
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
      </AppPageContainer>
    </AppSectionContainer>
  );
};

export default MyActivity;
