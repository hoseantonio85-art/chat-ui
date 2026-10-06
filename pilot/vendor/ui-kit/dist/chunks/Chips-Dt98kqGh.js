import { jsxs as v, jsx as s } from "react/jsx-runtime";
import { c as e } from "./vendor-utils-TYjSchlL.js";
import { B as m } from "./Badge-BQ-ScUjK.js";
import { I as S } from "./Icon-BY6vNIR8.js";
import { a as X } from "./Typography-FIwI70kG.js";
import { a as u } from "./vendor-other-4r8kKhmH.js";
const W = "_titleNoWrap_gcvr3_1", x = "_titleWithRemove_gcvr3_7", N = "_tag_gcvr3_11", C = "_fullWidth_gcvr3_14", j = "_text_gcvr3_17", k = "_fill_gcvr3_24", w = "_title_gcvr3_1", B = "_selected_gcvr3_36", P = "_outline_gcvr3_43", R = "_XXS_gcvr3_62", T = "_icon_gcvr3_68", $ = "_XS_gcvr3_72", y = "_S_gcvr3_79", t = {
  titleNoWrap: W,
  titleWithRemove: x,
  tag: N,
  fullWidth: C,
  text: j,
  fill: k,
  title: w,
  selected: B,
  outline: P,
  XXS: R,
  icon: T,
  XS: $,
  S: y
}, G = ({
  disabled: i,
  fullWidth: n,
  item: o,
  onChange: a,
  onRemove: r,
  selected: g,
  size: c = "XXS",
  variant: h = "fill",
  testId: _,
  nowrap: f = !1
}) => {
  const p = (l) => {
    l.stopPropagation(), !i && a?.(o.id, l);
  }, d = (l) => {
    l.stopPropagation(), r?.(o.id, l);
  };
  return /* @__PURE__ */ v(
    u,
    {
      selected: g,
      classes: {
        ...t,
        tag: e(t.tag, t[h], t[c], {
          [t.fullWidth]: n
        })
      },
      disabled: i,
      onClick: p,
      "data-testid": _ ? `${_}-${o.id}` : void 0,
      children: [
        /* @__PURE__ */ s(
          X,
          {
            className: e(t.title, {
              [t.titleNoWrap]: f,
              [t.titleWithRemove]: r && !i
            }),
            size: c === "XXS" ? "sm" : c === "XS" ? "md" : "lg",
            code: !0,
            children: o.title
          }
        ),
        !!o.count && !r && /* @__PURE__ */ s(m, { variant: "yellow", children: o.count }),
        r && !i && /* @__PURE__ */ s(
          S,
          {
            onClick: d,
            width: c === "S" ? 20 : 16,
            height: c === "S" ? 20 : 16,
            className: t.icon,
            name: "cross"
          }
        )
      ]
    }
  );
};
export {
  G as C
};
//# sourceMappingURL=Chips-Dt98kqGh.js.map
