import { LOCATION_CHANGE } from 'react-router-redux';
import * as types from '../actionTypes';
import reducer from './entitlementUpdate';
import { metaActions } from '../../MetaResource';

const initialState = {
  pending: false,
  completed: false,
  entitlement: {},
  error: null,
};

describe('entitlements reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal(initialState);
  });

  it('should handle LOCATION_CHANGE', () => {
    expect(
      reducer({ entitlements: { id: 1 } }, { type: LOCATION_CHANGE })
    ).to.deep.equal(initialState);
  });

  it('should return the initial state on UNLOAD_ENTITLEMENTS', () => {
    expect(
      reducer({ entitlement: { id: 1 } }, metaActions.unloadEntitlements())
    ).to.deep.equal(initialState);
  });

  it('should handle UPDATE_ENTITLEMENT_REQUEST', () => {
    expect(
      reducer({}, metaActions.updateEntitlements())
    ).to.deep.equal({
      pending: true,
    });
  });

  it('should handle UPDATE_ENTITLEMENT_FULFILLED', () => {
    expect(
      reducer({}, {
        type: types.UPDATE_ENTITLEMENT_FULFILLED,
        payload: { id: 1 },
      })
    ).to.deep.equal({
      pending: false,
      completed: true,
      entitlement: { id: 1 },
    });
  });

  it('should handle UPDATE_ENTITLEMENT_REJECTED', () => {
    expect(
      reducer({}, {
        type: types.UPDATE_ENTITLEMENT_REJECTED,
        payload: 'doh!',
      })
    ).to.deep.equal({
      pending: false,
      error: 'doh!',
    });
  });
});
