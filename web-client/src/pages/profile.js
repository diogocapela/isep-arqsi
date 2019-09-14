import React, { useState, useEffect } from 'react';
import get from 'lodash/get';
import MainLayout from 'layouts/main-layout';
import Container from 'components/container';
import PageTitle from 'components/page-title';
import { useAuth } from 'redux/redux-auth';
import Checkbox from 'components/checkbox';
import Button from 'components/button';

import { ORDER_MANAGEMENT } from 'config/endpoints';

export default () => {
  const { profile } = useAuth();
  const [acceptsMarketing, setAcceptsMarketing] = useState(false);

  useEffect(() => {
    setAcceptsMarketing(get(profile, 'settings.acceptsMarketing'));
  }, [profile]);

  console.log(acceptsMarketing);

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`${ORDER_MANAGEMENT}/users/${get(profile, '_id')}/gdpr`, {
      method: 'PUT',
      headers: { Authorization: get(profile, 'token') },
      body: JSON.stringify({
        acceptsMarketing,
      }),
    }).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 250);
    });
  };

  return (
    <MainLayout>
      <Container>
        <form onSubmit={handleSubmit}>
          <PageTitle title="Profile" />
          <p>
            <b>Email:</b> {get(profile, 'email')}
          </p>
          <p>
            <b>Role:</b> {get(profile, 'role') === 'admin' ? 'Admin' : 'Client'}
          </p>
          <p>
            <b>Name:</b> {get(profile, 'firstName')}
          </p>
          <p>
            <b>Created At:</b> {get(profile, 'createdAt')}
          </p>
          <p>
            <b>Updated At:</b> {get(profile, 'updatedAt')}
          </p>
          <p>
            <b>Accepts Marketing:</b>{' '}
            <Checkbox
              checked={acceptsMarketing}
              onChange={() => setAcceptsMarketing(!acceptsMarketing)}
            />
          </p>
          <Button type="submit">Save Settings</Button>
        </form>
      </Container>
    </MainLayout>
  );
};
