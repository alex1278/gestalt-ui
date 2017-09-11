import axios from 'axios';
import { call, put, fork, takeLatest } from 'redux-saga/effects';
import secretSagas, {
  fetchSecrets,
  fetchSecretsDropDown,
  fetchSecret,
  createSecret,
  updateSecret,
  deleteSecret,
  deleteSecrets,
} from './secrets';
import * as types from '../actionTypes';

describe('Secret Sagas', () => {
  const error = 'an error has occured';
  const secretMock = { id: 1, properties: { provider: {}, items: [] } };

  describe('fetchSecrets Sequence', () => {
    const saga = fetchSecrets({ fqon: 'iamfqon', environmentId: '1' });
    let result;

    it('should make an api call', () => {
      result = saga.next();
      expect(result.value).to.deep.equal(
        call(axios.get, 'iamfqon/environments/1/secrets?expand=true')
      );
    });

    it('should return a payload and dispatch a success status', () => {
      result = saga.next({ data: [secretMock] });
      expect(result.value).to.deep.equal(
        put({
          type: types.FETCH_SECRETS_FULFILLED,
          payload: [secretMock],
        })
      );
    });

    it('should return a payload and dispatch a reject status when there is an error', () => {
      const sagaError = fetchSecrets({ fqon: 'iamfqon' });
      let resultError = sagaError.next();

      resultError = sagaError.throw({ message: error });

      expect(resultError.value).to.deep.equal(
        put({ type: types.FETCH_SECRETS_REJECTED, payload: error })
      );
    });
  });

  describe('fetchSecretsDropDown Sequence', () => {
    describe('fetchSecretsDropDown when there are secrets', () => {
      const saga = fetchSecretsDropDown({ fqon: 'iamfqon', environmentId: '1' });
      let result;

      it('should make an api call', () => {
        result = saga.next();
        expect(result.value).to.deep.equal(
          call(axios.get, 'iamfqon/environments/1/secrets')
        );
      });

      it('should return a payload and dispatch a success status', () => {
        result = saga.next({ data: [{ id: 1 }] });
        expect(result.value).to.deep.equal(
          put({ type: types.FETCH_SECRETS_DROPDOWN_FULFILLED, payload: [{ id: 1 }] })
        );
      });

      it('should return a payload and dispatch a reject status when there is an error', () => {
        const sagaError = fetchSecretsDropDown({ fqon: 'iamfqon', environmentId: 1 });
        let resultError = sagaError.next();

        resultError = sagaError.throw({ message: error });

        expect(resultError.value).to.deep.equal(
          put({ type: types.FETCH_SECRETS_DROPDOWN_REJECTED, payload: error })
        );
      });
    });

    describe('fetchSecretsDropDown when there are NO providers', () => {
      const saga = fetchSecretsDropDown({ fqon: 'iamfqon', environmentId: 1 });
      let result;

      it('should make an api call', () => {
        result = saga.next();
        expect(result.value).to.deep.equal(
          call(axios.get, 'iamfqon/environments/1/secrets')
        );
      });

      it('should return a payload and dispatch a success status', () => {
        result = saga.next({ data: [] });
        expect(result.value).to.deep.equal(
          put({ type: types.FETCH_SECRETS_DROPDOWN_FULFILLED, payload: [{ id: '', name: 'No Available Secrets' }] })
        );
      });
    });
  });

  describe('fetchSecret Sequence', () => {
    const saga = fetchSecret({ fqon: 'iamfqon', secretId: 1 });
    let result;

    it('should make an api call', () => {
      result = saga.next();
      expect(result.value).to.deep.equal(
        call(axios.get, 'iamfqon/secrets/1')
      );
    });

    it('should return a payload and dispatch a success status', () => {
      result = saga.next({ data: secretMock });

      expect(result.value).to.deep.equal(
        put({ type: types.FETCH_SECRET_FULFILLED, payload: secretMock })
      );
    });

    it('should return a payload and dispatch a reject status when there is an error', () => {
      const sagaError = fetchSecret({ fqon: 'iamfqon' });
      let resultError = sagaError.next();

      resultError = sagaError.throw({ message: error });

      expect(resultError.value).to.deep.equal(
        put({ type: types.FETCH_SECRET_REJECTED, payload: error })
      );
    });
  });


  describe('createSecret Sequence', () => {
    const action = { fqon: 'iamfqon', environmentId: '1', payload: { name: 'iamnewsecret' } };
    const saga = createSecret(action);
    let result;

    it('should make an api call', () => {
      result = saga.next();
      expect(result.value).to.deep.equal(
        call(axios.post, 'iamfqon/environments/1/secrets', action.payload)
      );
    });

    it('should return a payload and dispatch a success status', () => {
      result = saga.next({ data: { id: 1 } });
      expect(result.value).to.deep.equal(
        put({ type: types.CREATE_SECRET_FULFILLED, payload: { id: 1 } })
      );
      // Finish the iteration
      result = saga.next();
    });

    it('should return a response when onSuccess callback is passed', () => {
      const onSuccessAction = { ...action, onSuccess: sinon.stub() };
      const sagaSuccess = createSecret(onSuccessAction);
      sagaSuccess.next();
      sagaSuccess.next({ data: { id: 1 } });
      sagaSuccess.next();
      expect(onSuccessAction.onSuccess).to.have.been.calledWith({ id: 1 });
    });

    it('should return a payload and dispatch a reject status when there is an error', () => {
      const sagaError = createSecret(action);
      let resultError = sagaError.next();
      resultError = sagaError.throw({ message: error });

      expect(resultError.value).to.deep.equal(
        put({ type: types.CREATE_SECRET_REJECTED, payload: error })
      );
    });
  });

  describe('updateSecret Sequence', () => {
    const action = { fqon: 'iamfqon', secretId: '1', payload: [] };
    const saga = updateSecret(action);
    let result;

    it('should make an api call to PATCH the secret', () => {
      result = saga.next();
      expect(result.value).to.deep.equal(
        call(axios.patch, 'iamfqon/secrets/1', action.payload)
      );
    });

    it('should return a payload and dispatch a success status', () => {
      result = saga.next({ data: secretMock });
      expect(result.value).to.deep.equal(
        put({ type: types.UPDATE_SECRET_FULFILLED, payload: secretMock })
      );

      // Finish the iteration
      result = saga.next();
    });

    it('should return a response when onSuccess callback is passed', () => {
      const onSuccessAction = { fqon: 'iamfqon', secretId: '1', environmentId: '2', payload: [], onSuccess: sinon.stub() };
      const sagaSuccess = updateSecret(onSuccessAction);
      sagaSuccess.next();
      sagaSuccess.next({ data: secretMock });
      sagaSuccess.next({ data: {} });
      sagaSuccess.next();
      expect(onSuccessAction.onSuccess).to.have.been.calledWith(secretMock);
    });

    it('should return a payload and dispatch a reject status when there is an error', () => {
      const sagaError = updateSecret(action);
      let resultError = sagaError.next();

      resultError = sagaError.throw({ message: error });
      expect(resultError.value).to.deep.equal(
        put({ type: types.UPDATE_SECRET_REJECTED, payload: error })
      );
    });
  });

  describe('deleteSecret Sequence', () => {
    const action = { fqon: 'iamfqon', secretId: '1' };
    const saga = deleteSecret(action);
    let result;

    it('should make an api call', () => {
      result = saga.next();
      expect(result.value).to.deep.equal(
        call(axios.delete, 'iamfqon/secrets/1')
      );
    });

    it('should return dispatch a success status', () => {
      result = saga.next();
      expect(result.value).to.deep.equal(
        put({ type: types.DELETE_SECRET_FULFILLED })
      );

      // Finish the iteration
      result = saga.next();
    });

    it('should return a response when onSuccess callback is passed', () => {
      const onSuccessAction = { ...action, onSuccess: sinon.stub() };
      const sagaSuccess = deleteSecret(onSuccessAction);
      sagaSuccess.next();
      sagaSuccess.next();
      sagaSuccess.next();
      // eslint-disable-next-line no-unused-expressions
      expect(onSuccessAction.onSuccess).to.have.been.called;
    });

    it('should dispatch a reject status when there is an error', () => {
      const sagaError = deleteSecret(action);
      let resultError = sagaError.next();
      resultError = sagaError.throw({ message: error });

      expect(resultError.value).to.deep.equal(
        put({ type: types.DELETE_SECRET_REJECTED, payload: error })
      );
    });
  });

  describe('deleteSecrets Sequence', () => {
    const action = { secretIds: ['1'], fqon: 'iamfqon' };
    const saga = deleteSecrets(action);
    let result;

    it('should make an api call', () => {
      result = saga.next();
      expect(result.value).to.deep.equal(
        call(axios.all, [axios.delete('iamfqon/secrets/1')])
      );
    });

    it('should return dispatch a success status', () => {
      result = saga.next();
      expect(result.value).to.deep.equal(
        put({ type: types.DELETE_SECRET_FULFILLED })
      );

      // Finish the iteration
      result = saga.next();
    });

    it('should return a response when onSuccess callback is passed', () => {
      const onSuccessAction = { ...action, onSuccess: sinon.stub() };
      const sagaSuccess = deleteSecrets(onSuccessAction);
      sagaSuccess.next();
      sagaSuccess.next();
      sagaSuccess.next();
      // eslint-disable-next-line no-unused-expressions
      expect(onSuccessAction.onSuccess).to.have.been.called;
    });

    it('should dispatch a reject status when there is an error', () => {
      const sagaError = deleteSecrets(action);
      let resultError = sagaError.next();
      resultError = sagaError.throw({ message: error });

      expect(resultError.value).to.deep.equal(
        put({ type: types.DELETE_SECRET_REJECTED, payload: error })
      );
    });
  });

  describe('secretSagas', () => {
    let result;
    const rootSaga = secretSagas();

    it('should fork a watcher for fetchSecrets', () => {
      result = rootSaga.next();
      expect(result.value).to.deep.equal(
        fork(takeLatest, types.FETCH_SECRETS_REQUEST, fetchSecrets)
      );
    });

    it('should fork a watcher for fetchSecretsDropDown', () => {
      result = rootSaga.next();
      expect(result.value).to.deep.equal(
        fork(takeLatest, types.FETCH_SECRETS_DROPDOWN_REQUEST, fetchSecretsDropDown)
      );
    });

    it('should fork a watcher for fetchSecret', () => {
      result = rootSaga.next();
      expect(result.value).to.deep.equal(
        fork(takeLatest, types.FETCH_SECRET_REQUEST, fetchSecret)
      );
    });

    it('should fork a watcher for createSecret', () => {
      result = rootSaga.next();
      expect(result.value).to.deep.equal(
        fork(takeLatest, types.CREATE_SECRET_REQUEST, createSecret)
      );
    });

    it('should fork a watcher for updateSecret', () => {
      result = rootSaga.next();
      expect(result.value).to.deep.equal(
        fork(takeLatest, types.UPDATE_SECRET_REQUEST, updateSecret)
      );
    });

    it('should fork a watcher for deleteSecret', () => {
      result = rootSaga.next();
      expect(result.value).to.deep.equal(
        fork(takeLatest, types.DELETE_SECRET_REQUEST, deleteSecret)
      );
    });

    it('should fork a watcher for deleteSecrets', () => {
      result = rootSaga.next();
      expect(result.value).to.deep.equal(
        fork(takeLatest, types.DELETE_SECRETS_REQUEST, deleteSecrets)
      );
    });
  });
});
