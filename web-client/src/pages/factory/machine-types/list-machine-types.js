import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { useMachineTypes } from 'redux/redux-machine-types';
import { useOperations } from 'redux/redux-operations';
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
}));

export default () => {
  const { loadMachineTypes, deleteMachineType, machineTypes, isLoading, error } = useMachineTypes();
  const { loadOperations } = useOperations();

  const classes = useStyles();

  useEffect(() => {
    loadMachineTypes();
  }, [loadMachineTypes]);

  useEffect(() => {
    loadOperations();
  }, [loadOperations]);

  console.log(machineTypes);
  if (error) {
    console.error(error);
  }

  return (
    <MainLayout>
      <Container>
        <PageTitle title="Machine Types" />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          component={Link}
          to="/factory/add/machine-type"
        >
          Add MachineType
        </Button>
        <br /> <br />
        {isLoading ? (
          <Loading />
        ) : (
          <Fragment>
            <ListGroup
              items={Object.values(machineTypes)}
              endpoint="/factory/edit/machine-type"
              deleteAction={deleteMachineType}
            />
          </Fragment>
        )}
      </Container>
    </MainLayout>
  );
};
