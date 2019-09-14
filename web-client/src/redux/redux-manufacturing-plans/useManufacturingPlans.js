import { useContext, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { ReactReduxContext, useSelector } from 'react-redux';

import {
  loadManufacturingPlans,
  addManufacturingPlan,
  updateManufacturingPlan,
  deleteManufacturingPlan,
} from './actions';

export default () => {
  const {
    store: { dispatch },
  } = useContext(ReactReduxContext);

  const manufacturingPlans = useSelector(state => state.manufacturingPlans);

  const actions = useMemo(
    () =>
      bindActionCreators(
        {
          loadManufacturingPlans,
          addManufacturingPlan,
          updateManufacturingPlan,
          deleteManufacturingPlan,
        },
        dispatch
      ),
    [dispatch]
  );

  return {
    ...actions,
    getManufacturingPlan: id => manufacturingPlans.result[id],
    manufacturingPlans: manufacturingPlans.result,
    isLoading: manufacturingPlans.isLoading,
    error: manufacturingPlans.error,
  };
};
