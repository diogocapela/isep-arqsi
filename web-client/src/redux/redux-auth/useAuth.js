import { useContext, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { ReactReduxContext, useSelector } from 'react-redux';
import get from 'lodash/get';

import { register, login, logout, getUser } from './actions';

function useAuth() {
  const {
    store: { dispatch },
  } = useContext(ReactReduxContext);

  const state = useSelector(state => state.auth);

  const actions = useMemo(
    () =>
      bindActionCreators(
        {
          register,
          login,
          logout,
          getUser,
        },
        dispatch
      ),
    [dispatch]
  );

  return {
    ...actions,
    state,
    isAuthenticated: !!state.profile.result,
    isAdmin: get(state, 'profile.result.role') === 'admin',
    isGestor: get(state, 'profile.result.role') === 'gestor',
    isClient: get(state, 'profile.result.role') === 'client',
    profile: state.profile.result,
    isLoading: state.profile.isLoading,
    error: state.profile.error,
  };
}

export default useAuth;
