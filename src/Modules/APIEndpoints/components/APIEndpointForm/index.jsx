import React from 'react';
import PropTypes from 'prop-types';
import { Field, getFormValues, change } from 'redux-form';
import { Col, Row } from 'react-flexybox';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';
import Autocomplete from 'react-md/lib/Autocompletes';
import Checkbox from 'components/Checkbox';
import SelectField from 'components/SelectField';
import SelectionControlGroup from 'components/SelectionControlGroup';
import TextField from 'components/TextField';
import { Button } from 'components/Buttons';
import HelpText from 'components/HelpText';
import DetailsPane from 'components/DetailsPane';
// import authTypes from '../../lists/authTypes';
import RateLimit from '../RateLimit';
import Security from '../Security';
import httpMethods from '../../lists/httpMethods';
import implementationTypes from '../../lists/implementationTypes';

const APIEndpointForm = (props) => {
  const {
    form,
    values,
    dispatch,
    match,
    apiEndpointPending,
    apiEndpointUpdatePending,
    onSubmit,
    invalid,
    pristine,
    submitting,
    handleSubmit,
    cancelLabel,
    submitLabel,
    title,
    apiEndpoint,
    fetchLambdasDropDown,
    fetchContainersDropDown,
    lambdasDropDown,
    containersDropDown,
    lambdasDropDownPending,
    containersDropDownPending,
  } = props;

  const backLink = `/${match.params.fqon}/hierarchy/${match.params.workspaceId}/environments/${match.params.environmentId}/apis/${match.params.apiId}/edit`;

  // TODO: implement selectors
  const containerPorts = () => {
    const container = containersDropDown.find(cont => cont.id === values.properties.implementation_id);
    return container && container.properties && container.properties.port_mappings;
  };

  const fetchContainers = () => {
    dispatch(change(form, 'properties.container_port_name', ''));
    fetchContainersDropDown(match.params.fqon, match.params.environmentId);
  };

  const handleAutoComplete = (value) => {
    dispatch(change(form, 'properties.implementation_id', value));
  };

  const resetForm = () => {
    dispatch(change(form, 'properties.implementation_id', ''));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      {apiEndpoint.id &&
        <Row gutter={5} center>
          <Col flex={10} xs={12} sm={12}>
            <DetailsPane model={apiEndpoint} />
          </Col>
        </Row>}
      <Row gutter={5} center>
        <Col component={Card} flex={10} xs={12} sm={12}>
          <CardTitle
            title={
              <div>
                <Link
                  style={{ color: 'inherit' }}
                  to={backLink}
                >
                  APIS
                </Link>
                <span> - {title}</span>
              </div>
            }
          />
          <CardText>
            <Row gutter={5}>
              <Field
                id="endpoint-type"
                className="flex-2 flex-xs-6"
                component={SelectField}
                name="properties.implementation_type"
                menuItems={implementationTypes}
                itemLabel="name"
                itemValue="value"
                label="Type"
                onChange={() => resetForm()}
                required
              />
              <Field
                className="flex-5 flex-xs-12"
                component={TextField}
                name="properties.resource"
                label="Resource Path"
                type="text"
                required
                helpText="ex: /path or /path1/path2"
              />
              {values.properties.implementation_type === 'container' &&
                <Field
                  id="containers-dropdown"
                  className="flex-3 flex-xs-12"
                  component={SelectField}
                  name="properties.implementation_id"
                  menuItems={containersDropDown}
                  itemLabel="name"
                  itemValue="id"
                  required
                  label="Container"
                  onFocus={() => fetchContainers()}
                  async
                  helpText="container from the current environment"
                />}
              {values.properties.implementation_type === 'lambda' &&
                <div className="flex-3 flex-sm-6 flex-xs-12">
                  <Autocomplete
                    id="lambdas-dropdown"
                    data={lambdasDropDown}
                    dataLabel="name"
                    dataValue="id"
                    label="Search Lambdas"
                    clearOnAutocomplete
                    onClick={() => fetchLambdasDropDown(match.params.fqon)}
                    onAutocomplete={value => handleAutoComplete(value)}
                    helpText="search in the current org by lambda name/uuid, or paste a lambda uuid below"
                  />
                  {/* TODO: needs a custom search control since autocomplete above cannot be validated with redux-form so we do it here */}
                  {(values.properties.implementation_type === 'lambda') &&
                    <Field
                      component={TextField}
                      name="properties.implementation_id"
                      label="Lambda UUID"
                    />}
                </div>}
              {values.properties.implementation_type === 'lambda' &&
                <Field
                  className="flex-2 flex-xs-6"
                  id="synchronous"
                  component={Checkbox}
                  name="properties.synchronous"
                  // TODO: Find out why redux-form state for bool doesn't apply
                  checked={values.properties.synchronous}
                  label="Synchronous"
                />}
              {values.properties.implementation_type === 'container' &&
                <Field
                  id="container-ports-dropdown"
                  className="flex-2 flex-xs-12"
                  component={SelectField}
                  name="properties.container_port_name"
                  menuItems={containerPorts()}
                  itemLabel="name"
                  itemValue="name"
                  required
                  label="Container Port Name"
                />}
              <Row gutter={5}>
                <Col flex={6} xs={12}>
                  <Field
                    inline
                    controlStyle={{ minWidth: '7em' }}
                    component={SelectionControlGroup}
                    type="checkbox"
                    id="controlGroupCheckbox"
                    name="properties.methods"
                    label={<span>HTTP Methods<span>*</span></span>}
                    controls={httpMethods}
                  />
                  <HelpText message="* at least one http method is required" />
                </Col>

                <RateLimit
                  className="flex-6 flex-xs-12"
                  rateLimitToggledName="properties.plugins.rateLimit.enabled"
                  perMinuteName="properties.plugins.rateLimit.perMinute"
                  isToggled={values.properties.plugins.rateLimit && values.properties.plugins.rateLimit.enabled}
                />

                <Security
                  className="flex-4"
                  enabledName="properties.plugins.gestaltSecurity.enabled"
                  {...props}
                />
              </Row>
            </Row>
          </CardText>
          {(apiEndpointUpdatePending || apiEndpointPending) && <LinearProgress id="apiEndpoint-form" />}
          <CardActions>
            <Button
              flat
              disabled={apiEndpointUpdatePending || apiEndpointPending || submitting}
              component={Link}
              to={backLink}
            >
              {cancelLabel}
            </Button>
            <Button
              raised
              type="submit"
              disabled={pristine || apiEndpointPending || apiEndpointUpdatePending || lambdasDropDownPending || containersDropDownPending || invalid || submitting}
              primary
            >
              {submitLabel}
            </Button>
          </CardActions>
        </Col>
      </Row>
    </form>
  );
};

APIEndpointForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  form: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  apiEndpoint: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  apiEndpointPending: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  apiEndpointUpdatePending: PropTypes.bool,
  fetchLambdasDropDown: PropTypes.func.isRequired,
  fetchContainersDropDown: PropTypes.func.isRequired,
  lambdasDropDown: PropTypes.array.isRequired,
  containersDropDown: PropTypes.array.isRequired,
  lambdasDropDownPending: PropTypes.bool,
  containersDropDownPending: PropTypes.bool,
  title: PropTypes.string,
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
};

APIEndpointForm.defaultProps = {
  lambdasDropDownPending: false,
  containersDropDownPending: false,
  apiEndpointUpdatePending: false,
  title: '',
  submitLabel: '',
  cancelLabel: 'Cancel',
};

export default connect(
  (state, props) => ({
    values: getFormValues(props.form)(state),
  })
)(APIEndpointForm);