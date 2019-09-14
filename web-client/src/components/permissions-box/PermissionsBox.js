import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { usePermissions } from 'redux/redux-permissions';
import Checkbox from 'components/checkbox';
import Button from 'components/button';

const WrapperDiv = styled.div`
  padding: 2rem;
  background: lightgrey;
  margin-bottom: 1rem;
  border-radius: 1rem;
`;

const RoleTitleH4 = styled.h4`
  margin-bottom: 0.75rem;
`;

const PermissionsBox = ({ role, ...remainingProps }) => {
  const [orders, setOrders] = useState(false);
  const [factory, setFactory] = useState(false);
  const [production, setProduction] = useState(false);
  const [visualization, setVisualization] = useState(false);
  const [profile, setProfile] = useState(false);

  const { permissions, loadPermissions, updatePermission, isLoading } = usePermissions();

  const permissionsForCurrentRole = permissions[role] || {};

  useEffect(() => {
    loadPermissions();
    setOrders(permissionsForCurrentRole.orders);
    setFactory(permissionsForCurrentRole.factory);
    setProduction(permissionsForCurrentRole.production);
    setVisualization(permissionsForCurrentRole.visualization);
    setProfile(permissionsForCurrentRole.profile);
  }, [
    loadPermissions,
    permissionsForCurrentRole.factory,
    permissionsForCurrentRole.orders,
    permissionsForCurrentRole.production,
    permissionsForCurrentRole.profile,
    permissionsForCurrentRole.visualization,
  ]);

  const handleSubmit = async () => {
    await updatePermission(role, {
      orders,
      factory,
      production,
      visualization,
      profile,
    });
  };

  const isDisabled = role === 'admin';

  if (!permissions[role]) {
    return null;
  }

  return (
    <WrapperDiv {...remainingProps}>
      <RoleTitleH4>{role.toUpperCase()}</RoleTitleH4>
      <div>
        <Checkbox checked={orders} disabled={isDisabled} onChange={() => setOrders(!orders)} /> Orders
      </div>
      <div>
        <Checkbox checked={factory} disabled={isDisabled} onChange={() => setFactory(!factory)} />{' '}
        Factory
      </div>
      <div>
        <Checkbox
          checked={production}
          disabled={isDisabled}
          onChange={() => setProduction(!production)}
        />{' '}
        Production
      </div>
      <div>
        <Checkbox
          checked={visualization}
          disabled={isDisabled}
          onChange={() => setVisualization(!visualization)}
        />{' '}
        Visualization
      </div>
      <div>
        <Checkbox checked={profile} disabled={isDisabled} onChange={() => setProfile(!profile)} />{' '}
        Profile
      </div>
      <br />
      <Button onClick={handleSubmit} disabled={isDisabled} loading={isLoading}>
        Save Permissions
      </Button>
    </WrapperDiv>
  );
};

PermissionsBox.propTypes = {
  role: PropTypes.string.isRequired,
};

export default PermissionsBox;
