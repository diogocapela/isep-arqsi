import axios from 'axios';
import get from 'lodash/get';

import { ORDER_MANAGEMENT } from 'config/endpoints';

import * as actionTypes from './actionTypes';

export const loadPermissions = () => async (dispatch, getState) => {
  const state = getState();

  const shouldFetch = state.permissions.shouldFetch;

  if (!shouldFetch) return;

  dispatch({
    type: actionTypes.LOAD_PERMISSIONS_START,
  });

  try {
    const res = await axios({
      method: 'get',
      url: `${ORDER_MANAGEMENT}/permissions`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
    });

    dispatch({
      type: actionTypes.LOAD_PERMISSIONS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOAD_PERMISSIONS_ERROR,
      payload: error,
    });
  }
};

export const addPermission = body => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.ADD_PERMISSION_START,
  });

  try {
    const res = await axios({
      method: 'post',
      url: `${ORDER_MANAGEMENT}/permissions`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
      data: body,
    });

    dispatch({
      type: actionTypes.ADD_PERMISSION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_PERMISSION_ERROR,
      payload: error,
    });
  }
};

export const updatePermission = (role, body) => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.UPDATE_PERMISSION_START,
  });

  try {
    const res = await axios({
      method: 'put',
      url: `${ORDER_MANAGEMENT}/permissions/${role}`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
      data: body,
    });

    dispatch({
      type: actionTypes.UPDATE_PERMISSION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_PERMISSION_ERROR,
      payload: error,
    });
  }
};
