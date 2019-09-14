import { useContext, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { ReactReduxContext, useSelector } from 'react-redux';

import { loadOrders, addOrder, updateOrder, cancelOrder } from './actions';

export default () => {
  const {
    store: { dispatch },
  } = useContext(ReactReduxContext);

  const orders = useSelector(state => state.orders);

  const actions = useMemo(
    () =>
      bindActionCreators(
        {
          loadOrders,
          addOrder,
          updateOrder,
          cancelOrder,
        },
        dispatch
      ),
    [dispatch]
  );

  return {
    ...actions,
    getOrder: id => orders.result[id],
    orders: orders.result || [],
    isLoading: orders.isLoading,
    error: orders.error,
  };
};
