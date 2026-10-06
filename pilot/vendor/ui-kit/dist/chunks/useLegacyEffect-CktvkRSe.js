import { useState as i, useCallback as f, useRef as l, useEffect as v } from "react";
/* empty css                   */
import "./norm-thinking-BRN9DdIw.js";
function d(e, s = []) {
  const [t, u] = i(!1), c = f(() => {
    if (!e.current)
      return !1;
    const r = e.current;
    return r.scrollWidth > r.clientWidth;
  }, [e.current]);
  return a(() => {
    const r = () => {
      u(c());
    };
    r();
    const o = new ResizeObserver(r), n = e.current;
    return n && o.observe(n), () => {
      n && o.unobserve(n);
    };
  }, [c, ...s]), t;
}
const O = !process.env.NODE_ENV || process.env.NODE_ENV === "development", a = (e, s) => {
  const t = l(!O);
  v(() => {
    if (!t.current) {
      t.current = !0;
      return;
    }
    return e();
  }, s);
};
export {
  a,
  d as u
};
//# sourceMappingURL=useLegacyEffect-CktvkRSe.js.map
