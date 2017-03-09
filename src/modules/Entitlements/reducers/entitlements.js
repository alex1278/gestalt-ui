import {
  FETCH_ENTITLEMENTS_PENDING,
  FETCH_ENTITLEMENTS_REJECTED,
  FETCH_ENTITLEMENTS_FULFILLED,
  ENTITLEMENTS_UNLOADED,
  UDPATE_ENTITLEMENT_TOGGLE_STATE,
} from '../actionTypes';

const initialState = {
  pending: false,
  completed: false,
  entitlements: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ENTITLEMENTS_UNLOADED:
      return initialState;
    case FETCH_ENTITLEMENTS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_ENTITLEMENTS_FULFILLED:
      return {
        ...state,
        pending: false,
        completed: true,
        entitlements: action.payload,
      };
    case FETCH_ENTITLEMENTS_REJECTED:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    case UDPATE_ENTITLEMENT_TOGGLE_STATE:
      return {
        ...state,
        entitlements: action.payload,
      };
    default:
      return state;
  }
};

