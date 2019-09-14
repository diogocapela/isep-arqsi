import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { useMachines } from 'redux/redux-machines';
import { useProductionLines } from 'redux/redux-production-lines';
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
  const {
    loadProductionLines,
    deleteProductionLine,
    productionLines,
    isLoading,
    error,
  } = useProductionLines();
  const { loadMachines } = useMachines();

  const classes = useStyles();

  useEffect(() => {
    loadProductionLines();
  }, [loadProductionLines]);

  useEffect(() => {
    loadMachines();
  }, [loadMachines]);

  console.log(productionLines);
  if (error) {
    console.error(error);
  }

  return (
    <MainLayout>
      <Container>
        <PageTitle title="ProductionLines" />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          component={Link}
          to="/factory/add/production-line"
        >
          Add ProductionLine
        </Button>
        <br /> <br />
        {isLoading ? (
          <Loading />
        ) : (
          <Fragment>
            <ListGroup
              items={Object.values(productionLines)}
              endpoint="/factory/edit/production-line"
              deleteAction={deleteProductionLine}
            />
          </Fragment>
        )}
      </Container>
    </MainLayout>
  );
};
