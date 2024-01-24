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

let windowSize = useWindowSize();
windowSize.subscribe((size) => {
  console.log("windowSize:", size.unwrap);
}, true);

let prefferedColorScheme = usePrefferedColorScheme();
prefferedColorScheme.subscribe((scheme) => {
  console.log("prefferedColorScheme:", scheme.unwrap);
}, true);
