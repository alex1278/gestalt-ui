import * as types from '../actionTypes';
import * as actions from './resourceTypes';

describe('Resource Type Actions', () => {
  it('should request FETCH_RESOURCETYPES_REQUEST', () => {
    const expectedAction = {
      type: types.FETCH_RESOURCETYPES_REQUEST,
      fqon: 'iamfqon',
    };

    expect(actions.fetchResourceTypes('iamfqon')).to.deep.equal(expectedAction);
  });

  it('should request FETCH_RESOURCETYPE_REQUEST', () => {
    const expectedAction = {
      type: types.FETCH_RESOURCETYPE_REQUEST,
      fqon: 'iamfqon',
      resourceTypeId: '1',
    };

    expect(actions.fetchResourceType('iamfqon', '1')).to.deep.equal(expectedAction);
  });

  it('should request CREATE_RESOURCETYPE_REQUEST', () => {
    const expectedAction = {
      type: types.CREATE_RESOURCETYPE_REQUEST,
      fqon: 'iamfqon',
      payload: { name: 'woop woop!' },
      onSuccess: undefined,
    };

    expect(actions.createResourceType('iamfqon', { name: 'woop woop!' })).to.deep.equal(expectedAction);
  });

  it('should handle DELETE_RESOURCETYPE_REQUEST', () => {
    const expectedAction = {
      type: types.DELETE_RESOURCETYPE_REQUEST,
      fqon: 'iamfqon',
      resourceTypeId: '1',
      onSuccess: undefined,
    };

    expect(actions.deleteResourceType('iamfqon', '1')).to.deep.equal(expectedAction);
  });

  it('should handle DELETE_RESOURCETYPES_REQUEST', () => {
    const expectedAction = {
      type: types.DELETE_RESOURCETYPES_REQUEST,
      resourceTypeIds: [],
      fqon: 'iamfqon',
      onSuccess: undefined,
    };

    expect(actions.deleteResourceTypes([], 'iamfqon')).to.deep.equal(expectedAction);
  });
});