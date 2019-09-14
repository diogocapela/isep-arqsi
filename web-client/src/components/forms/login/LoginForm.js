import React from 'react';
import styled from '@emotion/styled';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useAuth } from 'redux/redux-auth';
import Input from 'components/input';
import Button from 'components/button';

const WrapperDiv = styled.div`
  width: 42rem;
  max-width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  width: 100%;
  margin-bottom: 1.5rem;
`;

const StyledButton = styled(Button)`
  margin-bottom: 0.75rem;
`;

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email.')
    .max(40, 'Please enter no more than 40 characters.')
    .required('Please enter your email address.'),
  password: yup
    .string()
    .max(40, 'Please enter no more than 40 characters.')
    .required('Please enter a password'),
});

const LoginForm = () => {
  const { login } = useAuth();

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(false);
      await login(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WrapperDiv>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <StyledInput
                placeholder="Email address"
                name="email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <StyledInput
                placeholder="Password"
                name="password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <StyledButton type="submit" disabled={isSubmitting} loading={isSubmitting}>
                Login
              </StyledButton>
            </Form>
          );
        }}
      </Formik>
    </WrapperDiv>
  );
};

export default LoginForm;
