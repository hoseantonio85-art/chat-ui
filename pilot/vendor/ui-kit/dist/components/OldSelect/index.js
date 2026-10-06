import { jsx as l, jsxs as b } from "react/jsx-runtime";
import { c as s } from "../../chunks/vendor-utils-TYjSchlL.js";
import { useState as L, useMemo as C, useCallback as _ } from "react";
import { iconMap as O, EIconName as T } from "../../icons.js";
import { C as w } from "../../chunks/Checkbox-BLPR3nKX.js";
import { R as P } from "../../chunks/Row-DT_8J65b.js";
import { I as m } from "../../chunks/Icon-BY6vNIR8.js";
import { O as A } from "../../chunks/OldScrollbar-QQ-a5dsW.js";
import { a as E } from "../../chunks/Typography-FIwI70kG.js";
import { C as y, o as q } from "../../chunks/vendor-other-4r8kKhmH.js";
const M = "_tag_1d9u4_1", W = "_inputContent_1d9u4_7", F = "_option_1d9u4_14", j = "_optionText_1d9u4_19", H = "_labelInside_1d9u4_30", K = "_withPrefix_1d9u4_30", v = "_topLabelsWrapper_1d9u4_34", z = "_filled_1d9u4_43", G = "_topLabels_1d9u4_34", J = "_label_1d9u4_30", Q = "_required_1d9u4_62", U = "_labelViewOnly_1d9u4_74", X = "_optionDisabled_1d9u4_81", Y = "_text_1d9u4_88", Z = "_optionItem_1d9u4_92", $ = "_optionItemText_1d9u4_102", ee = "_optionItemDisabled_1d9u4_106", ne = "_iconSelected_1d9u4_112", te = "_large_1d9u4_118", oe = "_inputRoot_1d9u4_118", de = "_treeList_1d9u4_130", le = "_treeLoading_1d9u4_138", ae = "_list_1d9u4_146", ie = "_optionActive_1d9u4_154", ce = "_loading_1d9u4_169", se = "_spin_1d9u4_1", re = "_loadingLabel_1d9u4_185", ue = "_inputArrowIconHidden_1d9u4_190", _e = "_inputRootViewOnly_1d9u4_209", me = "_error_1d9u4_224", pe = "_focused_1d9u4_227", be = "_helperTextError_1d9u4_234", Ce = "_input_1d9u4_7", fe = "_dropdownIconOpened_1d9u4_247", Ie = "_clearIcon_1d9u4_251", xe = "_dropdownIcon_1d9u4_247", he = "_inputContainer_1d9u4_263", ge = "_tree_1d9u4_130", Le = "_node_1d9u4_271", we = "_item_1d9u4_282", Pe = "_nodeContentContainer_1d9u4_285", ye = "_treeContent_1d9u4_288", Se = "_treeContentChecked_1d9u4_293", De = "_nodeContent_1d9u4_285", Oe = "_selectedIndicator_1d9u4_303", Te = "_itemDisabled_1d9u4_306", ke = "_itemSelected_1d9u4_309", Ne = "_itemFocused_1d9u4_312", Ve = "_expandButton_1d9u4_316", Be = "_expandButtonExpanded_1d9u4_325", Re = "_loadingIndicator_1d9u4_329", Ae = "_inputPrefix_1d9u4_340", n = {
  tag: M,
  inputContent: W,
  option: F,
  optionText: j,
  labelInside: H,
  withPrefix: K,
  topLabelsWrapper: v,
  filled: z,
  topLabels: G,
  label: J,
  required: Q,
  labelViewOnly: U,
  optionDisabled: X,
  text: Y,
  optionItem: Z,
  optionItemText: $,
  optionItemDisabled: ee,
  iconSelected: ne,
  large: te,
  inputRoot: oe,
  treeList: de,
  treeLoading: le,
  list: ae,
  optionActive: ie,
  loading: ce,
  spin: se,
  loadingLabel: re,
  inputArrowIconHidden: ue,
  inputRootViewOnly: _e,
  error: me,
  focused: pe,
  helperTextError: be,
  input: Ce,
  dropdownIconOpened: fe,
  clearIcon: Ie,
  dropdownIcon: xe,
  inputContainer: he,
  tree: ge,
  node: Le,
  item: we,
  nodeContentContainer: Pe,
  treeContent: ye,
  treeContentChecked: Se,
  nodeContent: De,
  selectedIndicator: Oe,
  itemDisabled: Te,
  itemSelected: ke,
  itemFocused: Ne,
  expandButton: Ve,
  expandButtonExpanded: Be,
  loadingIndicator: Re,
  inputPrefix: Ae
}, Ee = O[T.cross], qe = O[T.down], u = { label: "Не заполнено", value: "undefined" }, S = (t) => /* @__PURE__ */ l(
  qe,
  {
    className: s(n.dropdownIcon, {
      [n.dropdownIconOpened]: t.opened
    })
  }
), Me = () => /* @__PURE__ */ l(
  m,
  {
    name: "track",
    width: 16,
    height: 16,
    className: n.loadingIndicator
  }
), D = (t) => /* @__PURE__ */ l("div", { onMouseDown: (d) => {
  d.stopPropagation(), d.preventDefault(), t.canClear && !t.disabled && t.clearValue(d);
}, role: "button", tabIndex: -1, children: /* @__PURE__ */ l(Ee, { className: n.clearIcon }) }), We = {
  item: n.item,
  itemDisabled: n.itemDisabled,
  itemFocused: n.itemFocused,
  itemSelected: n.itemSelected,
  node: n.node,
  nodeContent: n.nodeContent,
  nodeContentContainer: n.nodeContentContainer,
  root: n.tree,
  selectedIndicator: n.selectedIndicator,
  treeContent: n.treeContent
}, Fe = (t) => /* @__PURE__ */ l(
  "button",
  {
    ...t,
    className: s(n.expandButton, {
      [n.expandButtonExpanded]: t.expanded
    }),
    children: /* @__PURE__ */ l(m, { name: "down" })
  }
), k = (t, i, d = []) => {
  const o = /* @__PURE__ */ new Set();
  for (const e of i) {
    if (t.some((a) => e.key === a.key))
      for (const a of d)
        o.add(a);
    if (e.children) {
      const a = k(
        t,
        e.children,
        [...d, e.key]
      );
      for (const c of a)
        o.add(c);
    }
  }
  return [...o];
}, je = (t) => /* @__PURE__ */ b("div", { className: n.treeContent, children: [
  t.children,
  t.selected && /* @__PURE__ */ l(m, { name: "check", className: n.treeContentChecked })
] }), He = (t) => {
  const i = C(
    () => t.selectedValue?.includes(t.option),
    [t.selectedValue, t.option]
  ), d = _((e) => {
    e.preventDefault(), e.stopPropagation();
  }, []), o = _(
    (e) => {
      e.preventDefault(), e.stopPropagation(), t.onSelectOption(t.option, e);
    },
    [t]
  );
  return t?.isInfoOption ? /* @__PURE__ */ l(P, { className: n.optionItem, children: t.children }) : /* @__PURE__ */ b(
    P,
    {
      gutter: 8,
      className: s(n.optionItem, {
        [n.optionItemDisabled]: t.option?.disabled,
        [n.optionItemSelected]: i
      }),
      justify: "between",
      onClick: o,
      onMouseDown: d,
      children: [
        /* @__PURE__ */ l(
          E,
          {
            size: "lg",
            nowrap: !0,
            className: n.optionItemText,
            title: t.option?.label,
            children: t.option?.label
          }
        ),
        i && /* @__PURE__ */ l(
          m,
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
}, Ke = ({
  loading: t,
  treeProps: i,
  ...d
}) => {
  const o = C(
    () => d.selectedValue.map((a) => String(a.key)),
    [d.selectedValue]
  ), e = _(
    (a, c) => {
      i?.selectMode === "strict" && (c.children?.length || c.loadable) || d.onSelectOption(c, {});
    },
    [d]
  );
  return /* @__PURE__ */ b("div", { className: n.treeList, children: [
    t && /* @__PURE__ */ l("div", { className: n.treeLoading, children: d.loadingLabel }),
    !t && /* @__PURE__ */ l(A, { contentMaxSize: 400, children: /* @__PURE__ */ l(
      q,
      {
        classes: We,
        components: {
          Content: je,
          ExpandButton: Fe,
          LoadingIndicator: Me
        },
        selectable: !0,
        onNodeSelect: e,
        selectedKeys: o,
        multipleSelect: d.isMulti,
        defaultExpandedKeys: k(
          d.selectedValue,
          d.options
        ),
        ...i,
        dataSource: d.options
      }
    ) })
  ] });
}, en = ({
  labelInside: t,
  onChange: i,
  tree: d,
  viewOnly: o,
  ...e
}) => {
  const a = {
    text: s(n.label, { [n.labelViewOnly]: o })
  }, [c, f] = L(!1), p = C(
    () => ({
      root: s(n.root, {
        [n.filled]: Array.isArray(e.value) ? e.value.length : e.value || c || e.placeholder,
        [n.labelInside]: t && !o
      }),
      ...n,
      inputRoot: s({
        [n.inputRoot]: !o,
        [n.inputRootViewOnly]: o
      })
    }),
    [e.value, c, t, o]
  ), [I, x] = L(null);
  e.labelProps && Object.assign(e.labelProps, { classes: a }), e.loading && Object.assign(p, {
    inputArrowIcon: n.inputArrowIconHidden
  });
  const h = {
    error: n.helperTextError
  }, N = _(
    (r) => (
      // @ts-expect-error несовместимость типов дерева и выпадающего списка
      /* @__PURE__ */ l(Ke, { ...r, treeProps: e.treeProps })
    ),
    [e.treeProps]
  ), g = (r, V, B, R) => {
    e.readonly || (e.multiple && Array.isArray(r) ? f(r.length > 0) : f(!!r), i?.(r, V, B, R));
  };
  return d ? /* @__PURE__ */ l(
    y,
    {
      ref: x,
      classes: p,
      hideDropdownOnOutsideScroll: !1,
      loadingLabel: /* @__PURE__ */ l("span", { className: n.loadingLabel, children: "Загрузка..." }),
      placeholder: "",
      dropdownProps: {
        container: I,
        popperOptions: {
          strategy: "absolute"
        }
      },
      labelProps: { classes: a },
      labelledClasses: {
        required: n.required,
        topLabels: n.topLabels,
        topLabelsWrapper: s(n.topLabelsWrapper, {
          [n.withPrefix]: e.inputPrefix
        })
      },
      components: {
        ClearIndicator: e.readonly ? () => null : D,
        DropdownIndicator: e.readonly ? () => null : S,
        Input: () => null,
        MultiCheckbox: w,
        OptionList: N
      },
      limitByWidth: !0,
      helperTextProps: { classes: h },
      ...e,
      value: o && !e.value ? e.multiple ? [u] : u : e.value,
      canClear: e.canClear && !e.readonly,
      opened: e.readonly ? !1 : e.opened,
      disabled: e.disabled || o,
      required: e.required && !o,
      inputPrefix: o ? void 0 : e.inputPrefix,
      onChange: g
    }
  ) : /* @__PURE__ */ l(
    y,
    {
      ref: x,
      classes: p,
      loadingLabel: /* @__PURE__ */ l("span", { className: n.loadingLabel, children: "Загрузка..." }),
      dropdownProps: {
        container: I,
        popperOptions: {
          strategy: "absolute"
        }
      },
      placeholder: "",
      limitByWidth: !0,
      hideDropdownOnOutsideScroll: !1,
      labelProps: { classes: a },
      labelledClasses: {
        required: n.required,
        topLabels: n.topLabels,
        topLabelsWrapper: s(n.topLabelsWrapper, {
          [n.withPrefix]: e.inputPrefix
        })
      },
      components: {
        ClearIndicator: e.readonly ? () => null : D,
        DropdownIndicator: e.readonly ? () => null : S,
        MultiCheckbox: w,
        OptionItem: He
      },
      helperTextProps: { classes: h },
      ...e,
      value: o && !e.value ? e.multiple ? [u] : u : e.value,
      canClear: e.canClear && !e.readonly,
      opened: e.readonly ? !1 : e.opened,
      disabled: e.disabled || o,
      required: e.required && !o,
      inputPrefix: o ? void 0 : e.inputPrefix,
      onChange: g
    }
  );
};
export {
  en as OldSelect
};
//# sourceMappingURL=index.js.map
