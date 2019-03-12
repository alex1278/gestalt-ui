import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Field } from 'react-final-form';
import { Col, Row } from 'react-flexybox';
import { UnixVariablesForm, LabelsForm } from 'Modules/Variables';
import { Panel } from 'components/Panels';
import { Chips } from 'components/Lists';
import { ProviderSelect, TextField, SelectField, Checkbox } from 'components/Form';
import { fixInputNumber, fixInputDecimal, formatName, composeValidators, required, validator } from 'util/forms';
import { isContainerName } from 'util/validations';
import { SecretsPanelForm } from 'Modules/Secrets';
import { VolumePanel } from 'Modules/Volumes';
import PortMappingsForm from './PortMappingsForm';
import HealthChecksForm from './HealthChecksForm';
import GPUSection from './GPUSection';
import actions from '../actions';
import { selectProvider } from '../reducers/selectors';

class ContainerForm extends PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired,
    errors: PropTypes.object,
    formName: PropTypes.string,
    values: PropTypes.object.isRequired,
    editMode: PropTypes.bool,
    inlineMode: PropTypes.bool,
    setSelectedProvider: PropTypes.func.isRequired,
    selectedProvider: PropTypes.object.isRequired,
    secrets: PropTypes.array,
    volumes: PropTypes.array,
    providers: PropTypes.array.isRequired,
    isJob: PropTypes.bool,
  };

  static defaultProps = {
    errors: {},
    editMode: false,
    inlineMode: false,
    formName: '',
    secrets: [],
    volumes: [],
    isJob: false,
  };

  // shouldComponentUpdate(nextProps) {
  //   return !isEqual(this.props.values, nextProps.values);
  // }

  render() {
    const {
      form,
      errors,
      formName,
      values,
      editMode,
      inlineMode,
      selectedProvider,
      setSelectedProvider,
      secrets,
      volumes,
      providers,
      isJob,
    } = this.props;

    const safeErrors = {
      ...errors,
      properties: { ...errors.properties },
    };

    const otherExpanded = editMode
      && selectedProvider.supportsOther
      && (get(values, 'properties.constraints.length') > 0 || values.properties.user || get(values, 'properties.accepted_resource_roles.length') > 0);

    if (!selectedProvider.isSelected) {
      return (
        <Row gutter={5}>
          <Col flex={12}>
            <Panel title="Select a CaaS Provider" expandable={false}>
              <Row gutter={5}>
                <Col flex={12}>
                  <ProviderSelect
                    label="CaaS Provider"
                    form={form}
                    name={`${formName}.properties.provider.id`}
                    providers={providers}
                    selectedProvider={selectedProvider}
                    setSelectedProvider={setSelectedProvider}
                  />
                </Col>
              </Row>
            </Panel>
          </Col>
        </Row>
      );
    }

    return (
      <React.Fragment>
        <Row gutter={5}>
          <Col flex={12} xs={12} sm={12} md={12}>
            <Panel expandable={false} fill>
              <Row gutter={5}>
                <Col flex={6} xs={12}>
                  <Field
                    id="container-name"
                    component={TextField}
                    name={`${formName}.name`}
                    label="Container Name"
                    type="text"
                    required
                    parse={formatName}
                    disabled={editMode}
                    autoFocus={!editMode}
                    validate={
                      composeValidators(
                        required(),
                        validator(isContainerName, 'invalid container name')
                      )
                    }
                  />
                </Col>
                <Col flex={6} xs={12}>
                  <Field
                    id="description"
                    component={TextField}
                    name={`${formName}.description`}
                    label="Description"
                    type="text"
                    multiline
                    rowsMax={12}
                  />
                </Col>
                <Col flex={2} xs={12}>
                  <Field
                    component={TextField}
                    name={`${formName}.properties.num_instances`}
                    inputProps={{
                      min: 0,
                      max: 999,
                      step: 1,
                    }}
                    label="Instances"
                    type="number"
                    parse={fixInputNumber}
                    format={fixInputNumber}
                    validate={
                      composeValidators(
                        required('instances ar required', true)
                      )
                    }
                  />
                </Col>
                <Col flex={2} xs={12}>
                  <Field
                    component={TextField}
                    name={`${formName}.properties.cpus`}
                    inputProps={{
                      min: 0.1,
                      max: 10.0,
                      step: 0.1,
                    }}
                    label="CPU"
                    type="number"
                    required
                    parse={fixInputDecimal}
                    format={fixInputDecimal}
                    validate={
                      composeValidators(
                        required('cpus is required')
                      )
                    }
                  />
                </Col>
                <Col flex={2} xs={12}>
                  <Field
                    component={TextField}
                    name={`${formName}.properties.memory`}
                    inputProps={{
                      min: 32,
                      step: 1,
                    }}
                    label="Memory (MB)"
                    type="number"
                    required
                    parse={fixInputNumber}
                    format={fixInputNumber}
                    validate={
                      composeValidators(
                        required('memory is required')
                      )
                    }
                  />
                </Col>

                <Col flex={6} xs={12}>
                  <Field
                    id="select-network"
                    component={SelectField}
                    name={`${formName}.properties.network`}
                    menuItems={selectedProvider.networks}
                    disabled={!selectedProvider.networks.length}
                    label={!selectedProvider.networks.length ? 'No Configured Network Types' : 'Network Type'}
                    itemLabel="name"
                    itemValue="name"
                    required
                    validate={
                      composeValidators(
                        required('a network required')
                      )
                    }
                  />
                </Col>

                <Col flex={10} xs={12} sm={12}>
                  <Field
                    component={TextField}
                    name={`${formName}.properties.image`}
                    label="Image"
                    type="text"
                    required
                    placeholder="[registry-url]/[namespace]/[image]:[tag]"
                    validate={
                      composeValidators(
                        required('an image required')
                      )
                    }
                  />
                </Col>

                <Col flex={2} xs={12} sm={12}>
                  <Field
                    id="force_pull"
                    type="checkbox"
                    component={Checkbox}
                    name={`${formName}.properties.force_pull`}
                    label="Force Pull Image"
                  />
                </Col>

                <Col flex={12}>
                  <Field
                    name={`${formName}.properties.cmd`}
                    component={TextField}
                    label="Command"
                    type="text"
                    placeholder="e.g. /usr/bin/myscript.sh arg1 arg2..."
                  />
                </Col>

                {get(selectedProvider.provider, 'properties.config.gpu_support.enabled') && (
                  <Col flex={12}>
                    <GPUSection selectedProvider={selectedProvider.provider} />
                  </Col>
                )}
              </Row>
            </Panel>
          </Col>

          {!isJob && (
            <Col flex={12}>
              <Panel
                title="Service Port Mappings"
                defaultExpanded={editMode && values.properties.port_mappings.length > 0}
                noPadding
                count={values.properties.port_mappings.length}
                error={safeErrors.properties.port_mappings && errors.properties.port_mappings.length > 0}
              >
                <PortMappingsForm
                  fieldName={`${formName}.properties.port_mappings`}
                  form={form}
                  networkType={values.properties.network}
                />
              </Panel>
            </Col>
          )}

          {!inlineMode && !isJob && (
            <Col flex={12}>
              <Panel
                title="Volumes"
                noPadding
                defaultExpanded={editMode && values.properties.volumes.length > 0}
                count={values.properties.volumes.length}
              >
                <VolumePanel
                  volumesDropdown={volumes}
                  volumes={values.properties.volumes}
                  selectedProvider={selectedProvider}
                  editMode={editMode}
                />
              </Panel>
            </Col>
          )}

          <Col flex={12}>
            <Panel
              title="Environment Variables"
              defaultExpanded={editMode && values.properties.env.length > 0}
              noPadding
              count={values.properties.env.length}
              error={safeErrors.properties.env && errors.properties.env.length > 0}
            >
              <UnixVariablesForm fieldName={`${formName}.properties.env`} />
            </Panel>
          </Col>

          <Col flex={12}>
            <Panel
              title="Labels"
              defaultExpanded={editMode && values.properties.labels.length > 0}
              noPadding
              count={values.properties.labels.length}
              error={safeErrors.properties.labels && errors.properties.labels.length > 0}
            >
              <LabelsForm fieldName={`${formName}.properties.labels`} />
            </Panel>
          </Col>

          {selectedProvider.supportsSecrets && !inlineMode && (
            <Col flex={12}>
              <Panel
                title="Secrets"
                noPadding
                defaultExpanded={editMode && values.properties.secrets.length > 0}
                count={values.properties.secrets.length}
                error={safeErrors.properties.secrets && errors.properties.secrets.length > 0}
              >
                <SecretsPanelForm
                  fieldName={`${formName}.properties.secrets`}
                  secretsDropdown={secrets}
                  provider={selectedProvider.provider}
                  type="container"
                  form={form}
                />
              </Panel>
            </Col>
          )}

          {/* TODO: Implement for Kubernetes/Docker when api is ready */}
          {selectedProvider.supportsHealth && (
            <Col flex={12}>
              <Panel
                title="Health Checks"
                noPadding
                defaultExpanded={editMode && values.properties.health_checks.length > 0}
                count={values.properties.health_checks.length}
                error={safeErrors.properties.health_checks && errors.properties.health_checks.length > 0}
              >
                <HealthChecksForm
                  fieldName={`${formName}.properties.health_checks`}
                />
              </Panel>
            </Col>
          )}

          {selectedProvider.supportsOther && (
          <Col flex={12}>
            <Panel
              title="Other"
              defaultExpanded={otherExpanded}
            >
              <Row gutter={5} alignItems="baseline">
                <Col flex={12}>
                  <Field
                    name={`${formName}.properties.constraints`}
                    id="container--constraints"
                    label="Constraints"
                    addLabel="Add Constraint"
                    component={Chips}
                    helpText="e.g. <field name>:<LIKE | UNLIKE | UNIQUE | CLUSTER | GROUP_BY | MAX_PER>:<optional param>"
                    ignorePrefixValidation
                  />
                </Col>
                <Col flex={6} xs={12}>
                  <Field
                    component={TextField}
                    name={`${formName}.properties.user`}
                    label="User"
                    type="text"
                    helpText="unix formatted username"
                  />
                </Col>
                <Col flex={6} xs={12}>
                  <Field
                    id="container--roles"
                    label="Role"
                    addLabel="Add Role"
                    component={Chips}
                    name={`${formName}.properties.accepted_resource_roles`}
                    ignorePrefixValidation
                  />
                </Col>
              </Row>
            </Panel>
          </Col>
          )}
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  selectedProvider: selectProvider(state),
});

export default compose(
  connect(mapStateToProps, actions),
)(ContainerForm);
