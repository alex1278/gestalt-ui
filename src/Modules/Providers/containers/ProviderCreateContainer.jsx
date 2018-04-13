import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { withMetaResource, withPickerData } from 'Modules/MetaResource';
import ProviderForm from './ProviderForm';
import validate from '../validations';
import actions from '../actions';
import { generateProviderPayload } from '../payloadTransformer';
import { getCreateProviderModel } from '../selectors';

class ProviderCreate extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    createProvider: PropTypes.func.isRequired,
    /* container related */
    containerValues: PropTypes.object,
    unloadEnvSchema: PropTypes.func.isRequired,
  };

  static defaultProps = {
    containerValues: {},
  };

  componentWillUnmount() {
    this.props.unloadEnvSchema();
  }

  create = (values) => {
    const { match, history, createProvider, containerValues } = this.props;

    const payload = generateProviderPayload(values, containerValues);
    const onSuccess = () => {
      if (match.params.workspaceId && !match.params.environmentId) {
        history.push(`/${match.params.fqon}/hierarchy/${match.params.workspaceId}/providers`);
      } else if (match.params.workspaceId && match.params.environmentId) {
        history.push(`/${match.params.fqon}/hierarchy/${match.params.workspaceId}/environment/${match.params.environmentId}/providers`);
      } else {
        history.push(`/${match.params.fqon}/providers`);
      }
    };

    // Create it
    if (match.params.workspaceId && !match.params.environmentId) {
      createProvider(match.params.fqon, match.params.workspaceId, 'workspaces', payload, onSuccess);
    } else if (match.params.environmentId) {
      createProvider(match.params.fqon, match.params.environmentId, 'environments', payload, onSuccess);
    } else {
      createProvider(match.params.fqon, null, null, payload, onSuccess);
    }
  }

  goBack = () => {
    const { match, history } = this.props;
    if (match.params.workspaceId && !match.params.environmentId) {
      history.push(`/${match.params.fqon}/hierarchy/${match.params.workspaceId}/providers`);
    } else if (match.params.workspaceId && match.params.environmentId) {
      history.push(`/${match.params.fqon}/hierarchy/${match.params.workspaceId}/environment/${match.params.environmentId}/providers`);
    } else {
      history.push(`/${match.params.fqon}/providers`);
    }
  };

  componentDidCatch(error, info) {
    // TODO: Eeat errors related to calling fetchEnvSchema and redux-form FieldArrays and don't unmount the form
    this.setState({ hasError: true, error, info });
  }

  render() {
    return (
      <ProviderForm
        title="Create Provider"
        submitLabel="Create"
        cancelLabel="Providers"
        onSubmit={this.create}
        goBack={this.goBack}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    provider: getCreateProviderModel(state),
    initialValues: getCreateProviderModel(state),
    enableReinitialize: true,
    keepDirtyOnReinitialize: true, // keeps dirty values in forms when the provider type is changed
    containerValues: getFormValues('containerCreate')(state),
  };
}

export default compose(
  withPickerData({ entity: 'resourcetypes', label: 'Resource Types', context: false, params: { type: 'Gestalt::Configuration::Provider' } }),
  withPickerData({ entity: 'providers', label: 'Providers', params: { expand: false } }),
  withMetaResource,
  connect(mapStateToProps, { ...actions }),
  reduxForm({
    form: 'providerCreate',
    validate,
  }),
)(ProviderCreate);
