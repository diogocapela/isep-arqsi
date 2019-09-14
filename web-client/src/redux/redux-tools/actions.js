import axios from 'axios';
import get from 'lodash/get';

import { FACTORY_API } from 'config/endpoints';

import * as actionTypes from './actionTypes';

export const loadTools = () => async (dispatch, getState) => {
  const state = getState();

  const shouldFetch = state.tools.shouldFetch;

  if (!shouldFetch) return;

  dispatch({
    type: actionTypes.LOAD_TOOLS_START,
  });

  try {
    const res = await axios({
      method: 'get',
      url: `${FACTORY_API}/tools`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
    });

    dispatch({
      type: actionTypes.LOAD_TOOLS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOAD_TOOLS_ERROR,
      payload: error,
    });
  }
};

export const addTool = body => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.ADD_TOOL_START,
  });

  try {
    const res = await axios({
      method: 'post',
      url: `${FACTORY_API}/tools`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
      data: {
        tool: body.name,
        ...body,
      },
    });

    dispatch({
      type: actionTypes.ADD_TOOL_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_TOOL_ERROR,
      payload: error,
    });
  }
};

export const updateTool = (id, body) => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.UPDATE_TOOL_START,
  });

  try {
    const res = await axios({
      method: 'put',
      url: `${FACTORY_API}/tools/${id}`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
      data: {
        tool: body.name,
        ...body,
      },
    });

    dispatch({
      type: actionTypes.UPDATE_TOOL_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_TOOL_ERROR,
      payload: error,
    });
  }
};

export const deleteTool = id => async (dispatch, getState) => {
  const state = getState();

  dispatch({
    type: actionTypes.DELETE_TOOL_START,
  });

  try {
    const res = await axios({
      method: 'delete',
      url: `${FACTORY_API}/tools/${id}`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
    });

    dispatch({
      type: actionTypes.DELETE_TOOL_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_TOOL_ERROR,
      payload: error,
    });
  }
};
