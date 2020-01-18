"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Dynamic = /** @class */ (function () {
    function Dynamic() {
    }
    Dynamic.put = function (input, path, value) {
        var head = path[0], tail = path.slice(1);
        if (tail.length === 0) {
            return __assign({}, input, (_a = {}, _a[head] = value, _a));
        }
        var child = input[head] || {};
        if (typeof child !== 'object')
            child = {};
        return __assign({}, input, (_b = {}, _b[head] = Dynamic.put(child, tail, value), _b));
        var _a, _b;
    };
    Dynamic.delete = function (input, path) {
        var head = path[0], tail = path.slice(1);
        if (tail.length === 0) {
            var _a = head, deleted = input[_a], rest = __rest(input, [typeof _a === "symbol" ? _a : _a + ""]);
            return __assign({}, rest);
        }
        var child = input[head];
        if (child == null || typeof child !== 'object')
            return input;
        return __assign({}, input, (_b = {}, _b[head] = Dynamic.delete(child, tail), _b));
        var _b;
    };
    Dynamic.get = function (input, path) {
        var head = path[0], tail = path.slice(1);
        if (head == null)
            return input;
        var child = input[head];
        if (child == null)
            return undefined;
        return Dynamic.get(child, tail);
    };
    Dynamic.get_values = function (input, path) {
        return Object.values(Dynamic.get(input, path) || {});
    };
    Dynamic.get_keys = function (input, path) {
        return Object.keys(Dynamic.get(input, path) || {});
    };
    Dynamic.get_pattern = function (input, path, left) {
        if (left === void 0) { left = []; }
        if (input == null)
            return [];
        var head = path[0], tail = path.slice(1);
        if (head == null)
            return [{
                    path: left,
                    value: input,
                }];
        var children = head === '+' ? Object.entries(input || {}) : [[head, input[head]]];
        return children
            .filter(function (item) { return item != null; })
            .reduce(function (collect, _a) {
            var key = _a[0], child = _a[1];
            return collect.concat(Dynamic.get_pattern(child, tail, left.concat([key])));
        }, []);
    };
    Dynamic.flatten = function (input, path) {
        if (path === void 0) { path = new Array(); }
        return Object
            .keys(input)
            .reduce(function (collect, key) {
            var value = input[key];
            var next = path.concat([key]);
            if (value instanceof Object) {
                if (Object.keys(value).length > 0)
                    return Dynamic.flatten(value, next).concat(collect);
                return collect;
            }
            return [{
                    path: next,
                    value: value,
                }].concat(collect);
        }, new Array());
    };
    Dynamic.layers = function (input, path) {
        if (path === void 0) { path = new Array(); }
        switch (input instanceof Object) {
            case false:
                return [];
            case true:
                return Object
                    .keys(input)
                    .reduce(function (collect, key) {
                    var value = input[key];
                    return collect.concat(Dynamic.layers(value, path.concat([key])));
                }, [
                    {
                        path: path,
                        value: input,
                    }
                ]);
        }
    };
    return Dynamic;
}());
exports.default = Dynamic;
//# sourceMappingURL=dynamic.js.map