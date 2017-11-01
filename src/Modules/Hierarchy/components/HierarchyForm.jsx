import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { translate } from 'react-i18next';
import { Col, Row } from 'react-flexybox';
import { DialogContainer } from 'react-md';
import ActivityContainer from 'components/ActivityContainer';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import { VariablesForm } from 'Modules/Variables';
import { Button } from 'components/Buttons';
import Fieldset from 'components/Fieldset';
import { isUnixVariable } from 'util/validations';
import { nameMaxLen, shortNameMaxLen } from '../validations';

const HierarchyForm = (props) => {
  const { t } = props;
  const submitDisabled = props.pristine || props.pending || props.invalid || props.submitting;

  const actions = [
    <Button
      key="hierarchyform--cancel"
      flat
      disabled={props.submitting}
      onClick={() => props.history.goBack()}
    >
      {props.cancelLabel}
    </Button>,
    <Button
      key="hierarchyform--create"
      raised
      type="submit"
      disabled={submitDisabled}
      primary
    >
      {props.submitLabel}
    </Button>
  ];

  return (
    <form onSubmit={props.handleSubmit(props.onSubmit)} autoComplete="off">
      <DialogContainer
        id="context-form-dialog"
        title={!props.pending && props.title}
        visible
        width="60em"
        actions={actions}
      >
        {props.pending ?
          <ActivityContainer primary centered id="context-form--loading" /> :
          <Row gutter={5}>
            <Col flex={6} xs={12}>
              <Field
                component={TextField}
                name="description"
                label={t('containment.fields.description.label')}
                type="text"
                maxLength={nameMaxLen}
                required
                disabled={props.pending}
              />
            </Col>
            <Col flex={6} xs={12}>
              <Field
                component={TextField}
                name="name"
                label={t('containment.fields.name.label')}
                type="text"
                maxLength={shortNameMaxLen}
                required
                helpText={t('containment.fields.name.helpText')}
                disabled={props.pending}
              />
            </Col>
            {props.isEnvironment &&
              <Col flex={6} xs={12}>
                <Field
                  id="environment-type"
                  component={SelectField}
                  name="properties.environment_type"
                  menuItems={['development', 'test', 'production']}
                  required
                  label={t('containment.fields.environmentType.label')}
                  disabled={props.pending}
                />
              </Col>}

            <Col flex={12}>
              <Fieldset legend="Environment Variables">
                <VariablesForm
                  icon="add"
                  fieldName="properties.env"
                  keyFieldValidationFunction={isUnixVariable}
                  keyFieldValidationMessage="must be a unix variable name"
                />
              </Fieldset>
            </Col>
          </Row>}
      </DialogContainer>
    </form>
  );
};

HierarchyForm.propTypes = {
  history: PropTypes.object.isRequired,
  pending: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  title: PropTypes.string,
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  isEnvironment: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

HierarchyForm.defaultProps = {
  title: '',
  submitLabel: '',
  cancelLabel: 'Cancel',
  isEnvironment: false,
  pending: false,
};

export default translate()(HierarchyForm);
