import { takeLatest, put, call, fork } from 'redux-saga/effects';
import axios from 'axios';
import * as types from '../actionTypes';

/**
 * addGroupMember
 * @param {*} action - { fqon, groupId, userId, onSuccess {returns response.data} }
 */
export function* addGroupMember(action) {
  try {
    yield call(axios.patch, `${action.fqon}/groups/${action.groupId}/users?id=${action.userId}`, []);
    const response = yield call(axios.get, `${action.fqon}/groups/${action.groupId}?expand=true`);
    yield put({ type: types.ADD_GROUPMEMBER_FULFILLED, payload: response.data });

    if (typeof action.onSuccess === 'function') {
      action.onSuccess(response.data);
    }
  } catch (e) {
    yield put({ type: types.ADD_GROUPMEMBER_REJECTED, payload: e.message });
  }
}

/**
 * removeGroupMember
 * @param {*} action - { fqon, groupId, userId, onSuccess {returns response.data} }
 */
export function* removeGroupMember(action) {
  try {
    yield call(axios.delete, `${action.fqon}/groups/${action.groupId}/users?id=${action.userId}`, []);
    const response = yield call(axios.get, `${action.fqon}/groups/${action.groupId}?expand=true`);
    yield put({ type: types.REMOVE_GROUPMEMBER_FULFILLED, payload: response.data });

    if (typeof action.onSuccess === 'function') {
      action.onSuccess(response.data);
    }
  } catch (e) {
    yield put({ type: types.REMOVE_GROUPMEMBER_REJECTED, payload: e.message });
  }
}


// Watchers
export default function* () {
  yield fork(takeLatest, types.ADD_GROUPMEMBER_REQUEST, addGroupMember);
  yield fork(takeLatest, types.REMOVE_GROUPMEMBER_REQUEST, removeGroupMember);
}
