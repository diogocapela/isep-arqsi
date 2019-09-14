import * as actionTypes from './actionTypes';

const initialState = {
  result: {},
  isLoading: false,
  error: null,
  shouldFetch: true,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOAD_USERS_START:
      return {
        ...state,
        isLoading: true,
        error: null,
        shouldFetch: true,
      };
    case actionTypes.LOAD_USERS_SUCCESS:
      return {
        ...state,
        result: action.payload,
        isLoading: false,
        error: null,
        shouldFetch: false,
      };
    case actionTypes.LOAD_USERS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        shouldFetch: true,
      };
    default:
      return state;
  }
};
