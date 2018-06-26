import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexybox';
import { Link, withRouter } from 'react-router-dom';
import { Field } from 'react-final-form';
import { metaModels } from 'Modules/MetaResource';
import { SelectField, TextField } from 'components/ReduxFormFields';
import { Button } from 'components/Buttons';
import { FullPageFooter } from 'components/FullPage';
import { Panel } from 'components/Panels';
import Form from 'components/Form';
import { getLastFromSplit } from 'util/helpers/strings';
import SecretItemsForm from '../components/SecretItemsForm';

const SecretForm = ({ match, loading, submitting, handleSubmit, providers, values, form, editMode }) => {
  const filteredprovidersData = providers.filter(provider => getLastFromSplit(provider.resource_type) === 'Kubernetes' || metaModels.provider.get(provider).properties.config.secret_support);
  const providersFiltered = filteredprovidersData.length > 0 ? filteredprovidersData : providers;
  const selectedProvider = Object.assign({}, providers.length ? providers.find(p => p.id === values.properties.provider.id) : {});
  const isMultiPartSecret = getLastFromSplit(selectedProvider.resource_type) === 'Kubernetes';
  const handleProviderChange = (value) => {
    form.change('properties.provider.id', value);
    form.change('properties.items', values.properties.items.slice(-1));
  };

  return (
    <Form onSubmit={handleSubmit} autoComplete="off" disabled={loading}>
      <Row gutter={5}>
        <Col flex={7} xs={12} sm={12} md={12}>
          <Panel title="General" expandable={false} fill>
            <Row gutter={5}>
              <Col flex={12}>
                <Field
                  id="caas-provider"
                  component={SelectField}
                  name="properties.provider.id"
                  required
                  label="CaaS Provider"
                  itemLabel="name"
                  itemValue="id"
                  menuItems={providersFiltered}
                  disabled={editMode}
                  onChange={handleProviderChange}
                  async
                />
              </Col>
              <Col flex={12}>
                <Field
                  component={TextField}
                  name="name"
                  label="Secret Name"
                  type="text"
                  required
                />
              </Col>
            </Row>
          </Panel>
        </Col>

        <Col flex={5} xs={12} sm={12} md={12}>
          <Panel title="Description" expandable={false} fill>
            <Row gutter={5}>
              <Col flex={12}>
                <Field
                  id="description"
                  component={TextField}
                  name="description"
                  placeholder="Description"
                  rows={1}
                  maxRows={6}
                />
              </Col>
            </Row>
          </Panel>
        </Col>
      </Row>

      <Row gutter={5}>
        {selectedProvider.id &&
        <Col flex={12}>
          <Panel title="Secret Items" noPadding expandable={false}>
            <SecretItemsForm
              fieldName="properties.items"
              disabled={editMode}
              multiPart={isMultiPartSecret}
              formValues={values}
              form={form}
            />
          </Panel>
        </Col>}
      </Row>

      <FullPageFooter>
        <Button
          flat
          iconChildren="arrow_back"
          disabled={loading || submitting}
          component={Link}
          to={`/${match.params.fqon}/hierarchy/${match.params.workspaceId}/environment/${match.params.environmentId}/secrets`}
        >
          Secrets
        </Button>
        <Button
          raised
          iconChildren="save"
          type="submit"
          disabled={loading || submitting}
          primary
        >
          {editMode ? 'Update' : 'Create'}
        </Button>
      </FullPageFooter>
    </Form>
  );
};

SecretForm.propTypes = {
  match: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  providers: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  editMode: PropTypes.bool,
};

SecretForm.defaultProps = {
  editMode: false,
};

export default withRouter(SecretForm);
