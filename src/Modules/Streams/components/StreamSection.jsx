import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { Row, Col } from 'react-flexybox';
import { SelectField, TextField } from 'components/Form';
import { Panel } from 'components/Panels';
import { required } from 'util/forms';

const StreamSection = ({ providers, editMode }) => (
  <Row gutter={5}>
    <Col flex={8} xs={12} sm={12}>
      <Panel expandable={false} fill>
        <Row gutter={5}>
          <Col flex={12}>
            <Field
              id="stream-provider"
              name="properties.provider.id"
              label="Stream Provider"
              component={SelectField}
              menuItems={providers}
              itemLabel="name"
              itemValue="id"
              async
              required
              disabled={editMode}
              validate={required()}
            />
          </Col>
          <Col flex={12}>
            <Field
              id="name"
              component={TextField}
              name="name"
              label="Stream Name"
              required
              validate={required()}
            />
          </Col>
        </Row>
      </Panel>
    </Col>

    <Col flex={4} xs={12} sm={12}>
      <Panel expandable={false} fill>
        <Row gutter={5}>
          <Col flex={12}>
            <Field
              id="description"
              component={TextField}
              name="description"
              label="Description"
              multiline
              rowsMax={6}
            />
          </Col>
        </Row>
      </Panel>
    </Col>
  </Row>
);

StreamSection.propTypes = {
  providers: PropTypes.array.isRequired,
  editMode: PropTypes.bool,
};

StreamSection.defaultProps = {
  editMode: false,
};

export default StreamSection;
