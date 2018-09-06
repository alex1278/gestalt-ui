import React from 'react';
import styled from 'styled-components';
import { SelectField } from 'react-md';
import { DotActivity } from 'components/ProgressIndicators';

const Div = styled.div`
  width: 100%;
  height: 3em;
  text-align: center;

  .spinner {
    line-height: 52px;
  }
`;

const ActivityIndicator = () => (
  <Div>
    <DotActivity size={1.2} primary centered />
  </Div>
);

// const getIcon = hasError => (hasError ? <React.Fragment><FontIcon>arrow_drop_down</FontIcon><FontIcon style={{ color: '#f44336' }}>feedback</FontIcon></React.Fragment> : <FontIcon>arrow_drop_down</FontIcon>);

/* eslint-disable react/prop-types */
export default ({ input, meta: { touched, error }, menuItems, async, ...others }) => {
  const compileMenuItems = () => (
    menuItems.length ?
      menuItems :
      [{
        id: `${input.name}--pending`,
        component: ActivityIndicator,
        centered: true,
      }]
  );

  const items = async ? compileMenuItems() : menuItems;

  return (
    <SelectField
      {...input}
      {...others}
      id={input.id || input.name}
      error={touched && !!error}
      errorText={error}
      menuItems={items}
      lineDirection="center"
      sameWidth
      fullWidth
      // dropdownIcon={getIcon(touched && !!error)}
    />
  );
};
