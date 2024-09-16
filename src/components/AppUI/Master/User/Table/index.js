import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import propTypes from 'prop-types'; 
import TableHeading from './TableHeading';
import TableItemEmpty from './TableItemEmpty';
import AppTableContainer from '@components/AppTableContainer';
import TableItem from './TableItem';

const UserTable = ({data , setUpdateDetails , handleUpdateModal}) => {
  return (
    <AppTableContainer>
      <Table stickyHeader className='table'>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((data, index) => (
              <TableItem
                data={data}
                index={index}
                key={index} 
                setUpdateDetails={setUpdateDetails}
                handleUpdateModal={handleUpdateModal}
              />
            ))
          ) : (
            <TableItemEmpty text={'No record found...'} />
          )}
        </TableBody>
      </Table>
    </AppTableContainer>
  );
};

export default UserTable;

UserTable.defaultProps = {
  data: [],  
  setUpdateDetails:propTypes.func,
  handleUpdateModal: propTypes.func
};

UserTable.propTypes = {
  data: propTypes.array, 
  setUpdateDetails:propTypes.func,
  handleUpdateModal: propTypes.func
};
