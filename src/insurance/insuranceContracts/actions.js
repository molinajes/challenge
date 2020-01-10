import * as types from './types';
import { actionTypes as resourceActions } from 'redux-resource';

export const find = (id) => ({
  type: types.FIND,
  payload: { id },
});

export const fetchFiltered = (params) => ({
  type: types.FETCH_FILTERED,
  payload: { params },
});

export const activateAttInsurance = (id, subId) => ({
  type: types.ACTIVATE_ATT_INSURANCE,
  payload: { id, subId }
});

export const activateSprintInsurance = (id, subId) => ({
  type: types.ACTIVATE_SPRINT_INSURANCE,
  payload: { id, subId }
});

