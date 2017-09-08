import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ContainerCreate from './containers/ContainerCreate';
import ContainerEdit from './containers/ContainerEdit';

const LambdaRoot = () => (
  <div>
    <Switch>
      <Route exact path={'/:fqon/hierarchy/:workspaceId/environments/:environmentId/containers/create'} component={ContainerCreate} />
      <Route exact path={'/:fqon/hierarchy/:workspaceId/environments/:environmentId/containers/:containerId/edit'} component={ContainerEdit} />
    </Switch>
  </div>
);

export default LambdaRoot;
export { default as Containers } from './containers/ContainerListing';
export { default as ContainerCreate } from './containers/ContainerCreate';
export { default as ContainerEdit } from './containers/ContainerEdit';
export { default as ContainerInstances } from './components/ContainerInstances';
export { default as ContainerServiceAddresses } from './components/ContainerServiceAddresses';
export { default as ContainerActions } from './components/ContainerActions';
export { default as containerActionCreators } from './actions';
export { default as payloadTransformer } from './payloadTransformer';
