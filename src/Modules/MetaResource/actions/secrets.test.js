import * as types from '../actionTypes';
import * as actions from './secrets';

describe('Secrets Actions', () => {
  it('should request UNLOAD_SECRETS', () => {
    const expectedAction = {
      type: types.UNLOAD_SECRETS,
    };

    expect(actions.unloadSecrets()).toEqual(expectedAction);
  });

  it('should request UNLOAD_SECRET', () => {
    const expectedAction = {
      type: types.UNLOAD_SECRET,
    };

    expect(actions.unloadSecret()).toEqual(expectedAction);
  });

  it('should request FETCH_SECRETS_REQUEST', () => {
    const expectedAction = {
      type: types.FETCH_SECRETS_REQUEST,
      fqon: 'iamfqon',
      environmentId: '1',
    };

    expect(actions.fetchSecrets('iamfqon', '1')).toEqual(expectedAction);
  });

  it('should request FETCH_SECRETS_DROPDOWN_REQUEST', () => {
    const expectedAction = {
      type: types.FETCH_SECRETS_DROPDOWN_REQUEST,
      fqon: 'iamfqon',
      environmentId: '1',
      providerId: '2',
    };

    expect(actions.fetchSecretsDropDown('iamfqon', '1', '2')).toEqual(expectedAction);
  });

  it('should request FETCH_SECRET_REQUEST', () => {
    const expectedAction = {
      type: types.FETCH_SECRET_REQUEST,
      fqon: 'iamfqon',
      secretId: '1',
    };

    expect(actions.fetchSecret('iamfqon', '1')).toEqual(expectedAction);
  });

  it('should handle CREATE_SECRET_REQUEST', () => {
    const expectedAction = {
      type: types.CREATE_SECRET_REQUEST,
      fqon: 'iamfqon',
      environmentId: '1',
      payload: { name: 'test' },
      onSuccess: undefined,
    };

    expect(actions.createSecret('iamfqon', '1', { name: 'test' })).toEqual(expectedAction);
  });

  it('should handle UPDATE_SECRET_REQUEST', () => {
    const expectedAction = {
      type: types.UPDATE_SECRET_REQUEST,
      fqon: 'iamfqon',
      secretId: '1',
      payload: [],
      onSuccess: undefined,
    };

    expect(actions.updateSecret('iamfqon', '1', [])).toEqual(expectedAction);
  });

  it('should handle DELETE_SECRET_REQUEST', () => {
    const expectedAction = {
      type: types.DELETE_SECRET_REQUEST,
      fqon: 'iamfqon',
      secretId: '1',
      onSuccess: undefined,
    };

    expect(actions.deleteSecret('iamfqon', '1')).toEqual(expectedAction);
  });

  it('should handle DELETE_SECRETS_REQUEST', () => {
    const expectedAction = {
      type: types.DELETE_SECRETS_REQUEST,
      secretIds: [],
      fqon: 'iamfqon',
      onSuccess: undefined,
    };

    expect(actions.deleteSecrets([], 'iamfqon')).toEqual(expectedAction);
  });
});
