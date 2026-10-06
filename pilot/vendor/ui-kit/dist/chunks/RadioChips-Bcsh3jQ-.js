import { jsxs as o, jsx as e } from "react/jsx-runtime";
import { c as m } from "./vendor-utils-TYjSchlL.js";
import { B as $ } from "./Badge-BQ-ScUjK.js";
import { R as n } from "./Row-DT_8J65b.js";
import { a as d } from "./Typography-FIwI70kG.js";
import { s as r } from "./styles.module-B_DR6RIh.js";
import { a as j } from "./vendor-other-4r8kKhmH.js";
const h = { ...r }, b = ({
  color: i,
  error: f,
  helperText: t,
  items: u,
  kind: a,
  label: c,
  labelBold: p,
  onChange: x,
  readonly: N,
  required: v,
  value: y,
  wrap: R,
  testId: l,
  fullWidth: w = !1
}) => /* @__PURE__ */ o("div", { className: m(r.wrapper, { [r.wrapperFullWidth]: w }), children: [
  c && /* @__PURE__ */ o(d, { size: "sm", bold: p, mb: 8, tooltip: !p, children: [
    c,
    !!v && /* @__PURE__ */ e("span", { className: r.required, children: "*" })
  ] }),
  /* @__PURE__ */ e(
    n,
    {
      gutter: 4,
      className: m({
        [r.container]: a === "primary" && i,
        [r[`color-${i}`]]: a === "primary" && i
      }),
      wrap: R,
      children: u?.map((s) => /* @__PURE__ */ e(
        j,
        {
          selected: y === s.id,
          kind: a,
          classes: h,
          "data-testid": l ? `${l}-${s.id}` : void 0,
          onClick: N ? void 0 : (T) => x?.(s.id, T),
          children: /* @__PURE__ */ o(n, { gutter: 4, noFlex: !0, children: [
            /* @__PURE__ */ e("span", {}),
            s.title,
            s.count ? /* @__PURE__ */ e($, { className: h.neutral, variant: "gray", children: s.count }) : /* @__PURE__ */ e("span", {})
          ] })
        },
        s.id
      ))
    }
  ),
  t && /* @__PURE__ */ e(
    d,
    {
      className: m(r.helperText, { [r.helperTextError]: f }),
      size: "sm",
      children: t
    }
  )
] });
export {
  b as R
};
//# sourceMappingURL=RadioChips-Bcsh3jQ-.js.map
