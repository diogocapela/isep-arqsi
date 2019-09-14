import * as actionTypes from './actionTypes';

const initialState = {
  result: undefined,
  isLoading: false,
  error: null,
  shouldFetch: true,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOAD_PRODUCTS_START:
      return {
        ...state,
        isLoading: true,
        error: null,
        shouldFetch: true,
      };
    case actionTypes.LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        result: (action.payload || []).reduce((acc, item) => ({ ...acc, [item.id]: item }), {}),
        isLoading: false,
        error: null,
        shouldFetch: false,
      };
    case actionTypes.LOAD_PRODUCTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        shouldFetch: true,
      };
    case actionTypes.ADD_PRODUCT_SUCCESS:
    case actionTypes.UPDATE_PRODUCT_SUCCESS:
    case actionTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        shouldFetch: true,
      };
    default:
      return state;
  }
};
