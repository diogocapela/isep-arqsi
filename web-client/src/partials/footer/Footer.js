import React from 'react';
import styled from '@emotion/styled';

import { usePermissions } from 'redux/redux-permissions';
import { useAuth } from 'redux/redux-auth';
import Container from 'components/container';
import Link from 'components/link';
import theme from 'theme';

const WrapperFooter = styled.footer`
  margin-top: 2rem;
  border-top: 1px solid black;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const StyledContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1rem;

  ${theme.medias.small} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${theme.medias.medium} {
    grid-template-columns: repeat(4, 1fr);
  }

  ${theme.medias.large} {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const Div = styled.div`
  text-align: left;
`;

const StyledLink = styled(Link)`
  display: table;
  text-decoration: none;
  font-size: 1rem;
  color: tomato;

  &:hover {
    color: black;
  }
`;

const H6 = styled.h6`
  font-size: 1rem;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const Footer = ({ ...remainingProps }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const {
    canViewOrders,
    canViewFactory,
    canViewProduction,
    canViewVisualization,
    canViewProfile,
  } = usePermissions();

  return (
    <WrapperFooter {...remainingProps}>
      <StyledContainer>
        <Div>
          <H6>General</H6>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/privacy">Privacy</StyledLink>
        </Div>
        {(!isAuthenticated || canViewProfile || isAdmin) && (
          <Div>
            <H6>Account</H6>
            {!isAuthenticated && (
              <>
                <StyledLink to="/auth/register">Register</StyledLink>
                <StyledLink to="/auth/login">Login</StyledLink>
              </>
            )}
            {canViewProfile && <StyledLink to="/profile">Profile</StyledLink>}
            {isAdmin && (
              <>
                <StyledLink to="/users">Users</StyledLink>
                <StyledLink to="/settings">Settings</StyledLink>
              </>
            )}
          </Div>
        )}
        {canViewFactory && (
          <Div>
            <H6>Factory</H6>
            <StyledLink to="/factory/tools">Tools</StyledLink>
            <StyledLink to="/factory/operations">Operations</StyledLink>
            <StyledLink to="/factory/machine-types">Machine Types</StyledLink>
            <StyledLink to="/factory/machines">Machines</StyledLink>
            <StyledLink to="/factory/production-lines">Production Lines</StyledLink>
          </Div>
        )}
        {canViewProduction && (
          <Div>
            <H6>Production</H6>
            <StyledLink to="/production/manufacturing-plans">Manufacturing Plans</StyledLink>
            <StyledLink to="/production/products">Products</StyledLink>
          </Div>
        )}
        {canViewOrders && (
          <Div>
            <H6>Orders</H6>
            <StyledLink to="/orders">Orders</StyledLink>
          </Div>
        )}
        {canViewVisualization && (
          <Div>
            <H6>Visualization</H6>
            <StyledLink to="/visualization/factory">Factory Visualization</StyledLink>
            <StyledLink to="/visualization/production">Production Visualization</StyledLink>
          </Div>
        )}
      </StyledContainer>
    </WrapperFooter>
  );
};

export default Footer;
