import { jsx as T, jsxs as ye } from "react/jsx-runtime";
import { c as R } from "./vendor-utils-TYjSchlL.js";
import pe, { forwardRef as ve, useMemo as ke, useRef as z, useCallback as H, useState as K, useEffect as U } from "react";
import { u as D, a as ce, b as Te, g as xe, d as we, f as le } from "./useThrottle-B5uT0lgf.js";
const Oe = "_container_2zca5_1", _e = {
  container: Oe
}, ae = ve(
  ({ children: r, className: g, contentMaxSize: u, ...x }, N) => {
    const P = ke(() => {
      if (u) {
        if (typeof u == "number")
          return `${u}px`;
        if (typeof u == "string")
          return u;
      }
      return "auto";
    }, [u]);
    return /* @__PURE__ */ T(
      "div",
      {
        className: R(_e.container, g),
        ref: N,
        ...x,
        style: { maxHeight: P },
        children: r
      }
    );
  }
);
ae.displayName = "ScrollhostContainer";
var L = /* @__PURE__ */ ((r) => (r.x = "scrollLeft", r.y = "scrollTop", r))(L || {}), X = /* @__PURE__ */ ((r) => (r.x = "scrollWidth", r.y = "scrollHeight", r))(X || {}), G = /* @__PURE__ */ ((r) => (r.x = "offsetWidth", r.y = "offsetHeight", r))(G || {}), B = /* @__PURE__ */ ((r) => (r.x = "left", r.y = "top", r))(B || {}), M = /* @__PURE__ */ ((r) => (r.x = "width", r.y = "height", r))(M || {});
const Re = "_scrollhost_1i2sh_1", De = "_scrollbarTrack_1i2sh_17", Me = "_scrollbarTrackX_1i2sh_24", Se = "_scrollbarTrackY_1i2sh_29", Ce = "_scrollbarThumb_1i2sh_35", Ee = "_scrollbarThumbX_1i2sh_57", We = "_scrollbarThumbY_1i2sh_60", b = {
  scrollhost: Re,
  scrollbarTrack: De,
  scrollbarTrackX: Me,
  scrollbarTrackY: Se,
  scrollbarThumb: Ce,
  scrollbarThumbX: Ee,
  scrollbarThumbY: We
}, Ye = (r) => r?.ownerDocument || document, ze = (r) => {
  const g = z(null), u = D(r);
  return H(
    (...x) => {
      g.current && (cancelAnimationFrame(g.current), g.current = null), g.current = requestAnimationFrame(() => {
        u(...x);
      });
    },
    [u]
  );
}, k = (r) => r === "y", He = pe.forwardRef(
  ({
    autoHide: r = !1,
    children: g,
    className: u,
    contentMaxSize: x,
    contentRef: N,
    thumbMinSize: P = 25,
    timeout: $ = 1e3,
    ...J
  }, ie) => {
    const [p, Q] = K(!r), [ue, fe] = K("y"), [S, V] = K(!1), d = z(null), he = ce(
      d,
      ie
    ), n = z(null), me = ce(
      n,
      N
    ), f = z(null), t = Te({
      x: {
        dragOffset: 0,
        isDrag: !1,
        isOverflowing: !1,
        thumb: {},
        thumbSize: 0,
        track: {}
      },
      y: {
        dragOffset: 0,
        isDrag: !1,
        isOverflowing: !1,
        thumb: {},
        thumbSize: 0,
        track: {}
      }
    }), C = (e) => {
      e.preventDefault(), e.stopPropagation();
    }, be = H(() => {
      const e = d.current;
      return Ye(e);
    }, []), A = () => {
      const e = t.x.track?.getBoundingClientRect?.(), o = t.y.track?.getBoundingClientRect?.();
      e && (t.x.track.style.opacity = "0"), o && (t.y.track.style.opacity = "0");
    }, E = (e) => {
      t[e].isOverflowing && (f.current && clearTimeout(f.current), t[e].track.style.opacity = "1", p || (f.current = setTimeout(A, $)));
    }, W = D((e) => {
      r && !p && Q(!0), r && fe(e);
    }), ge = D(
      (e) => {
        C(e), n?.current && (E("x"), E("y"), e.target === t.x.track && W("x"), e.target === t.y.track && W("y"));
      }
    ), de = D(() => {
      f.current && clearTimeout(f.current), f.current = setTimeout(A, $);
    }), Z = D(() => {
      r && p && Q(!1);
    }), F = H(
      (e) => {
        n && S && (C(e), V(!1), t.x.isDrag = !1, t.y.isDrag = !1);
      },
      [t.x, t.y, S]
    ), I = H(
      (e) => {
        if (n && S) {
          C(e);
          const o = n.current || {}, { offsetHeight: s, offsetWidth: l, scrollHeight: a, scrollWidth: h } = o, m = d.current?.getBoundingClientRect(), c = t.y.isDrag ? "y" : "x", { dragOffset: v, thumbSize: O, track: i } = t[c], y = i.getBoundingClientRect(), Y = y[M[c]], _ = o[X[c]], j = m?.[M[c]] || 0, se = ((k(c) ? e.clientY : e.clientX) - y[B[c]] - v) / (Y - O) * (_ - j);
          o[L[c]] = c === "y" ? Math.min(se, a - s) : Math.min(se, h - l);
        }
      },
      [S, t]
    ), ee = (e, o) => {
      if (!n)
        return;
      C(e);
      const s = t[o], l = k(o) ? e.clientY : e.clientX, a = s.thumb.getBoundingClientRect();
      s.dragOffset = l - a[B[o]], s.isDrag = !0, V(!0);
    }, q = (e) => {
      const o = d.current?.getBoundingClientRect(), s = n.current || {}, { thumb: l, thumbSize: a, track: h } = t[e], m = s[X[e]], c = h[G[e]], v = o?.[M[e]] || 0, i = s[L[e]] / (m - v), y = Math.min(
        Math.floor((c - a) * i),
        c - a
      );
      l.style.transform = k(e) ? `translate3d(0, ${y ?? 0}px, 0)` : `translate3d(${y ?? 0}px, 0, 0)`;
    }, te = (e = "x") => {
      t[e].isOverflowing && (q(e), E(e));
    }, re = ze(() => {
      n && (te("x"), te("y"));
    }), oe = (e, o = "y") => {
      const s = d.current?.getBoundingClientRect(), { thumb: l } = t[o], { clientX: a, clientY: h } = e, m = n.current || {}, v = l.getBoundingClientRect()[B[o]], O = s?.[M[o]] || 0;
      let i = m[L[o]];
      const y = (k(o) ? h - v : a - v) < 0, Y = y ? i - O : i + O, _ = () => {
        if (y)
          i > Y && (i -= 40, m.scrollTo({
            [k(o) ? "top" : "left"]: i
          }), requestAnimationFrame(_));
        else if (i < Y) {
          i += 40;
          const j = {
            [k(o) ? "top" : "left"]: i
          };
          m.scrollTo(j), requestAnimationFrame(_);
        }
      };
      _();
    }, ne = (e = "y") => {
      const { isOverflowing: o, track: s } = t[e];
      if (!o)
        return 0;
      const a = (n.current || {})[X[e]], h = s[G[e]], m = h / a, c = Math.floor(m * h) - 4;
      return Math.max(c, P);
    }, w = xe(() => {
      const e = d.current || {}, o = n.current || {}, { scrollHeight: s, scrollWidth: l } = o;
      t.x.isOverflowing = l > e.offsetWidth, t.y.isOverflowing = s > e.offsetHeight;
      const a = t.x.isOverflowing ? l : 0, h = t.y.isOverflowing ? l : 0;
      t.x.isOverflowing = t.x.isOverflowing && o.scrollWidth > o.offsetWidth - a, t.y.isOverflowing = t.y.isOverflowing && o.scrollHeight > e.offsetHeight - h, t.x.track.style.display = t.x.isOverflowing ? "block" : "none", t.y.track.style.display = t.y.isOverflowing ? "block" : "none", t.y.thumbSize = ne("y"), t.y.thumb.style.height = `${t.y.thumbSize - 4}px`, t.x.thumbSize = ne("x"), t.x.thumb.style.width = `${t.x.thumbSize - 4}px`, q("x"), q("y");
    });
    return we(d, w, {
      characterData: !0,
      childList: !0,
      subtree: !0
    }), le(d, () => w()), le(n, () => w()), U(() => {
      f.current && clearTimeout(f.current), r && p && E(ue), r && !p && (f.current = setTimeout(A, $));
    }, [p]), U(() => {
      if (n.current) {
        const e = n.current;
        return e?.addEventListener("scroll", re, !0), w(), function() {
          e?.removeEventListener("scroll", re, !0), w.cancel(), f.current && clearTimeout(f.current);
        };
      }
    }, []), U(() => {
      if (n) {
        const e = be();
        return e.addEventListener("mousemove", I), e.addEventListener(
          "mouseup",
          F,
          !0
        ), function() {
          e.removeEventListener(
            "mousemove",
            I
          ), e.removeEventListener(
            "mouseup",
            F,
            !0
          );
        };
      }
    }, [I, F]), /* @__PURE__ */ ye(
      ae,
      {
        ref: he,
        onMouseLeave: de,
        onMouseEnter: ge,
        className: u,
        contentMaxSize: x,
        ...J,
        children: [
          /* @__PURE__ */ T(
            "div",
            {
              className: b.scrollhost,
              id: "scroll",
              ref: me,
              ...J,
              children: g
            }
          ),
          /* @__PURE__ */ T(
            "div",
            {
              className: R(b.scrollbarTrack, b.scrollbarTrackY),
              ref: (e) => t.y.track = e || {},
              onMouseDown: (e) => oe(e, "y"),
              onMouseEnter: () => W("y"),
              onMouseLeave: Z,
              role: "button",
              tabIndex: -1,
              children: /* @__PURE__ */ T(
                "div",
                {
                  className: R(b.scrollbarThumb, b.scrollbarThumbY),
                  ref: (e) => t.y.thumb = e || {},
                  onMouseDown: (e) => ee(e, "y"),
                  role: "button",
                  tabIndex: -1
                }
              )
            }
          ),
          /* @__PURE__ */ T(
            "div",
            {
              className: R(b.scrollbarTrack, b.scrollbarTrackX),
              ref: (e) => t.x.track = e || {},
              onMouseDown: (e) => oe(e, "x"),
              onMouseEnter: () => W("x"),
              onMouseLeave: Z,
              role: "button",
              tabIndex: -1,
              children: /* @__PURE__ */ T(
                "div",
                {
                  className: R(b.scrollbarThumb, b.scrollbarThumbY),
                  ref: (e) => t.x.thumb = e || {},
                  onMouseDown: (e) => ee(e, "x"),
                  role: "button",
                  tabIndex: -1
                }
              )
            }
          )
        ]
      }
    );
  }
);
He.displayName = "OldScrollbar";
export {
  He as O
};
//# sourceMappingURL=OldScrollbar-QQ-a5dsW.js.map
