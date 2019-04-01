import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form as FinalForm } from 'react-final-form';
import Form from 'components/Form';
import { Col, Row } from 'react-flexybox';
import { withProviderKongsByGatewayPicker } from 'Modules/MetaResource';
import { APIEndpoints } from 'Modules/APIEndpoints';
import { ActivityContainer } from 'components/ProgressIndicators';
import ActionsToolbar from 'components/ActionsToolbar';
import { FlatButton } from 'components/Buttons';
import { EntitlementIcon } from 'components/Icons';
import AddIcon from '@material-ui/icons/Add';
import { Panel } from 'components/Panels';
import DetailsPane from 'components/DetailsPane';
import { Tabs, Tab } from 'components/Tabs';
import { Card } from 'components/Cards';
import { EntitlementModal } from 'Modules/Entitlements';
import { ModalContext } from 'Modules/ModalRoot/ModalContext';
import PayloadViewer from './PayloadViewer';
import APIForm from './APIForm';
import validate from './validations';
import actions from '../actions';
import { generateAPIPatches } from '../payloadTransformer';
import { getEditAPIModel } from '../selectors';
import withAPI from '../hocs/withAPI';

class APIEdit extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    apiActions: PropTypes.object.isRequired,
    api: PropTypes.object.isRequired,
    apiPending: PropTypes.bool.isRequired,
    initialFormValues: PropTypes.object.isRequired,
  };

  static contextType = ModalContext;

  componentDidMount() {
    const { match, apiActions } = this.props;

    apiActions.fetchAPI({ fqon: match.params.fqon, id: match.params.apiId });
  }

  update = (values) => {
    const { match, api, apiActions } = this.props;
    const payload = generateAPIPatches(api, values);

    apiActions.updateAPI({ fqon: match.params.fqon, id: match.params.apiId, payload });
  }

  showEntitlements = () => {
    const { api } = this.props;
    const { showModal } = this.context;

    showModal(EntitlementModal, {
      title: `Entitlements for "${api.name}" API`,
      fqon: api.org.properties.fqon,
      entityId: api.id,
      entityKey: 'apis',
    });
  }

  render() {
    const { match, api, apiPending, initialFormValues } = this.props;

    if (apiPending && !api.id) {
      return <ActivityContainer id="api-loading" />;
    }

    return (
      <Row gutter={5} center>
        <Col flex={10} xs={12} sm={12} md={12}>
          <ActionsToolbar
            title={api.name}
            sticky
            showBackNav
            navTo={`/${match.params.fqon}/hierarchy/${match.params.workspaceId}/environment/${match.params.environmentId}/apis`}
            actions={[
              <FlatButton
                key="add-endpoint"
                color="primary"
                component={Link}
                to={`${match.url}/apiendpoints/create`}
                icon={<AddIcon fontSize="small" />}
                label="Add Endpoint"
              />,
              <FlatButton
                key="api--entitlements"
                icon={<EntitlementIcon size={20} />}
                label="Entitlements"
                onClick={this.showEntitlements}
              />]}
          />

          {apiPending && <ActivityContainer id="api-loading" />}

          <Tabs>
            <Tab title="Endpoints">
              <Row gutter={5}>
                <Col flex={12}>
                  <APIEndpoints {...this.props} />
                </Col>
              </Row>
            </Tab>

            <Tab title="API">
              <Row gutter={5}>
                <Col flex={12}>
                  <Panel title="Resource Details" defaultExpanded={false}>
                    <DetailsPane model={api} />
                  </Panel>
                </Col>
              </Row>

              <FinalForm
                editMode
                subscription={{ submitting: true, pristine: true }}
                onSubmit={this.update}
                initialValues={initialFormValues}
                validate={validate}
                render={({ handleSubmit, submitting, ...rest }) => (
                  <Form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    disabled={apiPending}
                    disabledSubmit={submitting}
                    submitTitle="Update"
                  >
                    <APIForm {...rest} />
                  </Form>
                )}
                {...this.props}
              />
            </Tab>

            <Tab title="YAML/JSON">
              <Row gutter={5}>
                <Col flex={12}>
                  <Card>
                    <PayloadViewer
                      value={api}
                      name={api.name}
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
    initialFormValues: getEditAPIModel(state),
  };
}

export default compose(
  withAPI,
  withProviderKongsByGatewayPicker(),
  connect(mapStateToProps, actions),
)(APIEdit);
