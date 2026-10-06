import { jsxs as n, jsx as r } from "react/jsx-runtime";
import { c as i } from "./vendor-utils-TYjSchlL.js";
import { a as c } from "./Typography-FIwI70kG.js";
const d = "_root_53qo5_1", p = "_textContainer_53qo5_8", v = "_inverse_53qo5_16", x = "_description_53qo5_20", o = {
  root: d,
  textContainer: p,
  inverse: v,
  description: x
}, N = ({
  className: a,
  description: t,
  inverse: _,
  prefix: e,
  suffix: s,
  title: l,
  ...m
}) => /* @__PURE__ */ n("div", { className: i(o.root, a), ...m, children: [
  !!e && e,
  /* @__PURE__ */ n("div", { className: i(o.textContainer, { [o.inverse]: _ }), children: [
    /* @__PURE__ */ r(c, { size: "lg", children: l }),
    !!t && /* @__PURE__ */ r(c, { tooltip: !0, size: "sm", className: o.description, children: t })
  ] }),
  !!s && s
] });
export {
  N as I
};
//# sourceMappingURL=InfoDisplay-D_Jc3SR7.js.map
