import { jsx as o } from "react/jsx-runtime";
import { c as i } from "./vendor-utils-TYjSchlL.js";
import { useState as C, useMemo as S } from "react";
import { I as r } from "./Icon-BY6vNIR8.js";
import { I as b } from "./vendor-other-4r8kKhmH.js";
const m = "_root_hz2dk_1", W = "_labelAfter_hz2dk_6", I = "_sizeS_hz2dk_6", P = "_containerLabelInside_hz2dk_6", B = "_disabled_hz2dk_6", g = "_filled_hz2dk_6", M = "_topLabelsWrapper_hz2dk_6", T = "_error_hz2dk_6", y = "_inputContainer_hz2dk_6", E = "_prefixContainer_hz2dk_16", X = "_sizeXLWithPrefix_hz2dk_16", F = "_prefix_hz2dk_16", A = "_sizeLWithPrefix_hz2dk_16", w = "_sizeMWithPrefix_hz2dk_16", N = "_sizeSWithPrefix_hz2dk_16", $ = "_label_hz2dk_6", j = "_input_hz2dk_6", v = "_sizeM_hz2dk_16", R = "_sizeL_hz2dk_16", q = "_sizeXL_hz2dk_16", D = "_inputSecond_hz2dk_99", G = "_suffix_hz2dk_121", H = "_disabledSecond_hz2dk_126", J = "_inputContainerSecond_hz2dk_129", K = "_focused_hz2dk_133", O = "_inputClear_hz2dk_157", Q = "_inputLabel_hz2dk_214", U = "_inputLabelBold_hz2dk_218", V = "_inputLabelError_hz2dk_229", Y = "_large_hz2dk_233", Z = "_clearButton_hz2dk_237", ee = "_helperText_hz2dk_241", ne = "_topLabels_hz2dk_6", se = "_topLabelsInside_hz2dk_253", e = {
  root: m,
  labelAfter: W,
  sizeS: I,
  containerLabelInside: P,
  disabled: B,
  filled: g,
  topLabelsWrapper: M,
  error: T,
  inputContainer: y,
  prefixContainer: E,
  sizeXLWithPrefix: X,
  prefix: F,
  sizeLWithPrefix: A,
  sizeMWithPrefix: w,
  sizeSWithPrefix: N,
  label: $,
  input: j,
  sizeM: v,
  sizeL: R,
  sizeXL: q,
  inputSecond: D,
  suffix: G,
  disabledSecond: H,
  inputContainerSecond: J,
  focused: K,
  inputClear: O,
  inputLabel: Q,
  inputLabelBold: U,
  inputLabelError: V,
  large: Y,
  clearButton: Z,
  helperText: ee,
  topLabels: ne,
  topLabelsInside: se
}, ae = ({
  canClear: l,
  onChange: a,
  value: t,
  size: _ = "M",
  ...n
}) => {
  const { labelBold: L = !1 } = n, [d, c] = C(!1), k = S(
    () => ({
      ...e,
      container: i(e[`size${_}`], e[`size${_}WithPrefix`], {
        [e.focused]: d
      })
    }),
    [d]
  ), p = () => c(!0), u = () => c(!1), h = (s, x) => {
    n.readonly || a?.(x ? [s, t?.[1]] : [t?.[0], s]);
  }, z = {
    inputLabel: i(e.inputLabel, {
      [e.inputLabelBold]: L,
      [e.inputLabelError]: n.error
    }),
    topLabels: i(e.topLabels)
  }, f = {
    error: e.error,
    helperText: e.helperText
  };
  return /* @__PURE__ */ o("div", { className: e.root, children: /* @__PURE__ */ o(
    b,
    {
      classes: k,
      showErrorIcon: !1,
      helperTextProps: { classes: f },
      labelledClasses: z,
      clearIcon: /* @__PURE__ */ o(r, { name: "cross" }),
      groupSeparator: " ",
      precision: 0,
      ...n,
      valueType: "number",
      value: t?.[0],
      onChange: (s) => h(s, !0),
      prefix: /* @__PURE__ */ o(r, { name: "ruble" }),
      onFocus: p,
      onBlur: u,
      suffix: /* @__PURE__ */ o(
        b,
        {
          classes: {
            disabled: e.disabledSecond,
            input: e.inputSecond,
            inputClear: e.inputClear,
            inputContainer: e.inputContainerSecond,
            large: e.large
          },
          showErrorIcon: !1,
          helperTextProps: { classes: f },
          labelledClasses: z,
          clearIcon: /* @__PURE__ */ o(r, { name: "cross" }),
          groupSeparator: " ",
          precision: 0,
          ...n,
          valueType: "number",
          value: t?.[1],
          onChange: (s) => h(s, !1),
          placeholder: "до",
          label: null,
          helperText: null,
          canClear: l && !n.readonly && !n.disabled,
          onBlur: u,
          onFocus: p
        }
      ),
      placeholder: "от",
      canClear: l && !n.readonly && !n.disabled
    }
  ) });
};
export {
  ae as M
};
//# sourceMappingURL=MoneyRangeInput-BpEwkpd-.js.map
