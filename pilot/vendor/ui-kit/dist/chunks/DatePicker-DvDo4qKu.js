import { jsxs as _, jsx as t } from "react/jsx-runtime";
import { useState as V, useRef as C } from "react";
import { c as d } from "./vendor-utils-TYjSchlL.js";
import { d as i, r as T, e as b, a as I } from "./vendor-dayjs-0m2goXY-.js";
import { R as O } from "./Row-DT_8J65b.js";
import { I as y } from "./Icon-BY6vNIR8.js";
import { I as R } from "./InputMask-BuBZLXmX.js";
import { a as M } from "./Typography-FIwI70kG.js";
import { D as W, p as g } from "./vendor-other-4r8kKhmH.js";
const N = "_root_1oay2_1", S = "_row_1oay2_19", j = "_notCurrentMonth_1oay2_22", E = "_selected_1oay2_22", Y = "_dayText_1oay2_22", A = "_iconContainer_1oay2_32", q = "_label_1oay2_41", L = "_labelViewOnlyWithoutValue_1oay2_46", z = "_input_1oay2_50", U = "_fullWidth_1oay2_54", X = "_dateInput_1oay2_63", $ = "_inputDate_1oay2_78", F = "_opened_1oay2_91", G = "_yearButton_1oay2_95", H = "_monthButton_1oay2_95", J = "_monthText_1oay2_104", K = "_yearText_1oay2_104", Q = "_calendarBar_1oay2_119", Z = "_month_1oay2_95", ee = "_year_1oay2_95", te = "_startDate_1oay2_166", oe = "_chevron_1oay2_171", ae = "_dayButton_1oay2_189", ne = "_notInMonth_1oay2_207", re = "_today_1oay2_211", se = "_weekDay_1oay2_222", de = "_viewOnly_1oay2_232", le = "_calendarPickerDropdown_1oay2_250", ce = "_calendarPickerDropdownReadonly_1oay2_255", e = {
  root: N,
  row: S,
  notCurrentMonth: j,
  selected: E,
  dayText: Y,
  iconContainer: A,
  label: q,
  labelViewOnlyWithoutValue: L,
  input: z,
  fullWidth: U,
  dateInput: X,
  inputDate: $,
  opened: F,
  yearButton: G,
  monthButton: H,
  monthText: J,
  yearText: K,
  calendarBar: Q,
  month: Z,
  year: ee,
  startDate: te,
  chevron: oe,
  dayButton: ae,
  "selected-start": "_selected-start_1oay2_198",
  "selected-end": "_selected-end_1oay2_198",
  notInMonth: ne,
  today: re,
  weekDay: se,
  viewOnly: de,
  calendarPickerDropdown: le,
  calendarPickerDropdownReadonly: ce
}, u = ({ label: n, value: a }) => /* @__PURE__ */ _("div", { className: e.dateInput, children: [
  n && /* @__PURE__ */ t(
    M,
    {
      className: d(e.label, {
        [e.labelViewOnlyWithoutValue]: !a
      }),
      tooltip: !0,
      size: "sm",
      nowrap: !0,
      children: n
    }
  ),
  /* @__PURE__ */ t("div", { className: e.iconContainer, children: /* @__PURE__ */ t(y, { name: "calendar", width: 24, height: 24 }) }),
  /* @__PURE__ */ t("div", { className: e.startDate, children: /* @__PURE__ */ t(
    "input",
    {
      className: e.inputDate,
      value: a || "Не заполнено",
      disabled: !0
    }
  ) })
] });
u.displayName = "ViewOnlyDate";
i.locale({
  ...T,
  weekStart: 1,
  weekdaysShort: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
  monthsShort: [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек"
  ]
});
i.locale({
  ...b,
  weekStart: 1
});
const c = { ...e }, xe = ({
  label: n,
  viewOnly: a,
  labelInside: h = !0,
  size: m = "XL",
  withoutIcon: w,
  tooltip: p,
  showErrorIcon: _e,
  helperText: r,
  testId: D,
  ...o
}) => {
  const [k, x] = V(!!o.open), l = C(null), P = {
    ...e,
    calendarPickerDropdown: d(e.calendarPickerDropdown, {
      [e.calendarPickerDropdownReadonly]: o.readonly
    }),
    root: d(e.root, {
      [e.fullWidth]: o.fullWidth,
      [e.opened]: k,
      [e.viewOnly]: a
    })
  }, f = { ...e }, v = r && /* @__PURE__ */ _(O, { gutter: 4, children: [
    o.error && r && /* @__PURE__ */ t(y, { width: 16, height: 16, name: "errorRounded" }),
    r
  ] });
  return /* @__PURE__ */ t(
    W,
    {
      dateAdapter: I.DayjsAdapter,
      options: { locale: "RU" },
      children: /* @__PURE__ */ t(
        g,
        {
          classes: P,
          labelledClasses: f,
          renderInput: (s) => a ? /* @__PURE__ */ t(u, { label: n, value: s.value || "" }) : /* @__PURE__ */ t("div", { ref: l, children: /* @__PURE__ */ t(
            R,
            {
              maskOptions: { mask: Date, min: new Date(1900, 0, 1) },
              className: e.input,
              disabled: o.disabled,
              label: n,
              size: m,
              value: s.value || "",
              labelInside: h,
              required: o.required,
              readonly: o.readonly,
              onChange: (B) => s.onChange?.(B),
              tooltip: p,
              placeholder: o?.placeholder || "дд.мм.гг",
              icon: w ? void 0 : "calendar",
              error: o.error,
              "data-testid": D || void 0
            }
          ) }),
          dropdownProps: {
            children: /* @__PURE__ */ t("div", {}),
            container: l.current,
            onStateChange: x
          },
          calendarViewExternalProps: {
            dayViewProps: {
              classes: c
            },
            monthViewProps: {
              classes: {
                monthButton: e.monthButton,
                monthText: e.monthText,
                selected: e.selected
              }
            },
            yearViewProps: {
              classes: {
                selected: e.selected,
                yearText: e.yearText,
                yearButton: e.yearButton
              }
            }
          },
          calendarPickerClasses: c,
          format: "DD.MM.YYYY",
          mask: "11.11.1111",
          disabled: o.disabled || a,
          helperText: v,
          ...o
        }
      )
    }
  );
};
export {
  xe as D
};
//# sourceMappingURL=DatePicker-DvDo4qKu.js.map
