import { jsx as P } from "react/jsx-runtime";
import v, { useRef as x, useState as C, useCallback as T, useEffect as O } from "react";
import { s as e, t as g } from "./vendor-other-4r8kKhmH.js";
import { I as S } from "./Input-BbQKUsMM.js";
const N = {
  // common
  mask: e.oneOfType([e.array, e.func, e.string, e.instanceOf(RegExp), e.oneOf([Date, Number, g.Masked]), e.instanceOf(g.Masked)]),
  value: e.any,
  unmask: e.oneOfType([e.bool, e.oneOf(["typed"])]),
  prepare: e.func,
  prepareChar: e.func,
  validate: e.func,
  commit: e.func,
  overwrite: e.oneOfType([e.bool, e.oneOf(["shift"])]),
  eager: e.oneOfType([e.bool, e.oneOf(["append", "remove"])]),
  skipInvalid: e.bool,
  // events
  onAccept: e.func,
  onComplete: e.func,
  // pattern
  placeholderChar: e.string,
  displayChar: e.string,
  lazy: e.bool,
  definitions: e.object,
  blocks: e.object,
  // enum
  enum: e.arrayOf(e.string),
  // range
  maxLength: e.number,
  from: e.number,
  to: e.number,
  // date
  pattern: e.string,
  format: e.func,
  parse: e.func,
  autofix: e.oneOfType([e.bool, e.oneOf(["pad"])]),
  // number
  radix: e.string,
  thousandsSeparator: e.string,
  mapToRadix: e.arrayOf(e.string),
  scale: e.number,
  normalizeZeros: e.bool,
  padFractionalZeros: e.bool,
  min: e.oneOfType([e.number, e.instanceOf(Date)]),
  max: e.oneOfType([e.number, e.instanceOf(Date)]),
  // dynamic
  dispatch: e.func,
  // ref
  inputRef: e.oneOfType([e.func, e.shape({
    current: e.object
  })])
}, E = Object.keys(N).filter((s) => s !== "value"), j = ["value", "unmask", "onAccept", "onComplete", "inputRef"], U = E.filter((s) => j.indexOf(s) < 0);
function F(s) {
  var o;
  const l = (o = class extends v.Component {
    constructor(t) {
      super(t), this._inputRef = this._inputRef.bind(this);
    }
    componentDidMount() {
      this.props.mask && this.initMask();
    }
    componentDidUpdate() {
      const t = this.props, a = this._extractMaskOptionsFromProps(t);
      if (a.mask)
        this.maskRef ? (this.maskRef.updateOptions(a), "value" in t && t.value !== void 0 && (this.maskValue = t.value)) : this.initMask(a);
      else if (this.destroyMask(), "value" in t && t.value !== void 0) {
        var i;
        (i = this.element) != null && i.isContentEditable && this.element.tagName !== "INPUT" && this.element.tagName !== "TEXTAREA" ? this.element.textContent = t.value : this.element.value = t.value;
      }
    }
    componentWillUnmount() {
      this.destroyMask();
    }
    _inputRef(t) {
      this.element = t, this.props.inputRef && (Object.prototype.hasOwnProperty.call(this.props.inputRef, "current") ? this.props.inputRef.current = t : this.props.inputRef(t));
    }
    initMask(t) {
      t === void 0 && (t = this._extractMaskOptionsFromProps(this.props)), this.maskRef = g(this.element, t).on("accept", this._onAccept.bind(this)).on("complete", this._onComplete.bind(this)), "value" in this.props && this.props.value !== void 0 && (this.maskValue = this.props.value);
    }
    destroyMask() {
      this.maskRef && (this.maskRef.destroy(), delete this.maskRef);
    }
    _extractMaskOptionsFromProps(t) {
      const {
        ...a
      } = t;
      return Object.keys(a).filter((i) => U.indexOf(i) < 0).forEach((i) => {
        delete a[i];
      }), a;
    }
    _extractNonMaskProps(t) {
      const {
        ...a
      } = t;
      return E.forEach((i) => {
        i !== "maxLength" && delete a[i];
      }), "defaultValue" in a || (a.defaultValue = t.mask ? "" : a.value), delete a.value, a;
    }
    get maskValue() {
      return this.maskRef ? this.props.unmask === "typed" ? this.maskRef.typedValue : this.props.unmask ? this.maskRef.unmaskedValue : this.maskRef.value : "";
    }
    set maskValue(t) {
      this.maskRef && (t = t == null && this.props.unmask !== "typed" ? "" : t, this.props.unmask === "typed" ? this.maskRef.typedValue = t : this.props.unmask ? this.maskRef.unmaskedValue = t : this.maskRef.value = t);
    }
    _onAccept(t) {
      this.props.onAccept && this.maskRef && this.props.onAccept(this.maskValue, this.maskRef, t);
    }
    _onComplete(t) {
      this.props.onComplete && this.maskRef && this.props.onComplete(this.maskValue, this.maskRef, t);
    }
    render() {
      return v.createElement(s, {
        ...this._extractNonMaskProps(this.props),
        inputRef: this._inputRef
      });
    }
  }, o.displayName = void 0, o.propTypes = void 0, o), p = s.displayName || s.name || "Component";
  return l.displayName = "IMask(" + p + ")", l.propTypes = N, v.forwardRef((k, t) => v.createElement(l, {
    ...k,
    ref: t
  }));
}
const w = F((s) => {
  let {
    inputRef: o,
    ...l
  } = s;
  return v.createElement("input", {
    ...l,
    ref: o
  });
}), D = (s, o) => v.createElement(w, {
  ...s,
  ref: o
});
v.forwardRef(D);
function K(s, o) {
  let {
    onAccept: l,
    onComplete: p,
    ref: k = x(null),
    defaultValue: t,
    defaultUnmaskedValue: a,
    defaultTypedValue: i
  } = o === void 0 ? {} : o;
  const r = x(null), [h, y] = C({}), [R, V] = C(""), [d, M] = C(""), [m, _] = C(), b = T(() => {
    var n;
    (n = r.current) == null || n.destroy(), r.current = null;
  }, []), I = T(() => {
    const n = r.current;
    n && (y({
      value: n.value,
      unmaskedValue: n.unmaskedValue,
      typedValue: n.typedValue
    }), _(n.typedValue), M(n.unmaskedValue), V(n.value));
  }, []), u = T((n) => {
    const c = r.current;
    c && (I(), l?.(c.value, c, n));
  }, [l]), A = T((n) => r.current && p?.(r.current.value, r.current, n), [p]);
  return O(() => {
    const {
      value: n,
      ...c
    } = h, f = r.current;
    !f || R === void 0 || (n !== R && (f.value = R, f.value !== R && u()), y(c));
  }, [R]), O(() => {
    const {
      unmaskedValue: n,
      ...c
    } = h, f = r.current;
    !f || d === void 0 || (n !== d && (f.unmaskedValue = d, f.unmaskedValue !== d && u()), y(c));
  }, [d]), O(() => {
    const {
      typedValue: n,
      ...c
    } = h, f = r.current;
    !f || m === void 0 || (n !== m && (f.typedValue = m, f.masked.typedValueEquals(m) || u()), y(c));
  }, [m]), O(() => {
    const n = k.current;
    if (!n || !(s != null && s.mask)) return b();
    const c = r.current;
    c ? c?.updateOptions(s) : n && s != null && s.mask && (r.current = g(n, s), I(), t !== void 0 && V(t), a !== void 0 && M(a), i !== void 0 && _(i));
  }, [s, b, u]), O(() => {
    if (!r.current) return;
    const n = r.current;
    return n.on("accept", u), n.on("complete", A), () => {
      n.off("accept", u), n.off("complete", A);
    };
  }, [u, A]), O(() => b, [b]), {
    ref: k,
    maskRef: r,
    value: R,
    setValue: V,
    unmaskedValue: d,
    setUnmaskedValue: M,
    typedValue: m,
    setTypedValue: _
  };
}
const W = v.forwardRef(
  (s, o) => {
    const {
      maskOptions: l,
      value: p = "",
      onChange: k,
      clearIncomplete: t = !1,
      ...a
    } = s, [i, r] = C(l), h = x(!1), y = x(!1), {
      ref: R,
      maskRef: V,
      value: d,
      setValue: M
    } = K(i, {
      defaultValue: p,
      onAccept: (u, A) => {
        k?.(u, A.unmaskedValue);
      }
    }), m = R;
    function _(u) {
      o && (typeof o == "function" ? o(u) : o.current = u), u && (m.current = u);
    }
    const b = () => {
      V.current && V.current.updateValue();
    }, I = () => {
      h.current = !0, M(""), k?.("", ""), b();
    };
    return O(() => {
      r(l);
    }, [l]), O(() => {
      const u = V.current;
      !u || !m.current || p === d || (h.current = !0, M(p ?? ""), m.current.value = p ?? "", u.updateValue());
    }, [p]), /* @__PURE__ */ P(
      S,
      {
        ...a,
        ref: _,
        value: d,
        onChange: () => {
          h.current && (h.current = !1, b());
        },
        onFocus: () => {
          y.current = !0;
        },
        onBlur: () => {
          y.current && t && !V?.current?.masked?.isComplete && (y.current = !1, M(""));
        },
        onClear: I
      }
    );
  }
);
export {
  W as I
};
//# sourceMappingURL=InputMask-BuBZLXmX.js.map
