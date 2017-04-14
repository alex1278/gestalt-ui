/**
 * Actions for containment state management/switching. Typically, these are called when an org, workspace or
 * environment is navigated to.
 */
export const SET_CURRENT_ORG_CONTEXT_REQUEST = 'metaResource/SET_CURRENT_ORG_CONTEXT_REQUEST';
export const SET_CURRENT_ORG_CONTEXT_PENDING = 'metaResource/SET_CURRENT_ORG_CONTEXT_PENDING';
export const SET_CURRENT_ORG_CONTEXT_REJECTED = 'metaResource/SET_CURRENT_ORG_CONTEXT_REJECTED';

export const SET_CURRENT_WORKSPACE_CONTEXT_REQUEST = 'metaResource/SET_CURRENT_WORKSPACE_CONTEXT_REQUEST';
export const SET_CURRENT_WORKSPACE_CONTEXT_PENDING = 'metaResource/SET_CURRENT_WORKSPACE_CONTEXT_PENDING';
export const SET_CURRENT_WORKSPACE_CONTEXT_REJECTED = 'metaResource/SET_CURRENT_WORKSPACE_CONTEXT_REJECTED';

export const SET_CURRENT_ENVIRONMENT_CONTEXT_REQUEST = 'metaResource/SET_CURRENT_ENVIRONMENT_CONTEXT_REQUEST';
export const SET_CURRENT_ENVIRONMENT_CONTEXT_PENDING = 'metaResource/SET_CURRENT_ENVIRONMENT_CONTEXT_PENDING';
export const SET_CURRENT_ENVIRONMENT_CONTEXT_REJECTED = 'metaResource/SET_CURRENT_ENVIRONMENT_CONTEXT_REJECTED';

export const UPDATE_CURRENT_ORG_CONTEXT = 'metaResource/UPDATE_CURRENT_ORG_CONTEXT';
export const UPDATE_CURRENT_WORKSPACE_CONTEXT = 'metaResource/UPDATE_CURRENT_WORKSPACE_CONTEXT';
export const UPDATE_CURRENT_ENVIRONMENT_CONTEXT = 'metaResource/UPDATE_CURRENT_ENVIRONMENT_CONTEXT';

export const UNLOAD_CURRENT_WORKSPACE_CONTEXT = 'metaResource/UNLOAD_CURRENT_WORKSPACE_CONTEXT';
export const UNLOAD_CURRENT_ENVIRONMENT_CONTEXT = 'metaResource/UNLOAD_CURRENT_ENVIRONMENT_CONTEXT';

/**
 * Orgs
 */
export const FETCH_ALLORGS_REQUEST = 'metaResource/FETCH_ALLORGS_REQUEST';
export const FETCH_ALLORGS_FULFILLED = 'metaResource/FETCH_ALLORGS_FULFILLED';
export const FETCH_ALLORGS_REJECTED = 'metaResource/FETCH_ALLORGS_REJECTED';

export const FETCH_ALLORGS_DROPDOWN_REQUEST = 'metaResource/FETCH_ALLORGS_DROPDOWN_REQUEST';
export const FETCH_ALLORGS_DROPDOWN_FULFILLED = 'metaResource/FETCH_ALLORGS_DROPDOWN_FULFILLED';
export const FETCH_ALLORGS_DROPDOWN_REJECTED = 'metaResource/FETCH_ALLORGS_DROPDOWN_REJECTED';

export const FETCH_ORGS_REQUEST = 'metaResource/FETCH_ORGS_REQUEST';
export const FETCH_ORGS_FULFILLED = 'metaResource/FETCH_ORGS_FULFILLED';
export const FETCH_ORGS_REJECTED = 'metaResource/FETCH_ORGS_REJECTED';

export const FETCH_ORG_REQUEST = 'metaResource/FETCH_ORG_REQUEST';
export const FETCH_ORG_FULFILLED = 'metaResource/FETCH_ORG_FULFILLED';
export const FETCH_ORG_REJECTED = 'metaResource/FETCH_ORG_REJECTED';

export const FETCH_ORGSET_REQUEST = 'metaResource/FETCH_ORGSET_REQUEST';
export const FETCH_ORGSET_FULFILLED = 'metaResource/FETCH_ORGSET_FULFILLED';
export const FETCH_ORGSET_REJECTED = 'metaResource/FETCH_ORGSET_REJECTED';

