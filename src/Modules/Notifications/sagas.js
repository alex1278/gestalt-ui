import { delay } from 'redux-saga';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  ADD_NOTIFICATION,
  // SHOW_NOTIFICATION,
  CLEAR_OLDEST_MESSAGE,
} from './actionTypes';

const TIMEOUT = 4000;

export function* showFlashMessage() {
  yield call(delay, TIMEOUT);
  yield put({ type: CLEAR_OLDEST_MESSAGE });
}

export function* onaddNotificationMessage() {
  const { queue } = yield select(state => state.notifications);

  // empty whats in the queue first
  if (queue.length > 0) {
    while (true) {
      const queueInner = yield select(state => state.notifications.queue);
      if (queueInner.length === 0) {
        break;
      }

      yield showFlashMessage();
    }
  }

  yield showFlashMessage();
}

// Watchers
export default function* () {
  yield takeLatest(ADD_NOTIFICATION, onaddNotificationMessage);
}
