import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import propTypes from 'prop-types'; 
import TableHeading from './TableHeading';
import TableItemEmpty from './TableItemEmpty';
import AppTableContainer from '@components/AppTableContainer';
import TableItem from './TableItem';

const ComplaintTable = ({data , handleOpenModal}) => {
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
                handleOpenModal={handleOpenModal}
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

export default ComplaintTable;

ComplaintTable.defaultProps = {
  data: [],  
};

ComplaintTable.propTypes = {
  data: propTypes.array, 
  handleOpenModal: propTypes.func
  
};
