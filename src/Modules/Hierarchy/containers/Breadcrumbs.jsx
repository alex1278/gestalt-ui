import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import base64 from 'base-64';
import styled, { css } from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { withOrganization, withEnvironment, withWorkspace, withSelf, } from 'Modules/MetaResource';
import { FontIcon } from 'react-md';
import { OrganizationIcon, WorkspaceIcon, EnvironmentIcon } from 'components/Icons';
import { Button } from 'components/Buttons';

const EnhancedLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  height: 32px;

  i,
  svg {
    color: inherit;
    margin-top: 2px;
  }

  i.seperator {
    color: ${props => props.theme.colors['$md-grey-500']};
  }

  &:hover {
    text-decoration: none;
    color: ${props => props.theme.colors['$md-grey-800']};
  }
`;

const Icon = styled.div`
  display: inline-block;
  padding-right: 1px;
`;

const BreadIcon = styled(Icon)`
  @media (min-width: 0) and (max-width: 659px) {
    display: none;
  }
`;

const Name = styled.div`
  display: inline-block;
  max-width: 250px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media (min-width: 0) and (max-width: 659px) {
    max-width: 100px;
  }
`;

const IconSeparator = styled(({ size, ...rest }) => <FontIcon {...rest} />)`
  font-size: ${props => `${props.size}px !important`};
`;

const NavArrow = styled(Button)`
  height: 32px;
  width: 32px;
  padding: 7px;

  i {
    font-size: 18px !important;
  }

  @media (min-width: 0) and (max-width: 659px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: ${props => `${props.size}px`};
  color: ${props => props.theme.colors['$md-grey-500']};

  @media (min-width: 0) and (max-width: 659px) {
    font-size: ${props => `${props.size - 1}px`};
  }

  ${props => props.lastIsActive && css`
    a:last-child {
      color: ${props.theme.colors['$md-blue-500']};

      &:hover {
        color: ${props.theme.colors['$md-blue-400']};
      }
    }
  `};
`;

class Breadcrumbs extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    organizationSet: PropTypes.object.isRequired,
    workspace: PropTypes.object.isRequired,
    environment: PropTypes.object.isRequired,
    size: PropTypes.number,
    lastIsActive: PropTypes.bool,
    pending: PropTypes.bool,
  };

  static defaultProps = {
    pending: false,
    size: 14,
    lastIsActive: false,
  }

  checkIfShouldNav(e, route) {
    const hashedPath = base64.encode(this.props.location.pathname);
    const hashedRoute = base64.encode(route);

    if (hashedPath === hashedRoute) {
      e.preventDefault();
    }
  }

  render() {
    const {
      organizationSet,
      workspace,
      environment,
      match,
      size,
      lastIsActive,
      pending,
    } = this.props;

    const parentOrgRoute = `/${organizationSet.org.properties.fqon}/hierarchy`;
    const orgsRoute = `/${organizationSet.properties.fqon}/hierarchy`;
    const workspaceRoute = `/${organizationSet.properties.fqon}/hierarchy/${workspace.id}/environments`;
    const environmentRoute = `${match.url}`;
    const orgName = organizationSet.description || organizationSet.name;
    const workspaceName = workspace.description || workspace.name;
    const environmentName = environment.description || environment.name;
    const isWorkspaceCtx = workspace.id && match.params.workspaceId;
    const isEnvironmentCtx = environment.id && match.params.environmentId;
    const orgNavDisabled = organizationSet.properties.fqon === 'root';

    return (
      <Wrapper size={size} lastIsActive={lastIsActive}>
        {organizationSet.properties.fqon &&
          <NavArrow
            icon
            disabled={pending || orgNavDisabled}
            component={Link}
            to={parentOrgRoute}
            tooltipLabel="Up one org level"
            tooltipPosition="right"
            inkDisabled
          >
            arrow_upward
          </NavArrow>}

        {orgName &&
        <EnhancedLink
          onClick={e => this.checkIfShouldNav(e, orgsRoute)}
          to={orgsRoute}
        >
          <BreadIcon>
            <OrganizationIcon size={size} />
          </BreadIcon>
          <Name>{orgName}</Name>
        </EnhancedLink>}

        {isWorkspaceCtx && orgName &&
        <EnhancedLink
          onClick={e => this.checkIfShouldNav(e, workspaceRoute)}
          to={workspaceRoute}
        >

          <IconSeparator className="seperator" size={size}>chevron_right</IconSeparator>
          <BreadIcon>
            <WorkspaceIcon size={size} />
          </BreadIcon>
          <Name>{workspaceName}</Name>
        </EnhancedLink>}

        {isEnvironmentCtx && isWorkspaceCtx && orgName &&
        <EnhancedLink
          onClick={e => this.checkIfShouldNav(e, environmentRoute)}
          to={environmentRoute}
        >
          <IconSeparator className="seperator" size={size}>chevron_right</IconSeparator>
          <BreadIcon>
            <EnvironmentIcon size={size} />
          </BreadIcon>
          <Name>{environmentName}</Name>
        </EnhancedLink>}
      </Wrapper>
    );
  }
}

export default compose(
  withEnvironment(),
  withWorkspace(),
  withOrganization(),
  withSelf,
  withRouter,
)(Breadcrumbs);
