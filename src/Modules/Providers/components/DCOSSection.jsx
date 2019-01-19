import React from 'react';
// import PropTypes from 'prop-types';
import { Field, FormSpy } from 'react-final-form';
import { Col, Row } from 'react-flexybox';
import { SelectField, TextField } from 'components/ReduxFormFields';

const DCOSSection = () => (
  <FormSpy subscription={{ values: true }}>
    {({ values }) => {
      const authScheme = (values.properties.config.auth && values.properties.config.auth.scheme) || 'Basic';

      return (
        <React.Fragment>
          <Row gutter={5}>
            <Col flex={6} xs={12} sm={12}>
              <Field
                component={TextField}
                name="properties.config.url"
                label="Provider URL/Host:Port"
                type="text"
                required
              />
            </Col>
          </Row>

          <Row gutter={5}>
            <Col flex={2} xs={12} sm={2}>
              <Field
                id="select-return-type"
                component={SelectField}
                name="properties.config.auth.scheme"
                menuItems={['Basic', 'acs']}
                required
                label="Security Scheme"
              />
            </Col>
            {authScheme === 'acs' ?
              [
                <Col key="config-auth--dcos_base_url" flex={2} xs={12} sm={4} md={4}>
                  <Field
                    component={TextField}
                    name="properties.config.auth.dcos_base_url"
                    label="DCOS Base URL"
                    required
                  />
                </Col>,
                <Col key="config-auth--service_account_id" flex={2} xs={12} sm={4} md={4}>
                  <Field
                    component={TextField}
                    name="properties.config.auth.service_account_id"
                    label="Service Account Id"
                    required
                  />
                </Col>,
                <Col key="config-auth--private_key" flex={6} xs={12} sm={4} md={4}>
                  <Field
                    component={TextField}
                    name="properties.config.auth.private_key"
                    label="Private Key"
                    rows={1}
                    maxRows={4}
                    required
                  />
                </Col>
              ] :
              [
                <Col key="config-auth--username" flex={2} xs={12} sm={4} md={4}>
                  <Field
                    component={TextField}
                    name="properties.config.auth.username"
                    label="Username"
                    type="text"
                    required
                  />
                </Col>,
                <Col key="config-auth--password" flex={2} xs={12} sm={4} md={4}>
                  <Field
                    component={TextField}
                    name="properties.config.auth.password"
                    label="Password"
                    type="password"
                    required
                    autoComplete="new-password"
                  />
                </Col>
              ]}
          </Row>
        </React.Fragment>
      );
    }}
  </FormSpy>
);

export default DCOSSection;
