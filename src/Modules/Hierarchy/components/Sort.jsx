import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Div from 'components/Div';
import { FontIcon } from 'react-md';
import SelectField from 'components/Fields/SelectField';
import { Button } from 'components/Buttons';

const SortWrapper = styled(Div)`
  display: inline-flex;
  align-items: center;

  button {
    margin-top: 1px;
  }
`;

const Filter = styled(SelectField)`
  max-width: 150px;
  margin-right: 10px;
  height: 38px;
`;

const SortOrderIcon = styled(FontIcon)`
  transform: ${props => (props.order === 'asc' ? 'scaleY(1)' : 'scaleY(-1)')};
`;

const sortItems = Object.freeze([
  { name: 'name', value: 'description' },
  { name: 'short-name', value: 'name' },
  { name: 'owner', value: 'owner.name' },
  { name: 'created', value: 'created.timestamp' },
  { name: 'modified', value: 'modified.timestamp' }
]);

const generateSortList = (isEnvironment) => {
  const ofSorts = sortItems.slice();
  if (isEnvironment) {
    ofSorts.push({ name: 'environment type', value: 'properties.environment_type' });
  } else {
    ofSorts.splice(1, 0, { name: 'type', value: 'resource_type' });
  }

  return ofSorts;
};

const Sort = ({ isEnvironment, disabled, setKey, sortKey, order, setOrder }) => {
  const handleSort = () => {
    const orderValue = order === 'asc' ? 'desc' : 'asc';
    setOrder(orderValue);
  };

  return (
    <SortWrapper disabled={disabled}>
      <Filter
        id="sort--key"
        menuItems={generateSortList(isEnvironment)}
        itemLabel="name"
        itemValue="value"
        value={sortKey}
        onChange={e => setKey(e.target.value)}
        margin="dense"
      />
      <Button
        icon
        onClick={handleSort}
      >
        <SortOrderIcon order={order}>arrow_upward</SortOrderIcon>
      </Button>
    </SortWrapper>
  );
};

Sort.propTypes = {
  disabled: PropTypes.bool,
  sortKey: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  setKey: PropTypes.func.isRequired,
  setOrder: PropTypes.func.isRequired,
  isEnvironment: PropTypes.bool,
};

Sort.defaultProps = {
  disabled: true,
  isEnvironment: false,
};

export default Sort;
