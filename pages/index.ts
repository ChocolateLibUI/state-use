import { Ok } from "@chocolatelib/result";
import {
  StateObjectKey,
  useActiveElement,
  usePrefferedColorScheme,
  useWindowSize,
} from "../src/index";
import { State } from "@chocolatelib/state";

document.body.appendChild(document.createElement("input"));
document.body.appendChild(document.createElement("input"));

let activeElement = useActiveElement();
activeElement.subscribe((element) => {
  console.log("activeElement:", element);
});
console.log(await activeElement);

window.addEventListener("focus", () => {
  console.log("focus");
});
window.addEventListener("blur", () => {
  console.log("blur");
});

let windowSize = useWindowSize();
windowSize.subscribe((size) => {
  console.log("windowSize:", size.unwrap);
}, true);

let prefferedColorScheme = usePrefferedColorScheme();
prefferedColorScheme.subscribe((scheme) => {
  console.log("prefferedColorScheme:", scheme.unwrap);
}, true);

let objectState = new State(Ok({ a: 1, b: 2 }));
let objectKeyState = new StateObjectKey(objectState, "a");
objectKeyState.subscribe((value) => {
  console.log("objectKeyState:", value.unwrap);
}, true);
objectState.set(Ok({ a: 3, b: 4 }));
