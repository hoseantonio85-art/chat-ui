import { jsx as s } from "react/jsx-runtime";
import { c as n } from "./vendor-utils-TYjSchlL.js";
import { iconMap as v } from "../icons.js";
const h = "_wrapper_ozf8r_1", d = "_svg_ozf8r_13", g = "_fill_ozf8r_19", w = "_stroke_ozf8r_23", o = {
  wrapper: h,
  svg: d,
  fill: g,
  stroke: w
};
var c = /* @__PURE__ */ ((r) => (r.Fill = "fill", r.Stroke = "stroke", r))(c || {});
const F = (r) => {
  const {
    height: i = 24,
    iconStyles: a,
    name: e,
    title: t,
    variant: p = c.Fill,
    width: f = 24,
    className: _,
    ...m
  } = r, l = v[e];
  return l ? /* @__PURE__ */ s("div", { className: n(o.wrapper, _), ...m, children: /* @__PURE__ */ s(
    l,
    {
      className: n(o.svg, o[p]),
      width: f,
      height: i,
      style: { ...a },
      children: !!t && /* @__PURE__ */ s("title", { children: t })
    }
  ) }) : (console.warn(`Не удалось найти иконку с именем "${e}"`), null);
};
export {
  c as E,
  F as I
};
//# sourceMappingURL=Icon-BY6vNIR8.js.map
