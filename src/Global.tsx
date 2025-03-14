import { Accessor, createContext, createEffect, createSignal, JSX, onCleanup, onMount, Setter, useContext } from "solid-js";
import { debounce, IVec } from "./util";

export namespace DeviceWidth {
  export type Value = 'tiny' | 'small' | 'medium' | 'large';
  type Operator = '<' | '>' | '<=' | '>=' | '==' | '!=';
  function valueToNumber(v: Value): number {
    switch (v) {
      case "tiny": return 0;
      case "small": return 1;
      case "medium": return 2;
      default: return 3; // large
    }
  }
  export function compare(v1: Value, op: Operator, v2: Value): boolean {
    const val1 = valueToNumber(v1);
    const val2 = valueToNumber(v2);
    switch (op) {
      case '<': return val1 < val2;
      case '<=': return val1 <= val2;
      case '>': return val1 > val2;
      case '>=': return val1 >= val2;
      case '<': return val1 < val2;
      case '!=': return val1 !== val2;
      default: return val1 === val2;
    }
  }
  /**returns the breakpoint of pixels as a number*/
  export function breakpoint(value: Value): number {
    switch (value) {
      case 'tiny': return 150;
      case 'small': return 350;
      case 'medium': return 550;
      default: return 750;//large
    }
  }
}

export type GlobalData = {
  windowSize: Accessor<IVec>,
  deviceWidth: Accessor<DeviceWidth.Value>,
  isScreenSmall: Accessor<boolean>,
  apiKey: Accessor<string>,
  setApiKey: Setter<string>,
  theme: object,
};

const GlobalContext = createContext<GlobalData>();

interface ChildrenProps extends Pick<JSX.HTMLAttributes<'div'>, 'children'> {}

export function GlobalProvider(props:ChildrenProps): JSX.Element {
const [apiKey, setApiKey] = createSignal("");
  let theme = {};
  const [windowSize, setWindowSize] = createSignal<IVec>({x:0,y:0});
  const [deviceWidth, setDeviceWidth] = createSignal<DeviceWidth.Value>('small');
  const [isScreenSmall, setIsScreenSmall] = createSignal(false);
  const handleResize = debounce(() => {
    const size = {x:0, y:0};
    setWindowSize(size);
    if (size.x < 280) {
      setDeviceWidth('tiny');
    } else if (size.x < 450) {
      setDeviceWidth('small');
    } else if (size.x< 720) {
      setDeviceWidth('medium');
    } else {
      setDeviceWidth('large');
    }
    setIsScreenSmall(deviceWidth() === 'small' || deviceWidth() === 'tiny');
  }, 100);

  const value: GlobalData = {
    windowSize,
    deviceWidth, theme, isScreenSmall,
    apiKey, setApiKey,
  };

  createEffect(() => {
    const thing = apiKey();
    if (thing !== '') {
      localStorage.setItem("apikey", thing);
    }
  });

  onMount(() => {
    setApiKey(localStorage.getItem("apikey") ?? "");
    window.addEventListener('resize', handleResize);
    handleResize();
  });

  onCleanup(() => {
    window.removeEventListener('resize', handleResize);
  });

  return (
    <GlobalContext.Provider
    value={value} >
      {props.children}
    </GlobalContext.Provider>
  );
}

export function useGlobal(): GlobalData {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error("useGlobal() must be a child of a GlobalProvider")
  return ctx;
}
