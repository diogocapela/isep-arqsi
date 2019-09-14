import axios from 'axios';
import get from 'lodash/get';

import { PRODUCTION_API } from 'config/endpoints';

import * as actionTypes from './actionTypes';

export const loadManufacturingPlans = () => async (dispatch, getState) => {
  const state = getState();

  const shouldFetch = state.manufacturingPlans.shouldFetch;

  if (!shouldFetch) return;

  dispatch({
    type: actionTypes.LOAD_MANUFACTURING_PLANS_START,
  });

  try {
    const res = await axios({
      method: 'get',
      url: `${PRODUCTION_API}/manufacturingPlans`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
    });

    dispatch({
      type: actionTypes.LOAD_MANUFACTURING_PLANS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOAD_MANUFACTURING_PLANS_ERROR,
      payload: error,
    });
  }
};

export const addManufacturingPlan = body => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.ADD_MANUFACTURING_PLAN_START,
  });

  try {
    const res = await axios({
      method: 'post',
      url: `${PRODUCTION_API}/manufacturingPlans`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
      data: body,
    });

    dispatch({
      type: actionTypes.ADD_MANUFACTURING_PLAN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_MANUFACTURING_PLAN_ERROR,
      payload: error,
    });
  }
};

export const updateManufacturingPlan = (id, body) => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.UPDATE_MANUFACTURING_PLAN_START,
  });

  try {
    const res = await axios({
      method: 'put',
      url: `${PRODUCTION_API}/manufacturingPlans/${id}`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
      data: body,
    });

    dispatch({
      type: actionTypes.UPDATE_MANUFACTURING_PLAN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_MANUFACTURING_PLAN_ERROR,
      payload: error,
    });
  }
};

export const deleteManufacturingPlan = id => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.DELETE_MANUFACTURING_PLAN_START,
  });

  try {
    const res = await axios({
      method: 'delete',
      url: `${PRODUCTION_API}/manufacturingPlans/${id}`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
    });

    dispatch({
      type: actionTypes.DELETE_MANUFACTURING_PLAN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_MANUFACTURING_PLAN_ERROR,
      payload: error,
    });
  }
};
