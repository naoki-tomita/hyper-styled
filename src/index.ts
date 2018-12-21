import { h, Component } from "hyperapp";

const alphabets = "abcdefghijklmnopqrstuvwxyz";
function random() {
  return ["", "", "", "", "", ""]
    .map(() => alphabets[Math.round(Math.random() * (alphabets.length - 1))])
    .join("");
}

function addStyle(id: string, styles: string) {
  const el = document.createElement("style");
  el.innerHTML = `*[data-style=${id}] { ${styles} } }`;
  document.body.appendChild(el);
}

export function wrap(name: LegacyElement | Component): Wrap {
  return function(styles: TemplateStringsArray, ...args: any[]): Component {
    const id = random();
    addStyle(id, styles.map((text, i) => `${text}${args[i] || ""}`).join(""));
    return (attr, children) => h(name, { "data-style": id, ...attr }, children);
  };
}

interface Wrap {
  (styles: TemplateStringsArray, ...args: any[]): Component<any>;
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

export const styled = legacyElementKeys.reduce<
  { [key in LegacyElement]: Wrap }
>((result, key) => ((result[key] = wrap(key)), result), {} as any);
