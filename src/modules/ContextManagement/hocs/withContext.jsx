import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Higher-order component (HOC) to handle keeping our navigation context updated
 * It requires that you have wrapper this component with org, workspace and environment redux state
 */
export default function WithContext(BaseComponent) {
  class Context extends PureComponent {
    static propTypes = {
      match: PropTypes.object.isRequired,
      organizationSet: PropTypes.object,
      workspace: PropTypes.object,
      environment: PropTypes.object,
      currentOrgContext: PropTypes.object.isRequired,
      currentWorkspaceContext: PropTypes.object.isRequired,
      currentEnvironmentContext: PropTypes.object.isRequired,
      setCurrentOrgContextfromState: PropTypes.func.isRequired,
      setCurrentWorkspaceContextfromState: PropTypes.func.isRequired,
      setCurrentEnvironmentContextfromState: PropTypes.func.isRequired,
      setCurrentOrgContext: PropTypes.func.isRequired,
      setCurrentWorkspaceContext: PropTypes.func.isRequired,
      setCurrentEnvironmentContext: PropTypes.func.isRequired,
    };

    static defaultProps = {
      organizationSet: {},
      workspace: {},
      environment: {},
    };

    componentWillMount() {
      const {
        match,
        currentOrgContext,
        currentWorkspaceContext,
        currentEnvironmentContext,
        setCurrentOrgContextfromState,
        setCurrentWorkspaceContextfromState,
        setCurrentEnvironmentContextfromState,
      } = this.props;

      // These methods are to mainly to appease browser refresh or copy paste URL nav where we lose the hierarchy context

      // match of the params exist, but only make a GET from meta if the contexct is missing
      if (match.params.fqon && !currentOrgContext.id) {
        setCurrentOrgContextfromState(match.params.fqon);
      }

      // do the same for workspaces
      if ((match.params.fqon && match.params.workspaceId) && !currentWorkspaceContext.id) {
        setCurrentWorkspaceContextfromState(match.params.fqon, match.params.workspaceId);
      }

      // do the same for environments
      if ((match.params.fqon && match.params.workspaceId && match.params.environmentId) && !currentEnvironmentContext.id) {
        setCurrentEnvironmentContextfromState(match.params.fqon, match.params.environmentId);
      }
    }

    componentWillReceiveProps(nextProps) {
      // TODO: This is a fallback for keeping contexts synced with store but we still need to move all the logic from Nav Cards to here
      if (nextProps.organizationSet !== this.props.organizationSet) {
        this.props.setCurrentOrgContext(nextProps.organizationSet);
      }

      if (nextProps.workspace !== this.props.workspace) {
        this.props.setCurrentWorkspaceContext(nextProps.workspace);
      }

      if (nextProps.environment !== this.props.environment) {
        this.props.setCurrentEnvironmentContext(nextProps.environment);
      }
    }

    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    const { metaResource } = state;

    return {
      currentOrgContext: metaResource.currentOrgContext.organization,
      currentWorkspaceContext: metaResource.currentWorkspaceContext.workspace,
      currentEnvironmentContext: metaResource.currentEnvironmentContext.environment,
    };
  }

  return connect(mapStateToProps, Object.assign({}, null))((Context));
}
