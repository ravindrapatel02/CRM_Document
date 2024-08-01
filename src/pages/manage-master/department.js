import AppSectionContainer from "@components/AppContainers/AppSectionContainer";
import AppsContent from "@components/AppsContainer/AppsContent";
import AppsHeader from "@components/AppsContainer/AppsHeader";
import AppSearch from "@components/AppSearchBar";
import AppSectionTitle from "@components/AppSectionTitle";
import AppsPagination from "@components/AppsPagination";
import DepartmentTable from "@components/AppUI/Master/Department/Table";
import UpdateDepartmentModal from "@components/AppUI/Modal/UpdateDepartmentModal";
import { Box, Button, Card, Grid, Hidden } from "@mui/material";
import { getDepartment } from "@redux/slice/DepartmentSlice";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthUser } from "src/hooks/AuthHooks";
const ROW_PER_PAGE = 10;

const DepartmentMaster = () => {
  const [dataCount, setDataCount] = useState(50);
  const { deptData } = useSelector((state) => state.department);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const { user } = useAuthUser();
  const router = useRouter();
  const [open, setopen] = useState(false);
  const [updateDetails, setUpdateDetails] = useState(null);

  useEffect(() => {
    dispatch(getDepartment());
  }, []);

  useEffect(() => {
    let newAllApprovedList = [...deptData];
    let paginatedData = newAllApprovedList.splice(0, ROW_PER_PAGE);
    setData(paginatedData);
    setDataCount(deptData.length);
    setPage(0);
  }, [deptData]);

  const onPageChange = (event, value) => {
    setPage(value);
    let newAllApprovedList = [...deptData];
    let paginatedData = newAllApprovedList.splice(
      value * ROW_PER_PAGE,
      ROW_PER_PAGE
    );
    setData(paginatedData);
  };

  const handleOpenModal = () => {
    setopen(true);
  };

  const handleCloseModal = () => {
    setopen(false);
    setUpdateDetails(null);
  };
  

  return (
    <AppSectionContainer>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <AppSectionTitle primaryText={"Department Master"} secondaryText={""} />
      </Box>

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
          <Box>
            <Button
              onClick={() => router.push("/manage-master/add-department")}
            >
              Add Department
            </Button>
          </Box>

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
          <DepartmentTable
            data={data}
            handleOpenModal={handleOpenModal}
            setUpdateDetails={setUpdateDetails}
          />
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
      {open && (
        <UpdateDepartmentModal
          open={open}
          updateDetails={updateDetails}
          handleCloseModal={handleCloseModal}
        />
      )}
    </AppSectionContainer>
  );
};

export default DepartmentMaster;
