import { jsxs as d, jsx as c, Fragment as x } from "react/jsx-runtime";
import { useMemo as b } from "react";
import { R as t } from "./Row-DT_8J65b.js";
import { I as m } from "./Icon-BY6vNIR8.js";
import { g as k, h as g } from "./vendor-other-4r8kKhmH.js";
const u = "_control_1epbd_1", C = "_checkbox_1epbd_2", p = "_label_1epbd_11", T = "_labelContent_1epbd_15", f = "_helperText_1epbd_18", I = "_errorText_1epbd_23", y = "_checkboxIcon_1epbd_29", j = "_checked_1epbd_33", R = "_indeterminate_1epbd_33", N = "_error_1epbd_23", $ = "_disabled_1epbd_36", e = {
  control: u,
  checkbox: C,
  label: p,
  labelContent: T,
  helperText: f,
  errorText: I,
  checkboxIcon: y,
  checked: j,
  indeterminate: R,
  error: N,
  disabled: $
}, s = {
  checkboxIcon: e.checkboxIcon,
  checkbox: e.checkbox,
  checked: e.checked,
  control: e.control,
  disabled: e.disabled,
  indeterminate: e.indeterminate
}, M = (o) => {
  const { className: i, errorText: l, helperText: a, label: r, ...n } = o, h = b(() => n.error ? Object.assign({}, s, {
    control: `${e.control} ${e.error}`
  }) : n.readonly ? Object.assign({}, s, {
    disabled: e.disabledReadonly
  }) : s, [n]), _ = b(() => l ? /* @__PURE__ */ d(t, { direction: "column", align: "top", gutter: 4, children: [
    r,
    /* @__PURE__ */ d(t, { gutter: 4, className: e.errorText, children: [
      /* @__PURE__ */ c(m, { name: "errorRounded", width: 16, height: 16 }),
      l
    ] })
  ] }) : a ? /* @__PURE__ */ d(t, { direction: "column", align: "top", gutter: 4, children: [
    r,
    /* @__PURE__ */ c(t, { gutter: 4, className: e.helperText, children: a })
  ] }) : /* @__PURE__ */ c(x, { children: r }), [r, l, a]);
  return /* @__PURE__ */ c(
    k,
    {
      label: _,
      classes: {
        label: e.label,
        labelContent: e.labelContent
      },
      className: i,
      control: /* @__PURE__ */ c(
        g,
        {
          classes: h,
          ...n,
          onChange: o.readonly ? void 0 : o.onChange,
          disabled: o.disabled || o.readonly
        }
      ),
      ...n,
      checked: o.checked,
      onChange: o.readonly ? void 0 : o.onChange
    }
  );
};
export {
  M as C
};
//# sourceMappingURL=Checkbox-BLPR3nKX.js.map
