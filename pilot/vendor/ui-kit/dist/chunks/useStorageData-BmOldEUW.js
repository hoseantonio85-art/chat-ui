import { useRef as f, useEffect as u, useState as m, useCallback as l, useMemo as g } from "react";
const p = () => {
  const e = f(!1);
  return u(() => {
    e.current = !0;
  }, []), e.current;
};
function E(e, t, r) {
  const [n, o] = m(e), a = f(null), s = l(
    (c) => {
      a.current && !a.current?.contains(c.target) && (!r || a.current?.parentNode === c.target) && (o(!1), t && t(c));
    },
    [t, r]
  );
  return u(() => {
    const c = document.querySelector("#root"), i = !r && c?.contains(a?.current) ? c : document;
    return i?.addEventListener("mousedown", s), i?.addEventListener("touchstart", s), () => {
      i?.removeEventListener("mousedown", s), i?.removeEventListener("touchstart", s);
    };
  }, []), {
    isComponentVisible: n,
    setIsComponentVisible: o,
    visibleRef: a
  };
}
const v = async (e, t) => {
  let r = !1;
  if (navigator?.clipboard)
    try {
      await navigator.clipboard.writeText(e || ""), r = !0;
    } catch {
      r = !1;
    }
  else {
    const n = document.createElement("textarea");
    n.value = e || "", n.style.position = "fixed", document.body.append(n), n.focus(), n.select();
    try {
      document.execCommand("copy"), r = !0;
    } catch {
      r = !1;
    } finally {
      n.remove();
    }
  }
  return t?.silent || (r ? t?.addNotification?.(t?.successMessage ?? "", {
    type: "success"
  }) : t?.addNotification?.(t?.errorMessage ?? "", {
    type: "error"
  })), r;
}, w = () => v, D = (e, t) => {
  const [r, n] = m(e);
  return u(() => {
    const o = setTimeout(() => {
      n(e);
    }, t);
    return () => {
      clearTimeout(o);
    };
  }, [e, t]), r;
}, S = (e, t, r, n) => e ? (e.addEventListener(t, r, n), () => {
  e.removeEventListener(t, r, n);
}) : null, L = (e, t, r, n = !1) => {
  u(() => {
    const o = typeof e == "function" ? e() : e;
    if (!o?.addEventListener)
      return;
    const a = S(o, t, r, n);
    return () => {
      a?.();
    };
  }, [e, t, r, JSON.stringify(n)]);
}, C = (e = "ru-RU", t = {}) => g(
  () => new Intl.NumberFormat(e, {
    currency: "RUB",
    maximumFractionDigits: 4,
    minimumFractionDigits: 0,
    style: "currency",
    ...t
  }),
  [e, t]
);
function d(e, t) {
  if (!e)
    return null;
  const r = localStorage.getItem(e) || "", n = localStorage.getItem(`${e}_deadLine`) || "";
  if (!r)
    return null;
  if (t && n && Number(JSON.parse(n)) < Date.now())
    return localStorage.removeItem(e), localStorage.removeItem(`${e}_deadLine`), null;
  try {
    return JSON.parse(r) || null;
  } catch {
    return localStorage.removeItem(e), null;
  }
}
const I = (e, t) => {
  const [r, n] = m(d(e, t));
  u(() => {
    function s() {
      n(d(e));
    }
    return window.addEventListener(`storage${e}`, s), function() {
      window.removeEventListener(`storage${e}`, s);
    };
  }, [e]);
  const o = l(
    (s) => {
      localStorage.setItem(e, JSON.stringify(s)), t && localStorage.setItem(
        `${e}_deadLine`,
        JSON.stringify(Date.now() + t)
      ), window.dispatchEvent(new CustomEvent(`storage${e}`));
    },
    [e, t]
  );
  return { removeStorageData: l(() => {
    localStorage.removeItem(e);
  }, [e]), setStorageData: o, storage: r };
};
export {
  E as a,
  w as b,
  D as c,
  L as d,
  C as e,
  I as f,
  S as s,
  p as u
};
//# sourceMappingURL=useStorageData-BmOldEUW.js.map
