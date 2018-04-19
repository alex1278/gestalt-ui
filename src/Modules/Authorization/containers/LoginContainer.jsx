import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Container, Col, Row } from 'react-flexybox';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { loadStorage } from 'util/helpers/localstorage';
import actions from '../actions';
import LoginForm from './LoginForm';
import LoginFooter from '../components/LoginFooter';
import lightTheme from '../../../themes/light';

const validate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = ' ';
  }

  if (!values.password) {
    errors.password = ' ';
  }

  return errors;
};

const Wrapper = styled(Container)`
  position: relative;
  padding-bottom: 72px;
  background-image: radial-gradient(circle, ${props => props.theme.colors['$russian-black-50']} 0, ${props => props.theme.colors['$russian-black-400']} 100%);
  /* background-image: radial-gradient(circle, ${props => props.theme.colors['$md-blue-500']} 0, ${props => props.theme.colors['$md-blue-900']} 100%); */
  height: 100%;
`;

class LoginContainer extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  submitLogin = (values) => {
    const { history, login, location } = this.props;
    const path = (location.state && location.state.nextPathname) || JSON.parse(loadStorage('lastVisitedRoute')) || '/';

    login(values.username, values.password).then(() => {
      history.replace(path);
    });
  };

  render() {
    return (
      <ThemeProvider theme={lightTheme}>
        <Wrapper fluid>
          <Row center fill>
            <Col flex={3} xs={12} sm={8} md={5}>
              <LoginForm onSubmit={this.submitLogin} {...this.props} />
            </Col>
          </Row>
          <LoginFooter />
        </Wrapper>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  token: state.login.login.token,
  isAuthenticating: state.login.login.isAuthenticating,
  statusText: state.login.login.statusText,
});

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'login',
  validate
})(LoginContainer));
