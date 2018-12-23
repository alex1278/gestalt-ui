import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Providers, ProviderCreate, ProviderEdit } from 'Modules/Providers';
import { Lambdas, LambdaCreate, LambdaEdit } from 'Modules/Lambdas';
import { Containers, ContainerCreate, ContainerEdit } from 'Modules/Containers';
import { Policies, PolicyCreate, PolicyEdit } from 'Modules/Policies';
import { Secrets, SecretCreate, SecretEdit } from 'Modules/Secrets';
import { APIs, APICreate, APIEdit } from 'Modules/APIs';
import { APIEndpoints, APIEndpointCreate, APIEndpointEdit } from 'Modules/APIEndpoints';
import { PolicyRules, PolicyLimitRuleCreate, PolicyLimitRuleEdit, PolicyEventRuleCreate, PolicyEventRuleEdit } from 'Modules/PolicyRules';
import { StreamList, StreamCreate, StreamEdit } from 'Modules/Streams';
import { DataFeedList, DataFeedCreate, DataFeedEdit } from 'Modules/DataFeeds';
import { Volumes, VolumeCreate, VolumeEdit } from 'Modules/Volumes';
import AppDeployments from 'Modules/AppDeployments/components/AppDeploymentListing';
import AppDeploymentCreate from 'Modules/AppDeployments/components/AppDeploymentCreate';
import InlineView from 'Modules/InlineView/Inline';
import EnvironmentHome from '../components/EnvironmentHome';
import withModalRouter from './withModalRouter';
import NotFound from '../../../App/components/NotFound';

const EnvironmentRoutes = ({ location, previousLocation, isModal }) => (
  <Switch location={isModal ? previousLocation : location}>
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId" component={EnvironmentHome} />

    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/providers" component={Providers} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/providers/create" component={ProviderCreate} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/providers/:providerId" component={ProviderEdit} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/providers/:providerId/container/:containerId" component={ContainerEdit} />

    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/lambdas" component={Lambdas} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/lambdas/create" component={LambdaCreate} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/lambdas/:lambdaId" component={LambdaEdit} />

    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/containers" component={Containers} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/containers/create" component={ContainerCreate} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/containers/:containerId" component={ContainerEdit} />

    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/apis" component={APIs} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/apis/create" component={APICreate} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/apis/:apiId" component={APIEdit} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/apis/:apiId/apiendpoints" component={APIEndpoints} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/apis/:apiId/apiendpoints/create" component={APIEndpointCreate} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/apis/:apiId/apiendpoints/:apiEndpointId" component={APIEndpointEdit} />

    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/policies" component={Policies} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/policies/create" component={PolicyCreate} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/policies/:policyId" component={PolicyEdit} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/policies/:policyId/rules" component={PolicyRules} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/policies/:policyId/rules/createlimitRule" component={PolicyLimitRuleCreate} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/policies/:policyId/rules/:ruleId/editLimitRule" component={PolicyLimitRuleEdit} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/policies/:policyId/rules/createeventRule" component={PolicyEventRuleCreate} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/policies/:policyId/rules/:ruleId/editEventRule" component={PolicyEventRuleEdit} />

    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/secrets" component={Secrets} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/secrets/create" component={SecretCreate} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/secrets/:secretId" component={SecretEdit} />

    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/streamspecs" component={StreamList} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/streamspecs/create" component={StreamCreate} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/streamspecs/:streamId" component={StreamEdit} />

    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/datafeeds" component={DataFeedList} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/datafeeds/create" component={DataFeedCreate} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/datafeeds/:datafeedId" component={DataFeedEdit} />

    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/volumes" component={Volumes} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/volumes/create" component={VolumeCreate} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/volumes/:volumeId" component={VolumeEdit} />

    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/appdeployments" component={AppDeployments} />
    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/appdeployments/create" component={AppDeploymentCreate} />

    <Route exact path="/:fqon/hierarchy/:workspaceId/environment/:environmentId/inline/:urlEncoded" component={InlineView} />

    <Route component={NotFound} />
  </Switch>
);

EnvironmentRoutes.propTypes = {
  location: PropTypes.object.isRequired,
  previousLocation: PropTypes.object,
  isModal: PropTypes.bool.isRequired,
};

EnvironmentRoutes.defaultProps = {
  previousLocation: {}
};

export default withModalRouter(EnvironmentRoutes);
