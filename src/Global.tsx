import { Accessor, Setter } from "solid-js";
import { IVec } from "./util";


export namespace DeviceWidth {
  export type String = 'tiny' | 'small' | 'medium' | 'large';
}

export type GlobalData = {
  windowSize: Accessor<IVec>,
  deviceWidth: Accessor<DeviceWidth.String>,
  isScreenSmall: Accessor<boolean>,
  apiKey: Accessor<string>,
  setApiKey: Setter<string>,
  theme: object,
};

