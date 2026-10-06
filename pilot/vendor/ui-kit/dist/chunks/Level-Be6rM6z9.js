import { jsxs as w, jsx as s } from "react/jsx-runtime";
import { c as u } from "./vendor-utils-TYjSchlL.js";
import { EIconName as r } from "../icons.js";
import { EComponentColors as o } from "../types.js";
import { B as x, E as v } from "./Badge-BQ-ScUjK.js";
import { I as R } from "./Icon-BY6vNIR8.js";
import { a as B } from "./Typography-FIwI70kG.js";
var e = /* @__PURE__ */ ((a) => (a.default = "default", a.low = "low", a.medium = "medium", a.high = "high", a.critical = "critical", a))(e || {});
const N = "_level_ue4er_1", z = "_iconRight_ue4er_11", C = "_iconWrapper_ue4er_14", T = "_icon_ue4er_11", W = "_text_ue4er_27", j = "_withBadge_ue4er_62", y = "_badge_ue4er_103", I = "_badgeCritical_ue4er_106", D = "_badgeReverse_ue4er_109", t = {
  level: N,
  iconRight: z,
  iconWrapper: C,
  icon: T,
  "state-default": "_state-default_ue4er_22",
  text: W,
  "state-low": "_state-low_ue4er_30",
  "state-medium": "_state-medium_ue4er_38",
  "state-high": "_state-high_ue4er_46",
  "state-critical": "_state-critical_ue4er_54",
  withBadge: j,
  badge: y,
  badgeCritical: I,
  badgeReverse: D,
  "size-sm": "_size-sm_ue4er_113"
}, M = {
  [e.default]: r.rhomb,
  [e.low]: r.arrowDownTriangle,
  [e.medium]: r.rhomb,
  [e.high]: r.arrowUpTriangle,
  [e.critical]: r.arrowUpDoubleTriangle
}, U = {
  [e.default]: o.outlined,
  [e.low]: o.gray,
  [e.medium]: o.yellow,
  [e.high]: o.red,
  [e.critical]: o.red
}, $ = {
  [e.default]: "Нет оценки",
  [e.low]: "Низкий",
  [e.medium]: "Средний",
  [e.high]: "Высокий",
  [e.critical]: "Очень высокий"
}, G = (a) => {
  const {
    className: g,
    withBadge: n,
    state: i = e.default,
    t: h = (c) => $[c],
    iconRight: l,
    size: d = "md",
    icon: _,
    variant: p,
    text: f
  } = a, b = u(
    t.level,
    t[`state-${i}`],
    t[`size-${d}`],
    {
      [t.withBadge]: n,
      [t.iconRight]: l
    },
    g
  ), m = /* @__PURE__ */ w("div", { className: b, children: [
    /* @__PURE__ */ s("div", { className: t.iconWrapper, children: (_ || Object.keys(e).filter((c) => c !== e.default).includes(i)) && /* @__PURE__ */ s(
      R,
      {
        name: (_ || M[i]) ?? r.rhomb,
        className: t.icon
      }
    ) }),
    /* @__PURE__ */ s(B, { size: d, className: t.text, nowrap: !0, children: f || h(i) })
  ] });
  return n ? /* @__PURE__ */ s(
    x,
    {
      size: v.xxs,
      variant: (p || U[i]) ?? o.outlined,
      className: u(t.badge, {
        [t.badgeCritical]: i === e.critical,
        [t.badgeReverse]: l
      }),
      children: m
    }
  ) : m;
};
export {
  e as E,
  G as L
};
//# sourceMappingURL=Level-Be6rM6z9.js.map
