import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { Row, Col } from 'react-flexybox';
import { SelectField } from 'components/Form';
import { FieldContainer, FieldItem, RemoveButton, AddButton } from 'components/FieldArrays';

const LineageForm = ({ name, resourceTypes, addLabel }) => (
  <FieldArray name={name}>
    {({ fields }) => (
      <FieldContainer>
        {fields.map((member, index) => (
          <FieldItem key={member}>
            <Row gutter={5}>
              <Col flex={12}>
                <Field
                  id={`${name}-${member}`}
                  name={`${member}`}
                  component={SelectField}
                  menuItems={resourceTypes}
                  itemLabel="name"
                  itemValue="id"
                  label="Resource Type"
                  async
                />
              </Col>
            </Row>
            <RemoveButton onRemove={fields.remove} fieldIndex={index} />
          </FieldItem>
        ))}
        <Row gutter={5} center>
          <Col flex={12}>
            <AddButton label={addLabel} onClick={() => fields.push({})} />
          </Col>
        </Row>
      </FieldContainer>
    )}
  </FieldArray>
);

LineageForm.propTypes = {
  name: PropTypes.string.isRequired,
  resourceTypes: PropTypes.array.isRequired,
  addLabel: PropTypes.string,
};

LineageForm.defaultProps = {
  addLabel: 'Add Type',
};

export default LineageForm;
