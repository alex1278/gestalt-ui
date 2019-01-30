import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getItem, saveItem } from 'util/helpers/localstorage';

const getPreviousRoute = () => JSON.parse(getItem('lastVisitedRoute'));

export default function modalRouting(BaseComponent) {
  class ModalRouting extends Component {
    static propTypes = {
      history: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
    };

    componentWillUpdate(nextProps) {
      const { location } = this.props;
      // set previousLocation if props.location is not modal
      saveItem('lastVisitedRoute', JSON.stringify(location));

      if (nextProps.history.action !== 'POP' &&
        (!location.state || !location.state.modal)
      ) {
        this.previousLocation = getPreviousRoute();
      }
    }

    previousLocation = getPreviousRoute();

    render() {
      const { location } = this.props;

      const isModal = !!(
        location.state &&
        location.state.modal &&
        this.previousLocation !== location // not initial render
      );

      return <BaseComponent isModal={isModal} previousLocation={this.previousLocation} {...this.props} />;
    }
  }

  // tap into redux router - experimental
  function mapStateToProps(state) {
    const { router } = state;

    return {
      router,
    };
  }

  return compose(
    withRouter,
    connect(mapStateToProps)
  )(ModalRouting);
}
