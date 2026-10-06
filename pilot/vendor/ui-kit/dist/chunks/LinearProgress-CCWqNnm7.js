import { jsx as n } from "react/jsx-runtime";
import { c as i } from "./vendor-utils-TYjSchlL.js";
import { L as o } from "./vendor-other-4r8kKhmH.js";
const c = "_root_1ij21_1", _ = "_path_1ij21_4", r = "_success_1ij21_8", a = "_track_1ij21_8", l = "_indeterminate_1ij21_11", d = "_filled_1ij21_17", m = "_warning_1ij21_24", j = "_danger_1ij21_40", g = "_violet_1ij21_56", f = "_md_1ij21_72", t = {
  root: c,
  path: _,
  success: r,
  track: a,
  indeterminate: l,
  filled: d,
  warning: m,
  danger: j,
  violet: g,
  md: f
};
var u = /* @__PURE__ */ ((s) => (s.success = "success", s.warning = "warning", s.danger = "danger", s.violet = "violet", s))(u || {});
const h = (s) => {
  const e = {
    ...t,
    root: i(t.root, t[
      s.variant || "success"
      /* success */
    ], {
      [t.filled]: s.filled
    })
  };
  return /* @__PURE__ */ n(o, { classes: e, ...s });
};
export {
  u as E,
  h as L
};
//# sourceMappingURL=LinearProgress-CCWqNnm7.js.map