export const CREATE_ORG_REQUEST = 'metaResource/CREATE_ORG_REQUEST';
export const CREATE_ORG_FULFILLED = 'metaResource/CREATE_ORG_FULFILLED';
export const CREATE_ORG_REJECTED = 'metaResource/CREATE_ORG_REJECTED';

export const UPDATE_ORG_REQUEST = 'metaResource/UPDATE_ORG_REQUEST';
export const UPDATE_ORG_FULFILLED = 'metaResource/UPDATE_ORG_FULFILLED';
export const UPDATE_ORG_REJECTED = 'metaResource/UPDATE_ORG_REJECTED';

export const DELETE_ORG_REQUEST = 'metaResource/DELETE_ORG_REQUEST';
export const DELETE_ORG_FULFILLED = 'metaResource/DELETE_ORG_FULFILLED';
export const DELETE_ORG_REJECTED = 'metaResource/DELETE_ORG_REJECTED';

export const UNLOAD_ALLORGS = 'metaResource/UNLOAD_ALLORGS';
export const UNLOAD_ORGSET = 'metaResource/UNLOAD_ORGSET';

/**
 * Workspaces
 */
export const FETCH_WORKSPACES_REQUEST = 'metaResource/FETCH_WORKSPACES_REQUEST';
export const FETCH_WORKSPACES_FULFILLED = 'metaResource/FETCH_WORKSPACES_FULFILLED';
export const FETCH_WORKSPACES_REJECTED = 'metaResource/FETCH_WORKSPACES_REJECTED';

export const FETCH_WORKSPACE_REQUEST = 'metaResource/FETCH_WORKSPACE_REQUEST';
export const FETCH_WORKSPACE_FULFILLED = 'metaResource/FETCH_WORKSPACE_FULFILLED';
export const FETCH_WORKSPACE_REJECTED = 'metaResource/FETCH_WORKSPACE_REJECTED';

export const CREATE_WORKSPACE_REQUEST = 'metaResource/CREATE_WORKSPACE_REQUEST';
export const CREATE_WORKSPACE_FULFILLED = 'metaResource/CREATE_WORKSPACE_FULFILLED';
export const CREATE_WORKSPACE_REJECTED = 'metaResource/CREATE_WORKSPACE_REJECTED';

export const UPDATE_WORKSPACE_REQUEST = 'metaResource/UPDATE_WORKSPACE_REQUEST';
export const UPDATE_WORKSPACE_FULFILLED = 'metaResource/UPDATE_WORKSPACE_FULFILLED';
export const UPDATE_WORKSPACE_REJECTED = 'metaResource/UPDATE_WORKSPACE_REJECTED';

export const DELETE_WORKSPACE_REQUEST = 'metaResource/DELETE_WORKSPACE_REQUEST';
export const DELETE_WORKSPACE_FULFILLED = 'metaResource/DELETE_WORKSPACE_FULFILLED';
export const DELETE_WORKSPACE_REJECTED = 'metaResource/DELETE_WORKSPACE_REJECTED';

export const UNLOAD_WORKSPACES = 'metaResource/UNLOAD_WORKSPACES';

/**
 * Environments
 */
export const FETCH_ENVIRONMENTS_REQUEST = 'metaResource/FETCH_ENVIRONMENTS_REQUEST';
export const FETCH_ENVIRONMENTS_FULFILLED = 'metaResource/FETCH_ENVIRONMENTS_FULFILLED';
export const FETCH_ENVIRONMENTS_REJECTED = 'metaResource/FETCH_ENVIRONMENTS_REJECTED';

export const FETCH_ENVIRONMENT_REQUEST = 'metaResource/FETCH_ENVIRONMENT_REQUEST';
export const FETCH_ENVIRONMENT_FULFILLED = 'metaResource/FETCH_ENVIRONMENT_FULFILLED';
export const FETCH_ENVIRONMENT_REJECTED = 'metaResource/FETCH_ENVIRONMENT_REJECTED';

export const CREATE_ENVIRONMENT_REQUEST = 'metaResource/CREATE_ENVIRONMENT_REQUEST';
export const CREATE_ENVIRONMENT_FULFILLED = 'metaResource/CREATE_ENVIRONMENT_FULFILLED';
export const CREATE_ENVIRONMENT_REJECTED = 'metaResource/CREATE_ENVIRONMENT_REJECTED';

