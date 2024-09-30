import AppSectionContainer from "@components/AppContainers/AppSectionContainer";
import AppsContent from "@components/AppsContainer/AppsContent";
import AppsHeader from "@components/AppsContainer/AppsHeader";
import AppSearch from "@components/AppSearchBar";
import AppSectionTitle from "@components/AppSectionTitle";
import AppsPagination from "@components/AppsPagination";
import UserTable from "@components/AppUI/Master/User/Table";
import AddUser from "@components/AppUI/Modal/AddUser";
import UpdateUser from "@components/AppUI/Modal/UpdateUser";
import AppLoader from "@components/CustomLoader";
import { Box, Button, Card, Grid, Hidden } from "@mui/material";
import { getUserList } from "@redux/slice/UserSlice";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthUser } from "src/hooks/AuthHooks";
const ROW_PER_PAGE = 10;

const UserManagement = () => {
  const [dataCount, setDataCount] = useState(50);
  const { userData , loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const { user } = useAuthUser();
  const router = useRouter();
  const [open, setopen] = useState({
    add:false,
    update:false,
  });
  const [updateDetails, setUpdateDetails] = useState(null);

  useEffect(() => {
    dispatch(getUserList());
  }, []);

  useEffect(() => {
    let newAllApprovedList = [...userData];
    let paginatedData = newAllApprovedList.splice(0, ROW_PER_PAGE);
    setData(paginatedData);
    setDataCount(userData.length);
    setPage(0);
  }, [userData]);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  });
  const onPageChange = (event, value) => {
    setPage(value);
    let newAllApprovedList = [...userData];
    let paginatedData = newAllApprovedList.splice(
      value * ROW_PER_PAGE,
      ROW_PER_PAGE
    );
    setData(paginatedData);
  };

  const handleOpenModal = () => {
    setopen({
      add: true,
      update: false,
    });
  };

  const handleUpdateModal = () => {
    setopen({
      add: false,
      update: true,
    });
  };

  const handleCloseModal = () => {
    setopen({
      add: false,
      update: false,
    });
    setUpdateDetails(null);
  };
  

  return (
    <AppSectionContainer>
      {loading && <AppLoader/>}
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <AppSectionTitle primaryText={"User Master"} secondaryText={""} />
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
              onClick={handleOpenModal}
            >
              Add User
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
          <UserTable
            data={data}
            handleUpdateModal={handleUpdateModal}
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
      {open.add && (
        <AddUser
          open={open.add} 
          handleCloseModal={handleCloseModal}
        />
      )}
      {open.update && (
        <UpdateUser
          open={open.update}
          updateDetails={updateDetails}
          handleCloseModal={handleCloseModal}
        />
      )}
    </AppSectionContainer>
  );
};

export default UserManagement;
