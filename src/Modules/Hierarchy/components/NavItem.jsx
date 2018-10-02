import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'components/Links';
import styled, { withTheme } from 'styled-components';

const ListItem = styled.li`
  list-style: none;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  height: 48px;
  width: 100%;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: ${props => props.theme.colors['$md-grey-200']};

    .on-menu-hover {
      display: flex;
    }
  }
`;

const NavLinkStyle = styled(NavLink)`
  position: relative;
  display: flex;
  padding-right: 20px;
  text-decoration: none;
  color: inherit;
`;

const Icon = styled.div`
  display: inline-block;
  line-height: 0;
  margin: 13px 21px;
`;

const Text = styled.div`
  color: ${props => props.theme.colors['$md-grey-900']};
  line-height: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const SubMenu = styled.div`
  display: none;
  position: absolute;
  left: 63px;
  height: 48px;
  width: calc(${props => props.width} - 56px);
  padding: 8px;
  border-left: 1px solid ${props => props.theme.colors['$md-grey-300']};
  background-color: ${props => props.theme.colors['$md-grey-200']};
  box-shadow: 2px 1px 2px -2px rgba(0, 0, 0, 0.1);
  opacity: 0.98;
  font-weight: 500;
`;

class NavItem extends Component {
  static propTypes = {
    icon: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]).isRequired,
    title: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]).isRequired,
    open: PropTypes.bool.isRequired,
    width: PropTypes.string.isRequired,
    isVisible: PropTypes.bool,
    history: PropTypes.object.isRequired,
    to: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]).isRequired,
  };

  static defaultProps = {
    isVisible: true,
  };

  checkIfShouldNav = (e) => {
    const { history, to } = this.props;
    let route = to;

    if (typeof to === 'object') {
      route = to.pathname;
    }

    if (history.location.pathname === route) {
      e.preventDefault();
    }
  }

  render() {
    const { icon, open, width, title, isVisible, ...rest } = this.props;

    if (!isVisible) {
      return null;
    }

    return (
      <ListItem width={width}>
        <NavLinkStyle onClick={this.checkIfShouldNav} {...rest}>
          <Icon>{icon}</Icon>
          <Text>{title}</Text>
          {!open &&
          <SubMenu width={width} className="on-menu-hover">
            <Text>{title}</Text>
          </SubMenu>}
        </NavLinkStyle>
      </ListItem>
    );
  }
}

export default compose(
  withTheme,
  withRouter,
)(NavItem);
