import axios from 'axios';
import get from 'lodash/get';

import { FACTORY_API } from 'config/endpoints';

import * as actionTypes from './actionTypes';

export const loadMachines = () => async (dispatch, getState) => {
  const state = getState();

  const shouldFetch = state.machines.shouldFetch;

  if (!shouldFetch) return;

  dispatch({
    type: actionTypes.LOAD_MACHINES_START,
  });

  try {
    const res = await axios({
      method: 'get',
      url: `${FACTORY_API}/machines`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
    });

    dispatch({
      type: actionTypes.LOAD_MACHINES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOAD_MACHINES_ERROR,
      payload: error,
    });
  }
};

export const addMachine = body => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.ADD_MACHINE_START,
  });

  try {
    const res = await axios({
      method: 'post',
      url: `${FACTORY_API}/machines`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
      data: body,
    });

    dispatch({
      type: actionTypes.ADD_MACHINE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_MACHINE_ERROR,
      payload: error,
    });
  }
};

export const updateMachine = (id, body) => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.UPDATE_MACHINE_START,
  });

  try {
    const res = await axios({
      method: 'put',
      url: `${FACTORY_API}/machines/${id}`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
      data: body,
    });

    dispatch({
      type: actionTypes.UPDATE_MACHINE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_MACHINE_ERROR,
      payload: error,
    });
  }
};

export const deleteMachine = id => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.DELETE_MACHINE_START,
  });

  try {
    const res = await axios({
      method: 'delete',
      url: `${FACTORY_API}/machines/${id}`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
    });

    dispatch({
      type: actionTypes.DELETE_MACHINE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_MACHINE_ERROR,
      payload: error,
    });
  }
};
