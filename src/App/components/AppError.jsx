import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexybox';
import { FlatButton } from 'components/Buttons';

const AppError = props => (
  <Row center fill style={{ textAlign: 'center' }}>
    <Col flex={8}>
      <h1>
        There was an issue connecting to the Gestalt API. If a page refresh does not solve the issue please contact your Gestalt admin.
      </h1>
      <FlatButton
        label="Logout"
        color="primary"
        variant="contained"
        onClick={props.onLogout}
      />
    </Col>
  </Row>
);

AppError.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default AppError;
