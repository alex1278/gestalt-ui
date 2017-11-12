import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { withMetaResource } from 'Modules/MetaResource';
import { generateContextEntityState } from 'util/helpers/transformations';
import ProviderForm from '../components/ProviderForm';
import validate from '../validations';
import actions from '../actions';
import { generateProviderPayload } from '../payloadTransformer';
import withResourceTypes from '../hocs/withResourceTypes';
import { getCreateProviderModel } from '../selectors';

class ProviderCreate extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    createProvider: PropTypes.func.isRequired,
    /* container related */
    containerValues: PropTypes.object,
    volumes: PropTypes.array.isRequired,
    portMappings: PropTypes.array.isRequired,
    healthChecks: PropTypes.array.isRequired,
    secretsFromModal: PropTypes.array.isRequired,
    fetchProvidersByType: PropTypes.func.isRequired,
    fetchProviders: PropTypes.func.isRequired,
    unloadEnvSchema: PropTypes.func.isRequired,
    unloadProviders: PropTypes.func.isRequired,
  };

  static defaultProps = {
    containerValues: {},
  };

  componentDidMount() {
    const { match, fetchProvidersByType, fetchProviders } = this.props;
    const entity = generateContextEntityState(match.params);

    fetchProvidersByType(match.params.fqon, entity.id, entity.key, null, false);
    fetchProviders(match.params.fqon, entity.id, entity.key);
  }

  componentWillUnmount() {
    this.props.unloadProviders();
    this.props.unloadEnvSchema();
  }

  create = (values) => {
    const { match, history, createProvider, containerValues, volumes, portMappings, healthChecks, secretsFromModal } = this.props;
    const mergeProps = [
      {
        key: 'volumes',
        value: volumes,
      },
      {
        key: 'port_mappings',
        value: portMappings,
      },
      {
        key: 'health_checks',
        value: healthChecks,
      },
      {
        key: 'secrets',
        value: secretsFromModal,
      }
    ];

    const payload = generateProviderPayload(values, mergeProps, containerValues);
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
    volumes: state.volumeModal.volumes.volumes,
    portMappings: state.portmapModal.portMappings.portMappings,
    healthChecks: state.healthCheckModal.healthChecks.healthChecks,
    secretsFromModal: state.secrets.secrets.secrets,
  };
}

export default compose(
  withMetaResource,
  withResourceTypes,
  connect(mapStateToProps, { ...actions }),
  reduxForm({
    form: 'providerCreate',
    validate,
  }),
)(ProviderCreate);
