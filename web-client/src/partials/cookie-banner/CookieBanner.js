import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Cookies from 'js-cookie';

import { USER_ACCEPTS_COOKIES } from 'config/cookieTypes';
import Button from 'components/button';
import theme from 'theme';

const WrapperDiv = styled.div`
  color: ${theme.colors.black};
  position: fixed;
  padding: 2rem;
  bottom: 2rem;
  right: 2rem;
  background: ${theme.colors.darkRed1};
  width: 70vw;
  max-width: 700px;
  z-index: ${theme.layers.cookieBanner};
  transition: transform 0.5s ease-in-out;

  p {
    text-align: justify;
    font-size: 1.4rem;
    line-height: 1.5;
  }
`;

const CloseButton = styled(Button)`
  margin-top: 1rem;
  font-weight: bold;
  background: transparent;
  padding: 0;
  border: 0;
  font-size: 1.4rem;
`;

const CookieBanner = ({ ...remainingProps }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    Cookies.set(USER_ACCEPTS_COOKIES, true);
  };

  const handleDeny = () => {
    setIsOpen(false);
    Cookies.set(USER_ACCEPTS_COOKIES, false);
  };

  useEffect(() => {
    setTimeout(() => {
      const shouldShow = !Cookies.get(USER_ACCEPTS_COOKIES);

      if (shouldShow) {
        setIsOpen(true);
      }
    }, 5000);
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <WrapperDiv {...remainingProps}>
      <div>
        <p>
          This site uses fundamental cookies to provide you with user session. This cookies are
          technically required and we don't use anything to track. Please check our privacy policy on{' '}
          <a href="/privacy">privacy</a> page.
        </p>
        <CloseButton onClick={handleClose} aria-label="Accept Cookies">
          Accept Cookies
        </CloseButton>
        <CloseButton onClick={handleDeny} aria-label="Reject Cookies">
          Reject Cookies
        </CloseButton>
      </div>
    </WrapperDiv>
  );
};

export default CookieBanner;
