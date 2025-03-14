/* @refresh reload */
import { render } from 'solid-js/web';
import App from './App.tsx';
import { createGlobalStyles } from 'solid-styled-components';

const GlobalStyle = createGlobalStyles`
:root {
  color: rgba(255, 255, 255, 0.87);
  background-color: #222;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  color-scheme: dark;
  font-family: "Roboto", sans-serif;
  line-height: 1.5;
  font-weight: 400;
}

/* Disable overscroll bouncing in all browsers */
html,
body {
  overscroll-behavior: none;
  -webkit-overflow-scrolling: auto;
  /* For iOS devices */
}

#root,
body {
  margin: 0;
  padding: 0;
  min-width: 100%;
  min-height: 100vh;
}
`;

const root = document.getElementById('root');

render(() =>
  <>
    <GlobalStyle />
    <App />
  </>,
  root!);
