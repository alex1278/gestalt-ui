import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexybox';
import { Field } from 'react-final-form';
import { composeValidators, required } from 'util/forms';
import Form, { SelectField, TextField } from 'components/Form';

const ContainerImportForm = ({ handleSubmit, providers, pending }) => (
  <Form id="import-container-modal" onSubmit={handleSubmit} disabled={pending} disableFooter>
    <Row gutter={5}>
      <Col flex={12}>
        <Field
          id="import-provider"
          component={SelectField}
          name="properties.provider.id"
          required
          label="Source CaaS Provider"
          itemLabel="name"
          itemValue="id"
          menuItems={providers}
          async
          validate={composeValidators(required())}
          helpText="The CaaS Provider you want to import from"
        />
      </Col>
      <Col flex={12}>
        <Field
          component={TextField}
          name="name"
          label="Container Name"
          type="text"
          required
          validate={composeValidators(required())}
          helpText="The name of the container as it will appear in Gestalt once it has been imported"
        />
      </Col>
      <Col flex={12}>
        <Field
          component={TextField}
          name="properties.external_id"
          label="External Id"
          type="text"
          required
          validate={composeValidators(required())}
          helpText='For DC/OS use the "appId" of the Marathon application. For Kubernetes use /namespaces/{namespace}/deployments/{deployment name},"'
        />
      </Col>
    </Row>
  </Form>
);

ContainerImportForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  providers: PropTypes.array.isRequired,
  pending: PropTypes.bool.isRequired,
};

export default ContainerImportForm;
