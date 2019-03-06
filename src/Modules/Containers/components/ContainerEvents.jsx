import React from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import { Timestamp } from 'components/TableCells';
import { Title } from 'components/Typography';
import ArrowDownIcon from '@material-ui/icons/ArrowDownward';
import styled from 'styled-components';

const Message = styled.div`
  padding: 8px 0 8px 0;
`;

const ContainerEvents = ({ events }) => {
  const columns = [
    {
      name: 'Message',
      selector: 'message',
      sortable: true,
      wrap: true,
      cell: row => <Message>{row.message}</Message>
    },
    {
      name: 'Reason',
      selector: 'reason',
      sortable: true,
    },
    // {
    //   name: 'Type',
    //   selector: 'eventType',
    //   sortable: true,
    // },
    {
      name: 'Age',
      selector: 'age',
      sortable: true,
      cell: row => <Timestamp timestamp={row.age} />
    },
  ];

  return (
    <DataTable
      data={events}
      columns={columns}
      sortIcon={<ArrowDownIcon />}
      defaultSortField="age"
      noDataComponent={<Title light>There are no events to display</Title>}
      noHeader
      pagination
    />
  );
};

ContainerEvents.propTypes = {
  events: PropTypes.array,
};

ContainerEvents.defaultProps = {
  events: [],
};

export default ContainerEvents;
