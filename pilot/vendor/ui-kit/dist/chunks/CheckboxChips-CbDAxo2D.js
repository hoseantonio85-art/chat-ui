import { jsxs as t, jsx as l } from "react/jsx-runtime";
import { c as s } from "./vendor-utils-TYjSchlL.js";
import { useCallback as I } from "react";
import { EComponentColors as k } from "../types.js";
import { R as $ } from "./Row-DT_8J65b.js";
import { s as n } from "./styles.module-B_DR6RIh.js";
import { a as d } from "./Typography-FIwI70kG.js";
import { a as v } from "./vendor-other-4r8kKhmH.js";
const z = "_wrapper_1jxya_1", R = "_wrapperInline_1jxya_4", g = "_primary_1jxya_8", q = "_counter_1jxya_13", V = "_text_1jxya_17", A = "_selected_1jxya_27", D = "_helperText_1jxya_130", F = "_helperTextError_1jxya_134", e = {
  wrapper: z,
  wrapperInline: R,
  primary: g,
  counter: q,
  text: V,
  selected: A,
  "color-gray": "_color-gray_1jxya_37",
  "color-red": "_color-red_1jxya_47",
  "color-outlined": "_color-outlined_1jxya_58",
  "color-yellow": "_color-yellow_1jxya_75",
  "color-green": "_color-green_1jxya_86",
  "color-brand": "_color-brand_1jxya_97",
  "color-blue": "_color-blue_1jxya_108",
  "color-violet": "_color-violet_1jxya_119",
  helperText: D,
  helperTextError: F
}, Q = ({
  disabled: y,
  error: h,
  helperText: a,
  inline: _,
  items: j,
  kind: u,
  label: p,
  labelBold: i,
  onChange: w,
  readonly: f,
  required: T,
  value: o,
  wrap: b,
  testId: x
}) => {
  const m = I((r) => o.includes(r), [o]), C = (r, c) => {
    if (f || y)
      return;
    const E = m(r) ? o.filter((N) => N !== r) : [...o, r];
    w?.(E, c);
  };
  return /* @__PURE__ */ t("div", { className: s(e.wrapper, { [e.wrapperInline]: _ }), children: [
    p && /* @__PURE__ */ t(d, { size: "sm", bold: i, mb: 8, tooltip: !i, children: [
      p,
      !!T && /* @__PURE__ */ l("span", { className: n.required, children: "*" })
    ] }),
    /* @__PURE__ */ l(
      $,
      {
        gutter: 4,
        className: s(e.wrapper, { [e.wrapperInline]: _ }),
        wrap: b,
        children: j?.map((r) => /* @__PURE__ */ t(
          v,
          {
            selected: m(r.id),
            kind: u,
            className: e[`color-${r.color ?? k.blue}`],
            classes: e,
            onClick: (c) => C(r.id, c),
            "data-testid": x ? `${x}-${r.id}` : void 0,
            children: [
              r.title,
              typeof r?.counter == "number" && /* @__PURE__ */ l("div", { className: e.counter, children: r.counter })
            ]
          },
          r.id
        ))
      }
    ),
    a && /* @__PURE__ */ l(
      d,
      {
        className: s(n.helperText, { [n.helperTextError]: h }),
        size: "sm",
        children: a
      }
    )
  ] });
};
export {
  Q as C
};
//# sourceMappingURL=CheckboxChips-CbDAxo2D.js.map
