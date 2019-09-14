import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { Formik } from 'formik';
import get from 'lodash/get';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

import { useOrders } from 'redux/redux-orders';
import { useProducts } from 'redux/redux-products';
import MainLayout from 'layouts/main-layout';
import Container from 'components/container';
import Select from 'components/select';
import Input from 'components/input';
import PageTitle from 'components/page-title';

function getDay() {
  return new Date().getDate();
}

function getMonth() {
  return new Date().getMonth() + 1;
}

function getYear() {
  return new Date().getFullYear();
}

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

  const [productIdValue, setProductIdValue] = useState();
  const [quantityValue, setQuantityValue] = useState();
  const [addingProducts, setAddingProducts] = useState([]);
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

  useEffect(() => {
    if (!isAdd) {
      setAddingProducts(get(order, 'products') || []);
    }
  }, [isAdd, order]);

  if (!isAdd && !products && !order) return null;

  const allProductOptions = Object.values(products).map(o => ({
    label: `${o.id}: ${o.name}`,
    value: o.id,
  }));

  const initialValues = {
    products: get(order, 'products') || [],
    deadline: get(order, 'deadline') || `${getDay()}/${getMonth()}/${getYear()}`,
    deliveryAddressStreet: get(order, 'deliveryAddress.street') || '',
    deliveryAddressZipCode: get(order, 'deliveryAddress.zipCode') || '',
    deliveryAddressCity: get(order, 'deliveryAddress.city') || '',
    deliveryAddressCountry: get(order, 'deliveryAddress.country') || '',
  };

  const handleAddProduct = () => {
    if (typeof productIdValue === 'undefined' || typeof quantityValue === 'undefined') {
      return;
    }
    setQuantityValue('');

    setAddingProducts([
      ...addingProducts,
      {
        id: productIdValue,
        quantity: quantityValue,
      },
    ]);
  };

  const onSubmit = async (values, { setSubmitting }) => {
    const valuesToSubmit = {
      products: addingProducts,
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
                <p>Product ID</p>
                <Select
                  options={[{ label: 'Select a Product', value: undefined }, ...allProductOptions]}
                  onChange={e => setProductIdValue(e.target.value)}
                />
                <br />
                <p>Quantity</p>
                <Input
                  type="number"
                  value={quantityValue}
                  onChange={e => setQuantityValue(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleAddProduct}
                >
                  Add Product
                </Button>
                <hr />
                <h3 className={classes.reactSelectLabel}>Products in the Order</h3>{' '}
                <button type="button" onClick={() => setAddingProducts([])}>
                  Clear
                </button>
                {addingProducts.length === 0 && <p>No products in this order...</p>}
                {addingProducts.map(ap => (
                  <p>
                    <b>ID:</b> {ap.id} | <b>Quantity:</b> {ap.quantity}
                  </p>
                ))}
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
