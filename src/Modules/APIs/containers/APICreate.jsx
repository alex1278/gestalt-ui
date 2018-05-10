import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Form } from 'react-final-form';
import { Col, Row } from 'react-flexybox';
import { withAPI, withMetaResource } from 'Modules/MetaResource';
import { ActivityContainer } from 'components/ProgressIndicators';
import ActionsToolbar from 'components/ActionsToolbar';
import { generateContextEntityState } from 'util/helpers/context';
import APIForm from './APIForm';
import validate from './validations';
import actions from '../actions';
import { generateAPIPayload } from '../payloadTransformer';

const initialFormValues = {
  name: null,
  description: null,
  properties: {
    provider: {},
  }
};

class APICreate extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    apiActions: PropTypes.object.isRequired,
    providersKongByGateway: PropTypes.array.isRequired,
    fetchProviderKongsByGateway: PropTypes.func.isRequired,
    apiPending: PropTypes.bool.isRequired,
    throwError: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { fetchProviderKongsByGateway, match } = this.props;

    fetchProviderKongsByGateway(match.params.fqon, match.params.environmentId, 'environments');
  }

  create = (values) => {
    const { match, history, apiActions, providersKongByGateway, throwError } = this.props;
    const payload = generateAPIPayload(values, providersKongByGateway);
    const entity = generateContextEntityState(match.params);
    // providerid must be the linked_gateway manager
    if (!payload.properties.provider.id) {
      throwError({ type: 'APP_ERROR_GENERAL', payload: 'Unable to create an API. You must create and link a gateway manager provider type first' });
    } else {
      const onSuccess = response => history.replace(`/${match.params.fqon}/hierarchy/${match.params.workspaceId}/environment/${match.params.environmentId}/apis/${response.id}`);

      apiActions.createAPI({ fqon: match.params.fqon, entityId: entity.id, entityKey: entity.key, payload, onSuccess });
    }
  }

  render() {
    const { apiPending } = this.props;

    return (
      <Row gutter={5} center>
        <Col flex={10} xs={12} sm={12} md={12}>

          <ActionsToolbar title="Create an API" />

          {apiPending && <ActivityContainer id="api-loading" />}

          <Form
            onSubmit={this.create}
            initialValues={initialFormValues}
            render={APIForm}
            validate={validate}
            loading={apiPending}
            {...this.props}
          />
        </Col>
      </Row>
    );
  }
}

export default compose(
  withAPI,
  withMetaResource,
  connect(null, actions),
)(APICreate);