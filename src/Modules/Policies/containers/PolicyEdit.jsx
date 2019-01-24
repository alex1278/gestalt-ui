import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';
import { Link } from 'react-router-dom';
import { withEntitlements } from 'Modules/Entitlements';
import { PolicyRules } from 'Modules/PolicyRules';
import { ActivityContainer } from 'components/ProgressIndicators';
import { Col, Row } from 'react-flexybox';
import ActionsToolbar from 'components/ActionsToolbar';
import { FullPageFooter } from 'components/FullPage';
import { Button } from 'components/Buttons';
import DetailsPane from 'components/DetailsPane';
import { Panel } from 'components/Panels';
import { Tabs, Tab } from 'components/Tabs';
import { Card } from 'components/Cards';
import PayloadViewer from '../components/PayloadViewer';
import PolicyTypesMenu from '../components/PolicyTypesMenu';
import PolicyForm from './PolicyForm';
import actions from '../actions';
import { generatePolicyPatches } from '../payloadTransformer';
import { getEditPolicyModel } from '../selectors';
import withPolicy from '../hocs/withPolicy';

class PolicyEdit extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    policy: PropTypes.object.isRequired,
    policyActions: PropTypes.object.isRequired,
    policyPending: PropTypes.bool.isRequired,
    entitlementActions: PropTypes.object.isRequired,
    initialFormValues: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { match, policyActions } = this.props;

    policyActions.fetchPolicy({ fqon: match.params.fqon, id: match.params.policyId });
  }

  udpate = (values) => {
    const { match, policy, policyActions } = this.props;
    const payload = generatePolicyPatches(policy, values);

    policyActions.updatePolicy({ fqon: match.params.fqon, id: policy.id, payload });
  }

  showEntitlements = () => {
    const { entitlementActions, policy, match } = this.props;

    entitlementActions.showEntitlementsModal(policy.name, match.params.fqon, policy.id, 'policies', 'Policy');
  }

  render() {
    const { match, initialFormValues, policy, policyPending } = this.props;

    if (policyPending && !policy.id) {
      return <ActivityContainer id="policy-load" />;
    }
    return (
      <Row gutter={5} center>
        <Col flex={10} xs={12} sm={12} md={12}>

          <ActionsToolbar
            title={policy.name}
            actions={[
              <PolicyTypesMenu key="policy--types-menu" />,
              <Button
                key="policy--entitlements"
                flat
                iconChildren="security"
                onClick={this.showEntitlements}
              >
                Entitlements
              </Button>]}
          />

          {policyPending && <ActivityContainer id="policy-form" />}

          <Tabs>
            <Tab title="Rules">
              <Row gutter={5}>
                <Col flex={12}>
                  {policy.id && <PolicyRules />}
                </Col>
              </Row>
              <FullPageFooter>
                <Button
                  flat
                  iconChildren="arrow_back"
                  component={Link}
                  to={`/${match.params.fqon}/hierarchy/${match.params.workspaceId}/environment/${match.params.environmentId}/policies`}
                >
                  Policies
                </Button>
              </FullPageFooter>
            </Tab>

            <Tab title="Policy">
              <Row gutter={5}>
                <Col flex={12}>
                  <Panel title="Resource Details" defaultExpanded={false}>
                    <DetailsPane model={policy} />
                  </Panel>
                </Col>
              </Row>

              <Form
                editMode
                render={PolicyForm}
                onSubmit={this.udpate}
                initialValues={initialFormValues}
                {...this.props}
              />
            </Tab>

            <Tab title="YAML/JSON">
              <Row gutter={5}>
                <Col flex={12}>
                  <Card>
                    <PayloadViewer
                      value={policy}
                      name={policy.name}
                    />
                  </Card>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  policy: state.policies.policy.policy,
  initialFormValues: getEditPolicyModel(state),
});

export default compose(
  withPolicy,
  withEntitlements,
  connect(mapStateToProps, actions),
)(PolicyEdit);
