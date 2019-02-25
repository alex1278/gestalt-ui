import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createRequestAction } from 'config/lib/actionFactory';

export default function withlambdas(BaseComponent) {
  class lambdas extends Component {
    static displayName = 'Lambdas(HOC)';

    static propTypes = {
      lambdasActions: PropTypes.object.isRequired,
    };

    componentWillUnmount() {
      const { lambdasActions } = this.props;

      lambdasActions.unloadLambdas();
    }

    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    lambdas: state.lambdas.lambdas.lambdas,
    lambdasPending: state.lambdas.lambdas.pending,
  });

  const mapDispatchToProps = dispatch => ({
    lambdasActions: bindActionCreators(Object.assign({},
      createRequestAction(['fetch', 'delete', 'create'], 'Lambdas'),
      createRequestAction(['delete'], 'Lambda'),
    ), dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(lambdas);
}
