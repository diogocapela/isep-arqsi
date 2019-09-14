import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Formik } from 'formik';
import ReactSelect from 'react-select';
import get from 'lodash/get';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';

import { useOrders } from 'redux/redux-orders';
import { useProducts } from 'redux/redux-products';
import MainLayout from 'layouts/main-layout';
import Container from 'components/container';
import PageTitle from 'components/page-title';

const useStyles = makeStyles(theme => ({
  textField: {
    margin: theme.spacing(1),
    width: '600px',
    maxWidth: '100%',
    display: 'block',
  },
  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  select: {
    width: '600px',
    maxWidth: '100%',
    display: 'block',
  },
  menuItem: {
    border: '1px solid red',
  },
}));

const EditOrder = props => {
  const { location, match, history } = props;

  const classes = useStyles();

  const { loadOrders, orders, addOrder, updateOrder } = useOrders();
  const { loadProducts, products } = useProducts();

  const order = orders.find(o => o._id === match.params.id);
  console.log('products', products);
  const isAdd = location.pathname.startsWith('/orders/add');
  const title = isAdd ? 'Add Order' : `${order ? `Edit Order ${order._id}` : ''}`;

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  if (!isAdd && !products && !order) return null;

  const allProductOptions = Object.values(products).map(o => ({
    label: `${o.id}: ${o.name}`,
    value: o.id,
  }));

  const initialValues = {
    productIds: (get(order, 'productIds') || []).map(oId => ({
      label: `${oId}: ${get(products, `${oId}.name`)}`,
      value: oId,
    })),
    deadline: get(order, 'deadline') || new Date().setDate(new Date().getDate() + 15),
    deliveryAddressStreet: get(order, 'deliveryAddress.street') || '',
    deliveryAddressZipCode: get(order, 'deliveryAddress.zipCode') || '',
    deliveryAddressCity: get(order, 'deliveryAddress.city') || '',
    deliveryAddressCountry: get(order, 'deliveryAddress.country') || '',
  };

  const onSubmit = async (values, { setSubmitting }) => {
    const valuesToSubmit = {
      productIds: values.productIds.map(p => p.value),
      deadline: values.deadline,
      deliveryAddress: {
        street: values.deliveryAddressStreet,
        zipCode: values.deliveryAddressZipCode,
        city: values.deliveryAddressCity,
        country: values.deliveryAddressCountry,
      },
    };

    if (isAdd) {
      await addOrder(valuesToSubmit);
    } else {
      await updateOrder(order._id, valuesToSubmit);
    }
    setTimeout(() => {
      history.push('/orders');
      setSubmitting(false);
    }, 500);
  };

  return (
    <MainLayout>
      <Container>
        <PageTitle title={title} />
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={history.goBack}
        >
          Go Back
        </Button>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <h6 className={classes.reactSelectLabel}>Products</h6>
                <ReactSelect
                  name="productIds"
                  defaultValue={initialValues.productIds}
                  isMulti
                  options={allProductOptions}
                  className={classes.reactSelect}
                  classNamePrefix="select"
                  onChange={e => setFieldValue('productIds', e)}
                />
                <TextField
                  type="text"
                  name="deadline"
                  value={values.deadline}
                  label="Deadline"
                  className={classes.textField}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                />
                {errors.deadline && touched.deadline && errors.deadline}
                <TextField
                  type="text"
                  name="deliveryAddressStreet"
                  value={values.deliveryAddressStreet}
                  label="Delivery Address - Street"
                  className={classes.textField}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  margin="normal"
                  fullWidth
                />
                {errors.deliveryAddressStreet &&
                  touched.deliveryAddressStreet &&
                  errors.deliveryAddressStreet}
                <TextField
                  type="text"
                  name="deliveryAddressZipCode"
                  value={values.deliveryAddressZipCode}
                  label="Delivery Address - Zip Code"
                  className={classes.textField}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  margin="normal"
                  fullWidth
                />
                {errors.deliveryAddressZipCode &&
                  touched.deliveryAddressZipCode &&
                  errors.deliveryAddressZipCode}
                <TextField
                  type="text"
                  name="deliveryAddressCity"
                  value={values.deliveryAddressCity}
                  label="Delivery Address - City"
                  className={classes.textField}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  margin="normal"
                  fullWidth
                />
                {errors.deliveryAddressCity && touched.deliveryAddressCity && errors.deliveryAddressCity}
                <TextField
                  type="text"
                  name="deliveryAddressCountry"
                  value={values.deliveryAddressCountry}
                  label="Delivery Address - Country"
                  className={classes.textField}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  margin="normal"
                  fullWidth
                />
                {errors.deliveryAddressCountry &&
                  touched.deliveryAddressCountry &&
                  errors.deliveryAddressCountry}
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : title}
                </Button>
              </form>
            );
          }}
        </Formik>
      </Container>
    </MainLayout>
  );
};

export default withRouter(EditOrder);
