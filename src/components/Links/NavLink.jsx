import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink as ReactLink } from 'react-router-dom';

const StyledNavLink = styled(({ staticContext, disabled, ...rest }) => <ReactLink {...rest} />)`
  &.active-link * {
    color: ${props => props.theme.colors.active};
    font-weight: 500;
  }
`;

export default class Link extends Component {
  static propTypes = {
    to: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]).isRequired,
    disabled: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired,
    target: PropTypes.string,
    activeClassName: PropTypes.string,
  };

  static defaultProps = {
    target: '_blank',
    disabled: false,
    activeClassName: 'active-link',
  };

  parseTo(to) {
    const parser = document.createElement('a');
    parser.href = to;
    return parser;
  }

  isInternal(to) {
    if (typeof to === 'object') return true;

    // If it's a relative url such as '/path', 'path' and does not contain a protocol we can assume it is internal.
    if (to.indexOf('://') === -1) return true;

    const toLocation = this.parseTo(to);
    return window.location.hostname === toLocation.hostname;
  }

  render() {
    const { to, target, disabled, children, activeClassName, ...rest } = this.props;
    const isInternal = this.isInternal(to);

    if (isInternal) {
      return (
        <StyledNavLink
          to={to}
          activeClassName={activeClassName}
          disabled={disabled}
          {...rest}
        >
          {children}
        </StyledNavLink>
      );
    }

    return (
      <a href={to} target={target} rel="noopener noreferrer" {...rest}>{children}</a>
    );
  }
}
