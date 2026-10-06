import { jsxs as v, jsx as n, Fragment as ye } from "react/jsx-runtime";
import { c as m } from "./vendor-utils-TYjSchlL.js";
import U, { useState as V, useEffect as M, useMemo as I, useCallback as N, useRef as H } from "react";
import { iconMap as Pe, EIconName as Ie } from "../icons.js";
import { C as Te } from "./Chips-Dt98kqGh.js";
import { B as fe } from "./Button-C-z9nYbB.js";
import { I as Ve } from "./Input-BbQKUsMM.js";
import { R as F } from "./Row-DT_8J65b.js";
import { I as B } from "./Icon-BY6vNIR8.js";
import { T as Re } from "./Tooltip-kHcD51Z4.js";
import { o as De, i as Me, H as Fe, C as me } from "./vendor-other-4r8kKhmH.js";
import { u as Ee } from "./useLegacyEffect-CktvkRSe.js";
import { S as qe } from "./ScrollBar-DrXIjZcb.js";
import { a as ae } from "./Typography-FIwI70kG.js";
import { C as Oe } from "./Checkbox-BLPR3nKX.js";
const $e = "_fieldGrid_17ppy_1", Ae = "_complexFieldWithHelper_17ppy_8", be = {
  fieldGrid: $e,
  complexFieldWithHelper: Ae
}, He = (e) => {
  const {
    label: o,
    search: i,
    handleChange: r,
    value: a,
    scopeProps: s,
    grayIcon: u,
    ...p
  } = e, [f, b] = V(i?.value ?? ""), [g, h] = V(
    i?.scope ?? s?.options?.[0] ?? null
  ), S = (C) => b(C), R = (C, x, E) => h(E);
  return M(() => {
    r?.(f, g);
  }, [f, g]), /* @__PURE__ */ v(
    "div",
    {
      className: m(be.fieldGrid, {
        [be.complexFieldWithHelper]: !!p.helperText
      }),
      children: [
        /* @__PURE__ */ n(
          Ve,
          {
            ...p,
            value: a ?? f,
            onChange: S,
            label: o ?? "Label",
            isComplexPart: !0,
            grayPrefix: !!u
          }
        ),
        /* @__PURE__ */ n(
          jn,
          {
            options: s.options,
            value: g,
            onChange: R,
            size: p.size,
            dropdownProps: {
              placement: "bottom-end"
            },
            limitByWidth: !1,
            openOnFocus: !0,
            isComplexPart: !0
          }
        )
      ]
    }
  );
}, Xe = (e) => {
  const {
    label: o,
    search: i,
    handleChange: r,
    value: a,
    scopeProps: s,
    grayIcon: u,
    ...p
  } = e, f = i?.scope ?? s?.options?.[0] ?? null;
  return e.scopeProps ? /* @__PURE__ */ n(
    He,
    {
      ...e,
      icon: "search"
    }
  ) : /* @__PURE__ */ n(
    Ve,
    {
      ...p,
      value: a ?? i?.value ?? "",
      onChange: (b) => r?.(b, f),
      label: o ?? "Search",
      grayPrefix: !!u,
      icon: "search"
    }
  );
}, je = "_divider_1kxeu_1", Ke = {
  divider: je
}, ge = () => /* @__PURE__ */ n("div", { className: Ke.divider });
function Ge(e, o) {
  if (!o.trim() || !e.trim())
    return [{ text: e, isHighlighted: !1 }];
  const i = o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), r = new RegExp(`(${i})`, "gi"), a = new RegExp(`^${i}$`, "i");
  return e.split(r).map((s, u) => ({
    text: s,
    isHighlighted: u % 2 === 1 && a.test(s)
  })).filter((s) => s.text !== "");
}
const Ue = (e) => {
  const { name: o, search: i } = e, r = I(
    () => Ge(o, i),
    [o, i]
  );
  return i ? /* @__PURE__ */ n(ye, { children: r.map(
    (a, s) => a.isHighlighted ? /* @__PURE__ */ n("span", { children: a.text }, s) : /* @__PURE__ */ n(U.Fragment, { children: a.text }, s)
  ) }) : o;
}, Je = "_itemWrap_ktcwq_1", Qe = "_itemTextWrap_ktcwq_15", Ye = "_optionValueText_ktcwq_24", Ze = "_optionValueWrap_ktcwq_29", et = "_optionItemText_ktcwq_34", tt = "_disabled_ktcwq_45", nt = "_iconWrap_ktcwq_54", ot = "_iconSelected_ktcwq_58", P = {
  itemWrap: Je,
  itemTextWrap: Qe,
  optionValueText: Ye,
  optionValueWrap: Ze,
  optionItemText: et,
  disabled: tt,
  iconWrap: nt,
  iconSelected: ot
}, at = (e) => {
  const {
    option: o,
    selectedValue: i,
    onSelectOption: r,
    showOptionValue: a,
    isMulti: s,
    testId: u,
    searchValue: p
  } = e, f = I(() => (i ?? []).map(({ key: S }) => S).some((S) => S === o.key), [i, o]), b = N((h) => {
    h.preventDefault(), h.stopPropagation();
  }, []), g = N(
    (h) => {
      h.preventDefault(), h.stopPropagation(), !(o.disabled || o.loadable) && r?.(o, h);
    },
    [r, o.disabled, o.loadable]
  );
  return /* @__PURE__ */ n(
    "li",
    {
      role: "option",
      className: m(P.itemWrap, {
        [P.disabled]: o.disabled || o.loadable
      }),
      title: o.label,
      onClick: g,
      onMouseDown: b,
      "data-testid": u ? `${u}-item` : void 0,
      children: /* @__PURE__ */ v(F, { justify: "between", children: [
        /* @__PURE__ */ v("div", { className: P.itemTextWrap, children: [
          s && /* @__PURE__ */ n(Oe, { checked: f, disabled: o.selectDisabled }),
          /* @__PURE__ */ v(F, { className: P.optionValueWrap, children: [
            a && /* @__PURE__ */ n(ae, { size: "lg", nowrap: !0, className: P.optionValueText, children: o.value }),
            /* @__PURE__ */ n(
              ae,
              {
                size: "lg",
                nowrap: !p,
                className: P.optionItemText,
                children: /* @__PURE__ */ n(
                  Ue,
                  {
                    name: o.label || "",
                    search: p || ""
                  }
                )
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ n("div", { className: P.iconWrap, children: f && !s && /* @__PURE__ */ n(
          B,
          {
            width: 24,
            height: 24,
            className: P.iconSelected,
            name: "check"
          }
        ) })
      ] })
    }
  );
}, it = "_dropListWrap_1q1u5_1", lt = "_withMinWidth_1q1u5_9", rt = "_dropList_1q1u5_1", st = "_scrollbar_1q1u5_20", ct = "_sideWrap_1q1u5_25", dt = "_buttonsWrap_1q1u5_29", ut = "_emptyList_1q1u5_33", _t = "_treeList_1q1u5_38", pt = "_treeLoading_1q1u5_46", ht = "_tree_1q1u5_38", ft = "_node_1q1u5_58", mt = "_item_1q1u5_72", bt = "_nodeContentContainer_1q1u5_75", gt = "_treeContent_1q1u5_81", Ct = "_treeContentChecked_1q1u5_86", vt = "_treeContentValue_1q1u5_90", xt = "_treeContentWrap_1q1u5_94", St = "_treeContentWrapSelected_1q1u5_99", Wt = "_treeContentText_1q1u5_102", wt = "_nodeContent_1q1u5_75", Lt = "_selectedIndicator_1q1u5_114", yt = "_itemDisabled_1q1u5_117", Pt = "_itemSelected_1q1u5_121", It = "_itemFocused_1q1u5_124", Vt = "_expandButtonWrap_1q1u5_128", d = {
  dropListWrap: it,
  withMinWidth: lt,
  dropList: rt,
  scrollbar: st,
  sideWrap: ct,
  buttonsWrap: dt,
  emptyList: ut,
  treeList: _t,
  treeLoading: pt,
  tree: ht,
  node: ft,
  item: mt,
  nodeContentContainer: bt,
  treeContent: gt,
  treeContentChecked: Ct,
  treeContentValue: vt,
  treeContentWrap: xt,
  treeContentWrapSelected: St,
  treeContentText: Wt,
  nodeContent: wt,
  selectedIndicator: Lt,
  itemDisabled: yt,
  itemSelected: Pt,
  itemFocused: It,
  expandButtonWrap: Vt
}, Rt = ({
  data: e,
  onSelectOption: o,
  selected: i,
  isMulti: r,
  children: a,
  showOptionValue: s
}) => {
  const u = e, p = () => {
    !r || e.selectDisabled || e.disabled || o?.(e, {});
  };
  return /* @__PURE__ */ v(
    "div",
    {
      className: d.treeContent,
      role: "option",
      tabIndex: 0,
      onClick: p,
      children: [
        /* @__PURE__ */ v(
          "div",
          {
            className: m(d.treeContentWrap, {
              [d.treeContentWrapSelected]: i
            }),
            children: [
              r && /* @__PURE__ */ n(Oe, { checked: i, disabled: u.selectDisabled }),
              s && /* @__PURE__ */ n("div", { className: d.treeContentValue, children: u?.value }),
              /* @__PURE__ */ n("div", { className: d.treeContentText, children: a })
            ]
          }
        ),
        i && !r && /* @__PURE__ */ n(B, { name: "check", className: d.treeContentChecked })
      ]
    }
  );
}, qt = "_indicatorButton_1b2gt_6", Ot = "_clearButton_1b2gt_15", zt = "_loadingIndicator_1b2gt_19", kt = "_spin_1b2gt_1", Nt = "_tooltipIcon_1b2gt_30", X = {
  indicatorButton: qt,
  clearButton: Ot,
  loadingIndicator: zt,
  spin: kt,
  tooltipIcon: Nt
}, Bt = Pe[Ie.errorRounded], Ce = U.forwardRef(
  (e, o) => /* @__PURE__ */ n(
    "div",
    {
      ref: o,
      onMouseDown: (r) => {
        r.stopPropagation(), r.preventDefault(), e.canClear && !e.disabled && e.clearValue(r);
      },
      role: "button",
      tabIndex: -1,
      className: X.indicatorButton,
      children: /* @__PURE__ */ n(Bt, { className: X.clearButton, width: 16, height: 16 })
    }
  )
), ve = ({ error: e, text: o }) => o ? e ? /* @__PURE__ */ v(F, { gutter: 4, children: [
  /* @__PURE__ */ n(B, { width: 16, height: 16, name: "errorRounded" }),
  /* @__PURE__ */ n("div", { children: o })
] }) : o : null, Tt = ({
  labelInside: e,
  tooltip: o
}) => /* @__PURE__ */ n(
  Re,
  {
    placement: "top-end",
    content: o,
    fallbackPlacements: ["left-start"],
    children: /* @__PURE__ */ n(
      "span",
      {
        className: m(X.tooltipIcon, {
          [X.indicatorButton]: e
        }),
        children: /* @__PURE__ */ n(
          B,
          {
            width: e ? 20 : 16,
            height: e ? 20 : 16,
            name: "infoOutlined"
          }
        )
      }
    )
  }
), Dt = () => /* @__PURE__ */ n(
  B,
  {
    name: "track",
    width: 16,
    height: 16,
    className: X.loadingIndicator
  }
), ze = ({
  children: e,
  value: o,
  className: i
}) => {
  const r = H(null), a = Ee(r, [o, e]);
  return /* @__PURE__ */ n(
    Re,
    {
      content: a ? o : "",
      dropdownProps: {
        popperOptions: {
          strategy: "fixed"
        }
      },
      children: /* @__PURE__ */ n("div", { ref: r, className: i, children: e })
    }
  );
}, Mt = "_expandButton_1lm4o_1", Ft = "_expandButtonExpanded_1lm4o_10", xe = {
  expandButton: Mt,
  expandButtonExpanded: Ft
}, Et = (e) => /* @__PURE__ */ n(
  "button",
  {
    ...e,
    className: m(xe.expandButton, {
      [xe.expandButtonExpanded]: e.expanded
    }),
    children: /* @__PURE__ */ n(B, { width: 20, height: 20, name: "down" })
  }
), ke = (e, o, i = []) => {
  const r = /* @__PURE__ */ new Set();
  if (!o)
    return [];
  for (const a of o) {
    if (e.some((s) => a.key === s.key))
      for (const s of i)
        r.add(s);
    if (a.children) {
      const s = ke(
        e,
        a.children,
        [...i, a.key]
      );
      for (const u of s)
        r.add(u);
    }
  }
  return [...r];
}, $t = {
  item: d.item,
  itemDisabled: d.itemDisabled,
  itemFocused: d.itemFocused,
  itemSelected: d.itemSelected,
  node: d.node,
  nodeContent: d.nodeContent,
  nodeContentContainer: d.nodeContentContainer,
  root: d.tree,
  selectedIndicator: d.selectedIndicator,
  treeContent: d.treeContent,
  nodeExpandButton: d.expandButtonWrap
}, At = ({
  loading: e,
  treeProps: o,
  showOptionValue: i,
  testId: r,
  ...a
}) => {
  const s = I(
    () => a.selectedValue.map((p) => String(p.key)),
    [a.selectedValue]
  ), u = N(
    (p, f) => {
      o?.selectMode === "strict" && (f.children?.length || f.loadable) || a.onSelectOption(f, {});
    },
    [a]
  );
  return /* @__PURE__ */ n("div", { ref: a.listProps?.ref || null, children: !e && /* @__PURE__ */ n(qe, { className: d.scrollbar, children: /* @__PURE__ */ n(
    De,
    {
      "data-testid": r ? `${r}-tree` : void 0,
      classes: $t,
      components: {
        Content: (p) => /* @__PURE__ */ n(
          Rt,
          {
            showOptionValue: i,
            isMulti: a.isMulti,
            onSelectOption: a.onSelectOption,
            ...p
          }
        ),
        ExpandButton: Et,
        LoadingIndicator: Dt
      },
      selectable: !0,
      onNodeSelect: u,
      selectedKeys: s,
      multipleSelect: a.isMulti,
      defaultExpandedKeys: ke(
        a.selectedValue,
        a.options
      ),
      disableExpandOnClick: !!a.isMulti,
      ...o,
      dataSource: a.options,
      withHalfLevelSpacer: !0
    }
  ) }) });
}, Ht = U.forwardRef((e, o) => {
  const {
    showOptionValue: i,
    showOptionSearch: r,
    showDroplistButtons: a = !1,
    onSubmit: s,
    onSearch: u,
    tree: p = !1,
    optionRenderLimit: f,
    testId: b,
    options: g,
    filteredOptions: h,
    useCustomSearch: S = !1,
    inputValue: R,
    loading: C,
    ...x
  } = e, E = H(null), j = Me([o, E]), [q, J] = V(""), K = H(null), [L, T] = V(
    h ?? g ?? []
  );
  M(() => {
    T(h ?? g ?? []);
  }, [h, g]), M(() => {
    x.onFirstRender?.();
  }, []);
  const y = (c) => {
    if (J(c), u) {
      u(c);
      return;
    }
    if (!c) {
      T(h ?? g ?? []);
      return;
    }
    T(
      (h ?? g).filter(
        (D) => D?.label?.toLowerCase()?.includes(c?.toLowerCase())
      )
    );
  }, $ = () => {
    s?.(e.selectedValue || []), e.onOpen?.(!1);
  }, t = (c) => {
    e.handleClear?.(c), e.onOpen?.(!1);
  }, O = S && (!!R || !!q);
  return /* @__PURE__ */ v("div", { className: d.dropListWrap, ref: j, children: [
    r && /* @__PURE__ */ v("div", { className: d.sideWrap, children: [
      /* @__PURE__ */ n(
        Xe,
        {
          handleChange: y,
          size: "S",
          placeholder: "Поиск",
          label: "",
          value: q,
          inputRef: K,
          onClick: (c) => {
            c.stopPropagation(), c.preventDefault(), K?.current?.focus();
          },
          noBorder: !0,
          grayIcon: !0,
          "data-testid": b ? `${b}-search` : void 0
        }
      ),
      /* @__PURE__ */ n(ge, {})
    ] }),
    C && /* @__PURE__ */ n("div", { className: d.sideWrap, children: e.loadingLabel }),
    !C && p && !O && L.length > 0 && /* @ts-expect-error несовместимость типов дерева и выпадающего списка */
    /* @__PURE__ */ n(
      At,
      {
        ...x,
        options: L,
        testId: b,
        showOptionValue: i
      }
    ),
    !C && (!p || O) && !!L?.length && /* @__PURE__ */ n(qe, { className: d.scrollbar, children: /* @__PURE__ */ n(
      Fe,
      {
        role: "list",
        ...x.listProps,
        className: d.dropList,
        interactive: !1,
        children: (f ? L.slice(0, f) : L).map((c) => /* @__PURE__ */ n(
          at,
          {
            option: c,
            onSelectOption: x.onSelectOption,
            selectedValue: x.selectedValue,
            showOptionValue: i,
            isMulti: x.isMulti,
            testId: b,
            searchValue: O ? R || q : ""
          },
          `droplist-item-${c.key}`
        ))
      }
    ) }),
    !C && !L?.length && /* @__PURE__ */ n(ae, { size: "lg", className: d.emptyList, children: x.noOptionsText || "Ничего не найдено" }),
    !C && x.isMulti && a && /* @__PURE__ */ v("div", { className: d.sideWrap, children: [
      /* @__PURE__ */ n(ge, {}),
      /* @__PURE__ */ v(F, { justify: "between", className: d.buttonsWrap, children: [
        /* @__PURE__ */ n(fe, { variant: "function", onClick: t, children: "Очистить" }),
        /* @__PURE__ */ n(
          fe,
          {
            variant: "function",
            disabled: !e.hasValue,
            onClick: $,
            link: e.hasValue,
            children: "Применить"
          }
        )
      ] })
    ] })
  ] });
}), Xt = "_containerLabelInside_1ov6u_6", jt = "_topLabelsWrapper_1ov6u_9", Kt = "_topLabels_1ov6u_9", Gt = "_label_1ov6u_22", Ut = "_labelError_1ov6u_28", Jt = "_disabled_1ov6u_31", Qt = "_focused_1ov6u_34", Yt = "_rootFocused_1ov6u_34", Zt = "_filled_1ov6u_34", en = "_sizeL_1ov6u_37", tn = "_sizeXL_1ov6u_37", nn = "_sizeS_1ov6u_40", on = "_sizeSWithPrefix_1ov6u_46", an = "_sizeM_1ov6u_52", ln = "_sizeMWithPrefix_1ov6u_58", rn = "_sizeLWithPrefix_1ov6u_70", sn = "_sizeXLWithPrefix_1ov6u_82", cn = "_input_1ov6u_89", dn = "_labelRequired_1ov6u_100", un = "_prefix_1ov6u_105", _n = "_grayColor_1ov6u_111", pn = "_error_1ov6u_115", hn = "_viewOnly_1ov6u_119", fn = "_suffix_1ov6u_124", mn = "_clearButton_1ov6u_130", bn = "_inputContainer_1ov6u_137", gn = "_labelAfter_1ov6u_143", Cn = "_sizeSPaddingRight_1ov6u_177", vn = "_sizeMPaddingRight_1ov6u_204", xn = "_sizeLPaddingRight_1ov6u_230", Sn = "_sizeXLPaddingRight_1ov6u_256", Wn = "_noBorder_1ov6u_275", wn = "_helperText_1ov6u_332", Ln = "_helperTextError_1ov6u_338", yn = "_textViewOnly_1ov6u_353", Pn = "_required_1ov6u_358", In = "_inputContainerViewOnly_1ov6u_362", Vn = "_tooltipIcon_1ov6u_378", Rn = "_containerComplex_1ov6u_382", qn = "_labelSuffix_1ov6u_508", On = "_labelSuffixRequired_1ov6u_514", zn = "_inputIndicatorContainer_1ov6u_518", kn = "_dropdownIcon_1ov6u_524", Nn = "_dropdownIconOpened_1ov6u_530", Bn = "_loading_1ov6u_550", Tn = "_spin_1ov6u_1", Dn = "_loadingLabel_1ov6u_569", Mn = "_placeholder_1ov6u_574", Fn = "_placeholderDisabled_1ov6u_582", En = "_valueWrapper_1ov6u_590", $n = "_isSearchable_1ov6u_604", An = "_valueContainer_1ov6u_608", Hn = "_chipsWrapper_1ov6u_616", l = {
  containerLabelInside: Xt,
  topLabelsWrapper: jt,
  topLabels: Kt,
  label: Gt,
  labelError: Ut,
  disabled: Jt,
  focused: Qt,
  rootFocused: Yt,
  filled: Zt,
  sizeL: en,
  sizeXL: tn,
  sizeS: nn,
  sizeSWithPrefix: on,
  sizeM: an,
  sizeMWithPrefix: ln,
  sizeLWithPrefix: rn,
  sizeXLWithPrefix: sn,
  input: cn,
  labelRequired: dn,
  prefix: un,
  grayColor: _n,
  error: pn,
  viewOnly: hn,
  suffix: fn,
  clearButton: mn,
  inputContainer: bn,
  labelAfter: gn,
  sizeSPaddingRight: Cn,
  sizeMPaddingRight: vn,
  sizeLPaddingRight: xn,
  sizeXLPaddingRight: Sn,
  noBorder: Wn,
  helperText: wn,
  helperTextError: Ln,
  textViewOnly: yn,
  required: Pn,
  inputContainerViewOnly: In,
  tooltipIcon: Vn,
  containerComplex: Rn,
  labelSuffix: qn,
  labelSuffixRequired: On,
  inputIndicatorContainer: zn,
  dropdownIcon: kn,
  dropdownIconOpened: Nn,
  loading: Bn,
  spin: Tn,
  loadingLabel: Dn,
  placeholder: Mn,
  placeholderDisabled: Fn,
  valueWrapper: En,
  isSearchable: $n,
  valueContainer: An,
  chipsWrapper: Hn
}, Se = (e) => {
  const { children: o, isSearchable: i } = e;
  return /* @__PURE__ */ n(
    ze,
    {
      value: String(o) || "",
      className: m(l.valueContainer, {
        [l.valueWrapper]: i
      }),
      children: o
    }
  );
}, We = (e) => {
  const { children: o, isSearchable: i } = e;
  return i ? /* @__PURE__ */ n("div", {}) : /* @__PURE__ */ n(
    ze,
    {
      value: String(o) || "",
      className: l.valueContainer,
      children: o
    }
  );
}, Xn = Pe[Ie.down], we = U.forwardRef(
  ({ children: e, isDisabled: o }, i) => {
    const r = m(l.placeholder, {
      [l.placeholderDisabled]: o
    });
    return /* @__PURE__ */ n("div", { ref: i, className: r, "aria-disabled": o, children: e });
  }
), oe = (e) => e?.id || e?.value || String(e), Le = (e) => e?.label || e?.title || String(e), jn = ({
  labelInside: e,
  onChange: o,
  onInputChange: i,
  tree: r,
  tooltip: a,
  icon: s,
  helperText: u,
  size: p,
  isComplexPart: f,
  value: b,
  showOptionValue: g,
  showOptionSearch: h,
  dropdownProps: S,
  limitByWidth: R = !0,
  noOptionsText: C = "Ничего не найдено",
  showDroplistButtons: x,
  optionRenderLimit: E,
  onListSubmit: j,
  testId: q,
  iconClassName: J,
  hideChevron: K = !1,
  showValueTooltip: L = !0,
  loadingLabel: T,
  useCustomSearch: y,
  useChips: $,
  ...t
}) => {
  const O = {
    text: m(l.label),
    suffix: m({
      [l.labelSuffix]: !e,
      [l.labelSuffixRequired]: !e && t.required
    })
  }, [c, D] = V(b), [ie, G] = V(!1), [le, Q] = V(!1), Y = H(null), Z = I(
    () => ({
      root: m(l[`size${p}`], l.container, {
        [l.filled]: Array.isArray(c) ? c.length || t.placeholder : c || le || t.placeholder,
        [l.containerLabelInside]: e,
        [l.disabled]: !!t.disabled,
        [l[`size${p}WithPrefix`]]: !!s,
        [l.isSearchable]: t.isSearchable,
        [l.rootFocused]: !!ie
      }),
      text: m({
        [l.valueWrapper]: t.isSearchable
      }),
      inputPrefix: l.prefix,
      ...l,
      inputRoot: m(l.inputContainer, {
        [l.containerComplex]: !!f
      }),
      inputContent: m({
        [l.input]: !t.isSearchable,
        [l.inputEmpty]: !c
      })
    }),
    [
      c,
      le,
      ie,
      e,
      t.isSearchable,
      t.disabled,
      t.placeholder
    ]
  ), z = H(i);
  M(() => {
    D(b);
  }, [b]), M(() => {
    z.current = i;
  }, [i]), M(() => {
    Q(
      Array.isArray(c) ? !!c.length : !!c
    );
  }, [c]);
  const re = I(() => t.treeProps, [t.treeProps]), Ne = N(() => {
    Y.current?.forceUpdate();
  }, []), [se, ce] = V(null);
  t.labelProps && Object.assign(t.labelProps, { classes: O }), t.loading && Object.assign(Z, {
    inputArrowIcon: l.inputArrowIconHidden
  });
  const de = {
    error: l.helperTextError,
    helperText: l.helperText
  }, ue = N(
    (_) => /* @__PURE__ */ n(
      Ht,
      {
        ..._,
        showOptionValue: g,
        showOptionSearch: h && !r || h && r && y,
        noOptionsText: C,
        showDroplistButtons: x,
        onSubmit: j,
        onSearch: y && z.current ? z.current : void 0,
        onFirstRender: Ne,
        tree: r,
        treeProps: re,
        optionRenderLimit: E,
        testId: q,
        useCustomSearch: y
      }
    ),
    [
      g,
      h,
      C,
      x,
      j,
      re,
      r,
      y
    ]
  ), ee = I(
    () => /* @__PURE__ */ n(Tt, { tooltip: a, labelInside: e }),
    [a, e]
  ), _e = (_) => /* @__PURE__ */ v(ye, { children: [
    !t.loading && !K && /* @__PURE__ */ n(
      Xn,
      {
        role: "button",
        className: m(l.dropdownIcon, {
          [l.dropdownIconOpened]: _.opened
        })
      }
    ),
    a && e ? ee : void 0
  ] }), te = N(
    (_, w, W, k) => {
      t.readonly || (D(W), t.multiple && Array.isArray(_) ? Q(_.length > 0) : Q(!!_), o?.(_, w, W, k));
    },
    [t.readonly, t.multiple, o, D]
  ), pe = s ? /* @__PURE__ */ n(B, { className: J, width: 24, height: 24, name: s }) : void 0, ne = I(() => t.multiple ? Array.isArray(c) ? c : [] : c ? [c] : [], [c, t.multiple]), he = I(() => !$ || !t.multiple ? [] : ne.map((_) => {
    if (_ && typeof _ == "object" || r)
      return {
        id: oe(_),
        title: Le(_)
      };
    const w = t.options?.find((W) => {
      const k = String(_);
      return W.value === k || W.key === k || W.id === k;
    });
    return w ? {
      id: oe(w),
      title: Le(w)
    } : {
      id: String(_),
      title: String(_)
    };
  }), [ne, $, t.multiple]), Be = N(
    (_) => {
      D((w) => {
        if (!Array.isArray(w))
          return w;
        const W = w.filter((A) => oe(A) !== _), k = W.map(
          (A) => A.value?.toString() || A.key?.toString() || String(A)
        );
        return te(
          k,
          { type: "chip-remove" },
          W
        ), W;
      }), _ && t.onChipRemove && t.onChipRemove(_);
    },
    [ne, t.onChipRemove]
  );
  return $ && t.multiple ? /* @__PURE__ */ v(
    F,
    {
      direction: "column",
      align: "stretch",
      gutter: 8,
      className: l.chipsWrapper,
      children: [
        /* @__PURE__ */ n(
          me,
          {
            ref: ce,
            classes: Z,
            loadingLabel: /* @__PURE__ */ n("span", { className: l.loadingLabel, children: T || "Загрузка..." }),
            placeholder: t.placeholder ?? "",
            labelProps: {
              classes: O,
              suffix: !e && a ? ee : void 0
            },
            labelledClasses: {
              required: l.required,
              topLabels: l.topLabels,
              topLabelsWrapper: m(l.topLabelsWrapper, {
                [l.withPrefix]: !!s
              })
            },
            helperText: u ? /* @__PURE__ */ n(ve, { error: t.error, text: u }) : null,
            noOptionsText: C,
            helperTextProps: { classes: de },
            canClear: t.canClear && !t.readonly,
            inputPrefix: pe,
            onChange: te,
            onInputChange: y && !t.isSearchable ? void 0 : z.current,
            opened: t.readonly ? !1 : t.opened,
            inputInnerProps: t.isSearchable ? {
              onFocus: () => G(!0),
              onBlur: () => G(!1)
            } : void 0,
            value: c,
            dropdownProps: {
              container: se,
              popperOptions: {
                strategy: "absolute"
              },
              popperRef: Y,
              ...S
            },
            filterOption: z.current ? () => !0 : void 0,
            disableCloseOnSelect: !!t.multiple,
            disableClearInputOnChange: !!t.multiple,
            hideDropdownOnOutsideScroll: !1,
            limitByWidth: R,
            ...t,
            "data-testid": q || void 0,
            components: {
              ClearIndicator: t.readonly ? () => null : Ce,
              DropdownIndicator: t.readonly ? () => null : _e,
              OptionList: ue,
              SingleValue: Se,
              MultiValue: We,
              Placeholder: we,
              ...t.components || {}
            },
            disableVisibleSelectedValue: !!t.isSearchable
          }
        ),
        he.length > 0 && /* @__PURE__ */ n(F, { justify: "start", gutter: 4, wrap: !0, className: l.chipsWrapper, children: he.map((_) => /* @__PURE__ */ n(
          Te,
          {
            item: _,
            size: "XS",
            variant: "fill",
            onRemove: t.onChipRemove ? Be : void 0,
            disabled: t.disabled,
            nowrap: !0
          },
          _.id
        )) })
      ]
    }
  ) : (
    // @ts-expect-error Omit для size вызывает более строгую проверку связки генерируемой SingleValue и MultiValue
    /* @__PURE__ */ n(
      me,
      {
        ref: ce,
        classes: Z,
        loadingLabel: /* @__PURE__ */ n("span", { className: l.loadingLabel, children: T || "Загрузка..." }),
        placeholder: t.placeholder ?? "",
        labelProps: {
          classes: O,
          suffix: !e && a ? ee : void 0
        },
        labelledClasses: {
          required: l.required,
          topLabels: l.topLabels,
          topLabelsWrapper: m(l.topLabelsWrapper, {
            [l.withPrefix]: !!s
          })
        },
        helperText: u ? /* @__PURE__ */ n(ve, { error: t.error, text: u }) : null,
        noOptionsText: C,
        helperTextProps: { classes: de },
        canClear: t.canClear && !t.readonly,
        inputPrefix: pe,
        onChange: te,
        onInputChange: y && !t.isSearchable ? void 0 : z.current,
        opened: t.readonly ? !1 : t.opened,
        inputInnerProps: t.isSearchable ? {
          onFocus: () => G(!0),
          onBlur: () => G(!1)
        } : void 0,
        value: c,
        dropdownProps: {
          container: se,
          popperOptions: {
            strategy: "absolute"
          },
          popperRef: Y,
          ...S
        },
        filterOption: z.current ? () => !0 : void 0,
        disableCloseOnSelect: !!t.multiple,
        disableClearInputOnChange: !!t.multiple,
        hideDropdownOnOutsideScroll: !1,
        limitByWidth: R,
        ...t,
        "data-testid": q || void 0,
        components: {
          ClearIndicator: t.readonly ? () => null : Ce,
          DropdownIndicator: t.readonly ? () => null : _e,
          OptionList: ue,
          Placeholder: we,
          ...t.components || {},
          ...L ? {
            SingleValue: Se,
            MultiValue: We
          } : {}
        }
      }
    )
  );
};
export {
  Ht as D,
  Xe as F,
  we as P,
  jn as S,
  He as a
};
//# sourceMappingURL=Select-BER5MR7i.js.map
