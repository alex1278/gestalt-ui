import { LOCATION_CHANGE } from 'react-router-redux';
import * as types from '../actionTypes';


const initialState = {
  pending: false,
  completed: false,
  executors: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return initialState;
    case types.FETCH_EXECUTORS_REQUEST:
      return {
        ...state,
        executors: [{ id: '', name: 'fetching executors...' }],
        pending: true,
      };
    case types.FETCH_EXECUTORS_FULFILLED:
      return {
        ...state,
        pending: false,
        completed: true,
        executors: action.payload,
      };
    case types.FETCH_EXECUTORS_REJECTED:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    default:
      return state;
  }
};