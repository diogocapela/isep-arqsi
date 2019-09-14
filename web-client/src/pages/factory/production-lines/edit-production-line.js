import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Formik } from 'formik';
import get from 'lodash/get';
import ReactSelect from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

import { useProductionLines } from 'redux/redux-production-lines';
import { useMachines } from 'redux/redux-machines';
import MainLayout from 'layouts/main-layout';
import Container from 'components/container';
import PageTitle from 'components/page-title';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '600px',
    maxWidth: '100%',
    display: 'block',
  },
  button: {
    margin: theme.spacing(1),
  },
  reactSelect: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '600px',
    maxWidth: '100%',
    display: 'block',
    cursor: 'pointer',
  },
  reactSelectLabel: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
    fontSize: '1rem',
    fontWeight: 'normal',
  },
}));

const EditProductionLine = props => {
  const { location, match, history } = props;

  const classes = useStyles();

  const {
    loadProductionLines,
    productionLines,
    addProductionLine,
    updateProductionLine,
  } = useProductionLines();
  const { loadMachines, machines } = useMachines();

  const productionLine = productionLines[match.params.id];
  const isAdd = location.pathname.startsWith('/factory/add/');
  const title = isAdd
    ? 'Add ProductionLine'
    : `${productionLine ? `Edit ProductionLine ${productionLine.id}` : ''}`;

  const allMachineOptions = Object.values(machines).map(o => ({
    label: `${o.id}: ${o.name}`,
    value: o.id,
  }));

  const initialValues = {
    name: get(productionLine, 'name') || '',
    description: get(productionLine, 'description') || '',
    machines: (get(productionLine, 'machines') || []).map(oId => ({
      label: `${oId}: ${get(machines, `${oId}.name`)}`,
      value: oId,
    })),
  };

  const onSubmit = async (values, { setSubmitting }) => {
    if (isAdd) {
      await addProductionLine(values);
    } else {
      await updateProductionLine(productionLine.id, values);
    }
    setTimeout(() => {
      history.push('/factory/production-lines');
      setSubmitting(false);
    }, 500);
  };

  useEffect(() => {
    loadProductionLines();
  }, [loadProductionLines]);

  useEffect(() => {
    loadMachines();
  }, [loadMachines]);

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
            console.log('values', values);

            return (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  setFieldValue('machines', values.machines.map(o => o.value));
                  console.log('onSubmit - values', values);
                  setTimeout(() => {
                    handleSubmit();
                  }, 0);
                }}
              >
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
                <h6 className={classes.reactSelectLabel}>Machines</h6>
                <ReactSelect
                  name="machines"
                  defaultValue={initialValues.machines}
                  isMulti
                  options={allMachineOptions}
                  className={classes.reactSelect}
                  classNamePrefix="select"
                  onChange={e => setFieldValue('machines', e)}
                />
                <br />
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

export default withRouter(EditProductionLine);
