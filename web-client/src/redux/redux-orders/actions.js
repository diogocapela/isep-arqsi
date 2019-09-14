import axios from 'axios';
import get from 'lodash/get';

import { ORDER_MANAGEMENT } from 'config/endpoints';

import * as actionTypes from './actionTypes';

export const loadOrders = () => async (dispatch, getState) => {
  const state = getState();

  const shouldFetch = state.orders.shouldFetch;

  if (!shouldFetch) return;

  dispatch({
    type: actionTypes.LOAD_ORDERS_START,
  });

  try {
    const res = await axios({
      method: 'get',
      url: `${ORDER_MANAGEMENT}/orders`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
    });

    dispatch({
      type: actionTypes.LOAD_ORDERS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOAD_ORDERS_ERROR,
      payload: error,
    });
  }
};

export const addOrder = body => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.ADD_ORDER_START,
  });

  try {
    const res = await axios({
      method: 'post',
      url: `${ORDER_MANAGEMENT}/orders`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
      data: body,
    });

    dispatch({
      type: actionTypes.ADD_ORDER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_ORDER_ERROR,
      payload: error,
    });
  }
};

export const updateOrder = (id, body) => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.UPDATE_ORDER_START,
  });

  try {
    const res = await axios({
      method: 'put',
      url: `${ORDER_MANAGEMENT}/orders/${id}`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
      data: body,
    });

    dispatch({
      type: actionTypes.UPDATE_ORDER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_ORDER_ERROR,
      payload: error,
    });
  }
};

export const cancelOrder = id => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.CANCEL_ORDER_START,
  });

  try {
    const res = await axios({
      method: 'post',
      url: `${ORDER_MANAGEMENT}/orders/cancel/${id}`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
    });

    dispatch({
      type: actionTypes.CANCEL_ORDER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.CANCEL_ORDER_ERROR,
      payload: error,
    });
  }
};
