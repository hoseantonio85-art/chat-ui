import { jsx as e } from "react/jsx-runtime";
import { f as o } from "./vendor-other-4r8kKhmH.js";
const p = "_MDwrapper_fnxx5_1", n = "_p_fnxx5_5", _ = "_li_fnxx5_20", t = "_ol_fnxx5_24", c = "_ul_fnxx5_34", x = "_a_fnxx5_44", i = "_table_fnxx5_54", r = {
  MDwrapper: p,
  p: n,
  li: _,
  ol: t,
  ul: c,
  a: x,
  table: i
}, u = ({
  markdown: s,
  customOptions: a = {}
}) => s ? /* @__PURE__ */ e(
  o,
  {
    options: {
      wrapper: ({ children: l }) => /* @__PURE__ */ e("div", { className: r.MDwrapper, children: l }),
      ...a,
      overrides: {
        a: {
          props: {
            className: r.a,
            target: "_blank",
            rel: "noreferrer noopener"
          }
        },
        ol: {
          props: { className: r.ol }
        },
        li: {
          props: { className: r.li }
        },
        ul: {
          props: { className: r.ul }
        },
        p: {
          props: { className: r.p }
        },
        table: {
          props: { className: r.table }
        },
        ...a?.overrides
      }
    },
    children: s
  }
) : null;
export {
  u as M
};
//# sourceMappingURL=MarkdownViewer-BX4PxoJy.js.map
