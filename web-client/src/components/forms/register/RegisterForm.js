import React from 'react';
import styled from '@emotion/styled';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useAuth } from 'redux/redux-auth';
import Input from 'components/input';
import Checkbox from 'components/checkbox';
import Button from 'components/button';
import Link from 'components/link';

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

const StyledCheckbox = styled(Checkbox)`
  margin-right: 0.5rem;
`;

const StyledButton = styled(Button)`
  margin-bottom: 0.75rem;
`;

const Span = styled.span`
  color: #878c9a;
  font-size: 0.8rem;
  margin-top: 1rem;
  text-align: center;
`;

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email.')
    .max(40, 'Please enter no more than 40 characters.')
    .required('Please enter your email address.'),
  firstName: yup
    .string()
    .max(40, 'Please enter no more than 40 characters.')
    .required('Please enter your name.'),
  password: yup
    .string()
    .max(40, 'Please enter no more than 40 characters.')
    .required('Please enter a password'),
});

const RegisterForm = () => {
  const { register } = useAuth();

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(false);
      await register(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WrapperDiv>
      <Formik
        initialValues={{
          email: '',
          firstName: '',
          password: '',
          acceptsMarketing: false,
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
                placeholder="Name"
                name="firstName"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />
              {errors.firstName && touched.firstName && errors.firstName}
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
                Create my Account
              </StyledButton>
              <Span>
                By signing up you agree to the{' '}
                <Link href="/privacy" target="_blank">
                  privacy policy
                </Link>
                .
              </Span>
              <Span>
                <StyledCheckbox
                  name="acceptsMarketing"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.acceptsMarketing}
                />
                I want to receive direct marketing to provided email regarding our products only. You can
                disable this option anytime you want.
              </Span>
            </Form>
          );
        }}
      </Formik>
    </WrapperDiv>
  );
};

export default RegisterForm;
