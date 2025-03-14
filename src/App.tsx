import { css } from "solid-styled-components";

const classes = {
  main: css`
  min-width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  `,
  topbar: css`
  min-height: 2.5rem;
  background-color: black;
  flex: 0;
  flex-direction: row;
  `,
};

function App() {
  return (
    <div class={classes.main}>
      <div class={classes.topbar}>
        this is the top bar!!
      </div>
    </div>
  );
}

export default App;
