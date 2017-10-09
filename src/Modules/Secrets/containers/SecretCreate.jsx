import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withContext, Breadcrumbs, ContextNavigation } from 'Modules/ContextManagement';
import { withMetaResource } from 'Modules/MetaResource';
import SecretForm from '../components/SecretForm';
import validate from '../validations';
import actions from '../actions';
import { generateSecretPayload } from '../payloadTransformer';

class SecretCreate extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    createSecret: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
  };

  create(values) {
    const { match, history, createSecret } = this.props;
    const payload = generateSecretPayload(values);
    const onSuccess = () =>
      history.replace(`/${match.params.fqon}/hierarchy/${match.params.workspaceId}/environments/${match.params.environmentId}`);

    createSecret(match.params.fqon, match.params.environmentId, payload, onSuccess);
  }

  render() {
    return (
      <div>
        <ContextNavigation
          breadcrumbComponent={<Breadcrumbs />}
        />
        <SecretForm
          title="Create Secret"
          submitLabel="Create"
          cancelLabel={this.props.pristine ? 'Back' : 'Cancel'}
          onSubmit={values => this.create(values)}
          {...this.props}
        />
      </div>
    );
  }
}

function mapStateToProps() {
  const model = {
    name: '',
    description: '',
    properties: {
      provider: {},
      items: [],
    },
  };

  return {
    secret: model,
    initialValues: model
  };
}

export default withMetaResource(connect(mapStateToProps, actions)(reduxForm({
  form: 'secretCreate',
  validate
})(withContext(SecretCreate))));