export const UPDATE_ENVIRONMENT_REQUEST = 'metaResource/UPDATE_ENVIRONMENT_REQUEST';
export const UPDATE_ENVIRONMENT_FULFILLED = 'metaResource/UPDATE_ENVIRONMENT_FULFILLED';
export const UPDATE_ENVIRONMENT_REJECTED = 'metaResource/UPDATE_ENVIRONMENT_REJECTED';

export const DELETE_ENVIRONMENT_REQUEST = 'metaResource/DELETE_ENVIRONMENT_REQUEST';
export const DELETE_ENVIRONMENT_FULFILLED = 'metaResource/DELETE_ENVIRONMENT_FULFILLED';
export const DELETE_ENVIRONMENT_REJECTED = 'metaResource/DELETE_ENVIRONMENT_REJECTED';

export const UNLOAD_ENVIRONMENTS = 'metaResource/UNLOAD_ENVIRONMENTS';
/**
 * Self
 */
export const FETCH_SELF_REQUEST = 'metaResource/FETCH_SELF_REQUEST';
export const FETCH_SELF_FULFILLED = 'metaResource/FETCH_SELF_FULFILLED';
export const FETCH_SELF_REJECTED = 'metaResource/FETCH_SELF_REJECTED';

/**
 * Lambdas
 */
export const FETCH_LAMBDAS_REQUEST = 'metaResource/FETCH_LAMBDAS_REQUEST';
export const FETCH_LAMBDAS_FULFILLED = 'metaResource/FETCH_LAMBDAS_FULFILLED';
export const FETCH_LAMBDAS_REJECTED = 'metaResource/FETCH_LAMBDAS_REJECTED';

export const FETCH_LAMBDA_REQUEST = 'metaResource/FETCH_LAMBDA_REQUEST';
export const FETCH_LAMBDA_FULFILLED = 'metaResource/FETCH_LAMBDA_FULFILLED';
export const FETCH_LAMBDA_REJECTED = 'metaResource/FETCH_LAMBDA_REJECTED';

export const CREATE_LAMBDA_REQUEST = 'metaResource/CREATE_LAMBDA_REQUEST';
export const CREATE_LAMBDA_FULFILLED = 'metaResource/CREATE_LAMBDA_FULFILLED';
export const CREATE_LAMBDA_REJECTED = 'metaResource/CREATE_LAMBDA_REJECTED';

export const UPDATE_LAMBDA_REQUEST = 'metaResource/UPDATE_LAMBDA_REQUEST';
export const UPDATE_LAMBDA_FULFILLED = 'metaResource/UPDATE_LAMBDA_FULFILLED';
export const UPDATE_LAMBDA_REJECTED = 'metaResource/UPDATE_LAMBDA_REJECTED';

export const DELETE_LAMBDAS_REQUEST = 'metaResource/DELETE_LAMBDAS_REQUEST';
export const DELETE_LAMBDA_REQUEST = 'metaResource/DELETE_LAMBDA_REQUEST';
export const DELETE_LAMBDA_FULFILLED = 'metaResource/DELETE_LAMBDA_FULFILLED';
export const DELETE_LAMBDA_REJECTED = 'metaResource/DELETE_LAMBDA_REJECTED';

export const FETCH_LAMBDA_PROVIDER_REQUEST = 'metaResource/FETCH_LAMBDA_PROVIDER_REQUEST';
export const FETCH_LAMBDA_PROVIDER_FULFILLED = 'metaResource/FETCH_LAMBDA_PROVIDER_FULFILLED';
export const FETCH_LAMBDA_PROVIDER_REJECTED = 'metaResource/FETCH_LAMBDA_PROVIDER_REJECTED';

export const FETCH_LAMBDAS_DROPDOWN_REQUEST = 'metaResource/FETCH_LAMBDAS_DROPDOWN_REQUEST';
export const FETCH_LAMBDAS_DROPDOWN_FULFILLED = 'metaResource/FETCH_LAMBDAS_DROPDOWN_FULFILLED';
export const FETCH_LAMBDAS_DROPDOWN_REJECTED = 'metaResource/FETCH_LAMBDAS_DROPDOWN_REJECTED';

