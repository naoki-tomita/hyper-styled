import { h, Component } from "hyperapp";

const alphabets = "abcdefghijklmnopqrstuvwxyz";
function random() {
  return ["", "", "", "", "", ""]
    .map(() => alphabets[Math.round(Math.random() * (alphabets.length - 1))])
    .join("");
}

const styles: { [key: string]: string } = {};
const styleEl = document.createElement("style");
document.body.appendChild(styleEl);

type WrapArgument<State> =
  | string
  | number
  | ((state: State) => string | number);
function get<T>(arg: WrapArgument<T>, state: T) {
  if (typeof arg === "string" || typeof arg === "number") {
    return arg;
  } else if (typeof arg === "undefined") {
    return "";
  }
  return arg(state);
}

function toStyleString(
  id: string,
  state: any,
  templates: TemplateStringsArray,
  ...args: WrapArgument<any>[]
) {
  return ` *[data-style=${id}] { ${templates
    .map((text, i) => `${text}${get(args[i], state)}`)
    .join("")} }`;
}

function updateStyle(
  id: string,
  state: any,
  templates: TemplateStringsArray,
  ...args: WrapArgument<any>[]
) {
  styles[id] = toStyleString(id, state, templates, ...args);
  renderStyle();
}

function renderStyle() {
  styleEl.innerHTML = Object.keys(styles)
    .map(key => styles[key])
    .join("");
}

export function wrap<State>(
  name: LegacyElement | Component<State>,
): Wrap<State> {
  return function(
    styles: TemplateStringsArray,
    ...args: WrapArgument<State>[]
  ): Component<State> {
    const id = random();
    return (attr, children) => (
      updateStyle(id, attr, styles, ...args),
      h<State>(name, { "data-style": id, ...attr }, children)
    );
  };
}

interface Wrap<T> {
  (styles: TemplateStringsArray, ...args: any[]): Component<T>;
}

type LegacyElement =
  | "div"
  | "span"
  | "a"
  | "textarea"
  | "input"
  | "button"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "ul"
  | "li";
const legacyElementKeys: LegacyElement[] = [
  "div",
  "span",
  "a",
  "textarea",
  "input",
  "button",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "li",
];

type Styled = { [key in LegacyElement]: Wrap<any> };

export const styled: Styled = legacyElementKeys.reduce<Styled>(
  (result, key) => ((result[key] = wrap(key)), result),
  {} as any,
);
