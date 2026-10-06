import { jsxs as l, jsx as t, Fragment as W } from "react/jsx-runtime";
import { c } from "./vendor-utils-TYjSchlL.js";
import { a as z } from "./vendor-dayjs-0m2goXY-.js";
import { useState as I, useRef as P } from "react";
import { R as f } from "./Row-DT_8J65b.js";
import { I as B } from "./InputMask-BuBZLXmX.js";
import { T as x } from "./Tooltip-kHcD51Z4.js";
import { I as d } from "./Icon-BY6vNIR8.js";
import { EIconName as M } from "../icons.js";
import { a as V } from "./Typography-FIwI70kG.js";
import { D as E, q } from "./vendor-other-4r8kKhmH.js";
const T = "_root_pta16_1", j = "_dateContainer_pta16_6", A = "_date_pta16_6", G = "_endDate_pta16_12", X = "_startDate_pta16_12", Y = "_iconContainer_pta16_31", $ = "_label_pta16_38", F = "_labelWithoutValue_pta16_48", L = "_labelViewOnly_pta16_53", H = "_labelViewOnlyWithoutValue_pta16_56", U = "_rangeInput_pta16_60", J = "_inputDate_pta16_71", K = "_rangeInputViewOnly_pta16_87", Q = "_opened_pta16_117", Z = "_divider_pta16_127", ee = "_chevron_pta16_132", te = "_calendarBar_pta16_148", ae = "_month_pta16_157", ne = "_year_pta16_172", oe = "_selected_pta16_191", re = "_dayButton_pta16_196", le = "_dayText_pta16_201", se = "_notInMonth_pta16_205", ce = "_inRange_pta16_223", ie = "_hovered_pta16_227", de = "_todayButton_pta16_242", _e = "_weekDay_pta16_253", ue = "_row_pta16_259", pe = "_fullWidth_pta16_265", he = "_fieldGrid_pta16_268", me = "_arrow_pta16_272", ye = "_calendarPickerDropdown_pta16_279", we = "_months_pta16_294", De = "_years_pta16_295", ge = "_yearsRow_pta16_312", ve = "_monthsRow_pta16_313", fe = "_yearButton_pta16_317", Be = "_monthButton_pta16_318", Ve = "_yearButtonSelected_pta16_328", ke = "_monthButtonSelected_pta16_329", Re = "_calendarPickerDropdownReadonly_pta16_338", Ce = "_disabled_pta16_363", Se = "_focused_pta16_370", Ne = "_error_pta16_375", Oe = "_sizeS_pta16_379", be = "_sizeM_pta16_382", We = "_sizeL_pta16_385", ze = "_sizeXL_pta16_388", Ie = "_inputStart_pta16_392", Pe = "_inputEnd_pta16_399", xe = "_singleLabel_pta16_407", Me = "_tooltipIcon_pta16_414", Ee = "_asterisk_pta16_418", e = {
  root: T,
  dateContainer: j,
  date: A,
  endDate: G,
  startDate: X,
  iconContainer: Y,
  label: $,
  labelWithoutValue: F,
  labelViewOnly: L,
  labelViewOnlyWithoutValue: H,
  rangeInput: U,
  inputDate: J,
  rangeInputViewOnly: K,
  opened: Q,
  divider: Z,
  chevron: ee,
  calendarBar: te,
  month: ae,
  year: ne,
  selected: oe,
  dayButton: re,
  dayText: le,
  notInMonth: se,
  "selected-start": "_selected-start_pta16_208",
  "selected-end": "_selected-end_pta16_208",
  inRange: ce,
  hovered: ie,
  "hovered-start": "_hovered-start_pta16_232",
  "hovered-end": "_hovered-end_pta16_235",
  todayButton: de,
  weekDay: _e,
  row: ue,
  fullWidth: pe,
  fieldGrid: he,
  arrow: me,
  calendarPickerDropdown: ye,
  months: we,
  years: De,
  yearsRow: ge,
  monthsRow: ve,
  yearButton: fe,
  monthButton: Be,
  yearButtonSelected: Ve,
  monthButtonSelected: ke,
  calendarPickerDropdownReadonly: Re,
  disabled: Ce,
  focused: Se,
  error: Ne,
  sizeS: Oe,
  sizeM: be,
  sizeL: We,
  sizeXL: ze,
  inputStart: Ie,
  inputEnd: Pe,
  singleLabel: xe,
  tooltipIcon: Me,
  asterisk: Ee
}, k = ({
  endLabel: n,
  endValue: o,
  startLabel: _,
  startValue: r
}) => /* @__PURE__ */ l("div", { className: c(e.rangeInput, e.rangeInputViewOnly), children: [
  /* @__PURE__ */ l("div", { className: e.dateContainer, children: [
    /* @__PURE__ */ t("div", { className: e.iconContainer, children: /* @__PURE__ */ t(d, { name: "calendar", width: 24, height: 24 }) }),
    /* @__PURE__ */ l("div", { className: e.startDate, children: [
      _ && /* @__PURE__ */ t(
        V,
        {
          title: String(_ ?? ""),
          className: c(e.label, e.labelViewOnly, {
            [e.labelViewOnlyWithoutValue]: !r,
            [e.labelWithoutValue]: !r
          }),
          tooltip: !0,
          size: "sm",
          nowrap: !0,
          children: _
        }
      ),
      /* @__PURE__ */ t("input", { className: e.inputDate, value: r || "", disabled: !0 })
    ] })
  ] }),
  /* @__PURE__ */ t(d, { name: M.arrowAction, className: e.arrow }),
  /* @__PURE__ */ t("div", { className: e.dateContainer, children: /* @__PURE__ */ l("div", { className: e.endDate, children: [
    n && /* @__PURE__ */ t(
      V,
      {
        title: String(n ?? ""),
        className: c(e.label, e.labelViewOnly, {
          [e.labelViewOnlyWithoutValue]: !o,
          [e.labelWithoutValue]: !o
        }),
        tooltip: !0,
        size: "sm",
        nowrap: !0,
        children: n
      }
    ),
    /* @__PURE__ */ t("input", { className: e.inputDate, value: o || "", disabled: !0 })
  ] }) })
] });
k.displayName = "ViewOnlyRangeDate";
const qe = {
  chevron: e.chevron,
  year: e.year,
  month: e.month,
  root: e.calendarBar,
  selected: e.selected
}, Te = { ...e }, je = {
  root: e.years,
  row: e.yearsRow,
  yearButton: e.yearButton,
  selected: e.yearButtonSelected
}, Ae = {
  root: e.months,
  row: e.monthsRow,
  monthButton: e.monthButton,
  selected: e.monthButtonSelected
}, Ze = ({
  disabled: n,
  endLabel: o,
  loading: _,
  startLabel: r,
  viewOnly: h,
  size: m = "XL",
  labelInside: s = !0,
  withoutIcon: R,
  helperText: y,
  tooltip: u,
  testId: p,
  ...a
}) => {
  const [g, C] = I(!!a.open), v = P(null), S = {
    ...e,
    calendarPickerDropdown: c(e.calendarPickerDropdown, {
      [e.calendarPickerDropdownReadonly]: a.readonly
    }),
    root: c(e.root, {
      [e.fullWidth]: a.fullWidth,
      [e.opened]: g
    })
  }, N = (i) => {
    !n && !h && !a.readonly && C(i);
  }, O = y && /* @__PURE__ */ l(f, { gutter: 4, children: [
    a.error && y && /* @__PURE__ */ t(d, { width: 16, height: 16, name: "errorRounded" }),
    y
  ] }), b = !r && !o && !u || s ? null : /* @__PURE__ */ l(f, { gutter: 4, noFlex: !0, mb: 4, children: [
    /* @__PURE__ */ t("span", { className: e.singleLabel, children: r || o }),
    a.required && /* @__PURE__ */ t("span", { className: e.asterisk, children: "*" }),
    u && !s && /* @__PURE__ */ t(
      x,
      {
        placement: "top-end",
        content: u,
        fallbackPlacements: ["left-start"],
        children: /* @__PURE__ */ t("span", { className: e.tooltipIcon, children: /* @__PURE__ */ t(d, { width: 16, height: 16, name: "infoOutlined" }) })
      }
    )
  ] });
  return /* @__PURE__ */ t(
    E,
    {
      dateAdapter: z.DayjsAdapter,
      options: { locale: "RU" },
      children: /* @__PURE__ */ t(
        q,
        {
          classes: S,
          suffix: /* @__PURE__ */ t(d, { name: "calendar" }),
          renderInput: (i, w) => h ? /* @__PURE__ */ t(
            k,
            {
              endLabel: o,
              startLabel: r,
              startValue: i.value,
              endValue: w.value
            }
          ) : /* @__PURE__ */ l(W, { children: [
            b,
            /* @__PURE__ */ l(
              "div",
              {
                ref: v,
                className: c(e.fieldGrid, e[`size${m}`], {
                  [e.error]: !!a.error,
                  [e.focused]: g,
                  [e.disabled]: n
                }),
                children: [
                  /* @__PURE__ */ t(
                    B,
                    {
                      maskOptions: { mask: Date, min: new Date(1900, 0, 1) },
                      className: e.inputStart,
                      disabled: n,
                      label: s ? r : void 0,
                      size: m,
                      value: i.value || "",
                      labelInside: s,
                      required: a.required,
                      readonly: a.readonly,
                      onChange: (D) => i.onChange?.(D),
                      placeholder: a.placeholder || "дд.мм.гг",
                      icon: R ? void 0 : "calendar",
                      error: a.error,
                      classes: {
                        inputContainer: e.inputStart
                      },
                      isComplexPart: !0,
                      "data-testid": p ? `${p}-first` : void 0
                    }
                  ),
                  /* @__PURE__ */ t(
                    B,
                    {
                      maskOptions: { mask: Date, min: new Date(1900, 0, 1) },
                      className: e.inputEnd,
                      disabled: n,
                      label: s ? o : void 0,
                      size: m,
                      value: w.value || "",
                      labelInside: s,
                      required: a.endRequired,
                      readonly: a.readonly,
                      onChange: (D) => w.onChange?.(D),
                      tooltip: u,
                      placeholder: a.placeholder || "дд.мм.гг",
                      error: a.error,
                      classes: {
                        inputContainer: e.inputEnd
                      },
                      "data-testid": p ? `${p}-second` : void 0
                    }
                  )
                ]
              }
            )
          ] }),
          dropdownProps: {
            children: /* @__PURE__ */ t("div", {}),
            container: v.current,
            onStateChange: N
          },
          panelHeaderClasses: qe,
          calendarViewClasses: Te,
          yearsViewClasses: je,
          monthsViewClasses: Ae,
          mask: "11.11.1111",
          format: "DD.MM.YYYY",
          disabled: n || h,
          helperText: O,
          datePanelStyle: "single",
          ...a
        }
      )
    }
  );
};
export {
  Ze as D
};
//# sourceMappingURL=DateRangePicker-ua3tf-tn.js.map
