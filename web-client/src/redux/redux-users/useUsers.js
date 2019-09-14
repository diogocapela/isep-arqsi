import { useContext, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { ReactReduxContext, useSelector } from 'react-redux';

import { loadUsers } from './actions';

export default () => {
  const {
    store: { dispatch },
  } = useContext(ReactReduxContext);

  const users = useSelector(state => state.users) || {};

  const actions = useMemo(
    () =>
      bindActionCreators(
        {
          loadUsers,
        },
        dispatch
      ),
    [dispatch]
  );

  return {
    ...actions,
    users: users.result,
    isLoading: users.isLoading,
    error: users.error,
  };
};
