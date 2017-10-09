import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withMetaResource } from 'Modules/MetaResource';
import { withContext, Breadcrumbs, ContextNavigation } from 'Modules/ContextManagement';
import ActivityContainer from 'components/ActivityContainer';
import { parse } from 'query-string';
import APIEndpointForm from '../../components/APIEndpointForm';
import validate from '../../components/APIEndpointForm/validations';
import actions from '../../actions';
import { generateAPIEndpointPatches } from '../../payloadTransformer';

class APIEndpointEdit extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    apiEndpoint: PropTypes.object.isRequired,
    fetchAPIEndpoint: PropTypes.func.isRequired,
    updateAPIEndpoint: PropTypes.func.isRequired,
    fetchContainersDropDown: PropTypes.func.isRequired,
    fetchLambdasDropDown: PropTypes.func.isRequired,
    apiEndpointPending: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { match, history, fetchAPIEndpoint, fetchContainersDropDown, fetchLambdasDropDown } = this.props;
    const query = parse(location.search);

    if (query.implementationType === 'container') {
      fetchContainersDropDown(match.params.fqon, match.params.environmentId);
    } else if (query.implementationType === 'lambda') {
      fetchLambdasDropDown(match.params.fqon);
    } else {
      // if the search params are missing then go back to the API parent
      history.replace(`/${match.params.fqon}/hierarchy/${match.params.workspaceId}/environments/${match.params.environmentId}/apis/${match.params.apiId}/edit`);
    }

    fetchAPIEndpoint(match.params.fqon, match.params.apiId, match.params.apiEndpointId);
  }

  updateAPIEndpoint(values) {
    const { match, history, apiEndpoint, updateAPIEndpoint } = this.props;
    const patches = generateAPIEndpointPatches(apiEndpoint, values);

    if (patches.length) {
      const onSuccess = () => history.replace(`/${match.params.fqon}/hierarchy/${match.params.workspaceId}/environments/${match.params.environmentId}/apis/${match.params.apiId}/edit`);
      updateAPIEndpoint(match.params.fqon, match.params.apiId, apiEndpoint.id, patches, onSuccess);
    }
  }

  render() {
    const { apiEndpoint, apiEndpointPending } = this.props;

    return (
      <div>
        <ContextNavigation
          breadcrumbComponent={<Breadcrumbs />}
        />
        {apiEndpointPending ?
          <ActivityContainer id="apiEndpoint-loading" /> :
          <APIEndpointForm
            editMode
            title={apiEndpoint.properties.resource}
            submitLabel="Update"
            cancelLabel={this.props.pristine ? 'Back' : 'Cancel'}
            onSubmit={values => this.updateAPIEndpoint(values)}
            {...this.props}
          />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { apiEndpoint } = state.metaResource.apiEndpoint;

  const model = {
    name: apiEndpoint.name,
    description: apiEndpoint.description,
    properties: {
      ...apiEndpoint.properties,
      plugins: {
        ...apiEndpoint.properties.plugins,
      }
    },
  };

  // TODO: move this logic to reselect
  if (model.properties.methods && Array.isArray(model.properties.methods)) {
    model.properties.methods = model.properties.methods.join(',');
  }

  return {
    initialValues: model,
    enableReinitialize: true,
  };
}

export default withMetaResource(connect(mapStateToProps, Object.assign({}, actions))(reduxForm({
  form: 'apiEndpointEdit',
  validate
})(withContext(APIEndpointEdit))));