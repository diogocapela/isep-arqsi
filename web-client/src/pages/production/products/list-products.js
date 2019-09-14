import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import get from 'lodash/get';

import { ORDER_MANAGEMENT } from 'config/endpoints';

import { useAuth } from 'redux/redux-auth';
import { useProducts } from 'redux/redux-products';
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
  const { loadProducts, deleteProduct, products, isLoading, error } = useProducts();
  const { profile } = useAuth();

  const classes = useStyles();

  const [mostTimes, setMostTimes] = useState([]);
  const [mostQuantity, setMostQuantity] = useState([]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  console.log(mostTimes);
  console.log(mostQuantity);

  useEffect(() => {
    (async () => {
      const mostTimesSold = await axios({
        method: 'get',
        url: `${ORDER_MANAGEMENT}/orders/most-times-sold-product`,
        headers: { Authorization: get(profile, 'token') },
      });

      const mostQuantitySold = await axios({
        method: 'get',
        url: `${ORDER_MANAGEMENT}/orders/most-sold-product`,
        headers: { Authorization: get(profile, 'token') },
      });

      setMostTimes(mostTimesSold.data);
      setMostQuantity(mostQuantitySold.data);
    })();
  }, [profile]);

  //console.log(products);
  if (error) {
    console.error(error);
  }

  return (
    <MainLayout>
      <Container>
        <PageTitle title="Products" />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          component={Link}
          to="/production/add/product"
        >
          Add Product
        </Button>
        <br />
        <br />
        {isLoading ? (
          <Loading />
        ) : (
          <Fragment>
            <ListGroup
              items={Object.values(products)}
              endpoint="/production/edit/product"
              deleteAction={deleteProduct}
            />
          </Fragment>
        )}
        <h4>Most Ordered Products (Times)</h4>
        <ul>
          {mostTimes.map(x => (
            <li>
              ID: {x.id} | Times Sold: {x.timesSold}
            </li>
          ))}
        </ul>
        <br />
        <h4>Most Ordered Products (Quantity)</h4>
        <ul>
          {mostQuantity.map(x => (
            <li>
              ID: {x.id} | Quantity: {x.quantity}
            </li>
          ))}
        </ul>
      </Container>
    </MainLayout>
  );
};
