import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexybox';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';
import { Button } from 'components/Buttons';
import TextField from 'components/TextField';
import DetailsPane from 'components/DetailsPane';
import { PolicyRules } from 'Modules/PolicyRules';
import { nameMaxLen } from '../validations';

const PolicyForm = (props) => {
  const {
    match,
    policyPending,
    policy,
    onSubmit,
    invalid,
    pristine,
    submitting,
    handleSubmit,
    cancelLabel,
    submitLabel,
    title,
    editMode,
  } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      {policy.id &&
        <Row gutter={5} center>
          <Col flex={10} xs={12} sm={12}>
            <DetailsPane model={policy} />
          </Col>
        </Row>}
      <Row gutter={5} center>
        <Col component={Card} flex={10} xs={12} sm={12}>
          <CardTitle
            title={title}
          />
          <CardText>
            <Row gutter={5}>
              <Col flex={5} xs={12}>
                <Field
                  component={TextField}
                  name="name"
                  label="Name"
                  type="text"
                  required
                  maxLength={nameMaxLen}
                  autoComplete="none"
                />
              </Col>
              <Col flex={7} xs={12}>
                <Field
                  component={TextField}
                  name="description"
                  label="Description"
                  type="text"
                  rows={1}
                />
              </Col>
            </Row>
          </CardText>
          {policyPending && <LinearProgress id="policy-form" />}
          <CardActions>
            <Button
              flat
              disabled={policyPending || submitting}
              component={Link}
              to={`/${match.params.fqon}/hierarchy/${match.params.workspaceId}/environment/${match.params.environmentId}/policies`}
            >
              {cancelLabel}
            </Button>
            <Button
              raised
              type="submit"
              disabled={pristine || policyPending || invalid || submitting}
              primary
            >
              {submitLabel}
            </Button>
          </CardActions>
        </Col>

        {(editMode && policy.id) &&
          <Row gutter={5} center>
            <Col flex={10} xs={12} sm={12}>
              <PolicyRules {...props} />
            </Col>
          </Row>}
      </Row>
    </form>
  );
};

PolicyForm.propTypes = {
  match: PropTypes.object.isRequired,
  policy: PropTypes.object.isRequired,
  policyPending: PropTypes.bool.isRequired,
  policyUpdatePending: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  title: PropTypes.string,
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  editMode: PropTypes.bool,
};

PolicyForm.defaultProps = {
  title: '',
  submitLabel: '',
  cancelLabel: 'Cancel',
  editMode: false,
};

export default PolicyForm;
