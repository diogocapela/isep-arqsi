import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Formik } from 'formik';
import get from 'lodash/get';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useTools } from 'redux/redux-tools';
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
}));

const EditTool = props => {
  const { location, match, history } = props;

  const classes = useStyles();

  const { loadTools, tools, addTool, updateTool } = useTools();

  useEffect(() => {
    loadTools();
  }, [loadTools]);

  const tool = tools[match.params.id];

  const isAdd = location.pathname.startsWith('/factory/add/');

  const title = isAdd ? 'Add Tool' : `${tool ? `Edit Tool ${tool.id}` : ''}`;

  const initialValues = {
    name: get(tool, 'name') || '',
  };

  const onSubmit = async (values, { setSubmitting }) => {
    if (isAdd) {
      await addTool(values);
    } else {
      await updateTool(tool.id, values);
    }
    setTimeout(() => {
      history.push('/factory/tools');
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

export default withRouter(EditTool);
