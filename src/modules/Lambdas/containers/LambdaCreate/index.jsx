import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import base64 from 'base-64';
import { cloneDeep, map } from 'lodash';
import { metaActions } from 'modules/MetaResource';
import CircularActivity from 'components/CircularActivity';
import LambdaForm from '../../components/LambdaForm';
import validate from '../../validations';
import * as actions from '../../actions';

class LambdaCreate extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    createLambda: PropTypes.func.isRequired,
    pendingEnv: PropTypes.bool.isRequired,
    fetchEnv: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { params, fetchEnv } = this.props;
    fetchEnv(params.fqon, params.environmentId);
  }

  create(values) {
    const { params, router, createLambda } = this.props;
    const payload = cloneDeep(values);
    // TODO: fake locations for now
    payload.properties.provider = { id: values.properties.provider.id, locations: [] };

    // Clean up properties depending on lambda code_type
    if (values.properties.code_type === 'package') {
      delete payload.properties.code;
    } else {
      delete payload.properties.package_url;
      delete payload.properties.compressed;
      payload.properties.code = base64.encode(payload.properties.code);
    }

    delete payload.variables;
    if (values.variables) {
      values.variables.forEach((variable) => {
        payload.properties.env[variable.name] = variable.value;
      });
    }

    const onSuccess = () => {
      router.replace(`${params.fqon}/workspaces/${params.workspaceId}/environments/${params.environmentId}`);
    };

    createLambda(params.fqon, params.environmentId, payload, onSuccess);
  }

  render() {
    return this.props.pendingEnv ? <CircularActivity id="container-load" /> :
    <LambdaForm
      title={<span>Create Lambda</span>}
      submitLabel="Create"
      cancelLabel="Back"
      onSubmit={values => this.create(values)}
      {...this.props}
    />;
  }
}

function mapStateToProps(state) {
  const { lambda, pending } = state.metaResource.lambda;
  const variables = map(Object.assign({}, state.lambdas.env.env), (value, name) => ({ name, value }));

  return {
    lambda,
    pending,
    pendingEnv: state.lambdas.env.pending,
    pendingProviders: state.lambdas.providers.pending,
    providers: state.lambdas.providers.providers,
    executors: state.lambdas.executors.executors,
    pendingExecutors: state.lambdas.executors.pending,
    theme: state.lambdas.theme,
    initialValues: {
      name: '',
      properties: {
        env: {},
        headers: {
          Accept: 'text/plain'
        },
        code: '',
        code_type: 'package',
        compressed: false,
        cpus: 0.1,
        memory: 512,
        timeout: 30,
        handler: '',
        package_url: '',
        public: true,
        synchronous: true,
        runtime: 'nodejs',
        // Providers is really an array of {id, locations[]}
        provider: {},
      },
      variables,
    },
    enableReinitialize: true,
  };
}

export default connect(mapStateToProps, Object.assign({}, actions, metaActions))(reduxForm({
  form: 'lambdaCreate',
  validate
})(LambdaCreate));