export const UNLOAD_LAMBDAS = 'metaResource/UNLOAD_LAMBDAS';


/**
 * APIS
 */
export const FETCH_APIS_REQUEST = 'metaResource/FETCH_APIS_REQUEST';
export const FETCH_APIS_FULFILLED = 'metaResource/FETCH_APIS_FULFILLED';
export const FETCH_APIS_REJECTED = 'metaResource/FETCH_APIS_REJECTED';

export const FETCH_API_REQUEST = 'metaResource/FETCH_API_REQUEST';
export const FETCH_API_FULFILLED = 'metaResource/FETCH_API_FULFILLED';
export const FETCH_API_REJECTED = 'apis/FETCH_API_REJECTED';

export const CREATE_API_REQUEST = 'metaResource/CREATE_API_REQUEST';
export const CREATE_API_FULFILLED = 'metaResource/CREATE_API_FULFILLED';
export const CREATE_API_REJECTED = 'metaResource/CREATE_API_REJECTED';

export const UPDATE_API_REQUEST = 'metaResource/UPDATE_API_REQUEST';
export const UPDATE_API_FULFILLED = 'metaResource/UPDATE_API_FULFILLED';
export const UPDATE_API_REJECTED = 'metaResource/UPDATE_API_REJECTED';

export const DELETE_APIS_REQUEST = 'metaResource/DELETE_APIS_REQUEST';
export const DELETE_API_REQUEST = 'metaResource/DELETE_API_REQUEST';
export const DELETE_API_FULFILLED = 'metaResource/DELETE_API_FULFILLED';
export const DELETE_API_REJECTED = 'metaResource/DELETE_API_REJECTED';

export const UNLOAD_APIS = 'metaResource/UNLOAD_APIS';

/**
 * API Endpoints
 */
export const FETCH_APIENDPOINTS_REQUEST = 'metaResource/FETCH_APIENDPOINTS_REQUEST';
export const FETCH_APIENDPOINTS_FULFILLED = 'metaResource/FETCH_APIENDPOINTS_FULFILLED';
export const FETCH_APIENDPOINTS_REJECTED = 'metaResource/FETCH_APIENDPOINTS_REJECTED';

export const FETCH_APIENDPOINT_REQUEST = 'metaResource/FETCH_APIENDPOINT_REQUEST';
export const FETCH_APIENDPOINT_FULFILLED = 'metaResource/FETCH_APIENDPOINT_FULFILLED';
export const FETCH_APIENDPOINT_REJECTED = 'metaResource/FETCH_APIENDPOINT_REJECTED';

export const CREATE_APIENDPOINT_REQUEST = 'metaResource/CREATE_APIENDPOINT_REQUEST';
export const CREATE_APIENDPOINT_FULFILLED = 'metaResource/CREATE_APIENDPOINT_FULFILLED';
export const CREATE_APIENDPOINT_REJECTED = 'metaResource/CREATE_APIENDPOINT_REJECTED';

export const UPDATE_APIENDPOINT_REQUEST = 'metaResource/UPDATE_APIENDPOINT_REQUEST';
export const UPDATE_APIENDPOINT_FULFILLED = 'metaResource/UPDATE_APIENDPOINT_FULFILLED';
export const UPDATE_APIENDPOINT_REJECTED = 'metaResource/UPDATE_APIENDPOINT_REJECTED';

export const DELETE_APIENDPOINTS_REQUEST = 'metaResource/DELETE_APIENDPOINTS_REQUEST';
export const DELETE_APIENDPOINT_REQUEST = 'metaResource/DELETE_APIENDPOINT_REQUEST';
export const DELETE_APIENDPOINT_FULFILLED = 'metaResource/DELETE_APIENDPOINT_FULFILLED';
export const DELETE_APIENDPOINT_REJECTED = 'metaResource/DELETE_APIENDPOINT_REJECTED';

export const UNLOAD_APIENDPOINTS = 'metaResource/UNLOAD_APIENDPOINTS';

/**
 * Providers
 */
export const FETCH_PROVIDERS_REQUEST = 'metaResource/FETCH_PROVIDERS_REQUEST';
export const FETCH_PROVIDERS_FULFILLED = 'metaResource/FETCH_PROVIDERS_FULFILLED';
export const FETCH_PROVIDERS_REJECTED = 'metaResource/FETCH_PROVIDERS_REJECTED';

