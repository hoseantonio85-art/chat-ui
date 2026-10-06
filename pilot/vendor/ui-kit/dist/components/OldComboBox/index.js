import { jsx as a, jsxs as R } from "react/jsx-runtime";
import { c as i } from "../../chunks/vendor-utils-TYjSchlL.js";
import { useState as u, useMemo as x, useEffect as T, useCallback as C } from "react";
import { iconMap as w, EIconName as D } from "../../icons.js";
import { C as B } from "../../chunks/Checkbox-BLPR3nKX.js";
import { R as f } from "../../chunks/Row-DT_8J65b.js";
import { I as k } from "../../chunks/Icon-BY6vNIR8.js";
import { a as F } from "../../chunks/Typography-FIwI70kG.js";
import { C as E } from "../../chunks/vendor-other-4r8kKhmH.js";
const v = "_rootControl_1rlcg_1", N = "_isSearchable_1rlcg_1", q = "_input_1rlcg_1", M = "_inputContent_1rlcg_5", W = "_tag_1rlcg_13", j = "_option_1rlcg_19", H = "_optionText_1rlcg_24", z = "_labelInside_1rlcg_35", G = "_withPrefix_1rlcg_35", J = "_topLabelsWrapper_1rlcg_39", K = "_filled_1rlcg_48", Q = "_rootFocused_1rlcg_48", U = "_topLabels_1rlcg_39", X = "_label_1rlcg_35", Y = "_required_1rlcg_67", Z = "_labelViewOnly_1rlcg_79", $ = "_optionDisabled_1rlcg_86", ee = "_text_1rlcg_93", ne = "_optionItem_1rlcg_97", oe = "_optionItemText_1rlcg_107", te = "_optionItemDisabled_1rlcg_111", le = "_iconSelected_1rlcg_117", ce = "_large_1rlcg_123", ae = "_inputRoot_1rlcg_123", re = "_treeList_1rlcg_135", ie = "_treeLoading_1rlcg_143", se = "_list_1rlcg_151", de = "_optionActive_1rlcg_159", _e = "_loading_1rlcg_174", ue = "_spin_1rlcg_1", ge = "_loadingLabel_1rlcg_190", pe = "_inputArrowIconHidden_1rlcg_195", be = "_inputRootViewOnly_1rlcg_214", me = "_error_1rlcg_229", Ie = "_focused_1rlcg_232", Ce = "_helperTextError_1rlcg_239", fe = "_dropdownIconOpened_1rlcg_247", he = "_clearIcon_1rlcg_251", xe = "_dropdownIcon_1rlcg_247", we = "_inputContainer_1rlcg_263", De = "_tree_1rlcg_135", Le = "_node_1rlcg_271", ye = "_item_1rlcg_282", Pe = "_nodeContentContainer_1rlcg_285", Se = "_treeContent_1rlcg_288", Ae = "_treeContentChecked_1rlcg_293", Oe = "_nodeContent_1rlcg_285", Ve = "_selectedIndicator_1rlcg_303", Re = "_itemDisabled_1rlcg_306", Te = "_itemSelected_1rlcg_309", Be = "_itemFocused_1rlcg_312", ke = "_expandButton_1rlcg_316", Fe = "_expandButtonExpanded_1rlcg_325", Ee = "_loadingIndicator_1rlcg_329", ve = "_inputPrefix_1rlcg_340", n = {
  rootControl: v,
  isSearchable: N,
  input: q,
  inputContent: M,
  tag: W,
  option: j,
  optionText: H,
  labelInside: z,
  withPrefix: G,
  topLabelsWrapper: J,
  filled: K,
  rootFocused: Q,
  topLabels: U,
  label: X,
  required: Y,
  labelViewOnly: Z,
  optionDisabled: $,
  text: ee,
  optionItem: ne,
  optionItemText: oe,
  optionItemDisabled: te,
  iconSelected: le,
  large: ce,
  inputRoot: ae,
  treeList: re,
  treeLoading: ie,
  list: se,
  optionActive: de,
  loading: _e,
  spin: ue,
  loadingLabel: ge,
  inputArrowIconHidden: pe,
  inputRootViewOnly: be,
  error: me,
  focused: Ie,
  helperTextError: Ce,
  dropdownIconOpened: fe,
  clearIcon: he,
  dropdownIcon: xe,
  inputContainer: we,
  tree: De,
  node: Le,
  item: ye,
  nodeContentContainer: Pe,
  treeContent: Se,
  treeContentChecked: Ae,
  nodeContent: Oe,
  selectedIndicator: Ve,
  itemDisabled: Re,
  itemSelected: Te,
  itemFocused: Be,
  expandButton: ke,
  expandButtonExpanded: Fe,
  loadingIndicator: Ee,
  inputPrefix: ve
}, Ne = w[D.cross], qe = w[D.down], h = { label: "Не заполнено", value: "undefined" }, Me = (o) => {
  const { onOpen: c, opened: l } = o;
  return /* @__PURE__ */ a(
    qe,
    {
      onMouseDown: (t) => {
        t.preventDefault(), c(!l);
      },
      className: i(n.dropdownIcon, {
        [n.dropdownIconOpened]: l
      })
    }
  );
}, We = (o) => /* @__PURE__ */ a("div", { onMouseDown: (l) => {
  l.stopPropagation(), l.preventDefault(), o.canClear && !o.disabled && o.clearValue(l);
}, role: "button", tabIndex: -1, children: /* @__PURE__ */ a(Ne, { className: n.clearIcon }) }), je = (o) => {
  const c = x(
    () => o.selectedValue?.includes(o.option),
    [o.selectedValue, o.option]
  ), l = C((t) => {
    t.preventDefault(), t.stopPropagation();
  }, []), s = C(
    (t) => {
      t.preventDefault(), t.stopPropagation(), o.onSelectOption(o.option, t);
    },
    [o]
  );
  return o?.isInfoOption ? /* @__PURE__ */ a(f, { className: n.optionItem, children: o.children }) : /* @__PURE__ */ R(
    f,
    {
      gutter: 8,
      className: i(n.optionItem, {
        [n.optionItemDisabled]: o.option?.disabled,
        [n.optionItemSelected]: c
      }),
      justify: "between",
      onClick: s,
      onMouseDown: l,
      children: [
        /* @__PURE__ */ a(
          F,
          {
            size: "lg",
            nowrap: !0,
            className: n.optionItemText,
            title: o.option?.label,
            children: o.option?.label
          }
        ),
        c && /* @__PURE__ */ a(
          k,
          {
            width: 20,
            height: 20,
            className: n.iconSelected,
            name: "check"
          }
        )
      ]
    }
  );
}, Ze = ({
  components: o,
  labelInside: c,
  onChange: l,
  onInputChange: s,
  viewOnly: t,
  ...e
}) => {
  const g = {
    text: i(n.label, { [n.labelViewOnly]: t })
  }, [p, d] = u(
    Array.isArray(e.value) ? e.value.length : e.value || e.inputValue
  ), [b, m] = u(!1), I = x(
    () => ({
      root: i(n.root, {
        [n.filled]: Array.isArray(e.value) ? e.value.length : e.value || e.inputValue || p,
        [n.isSearchable]: e.isSearchable,
        [n.labelInside]: c && !t,
        [n.rootFocused]: b
      }),
      ...n,
      inputRoot: i({
        [n.inputRoot]: !t,
        [n.inputRootViewOnly]: t
      })
    }),
    [
      p,
      b,
      c,
      e.inputValue,
      e.isSearchable,
      e.value
    ]
  ), [L, y] = u(null);
  T(() => {
    d(
      Array.isArray(e.value) ? e.value.length : e.value || e.inputValue
    );
  }, [e.value]), e.labelProps && Object.assign(e.labelProps, { classes: g }), e.loading && Object.assign(I, {
    inputArrowIcon: n.inputArrowIconHidden
  });
  const P = {
    error: n.helperTextError
  }, S = (r, _, O, V) => {
    e.readonly || (e.multiple && Array.isArray(r) ? d(r.length > 0) : d(!!r), l?.(r, _, O, V));
  }, A = (r, _) => {
    e.readonly || (d(!!r), s?.(r, _));
  };
  return /* @__PURE__ */ a(
    E,
    {
      ref: y,
      classes: I,
      loadingLabel: /* @__PURE__ */ a("span", { className: n.loadingLabel, children: "Загрузка..." }),
      dropdownProps: {
        container: L,
        popperOptions: {
          strategy: "absolute"
        }
      },
      placeholder: "",
      limitByWidth: !0,
      hideDropdownOnOutsideScroll: !1,
      labelProps: { classes: g },
      labelledClasses: {
        required: n.required,
        topLabels: n.topLabels,
        topLabelsWrapper: i(n.topLabelsWrapper, {
          [n.withPrefix]: e.inputPrefix
        })
      },
      inputInnerProps: {
        onFocus: () => m(!0),
        onBlur: () => m(!1)
      },
      components: {
        ClearIndicator: e.readonly ? () => null : We,
        DropdownIndicator: e.readonly ? () => null : Me,
        MultiCheckbox: B,
        OptionItem: je,
        ...o
      },
      helperTextProps: { classes: P },
      isSearchable: !0,
      ...e,
      options: e.options,
      value: t && !e.value ? e.multiple ? [h] : h : e.value || null,
      canClear: e.canClear && !e.readonly,
      opened: e.readonly ? !1 : e.opened,
      disabled: e.disabled || t,
      required: e.required && !t,
      inputPrefix: t ? void 0 : e.inputPrefix,
      onChange: S,
      onInputChange: A
    }
  );
};
export {
  Ze as OldComboBox
};
//# sourceMappingURL=index.js.map
