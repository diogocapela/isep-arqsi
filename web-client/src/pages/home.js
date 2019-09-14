import React, { useEffect } from 'react';

import { useMachines } from 'redux/redux-machines';
import { useMachineTypes } from 'redux/redux-machine-types';
import { useOperations } from 'redux/redux-operations';
import { useProductionLines } from 'redux/redux-production-lines';
import { useManufacturingPlans } from 'redux/redux-manufacturing-plans';
import { useProducts } from 'redux/redux-products';
import { useAuth } from 'redux/redux-auth';

import MainLayout from 'layouts/main-layout';
import Container from 'components/container';
import PageTitle from 'components/page-title';
import SearchBar from 'components/search-bar';

export default () => {
  const { loadMachines } = useMachines();
  const { loadMachineTypes } = useMachineTypes();
  const { loadOperations } = useOperations();
  const { loadProductionLines } = useProductionLines();

  const { loadManufacturingPlans } = useManufacturingPlans();
  const { loadProducts } = useProducts();

  const { isAdmin } = useAuth();

  useEffect(() => {
    loadMachines();
    loadMachineTypes();
    loadOperations();
    loadProductionLines();
    loadManufacturingPlans();
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout>
      <Container>
        <PageTitle title="Home" />
        {isAdmin && <SearchBar />}
      </Container>
    </MainLayout>
  );
};