export const FETCH_PROVIDER_REQUEST = 'metaResource/FETCH_PROVIDER_REQUEST';
export const FETCH_PROVIDER_FULFILLED = 'metaResource/FETCH_PROVIDER_FULFILLED';
export const FETCH_PROVIDER_REJECTED = 'metaResource/FETCH_PROVIDER_REJECTED';

export const CREATE_PROVIDER_REQUEST = 'metaResource/CREATE_PROVIDER_REQUEST';
export const CREATE_PROVIDER_FULFILLED = 'metaResource/CREATE_PROVIDER_FULFILLED';
export const CREATE_PROVIDER_REJECTED = 'metaResource/CREATE_PROVIDER_REJECTED';

export const UPDATE_PROVIDER_REQUEST = 'metaResource/UPDATE_PROVIDER_REQUEST';
export const UPDATE_PROVIDER_FULFILLED = 'metaResource/UPDATE_PROVIDER_FULFILLED';
export const UPDATE_PROVIDER_REJECTED = 'metaResource/UPDATE_PROVIDER_REJECTED';

export const DELETE_PROVIDERS_REQUEST = 'metaResource/DELETE_PROVIDERS_REQUEST';
export const DELETE_PROVIDER_REQUEST = 'metaResource/DELETE_PROVIDER_REQUEST';
export const DELETE_PROVIDER_FULFILLED = 'metaResource/DELETE_PROVIDER_FULFILLED';
export const DELETE_PROVIDER_REJECTED = 'metaResource/DELETE_PROVIDER_REJECTED';

export const FETCH_PROVIDERS_BYTYPE_REQUEST = 'metaResource/FETCH_PROVIDERS_BYTYPE_REQUEST';
export const FETCH_PROVIDERS_BYTYPE_FULFILLED = 'metaResource/FETCH_PROVIDERS_BYTYPE_FULFILLED';
export const FETCH_PROVIDERS_BYTYPE_REJECTED = 'metaResource/FETCH_PROVIDERS_BYTYPE_REJECTED';

export const FETCH_PROVIDERS_KONG_GATEWAY_REQUEST = 'metaResource/FETCH_PROVIDERS_KONG_GATEWAY_REQUEST';
export const FETCH_PROVIDERS_KONG_GATEWAY_FULFILLED = 'metaResource/FETCH_PROVIDERS_KONG_GATEWAY_FULFILLED';
export const FETCH_PROVIDERS_KONG_GATEWAY_REJECTED = 'metaResource/FETCH_PROVIDERS_KONG_GATEWAY_REJECTED';

export const FETCH_EXECUTORS_REQUEST = 'metaResource/FETCH_EXECUTORS_REQUEST';
export const FETCH_EXECUTORS_FULFILLED = 'metaResource/FETCH_EXECUTORS_FULFILLED';
export const FETCH_EXECUTORS_REJECTED = 'metaResource/FETCH_EXECUTORS_REJECTED';

export const UNLOAD_PROVIDERS = 'metaResource/UNLOAD_PROVIDERS';

/**
 * Containers
 */
export const FETCH_CONTAINERS_REQUEST = 'metaResource/FETCH_CONTAINERS_REQUEST';
export const FETCH_CONTAINERS_FULFILLED = 'metaResource/FETCH_CONTAINERS_FULFILLED';
export const FETCH_CONTAINERS_REJECTED = 'metaResource/FETCH_CONTAINERS_REJECTED';

export const FETCH_CONTAINER_REQUEST = 'metaResource/FETCH_CONTAINER_REQUEST';
export const FETCH_CONTAINER_FULFILLED = 'metaResource/FETCH_CONTAINER_FULFILLED';
export const FETCH_CONTAINER_REJECTED = 'metaResource/FETCH_CONTAINER_REJECTED';

export const FETCH_PROVIDER_CONTAINER_REQUEST = 'metaResource/FETCH_PROVIDER_CONTAINER_REQUEST';
export const CREATE_CONTAINER_REQUEST = 'metaResource/CREATE_CONTAINER_REQUEST';
export const CREATE_CONTAINER_FULFILLED = 'metaResource/CREATE_CONTAINER_FULFILLED';
export const CREATE_CONTAINER_REJECTED = 'metaResource/CREATE_CONTAINER_REJECTED';

