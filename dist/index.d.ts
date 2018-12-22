import { Component } from "hyperapp";
export declare function wrap<State>(name: LegacyElement | Component<State>): Wrap<State>;
interface Wrap<T> {
    (styles: TemplateStringsArray, ...args: any[]): Component<T>;
}
declare type LegacyElement = "div" | "span" | "a" | "textarea" | "input" | "button" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "ul" | "li";
declare type Styled = {
    [key in LegacyElement]: Wrap<any>;
};
export declare const styled: Styled;
export {};
//# sourceMappingURL=index.d.ts.map