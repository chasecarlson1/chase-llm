import { css } from "solid-styled-components";
import { useGlobal } from "./Global";
import { createEffect } from "solid-js";

const classes = {
  main: css`
  min-width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  `,
  topbar: css`
  z-index: 100;
  position: sticky;
  text-align: center;
  border-bottom: 1px solid #555;
  top: 0%;
  left: 0%;
  right: 0%;
  bottom: 2.5rem;
  min-height: 2.5rem;
  background-color: #111;
  flex: 0;
  flex-direction: row;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  `,
};

function App() {
  const global = useGlobal();

  createEffect(() => {
    console.log(global.windowSize());
  });
  return (
    <div class={classes.main}>
      <div class={classes.topbar} style={{
      }}>
        this is the top bar!!
      </div>
    </div>
  );
}

export default App;
