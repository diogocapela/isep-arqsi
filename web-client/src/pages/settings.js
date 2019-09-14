import React from 'react';

import MainLayout from 'layouts/main-layout';
import Container from 'components/container';
import PageTitle from 'components/page-title';
import PermissionsBox from 'components/permissions-box';

const ROLES = ['admin', 'gestor', 'client'];

export default () => {
  return (
    <MainLayout>
      <Container>
        <PageTitle title="Settings" />
        {ROLES.map(role => (
          <PermissionsBox role={role} key={role} />
        ))}
      </Container>
    </MainLayout>
  );
};
