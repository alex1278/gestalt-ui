import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { metaActions } from 'modules/MetaResource';
import CircularActivity from 'components/CircularActivity';
import jsonPatch from 'fast-json-patch';
import { map } from 'lodash';
import base64 from 'base-64';
import LambdaForm from '../../components/LambdaForm';
import validate from '../../validations';
import * as actions from '../../actions';

class LambdaEdit extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    lambda: PropTypes.object.isRequired,
    fetchLambda: PropTypes.func.isRequired,
    fetchProviders: PropTypes.func.isRequired,
    fetchExecutors: PropTypes.func.isRequired,
    updateLambda: PropTypes.func.isRequired,
    pending: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    const { params, fetchLambda, fetchProviders, fetchExecutors } = this.props;
    // init providers dropdown
    fetchProviders(params.fqon, params.environmentId, 'Lambda');
    fetchExecutors(params.fqon, params.environmentId, 'Executor');
    fetchLambda(params.fqon, params.lambdaId, params.environmentId);
  }

  updatedModel(formValues) {
    const { name, description, properties } = formValues;
    const model = {
      name,
      description,
      properties: {
        env: properties.env,
        headers: properties.headers,
        code_type: properties.code_type,
        compressed: properties.compressed,
        cpus: properties.cpus,
        memory: properties.memory,
        timeout: properties.timeout,
        handler: properties.handler,
        package_url: properties.package_url,
        public: properties.public,
        synchronous: properties.synchronous,
        runtime: properties.runtime,
        provider: properties.provider,
      }
    };

    if (formValues.properties.code) {
      model.properties.code = base64.encode(formValues.properties.code);
    }

    // variables is a used for tracking out FieldArray
    formValues.variables.forEach((variable) => {
      model.properties.env[variable.name] = variable.value;
    });

    return model;
  }

  originalModel(originalOrg) {
    const { name, description, properties } = originalOrg;
    const model = {
      name,
      description,
      properties: {
        env: properties.env,
        headers: properties.headers,
        code: properties.code,
        code_type: properties.code_type,
        compressed: properties.compressed,
        cpus: properties.cpus,
        memory: properties.memory,
        timeout: properties.timeout,
        handler: properties.handler,
        package_url: properties.package_url,
        public: properties.public,
        synchronous: properties.synchronous,
        runtime: properties.runtime,
        provider: properties.provider,
      }
    };

    if (!properties.code) {
      delete model.properties.code;
    }

    return model;
  }

  updateLambda(values) {
    const { id } = this.props.lambda;
    const { lambda, params, router } = this.props;
    const updatedModel = this.updatedModel(values);
    const originalModel = this.originalModel(lambda);
    const patches = jsonPatch.compare(originalModel, updatedModel);

    const onSuccess = () => {
      router.replace(`${params.fqon}/workspaces/${params.workspaceId}/environments/${params.environmentId}`);
    };

    this.props.updateLambda(params.fqon, id, patches, onSuccess);
  }

  render() {
    const { lambda, pending } = this.props;
    return pending ? <CircularActivity id="lambda-load" /> :
    <LambdaForm
      editMode
      title={lambda.name}
      submitLabel="Update"
      cancelLabel="Back"
      onSubmit={values => this.updateLambda(values)}
      {...this.props}
    />;
  }
}

function mapStateToProps(state) {
  const { lambda, pending } = state.metaResource.lambda;
  const variables = map(lambda.properties.env, (value, name) => ({ name, value }));

  const model = {
    name: lambda.name,
    description: lambda.description,
    properties: {
      env: lambda.properties.env,
      headers: lambda.properties.headers,
      code: lambda.properties.code ? base64.decode(lambda.properties.code) : null,
      code_type: lambda.properties.code_type,
      compressed: lambda.properties.compressed,
      cpus: lambda.properties.cpus,
      memory: lambda.properties.memory,
      timeout: lambda.properties.timeout,
      handler: lambda.properties.handler,
      package_url: lambda.properties.package_url,
      public: lambda.properties.public,
      synchronous: lambda.properties.synchronous,
      runtime: lambda.properties.runtime,
      provider: lambda.properties.provider,
    },
    variables
  };

  return {
    lambda,
    pending,
    lambdaUpdatePending: state.metaResource.lambdaUpdate.pending,
    pendingProviders: state.lambdas.providers.pending,
    providers: state.lambdas.providers.providers,
    executors: state.lambdas.executors.executors,
    pendingExecutors: state.lambdas.executors.pending,
    theme: state.lambdas.theme,
    initialValues: model,
    enableReinitialize: true,
  };
}

export default connect(mapStateToProps, Object.assign({}, actions, metaActions))(reduxForm({
  form: 'lambdaEdit',
  validate
})(LambdaEdit));
