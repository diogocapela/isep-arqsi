import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useOrders } from 'redux/redux-orders';
import { useProducts } from 'redux/redux-products';
import { useAuth } from 'redux/redux-auth';
import MainLayout from 'layouts/main-layout';
import Container from 'components/container';
import OrderGroup from 'components/order-group';
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
  const { orders, loadOrders, cancelOrder, isLoading, error } = useOrders();
  const { profile } = useAuth();
  const [orderFilter, setOrderFilter] = useState('ALL');

  const { loadProducts } = useProducts();

  const classes = useStyles();

  const ordersToRender =
    orderFilter !== 'ALL' ? orders.filter(order => order.status === orderFilter) : orders;

  console.log(ordersToRender);

  useEffect(() => {
    loadOrders();
  }, [loadOrders, profile]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  console.log('orders', orders);
  if (error) {
    console.error(error);
  }

  return (
    <MainLayout>
      <Container>
        <PageTitle title="Orders" />
        <FlexDiv>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            component={Link}
            to="/orders/add"
          >
            Add Order
          </Button>
          <FormControl className={classes.formControl}>
            <InputLabel>Filter by Status</InputLabel>
            <Select value={orderFilter} onChange={e => setOrderFilter(e.target.value)}>
              <MenuItem value="ALL">Show All Orders</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="canceled">Canceled</MenuItem>
            </Select>
          </FormControl>
        </FlexDiv>
        <br /> <br />
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <OrderGroup items={ordersToRender} endpoint="/orders/edit" cancelAction={cancelOrder} />
          </div>
        )}
      </Container>
    </MainLayout>
  );
};
