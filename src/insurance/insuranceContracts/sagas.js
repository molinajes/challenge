import { put, call, takeLatest, takeEvery, all } from 'redux-saga/effects';
import * as types from './types';
import * as api from './api';
import * as actions from './actions';
import { setInsuranceContract as setSprintContract } from 'subscriptions/sprint/actions';
import { setInsuranceContract as setAttContract } from 'subscriptions/att/actions';
import {info as infoNotificationAction} from 'notifications/actions';

import { findGenerator, getAllGenerator, updateGenerator } from 'helpers/resourceSagas';
import {attSubscription,sprintSubscription} from "app/routes";

export const find = findGenerator({
  resourceType: 'insuranceContracts',
  endpoint: api.find
});

export const fetchFiltered = getAllGenerator({
  resourceType: 'insuranceContracts',
  endpoint: api.fetchFiltered,
  endpointArgs: (payload) => [ payload.params ],
});

export function* insuranceAttActivate(action) {
  yield* updateGenerator({
    resourceType: 'insuranceContracts',
    endpoint: api.activate
  })(action);
  yield put(attSubscription(action.payload.subId));
  yield put(infoNotificationAction('general', 'Insurance Plan successfully created and activated'))
}

export function* insuranceSprintActivate(action) {
  yield* updateGenerator({
    resourceType: 'insuranceContracts',
    endpoint: api.activate
  })(action);
  yield put(sprintSubscription(action.payload.subId));
  yield put(infoNotificationAction('general', 'Insurance Plan successfully created and activated'))
}
export function* watchFind() {
  yield takeEvery(types.FIND, find);
}

export function* watchFetchFiltered() {
  yield takeLatest(types.FETCH_FILTERED, fetchFiltered);
}

export function* watchAttInsuranceActivate() {
  yield takeLatest(types.ACTIVATE_ATT_INSURANCE, insuranceAttActivate);
}

export function* watchSprintInsuranceActivate() {
  yield takeLatest(types.ACTIVATE_SPRINT_INSURANCE, insuranceSprintActivate);
}

export function* watchInsuranceContracts() {
  yield all([
    call(watchFind),
    call(watchFetchFiltered),
    call(watchAttInsuranceActivate),
    call(watchSprintInsuranceActivate)
  ]);
}
