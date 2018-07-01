import { takeLatest, put, call, fork } from 'redux-saga/effects';
import axios from 'axios';
import * as types from '../actionTypes';

/**
 * fetchAllOrgs
 */
export function* fetchAllOrgs() {
  try {
    const response = yield call(axios.get, 'orgs?expand=true');
    yield put({ type: types.FETCH_ALLORGS_FULFILLED, payload: response.data });
  } catch (e) {
    yield put({ type: types.FETCH_ALLORGS_REJECTED, payload: e.message });
  }
}

/**
 * fetchOrgSet - fetch the org, suborgs and workspaces for a fqon
 * @param {*} action - { fqon }
 */
export function* fetchOrgSet(action) {
  function getOrg() {
    return axios.get(action.fqon);
  }

  function getSubOrgs() {
    return axios.get(`${action.fqon}/orgs?expand=true`);
  }

  function getWorkspaces() {
    return axios.get(`${action.fqon}/workspaces?expand=true`);
  }

  try {
    const response = yield call(axios.all, [getOrg(), getSubOrgs(), getWorkspaces()]);
    const payload = {
      ...response[0].data,
      organizations: response[1].data,
      workspaces: response[2].data,
    };

    yield put({ type: types.FETCH_ORGSET_FULFILLED, payload });
  } catch (e) {
    yield put({ type: types.FETCH_ORGSET_REJECTED, payload: e.message });
  }
}

/**
 * fetchAllOrgsDropDown
 * @param {*} action - { fqon }
 */
export function* fetchAllOrgsDropDown(action) {
  function getOrg() {
    return axios.get(action.fqon);
  }

  function getSubOrgs() {
    return axios.get(`${action.fqon}/orgs?expand=true`);
  }

  try {
    const response = yield call(axios.all, [getOrg(), getSubOrgs()]);

    const payload = response[1].data.map(item => ({ name: item.name, value: item.properties.fqon }));
    payload.unshift({ name: response[0].data.name, value: response[0].data.properties.fqon });

    yield put({ type: types.FETCH_ALLORGS_DROPDOWN_FULFILLED, payload });
  } catch (e) {
    yield put({ type: types.FETCH_ALLORGS_DROPDOWN_REJECTED, payload: e.message });
  }
}

// Watchers
export default function* () {
  yield fork(takeLatest, types.FETCH_ALLORGS_REQUEST, fetchAllOrgs);
  yield fork(takeLatest, types.FETCH_ORGSET_REQUEST, fetchOrgSet);
  yield fork(takeLatest, types.FETCH_ALLORGS_DROPDOWN_REQUEST, fetchAllOrgsDropDown);
}

