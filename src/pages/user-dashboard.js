import AppPageContainer from "@components/AppContainers/AppPageContainer";
import AppSectionContainer from "@components/AppContainers/AppSectionContainer";
import AppsContent from "@components/AppsContainer/AppsContent";
import AppsHeader from "@components/AppsContainer/AppsHeader";
import AppSearch from "@components/AppSearchBar";
import AppSectionTitle from "@components/AppSectionTitle";
import AppsPagination from "@components/AppsPagination";
import DashboardTable from "@components/AppUI/dashboardTable";
import { Box, Button, Card, Grid, Hidden, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const ROW_PER_PAGE = 10;

const UserDashboard = () => {
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [page, setPage] = useState(0);
  const [filter , setFilter] = useState({
    fromDate:'',
    toDate:'',
  })

  const onPageChange = (event, value) => {
    setPage(value);
    let newAllApprovedList = [];

    let paginatedData = newAllApprovedList.splice(
      value * ROW_PER_PAGE,
      ROW_PER_PAGE
    );
    setData(paginatedData);
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];


  const chartData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const barData =[
    {name:'Satiffied' ,value:20},
    {name:'Not Satisfied' ,value:80},
    {name:'Not available' ,value:40},

  ]
  return (
    <AppSectionContainer>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <AppSectionTitle primaryText={"Dashboard"}  />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <AppPageContainer sx={{ p: "10px 10px 10px" , backgroundColor: "#ffff"}}>
          <Grid container spacing={1} mb={2}>
            <Grid item xs={12} md={4}>
              <TextField
                type="date"
                fullWidth
                onChange={(e) =>
                  setFilter({ ...filter, fromDate: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                type="date"
                fullWidth
                onChange={(e) =>
                  setFilter({ ...filter, toDate: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={4}></Grid>
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
          </AppPageContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            // display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
          >
            <Typography variant="h6">Area of concern</Typography>

            <Box width="100%">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#4299E1"
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>

           
          </Box>
          <Box>
          <Grid container spacing={2}>
  <Grid item xs={6} md={3} sx={{display:'flex' , alignItems:'center'}}>
  <Typography style={{height:'10px' , width:'10px', backgroundColor:`${COLORS[0]}`}}></Typography><span style={{marginLeft:5}}>Temp. Ex.</span>
  </Grid>
  <Grid item xs={6} md={3} sx={{display:'flex' , alignItems:'center'}}>
  <Typography style={{height:'10px' , width:'10px', backgroundColor:`${COLORS[1]}`}}></Typography><span style={{marginLeft:5}}>Trackdock</span>
  </Grid> 
  <Grid item xs={6} md={3} sx={{display:'flex' , alignItems:'center'}}>
  <Typography style={{height:'10px' , width:'10px', backgroundColor:`${COLORS[2]}`}}></Typography><span style={{marginLeft:5}}>Manpower</span>
  </Grid> 
  <Grid item xs={6} md={3} sx={{display:'flex' , alignItems:'center'}}>
  <Typography style={{height:'10px' , width:'10px', backgroundColor:`${COLORS[3]}`}}></Typography><span style={{marginLeft:5}}>Other</span>
  </Grid> 
  </Grid>

          
        </Box>

        <Box
        // display="flex"
        mt={2}
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <Typography variant="h6">Satisfaction Index</Typography>

        <Box width="100%">
        <ResponsiveContainer width="100%" height={300}>
         
        <BarChart
        data={barData}
        margin={{ top: 30, right: 0, left: -25, bottom: 0 }} // Increased top margin
      >
        <XAxis dataKey='name' />
        <CartesianGrid strokeDasharray='3 3' />
        {/*<Tooltip />*/}
        
        <Bar dataKey='value' fill='#FFBB28' barSize={20}>
          <LabelList dataKey="value" position="top" />
        </Bar>
      </BarChart>
      </ResponsiveContainer>
        </Box>

       
      </Box>

        </Grid>
      </Grid>
    </AppSectionContainer>
  );
};

export default UserDashboard;
