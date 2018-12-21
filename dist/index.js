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
function addStyle(id, styles) {
    var el = document.createElement("style");
    el.innerHTML = "*[data-style=" + id + "] { " + styles + " }";
    document.body.appendChild(el);
}
function wrap(name) {
    return function (styles) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var id = random();
        addStyle(id, styles.map(function (text, i) { return "" + text + (args[i] || ""); }).join(""));
        return function (attr, children) { return hyperapp_1.h(name, __assign({ "data-style": id }, attr), children); };
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