import { useContext, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { ReactReduxContext, useSelector } from 'react-redux';

import { loadMachineTypes, addMachineType, updateMachineType, deleteMachineType } from './actions';

export default () => {
  const {
    store: { dispatch },
  } = useContext(ReactReduxContext);

  const machineTypes = useSelector(state => state.machineTypes);

  const actions = useMemo(
    () =>
      bindActionCreators(
        {
          loadMachineTypes,
          addMachineType,
          updateMachineType,
          deleteMachineType,
        },
        dispatch
      ),
    [dispatch]
  );

  return {
    ...actions,
    getMachineType: id => machineTypes.result[id],
    machineTypes: machineTypes.result,
    isLoading: machineTypes.isLoading,
    error: machineTypes.error,
  };
};
