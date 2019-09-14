import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { useTools } from 'redux/redux-tools';
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
  const { loadTools, deleteTool, tools, isLoading, error } = useTools();

  const classes = useStyles();

  useEffect(() => {
    loadTools();
  }, [loadTools]);

  console.log(tools);
  if (error) {
    console.error(error);
  }

  return (
    <MainLayout>
      <Container>
        <PageTitle title="Tools" />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          component={Link}
          to="/factory/add/tool"
        >
          Add Tool
        </Button>
        <br /> <br />
        {isLoading ? (
          <Loading />
        ) : (
          <Fragment>
            <ListGroup
              items={Object.values(tools)}
              endpoint="/factory/edit/tool"
              deleteAction={deleteTool}
            />
          </Fragment>
        )}
      </Container>
    </MainLayout>
  );
};
