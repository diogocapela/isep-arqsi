import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Formik } from 'formik';
import get from 'lodash/get';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';

import { useProducts } from 'redux/redux-products';
import { useManufacturingPlans } from 'redux/redux-manufacturing-plans';
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

const EditProduct = props => {
  const { location, match, history } = props;

  const classes = useStyles();

  const { loadProducts, products, addProduct, updateProduct } = useProducts();
  const { loadManufacturingPlans, manufacturingPlans } = useManufacturingPlans();

  const product = products[match.params.id];
  const isAdd = location.pathname.startsWith('/production/add/');
  const title = isAdd ? 'Add Product' : `${product ? `Edit Product ${product.id}` : ''}`;

  const allManufacturingPlanOptions = Object.values(manufacturingPlans).map(o => ({
    label: o.id,
    value: o.id,
  }));
  console.log('product', product);

  const initialValues = {
    name: get(product, 'name') || '',
    description: get(product, 'description') || '',
    price: get(product, 'price'),
    // TODO: Fix this problem with id
    manufacturingPlan: get(product, 'manufacturingPlan.id'),
  };

  const onSubmit = async (values, { setSubmitting }) => {
    if (isAdd) {
      await addProduct(values);
    } else {
      await updateProduct(product.id, values);
    }
    setTimeout(() => {
      history.push('/production/products');
      setSubmitting(false);
    }, 500);
  };

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    loadManufacturingPlans();
  }, [loadManufacturingPlans]);

  if (!isAdd && !initialValues.name) return null;

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
                <TextField
                  type="text"
                  name="name"
                  value={values.name}
                  label="Name"
                  className={classes.textField}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  margin="normal"
                  required
                  fullWidth
                  autoFocus
                />
                {errors.name && touched.name && errors.name}
                <TextField
                  type="text"
                  name="description"
                  value={values.description}
                  label="Description"
                  className={classes.textField}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  margin="normal"
                  fullWidth
                />
                {errors.description && touched.description && errors.description}
                <TextField
                  type="number"
                  name="price"
                  value={values.price}
                  label="Price"
                  className={classes.textField}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  margin="normal"
                  fullWidth
                />
                {errors.price && touched.price && errors.price}
                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                      Manufacturing Plan
                    </InputLabel>
                    <Select
                      name="manufacturingPlan"
                      value={initialValues.manufacturingPlan}
                      onChange={handleChange}
                      displayEmpty
                      className={classes.select}
                    >
                      {allManufacturingPlanOptions.map(mt => (
                        <MenuItem className={classes.menuItem} value={mt.value}>
                          {mt.label}: {manufacturingPlans[mt.value].name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
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

export default withRouter(EditProduct);
