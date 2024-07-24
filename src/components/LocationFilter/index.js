import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "@/src/redux/slice/LocationSlice";
import AppLoader from "../CustomLoader";

const LocationFilter = ({ filter, setFilter }) => {
  const dispatch = useDispatch();

  const [locationList, setLocationList] = useState([]);
  const [buildingList, setBuildingList] = useState([]);
  const [floorList, setFloorlist] = useState([]);
  const [buildingData, setBuildingData] = useState([]);

  const { data, loading, error } = useSelector((state) => state.locationData);

  useEffect(() => {
    dispatch(getLocation());
  }, []);

  
  useEffect(() => {
    if (data && data.length > 0) {
      const locationArray = [];
      data.forEach((item) => {
        locationArray.push({
          label: item.locationName,
          value: item.locationName,
        });
      });
      setLocationList(locationArray);
    }
  }, [data]);

  const getBuildingList = (locationId) => {
    
    const filterData = data.filter((item) => item.locationName === locationId);
    if (
      filterData[0].buildingDtoList &&
      filterData[0].buildingDtoList.length > 0
    ) {
      setBuildingData(filterData[0].buildingDtoList);
      const buildingArray = [];
      filterData[0].buildingDtoList.forEach((item) => {
        buildingArray.push({
          label: item.buildingName,
          value: item.buildingName,
        });
      });
      setBuildingList(buildingArray);
    }
  };

  const getFloorList = (buildingId) => {
    const filterData = buildingData.filter((item) => item.buildingName === buildingId)[0];
    if (filterData.floorDtoList && filterData.floorDtoList.length > 0) {
      const floorArray = [];
      filterData.floorDtoList.forEach((item) => {
        floorArray.push({
          label: item.floorName,
          value: item.floorName,
        });
      });
      setFloorlist(floorArray);
    }
  };

  const handleChange = (value, name) => {
    if (name === "location") {
      setFilter({ ...filter, [name]: value, building: "" });
      setBuildingList([]);
      setFloorlist([]);
      getBuildingList(value);
    }

    if (name === "building") {
      setFilter({ ...filter, [name]: value });
      // setBuildingList([]);
      setFloorlist([]);
      getFloorList(value);
    }

    if (name === "floor") {
      setFilter({ ...filter, [name]: value });
    }
  };
 
  return (
    <React.Fragment>
      {loading ? (
        <AppLoader />
      ) : (
        <div className="seatBooking locationFilter">
          <div className="container ">
            <div className="row">
              <div className="col-12">
                <div className="row mt-3">
                  <div className="col-12 col-md-4 d-md-flex mt-2 mt-sm-0">
                    <label className="text-nowrap d-flex align-items-center mr-2 fw-bold">
                      Location <span className="d-none d-sm-block">:</span>{" "}
                    </label>
                    <Autocomplete
                      disablePortal
                      fullWidth
                      id="combo-box-demo"
                      name="location"
                      options={locationList}
                      // value={filter.location}
                      onChange={(e, value) => {
                        handleChange(value?.value, "location");
                      }}
                      inputlabelprops={{
                        shrink: true,
                      }}
                      inputprops={{
                        maxLength: 1000,
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="" />
                      )}
                    />
                  </div>

                  <div className="col-12 col-md-4 d-md-flex mt-2 mt-sm-0">
                    <label className="text-nowrap d-flex align-items-center mr-2 fw-bold">
                      Building <span className="d-none d-sm-block">:</span>{" "}
                    </label>
                    <Autocomplete
                      disablePortal
                      fullWidth
                      id="combo-box-demo"
                      name="building"
                      options={buildingList}
                      getOptionLabel={(option) => option.label}
                      onChange={(e, value) =>
                        handleChange(value?.value, "building")
                      }
                      inputlabelprops={{
                        shrink: true,
                      }}
                      inputprops={{
                        maxLength: 1000,
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="" />
                      )}
                    />
                  </div>

                  <div className="col-12 col-md-4 d-md-flex mt-2 mt-sm-0">
                    <label className="text-nowrap d-flex align-items-center mr-2 fw-bold">
                      Floor <span className="d-none d-sm-block">:</span>{" "}
                    </label>
                    <Autocomplete
                      disablePortal
                      fullWidth
                      id="combo-box-demo"
                      name="floor"
                      options={floorList}
                      onChange={(e, value) =>
                        handleChange(value.value, "floor")
                      }
                      inputlabelprops={{
                        shrink: true,
                      }}
                      inputprops={{
                        maxLength: 1000,
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="" />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default LocationFilter;
