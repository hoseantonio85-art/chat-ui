import { jsxs as R, jsx as b } from "react/jsx-runtime";
import { createContext as W, useContext as X, useState as K, useRef as j, useEffect as x, useMemo as G, createElement as Y } from "react";
import { _ as Q, w as Z, x as M, y as ee, z as ne } from "./vendor-other-4r8kKhmH.js";
import { B as te } from "./Button-C-z9nYbB.js";
import { R as B } from "./Row-DT_8J65b.js";
import { I as re } from "./Icon-BY6vNIR8.js";
import { a as ae } from "./Typography-FIwI70kG.js";
var oe = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g, se = {
  "&amp;": "&",
  "&#38;": "&",
  "&lt;": "<",
  "&#60;": "<",
  "&gt;": ">",
  "&#62;": ">",
  "&apos;": "'",
  "&#39;": "'",
  "&quot;": '"',
  "&#34;": '"',
  "&nbsp;": " ",
  "&#160;": " ",
  "&copy;": "©",
  "&#169;": "©",
  "&reg;": "®",
  "&#174;": "®",
  "&hellip;": "…",
  "&#8230;": "…",
  "&#x2F;": "/",
  "&#47;": "/"
}, ie = function(e) {
  return se[e];
}, ue = function(e) {
  return e.replace(oe, ie);
};
function F(n, e) {
  var t = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    e && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    })), t.push.apply(t, r);
  }
  return t;
}
function U(n) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? F(Object(t), !0).forEach(function(r) {
      M(n, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : F(Object(t)).forEach(function(r) {
      Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return n;
}
var I = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: !0,
  unescape: ue
}, V, q = W();
function ce() {
  var n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  I = U(U({}, I), n);
}
function fe() {
  return I;
}
var le = function() {
  function n() {
    Z(this, n), this.usedNamespaces = {};
  }
  return Q(n, [{
    key: "addUsedNamespaces",
    value: function(t) {
      var r = this;
      t.forEach(function(o) {
        r.usedNamespaces[o] || (r.usedNamespaces[o] = !0);
      });
    }
  }, {
    key: "getUsedNamespaces",
    value: function() {
      return Object.keys(this.usedNamespaces);
    }
  }]), n;
}();
function pe(n) {
  V = n;
}
function de() {
  return V;
}
var ge = {
  type: "3rdParty",
  init: function(e) {
    ce(e.options.react), pe(e);
  }
};
function me() {
  if (console && console.warn) {
    for (var n, e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    typeof t[0] == "string" && (t[0] = "react-i18next:: ".concat(t[0])), (n = console).warn.apply(n, t);
  }
}
var A = {};
function C() {
  for (var n = arguments.length, e = new Array(n), t = 0; t < n; t++)
    e[t] = arguments[t];
  typeof e[0] == "string" && A[e[0]] || (typeof e[0] == "string" && (A[e[0]] = /* @__PURE__ */ new Date()), me.apply(void 0, e));
}
function H(n, e, t) {
  n.loadNamespaces(e, function() {
    if (n.isInitialized)
      t();
    else {
      var r = function o() {
        setTimeout(function() {
          n.off("initialized", o);
        }, 0), t();
      };
      n.on("initialized", r);
    }
  });
}
function ve(n, e) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = e.languages[0], o = e.options ? e.options.fallbackLng : !1, s = e.languages[e.languages.length - 1];
  if (r.toLowerCase() === "cimode") return !0;
  var a = function(f, l) {
    var m = e.services.backendConnector.state["".concat(f, "|").concat(l)];
    return m === -1 || m === 2;
  };
  return t.bindI18n && t.bindI18n.indexOf("languageChanging") > -1 && e.services.backendConnector.backend && e.isLanguageChangingTo && !a(e.isLanguageChangingTo, n) ? !1 : !!(e.hasResourceBundle(r, n) || !e.services.backendConnector.backend || e.options.resources && !e.options.partialBundledLanguages || a(r, n) && (!o || a(s, n)));
}
function he(n, e) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (!e.languages || !e.languages.length)
    return C("i18n.languages were undefined or empty", e.languages), !0;
  var r = e.options.ignoreJSONStructure !== void 0;
  return r ? e.hasLoadedNamespace(n, {
    precheck: function(s, a) {
      if (t.bindI18n && t.bindI18n.indexOf("languageChanging") > -1 && s.services.backendConnector.backend && s.isLanguageChangingTo && !a(s.isLanguageChangingTo, n)) return !1;
    }
  }) : ve(n, e, t);
}
function _(n, e) {
  var t = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    e && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(n, o).enumerable;
    })), t.push.apply(t, r);
  }
  return t;
}
function P(n) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? _(Object(t), !0).forEach(function(r) {
      M(n, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : _(Object(t)).forEach(function(r) {
      Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return n;
}
var be = function(e, t) {
  var r = j();
  return x(function() {
    r.current = e;
  }, [e, t]), r.current;
};
function ye(n) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = e.i18n, r = X(q) || {}, o = r.i18n, s = r.defaultNS, a = t || o || de();
  if (a && !a.reportNamespaces && (a.reportNamespaces = new le()), !a) {
    C("You will need to pass in an i18next instance by using initReactI18next");
    var g = function(c) {
      return Array.isArray(c) ? c[c.length - 1] : c;
    }, f = [g, {}, !1];
    return f.t = g, f.i18n = {}, f.ready = !1, f;
  }
  a.options.react && a.options.react.wait !== void 0 && C("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");
  var l = P(P(P({}, fe()), a.options.react), e), m = l.useSuspense, L = l.keyPrefix, i = s || a.options && a.options.defaultNS;
  i = typeof i == "string" ? [i] : i || ["translation"], a.reportNamespaces.addUsedNamespaces && a.reportNamespaces.addUsedNamespaces(i);
  var p = (a.isInitialized || a.initializedStoreOnce) && i.every(function(u) {
    return he(u, a, l);
  });
  function v() {
    return a.getFixedT(null, l.nsMode === "fallback" ? i : i[0], L);
  }
  var J = K(v), k = ee(J, 2), D = k[0], y = k[1], w = i.join(), T = be(w), d = j(!0);
  x(function() {
    var u = l.bindI18n, c = l.bindI18nStore;
    d.current = !0, !p && !m && H(a, i, function() {
      d.current && y(v);
    }), p && T && T !== w && d.current && y(v);
    function O() {
      d.current && y(v);
    }
    return u && a && a.on(u, O), c && a && a.store.on(c, O), function() {
      d.current = !1, u && a && u.split(" ").forEach(function(S) {
        return a.off(S, O);
      }), c && a && c.split(" ").forEach(function(S) {
        return a.store.off(S, O);
      });
    };
  }, [a, w]);
  var z = j(!0);
  x(function() {
    d.current && !z.current && y(v), z.current = !1;
  }, [a, L]);
  var h = [D, a, p];
  if (h.t = D, h.i18n = a, h.ready = p, p || !p && !m) return h;
  throw new Promise(function(u) {
    H(a, i, function() {
      u();
    });
  });
}
function Oe(n) {
  var e = n.i18n, t = n.defaultNS, r = n.children, o = G(function() {
    return {
      i18n: e,
      defaultNS: t
    };
  }, [e, t]);
  return Y(q.Provider, {
    value: o
  }, r);
}
const Ne = "Показать", we = "Скрыть", Se = {
  show: Ne,
  hide: we
}, Pe = "ru", E = "common", je = {
  ru: {
    [E]: Se
  }
}, N = ne.createInstance();
function xe(n, e, t) {
  const r = [E];
  if (N.use(ge).init({
    debug: !1,
    defaultNS: E,
    fallbackLng: Pe,
    interpolation: {
      // React already does escaping
      escapeValue: !1,
      skipOnVariables: !1
    },
    // keySeparator: false,
    lng: n,
    ns: r,
    react: { useSuspense: !0 },
    resources: je
  }), N.options.ns?.indexOf(e) === -1)
    try {
      N.addResourceBundle(
        n,
        e,
        t || {}
      );
    } catch {
      console.log(
        `Error loading translation: ./locales/${n}/${e}.json`
      );
    }
  return N;
}
const Ie = "_notice_y4a5c_1", Ce = "_content_y4a5c_13", $ = {
  notice: Ie,
  content: Ce
}, Ee = xe("ru", "common"), Le = ({
  description: n,
  iconName: e = "assistantGradient",
  opened: t = !1,
  title: r
}) => {
  const { t: o } = ye(), [s, a] = K(t), g = (f) => {
    f.stopPropagation(), a(!s);
  };
  return /* @__PURE__ */ R(
    B,
    {
      role: "presentation",
      className: $.notice,
      onClick: g,
      align: "top",
      gutter: 8,
      children: [
        /* @__PURE__ */ b(re, { name: e }),
        /* @__PURE__ */ R(
          B,
          {
            className: $.content,
            direction: "column",
            align: "top",
            justify: "start",
            gutter: 8,
            children: [
              r,
              n && s && /* @__PURE__ */ b(ae, { code: !0, children: n })
            ]
          }
        ),
        n && /* @__PURE__ */ b(
          te,
          {
            iconAfter: s ? "arrowUpSmall" : "arrowDownSmall",
            variant: "function",
            size: "XXS",
            children: o(s ? "hide" : "show")
          }
        )
      ]
    }
  );
}, Ue = (n) => /* @__PURE__ */ b(Oe, { i18n: Ee, children: /* @__PURE__ */ b(Le, { ...n }) });
export {
  Le as N,
  Ue as a
};
//# sourceMappingURL=Notice-B2304gqo.js.map
