import { createGlobalStyle } from "styled-components";

const styled = { createGlobalStyle };

export const GlobalStyle = styled.createGlobalStyle`
  :root {
    --padding-width: 3em;
    --carousel-gap: 0.2vw;
    --carousel-padding: 60px;
    --arrow-color: rgba(255, 255, 255, 0.6);
    --border-radius: 4px;
    --title-height: 2.8em;
    --title-margin: 0.5em;
    --scroll-width: 16px;
    @media (max-width: 1500px) {
      --carousel-padding: 4%;
    }
    --preview-scale: 140%;
    --point-green: #00ffa3;
  }
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
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
  body {
    background-color: ${(props) => props.theme.background.primary};
    line-height: 1;
    overflow-x: hidden;
    font-size: 1vw;
    @media (max-width: 1400px) {
      font-size: 1.2vw;
    }
    @media (max-width: 1100px) {
      font-size: 1.4vw;
    }
    &.modal-open {
      overflow: hidden;
      padding-right: var(--scroll-width);
    }
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
    user-select: none;
    &::-webkit-scrollbar {
      width: var(--scroll-width);
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.scrollBar.scrollThumb};
      border-radius: 20px;
      background-clip: padding-box;
      border: 4px solid rgba(0, 0, 0, 0);
    }
    &::-webkit-scrollbar-track {
      padding: 5px;
      background-color: ${(props) => props.theme.scrollBar.scrollTrack};
    }
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }
`;
