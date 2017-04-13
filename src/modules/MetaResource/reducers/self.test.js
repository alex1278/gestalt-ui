import * as types from '../actionTypes';
import reducer from './self';
import { metaActions } from '../../MetaResource';

const initialState = {
  pending: false,
  completed: false,
  error: null,
  self: {
    properties: {
      gestalt_home: {
        org: {},
        created: {},
        modified: {},
        properties: {
          env: {}
        },
      }
    }
  }
};

describe('self reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal(initialState);
  });

  it('should handle FETCH_SELF_REQUEST', () => {
    expect(
      reducer({}, metaActions.fetchSelf())
    ).to.deep.equal({
      pending: true,
    });
  });

  it('should handle FETCH_SELF_FULFILLED', () => {
    expect(
      reducer({}, {
        type: types.FETCH_SELF_FULFILLED,
        payload: { ...initialState.self, id: 1 },
      })
    ).to.deep.equal({
      pending: false,
      completed: true,
      self: { ...initialState.self, id: 1 },
    });
  });

  it('should handle FETCH_SELF_REJECTED', () => {
    expect(
      reducer({}, {
        type: types.FETCH_SELF_REJECTED,
        payload: 'doh!',
      })
    ).to.deep.equal({
      pending: false,
      error: 'doh!',
    });
  });
});