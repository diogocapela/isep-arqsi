import React from 'react';
import styled from '@emotion/styled';

const WrapperDiv = styled.div``;

const Loading = ({ ...remainingProps }) => {
  return <WrapperDiv {...remainingProps}>Loading...</WrapperDiv>;
};

export default Loading;
