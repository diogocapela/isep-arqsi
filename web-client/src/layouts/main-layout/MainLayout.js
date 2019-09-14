import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Navbar from 'partials/navbar';
import Footer from 'partials/footer';
import CookieBanner from 'partials/cookie-banner';

const WrapperDiv = styled.div``;

const MainLayout = ({ children, ...remainingProps }) => {
  return (
    <WrapperDiv {...remainingProps}>
      <Navbar />
      {children}
      <Footer />
      <CookieBanner />
    </WrapperDiv>
  );
};

MainLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default MainLayout;
