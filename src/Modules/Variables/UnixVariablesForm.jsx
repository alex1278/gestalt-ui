import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Row, Col } from 'react-flexybox';
import { isUnixVariable } from 'util/validations';
import { TextField } from 'components/ReduxFormFields';
import { Button } from 'components/Buttons';
import PreventAutoFill from 'components/PreventAutoFill';
import { FieldContainer, FieldItem, RemoveButton } from 'components/FieldArrays';
import { checkIfPassword } from 'util/helpers/strings';

const validatePattern = value => (value && !isUnixVariable(value)) && 'Invalid Unix Variable';
const required = value => (value ? undefined : 'Required');

const UnixVariablesForm = ({ fields, disabled }) => (
  <FieldContainer>
    <FieldItem>
      <Button
        flat
        primary
        iconChildren="add"
        onClick={() => fields.push({})}
      >
        Add Variable
      </Button>
    </FieldItem>
    {fields.map((member, index, allFields) => {
      const field = allFields.get(index);
      const isInherited = field.inherited;
      const fieldNameStr = isInherited ? 'name (inherit)' : 'name';
      const fieldValueStr = isInherited ? 'value (overridable)' : 'value';
      const isDisabled = isInherited || disabled;
      const isPasswordField = checkIfPassword(field.name);

      return (
        <FieldItem key={`variable-${member}`}>
          {(!isDisabled && !field.required) && <RemoveButton onRemove={fields.remove} fieldIndex={index} tabIndex="-1" />}
          <Row gutter={5}>
            <Col flex={4} xs={12} sm={12}>
              <Field
                id={`${member}.name`}
                name={`${member}.name`}
                placeholder={fieldNameStr}
                rows={isPasswordField ? undefined : 1}
                maxRows={isPasswordField ? undefined : 4}
                component={TextField}
                validate={[validatePattern, required]}
                disabled={isDisabled}
                autoComplete="off"
                required
                helpText={isInherited ? 'inherited' : null}
              />
            </Col>
            <Col flex={8} xs={12} sm={12}>
              {isPasswordField && <PreventAutoFill key={`${member}--preventautofill`} />}
              <Field
                id={`${member}.value`}
                name={`${member}.value`}
                placeholder={fieldValueStr}
                type={isPasswordField ? 'password' : 'text'}
                component={TextField}
                rows={isPasswordField ? undefined : 1}
                maxRows={isPasswordField ? undefined : 4}
                autoComplete="off"
                validate={field.required ? required : []}
                required={field.required}
                passwordIcon={null}
                helpText={isInherited ? 'overridable' : null}
              />
            </Col>
          </Row>
        </FieldItem>
      );
    })}
  </FieldContainer>
);

UnixVariablesForm.propTypes = {
  fields: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
};

UnixVariablesForm.defaultProps = {
  disabled: false,
};

export default UnixVariablesForm;
