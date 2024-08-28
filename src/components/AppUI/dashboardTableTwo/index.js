import AppsContent from '@components/AppsContainer/AppsContent'
import AppsHeader from '@components/AppsContainer/AppsHeader'
import AppsPagination from '@components/AppsPagination'
import { Box, Card, Hidden } from '@mui/material'
import React, { useState } from 'react'
import DashboardTable from './Table'
const ROW_PER_PAGE = 10;

const DashboardTableTwo = ({data}) => {
    const [dataCount, setDataCount] = useState(0);
    const [page, setPage] = useState(0);
    
    const onPageChange = (event, value) => {
        setPage(value);
        let newAllApprovedList = [];
    
        let paginatedData = newAllApprovedList.splice(
          value * ROW_PER_PAGE,
          ROW_PER_PAGE
        );
        setData(paginatedData);
      };
    

  return (
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
                 {/* <AppSearch
                    iconPosition="right"
                    overlap={false}
                    onChange={(event) => onSearchCustomer(event.target.value)}
                    placeholder={"Search here..."}
                  />*/}
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
                <DashboardTable data={data} />
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
  )
}

export default DashboardTableTwo