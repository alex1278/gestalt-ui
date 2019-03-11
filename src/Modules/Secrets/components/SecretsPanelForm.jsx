import React, { memo } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { Row, Col } from 'react-flexybox';
import { SelectField, TextField } from 'components/Form';
import { FieldContainer, FieldItem, RemoveButton, AddButton } from 'components/FieldArrays';
import { NoData } from 'components/TableCells';
import Alert from 'components/Alert';
import { getLastFromSplit } from 'util/helpers/strings';
import { composeValidators, required, unixPattern } from 'util/forms';

const setSecretMountTypes = (provider) => {
  if (getLastFromSplit(provider.resource_type) === 'Kubernetes') {
    return ['env', 'directory', 'file'];
  }

  return ['env'];
};

const getHelpText = (mountType) => {
  switch (mountType) {
    case 'env':
      return 'mount the secret key to this environment variable';
    case 'directory':
      return 'mount all secret keys to this directory';
    case 'file':
      return 'mount secret keys to this file';
    default:
      return '';
  }
};

const getSecretKeys = (id, secrets) => {
  const item = secrets.find(s => s.id === id);
  return (item && get(item, 'properties.items')) || [];
};

const getMenuItems = (secrets, provider, type) => {
  const items = secrets.filter((p) => {
    let providerId;

    if (type === 'lambda' && provider.id && get(provider, 'properties.config.env')) {
      providerId = provider.properties.config.env.public.META_COMPUTE_PROVIDER_ID;
    } else {
      const { id } = provider;

      providerId = id;
    }

    return p.id ? p.properties.provider.id === providerId : null;
  });

  return items.length ? items : [{ id: null, name: 'No Available Secrets' }];
};

const determineValidators = (field) => {
  if (field.mount_type === 'env') {
    return composeValidators(required(), unixPattern());
  }

  return composeValidators(required());
};

const SecretsPanelForm = memo(({ type, fieldName, provider, secretsDropdown, form }) => {
  if (!secretsDropdown.length) {
    return (
      <NoData
        message="There are no available secrets or you do not have the entitlements to view them"
        showCreate={false}
      />
    );
  }

  const showSecretWarning = type === 'lambda';

  return (
    <FieldArray name={fieldName}>
      {({ fields }) => (
        <FieldContainer>
          {fields.map((member, index) => {
            const field = fields.value[index] || {};

            const handleSecretNamePopulation = ({ target }) => {
              const secret = secretsDropdown.find(i => i.id === target.value);
              if (target.value) {
                form.mutators.update(fieldName, index, { ...field, secret_id: target.value, secret_name: secret.name });
              }
            };

            const reset = ({ target }) => {
              form.mutators.update(fieldName, index, { ...field, mount_type: target.value, secret_key: '', path: '' });
            };

            return (
              <FieldItem key={`sercret-${index}`}>
                {/* hidden field */}
                <Field
                  id={`${member}.secret_name`}
                  name={`${member}.secret_name`}
                  component={() => null}
                />
                <Row gutter={5}>
                  <Col flex={2} xs={12} sm={12}>
                    <Field
                      id={`${member}.mount_type`}
                      name={`${member}.mount_type`}
                      component={SelectField}
                      label="Mount Type"
                      onChange={reset}
                      menuItems={setSecretMountTypes(provider)}
                      required
                      validate={composeValidators(required())}
                    />
                  </Col>
                  <Col flex={3} xs={12} sm={12}>
                    <Field
                      id={`${member}.secret_id`}
                      name={`${member}.secret_id`}
                      component={SelectField}
                      label="Secret"
                      itemLabel="name"
                      itemValue="id"
                      required
                      menuItems={getMenuItems(secretsDropdown, provider, type)}
                      onChange={handleSecretNamePopulation}
                      async
                      validate={composeValidators(required())}
                    />
                  </Col>
                  {field.secret_id && field.mount_type !== 'directory' &&
                    <Col flex={3} xs={12} sm={12}>
                      <Field
                        id={`${member}.secret_key`}
                        name={`${member}.secret_key`}
                        component={SelectField}
                        label="Key"
                        itemLabel="key"
                        itemValue="key"
                        required
                        menuItems={getSecretKeys(field.secret_id, secretsDropdown)}
                        validate={composeValidators(required())}
                      />
                    </Col>}
                  {field.secret_id &&
                    <Col flex={4} xs={12} sm={12}>
                      <Field
                        id={`${member}.path`}
                        name={`${member}.path`}
                        label={field.mount_type === 'env' ? 'Environment Variable' : 'Path'}
                        component={TextField}
                        type="text"
                        required
                        validate={determineValidators(field)}
                        helpText={getHelpText(field.mount_type)}
                      />
                    </Col>}
                </Row>
                <RemoveButton onRemove={fields.remove} fieldIndex={index} tabIndex="-1" />
              </FieldItem>
            );
          })}
          <Row gutter={5} center>
            <Col flex={12}>
              <AddButton label="Add Secret" onClick={() => fields.push({})} />
            </Col>
          </Row>
          {showSecretWarning && fields.length > 0 && (
            <Row>
              <Col flex>
                <Alert width="auto" message={{ message: 'Due to Kubernetes design restrictions using a secret will result in containers running in you local environment/kubernetes namespace. They will not have the benefit of a cold execution pool, and may be slower to start.', icon: true, status: 'warning' }} />
              </Col>
            </Row>
          )}
        </FieldContainer>
      )}
    </FieldArray>
  );
});

SecretsPanelForm.propTypes = {
  fieldName: PropTypes.string.isRequired,
  provider: PropTypes.object,
  form: PropTypes.object.isRequired,
  secretsDropdown: PropTypes.array,
  type: PropTypes.oneOf([
    'lambda', 'container',
  ])
};

SecretsPanelForm.defaultProps = {
  provider: {},
  type: 'container',
  secretsDropdown: [],
};

export default SecretsPanelForm;
