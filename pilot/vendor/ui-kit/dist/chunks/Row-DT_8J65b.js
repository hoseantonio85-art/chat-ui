import { jsx as p } from "react/jsx-runtime";
import { c as i } from "./vendor-utils-TYjSchlL.js";
import d from "react";
const u = "_col_1vl4g_1", f = "_row_1vl4g_167", j = "_rowWrap_1vl4g_172", h = "_rowColumn_1vl4g_175", y = "_rowNoFlex_1vl4g_178", l = {
  col: u,
  "col-1": "_col-1_1vl4g_7",
  "col-2": "_col-2_1vl4g_13",
  "col-3": "_col-3_1vl4g_19",
  "col-4": "_col-4_1vl4g_25",
  "col-5": "_col-5_1vl4g_31",
  "col-6": "_col-6_1vl4g_37",
  "col-7": "_col-7_1vl4g_43",
  "col-8": "_col-8_1vl4g_49",
  "col-9": "_col-9_1vl4g_55",
  "col-10": "_col-10_1vl4g_61",
  "col-11": "_col-11_1vl4g_67",
  "col-12": "_col-12_1vl4g_73",
  "mb-0": "_mb-0_1vl4g_79",
  "gap-0": "_gap-0_1vl4g_83",
  "mb-4": "_mb-4_1vl4g_87",
  "gap-4": "_gap-4_1vl4g_91",
  "mb-8": "_mb-8_1vl4g_95",
  "gap-8": "_gap-8_1vl4g_99",
  "mb-12": "_mb-12_1vl4g_103",
  "gap-12": "_gap-12_1vl4g_107",
  "mb-16": "_mb-16_1vl4g_111",
  "gap-16": "_gap-16_1vl4g_115",
  "mb-20": "_mb-20_1vl4g_119",
  "gap-20": "_gap-20_1vl4g_123",
  "mb-24": "_mb-24_1vl4g_127",
  "gap-24": "_gap-24_1vl4g_131",
  "mb-28": "_mb-28_1vl4g_135",
  "gap-28": "_gap-28_1vl4g_139",
  "mb-32": "_mb-32_1vl4g_143",
  "gap-32": "_gap-32_1vl4g_147",
  "mb-36": "_mb-36_1vl4g_151",
  "gap-36": "_gap-36_1vl4g_155",
  "mb-40": "_mb-40_1vl4g_159",
  "gap-40": "_gap-40_1vl4g_163",
  row: f,
  rowWrap: j,
  rowColumn: h,
  rowNoFlex: y,
  "row-align-baseline": "_row-align-baseline_1vl4g_182",
  "row-align-bottom": "_row-align-bottom_1vl4g_186",
  "row-align-middle": "_row-align-middle_1vl4g_190",
  "row-align-stretch": "_row-align-stretch_1vl4g_194",
  "row-align-top": "_row-align-top_1vl4g_198",
  "row-justify-around": "_row-justify-around_1vl4g_202",
  "row-justify-between": "_row-justify-between_1vl4g_206",
  "row-justify-center": "_row-justify-center_1vl4g_210",
  "row-justify-end": "_row-justify-end_1vl4g_214",
  "row-justify-start": "_row-justify-start_1vl4g_218",
  "row-justify-stretch": "_row-justify-stretch_1vl4g_222"
};
var g = /* @__PURE__ */ ((_) => (_.top = "top", _.middle = "middle", _.bottom = "bottom", _.baseline = "baseline", _.stretch = "stretch", _))(g || {}), a = /* @__PURE__ */ ((_) => (_.start = "start", _.end = "end", _.center = "center", _.around = "around", _.between = "between", _.stretch = "stretch", _))(a || {}), o = /* @__PURE__ */ ((_) => (_.row = "row", _.column = "column", _))(o || {});
const W = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], N = d.forwardRef(
  ({
    align: _ = g.middle,
    className: t,
    direction: c = o.row,
    gutter: e = 0,
    justify: v = a.start,
    mb: s = 0,
    noFlex: w,
    wrap: m,
    ...r
  }, n) => {
    const b = i(
      l.row,
      l[`mb-${s}`],
      l[`gap-${e}`],
      l[`row-align-${_}`],
      l[`row-justify-${v}`],
      {
        [l.rowColumn]: c === o.column,
        [l.rowNoFlex]: w,
        [l.rowWrap]: m
      },
      t
    );
    return /* @__PURE__ */ p("div", { ...r, className: b, ref: n, children: r.children });
  }
);
N.displayName = "Row";
export {
  g as E,
  N as R,
  a,
  o as b,
  W as c,
  l as d
};
//# sourceMappingURL=Row-DT_8J65b.js.map
