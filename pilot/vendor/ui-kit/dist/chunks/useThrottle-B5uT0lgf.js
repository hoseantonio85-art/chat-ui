import { useRef as u, useEffect as c, useCallback as b, useMemo as f, useLayoutEffect as m } from "react";
const w = (t) => {
  const r = u(t);
  return c(() => {
    r.current = t;
  }, [t]), b((...n) => {
    const e = r.current;
    e?.(...n);
  }, []);
};
function a(t, r) {
  typeof t == "function" ? t(r) : t && (t.current = r);
}
const O = (t, r) => f(() => t === null && r === null ? null : (n) => {
  a(t, n), a(r, n);
}, [t, r]), M = (t, r = !1) => {
  const n = u(t);
  return c(() => {
    r && (n.current = t);
  }), n.current;
}, R = (t, r, n) => {
  const e = new MutationObserver((s) => {
    r(s);
  });
  return e.observe(t, n), () => {
    e.disconnect();
  };
}, T = (t, r, n) => {
  c(() => {
    const e = t.current;
    if (!e)
      return;
    const s = R(e, r, n);
    return () => {
      s();
    };
  }, [t, r, JSON.stringify(n)]);
}, d = (t, r) => {
  const n = new ResizeObserver(() => {
    r();
  });
  return n.observe(t), () => {
    n.disconnect();
  };
}, h = (t, r) => {
  m(() => {
    const n = t.current;
    if (!n)
      return;
    const e = d(n, r);
    return () => {
      e();
    };
  }, [r, t]);
}, k = (t, r = 64) => {
  const n = u(null), e = u(0), s = u(t);
  c(() => {
    s.current = t;
  }, [t]);
  const o = (...i) => {
    const l = Date.now();
    if (l - e.current >= r)
      return e.current = l, s.current(...i);
    n.current || (n.current = setTimeout(() => {
      e.current = Date.now(), n.current = null, s.current(...i);
    }, r));
  };
  return o.cancel = () => {
    n.current && (clearTimeout(n.current), n.current = null);
  }, c(() => () => {
    n.current && clearTimeout(n.current);
  }, []), o;
};
export {
  O as a,
  M as b,
  R as c,
  T as d,
  d as e,
  h as f,
  k as g,
  a as s,
  w as u
};
//# sourceMappingURL=useThrottle-B5uT0lgf.js.map
