import { jsx as n } from "react/jsx-runtime";
import { c as t } from "./vendor-utils-TYjSchlL.js";
const z = "_shimmer_63woe_1", a = "_animation_63woe_32", e = {
  shimmer: z,
  "size-14": "_size-14_63woe_4",
  "size-16": "_size-16_63woe_8",
  "size-20": "_size-20_63woe_12",
  "size-24": "_size-24_63woe_16",
  "size-28": "_size-28_63woe_20",
  "size-32": "_size-32_63woe_24",
  "size-40": "_size-40_63woe_28",
  animation: a
}, c = ({
  width: i,
  height: s,
  size: _ = 20,
  borderRadius: o = 8,
  animation: m = !0
}) => /* @__PURE__ */ n(
  "span",
  {
    className: t(e.shimmer, {
      [e.animation]: m,
      [e[`size-${_}`]]: !s
    }),
    style: { width: i ?? "100%", height: s, borderRadius: o }
  }
);
export {
  c as S
};
//# sourceMappingURL=Shimmer-D7AxXliA.js.map
