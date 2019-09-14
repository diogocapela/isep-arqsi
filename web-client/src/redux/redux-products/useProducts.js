import { useContext, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { ReactReduxContext, useSelector } from 'react-redux';

import { loadProducts, addProduct, updateProduct, deleteProduct } from './actions';

export default () => {
  const {
    store: { dispatch },
  } = useContext(ReactReduxContext);

  const products = useSelector(state => state.products);

  const actions = useMemo(
    () =>
      bindActionCreators(
        {
          loadProducts,
          addProduct,
          updateProduct,
          deleteProduct,
        },
        dispatch
      ),
    [dispatch]
  );

  return {
    ...actions,
    getProduct: id => products.result[id],
    products: products.result || {},
    isLoading: products.isLoading,
    error: products.error,
  };
};
