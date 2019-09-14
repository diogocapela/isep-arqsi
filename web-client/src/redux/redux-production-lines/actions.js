import axios from 'axios';
import get from 'lodash/get';

import { FACTORY_API } from 'config/endpoints';

import * as actionTypes from './actionTypes';

export const loadProductionLines = () => async (dispatch, getState) => {
  const state = getState();

  const shouldFetch = state.productionLines.shouldFetch;

  if (!shouldFetch) return;

  dispatch({
    type: actionTypes.LOAD_PRODUCTION_LINES_START,
  });

  try {
    const res = await axios({
      method: 'get',
      url: `${FACTORY_API}/production-lines`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
    });

    dispatch({
      type: actionTypes.LOAD_PRODUCTION_LINES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOAD_PRODUCTION_LINES_ERROR,
      payload: error,
    });
  }
};

export const addProductionLine = body => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.ADD_PRODUCTION_LINE_START,
  });

  try {
    const res = await axios({
      method: 'post',
      url: `${FACTORY_API}/production-lines`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
      data: body,
    });

    dispatch({
      type: actionTypes.ADD_PRODUCTION_LINE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_PRODUCTION_LINE_ERROR,
      payload: error,
    });
  }
};

export const updateProductionLine = (id, body) => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.UPDATE_PRODUCTION_LINE_START,
  });

  try {
    const res = await axios({
      method: 'put',
      url: `${FACTORY_API}/production-lines/${id}`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
      data: body,
    });

    dispatch({
      type: actionTypes.UPDATE_PRODUCTION_LINE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_PRODUCTION_LINE_ERROR,
      payload: error,
    });
  }
};

export const deleteProductionLine = id => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.DELETE_PRODUCTION_LINE_START,
  });

  try {
    const res = await axios({
      method: 'delete',
      url: `${FACTORY_API}/production-lines/${id}`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
    });

    dispatch({
      type: actionTypes.DELETE_PRODUCTION_LINE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_PRODUCTION_LINE_ERROR,
      payload: error,
    });
  }
};
