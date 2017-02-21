import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import CircularActivity from 'components/CircularActivity';
import { map } from 'lodash';
import { volumeModalActions } from 'modules/VolumeModal';
import { networkModalActions } from 'modules/NetworkModal';
import { healthCheckModalActions } from 'modules/HealthCheckModal';
import ContainerForm from '../../components/ContainerForm';
import validate from '../../validations';
import * as actions from '../../actions';

class ContainerEdit extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    container: PropTypes.object.isRequired,
    fetchContainer: PropTypes.func.isRequired,
    fetchProviders: PropTypes.func.isRequired,
    onUnload: PropTypes.func.isRequired,
    unloadVolumes: PropTypes.func.isRequired,
    unloadNetworks: PropTypes.func.isRequired,
    redeployContainer: PropTypes.func.isRequired,
    pending: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    const { params, fetchContainer, fetchProviders } = this.props;
    // init providers dropdown
    fetchProviders(params.fqon, params.environmentId, 'Marathon');
    fetchContainer(params.fqon, params.containerId, params.environmentId);
  }

  componentWillUnmount() {
    const { onUnload, unloadVolumes, unloadNetworks } = this.props;
    onUnload();
    unloadVolumes();
    unloadNetworks();
  }

  redeployContainer(values) {
    const { id } = this.props.container;
    const { params } = this.props;

    this.props.redeployContainer(params.fqon, params.workspaceId, params.environmentId, id, values);
  }

  render() {
    const { container, pending } = this.props;
    return pending ? <CircularActivity id="container-load" /> : <ContainerForm editMode title={container.name} submitLabel="Redeploy" cancelLabel="Back" onSubmit={values => this.redeployContainer(values)} {...this.props} />;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, actions, volumeModalActions, networkModalActions, healthCheckModalActions), dispatch);
}

function mapStateToProps(state) {
  const { container, pending } = state.containers.fetchOne;
  const variables = map(container.properties.env, (value, key) => ({ key, value }));
  const labels = map(container.properties.labels, (value, key) => ({ key, value }));

  const model = {
    name: container.name,
    description: container.description,
    properties: {
      env: container.properties.env,
      labels: container.properties.labels,
      container_type: container.properties.container_type,
      accepted_resource_roles: container.properties.accepted_resource_roles,
      constraints: container.properties.constraints,
      health_checks: container.properties.health_checks,
      instances: container.properties.instances,
      port_mappings: container.properties.port_mappings,
      service_addresses: container.properties.service_addresses,
      volumes: container.properties.volumes,
      provider: container.properties.provider,
      force_pull: container.properties.force_pull,
      cpus: container.properties.cpus,
      memory: container.properties.memory,
      num_instances: container.properties.num_instances,
      network: container.properties.network,
      image: container.properties.image,
      cmd: container.properties.cmd,
      user: container.properties.user,
    },
    variables,
    labels,
  };

  return {
    container,
    pending,
    pendingProviders: state.containers.providers.pending,
    providers: state.containers.providers.providers,
    volumeModal: state.volumeModal.volumeModal,
    volumes: state.volumeModal.volumes.volumes,
    networkModal: state.networkModal.networkModal,
    networks: state.networkModal.networks.networks,
    healthCheckModal: state.healthCheckModal.healthCheckModal,
    healthChecks: state.healthCheckModal.healthChecks.healthChecks,
    initialValues: model,
    enableReinitialize: true,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'containerEdit',
  validate
})(ContainerEdit));
