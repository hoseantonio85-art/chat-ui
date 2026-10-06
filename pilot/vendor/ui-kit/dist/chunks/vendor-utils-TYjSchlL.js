import { g as p } from "./vendor-dayjs-0m2goXY-.js";
var a = { exports: {} };
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
var l;
function c() {
  return l || (l = 1, function(i) {
    (function() {
      var u = {}.hasOwnProperty;
      function t() {
        for (var e = [], r = 0; r < arguments.length; r++) {
          var s = arguments[r];
          if (s) {
            var n = typeof s;
            if (n === "string" || n === "number")
              e.push(s);
            else if (Array.isArray(s)) {
              if (s.length) {
                var f = t.apply(null, s);
                f && e.push(f);
              }
            } else if (n === "object")
              if (s.toString === Object.prototype.toString)
                for (var o in s)
                  u.call(s, o) && s[o] && e.push(o);
              else
                e.push(s.toString());
          }
        }
        return e.join(" ");
      }
      i.exports ? (t.default = t, i.exports = t) : window.classNames = t;
    })();
  }(a)), a.exports;
}
var m = c();
const h = /* @__PURE__ */ p(m);
export {
  h as c
};
//# sourceMappingURL=vendor-utils-TYjSchlL.js.map
