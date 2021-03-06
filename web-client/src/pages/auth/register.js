import React from 'react';
import onlyGuest from 'hoc/onlyGuest';
import Layout from 'layouts/auth-layout';
import RegisterForm from 'components/forms/register';

const RegisterPage = () => {
  return (
    <Layout>
      <RegisterForm />
    </Layout>
  );
};

export default onlyGuest(RegisterPage);
