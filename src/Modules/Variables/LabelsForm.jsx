import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'react-final-form-arrays';
import { Field } from 'react-final-form';
import { Row, Col } from 'react-flexybox';
import { TextField } from 'components/Form';
import { FieldContainer, FieldItem, RemoveButton, AddButton } from 'components/FieldArrays';
import { composeValidators, required } from 'util/forms';

const LabelsForm = memo(({ fieldName }) => (
  <FieldArray name={fieldName}>
    {({ fields }) => (
      <FieldContainer>
        {fields.map((member, index) => (
          <FieldItem key={`label-${member}`}>
            <Row gutter={5}>
              <Col flex={4} xs={12} sm={12}>
                <Field
                  name={`${member}.name`}
                  label="name"
                  type="text"
                  component={TextField}
                  validate={composeValidators(required())}
                  autoComplete="off"
                  variant="outlined"
                />
              </Col>
              <Col flex={8} xs={12} sm={12}>
                <Field
                  name={`${member}.value`}
                  label="value"
                  type="text"
                  component={TextField}
                  autoComplete="off"
                  variant="outlined"
                />
              </Col>
            </Row>
            <RemoveButton onRemove={fields.remove} fieldIndex={index} tabIndex="-1" />
          </FieldItem>
        ))}
        <Row gutter={5} center>
          <Col flex={12}>
            <AddButton label="Add Label" onClick={() => fields.push({})} />
          </Col>
        </Row>
      </FieldContainer>
    )}
  </FieldArray>
));

LabelsForm.propTypes = {
  fieldName: PropTypes.string.isRequired,
};

export default LabelsForm;
