import {
    FETCH_POLICY_PENDING,
    FETCH_POLICY_REJECTED,
    FETCH_POLICY_FULFILLED,
    CREATE_POLICY_PENDING,
    CREATE_POLICY_FULFILLED,
    CREATE_POLICY_REJECTED,
    UNLOAD_POLICY
} from '../actionTypes';

const initialState = {
  pending: false,
  completed: false,
  policy: {
    created: {},
    modified: {},
    properties: {}
  },
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UNLOAD_POLICY:
      return initialState;
    case FETCH_POLICY_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_POLICY_FULFILLED:
      return {
        ...state,
        pending: false,
        completed: true,
        policy: action.payload
      };
    case FETCH_POLICY_REJECTED:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    case CREATE_POLICY_PENDING:
      return {
        ...state,
        pending: true,
      };
    case CREATE_POLICY_FULFILLED:
      return {
        ...state,
        pending: false,
        completed: true,
        policy: action.payload,
      };
    case CREATE_POLICY_REJECTED:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
