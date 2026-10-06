import { jsx as s } from "react/jsx-runtime";
import { useMemo as n } from "react";
import { M as l, c as d, d as r, e as c } from "./vendor-other-4r8kKhmH.js";
const _ = "_modalContent_1p3gb_1", m = "_modalContainer_1p3gb_6", B = "_headerRoot_1p3gb_10", u = "_body_1p3gb_14", b = "_headerTitle_1p3gb_18", C = "_closeButton_1p3gb_23", i = "_footer_1p3gb_36", M = "_noBorder_1p3gb_40", t = {
  modalContent: _,
  modalContainer: m,
  headerRoot: B,
  body: u,
  headerTitle: b,
  closeButton: C,
  footer: i,
  noBorder: M
}, f = {
  modalContainer: t.modalContainer,
  modalContent: t.modalContent
}, y = {
  closeButton: t.closeButton,
  root: t.headerRoot
}, g = {
  body: t.body
}, $ = (o) => /* @__PURE__ */ s(l, { classes: f, ...o }), R = (o) => {
  const e = n(
    () => ({
      className: t.closeButton,
      ...o.closeButtonProps || {}
    }),
    [o.closeButtonProps]
  ), a = n(
    () => ({
      className: t.headerTitle,
      ...o.titleProps || {}
    }),
    [o.titleProps]
  );
  return /* @__PURE__ */ s(
    d,
    {
      classes: y,
      titleProps: a,
      closeButtonProps: e,
      ...o
    }
  );
}, T = (o) => /* @__PURE__ */ s(r, { classes: g, ...o }), H = ({
  noBorder: o = !0,
  ...e
}) => {
  const a = n(() => o ? `${t.footer} ${t.noBorder}` : t.footer, [e]);
  return /* @__PURE__ */ s(c, { className: a, ...e });
};
export {
  $ as M,
  R as a,
  T as b,
  H as c
};
//# sourceMappingURL=Modal-CztLEosC.js.map
