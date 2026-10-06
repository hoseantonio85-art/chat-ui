import { jsx as s } from "react/jsx-runtime";
import { c as a } from "./vendor-utils-TYjSchlL.js";
import { useState as C } from "react";
import { I as f } from "./Icon-BY6vNIR8.js";
import { j as y } from "./vendor-other-4r8kKhmH.js";
const h = "_input_1788g_1", x = "_containerLabelInside_1788g_9", I = "_topLabelsWrapper_1788g_12", m = "_topLabels_1788g_12", O = "_inputLabel_1788g_24", w = "_inputLabelError_1788g_28", B = "_focused_1788g_31", V = "_filled_1788g_31", v = "_inputContainer_1788g_35", T = "_containerSecondary_1788g_39", E = "_disabled_1788g_56", S = "_error_1788g_66", W = "_inputLabelBold_1788g_78", P = "_large_1788g_85", q = "_clearButton_1788g_85", j = "_helperText_1788g_103", F = "_textViewOnly_1788g_118", $ = "_required_1788g_123", k = "_inputContainerViewOnly_1788g_127", n = {
  input: h,
  containerLabelInside: x,
  topLabelsWrapper: I,
  topLabels: m,
  inputLabel: O,
  inputLabelError: w,
  focused: B,
  filled: V,
  inputContainer: v,
  containerSecondary: T,
  disabled: E,
  error: S,
  inputLabelBold: W,
  large: P,
  clearButton: q,
  helperText: j,
  textViewOnly: F,
  required: $,
  inputContainerViewOnly: k
}, J = (e) => {
  const { labelBold: r = !1, testId: t, viewOnly: l } = e, [i, c] = C(!1), _ = {
    container: a({
      [n.containerLabelInside]: e.labelInside && !l,
      [n.containerSecondary]: e.secondary,
      [n.filled]: e.value || i || e.placeholder
    }),
    ...n,
    inputContainer: a({
      [n.inputContainer]: !l,
      [n.inputContainerViewOnly]: l
    })
  }, d = {
    inputLabel: a(n.inputLabel, {
      [n.inputLabelBold]: r,
      [n.inputLabelError]: e.error
    }),
    topLabels: n.topLabels,
    topLabelsWrapper: n.topLabelsWrapper
  }, u = {
    text: a({ [n.textViewOnly]: l }),
    ...e.labelProps?.classes
  }, b = {
    error: n.error,
    helperText: n.helperText
  }, p = (o, L, g) => {
    e.readonly || (c(!!o), e.onChange?.(o, L, g));
  };
  return /* @__PURE__ */ s(
    y,
    {
      classes: _,
      showErrorIcon: !1,
      helperTextProps: { classes: b },
      labelledClasses: d,
      clearIcon: /* @__PURE__ */ s(f, { name: "cross" }),
      title: l ? e.value : void 0,
      ...e,
      value: l && !e.value ? "Не заполнено" : e.value,
      canClear: e.canClear && !e.readonly,
      disabled: e.disabled || l,
      labelProps: {
        ...e.labelProps,
        classes: u
      },
      onChange: p,
      "data-testid": t ? `${t}-input` : void 0
    }
  );
};
export {
  J as O
};
//# sourceMappingURL=OldInput-Cl8zcDqL.js.map
