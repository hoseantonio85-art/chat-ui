import { jsxs as p, jsx as s, Fragment as j } from "react/jsx-runtime";
import { c as a } from "./vendor-utils-TYjSchlL.js";
import A, { useState as b, useRef as D } from "react";
import { R as g } from "./Row-DT_8J65b.js";
import { I as r } from "./Icon-BY6vNIR8.js";
import { T as k } from "./Tooltip-kHcD51Z4.js";
import { i as N, j as H } from "./vendor-other-4r8kKhmH.js";
const K = "_containerLabelInside_1savk_1", G = "_topLabelsWrapper_1savk_4", J = "_topLabels_1savk_4", Q = "_label_1savk_17", U = "_labelError_1savk_23", Y = "_disabled_1savk_26", Z = "_focused_1savk_29", ee = "_rootFocused_1savk_29", te = "_filled_1savk_29", se = "_sizeL_1savk_32", ne = "_sizeXL_1savk_32", ie = "_sizeS_1savk_35", oe = "_sizeSWithPrefix_1savk_41", ae = "_sizeM_1savk_47", re = "_sizeMWithPrefix_1savk_53", le = "_sizeLWithPrefix_1savk_65", _e = "_sizeXLWithPrefix_1savk_77", ce = "_input_1savk_84", de = "_labelRequired_1savk_95", pe = "_prefix_1savk_100", he = "_grayColor_1savk_106", fe = "_error_1savk_110", ue = "_viewOnly_1savk_114", xe = "_suffix_1savk_119", ve = "_clearButton_1savk_125", be = "_inputContainer_1savk_132", ge = "_labelAfter_1savk_138", ke = "_sizeSPaddingRight_1savk_172", ze = "_sizeMPaddingRight_1savk_199", Pe = "_sizeLPaddingRight_1savk_225", Le = "_sizeXLPaddingRight_1savk_251", me = "_noBorder_1savk_270", Ce = "_helperText_1savk_327", Re = "_helperTextError_1savk_333", we = "_textViewOnly_1savk_348", ye = "_required_1savk_353", We = "_inputContainerViewOnly_1savk_357", Ie = "_tooltipIcon_1savk_373", Oe = "_containerComplex_1savk_377", e = {
  containerLabelInside: K,
  topLabelsWrapper: G,
  topLabels: J,
  label: Q,
  labelError: U,
  disabled: Y,
  focused: Z,
  rootFocused: ee,
  filled: te,
  sizeL: se,
  sizeXL: ne,
  sizeS: ie,
  sizeSWithPrefix: oe,
  sizeM: ae,
  sizeMWithPrefix: re,
  sizeLWithPrefix: le,
  sizeXLWithPrefix: _e,
  input: ce,
  labelRequired: de,
  prefix: pe,
  grayColor: he,
  error: fe,
  viewOnly: ue,
  suffix: xe,
  clearButton: ve,
  inputContainer: be,
  labelAfter: ge,
  sizeSPaddingRight: ke,
  sizeMPaddingRight: ze,
  sizeLPaddingRight: Pe,
  sizeXLPaddingRight: Le,
  noBorder: me,
  helperText: Ce,
  helperTextError: Re,
  textViewOnly: we,
  required: ye,
  inputContainerViewOnly: We,
  tooltipIcon: Ie,
  containerComplex: Oe
}, Fe = A.forwardRef(
  (t, z) => {
    const {
      icon: _,
      label: h,
      labelInside: o,
      placeholder: P,
      required: L,
      size: c = "M",
      tooltip: i,
      viewOnly: n,
      readonly: f,
      isComplexPart: m,
      noBorder: C,
      grayPrefix: R,
      suffix: u,
      classes: x,
      ...w
    } = t, [y, W] = b(!1), [I, v] = b(!1), O = D(null), T = N([z, O]), M = {
      container: a(
        e[`size${c}`],
        e[`size${c}PaddingRight`],
        {
          [e.containerLabelInside]: o && !n,
          [e.filled]: t.value || y,
          [e[`size${c}WithPrefix`]]: !!_,
          [e.viewOnly]: n,
          [e.containerComplex]: m
        },
        x?.container
      ),
      ...e,
      prefix: a(e.prefix, {
        [e.grayColor]: R
      }),
      inputContainer: a(
        {
          [e.inputContainer]: !n,
          [e.inputContainerViewOnly]: n,
          [e.noBorder]: C
        },
        x?.inputContainer
      )
    }, S = {
      inputLabel: a({
        [e.labelError]: t.error,
        [e.labelRequired]: L
      }),
      topLabels: e.topLabels,
      topLabelsWrapper: e.topLabelsWrapper
    }, B = {
      text: a({ [e.textViewOnly]: n })
    }, X = {
      error: e.error,
      helperText: e.helperText
    }, q = (l, d, $) => {
      d.stopPropagation(), d.preventDefault(), !f && (W(!!l), t.onChange?.(l, d, $));
    }, E = !h && !i ? null : /* @__PURE__ */ p(g, { gutter: 4, noFlex: !0, children: [
      /* @__PURE__ */ s("span", { className: e.label, children: h }),
      i && !o && /* @__PURE__ */ s(
        k,
        {
          placement: "top-end",
          content: i,
          fallbackPlacements: ["left-start"],
          children: /* @__PURE__ */ s("span", { className: e.tooltipIcon, children: /* @__PURE__ */ s(r, { width: 16, height: 16, name: "infoOutlined" }) })
        }
      )
    ] }), F = t.helperText && /* @__PURE__ */ p(g, { gutter: 4, children: [
      t.error && t.helperText && /* @__PURE__ */ s(r, { width: 16, height: 16, name: "errorRounded" }),
      t.helperText
    ] }), V = (l) => {
      l.stopPropagation();
    };
    return /* @__PURE__ */ s(
      H,
      {
        inputRef: T,
        classes: M,
        showErrorIcon: !1,
        helperTextProps: { classes: X },
        labelledClasses: S,
        clearIcon: /* @__PURE__ */ s(r, { width: 16, height: 16, name: "errorRounded" }),
        title: n ? t.value : void 0,
        ...w,
        helperText: F,
        label: E,
        placeholder: o && !I ? void 0 : P,
        value: n && !t.value ? "Не заполнено" : t.value,
        prefix: _ ? /* @__PURE__ */ s(r, { width: 24, height: 24, name: _ }) : void 0,
        suffix: i && o || u ? /* @__PURE__ */ p(j, { children: [
          i && o && /* @__PURE__ */ s(
            k,
            {
              placement: "top-end",
              content: i,
              fallbackPlacements: ["left-start"],
              children: /* @__PURE__ */ s("span", { children: /* @__PURE__ */ s(r, { width: 20, height: 20, name: "infoOutlined" }) })
            }
          ),
          u
        ] }) : void 0,
        canClear: !f && !t.disabled,
        disabled: t.disabled || n,
        labelProps: { classes: B },
        onChange: q,
        onKeyDown: V,
        onFocusCapture: () => v(!0),
        onBlurCapture: () => v(!1)
      }
    );
  }
);
export {
  Fe as I
};
//# sourceMappingURL=Input-BbQKUsMM.js.map