export const UPDATE_CONTAINER_REQUEST = 'metaResource/UPDATE_CONTAINER_REQUEST';
export const UPDATE_CONTAINER_FULFILLED = 'metaResource/UPDATE_CONTAINER_FULFILLED';
export const UPDATE_CONTAINER_REJECTED = 'metaResource/UPDATE_CONTAINER_REJECTED';

export const DELETE_CONTAINER_REQUEST = 'metaResource/DELETE_CONTAINER_REQUEST';
export const DELETE_CONTAINER_FULFILLED = 'metaResource/DELETE_CONTAINER_FULFILLED';
export const DELETE_CONTAINER_REJECTED = 'metaResource/DELETE_CONTAINER_REJECTED';

export const SCALE_CONTAINER_REQUEST = 'metaResource/SCALE_CONTAINER_REQUEST';
export const SCALE_CONTAINER_FULFILLED = 'metaResource/SCALE_CONTAINER_FULFILLED';
export const SCALE_CONTAINER_REJECTED = 'metaResource/SCALE_CONTAINER_REJECTED';

export const MIGRATE_CONTAINER_REQUEST = 'metaResource/MIGRATE_CONTAINER_REQUEST';
export const MIGRATE_CONTAINER_FULFILLED = 'metaResource/MIGRATE_CONTAINER_FULFILLED';
export const MIGRATE_CONTAINER_REJECTED = 'metaResource/MIGRATE_CONTAINER_REJECTED';

export const FETCH_CONTAINERS_DROPDOWN_REQUEST = 'metaResource/FETCH_CONTAINERS_DROPDOWN_REQUEST';
export const FETCH_CONTAINERS_DROPDOWN_FULFILLED = 'metaResource/FETCH_CONTAINERS_DROPDOWN_FULFILLED';
export const FETCH_CONTAINERS_DROPDOWN_REJECTED = 'metaResource/FETCH_CONTAINERS_DROPDOWN_REJECTED';

export const UNLOAD_CONTAINERS = 'metaResource/UNLOAD_CONTAINERS';

/**
 * Policies
 */
export const FETCH_POLICIES_REQUEST = 'metaResource/FETCH_POLICIES_REQUEST';
export const FETCH_POLICIES_FULFILLED = 'metaResource/FETCH_POLICIES_FULFILLED';
export const FETCH_POLICIES_REJECTED = 'metaResource/FETCH_POLICIES_REJECTED';

export const FETCH_POLICY_REQUEST = 'metaResource/FETCH_POLICY_REQUEST';
export const FETCH_POLICY_FULFILLED = 'metaResource/FETCH_POLICY_FULFILLED';
export const FETCH_POLICY_REJECTED = 'metaResource/FETCH_POLICY_REJECTED';

export const CREATE_POLICY_REQUEST = 'metaResource/CREATE_POLICY_REQUEST';
export const CREATE_POLICY_FULFILLED = 'metaResource/CREATE_POLICY_FULFILLED';
export const CREATE_POLICY_REJECTED = 'metaResource/CREATE_POLICY_REJECTED';

export const UPDATE_POLICY_REQUEST = 'metaResource/UPDATE_POLICY_REQUEST';
export const UPDATE_POLICY_FULFILLED = 'metaResource/UPDATE_POLICY_FULFILLED';
export const UPDATE_POLICY_REJECTED = 'metaResource/UPDATE_POLICY_REJECTED';

export const DELETE_POLICIES_REQUEST = 'metaResource/DELETE_POLICIES_REQUEST';
export const DELETE_POLICY_REQUEST = 'metaResource/DELETE_POLICY_REQUEST';
export const DELETE_POLICY_FULFILLED = 'metaResource/DELETE_POLICY_FULFILLED';
export const DELETE_POLICY_REJECTED = 'metaResource/DELETE_POLICY_REJECTED';

export const UNLOAD_POLICIES = 'metaResource/UNLOAD_POLICIES';

/**
 * Policy Rules
 */
export const FETCH_POLICYRULES_REQUEST = 'metaResource/FETCH_POLICYRULES_REQUEST';
export const FETCH_POLICYRULES_FULFILLED = 'metaResource/FETCH_POLICYRULES_FULFILLED';
export const FETCH_POLICYRULES_REJECTED = 'metaResource/FETCH_POLICYRULES_REJECTED';

