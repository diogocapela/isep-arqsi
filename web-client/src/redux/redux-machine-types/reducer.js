import * as actionTypes from './actionTypes';

const initialState = {
  result: {},
  isLoading: false,
  error: null,
  shouldFetch: true,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOAD_MACHINE_TYPES_START:
      return {
        ...state,
        isLoading: true,
        error: null,
        shouldFetch: true,
      };
    case actionTypes.LOAD_MACHINE_TYPES_SUCCESS:
      return {
        ...state,
        result: (action.payload || []).reduce((acc, item) => ({ ...acc, [item.id]: item }), {}),
        isLoading: false,
        error: null,
        shouldFetch: false,
      };
    case actionTypes.LOAD_MACHINE_TYPES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        shouldFetch: true,
      };
    case actionTypes.ADD_MACHINE_TYPE_SUCCESS:
    case actionTypes.UPDATE_MACHINE_TYPE_SUCCESS:
    case actionTypes.DELETE_MACHINE_TYPE_SUCCESS:
      return {
        ...state,
        shouldFetch: true,
      };
    default:
      return state;
  }
};
