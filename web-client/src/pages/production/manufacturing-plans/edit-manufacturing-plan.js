import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Formik } from 'formik';
import get from 'lodash/get';
import ReactSelect from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useManufacturingPlans } from 'redux/redux-manufacturing-plans';
import { useOperations } from 'redux/redux-operations';
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

const EditManufacturingPlan = props => {
  const { location, match, history } = props;

  const classes = useStyles();

  const {
    loadManufacturingPlans,
    manufacturingPlans,
    addManufacturingPlan,
    updateManufacturingPlan,
  } = useManufacturingPlans();

  const { operations, loadOperations } = useOperations();

  useEffect(() => {
    loadManufacturingPlans();
  }, [loadManufacturingPlans]);

  useEffect(() => {
    loadOperations();
  }, [loadOperations]);

  const manufacturingPlan = manufacturingPlans[match.params.id];

  const isAdd = location.pathname.startsWith('/production/add/');

  const title = isAdd
    ? 'Add ManufacturingPlan'
    : `${manufacturingPlan ? `Edit ManufacturingPlan ${manufacturingPlan.id}` : ''}`;

  const allOperationOptions = Object.values(operations).map(o => ({
    label: `${o.id}: ${o.name}`,
    value: o.id,
  }));

  const initialValues = {
    name: get(manufacturingPlan, 'name') || '',
    description: get(manufacturingPlan, 'description') || '',
    operations: (get(manufacturingPlan, 'operations') || []).map(oId => ({
      label: `${oId}: ${get(operations, `${oId}.name`)}`,
      value: oId,
    })),
  };

  const onSubmit = async (values, { setSubmitting }) => {
    if (isAdd) {
      await addManufacturingPlan(values);
    } else {
      await updateManufacturingPlan(manufacturingPlan.id, values);
    }
    setTimeout(() => {
      history.push('/production/manufacturing-plans');
      setSubmitting(false);
    }, 500);
  };

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
          }) => (
            <form
              onSubmit={e => {
                e.preventDefault();
                setFieldValue('operations', values.operations.map(o => o.value));
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
              <h6 className={classes.reactSelectLabel}>Operations</h6>
              <ReactSelect
                name="operations"
                defaultValue={initialValues.operations}
                isMulti
                options={allOperationOptions}
                className={classes.reactSelect}
                classNamePrefix="select"
                onChange={e => setFieldValue('operations', e)}
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
          )}
        </Formik>
      </Container>
    </MainLayout>
  );
};

export default withRouter(EditManufacturingPlan);
