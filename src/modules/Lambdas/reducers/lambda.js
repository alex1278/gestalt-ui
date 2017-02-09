import {
    FETCH_LAMBDA_PENDING,
    FETCH_LAMBDA_REJECTED,
    FETCH_LAMBDA_FULFILLED,
    CREATE_LAMBDA_PENDING,
    CREATE_LAMBDA_FULFILLED,
    CREATE_LAMBDA_REJECTED,
    DELETE_LAMBDA_PENDING,
    DELETE_LAMBDA_FULFILLED,
    DELETE_LAMBDA_REJECTED,
    LAMBDA_UNLOADED,
} from '../actionTypes';

const initialState = {
  pending: false,
  completed: false,
  lambda: {
    created: {},
    modified: {},
    properties: {
      env: {},
      headers: {},
      providers: [],
    },
  },
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LAMBDA_UNLOADED:
      return initialState;
    case FETCH_LAMBDA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_LAMBDA_FULFILLED:
      return {
        ...state,
        pending: false,
        completed: true,
        lambda: action.payload
      };
    case FETCH_LAMBDA_REJECTED:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    case CREATE_LAMBDA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case CREATE_LAMBDA_FULFILLED:
      return {
        ...state,
        pending: false,
        completed: true,
        lambda: action.payload,
      };
    case CREATE_LAMBDA_REJECTED:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    case DELETE_LAMBDA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case DELETE_LAMBDA_FULFILLED:
      return {
        ...state,
        pending: false,
        completed: true
      };
    case DELETE_LAMBDA_REJECTED:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
