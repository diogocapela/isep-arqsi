import React from 'react';
import styled from '@emotion/styled';

import { PRODUCTION_VISUALIZATION } from 'config/endpoints';
import MainLayout from 'layouts/main-layout';
import Container from 'components/container';
import PageTitle from 'components/page-title';

const IFrame = styled.iframe`
  height: 80vh;
  width: 100%;
`;

export default () => {
  return (
    <MainLayout>
      <Container>
        <PageTitle title="Production Visualization" />
        <IFrame src={PRODUCTION_VISUALIZATION} frameBorder="0" />
      </Container>
    </MainLayout>
  );
};
