/* @refresh reload */
import { render } from 'solid-js/web';
import App from './App.tsx';
import { createGlobalStyles } from 'solid-styled-components';
import { GlobalProvider } from './Global.tsx';

const GlobalStyle = createGlobalStyles`
:root {
  color: rgba(255, 255, 255, 0.87);
  background-color: #111;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  color-scheme: dark;
  box-sizing: border-box;
  position: relative;
  font-family: "Roboto", sans-serif;
  line-height: 1.5;
  font-weight: 400;
  scrollbar-width: thin;
  scrollbar-color: #555 transparent;
}

::selection {
  background-color: #aaa;
  color: #111;
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
body {
  overflow-y: scroll;
  box-sizing: border-box;
  border-right: 1px solid #555;
  border-left: 1px solid #555;
}
`;

const root = document.getElementById('root');

render(() =>
  <GlobalProvider>
    <GlobalStyle />
    <App />
  </GlobalProvider>,
  root!);
