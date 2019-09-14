import { useContext, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { ReactReduxContext, useSelector } from 'react-redux';

import { loadMachines, addMachine, updateMachine, deleteMachine } from './actions';

export default () => {
  const {
    store: { dispatch },
  } = useContext(ReactReduxContext);

  const machines = useSelector(state => state.machines);

  const actions = useMemo(
    () =>
      bindActionCreators(
        {
          loadMachines,
          addMachine,
          updateMachine,
          deleteMachine,
        },
        dispatch
      ),
    [dispatch]
  );

  return {
    ...actions,
    getMachine: id => machines.result[id],
    machines: machines.result,
    isLoading: machines.isLoading,
    error: machines.error,
  };
};
