import { call, all, takeLatest } from 'redux-saga/effects';
import { createGenerator } from 'helpers/resourceSagas';
import { CREATE_ATT_PURCHASE, CREATE_SPRINT_PURCHASE } from './types';
import { create as contractCreate } from 'insurance/insuranceContracts/api';

export const createAttContract = createGenerator({
  resourceType: 'insuranceContracts',
  endpoint: contractCreate,
  endpointArgs: (payload) => [{ att_subscription: payload.subId }]
});

export const createSprintContract = createGenerator({
  resourceType: 'insuranceContracts',
  endpoint: contractCreate,
  endpointArgs: (payload) => [{ subscription: payload.subId }]
});

export function* watchCreateAttInsurance() {
  yield takeLatest(CREATE_ATT_PURCHASE, createAttContract);
}

export function* watchCreateSprintInsurance() {
  yield takeLatest(CREATE_SPRINT_PURCHASE, createSprintContract);
}

export function* watchInsurance() {
  yield all([
    call(watchCreateAttInsurance),
    call(watchCreateSprintInsurance),
  ]);
}
