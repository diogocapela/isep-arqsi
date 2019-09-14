import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ReactSelect from 'react-select';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

import { useMachines } from 'redux/redux-machines';
import { useMachineTypes } from 'redux/redux-machine-types';
import { useOperations } from 'redux/redux-operations';
import { useProductionLines } from 'redux/redux-production-lines';
import { useManufacturingPlans } from 'redux/redux-manufacturing-plans';
import { useProducts } from 'redux/redux-products';

const StyledReactSelect = styled(ReactSelect)`
  width: 600px;
  color: black;
`;

const useStyles = makeStyles(theme => ({
  searchBar: {
    width: '600px',
    maxWidth: '100%',
    color: 'black',
  },
}));

const SearchBar = ({ location, history, ...remainingProps }) => {
  const { machines } = useMachines();
  const { machineTypes } = useMachineTypes();
  const { operations } = useOperations();
  const { productionLines } = useProductionLines();

  const { manufacturingPlans } = useManufacturingPlans();
  const { products } = useProducts();

  const classes = useStyles();

  console.log('location', location);
  console.log('history', history);

  console.log('operations', operations);

  const options = [];

  Object.values(machines).forEach(o => {
    options.push({
      label: `${o.id}: ${o.name}`,
      value: `/factory/edit/machine/${o.id}`,
    });
  });

  Object.values(machineTypes).forEach(o => {
    options.push({
      label: `${o.id}: ${o.name}`,
      value: `/factory/edit/machine-type/${o.id}`,
    });
  });

  Object.values(operations).forEach(o => {
    options.push({
      label: `${o.id}: ${o.name}`,
      value: `/factory/edit/operation/${o.id}`,
    });
  });

  Object.values(productionLines).forEach(o => {
    options.push({
      label: `${o.id}: ${o.name}`,
      value: `/factory/edit/production-line/${o.id}`,
    });
  });

  Object.values(manufacturingPlans).forEach(o => {
    options.push({
      label: `${o.id}: ${o.name}`,
      value: `/production/edit/manufacturing-plan/${o.id}`,
    });
  });

  Object.values(products).forEach(o => {
    options.push({
      label: `${o.id}: ${o.name}`,
      value: `/production/edit/product/${o.id}`,
    });
  });

  return (
    <StyledReactSelect
      className={classes.searchBar}
      classNamePrefix="select"
      defaultValue={undefined}
      isDisabled={false}
      isLoading={false}
      isClearable={false}
      isSearchable={true}
      onChange={e => history.push(e.value)}
      name="searchBar"
      placeholder="Search entities..."
      options={options}
    />
  );
};

SearchBar.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string.isRequired,
    })
  ),
};

export default withRouter(SearchBar);
