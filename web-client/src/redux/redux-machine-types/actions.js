import axios from 'axios';
import get from 'lodash/get';

import { FACTORY_API } from 'config/endpoints';

import * as actionTypes from './actionTypes';

export const loadMachineTypes = () => async (dispatch, getState) => {
  const state = getState();

  const shouldFetch = state.machineTypes.shouldFetch;

  if (!shouldFetch) return;

  dispatch({
    type: actionTypes.LOAD_MACHINE_TYPES_START,
  });

  try {
    const res = await axios({
      method: 'get',
      url: `${FACTORY_API}/machine-types`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
    });

    dispatch({
      type: actionTypes.LOAD_MACHINE_TYPES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOAD_MACHINE_TYPES_ERROR,
      payload: error,
    });
  }
};

export const addMachineType = body => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.ADD_MACHINE_TYPE_START,
  });

  try {
    const res = await axios({
      method: 'post',
      url: `${FACTORY_API}/machine-types`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
      data: body,
    });

    dispatch({
      type: actionTypes.ADD_MACHINE_TYPE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_MACHINE_TYPE_ERROR,
      payload: error,
    });
  }
};

export const updateMachineType = (id, body) => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.UPDATE_MACHINE_TYPE_START,
  });

  try {
    const res = await axios({
      method: 'put',
      url: `${FACTORY_API}/machine-types/${id}`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
      data: body,
    });

    dispatch({
      type: actionTypes.UPDATE_MACHINE_TYPE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_MACHINE_TYPE_ERROR,
      payload: error,
    });
  }
};

export const deleteMachineType = id => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.DELETE_MACHINE_TYPE_START,
  });

  try {
    const res = await axios({
      method: 'delete',
      url: `${FACTORY_API}/machine-types/${id}`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
    });

    dispatch({
      type: actionTypes.DELETE_MACHINE_TYPE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_MACHINE_TYPE_ERROR,
      payload: error,
    });
  }
};
