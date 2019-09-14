import React from 'react';

import MainLayout from 'layouts/main-layout';
import Container from 'components/container';
import PageTitle from 'components/page-title';

export default () => {
  return (
    <MainLayout>
      <Container>
        <PageTitle title="Permissions" />
      </Container>
    </MainLayout>
  );
};
