import { jsx as t } from "react/jsx-runtime";
import { c as i } from "./vendor-utils-TYjSchlL.js";
import { EComponentColors as e } from "../types.js";
const x = "_badge_aqopo_1", v = "_thin_aqopo_8", o = {
  badge: x,
  thin: v,
  "variant-gray": "_variant-gray_aqopo_11",
  "variant-green": "_variant-green_aqopo_15",
  "variant-brand": "_variant-brand_aqopo_19",
  "variant-blue": "_variant-blue_aqopo_23",
  "variant-yellow": "_variant-yellow_aqopo_27",
  "variant-red": "_variant-red_aqopo_31",
  "variant-violet": "_variant-violet_aqopo_35",
  "variant-outlined": "_variant-outlined_aqopo_39",
  "size-sm": "_size-sm_aqopo_46",
  "size-xxxs": "_size-xxxs_aqopo_46",
  "size-md": "_size-md_aqopo_51",
  "size-xxs": "_size-xxs_aqopo_51",
  "mb-0": "_mb-0_aqopo_57",
  "mb-1": "_mb-1_aqopo_61",
  "mb-2": "_mb-2_aqopo_65",
  "mb-3": "_mb-3_aqopo_69",
  "mb-4": "_mb-4_aqopo_73",
  "mb-5": "_mb-5_aqopo_77",
  "mb-6": "_mb-6_aqopo_81",
  "mb-7": "_mb-7_aqopo_85",
  "mb-8": "_mb-8_aqopo_89",
  "mb-9": "_mb-9_aqopo_93",
  "mb-10": "_mb-10_aqopo_97",
  "mb-11": "_mb-11_aqopo_101",
  "mb-12": "_mb-12_aqopo_105",
  "mb-13": "_mb-13_aqopo_109",
  "mb-14": "_mb-14_aqopo_113",
  "mb-15": "_mb-15_aqopo_117",
  "mb-16": "_mb-16_aqopo_121",
  "mb-17": "_mb-17_aqopo_125",
  "mb-18": "_mb-18_aqopo_129",
  "mb-19": "_mb-19_aqopo_133",
  "mb-20": "_mb-20_aqopo_137",
  "mb-21": "_mb-21_aqopo_141",
  "mb-22": "_mb-22_aqopo_145",
  "mb-23": "_mb-23_aqopo_149",
  "mb-24": "_mb-24_aqopo_153",
  "mb-25": "_mb-25_aqopo_157",
  "mb-26": "_mb-26_aqopo_161",
  "mb-27": "_mb-27_aqopo_165",
  "mb-28": "_mb-28_aqopo_169",
  "mb-29": "_mb-29_aqopo_173",
  "mb-30": "_mb-30_aqopo_177",
  "mb-31": "_mb-31_aqopo_181",
  "mb-32": "_mb-32_aqopo_185"
};
var a = /* @__PURE__ */ ((_) => (_.md = "md", _.sm = "sm", _.xxs = "xxs", _.xxxs = "xxxs", _))(a || {});
const g = (_) => {
  const {
    className: m,
    mb: b = 0,
    size: p = a.xxxs,
    thin: q,
    variant: s = e.gray,
    ...n
  } = _, r = i(
    o.badge,
    o[`size-${p}`],
    o[`mb-${b}`],
    o[`variant-${s}`],
    {
      [o.thin]: q
    },
    m
  );
  return /* @__PURE__ */ t("div", { className: r, ...n, children: _.children });
};
export {
  g as B,
  a as E
};
//# sourceMappingURL=Badge-BQ-ScUjK.js.map
