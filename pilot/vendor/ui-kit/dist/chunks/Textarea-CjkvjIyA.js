import { jsxs as l, jsx as a, Fragment as z } from "react/jsx-runtime";
import { useState as h, useMemo as x } from "react";
import { c as r } from "./vendor-utils-TYjSchlL.js";
import { R as V } from "./Row-DT_8J65b.js";
import { I as s } from "./Icon-BY6vNIR8.js";
import { T as m } from "./Tooltip-kHcD51Z4.js";
import { l as q } from "./vendor-other-4r8kKhmH.js";
const N = "_container_1r807_1", W = "_topLabels_1r807_8", k = "_containerLabelInside_1r807_16", P = "_asterisk_1r807_16", T = "_textViewOnly_1r807_16", $ = "_description_1r807_20", S = "_required_1r807_25", M = "_suffix_1r807_34", E = "_counter_1r807_41", I = "_textareaContainer_1r807_48", R = "_sizeS_1r807_54", j = "_sizeM_1r807_64", X = "_sizeL_1r807_70", F = "_sizeXL_1r807_76", A = "_fullWidth_1r807_87", B = "_textareaContainerViewOnly_1r807_98", D = "_textarea_1r807_48", G = "_clear_1r807_120", H = "_topLabelsWrapper_1r807_156", J = "_disabled_1r807_183", K = "_filled_1r807_183", Q = "_focused_1r807_183", U = "_inputLabel_1r807_209", Y = "_inputLabelError_1r807_220", Z = "_error_1r807_250", p = "_helperText_1r807_296", ee = "_text_1r807_16", n = {
  container: N,
  topLabels: W,
  containerLabelInside: k,
  asterisk: P,
  textViewOnly: T,
  description: $,
  required: S,
  suffix: M,
  counter: E,
  textareaContainer: I,
  sizeS: R,
  sizeM: j,
  sizeL: X,
  sizeXL: F,
  fullWidth: A,
  textareaContainerViewOnly: B,
  textarea: D,
  clear: G,
  topLabelsWrapper: H,
  disabled: J,
  filled: K,
  focused: Q,
  inputLabel: U,
  inputLabelError: Y,
  error: Z,
  helperText: p,
  text: ee,
  "rows-1": "_rows-1_1r807_319",
  "rows-2": "_rows-2_1r807_324",
  "rows-3": "_rows-3_1r807_329",
  "rows-4": "_rows-4_1r807_334",
  "rows-5": "_rows-5_1r807_339",
  "rows-6": "_rows-6_1r807_344",
  "rows-7": "_rows-7_1r807_349",
  "rows-8": "_rows-8_1r807_354",
  "rows-9": "_rows-9_1r807_359",
  "rows-10": "_rows-10_1r807_364",
  "rows-11": "_rows-11_1r807_369",
  "rows-12": "_rows-12_1r807_374"
}, ie = ({
  labelInside: o,
  maxLength: i,
  helperText: _,
  fullWidth: c,
  tooltip: t,
  size: d = "M",
  ...e
}) => {
  const [w, v] = h(!1), [L, y] = h(
    e.defaultValue?.toString()?.length || e.value?.toString()?.length || 0
  ), b = x(
    () => ({
      container: r(n.container, n[`size${d}`], {
        [n.containerLabelInside]: o && !e.viewOnly,
        [n.filled]: e.value || w || e.placeholder,
        [n.fullWidth]: c
      }),
      disabled: n.disabled,
      error: n.error,
      focused: n.focused,
      textarea: n.textarea,
      textareaContainer: r({
        [n.fullWidth]: c,
        [n.textareaContainer]: !e.viewOnly,
        [n.textareaContainerViewOnly]: e.viewOnly,
        [n[`rows-${e.rows}`]]: e.viewOnly
      })
    }),
    [w, e.value]
  ), O = x(
    () => ({
      description: n.description,
      inputLabel: r(n.inputLabel, n[`size${d}`], {
        [n.inputLabelError]: e.error
      }),
      required: n.required,
      text: n.text,
      topLabels: r(n.topLabels, {
        [n.topLabelsViewOnly]: e.viewOnly
      }),
      topLabelsWrapper: r(n.topLabelsWrapper, n[`size${d}`])
    }),
    [e.error]
  ), C = {
    text: r({ [n.textViewOnly]: e.viewOnly }),
    ...e.labelProps?.classes
  }, f = (u, g) => {
    e.readonly || (v(!!u), y(u.length), e.onChange?.(u, g));
  };
  return /* @__PURE__ */ l("div", { style: { width: c ? "100%" : "auto" }, children: [
    /* @__PURE__ */ l("div", { className: b.container, children: [
      /* @__PURE__ */ a(
        q,
        {
          classes: b,
          labelledClasses: O,
          title: e.viewOnly ? e.value : void 0,
          ...e,
          rows: e.viewOnly && !e.value ? 1 : e.rows,
          value: e.viewOnly && !e.value ? "Не заполнено" : e.value,
          label: e.required && !e.viewOnly ? /* @__PURE__ */ l(z, { children: [
            e.label,
            /* @__PURE__ */ a("span", { className: n.asterisk, children: "*" })
          ] }) : e.label,
          disabled: e.disabled || e.viewOnly,
          required: e.required && !e.viewOnly,
          labelProps: {
            ...e.labelProps,
            classes: C
          },
          description: t && !o ? /* @__PURE__ */ a(
            m,
            {
              placement: "top-end",
              content: t,
              fallbackPlacements: ["left-start"],
              children: /* @__PURE__ */ a("div", { className: n.description, children: /* @__PURE__ */ a(s, { width: 16, height: 16, name: "infoOutlined" }) })
            }
          ) : void 0,
          onChange: f,
          textareaProps: { maxLength: i }
        }
      ),
      /* @__PURE__ */ l(
        V,
        {
          className: n.suffix,
          align: "middle",
          justify: "center",
          gutter: 4,
          children: [
            (e.canClear ?? !1) && !(e.readonly || e.viewOnly) && e.value && !e.disabled ? /* @__PURE__ */ a("div", { className: n.clear, children: /* @__PURE__ */ a(
              s,
              {
                name: "errorRounded",
                width: 16,
                height: 16,
                onClick: () => f("", {})
              }
            ) }) : null,
            t && o ? /* @__PURE__ */ a(
              m,
              {
                placement: "top-end",
                content: t,
                fallbackPlacements: ["left-start"],
                children: /* @__PURE__ */ a("div", { className: n.description, children: /* @__PURE__ */ a(s, { width: 20, height: 20, name: "infoOutlined" }) })
              }
            ) : null
          ]
        }
      ),
      i ? /* @__PURE__ */ a("div", { className: n.counter, children: `${L}/${i}` }) : null
    ] }),
    _ ? /* @__PURE__ */ l(
      "div",
      {
        className: r(n.helperText, {
          [n.error]: e.error
        }),
        children: [
          e.error && _ && /* @__PURE__ */ a(s, { width: 16, height: 16, name: "errorRounded" }),
          _
        ]
      }
    ) : null
  ] });
};
export {
  ie as T
};
//# sourceMappingURL=Textarea-CjkvjIyA.js.map
