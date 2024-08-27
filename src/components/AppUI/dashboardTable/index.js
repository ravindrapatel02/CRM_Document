import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import propTypes from 'prop-types';  
import AppTableContainer from '@components/AppTableContainer'; 
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import TableItemEmpty from './TableItemEmpty';

const DashboardTable = ({data}) => {
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

export default DashboardTable;

DashboardTable.defaultProps = {
  data: [],  
};

DashboardTable.propTypes = {
  data: propTypes.array, 
  
};
