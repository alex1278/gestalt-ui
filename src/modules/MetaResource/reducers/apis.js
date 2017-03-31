import { LOCATION_CHANGE } from 'react-router-redux';
import * as types from '../actionTypes';

const initialState = {
  pending: false,
  completed: false,
  apis: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return initialState;
    case types.UNLOAD_APIS:
      return initialState;
    case types.FETCH_APIS_REQUEST:
      return {
        ...state,
        pending: true
      };
    case types.FETCH_APIS_FULFILLED:
      return {
        ...state,
        pending: false,
        completed: true,
        apis: action.payload
      };
    case types.FETCH_APIS_REJECTED:
      return {
        ...state,
        pending: false,
        error: action.payload
      };
    case types.DELETE_APIS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case types.DELETE_API_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case types.DELETE_API_FULFILLED:
      return {
        ...state,
        pending: false,
        completed: true
      };
    case types.DELETE_API_REJECTED:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

