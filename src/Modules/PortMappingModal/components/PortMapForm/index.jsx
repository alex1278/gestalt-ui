import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexybox';
import { Field, getFormValues } from 'redux-form';
import { Button } from 'components/Buttons';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import Checkbox from 'components/Checkbox';
import { ModalFooter } from 'components/Modal';
import { serviceNameMaxLen } from './validations';
import networkProtocols from '../../lists/networkProtocols';

const fixInputNumber = value => value && parseInt(value, 10);
const PortMapForm = (props) => {
  const { values } = props;

  const close = () => {
    props.reset();
    props.hidePortmapModal();
  };

  return (
    <form onSubmit={props.handleSubmit(props.onSubmit)} autoComplete="off" style={{ marginTop: '-.5em' }}>
      <Row gutter={5}>
        <Field
          id="expose-service"
          component={Checkbox}
          name="expose_endpoint"
          // TODO: Find out why redux-form state for bool doesn't apply
          checked={values.expose_endpoint}
          label="Expose Service"
        />
        <Row gutter={5} style={{ marginTop: '-1.4em' }}>
          <Col flex={6} xs={6}>
            <Field
              name="name"
              type="text"
              label="Service Name"
              component={TextField}
              required
              maxLength={serviceNameMaxLen}
              helpText="e.g. web"
            />
          </Col>
          <Col flex={3} xs={3}>
            <Field
              id="port-mapping-protocol"
              name="protocol"
              component={SelectField}
              label="Protocol"
              itemLabel="displayName"
              itemValue="value"
              menuItems={networkProtocols}
              required
            />
          </Col>
          {(values.expose_endpoint && props.networkType === 'HOST') &&
          <Col flex={3} xs={6}>
            <Field
              name="service_port"
              type="number"
              min={0}
              max={65535}
              label="Service Port"
              component={TextField}
              required
              normalize={fixInputNumber}
            />
          </Col>}
          {(props.networkType !== 'HOST') &&
          <Col flex={3} xs={6}>
            <Field
              name="container_port"
              type="number"
              min={0}
              max={65535}
              label="Container Port"
              component={TextField}
              required
              normalize={fixInputNumber}
            />
          </Col>}
          {values.expose_endpoint &&
          <Col flex={12}>
            <Field
              name="virtual_hosts"
              component={TextField}
              label="Virtual Hosts"
              helpText="Comma delimited set of virtual host names or addresses"
            />
          </Col>}
        </Row>
        <ModalFooter>
          <Button
            flat
            onClick={() => close()}
          >
            Cancel
          </Button>
          <Button
            flat
            type="submit"
            disabled={props.pristine || props.invalid || props.submitting}
            primary
          >
            Add Port Mapping
          </Button>
        </ModalFooter>
      </Row>
    </form>
  );
};

PortMapForm.propTypes = {
  hidePortmapModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  networkType: PropTypes.string.isRequired,
};

// Connect to this forms state in the store so we can enum the values
export default connect(
  (state, props) => ({
    values: getFormValues(props.form)(state)
  })
)(PortMapForm);
