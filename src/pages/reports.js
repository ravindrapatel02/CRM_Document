import AppPageContainer from "@components/AppContainers/AppPageContainer";
import AppSectionContainer from "@components/AppContainers/AppSectionContainer";
import AppsContent from "@components/AppsContainer/AppsContent";
import AppsHeader from "@components/AppsContainer/AppsHeader";
import AppSearch from "@components/AppSearchBar";
import AppSectionTitle from "@components/AppSectionTitle";
import AppsPagination from "@components/AppsPagination";
import ComplaintTable from "@components/AppUI/complaint/table";
import AppLoader from "@components/CustomLoader";
import { Box, Button, Card, Grid, Hidden, TextField } from "@mui/material";
import { getReports } from "@redux/slice/ReportsSlice";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthUser } from "src/hooks/AuthHooks";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";

const ROW_PER_PAGE = 10;

const Reports = () => {
  const router = useRouter();
  const [dataCount, setDataCount] = useState(0);
  const { reportData, loading } = useSelector((state) => state.reports);
  const [allComplaintList, setAllComplaintList] = useState([]);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    fromDate: "",
    toDate: "",
    status: "",
  });
  const { user } = useAuthUser();

  useEffect(() => {
    const obj = {
      status: "",
      ...(filter.fromDate.length > 0 &&
        filter.toDate.length > 0 && {
          fromDate: filter.fromDate,
          toDate: filter.toDate,
        }),
    };

    dispatch(getReports(obj));
  }, [filter]);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  });

  useEffect(() => {
    if (reportData && reportData.length > 0) {
      const complaintArray = [];
      reportData.forEach((item) => {
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
          deptName: item.deptName,
          feedbackType: item.feedbackType,
          organization: item.organization,
          areaConcern: item.areaConcern,
          feedbackDate: item.feedbackDate?.substring(0, 10),
          status: item.status,
          userLevel: item.status,
          stateName: item.status,
        });
      });
      setAllComplaintList(complaintArray);
    }
  }, [reportData]);

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

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Add header row
    worksheet.columns = [
      { header: "Complaint No", key: "complNumb", width: 10 },
      { header: "Complaint Date", key: "feedbackDate", width: 20 },
      { header: "Name", key: "name", width: 20 },
      { header: "Email", key: "emailId", width: 20 },
      { header: "Contact No", key: "contactNo", width: 20 },
      { header: "Department", key: "deptName", width: 20 },
      { header: "Complaint Type", key: "complType", width: 20 },
      { header: "Feedback Type", key: "feedbackType", width: 20 },
      { header: "Organization", key: "organization", width: 20 },
      { header: "Area fo Concern", key: "areaConcern", width: 20 },
      { header: "Status", key: "stateName", width: 20 },
    ];

    // Add rows
    allComplaintList.forEach((item) => {
      const obj = {};
      obj.complNumb = item.complNumb;
      (obj.feedbackDate = item.feedbackDate),
        (obj.name = item.firstName + " " + item.lastName);
      obj.emailId = item.emailId;
      obj.contactNo = item.contactNo;
      obj.deptName = item.deptName;
      obj.complType = item.complType;
      obj.feedbackType = item.feedbackType;
      obj.organization = item.organization;
      obj.areaConcern = item.areaConcern;
      obj.stateName = item.stateName;
      worksheet.addRow(obj);
    });

    // Apply styles to header row
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        // fgColor: { argb: 'FFFF00' }, // Yellow background
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Create Excel file and save it
    const buffer = await workbook.xlsx.writeBuffer();
    const dataBlob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(dataBlob, `crm-report-${new Date().toDateString()}.xlsx`);
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
          <AppSectionTitle primaryText={"Reports"} secondaryText={""} />
        </Box>
 
        <AppPageContainer sx={{ backgroundColor: "#ffff" }}>
          <Grid container spacing={1}>
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
                <Button onClick={exportToExcel}>Export</Button>
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

export default Reports;
