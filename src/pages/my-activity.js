import AppPageContainer from "@components/AppContainers/AppPageContainer";
import AppSectionContainer from "@components/AppContainers/AppSectionContainer";
import AppsContent from "@components/AppsContainer/AppsContent";
import AppsHeader from "@components/AppsContainer/AppsHeader";
import AppSearch from "@components/AppSearchBar";
import AppSectionTitle from "@components/AppSectionTitle";
import AppsPagination from "@components/AppsPagination";
// import ActivityTable from '@components/AppUI/ActivityTable';
import ComplaintTable from "@components/AppUI/complaint/table";
import AppLoader from "@components/CustomLoader";
import { Box, Button, Card, Grid, Hidden } from "@mui/material";
import { getMyTaskList } from "@redux/slice/MyTaskSlice";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthUser } from "src/hooks/AuthHooks";

const ROW_PER_PAGE = 10;

const MyActivity = () => {
  const router = useRouter();
  // const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [dataCount, setDataCount] = useState(0);
  const { taskData, loading } = useSelector((state) => state.taskList);
  // const [allComplaintList, setAllComplaintList] = useState([]);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const { user } = useAuthUser();

  useEffect(() => {
    if (user) {
      const obj = {
        deptName: user.deptName,
        userRole: user.role[0],
        userId: user.id,
      };
      dispatch(getMyTaskList(obj));
    }
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  });

  // useEffect(() => {
  //   if (taskData.length > 0) {
  //     const complaintArray = [];
  //     taskData.forEach((item) => {
  //       complaintArray.push({
  //         complNumb: item.complNumb,
  //         complType: item.complType,
  //         contactNo: item.contactNo,
  //         createdOn: item.createdOn,
  //         custType: item.custType,
  //         deptName: item.deptName,
  //         emailId: item.emailId,
  //         firstName: item.firstName,
  //         id: item.id,
  //         // lastName: item.lastName,
  //         // status: item.logHistoryCustIdVal[0].status,
  //         // userLevel: item.logHistoryCustIdVal[0].userLevel,
  //       });
  //     });
  //     setAllComplaintList(complaintArray);
  //   }
  // }, [taskData]);

  useEffect(() => {
    let newAllApprovedList = [...taskData];
    let paginatedData = newAllApprovedList.splice(0, ROW_PER_PAGE);
    setData(paginatedData);
    setDataCount(taskData.length);
    setPage(0);
  }, [taskData]);

  const onPageChange = (event, value) => {
    setPage(value);
    let newAllApprovedList = [...taskData];
    let paginatedData = newAllApprovedList.splice(
      value * ROW_PER_PAGE,
      ROW_PER_PAGE
    );
    setData(paginatedData);
  };

  return (
    <React.Fragment>
      {loading && <AppLoader />}
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
                justifyContent: "flex-end",
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
              <ComplaintTable data={data} />
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
    </React.Fragment>
  );
};

export default MyActivity;
