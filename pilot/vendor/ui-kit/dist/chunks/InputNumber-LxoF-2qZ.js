import { jsxs as d, jsx as n } from "react/jsx-runtime";
import { useState as S, useCallback as x } from "react";
import { c as l } from "./vendor-utils-TYjSchlL.js";
import { R as z } from "./Row-DT_8J65b.js";
import { I as a } from "./Icon-BY6vNIR8.js";
import { T as C } from "./Tooltip-kHcD51Z4.js";
import { I as k } from "./vendor-other-4r8kKhmH.js";
const V = "_containerLabelInside_bd3zb_1", X = "_topLabelsWrapper_bd3zb_4", q = "_noArrows_bd3zb_19", B = "_tooltipIconWrapper_bd3zb_22", N = "_topLabels_bd3zb_4", E = "_label_bd3zb_30", D = "_labelError_bd3zb_37", $ = "_disabled_bd3zb_40", j = "_focused_bd3zb_43", F = "_filled_bd3zb_43", Z = "_sizeL_bd3zb_47", U = "_sizeXL_bd3zb_47", G = "_sizeS_bd3zb_50", H = "_sizeSWithPrefix_bd3zb_56", J = "_sizeM_bd3zb_62", K = "_sizeMWithPrefix_bd3zb_68", Q = "_sizeLWithPrefix_bd3zb_80", Y = "_sizeXLWithPrefix_bd3zb_92", ee = "_labelRequired_bd3zb_106", te = "_prefix_bd3zb_111", ne = "_error_bd3zb_118", oe = "_viewOnly_bd3zb_122", ie = "_suffix_bd3zb_127", re = "_clearButton_bd3zb_133", le = "_inputContainer_bd3zb_140", se = "_labelAfter_bd3zb_146", ae = "_input_bd3zb_140", de = "_sizeSPaddingRight_bd3zb_177", be = "_sizeMPaddingRight_bd3zb_204", ce = "_sizeLPaddingRight_bd3zb_230", _e = "_sizeXLPaddingRight_bd3zb_256", ze = "_helperText_bd3zb_325", he = "_textViewOnly_bd3zb_340", pe = "_required_bd3zb_345", ue = "_inputContainerViewOnly_bd3zb_349", fe = "_tooltipIcon_bd3zb_22", we = "_arrowButton_bd3zb_369", xe = "_arrowControl_bd3zb_381", Ce = "_arrowControlDisabled_bd3zb_387", e = {
  containerLabelInside: V,
  topLabelsWrapper: X,
  noArrows: q,
  tooltipIconWrapper: B,
  topLabels: N,
  label: E,
  labelError: D,
  disabled: $,
  focused: j,
  filled: F,
  sizeL: Z,
  sizeXL: U,
  sizeS: G,
  sizeSWithPrefix: H,
  sizeM: J,
  sizeMWithPrefix: K,
  sizeLWithPrefix: Q,
  sizeXLWithPrefix: Y,
  labelRequired: ee,
  prefix: te,
  error: ne,
  viewOnly: oe,
  suffix: ie,
  clearButton: re,
  inputContainer: le,
  labelAfter: se,
  input: ae,
  sizeSPaddingRight: de,
  sizeMPaddingRight: be,
  sizeLPaddingRight: ce,
  sizeXLPaddingRight: _e,
  helperText: ze,
  textViewOnly: he,
  required: pe,
  inputContainerViewOnly: ue,
  tooltipIcon: fe,
  arrowButton: we,
  arrowControl: xe,
  arrowControlDisabled: Ce
}, g = ({ flip: t, onClick: i }) => /* @__PURE__ */ n("button", { className: l(e.arrowButton), onClick: i, children: /* @__PURE__ */ d(
  "svg",
  {
    width: "12.000000",
    height: "12.000000",
    viewBox: "0 0 12 12",
    fill: "none",
    transform: t ? "rotate(180)" : "",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ n(
        "path",
        {
          id: "vector",
          d: "M5.52 8.78L3.12 5.87C2.92 5.63 2.97 5.28 3.24 5.1C3.34 5.03 3.47 5 3.6 5L8.4 5C8.73 5 9 5.24 9 5.54C9 5.66 8.95 5.77 8.88 5.87L6.48 8.78C6.28 9.02 5.9 9.07 5.64 8.89C5.59 8.85 5.55 8.82 5.52 8.78Z",
          fill: "#24292E",
          "fill-opacity": "1.000000",
          "fill-rule": "evenodd"
        }
      ),
      /* @__PURE__ */ n(
        "path",
        {
          id: "vector",
          d: "M3.12 5.87C2.92 5.63 2.97 5.28 3.24 5.1C3.34 5.03 3.47 5 3.6 5L8.4 5C8.73 5 9 5.24 9 5.54C9 5.66 8.95 5.77 8.88 5.87L6.48 8.78C6.28 9.02 5.9 9.07 5.64 8.89C5.59 8.85 5.55 8.82 5.52 8.78L3.12 5.87Z",
          stroke: "#979797",
          "stroke-opacity": "0",
          "stroke-width": "0.000000"
        }
      )
    ]
  }
) }), ge = ({
  disabled: t,
  size: i,
  onUp: h,
  onDown: o
}) => /* @__PURE__ */ d(
  z,
  {
    direction: "column",
    className: l(e.arrowControl, e[`size${i}`], {
      [e.arrowControlDisabled]: t
    }),
    children: [
      /* @__PURE__ */ n(g, { flip: !0, onClick: !t && h || void 0 }),
      /* @__PURE__ */ n(g, { onClick: !t && o || void 0 })
    ]
  }
), ve = (t) => {
  const {
    icon: i,
    label: h,
    labelInside: o,
    placeholder: L,
    required: m,
    size: b = "M",
    tooltip: s,
    noArrows: f,
    viewOnly: r,
    value: c,
    ...P
  } = t, [y, W] = S(!1), I = {
    container: l(e[`size${b}`], {
      [e.containerLabelInside]: o && !r,
      [e.noArrows]: f,
      [e.filled]: typeof c == "number" || y,
      [e[`size${b}WithPrefix`]]: !!i,
      [e[`size${b}PaddingRight`]]: !!s && o || !o,
      [e.viewOnly]: r
    }),
    ...e,
    inputContainer: l({
      [e.inputContainer]: !r,
      [e.inputContainerViewOnly]: r
    })
  }, R = {
    inputLabel: l({
      [e.labelError]: t.error,
      [e.labelRequired]: m
    }),
    topLabels: e.topLabels,
    topLabelsWrapper: e.topLabelsWrapper
  }, v = {
    text: l({ [e.textViewOnly]: r })
  }, O = {
    error: e.error,
    helperText: e.helperText
  }, p = x(
    (_, u, A) => {
      t.readonly || (W(typeof _ == "number"), t.onChange?.(_, u, A));
    },
    [t.onChange, t.readonly]
  ), w = x(
    (_) => () => {
      const u = (c ?? 0) + (_ ? 1 : -1);
      p(
        u,
        {},
        "input"
      );
    },
    [c, p]
  ), T = /* @__PURE__ */ d(z, { gutter: 4, noFlex: !0, children: [
    /* @__PURE__ */ n("span", { className: e.label, children: h }),
    s && !o && /* @__PURE__ */ n(
      C,
      {
        placement: "top-end",
        content: s,
        fallbackPlacements: ["left-start"],
        children: /* @__PURE__ */ n("span", { className: e.tooltipIcon, children: /* @__PURE__ */ n(a, { width: 16, height: 16, name: "infoOutlined" }) })
      }
    )
  ] }), M = t.helperText && /* @__PURE__ */ d(z, { gutter: 4, children: [
    t.error && t.helperText && /* @__PURE__ */ n(a, { width: 16, height: 16, name: "errorRounded" }),
    t.helperText
  ] });
  return /* @__PURE__ */ n(
    k,
    {
      classes: I,
      showErrorIcon: !1,
      valueType: "number",
      helperTextProps: { classes: O },
      labelledClasses: R,
      clearIcon: /* @__PURE__ */ n(a, { width: 16, height: 16, name: "errorRounded" }),
      decimalSeparator: ".",
      ...P,
      helperText: M,
      label: T,
      placeholder: o ? void 0 : L,
      value: c,
      prefix: i ? /* @__PURE__ */ n(a, { width: 24, height: 24, name: i }) : void 0,
      suffix: /* @__PURE__ */ d(z, { gutter: 8, className: e.suffix, children: [
        s && o ? /* @__PURE__ */ n(
          C,
          {
            placement: "top-end",
            content: s,
            fallbackPlacements: ["left-start"],
            children: /* @__PURE__ */ n("div", { className: e.tooltipIconWrapper, children: /* @__PURE__ */ n(a, { width: 20, height: 20, name: "infoOutlined" }) })
          }
        ) : void 0,
        !(r || f) && /* @__PURE__ */ n(
          ge,
          {
            size: b,
            onUp: w(!0),
            onDown: w(),
            disabled: t.disabled
          }
        )
      ] }),
      canClear: !t.readonly,
      disabled: t.disabled || r,
      labelProps: { classes: v },
      onChange: p
    }
  );
};
export {
  ve as I
};
//# sourceMappingURL=InputNumber-LxoF-2qZ.js.map
