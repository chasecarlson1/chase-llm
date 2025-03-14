import { JSX } from "solid-js";

export namespace Maths {
  export function clamp(value: number, min: number, max: number): number {
    if (value < min) return min;
    else if (value > max) return max;
    else return value;
  }
  export function max(x: number, y: number): number {
    return x > y ? x : y;
  }
  export function min(x: number, y: number): number {
    return x < y ? x : y;
  }
  /**
   * Generates a random number between two numbers, exclusive of the maximum.
   * @param min the minimum number
   * @param max the maximum number, exclusive
   * @returns a random number between the `min` and `max`, not inclusive of `max`
   * @example ```
   * let randomFloat = Maths.randf(5, 20);
   * // could be 19.9999999, but not 20.
   * ```
   * @see {@link randi} <- an integer version of this
   */
  export function randf(min: number, max: number): number {
    return (max - min) * Math.random() + min;
  }
  /**
   * Generates a random number between two numbers, exclusive of the maximum.
   * @param min the minimum number
   * @param max the maximum number, exclusive
   * @returns a random number between the `min` and `max`, not inclusive of `max`
   * @example ```
   * let randomInteger = Maths.randi(5, 20);
   * // could be 19, but not 20.
   * ```
   * @see {@link randf} <- a float/decimal version of this
   */
  export function randi(min: number, max: number): number {
    return Math.floor((max - min) * Math.random() + min);
  }
}

export namespace Strings {
  export function parseNumber(str: string, fallback: number): number {
    try {
      let n = parseFloat(str);
      if (isNaN(n)) {
        return fallback;
      } else {
        return n;
      }
    } catch (e) {
      return fallback;
    }
  }
}
export type DebouncedFunc = (...args: any[]) => void;
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let isLocked = false;

  return function (...args: Parameters<T>): void {
    if (isLocked) {
      return; // Ignore calls while locked
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    isLocked = true;
    timeoutId = setTimeout(() => {
      func(...args);
      isLocked = false; // Unlock after executing the function
    }, wait);
  };
}
export type ElementFunc<TProps> = (props: TProps) => JSX.Element;
export interface Tag<T extends string> {
  readonly tag: T;
};
export type ButtonHandler = JSX.EventHandler<HTMLButtonElement, MouseEvent>;
export type MouseUnion<T extends HTMLElement> = JSX.EventHandlerUnion<T, MouseEvent, JSX.EventHandler<T, MouseEvent>> | undefined;
export type MouseHandler<T extends HTMLElement> = JSX.EventHandler<T, MouseEvent>;
export type EventHandler<T extends HTMLElement, E extends Event> = JSX.EventHandler<T, E>;
export function tryHandlingEvent<T extends HTMLElement>(fn: MouseUnion<T>, ev: MouseEvent): void {
  try {
    if (fn !== undefined) {
      (fn as any)(ev);
    }
  } catch (e) {
    console.log(`handleExisting failed with fn '${fn}' and event '${ev}', producing error '${e}'`);
  }
}

/**a type that has a `x` and `y` number properties*/
export interface IVec {x: number, y: number};
