import { jsx as t } from "react/jsx-runtime";
import { c as _ } from "./vendor-utils-TYjSchlL.js";
import { useState as l, useCallback as m, useMemo as p } from "react";
import { iconMap as x, EIconName as f } from "../icons.js";
import { A as h, b as I } from "./vendor-other-4r8kKhmH.js";
const u = "_accordion_1sfec_1", C = "_editable_1sfec_4", H = "_accordionFullWidth_1sfec_8", b = "_accordionItem_1sfec_12", A = "_accordionHeader_1sfec_21", E = "_accordionHeaderText_1sfec_32", N = "_headerIcon_1sfec_35", T = "_accordionExpanded_1sfec_38", W = "_accordionContent_1sfec_42", o = {
  accordion: u,
  editable: C,
  accordionFullWidth: H,
  accordionItem: b,
  accordionHeader: A,
  accordionHeaderText: E,
  headerIcon: N,
  accordionExpanded: T,
  accordionContent: W
}, F = x[f.next], g = () => /* @__PURE__ */ t(F, { className: o.headerIcon }), j = (n) => {
  const { fullWidth: a, variant: e = "view", className: d, ...c } = n;
  return /* @__PURE__ */ t(
    h,
    {
      ...c,
      className: _(
        o.accordion,
        { [o.editable]: e === "edit" },
        { [o.accordionFullWidth]: a },
        d
      )
    }
  );
}, w = (n) => {
  const { expanded: a = !1, onChange: e, ...d } = n, [c, r] = l(a), s = m(() => {
    r(!c), e?.(!c);
  }, [c, e, r]), i = p(
    () => ({
      root: o.accordionItem,
      header: o.accordionHeader,
      headerText: o.accordionHeaderText,
      expanded: o.accordionExpanded,
      content: o.accordionContent
    }),
    []
  );
  return /* @__PURE__ */ t(
    I,
    {
      classes: i,
      expanded: c,
      onClick: s,
      components: { Icon: g },
      ...d
    }
  );
};
export {
  j as A,
  w as a
};
//# sourceMappingURL=Accordion-CpB38_N6.js.map
