import axios from 'axios';
import get from 'lodash/get';

import { PRODUCTION_API } from 'config/endpoints';

import * as actionTypes from './actionTypes';

export const loadProducts = () => async (dispatch, getState) => {
  const state = getState();

  const shouldFetch = state.products.shouldFetch;

  if (!shouldFetch) return;

  dispatch({
    type: actionTypes.LOAD_PRODUCTS_START,
  });

  try {
    const res = await axios({
      method: 'get',
      url: `${PRODUCTION_API}/products`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
    });

    dispatch({
      type: actionTypes.LOAD_PRODUCTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOAD_PRODUCTS_ERROR,
      payload: error,
    });
  }
};

export const addProduct = body => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.ADD_PRODUCT_START,
  });

  try {
    const res = await axios({
      method: 'post',
      url: `${PRODUCTION_API}/products`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
      data: body,
    });

    dispatch({
      type: actionTypes.ADD_PRODUCT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_PRODUCT_ERROR,
      payload: error,
    });
  }
};

export const updateProduct = (id, body) => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.UPDATE_PRODUCT_START,
  });

  try {
    const res = await axios({
      method: 'put',
      url: `${PRODUCTION_API}/products/${id}`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
      data: body,
    });

    dispatch({
      type: actionTypes.UPDATE_PRODUCT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_PRODUCT_ERROR,
      payload: error,
    });
  }
};

export const deleteProduct = id => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.DELETE_PRODUCT_START,
  });

  try {
    const res = await axios({
      method: 'delete',
      url: `${PRODUCTION_API}/products/${id}`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
    });

    dispatch({
      type: actionTypes.DELETE_PRODUCT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_PRODUCT_ERROR,
      payload: error,
    });
  }
};
