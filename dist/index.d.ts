import { Component } from "hyperapp";
export declare function wrap(name: LegacyElement | Component): Wrap;
interface Wrap {
    (styles: TemplateStringsArray, ...args: any[]): Component<any>;
}
declare type LegacyElement = "div" | "span" | "a" | "textarea" | "input" | "button" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "ul" | "li";
export declare const styled: {
    a: Wrap;
    button: Wrap;
    div: Wrap;
    h1: Wrap;
    h2: Wrap;
    h3: Wrap;
    h4: Wrap;
    h5: Wrap;
    h6: Wrap;
    input: Wrap;
    li: Wrap;
    span: Wrap;
    textarea: Wrap;
    ul: Wrap;
};
export {};
//# sourceMappingURL=index.d.ts.map