import { jsx as o, Fragment as h, jsxs as s } from "react/jsx-runtime";
import { useMemo as m } from "react";
import { c as p } from "./vendor-utils-TYjSchlL.js";
import { R as c } from "./Row-DT_8J65b.js";
import { I as u } from "./Icon-BY6vNIR8.js";
import { a as i } from "./Typography-FIwI70kG.js";
import { g as v, k as d } from "./vendor-other-4r8kKhmH.js";
const k = "_control_17tv1_1", x = "_disabled_17tv1_6", C = "_error_17tv1_6", f = "_checked_17tv1_6", g = "_radio_17tv1_6", T = "_radioMark_17tv1_19", M = "_input_17tv1_53", R = "_helperText_17tv1_67", E = "_helperTextError_17tv1_70", j = "_label_17tv1_75", $ = "_labelContent_17tv1_78", e = {
  control: k,
  disabled: x,
  error: C,
  checked: f,
  radio: g,
  radioMark: T,
  input: M,
  helperText: R,
  helperTextError: E,
  label: j,
  labelContent: $
}, _ = {
  control: e.control,
  input: e.input,
  radio: e.radio,
  disabled: e.disabled,
  checked: e.checked,
  radioMark: e.radioMark
}, w = {
  label: e.label,
  disabled: e.disabled,
  labelContent: e.labelContent
}, q = ({
  label: n,
  helperText: a,
  error: r = !1,
  ...t
}) => {
  const l = m(() => r ? Object.assign({}, _, {
    control: `${e.control} ${e.error}`
  }) : _, [r]);
  return /* @__PURE__ */ o(h, { children: n || a ? /* @__PURE__ */ o(
    v,
    {
      label: /* @__PURE__ */ s(c, { gutter: 4, direction: "column", align: "top", children: [
        n && /* @__PURE__ */ o(i, { disabled: t.disabled, children: n }),
        a && /* @__PURE__ */ s(
          c,
          {
            gutter: 4,
            className: p(e.helperText, {
              [e.helperTextError]: r
            }),
            children: [
              r && /* @__PURE__ */ o(u, { width: 16, height: 16, name: "errorRounded" }),
              /* @__PURE__ */ o(i, { size: "sm", children: a })
            ]
          }
        )
      ] }),
      control: /* @__PURE__ */ o(d, { classes: l }),
      ...t,
      onChange: (b) => t.onChange?.(t.value ?? "", b),
      classes: w
    }
  ) : /* @__PURE__ */ o(d, { classes: l, ...t }) });
};
export {
  q as R
};
//# sourceMappingURL=Radio-Hdhsky5c.js.map
