import { jsx as m } from "react/jsx-runtime";
import { m as f } from "./vendor-other-4r8kKhmH.js";
const d = "_tooltip_1im9j_1", u = "_arrow_1im9j_14", w = {
  tooltip: d,
  arrow: u
}, b = (e) => {
  const {
    canShow: o = !0,
    children: t,
    placement: s = "top",
    content: r,
    dropdownProps: n,
    fallbackPlacements: a,
    ...c
  } = e, p = { ...w }, i = {
    placement: s,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: ({ placement: l }) => {
            switch (l) {
              case "top-start":
              case "bottom-start":
                return [-16, 16];
              case "top-end":
              case "bottom-end":
                return [16, 16];
              case "left-start":
              case "right-start":
                return [-16, 16];
              case "left-end":
              case "right-end":
                return [16, 16];
              case "left":
              case "right":
                return [0, 16];
              default:
                return [16, 16];
            }
          }
        }
      },
      { name: "computeStyles", options: { gpuAcceleration: !1 } },
      { name: "flip", options: { fallbackPlacements: a } }
    ],
    content: r,
    ...n
  };
  return o ? /* @__PURE__ */ m(
    f,
    {
      classes: p,
      dropdownProps: i,
      ...c,
      children: t
    }
  ) : t;
};
export {
  b as T
};
//# sourceMappingURL=Tooltip-kHcD51Z4.js.map
