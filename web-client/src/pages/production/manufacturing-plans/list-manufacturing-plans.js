import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { useManufacturingPlans } from 'redux/redux-manufacturing-plans';
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
    loadManufacturingPlans,
    deleteManufacturingPlan,
    manufacturingPlans,
    isLoading,
    error,
  } = useManufacturingPlans();

  const classes = useStyles();

  useEffect(() => {
    loadManufacturingPlans();
  }, [loadManufacturingPlans]);

  console.log(manufacturingPlans);
  if (error) {
    console.error(error);
  }

  return (
    <MainLayout>
      <Container>
        <PageTitle title="Manufacturing-plans" />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          component={Link}
          to="/production/add/manufacturing-plan"
        >
          Add ManufacturingPlan
        </Button>
        <br /> <br />
        {isLoading ? (
          <Loading />
        ) : (
          <Fragment>
            <ListGroup
              items={Object.values(manufacturingPlans)}
              endpoint="/production/edit/manufacturing-plan"
              deleteAction={deleteManufacturingPlan}
            />
          </Fragment>
        )}
      </Container>
    </MainLayout>
  );
};
