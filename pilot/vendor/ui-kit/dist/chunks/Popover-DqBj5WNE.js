import { jsxs as m, jsx as t } from "react/jsx-runtime";
import * as e from "react";
import { useState as p } from "react";
import { I as y } from "./Icon-BY6vNIR8.js";
import { T as C, a as S } from "./Typography-FIwI70kG.js";
import { r as k, P as A } from "./vendor-other-4r8kKhmH.js";
const F = (o) => /* @__PURE__ */ e.createElement("svg", { width: 32, height: 12, viewBox: "4 4 32 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", ...o }, /* @__PURE__ */ e.createElement("defs", null, /* @__PURE__ */ e.createElement("filter", { id: "filter_4984_50246_dd", x: 0, y: 0, width: 40, height: 20.585815, filterUnits: "userSpaceOnUse", colorInterpolationFilters: "sRGB" }, /* @__PURE__ */ e.createElement("feFlood", { floodOpacity: 0, result: "BackgroundImageFix" }), /* @__PURE__ */ e.createElement("feColorMatrix", { in: "SourceAlpha", type: "matrix", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0", result: "hardAlpha" }), /* @__PURE__ */ e.createElement("feOffset", { dx: 0, dy: 0 }), /* @__PURE__ */ e.createElement("feGaussianBlur", { stdDeviation: 0.333333 }), /* @__PURE__ */ e.createElement("feComposite", { in2: "hardAlpha", operator: "out", k2: -1, k3: 1 }), /* @__PURE__ */ e.createElement("feColorMatrix", { type: "matrix", values: "0 0 0 0 0.14118 0 0 0 0 0.16078 0 0 0 0 0.18039 0 0 0 0.32 0" }), /* @__PURE__ */ e.createElement("feBlend", { mode: "normal", in2: "BackgroundImageFix", result: "effect_dropShadow_1" }), /* @__PURE__ */ e.createElement("feColorMatrix", { in: "SourceAlpha", type: "matrix", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0", result: "hardAlpha" }), /* @__PURE__ */ e.createElement("feOffset", { dx: 0, dy: 4 }), /* @__PURE__ */ e.createElement("feGaussianBlur", { stdDeviation: 2.66667 }), /* @__PURE__ */ e.createElement("feComposite", { in2: "hardAlpha", operator: "out", k2: -1, k3: 1 }), /* @__PURE__ */ e.createElement("feColorMatrix", { type: "matrix", values: "0 0 0 0 0.14118 0 0 0 0 0.16078 0 0 0 0 0.18039 0 0 0 0.12 0" }), /* @__PURE__ */ e.createElement("feBlend", { mode: "normal", in2: "effect_dropShadow_1", result: "effect_dropShadow_2" }), /* @__PURE__ */ e.createElement("feBlend", { mode: "normal", in: "SourceGraphic", in2: "effect_dropShadow_2", result: "shape" }))), /* @__PURE__ */ e.createElement("g", { filter: "url(#filter_4984_50246_dd)" }, /* @__PURE__ */ e.createElement("path", { id: "vector", d: "M11.68 4L8 4L32 4L28.31 4C26.19 4 24.15 4.84 22.65 6.34L20.7 8.29C20.31 8.68 19.68 8.68 19.29 8.29L17.34 6.34C15.84 4.84 13.8 4 11.68 4Z", fill: "#FFFFFF", fillOpacity: 1, fillRule: "evenodd" }))), B = "_container_9vomq_1", P = "_close_9vomq_13", I = "_text_9vomq_21", L = "_arrow_9vomq_26", r = {
  container: B,
  close: P,
  text: I,
  arrow: L
}, R = (o) => {
  const {
    title: l,
    text: a,
    anchor: d,
    children: n,
    fallbackPlacements: f,
    offset: h = 0,
    placement: u,
    withArrow: s = !0,
    onClose: i,
    ...w
  } = o, [x, _] = p(
    null
  ), [E, v] = p(null), { styles: c, attributes: g } = k(
    d,
    x,
    {
      placement: u,
      modifiers: [
        { name: "arrow", options: { element: E } },
        { name: "offset", options: { offset: [h, s ? 16 : 4] } },
        { name: "computeStyles", options: { gpuAcceleration: !1 } },
        { name: "flip", options: { fallbackPlacements: f } }
      ]
    }
  );
  return /* @__PURE__ */ m(
    A,
    {
      ref: _,
      anchor: null,
      ...w,
      style: c.popper,
      ...g.popper,
      children: [
        /* @__PURE__ */ m("div", { className: r.container, children: [
          i && /* @__PURE__ */ t("div", { className: r.close, onClick: () => i(), children: /* @__PURE__ */ t(y, { name: "errorRounded", width: 16, height: 16 }) }),
          l && /* @__PURE__ */ t(C, { size: "H400", children: l }),
          a && /* @__PURE__ */ t(S, { className: r.text, children: a }),
          n && /* @__PURE__ */ t("div", { children: n })
        ] }),
        s && /* @__PURE__ */ t(
          "div",
          {
            ref: v,
            style: c.arrow,
            className: r.arrow,
            children: /* @__PURE__ */ t(F, {})
          }
        )
      ]
    }
  );
};
export {
  R as P
};
//# sourceMappingURL=Popover-DqBj5WNE.js.map
