import * as types from '../actionTypes';
import * as actions from './providers';

describe('Provider Actions', () => {
  it('should request UNLOAD_PROVIDERS', () => {
    const expectedAction = {
      type: types.UNLOAD_PROVIDERS,
    };

    expect(actions.unloadProviders()).toEqual(expectedAction);
  });

  it('should request UNLOAD_PROVIDER', () => {
    const expectedAction = {
      type: types.UNLOAD_PROVIDER,
    };

    expect(actions.unloadProvider()).toEqual(expectedAction);
  });

  it('should request FETCH_PROVIDERS_REQUEST', () => {
    const expectedAction = {
      type: types.FETCH_PROVIDERS_REQUEST,
      fqon: 'iamfqon',
      entityId: '1',
      entityKey: 'environments',
    };

    expect(actions.fetchProviders('iamfqon', '1', 'environments')).toEqual(expectedAction);
  });

  it('should request FETCH_PROVIDERS_BYTYPE_REQUEST', () => {
    const expectedAction = {
      type: types.FETCH_PROVIDERS_BYTYPE_REQUEST,
      fqon: 'iamfqon',
      entityId: '1',
      entityKey: 'environments',
      providerType: 'whateverType',
      expand: false,
    };

    expect(actions.fetchProvidersByType('iamfqon', '1', 'environments', 'whateverType', false)).toEqual(expectedAction);
  });

  it('should request FETCH_PROVIDERS_KONG_GATEWAY_REQUEST', () => {
    const expectedAction = {
      type: types.FETCH_PROVIDERS_KONG_GATEWAY_REQUEST,
      fqon: 'iamfqon',
      entityId: '1',
      entityKey: 'environments',
    };

    expect(actions.fetchProviderKongsByGateway('iamfqon', '1', 'environments')).toEqual(expectedAction);
  });

  it('should request FETCH_EXECUTORS_REQUEST', () => {
    const expectedAction = {
      type: types.FETCH_EXECUTORS_REQUEST,
      fqon: 'iamfqon',
      entityId: '1',
      entityKey: 'environments',
      executorType: 'whateverType',
    };

    expect(actions.fetchExecutors('iamfqon', '1', 'environments', 'whateverType')).toEqual(expectedAction);
  });

  it('should request FETCH_PROVIDER_REQUEST', () => {
    const expectedAction = {
      type: types.FETCH_PROVIDER_REQUEST,
      fqon: 'iamfqon',
      providerId: '1',
    };

    expect(actions.fetchProvider('iamfqon', '1')).toEqual(expectedAction);
  });

  it('should handle CREATE_PROVIDER_REQUEST', () => {
    const expectedAction = {
      type: types.CREATE_PROVIDER_REQUEST,
      fqon: 'iamfqon',
      entityId: '1',
      entityKey: 'environments',
      payload: { name: 'test' },
      onSuccess: undefined,
    };

    expect(actions.createProvider('iamfqon', '1', 'environments', { name: 'test' })).toEqual(expectedAction);
  });

  it('should handle UPDATE_PROVIDER_REQUEST', () => {
    const expectedAction = {
      type: types.UPDATE_PROVIDER_REQUEST,
      fqon: 'iamfqon',
      providerId: '1',
      payload: [],
      onSuccess: undefined,
    };

    expect(actions.updateProvider('iamfqon', '1', [])).toEqual(expectedAction);
  });

  it('should handle DELETE_PROVIDER_REQUEST', () => {
    const expectedAction = {
      type: types.DELETE_PROVIDER_REQUEST,
      fqon: 'iamfqon',
      providerId: '1',
      onSuccess: undefined,
    };

    expect(actions.deleteProvider('iamfqon', '1')).toEqual(expectedAction);
  });

  it('should handle DELETE_PROVIDERS_REQUEST', () => {
    const expectedAction = {
      type: types.DELETE_PROVIDERS_REQUEST,
      providerIds: [],
      fqon: 'iamfqon',
      onSuccess: undefined,
    };

    expect(actions.deleteProviders([], 'iamfqon')).toEqual(expectedAction);
  });

  it('should handle REDEPLOY_PROVIDER_REQUEST', () => {
    const expectedAction = {
      type: types.REDEPLOY_PROVIDER_REQUEST,
      fqon: 'iamfqon',
      providerId: '1',
      onSuccess: undefined,
    };

    expect(actions.redeployProvider('iamfqon', '1')).toEqual(expectedAction);
  });
});
