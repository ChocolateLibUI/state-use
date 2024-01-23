import { Ok } from "@chocolatelib/result";
import {
  State,
  StateDerived,
  StateRead,
  StateResult,
} from "@chocolatelib/state";

export * from "./math";

export function useActiveElement(
  doc: Document = document
): State<Element | null> {
  if ("%_%activeElement%_%" in doc) {
    return doc["%_%activeElement%_%"] as State<Element | null>;
  } else {
    let state = new State(Ok(doc.activeElement));
    doc.addEventListener("focusin", () => {
      state.set(Ok(doc.activeElement));
    });
    // @ts-expect-error
    doc["%_%activeElement%_%"] = state;
    return state;
  }
}

export function useWindowSize(
  win: Window = window
): State<{ width: number; height: number }> {
  if ("%_%windowSize%_%" in win) {
    return win["%_%windowSize%_%"] as State<{ width: number; height: number }>;
  } else {
    let state = new State(
      Ok({
        width: win.innerWidth,
        height: win.innerHeight,
      })
    );
    win.addEventListener("resize", () => {
      state.set(
        Ok({
          width: win.innerWidth,
          height: win.innerHeight,
        })
      );
    });
    // @ts-expect-error
    win["%_%windowSize%_%"] = state;
    return state;
  }
}

let prefferedColorScheme: State<"light" | "dark"> | undefined;
export function usePrefferedColorScheme(): State<"light" | "dark"> {
  if (prefferedColorScheme) {
    return prefferedColorScheme;
  } else {
    prefferedColorScheme = new State(
      Ok(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      )
    );
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event: MediaQueryListEvent) => {
        prefferedColorScheme!.set(Ok(event.matches ? "dark" : "light"));
      });
    return prefferedColorScheme!;
  }
}

export function useMediaQuery(query: string): State<boolean> {
  if (query in window) {
    // @ts-expect-error
    return window["%_%" + query + "%_%"] as State<boolean>;
  } else {
    let state = new State(Ok(window.matchMedia(query).matches));
    window.matchMedia(query).addEventListener("change", (event) => {
      state.set(Ok(event.matches));
    });
    // @ts-expect-error
    window["%_%" + query + "%_%"] = state;
    return state;
  }
}

export class StateObjectKey<
  T extends object,
  K extends keyof T,
  O = T[K]
> extends StateDerived<T, O> {
  constructor(state: StateRead<T>, key: K, func?: (value: T[K]) => O) {
    super(state);
    this.#key = key;
    if (func) this.#func = func;
  }

  #key: K;
  #func?: (value: T[K]) => O;

  protected getter(values: Array<StateResult<T>>): StateResult<O> {
    if (values[0].ok)
      if (this.#func) return Ok(this.#func(values[0].value[this.#key]));
      else return Ok(values[0].value[this.#key] as O);
    else return values[0];
  }
}
