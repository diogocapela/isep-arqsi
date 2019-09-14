import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
  const { loadOperations, deleteOperation, operations, isLoading, error } = useOperations();

  const classes = useStyles();

  useEffect(() => {
    loadOperations();
  }, [loadOperations]);

  console.log(operations);
  if (error) {
    console.error(error);
  }

  return (
    <MainLayout>
      <Container>
        <PageTitle title="Operations" />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          component={Link}
          to="/factory/add/operation"
        >
          Add Operation
        </Button>
        <br /> <br />
        {isLoading ? (
          <Loading />
        ) : (
          <Fragment>
            <ListGroup
              items={Object.values(operations)}
              endpoint="/factory/edit/operation"
              deleteAction={deleteOperation}
            />
          </Fragment>
        )}
      </Container>
    </MainLayout>
  );
};
