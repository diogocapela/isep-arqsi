import axios from 'axios';
import get from 'lodash/get';

import { ORDER_MANAGEMENT } from 'config/endpoints';

import * as actionTypes from './actionTypes';

export const loadUsers = () => async (dispatch, getState) => {
  const state = getState();

  const shouldFetch = state.users.shouldFetch;

  if (!shouldFetch) return;

  dispatch({
    type: actionTypes.LOAD_USERS_START,
  });

  try {
    const res = await axios({
      method: 'get',
      url: `${ORDER_MANAGEMENT}/users`,
      headers: { Authorization: get(state, 'auth.profile.result.token') },
    });

    dispatch({
      type: actionTypes.LOAD_USERS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOAD_USERS_ERROR,
      payload: error,
    });
  }
};
