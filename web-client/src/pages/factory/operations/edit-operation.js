import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Formik } from 'formik';
import get from 'lodash/get';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';

import { useOperations } from 'redux/redux-operations';
import { useTools } from 'redux/redux-tools';
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

const EditOperation = props => {
  const { location, match, history } = props;

  const classes = useStyles();

  const { loadOperations, operations, addOperation, updateOperation } = useOperations();
  const { loadTools, tools } = useTools();

  useEffect(() => {
    loadOperations();
  }, [loadOperations]);

  useEffect(() => {
    loadTools();
  }, [loadTools]);

  const operation = operations[match.params.id];
  const isAdd = location.pathname.startsWith('/factory/add/');
  const title = isAdd ? 'Add Operation' : `${operation ? `Edit Operation ${operation.id}` : ''}`;

  const allToolOptions = Object.values(tools).map(o => ({ label: o.id, value: o.id }));

  const initialValues = {
    name: get(operation, 'name') || '',
    description: get(operation, 'description') || '',
    timeTakes: get(operation, 'timeTakes'),
    startupTime: get(operation, 'startupTime'),
    tool: get(operation, 'tool'),
  };

  const onSubmit = async (values, { setSubmitting }) => {
    if (isAdd) {
      await addOperation(values);
    } else {
      await updateOperation(operation.id, values);
    }
    setTimeout(() => {
      history.push('/factory/operations');
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
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
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
                name="timeTakes"
                value={values.timeTakes}
                label="Time Takes"
                className={classes.textField}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                margin="normal"
                fullWidth
              />
              {errors.timeTakes && touched.timeTakes && errors.timeTakes}
              <TextField
                type="number"
                name="startupTime"
                value={values.startupTime}
                label="Startup Time"
                className={classes.textField}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                margin="normal"
                fullWidth
              />
              {errors.startupTime && touched.startupTime && errors.startupTime}
              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    Tool
                  </InputLabel>
                  <Select
                    name="tool"
                    value={values.tool}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.select}
                  >
                    {allToolOptions.map(mt => (
                      <MenuItem value={mt.value}>
                        {mt.label}: {tools[mt.value].name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
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

export default withRouter(EditOperation);
