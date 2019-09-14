import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Navbar from 'partials/navbar';
import Container from 'components/container';

const WrapperDiv = styled.div``;

const StyledContainer = styled(Container)`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AuthLayout = ({ children, ...remainingProps }) => {
  return (
    <WrapperDiv {...remainingProps}>
      <Navbar />
      <StyledContainer>{children}</StyledContainer>
    </WrapperDiv>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default AuthLayout;
