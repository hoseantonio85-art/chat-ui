import { jsx as o, jsxs as c, Fragment as F } from "react/jsx-runtime";
import p, { useCallback as X, useRef as j, useImperativeHandle as K, useMemo as Y } from "react";
import { B as I } from "./Button-C-z9nYbB.js";
import { B as U, E as G, U as J, F as Q, G as V } from "./vendor-other-4r8kKhmH.js";
import { c as f } from "./vendor-utils-TYjSchlL.js";
import { R as b } from "./Row-DT_8J65b.js";
import { I as x } from "./Icon-BY6vNIR8.js";
import { T as Z } from "./Tooltip-kHcD51Z4.js";
import { a as m } from "./Typography-FIwI70kG.js";
const xo = p.forwardRef((e, r) => {
  const { size: t, color: l, ...a } = e, d = X(
    (s) => {
      const _ = j(null);
      return K(r, () => _.current, []), /* @__PURE__ */ o(I, { ref: _, size: t, ...s });
    },
    [t, r]
  );
  return /* @__PURE__ */ o(
    U,
    {
      color: l,
      ...a,
      components: { Button: d }
    }
  );
}), ee = "_dropzone_1233i_1", oe = "_dropzoneDisabled_1233i_11", te = "_dropzoneActive_1233i_11", re = "_uploadButton_1233i_15", ne = "_placeholderText_1233i_19", ie = "_dropzoneError_1233i_22", le = "_actionWrapper_1233i_31", se = "_uploadButtonText_1233i_48", ae = "_dropzoneLabel_1233i_54", ce = "_dropzoneLabelFullHeight_1233i_59", de = "_dropzoneFullHeight_1233i_62", pe = "_tooltip_1233i_82", _e = "_required_1233i_88", ue = "_uploaderLabel_1233i_92", fe = "_uploaderLabelError_1233i_99", me = "_errorText_1233i_103", he = "_helpText_1233i_107", xe = "_placeholder_1233i_19", ze = "_suffix_1233i_114", ge = "_actionWrapperDisabled_1233i_134", be = "_actionIconWrapper_1233i_138", n = {
  dropzone: ee,
  dropzoneDisabled: oe,
  dropzoneActive: te,
  uploadButton: re,
  placeholderText: ne,
  dropzoneError: ie,
  actionWrapper: le,
  uploadButtonText: se,
  dropzoneLabel: ae,
  dropzoneLabelFullHeight: ce,
  dropzoneFullHeight: de,
  tooltip: pe,
  required: _e,
  uploaderLabel: ue,
  uploaderLabelError: fe,
  errorText: me,
  helpText: he,
  placeholder: xe,
  suffix: ze,
  actionWrapperDisabled: ge,
  actionIconWrapper: be
}, Be = p.memo((e) => {
  const {
    placeholder: r,
    previewText: t = "Перетащите файлы сюда или",
    linkText: l = "выберите вручную"
  } = e;
  return /* @__PURE__ */ c(b, { direction: "column", justify: "center", gutter: 8, children: [
    /* @__PURE__ */ o(x, { name: "uploadFile", width: 32, height: 32 }),
    /* @__PURE__ */ c(b, { align: "middle", justify: "center", gutter: 4, noFlex: !0, wrap: !0, children: [
      /* @__PURE__ */ o("span", { children: t }),
      /* @__PURE__ */ o(
        G,
        {
          classes: {
            button: n.uploadButton,
            text: n.uploadButtonText
          },
          kind: "ghost",
          color: "secondary",
          tabIndex: -1,
          children: l
        }
      )
    ] }),
    !!r && /* @__PURE__ */ o("div", { className: n.placeholder, children: /* @__PURE__ */ o(m, { size: "sm", className: n.placeholderText, children: r }) })
  ] });
}), we = p.forwardRef(({ children: e, fullHeight: r, ...t }, l) => {
  const a = Y(() => {
    const s = {};
    return t.label && (s.label = /* @__PURE__ */ c(m, { size: "sm", bold: !0, children: [
      t.label,
      !!t.required && /* @__PURE__ */ o("span", { className: n.required, children: "*" })
    ] }), t.tooltip && (s.label = /* @__PURE__ */ c(F, { children: [
      s.label,
      /* @__PURE__ */ o(Z, { placement: "top", content: t.tooltip, children: /* @__PURE__ */ o("div", { className: n.tooltip, children: /* @__PURE__ */ o(x, { name: "infoOutlined", width: 16, height: 16 }) }) })
    ] }))), t.errorText ? s.errorText = /* @__PURE__ */ c(b, { gutter: 4, children: [
      /* @__PURE__ */ o(x, { name: "errorRounded", width: 16, height: 16 }),
      /* @__PURE__ */ o(m, { size: "sm", className: n.errorText, children: t.errorText })
    ] }) : t.helpText && (s.errorText = /* @__PURE__ */ o(m, { size: "sm", className: n.helpText, children: t.helpText })), s;
  }, [t]), d = {
    label: n.uploaderLabel,
    error: n.uploaderLabelError
  };
  return /* @__PURE__ */ o(
    J,
    {
      ref: l,
      className: f(n.dropzoneLabel, {
        [n.dropzoneLabelFullHeight]: r
      }),
      classes: d,
      ...a,
      children: e
    }
  );
}), zo = p.forwardRef(
  (e, r) => {
    const {
      placeholder: t,
      helpText: l,
      previewText: a,
      linkText: d,
      tooltip: s,
      disabled: _ = !1,
      required: B = !1,
      label: N,
      description: z,
      errorText: P,
      suffix: C,
      fullHeight: $,
      actionBlock: u,
      ...L
    } = e, w = {
      dropzone: f(n.dropzone, {
        [n.dropzoneFullHeight]: $
      }),
      dragEnter: n.dropzoneActive,
      disabled: n.dropzoneDisabled,
      error: n.dropzoneError
    };
    return /* @__PURE__ */ o(F, { children: /* @__PURE__ */ o(
      we,
      {
        ref: r,
        label: N,
        description: z,
        disabled: _,
        required: B,
        tooltip: s,
        errorText: P,
        helpText: l,
        fullHeight: $,
        children: /* @__PURE__ */ c(Q, { classes: w, disabled: _, ...L, children: [
          /* @__PURE__ */ o(
            Be,
            {
              placeholder: t,
              previewText: a,
              linkText: d
            }
          ),
          u && /* @__PURE__ */ o("div", { className: n.suffix, children: /* @__PURE__ */ o(
            "div",
            {
              className: f(n.actionWrapper, {
                [n.actionWrapperDisabled]: _
              }),
              onClick: u.onClick,
              children: /* @__PURE__ */ c(b, { gutter: 16, justify: "between", children: [
                u.backgroundIcon && /* @__PURE__ */ o("div", { className: n.actionIconWrapper, children: /* @__PURE__ */ o(
                  x,
                  {
                    name: u.backgroundIcon,
                    width: 84,
                    height: 84
                  }
                ) }),
                /* @__PURE__ */ o(m, { children: u.text }),
                /* @__PURE__ */ o(I, { ...u.buttonProps, disabled: _, children: u.actionText })
              ] })
            }
          ) }),
          C && !u && /* @__PURE__ */ o("div", { className: n.suffix, children: C })
        ] })
      }
    ) });
  }
), ve = "_extras_d5yxx_1", ye = "_dot_d5yxx_5", Te = "_flexSpace_d5yxx_13", Ie = "_errorText_d5yxx_18", Fe = "_errorInfo_d5yxx_18", T = {
  extras: ve,
  dot: ye,
  flexSpace: Te,
  errorText: Ie,
  errorInfo: Fe
}, Ne = p.memo(
  ({ items: e = [], error: r }) => r ? /* @__PURE__ */ c(b, { align: "top", gutter: 4, className: T.errorInfo, children: [
    /* @__PURE__ */ o(x, { width: 16, height: 16, name: "errorRounded" }),
    /* @__PURE__ */ o(m, { size: "sm", className: T.errorText, children: r })
  ] }) : e?.length ? /* @__PURE__ */ o(b, { align: "top", wrap: !0, className: T.flexSpace, children: e.map(
    (t, l) => typeof t == "string" ? /* @__PURE__ */ c(m, { className: T.extras, size: "sm", children: [
      t,
      l < e.length - 1 && /* @__PURE__ */ o("span", { className: T.dot, children: "•" })
    ] }, t + l) : t
  ) }) : null
);
var h = /* @__PURE__ */ ((e) => (e.default = "file", e.excel = "xlsx", e.word = "docx", e.pdf = "pdf", e.archive = "archive", e.powerPoint = "powerPoint", e))(h || {});
const Pe = {
  archive: "archive",
  xlsx: "excel",
  pdf: "pdf",
  powerPoint: "powerPoint",
  docx: "word"
}, Ce = {
  archive: "archiveFill",
  xlsx: "excelFill",
  pdf: "pdfFill",
  powerPoint: "powerPointFill",
  docx: "wordFill"
};
var E = /* @__PURE__ */ ((e) => (e.bytes = "байт", e.KB = "Кб", e.MB = "Мб", e))(E || {});
const go = {
  sm: "XXS",
  md: "XS",
  lg: "M"
};
function $e(e) {
  return /(xls|xlsb|xlsm|xlsx)$/i.test(e) ? h.excel : /(doc|docm|docx)$/i.test(e) ? h.word : /(pdf|ppdf)$/i.test(e) ? h.pdf : /(ppt|pptm|pptx)$/i.test(e) ? h.powerPoint : /(zip|rar)$/i.test(e) ? h.archive : e;
}
const k = 1024, D = 1024 * 1024, Le = (e) => !(e < D), Me = (e) => !(e < k), Ee = (e) => Le(e) ? Math.round(e / D) : Me(e) ? Math.round(e / k) : Math.round(e), ke = (e) => {
  const r = {
    single: "байт",
    few: "байта",
    many: "байтов"
  }, t = e % 10, l = e % 100;
  return l >= 11 && l <= 14 ? r.many : t === 1 ? r.single : t >= 2 && t <= 4 ? r.few : r.many;
}, De = "_icon_1o2ey_1", Re = "_word_1o2ey_10", Se = "_wordFill_1o2ey_10", We = "_excel_1o2ey_13", Ae = "_excelFill_1o2ey_13", He = "_pdf_1o2ey_16", qe = "_pdfFill_1o2ey_16", Oe = "_powerPoint_1o2ey_19", Xe = "_powerPointFill_1o2ey_19", je = "_archive_1o2ey_22", Ke = "_archiveFill_1o2ey_22", S = {
  icon: De,
  word: Re,
  wordFill: Se,
  excel: We,
  excelFill: Ae,
  pdf: He,
  pdfFill: qe,
  powerPoint: Oe,
  powerPointFill: Xe,
  archive: je,
  archiveFill: Ke
}, Ye = p.forwardRef(
  (e, r) => {
    const { error: t = !0, extension: l, stroke: a = !1 } = e, d = p.useMemo(() => {
      if (t)
        return h.default;
      const s = $e(l || "");
      return a ? Pe[s] : Ce[s];
    }, [t, l, a]);
    return /* @__PURE__ */ o("div", { ref: r, className: f(S.icon, S[d]), children: /* @__PURE__ */ c(F, { children: [
      !d && /* @__PURE__ */ o(x, { name: h.default }),
      d && /* @__PURE__ */ o(x, { name: d })
    ] }) });
  }
), Ue = "_sizeText_g4ko1_1", Ge = "_chat_g4ko1_5", W = {
  sizeText: Ue,
  chat: Ge
}, A = p.memo(
  ({ size: e = 0, chat: r = !1 }) => {
    const t = p.useMemo(() => {
      const l = Ee(e);
      let a = e < k && ke(e);
      return a || (a = e < D ? E.KB : E.MB), `${l} ${a}`;
    }, [e]);
    return e ? /* @__PURE__ */ o(
      m,
      {
        size: r ? "sm" : "lg",
        className: f(W.sizeText, { [W.chat]: r }),
        code: !0,
        children: t
      }
    ) : null;
  }
), Je = "_fileItem_755ay_2", Qe = "_fileItemError_755ay_15", Ve = "_fileItemChat_755ay_18", Ze = "_fileButtonAction_755ay_41", eo = "_fileButtonStub_755ay_50", oo = "_itemContent_755ay_55", to = "_content_755ay_62", ro = "_infoPrefix_755ay_67", no = "_sizeInfo_755ay_75", io = "_iconButtonWrapper_755ay_84", lo = "_fileName_755ay_89", i = {
  fileItem: Je,
  progressСontainer: "_progressСontainer_755ay_9",
  fileItemError: Qe,
  fileItemChat: Ve,
  "size-sm": "_size-sm_755ay_32",
  itemСontainer: "_itemСontainer_755ay_32",
  "size-md": "_size-md_755ay_35",
  "size-lg": "_size-lg_755ay_38",
  fileButtonAction: Ze,
  fileButtonStub: eo,
  itemContent: oo,
  content: to,
  infoPrefix: ro,
  sizeInfo: no,
  iconButtonWrapper: io,
  fileName: lo
}, bo = p.forwardRef(
  (e, r) => {
    const {
      children: t,
      extra: l,
      file: a,
      title: d,
      error: s,
      onDownload: _,
      onRemove: B,
      onCancel: N,
      progress: z,
      infoPrefix: P,
      iconProps: C,
      removeButtonProps: $,
      canDownload: u = !1,
      canRemove: L = !1,
      chat: w = !1,
      testId: g,
      ...H
    } = e, R = p.useMemo(() => !!s, [s]), v = p.useMemo(
      () => !!z && z < 100,
      [z]
    ), q = {
      root: f(i.fileItem, {
        [i.fileItemError]: R,
        [i.fileItemChat]: w
      }),
      container: i.itemСontainer,
      content: i.itemContent,
      info: i.sizeInfo,
      linearProgress: i.progressСontainer,
      lg: i["size-lg"],
      md: i["size-md"],
      sm: i["size-sm"]
    }, O = {
      status: "progress",
      progressType: "linear"
    };
    return /* @__PURE__ */ c(
      V,
      {
        ref: r,
        classes: q,
        info: /* @__PURE__ */ c(F, { children: [
          P && /* @__PURE__ */ o("div", { className: i.infoPrefix, children: P }),
          !w && /* @__PURE__ */ o(A, { size: a?.size })
        ] }),
        renderIconButtons: ({ size: M = "md" }) => /* @__PURE__ */ c(F, { children: [
          !!_ && !v && /* @__PURE__ */ o(
            I,
            {
              variant: "ellipse",
              icon: "downloadArrow",
              size: "XS",
              iconOnly: !0,
              className: f(i.fileButtonAction, i[`size-${M}`]),
              onClick: (y) => _?.(y),
              "data-testid": g ? `${g}-downloadButton` : void 0
            }
          ),
          u && !_ && !v && /* @__PURE__ */ o("div", { className: i.fileButtonStub }),
          !!B && !v && /* @__PURE__ */ o(
            I,
            {
              variant: "ellipse",
              icon: "trash",
              size: "XS",
              iconOnly: !0,
              className: f(i.fileButtonAction, i[`size-${M}`]),
              onClick: (y) => B?.(y),
              "data-testid": g ? `${g}-removeButton` : void 0,
              ...$
            }
          ),
          L && !B && !v && /* @__PURE__ */ o("div", { className: i.fileButtonStub }),
          !!N && /* @__PURE__ */ o(
            I,
            {
              variant: "ellipse",
              icon: "cross",
              size: "XS",
              iconOnly: !0,
              className: f(i.fileButtonAction, i[`size-${M}`]),
              onClick: (y) => N?.(y),
              "data-testid": g ? `${g}-cancelButton` : void 0
            }
          )
        ] }),
        progress: z,
        ...v ? O : {},
        ...H,
        children: [
          /* @__PURE__ */ o(
            Ye,
            {
              extension: a?.extension,
              error: R,
              ...C
            }
          ),
          /* @__PURE__ */ c("div", { className: i.content, children: [
            /* @__PURE__ */ o(m, { size: "lg", className: i.fileName, title: d, children: t }),
            !w || s ? /* @__PURE__ */ o(Ne, { items: l, error: s }) : /* @__PURE__ */ o(A, { size: a?.size, chat: !0 })
          ] })
        ]
      }
    );
  }
);
export {
  xo as B,
  zo as D,
  h as E,
  bo as F,
  k as K,
  we as L,
  D as M,
  Ce as a,
  E as b,
  go as c,
  $e as d,
  Le as e,
  Pe as f,
  Me as g,
  Ee as h,
  ke as p
};
//# sourceMappingURL=FileItem-FECMbxN3.js.map
