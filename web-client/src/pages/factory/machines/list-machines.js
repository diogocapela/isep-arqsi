import React, { Fragment, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useMachines } from 'redux/redux-machines';
import { useMachineTypes } from 'redux/redux-machine-types';
import MainLayout from 'layouts/main-layout';
import Container from 'components/container';
import ListGroup from 'components/list-group';
import PageTitle from 'components/page-title';
import Loading from 'components/loading';
import Link from 'components/link';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default () => {
  const { loadMachines, deleteMachine, machines, isLoading } = useMachines();
  const { loadMachineTypes, machineTypes } = useMachineTypes();

  const classes = useStyles();

  const [machineTypeFilter, setMachineTypeFilter] = useState('ALL');

  useEffect(() => {
    loadMachines();
  }, [loadMachines]);

  useEffect(() => {
    loadMachineTypes();
  }, [loadMachineTypes]);

  console.log('machines', machines);
  console.log('machineTypes', machineTypes);

  const machinesToRender =
    machineTypeFilter !== 'ALL'
      ? Object.values(machines).filter(machine => machine.machineType === machineTypeFilter)
      : Object.values(machines);

  return (
    <MainLayout>
      <Container>
        <PageTitle title="Machines" />
        <FlexDiv>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            component={Link}
            to="/factory/add/machine"
          >
            Add Machine
          </Button>
          <FormControl className={classes.formControl}>
            <InputLabel>Filter by Machine Type</InputLabel>
            <Select value={machineTypeFilter} onChange={e => setMachineTypeFilter(e.target.value)}>
              <MenuItem value="ALL">Show All Machine Types</MenuItem>
              {Object.values(machineTypes).map(machineType => (
                <MenuItem value={machineType.id} key={machineType.id}>
                  {machineType.id}: {machineType.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FlexDiv>
        <br /> <br />
        {isLoading ? (
          <Loading />
        ) : (
          <Fragment>
            <ListGroup
              items={machinesToRender}
              endpoint="/factory/edit/machine"
              deleteAction={deleteMachine}
            />
          </Fragment>
        )}
      </Container>
    </MainLayout>
  );
};
