import { put, call, takeLatest, takeEvery, all } from 'redux-saga/effects';
import * as types from './types';
import * as api from './api';
import * as actions from './actions';
import { setInsuredDevice } from 'insurance/insuranceContracts/actions';

import {createGenerator, findGenerator, getAllGenerator, updateGenerator} from 'helpers/resourceSagas';

export const find = findGenerator({
  resourceType: 'insuredDevices',
  endpoint: api.find
});

export const fetchFiltered = getAllGenerator({
  resourceType: 'insuredDevices',
  endpoint: api.fetchFiltered,
  endpointArgs: (payload) => [ payload.params ],
});

export function* watchFind() {
  yield takeEvery(types.FIND, find);
}

export function* watchFetchFiltered() {
  yield takeLatest(types.FETCH_FILTERED, fetchFiltered);
}

export const createDeviceInsurance = createGenerator({
  resourceType: 'insuredDevices',
  endpoint: api.create,
  endpointArgs: (payload) => [{
    contract: payload.contract,
    device_specs: payload.sku,
    plan_type: payload.insPlanId
  }]
});

export function* watchDeviceCreateRequest() {
  yield takeLatest(types.CREATE, createDeviceInsurance)
}


export function* watchInsuredDevices() {
  yield all([
    call(watchFind),
    call(watchFetchFiltered),
    call(watchDeviceCreateRequest)
  ]);
}
