import { jsx as n } from "react/jsx-runtime";
import { c as r } from "./vendor-utils-TYjSchlL.js";
const c = "_spinner_213jt_1", l = "_rotation_213jt_1", p = "_absolute_213jt_18", e = {
  spinner: c,
  rotation: l,
  absolute: p
}, m = ({
  color: s,
  size: t = 56,
  classes: o,
  absolute: i = !1
}) => {
  const a = /* @__PURE__ */ n(
    "div",
    {
      className: r(e.spinner, o?.spinner),
      style: {
        width: t,
        height: t,
        borderColor: s,
        borderWidth: t / 10
      }
    }
  );
  return /* @__PURE__ */ n("div", { className: r(o?.container, { [e.absolute]: i }), children: a });
};
export {
  m as L
};
//# sourceMappingURL=Loader-DJC9BKfV.js.map
