import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { Formik } from 'formik';
import get from 'lodash/get';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';

import { useMachines } from 'redux/redux-machines';
import { useMachineTypes } from 'redux/redux-machine-types';
import MainLayout from 'layouts/main-layout';
import Container from 'components/container';
import PageTitle from 'components/page-title';
import Checkbox from 'components/checkbox';

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

const EditMachine = props => {
  const { location, match, history } = props;

  const classes = useStyles();

  const [isActive, setIsActive] = useState(false);

  const { loadMachines, machines, addMachine, updateMachine } = useMachines();
  const { loadMachineTypes, machineTypes } = useMachineTypes();

  const machine = machines[match.params.id];
  const isAdd = location.pathname.startsWith('/factory/add/');
  const title = isAdd ? 'Add Machine' : `${machine ? `Edit Machine ${machine.id}` : ''}`;

  const allMachineTypeOptions = Object.values(machineTypes).map(o => ({ label: o.id, value: o.id }));

  const initialValues = {
    name: get(machine, 'name') || '',
    description: get(machine, 'description') || '',
    machineType: get(machine, 'machineType'),
    active: get(machine, 'active'),
  };

  const onSubmit = async (values, { setSubmitting }) => {
    if (isAdd) {
      await addMachine({ ...values, active: isActive });
    } else {
      await updateMachine(machine.id, { ...values, active: isActive });
    }
    setTimeout(() => {
      history.push('/factory/machines');
      setSubmitting(false);
    }, 500);
  };

  useEffect(() => {
    setIsActive(initialValues.active);
  }, [initialValues.active]);

  useEffect(() => {
    loadMachines();
  }, [loadMachines]);

  useEffect(() => {
    loadMachineTypes();
  }, [loadMachineTypes]);

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
                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                      Machine Type
                    </InputLabel>
                    <Select
                      name="machineType"
                      value={initialValues.machineType}
                      onChange={handleChange}
                      displayEmpty
                      className={classes.select}
                    >
                      {allMachineTypeOptions.map(mt => (
                        <MenuItem value={mt.value}>
                          {mt.label}: {machineTypes[mt.value].name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <b>Active:</b>
                  <Checkbox checked={isActive} onChange={() => setIsActive(!isActive)} />
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

export default withRouter(EditMachine);
