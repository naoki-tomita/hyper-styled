"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var hyperapp_1 = require("hyperapp");
var alphabets = "abcdefghijklmnopqrstuvwxyz";
function random() {
    return ["", "", "", "", "", ""]
        .map(function () { return alphabets[Math.round(Math.random() * (alphabets.length - 1))]; })
        .join("");
}
var styles = {};
var styleEl = document.createElement("style");
document.body.appendChild(styleEl);
function get(arg, state) {
    if (typeof arg === "string" || typeof arg === "number") {
        return arg;
    }
    else if (typeof arg === "undefined") {
        return "";
    }
    return arg(state);
}
function toStyleString(id, state, templates) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    return " *[data-style=" + id + "] { " + templates
        .map(function (text, i) { return "" + text + get(args[i], state); })
        .join("") + " }";
}
function updateStyle(id, state, templates) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    styles[id] = toStyleString.apply(void 0, [id, state, templates].concat(args));
    renderStyle();
}
function renderStyle() {
    styleEl.innerHTML = Object.keys(styles)
        .map(function (key) { return styles[key]; })
        .join("");
}
function wrap(name) {
    return function (styles) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var id = random();
        return function (attr, children) { return (updateStyle.apply(void 0, [id, attr, styles].concat(args)),
            hyperapp_1.h(name, __assign({ "data-style": id }, attr), children)); };
    };
}
exports.wrap = wrap;
var legacyElementKeys = [
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
exports.styled = legacyElementKeys.reduce(function (result, key) { return ((result[key] = wrap(key)), result); }, {});
//# sourceMappingURL=index.js.map