import React, { PropTypes } from 'react';
import { Field, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { isUUID } from 'validator';
import Button from 'react-md/lib/Buttons/Button';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';
// import SelectField from 'components/SelectField';
import MDSelectField from 'react-md/lib/SelectFields';
import TextField from 'components/TextField';
import Breadcrumbs from 'modules/Breadcrumbs';
import { nameMaxLen } from './validations';
// import authTypes from '../../lists/authTypes';
// import httpMethods from '../../lists/httpMethods';
import implementationTypes from '../../lists/implementationTypes';

const PolicyEventRuleForm = (props) => {
  const {
    params,
    pending,
    apiEndpointUpdatePending,
    onSubmit,
    touched,
    error,
    invalid,
    pristine,
    submitting,
    handleSubmit,
    cancelLabel,
    submitLabel,
    title,
    // editMode,
    apiEndpoint,
    fetchLambdaProvider,
  } = props;

  const backLink = `${params.fqon}/workspaces/${params.workspaceId}/environments/${params.environmentId}/apis/${params.apiId}/edit`;

  const implementationChanged = value => isUUID(value) && fetchLambdaProvider(params.fqon, value);

  return (
    <form className="flex-row" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="flex-row center-center">
        <Card className="flex-10 flex-xs-12 flex-sm-12">
          <CardTitle
            title={
              <div>
                <div>{title}</div>
                <div className="md-caption"><Breadcrumbs />&nbsp;/&nbsp;
                  <Link
                    className="md-caption"
                    style={{ textDecoration: 'none' }}
                    to={{
                      pathname: backLink
                    }}
                  >
                    APIS
                  </Link><span> / Endpoint</span></div>
              </div>
            }
            subtitle={apiEndpoint.id ? apiEndpoint.id : null}
          />
          <CardText>
            <div className="flex-row">
              <Field
                className="flex-3 flex-xs-12"
                component={TextField}
                name="name"
                label="Name"
                type="text"
                required
                errorText={touched && error}
                maxLength={nameMaxLen}
              />
              {/* <Field
                id="auth-type"
                className="flex-2 flex-xs-6"
                component={SelectField}
                name="properties.auth_type.type"
                menuItems={authTypes}
                itemLabel="name"
                itemValue="value"
                required
                label="Auth Type"
                errorText={props.touched && props.error}
              />
              <Field
                id="auth-type"
                className="flex-2 flex-xs-6"
                component={SelectField}
                name="properties.http_method"
                menuItems={httpMethods}
                itemLabel="name"
                itemValue="value"
                required
                label="HTTP Method"
                errorText={props.touched && props.error}
              /> */}
              <Field
                className="flex-4 flex-xs-12"
                component={TextField}
                name="properties.resource"
                label="Resource Path"
                type="text"
                required
                errorText={touched && error}
                helpText="ex: /path1"
              />
              <MDSelectField
                id="endpoint-type"
                className="flex-2 flex-xs-6"
                menuItems={implementationTypes}
                itemLabel="name"
                itemValue="value"
                defaultValue="lambdas"
                required
                label="Type"
              />
              <Field
                className="flex-3 flex-xs-12"
                component={TextField}
                name="properties.implementation_id"
                label="Lambda UUID"
                type="text"
                required
                errorText={touched && error}
                onChange={(value1, value2) => implementationChanged(value2)}
              />
              {/* <Field
                className="flex-6 flex-xs-12"
                component={TextField}
                name="properties.implementation.function"
                label="Function"
                type="text"
                required
                errorText={touched && error}
              /> */}
            </div>
          </CardText>
          {apiEndpointUpdatePending || pending ? <LinearProgress id="apiEndpoint-form" /> : null}
          <CardActions>
            <Button
              flat
              label={cancelLabel}
              disabled={pending || submitting}
              component={Link}
              to={{
                pathname: backLink
              }}
            />
            <Button
              raised
              label={submitLabel}
              type="submit"
              disabled={pristine || pending || invalid || submitting}
              primary
            />
          </CardActions>
        </Card>
      </div>
    </form>
  );
};

PolicyEventRuleForm.propTypes = {
  fetchLambdaProvider: PropTypes.func.isRequired,
  apiEndpoint: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  pending: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  apiEndpointUpdatePending: PropTypes.bool,
  touched: PropTypes.bool,
  error: PropTypes.bool,
  title: PropTypes.string,
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  // editMode: PropTypes.bool,
};

PolicyEventRuleForm.defaultProps = {
  apiEndpointUpdatePending: false,
  touched: false,
  error: false,
  title: '',
  submitLabel: '',
  cancelLabel: 'Cancel',
  editMode: false,
};

export default connect(
  (state, props) => ({
    values: getFormValues(props.form)(state)
  })
)(PolicyEventRuleForm);
