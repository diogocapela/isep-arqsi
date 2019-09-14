import { css } from '@emotion/core';

import theme from '../';

export default css`
  ::selection {
    color: ${theme.colors.white};
    background: ${theme.colors.black};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    font-family: ${theme.fonts.sans};
  }

  img,
  svg {
    max-width: 100%;
    vertical-align: middle;
  }

  iframe,
  video,
  object {
    max-width: 100%;
  }

  a,
  button,
  select {
    cursor: pointer;
  }

  ul,
  ol,
  li {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  textarea {
    resize: none;
  }

  div,
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
`;