export const FETCH_POLICYRULE_REQUEST = 'metaResource/FETCH_POLICYRULE_REQUEST';
export const FETCH_POLICYRULE_FULFILLED = 'metaResource/FETCH_POLICYRULE_FULFILLED';
export const FETCH_POLICYRULE_REJECTED = 'metaResource/FETCH_POLICYRULE_REJECTED';

export const CREATE_POLICYRULE_REQUEST = 'metaResource/CREATE_POLICYRULE_REQUEST';
export const CREATE_POLICYRULE_FULFILLED = 'metaResource/CREATE_POLICYRULE_FULFILLED';
export const CREATE_POLICYRULE_REJECTED = 'metaResource/CREATE_POLICYRULE_REJECTED';

export const UPDATE_POLICYRULE_REQUEST = 'metaResource/UPDATE_POLICYRULE_REQUEST';
export const UPDATE_POLICYRULE_FULFILLED = 'metaResource/UPDATE_POLICYRULE_FULFILLED';
export const UPDATE_POLICYRULE_REJECTED = 'metaResource/UPDATE_POLICYRULE_REJECTED';

export const DELETE_POLICYRULES_REQUEST = 'metaResource/DELETE_POLICYRULES_REQUEST';
export const DELETE_POLICYRULE_REQUEST = 'metaResource/DELETE_POLICYRULE_REQUEST';
export const DELETE_POLICYRULE_FULFILLED = 'metaResource/DELETE_POLICYRULE_FULFILLED';
export const DELETE_POLICYRULE_REJECTED = 'metaResource/DELETE_POLICYRULE_REJECTED';

export const UNLOAD_POLICYRULES = 'metaResource/POLICYRULES_UNLOADED';

/**
 * Entitlements
 */
export const FETCH_ENTITLEMENTS_REQUEST = 'metaResource/FETCH_ENTITLEMENTS_REQUEST';
export const FETCH_ENTITLEMENTS_FULFILLED = 'metaResource/FETCH_ENTITLEMENTS_FULFILLED';
export const FETCH_ENTITLEMENTS_REJECTED = 'metaResource/FETCH_ENTITLEMENTS_REJECTED';

export const FETCH_IDENTITIES_REQUEST = 'metaResource/FETCH_IDENTITIES_REQUEST';
export const FETCH_IDENTITIES_FULFILLED = 'metaResource/FETCH_IDENTITIES_FULFILLED';
export const FETCH_IDENTITIES_REJECTED = 'metaResource/FETCH_IDENTITIES_REJECTED';

export const UPDATE_ENTITLEMENT_REQUEST = 'metaResource/UPDATE_ENTITLEMENT_REQUEST';
export const UPDATE_ENTITLEMENT_FULFILLED = 'metaResource/UPDATE_ENTITLEMENT_FULFILLED';
export const UPDATE_ENTITLEMENT_REJECTED = 'metaResource/UPDATE_ENTITLEMENT_REJECTED';

export const UDPATE_ENTITLEMENT_TOGGLE_STATE = 'metaResource/UDPATE_ENTITLEMENT_TOGGLE_STATE';
export const SELECTED_IDENTITY = 'metaResource/SELECTED_IDENTITY';

export const UNLOAD_ENTITLEMENTS = 'metaResource/UNLOAD_ENTITLEMENTS';

/**
 * Users
 */
export const FETCH_USERS_REQUEST = 'metaResource/FETCH_USERS_REQUEST';
export const FETCH_USERS_FULFILLED = 'metaResource/FETCH_USERS_FULFILLED';
export const FETCH_USERS_REJECTED = 'metaResource/FETCH_USERS_REJECTED';

export const FETCH_USER_REQUEST = 'metaResource/FETCH_USER_REQUEST';
export const FETCH_USER_FULFILLED = 'metaResource/FETCH_USER_FULFILLED';
export const FETCH_USER_REJECTED = 'metaResource/FETCH_USER_REJECTED';

export const CREATE_USER_REQUEST = 'metaResource/CREATE_USER_REQUEST';
export const CREATE_USER_FULFILLED = 'metaResource/CREATE_USER_FULFILLED';
export const CREATE_USER_REJECTED = 'metaResource/CREATE_USER_REJECTED';

