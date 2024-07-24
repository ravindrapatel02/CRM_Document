import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import propTypes from 'prop-types'; 
import TableHeading from './TableHeading';
import TableItemEmpty from './TableItemEmpty';
import AppTableContainer from '@components/AppTableContainer';

const ActivityTable = ({data}) => {
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

export default ActivityTable;

ActivityTable.defaultProps = {
  data: [],  
};

ActivityTable.propTypes = {
  data: propTypes.array, 
  
};
