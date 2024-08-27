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
import { getComplaintViewRequest } from "@redux/slice/ComplaintViewRequestSlice";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthUser } from "src/hooks/AuthHooks";

const ROW_PER_PAGE = 10;
const ComplaintViewStatus = () => {
  const router = useRouter();
  // const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [dataCount, setDataCount] = useState(0);
  const { complaintList, loading } = useSelector((state) => state.complaint);
  const [allComplaintList, setAllComplaintList] = useState([]);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const { user } = useAuthUser();

  useEffect(() => {
    dispatch(getComplaintViewRequest({ custPernerNo: user?.uid }));
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  });

  useEffect(() => {
    if (complaintList.length > 0) {
      const complaintArray = [];
      complaintList.forEach((item) => {
        const statusArray = item.logHistoryCustIdVal;
        const length = statusArray.length - 1;
      

        complaintArray.push({
          complNumb: item.complNumb,
          complType: item.complType,
          contactNo: item.contactNo,
          createdOn: item.createdOn,
          custType: item.custType,
          deptName: item.deptName,
          emailId: item.emailId,
          firstName: item.firstName,
          id: item.id,
          lastName: item.lastName,
          deptName:item.deptName,
          feedbackType: item?.crmCustComplReqdtls[0].feedbackType,
          organization: item?.crmCustComplReqdtls[0]?.organization,
          areaConcern: item?.crmCustComplReqdtls[0]?.areaConcern,
          feedbackDate: (item?.crmCustComplReqdtls[0]?.feedbackDate)?.substring(0,10),
          status: item?.crmCustComplReqdtls[0]?.status,
          userLevel: item?.crmCustComplReqdtls[0]?.userLevel,
          stateName: statusArray[length].stateName,
          status: item?.crmCustComplReqdtls[0]?.status
        });
      });
      setAllComplaintList(complaintArray);
    }
  }, [complaintList]);

  useEffect(() => {
    let newAllApprovedList = [...allComplaintList];
    let paginatedData = newAllApprovedList.splice(0, ROW_PER_PAGE);
    setData(paginatedData);
    setDataCount(allComplaintList.length);
    setPage(0);
  }, [allComplaintList]);

  const onPageChange = (event, value) => {
    setPage(value);
    let newAllApprovedList = [...allComplaintList];
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
          <AppSectionTitle
            primaryText={"View Complaint Status"}
            secondaryText={""}
          />
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

export default ComplaintViewStatus;
