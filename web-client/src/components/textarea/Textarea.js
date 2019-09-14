import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const TextareaElement = styled.textarea``;

function Textarea({ rows = 4, placeholder, ...remainingProps }) {
  return <TextareaElement placeholder={placeholder} rows={rows} {...remainingProps} />;
}

Textarea.propTypes = {
  rows: PropTypes.number,
  placeholder: PropTypes.string,
};

export default Textarea;
