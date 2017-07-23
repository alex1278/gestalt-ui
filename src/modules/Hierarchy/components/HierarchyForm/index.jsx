import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { translate } from 'react-i18next';
import styled from 'styled-components';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import { VariablesForm } from 'modules/Variables';
import { Breadcrumbs } from 'modules/ContextManagement';
import { Button } from 'components/Buttons';
import { nameMaxLen, shortNameMaxLen } from './validations';

const ActionIconSection = styled.div`
    text-align: right;
`;

const HierarchyForm = (props) => {
  const { t, editMode } = props;

  return (
    <div>
      <form className="flex-row" onSubmit={props.handleSubmit(props.onSubmit)} autoComplete="off">
        <div className="flex-row center-center">
          <Card className="flex-8 flex-xs-12 flex-sm-12">
            <CardTitle
              title={
                <div>
                  <div>{props.title}</div>
                  <div className="md-caption"><Breadcrumbs /></div>
                </div>
              }
            />
            <CardText>
              <div className="flex-row">
                <Field
                  className="flex-6 flex-xs-12"
                  component={TextField}
                  name="description"
                  label={t('containment.fields.description.label')}
                  type="text"
                  maxLength={nameMaxLen}
                  required
                  disabled={props.pending}
                />
                <Field
                  className="flex-6 flex-xs-12"
                  component={TextField}
                  name="name"
                  label={t('containment.fields.name.label')}
                  type="text"
                  maxLength={shortNameMaxLen}
                  required
                  helpText={t('containment.fields.name.helpText')}
                  disabled={props.pending}
                />
                {props.isEnvironment &&
                <Field
                  id="environment-type"
                  className="flex-6 flex-xs-12"
                  component={SelectField}
                  name="properties.environment_type"
                  menuItems={['development', 'test', 'production']}
                  required
                  label={t('containment.fields.environmentType.label')}
                  disabled={props.pending}
                />}
              </div>
              <fieldset>
                <legend>Environment Variables</legend>
                <VariablesForm icon="add" fieldName="properties.env" />
              </fieldset>
            </CardText>
            {props.pending ? <LinearProgress id="containment-form" /> : null}
            <CardActions className="flex-row no-gutter">
              <div className="flex-10 flex-xs-12">
                <Button
                  flat
                  label={props.cancelLabel}
                  disabled={props.submitting}
                  onClick={() => props.history.goBack()}
                />
                <Button
                  raised
                  label={props.submitLabel}
                  type="submit"
                  disabled={props.pristine || props.pending || props.invalid || props.submitting}
                  primary
                />
              </div>
              <ActionIconSection className="flex-2 flex-xs-12">
                {editMode &&
                  <Button
                    tooltipLabel="Entitlements"
                    tooltipPosition="top"
                    icon
                    onClick={() => props.showEntitlementsModal(props.title, props.match.params)}
                  >
                  security
                </Button>}
              </ActionIconSection>
            </CardActions>
          </Card>
        </div>
      </form>
    </div>
  );
};

HierarchyForm.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  pending: PropTypes.bool.isRequired,
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
  showEntitlementsModal: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
};

HierarchyForm.defaultProps = {
  title: '',
  submitLabel: '',
  cancelLabel: 'Cancel',
  isEnvironment: false,
  editMode: false,
};

export default translate()(HierarchyForm);
