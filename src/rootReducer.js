import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { createResponsiveStateReducer } from 'redux-responsive';
import appReducers from './App/reducers';
import metaResourceReducers from './modules/MetaResource/reducers';
import modalReducer from './modules/ModalRoot/reducers';
import errorNotificationReducer from './modules/ErrorNotifications/reducers';
import loginReducer from './modules/Login/reducers';
// import organizationsReducer from './modules/Organizations/reducers';
import oranizationNavMenu from './modules/OrgNavMenu/reducers';
import workspacesReducer from './modules/Workspaces/reducers';
import environmentsReducer from './modules/Environments/reducers';
import providersReducer from './modules/Providers/reducers';
import lambdasReducer from './modules/Lambdas/reducers';
import entitlementsReducer from './modules/Entitlements/reducers';
import apisReducer from './modules/APIs/reducers';
import apiEndpointsReducer from './modules/APIEndpoints/reducers';
import usersReducer from './modules/Users/reducers';
import groupsReducer from './modules/Groups/reducers';
import containersReducer from './modules/Containers/reducers';
import policiesReducer from './modules/Policies/reducers';
import policyRulesReducer from './modules/PolicyRules/reducers';
import integrationsReducer from './modules/Integrations/reducers';
import licensingReducer from './modules/Licensing/reducers';
import volumeModalReducer from './modules/VolumeModal/reducers';
import networkModalReducer from './modules/NetworkModal/reducers';
import healthCheckModalReducer from './modules/HealthCheckModal/reducers';

const mediaQuery = {
  xs: '(min-width: 0) and (max-width: 599px)',
  sm: '(min-width: 600px) and (max-width: 959px)',
  md: '(min-width: 960px) and (max-width: 1280px)',
  lg: 'only screen and (min-width: 1280px)'
};

export default combineReducers({
  browser: createResponsiveStateReducer(mediaQuery),
  error: errorNotificationReducer,
  modal: modalReducer,
  routing: routerReducer,
  form: formReducer,
  app: appReducers,
  metaResource: metaResourceReducers,
  login: loginReducer,
  // organizations: organizationsReducer,
  orgnavmenu: oranizationNavMenu,
  workspaces: workspacesReducer,
  environments: environmentsReducer,
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
  integrations: integrationsReducer,
  licensing: licensingReducer,
  volumeModal: volumeModalReducer,
  networkModal: networkModalReducer,
  healthCheckModal: healthCheckModalReducer,
});
