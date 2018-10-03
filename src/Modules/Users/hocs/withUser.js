import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createRequestAction } from 'config/lib/actionFactory';

export default () => (BaseComponent) => {
  class User extends Component {
    static displayName = 'User (HOC)';

    static propTypes = {
      userActions: PropTypes.object.isRequired,
    };

    componentWillUnmount() {
      const { userActions } = this.props;

      userActions.unloadUser();
    }

    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    user: state.users.user.user,
    userPending: state.users.user.pending,
  });

  const mapDispatchToProps = dispatch => ({
    userActions: bindActionCreators(Object.assign({},
      createRequestAction(['fetch', 'create', 'update', 'delete'], 'User'),
    ), dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(User);
};
