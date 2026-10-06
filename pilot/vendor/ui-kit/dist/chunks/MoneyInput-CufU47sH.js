import { jsx as a } from "react/jsx-runtime";
import { I as t } from "./InputNumber-LxoF-2qZ.js";
const m = ({
  labelBold: s = !1,
  labelInside: u,
  onChange: n,
  viewOnly: d,
  ...e
}) => /* @__PURE__ */ a(
  t,
  {
    icon: "ruble",
    labelInside: !0,
    ...e,
    onChange: (r, l, o) => {
      e.readonly || n?.(r, l, o);
    },
    noArrows: !0
  }
);
export {
  m as M
};
//# sourceMappingURL=MoneyInput-CufU47sH.js.map
