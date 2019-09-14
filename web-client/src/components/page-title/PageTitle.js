import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const H1 = styled.h1`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const PageTitle = ({ title, ...remainingProps }) => {
  return (
    <div {...remainingProps}>
      <H1>{title}</H1>
    </div>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string,
};

export default PageTitle;
