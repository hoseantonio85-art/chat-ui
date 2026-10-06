import { jsx as i } from "react/jsx-runtime";
import { c as s } from "./vendor-utils-TYjSchlL.js";
import { EIconName as e } from "../icons.js";
import { I as d } from "./Icon-BY6vNIR8.js";
import { M as m } from "./MarkdownViewer-BX4PxoJy.js";
import { a as c } from "./Typography-FIwI70kG.js";
import { n as f, N as u } from "./vendor-other-4r8kKhmH.js";
const p = "_root_1o4pn_1", y = "_rootGradient_1o4pn_12", w = "_success_1o4pn_20", C = "_warning_1o4pn_23", x = "_error_1o4pn_26", N = "_info_1o4pn_29", g = "_discovery_1o4pn_32", b = "_assistant_1o4pn_35", G = "_body_1o4pn_39", v = "_textContainer_1o4pn_48", I = "_title_1o4pn_53", h = "_content_1o4pn_53", B = "_onlyContent_1o4pn_57", M = "_actions_1o4pn_62", R = "_icon_1o4pn_66", k = "_closeButton_1o4pn_90", o = {
  root: p,
  rootGradient: y,
  success: w,
  warning: C,
  error: x,
  info: N,
  discovery: g,
  assistant: b,
  body: G,
  textContainer: v,
  title: I,
  content: h,
  onlyContent: B,
  actions: M,
  icon: R,
  closeButton: k
}, z = ({ options: n, content: t }) => {
  const r = t?.trim() ? /* @__PURE__ */ i(m, { markdown: t }) : n?.title ? n.title : "";
  return !n?.title && !t?.trim() ? null : /* @__PURE__ */ i(
    c,
    {
      wrap: !0,
      ...!n?.title || n?.title && !t?.trim() ? { size: "lg", bold: !0 } : {},
      children: r
    }
  );
}, A = (n, t) => {
  const r = t?.type ?? "info", a = !!t?.title || !!t?.actions, _ = {
    assistant: e.assistantGradient,
    error: e.errorRounded,
    info: e.infoRounded,
    success: e.success,
    warning: e.warningRounded,
    discovery: e.questionFill
  }, l = {
    ...o,
    content: s(o.content, {
      [o.onlyContent]: !t?.title && !t?.actions
    }),
    root: s(o.root, o.rootGradient, o[r])
  };
  f(
    /* @__PURE__ */ i(z, { options: t, content: n }),
    {
      actions: t?.actions,
      classes: l,
      icon: /* @__PURE__ */ i(d, { className: o[r], name: _[r] }),
      id: t?.id,
      nextNotification: a,
      title: n?.trim() && t?.title ? /* @__PURE__ */ i(c, { size: "lg", bold: !0, wrap: !0, children: t?.title }) : null
    }
  );
}, D = (n) => /* @__PURE__ */ i(u, { showIndicator: !1, ...n });
export {
  D as N,
  A as n
};
//# sourceMappingURL=Notification-C8CHHPy_.js.map
