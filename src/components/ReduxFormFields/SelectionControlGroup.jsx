import React from 'react';
import { SelectionControlGroup } from 'react-md';

/* eslint-disable react/prop-types */
export default ({ input, meta: { touched, error }, ...others }) => (
  <SelectionControlGroup
    id={input.name}
    {...input}
    {...others}
    error={touched && !!error}
  />
);