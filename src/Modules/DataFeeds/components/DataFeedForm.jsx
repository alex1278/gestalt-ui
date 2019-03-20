import React from 'react';
import PropTypes from 'prop-types';
import DataFeedSection from './DataFeedSection';
import DataFeedPropertiesSection from './DataFeedPropertiesSection';

const DataFeedForm = ({ values, secrets, tags }) => (
  <React.Fragment>
    <DataFeedSection />
    <DataFeedPropertiesSection
      secrets={secrets}
      formValues={values}
      tags={tags}
    />
  </React.Fragment>
);

DataFeedForm.propTypes = {
  values: PropTypes.object.isRequired,
  secrets: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
};

export default DataFeedForm;
