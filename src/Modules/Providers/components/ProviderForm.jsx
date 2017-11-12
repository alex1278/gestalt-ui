import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, getFormValues, isInvalid } from 'redux-form';
import { Col, Row } from 'react-flexybox';
import { Card, CardTitle, CardText, LinearProgress } from 'react-md';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import { Button } from 'components/Buttons';
import DetailsPane from 'components/DetailsPane';
import ActionsToolbar from 'components/ActionsToolbar';
import { Panel } from 'components/Panels';
import HelpText from 'components/HelpText';
import { ContainerCreate, ContainerEdit } from 'Modules/Containers';
import LinkedProviders from './LinkedProviders';
import EnvironmentTypes from './EnvironmentTypes';
import VariablesSection from './VariablesSection';
import DCOSEESection from './DCOSEESection';
import OtherConfigSection from './OtherConfigSection';
import KubeEditorSection from './KubeEditorSection';
import URLConfigSection from './URLConfigSection';
import SecuritySection from './SecuritySection';
import { nameMaxLen } from '../validations';
import { generateResourceTypeSchema } from '../lists/providerTypes';

const httpProtocols = [{ name: 'HTTPS', value: 'https' }, { name: 'HTTP', value: 'http' }];

const ProviderForm = (props) => {
  const { provider, reset, values, history, match, container, fetchEnvSchema } = props;
  const compiledProviderTypes = generateResourceTypeSchema(props.resourceTypes);
  const selectedProviderType = compiledProviderTypes.find(type => type.name === values.resource_type) || {};

  const goBack = () => {
    if (match.params.workspaceId && !match.params.environmentId) {
      history.push(`/${match.params.fqon}/hierarchy/${match.params.workspaceId}/providers`);
    } else if (match.params.workspaceId && match.params.environmentId) {
      history.push(`/${match.params.fqon}/hierarchy/${match.params.workspaceId}/environment/${match.params.environmentId}/providers`);
    } else {
      history.push(`/${match.params.fqon}/providers`);
    }
  };

  // TODO: there is a bug with the first param which should be the value
  const handleProviderChange = (a, value) => {
    const providerType = compiledProviderTypes.find(type => type.name === value);
    // no need to fetch env schema if we do not allowEnvVariables
    if (providerType && providerType.allowEnvVariables) {
      fetchEnvSchema(providerType.type);
    }

    reset();
  };

  const submitDisabled = props.pristine || props.envSchemaPending || props.providerPending || props.invalid || props.submitting || props.containerCreateInvalid;
  const linkedProviders = props.providers.filter(p => p.id !== provider.id);

  return (
    <Row center onRedeploy={props.onRedeploy}>
      <Col
        flex={10}
        xs={12}
        sm={12}
        md={12}
      >
        {provider.id &&
          <Row gutter={5} center>
            <Col flex={12}>
              <DetailsPane model={provider} />
            </Col>
          </Row>}
        <form onSubmit={props.handleSubmit(props.onSubmit)} autoComplete="off">
          <Row gutter={5} center>
            <Col
              component={Card}
              flex={12}
              xs={12}
              sm={12}
              md={12}
            >
              <CardTitle
                title={
                  <div>
                    {!provider.id && selectedProviderType.name ? `Create Provider: ${selectedProviderType.displayName}` : props.title}
                    {provider.id && `::${selectedProviderType.displayName}`}
                  </div>
                }
              />
              <ActionsToolbar>
                <Button
                  flat
                  iconChildren="arrow_back"
                  disabled={props.providerPending || props.submitting}
                  onClick={goBack}
                >
                  {props.cancelLabel}
                </Button>
                {selectedProviderType.name &&
                  <Button
                    raised
                    iconChildren="save"
                    type="submit"
                    onClick={() => props.onRedeploy(false)}
                    disabled={submitDisabled}
                    primary
                  >
                    {props.submitLabel}
                  </Button>}
                {provider.id && selectedProviderType.allowContainer &&
                <Button
                  raised
                  type="submit"
                  onClick={() => props.onRedeploy(true)}
                  primary
                >
                Redeploy
                </Button>}
              </ActionsToolbar>
              {props.providerPending && <LinearProgress id="provider-form--loading" />}
              <CardText>
                {!selectedProviderType.name ?
                  <Row gutter={5}>
                    {/* only allow the provider type to be selected once - this prevents redux-form errors */}
                    <Col flex={6}>
                      <Field
                        id="select-provider"
                        component={SelectField}
                        name="resource_type"
                        menuItems={compiledProviderTypes}
                        itemLabel="displayName"
                        itemValue="name"
                        label="Provider Type"
                        onChange={handleProviderChange}
                        disabled={provider.id}
                        required
                        async
                      />
                    </Col>
                  </Row>
                  :
                  <div>
                    <Row gutter={5}>
                      <Col flex={6} xs={12}>
                        <Field
                          component={TextField}
                          name="name"
                          label="Name"
                          type="text"
                          required
                          maxLength={nameMaxLen}
                          disabled={provider.id}
                        />
                      </Col>
                      <Col flex={6} xs={12}>
                        <Field
                          component={TextField}
                          name="description"
                          label="Description"
                          type="text"
                          rows={1}
                          maxRows={4}
                        />
                      </Col>
                    </Row>
                    {selectedProviderType.DCOSConfig &&
                      <URLConfigSection {...props} />}

                    {selectedProviderType.DCOSSecurity &&
                      <SecuritySection authScheme={values.properties.config.auth && values.properties.config.auth.scheme} {...props} />}

                    {selectedProviderType.DCOSEnterprise &&
                      <DCOSEESection {...props} />}

                    {selectedProviderType.externalProtocol &&
                      <Row gutter={5}>
                        <Col flex={2} xs={12} sm={4}>
                          <Field
                            id="select-return-type"
                            component={SelectField}
                            name="properties.config.external_protocol"
                            menuItems={httpProtocols}
                            itemLabel="name"
                            itemValue="value"
                            label="External Protocol"
                            helpText="The protocol used to reach any externally exposed endpoints"
                          />
                        </Col>
                      </Row>}

                    {selectedProviderType.uploadConfig && !provider.id &&
                      <KubeEditorSection selectedProviderType={selectedProviderType} {...props} />}

                    <OtherConfigSection selectedProviderType={selectedProviderType} showJSON={provider.id} {...props} />
                  </div>}
              </CardText>

              <Row gutter={5}>
                {selectedProviderType.allowEnvVariables &&
                <Col flex={12}>
                  <VariablesSection {...props} />
                </Col>}
                {selectedProviderType.allowLinkedProviders &&
                  <Col flex={12}>
                    <LinkedProviders providersModel={linkedProviders} />
                  </Col>}
                {selectedProviderType.allowedRestrictEnvironments &&
                <Col flex={12}>
                  <EnvironmentTypes />
                </Col>}
              </Row>
            </Col>
          </Row>
        </form>
        {selectedProviderType.allowContainer &&
          <Row gutter={5}>
            <Col flex={12}>
              <Panel title="Provider Container">
                <HelpText message={`The provider type ${selectedProviderType.displayName} requires a container`} />
                {container.id && props.editMode ? <ContainerEdit inlineMode /> : <ContainerCreate inlineMode />}
              </Panel>
            </Col>
          </Row>}
      </Col>
    </Row>
  );
};

ProviderForm.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  providerPending: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  providers: PropTypes.array.isRequired,
  provider: PropTypes.object,
  envSchemaPending: PropTypes.bool.isRequired,
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
  container: PropTypes.object,
  onRedeploy: PropTypes.func,
  resourceTypes: PropTypes.array.isRequired,
  editMode: PropTypes.bool,
};

ProviderForm.defaultProps = {
  title: '',
  submitLabel: '',
  cancelLabel: 'Cancel',
  provider: {},
  container: {},
  onRedeploy: () => { },
  editMode: false,
};

// Connect to this forms state in the store so we can enum the values
export default connect(
  (state, props) => ({
    values: getFormValues(props.form)(state),
    containerCreateInvalid: isInvalid('containerCreate')(state),
  })
)(ProviderForm);
