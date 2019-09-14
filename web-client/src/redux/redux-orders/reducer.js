import * as actionTypes from './actionTypes';

const initialState = {
  result: undefined,
  isLoading: false,
  error: null,
  shouldFetch: true,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOAD_ORDERS_START:
      return {
        ...state,
        isLoading: true,
        error: null,
        shouldFetch: true,
      };
    case actionTypes.LOAD_ORDERS_SUCCESS:
      return {
        ...state,
        result: action.payload.data,
        isLoading: false,
        error: null,
        shouldFetch: false,
      };
    case actionTypes.LOAD_ORDERS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        shouldFetch: true,
      };
    case actionTypes.ADD_ORDER_SUCCESS:
    case actionTypes.UPDATE_ORDER_SUCCESS:
    case actionTypes.CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        shouldFetch: true,
      };
    default:
      return state;
  }
};
