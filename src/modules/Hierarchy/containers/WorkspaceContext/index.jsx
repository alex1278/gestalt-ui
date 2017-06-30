import { connect } from 'react-redux';
import { appActions } from 'App';
import { withMetaResource } from 'modules/MetaResource';
import { context } from 'modules/ContextManagement';
import WorkspaceContext from '../../components/WorkspaceContext';
import actions from '../../actions';

function mapStateToProps(state) {
  return {
    workspace: state.metaResource.workspace.workspace,
    pending: state.metaResource.workspace.pending,
    navigation: state.hierarchy.workspaceContextNavigation
  };
}

export default withMetaResource(connect(mapStateToProps, Object.assign({}, actions, appActions))(context(WorkspaceContext)));
