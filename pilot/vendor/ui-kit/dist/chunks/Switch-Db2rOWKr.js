import { jsx as t, Fragment as u, jsxs as r } from "react/jsx-runtime";
import { c as _ } from "./vendor-utils-TYjSchlL.js";
import { useMemo as y } from "react";
import { R as a } from "./Row-DT_8J65b.js";
import { I as m } from "./Icon-BY6vNIR8.js";
import { T as f } from "./Tooltip-kHcD51Z4.js";
import { a as h } from "./Typography-FIwI70kG.js";
import { g as w, S as p } from "./vendor-other-4r8kKhmH.js";
const x = "_control_eyapg_1", C = "_thumb_eyapg_8", T = "_error_eyapg_20", k = "_disabled_eyapg_20", q = "_small_eyapg_27", E = "_checked_eyapg_41", S = "_readonly_eyapg_69", j = "_helperText_eyapg_73", I = "_helperTextError_eyapg_76", N = "_label_eyapg_81", R = "_labelContent_eyapg_84", z = "_required_eyapg_88", e = {
  control: x,
  switch: "_switch_eyapg_5",
  thumb: C,
  error: T,
  disabled: k,
  small: q,
  checked: E,
  readonly: S,
  helperText: j,
  helperTextError: I,
  label: N,
  labelContent: R,
  required: z
}, O = {
  checked: e.checked,
  control: e.control,
  disabled: e.disabled,
  small: e.small,
  switch: e.switch,
  thumb: e.thumb
}, v = {
  label: e.label,
  labelContent: e.labelContent
}, D = ({
  error: l,
  label: s,
  labelPlacement: b,
  required: g,
  readonly: n,
  helperText: o,
  tooltip: c,
  ...i
}) => {
  const d = y(
    () => Object.assign({}, O, {
      control: _(e.control, {
        [e.error]: l,
        [e.readonly]: n
      })
    }),
    [l, n]
  );
  return /* @__PURE__ */ t(u, { children: s || o ? /* @__PURE__ */ t(
    w,
    {
      label: /* @__PURE__ */ r(a, { gutter: 8, align: "top", children: [
        /* @__PURE__ */ r(a, { gutter: 4, direction: "column", align: "top", children: [
          s && /* @__PURE__ */ r(h, { size: o ? "sm" : "lg", bold: !0, children: [
            s,
            !!g && /* @__PURE__ */ t("span", { className: e.required, children: "*" })
          ] }),
          o && /* @__PURE__ */ r(
            a,
            {
              gutter: 4,
              className: _(e.helperText, {
                [e.helperTextError]: l
              }),
              children: [
                l && /* @__PURE__ */ t(m, { width: 16, height: 16, name: "errorRounded" }),
                /* @__PURE__ */ t(h, { size: "sm", children: o })
              ]
            }
          )
        ] }),
        c && /* @__PURE__ */ t(
          f,
          {
            placement: "top-end",
            content: c,
            fallbackPlacements: ["left-start"],
            children: /* @__PURE__ */ t("div", { className: e.tooltipIconWrapper, children: /* @__PURE__ */ t(m, { width: 20, height: 20, name: "infoOutlined" }) })
          }
        )
      ] }),
      control: /* @__PURE__ */ t(p, { classes: d }),
      labelPlacement: b,
      ...i,
      classes: v
    }
  ) : /* @__PURE__ */ t(p, { ...i, classes: d }) });
};
export {
  D as S
};
//# sourceMappingURL=Switch-Db2rOWKr.js.map
