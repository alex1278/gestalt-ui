import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { notifierReducer } from 'Modules/Notifications';
import appReducers from 'App/reducers';
import errorNotificationReducer from 'Modules/ErrorNotifications/reducers';
import loginReducer from 'Modules/Authentication/reducers';
import hierarchyReducer from 'Modules/Hierarchy/reducers';
import providersReducer from 'Modules/Providers/reducers';
import lambdasReducer from 'Modules/Lambdas/reducers';
import entitlementsReducer from 'Modules/Entitlements/reducers';
import apisReducer from 'Modules/APIs/reducers';
import apiEndpointsReducer from 'Modules/APIEndpoints/reducers';
import usersReducer from 'Modules/Users/reducers';
import groupsReducer from 'Modules/Groups/reducers';
import containersReducer from 'Modules/Containers/reducers';
import policiesReducer from 'Modules/Policies/reducers';
import policyRulesReducer from 'Modules/PolicyRules/reducers';
import licensingReducer from 'Modules/Licensing/reducers';
import secretReducers from 'Modules/Secrets/reducers';
import volumeReducers from 'Modules/Volumes/reducers';
import dataFeedReducers from 'Modules/DataFeeds/reducers';
import streamSpecReducers from 'Modules/Streams/reducers';
import loggingReducers from 'Modules/Logging/reducers';
import listFilterReducer from 'Modules/ListFilter/reducers';
import searchReducers from 'Modules/Search/reducers';
import resourceTypesReducers from 'Modules/ResourceTypes/reducers';
import appDeploymentsReducers from 'Modules/AppDeployments/reducers';
import upgraderReducers from 'Modules/Upgrader/reducers';
import userProfileReducers from 'Modules/UserProfile/reducers';

export default history => combineReducers({
  error: errorNotificationReducer,
  router: connectRouter(history),
  app: appReducers,
  login: loginReducer,
  hierarchy: hierarchyReducer,
  providers: providersReducer,
  lambdas: lambdasReducer,
  entitlements: entitlementsReducer,
  users: usersReducer,
  groups: groupsReducer,
  containers: containersReducer,
  policies: policiesReducer,
  policyRules: policyRulesReducer,
  apis: apisReducer,
  apiEndpoints: apiEndpointsReducer,
  licensing: licensingReducer,
  secrets: secretReducers,
  volumes: volumeReducers,
  dataFeeds: dataFeedReducers,
  streamSpecs: streamSpecReducers,
  logging: loggingReducers,
  listfilter: listFilterReducer,
  notifications: notifierReducer,
  search: searchReducers,
  resourceTypes: resourceTypesReducers,
  appDeployments: appDeploymentsReducers,
  upgrader: upgraderReducers,
  userProfile: userProfileReducers,
});
