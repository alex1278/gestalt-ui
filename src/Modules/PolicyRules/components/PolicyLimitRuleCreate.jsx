import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import Form from 'components/Form';
import { Col, Row } from 'react-flexybox';
import ActionsToolbar from 'components/ActionsToolbar';
import { ActivityContainer } from 'components/ProgressIndicators';
import PolicyLimitRuleForm from './PolicyLimitRuleForm';
import limitRuleModel from '../models/limitRule';
import { getCreateLimitRuleModel } from '../reducers/selectors';
import withPolicyRule from '../hocs/withPolicyRule';

class PolicyLimitRuleCreate extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    initialValues: PropTypes.object.isRequired,
    policyRulePending: PropTypes.bool.isRequired,
    policyRuleActions: PropTypes.object.isRequired,
  };

  create = (values) => {
    const { match, history, policyRuleActions } = this.props;
    const payload = limitRuleModel.create(values);
    const onSuccess = () => history.replace(`/${match.params.fqon}/hierarchy/${match.params.workspaceId}/environment/${match.params.environmentId}/policies/${match.params.policyId}`);

    policyRuleActions.createPolicyRule({ fqon: match.params.fqon, entityId: match.params.policyId, entityKey: 'policies', payload, onSuccess });
  }

  render() {
    const { match, initialValues, policyRulePending } = this.props;

    return (
      <Row gutter={5} center>
        <Col flex={10} xs={12} sm={12} md={12}>
          <ActionsToolbar title="Create a Policy Limit Rule" />

          {policyRulePending && <ActivityContainer id="policyRule-form" />}

          <FinalForm
            onSubmit={this.create}
            initialValues={initialValues}
            mutators={{ ...arrayMutators }}
            render={({ handleSubmit, submitting, ...rest }) => (
              <Form
                onSubmit={handleSubmit}
                disabled={policyRulePending}
                disabledSubmit={policyRulePending || submitting}
                submitTitle="Create"
                showCancel
                cancelTo={`/${match.params.fqon}/hierarchy/${match.params.workspaceId}/environment/${match.params.environmentId}/policies/${match.params.policyId}`}
              >
                <PolicyLimitRuleForm {...rest} />
              </Form>
            )}
            {...this.props}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: getCreateLimitRuleModel(state),
});

export default compose(
  withPolicyRule,
  connect(mapStateToProps),
)(PolicyLimitRuleCreate);
