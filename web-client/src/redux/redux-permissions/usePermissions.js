import { useContext, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { ReactReduxContext, useSelector } from 'react-redux';
import get from 'lodash/get';

import { loadPermissions, addPermission, updatePermission } from './actions';

export default () => {
  const {
    store: { dispatch },
  } = useContext(ReactReduxContext);

  const permissions = useSelector(state => get(state, 'permissions.result')) || {};
  const isLoading = useSelector(state => get(state, 'permissions.isLoading'));
  const error = useSelector(state => get(state, 'permissions.error'));
  const currentUserRole = useSelector(state => get(state, 'auth.profile.result.role'));
  const currentUserPermissions = permissions[currentUserRole] || {};

  const actions = useMemo(
    () =>
      bindActionCreators(
        {
          loadPermissions,
          addPermission,
          updatePermission,
        },
        dispatch
      ),
    [dispatch]
  );

  return {
    ...actions,
    permissions,
    isLoading,
    error,
    canViewOrders: currentUserPermissions.orders,
    canViewFactory: currentUserPermissions.factory,
    canViewProduction: currentUserPermissions.production,
    canViewVisualization: currentUserPermissions.visualization,
    canViewProfile: currentUserPermissions.profile,
  };
};
