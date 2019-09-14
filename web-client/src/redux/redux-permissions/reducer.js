import * as actionTypes from './actionTypes';

const initialState = {
  result: undefined,
  isLoading: false,
  error: null,
  shouldFetch: true,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOAD_PERMISSIONS_START:
      return {
        ...state,
        isLoading: true,
        error: null,
        shouldFetch: true,
      };
    case actionTypes.LOAD_PERMISSIONS_SUCCESS:
      return {
        ...state,
        result: (action.payload.data || []).reduce((acc, item) => {
          return {
            ...acc,
            [item.role]: item,
          };
        }, {}),
        isLoading: false,
        error: null,
        shouldFetch: false,
      };
    case actionTypes.LOAD_PERMISSIONS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        shouldFetch: true,
      };
    case actionTypes.UPDATE_PERMISSION_START:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.ADD_PERMISSION_SUCCESS:
    case actionTypes.UPDATE_PERMISSION_SUCCESS:
      return {
        ...state,
        shouldFetch: true,
        isLoading: false,
      };
    default:
      return state;
  }
};
