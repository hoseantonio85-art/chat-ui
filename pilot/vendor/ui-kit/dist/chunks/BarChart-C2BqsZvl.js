import { jsxs as u, jsx as a } from "react/jsx-runtime";
import { c as d } from "./vendor-utils-TYjSchlL.js";
import { useState as l, useMemo as n, useEffect as y } from "react";
const h = "_wrapper_11vkx_1", G = "_circle_11vkx_11", B = "_progress_11vkx_11", O = "_track_11vkx_11", R = "_trackGreen_11vkx_19", w = "_trackOrange_11vkx_22", $ = "_trackRed_11vkx_25", D = "_trackBurgundy_11vkx_28", N = "_trackGray_11vkx_31", T = "_progressGreen_11vkx_38", P = "_progressOrange_11vkx_41", S = "_progressRed_11vkx_44", j = "_progressBurgundy_11vkx_47", z = "_text_11vkx_51", e = {
  wrapper: h,
  circle: G,
  progress: B,
  track: O,
  trackGreen: R,
  trackOrange: w,
  trackRed: $,
  trackBurgundy: D,
  trackGray: N,
  progressGreen: T,
  progressOrange: P,
  progressRed: S,
  progressBurgundy: j,
  text: z
}, A = 1e3, L = (x) => {
  const {
    percents: s,
    size: o = 92,
    withoutAnimation: g = !1,
    withoutLimit: c = !1
  } = x, k = `calc(2 * 3.14  * calc(${o / 2} - 5))`, [r, _] = l(0), [t, p] = l(0), i = n(
    () => t < 95 || s > 99 && s < 195 || s > 199 ? t : 95,
    [t, s]
  ), v = n(
    () => `calc(${k} * ((100 - ${i}) / 100))`,
    [i]
  ), m = n(
    () => c ? "--" : `${r > 999 ? ">999" : r}%`,
    [r, c]
  );
  return y(() => {
    if (g) {
      _(s), p(s < 200 && s !== 100 ? s % 100 : 100);
      return;
    }
    const f = setTimeout(() => {
      r >= s || (r < 200 && p(t > 99 ? 1 : t + 1), _(r + 1));
    }, A / 100);
    return () => {
      clearTimeout(f);
    };
  }, [r, s, g]), /* @__PURE__ */ u(
    "div",
    {
      style: { height: `${o}px`, width: `${o}px` },
      className: e.wrapper,
      children: [
        /* @__PURE__ */ u("svg", { children: [
          /* @__PURE__ */ a(
            "circle",
            {
              className: d(e.track, {
                [e.trackBurgundy]: r > 100,
                [e.trackGray]: c,
                [e.trackGreen]: !0,
                [e.trackOrange]: r > 49,
                [e.trackRed]: r > 84
              })
            }
          ),
          !c && /* @__PURE__ */ a(
            "circle",
            {
              className: d(e.progress, {
                [e.progressBurgundy]: r > 100,
                [e.progressGreen]: r > 0,
                [e.progressOrange]: r > 49,
                [e.progressRed]: r > 84
              }),
              strokeDasharray: k,
              strokeDashoffset: v
            }
          )
        ] }),
        /* @__PURE__ */ a(
          "div",
          {
            title: s > 999 ? String(s) : void 0,
            className: e.text,
            children: m
          }
        )
      ]
    }
  );
};
export {
  L as B
};
//# sourceMappingURL=BarChart-C2BqsZvl.js.map
