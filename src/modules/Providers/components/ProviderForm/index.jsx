import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, getFormValues, isInvalid } from 'redux-form';
import Button from 'react-md/lib/Buttons/Button';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';
import FileInput from 'react-md/lib/FileInputs';
import { ExpansionList } from 'react-md/lib/ExpansionPanels';
import { ExpansionPanelNoPadding } from 'components/ExpansionList';
import AceEditor from 'components/AceEditor';
import JSONTree from 'components/JSONTree';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import Breadcrumbs from 'modules/Breadcrumbs';
import { VariablesForm } from 'modules/Variables';
import { ContainerCreate, ContainerDetails, ContainerActions } from 'modules/Containers';
import LinkedProviders from '../LinkedProviders';
import { nameMaxLen } from './validations';
import providerTypes from '../../lists/providerTypes';

const ProviderForm = (props) => {
  const { provider, change, reset, values, params, router, container, fetchEnvSchema } = props;
  const selectedProviderType = providerTypes.find(type => type.value === values.resource_type) || {};

  const getProviders = () => {
    const entityId = params.environmentId || params.workspaceId || null;
    const entityKey = params.workspaceId && params.enviromentId ? 'environments' : 'workspaces';
    props.fetchProviders(params.fqon, entityId, entityKey);
  };

  const goBack = () => {
    if (params.workspaceId && !params.environmentId) {
      router.push(`${params.fqon}/workspaces/${params.workspaceId}`);
    } else if (params.environmentId) {
      router.push(`${params.fqon}/workspaces/${params.workspaceId}/environments/${params.environmentId}`);
    } else {
      router.push(`${params.fqon}/providers`);
    }
  };

  const onFile = (file) => {
    const reader = new FileReader();

    reader.onload = () => {
      props.dispatch(change('properties.data', reader.result));
    };

    reader.readAsText(file);
  };

  const handleProviderChange = (value) => {
    const providerType = providerTypes.find(type => type.value === value);

    if (providerType) {
      fetchEnvSchema(providerType.type);
    }

    reset();
  };

  const renderExternalProtocolSection = () => (
    !selectedProviderType.externalProtocol ? null : <Field
      id="select-return-type"
      className="flex-2 flex-xs-12 flex-sm-4"
      component={SelectField}
      name="properties.config.external_protocol"
      menuItems={[{ name: 'HTTPS', value: 'https' }, { name: 'HTTP', value: 'http' }]}
      itemLabel="name"
      itemValue="value"
      label="External Protocol"
      helpText="The protocol used to reach any externally exposed endpoints"
    />
  );

  const renderConfigSection = () => (
    !selectedProviderType.config ? null :
    <div className="flex-row">
      <Field
        className="flex-6 flex-xs-12 flex-sm-12"
        component={TextField}
        name="properties.config.url"
        label="Provider URL/Host:Port"
        type="text"
        required
      />
      <Field
        id="select-return-type"
        className="flex-2 flex-xs-12 flex-sm-4"
        component={SelectField}
        name="properties.config.auth.scheme"
        menuItems={['Basic']}
        required
        label="Security Scheme"
      />
      <Field
        className="flex-2 flex-xs-12 flex-sm-4"
        component={TextField}
        name="properties.config.auth.username"
        label="Username"
        type="text"
        required
      />
      <Field
        className="flex-2 flex-xs-12 flex-sm-4"
        component={TextField}
        name="properties.config.auth.password"
        label="Password"
        type="password"
        required
      />
    </div>
  );

  const renderJSONSection = () => (
    props.pendingSchema ? null :
    <div className="flex-row">
      {!selectedProviderType.networking ? null : <div className="flex-6 flex-xs-12">
        <JSONTree
          data={props.provider.properties.config.networks || []}
        />
      </div>}
      {!selectedProviderType.extraConfig ? null : <div className="flex-6 flex-xs-12">
        <JSONTree
          data={props.provider.properties.config.extra || {}}
        />
      </div>}
    </div>
  );

  const renderVariablesSection = () => (
    props.pendingSchema || !selectedProviderType.type ? null :
    <div className="flex-row">
      <div className="flex-6 flex-xs-12 flex-sm-12">
        <VariablesForm icon="public" addButtonLabel="Add Public Variable" fieldName="publicVariables" />
      </div>
      <div className="flex-6 flex-xs-12 flex-sm-12">
        <VariablesForm icon="vpn_key" addButtonLabel="Add Private Variable" fieldName="privateVariables" />
      </div>
    </div>
  );

  const renderEditorSection = () => (
    props.pendingSchema ? null :
    <div className="flex-row">
      {selectedProviderType.uploadConfig &&
        <FileInput
          id="imageInput1"
          label="Upload YAML"
          onChange={(file, e) => onFile(file, e)}
          accept="application/x-yaml"  // The IANA MIME types registry doesn't list YAML yet, so there isn't a correct one, per se.
          primary
        />}
      {selectedProviderType.uploadConfig &&
        <div className="flex-row">
          <Field
            className="flex-12"
            component={AceEditor}
            mode="yaml"
            theme="chrome"
            name="properties.data"
            maxLines={50}
            minLines={15}
            fontSize={12}
          />
        </div>}
    </div>
  );

  const renderOtherConfigSection = () => (
    !props.pendingSchema &&
    <div className="flex-row">
      {selectedProviderType.networking &&
        <Field
          className="flex-6 flex-xs-12"
          component={TextField}
          name="properties.config.networks"
          label="Networks (JSON)"
          type="text"
          rows={2}
        />}
      {selectedProviderType.extraConfig &&
        <Field
          className="flex-6 flex-xs-12"
          component={TextField}
          name="properties.config.extra"
          label="Extra Configuration (JSON)"
          type="text"
          rows={2}
        />}
    </div>
  );

  const renderContainerSection = () => (
    selectedProviderType.allowContainer &&
      <div className="flex-row center-center">
        <Card title="Container" className="flex-10 flex-xs-12 flex-sm-12 flex-md-12">
          <CardTitle
            title="Container"
            subtitle={`The provider type: ${selectedProviderType.name} requires a container`}
          />
          <ContainerCreate params={props.params} inlineMode />
        </Card>
      </div>
  );

  const renderContainerDetailsPanel = () => (
    selectedProviderType.allowContainer && container.id &&
      <div className="flex-row center-center no-gutter">
        <Card className="flex-10 flex-xs-12 flex-sm-12 flex-md-12">
          <div className="flex-row">
            <div className="flex">
              <ContainerDetails container={props.container} />
            </div>
          </div>
        </Card>
      </div>
  );

  const renderContainerActions = () => (
    selectedProviderType.allowContainer && container.id ?
      <ContainerActions container={container} inContainerView {...props} disableDestroy /> : null
  );

  return (
    <div>
      <form className="flex-row" onSubmit={props.handleSubmit(props.onSubmit)} autoComplete="off">
        <div className="flex-row center-center">
          <Card className="flex-10 flex-xs-12 flex-sm-12 flex-md-12">
            <CardTitle
              title={
                <div>
                  <div>{props.title}</div>
                  {renderContainerActions()}
                  <div className="md-caption"><Breadcrumbs /> / Provider</div>
                </div>
              }
              subtitle={provider.id}
            />
            <CardText>
              <div className="flex-row">
                <div className="flex-row">
                  <Field
                    id="select-provider"
                    className="flex-3 flex-xs-12 flex-sm-6"
                    component={SelectField}
                    name="resource_type"
                    menuItems={providerTypes}
                    itemLabel="name"
                    itemValue="value"
                    required
                    label="Provider Type"
                    disabled={provider.id}
                    async
                    onChange={(a, value) => handleProviderChange(value)} // TODO: there is a bug with the first parram which should be the value
                  />
                  <Field
                    className="flex-3 flex-xs-12 flex-sm-6"
                    component={TextField}
                    name="name"
                    label="Name"
                    type="text"
                    required
                    maxLength={nameMaxLen}
                    disabled={provider.id}
                  />
                  <Field
                    className="flex-6 flex-xs-12 flex-sm-12"
                    component={TextField}
                    name="description"
                    label="Description"
                    type="text"
                  />
                </div>
                {renderConfigSection()}
                {renderExternalProtocolSection()}
                {renderEditorSection()}
                {renderVariablesSection()}
                {renderOtherConfigSection()}
                {provider.id && renderJSONSection()}
              </div>
            </CardText>
            {props.updatePending || props.pendingSchema || props.pending ? <LinearProgress id="provider-form" /> : null}
            <CardActions>
              <Button
                flat
                label={props.cancelLabel}
                disabled={props.updatePending || props.pending || props.submitting}
                onClick={() => goBack()}
              />
              <Button
                raised
                label={props.submitLabel}
                type="submit"
                disabled={props.pristine || props.updatePending || props.pendingSchema || props.pending || props.invalid || props.submitting || props.containerCreateInvalid}
                primary
              />
            </CardActions>
          </Card>
        </div>

        {!props.editMode ? <div /> : renderContainerDetailsPanel()}

        {!selectedProviderType.type ? null :
        <div className="flex-row center-center">
          <ExpansionList className="flex-10 flex-xs-12 flex-sm-12 flex-md-12">
            <ExpansionPanelNoPadding label={<h2>Linked Providers</h2>} saveLabel="Collapse" defaultExpanded>
              <div className="flex-row">
                <div className="flex-12">
                  <LinkedProviders fetchProviders={getProviders} providers={props.providers} pendingProviders={props.pendingProviders} />
                </div>
              </div>
            </ExpansionPanelNoPadding>
          </ExpansionList>
          {!props.editMode && renderContainerSection()}
        </div>}
      </form>
    </div>
  );
};

ProviderForm.propTypes = {
  params: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  pending: PropTypes.bool.isRequired,
  change: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  providers: PropTypes.array.isRequired,
  pendingProviders: PropTypes.bool.isRequired,
  provider: PropTypes.object,
  updatePending: PropTypes.bool,
  pendingSchema: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  values: PropTypes.object.isRequired,
  fetchEnvSchema: PropTypes.func.isRequired,
  title: PropTypes.string,
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  containerCreateInvalid: PropTypes.bool.isRequired,
  editMode: PropTypes.bool,
  container: PropTypes.object,
};

ProviderForm.defaultProps = {
  title: '',
  submitLabel: '',
  cancelLabel: 'Cancel',
  provider: {},
  updatePending: false,
  editMode: false,
  container: {},
};

// Connect to this forms state in the store so we can enum the values
export default connect(
  (state, props) => ({
    values: getFormValues(props.form)(state),
    containerCreateInvalid: isInvalid('containerCreate')(state),
  })
)(ProviderForm);
