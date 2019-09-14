import React from 'react';
import PropTypes from 'prop-types';
import { Link as NativeLink } from 'react-router-dom';
import noop from 'lodash/noop';

const Link = ({
  children,
  as,
  to,
  title,
  onClick = noop,
  target = '_self',
  keep = false,
  ...remainingProps
}) => {
  const isExternal = !to || to.startsWith('tel') || to.startsWith('mailto') || to.startsWith('http');

  const handleClick = () => {
    if (!keep && !isExternal) {
      window && window.scrollTo(0, 0);
    }

    onClick();
  };

  return isExternal ? (
    <a
      aria-label={title}
      as={as}
      title={title}
      href={to}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : ''}
      onClick={handleClick}
      {...remainingProps}
    >
      {children}
    </a>
  ) : (
    <NativeLink
      as={as}
      to={to}
      aria-label={title}
      title={title}
      onClick={handleClick}
      {...remainingProps}
    >
      {children}
    </NativeLink>
  );
};

Link.propTypes = {
  children: PropTypes.any,
  as: PropTypes.any,
  to: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  target: PropTypes.string,
  keep: PropTypes.bool,
};

export default Link;
