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

type AttributeFactory<State> = (state: State) => string | number;
type WrapArgument<State> = string | number | AttributeFactory<State>;
function get<T>(arg: WrapArgument<T>, state: T) {
  if (typeof arg === "string" || typeof arg === "number") {
    return arg;
  } else if (typeof arg === "undefined") {
    return "";
  }
  return arg(state);
}

function buildStyleString(
  id: string,
  header: string | undefined,
  body: string,
) {
  return `*[data-style*=${id}]${header || ""} { ${body} } `;
}

function toStyleString(
  id: string,
  state: any,
  templates: TemplateStringsArray,
  ...args: WrapArgument<any>[]
) {
  const dst: string[] = [];
  let builtStyle = templates
    .map((text, i) => `${text}${get(args[i], state)}`)
    .join("");
  const regex = /&(.+)\{([^\{\}]+)\}/;
  let result: RegExpMatchArray | null = null;
  while ((result = builtStyle.match(regex))) {
    builtStyle = builtStyle.replace(regex, "");
    dst.push(buildStyleString(id, result[1].trim(), result[2].trim()));
  }
  dst.unshift(buildStyleString(id, undefined, builtStyle.trim()));
  return dst.join("\n");
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
  const style = Object.keys(styles)
    .map(key => styles[key])
    .join("\n")
    .trim();
  styleEl.innerHTML != style && (styleEl.innerHTML = style);
}

function isWrapped(el: any): el is WrappedComponent<any, any, any> {
  return !!el.wrapped;
}

interface WrappedComponent<T, S, V> extends Component<T, S, V> {
  wrapped: boolean;
}

export function wrap<Attributes>(
  name: Tag | Component<Attributes, any, any>,
): Wrap<Attributes> {
  return function(
    styles: TemplateStringsArray,
    ...args: WrapArgument<Attributes>[]
  ): Component<Attributes, any, any> {
    const id = random();
    const wrapped: Component<Attributes, any, any> = (attr: any, children) => (
      updateStyle(id, attr, styles, ...args),
      typeof name === "string" || isWrapped(name) ? (
        h<Attributes>(
          name,
          { ...attr, "data-style": `${attr["data-style"] || ""} ${id}`.trim() },
          children,
        )
      ) : (
        <div data-style={`${attr["data-style"] || ""} ${id}`.trim()}>
          {h<Attributes>(name, attr, children)}
        </div>
      )
    );
    (wrapped as any).wrapped = true;
    return wrapped;
  };
}

interface Wrap<T> {
  (styles: TemplateStringsArray, ...args: AttributeFactory<T>[]): Component<T>;
}

type Tag = keyof Tags;
const legacyElementKeys: Tag[] = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
];

interface Tags {
  a<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLAnchorElement>>;
  abbr<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  address<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  area<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLAreaElement>>;
  article<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  aside<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  audio<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLAudioElement>>;
  b<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  base<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLBaseElement>>;
  bdi<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  bdo<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  big<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  blockquote<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  body<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLBodyElement>>;
  br<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLBRElement>>;
  button<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLButtonElement>>;
  canvas<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLCanvasElement>>;
  caption<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  cite<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  code<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  col<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLTableColElement>>;
  colgroup<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLTableColElement>>;
  data<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  datalist<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLDataListElement>>;
  dd<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  del<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  details<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  dfn<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  dialog<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLDialogElement>>;
  div<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLDivElement>>;
  dl<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLDListElement>>;
  dt<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  em<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  embed<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLEmbedElement>>;
  fieldset<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLFieldSetElement>>;
  figcaption<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  figure<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  footer<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  form<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLFormElement>>;
  h1<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLHeadingElement>>;
  h2<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLHeadingElement>>;
  h3<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLHeadingElement>>;
  h4<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLHeadingElement>>;
  h5<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLHeadingElement>>;
  h6<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLHeadingElement>>;
  head<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  header<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  hgroup<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  hr<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLHRElement>>;
  html<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLHtmlElement>>;
  i<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  iframe<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLIFrameElement>>;
  img<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLImageElement>>;
  input<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLInputElement>>;
  ins<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLModElement>>;
  kbd<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  keygen<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  label<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLLabelElement>>;
  legend<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLLegendElement>>;
  li<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLLIElement>>;
  link<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLLinkElement>>;
  main<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  map<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLMapElement>>;
  mark<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  menu<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  menuitem<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  meta<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLMetaElement>>;
  meter<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  nav<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  noscript<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  object<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLObjectElement>>;
  ol<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLOListElement>>;
  optgroup<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLOptGroupElement>>;
  option<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLOptionElement>>;
  output<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  p<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLParagraphElement>>;
  param<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLParamElement>>;
  picture<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  pre<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLPreElement>>;
  progress<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLProgressElement>>;
  q<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLQuoteElement>>;
  rp<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  rt<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  ruby<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  s<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  samp<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  script<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLScriptElement>>;
  section<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  select<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLSelectElement>>;
  small<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  source<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLSourceElement>>;
  span<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLSpanElement>>;
  strong<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  style<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLStyleElement>>;
  sub<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  summary<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  sup<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  table<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLTableElement>>;
  tbody<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLTableSectionElement>>;
  td<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLTableDataCellElement>>;
  textarea<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLTextAreaElement>>;
  tfoot<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLTableSectionElement>>;
  th<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLTableHeaderCellElement>>;
  thead<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLTableSectionElement>>;
  time<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  title<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLTitleElement>>;
  tr<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLTableRowElement>>;
  track<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLTrackElement>>;
  u<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  ul<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLUListElement>>;
  var<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
  video<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLVideoElement>>;
  wbr<T>(
    styles: TemplateStringsArray,
    ...args: AttributeFactory<T>[]
  ): Component<T & Partial<HTMLElement>>;
}

export const styled: Tags = legacyElementKeys.reduce<Tags>(
  (result: any, key) => ((result[key] = wrap(key)), result),
  {} as any,
);
