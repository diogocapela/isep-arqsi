import React from 'react';
import styled from '@emotion/styled';

const Input = styled.input`
  width: auto;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Checkbox = props => {
  return <Input type="checkbox" {...props} />;
};

Checkbox.propTypes = {};

export default Checkbox;
