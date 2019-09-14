import React from 'react';
import onlyGuest from 'hoc/onlyGuest';
import Layout from 'layouts/auth-layout';
import LoginForm from 'components/forms/login';

const LoginPage = () => {
  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
};

export default onlyGuest(LoginPage);
