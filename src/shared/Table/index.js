import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import propTypes from 'prop-types';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import TableItemEmpty from './TableItemEmpty';
import AppTableContainer from '@/src/components/AppTableContainer';

const TaskTable = ({data , handleRemoveSelectSeat , handleChange}) => {
  return (
    <AppTableContainer>
      <Table stickyHeader className='table'>
        <TableHead >
          <TableHeading />
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((data, index) => (
              <TableItem
                data={data}
                index={index}
                key={index}
                handleRemoveSelectSeat={handleRemoveSelectSeat}
                handleChange ={handleChange}
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

export default TaskTable;

TaskTable.defaultProps = {
  data: [], 
};

TaskTable.propTypes = {
  data: propTypes.array,
  handleRemoveSelectSeat:propTypes.func,
  handleChange :propTypes.func
  
};
