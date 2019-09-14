import * as actionTypes from './actionTypes';

const initialState = {
  result: {},
  isLoading: false,
  error: null,
  shouldFetch: true,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOAD_TOOLS_START:
      return {
        ...state,
        isLoading: true,
        error: null,
        shouldFetch: true,
      };
    case actionTypes.LOAD_TOOLS_SUCCESS:
      return {
        ...state,
        result: (action.payload || []).reduce(
          (acc, item) => ({ ...acc, [item.tool]: { id: item.tool, name: item.tool, ...item } }),
          {}
        ),
        isLoading: false,
        error: null,
        shouldFetch: false,
      };
    case actionTypes.LOAD_TOOLS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        shouldFetch: true,
      };
    case actionTypes.ADD_TOOL_SUCCESS:
    case actionTypes.UPDATE_TOOL_SUCCESS:
    case actionTypes.DELETE_TOOL_SUCCESS:
      return {
        ...state,
        shouldFetch: true,
      };
    default:
      return state;
  }
};
