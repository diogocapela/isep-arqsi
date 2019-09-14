import { useContext, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { ReactReduxContext, useSelector } from 'react-redux';

import {
  loadProductionLines,
  addProductionLine,
  updateProductionLine,
  deleteProductionLine,
} from './actions';

export default () => {
  const {
    store: { dispatch },
  } = useContext(ReactReduxContext);

  const productionLines = useSelector(state => state.productionLines);

  const actions = useMemo(
    () =>
      bindActionCreators(
        {
          loadProductionLines,
          addProductionLine,
          updateProductionLine,
          deleteProductionLine,
        },
        dispatch
      ),
    [dispatch]
  );

  return {
    ...actions,
    getProductionLine: id => productionLines.result[id],
    productionLines: productionLines.result,
    isLoading: productionLines.isLoading,
    error: productionLines.error,
  };
};