export const UPDATE_USER_REQUEST = 'metaResource/UPDATE_USER_REQUEST';
export const UPDATE_USER_FULFILLED = 'metaResource/UPDATE_USER_FULFILLED';
export const UPDATE_USER_REJECTED = 'metaResource/UPDATE_USER_REJECTED';

export const DELETE_USERS_REQUEST = 'metaResource/DELETE_USERS_REQUEST';
export const DELETE_USER_REQUEST = 'metaResource/DELETE_USER_REQUEST';
export const DELETE_USER_FULFILLED = 'metaResource/DELETE_USER_FULFILLED';
export const DELETE_USER_REJECTED = 'metaResource/DELETE_USER_REJECTED';

export const UNLOAD_USERS = 'metaResource/UNLOAD_USERS';

/**
 * Groups
 */
export const FETCH_GROUPS_REQUEST = 'metaResource/FETCH_GROUPS_REQUEST';
export const FETCH_GROUPS_FULFILLED = 'metaResource/FETCH_GROUPS_FULFILLED';
export const FETCH_GROUPS_REJECTED = 'metaResource/FETCH_GROUPS_REJECTED';

export const FETCH_GROUP_REQUEST = 'metaResource/FETCH_GROUP_REQUEST';
export const FETCH_GROUP_FULFILLED = 'metaResource/FETCH_GROUP_FULFILLED';
export const FETCH_GROUP_REJECTED = 'metaResource/FETCH_GROUP_REJECTED';

export const CREATE_GROUP_REQUEST = 'metaResource/CREATE_GROUP_REQUEST';
export const CREATE_GROUP_FULFILLED = 'metaResource/CREATE_GROUP_FULFILLED';
export const CREATE_GROUP_REJECTED = 'metaResource/CREATE_GROUP_REJECTED';

export const UPDATE_GROUP_REQUEST = 'metaResource/UPDATE_GROUP_REQUEST';
export const UPDATE_GROUP_FULFILLED = 'metaResource/UPDATE_GROUP_FULFILLED';
export const UPDATE_GROUP_REJECTED = 'metaResource/UPDATE_GROUP_REJECTED';

export const DELETE_GROUPS_REQUEST = 'metaResource/DELETE_GROUPS_REQUEST';
export const DELETE_GROUP_REQUEST = 'metaResource/DELETE_GROUP_REQUEST';
export const DELETE_GROUP_FULFILLED = 'metaResource/DELETE_GROUP_FULFILLED';
export const DELETE_GROUP_REJECTED = 'metaResource/DELETE_GROUP_REJECTED';

export const ADD_GROUP_MEMBER_REQUEST = 'metaResource/ADD_GROUP_MEMBER_REQUEST';
export const ADD_GROUP_MEMBER_FULFILLED = 'metaResource/ADD_GROUP_MEMBER';
export const ADD_GROUP_MEMBER_REJECTED = 'metaResource/ADD_GROUP_MEMBER_REJECTED';
export const REMOVE_GROUP_MEMBER_REQUEST = 'metaResource/REMOVE_GROUP_MEMBER_REQUEST';
export const REMOVE_GROUP_MEMBER_FULFILLED = 'metaResource/REMOVE_GROUP_MEMBER_FULFILLED';
export const REMOVE_GROUP_MEMBER_REJECTED = 'metaResource/REMOVE_GROUP_MEMBER_REJECTED';

export const UNLOAD_GROUPS = 'metaResource/UNLOAD_GROUPS';

/**
 * Env
 */
export const FETCH_ENV_REQUEST = 'metaResource/FETCH_ENV_REQUEST';
export const FETCH_ENV_FULFILLED = 'metaResource/FETCH_ENV_FULFILLED';
export const FETCH_ENV_REJECTED = 'metaResource/FETCH_ENV_REJECTED';

export const FETCH_ENV_SCHEMA_REQUEST = 'metaResource/FETCH_ENV_SCHEMA_REQUEST';
export const FETCH_ENV_SCHEMA_FULFILLED = 'metaResource/FETCH_ENV_SCHEMA_FULFILLED';
export const FETCH_ENV_SCHEMA_REJECTED = 'metaResource/FETCH_ENV_SCHEMA_REJECTED';
