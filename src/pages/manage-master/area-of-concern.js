import AppSectionContainer from "@components/AppContainers/AppSectionContainer";
import AppsContent from "@components/AppsContainer/AppsContent";
import AppsHeader from "@components/AppsContainer/AppsHeader";
import AppSearch from "@components/AppSearchBar";
import AppSectionTitle from "@components/AppSectionTitle";
import AppsPagination from "@components/AppsPagination";
import AreaOfConcernTable from "@components/AppUI/Master/AreaOfconcern/Table";
import AddAreaOfConcernModal from "@components/AppUI/Modal/AddAreaOfConcern";
import UpdateAreaOfConcernModal from "@components/AppUI/Modal/UpdateAreaOfConcernModal";
// import AreaOfConcernModal from "@components/AppUI/Modal/AreaOfConcernModal";
// import DepartmentTable from '@components/AppUI/Master/Department/Table'
// import BookingTable from '@components/BookingDetails/Table'
import { Box, Button, Card, Grid, Hidden } from "@mui/material";
import { getAreaOfConcern } from "@redux/slice/AreaOfConcernSlice";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useAuthUser } from "src/hooks/AuthHooks";
const ROW_PER_PAGE = 10;

const AreaofConcern = () => {
  const [dataCount, setDataCount] = useState(0);
  const { areaConcernData , loading} = useSelector((state) => state.areaConcern);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const router = useRouter();
  const [openModal , setOpenModal] = useState({
    isAdd:false,
    isUpdate:false,
    
  });
  const [updateData , setUpdateData] = useState(null);



  useEffect(() => {
    dispatch(getAreaOfConcern());
  }, []);

  useEffect(() => {
    if(areaConcernData.length>0 && !loading){
    let newAllApprovedList = [...areaConcernData];
    let paginatedData = newAllApprovedList.splice(0, ROW_PER_PAGE);
    setData(paginatedData);
    setDataCount(areaConcernData.length);
    setPage(0);
    }
  }, [areaConcernData]);

  const onPageChange = (event, value) => {
    setPage(value);
    let newAllApprovedList = [...areaConcernData];
    let paginatedData = newAllApprovedList.splice(
      value * ROW_PER_PAGE,
      ROW_PER_PAGE
    );
    setData(paginatedData);
  };

  const handleCloseModal = () => {
    setOpenModal({isAdd:false , isUpdate:false});
    // setUpdateDetails({ isAdd:false , isUpdate:false , data:null});
    // setopen(false);
    // setUpdateDetails(null);
  };
// console.log('updateDetails==>' , updateDetails);

  return (
    <AppSectionContainer>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <AppSectionTitle primaryText={"Area of concern"} secondaryText={""} />
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
              onClick={() => {
                setOpenModal({isAdd:true, isUpdate:false});
                // setUpdateDetails({isUpdate:false, data :null ,isAdd:true ,handleCloseModal:handleCloseModal })
                // router.push("/manage-master/add-area-of-concern");
              }}
            >
              Add concern Type
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
          <AreaOfConcernTable data={data} setUpdateData={setUpdateData} setOpenModal={setOpenModal}/>
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
      {
        openModal.isAdd  &&
        <AddAreaOfConcernModal
        open={openModal.isAdd} 
        handleCloseModal ={handleCloseModal}
        />
      }

      {
        openModal.isUpdate &&
        <UpdateAreaOfConcernModal 
        open={openModal.isUpdate}
        handleCloseModal={handleCloseModal}
        data ={updateData}
        />
      }
    </AppSectionContainer>
  );
};

export default AreaofConcern;
