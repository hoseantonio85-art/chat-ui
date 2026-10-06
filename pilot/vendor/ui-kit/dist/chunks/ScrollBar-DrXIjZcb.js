import { jsx as g } from "react/jsx-runtime";
import { c as p } from "./vendor-utils-TYjSchlL.js";
import * as a from "react";
import h from "react";
import { v as d } from "./vendor-other-4r8kKhmH.js";
var i = function() {
  return i = Object.assign || function(r) {
    for (var o, e = 1, c = arguments.length; e < c; e++) {
      o = arguments[e];
      for (var t in o) Object.prototype.hasOwnProperty.call(o, t) && (r[t] = o[t]);
    }
    return r;
  }, i.apply(this, arguments);
};
function E(n, r) {
  var o = {};
  for (var e in n) Object.prototype.hasOwnProperty.call(n, e) && r.indexOf(e) < 0 && (o[e] = n[e]);
  if (n != null && typeof Object.getOwnPropertySymbols == "function")
    for (var c = 0, e = Object.getOwnPropertySymbols(n); c < e.length; c++)
      r.indexOf(e[c]) < 0 && Object.prototype.propertyIsEnumerable.call(n, e[c]) && (o[e[c]] = n[e[c]]);
  return o;
}
var O = a.forwardRef(function(n, r) {
  var o = n.children, e = n.scrollableNodeProps, c = e === void 0 ? {} : e, t = E(n, ["children", "scrollableNodeProps"]), b = a.useRef(), f = a.useRef(), v = a.useRef(), u = {}, _ = {};
  Object.keys(t).forEach(function(s) {
    Object.prototype.hasOwnProperty.call(d.defaultOptions, s) ? u[s] = t[s] : _[s] = t[s];
  });
  var l = i(i({}, d.defaultOptions.classNames), u.classNames), N = i(i({}, c), { className: "".concat(l.contentWrapper).concat(c.className ? " ".concat(c.className) : ""), tabIndex: u.tabIndex || d.defaultOptions.tabIndex, role: "region", "aria-label": u.ariaLabel || d.defaultOptions.ariaLabel });
  return a.useEffect(function() {
    var s;
    return f.current = N.ref ? N.ref.current : f.current, b.current && (s = new d(b.current, i(i(i({}, u), f.current && {
      scrollableNode: f.current
    }), v.current && {
      contentNode: v.current
    })), typeof r == "function" ? r(s) : r && (r.current = s)), function() {
      s?.unMount(), s = null, typeof r == "function" && r(null);
    };
  }, []), a.createElement(
    "div",
    i({ "data-simplebar": "init", ref: b }, _),
    a.createElement(
      "div",
      { className: l.wrapper },
      a.createElement(
        "div",
        { className: l.heightAutoObserverWrapperEl },
        a.createElement("div", { className: l.heightAutoObserverEl })
      ),
      a.createElement(
        "div",
        { className: l.mask },
        a.createElement("div", { className: l.offset }, typeof o == "function" ? o({
          scrollableNodeRef: f,
          scrollableNodeProps: i(i({}, N), { ref: f }),
          contentNodeRef: v,
          contentNodeProps: {
            className: l.contentEl,
            ref: v
          }
        }) : a.createElement(
          "div",
          i({}, N),
          a.createElement("div", { className: l.contentEl }, o)
        ))
      ),
      a.createElement("div", { className: l.placeholder })
    ),
    a.createElement(
      "div",
      { className: "".concat(l.track, " ").concat(l.horizontal) },
      a.createElement("div", { className: l.scrollbar })
    ),
    a.createElement(
      "div",
      { className: "".concat(l.track, " ").concat(l.vertical) },
      a.createElement("div", { className: l.scrollbar })
    )
  );
});
O.displayName = "SimpleBar";
const y = "_dataSimplebarInit_dr1gp_1", k = "_trackContainer_dr1gp_5", C = "_trackVertical_dr1gp_9", P = "_scrollbarContainer_dr1gp_14", R = "_trackHorizontal_dr1gp_18", S = "_contentWrapperContainer_dr1gp_28", j = "_scrollbarHover_dr1gp_39", w = "_scrollbarVisible_dr1gp_42", m = {
  dataSimplebarInit: y,
  trackContainer: k,
  trackVertical: C,
  scrollbarContainer: P,
  trackHorizontal: R,
  contentWrapperContainer: S,
  scrollbarHover: j,
  scrollbarVisible: w
}, I = h.forwardRef(
  ({ children: n, autoHide: r = !0, className: o, ...e }, c) => {
    const t = { ...d.defaultOptions.classNames }, b = {
      scrollbar: p(t.scrollbar, m.scrollbarContainer),
      visible: p(t.visible, m.scrollbarVisible),
      hover: p(t.hover, m.scrollbarHover),
      track: p(t.track, {
        [m.trackContainer]: !r
      }),
      horizontal: p(t.horizontal, {
        [m.trackHorizontal]: !r
      }),
      vertical: p(t.vertical, {
        [m.trackVertical]: !r
      }),
      contentWrapper: p(t.contentWrapper, {
        [m.contentWrapperContainer]: !r
      })
    };
    return /* @__PURE__ */ g(
      O,
      {
        ref: c,
        autoHide: r,
        classNames: b,
        className: p(m.dataSimplebarInit, o),
        ...e,
        children: n
      }
    );
  }
);
I.displayName = "ScrollBar";
export {
  I as S
};
//# sourceMappingURL=ScrollBar-DrXIjZcb.js.map
