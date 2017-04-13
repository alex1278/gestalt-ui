import { takeLatest, put, call, fork } from 'redux-saga/effects';
import axios from 'axios';
import { merge } from 'lodash';
import * as types from '../actionTypes';

/**
 * fetchLambdas
 * @param {*} action { fqon, environmentId }
 */
export function* fetchLambdas(action) {
  try {
    const url = action.environmentId ? `${action.fqon}/environments/${action.environmentId}/lambdas` : `${action.fqon}/lambdas`;
    const lambdasResponse = yield call(axios.get, `${url}?expand=true`);

    const lambdas = [];
    // this is a niche case with generators and arrays where we need an imperative loop to collate public_url and transform lambdas/endpoints
    // eslint-disable-next-line
    for (const lambda of lambdasResponse.data) {
      const apiEndpoints = [];
      const apieEndpointsResponse = yield call(axios.get, `${action.fqon}/lambdas/${lambda.id}/apiendpoints?expand=true`);
      // eslint-disable-next-line
      for (const endpoint of apieEndpointsResponse.data) {
        const kongProviderResponse = yield call(axios.get, `${action.fqon}/providers/${endpoint.properties.location_id}`);
        apiEndpoints.push(merge(endpoint, { properties: { public_url: `https://${kongProviderResponse.data.properties.config.env.public.PUBLIC_URL_VHOST_0}/${endpoint.properties.parent.name}${endpoint.properties.resource}` } }));
      }
      lambdas.push(merge(lambda, { properties: { apiEndpoints } }));
    }

    yield put({ type: types.FETCH_LAMBDAS_FULFILLED, payload: lambdas });
  } catch (e) {
    yield put({ type: types.FETCH_LAMBDAS_REJECTED, payload: e.message });
  }
}

/**
 * fetchLambda
 * @param {*} action { fqon, lambdaId, environmentId }
 */
export function* fetchLambda(action) {
  function getLambda() {
    return axios.get(`${action.fqon}/lambdas/${action.lambdaId}`);
  }

  function getEnv() {
    return axios.get(`${action.fqon}/environments/${action.environmentId}/env`);
  }

  try {
    const response = yield call(axios.all, [getLambda(), getEnv()]);
    const payload = { ...response[0].data };
    payload.properties.env = Object.assign(payload.properties.env, response[1].data);

    yield put({ type: types.FETCH_LAMBDA_FULFILLED, payload });
  } catch (e) {
    yield put({ type: types.FETCH_LAMBDA_REJECTED, payload: e.message });
  }
}

/**
 * createLambda
 * @param {*} action - { fqon, environmentId, payload, onSuccess {returns response.data} }
 */
export function* createLambda(action) {
  try {
    const response = yield call(axios.post, `${action.fqon}/environments/${action.environmentId}/lambdas`, action.payload);
    yield put({ type: types.CREATE_LAMBDA_FULFILLED, payload: response.data });

    if (typeof action.onSuccess === 'function') {
      action.onSuccess(response.data);
    }
  } catch (e) {
    yield put({ type: types.CREATE_LAMBDA_REJECTED, payload: e.message });
  }
}

/**
 * updateLambda
 * @param {*} action - { fqon, lambdaId, payload, onSuccess {returns response.data}  }
 */
export function* updateLambda(action) {
  try {
    const response = yield call(axios.patch, `${action.fqon}/lambdas/${action.lambdaId}`, action.payload);
    yield put({ type: types.UPDATE_LAMBDA_FULFILLED, payload: response.data });

    if (typeof action.onSuccess === 'function') {
      action.onSuccess(response.data);
    }
  } catch (e) {
    yield put({ type: types.UPDATE_LAMBDA_REJECTED, payload: e.message });
  }
}

/**
 * deleteLambda
 * @param {*} action - { fqon, lambdaId, onSuccess }
 */
export function* deleteLambda(action) {
  try {
    yield call(axios.delete, `${action.fqon}/lambdas/${action.lambdaId}?force=true`);
    yield put({ type: types.DELETE_LAMBDA_FULFILLED });

    if (typeof action.onSuccess === 'function') {
      action.onSuccess();
    }
  } catch (e) {
    yield put({ type: types.DELETE_LAMBDA_REJECTED, payload: e.message });
  }
}

/**
 * deleteLambdas
 * @param {*} action - { fqon, lambdaIds, onSuccess }
 */
export function* deleteLambdas(action) {
  try {
    const all = action.lambdaIds.map(id => axios.delete(`${action.fqon}/lambdas/${id}?force=true`));

    yield call(axios.all, all);
    yield put({ type: types.DELETE_LAMBDA_FULFILLED });

    if (typeof action.onSuccess === 'function') {
      action.onSuccess();
    }
  } catch (e) {
    yield put({ type: types.DELETE_LAMBDA_REJECTED, payload: e.message });
  }
}

/**
 * fetchLambdaProvider
 * @param {*} action - { fqon, lambdaId }
 */
export function* fetchLambdaProvider(action) {
  try {
    const response = yield call(axios.get, `${action.fqon}/lambdas/${action.lambdaId}`);
    const providerResponse = yield call(axios.get, `${action.fqon}/providers/${response.data.properties.provider.id}`);

    yield put({ type: types.FETCH_LAMBDA_PROVIDER_FULFILLED, payload: providerResponse.data });
  } catch (e) {
    yield put({ type: types.FETCH_LAMBDA_PROVIDER_REJECTED, payload: e.message });
  }
}

// Watchers
export default function* () {
  yield fork(takeLatest, types.FETCH_LAMBDAS_REQUEST, fetchLambdas);
  yield fork(takeLatest, types.FETCH_LAMBDA_REQUEST, fetchLambda);
  yield fork(takeLatest, types.CREATE_LAMBDA_REQUEST, createLambda);
  yield fork(takeLatest, types.UPDATE_LAMBDA_REQUEST, updateLambda);
  yield fork(takeLatest, types.DELETE_LAMBDA_REQUEST, deleteLambda);
  yield fork(takeLatest, types.DELETE_LAMBDAS_REQUEST, deleteLambdas);
  yield fork(takeLatest, types.FETCH_LAMBDA_PROVIDER_REQUEST, fetchLambdaProvider);
}