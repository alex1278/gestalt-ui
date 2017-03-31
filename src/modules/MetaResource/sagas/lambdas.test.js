import axios from 'axios';
import { call, put, fork, takeLatest } from 'redux-saga/effects';
import lambdaSagas, {
  fetchLambdas,
  fetchLambda,
  createLambda,
  updateLambda,
  deleteLambda,
  deleteLambdas,
} from './lambdas';
import * as types from '../actionTypes';

describe('Lambda Sagas', () => {
  const error = 'an error has occured';

  describe('fetchLambdas Sequence with an environmentId', () => {
    const saga = fetchLambdas({ fqon: 'iamfqon', environmentId: '1' });
    let result;

    it('should make an api call', () => {
      result = saga.next();
      expect(result.value).to.deep.equal(
        call(axios.get, 'iamfqon/environments/1/lambdas?expand=true')
      );
    });

    it('should return a payload and dispatch a success status', () => {
      result = saga.next({ data: [{ id: 1 }] });
      result = saga.next([{ data: [{ id: 1 }] }]);
      expect(result.value).to.deep.equal(
        put({ type: types.FETCH_LAMBDAS_FULFILLED, payload: [{ id: 1, properties: { apiEndpoints: [{ id: 1 }] } }] })
      );
    });

    it('should return a payload and dispatch a reject status when there is an error', () => {
      const sagaError = fetchLambdas({ fqon: 'iamfqon' });
      let resultError = sagaError.next();

      resultError = sagaError.throw({ message: error });

      expect(resultError.value).to.deep.equal(
        put({ type: types.FETCH_LAMBDAS_REJECTED, payload: error })
      );
    });
  });

  describe('fetchLambdas Sequence without an environmentId', () => {
    const saga = fetchLambdas({ fqon: 'iamfqon' });
    let result;

    it('should make an api call', () => {
      result = saga.next();
      expect(result.value).to.deep.equal(
        call(axios.get, 'iamfqon/lambdas?expand=true')
      );
    });

    it('should return a payload and dispatch a success status', () => {
      result = saga.next({ data: [{ id: 1 }] });
      result = saga.next([{ data: [{ id: 1 }] }]);
      expect(result.value).to.deep.equal(
        put({ type: types.FETCH_LAMBDAS_FULFILLED, payload: [{ id: 1, properties: { apiEndpoints: [{ id: 1 }] } }] })
      );
    });

    it('should return a payload and dispatch a reject status when there is an error', () => {
      const sagaError = fetchLambdas({ fqon: 'iamfqon' });
      let resultError = sagaError.next();

      resultError = sagaError.throw({ message: error });

      expect(resultError.value).to.deep.equal(
        put({ type: types.FETCH_LAMBDAS_REJECTED, payload: error })
      );
    });
  });

  describe('fetchLambda Sequence', () => {
    const saga = fetchLambda({ fqon: 'iamfqon', lambdaId: 1, environmentId: 2 });
    let result;

    it('should make an api call', () => {
      result = saga.next();
      expect(result.value).to.deep.equal(
        call(axios.all, [axios.get('iamfqon/lambdas/1'), axios.get('iamfqon/environments/2/env')])
      );
    });

    it('should return a payload and dispatch a success status', () => {
      const promiseArray = [{ data: { id: 1, properties: { env: {} } } }, { data: { test: 'testvar' } }];
      result = saga.next(promiseArray);

      expect(result.value).to.deep.equal(
        put({ type: types.FETCH_LAMBDA_FULFILLED, payload: { id: 1, properties: { env: { test: 'testvar' } } } })
      );
    });

    it('should return a payload and dispatch a reject status when there is an error', () => {
      const sagaError = fetchLambda({ fqon: 'iamfqon', environmentId: 1 });
      let resultError = sagaError.next();

      resultError = sagaError.throw({ message: error });

      expect(resultError.value).to.deep.equal(
        put({ type: types.FETCH_LAMBDA_REJECTED, payload: error })
      );
    });
  });

  describe('createLambda Sequence', () => {
    const action = { fqon: 'iamfqon', environmentId: '1', payload: { name: 'iamnewlambda' } };
    const saga = createLambda(action);
    let result;

    it('should make an api call', () => {
      result = saga.next();
      expect(result.value).to.deep.equal(
        call(axios.post, 'iamfqon/environments/1/lambdas', action.payload)
      );
    });

    it('should return a payload and dispatch a success status', () => {
      result = saga.next({ data: { id: 1 } });
      expect(result.value).to.deep.equal(
        put({ type: types.CREATE_LAMBDA_FULFILLED, payload: { id: 1 } })
      );
      // Finish the iteration
      result = saga.next();
    });

    it('should return a response when onSuccess callback is passed', () => {
      const onSuccessAction = { ...action, onSuccess: sinon.stub() };
      const sagaSuccess = createLambda(onSuccessAction);
      sagaSuccess.next();
      sagaSuccess.next({ data: { id: 1 } });
      sagaSuccess.next();
      expect(onSuccessAction.onSuccess).to.have.been.calledWith({ id: 1 });
    });

    it('should return a payload and dispatch a reject status when there is an error', () => {
      const sagaError = createLambda(action);
      let resultError = sagaError.next();
      resultError = sagaError.throw({ message: error });

      expect(resultError.value).to.deep.equal(
        put({ type: types.CREATE_LAMBDA_REJECTED, payload: error })
      );
    });
  });

  describe('updateLambda Sequence', () => {
    const action = { fqon: 'iamfqon', lambdaId: '1', payload: [] };
    const saga = updateLambda(action);
    let result;

    it('should make an api call', () => {
      result = saga.next();
      expect(result.value).to.deep.equal(
        call(axios.patch, 'iamfqon/lambdas/1', action.payload)
      );
    });

    it('should return a payload and dispatch a success status', () => {
      result = saga.next({ data: { id: 1 } });
      expect(result.value).to.deep.equal(
        put({ type: types.UPDATE_LAMBDA_FULFILLED, payload: { id: 1 } })
      );

      // Finish the iteration
      result = saga.next();
    });

    it('should return a response when onSuccess callback is passed', () => {
      const onSuccessAction = { fqon: 'iamfqon', environmentId: '1', payload: [], onSuccess: sinon.stub() };
      const sagaSuccess = updateLambda(onSuccessAction);
      sagaSuccess.next();
      sagaSuccess.next({ data: { id: 1 } });
      sagaSuccess.next();
      expect(onSuccessAction.onSuccess).to.have.been.calledWith({ id: 1 });
    });

    it('should return a payload and dispatch a reject status when there is an error', () => {
      const sagaError = updateLambda(action);
      let resultError = sagaError.next();

      resultError = sagaError.throw({ message: error });
      expect(resultError.value).to.deep.equal(
        put({ type: types.UPDATE_LAMBDA_REJECTED, payload: error })
      );
    });
  });

  describe('deleteLambda Sequence', () => {
    const action = { fqon: 'iamfqon', lambdaId: '1' };
    const saga = deleteLambda(action);
    let result;

    it('should make an api call', () => {
      result = saga.next();
      expect(result.value).to.deep.equal(
        call(axios.delete, 'iamfqon/lambdas/1?force=true')
      );
    });

    it('should return dispatch a success status', () => {
      result = saga.next();
      expect(result.value).to.deep.equal(
        put({ type: types.DELETE_LAMBDA_FULFILLED })
      );

      // Finish the iteration
      result = saga.next();
    });

    it('should return a response when onSuccess callback is passed', () => {
      const onSuccessAction = { ...action, onSuccess: sinon.stub() };
      const sagaSuccess = deleteLambda(onSuccessAction);
      sagaSuccess.next();
      sagaSuccess.next();
      sagaSuccess.next();
      // eslint-disable-next-line no-unused-expressions
      expect(onSuccessAction.onSuccess).to.have.been.called;
    });

    it('should dispatch a reject status when there is an error', () => {
      const sagaError = deleteLambda(action);
      let resultError = sagaError.next();
      resultError = sagaError.throw({ message: error });

      expect(resultError.value).to.deep.equal(
        put({ type: types.DELETE_LAMBDA_REJECTED, payload: error })
      );
    });
  });

  describe('deleteLambdas Sequence', () => {
    const action = { lambdaIds: ['1'], fqon: 'iamfqon' };
    const saga = deleteLambdas(action);
    let result;

    it('should make an api call', () => {
      result = saga.next();
      expect(result.value).to.deep.equal(
        call(axios.all, [axios.delete('iamfqon/lambdas/1?force=true')])
      );
    });

    it('should return dispatch a success status', () => {
      result = saga.next();
      expect(result.value).to.deep.equal(
        put({ type: types.DELETE_LAMBDA_FULFILLED })
      );

      // Finish the iteration
      result = saga.next();
    });

    it('should return a response when onSuccess callback is passed', () => {
      const onSuccessAction = { ...action, onSuccess: sinon.stub() };
      const sagaSuccess = deleteLambdas(onSuccessAction);
      sagaSuccess.next();
      sagaSuccess.next();
      sagaSuccess.next();
      // eslint-disable-next-line no-unused-expressions
      expect(onSuccessAction.onSuccess).to.have.been.called;
    });

    it('should dispatch a reject status when there is an error', () => {
      const sagaError = deleteLambdas(action);
      let resultError = sagaError.next();
      resultError = sagaError.throw({ message: error });

      expect(resultError.value).to.deep.equal(
        put({ type: types.DELETE_LAMBDA_REJECTED, payload: error })
      );
    });
  });

  describe('lambdaSagas', () => {
    let result;
    const rootSaga = lambdaSagas();

    it('should fork a watcher for fetchLambdas', () => {
      result = rootSaga.next();
      expect(result.value).to.deep.equal(
        fork(takeLatest, types.FETCH_LAMBDAS_REQUEST, fetchLambdas)
      );
    });

    it('should fork a watcher for fetchLambda', () => {
      result = rootSaga.next();
      expect(result.value).to.deep.equal(
        fork(takeLatest, types.FETCH_LAMBDA_REQUEST, fetchLambda)
      );
    });

    it('should fork a watcher for createLambda', () => {
      result = rootSaga.next();
      expect(result.value).to.deep.equal(
        fork(takeLatest, types.CREATE_LAMBDA_REQUEST, createLambda)
      );
    });

    it('should fork a watcher for updateLambda', () => {
      result = rootSaga.next();
      expect(result.value).to.deep.equal(
        fork(takeLatest, types.UPDATE_LAMBDA_REQUEST, updateLambda)
      );
    });

    it('should fork a watcher for deleteLambda', () => {
      result = rootSaga.next();
      expect(result.value).to.deep.equal(
        fork(takeLatest, types.DELETE_LAMBDA_REQUEST, deleteLambda)
      );
    });

    it('should fork a watcher for deleteLambdas', () => {
      result = rootSaga.next();
      expect(result.value).to.deep.equal(
        fork(takeLatest, types.DELETE_LAMBDAS_REQUEST, deleteLambdas)
      );
    });
  });
});
