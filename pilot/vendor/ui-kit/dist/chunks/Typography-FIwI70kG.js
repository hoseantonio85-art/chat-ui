import { jsx as l } from "react/jsx-runtime";
import { c as r } from "./vendor-utils-TYjSchlL.js";
import d from "react";
const g = "_uppercase_1hs44_1", N = "_title_1hs44_5", k = "_thin_1hs44_46", $ = "_nowrap_1hs44_49", R = "_white_1hs44_52", v = "_link_1hs44_188", y = "_bold_1hs44_215", L = "_text_1hs44_219", j = "_medium_1hs44_225", q = "_code_1hs44_231", A = "_disabled_1hs44_234", B = "_tooltip_1hs44_237", C = "_wrap_1hs44_243", s = {
  uppercase: g,
  title: N,
  "size-H100": "_size-H100_1hs44_10",
  "size-H200": "_size-H200_1hs44_14",
  "size-H300": "_size-H300_1hs44_18",
  "size-H400": "_size-H400_1hs44_22",
  "size-H500": "_size-H500_1hs44_26",
  "size-H600": "_size-H600_1hs44_30",
  "size-H700": "_size-H700_1hs44_34",
  "size-H800": "_size-H800_1hs44_38",
  "size-H900": "_size-H900_1hs44_42",
  thin: k,
  nowrap: $,
  white: R,
  "mb-0": "_mb-0_1hs44_56",
  "mb-1": "_mb-1_1hs44_60",
  "mb-2": "_mb-2_1hs44_64",
  "mb-3": "_mb-3_1hs44_68",
  "mb-4": "_mb-4_1hs44_72",
  "mb-5": "_mb-5_1hs44_76",
  "mb-6": "_mb-6_1hs44_80",
  "mb-7": "_mb-7_1hs44_84",
  "mb-8": "_mb-8_1hs44_88",
  "mb-9": "_mb-9_1hs44_92",
  "mb-10": "_mb-10_1hs44_96",
  "mb-11": "_mb-11_1hs44_100",
  "mb-12": "_mb-12_1hs44_104",
  "mb-13": "_mb-13_1hs44_108",
  "mb-14": "_mb-14_1hs44_112",
  "mb-15": "_mb-15_1hs44_116",
  "mb-16": "_mb-16_1hs44_120",
  "mb-17": "_mb-17_1hs44_124",
  "mb-18": "_mb-18_1hs44_128",
  "mb-19": "_mb-19_1hs44_132",
  "mb-20": "_mb-20_1hs44_136",
  "mb-21": "_mb-21_1hs44_140",
  "mb-22": "_mb-22_1hs44_144",
  "mb-23": "_mb-23_1hs44_148",
  "mb-24": "_mb-24_1hs44_152",
  "mb-25": "_mb-25_1hs44_156",
  "mb-26": "_mb-26_1hs44_160",
  "mb-27": "_mb-27_1hs44_164",
  "mb-28": "_mb-28_1hs44_168",
  "mb-29": "_mb-29_1hs44_172",
  "mb-30": "_mb-30_1hs44_176",
  "mb-31": "_mb-31_1hs44_180",
  "mb-32": "_mb-32_1hs44_184",
  link: v,
  "size-lg": "_size-lg_1hs44_203",
  "size-md": "_size-md_1hs44_207",
  "size-sm": "_size-sm_1hs44_211",
  bold: y,
  text: L,
  medium: j,
  code: q,
  disabled: A,
  tooltip: B,
  wrap: C,
  "size-xxlg": "_size-xxlg_1hs44_262",
  "size-xlg": "_size-xlg_1hs44_266"
};
var D = /* @__PURE__ */ ((_) => (_.H900 = "H900", _.H800 = "H800", _.H700 = "H700", _.H600 = "H600", _.H500 = "H500", _.H400 = "H400", _.H300 = "H300", _.H200 = "H200", _.H100 = "H100", _))(D || {}), p = /* @__PURE__ */ ((_) => (_.xxlg = "xxlg", _.xlg = "xlg", _.lg = "lg", _.md = "md", _.sm = "sm", _))(p || {});
const F = d.forwardRef(
  (_, m) => {
    const {
      className: e,
      mb: b = 0,
      size: h = "H400",
      thin: a,
      uppercase: i,
      nowrap: t,
      white: o,
      ...c
    } = _, n = r(
      s.title,
      s[`size-${h}`],
      s[`mb-${b}`],
      {
        [s.thin]: a,
        [s.nowrap]: t,
        [s.uppercase]: i,
        [s.white]: o
      },
      e
    );
    return /* @__PURE__ */ l("div", { className: n, ref: m, ...c, children: _.children });
  }
);
F.displayName = "Title";
const G = d.forwardRef(
  (_, m) => {
    const {
      bold: e,
      className: b,
      code: h,
      disabled: a,
      link: i,
      mb: t = 0,
      medium: o,
      nowrap: c,
      size: n = p.md,
      tooltip: H,
      uppercase: w,
      wrap: z,
      white: u,
      ...x
    } = _, f = r(
      s.text,
      s[`size-${n}`],
      s[`mb-${t}`],
      {
        [s.bold]: e,
        [s.code]: h,
        [s.disabled]: a,
        [s.link]: i,
        [s.medium]: o,
        [s.nowrap]: c,
        [s.tooltip]: H,
        [s.uppercase]: w,
        [s.wrap]: z,
        [s.white]: u
      },
      b
    );
    return /* @__PURE__ */ l("p", { className: f, ref: m, ...x, children: _.children });
  }
);
G.displayName = "Text";
const I = d.forwardRef(
  (_, m) => {
    const {
      bold: e,
      className: b,
      mb: h = 0,
      size: a = p.md,
      uppercase: i,
      ...t
    } = _, o = r(
      s.link,
      s[`size-${a}`],
      s[`mb-${h}`],
      {
        [s.bold]: e,
        [s.uppercase]: i
      },
      b
    );
    return /* @__PURE__ */ l("a", { ref: m, className: o, ...t, children: _.children });
  }
);
I.displayName = "Link";
export {
  D as E,
  I as L,
  F as T,
  G as a,
  p as b
};
//# sourceMappingURL=Typography-FIwI70kG.js.map
