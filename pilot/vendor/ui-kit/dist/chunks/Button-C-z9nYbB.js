import { jsxs as x, jsx as _ } from "react/jsx-runtime";
import { forwardRef as w, useMemo as L } from "react";
import { c as p } from "./vendor-utils-TYjSchlL.js";
import { iconMap as r } from "../icons.js";
import { I as q } from "./Icon-BY6vNIR8.js";
const M = "_base_1bfqp_17", N = "_danger_1bfqp_17", W = "_warning_1bfqp_17", E = "_ellipse_1bfqp_17", I = "_ai_1bfqp_17", T = "_ghost_1bfqp_17", B = "_tertiary_1bfqp_17", O = "_secondary_1bfqp_17", P = "_primary_1bfqp_17", j = "_icon_1bfqp_42", C = "_iconPulse_1bfqp_1", R = "_fullWidth_1bfqp_46", $ = "_blue_1bfqp_194", D = "_content_1bfqp_207", F = "_children_1bfqp_215", G = "_contentEllipse_1bfqp_219", H = "_iconOnly_1bfqp_222", J = "_sizeXXS_1bfqp_226", K = "_loading_1bfqp_238", Q = "_sizeXS_1bfqp_251", U = "_sizeS_1bfqp_275", V = "_sizeM_1bfqp_293", Y = "_sizeL_1bfqp_308", Z = "_sizeXL_1bfqp_323", k = "_spin_1bfqp_1", A = "_disabled_1bfqp_368", v = "_loadingText_1bfqp_402", n = {
  base: M,
  function: "_function_1bfqp_17",
  danger: N,
  warning: W,
  ellipse: E,
  ai: I,
  ghost: T,
  tertiary: B,
  secondary: O,
  primary: P,
  icon: j,
  iconPulse: C,
  fullWidth: R,
  blue: $,
  content: D,
  children: F,
  contentEllipse: G,
  iconOnly: H,
  sizeXXS: J,
  loading: K,
  sizeXS: Q,
  sizeS: U,
  sizeM: V,
  sizeL: Y,
  sizeXL: Z,
  spin: k,
  disabled: A,
  loadingText: v
}, nn = w(
  ({
    icon: i,
    iconAfter: c,
    iconOnly: f,
    loading: l,
    size: s = "M",
    link: d,
    variant: t = "primary",
    className: u,
    children: a,
    type: X = "button",
    ...o
  }, m) => {
    const S = L(() => {
      let b = s;
      return t === "function" && s !== "XXS" && (b = s === "XS" ? "XXS" : "S"), t === "ellipse" && s !== "XXS" && s !== "XS" && s !== "S" && (b = "S"), {
        base: p(n[t], n[`size${b}`], {
          [n.iconOnly]: f,
          [n.blue]: d,
          [n.disabled]: o.disabled,
          [n.loading]: l
        })
      };
    }, [t, f, l, d, s]), e = s === "XXS" || s === "XS" ? 20 : 24, h = !!i && r[i], g = !!c && r[c], y = a != null && a !== !1, z = /* @__PURE__ */ x(
      "div",
      {
        className: p(n.content, {
          [n.contentEllipse]: t === "ellipse" && (s === "XS" || s === "S"),
          [n.loadingText]: l
        }),
        children: [
          h && /* @__PURE__ */ _(
            q,
            {
              className: n.icon,
              width: e,
              height: e,
              name: i
            }
          ),
          y && /* @__PURE__ */ _("div", { className: n.children, children: a }),
          g && /* @__PURE__ */ _(
            q,
            {
              className: n.icon,
              width: e,
              height: e,
              name: c
            }
          )
        ]
      }
    );
    return /* @__PURE__ */ _(
      "button",
      {
        ref: m,
        type: X,
        className: p(S.base, u, {
          [n.fullWidth]: o.fullWidth
        }),
        disabled: o.disabled,
        ...o,
        children: z
      }
    );
  }
);
nn.displayName = "Button";
export {
  nn as B
};
//# sourceMappingURL=Button-C-z9nYbB.js.map
