import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Form as FinalForm } from 'react-final-form';
import Form from 'components/Form';
import arrayMutators from 'final-form-arrays';
import { Col, Row } from 'react-flexybox';
import { withPickerData } from 'Modules/MetaResource';
import { ActivityContainer } from 'components/ProgressIndicators';
import ActionsToolbar from 'components/ActionsToolbar';
import { Panel } from 'components/Panels';
import { FlatButton } from 'components/Buttons';
import { EntitlementIcon } from 'components/Icons';
import DetailsPane from 'components/DetailsPane';
import { Tabs, Tab } from 'components/Tabs';
import { Card } from 'components/Cards';
import { EntitlementModal } from 'Modules/Entitlements';
import { ModalConsumer } from 'Modules/ModalRoot/ModalContext';
import PayloadViewer from '../components/PayloadViewer';
import SecretForm from './SecretForm';
import validate from '../validations';
import { generatePatches } from '../payloadTransformer';
import { getEditSecretModel } from '../selectors';
import withSecret from '../hocs/withSecret';

class SecretEdit extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    secret: PropTypes.object.isRequired,
    secretActions: PropTypes.object.isRequired,
    secretPending: PropTypes.bool.isRequired,
    providersData: PropTypes.array.isRequired,
    initialFormValues: PropTypes.object.isRequired,
  };

  static contextType = ModalConsumer;

  componentDidMount() {
    const { match, secretActions } = this.props;

    secretActions.fetchSecret({ fqon: match.params.fqon, id: match.params.secretId });
  }

  showEntitlements = () => {
    const { secret } = this.props;
    const { showModal } = this.context;

    showModal(EntitlementModal, {
      title: `Entitlements for "${secret.name}" Secret`,
      fqon: secret.org.properties.fqon,
      entityId: secret.id,
      entityKey: 'secrets',
    });
  }

  update = (values) => {
    const { match, secret, secretActions } = this.props;
    const payload = generatePatches(secret, values);

    secretActions.updateSecret({ fqon: match.params.fqon, id: secret.id, payload });
  }

  render() {
    const {
      match,
      secret,
      secretPending,
      providersData,
      initialFormValues,
    } = this.props;

    if (secretPending && !secret.id) {
      return <ActivityContainer id="secret-edit-loading" />;
    }

    return (
      <Row gutter={5} center>
        <Col flex={10} xs={12} sm={12} md={12}>

          <ActionsToolbar
            title={secret.name}
            sticky
            showBackNav
            navTo={`/${match.params.fqon}/hierarchy/${match.params.workspaceId}/environment/${match.params.environmentId}/secrets`}
            actions={[
              <FlatButton
                key="secret--entitlements"
                icon={<EntitlementIcon size={20} />}
                label="Entitlements"
                onClick={this.showEntitlements}
              />]
            }
          />

          {secretPending && <ActivityContainer id="secret-form" />}

          <Tabs>
            <Tab title="Secret">
              <Row gutter={5}>
                <Col flex={12}>
                  <Panel title="Resource Details" defaultExpanded={false}>
                    <DetailsPane model={secret} />
                  </Panel>
                </Col>
              </Row>

              <FinalForm
                editMode
                onSubmit={this.update}
                mutators={{ ...arrayMutators }}
                providers={providersData}
                initialValues={initialFormValues}
                validate={validate}
                render={({ handleSubmit, submitting, pristine, ...rest }) => (
                  <Form
                    onSubmit={handleSubmit}
                    submitTitle="Update"
                    disabled={secretPending}
                    disabledSubmit={secretPending || submitting}
                  >
                    <SecretForm {...rest} />
                  </Form>
                )}
              />
            </Tab>
            <Tab title="YAML/JSON">
              <Row gutter={5}>
                <Col flex={12}>
                  <Card>
                    <PayloadViewer
                      value={secret}
                      name={secret.name}
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

function mapStateToProps(state) {
  return {
    initialFormValues: getEditSecretModel(state),
  };
}

export default compose(
  withPickerData({ entity: 'providers', label: 'Providers', params: { type: 'CaaS' } }),
  withSecret,
  connect(mapStateToProps),
)(SecretEdit);
