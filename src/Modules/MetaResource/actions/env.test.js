import * as types from '../actionTypes';
import * as actions from './env';

describe('Env Actions', () => {
  it('should request FETCH_ENV_REQUEST', () => {
    const expectedAction = {
      type: types.FETCH_ENV_REQUEST,
      fqon: 'iamfqon',
      entityId: '1',
      entityKey: 'whatevs',
    };

    expect(actions.fetchEnv('iamfqon', '1', 'whatevs')).to.deep.equal(expectedAction);
  });

  it('should request FETCH_ENV_SCHEMA_REQUEST', () => {
    const expectedAction = {
      type: types.FETCH_ENV_SCHEMA_REQUEST,
      schemaType: 'whatevs',
    };

    expect(actions.fetchEnvSchema('whatevs')).to.deep.equal(expectedAction);
  });
});