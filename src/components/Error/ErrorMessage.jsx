import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconButton } from 'components/Buttons';
import CloseIcon from '@material-ui/icons/Close';

const ErrorWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 48px;
  background: ${props => props.theme.colors.error};
  color: white;
  text-align: center;
  font-weight: 700;
`;

const Close = styled(IconButton)`
  position: absolute;
  right: 0;
`;

class ErrorMessage extends Component {
  static propTypes = {
    message: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    visible: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  };

  static defaultProps = {
    visible: false,
    message: null,
  };

  state = { visible: this.props.visible };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.visible !== prevState.visible) {
      return {
        visible: nextProps.visible,
      };
    }

    return null;
  }

  // componentDidMount() {
  //   if (this.state.visible) {
  //     clearTimeout(this.timeout);
  //     this.timeout = setTimeout(() => this.setState({ visible: false }), 2000);
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.visible !== prevState.visible) {
  //     clearTimeout(this.timeout);
  //     this.timeout = setTimeout(() => this.setState({ visible: false }), 2000);
  //   }
  // }

  // componentWillUnmount() {
  //   clearTimeout(this.timeout);
  // }

  handleClose = () => this.setState({ visible: false });

  formatMessage() {
    const { message } = this.props;

    if (typeof message === 'object') {
      return JSON.stringify(message, null, 2);
    }

    return message;
  }

  render() {
    return (
      this.state.visible ?
        <ErrorWrapper>
          {this.formatMessage()}
          <Close
            icon={<CloseIcon fontSize="small" />}
            onClick={this.handleClose}
          />
        </ErrorWrapper>
        : null
    );
  }
}

export default ErrorMessage;
