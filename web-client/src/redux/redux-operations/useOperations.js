import { useContext, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { ReactReduxContext, useSelector } from 'react-redux';

import { loadOperations, addOperation, updateOperation, deleteOperation } from './actions';

export default () => {
  const {
    store: { dispatch },
  } = useContext(ReactReduxContext);

  const operations = useSelector(state => state.operations);

  const actions = useMemo(
    () =>
      bindActionCreators(
        {
          loadOperations,
          addOperation,
          updateOperation,
          deleteOperation,
        },
        dispatch
      ),
    [dispatch]
  );

  return {
    ...actions,
    getOperation: id => operations.result[id],
    operations: operations.result,
    isLoading: operations.isLoading,
    error: operations.error,
  };
};
