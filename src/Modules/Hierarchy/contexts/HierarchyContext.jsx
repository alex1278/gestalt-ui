import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import Div from 'components/Div';
import HierarchyRoutes from '../routes/HierarchyRoutes';
import ContextNavigation from '../containers/ContextNavigation';
import withContext from '../hocs/withContext';

class HierarchyContext extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    contextActions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { match, contextActions } = this.props;
    contextActions.fetchContext({ fqon: match.params.fqon });
  }

  componentDidUpdate(prevProps) {
    const { match, contextActions } = this.props;

    if (match.params.fqon && prevProps.match.params.fqon !== match.params.fqon) {
      // If we change the org let's update the context and clear out the old the state tree for workspaces/environments
      contextActions.fetchContext({ fqon: match.params.fqon });
    }
  }

  render() {
    return (
      <Div paddingBottom="56px">
        <ContextNavigation />
        <HierarchyRoutes />
      </Div>
    );
  }
}

export default compose(
  withContext(),
)(HierarchyContext);
