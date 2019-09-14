import axios from 'axios';
import get from 'lodash/get';

import { FACTORY_API } from 'config/endpoints';

import * as actionTypes from './actionTypes';

export const loadOperations = () => async (dispatch, getState) => {
  const state = getState();

  const shouldFetch = state.operations.shouldFetch;

  if (!shouldFetch) return;

  dispatch({
    type: actionTypes.LOAD_OPERATIONS_START,
  });

  try {
    const res = await axios({
      method: 'get',
      url: `${FACTORY_API}/operations`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
    });

    dispatch({
      type: actionTypes.LOAD_OPERATIONS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOAD_OPERATIONS_ERROR,
      payload: error,
    });
  }
};

export const addOperation = body => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.ADD_OPERATION_START,
  });

  try {
    const res = await axios({
      method: 'post',
      url: `${FACTORY_API}/operations`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
      data: body,
    });

    dispatch({
      type: actionTypes.ADD_OPERATION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_OPERATION_ERROR,
      payload: error,
    });
  }
};

export const updateOperation = (id, body) => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.UPDATE_OPERATION_START,
  });

  try {
    const res = await axios({
      method: 'put',
      url: `${FACTORY_API}/operations/${id}`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
      data: body,
    });

    dispatch({
      type: actionTypes.UPDATE_OPERATION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_OPERATION_ERROR,
      payload: error,
    });
  }
};

export const deleteOperation = id => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.DELETE_OPERATION_START,
  });

  try {
    const res = await axios({
      method: 'delete',
      url: `${FACTORY_API}/operations/${id}`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
    });

    dispatch({
      type: actionTypes.DELETE_OPERATION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_OPERATION_ERROR,
      payload: error,
    });
  }
};
