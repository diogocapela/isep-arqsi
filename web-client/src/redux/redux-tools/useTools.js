import { useContext, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { ReactReduxContext, useSelector } from 'react-redux';

import { loadTools, addTool, updateTool, deleteTool } from './actions';

export default () => {
  const {
    store: { dispatch },
  } = useContext(ReactReduxContext);

  const tools = useSelector(state => state.tools);

  const actions = useMemo(
    () =>
      bindActionCreators(
        {
          loadTools,
          addTool,
          updateTool,
          deleteTool,
        },
        dispatch
      ),
    [dispatch]
  );

  return {
    ...actions,
    getTool: id => tools.result[id],
    tools: tools.result,
    isLoading: tools.isLoading,
    error: tools.error,
  };
};
