/*!
 * Tiny PowerPaste plugin
 *
 * Copyright 2010-2021 Tiny Technologies, Inc. All rights reserved.
 *
 * Version: 5.4.2-476
 */
!function() {
    "use strict";
    function e(t) {
        return parseInt(t, 10)
    }
    function r(t, e) {
        return 0 == (e = t - e) ? 0 : 0 < e ? 1 : -1
    }
    function n(t, e, n) {
        return {
            major: t,
            minor: e,
            patch: n
        }
    }
    function o(t) {
        return (t = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(t)) ? n(e(t[1]), e(t[2]), e(t[3])) : n(0, 0, 0)
    }
    function i(n, r) {
        return function() {
            for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
            return n(r.apply(null, t))
        }
    }
    function u(t) {
        return t
    }
    var c = function(t, e) {
        return !!t && -1 === function(t, e) {
            var n = r(t.major, e.major);
            if (0 !== n)
                return n;
            n = r(t.minor, e.minor);
            if (0 !== n)
                return n;
            e = r(t.patch, e.patch);
            return 0 !== e ? e : 0
        }(o([(t = t = t).majorVersion, t.minorVersion].join(".").split(".").slice(0, 3).join(".")), o(e))
    }
      , t = function(r, o) {
        return function() {
            for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
            var n = r.console;
            n && o in n && n[o].apply(n, arguments)
        }
    }
      , s = {
        log: t(window, "log"),
        error: t(window, "error"),
        warn: t(window, "warn")
    }
      , f = function(t, e) {
        t.addCommand("mceTogglePlainTextPaste", e.toggle)
    }
      , y = function() {}
      , l = function(t) {
        return function() {
            return t
        }
    };
    function p(r) {
        for (var o = [], t = 1; t < arguments.length; t++)
            o[t - 1] = arguments[t];
        return function() {
            for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
            var n = o.concat(t);
            return r.apply(null, n)
        }
    }
    function a(t) {
        return function() {
            throw new Error(t)
        }
    }
    var b = function(t) {
        return t()
    }
      , d = l(!1)
      , m = l(!0)
      , g = function() {
        return v
    }
      , v = {
        fold: function(t, e) {
            return t()
        },
        is: d,
        isSome: d,
        isNone: m,
        getOr: T,
        getOrThunk: x,
        getOrDie: function(t) {
            throw new Error(t || "error: getOrDie called on none.")
        },
        getOrNull: l(null),
        getOrUndefined: l(void 0),
        or: T,
        orThunk: x,
        map: g,
        each: y,
        bind: g,
        exists: d,
        forall: m,
        filter: g,
        equals: h,
        equals_: h,
        toArray: function() {
            return []
        },
        toString: l("none()")
    };
    function h(t) {
        return t.isNone()
    }
    function x(t) {
        return t()
    }
    function T(t) {
        return t
    }
    function w(t) {
        return null == t
    }
    function E(t) {
        return !w(t)
    }
    function S(t, e) {
        return t = t,
        e = e,
        -1 < ot.call(t, e)
    }
    function A(t, e) {
        for (var n = [], r = [], o = 0, i = t.length; o < i; o++) {
            var u = t[o];
            (e(u, o) ? n : r).push(u)
        }
        return {
            pass: n,
            fail: r
        }
    }
    function I(t, e, n) {
        return ct(t, function(t) {
            n = e(n, t)
        }),
        n
    }
    function _(t, e) {
        return function(t, e, n) {
            for (var r = 0, o = t.length; r < o; r++) {
                var i = t[r];
                if (e(i, r))
                    return G.some(i);
                if (n(i, r))
                    break
            }
            return G.none()
        }(t, e, d)
    }
    function L(t, e) {
        for (var n = 0, r = t.length; n < r; n++) {
            if (e(t[n], n))
                return G.some(n)
        }
        return G.none()
    }
    function O(t) {
        for (var e = [], n = 0, r = t.length; n < r; ++n) {
            if (!Q(t[n]))
                throw new Error("Arr.flatten item " + n + " was not an array, input: " + t);
            it.apply(e, t[n])
        }
        return e
    }
    function D(t, e) {
        for (var n = 0, r = t.length; n < r; ++n) {
            if (!0 !== e(t[n], n))
                return !1
        }
        return !0
    }
    function N(t, e) {
        for (var n = {}, r = 0, o = t.length; r < o; r++) {
            var i = t[r];
            n[String(i)] = e(i, r)
        }
        return n
    }
    function C(t) {
        return 0 === t.length ? G.none() : G.some(t[0])
    }
    function P(t, e) {
        for (var n = 0; n < t.length; n++) {
            var r = e(t[n], n);
            if (r.isSome())
                return r
        }
        return G.none()
    }
    function k(t, e) {
        t.dom.bind(e, "drop dragstart dragend dragover dragenter dragleave dragdrop draggesture", function(t) {
            t.preventDefault(),
            t.stopImmediatePropagation()
        })
    }
    function R(t, e) {
        for (var n = Ot(t), r = 0, o = n.length; r < o; r++) {
            var i = n[r];
            e(t[i], i)
        }
    }
    function M(t, n) {
        return Nt(t, function(t, e) {
            return {
                k: e,
                v: n(t, e)
            }
        })
    }
    function F(t, n) {
        var r = [];
        return R(t, function(t, e) {
            r.push(n(t, e))
        }),
        r
    }
    function j(t) {
        return Ot(t).length
    }
    function U(t, e, n) {
        return "" === e || t.length >= e.length && t.substr(n, n + e.length) === e
    }
    function H(t, e) {
        return kt(t, e) ? (n = t,
        e = e.length,
        n.substring(e)) : t;
        var n
    }
    function B(t, e) {
        return Rt(t, e) ? (n = t,
        e = e.length,
        n.substring(0, n.length - e)) : t;
        var n
    }
    var W, z, Y, q, $, V = function(n) {
        function t() {
            return o
        }
        function e(t) {
            return t(n)
        }
        var r = l(n)
          , o = {
            fold: function(t, e) {
                return e(n)
            },
            is: function(t) {
                return n === t
            },
            isSome: m,
            isNone: d,
            getOr: r,
            getOrThunk: r,
            getOrDie: r,
            getOrNull: r,
            getOrUndefined: r,
            or: t,
            orThunk: t,
            map: function(t) {
                return V(t(n))
            },
            each: function(t) {
                t(n)
            },
            bind: e,
            exists: e,
            forall: e,
            filter: function(t) {
                return t(n) ? o : v
            },
            toArray: function() {
                return [n]
            },
            toString: function() {
                return "some(" + n + ")"
            },
            equals: function(t) {
                return t.is(n)
            },
            equals_: function(t, e) {
                return t.fold(d, function(t) {
                    return e(n, t)
                })
            }
        };
        return o
    }, G = {
        some: V,
        none: g,
        from: function(t) {
            return null == t ? v : V(t)
        }
    }, K = function(n) {
        return function(t) {
            return t = typeof (e = t),
            (null === e ? "null" : "object" == t && (Array.prototype.isPrototypeOf(e) || e.constructor && "Array" === e.constructor.name) ? "array" : "object" == t && (String.prototype.isPrototypeOf(e) || e.constructor && "String" === e.constructor.name) ? "string" : t) === n;
            var e
        }
    }, X = function(e) {
        return function(t) {
            return typeof t === e
        }
    }, J = K("string"), Z = K("object"), Q = K("array"), tt = X("boolean"), et = X("function"), nt = X("number"), rt = Array.prototype.slice, ot = Array.prototype.indexOf, it = Array.prototype.push, ut = function(t, e) {
        for (var n = 0, r = t.length; n < r; n++) {
            if (e(t[n], n))
                return !0
        }
        return !1
    }, at = function(t, e) {
        for (var n = t.length, r = new Array(n), o = 0; o < n; o++) {
            var i = t[o];
            r[o] = e(i, o)
        }
        return r
    }, ct = function(t, e) {
        for (var n = 0, r = t.length; n < r; n++) {
            e(t[n], n)
        }
    }, st = function(t, e) {
        for (var n = [], r = 0, o = t.length; r < o; r++) {
            var i = t[r];
            e(i, r) && n.push(i)
        }
        return n
    }, ft = function(t, e) {
        return O(at(t, e))
    }, lt = function(t) {
        return t.getParam("powerpaste_block_drop", !1, "boolean")
    }, dt = function(t) {
        return t.getParam("images_upload_url")
    }, mt = function(t) {
        return J(dt(t))
    }, pt = function(t) {
        return t.getParam("smart_paste", !0, "boolean")
    }, gt = function(t) {
        return t.getParam("automatic_uploads", !0, "boolean")
    }, vt = function(t) {
        return t.getParam("powerpaste_keep_unsupported_src", !1, "boolean")
    }, ht = function(t) {
        return t.getParam("paste_preprocess")
    }, yt = function(t) {
        return t.getParam("cache_suffix")
    }, bt = function(t) {
        return t.getParam("powerpaste_allow_local_images", !0, "boolean")
    }, xt = function(t) {
        return t.getParam("powerpaste_word_import", "prompt", "string")
    }, Tt = function(t) {
        return t.getParam("powerpaste_html_import", "clean", "string")
    }, wt = function(t) {
        return t.getParam("images_upload_base_path")
    }, Et = function(t) {
        return t.getParam("images_upload_credentials")
    }, St = function(t) {
        return !1 !== t.getParam("paste_merge_formats")
    }, At = function(t) {
        t = t.getParam("powerpaste_clean_filtered_inline_elements");
        return J(t) ? at(t.split(","), function(t) {
            return t.trim()
        }) : []
    }, It = function(t) {
        return t.getParam("paste_tab_spaces", 4, "number")
    }, _t = function(t) {
        return tinymce.explode(t.getParam("images_file_types", "jpeg,jpg,jpe,jfi,jif,jfif,png,gif,bmp,webp", "string"))
    }, Lt = function(e) {
        e.on("init", function(t) {
            k(e, e.getBody()),
            e.inline || k(e, e.getDoc())
        })
    }, Ot = Object.keys, Dt = Object.hasOwnProperty, Nt = function(t, n) {
        var r = {};
        return R(t, function(t, e) {
            e = n(t, e);
            r[e.k] = e.v
        }),
        r
    }, Ct = function(t, e) {
        return Dt.call(t, e)
    }, Pt = function(t, e) {
        return -1 !== t.indexOf(e)
    }, kt = function(t, e) {
        return U(t, e, 0)
    }, Rt = function(t, e) {
        return U(t, e, t.length - e.length)
    }, Mt = (W = /^\s+|\s+$/g,
    function(t) {
        return t.replace(W, "")
    }
    ), Ft = function(t) {
        return !(0 < t.length)
    }, jt = function() {
        return (jt = Object.assign || function(t) {
            for (var e, n = 1, r = arguments.length; n < r; n++)
                for (var o in e = arguments[n])
                    Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
            return t
        }
        ).apply(this, arguments)
    }, Ut = function(u) {
        if (!Q(u))
            throw new Error("cases must be an array");
        if (0 === u.length)
            throw new Error("there must be at least one case");
        var a = []
          , n = {};
        return ct(u, function(t, r) {
            var e = Ot(t);
            if (1 !== e.length)
                throw new Error("one and only one name per case");
            var o = e[0]
              , i = t[o];
            if (void 0 !== n[o])
                throw new Error("duplicate key detected:" + o);
            if ("cata" === o)
                throw new Error("cannot have a case named cata (sorry)");
            if (!Q(i))
                throw new Error("case arguments must be an array");
            a.push(o),
            n[o] = function() {
                var t = arguments.length;
                if (t !== i.length)
                    throw new Error("Wrong number of arguments to case " + o + ". Expected " + i.length + " (" + i + "), got " + t);
                for (var n = new Array(t), e = 0; e < n.length; e++)
                    n[e] = arguments[e];
                return {
                    fold: function() {
                        if (arguments.length !== u.length)
                            throw new Error("Wrong number of arguments to fold. Expected " + u.length + ", got " + arguments.length);
                        return arguments[r].apply(null, n)
                    },
                    match: function(t) {
                        var e = Ot(t);
                        if (a.length !== e.length)
                            throw new Error("Wrong number of arguments to match. Expected: " + a.join(",") + "\nActual: " + e.join(","));
                        if (!D(a, function(t) {
                            return S(e, t)
                        }))
                            throw new Error("Not all branches were specified when using match. Specified: " + e.join(", ") + "\nRequired: " + a.join(", "));
                        return t[o].apply(null, n)
                    },
                    log: function(t) {
                        console.log(t, {
                            constructors: a,
                            constructor: o,
                            params: n
                        })
                    }
                }
            }
        }),
        n
    }, Ht = Ut([{
        blob: ["id", "imageresult", "objurl"]
    }, {
        url: ["id", "url", "raw"]
    }]), Bt = jt({
        cata: function(t, e, n) {
            return t.fold(e, n)
        }
    }, Ht), Wt = {}, zt = {
        exports: Wt
    };
    Y = Wt,
    q = zt,
    $ = z = void 0,
    function(t) {
        "object" == typeof Y && void 0 !== q ? q.exports = t() : "function" == typeof z && z.amd ? z([], t) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).EphoxContactWrapper = t()
    }(function() {
        return function r(o, i, u) {
            function a(e, t) {
                if (!i[e]) {
                    if (!o[e]) {
                        var n = "function" == typeof $ && $;
                        if (!t && n)
                            return n(e, !0);
                        if (c)
                            return c(e, !0);
                        throw (n = new Error("Cannot find module '" + e + "'")).code = "MODULE_NOT_FOUND",
                        n
                    }
                    n = i[e] = {
                        exports: {}
                    },
                    o[e][0].call(n.exports, function(t) {
                        return a(o[e][1][t] || t)
                    }, n, n.exports, r, o, i, u)
                }
                return i[e].exports
            }
            for (var c = "function" == typeof $ && $, t = 0; t < u.length; t++)
                a(u[t]);
            return a
        }({
            1: [function(t, e, n) {
                var r, o, e = e.exports = {};
                function i() {
                    throw new Error("setTimeout has not been defined")
                }
                function u() {
                    throw new Error("clearTimeout has not been defined")
                }
                function a(e) {
                    if (r === setTimeout)
                        return setTimeout(e, 0);
                    if ((r === i || !r) && setTimeout)
                        return r = setTimeout,
                        setTimeout(e, 0);
                    try {
                        return r(e, 0)
                    } catch (t) {
                        try {
                            return r.call(null, e, 0)
                        } catch (t) {
                            return r.call(this, e, 0)
                        }
                    }
                }
                !function() {
                    try {
                        r = "function" == typeof setTimeout ? setTimeout : i
                    } catch (t) {
                        r = i
                    }
                    try {
                        o = "function" == typeof clearTimeout ? clearTimeout : u
                    } catch (t) {
                        o = u
                    }
                }();
                var c, s = [], f = !1, l = -1;
                function d() {
                    f && c && (f = !1,
                    c.length ? s = c.concat(s) : l = -1,
                    s.length && m())
                }
                function m() {
                    if (!f) {
                        var t = a(d);
                        f = !0;
                        for (var e = s.length; e; ) {
                            for (c = s,
                            s = []; ++l < e; )
                                c && c[l].run();
                            l = -1,
                            e = s.length
                        }
                        c = null,
                        f = !1,
                        function(e) {
                            if (o === clearTimeout)
                                return clearTimeout(e);
                            if ((o === u || !o) && clearTimeout)
                                return o = clearTimeout,
                                clearTimeout(e);
                            try {
                                o(e)
                            } catch (t) {
                                try {
                                    return o.call(null, e)
                                } catch (t) {
                                    return o.call(this, e)
                                }
                            }
                        }(t)
                    }
                }
                function p(t, e) {
                    this.fun = t,
                    this.array = e
                }
                function g() {}
                e.nextTick = function(t) {
                    var e = new Array(arguments.length - 1);
                    if (1 < arguments.length)
                        for (var n = 1; n < arguments.length; n++)
                            e[n - 1] = arguments[n];
                    s.push(new p(t,e)),
                    1 !== s.length || f || a(m)
                }
                ,
                p.prototype.run = function() {
                    this.fun.apply(null, this.array)
                }
                ,
                e.title = "browser",
                e.browser = !0,
                e.env = {},
                e.argv = [],
                e.version = "",
                e.versions = {},
                e.on = g,
                e.addListener = g,
                e.once = g,
                e.off = g,
                e.removeListener = g,
                e.removeAllListeners = g,
                e.emit = g,
                e.prependListener = g,
                e.prependOnceListener = g,
                e.listeners = function(t) {
                    return []
                }
                ,
                e.binding = function(t) {
                    throw new Error("process.binding is not supported")
                }
                ,
                e.cwd = function() {
                    return "/"
                }
                ,
                e.chdir = function(t) {
                    throw new Error("process.chdir is not supported")
                }
                ,
                e.umask = function() {
                    return 0
                }
            }
            , {}],
            2: [function(t, l, e) {
                (function(e) {
                    function r() {}
                    function i(t) {
                        if ("object" != typeof this)
                            throw new TypeError("Promises must be constructed via new");
                        if ("function" != typeof t)
                            throw new TypeError("not a function");
                        this._state = 0,
                        this._handled = !1,
                        this._value = void 0,
                        this._deferreds = [],
                        f(t, this)
                    }
                    function o(n, r) {
                        for (; 3 === n._state; )
                            n = n._value;
                        0 !== n._state ? (n._handled = !0,
                        i._immediateFn(function() {
                            var t, e = 1 === n._state ? r.onFulfilled : r.onRejected;
                            if (null !== e) {
                                try {
                                    t = e(n._value)
                                } catch (t) {
                                    return void a(r.promise, t)
                                }
                                u(r.promise, t)
                            } else
                                (1 === n._state ? u : a)(r.promise, n._value)
                        })) : n._deferreds.push(r)
                    }
                    function u(e, t) {
                        try {
                            if (t === e)
                                throw new TypeError("A promise cannot be resolved with itself.");
                            if (t && ("object" == typeof t || "function" == typeof t)) {
                                var n = t.then;
                                if (t instanceof i)
                                    return e._state = 3,
                                    e._value = t,
                                    void c(e);
                                if ("function" == typeof n)
                                    return void f((r = n,
                                    o = t,
                                    function() {
                                        r.apply(o, arguments)
                                    }
                                    ), e)
                            }
                            e._state = 1,
                            e._value = t,
                            c(e)
                        } catch (t) {
                            a(e, t)
                        }
                        var r, o
                    }
                    function a(t, e) {
                        t._state = 2,
                        t._value = e,
                        c(t)
                    }
                    function c(t) {
                        2 === t._state && 0 === t._deferreds.length && i._immediateFn(function() {
                            t._handled || i._unhandledRejectionFn(t._value)
                        });
                        for (var e = 0, n = t._deferreds.length; e < n; e++)
                            o(t, t._deferreds[e]);
                        t._deferreds = null
                    }
                    function s(t, e, n) {
                        this.onFulfilled = "function" == typeof t ? t : null,
                        this.onRejected = "function" == typeof e ? e : null,
                        this.promise = n
                    }
                    function f(t, e) {
                        var n = !1;
                        try {
                            t(function(t) {
                                n || (n = !0,
                                u(e, t))
                            }, function(t) {
                                n || (n = !0,
                                a(e, t))
                            })
                        } catch (t) {
                            if (n)
                                return;
                            n = !0,
                            a(e, t)
                        }
                    }
                    var t, n;
                    t = this,
                    n = setTimeout,
                    i.prototype.catch = function(t) {
                        return this.then(null, t)
                    }
                    ,
                    i.prototype.then = function(t, e) {
                        var n = new this.constructor(r);
                        return o(this, new s(t,e,n)),
                        n
                    }
                    ,
                    i.all = function(t) {
                        var a = Array.prototype.slice.call(t);
                        return new i(function(o, i) {
                            if (0 === a.length)
                                return o([]);
                            var u = a.length;
                            for (var t = 0; t < a.length; t++)
                                !function e(n, t) {
                                    try {
                                        if (t && ("object" == typeof t || "function" == typeof t)) {
                                            var r = t.then;
                                            if ("function" == typeof r)
                                                return void r.call(t, function(t) {
                                                    e(n, t)
                                                }, i)
                                        }
                                        a[n] = t,
                                        0 == --u && o(a)
                                    } catch (t) {
                                        i(t)
                                    }
                                }(t, a[t])
                        }
                        )
                    }
                    ,
                    i.resolve = function(e) {
                        return e && "object" == typeof e && e.constructor === i ? e : new i(function(t) {
                            t(e)
                        }
                        )
                    }
                    ,
                    i.reject = function(n) {
                        return new i(function(t, e) {
                            e(n)
                        }
                        )
                    }
                    ,
                    i.race = function(o) {
                        return new i(function(t, e) {
                            for (var n = 0, r = o.length; n < r; n++)
                                o[n].then(t, e)
                        }
                        )
                    }
                    ,
                    i._immediateFn = "function" == typeof e ? function(t) {
                        e(t)
                    }
                    : function(t) {
                        n(t, 0)
                    }
                    ,
                    i._unhandledRejectionFn = function(t) {
                        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t)
                    }
                    ,
                    i._setImmediateFn = function(t) {
                        i._immediateFn = t
                    }
                    ,
                    i._setUnhandledRejectionFn = function(t) {
                        i._unhandledRejectionFn = t
                    }
                    ,
                    void 0 !== l && l.exports ? l.exports = i : t.Promise || (t.Promise = i)
                }
                ).call(this, t("timers").setImmediate)
            }
            , {
                timers: 3
            }],
            3: [function(c, t, s) {
                (function(t, e) {
                    var r = c("process/browser.js").nextTick
                      , n = Function.prototype.apply
                      , o = Array.prototype.slice
                      , i = {}
                      , u = 0;
                    function a(t, e) {
                        this._id = t,
                        this._clearFn = e
                    }
                    s.setTimeout = function() {
                        return new a(n.call(setTimeout, window, arguments),clearTimeout)
                    }
                    ,
                    s.setInterval = function() {
                        return new a(n.call(setInterval, window, arguments),clearInterval)
                    }
                    ,
                    s.clearTimeout = s.clearInterval = function(t) {
                        t.close()
                    }
                    ,
                    a.prototype.unref = a.prototype.ref = function() {}
                    ,
                    a.prototype.close = function() {
                        this._clearFn.call(window, this._id)
                    }
                    ,
                    s.enroll = function(t, e) {
                        clearTimeout(t._idleTimeoutId),
                        t._idleTimeout = e
                    }
                    ,
                    s.unenroll = function(t) {
                        clearTimeout(t._idleTimeoutId),
                        t._idleTimeout = -1
                    }
                    ,
                    s._unrefActive = s.active = function(t) {
                        clearTimeout(t._idleTimeoutId);
                        var e = t._idleTimeout;
                        0 <= e && (t._idleTimeoutId = setTimeout(function() {
                            t._onTimeout && t._onTimeout()
                        }, e))
                    }
                    ,
                    s.setImmediate = "function" == typeof t ? t : function(t) {
                        var e = u++
                          , n = !(arguments.length < 2) && o.call(arguments, 1);
                        return i[e] = !0,
                        r(function() {
                            i[e] && (n ? t.apply(null, n) : t.call(null),
                            s.clearImmediate(e))
                        }),
                        e
                    }
                    ,
                    s.clearImmediate = "function" == typeof e ? e : function(t) {
                        delete i[t]
                    }
                }
                ).call(this, c("timers").setImmediate, c("timers").clearImmediate)
            }
            , {
                "process/browser.js": 1,
                timers: 3
            }],
            4: [function(t, e, n) {
                var r = t("promise-polyfill")
                  , t = "undefined" != typeof window ? window : Function("return this;")();
                e.exports = {
                    boltExport: t.Promise || r
                }
            }
            , {
                "promise-polyfill": 2
            }]
        }, {}, [4])(4)
    });
    function Yt(t) {
        setTimeout(function() {
            throw t
        }, 0)
    }
    function qt(u, t) {
        return t(function(r) {
            var o = []
              , i = 0;
            0 === u.length ? r([]) : ct(u, function(t, e) {
                var n;
                t.get((n = e,
                function(t) {
                    o[n] = t,
                    ++i >= u.length && r(o)
                }
                ))
            })
        })
    }
    function $t(t, e) {
        return Qt(at(t, e))
    }
    function Vt(t) {
        var e = (new Date).getTime();
        return t + "_" + Math.floor(1e9 * Math.random()) + ++ee + String(e)
    }
    var Gt = zt.exports.boltExport
      , Kt = function(t) {
        var n = G.none()
          , e = []
          , r = function(t) {
            o() ? u(t) : e.push(t)
        }
          , o = function() {
            return n.isSome()
        }
          , i = function(t) {
            ct(t, u)
        }
          , u = function(e) {
            n.each(function(t) {
                setTimeout(function() {
                    e(t)
                }, 0)
            })
        };
        return t(function(t) {
            o() || (n = G.some(t),
            i(e),
            e = [])
        }),
        {
            get: r,
            map: function(n) {
                return Kt(function(e) {
                    r(function(t) {
                        e(n(t))
                    })
                })
            },
            isReady: o
        }
    }
      , Xt = {
        nu: Kt,
        pure: function(e) {
            return Kt(function(t) {
                t(e)
            })
        }
    }
      , Jt = function(n) {
        function t(t) {
            n().then(t, Yt)
        }
        return {
            map: function(t) {
                return Jt(function() {
                    return n().then(t)
                })
            },
            bind: function(e) {
                return Jt(function() {
                    return n().then(function(t) {
                        return e(t).toPromise()
                    })
                })
            },
            anonBind: function(t) {
                return Jt(function() {
                    return n().then(function() {
                        return t.toPromise()
                    })
                })
            },
            toLazy: function() {
                return Xt.nu(t)
            },
            toCached: function() {
                var t = null;
                return Jt(function() {
                    return null === t && (t = n()),
                    t
                })
            },
            toPromise: n,
            get: t
        }
    }
      , Zt = {
        nu: function(t) {
            return Jt(function() {
                return new Gt(t)
            })
        },
        pure: function(t) {
            return Jt(function() {
                return Gt.resolve(t)
            })
        }
    }
      , Qt = function(t) {
        return qt(t, Zt.nu)
    }
      , te = $t
      , ee = 0;
    function ne(t, e) {
        return n = document.createElement("canvas"),
        t = t,
        e = e,
        n.width = t,
        n.height = e,
        n;
        var n
    }
    function re(t) {
        var e = ne(t.width, t.height);
        return oe(e).drawImage(t, 0, 0),
        e
    }
    function oe(t) {
        return t.getContext("2d")
    }
    var ie, ue, ae, ce = window.Promise || (ie = window,
    ue = se.immediateFn || "function" == typeof ie.setImmediate && ie.setImmediate || function(t) {
        setTimeout(t, 1)
    }
    ,
    ae = Array.isArray || function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }
    ,
    se.prototype.catch = function(t) {
        return this.then(null, t)
    }
    ,
    se.prototype.then = function(n, r) {
        var o = this;
        return new se(function(t, e) {
            le.call(o, new ge(n,r,t,e))
        }
        )
    }
    ,
    se.all = function() {
        for (var t = [], e = 0; e < arguments.length; e++)
            t[e] = arguments[e];
        var a = Array.prototype.slice.call(1 === t.length && ae(t[0]) ? t[0] : t);
        return new se(function(o, i) {
            if (0 === a.length)
                return o([]);
            var u = a.length;
            for (var t = 0; t < a.length; t++)
                !function e(n, t) {
                    try {
                        if (t && ("object" == typeof t || "function" == typeof t)) {
                            var r = t.then;
                            if ("function" == typeof r)
                                return void r.call(t, function(t) {
                                    e(n, t)
                                }, i)
                        }
                        a[n] = t,
                        0 == --u && o(a)
                    } catch (t) {
                        i(t)
                    }
                }(t, a[t])
        }
        )
    }
    ,
    se.resolve = function(e) {
        return e && "object" == typeof e && e.constructor === se ? e : new se(function(t) {
            t(e)
        }
        )
    }
    ,
    se.reject = function(n) {
        return new se(function(t, e) {
            e(n)
        }
        )
    }
    ,
    se.race = function(o) {
        return new se(function(t, e) {
            for (var n = 0, r = o; n < r.length; n++) {
                r[n].then(t, e)
            }
        }
        )
    }
    ,
    se);
    function se(t) {
        if ("object" != typeof this)
            throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof t)
            throw new TypeError("not a function");
        this._state = null,
        this._value = null,
        this._deferreds = [],
        ve(t, fe(de, this), fe(me, this))
    }
    function fe(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    }
    function le(n) {
        var r = this;
        null !== this._state ? ue(function() {
            var t, e = r._state ? n.onFulfilled : n.onRejected;
            if (null !== e) {
                try {
                    t = e(r._value)
                } catch (t) {
                    return void n.reject(t)
                }
                n.resolve(t)
            } else
                (r._state ? n.resolve : n.reject)(r._value)
        }) : this._deferreds.push(n)
    }
    function de(t) {
        try {
            if (t === this)
                throw new TypeError("A promise cannot be resolved with itself.");
            if (t && ("object" == typeof t || "function" == typeof t)) {
                var e = t.then;
                if ("function" == typeof e)
                    return void ve(fe(e, t), fe(de, this), fe(me, this))
            }
            this._state = !0,
            this._value = t,
            pe.call(this)
        } catch (t) {
            me.call(this, t)
        }
    }
    function me(t) {
        this._state = !1,
        this._value = t,
        pe.call(this)
    }
    function pe() {
        for (var t = 0, e = this._deferreds; t < e.length; t++) {
            var n = e[t];
            le.call(this, n)
        }
        this._deferreds = []
    }
    function ge(t, e, n, r) {
        this.onFulfilled = "function" == typeof t ? t : null,
        this.onRejected = "function" == typeof e ? e : null,
        this.resolve = n,
        this.reject = r
    }
    function ve(t, e, n) {
        var r = !1;
        try {
            t(function(t) {
                r || (r = !0,
                e(t))
            }, function(t) {
                r || (r = !0,
                n(t))
            })
        } catch (t) {
            if (r)
                return;
            r = !0,
            n(t)
        }
    }
    function he(r) {
        return new ce(function(t, n) {
            var e = new XMLHttpRequest;
            e.open("GET", r, !0),
            e.responseType = "blob",
            e.onload = function() {
                200 === this.status && t(this.response)
            }
            ,
            e.onerror = function() {
                var t, e = this;
                n(0 === this.status ? ((t = new Error("No access to download image")).code = 18,
                t.name = "SecurityError",
                t) : new Error("Error " + e.status + " downloading image"))
            }
            ,
            e.send()
        }
        )
    }
    function ye(t) {
        var e = t.split(",")
          , t = /data:([^;]+)/.exec(e[0]);
        if (!t)
            return G.none();
        for (var t = t[1], e = e[1], n = atob(e), r = n.length, o = Math.ceil(r / 1024), i = new Array(o), u = 0; u < o; ++u) {
            for (var a = 1024 * u, c = Math.min(1024 + a, r), s = new Array(c - a), f = a, l = 0; f < c; ++l,
            ++f)
                s[l] = n[f].charCodeAt(0);
            i[u] = new Uint8Array(s)
        }
        return G.some(new Blob(i,{
            type: t
        }))
    }
    function be(n) {
        return new ce(function(t, e) {
            ye(n).fold(function() {
                e("uri is not base64: " + n)
            }, t)
        }
        )
    }
    function xe(t, r, o) {
        return r = r || "image/png",
        et(HTMLCanvasElement.prototype.toBlob) ? new ce(function(e, n) {
            t.toBlob(function(t) {
                t ? e(t) : n()
            }, r, o)
        }
        ) : be(t.toDataURL(r, o))
    }
    function Te(t) {
        return a = t,
        new ce(function(t, e) {
            var n = URL.createObjectURL(a)
              , r = new Image
              , o = function() {
                r.removeEventListener("load", i),
                r.removeEventListener("error", u)
            };
            function i() {
                o(),
                t(r)
            }
            function u() {
                o(),
                e("Unable to load data of type " + a.type + ": " + n)
            }
            r.addEventListener("load", i),
            r.addEventListener("error", u),
            r.src = n,
            r.complete && i()
        }
        ).then(function(t) {
            e = t,
            URL.revokeObjectURL(e.src);
            var e, e = ne((e = t).naturalWidth || e.width, (e = t).naturalHeight || e.height);
            return oe(e).drawImage(t, 0, 0),
            e
        });
        var a
    }
    function we(n) {
        return new ce(function(t) {
            var e = new FileReader;
            e.onloadend = function() {
                t(e.result)
            }
            ,
            e.readAsDataURL(n)
        }
        )
    }
    function Ee(t) {
        return G.from(0 === (t = t).indexOf("blob:") ? he(t) : 0 === t.indexOf("data:") ? be(t) : null)
    }
    var Se = we
      , Ae = ye;
    function Ie(t, e, n) {
        var r = e.type;
        function o(r, o) {
            return t.then(function(t) {
                return n = o,
                e = (e = r) || "image/png",
                t.toDataURL(e, n);
                var e, n
            })
        }
        return {
            getType: l(r),
            toBlob: function() {
                return ce.resolve(e)
            },
            toDataURL: l(n),
            toBase64: function() {
                return n.split(",")[1]
            },
            toAdjustedBlob: function(e, n) {
                return t.then(function(t) {
                    return xe(t, e, n)
                })
            },
            toAdjustedDataURL: o,
            toAdjustedBase64: function(t, e) {
                return o(t, e).then(function(t) {
                    return t.split(",")[1]
                })
            },
            toCanvas: function() {
                return t.then(re)
            }
        }
    }
    function _e(t) {
        return (0 === (t = (t = t).src).indexOf("data:") ? be : he)(t).then(function(t) {
            return we(e = t).then(function(t) {
                return Ie(Te(e), e, t)
            });
            var e
        })
    }
    function Le(t, e) {
        return e = e,
        Ie(Te(t = t), t, e)
    }
    function Oe(t, e, n) {
        return void 0 === e && void 0 === n ? xn(t) : t.toAdjustedBlob(e, n)
    }
    function De(t) {
        var e = URL.createObjectURL(t);
        return wn(t, e)
    }
    function Ne(t, e) {
        return function(t, e) {
            for (var n = null != e ? e : Sn, r = 0; r < t.length && null != n; ++r)
                n = n[t[r]];
            return n
        }(t.split("."), e)
    }
    function Ce(t, e) {
        return function(t, e) {
            for (var n, r, o = void 0 !== e ? e : Sn, i = 0; i < t.length; ++i)
                n = o,
                r = t[i],
                void 0 !== n[r] && null !== n[r] || (n[r] = {}),
                o = n[r];
            return o
        }(t.split("."), e)
    }
    function Pe(t) {
        return t.dom.nodeName.toLowerCase()
    }
    function ke(t) {
        return t.dom.nodeType
    }
    function Re(e) {
        return function(t) {
            return _n(t) && Pe(t) === e
        }
    }
    function Me(t, e, n) {
        if (!(J(n) || tt(n) || nt(n)))
            throw console.error("Invalid call to Attribute.set. Key ", e, ":: Value ", n, ":: Element ", t),
            new Error("Attribute value was not simple");
        t.setAttribute(e, n + "")
    }
    function Fe(t, e) {
        var n = t.dom;
        R(e, function(t, e) {
            Me(n, e, t)
        })
    }
    function je(t, e) {
        return G.from(Cn(t, e))
    }
    function Ue(t, e) {
        return !(!(t = t.dom) || !t.hasAttribute) && t.hasAttribute(e)
    }
    function He(t, e) {
        t.dom.removeAttribute(e)
    }
    function Be(t, n) {
        var r = {};
        return ct(jn, function(e) {
            n[e].or(t[e]).each(function(t) {
                r[e] = t
            })
        }),
        Un(r)
    }
    function We(t, e, n, r, o) {
        return t.fold(e, n, r, o)
    }
    function ze(e) {
        return $n(function(t) {
            t(e)
        })
    }
    function Ye(t, e) {
        t(e)
    }
    function qe(t) {
        return ze({
            response: Bn(t),
            bundle: Un({})
        })
    }
    function $e(t, e, n, r) {
        return {
            steps: t,
            input: e,
            label: n,
            capture: r
        }
    }
    function Ve(t, e, n) {
        var r;
        return (r = n,
        P(t, function(e) {
            return e.getAvailable(r).map(function(t) {
                return $e(e.steps(), t, e.label(), e.capture())
            })
        })).getOrThunk(function() {
            var t = e.getAvailable(n);
            return $e(e.steps(), t, e.label(), e.capture())
        })
    }
    function Ge(o, t) {
        function e() {
            return t().map(function(t) {
                var e, r, n = Be(o.bundle, t.bundle);
                return {
                    response: (e = o.response,
                    r = t.response,
                    We(e, G.none, G.none, G.none, function(t, e, n) {
                        return We(r, G.none, function(t, e) {
                            return G.some(Hn.incomplete(t, e, n))
                        }, G.none, G.none)
                    }).getOr(r)),
                    bundle: n
                }
            })
        }
        var n = p(qn, o);
        return We(o.response, n, e, n, e)
    }
    function Ke(t, n) {
        return I(t, function(t, e) {
            return t.bind(function(t) {
                return Ge(t, function() {
                    return e(n, t)
                })
            })
        }, ze({
            response: Wn([], []),
            bundle: Un({})
        }))
    }
    function Xe(t) {
        var e = Kn(t);
        return e && Vn(t) || !e && Gn(t)
    }
    function Je(t) {
        return t.isInternal.getOr(!1)
    }
    function Ze(n) {
        var r, o = !1;
        return function() {
            for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
            return o || (o = !0,
            r = n.apply(null, t)),
            r
        }
    }
    function Qe(t, e) {
        var n = String(e).toLowerCase();
        return _(t, function(t) {
            return t.search(n)
        })
    }
    function tn(t) {
        return window.matchMedia(t).matches
    }
    function en(t, e) {
        if (1 !== (t = t.dom).nodeType)
            return !1;
        if (void 0 !== t.matches)
            return t.matches(e);
        if (void 0 !== t.msMatchesSelector)
            return t.msMatchesSelector(e);
        if (void 0 !== t.webkitMatchesSelector)
            return t.webkitMatchesSelector(e);
        if (void 0 !== t.mozMatchesSelector)
            return t.mozMatchesSelector(e);
        throw new Error("Browser lacks native selectors")
    }
    function nn(t) {
        return 1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType || 0 === t.childElementCount
    }
    function rn(t, e) {
        return e = void 0 === e ? document : e.dom,
        nn(e) ? [] : at(e.querySelectorAll(t), kn.fromDom)
    }
    function on(t, e) {
        return t.dom === e.dom
    }
    function un(t, e, n) {
        var r, o, t = t.document.createRange();
        return r = t,
        e.fold(function(t) {
            r.setStartBefore(t.dom)
        }, function(t, e) {
            r.setStart(t.dom, e)
        }, function(t) {
            r.setStartAfter(t.dom)
        }),
        o = t,
        n.fold(function(t) {
            o.setEndBefore(t.dom)
        }, function(t, e) {
            o.setEnd(t.dom, e)
        }, function(t) {
            o.setEndAfter(t.dom)
        }),
        t
    }
    function an(t, e, n, r, o) {
        return (t = t.document.createRange()).setStart(e.dom, n),
        t.setEnd(r.dom, o),
        t
    }
    function cn(t, e, n) {
        return e(kn.fromDom(n.startContainer), n.startOffset, kn.fromDom(n.endContainer), n.endOffset)
    }
    function sn(t, e) {
        var o, n, e = (o = t,
        e.match({
            domRange: function(t) {
                return {
                    ltr: l(t),
                    rtl: G.none
                }
            },
            relative: function(t, e) {
                return {
                    ltr: Ze(function() {
                        return un(o, t, e)
                    }),
                    rtl: Ze(function() {
                        return G.some(un(o, e, t))
                    })
                }
            },
            exact: function(t, e, n, r) {
                return {
                    ltr: Ze(function() {
                        return an(o, t, e, n, r)
                    }),
                    rtl: Ze(function() {
                        return G.some(an(o, n, r, t, e))
                    })
                }
            }
        }));
        return (n = (e = e).ltr()).collapsed ? e.rtl().filter(function(t) {
            return !1 === t.collapsed
        }).map(function(t) {
            return wr.rtl(kn.fromDom(t.endContainer), t.endOffset, kn.fromDom(t.startContainer), t.startOffset)
        }).getOrThunk(function() {
            return cn(0, wr.ltr, n)
        }) : cn(0, wr.ltr, n)
    }
    function fn(t) {
        return kn.fromDom(t.dom.ownerDocument)
    }
    function ln(t) {
        return On(t) ? t : fn(t)
    }
    function dn(t) {
        return kn.fromDom(ln(t).dom.defaultView)
    }
    function mn(t) {
        return G.from(t.dom.parentNode).map(kn.fromDom)
    }
    function pn(t, e) {
        for (var n = et(e) ? e : d, r = t.dom, o = []; null !== r.parentNode && void 0 !== r.parentNode; ) {
            var i = r.parentNode
              , u = kn.fromDom(i);
            if (o.push(u),
            !0 === n(u))
                break;
            r = i
        }
        return o
    }
    function gn(t) {
        return G.from(t.dom.previousSibling).map(kn.fromDom)
    }
    function vn(t) {
        return G.from(t.dom.nextSibling).map(kn.fromDom)
    }
    function hn(t) {
        return function(t) {
            t = rt.call(t, 0);
            return t.reverse(),
            t
        }(function(t, e) {
            for (var n = [], r = function(t) {
                return n.push(t),
                e(t)
            }, o = e(t); (o = o.bind(r)).isSome(); )
                ;
            return n
        }(t, gn))
    }
    function yn(t) {
        return function(t, e) {
            t = t.dom.childNodes;
            return G.from(t[e]).map(kn.fromDom)
        }(t, 0)
    }
    var bn = _e
      , xn = function(t) {
        return t.toBlob()
    }
      , Tn = function(t) {
        return t.toDataURL()
    }
      , wn = function(r, o) {
        return Zt.nu(function(n) {
            Se(r).then(function(t) {
                var e = Le(r, t)
                  , t = Vt("image")
                  , e = Bt.blob(t, e, o);
                n(e)
            })
        })
    }
      , En = function(t) {
        return $t(t, De)
    }
      , Sn = "undefined" != typeof window ? window : Function("return this;")()
      , An = function(e) {
        return function(t) {
            return ke(t) === e
        }
    }
      , In = function(t) {
        return 8 === ke(t) || "#comment" === Pe(t)
    }
      , _n = An(1)
      , Ln = An(3)
      , On = An(9)
      , Dn = An(11)
      , Nn = function(t, e, n) {
        Me(t.dom, e, n)
    }
      , Cn = function(t, e) {
        e = t.dom.getAttribute(e);
        return null === e ? void 0 : e
    }
      , Pn = function(t) {
        if (null == t)
            throw new Error("Node cannot be null or undefined");
        return {
            dom: t
        }
    }
      , kn = {
        fromHtml: function(t, e) {
            e = (e || document).createElement("div");
            if (e.innerHTML = t,
            !e.hasChildNodes() || 1 < e.childNodes.length)
                throw console.error("HTML does not have a single root node", t),
                new Error("HTML must have a single root node");
            return Pn(e.childNodes[0])
        },
        fromTag: function(t, e) {
            t = (e || document).createElement(t);
            return Pn(t)
        },
        fromText: function(t, e) {
            t = (e || document).createTextNode(t);
            return Pn(t)
        },
        fromDom: Pn,
        fromPoint: function(t, e, n) {
            return G.from(t.dom.elementFromPoint(e, n)).map(Pn)
        }
    }
      , Rn = function() {
        return 'Safari does not support direct paste of images. <a href="https://support.ephox.com/entries/88543243-Safari-Direct-paste-of-images-does-not-work" style="text-decoration: underline">More information on image pasting for Safari</a>'
    }
      , Mn = {
        "cement.dialog.paste.title": "Paste Formatting Options",
        "cement.dialog.paste.instructions": "Choose to keep or remove formatting in the pasted content.",
        "cement.dialog.paste.merge": "Keep Formatting",
        "cement.dialog.paste.clean": "Remove Formatting",
        "safari.imagepaste": Rn(),
        "webview.imagepaste": Rn(),
        "error.code.images.not.found": "The images service was not found: (",
        "error.imageupload": "Image failed to upload: (",
        "error.full.stop": ").",
        "errors.local.images.disallowed": "Local image paste has been disabled. Local images have been removed from pasted content.",
        "errors.imageimport.failed": "Some images failed to import.",
        "errors.imageimport.unsupported": "Unsupported image type.",
        "errors.imageimport.invalid": "Image is invalid."
    }
      , Fn = function(t) {
        return tinymce.translate(Mn[t])
    }
      , jn = ["officeStyles", "htmlStyles", "isWord", "isGoogleDocs", "proxyBin", "isInternal", "backgroundAssets"]
      , Un = function(e) {
        return N(jn, function(t) {
            return G.from(e[t])
        })
    }
      , Hn = Ut([{
        error: ["message"]
    }, {
        paste: ["elements", "correlated"]
    }, {
        cancel: []
    }, {
        incomplete: ["elements", "correlated", "message"]
    }])
      , Bn = Hn.error
      , Wn = Hn.paste
      , zn = Hn.cancel
      , Yn = Hn.incomplete
      , qn = ze
      , $n = function(e) {
        function t(t) {
            e(t)
        }
        var r = $n;
        return {
            get: t,
            map: function(n) {
                return r(function(e) {
                    t(function(t) {
                        t = n(t);
                        e(t)
                    })
                })
            },
            bind: function(n) {
                return r(function(e) {
                    t(function(t) {
                        n(t).get(e)
                    })
                })
            }
        }
    }
      , Vn = function(t) {
        return t.officeStyles.getOr(!0)
    }
      , Gn = function(t) {
        return t.htmlStyles.getOr(!1)
    }
      , Kn = function(t) {
        return t.isWord.getOr(!1)
    }
      , Xn = function() {
        return Jn(0, 0)
    }
      , Jn = function(t, e) {
        return {
            major: t,
            minor: e
        }
    }
      , Zn = {
        nu: Jn,
        detect: function(t, e) {
            e = String(e).toLowerCase();
            return 0 === t.length ? Xn() : function(t, e) {
                var n = function(t, e) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        if (r.test(e))
                            return r
                    }
                }(t, e);
                if (!n)
                    return {
                        major: 0,
                        minor: 0
                    };
                t = function(t) {
                    return Number(e.replace(n, "$" + t))
                }
                ;
                return Jn(t(1), t(2))
            }(t, e)
        },
        unknown: Xn
    }
      , Qn = function(t, n) {
        return Qe(t, n).map(function(t) {
            var e = Zn.detect(t.versionRegexes, n);
            return {
                current: t.name,
                version: e
            }
        })
    }
      , tr = function(t, n) {
        return Qe(t, n).map(function(t) {
            var e = Zn.detect(t.versionRegexes, n);
            return {
                current: t.name,
                version: e
            }
        })
    }
      , er = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/
      , nr = function(e) {
        return function(t) {
            return Pt(t, e)
        }
    }
      , rr = [{
        name: "Edge",
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: function(t) {
            return Pt(t, "edge/") && Pt(t, "chrome") && Pt(t, "safari") && Pt(t, "applewebkit")
        }
    }, {
        name: "Chrome",
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/, er],
        search: function(t) {
            return Pt(t, "chrome") && !Pt(t, "chromeframe")
        }
    }, {
        name: "IE",
        versionRegexes: [/.*?msie\ ?([0-9]+)\.([0-9]+).*/, /.*?rv:([0-9]+)\.([0-9]+).*/],
        search: function(t) {
            return Pt(t, "msie") || Pt(t, "trident")
        }
    }, {
        name: "Opera",
        versionRegexes: [er, /.*?opera\/([0-9]+)\.([0-9]+).*/],
        search: nr("opera")
    }, {
        name: "Firefox",
        versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
        search: nr("firefox")
    }, {
        name: "Safari",
        versionRegexes: [er, /.*?cpu os ([0-9]+)_([0-9]+).*/],
        search: function(t) {
            return (Pt(t, "safari") || Pt(t, "mobile/")) && Pt(t, "applewebkit")
        }
    }]
      , or = [{
        name: "Windows",
        search: nr("win"),
        versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
    }, {
        name: "iOS",
        search: function(t) {
            return Pt(t, "iphone") || Pt(t, "ipad")
        },
        versionRegexes: [/.*?version\/\ ?([0-9]+)\.([0-9]+).*/, /.*cpu os ([0-9]+)_([0-9]+).*/, /.*cpu iphone os ([0-9]+)_([0-9]+).*/]
    }, {
        name: "Android",
        search: nr("android"),
        versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
    }, {
        name: "OSX",
        search: nr("mac os x"),
        versionRegexes: [/.*?mac\ os\ x\ ?([0-9]+)_([0-9]+).*/]
    }, {
        name: "Linux",
        search: nr("linux"),
        versionRegexes: []
    }, {
        name: "Solaris",
        search: nr("sunos"),
        versionRegexes: []
    }, {
        name: "FreeBSD",
        search: nr("freebsd"),
        versionRegexes: []
    }, {
        name: "ChromeOS",
        search: nr("cros"),
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/]
    }]
      , ir = {
        browsers: l(rr),
        oses: l(or)
    }
      , ur = "Firefox"
      , ar = function(t) {
        var e = t.current
          , n = t.version
          , t = function(t) {
            return function() {
                return e === t
            }
        };
        return {
            current: e,
            version: n,
            isEdge: t("Edge"),
            isChrome: t("Chrome"),
            isIE: t("IE"),
            isOpera: t("Opera"),
            isFirefox: t(ur),
            isSafari: t("Safari")
        }
    }
      , cr = {
        unknown: function() {
            return ar({
                current: void 0,
                version: Zn.unknown()
            })
        },
        nu: ar,
        edge: l("Edge"),
        chrome: l("Chrome"),
        ie: l("IE"),
        opera: l("Opera"),
        firefox: l(ur),
        safari: l("Safari")
    }
      , sr = "Windows"
      , fr = "Android"
      , lr = "Solaris"
      , dr = "FreeBSD"
      , mr = "ChromeOS"
      , pr = function(t) {
        var e = t.current
          , n = t.version
          , t = function(t) {
            return function() {
                return e === t
            }
        };
        return {
            current: e,
            version: n,
            isWindows: t(sr),
            isiOS: t("iOS"),
            isAndroid: t(fr),
            isOSX: t("OSX"),
            isLinux: t("Linux"),
            isSolaris: t(lr),
            isFreeBSD: t(dr),
            isChromeOS: t(mr)
        }
    }
      , gr = {
        unknown: function() {
            return pr({
                current: void 0,
                version: Zn.unknown()
            })
        },
        nu: pr,
        windows: l(sr),
        ios: l("iOS"),
        android: l(fr),
        linux: l("Linux"),
        osx: l("OSX"),
        solaris: l(lr),
        freebsd: l(dr),
        chromeos: l(mr)
    }
      , vr = function(t, e) {
        var n, r, o = ir.browsers(), i = ir.oses(), u = Qn(o, t).fold(cr.unknown, cr.nu), a = tr(i, t).fold(gr.unknown, gr.nu);
        return {
            browser: u,
            os: a,
            deviceType: (n = u,
            r = t,
            o = e,
            u = (i = a).isiOS() && !0 === /ipad/i.test(r),
            t = i.isiOS() && !u,
            e = i.isiOS() || i.isAndroid(),
            a = e || o("(pointer:coarse)"),
            o = u || !t && e && o("(min-device-width:768px)"),
            e = t || e && !o,
            n = n.isSafari() && i.isiOS() && !1 === /safari/i.test(r),
            r = !e && !o && !n,
            {
                isiPad: l(u),
                isiPhone: l(t),
                isTablet: l(o),
                isPhone: l(e),
                isTouch: l(a),
                isAndroid: i.isAndroid,
                isiOS: i.isiOS,
                isWebView: l(n),
                isDesktop: l(r)
            })
        }
    }
      , hr = Ze(function() {
        return vr(navigator.userAgent, tn)
    })
      , t = hr()
      , g = t.deviceType.isiOS() || t.deviceType.isAndroid()
      , K = l({
        isSupported: !1,
        cleanDocument: function() {
            return Gt.reject("not supported")
        }
    })
      , yr = g ? K : function(t, e, n) {
        e = e.replace('/plugins/', '/assets/tinymce/plugins/');
        var n = e + "/wordimport.js" + (n = n || "",
        G.from(n).filter(function(t) {
            return 0 !== t.length
        }).map(function(t) {
            return (-1 === t.indexOf("?") ? "?" : "") + t
        }).getOr(""))
          , o = t.loadScript("ephox.wimp", n);
        o.catch(function(t) {
            console.error("Unable to load word import: ", t)
        });
        return {
            isSupported: !0,
            cleanDocument: function(e, n, r) {
                return o.then(function(t) {
                    return t.cleanDocument(e, n, r.cleanFilteredInlineElements)
                })
            }
        }
    }
      , br = function(e) {
        var o = [];
        return {
            bind: function(t) {
                if (void 0 === t)
                    throw new Error("Event bind error: undefined handler");
                o.push(t)
            },
            unbind: function(e) {
                o = st(o, function(t) {
                    return t !== e
                })
            },
            trigger: function() {
                for (var n = [], t = 0; t < arguments.length; t++)
                    n[t] = arguments[t];
                var r = {};
                ct(e, function(t, e) {
                    r[t] = n[e]
                }),
                ct(o, function(t) {
                    t(r)
                })
            }
        }
    }
      , xr = function(t) {
        return {
            registry: M(t, function(t) {
                return {
                    bind: t.bind,
                    unbind: t.unbind
                }
            }),
            trigger: M(t, function(t) {
                return t.trigger
            })
        }
    }
      , Tr = en
      , wr = Ut([{
        ltr: ["start", "soffset", "finish", "foffset"]
    }, {
        rtl: ["start", "soffset", "finish", "foffset"]
    }])
      , Er = (wr.ltr,
    wr.rtl,
    function(t) {
        return at(t.dom.childNodes, kn.fromDom)
    }
    )
      , Sr = function(t, e, n, r) {
        return {
            start: t,
            soffset: e,
            finish: n,
            foffset: r
        }
    };
    function Ar(n, r) {
        var e = function(t) {
            return n(t) ? G.from(t.dom.nodeValue) : G.none()
        };
        return {
            get: function(t) {
                if (!n(t))
                    throw new Error("Can only get " + r + " value of a " + r + " node");
                return e(t).getOr("")
            },
            getOption: e,
            set: function(t, e) {
                if (!n(t))
                    throw new Error("Can only set raw " + r + " value of a " + r + " node");
                t.dom.nodeValue = e
            }
        }
    }
    function Ir(t) {
        return Lr.get(t)
    }
    function _r(t, e) {
        return Lr.set(t, e)
    }
    var Lr = Ar(Ln, "text");
    function Or(t) {
        return t = Po(t),
        Dn(t) ? G.some(t) : G.none()
    }
    function Dr(t) {
        return kn.fromDom(t.dom.host)
    }
    function Nr(t, e, n) {
        for (var r = t.dom, o = et(n) ? n : d; r.parentNode; ) {
            r = r.parentNode;
            var i = kn.fromDom(r);
            if (e(i))
                return G.some(i);
            if (o(i))
                break
        }
        return G.none()
    }
    function Cr(t, e) {
        return _(t.dom.childNodes, function(t) {
            return e(kn.fromDom(t))
        }).map(kn.fromDom)
    }
    function Pr(t, r) {
        var o = function(t) {
            for (var e = 0; e < t.childNodes.length; e++) {
                var n = kn.fromDom(t.childNodes[e]);
                if (r(n))
                    return G.some(n);
                n = o(t.childNodes[e]);
                if (n.isSome())
                    return n
            }
            return G.none()
        };
        return o(t.dom)
    }
    function kr(t, e) {
        return rn(e, t)
    }
    function Rr(t, e) {
        var n = Pe(t);
        return "input" === n ? Fo.after(t) : S(["br", "img"], n) ? 0 === e ? Fo.before(t) : Fo.after(t) : Fo.on(t, e)
    }
    function Mr(t, e, n, r) {
        var o = fn(t).dom.createRange();
        return o.setStart(t.dom, e),
        o.setEnd(n.dom, r),
        o
    }
    function Fr(t) {
        return G.from(t.getSelection())
    }
    function jr(t, e, n, r, o) {
        var i, o = an(t, e, n, r, o);
        i = o,
        Fr(t).each(function(t) {
            t.removeAllRanges(),
            t.addRange(i)
        })
    }
    function Ur(f, t) {
        return sn(f, t).match({
            ltr: function(t, e, n, r) {
                jr(f, t, e, n, r)
            },
            rtl: function(u, a, c, s) {
                Fr(f).each(function(t) {
                    if (t.setBaseAndExtent)
                        t.setBaseAndExtent(u.dom, a, c.dom, s);
                    else if (t.extend)
                        try {
                            n = u,
                            r = a,
                            o = c,
                            i = s,
                            (e = t).collapse(n.dom, r),
                            e.extend(o.dom, i)
                        } catch (t) {
                            jr(f, c, s, u, a)
                        }
                    else
                        jr(f, c, s, u, a);
                    var e, n, r, o, i
                })
            }
        })
    }
    function Hr(t, e, n, r, o) {
        o = function(t, e, n, r) {
            e = Rr(t, e),
            r = Rr(n, r);
            return Uo.relative(e, r)
        }(e, n, r, o),
        Ur(t, o)
    }
    function Br(t) {
        if (0 < t.rangeCount) {
            var e = t.getRangeAt(0)
              , t = t.getRangeAt(t.rangeCount - 1);
            return G.some(Sr(kn.fromDom(e.startContainer), e.startOffset, kn.fromDom(t.endContainer), t.endOffset))
        }
        return G.none()
    }
    function Wr(t) {
        if (null === t.anchorNode || null === t.focusNode)
            return Br(t);
        var e, n, r, o, i, u = kn.fromDom(t.anchorNode), a = kn.fromDom(t.focusNode);
        return e = u,
        n = t.anchorOffset,
        r = a,
        o = t.focusOffset,
        i = Mr(e, n, r, o),
        o = on(e, r) && n === o,
        i.collapsed && !o ? G.some(Sr(u, t.anchorOffset, a, t.focusOffset)) : Br(t)
    }
    function zr(t) {
        return Fr(t).filter(function(t) {
            return 0 < t.rangeCount
        }).bind(Wr)
    }
    function Yr(t, e) {
        vn(t).fold(function() {
            mn(t).each(function(t) {
                Bo(t, e)
            })
        }, function(t) {
            Ho(t, e)
        })
    }
    function qr(e, n) {
        yn(e).fold(function() {
            Bo(e, n)
        }, function(t) {
            e.dom.insertBefore(n.dom, t.dom)
        })
    }
    function $r(t, e) {
        Ho(t, e),
        Bo(e, t)
    }
    function Vr(n, r) {
        ct(r, function(t, e) {
            e = 0 === e ? n : r[e - 1];
            Yr(e, t)
        })
    }
    function Gr(e, t) {
        ct(t, function(t) {
            Bo(e, t)
        })
    }
    function Kr(t) {
        t.dom.textContent = "",
        ct(Er(t), function(t) {
            Wo(t)
        })
    }
    function Xr(t) {
        var e, n = Er(t);
        0 < n.length && (e = t,
        ct(n, function(t) {
            Ho(e, t)
        })),
        Wo(t)
    }
    function Jr(t, e, n, r) {
        var o = on(t, n) && e === r;
        return {
            startContainer: l(t),
            startOffset: l(e),
            endContainer: l(n),
            endOffset: l(r),
            collapsed: l(o)
        }
    }
    function Zr(t) {
        return t.slice(0).sort()
    }
    function Qr(e, t) {
        0 < (t = st(t, function(t) {
            return !S(e, t)
        })).length && function(t) {
            throw new Error("Unsupported keys for object: " + Zr(t).join(", "))
        }(t)
    }
    function to(t) {
        return void 0 !== t.style && et(t.style.getPropertyValue)
    }
    function eo(t, e, n) {
        if (!J(n))
            throw console.error("Invalid call to CSS.set. Property ", e, ":: Value ", n, ":: Element ", t),
            new Error("CSS value must be a string: " + n);
        to(t) && t.style.setProperty(e, n)
    }
    function no(t, e) {
        to(t) && t.style.removeProperty(e)
    }
    function ro(t, e, n) {
        t = t.dom,
        eo(t, e, n)
    }
    function oo(t, e) {
        var n = t.dom;
        R(e, function(t, e) {
            eo(n, e, t)
        })
    }
    function io(t, e) {
        var n = t.dom
          , r = window.getComputedStyle(n).getPropertyValue(e);
        return "" !== r || Ro(t) ? r : Yo(n, e)
    }
    function uo(t, e) {
        return t = t.dom,
        e = Yo(t, e),
        G.from(e).filter(function(t) {
            return 0 < t.length
        })
    }
    function ao(t, e) {
        var n = t.dom;
        no(n, e),
        je(t, "style").map(Mt).is("") && He(t, "style")
    }
    function co(t, e) {
        return (e = (e || document).createElement("div")).innerHTML = t,
        Er(kn.fromDom(e))
    }
    function so(t) {
        return t.dom.innerHTML
    }
    function fo(t) {
        function e() {
            return t.stopPropagation()
        }
        function n() {
            return t.preventDefault()
        }
        var r = kn.fromDom(function(t) {
            if (Co() && E(t.target)) {
                var e = kn.fromDom(t.target);
                if (_n(e) && ko(e) && t.composed && t.composedPath) {
                    e = t.composedPath();
                    if (e)
                        return C(e)
                }
            }
            return G.from(t.target)
        }(t).getOr(t.target))
          , o = i(n, e);
        return {
            target: r,
            x: t.clientX,
            y: t.clientY,
            stop: e,
            prevent: n,
            kill: o,
            raw: t
        }
    }
    function lo(t, e, n, r, o) {
        var i, u, r = (i = n,
        u = r,
        function(t) {
            i(t) && u(fo(t))
        }
        );
        return t.dom.addEventListener(e, r, o),
        {
            unbind: p(qo, t, e, r, o)
        }
    }
    function mo(t, e) {
        return Pr(t, e).isSome()
    }
    function po(n) {
        var t, r = (t = !1,
        {
            isBlocked: function() {
                return t
            },
            block: function() {
                t = !0
            },
            unblock: function() {
                t = !1
            }
        });
        return {
            control: r,
            instance: function() {
                for (var t = [], e = 0; e < arguments.length; e++)
                    t[e] = arguments[e];
                r.isBlocked() || n.apply(null, t)
            }
        }
    }
    function go(t, e) {
        return void 0 === (e = Cn(t, e)) || "" === e ? [] : e.split(" ")
    }
    function vo(t) {
        return void 0 !== t.dom.classList
    }
    function ho(t) {
        return go(t, "class")
    }
    function yo(t, e) {
        return function(t, e, n) {
            n = go(t, e).concat([n]);
            return Nn(t, e, n.join(" ")),
            !0
        }(t, "class", e)
    }
    function bo(t, e) {
        return r = e,
        0 < (t = st(go(n = t, e = "class"), function(t) {
            return t !== r
        })).length ? Nn(n, e, t.join(" ")) : He(n, e),
        0;
        var n, r
    }
    function xo(t, e) {
        vo(t) ? t.dom.classList.add(e) : yo(t, e)
    }
    function To(t, e) {
        vo(t) ? t.dom.classList.remove(e) : bo(t, e),
        0 === (vo(t = t) ? t.dom.classList : ho(t)).length && He(t, "class")
    }
    function wo(t, e) {
        return vo(t) && t.dom.classList.contains(e)
    }
    function Eo(t) {
        return (vo(t) ? function(t) {
            for (var e = t.dom.classList, n = new Array(e.length), r = 0; r < e.length; r++) {
                var o = e.item(r);
                null !== o && (n[r] = o)
            }
            return n
        }
        : ho)(t)
    }
    function So(t, e, n) {
        return Nr(t, function(t) {
            return en(t, e)
        }, n)
    }
    function Ao(t, e, n) {
        var r;
        return r = So,
        n = n,
        en(t = t, e = e) ? G.some(t) : et(n) && n(t) ? G.none() : r(t, e, n)
    }
    function Io(t) {
        ct(Er(t), function(t) {
            var e;
            _n(e = t) && !e.dom.hasChildNodes() && S(oi, Pe(e)) && Wo(t)
        })
    }
    function _o(e, t) {
        var n, r = kn.fromTag("div");
        function o(t) {
            return wo(t, ai)
        }
        return Fe(r, t),
        Fe(r, {
            contenteditable: "true",
            "aria-hidden": "true"
        }),
        oo(r, {
            position: "fixed",
            top: "0px",
            width: "100px",
            height: "100px",
            overflow: "hidden",
            opacity: "0"
        }),
        n = r,
        ct([ui, ai], function(t) {
            xo(n, t)
        }),
        {
            attach: function(t) {
                Kr(r),
                ro(r, "left", ci(t)),
                Bo(t, r)
            },
            focus: function() {
                So(r, "body").each(function(t) {
                    e.toOff(t, r)
                })
            },
            contents: function() {
                var n, t;
                return t = o,
                vn(n = r).filter(t).each(function(t) {
                    var e = Er(t);
                    Gr(n, e),
                    Wo(t)
                }),
                ii(n, t),
                Io(n),
                {
                    elements: Er(r),
                    html: so(r),
                    offscreen: r
                }
            },
            container: l(r),
            detach: function() {
                Wo(r)
            }
        }
    }
    function Lo(e, n, t) {
        function r() {
            e.cleanup();
            var t = o.contents();
            o.detach(),
            u.trigger.after(t.elements, t.html, o.container())
        }
        var o = _o(e, t)
          , i = po(function() {
            var t;
            u.trigger.before(),
            o.attach(n),
            o.focus(),
            t = fn(n),
            ei(t, i, r)
        })
          , u = xr({
            before: br([]),
            after: br(["elements", "html", "container"])
        })
          , t = y;
        return {
            instance: l(function() {
                i.instance()
            }),
            destroy: t,
            events: u.registry
        }
    }
    function Oo(t) {
        var e = on(t.start, t.finish) && t.soffset === t.foffset;
        return {
            startContainer: l(t.start),
            startOffset: l(t.soffset),
            endContainer: l(t.finish),
            endOffset: l(t.foffset),
            collapsed: l(e)
        }
    }
    var Do, No, X = et(Element.prototype.attachShadow) && et(Node.prototype.getRootNode), Co = l(X), Po = X ? function(t) {
        return kn.fromDom(t.dom.getRootNode())
    }
    : ln, ko = function(t) {
        return E(t.dom.shadowRoot)
    }, Ro = function(t) {
        var e = Ln(t) ? t.dom.parentNode : t.dom;
        if (null == e || null === e.ownerDocument)
            return !1;
        var n, r, o = e.ownerDocument;
        return Or(kn.fromDom(e)).fold(function() {
            return o.body.contains(e)
        }, (n = Ro,
        r = Dr,
        function(t) {
            return n(r(t))
        }
        ))
    }, Mo = function(t, e) {
        var n = [];
        return ct(Er(t), function(t) {
            e(t) && (n = n.concat([t])),
            n = n.concat(Mo(t, e))
        }),
        n
    }, Ht = Ut([{
        before: ["element"]
    }, {
        on: ["element", "offset"]
    }, {
        after: ["element"]
    }]), Fo = {
        before: Ht.before,
        on: Ht.on,
        after: Ht.after,
        cata: function(t, e, n, r) {
            return t.fold(e, n, r)
        },
        getStart: function(t) {
            return t.fold(u, u, u)
        }
    }, jo = Ut([{
        domRange: ["rng"]
    }, {
        relative: ["startSitu", "finishSitu"]
    }, {
        exact: ["start", "soffset", "finish", "foffset"]
    }]), Uo = {
        domRange: jo.domRange,
        relative: jo.relative,
        exact: jo.exact,
        exactFromRange: function(t) {
            return jo.exact(t.start, t.soffset, t.finish, t.foffset)
        },
        getWin: function(t) {
            t = t.match({
                domRange: function(t) {
                    return kn.fromDom(t.startContainer)
                },
                relative: function(t, e) {
                    return Fo.getStart(t)
                },
                exact: function(t, e, n, r) {
                    return t
                }
            });
            return dn(t)
        },
        range: Sr
    }, Ho = function(e, n) {
        mn(e).each(function(t) {
            t.dom.insertBefore(n.dom, e.dom)
        })
    }, Bo = function(t, e) {
        t.dom.appendChild(e.dom)
    }, Wo = function(t) {
        t = t.dom;
        null !== t.parentNode && t.parentNode.removeChild(t)
    }, zo = function(r, o, i) {
        if (0 === o.length)
            throw new Error("You must specify at least one required field.");
        var n;
        return function(e, t) {
            if (!Q(t))
                throw new Error("The " + e + " fields must be an array. Was: " + t + ".");
            ct(t, function(t) {
                if (!J(t))
                    throw new Error("The value " + t + " in the " + e + " fields was not a string.")
            })
        }("required", o),
        n = Zr(o),
        _(n, function(t, e) {
            return e < n.length - 1 && t === n[e + 1]
        }).each(function(t) {
            throw new Error("The field: " + t + " occurs more than once in the combined fields: [" + n.join(", ") + "].")
        }),
        function(e) {
            var n = Ot(e);
            D(o, function(t) {
                return S(n, t)
            }) || function(t, e) {
                throw new Error("All required keys (" + Zr(t).join(", ") + ") were not specified. Specified keys were: " + Zr(e).join(", ") + ".")
            }(o, n),
            r(o, n);
            var t = st(o, function(t) {
                return !i.validate(e[t], t)
            });
            return 0 < t.length && function(t, e) {
                throw new Error("All values need to be of type: " + e + ". Keys (" + Zr(t).join(", ") + ") were not.")
            }(t, i.label),
            e
        }
    }, Yo = function(t, e) {
        return to(t) ? t.style.getPropertyValue(e) : ""
    }, Wt = hr(), zt = Wt.browser, qo = (zt.isEdge() && zt.version.major < 16 || Wt.deviceType.isiOS(),
    zo(Qr, ["doc", "win", "body", "getSelection", "setSelection"], {
        validate: et,
        label: "function"
    }),
    function(t, e, n, r) {
        t.dom.removeEventListener(e, n, r)
    }
    ), $o = m, Vo = function(t, e, n) {
        return lo(t, e, $o, n, !1)
    }, Go = function(n) {
        return {
            is: function(t) {
                return n === t
            },
            isValue: m,
            isError: d,
            getOr: l(n),
            getOrThunk: l(n),
            getOrDie: l(n),
            or: function(t) {
                return Go(n)
            },
            orThunk: function(t) {
                return Go(n)
            },
            fold: function(t, e) {
                return e(n)
            },
            map: function(t) {
                return Go(t(n))
            },
            mapError: function(t) {
                return Go(n)
            },
            each: function(t) {
                t(n)
            },
            bind: function(t) {
                return t(n)
            },
            exists: function(t) {
                return t(n)
            },
            forall: function(t) {
                return t(n)
            },
            toOptional: function() {
                return G.some(n)
            }
        }
    }, Ko = function(n) {
        return {
            is: d,
            isValue: d,
            isError: m,
            getOr: u,
            getOrThunk: function(t) {
                return t()
            },
            getOrDie: function() {
                return a(String(n))()
            },
            or: function(t) {
                return t
            },
            orThunk: function(t) {
                return t()
            },
            fold: function(t, e) {
                return t(n)
            },
            map: function(t) {
                return Ko(n)
            },
            mapError: function(t) {
                return Ko(t(n))
            },
            each: y,
            bind: function(t) {
                return Ko(n)
            },
            exists: d,
            forall: m,
            toOptional: G.none
        }
    }, Xo = {
        value: Go,
        error: Ko,
        fromOption: function(t, e) {
            return t.fold(function() {
                return Ko(e)
            }, Go)
        }
    }, An = function(t) {
        var e = Jo(t);
        return {
            resolve: function(t) {
                t = t.split(" ");
                return at(t, function(t) {
                    return Zo(e, t)
                }).join(" ")
            }
        }
    }, Jo = function(t) {
        return t.replace(/\./g, "-")
    }, Zo = function(t, e) {
        return t + "-" + e
    }, Rn = (An("ephox.flour"),
    An("ephox-sloth").resolve), Qo = l(Rn("bin")), er = hr(), ti = l(er.browser.isIE() && er.browser.version.major <= 10), ei = ti() ? function(t, e, n) {
        e.control.block(),
        t.dom.execCommand("paste"),
        n(),
        e.control.unblock()
    }
    : function(t, e, n) {
        setTimeout(n, 1)
    }
    , ni = function(t) {
        return "rtl" === io(t, "direction") ? "rtl" : "ltr"
    }, ri = function(t, e) {
        return function(t, e) {
            e = void 0 === e ? document : e.dom;
            return nn(e) ? G.none() : G.from(e.querySelector(t)).map(kn.fromDom)
        }(e, t)
    }, oi = ["b", "i", "u", "sub", "sup", "strike"], ii = function(t, r) {
        t = Er(t);
        ct(t, function(t) {
            var e, n;
            r(t) && (n = Er(e = t),
            t = kn.fromTag("div", fn(e).dom),
            Gr(t, n),
            Ho(e, t),
            Wo(e))
        })
    }, ui = Qo(), ai = ui + Vt(""), ci = (Do = "-100000px",
    No = "100000px",
    function(t) {
        return "rtl" === ni(t) ? No : Do
    }
    ), si = {
        set: function(t, e) {
            Hr(t, e.startContainer(), e.startOffset(), e.endContainer(), e.endOffset())
        },
        get: function(t) {
            return zr(t).map(Oo)
        }
    };
    function fi(c) {
        return function(e) {
            var i, r, u, a, n = xr({
                after: br(["container"])
            }), o = (i = si,
            r = kn.fromTag("br"),
            u = G.none(),
            a = function(t) {
                return dn(t).dom
            }
            ,
            {
                cleanup: function() {
                    Wo(r)
                },
                toOn: function(r, t) {
                    var o = a(t);
                    u.each(function(t) {
                        var e = r.dom.childNodes.length
                          , n = on(r, t.startContainer()) && e < t.startOffset() ? e : t.startOffset()
                          , e = on(r, t.endContainer()) && e < t.endOffset() ? e : t.endOffset()
                          , e = Jr(t.startContainer(), n, t.endContainer(), e);
                        i.set(o, e)
                    })
                },
                toOff: function(t, e) {
                    var n = a(e);
                    Bo(e, r),
                    u = i.get(n),
                    i.set(n, Jr(r, 0, r, 0))
                }
            }), t = Lo(o, e, c);
            t.events.after.bind(function(t) {
                o.toOn(e, t.container),
                n.trigger.after(t.container)
            });
            return {
                run: function() {
                    t.instance()()
                },
                events: n.registry
            }
        }
    }
    function li() {
        var n = {};
        return {
            getOrSetIndexed: function(t, e) {
                return void 0 !== n[t] ? n[t] : (t = t,
                e = e(),
                n[t] = e)
            },
            waitForLoad: function() {
                var t = F(n, function(t) {
                    return t
                });
                return Qt(t)
            }
        }
    }
    function di(t, e) {
        t = function(t) {
            t = t.dom.head;
            if (null == t)
                throw new Error("Head is not available yet");
            return kn.fromDom(t)
        }(t),
        Bo(t, e)
    }
    function mi(u, a) {
        return Xt.nu(function(e) {
            function n(t) {
                ct(i, function(t) {
                    t.unbind()
                }),
                e(t.fold(function(t) {
                    return Xo.error(t + 'Unable to download editor stylesheets from "' + u + '"')
                }, Xo.value))
            }
            var t, r, o, r = (t = u,
            o = r || kn.fromDom(document),
            r = kn.fromTag("link", o.dom),
            Fe(r, {
                rel: "stylesheet",
                type: "text/css",
                href: t
            }),
            di(o, r),
            r), i = [Vo(r, "load", function(t) {
                !function(t) {
                    try {
                        var e = t.target.dom.sheet.cssRules;
                        return Z(e) && 0 === e.length
                    } catch (t) {}
                    return !1
                }(t) ? a(n) : n(Xo.error(""))
            }), Vo(r, "error", p(n, Xo.error("")))]
        })
    }
    function pi(t) {
        return e = t,
        t = !1,
        kn.fromDom(e.dom.cloneNode(t));
        var e
    }
    function gi(t, n) {
        return G.from(t.dom.nodeValue).bind(function(t) {
            var e = t.indexOf("]>")
              , t = function(e) {
                try {
                    return (new DOMParser).parseFromString(e, "text/html").body
                } catch (t) {
                    var n = document.implementation.createHTMLDocument("").body;
                    return n.innerHTML = e,
                    n
                }
            }("<div>" + t.slice(e + "]>".length, t.lastIndexOf("<![")) + "</div>");
            return Pr(kn.fromDom(t), function(t) {
                return Pe(t) === n
            })
        })
    }
    function vi(t) {
        return (In(t = t) ? gi(t, "v:shape") : G.none()).map(function(t) {
            var n, e = Cn(t, "o:spid"), r = void 0 === e ? je(t, "id").getOr("") : e, e = kn.fromTag("img");
            return xo(e, "rtf-data-image"),
            Nn(e, "data-image-id", r.substr("_x0000_".length)),
            Nn(e, "data-image-type", "code"),
            r = e,
            t = {
                width: uo(t, "width"),
                height: uo(t, "height")
            },
            n = r.dom,
            R(t, function(t, e) {
                t.fold(function() {
                    no(n, e)
                }, function(t) {
                    eo(n, e, t)
                })
            }),
            e
        })
    }
    function hi(t) {
        if (Re("img")(t)) {
            var e = Cn(t, "src");
            if (null != e && kt(e, "file://")) {
                t = pi(t),
                e = e.split(/[\/\\]/),
                e = e[e.length - 1];
                return Nn(t, "data-image-id", e),
                He(t, "src"),
                Nn(t, "data-image-type", "local"),
                xo(t, "rtf-data-image"),
                G.some(t)
            }
            return G.none()
        }
        return G.none()
    }
    function yi(t, e) {
        var n = Pe(t)
          , r = e.name
          , e = void 0 !== e.condition ? e.condition : m;
        return Ji.matches(r, n) && e(t)
    }
    function bi(t, e) {
        var n, r = at(t.dom.attributes, function(t) {
            return t.name
        });
        j(e) !== r.length && (n = t,
        e = e,
        ct(r, function(t) {
            He(n, t)
        }),
        R(e, function(t, e) {
            Nn(n, e, t)
        }))
    }
    function xi(t, e, n) {
        var r, t = t.dom.getAttribute("style"), o = (r = {},
        t = E(t = t) ? t.split(";") : [],
        ct(t, function(t) {
            t = t.split(":");
            2 === t.length && (r[Mt(t[0])] = Mt(t[1]))
        }),
        r), i = {};
        return ct(e, function(t) {
            var e = o[t];
            void 0 === e || n(e, t) || (i[t] = e)
        }),
        i
    }
    function Ti(e) {
        var t = Ot(e);
        return at(t, function(t) {
            return t + ": " + e[t]
        }).join("; ")
    }
    function wi(t, e) {
        var n, r, o, i = xi(t, Zi, e);
        !function(n, t, e) {
            Nn(n, "style", "");
            var r = j(t)
              , o = j(e);
            0 === r && 0 === o ? He(n, "style") : 0 === r ? Nn(n, "style", Ti(e)) : (R(t, function(t, e) {
                ro(n, e, t)
            }),
            t = Cn(n, "style"),
            e = 0 < o ? Ti(e) + "; " : "",
            Nn(n, "style", e + t))
        }(t, (r = e,
        t = (n = t).dom.style,
        t = w(t) ? [] : t,
        o = {},
        ct(t, function(e) {
            uo(n, e).each(function(t) {
                r(t, e) || (o[e] = t)
            })
        }),
        o), i)
    }
    function Ei(t, e) {
        var n, r, e = (n = e,
        r = {},
        ct(t.dom.attributes, function(t) {
            n(t.value, t.name) || (r[t.name] = t.value)
        }),
        r);
        bi(t, e)
    }
    function Si(t, e, c) {
        t(c, function(u, a) {
            return ut(e, function(t) {
                return e = c,
                n = u,
                r = a,
                i = (o = t).name,
                t = void 0 !== o.condition ? o.condition : m,
                o = void 0 !== o.value ? o.value : Ji.all(),
                Ji.matches(i, r) && Ji.matches(o, n) && t(e);
                var e, n, r, o, i
            })
        })
    }
    function Ai(t, e, n) {
        var r, o, i = kn.fromDom(t);
        switch (t.nodeType) {
        case 1:
            e ? r = tu : (r = Qi,
            oo(i, n || {}));
            var n = t
              , u = ("HTML" !== n.scopeName && n.scopeName && n.tagName && n.tagName.indexOf(":") <= 0 ? n.scopeName + ":" + n.tagName : n.tagName).toLowerCase();
            break;
        case 3:
            r = eu,
            o = t.nodeValue;
            break;
        case 8:
            r = nu,
            o = t.nodeValue;
            break;
        default:
            console.log("WARNING: Unsupported node type encountered: " + t.nodeType)
        }
        return {
            getNode: function() {
                return t
            },
            tag: function() {
                return u
            },
            type: function() {
                return r
            },
            text: function() {
                return o
            }
        }
    }
    function Ii(t, e, n, r) {
        var o = r.createElement(t);
        return R(e, function(t, e) {
            o.setAttribute(e, t + "")
        }),
        Ai(o, !1, n)
    }
    function _i(t, e) {
        return Ai(e.createElement(t), !0)
    }
    function Li(n) {
        var r = n.createDocumentFragment()
          , o = r
          , i = function(t) {
            o.appendChild(t)
        };
        return {
            dom: r,
            receive: function(t) {
                var e;
                switch (t.type()) {
                case Qi:
                    !function(t) {
                        t = t.getNode().cloneNode(!1);
                        i(t = t),
                        o = t
                    }(t);
                    break;
                case eu:
                    !function(t) {
                        t = n.createTextNode(t.text());
                        i(t)
                    }(t);
                    break;
                case tu:
                    e = o.parentNode,
                    o = null === e ? r : e;
                    break;
                case nu:
                    break;
                default:
                    throw {
                        message: "Unsupported token type: " + t.type()
                    }
                }
            },
            label: "SERIALISER"
        }
    }
    function Oi(t, r) {
        void 0 === r && (r = window.document);
        var o = r.createElement("div");
        r.body.appendChild(o),
        o.style.position = "absolute",
        o.style.left = "-10000px",
        o.innerHTML = t;
        var i = o.firstChild || ru
          , u = []
          , a = !1;
        return {
            hasNext: function() {
                return void 0 !== i
            },
            next: function() {
                var t = i
                  , e = i
                  , n = a;
                return !a && t.firstChild ? (u.push(t),
                i = t.firstChild) : a = !a && 1 === t.nodeType || (t.nextSibling ? (i = t.nextSibling,
                !1) : (i = u.pop(),
                !0)),
                e === ru || i || (r.body.removeChild(o),
                i = ru),
                n = n,
                (e = e) === ru ? e : e ? Ai(e, n) : void 0
            }
        }
    }
    function Di(n) {
        return function(t) {
            var e;
            t = t,
            e = Ki({
                tags: []
            }, n),
            t = kr(t, "*"),
            ct(t, function(t) {
                ut(e.tags, p(yi, t)) && Xr(t)
            })
        }
    }
    function Ni(e) {
        return function(t) {
            var n;
            t = t,
            n = Ki({
                tags: []
            }, e),
            t = kr(t, "*"),
            ct(t, function(e) {
                _(n.tags, p(yi, e)).each(function(t) {
                    t.mutate(e)
                })
            })
        }
    }
    function Ci(n) {
        return function(t) {
            var e = so(t)
              , e = function(t, e, n) {
                for (var r = Li(t), o = Oi(e, t), i = function(t, e, n) {
                    for (var r = n, o = e.length - 1; 0 <= o; o--)
                        r = e[o](r, {}, t);
                    return r
                }(t, n, r); o.hasNext(); ) {
                    var u = o.next();
                    i.receive(u)
                }
                return r.dom
            }(fn(t).dom, e, n);
            Kr(t),
            t.dom.appendChild(e)
        }
    }
    function Pi(t, e, n) {
        var r = kn.fromTag("div", t.dom);
        return r.dom.innerHTML = e,
        ct(n, function(t) {
            t(r)
        }),
        so(r)
    }
    function ki(i, t) {
        return function(e) {
            var n = function(t) {
                e.receive(t)
            }
              , r = function(t, e, n) {
                return n = void 0 !== n ? n : t.type() === tu,
                Ai(e, n, {})
            }
              , o = {
                emit: n,
                emitTokens: function(t) {
                    ct(t, n)
                },
                receive: function(t) {
                    i(o, t, r)
                },
                document: window.document
            };
            return t(o),
            o
        }
    }
    function Ri(t, e) {
        if (void 0 === t || void 0 === e)
            throw console.trace(),
            new Error("brick");
        t.nextFilter.set(e)
    }
    function Mi(t, e) {
        return Ue(kn.fromDom(e.getNode()), "data-list-level")
    }
    function Fi(t) {
        if (S(["p"], t.tag())) {
            t = function(t, e) {
                t = kn.fromDom(t.getNode());
                return Cn(t, e)
            }(t, "class");
            return E(t) && /^MsoHeading/.test(t)
        }
        return 1
    }
    function ji(t, e, n, r) {
        var o, i, u = n.getCurrentListType(), u = n.getCurrentLevel() == r.level() ? u : null;
        return o = r.emblems(),
        i = u,
        _(o, function(t) {
            return "ul" === t.tag || E(i) && ou(t, i, !0)
        }).orThunk(function() {
            return C(o)
        }).filter(function(t) {
            return !("ol" === t.tag && Fi(e))
        })
    }
    function Ui(t, e, n) {
        return ji(n.listType.get(), t, n.emitter, e).each(n.listType.set),
        t = e.level(),
        e = n.originalToken.get(),
        n = n.listType.get(),
        {
            level: l(t),
            token: l(e),
            type: l(n)
        }
    }
    function Hi(u) {
        return function(t, e, n) {
            var r, o, i = n, n = (r = kn.fromDom(i.getNode()),
            o = parseInt(Cn(r, "data-list-level"), 10),
            n = Cn(r, "data-list-emblems"),
            n = E(n) ? JSON.parse(n) : [],
            He(r, "data-list-level"),
            He(r, "data-list-emblems"),
            {
                level: l(o),
                emblems: l(n)
            });
            e.originalToken.set(i);
            n = Ui(i, n, e);
            e.emitter.openItem(n.level(), n.token(), n.type()),
            Ri(e, u.inside())
        }
    }
    function Bi(t, e, n) {
        return {
            pred: t,
            action: e,
            label: l(n)
        }
    }
    var Wi, zi, Yi, qi = function(a) {
        var c = p(Ce, a);
        Ce("callbacks", c());
        function e(n, r) {
            var t, e, o, i = c(), u = (e = void 0 === (t = i).count ? 0 : t.count,
            o = "callback_" + e,
            t.count = e + 1,
            o);
            return i.callbacks[u] = function() {
                for (var t = [], e = 0; e < arguments.length; e++)
                    t[e] = arguments[e];
                r || s(u),
                n.apply(null, t)
            }
            ,
            a + ".callbacks." + u
        }
        var s = function(t) {
            var e = t.substring(t.lastIndexOf(".") + 1)
              , t = c();
            void 0 !== t.callbacks[e] && delete t.callbacks[e]
        };
        return {
            ephemeral: function(t) {
                return e(t, !1)
            },
            permanent: function(t) {
                return e(t, !0)
            },
            unregister: s
        }
    }("ephox.henchman.features"), $i = (Wi = li(),
    {
        preload: function() {
            zi().get(u)
        },
        addStylesheet: function(t, e) {
            return Wi.getOrSetIndexed(t, function() {
                return mi(t, e)
            })
        },
        addScript: function(t, e) {
            return Wi.getOrSetIndexed(t, function() {
                return i = t,
                Xt.nu(function(e) {
                    function t() {
                        r.unbind(),
                        o.unbind()
                    }
                    var n = kn.fromTag("script");
                    Nn(n, "src", i),
                    Nn(n, "type", "text/javascript"),
                    Nn(n, "async", "async"),
                    Nn(n, "data-main", qi.ephemeral(function(t) {
                        e(Xo.value(t))
                    }));
                    var r = Vo(n, "error", function() {
                        t(),
                        e(Xo.error("Error loading external script tag " + i))
                    })
                      , o = Vo(n, "load", t);
                    Bo(kn.fromDom(document.head), n)
                }).map(e);
                var i
            })
        },
        waitForLoad: zi = function() {
            return Wi.waitForLoad()
        }
    }), Vi = {
        loadScript: function(t, o) {
            return new Gt(function(e, n) {
                var t, r;
                t = o,
                r = u,
                $i.addScript(t, r).get(function(t) {
                    t.fold(n, e)
                })
            }
            )
        }
    }, Gi = Object.prototype.hasOwnProperty, Ki = (Yi = function(t, e) {
        return e
    }
    ,
    function() {
        for (var t = new Array(arguments.length), e = 0; e < t.length; e++)
            t[e] = arguments[e];
        if (0 === t.length)
            throw new Error("Can't merge zero objects");
        for (var n = {}, r = 0; r < t.length; r++) {
            var o, i = t[r];
            for (o in i)
                Gi.call(i, o) && (n[o] = Yi(n[o], i[o]))
        }
        return n
    }
    ), nr = Ut([{
        starts: ["value", "f"]
    }, {
        pattern: ["regex", "f"]
    }, {
        contains: ["value", "f"]
    }, {
        exact: ["value", "f"]
    }, {
        all: []
    }, {
        not: ["stringMatch"]
    }]), Xi = function(t, n) {
        return t.fold(function(t, e) {
            return 0 === e(n).indexOf(e(t))
        }, function(t, e) {
            return t.test(e(n))
        }, function(t, e) {
            return 0 <= e(n).indexOf(e(t))
        }, function(t, e) {
            return e(n) === e(t)
        }, function() {
            return !0
        }, function(t) {
            return !Xi(t, n)
        })
    }, Ji = {
        starts: nr.starts,
        pattern: nr.pattern,
        contains: nr.contains,
        exact: nr.exact,
        all: nr.all,
        not: nr.not,
        cata: function(t, e, n, r, o, i, u) {
            return t.fold(e, n, r, o, i, u)
        },
        matches: Xi,
        caseSensitive: function(t) {
            return t
        },
        caseInsensitive: function(t) {
            return t.toLowerCase()
        }
    }, Zi = ["mso-list"], Qi = "startElement", tu = "endElement", eu = "text", nu = "comment", ru = _i("html", window.document), rr = function(e) {
        return function(t) {
            !function(t, e) {
                var r = Ki({
                    styles: [],
                    attributes: [],
                    classes: [],
                    tags: []
                }, e)
                  , e = kr(t, "*");
                ct(e, function(n) {
                    Si(wi, r.styles, n),
                    Si(Ei, r.attributes, n),
                    ct(r.classes, function(e) {
                        var t = Ue(n, "class") ? Eo(n) : [];
                        ct(t, function(t) {
                            Ji.matches(e.name, t) && To(n, t)
                        })
                    })
                });
                t = kr(t, "*");
                ct(t, function(t) {
                    ut(r.tags, p(yi, t)) && Wo(t)
                })
            }(t, e)
        }
    }, ou = function(t, e, n) {
        return void 0 === n && (n = !1),
        t === e || E(t) && E(e) && t.tag === e.tag && t.type === e.type && (n || t.variant === e.variant)
    };
    function iu(t, r, o) {
        function e(t, e, n) {
            _(r, function(t) {
                return t.pred(e, n)
            }).fold(l(o), function(t) {
                return t.action
            })(t, e, n)
        }
        return e.toString = function() {
            return "Handlers for " + t
        }
        ,
        e
    }
    function uu(t) {
        var e = t;
        return {
            get: function() {
                return e
            },
            set: function(t) {
                e = t
            }
        }
    }
    function au(t, e) {
        return {
            state: l(t),
            result: l(e)
        }
    }
    function cu(t, e) {
        return {
            state: l(t),
            value: l(e)
        }
    }
    function su(t, e, n, r) {
        return {
            level: l(t),
            type: l(e),
            types: l(n),
            items: l(r)
        }
    }
    function fu(t) {
        var e = t.items().slice(0);
        if (0 < e.length && "p" !== e[e.length - 1]) {
            var n = e[e.length - 1];
            e[e.length - 1] = "p";
            e = su(t.level(), t.type(), t.types(), e);
            return cu(e, G.some(n))
        }
        return cu(t, G.none())
    }
    function lu(t, e, n) {
        for (var r = [], o = t; e(o); )
            var i = n(o)
              , o = i.state()
              , r = r.concat(i.result());
        return au(o, r)
    }
    function du(t) {
        return t = function(t, e) {
            t = kn.fromDom(t.getNode());
            return io(t, e)
        }(t, "margin-left"),
        E(t) && "0px" !== t ? {
            "margin-left": t
        } : {}
    }
    function mu(t, e, n) {
        var r = e.start && 1 < e.start ? {
            start: e.start
        } : {}
          , o = t.level() + 1
          , i = e
          , u = t.types().concat([e])
          , n = [p(Ii, e.tag, r, n)]
          , t = su(o, i, u, t.items());
        return au(t, n)
    }
    function pu(t) {
        var e = t.types().slice(0)
          , n = [p(_i, e.pop().tag)]
          , r = t.level() - 1
          , o = e[e.length - 1]
          , t = su(r, o, e, t.items());
        return au(t, n)
    }
    function gu(t, o, e) {
        var n = (r = o) ? du(r) : {
            "list-style-type": "none"
        }
          , r = t.type() && !ou(t.type(), e) ? function(t, e) {
            t = pu(t),
            e = mu(t.state(), e, e.type ? {
                "list-style-type": e.type
            } : {});
            return au(e.state(), t.result().concat(e.result()))
        }(t, e) : au(t, [])
          , e = [p(Ii, "li", {}, n)]
          , n = (t = function(t, e) {
            var n = t.items().slice(0)
              , e = void 0 !== e && "p" !== e ? G.some(e) : G.none();
            e.fold(function() {
                n.push("p")
            }, function(t) {
                n.push(t)
            });
            t = su(t.level(), t.type(), t.types(), n);
            return cu(t, e)
        }(r.state(), o && o.tag())).value().map(function(t) {
            var e, n, r = o;
            return e = r.getNode(),
            n = l(!0),
            wi(kn.fromDom(e), n),
            [l(r)]
        }).getOr([]);
        return au(t.state(), r.result().concat(e).concat(n))
    }
    function vu(t) {
        var e = p(_i, "li")
          , n = fu(t)
          , t = n.value().fold(function() {
            return [e]
        }, function(t) {
            return [p(_i, t), e]
        });
        return au(n.state(), t)
    }
    function hu(t) {
        if (0 === t.length)
            throw "Compose must have at least one element in the list";
        var e = t[t.length - 1]
          , t = ft(t, function(t) {
            return t.result()
        });
        return au(e.state(), t)
    }
    function yu(t) {
        var e = vu(t)
          , t = pu(e.state());
        return hu([e, t])
    }
    function bu(t, i, u, a) {
        return e = u,
        lu(t, function(t) {
            return t.level() < e
        }, function(t) {
            return n = i,
            r = u,
            o = a,
            t = (e = t).level() === r - 1 && n.type ? {
                "list-style-type": n.type
            } : {},
            t = mu(e, n, t),
            n = gu(t.state(), t.state().level() == r ? o : void 0, n),
            hu([t, n]);
            var e, n, r, o
        });
        var e
    }
    function xu(t, e) {
        return n = e,
        lu(t, function(t) {
            return t.level() > n
        }, yu);
        var n
    }
    function Tu(t, e, n, r) {
        var o = t.level() > e ? xu(t, e) : au(t, [])
          , i = o.state().level() === e ? function(t, e, n) {
            t = 0 < t.level() ? vu(t) : au(t, []),
            e = gu(t.state(), n, e);
            return hu([t, e])
        }(o.state(), r, n) : (t = o.state(),
        r = r,
        i = n,
        e = 1 < (n = e) ? fu(t) : cu(t, G.none()),
        t = e.value().map(function(t) {
            return [p(_i, t)]
        }).getOr([]),
        i = bu(e.state(), r, n, i),
        au(i.state(), t.concat(i.result())));
        return hu([o, i])
    }
    function wu(e, n) {
        function o(t) {
            ct(t.result(), function(t) {
                t = t(n);
                e.emit(t)
            })
        }
        var i = su(0, void 0, [], []);
        return {
            closeAllLists: function() {
                var t = Eu(i, 0);
                i = t.state(),
                o(t)
            },
            openItem: function(t, e, n) {
                var r;
                n && (r = t,
                n = "ul" === (n = n).tag && Su[r - 1] === n.type ? {
                    tag: "ul"
                } : n,
                n = Tu(i, t, e, n),
                i = n.state(),
                o(n))
            },
            getCurrentListType: function() {
                return i.type()
            },
            getCurrentLevel: function() {
                return i.level()
            }
        }
    }
    var Eu = xu
      , Su = ["disc", "circle", "square"]
      , Au = {
        getCurrentListType: function() {
            return Iu().getCurrentListType()
        },
        getCurrentLevel: function() {
            return Iu().getCurrentLevel()
        },
        closeAllLists: function() {
            return Iu().closeAllLists.apply(void 0, arguments)
        },
        openItem: function() {
            return Iu().openItem.apply(void 0, arguments)
        }
    }
      , Iu = function() {
        return {
            getCurrentListType: l({}),
            getCurrentLevel: l(1),
            closeAllLists: y,
            openItem: u
        }
    };
    function _u(t) {
        for (var e = []; null !== t.nextNode(); )
            e.push(kn.fromDom(t.currentNode));
        return e
    }
    function Lu(t) {
        var e = hr().browser;
        return (e.isIE() || e.isEdge() ? function(t) {
            try {
                return _u(t)
            } catch (t) {
                return []
            }
        }
        : _u)(t)
    }
    function Ou(t) {
        return t.dom.textContent
    }
    function Du(o, t) {
        var e = sa[o] ? [sa[o]] : []
          , n = t && ca[o] ? [ca[o]] : t ? [{
            tag: "ul",
            variant: o
        }] : []
          , t = ft(aa, function(t) {
            return t.regex.test(o) ? [Ki(t.type, (n = (e = o).split("."),
            r = function() {
                if (0 === n.length)
                    return e;
                var t = n[n.length - 1];
                return 0 === t.length && 1 < n.length ? n[n.length - 2] : t
            }(),
            r = parseInt(r, 10),
            isNaN(r) ? {} : {
                start: r
            }), {
                variant: (r = t.type,
                t = o,
                void 0 !== r.variant ? r.variant : "(" === t.charAt(0) ? "()" : ")" === t.charAt(t.length - 1) ? ")" : ".")
            })] : [];
            var e, n, r
        })
          , t = e.concat(n).concat(t);
        return at(t, function(t) {
            return void 0 !== t.variant ? t : Ki(t, {
                variant: o
            })
        })
    }
    function Nu(t) {
        return t = xi(t, ["mso-list"], d)["mso-list"],
        (t = E(t) && / level([0-9]+)/.exec(t)) && t[1] ? G.some(parseInt(t[1], 10)) : G.none()
    }
    function Cu(t, e) {
        return t = Ou(t).trim(),
        0 < (e = Du(t, e)).length ? G.some(e) : G.none()
    }
    function Pu(t) {
        return Cr(t, In).bind(vn).filter(Re("span"))
    }
    function ku(t) {
        return Pr(t, function(t) {
            return (_n(t) ? xi(t, ["mso-list"], d) : {})["mso-list"]
        })
    }
    function Ru(t) {
        t = function(t, e) {
            e = e.fold(ua, function(e) {
                return function(t) {
                    return e(t.nodeValue)
                }
            });
            e.acceptNode = e;
            e = document.createTreeWalker(t.dom, NodeFilter.SHOW_COMMENT, e, !1);
            return Lu(e)
        }(t, G.none()),
        ct(t, Wo)
    }
    function Mu(t, e, n, r) {
        !function(t, e, n) {
            Nn(t, "data-list-level", e);
            n = JSON.stringify(n);
            Nn(t, "data-list-emblems", n)
        }(t, e, n),
        Ru(t),
        ct(r, Wo),
        He(t, "style"),
        He(t, "class")
    }
    function Fu(r) {
        return Nu(r).bind(function(n) {
            return Cr(r, fa).bind(function(e) {
                return Cu(e, !0).map(function(t) {
                    return {
                        mutate: function() {
                            Mu(r, n, t, [e])
                        }
                    }
                })
            })
        })
    }
    function ju(r) {
        return "p" !== Pe(r) ? G.none() : ku(r).bind(function(t) {
            var n = mn(t).getOr(t)
              , e = fa(n);
            return Cu(t, e).bind(function(e) {
                return uo(r, "margin-left").bind(function(t) {
                    t = parseInt(t, 10);
                    return isNaN(t) ? G.none() : G.some(Math.max(1, Math.ceil(t / 18)))
                }).map(function(t) {
                    return {
                        mutate: function() {
                            Mu(r, t, e, [n])
                        }
                    }
                })
            })
        })
    }
    function Uu(t) {
        return Fu(t).orThunk(function() {
            return Nu(r = t).bind(function(n) {
                return Pu(r).bind(function(e) {
                    return Cu(e, fa(e)).map(function(t) {
                        return {
                            mutate: function() {
                                Mu(r, n, t, [e])
                            }
                        }
                    })
                })
            });
            var r
        }).orThunk(function() {
            return Nu(r = t).bind(function(n) {
                return Pu(r).bind(function(e) {
                    return Cu(e, fa(e)).map(function(t) {
                        return {
                            mutate: function() {
                                Mu(r, n, t, [e])
                            }
                        }
                    })
                })
            });
            var r
        }).orThunk(function() {
            return "p" !== Pe(r = t) ? G.none() : Nu(r).bind(function(n) {
                return ku(r).bind(function(e) {
                    return Cu(e, !1).map(function(t) {
                        return {
                            mutate: function() {
                                Mu(r, n, t, [mn(e).getOr(e)])
                            }
                        }
                    })
                })
            });
            var r
        }).orThunk(function() {
            return ju(t)
        })
    }
    function Hu(t, e) {
        var n = kn.fromTag(t);
        return Ho(e, n),
        t = e.dom.attributes,
        ct(t, function(t) {
            n.dom.setAttribute(t.name, t.value)
        }),
        t = Er(e),
        Gr(n, t),
        Wo(e),
        n
    }
    function Bu(t) {
        var o = Hu("span", t)
          , i = {
            "font-size": {
                1: "8pt",
                2: "10pt",
                3: "12pt",
                4: "14pt",
                5: "18pt",
                6: "24pt",
                7: "36pt"
            }
        };
        R({
            face: "font-family",
            size: "font-size",
            color: "color"
        }, function(n, r) {
            je(o, r).each(function(t) {
                var e = i[n]
                  , t = void 0 !== e && void 0 !== e[t] ? e[t] : t;
                ro(o, n, t),
                He(o, r)
            })
        })
    }
    function Wu(t) {
        return "td" === (t = Pe(t)) || "tr" === t || "table" === t || "col" === t
    }
    function zu(t) {
        t = Hu("span", t),
        xo(t, "ephox-limbo-transform"),
        ro(t, "text-decoration", "underline")
    }
    var Yu, qu, $u, Vu, Gu, Ku, Xu, Ju, Zu, Qu, ta, ea = {
        inside: function() {
            return ra
        },
        outside: function() {
            return oa
        }
    }, na = (Yu = !1,
    {
        check: function(t) {
            return !(!Yu || t.type() !== eu) || (t.type() === Qi && "style" === t.tag() ? Yu = !0 : t.type() === tu && "style" === t.tag() && !(Yu = !1))
        }
    }), ra = (qu = ea,
    iu("Inside.List.Item", [Bi(function(t, e) {
        t = t.originalToken.get();
        return e.type() === tu && null !== t && e.tag() === t.tag()
    }, function(t, e) {
        Ri(e, qu.outside())
    }, "Closing open tag")], function(t, e, n) {
        t.emit(n)
    })), oa = iu("Outside.List.Item", [Bi(Mi, Hi($u = ea), "Data List ****"), Bi(function(t, e) {
        return e.type() === eu && ((e = e).type() === eu && /^[\s\u00A0]*$/.test(e.text()))
    }, function(t, e, n) {
        t.emit(n)
    }, "Whitespace")], function(t, e, n) {
        e.emitter.closeAllLists(),
        t.emit(n),
        Ri(e, $u.outside())
    }), ia = (Gu = uu(Vu = oa),
    Ku = uu(null),
    Xu = uu(null),
    {
        reset: function(t) {
            Gu.set(Vu),
            Ku.set(null),
            Xu.set(null);
            t = wu(t, t.document);
            Iu = l(t)
        },
        nextFilter: Gu,
        originalToken: Ku,
        listType: Xu,
        emitter: Au
    }), or = ki(function(t, e, n) {
        var r;
        na.check(e) || (r = t,
        t = e,
        (e = ia).nextFilter.get()(r, e, t))
    }, ia.reset), ua = l(m), aa = [{
        regex: /^\(?[dc][\.\)]$/,
        type: {
            tag: "ol",
            type: "lower-alpha"
        }
    }, {
        regex: /^\(?[DC][\.\)]$/,
        type: {
            tag: "ol",
            type: "upper-alpha"
        }
    }, {
        regex: /^\(?M*(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})[\.\)]$/,
        type: {
            tag: "ol",
            type: "upper-roman"
        }
    }, {
        regex: /^\(?m*(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})[\.\)]$/,
        type: {
            tag: "ol",
            type: "lower-roman"
        }
    }, {
        regex: /^\(?[0-9]+[\.\)]$/,
        type: {
            tag: "ol"
        }
    }, {
        regex: /^([0-9]+\.)*[0-9]+\.?$/,
        type: {
            tag: "ol",
            variant: "outline"
        }
    }, {
        regex: /^\(?[a-z]+[\.\)]$/,
        type: {
            tag: "ol",
            type: "lower-alpha"
        }
    }, {
        regex: /^\(?[A-Z]+[\.\)]$/,
        type: {
            tag: "ol",
            type: "upper-alpha"
        }
    }], ca = {
        "\u2022": {
            tag: "ul",
            type: "disc"
        },
        "\xb7": {
            tag: "ul",
            type: "disc"
        },
        "\xa7": {
            tag: "ul",
            type: "square"
        }
    }, sa = {
        o: {
            tag: "ul",
            type: "circle"
        },
        "-": {
            tag: "ul",
            type: "disc"
        },
        "\u25cf": {
            tag: "ul",
            type: "disc"
        },
        "\ufffd": {
            tag: "ul",
            type: "circle"
        }
    }, fa = function(t) {
        return _n(t) && uo(t, "font-family").exists(function(t) {
            return S(["wingdings", "symbol"], t.toLowerCase())
        })
    }, la = Ni({
        tags: [{
            name: Ji.pattern(/^(p|h\d+)$/, Ji.caseInsensitive),
            mutate: function(t) {
                Uu(t).each(function(t) {
                    t.mutate()
                })
            }
        }]
    }), t = or, da = function(t) {
        t = t.dom.attributes;
        return null == t || (0 === t.length || 1 === t.length && "style" === t[0].name)
    }, ma = Re("li"), pa = function(t) {
        return gn(t).bind(function(t) {
            return Ln(t) && 0 === Ir(t).trim().length ? pa(t) : ma(t) ? G.some(t) : G.none()
        })
    }, ga = Ar(In, "comment"), va = function(t) {
        return ga.get(t)
    }, g = function(e) {
        return function(t) {
            return wo(t, e)
        }
    }, K = function(e) {
        return function(t) {
            return Pe(t) === e
        }
    }, ha = Di({
        tags: [{
            name: Ji.pattern(/^([OVWXP]|U[0-9]+|ST[0-9]+):/i, Ji.caseInsensitive)
        }]
    }), ya = rr({
        attributes: [{
            name: Ji.exact("id", Ji.caseInsensitive),
            value: Ji.starts("docs-internal-guid", Ji.caseInsensitive)
        }]
    }), ba = [Ci([t])], xa = rr({
        attributes: [{
            name: Ji.pattern(/^v:/, Ji.caseInsensitive)
        }, {
            name: Ji.exact("href", Ji.caseInsensitive),
            value: Ji.contains("#_toc", Ji.caseInsensitive)
        }, {
            name: Ji.exact("href", Ji.caseInsensitive),
            value: Ji.contains("#_mso", Ji.caseInsensitive)
        }, {
            name: Ji.pattern(/^xmlns(:|$)/, Ji.caseInsensitive)
        }, {
            name: Ji.exact("type", Ji.caseInsensitive),
            condition: function(t) {
                return "ol" === Pe(t) || "ul" === Pe(t)
            }
        }]
    }), Ta = rr({
        tags: [{
            name: Ji.exact("script", Ji.caseInsensitive)
        }, {
            name: Ji.exact("link", Ji.caseInsensitive)
        }, {
            name: Ji.exact("style", Ji.caseInsensitive),
            condition: function(t) {
                return 0 === so(t).length
            }
        }],
        attributes: [{
            name: Ji.starts("on", Ji.caseInsensitive)
        }, {
            name: Ji.exact('"', Ji.caseInsensitive)
        }, {
            name: Ji.exact("lang", Ji.caseInsensitive)
        }, {
            name: Ji.exact("language", Ji.caseInsensitive)
        }],
        styles: [{
            name: Ji.all(),
            value: Ji.pattern(/OLE_LINK/i, Ji.caseInsensitive)
        }]
    }), wa = rr({
        tags: [{
            name: Ji.exact("meta", Ji.caseInsensitive)
        }]
    }), Ea = rr({
        tags: [{
            name: Ji.exact("style", Ji.caseInsensitive)
        }]
    }), Sa = rr({
        styles: [{
            name: Ji.not(Ji.pattern(/^(width|height|list-style-type)$/, Ji.caseInsensitive)),
            condition: function(t) {
                return !wo(t, "ephox-limbo-transform")
            }
        }, {
            name: Ji.pattern(/^(width|height)$/, Ji.caseInsensitive),
            condition: function(t) {
                return "img" !== Pe(t) && !Wu(t)
            }
        }]
    }), Aa = rr({
        styles: [{
            name: Ji.exact("height", Ji.caseInsensitive),
            condition: K("td")
        }, {
            name: Ji.exact("width", Ji.caseInsensitive),
            condition: K("tr")
        }, {
            name: Ji.exact("height", Ji.caseInsensitive),
            condition: K("col")
        }]
    }), Ia = rr({
        classes: [{
            name: Ji.not(Ji.exact("rtf-data-image", Ji.caseInsensitive))
        }]
    }), _a = rr({
        styles: [{
            name: Ji.pattern(/^(mso-.*|tab-stops|tab-interval|language|text-underline|text-effect|text-line-through|font-color|horiz-align|list-image-[0-9]+|separator-image|table-border-color-(dark|light)|vert-align|vnd\..*)$/, Ji.caseInsensitive)
        }]
    }), La = rr({
        classes: [{
            name: Ji.pattern(/mso/i, Ji.caseInsensitive)
        }]
    }), Oa = Di({
        tags: [{
            name: Ji.exact("img", Ji.caseInsensitive),
            condition: function(t) {
                t = Cn(t, "src");
                return J(t) && /^file:/.test(t)
            }
        }]
    }), Da = Di({
        tags: [{
            name: Ji.exact("a", Ji.caseInsensitive),
            condition: da
        }]
    }), Na = rr({
        attributes: [{
            name: Ji.exact("style", Ji.caseInsensitive),
            value: Ji.exact("", Ji.caseInsensitive)
        }]
    }), Ca = rr({
        attributes: [{
            name: Ji.exact("class", Ji.caseInsensitive),
            value: Ji.exact("", Ji.caseInsensitive)
        }]
    }), Pa = Di({
        tags: [{
            name: Ji.pattern(/^(font|em|strong|samp|acronym|cite|code|dfn|kbd|tt|b|i|u|s|sub|sup|ins|del|var|span)$/, Ji.caseInsensitive),
            condition: (Ju = function(t) {
                return !da(t) || (n = null != (n = (e = t).dom.attributes) && 0 < n.length,
                ("span" !== Pe(e) || n) && mo(t, function(t) {
                    var e = !da(t)
                      , n = !S(["font", "em", "strong", "samp", "acronym", "cite", "code", "dfn", "kbd", "tt", "b", "i", "u", "s", "sub", "sup", "ins", "del", "var", "span"], Pe(t));
                    return Ln(t) || e || n
                }));
                var e, n
            }
            ,
            function(t) {
                return !Ju(t)
            }
            )
        }]
    }), ka = Di({
        tags: [{
            name: Ji.exact("p", Ji.caseInsensitive),
            condition: (Zu = "li",
            function(t) {
                return mn(t).exists(function(t) {
                    return Pe(t) === Zu && 1 === Er(t).length
                })
            }
            )
        }]
    }), Ra = Ni({
        tags: [{
            name: Ji.exact("p", Ji.caseInsensitive),
            mutate: function(t) {
                0 === so(t).length && Bo(t, kn.fromTag("br"))
            }
        }]
    }), Ma = Ni({
        tags: [{
            name: Ji.pattern(/ol|ul/, Ji.caseInsensitive),
            mutate: function(e) {
                mn(e).each(function(t) {
                    t = Pe(t);
                    S(["ol", "ul"], t) && pa(e).fold(function() {
                        var t = kn.fromTag("li");
                        ro(t, "list-style-type", "none"),
                        $r(e, t)
                    }, function(t) {
                        Bo(t, e)
                    })
                })
            }
        }]
    }), Fa = rr({
        classes: [{
            name: Ji.exact("ephox-limbo-transform", Ji.caseInsensitive)
        }]
    }), ja = rr({
        tags: [{
            name: Ji.exact("br", Ji.caseInsensitive),
            condition: g("Apple-interchange-newline")
        }]
    }), Ua = rr({
        styles: [{
            name: Ji.pattern(/^-/, Ji.caseInsensitive)
        }, {
            name: Ji.all(),
            value: Ji.exact("initial", Ji.caseInsensitive)
        }, {
            name: Ji.exact("background-color", Ji.caseInsensitive),
            value: Ji.exact("transparent", Ji.caseInsensitive)
        }, {
            name: Ji.exact("font-style", Ji.caseInsensitive),
            value: Ji.exact("normal", Ji.caseInsensitive)
        }, {
            name: Ji.pattern(/font-variant.*/, Ji.caseInsensitive)
        }, {
            name: Ji.exact("letter-spacing", Ji.caseInsensitive)
        }, {
            name: Ji.exact("font-weight", Ji.caseInsensitive),
            value: Ji.pattern(/400|normal/, Ji.caseInsensitive)
        }, {
            name: Ji.exact("orphans", Ji.caseInsensitive)
        }, {
            name: Ji.exact("text-decoration", Ji.caseInsensitive),
            value: Ji.exact("none", Ji.caseInsensitive)
        }, {
            name: Ji.exact("text-size-adjust", Ji.caseInsensitive)
        }, {
            name: Ji.exact("text-indent", Ji.caseInsensitive),
            value: Ji.exact("0px", Ji.caseInsensitive)
        }, {
            name: Ji.exact("text-transform", Ji.caseInsensitive),
            value: Ji.exact("none", Ji.caseInsensitive)
        }, {
            name: Ji.exact("white-space", Ji.caseInsensitive),
            value: Ji.exact("normal", Ji.caseInsensitive)
        }, {
            name: Ji.exact("widows", Ji.caseInsensitive)
        }, {
            name: Ji.exact("word-spacing", Ji.caseInsensitive),
            value: Ji.exact("0px", Ji.caseInsensitive)
        }, {
            name: Ji.exact("text-align", Ji.caseInsensitive),
            value: Ji.pattern(/start|end/, Ji.caseInsensitive)
        }, {
            name: Ji.exact("font-weight", Ji.caseInsensitive),
            value: Ji.pattern(/700|bold/, Ji.caseInsensitive),
            condition: function(t) {
                return /^h\d$/.test(Pe(t))
            }
        }]
    }), Ha = (Qu = Ba(gn, Rt),
    ta = Ba(vn, kt),
    Ni({
        tags: [{
            name: Ji.exact("span", Ji.caseInsensitive),
            condition: g("Apple-converted-space"),
            mutate: function(t) {
                "\xa0" === Ou(t) && (Qu(t) || ta(t) ? Xr(t) : (Ho(t, kn.fromText(" ")),
                Wo(t)))
            }
        }]
    }));
    function Ba(t, n) {
        return function(e) {
            return t(e).filter(function(t) {
                return Ln(e) && n(Ou(t) || "", " ")
            }).isSome()
        }
    }
    var Wa, za = (Wa = /^file:\/\/\/[^#]+(#[^#]+)$/,
    Ni({
        tags: [{
            name: Ji.exact("a", Ji.caseInsensitive),
            condition: function(t) {
                t = Cn(t, "href");
                return !!t && Wa.test(t)
            },
            mutate: function(e) {
                je(e, "href").each(function(t) {
                    Nn(e, "href", t.replace(Wa, "$1"))
                })
            }
        }]
    })), Ya = rr({
        attributes: [{
            name: Ji.exact("href", Ji.caseInsensitive),
            value: Ji.starts("file:///", Ji.caseInsensitive)
        }]
    }), qa = Ni({
        tags: [$a("a", "data-ephox-href", "href"), $a("img", "data-ephox-src", "src")]
    });
    function $a(t, n, r) {
        return {
            name: Ji.exact(t, Ji.caseInsensitive),
            condition: function(t) {
                return Ue(t, n)
            },
            mutate: function(e) {
                je(e, n).each(function(t) {
                    Nn(e, r, t),
                    He(e, n)
                })
            }
        }
    }
    function Va(i) {
        var u = ["table", "thead", "tbody", "tfoot", "th", "tr", "td", "ul", "ol", "li"]
          , t = Mo(i, In)
          , e = _(t, function(t) {
            return Pt(va(t), "StartFragment")
        })
          , n = _(t, function(t) {
            return Pt(va(t), "EndFragment")
        });
        e.each(function(o) {
            n.each(function(t) {
                for (var e = o, n = [], r = function(t, e, n, r) {
                    r = Mr(t, e, n, r);
                    return kn.fromDom(r.commonAncestorContainer)
                }(o, 0, t, 0); void 0 !== r && !on(r, i); )
                    S(u, Pe(r)) ? e = r : n.push(r),
                    r = mn(r).getOrUndefined();
                ct(n, Xr),
                ct(hn(e), Wo)
            }),
            Wo(o)
        }),
        n.each(Wo)
    }
    function Ga(t, e) {
        return t = t,
        Lr.getOption(t).exists(function(t) {
            return 0 === e(t).length
        })
    }
    function Ka(t) {
        return t.browser.isIE() && 11 <= t.browser.version.major
    }
    function Xa(n, i) {
        return ki(function(t, e) {
            var r, o, e = (r = e,
            o = i,
            n(kn.fromDom(r.getNode())).fold(function() {
                return [r]
            }, function(t) {
                var e = r.type() === tu
                  , n = [Ai(t.dom, e)];
                return !e && o && n.push(Ai(t.dom, !0)),
                n
            }));
            t.emitTokens(e)
        }, y)
    }
    function Ja(t, e, n, r) {
        var o = [ec, _a, La]
          , r = [ec, Sa, function(t) {
            void 0 === t && (t = []);
            t = at(t, function(t) {
                return {
                    name: Ji.exact(t, Ji.caseInsensitive)
                }
            });
            return Di({
                tags: t
            })
        }(r.cleanFilteredInlineElements), Ia];
        return e ? o : r
    }
    function Za(t) {
        return void 0 === t && (t = []),
        [nc, rc, (e = t,
        t = [{
            name: "b",
            transform: {
                mutate: p(Hu, "strong")
            }
        }, {
            name: "i",
            transform: {
                mutate: p(Hu, "em")
            }
        }, {
            name: "u",
            transform: {
                mutate: zu
            }
        }, {
            name: "s",
            transform: {
                mutate: p(Hu, "strike")
            }
        }, {
            name: "font",
            transform: {
                mutate: Bu,
                debug: !0
            }
        }],
        t = st(t, function(t) {
            return !S(e, t.name)
        }).map(function(t) {
            return jt({
                name: Ji.exact(t.name, Ji.caseInsensitive)
            }, t.transform)
        }),
        Ni({
            tags: t
        }))];
        var e
    }
    function Qa(t, e, n, r) {
        var o, i, u, a, c = (o = t,
        a = (i = n).browser.isFirefox() || i.browser.isEdge(),
        u = a ? hi : vi,
        c = !a,
        c = Ka(i) ? oc : Ci([Xa(u, c)]),
        {
            annotate: [o ? c : oc],
            local: [a ? oc : Oa]
        });
        return O([c.local, (a = t,
        Ka(n) || !a ? [] : [la]), c.annotate, Za(e ? [] : r.cleanFilteredInlineElements), function(t, e) {
            if (!t)
                return [oc];
            t = [ha],
            e = Ka(e) ? [] : ba;
            return t.concat(e).concat([xa])
        }(t, n), [ya], [Ma], [Ta], [wa], Ja(0, e, 0, r), [za, Ya, Da, qa], [Na], [Ca], [Pa], [ja], !t && e ? [Ua] : [], [Ha], [Ra], (e = t,
        Ka(n) && e ? [ka] : []), t ? [Aa, tc] : [], [Fa], [Ea]])
    }
    var tc = rr({
        attributes: [{
            name: Ji.pattern(/^(width|height)$/, Ji.caseInsensitive),
            condition: Wu
        }]
    })
      , ec = Ni({
        tags: [{
            name: Ji.exact("p", Ji.caseInsensitive),
            mutate: function(e) {
                je(e, "align").each(function(t) {
                    He(e, "align"),
                    uo(e, "text-align").fold(function() {
                        return ro(e, "text-align", t)
                    }, y)
                })
            }
        }]
    })
      , nc = rr({
        tags: [{
            name: Ji.exact("font", Ji.caseInsensitive),
            condition: function(t) {
                function e(t) {
                    return t.replace(/[ \r\n\uFEFF]+/g, "")
                }
                t = Er(t);
                return 0 === t.length || D(t, function(t) {
                    return Ga(t, e)
                })
            }
        }]
    })
      , X = function(t) {
        return ct(Er(t), function(t) {
            Ga(t, Mt) && Wo(t)
        })
    }
      , rc = Ni({
        tags: [{
            name: Ji.exact("ol", Ji.caseInsensitive),
            mutate: X
        }, {
            name: Ji.exact("ul", Ji.caseInsensitive),
            mutate: X
        }]
    })
      , oc = y
      , ic = ["body", "p", "div", "article", "aside", "figcaption", "figure", "footer", "header", "nav", "section", "ol", "ul", "li", "table", "thead", "tbody", "tfoot", "caption", "tr", "td", "th", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "address"];
    function uc(t, e) {
        return L(t, function(t) {
            return t.start === e
        })
    }
    function ac(t, e, n) {
        var r;
        return e = e = n(t, e),
        r = t.start,
        at(e, function(t) {
            return jt(jt({}, t), {
                start: t.start + r,
                finish: t.finish + r
            })
        })
    }
    function cc(t, e, n) {
        return {
            element: t,
            start: e,
            finish: n
        }
    }
    function sc(r, t, e) {
        var n = ft(e, function(t) {
            return [t.start, t.finish]
        })
          , o = wc(t, n, function(t, e) {
            return function(r, t, e) {
                var n = r.property().getText(t)
                  , o = st(Mc(n, e), function(t) {
                    return 0 < t.length
                });
                if (o.length <= 1)
                    return [cc(t, 0, n.length)];
                r.property().setText(t, o[0]);
                e = Tc(o.slice(1), function(t, e) {
                    var n = r.create().text(t)
                      , t = cc(n, e, e + t.length);
                    return G.some(t)
                }, o[0].length),
                n = at(e, function(t) {
                    return t.element
                });
                return r.insert().afterAll(t, n),
                [cc(t, 0, o[0].length)].concat(e)
            }(r, t.element, e)
        });
        return at(e, function(t) {
            var e = Ec(o, t.start, t.finish)
              , n = at(e, function(t) {
                return t.element
            })
              , e = at(n, r.property().getText).join("");
            return {
                elements: n,
                word: t.word,
                exact: e
            }
        })
    }
    function fc(t) {
        var e, n = {
            word: "__INTERNAL__",
            pattern: xc(Uc)
        };
        return Fc(jc, t, [n], e)
    }
    function lc(t) {
        return !Ao(t, "a", e).isSome();
        var e
    }
    function dc(t) {
        t = fc(t),
        ct(t, function(t) {
            var n, e = t.exact;
            (e.indexOf("@") < 0 || Hc(e)) && (n = t.elements,
            G.from(n[0]).filter(lc).map(function(t) {
                var e = kn.fromTag("a");
                return Ho(t, e),
                Gr(e, n),
                Nn(e, "href", Ou(e)),
                e
            }))
        })
    }
    function mc(t) {
        ct(t, function(t) {
            _n(t) && uo(t, "position").isSome() && ao(t, "position")
        })
    }
    function pc(t) {
        var e, n, r = st(t, Re("li"));
        0 < r.length && (e = hn(r[0]),
        n = kn.fromTag("ul"),
        Ho(t[0], n),
        0 < e.length && (t = kn.fromTag("li"),
        Bo(n, t),
        Gr(t, e)),
        Gr(n, r))
    }
    function gc(t) {
        var e = Er(t);
        ct([dc, mc, pc], function(t) {
            t(e)
        })
    }
    function vc(t, e) {
        return mo(t, function(t) {
            return _n(t) && je(t, "style").exists(function(t) {
                return -1 < t.indexOf("mso-")
            })
        })
    }
    function hc(t, e) {
        return t = so(t),
        e = e,
        0 <= (t = t).indexOf("<o:p>") || e.browser.isEdge() && 0 <= t.indexOf('v:shapes="') || e.browser.isEdge() && 0 <= t.indexOf("mso-") || 0 <= t.indexOf("mso-list") || 0 <= t.indexOf("p.MsoNormal, li.MsoNormal, div.MsoNormal") || 0 <= t.indexOf("MsoListParagraphCxSpFirst") || 0 <= t.indexOf("<w:WordDocument>")
    }
    function yc(t, e) {
        return t ? G.some(e) : G.none()
    }
    function bc(t) {
        return void 0 !== t && void 0 !== t.types && null !== t.types
    }
    var xc = function(t) {
        return e = t,
        n = l(0),
        t = l(0),
        r = G.none(),
        {
            term: function() {
                return new RegExp(e,r.getOr("g"))
            },
            prefix: n,
            suffix: t
        };
        var e, n, r
    }
      , Tc = function(t, n, e) {
        return void 0 === e && (e = 0),
        I(t, function(e, t) {
            return n(t, e.len).fold(l(e), function(t) {
                return {
                    len: t.finish,
                    list: e.list.concat([t])
                }
            })
        }, {
            len: e,
            list: []
        }).list
    }
      , wc = function(t, e, n) {
        return 0 === e.length ? t : ft(t, function(r) {
            var t = ft(e, function(t) {
                return (n = t) >= (e = r).start && n <= e.finish ? [t - r.start] : [];
                var e, n
            });
            return 0 < t.length ? ac(r, t, n) : [r]
        })
    }
      , Ec = function(r, t, o) {
        var t = uc(r, t)
          , i = uc(r, o);
        return t.bind(function(t) {
            var e, n, e = i.getOr((n = o,
            (e = r)[e.length - 1] && e[e.length - 1].finish === n ? e.length + 1 : -1));
            return -1 < e ? G.some(r.slice(t, e)) : G.none()
        }).getOr([])
    }
      , Sc = function(n, t) {
        return function(t) {
            t = Array.prototype.slice.call(t, 0);
            return t.sort(function(t, e) {
                return t.start < e.start ? -1 : e.start < t.start ? 1 : 0
            }),
            t
        }(ft(t, function(e) {
            var t = function(t, e) {
                for (var n = e.term(), r = [], o = n.exec(t); o; ) {
                    var i = o.index + e.prefix(o)
                      , u = o[0].length - e.prefix(o) - e.suffix(o);
                    r.push({
                        start: i,
                        finish: i + u
                    }),
                    n.lastIndex = i + u,
                    o = n.exec(t)
                }
                return r
            }(n, e.pattern);
            return at(t, function(t) {
                return jt(jt({}, e), t)
            })
        }))
    }
      , Ht = Ut([{
        include: ["item"]
    }, {
        excludeWith: ["item"]
    }, {
        excludeWithout: ["item"]
    }])
      , Ac = {
        include: Ht.include,
        excludeWith: Ht.excludeWith,
        excludeWithout: Ht.excludeWithout,
        cata: function(t, e, n, r) {
            return t.fold(e, n, r)
        }
    }
      , Ic = function(t, n) {
        var r = []
          , o = [];
        return ct(t, function(t) {
            var e = n(t);
            Ac.cata(e, function() {
                o.push(t)
            }, function() {
                0 < o.length && r.push(o),
                r.push([t]),
                o = []
            }, function() {
                0 < o.length && r.push(o),
                o = []
            })
        }),
        0 < o.length && r.push(o),
        r
    }
      , zt = Ut([{
        boundary: ["item", "universe"]
    }, {
        empty: ["item", "universe"]
    }, {
        text: ["item", "universe"]
    }, {
        nonEditable: ["item", "universe"]
    }])
      , _c = d
      , Lc = m
      , Oc = l(0)
      , Dc = l(1)
      , Wt = function(t) {
        return jt(jt({}, t), {
            isBoundary: function() {
                return t.fold(Lc, _c, _c, _c)
            },
            toText: function() {
                return t.fold(G.none, G.none, function(t) {
                    return G.some(t)
                }, G.none)
            },
            is: function(n) {
                return t.fold(_c, _c, function(t, e) {
                    return e.eq(t, n)
                }, _c)
            },
            len: function() {
                return t.fold(Oc, Dc, function(t, e) {
                    return e.property().getText(t).length
                }, Dc)
            }
        })
    }
      , Nc = {
        text: i(Wt, zt.text),
        boundary: i(Wt, zt.boundary),
        empty: i(Wt, zt.empty),
        nonEditable: i(Wt, zt.empty),
        cata: function(t, e, n, r, o) {
            return t.fold(e, n, r, o)
        }
    }
      , Cc = l([])
      , Pc = function(e, t, n) {
        if (e.property().isText(t))
            return [Nc.text(t, e)];
        if (e.property().isEmptyTag(t))
            return [Nc.empty(t, e)];
        if (e.property().isNonEditable(t))
            return [];
        if (e.property().isElement(t)) {
            var r = e.property().children(t)
              , o = e.property().isBoundary(t) ? [Nc.boundary(t, e)] : []
              , r = void 0 !== n && n(t) ? [] : ft(r, function(t) {
                return Pc(e, t, n)
            });
            return o.concat(r).concat(o)
        }
        return []
    }
      , kc = Pc
      , Rc = function(e, t, n) {
        t = ft(t, function(t) {
            return kc(e, t, n)
        }),
        t = Ic(t, function(t) {
            return t.match({
                boundary: function() {
                    return Ac.excludeWithout(t)
                },
                empty: function() {
                    return Ac.excludeWith(t)
                },
                text: function() {
                    return Ac.include(t)
                },
                nonEditable: function() {
                    return Ac.excludeWithout(t)
                }
            })
        });
        return st(t, function(t) {
            return 0 < t.length
        })
    }
      , Mc = function(r, t) {
        if (0 === t.length)
            return [r];
        var e = I(t, function(t, e) {
            if (0 === e)
                return t;
            var n = r.substring(t.prev, e);
            return {
                prev: e,
                values: t.values.concat([n])
            }
        }, {
            prev: 0,
            values: []
        })
          , t = t[t.length - 1];
        return t < r.length ? e.values.concat(r.substring(t)) : e.values
    }
      , Fc = function(n, t, o, e) {
        e = Rc(n, t, e);
        return ft(e, function(t) {
            var r, e = ft(t, function(t) {
                return t.fold(Cc, Cc, function(t) {
                    return [t]
                }, Cc)
            }), t = at(e, n.property().getText).join(""), t = Sc(t, o), e = (r = n,
            Tc(e, function(t, e) {
                var n = e + r.property().getText(t).length;
                return G.from(cc(t, e, n))
            }));
            return sc(n, e, t)
        })
    }
      , jc = {
        up: l({
            selector: So,
            closest: Ao,
            predicate: Nr,
            all: pn
        }),
        down: l({
            selector: kr,
            predicate: Mo
        }),
        styles: l({
            get: io,
            getRaw: uo,
            set: ro,
            remove: ao
        }),
        attrs: l({
            get: Cn,
            set: Nn,
            remove: He,
            copyTo: function(t, e) {
                t = I(t.dom.attributes, function(t, e) {
                    return t[e.name] = e.value,
                    t
                }, {});
                Fe(e, t)
            }
        }),
        insert: l({
            before: Ho,
            after: Yr,
            afterAll: Vr,
            append: Bo,
            appendAll: Gr,
            prepend: qr,
            wrap: $r
        }),
        remove: l({
            unwrap: Xr,
            remove: Wo
        }),
        create: l({
            nu: kn.fromTag,
            clone: function(t) {
                return kn.fromDom(t.dom.cloneNode(!1))
            },
            text: kn.fromText
        }),
        query: l({
            comparePosition: function(t, e) {
                return t.dom.compareDocumentPosition(e.dom)
            },
            prevSibling: gn,
            nextSibling: vn
        }),
        property: l({
            children: Er,
            name: Pe,
            parent: mn,
            document: function(t) {
                return ln(t).dom
            },
            isText: Ln,
            isComment: In,
            isElement: _n,
            getText: Ir,
            setText: _r,
            isBoundary: function(t) {
                return !!_n(t) && ("body" === Pe(t) || S(ic, Pe(t)))
            },
            isEmptyTag: function(t) {
                return !!_n(t) && S(["br", "img", "hr", "input"], Pe(t))
            },
            isNonEditable: function(t) {
                return _n(t) && "false" === Cn(t, "contenteditable")
            }
        }),
        eq: on,
        is: Tr
    }
      , Uc = /(?:(?:[A-Za-z]{3,9}:(?:\/\/))(?:[-.~*+=!&;:'%@?^${}(),\w]+@)?[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*|(?:www\.|[-;:&=+$,.\w]+@)[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*)(?::[0-9]+)?(?:\/[-+~=%.()\/\w]*)?(?:\?(?:[-.~*+=!&;:'%@?^${}(),\/\w]+))?(?:#(?:[-.~*+=!&;:'%@?^${}(),\/\w]+))?/g.source
      , Hc = function(t) {
        t = t.indexOf("://");
        return 3 <= t && t <= 9
    }
      , Bc = function(t, e) {
        return Pi(t, e, [wa, qa])
    }
      , Rn = {
        disabled: function() {
            return {
                discriminator: "disabled",
                data: {}
            }
        },
        fromClipboard: function(t) {
            return {
                discriminator: "fromClipboard",
                data: {
                    rtf: t
                }
            }
        }
    }
      , Wc = Ot(Rn)
      , zc = Rn.disabled
      , Yc = Rn.fromClipboard
      , qc = function(t, e) {
        var n = new RegExp(e,"i");
        return P(t, function(t) {
            return yc(null !== t.match(n), {
                type: t,
                flavor: e
            })
        })
    };
    var $c, Vc = Object.hasOwnProperty, Gc = Object.setPrototypeOf, Kc = Object.isFrozen, Xc = Object.freeze, er = Object.seal, Jc = Object.create, nr = "undefined" != typeof Reflect && Reflect, Zc = (Zc = nr.apply) || function(t, e, n) {
        return t.apply(e, n)
    }
    , Xc = Xc || function(t) {
        return t
    }
    , er = er || function(t) {
        return t
    }
    , Qc = (Qc = nr.construct) || function(t, e) {
        return new (Function.prototype.bind.apply(t, [null].concat(function(t) {
            if (Array.isArray(t)) {
                for (var e = 0, n = Array(t.length); e < t.length; e++)
                    n[e] = t[e];
                return n
            }
            return Array.from(t)
        }(e))))
    }
    , ts = fs(Array.prototype.forEach), es = fs(Array.prototype.pop), ns = fs(Array.prototype.push), rs = fs(String.prototype.toLowerCase), os = fs(String.prototype.match), is = fs(String.prototype.replace), us = fs(String.prototype.indexOf), as = fs(String.prototype.trim), cs = fs(RegExp.prototype.test), ss = ($c = TypeError,
    function() {
        for (var t = arguments.length, e = Array(t), n = 0; n < t; n++)
            e[n] = arguments[n];
        return Qc($c, e)
    }
    );
    function fs(o) {
        return function(t) {
            for (var e = arguments.length, n = Array(1 < e ? e - 1 : 0), r = 1; r < e; r++)
                n[r - 1] = arguments[r];
            return Zc(o, t, n)
        }
    }
    function ls(t, e) {
        Gc && Gc(t, null);
        for (var n = e.length; n--; ) {
            var r, o = e[n];
            "string" != typeof o || (r = rs(o)) !== o && (Kc(e) || (e[n] = r),
            o = r),
            t[o] = !0
        }
        return t
    }
    function ds(t) {
        var e = Jc(null)
          , n = void 0;
        for (n in t)
            Zc(Vc, t, [n]) && (e[n] = t[n]);
        return e
    }
    var ms = Xc(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"])
      , ps = Xc(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "audio", "canvas", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "video", "view", "vkern"])
      , gs = Xc(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"])
      , vs = Xc(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover"])
      , hs = Xc(["#text"])
      , ys = Xc(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns"])
      , bs = Xc(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"])
      , xs = Xc(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"])
      , Ts = Xc(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"])
      , ws = er(/\{\{[\s\S]*|[\s\S]*\}\}/gm)
      , Es = er(/<%[\s\S]*|[\s\S]*%>/gm)
      , Ss = er(/^data-[\-\w.\u00B7-\uFFFF]/)
      , As = er(/^aria-[\-\w]+$/)
      , Is = er(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i)
      , _s = er(/^(?:\w+script|data):/i)
      , Ls = er(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g)
      , Os = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    }
    : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }
    ;
    function Ds(t) {
        if (Array.isArray(t)) {
            for (var e = 0, n = Array(t.length); e < t.length; e++)
                n[e] = t[e];
            return n
        }
        return Array.from(t)
    }
    var Ns = function() {
        return "undefined" == typeof window ? null : window
    }
      , Cs = function(t, e) {
        if ("object" !== (void 0 === t ? "undefined" : Os(t)) || "function" != typeof t.createPolicy)
            return null;
        var n = null
          , r = "data-tt-policy-suffix";
        e.currentScript && e.currentScript.hasAttribute(r) && (n = e.currentScript.getAttribute(r));
        var o = "dompurify" + (n ? "#" + n : "");
        try {
            return t.createPolicy(o, {
                createHTML: function(t) {
                    return t
                }
            })
        } catch (t) {
            return console.warn("TrustedTypes policy " + o + " could not be created."),
            null
        }
    };
    function Ps(t, e) {
        ef.addHook("uponSanitizeElement", function(t, e) {
            S(nf, e.tagName) || Ct(e.allowedTags, e.tagName) || (e.allowedTags[e.tagName] = !0)
        }),
        ef.addHook("uponSanitizeAttribute", function(t, e) {
            0 === e.attrName.indexOf("on") || Ct(e.allowedAttributes, e.attrName) || (e.allowedAttributes[e.attrName] = !0),
            e.attrValue && -1 !== e.attrValue.indexOf("\n") && (e.attrValue = e.attrValue.replace(/\r?\n/g, ""))
        });
        var n = kt(Mt(t), "<!")
          , r = n ? "<body>" + t + "</body>" : t.replace(/^[\S\s]*?(<!DOCTYPE|<html)/i, "$1")
          , t = ef.sanitize(r, {
            ALLOW_UNKNOWN_PROTOCOLS: !0,
            FORBID_TAGS: nf,
            WHOLE_DOCUMENT: -1 !== t.lastIndexOf("</html>")
        });
        return ef.removeHook("uponSanitizeElement"),
        ef.removeHook("uponSanitizeAttribute"),
        n ? B(H(t, "<body>"), "</body>") : t
    }
    function ks(n) {
        return {
            sanitizeHtml: function(t, e) {
                return n(t) ? t : Ps(t)
            },
            sanitizeText: u
        }
    }
    function Rs(t) {
        return Pt(e = t, "<html") && (Pt(e, 'xmlns:o="urn:schemas-microsoft-com:office:office"') || Pt(e, 'xmlns:x="urn:schemas-microsoft-com:office:excel"')) || Pt(t, 'meta name="ProgId" content="Word.Document"');
        var e
    }
    function Ms(t) {
        return Pt(t, "<meta") && Pt(t, 'id="docs-internal-guid')
    }
    function Fs(t) {
        return 0 < t.length
    }
    function js(e, t) {
        return qc(e.types, t).map(function(t) {
            return e.getData(t.type)
        }).filter(Fs)
    }
    function Us(t) {
        return js(t, "html")
    }
    function Hs(t) {
        return Us(t).filter(Ms)
    }
    function Bs(t) {
        return vf ? G.from(t.clipboardData).filter(bc) : G.none()
    }
    function Ws(t) {
        var e, n, r = kn.fromTag("div"), o = (e = fn(r),
        Pi(e, t, [Va]));
        return n = o,
        t = fn(e = r).dom,
        o = kn.fromDom(t.createDocumentFragment()),
        t = co(n, t),
        Gr(o, t),
        Kr(e),
        Bo(e, o),
        uf({
            container: r
        })
    }
    function zs(t, n) {
        function e(r) {
            return void 0 === r.items ? G.none() : (t = hf,
            e = r.types,
            P(t, function(t) {
                return qc(e, t)
            }).map(function(t) {
                for (var e = [], n = 0; n < r.items.length; n++)
                    e.push(r.items[n]);
                return af({
                    images: e
                })
            }));
            var t, e
        }
        function r(e) {
            return P(e.types, function(t) {
                return "text/plain" === t ? G.some(e.getData(t)).map(function(t) {
                    return sf({
                        text: n.sanitizeText(t)
                    })
                }) : G.none()
            })
        }
        return void 0 === n && (n = rf),
        {
            getWordData: function() {
                return Bs(t).bind(function(n) {
                    return Us(n).filter(Rs).map(function(t) {
                        var e = js(n, "rtf");
                        return cf({
                            html: t,
                            rtf: e.fold(function() {
                                return zc()
                            }, function(t) {
                                return Yc(t)
                            })
                        })
                    })
                })
            },
            getGoogleDocsData: function() {
                return Bs(t).bind(Hs).map(function(t) {
                    return n.sanitizeHtml(t, "googledocs")
                }).map(Ws)
            },
            getImage: function() {
                return Bs(t).bind(e)
            },
            getText: function() {
                return Bs(t).fold(function() {
                    var t = window.clipboardData;
                    return void 0 !== t ? G.some(sf({
                        text: n.sanitizeText(t.getData("text"))
                    })) : G.none()
                }, r)
            },
            getHtml: function() {
                return Bs(t).bind(Us).map(n.sanitizeHtml).map(Ws)
            },
            getOnlyText: function() {
                return Bs(t).bind(function(t) {
                    return e = t.types,
                    n = "text/plain",
                    1 === e.length && e[0] === n ? r(t) : G.none();
                    var e, n
                })
            },
            getNative: function() {
                return of({
                    nativeEvent: t
                })
            },
            getVoid: function() {
                return ff({})
            }
        }
    }
    function Ys(t) {
        return at(t, function(t) {
            return t.asset
        })
    }
    function qs() {
        var e = G.none();
        return {
            convert: function(t) {
                e = function(n) {
                    var t, e = Ne("window.clipboardData.files"), r = void 0 !== (t = n).convertURL ? t.convertURL : void 0 !== t.msConvertURL ? t.msConvertURL : void 0;
                    if (void 0 !== e && void 0 !== r && 0 < e.length) {
                        e = te(e, function(t) {
                            var e = URL.createObjectURL(t);
                            return r.apply(n, [t, "specified", e]),
                            wn(t, e)
                        });
                        return G.some(e)
                    }
                    return G.none()
                }(t)
            },
            listen: function(t) {
                return e.fold(function() {
                    return Zt.nu(function(t) {
                        t([])
                    })
                }, function(t) {
                    return t
                }).get(t)
            },
            clear: function() {
                e = G.none()
            }
        }
    }
    function $s(t, e) {
        return {
            asset: t,
            image: e
        }
    }
    function Vs(t, r) {
        return Bt.cata(t, function(t, e, n) {
            return Nn(r, "src", n),
            !0
        }, d)
    }
    function Gs(t, n) {
        var r = [];
        return ct(t, function(t, e) {
            e = n[e];
            Vs(t, e) && r.push($s(t, e))
        }),
        r
    }
    function Ks(t, e) {
        return {
            futureAsset: t,
            image: e
        }
    }
    function Xs(t) {
        var e = kn.fromTag("div");
        return Gr(e, t),
        kr(e, "img[src]")
    }
    function Js(t) {
        return 0 === t.indexOf("data:") && -1 < t.indexOf("base64")
    }
    function Zs(t) {
        return 0 === t.indexOf("blob:")
    }
    function Qs(t) {
        return je(t, "src").exists(function(t) {
            return Js(t) || Zs(t)
        })
    }
    function tf(t) {
        return ft(Xs(t), function(t) {
            var n, e, r = je(t, "src").getOr("");
            return Js(r) ? (e = t,
            Ae(r).map(function(t) {
                return Ks(De(t), e)
            }).toArray()) : Zs(r) ? (n = t,
            Ee(r).map(function(t) {
                var e = Zt.nu(function(e) {
                    t.then(function(t) {
                        De(t).get(e)
                    })
                });
                return Ks(e, n)
            }).toArray()) : []
        })
    }
    var ef = function e(t) {
        function s(t) {
            return e(t)
        }
        var a = 0 < arguments.length && void 0 !== t ? t : Ns();
        if (s.version = "2.2.2",
        s.removed = [],
        !a || !a.document || 9 !== a.document.nodeType)
            return s.isSupported = !1,
            s;
        var c = a.document
          , i = a.document
          , f = a.DocumentFragment
          , n = a.HTMLTemplateElement
          , l = a.Node
          , r = a.NodeFilter
          , t = a.NamedNodeMap
          , o = void 0 === t ? a.NamedNodeMap || a.MozNamedAttrMap : t
          , u = a.Text
          , d = a.Comment
          , m = a.DOMParser
          , t = a.trustedTypes;
        "function" != typeof n || (n = i.createElement("template")).content && n.content.ownerDocument && (i = n.content.ownerDocument);
        var p = Cs(t, c)
          , g = p && ot ? p.createHTML("") : ""
          , v = i.implementation
          , h = i.createNodeIterator
          , y = i.getElementsByTagName
          , b = i.createDocumentFragment
          , x = c.importNode
          , T = {};
        try {
            T = ds(i).documentMode ? i.documentMode : {}
        } catch (t) {}
        var w = {};
        s.isSupported = v && void 0 !== v.createHTMLDocument && 9 !== T;
        function E(t) {
            mt && mt === t || (t && "object" === (void 0 === t ? "undefined" : Os(t)) || (t = {}),
            t = ds(t),
            W = "ALLOWED_TAGS"in t ? ls({}, t.ALLOWED_TAGS) : z,
            Y = "ALLOWED_ATTR"in t ? ls({}, t.ALLOWED_ATTR) : q,
            lt = "ADD_URI_SAFE_ATTR"in t ? ls(ds(dt), t.ADD_URI_SAFE_ATTR) : dt,
            st = "ADD_DATA_URI_TAGS"in t ? ls(ds(ft), t.ADD_DATA_URI_TAGS) : ft,
            $ = "FORBID_TAGS"in t ? ls({}, t.FORBID_TAGS) : {},
            V = "FORBID_ATTR"in t ? ls({}, t.FORBID_ATTR) : {},
            k = "USE_PROFILES"in t && t.USE_PROFILES,
            G = !1 !== t.ALLOW_ARIA_ATTR,
            K = !1 !== t.ALLOW_DATA_ATTR,
            X = t.ALLOW_UNKNOWN_PROTOCOLS || !1,
            J = t.SAFE_FOR_TEMPLATES || !1,
            Z = t.WHOLE_DOCUMENT || !1,
            et = t.RETURN_DOM || !1,
            nt = t.RETURN_DOM_FRAGMENT || !1,
            rt = !1 !== t.RETURN_DOM_IMPORT,
            ot = t.RETURN_TRUSTED_TYPE || !1,
            tt = t.FORCE_BODY || !1,
            it = !1 !== t.SANITIZE_DOM,
            ut = !1 !== t.KEEP_CONTENT,
            at = t.IN_PLACE || !1,
            B = t.ALLOWED_URI_REGEXP || B,
            J && (K = !1),
            nt && (et = !0),
            k && (W = ls({}, [].concat(Ds(hs))),
            Y = [],
            !0 === k.html && (ls(W, ms),
            ls(Y, ys)),
            !0 === k.svg && (ls(W, ps),
            ls(Y, bs),
            ls(Y, Ts)),
            !0 === k.svgFilters && (ls(W, gs),
            ls(Y, bs),
            ls(Y, Ts)),
            !0 === k.mathMl && (ls(W, vs),
            ls(Y, xs),
            ls(Y, Ts))),
            t.ADD_TAGS && (W === z && (W = ds(W)),
            ls(W, t.ADD_TAGS)),
            t.ADD_ATTR && (Y === q && (Y = ds(Y)),
            ls(Y, t.ADD_ATTR)),
            t.ADD_URI_SAFE_ATTR && ls(lt, t.ADD_URI_SAFE_ATTR),
            ut && (W["#text"] = !0),
            Z && ls(W, ["html", "head", "body"]),
            W.table && (ls(W, ["tbody"]),
            delete $.tbody),
            Xc && Xc(t),
            mt = t)
        }
        function S(e) {
            ns(s.removed, {
                element: e
            });
            try {
                e.parentNode.removeChild(e)
            } catch (t) {
                e.outerHTML = g
            }
        }
        function A(t, e) {
            try {
                ns(s.removed, {
                    attribute: e.getAttributeNode(t),
                    from: e
                })
            } catch (t) {
                ns(s.removed, {
                    attribute: null,
                    from: e
                })
            }
            e.removeAttribute(t)
        }
        function I(t) {
            var e = void 0
              , n = void 0;
            tt ? t = "<remove></remove>" + t : n = (r = os(t, /^[\r\n\t ]+/)) && r[0];
            var r, o = p ? p.createHTML(t) : t;
            try {
                e = (new m).parseFromString(o, "text/html")
            } catch (t) {}
            return e && e.documentElement || ((r = (e = v.createHTMLDocument("")).body).parentNode.removeChild(r.parentNode.firstElementChild),
            r.outerHTML = o),
            t && n && e.body.insertBefore(i.createTextNode(n), e.body.childNodes[0] || null),
            y.call(e, Z ? "html" : "body")[0]
        }
        function _(t) {
            return h.call(t.ownerDocument || t, t, r.SHOW_ELEMENT | r.SHOW_COMMENT | r.SHOW_TEXT, function() {
                return r.FILTER_ACCEPT
            }, !1)
        }
        function L(t) {
            return "object" === (void 0 === l ? "undefined" : Os(l)) ? t instanceof l : t && "object" === (void 0 === t ? "undefined" : Os(t)) && "number" == typeof t.nodeType && "string" == typeof t.nodeName
        }
        function O(t, e, n) {
            w[t] && ts(w[t], function(t) {
                t.call(s, e, n, mt)
            })
        }
        function D(t) {
            var e;
            if (O("beforeSanitizeElements", t, null),
            !((n = t)instanceof u || n instanceof d || "string" == typeof n.nodeName && "string" == typeof n.textContent && "function" == typeof n.removeChild && n.attributes instanceof o && "function" == typeof n.removeAttribute && "function" == typeof n.setAttribute && "string" == typeof n.namespaceURI))
                return S(t),
                1;
            if (os(t.nodeName, /[\u0080-\uFFFF]/))
                return S(t),
                1;
            var n = rs(t.nodeName);
            if (O("uponSanitizeElement", t, {
                tagName: n,
                allowedTags: W
            }),
            ("svg" === n || "math" === n) && 0 !== t.querySelectorAll("p, br, form, table").length)
                return S(t),
                1;
            if (!L(t.firstElementChild) && (!L(t.content) || !L(t.content.firstElementChild)) && cs(/<[!/\w]/g, t.innerHTML) && cs(/<[!/\w]/g, t.textContent))
                return S(t),
                1;
            if (W[n] && !$[n])
                return "noscript" !== n && "noembed" !== n || !cs(/<\/no(script|embed)/i, t.innerHTML) ? (J && 3 === t.nodeType && (e = t.textContent,
                e = is(e, R, " "),
                e = is(e, M, " "),
                t.textContent !== e && (ns(s.removed, {
                    element: t.cloneNode()
                }),
                t.textContent = e)),
                O("afterSanitizeElements", t, null),
                0) : (S(t),
                1);
            if (ut && !ct[n] && "function" == typeof t.insertAdjacentHTML)
                try {
                    var r = t.innerHTML;
                    t.insertAdjacentHTML("AfterEnd", p ? p.createHTML(r) : r)
                } catch (t) {}
            return S(t),
            1
        }
        function N(t, e, n) {
            if (it && ("id" === e || "name" === e) && (n in i || n in pt))
                return !1;
            if (!(K && cs(F, e) || G && cs(j, e))) {
                if (!Y[e] || V[e])
                    return !1;
                if (!lt[e] && !cs(B, is(n, H, "")) && ("src" !== e && "xlink:href" !== e && "href" !== e || "script" === t || 0 !== us(n, "data:") || !st[t]) && (!X || cs(U, is(n, H, ""))) && n)
                    return !1
            }
            return !0
        }
        function C(t) {
            var e = void 0
              , n = void 0;
            O("beforeSanitizeAttributes", t, null);
            var r = t.attributes;
            if (r) {
                for (var o = {
                    attrName: "",
                    attrValue: "",
                    keepAttr: !0,
                    allowedAttributes: Y
                }, n = r.length; n--; ) {
                    var i = (c = r[n]).name
                      , u = c.namespaceURI
                      , e = as(c.value)
                      , a = rs(i);
                    if (o.attrName = a,
                    o.attrValue = e,
                    o.keepAttr = !0,
                    o.forceKeepAttr = void 0,
                    O("uponSanitizeAttribute", t, o),
                    e = o.attrValue,
                    !o.forceKeepAttr && (A(i, t),
                    o.keepAttr))
                        if (cs(/\/>/i, e))
                            A(i, t);
                        else {
                            J && (e = is(e, R, " "),
                            e = is(e, M, " "));
                            var c = t.nodeName.toLowerCase();
                            if (N(c, a, e))
                                try {
                                    u ? t.setAttributeNS(u, i, e) : t.setAttribute(i, e),
                                    es(s.removed)
                                } catch (t) {}
                        }
                }
                O("afterSanitizeAttributes", t, null)
            }
        }
        function P(t) {
            var e, n = _(t);
            for (O("beforeSanitizeShadowDOM", t, null); e = n.nextNode(); )
                O("uponSanitizeShadowNode", e, null),
                D(e) || (e.content instanceof f && P(e.content),
                C(e));
            O("afterSanitizeShadowDOM", t, null)
        }
        var k, R = ws, M = Es, F = Ss, j = As, U = _s, H = Ls, B = Is, W = null, z = ls({}, [].concat(Ds(ms), Ds(ps), Ds(gs), Ds(vs), Ds(hs))), Y = null, q = ls({}, [].concat(Ds(ys), Ds(bs), Ds(xs), Ds(Ts))), $ = null, V = null, G = !0, K = !0, X = !1, J = !1, Z = !1, Q = !1, tt = !1, et = !1, nt = !1, rt = !0, ot = !1, it = !0, ut = !0, at = !1, ct = ls({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]), st = null, ft = ls({}, ["audio", "video", "img", "source", "image", "track"]), lt = null, dt = ls({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "summary", "title", "value", "style", "xmlns"]), mt = null, pt = i.createElement("form");
        return s.sanitize = function(t, e) {
            var n, r = void 0, o = void 0, i = void 0;
            if ("string" != typeof (t = t || "\x3c!--\x3e") && !L(t)) {
                if ("function" != typeof t.toString)
                    throw ss("toString is not a function");
                if ("string" != typeof (t = t.toString()))
                    throw ss("dirty is not a string, aborting")
            }
            if (!s.isSupported) {
                if ("object" === Os(a.toStaticHTML) || "function" == typeof a.toStaticHTML) {
                    if ("string" == typeof t)
                        return a.toStaticHTML(t);
                    if (L(t))
                        return a.toStaticHTML(t.outerHTML)
                }
                return t
            }
            if (Q || E(e),
            s.removed = [],
            "string" == typeof t && (at = !1),
            !at)
                if (t instanceof l)
                    1 === (e = (r = I("\x3c!----\x3e")).ownerDocument.importNode(t, !0)).nodeType && "BODY" === e.nodeName || "HTML" === e.nodeName ? r = e : r.appendChild(e);
                else {
                    if (!et && !J && !Z && -1 === t.indexOf("<"))
                        return p && ot ? p.createHTML(t) : t;
                    if (!(r = I(t)))
                        return et ? null : g
                }
            r && tt && S(r.firstChild);
            for (var u = _(at ? t : r); n = u.nextNode(); )
                3 === n.nodeType && n === o || D(n) || (n.content instanceof f && P(n.content),
                C(n),
                o = n);
            if (o = null,
            at)
                return t;
            if (et) {
                if (nt)
                    for (i = b.call(r.ownerDocument); r.firstChild; )
                        i.appendChild(r.firstChild);
                else
                    i = r;
                return rt && (i = x.call(c, i, !0)),
                i
            }
            return t = Z ? r.outerHTML : r.innerHTML,
            J && (t = is(t, R, " "),
            t = is(t, M, " ")),
            p && ot ? p.createHTML(t) : t
        }
        ,
        s.setConfig = function(t) {
            E(t),
            Q = !0
        }
        ,
        s.clearConfig = function() {
            mt = null,
            Q = !1
        }
        ,
        s.isValidAttribute = function(t, e, n) {
            return mt || E({}),
            t = rs(t),
            e = rs(e),
            N(t, e, n)
        }
        ,
        s.addHook = function(t, e) {
            "function" == typeof e && (w[t] = w[t] || [],
            ns(w[t], e))
        }
        ,
        s.removeHook = function(t) {
            w[t] && es(w[t])
        }
        ,
        s.removeHooks = function(t) {
            w[t] && (w[t] = [])
        }
        ,
        s.removeAllHooks = function() {
            w = {}
        }
        ,
        s
    }()
      , nf = ["script", "svg"]
      , rf = {
        sanitizeHtml: u,
        sanitizeText: u
    }
      , or = function(e) {
        return function(t) {
            return {
                discriminator: e,
                data: t
            }
        }
    }
      , t = function(e) {
        return function(t) {
            return t.discriminator === e ? G.some(t.data) : G.none()
        }
    }
      , of = or("event")
      , uf = or("html")
      , af = or("images")
      , cf = or("word")
      , sf = or("text")
      , ff = or("void")
      , lf = t("event")
      , df = t("html")
      , mf = t("images")
      , pf = t("word")
      , gf = t("text")
      , K = hr().browser
      , vf = !(K.isIE() || K.isEdge() && K.version.major < 16)
      , hf = ["^image/", "file"]
      , yf = function(t, e) {
        void 0 === e && (e = rf);
        return {
            getWordData: function() {
                return G.some(cf({
                    html: e.sanitizeHtml(t),
                    rtf: zc()
                }))
            },
            getGoogleDocsData: G.none,
            getImage: G.none,
            getHtml: G.none,
            getText: G.none,
            getNative: a("There is no native event"),
            getOnlyText: G.none,
            getVoid: a("There is no paste event")
        }
    }
      , bf = function(t, e) {
        void 0 === e && (e = rf);
        return {
            getWordData: G.none,
            getGoogleDocsData: G.none,
            getImage: G.none,
            getHtml: G.none,
            getText: function() {
                return G.some(sf({
                    text: e.sanitizeText(t)
                }))
            },
            getNative: a("There is no native event"),
            getOnlyText: G.none,
            getVoid: a("There is no paste event")
        }
    }
      , xf = {
        native: "Outside of Textbox.io pasting HTML5 API (could be internal)",
        fallback: "Outside of Textbox.io pasting offscreen (could be internal)",
        msoffice: "Word Import pasting",
        googledocs: " pasting",
        image: "Image pasting",
        plaintext: "Only plain text is available to paste",
        text: "Plain text pasting",
        none: "There is no valid way to paste",
        discard: "There is no valid way to paste, discarding content"
    }
      , Tf = jt({
        getLabelForApi: function(e) {
            var t = Ot(xf);
            return _(t, function(t) {
                return xf[t] === e
            }).fold(function() {
                return "unknown"
            }, function(t) {
                switch (t) {
                case "native":
                case "fallback":
                    return "html";
                case "none":
                case "discard":
                    return "invalid";
                default:
                    return t
                }
            })
        }
    }, xf)
      , wf = function(r, o, n) {
        function i(t, e, n) {
            (t = Ve(r, o, t)).capture && n();
            var n = at(t.steps, function(t) {
                return t(e)
            })
              , n = Ke(n, t.input)
              , i = Tf.getLabelForApi(t.label);
            n.get(function(t) {
                var r = t.bundle.isInternal.getOr(!1)
                  , o = t.bundle.officeStyles.fold(l("auto"), function(t) {
                    return t ? "merge" : "clean"
                });
                We(t.response, function(t) {
                    u.trigger.error(t)
                }, function(t, e) {
                    u.trigger.insert(t, Ys(e), e, r, i, o)
                }, function() {
                    u.trigger.cancel()
                }, function(t, e, n) {
                    u.trigger.insert(t, Ys(e), e, r, i, o),
                    u.trigger.error(n)
                })
            })
        }
        var u = xr({
            cancel: br([]),
            error: br(["message"]),
            insert: br(["elements", "assets", "correlated", "isInternal", "source", "mode"])
        })
          , a = po(function(e) {
            var t = dn(kn.fromDom(e.target));
            zr(t.dom).each(function(t) {
                wo(t.start, Qo()) || (t = zs(e, n),
                ti() && (a.control.block(),
                e.preventDefault()),
                i(t, a.control, function() {
                    e.preventDefault()
                }))
            })
        });
        return {
            paste: a.instance,
            pasteCustom: function(t, e) {
                void 0 === e && (e = y);
                var n = po(y);
                i(t, n.control, e)
            },
            isBlocked: a.control.isBlocked,
            destroy: y,
            events: u.registry
        }
    };
    function Ef(c) {
        return function(t, a) {
            return $n(function(o) {
                function i() {
                    Ye(o, {
                        response: a.response,
                        bundle: a.bundle
                    })
                }
                function u(t) {
                    var e = st(Xs(t), Qs);
                    ct(e, Wo),
                    Ye(o, {
                        response: 0 < e.length ? function(t) {
                            t = st(t, function(t) {
                                return !Re("img")(t) || !Qs(t)
                            });
                            return Yn(t, [], "errors.local.images.disallowed")
                        }(t) : a.response,
                        bundle: a.bundle
                    })
                }
                function t(t, e) {
                    var n, r;
                    !1 === c.allowLocalImages ? u(t) : 0 === e.length ? (e = tf(n = t),
                    t = te(e, function(t) {
                        return t.futureAsset
                    }),
                    r = at(e, function(t) {
                        return t.image
                    }),
                    t.get(function(t) {
                        t = Gs(t, r);
                        Ye(o, {
                            response: Wn(n, t),
                            bundle: a.bundle
                        })
                    })) : i()
                }
                We(a.response, i, t, i, t)
            })
        }
    }
    var Sf = An("ephox-cement").resolve;
    function Af(a, n) {
        function c(t, e, n) {
            n(G.some(Ki(e, {
                officeStyles: t,
                htmlStyles: t
            })))
        }
        var s = n.translations;
        return {
            get: function(t, e) {
                t = n[t ? "officeStyles" : "htmlStyles"];
                "clean" === t ? c(!1, n, e) : "merge" === t ? c(!0, n, e) : function(t, e) {
                    var n = kn.fromTag("div");
                    xo(n, Sf("styles-dialog-content"));
                    var r = kn.fromTag("p")
                      , o = co(s("cement.dialog.paste.instructions"));
                    Gr(r, o),
                    Bo(n, r);
                    var o = {
                        text: s("cement.dialog.paste.clean"),
                        tabindex: 0,
                        className: Sf("clean-styles"),
                        click: function() {
                            i(),
                            c(!1, t, e)
                        }
                    }
                      , r = {
                        text: s("cement.dialog.paste.merge"),
                        tabindex: 1,
                        className: Sf("merge-styles"),
                        click: function() {
                            i(),
                            c(!0, t, e)
                        }
                    }
                      , i = function() {
                        u.destroy()
                    }
                      , u = a(!0);
                    u.setTitle(s("cement.dialog.paste.title")),
                    u.setContent(n),
                    u.setButtons([o, r]),
                    u.events.close.bind(function() {
                        e(G.none()),
                        i()
                    }),
                    u.show()
                }(n, e)
            },
            destroy: y
        }
    }
    function If(t, e) {
        var i = Af(t, e);
        return function(t, n) {
            var r = n.bundle
              , o = n.response;
            return $n(function(e) {
                i.get(Kn(r), function(t) {
                    t = t.fold(function() {
                        return {
                            response: zn(),
                            bundle: n.bundle
                        }
                    }, function(t) {
                        return {
                            response: o,
                            bundle: Un({
                                officeStyles: t.officeStyles,
                                htmlStyles: t.htmlStyles
                            })
                        }
                    });
                    Ye(e, t)
                })
            })
        }
    }
    function _f(t) {
        var e, n = t.dom;
        try {
            var r = n.contentWindow ? n.contentWindow.document : n.contentDocument;
            return e = r,
            r = kn.fromDom,
            null != e ? G.some(r(e)) : G.none()
        } catch (t) {
            return console.log("Error reading iframe: ", n),
            console.log("Error was: " + t),
            G.none()
        }
    }
    function Lf(t, e) {
        if (!Ro(t))
            throw "Internal error: attempted to write to an iframe that is not in the DOM";
        var n;
        (t = _f(n = t).getOrThunk(function() {
            return fn(n)
        }).dom).open("text/html", "replace"),
        t.writeln(e),
        t.close()
    }
    var Of, Df, Nf, Cf, Pf = If, kf = function(r, o) {
        return function(t, e) {
            function n(t) {
                return ze({
                    response: e.response,
                    bundle: Un({
                        officeStyles: t,
                        htmlStyles: t
                    })
                })
            }
            return Je(e.bundle) ? n(!0) : e.bundle.isGoogleDocs.getOr(!1) ? n(!1) : If(r, o)(t, e)
        }
    }, Rf = function(t) {
        t = t.dom.styleSheets;
        return Array.prototype.slice.call(t)
    }, g = {}, rr = {
        exports: g
    };
    Df = g,
    Nf = rr,
    Cf = Of = void 0,
    function(t) {
        "object" == typeof Df && void 0 !== Nf ? Nf.exports = t() : "function" == typeof Of && Of.amd ? Of([], t) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).EphoxContactWrapper = t()
    }(function() {
        return function r(o, i, u) {
            function a(e, t) {
                if (!i[e]) {
                    if (!o[e]) {
                        var n = "function" == typeof Cf && Cf;
                        if (!t && n)
                            return n(e, !0);
                        if (c)
                            return c(e, !0);
                        throw (n = new Error("Cannot find module '" + e + "'")).code = "MODULE_NOT_FOUND",
                        n
                    }
                    n = i[e] = {
                        exports: {}
                    },
                    o[e][0].call(n.exports, function(t) {
                        return a(o[e][1][t] || t)
                    }, n, n.exports, r, o, i, u)
                }
                return i[e].exports
            }
            for (var c = "function" == typeof Cf && Cf, t = 0; t < u.length; t++)
                a(u[t]);
            return a
        }({
            1: [function(t, e, n) {
                var r, u, r = (r = function(t) {
                    for (var e, n = [], r = t.split(","), o = 0, i = r.length; o < i; o += 1)
                        0 < (e = r[o]).length && n.push(u(e));
                    return n
                }
                ,
                u = function(c) {
                    var t, e, s = c, f = {
                        a: 0,
                        b: 0,
                        c: 0
                    }, l = [];
                    function n(t) {
                        var e, n, r, o;
                        if (t.test(s))
                            for (n = 0,
                            r = (e = s.match(t)).length; n < r; n += 1)
                                o = e[n],
                                s = s.replace(o, Array(o.length + 1).join("A"))
                    }
                    return t = function(t, e) {
                        var n, r, o, i, u, a;
                        if (t.test(s))
                            for (r = 0,
                            o = (n = s.match(t)).length; r < o; r += 1)
                                f[e] += 1,
                                i = n[r],
                                u = s.indexOf(i),
                                a = i.length,
                                l.push({
                                    selector: c.substr(u, a),
                                    type: e,
                                    index: u,
                                    length: a
                                }),
                                s = s.replace(i, Array(a + 1).join(" "))
                    }
                    ,
                    n(/\\[0-9A-Fa-f]{6}\s?/g),
                    n(/\\[0-9A-Fa-f]{1,5}\s/g),
                    n(/\\./g),
                    (e = /:not\(([^\)]*)\)/g).test(s) && (s = s.replace(e, "     $1 ")),
                    function() {
                        var t, e, n, r, o = /{[^]*/gm;
                        if (o.test(s))
                            for (e = 0,
                            n = (t = s.match(o)).length; e < n; e += 1)
                                r = t[e],
                                s = s.replace(r, Array(r.length + 1).join(" "))
                    }(),
                    t(/(\[[^\]]+\])/g, "b"),
                    t(/(#[^\#\s\+>~\.\[:]+)/g, "a"),
                    t(/(\.[^\s\+>~\.\[:]+)/g, "b"),
                    t(/(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi, "c"),
                    t(/(:[\w-]+\([^\)]*\))/gi, "b"),
                    t(/(:[^\s\+>~\.\[:]+)/g, "b"),
                    s = (s = s.replace(/[\*\s\+>~]/g, " ")).replace(/[#\.]/g, " "),
                    t(/([^\s\+>~\.\[:]+)/g, "c"),
                    l.sort(function(t, e) {
                        return t.index - e.index
                    }),
                    {
                        selector: c,
                        specificity: "0," + f.a.toString() + "," + f.b.toString() + "," + f.c.toString(),
                        specificityArray: [0, f.a, f.b, f.c],
                        parts: l
                    }
                }
                ,
                {
                    calculate: r,
                    compare: function(t, e) {
                        var n, r, o;
                        if ("string" == typeof t) {
                            if (-1 !== t.indexOf(","))
                                throw "Invalid CSS selector";
                            n = u(t).specificityArray
                        } else {
                            if (!Array.isArray(t))
                                throw "Invalid CSS selector or specificity array";
                            if (4 !== t.filter(function(t) {
                                return "number" == typeof t
                            }).length)
                                throw "Invalid specificity array";
                            n = t
                        }
                        if ("string" == typeof e) {
                            if (-1 !== e.indexOf(","))
                                throw "Invalid CSS selector";
                            r = u(e).specificityArray
                        } else {
                            if (!Array.isArray(e))
                                throw "Invalid CSS selector or specificity array";
                            if (4 !== e.filter(function(t) {
                                return "number" == typeof t
                            }).length)
                                throw "Invalid specificity array";
                            r = e
                        }
                        for (o = 0; o < 4; o += 1) {
                            if (n[o] < r[o])
                                return -1;
                            if (n[o] > r[o])
                                return 1
                        }
                        return 0
                    }
                });
                void 0 !== n && (n.calculate = r.calculate,
                n.compare = r.compare)
            }
            , {}],
            2: [function(t, e, n) {
                t = t("specificity");
                e.exports = {
                    boltExport: t
                }
            }
            , {
                specificity: 1
            }]
        }, {}, [2])(2)
    });
    function Mf(t) {
        return ft(t, cl)
    }
    function Ff(e, t, n) {
        t = ft(t, function(i) {
            var t = kr(e, i.selector);
            return ct(t, function(t) {
                var n, r, o, e = (n = i.raw,
                r = t,
                o = {},
                ct(n, function(t) {
                    var e;
                    void 0 !== n[t] && (e = r.dom.style,
                    S(e, t) || (o[t] = n[t]))
                }),
                o);
                oo(t, e)
            }),
            t
        }),
        n && ct(t, function(t) {
            He(t, "class")
        })
    }
    function jf(t, e, n) {
        function r(t) {
            return -1 !== t.selector.indexOf(",")
        }
        var o = ft(st(t, r), function(e) {
            var t = e.selector.split(",");
            return at(t, function(t) {
                return {
                    selector: t.trim(),
                    raw: e.raw
                }
            })
        });
        (o = st(t, function(t) {
            return !r(t)
        }).concat(o)).sort(function(t, e) {
            return al.compare(t.selector, e.selector)
        }).reverse(),
        Ff(e, o, n)
    }
    function Uf(t, e, n, r) {
        t = Rf(t),
        t = Mf(t).map(function(t) {
            var e = t.selector;
            return {
                selector: n.hasOwnProperty(e) ? n[e] : e,
                raw: t.raw
            }
        }),
        jf(t, e, r)
    }
    function Hf(t, e, n, r) {
        t = Rf(t),
        t = Mf(t),
        t = st(t, function(t) {
            return kt(t.selector, n)
        }),
        jf(t, e, r)
    }
    function Bf(t, e, n, r) {
        t = Rf(t),
        t = Mf(t),
        t = st(t, function(t) {
            return S(n, t.selector)
        }),
        jf(t, e, r)
    }
    function Wf(t) {
        var e, n = (e = kn.fromTag("span"),
        qr(t, e),
        e);
        return {
            convertToPx: function(t) {
                var e;
                return ro(n, "margin-left", t),
                e = io(n, "margin-left"),
                parseFloat(e.match(/-?\d+\.?\d*/)[0])
            },
            destroy: function() {
                return Wo(n)
            }
        }
    }
    function zf(n) {
        var t, r = (t = kn.fromDom(document.body),
        {
            play: function(n, r, o) {
                var i = kn.fromTag("div")
                  , u = kn.fromTag("iframe");
                oo(i, {
                    display: "none"
                });
                var a = Vo(u, "load", function() {
                    a.unbind(),
                    Lf(u, n);
                    var t = null === (e = u.dom.contentWindow) || void 0 === e ? void 0 : e.document;
                    if (void 0 === t)
                        throw "sandbox iframe load event did not fire correctly";
                    var e = kn.fromDom(t)
                      , t = e.dom.body;
                    if (void 0 === t)
                        throw "sandbox iframe does not have a body";
                    t = kn.fromDom(t),
                    t = r(e, t);
                    Wo(i),
                    setTimeout(p(o, t), 0)
                });
                Bo(i, u),
                Bo(t, i)
            }
        });
        return function(t, e) {
            r.play(t, function(t, e) {
                return function(t, e, n) {
                    n = n.mergeInline();
                    (n ? sl.inlineStyles : ll)(t, e, fl),
                    dl(e, n)
                }(t, e, {
                    mergeInline: l(n)
                }),
                so(e)
            }, e)
        }
    }
    function Yf(e, t, n, i, r) {
        function u(t) {
            Ye(e, {
                response: t,
                bundle: Un({})
            })
        }
        n = r.sanitizeHtml(n, "word"),
        zf(t)(n, function(t) {
            function e(t) {
                u(Wn(n, t))
            }
            var n = co(t)
              , r = kn.fromTag("div");
            Gr(r, n);
            var o = st(rn("img[src]", r), function(t) {
                return je(t, "src").exists(function(t) {
                    return kt(t, "blob:") || kt(t, "data:")
                })
            })
              , t = rn("img[data-image-src]", r);
            0 === o.length && 0 === t.length ? e([]) : i ? (ct(o, function(t) {
                return He(t, "id")
            }),
            te(o, function(i) {
                return Zt.nu(function(r) {
                    var o = i.dom;
                    bn(o).then(function(n) {
                        n.toBlob().then(function(t) {
                            var e = kt(o.src, "blob:") ? o.src : URL.createObjectURL(t)
                              , t = Vt("image")
                              , e = Bt.blob(t, n, e);
                            r($s(e, i))
                        })
                    })
                })
            }).get(e)) : (ct(o, Wo),
            ct(t, Wo),
            r = Er(r),
            u(Yn(r, [], "errors.local.images.disallowed")))
        })
    }
    function qf(t, r, e, o) {
        var i = t.html;
        return $n(function(n) {
            e.cleanDocument(i, r, o).then(function(t) {
                var e;
                null == (e = t) || 0 === e.length ? Ye(n, {
                    response: Wn([], []),
                    bundle: Un({})
                }) : (e = void 0 === o.sanitizer ? ks(o.intraFlag.isMarked) : o.sanitizer,
                Yf(n, r, t, o.allowLocalImages, e))
            }, function(t) {
                console.error("PowerPaste error code: WIM01"),
                Ye(n, {
                    response: Bn("errors.paste.process.failure"),
                    bundle: Un({})
                })
            })
        })
    }
    function $f(t) {
        var t = st(t, function(t) {
            return "file" === t.kind && /image/.test(t.type)
        })
          , n = I(t, function(t, e) {
            e = e.getAsFile();
            return null !== e ? t.concat(e) : t
        }, []);
        return $n(function(e) {
            En(n).get(function(t) {
                var i, u, t = (i = [],
                u = [],
                ct(t, function(o) {
                    return Bt.cata(o, function(t, e, n) {
                        var r = kn.fromTag("img");
                        Nn(r, "src", n),
                        i.push(r),
                        u.push($s(o, r))
                    }, function(t, e, n) {
                        console.error("Internal error: Paste operation produced an image URL instead of a Data URI: ", e)
                    })
                }),
                Wn(i, u));
                Ye(e, {
                    response: t,
                    bundle: Un({})
                })
            })
        })
    }
    function Vf(t) {
        try {
            var e = t()
              , e = null != e && 0 < e.length ? co(e) : [];
            return Xo.value(e)
        } catch (t) {
            return console.error("PowerPaste error code: PT01. Message: ", t),
            Xo.error("errors.paste.process.failure")
        }
    }
    function Gf(t) {
        return t.fold(qe, function(t) {
            return ze({
                response: Wn(t, []),
                bundle: Un({})
            })
        })
    }
    function Kf(t, e, n, r, o) {
        return Vf(function() {
            return function(t, e, n, r, o, i) {
                gc(n);
                n = so(n),
                i = Qa(o, r, e, i);
                return Pi(t, n, i)
            }(t, pl, e, n, r, {
                cleanFilteredInlineElements: o.cleanFilteredInlineElements
            })
        })
    }
    function Xf(t, e) {
        var n = Vf(function() {
            return Bc(t, so(e))
        });
        return Gf(n)
    }
    function Jf(t, e, n, r, o, i) {
        return Kf(t, e, r, n, i).fold(qe, function(n) {
            return $n(function(e) {
                o.get(function(t) {
                    var o, i, t = (t = t,
                    o = [],
                    i = ft(n, function(t) {
                        return Re("img")(t) ? [t] : kr(t, "img")
                    }),
                    ct(t, function(r) {
                        Bt.cata(r, function(t, e, n) {
                            ct(i, function(t) {
                                Cn(t, "src") === n && o.push($s(r, t))
                            })
                        }, y)
                    }),
                    o);
                    Ye(e, {
                        response: Wn(n, t),
                        bundle: Un({})
                    })
                })
            })
        })
    }
    function Zf(t) {
        return "\n" === t || "\r" === t
    }
    function Qf(t, e) {
        var o = t.replace(/\t/g, (t = " ",
        (e = e) <= 0 ? "" : new Array(e + 1).join(t)));
        return I(o, function(t, e) {
            return -1 !== " \f\t\v".indexOf(e) || "\xa0" === e ? t.pcIsSpace || "" === t.str || t.str.length === o.length - 1 || (n = o,
            (r = t.str.length + 1) < n.length && 0 <= r && Zf(n[r])) ? {
                pcIsSpace: !1,
                str: t.str + "\xa0"
            } : {
                pcIsSpace: !0,
                str: t.str + " "
            } : {
                pcIsSpace: Zf(e),
                str: t.str + e
            };
            var n, r
        }, {
            pcIsSpace: !1,
            str: ""
        }).str
    }
    function tl(t, e) {
        var n, e = function(t, e) {
            e = Qf(t, e).replace(/^[\r\n]*|[\r\n]*$/g, "").split(/(?:\r?\n){2}/),
            e = at(e, function(t) {
                return t.split(/\n|\r\n/).join("<br />")
            });
            return 1 === e.length ? e[0] : at(e, function(t) {
                return "<p>" + t + "</p>"
            }).join("")
        }((n = t,
        t = kn.fromTag("div"),
        n = n,
        t.dom.textContent = n,
        so(t)), e), e = co(e);
        return Wn(e, [])
    }
    function el(o) {
        return function(t, e) {
            return n = o,
            r = gf(t).getOrDie("Required text input for Text Handler"),
            $n(function(t) {
                var e = 0 < r.text.length ? tl(r.text, n) : zn();
                Ye(t, {
                    response: e,
                    bundle: Un({})
                })
            });
            var n, r
        }
    }
    function nl(t, r) {
        function e(t, e) {
            var n = kn.fromTag("div");
            return Gr(n, t),
            gc(n),
            n = Er(n),
            ze({
                response: Wn(n, e),
                bundle: r.bundle
            })
        }
        var n = p(qn, r);
        return We(r.response, n, e, n, e)
    }
    function rl(r, o, i) {
        return function(t, e) {
            var n = df(t).getOrDie("Wrong input type for HTML handler").container
              , t = fn(o)
              , e = e.bundle;
            return Je(e) ? Xf(t, n) : (r(n),
            function(t, e, n, r) {
                r = Kf(t, e, n, !1, r);
                return Gf(r)
            }(t, n, Xe(e), i))
        }
    }
    function ol(c, s, f) {
        return function(t, e) {
            var n, a = e.bundle;
            return n = a,
            function(t, e) {
                return n.proxyBin.fold(function() {
                    return console.error(t),
                    ze({
                        response: zn(),
                        bundle: Un({})
                    })
                }, e)
            }("There was no proxy bin setup. Ensure you have run proxyStep first.", function(t) {
                var n, e = Xe(a), r = Kn(a), o = Je(a), i = (n = a,
                Zt.nu(function(e) {
                    n.backgroundAssets.fold(function() {
                        e([])
                    }, function(t) {
                        t.listen(e)
                    })
                })), u = fn(c);
                return o ? function(t, e, n, r) {
                    e = e.findClipboardTags(Er(n)).getOr([]);
                    ct(e, Wo);
                    e = Zt.nu(function(t) {
                        return t([])
                    });
                    return Jf(t, n, !1, !0, e, r)
                }(u, s, t, f) : Jf(u, t, r, e, i, f)
            })
        }
    }
    function il(t, e) {
        return ze({
            response: zn(),
            bundle: Un({})
        })
    }
    function ul(r) {
        return function(t, e) {
            var n = Be(e.bundle, Un(r));
            return ze({
                response: e.response,
                bundle: n
            })
        }
    }
    var al = rr.exports.boltExport
      , cl = function(t) {
        t = t.cssRules;
        return ft(t, function(t) {
            return t.type === CSSRule.IMPORT_RULE ? cl(t.styleSheet) : t.type === CSSRule.STYLE_RULE ? [function(t) {
                var e = t.selectorText
                  , n = t.style.cssText;
                if (void 0 === n)
                    throw new Error("WARNING: Browser does not support cssText property");
                return {
                    selector: e,
                    style: n,
                    raw: t.style
                }
            }(t)] : []
        })
    }
      , X = {
        inlineStyles: function(t, e, n) {
            Uf(t, e, n, !0)
        },
        inlineStylesKeepClasses: function(t, e, n) {
            Uf(t, e, n, !1)
        },
        inlinePrefixedStyles: function(t, e, n) {
            Hf(t, e, n, !0)
        },
        inlinePrefixedStylesKeepClasses: function(t, e, n) {
            Hf(t, e, n, !1)
        },
        inlineSelectorsStyles: function(t, e, n) {
            Bf(t, e, n, !0)
        },
        inlineSelectorsStylesKeepClasses: function(t, e, n) {
            Bf(t, e, n, !1)
        }
    }
      , sl = {
        inlineStyles: X.inlineStyles,
        inlineStylesKeepClasses: X.inlineStylesKeepClasses,
        inlinePrefixedStyles: X.inlinePrefixedStyles,
        inlinePrefixedStylesKeepClasses: X.inlinePrefixedStylesKeepClasses,
        inlineSelectorsStyles: X.inlineSelectorsStyles,
        inlineSelectorsStylesKeepClasses: X.inlineSelectorsStylesKeepClasses
    }
      , fl = {
        p: "p, li[data-converted-paragraph]"
    }
      , ll = y
      , dl = function(r, t) {
        function o(n) {
            He(n, "data-list-level"),
            He(n, "data-text-indent-alt"),
            He(n, "data-border-margin"),
            ao(n, "margin-left"),
            ao(n, "text-indent"),
            R(function(t) {
                var e = {}
                  , n = t.dom;
                if (to(n))
                    for (var r = 0; r < n.style.length; r++) {
                        var o = n.style.item(r);
                        e[o] = n.style[o]
                    }
                return e
            }(n), function(t, e) {
                !kt(e, "border") || "border-image" !== e && "none" !== t.trim() && "initial" !== t.trim() || ao(n, e)
            })
        }
        var e = kr(r, "li[data-converted-paragraph]");
        ct(e, function(t) {
            He(t, "data-converted-paragraph")
        }),
        t && (t = kr(r, "li"),
        ct(t, function(t) {
            var e = Wf(r)
              , n = function(t, e) {
                t = je(t, "data-tab-interval").getOr("36pt");
                return e.convertToPx(t)
            }(r, e)
              , n = ml(t, n, e).getOr({});
            o(t),
            e.destroy(),
            oo(t, n)
        }),
        t = kr(r, "ol,ul"),
        ct(t, function(e) {
            var t = kr(e, "li");
            uo(e, "margin-top").isNone() && G.from(t[0]).each(function(t) {
                ro(e, "margin-top", io(t, "margin-top"))
            }),
            uo(e, "margin-bottom").isNone() && G.from(t[t.length - 1]).each(function(t) {
                ro(e, "margin-bottom", io(t, "margin-bottom"))
            })
        })),
        He(r, "data-tab-interval")
    }
      , ml = function(i, u, a) {
        function c(t) {
            return je(t, "data-list-level").map(function(t) {
                return parseInt(t, 10)
            }).getOr(1)
        }
        return uo(i, "text-indent").bind(function(o) {
            return uo(i, "margin-left").map(function(t) {
                var e = uo(i, "list-style").exists(function(t) {
                    return Pt(t, "none")
                })
                  , n = je(i, "data-border-margin").getOr("0px")
                  , r = e ? c(i) + 1 : c(i)
                  , e = a.convertToPx(t) + a.convertToPx(n)
                  , t = u * r
                  , n = je(i, "data-text-indent-alt").getOr(o)
                  , r = a.convertToPx(n)
                  , n = {}
                  , r = u / 2 * -1 - r;
                0 < r && (n["text-indent"] = r + "px");
                r = e - t - r;
                return n["margin-left"] = 0 < r ? r + "px" : "0px",
                n
            })
        })
    }
      , pl = hr()
      , gl = l(Sf("smartpaste-eph-bin"))
      , vl = hr();
    function hl(r, a, c, s, o) {
        return function(t, e) {
            var n = lf(t).getOrDie("Must pass through event type").nativeEvent
              , i = o()
              , u = e.response;
            return $n(function(o) {
                var t = r(c);
                t.events.after.bind(function(t) {
                    var e, n, r = t.container;
                    vl.browser.isSafari() && ri(r, 'img[src^="webkit-fake-url"]').isSome() ? (n = vl.deviceType.isWebView() ? "webview.imagepaste" : "safari.imagepaste",
                    Ye(o, {
                        response: Bn(n),
                        bundle: Un({})
                    })) : (a(r),
                    xo(r, gl()),
                    e = r,
                    n = ((n = (t = vl).browser).isIE() && 11 <= n.version.major ? vc : hc)(e, t),
                    e = Er(r),
                    t = s.findClipboardTags(e).isSome(),
                    e = ut(e, function(t) {
                        return _n(t) && je(t, "id").exists(function(t) {
                            return kt(t, "docs-internal-guid")
                        })
                    }),
                    Ye(o, {
                        response: u,
                        bundle: Un({
                            isWord: n,
                            isGoogleDocs: e,
                            isInternal: t,
                            proxyBin: r,
                            backgroundAssets: i
                        })
                    }))
                }),
                i.convert(n),
                t.run()
            })
        }
    }
    function yl(t, e) {
        if (0 === t.length)
            throw new Error("Zero length content passed to Hex conversion");
        return t = function(t) {
            for (var e = new Array(t.length / 2), n = 0; n < t.length; n += 2) {
                var r = t.substr(n, 2);
                e[Math.floor(n / 2)] = parseInt(r, 16)
            }
            return e
        }(t),
        t = new Uint8Array(t),
        new Blob([t],{
            type: e
        })
    }
    function bl(t, e, n) {
        return e.indexOf(t, n)
    }
    function xl(t, e, n, r, o, i, u) {
        return -1 === t || -1 === e ? G.none() : G.some({
            start: t,
            end: e,
            bower: n,
            regex: r,
            idRef: o,
            isEquation: i,
            attrs: u
        })
    }
    function Tl(t, e, n) {
        return t.substring(e, n)
    }
    function wl(t, e) {
        if (-1 === e)
            return e;
        var n = 0
          , r = t.length;
        do {
            var o = t.indexOf("{", e)
              , i = t.indexOf("}", e);
            if (o < i && -1 !== o ? (e = o + 1,
            ++n) : (i < o || o < 0) && -1 !== i && (e = i + 1,
            --n),
            r < e || -1 === i)
                return -1
        } while (0 < n);
        return e
    }
    function El(t, e, n, r, o) {
        var i, u = Tl(t, n, r), a = (t = bl("\\picscalex", i = t, a = n),
        a = bl("\\bliptag", i, t),
        -1 < t && t < a ? G.from(i.substring(t, a)) : G.none());
        return xl(n, r, u, /[^a-fA-F0-9]([a-fA-F0-9]+)\}$/, "i", o, a)
    }
    function Sl(t, e, n, r, o) {
        return t = Tl(t, n, r),
        xl(n, r, t, /([a-fA-F0-9]{64,})(?:\}.*)/, "s", o, G.none())
    }
    function Al(t, e) {
        return kl(t, e)
    }
    function Il(t) {
        return 0 <= t.indexOf("\\pngblip") ? Xo.value("image/png") : 0 <= t.indexOf("\\jpegblip") ? Xo.value("image/jpeg") : Xo.error("errors.imageimport.unsupported")
    }
    function _l(t, e) {
        return (e = t.match(e)) && e[1] && e[1].length % 2 == 0 ? Xo.value(e[1]) : Xo.error("errors.imageimport.invalid")
    }
    function Ll(t) {
        return null !== (t = t.match(/\\shplid(\d+)/)) ? G.some(t[1]) : G.none()
    }
    function Ol(t) {
        for (var a = [], e = function() {
            return t.length
        }, n = function(t) {
            var e, r, o, i, u, n = (r = (e = t).bower,
            o = e.regex,
            i = e.isEquation,
            u = e.attrs,
            Ll(r).map(function(t) {
                var n = e.idRef + t;
                return Il(r).fold(function(t) {
                    return Pl.unsupported(n, t, i, u)
                }, function(e) {
                    return _l(r, o).fold(function(t) {
                        return Pl.unsupported(n, t, i, u)
                    }, function(t) {
                        return Pl.supported(n, e, yl(t, e), i, u)
                    })
                })
            }));
            return a = a.concat(n.toArray()),
            t.end
        }, r = 0; r < t.length; )
            r = Al(t, r).fold(e, n);
        return a
    }
    function Dl(t) {
        return Pl.cata(t, function(t, e, n) {
            return t
        }, function(t, e, n, r, o) {
            return t
        })
    }
    function Nl(t) {
        return Pl.cata(t, function(t, e, n) {
            return n
        }, function(t, e, n, r, o) {
            return r
        })
    }
    function Cl(t) {
        return Pl.cata(t, function(t, e, n) {
            return Xo.error(e)
        }, function(t, e, n, r, o) {
            return Xo.value(n)
        })
    }
    var Ht = Ut([{
        unsupported: ["id", "message", "isEquation", "attrs"]
    }, {
        supported: ["id", "contentType", "blob", "isEquation", "attrs"]
    }])
      , Pl = {
        unsupported: Ht.unsupported,
        supported: Ht.supported,
        cata: function(t, e, n) {
            return t.fold(e, n)
        }
    }
      , kl = function(t, e) {
        var n = bl("{\\pict{", t, e)
          , r = wl(t, n)
          , o = bl("{\\shp{", t, e)
          , i = wl(t, o)
          , u = bl("{\\mmathPict{", t, e)
          , a = wl(t, u)
          , u = -1 !== u && (u < n && r < a || u < o && i < a)
          , a = p(Sl, t, e, o, i, u)
          , u = p(El, t, e, n, r, u);
        return -1 === n && -1 === o ? G.none() : -1 === n ? a() : -1 === o || o < n && r < i ? u() : n < o && i < r ? a() : n < o ? u() : o < n ? a() : G.none()
    }
      , Rl = function(t) {
        t = t.replace(/\r/g, "").replace(/\n/g, "");
        return Ol(t)
    }
      , Ml = function(t) {
        return Rl(t)
    };
    function Fl(e, n, r, o, i) {
        return e.toCanvas().then(function(t) {
            return function(t, e, n, r, o, i) {
                i = ne(o, i);
                return oe(i).drawImage(t, -n, -r),
                function(e, t) {
                    return xe(e, t).then(function(t) {
                        return Ie(ce.resolve(e), t, e.toDataURL())
                    })
                }(i, e)
            }(t, e.getType(), n, r, o, i)
        })
    }
    function jl(t, e) {
        return e = new RegExp("\\\\pic" + e + "(\\-?\\d+)\\\\"),
        e = t.match(e)[1],
        parseInt(e, 10)
    }
    function Ul(m, t) {
        return t.fold(function() {
            return Gt.resolve(m)
        }, function(d) {
            return Bt.cata(m, function(s, f, l) {
                return f.toCanvas().then(function(t) {
                    var e, n, r, o, i, u = kn.fromDom(t), a = je(u, "width").map(function(t) {
                        return parseInt(t, 10)
                    }).getOr(1), c = je(u, "height").map(function(t) {
                        return parseInt(t, 10)
                    }).getOr(1), e = (n = a,
                    r = c,
                    o = p(jl, e = d),
                    i = o("wgoal"),
                    t = o("hgoal"),
                    u = i / n,
                    e = t / r,
                    n = o("cropl"),
                    r = o("cropt"),
                    {
                        cropl: n / u,
                        cropt: r / e,
                        cropw: (i - n - o("cropr")) / u,
                        croph: (t - r - o("cropb")) / e
                    });
                    return a === e.cropw && c === e.croph && 0 === e.cropl && 0 === e.cropt ? Gt.resolve(m) : Bl(f, e.cropl, e.cropt, e.cropw, e.croph).then(function(e) {
                        return e.toBlob().then(function(t) {
                            URL.revokeObjectURL(l);
                            t = URL.createObjectURL(t);
                            return Bt.blob(s, e, t)
                        })
                    })
                })
            }, function(t, e, n) {
                return Gt.resolve(m)
            })
        })
    }
    function Hl(t, e, i, u, a) {
        var c = []
          , s = []
          , f = !1;
        return {
            blobs: ft(t, function(r, n) {
                var o = Cn(r, "data-image-id");
                return He(r, "rtf-data-image"),
                He(r, "data-image-id"),
                He(r, "data-ms-equation"),
                a || He(r, "data-image-src"),
                "unsupported" === o ? (f = !0,
                Nn(r, "alt", i("errors.imageimport.unsupported")),
                []) : _(e, function(t, e) {
                    return u(t, e, o, n)
                }).fold(function() {
                    return console.log("WARNING: unable to find data for image ", r.dom),
                    f = !0,
                    Nn(r, "alt", i("errors.imageimport.unsupported")),
                    []
                }, function(n) {
                    return Cl(n).fold(function(t) {
                        return f = !0,
                        console.error("PowerPaste error code: RTF04"),
                        Nn(r, "alt", i(t)),
                        []
                    }, function(t) {
                        var e;
                        return c.push(r),
                        s.push((e = n,
                        Pl.cata(e, function(t, e, n) {
                            return G.none()
                        }, function(t, e, n, r, o) {
                            return o
                        }))),
                        a && He(r, "data-image-src"),
                        [t]
                    })
                })
            }),
            filteredImages: c,
            imageAttrs: s,
            failedImage: f
        }
    }
    var Bl = Fl
      , Wl = function(t, e, r, n, o) {
        var i = I(e, function(e, n) {
            var r = Dl(n)
              , o = Nl(n);
            return L(e, function(t) {
                return !(o || Nl(t)) && Dl(t) === r
            }).fold(function() {
                return e.concat([n])
            }, function(t) {
                return Cl(e[t]).isValue() ? e : e.slice(0, t).concat(e.slice(t + 1)).concat([n])
            })
        }, [])
          , u = o.keepSrc || !1
          , e = A(i, function(t) {
            return !Nl(t)
        })
          , o = e.pass
          , i = e.fail
          , e = A(t, function(t) {
            return "true" !== Cn(t, "data-ms-equation")
        })
          , t = e.pass
          , e = e.fail
          , o = Hl(t, o, n, function(t, e, n, r) {
            return Dl(t) === n
        }, u)
          , n = Hl(e, i, n, function(t, e, n, r) {
            return e === r
        }, u)
          , a = o.filteredImages.concat(n.filteredImages)
          , c = o.imageAttrs.concat(n.imageAttrs)
          , u = o.blobs.concat(n.blobs)
          , s = o.failedImage || n.failedImage;
        En(u).get(function(t) {
            var n;
            n = c,
            ((t = t).length === n.length ? Gt.all(at(t, function(t, e) {
                return Ul(t, n[e])
            })) : Gt.resolve(t)).then(function(t) {
                t = Gs(t, a);
                r(t, s)
            })
        })
    }
      , zl = function(t) {
        return kr(t, "[rtf-data-image]")
    };
    function Yl(i) {
        function u(e) {
            f.get().each(function(t) {
                Ye(t, {
                    response: e,
                    bundle: Un({})
                })
            })
        }
        var a, c, s = (a = i.translations,
        {
            events: (c = xr({
                insert: br(["elements", "correlated"]),
                incomplete: br(["elements", "correlated", "message"])
            })).registry,
            processRtf: function(r, o, t, e) {
                var n = Ml(t)
                  , t = zl(r);
                Wl(t, n, function(t, e) {
                    var n = Er(r)
                      , t = t.concat(o);
                    e ? (console.error("PowerPaste error code: RTF01"),
                    c.trigger.incomplete(n, t, "errors.imageimport.failed")) : c.trigger.insert(n, t)
                }, a, e)
            }
        }), f = uu(G.none());
        return s.events.insert.bind(function(t) {
            u(Wn(t.elements, t.correlated))
        }),
        s.events.incomplete.bind(function(t) {
            console.error("PowerPaste error code: RTF02"),
            u(Yn(t.elements, t.correlated, t.message))
        }),
        function(t, r) {
            function e(o) {
                return $n(function(e) {
                    function t() {
                        Ye(e, r)
                    }
                    function n(t, n) {
                        f.set(G.some(e));
                        var r = kn.fromTag("div");
                        Gr(r, t),
                        o.fold(function() {
                            var t, e = zl(r);
                            return 0 < e.length ? function(t) {
                                ct(t, Wo);
                                t = Er(r);
                                console.error("PowerPaste error code: RTF03"),
                                u(Yn(t, n, "errors.imageimport.failed"))
                            }(e) : (t = Er(r),
                            void u(Wn(t, n)))
                        }, function(t) {
                            s.processRtf(r, n, t, i)
                        })
                    }
                    We(r.response, t, n, t, n)
                })
            }
            t = pf(t).getOrDie("Word input required for rtf data");
            return function(e, n) {
                var t = Ot(n);
                if (t.length !== Wc.length)
                    throw new Error("Partial match");
                return P(t, function(t) {
                    return yc(e.discriminator === t, n[t])
                }).getOrDie("Must find branch for constructor: " + e.discriminator)(e.data)
            }(t.rtf, {
                disabled: function() {
                    return e(G.none())
                },
                fromClipboard: function(t) {
                    return e(!0 === i.allowLocalImages ? G.some(t.rtf) : G.none())
                }
            })
        }
    }
    function ql(o) {
        function i() {
            return Zt.pure(o)
        }
        return Bt.cata(o.asset, function(t, e, n) {
            return /tiff$/.test(e.getType()) ? (r = e,
            Zt.nu(function(e) {
                var t = Oe(r, "image/png").then(function(t) {
                    De(t).map(G.some).get(e)
                });
                return t.catch.call(t, function(t) {
                    return console.warn(t),
                    e(G.none()),
                    t
                })
            }).map(function(t) {
                return t.map(function(t) {
                    var e = o.image;
                    return URL.revokeObjectURL(n),
                    Vs(t, e),
                    $s(t, e)
                }).getOr(o)
            })) : i();
            var r
        }, i)
    }
    function $l() {
        return function(t, o) {
            return $n(function(n) {
                function t() {
                    Ye(n, o)
                }
                function r(t, e) {
                    te(t, ql).get(function(t) {
                        Ye(n, {
                            response: e(t),
                            bundle: o.bundle
                        })
                    })
                }
                We(o.response, t, function(e, t) {
                    r(t, function(t) {
                        return Wn(e, t)
                    })
                }, t, function(e, t, n) {
                    r(t, function(t) {
                        return console.error("PowerPaste error code:  IMG01"),
                        Yn(e, t, n)
                    })
                })
            })
        }
    }
    function Vl(t) {
        return l(t)
    }
    function Gl(t, e) {
        return t.isSupported ? e.getWordData() : G.none()
    }
    function Kl(t) {
        return t.getNative()
    }
    function Xl(t) {
        return t.getImage()
    }
    function Jl(t) {
        return t.getHtml()
    }
    function Zl(t) {
        return t.getText()
    }
    function Ql(t) {
        return t.getOnlyText()
    }
    function td(t) {
        return t.getGoogleDocsData()
    }
    function ed(t) {
        return t.getVoid()
    }
    function nd(t, e, n, r) {
        return {
            _label: t,
            label: l(t),
            getAvailable: e,
            steps: l(n),
            capture: l(r)
        }
    }
    function rd(t, e, n, r) {
        return {
            _label: t,
            label: l(t),
            getAvailable: e,
            steps: l(n),
            capture: l(r)
        }
    }
    function od(t, e, n, r) {
        return nd(Tf.native, Jl, [Vl((o = e.intraFlag,
        function(t, e) {
            t = df(t).getOrDie("Wrong input type for HTML handler"),
            t = o.findClipboardTags(Er(t.container));
            t.each(function(t) {
                ct(t, Wo)
            });
            t = t.isSome();
            return ze({
                response: e.response,
                bundle: Un({
                    isInternal: t
                })
            })
        }
        )), Vl(kf(t, e)), Vl(rl(n, r, e)), Vl(Ef(e)), Vl($l())], !0);
        var o
    }
    function id(t, e, n) {
        return nd(Tf.msoffice, p(Gl, t), [Vl(ul({
            isWord: !0
        })), Vl(Pf(e, n)), Vl((o = t,
        i = n,
        function(t, e) {
            t = pf(t).getOrDie("Wrong input type for Word Import handler"),
            e = Vn(e.bundle);
            return qf(t, e, o, i)
        }
        )), (r = Yl(n),
        function(n) {
            return function(t, e) {
                return n.block(),
                r(t, e).map(function(t) {
                    return n.unblock(),
                    t
                })
            }
        }
        ), Vl($l())], !0);
        var r, o, i
    }
    function ud(t) {
        return nd(Tf.image, Xl, [Vl(!1 === t.allowLocalImages ? function(t, e) {
            return qe("errors.local.images.disallowed")
        }
        : function(t, e) {
            t = mf(t).getOrDie("Must have image data for images handler");
            return $f(t.images)
        }
        ), Vl($l())], !0)
    }
    var ad = function(t) {
        return void 0 === t && (t = 4),
        nd(Tf.text, Zl, [Vl(el(t)), Vl(nl)], !0)
    }
      , cd = function() {
        return rd(Tf.discard, ed, [Vl(il)], !0)
    }
      , sd = function(t, e, n, r, o) {
        void 0 === o && (o = Vi);
        var i, u = yr(o, r.baseUrl, r.cacheSuffix), a = fi(void 0 !== r.pasteBinAttrs ? r.pasteBinAttrs : {}), c = void 0 === r.sanitizer ? ks(r.intraFlag.isMarked) : r.sanitizer, i = [function(t) {
            t = G.from(t.tabSpaces).getOr(4);
            return nd(Tf.plaintext, Ql, [Vl(el(t)), Vl(nl)], !0)
        }(r), id(u, e, r), (i = r,
        o = n,
        u = t,
        nd(Tf.googledocs, td, [Vl(ul({
            officeStyles: !1,
            htmlStyles: !1
        })), Vl(rl(o, u, i)), Vl(Ef(i)), Vl($l())], !0)), od(e, r, n, t), ud(r)], r = (e = e,
        r = r,
        n = n,
        a = a,
        t = t,
        rd(Tf.fallback, Kl, [Vl(hl(a, n, t, r.intraFlag, qs)), Vl(kf(e, r)), Vl(ol(t, r.intraFlag, r)), Vl(Ef(r)), Vl($l())], !1));
        return wf(i, r, c)
    };
    function fd(t, e) {
        return e = new Id({},t.schema).parse(e, {
            forced_root_block: !1,
            isRootContent: !0
        }),
        new _d({
            validate: !0
        },t.schema).serialize(e)
    }
    function ld(t, e, n) {
        return e = function(t, e) {
            if (t && "string" != typeof t)
                return t;
            switch (t) {
            case "clean":
                return Cd;
            case "merge":
                return Pd;
            default:
                return e
            }
        }(t, e),
        e = Nd.extend(e, {
            base_64_images: n
        })
    }
    function dd(t) {
        return t.replace(/-(.)/g, function(t, e) {
            return e.toUpperCase()
        })
    }
    function md(o, t, e) {
        var i, n, r, u, a, c, s, f;
        switch (o.nodeType) {
        case 1:
            t ? i = Md : (i = Rd,
            u = Ud(o),
            a = {},
            d = o,
            c = function(t, e) {
                a[t] = e
            }
            ,
            null != (e = (e = e) || d.getAttribute("style")) && e.split || (e = d.style.cssText),
            Nd.each(e.split(";"), function(t) {
                var e = t.indexOf(":");
                0 < e && ((s = Nd.trim(t.substring(0, e))).toUpperCase() === s && (s = s.toLowerCase()),
                s = s.replace(/([A-Z])/g, function(t, e) {
                    return "-" + e.toLowerCase()
                }),
                f = Nd.trim(t.substring(e + 1)),
                Hd = Hd || 0 === s.indexOf("mso-"),
                c(s, f))
            }),
            Hd || (f = d.style["mso-list"]) && c("mso-list", f)),
            n = "HTML" !== o.scopeName && o.scopeName && o.tagName && o.tagName.indexOf(":") <= 0 ? (o.scopeName + ":" + o.tagName).toUpperCase() : o.tagName;
            break;
        case 3:
            i = Fd,
            r = o.nodeValue;
            break;
        case 8:
            i = jd,
            r = o.nodeValue;
            break;
        default:
            Nd.log("WARNING: Unsupported node type encountered: " + o.nodeType)
        }
        function l(t) {
            i === Rd && u.filter(t)
        }
        var d = function() {
            return i
        };
        return {
            getNode: function() {
                return u && u.getAttributes(),
                o
            },
            tag: function() {
                return n
            },
            type: d,
            text: function() {
                return r
            },
            toString: function() {
                return "Type: " + i + ", Tag: " + n + " Text: " + r
            },
            getAttribute: function(t) {
                return u.get(t.toLowerCase())
            },
            filterAttributes: l,
            filterStyles: function(n) {
                var r;
                i === Rd && (r = "",
                Nd.each(a, function(t, e) {
                    t = n(e, t);
                    null === t ? (o.style.removeProperty ? o.style.removeProperty(dd(e)) : o.style.removeAttribute(dd(e)),
                    delete a[e]) : (r += e + ": " + t + "; ",
                    a[e] = t)
                }),
                r = r || null,
                l(function(t, e) {
                    return "style" === t ? r : e
                }),
                o.style.cssText = r)
            },
            getAttributeCount: function() {
                return u.getAttributeCount()
            },
            attributes: function(t) {
                u.each(t)
            },
            getStyle: function(t) {
                return a[t]
            },
            styles: function(n) {
                Nd.each(a, function(t, e) {
                    n(e, t)
                })
            },
            getComputedStyle: function() {
                return Nd.ephoxGetComputedStyle(o)
            },
            isWhitespace: function() {
                return i === Fd && /^[\s\u00A0]*$/.test(r)
            }
        }
    }
    function pd(p, g) {
        return function(e, t, n) {
            function r() {
                g && g(m),
                s = !1,
                a = [],
                c = []
            }
            function o(t) {
                Nd.each(t, function(t) {
                    e.receive(t)
                })
            }
            function i(t) {
                s ? c.push(t) : e.receive(t)
            }
            var u, a, c, s = !1, f = function() {
                l(),
                o(c),
                r()
            }, l = function() {
                Nd.each(u, function(t) {
                    i(t)
                }),
                d()
            }, d = function() {
                u = []
            }, m = {
                document: n || window.document,
                settings: t || {},
                emit: i,
                receive: function(t) {
                    g && a.push(t),
                    p(m, t),
                    t === Bd.FINISHED && f()
                },
                startTransaction: function() {
                    s = !0
                },
                rollback: function() {
                    o(a),
                    r()
                },
                commit: f,
                defer: function(t) {
                    (u = u || []).push(t)
                },
                hasDeferred: function() {
                    return u && 0 < u.length
                },
                emitDeferred: l,
                dropDeferred: d
            };
            return r(),
            m
        }
    }
    function gd() {
        return null
    }
    function vd(t) {
        if (em)
            for (var e = void 0, n = Qd.length, r = void 0, r = 0; r < n; r++)
                (e = Qd[r]) && (e.type() === Bd.START_ELEMENT_TYPE && "SPAN" === e.tag() && Kd(e) ? function(t, e) {
                    for (var n, r = 1, o = e + 1; o < t; o++)
                        if ((n = Qd[o]) && "SPAN" === n.tag())
                            if (n.type() === Bd.START_ELEMENT_TYPE)
                                r++;
                            else if (n.type() === Bd.END_ELEMENT_TYPE && 0 === --r)
                                return Qd[o] = null
                }(n, r) : t.emit(e));
        Qd = [],
        em = !(tm = [])
    }
    function hd(t, e) {
        Qd.push(e),
        tm = tm || [],
        e.type() === Bd.START_ELEMENT_TYPE ? tm.push(e) : e.type() === Bd.END_ELEMENT_TYPE && (tm.pop(),
        0 === tm.length && vd(t))
    }
    function yd(t) {
        return !Kd(t) && !/^OLE_LINK/.test(t.getAttribute("name"))
    }
    function bd(t, e) {
        return e = {
            tag: t.tag,
            type: t.type,
            variant: e
        },
        t.start && (e.start = t.start),
        t.type || delete e.type,
        e
    }
    var xd, Td, Wt = "x-tinymce/html", wd = l(Wt), Ed = "\x3c!-- " + Wt + " --\x3e", Sd = function(t) {
        return -1 !== t.indexOf(Ed)
    }, Ad = function(t) {
        return t.replace(/ data-mce-contenteditable="([^"]+)"/g, ' contenteditable="$1"')
    }, Id = tinymce.html.DomParser, _d = tinymce.html.Serializer, Ld = function(t) {
        var n = ks(Sd)
          , r = {
            sanitizeHtml: p(fd, t),
            sanitizeText: u
        };
        return {
            sanitizeText: n.sanitizeText,
            sanitizeHtml: function(t, e) {
                return (Sd(t) ? r : n).sanitizeHtml(t, e)
            }
        }
    }, Od = function(t) {
        (n = document.createElement("div")).appendChild(t.cloneNode(!0));
        var e = n.innerHTML
          , n = t = null;
        return e
    }, Dd = function(t) {
        ct(at(t.getElementsByTagName("*"), kn.fromDom), function(e) {
            Ue(e, "data-mce-style") && !Ue(e, "style") && je(e, "data-mce-style").each(function(t) {
                return Nn(e, "style", t)
            })
        })
    }, Nd = {
        each: tinymce.each,
        trim: tinymce.trim,
        bind: function(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        },
        extend: function(n) {
            for (var t = [], e = 1; e < arguments.length; e++)
                t[e - 1] = arguments[e];
            return tinymce.each(Array.prototype.slice.call(arguments, 1), function(t) {
                for (var e in t)
                    n[e] = t[e]
            }),
            n
        },
        ephoxGetComputedStyle: function(t) {
            return t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle || {}
        },
        log: function(t) {
            "undefined" != typeof console && console.log && console.log(t)
        },
        compose: function(t) {
            var r = Array.prototype.slice.call(t).reverse();
            return function(t) {
                for (var e = t, n = 0; n < r.length; n++)
                    e = (0,
                    r[n])(e);
                return e
            }
        }
    }, Cd = {
        strip_class_attributes: "all",
        retain_style_properties: "none"
    }, Pd = {
        strip_class_attributes: "none",
        retain_style_properties: "valid"
    }, kd = {
        create: function(t, e, n) {
            var r = ld(t, Cd, n)
              , o = ld(e, Pd, n)
              , i = o;
            return {
                setWordContent: function(t) {
                    i = t ? r : o
                },
                get: function(t) {
                    return i[t]
                }
            }
        }
    }, Rd = "startElement", Md = "endElement", Fd = "text", jd = "comment", Ud = function(o) {
        function e() {
            return i
        }
        var i, u, a, c = 0, s = function() {
            return i = {},
            c = 0,
            Nd.each(o.attributes, function(t) {
                var e = t.nodeName
                  , n = t.value;
                !1 === (t = t).specified && ("name" !== t.nodeName || "" === t.value) || null != n && (i[e] = n,
                c++)
            }),
            void 0 === i.style && o.style.cssText && (i.style = o.style.cssText,
            c++),
            s = e,
            i
        }, f = function(n) {
            Nd.each(s(), function(t, e) {
                n(e, t)
            })
        };
        return {
            get: function(t) {
                return s()[t]
            },
            each: f,
            filter: function(t) {
                var n, r;
                u || (a = s),
                r = t,
                u = (n = u) && r ? function(t, e) {
                    return r(t, n(t, e))
                }
                : n || r,
                s = function() {
                    return s = a,
                    f(function(t, e) {
                        var n = u(t, e);
                        null === n ? (o.removeAttribute(t),
                        delete i[t],
                        c--) : n !== e && ("class" === t ? o.className = n : o.setAttribute(t, n),
                        i[t] = n)
                    }),
                    s = e,
                    i
                }
            },
            getAttributes: function() {
                return s()
            },
            getAttributeCount: function() {
                return s(),
                c
            }
        }
    }, Hd = !1, zt = function(t, e) {
        return md(e.createElement(t), !0)
    }, Rn = zt("HTML", window.document), Bd = {
        START_ELEMENT_TYPE: Rd,
        END_ELEMENT_TYPE: Md,
        TEXT_TYPE: Fd,
        COMMENT_TYPE: jd,
        FINISHED: Rn,
        token: md,
        createStartElement: function(t, e, n, r) {
            var o = r.createElement(t)
              , i = "";
            return Nd.each(e, function(t, e) {
                o.setAttribute(e, t)
            }),
            Nd.each(n, function(t, e) {
                i += e + ":" + t + ";",
                o.style[dd(e)] = t
            }),
            md(o, !1, "" !== i ? i : null)
        },
        createEndElement: zt,
        createComment: function(t, e) {
            return md(e.createComment(t), !1)
        },
        createText: function(t, e) {
            return md(e.createTextNode(t))
        }
    }, Wd = function(e) {
        var n = e.createDocumentFragment()
          , r = function(t) {
            n.appendChild(t)
        };
        return {
            dom: n,
            receive: function(t) {
                switch (t.type()) {
                case Bd.START_ELEMENT_TYPE:
                    !function(t) {
                        t = t.getNode().cloneNode(!1);
                        r(t = t),
                        n = t
                    }(t);
                    break;
                case Bd.TEXT_TYPE:
                    !function(t) {
                        t = e.createTextNode(t.text());
                        r(t)
                    }(t);
                    break;
                case Bd.END_ELEMENT_TYPE:
                    n = n.parentNode;
                    break;
                case Bd.COMMENT_TYPE:
                    break;
                default:
                    throw {
                        message: "Unsupported token type: " + t.type()
                    }
                }
            }
        }
    }, zd = function(t, n) {
        var r;
        n = n || window.document,
        r = n.createElement("div"),
        n.body.appendChild(r),
        r.style.position = "absolute",
        r.style.left = "-10000px",
        r.innerHTML = t;
        var o = r.firstChild || Bd.FINISHED
          , i = []
          , u = !1;
        return {
            hasNext: function() {
                return void 0 !== o
            },
            next: function() {
                var t = o
                  , e = u;
                return !u && o.firstChild ? (i.push(o),
                o = o.firstChild) : u = !u && 1 === o.nodeType || (o.nextSibling ? (o = o.nextSibling,
                !1) : (o = i.pop(),
                !0)),
                t === Bd.FINISHED || o || (n.body.removeChild(r),
                o = Bd.FINISHED),
                e = e,
                (t = t) === Bd.FINISHED ? t : t ? Bd.token(t, e) : void 0
            }
        }
    }, nr = pd, er = function(n) {
        return pd(function(t, e) {
            e.filterAttributes(Nd.bind(n, t)),
            t.emit(e)
        })
    }, Yd = /^(P|H[1-6]|T[DH]|LI|DIV|BLOCKQUOTE|PRE|ADDRESS|FIELDSET|DD|DT|CENTER)$/, qd = !1, $d = nr(function(t, e) {
        function n() {
            qd || (t.emit(Bd.createStartElement("P", {}, {}, t.document)),
            qd = !0)
        }
        var r;
        switch (e.type()) {
        case Bd.TEXT_TYPE:
            n(),
            t.emit(e);
            break;
        case Bd.END_ELEMENT_TYPE:
            qd && (r = e,
            Yd.test(r.tag()) || e === Bd.FINISHED) ? (t.emit(Bd.createEndElement("P", t.document)),
            qd = !1) : "BR" === e.tag() && t.emit(e);
            break;
        case Bd.START_ELEMENT_TYPE:
            "BR" === e.tag() ? (e.filterAttributes(gd),
            e.filterStyles(gd),
            t.emit(e)) : "IMG" === e.tag() && e.getAttribute("alt") && (n(),
            t.emit(Bd.createText(e.getAttribute("alt"), t.document)))
        }
        e === Bd.FINISHED && t.emit(e)
    }), or = function(t) {
        var e = t;
        return 65279 === e.charCodeAt(e.length - 1) ? e.substring(0, e.length - 1) : t
    }, t = [or], K = tinymce.isIE && 9 <= document.documentMode ? [function(t) {
        return t.replace(/<BR><BR>/g, "<br>")
    }
    , function(t) {
        return t.replace(/<br>/g, " ")
    }
    , function(t) {
        return t.replace(/<br><br>/g, "<BR><BR>")
    }
    , function(t) {
        return /<(h[1-6r]|p|div|address|pre|form|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|caption|blockquote|center|dl|dt|dd|dir|fieldset)/.test(t) ? t.replace(/(?:<br>&nbsp;[\s\r\n]+|<br>)*(<\/?(h[1-6r]|p|div|address|pre|form|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|caption|blockquote|center|dl|dt|dd|dir|fieldset)[^>]*>)(?:<br>&nbsp;[\s\r\n]+|<br>)*/g, "$1") : t
    }
    ].concat(t) : t, Vd = {
        all: Nd.compose(K),
        textOnly: or
    }, Gd = /^(mso-.*|tab-stops|tab-interval|language|text-underline|text-effect|text-line-through|font-color|horiz-align|list-image-[0-9]+|separator-image|table-border-color-(dark|light)|vert-align|vnd\..*)$/, g = nr(function(t, e) {
        var r, n = t.settings.get("retain_style_properties");
        e.filterStyles((r = n,
        function(t, e) {
            var n = !1;
            switch (r) {
            case "all":
            case "*":
                n = !0;
                break;
            case "valid":
                n = !Gd.test(t);
                break;
            case void 0:
            case "none":
                n = "list-style-type" === t;
                break;
            default:
                n = 0 <= ("," + r + ",").indexOf("," + t + ",")
            }
            return n ? e : null
        }
        )),
        t.emit(e)
    }), rr = nr(function(t, e) {
        t.seenList || (t.inferring ? "LI" === e.tag() && (e.type() === Bd.START_ELEMENT_TYPE ? t.inferring++ : (t.inferring--,
        t.inferring || (t.needsClosing = !0))) : ("OL" === e.tag() || "UL" === e.tag() ? t.seenList = !0 : "LI" === e.tag() && (t.inferring = 1,
        t.needsClosing || t.emit(Bd.createStartElement("UL", {}, {}, t.document))),
        !t.needsClosing || t.inferring || e.isWhitespace() || (t.needsClosing = !1,
        t.emit(Bd.createEndElement("UL", t.document))))),
        t.emit(e)
    }), X = er(function(t, e) {
        return "name" === t || "id" === t ? null : e
    }), Ht = er(function(t, e) {
        if ("class" === t)
            switch (this.settings.get("strip_class_attributes")) {
            case "mso":
                return 0 === e.indexOf("Mso") ? null : e;
            case "none":
                return e;
            default:
                return null
            }
        return e
    }), Wt = function() {
        if (0 < navigator.userAgent.indexOf("Gecko") && navigator.userAgent.indexOf("WebKit") < 0)
            return !1;
        var t = document.createElement("div");
        try {
            t.innerHTML = '<p style="mso-list: Ignore;">&nbsp;</p>'
        } catch (t) {
            return !1
        }
        return "Ignore" === Bd.token(t.firstChild).getStyle("mso-list")
    }(), Kd = function(t, e) {
        return t.type() === Bd.START_ELEMENT_TYPE ? 0 === t.getAttributeCount() || e && 1 === t.getAttributeCount() && null !== t.getAttribute("style") && void 0 !== t.getAttribute("style") : t.type() === Bd.END_ELEMENT_TYPE
    }, Xd = Wt, Jd = function(t) {
        return "A" === t.tag() || "SPAN" === t.tag()
    }, Zd = function(t) {
        t = t.getStyle("mso-list");
        return t && "skip" !== t
    }, Qd = [], tm = [], em = !1, Rn = nr(function(t, e) {
        function n(t) {
            return !(0 <= ",FONT,EM,STRONG,SAMP,ACRONYM,CITE,CODE,DFN,KBD,TT,B,I,U,S,SUB,SUP,INS,DEL,VAR,SPAN,".indexOf("," + t.tag() + ",") && Kd(t, !0))
        }
        0 === (Qd = Qd || []).length ? e.type() !== Bd.START_ELEMENT_TYPE || n(e) ? t.emit(e) : hd(t, e) : (em = em || n(e),
        hd(t, e))
    }), zt = er(function(t, e) {
        return "style" === t && "" === e ? null : e
    }), t = er(function(t, e) {
        return "lang" === t ? null : e
    }), K = nr(function(t, e) {
        if ("IMG" === e.tag()) {
            if (e.type() === Bd.END_ELEMENT_TYPE && t.skipEnd)
                return void (t.skipEnd = !1);
            if (e.type() === Bd.START_ELEMENT_TYPE) {
                if (/^file:/.test(e.getAttribute("src")))
                    return void (t.skipEnd = !0);
                if (t.settings.get("base_64_images") && /^data:image\/.*;base64/.test(e.getAttribute("src")))
                    return void (t.skipEnd = !0)
            }
        }
        t.emit(e)
    }), or = nr(function(t, e) {
        "META" !== e.tag() && "LINK" !== e.tag() && t.emit(e)
    }), nm = [], Wt = nr(function(t, e) {
        var n;
        e.type() === Bd.START_ELEMENT_TYPE && "A" === e.tag() ? (nm.push(e),
        yd(e) && t.defer(e)) : e.type() === Bd.END_ELEMENT_TYPE && "A" === e.tag() ? (n = nm.pop(),
        yd(n) && t.defer(e),
        0 === nm.length && t.emitDeferred()) : t.hasDeferred() ? t.defer(e) : t.emit(e)
    }), rm = !1, om = [nr(function(t, e) {
        "SCRIPT" === e.tag() ? rm = e.type() === Bd.START_ELEMENT_TYPE : rm || (e.filterAttributes(function(t, e) {
            return /^on/.test(t) || "language" === t ? null : e
        }),
        t.emit(e))
    }), X, K, g, t, zt, Ht, Wt, Rn, or, rr], Wt = nr(function(t, n) {
        n.filterAttributes(function(t, e) {
            return "align" !== t && ("UL" !== n.tag() && "OL" !== n.tag() || "type" !== t) ? e : null
        }),
        t.emit(n)
    }), Rn = er(function(t, e) {
        return /^xmlns(:|$)/.test(t) ? null : e
    }), or = nr(function(t, e) {
        e.tag && /^([OVWXP]|U[0-9]+|ST[0-9]+):/.test(e.tag()) || t.emit(e)
    }), rr = er(function(t, e) {
        return "href" === t && (0 <= e.indexOf("#_Toc") || 0 <= e.indexOf("#_mso")) ? null : e
    }), er = er(function(t, e) {
        return /^v:/.test(t) ? null : e
    }), im = [{
        regex: /^\(?[dc][\.\)]$/,
        type: {
            tag: "OL",
            type: "lower-alpha"
        }
    }, {
        regex: /^\(?[DC][\.\)]$/,
        type: {
            tag: "OL",
            type: "upper-alpha"
        }
    }, {
        regex: /^\(?M*(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})[\.\)]$/,
        type: {
            tag: "OL",
            type: "upper-roman"
        }
    }, {
        regex: /^\(?m*(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})[\.\)]$/,
        type: {
            tag: "OL",
            type: "lower-roman"
        }
    }, {
        regex: /^\(?[0-9]+[\.\)]$/,
        type: {
            tag: "OL"
        }
    }, {
        regex: /^([0-9]+\.)*[0-9]+\.?$/,
        type: {
            tag: "OL",
            variant: "outline"
        }
    }, {
        regex: /^\(?[a-z]+[\.\)]$/,
        type: {
            tag: "OL",
            type: "lower-alpha"
        }
    }, {
        regex: /^\(?[A-Z]+[\.\)]$/,
        type: {
            tag: "OL",
            type: "upper-alpha"
        }
    }], um = {
        "\u2022": {
            tag: "UL",
            type: "disc"
        },
        "\xb7": {
            tag: "UL",
            type: "disc"
        },
        "\xa7": {
            tag: "UL",
            type: "square"
        }
    }, am = {
        o: {
            tag: "UL",
            type: "circle"
        },
        "-": {
            tag: "UL",
            type: "disc"
        },
        "\u25cf": {
            tag: "UL",
            type: "disc"
        }
    }, cm = function(t, e, n) {
        return t === e || t && e && t.tag === e.tag && t.type === e.type && (n || t.variant === e.variant)
    }, sm = {
        guessListType: function(t, e, n) {
            var r, o, i = null;
            return t && (r = t.text,
            o = t.symbolFont),
            r = Nd.trim(r),
            (i = am[r]) ? i = bd(i, r) : o ? i = (i = um[r]) ? bd(i, r) : {
                tag: "UL",
                variant: r
            } : (Nd.each(im, function(t) {
                if (t.regex.test(r)) {
                    if (e && cm(t.type, e, !0))
                        return (i = t.type).start = parseInt(r, 10),
                        !1;
                    (i = i || t.type).start = parseInt(r, 10)
                }
            }),
            i && !i.variant && (o = "(" === r.charAt(0) ? "()" : ")" === r.charAt(r.length - 1) ? ")" : ".",
            i = bd(i, o))),
            i && "OL" === i.tag && n && ("P" !== n.tag() || /^MsoHeading/.test(n.getAttribute("class"))) && (i = null),
            i
        },
        eqListType: cm,
        checkFont: function(t, e) {
            var n;
            return t.type() === Bd.START_ELEMENT_TYPE && ((n = t.getStyle("font-family")) ? e = "Wingdings" === n || "Symbol" === n : /^(P|H[1-6]|DIV)$/.test(t.tag()) && (e = !1)),
            e
        }
    }, fm = (xd = function(t, e) {
        var n, r = /([^{]+){([^}]+)}/g;
        for (r.lastIndex = 0; null !== (n = r.exec(t)); )
            Nd.each(n[1].split(","), function(t) {
                var e = t.indexOf(".");
                if (0 <= e && void 0 === Nd.trim(t.substring(e + 1)))
                    return (void 0)[2],
                    !1
            }(void 0));
        return !1
    }
    ,
    Td = {},
    function(t, e) {
        var n = t + "," + e;
        return Td.hasOwnProperty(n) ? Td[n] : (e = xd.call(null, t, e),
        Td[n] = e)
    }
    ), lm = function(t, e) {
        function n(t) {
            (t = t.style.fontFamily) && (o = "Wingdings" === t || "Symbol" === t)
        }
        var r, o = !1;
        if (t.type() === Bd.START_ELEMENT_TYPE && e.openedTag && "SPAN" === t.tag()) {
            for (n(r = e.openedTag.getNode()),
            1 < r.childNodes.length && "A" === r.firstChild.tagName && "" === r.firstChild.textContent && (r = r.childNodes[1]); r.firstChild && ("SPAN" === r.firstChild.tagName || "A" === r.firstChild.tagName); )
                n(r = r.firstChild);
            if (!(r = r.firstChild) || 3 !== r.nodeType)
                return r && "IMG" === r.tagName;
            if (t = r.value,
            Nd.trim(t) || (t = (r = r.parentNode.nextSibling) ? r.value : ""),
            !r || Nd.trim(r.parentNode.textContent) != t)
                return !1;
            if (t = sm.guessListType({
                text: t,
                symbolFont: o
            }, null, e.originalToken))
                return r.nextSibling && "SPAN" === r.nextSibling.tagName && /^[\u00A0\s]/.test(r.nextSibling.firstChild.value) && ("P" === e.openedTag.tag() || "UL" === t.tag)
        }
        return !1
    }, dm = function() {
        var o, i;
        return {
            guessIndentLevel: function(t, e, n, r) {
                return r && /^([0-9]+\.)+[0-9]+\.?$/.test(r.text) ? r.text.replace(/([0-9]+|\.$)/g, "").length + 1 : (n = i || parseInt(fm(n, e.getAttribute("class"))),
                e = function(t, e) {
                    for (var n = 0, r = t.parentNode; null != r && r !== e.parentNode; )
                        n += r.offsetLeft,
                        r = r.offsetParent;
                    return n
                }(t.getNode(), e.getNode()),
                n ? o ? e += o : 0 === e && (e += o = n) : n = 48,
                i = n = Math.min(e, n),
                Math.max(1, Math.floor(e / n)) || 1)
            }
        }
    }, mm = function() {
        var e = !1;
        return {
            check: function(t) {
                return e && t.type() === Bd.TEXT_TYPE ? (t.text(),
                !0) : t.type() === Bd.START_ELEMENT_TYPE && "STYLE" === t.tag() ? e = !0 : t.type() === Bd.END_ELEMENT_TYPE && "STYLE" === t.tag() && !(e = !1)
            }
        }
    }, pm = ["disc", "circle", "square"];
    function gm(u, a) {
        function c(t, e) {
            var n = {}
              , r = {};
            d++,
            e && t.type && (n = {
                "list-style-type": t.type
            }),
            t.start && 1 < t.start && (r = {
                start: t.start
            }),
            o.push(t),
            u.emit(Bd.createStartElement(t.tag, r, n, a)),
            i = t
        }
        function s() {
            u.emit(Bd.createEndElement(o.pop().tag, a)),
            d--,
            i = o[o.length - 1]
        }
        function f(t, e, n) {
            var r, o = {};
            t ? void 0 !== (r = t.getStyle("margin-left")) && (o["margin-left"] = r) : o["list-style-type"] = "none",
            i && !sm.eqListType(i, e) && (s(),
            n && (u.emit(Bd.createStartElement("P", {}, {}, a)),
            u.emit(Bd.createText("\xa0", a)),
            u.emit(Bd.createEndElement("P", a))),
            c(e, !0)),
            u.emit(Bd.createStartElement("LI", {}, o, a)),
            t && "P" !== t.tag() ? (l.push(t.tag()),
            t.filterStyles(function() {
                return null
            }),
            u.emit(t)) : l.push("P")
        }
        var i, o = [], l = [], d = 0, m = function() {
            var t = l ? l.pop() : "P";
            "P" !== t && u.emit(Bd.createEndElement(t, a)),
            u.emit(Bd.createEndElement("LI", a))
        };
        return {
            openList: c,
            closelist: s,
            closeAllLists: function() {
                for (; 0 < d; )
                    m(),
                    s();
                u.commit()
            },
            closeItem: m,
            openLI: f,
            openItem: function(t, e, n, r) {
                if (n) {
                    for (d = d || 0; t < d; )
                        m(),
                        s();
                    var o, i;
                    if (i = t,
                    "UL" === (o = n).tag && pm[i - 1] === o.type && (o = {
                        tag: "UL"
                    }),
                    n = o,
                    d === t)
                        m(),
                        f(e, n, r);
                    else
                        for (1 < t && 0 < l.length && "P" !== l[l.length - 1] && (u.emit(Bd.createEndElement(l[l.length - 1], a)),
                        l[l.length - 1] = "P"); d < t; )
                            c(n, d === t - 1),
                            f(d === t ? e : void 0, n)
                }
            },
            getCurrentListType: function() {
                return i
            },
            getCurrentLevel: function() {
                return d
            }
        }
    }
    function vm(t, e) {
        Nd.log("Unexpected token in list conversion: " + e.toString()),
        t.rollback()
    }
    function hm(t, e, n) {
        n.type() === Bd.TEXT_TYPE && "" === Nd.trim(n.text()) ? t.defer(n) : e.skippedPara || n.type() !== Bd.START_ELEMENT_TYPE || "P" !== n.tag() || Zd(n) ? Tm(t, e, n) : (e.openedTag = n,
        t.defer(n),
        e.nextFilter = xm)
    }
    function ym(t, e, n) {
        n.type() === Bd.END_ELEMENT_TYPE && e.originalToken.tag() === n.tag() && (e.nextFilter = hm,
        e.styleLevelAdjust = -1),
        t.emit(n)
    }
    function bm(t) {
        Om.nextFilter = Lm.initial,
        Om.itemLevel = 0,
        Om.originalToken = null,
        Om.commentMode = !1,
        Om.openedTag = null,
        Om.symbolFont = !1,
        Om.listType = null,
        Om.indentGuesser = dm(),
        Om.emitter = gm(t, t.document),
        Om.styles = mm(),
        Om.spanCount = [],
        Om.skippedPara = !1,
        Om.styleLevelAdjust = 0,
        Om.bulletInfo = void 0
    }
    var xm = function(t, e, n) {
        n.type() !== Bd.START_ELEMENT_TYPE || "SPAN" !== n.tag() || 0 !== e.spanCount.length || !Xd && lm(n, e) || Zd(n) ? n.type() === Bd.END_ELEMENT_TYPE ? "SPAN" === n.tag() ? (t.defer(n),
        e.spanCount.pop()) : "P" === n.tag() ? (t.defer(n),
        e.skippedPara = !0,
        e.openedTag = null,
        e.nextFilter = hm) : (e.nextFilter = Tm,
        e.nextFilter(t, e, n)) : n.isWhitespace() ? t.defer(n) : (e.nextFilter = Tm,
        e.nextFilter(t, e, n)) : (t.defer(n),
        e.spanCount.push(n))
    }
      , Tm = function(t, e, n) {
        function r() {
            e.emitter.closeAllLists(),
            t.emitDeferred(),
            e.openedTag = null,
            t.emit(n),
            e.nextFilter = Tm
        }
        var o;
        n.type() === Bd.START_ELEMENT_TYPE && Zd(n) && "LI" !== n.tag() ? (o = / level([0-9]+)/.exec(n.getStyle("mso-list"))) && o[1] ? (e.itemLevel = parseInt(o[1], 10) + e.styleLevelAdjust,
        e.nextFilter === Tm ? t.emitDeferred() : t.dropDeferred(),
        e.nextFilter = wm,
        t.startTransaction(),
        e.originalToken = n,
        e.commentMode = !1) : r() : !Xd && (n.type() === Bd.COMMENT_TYPE && "[if !supportLists]" === n.text() || lm(n, t)) ? (n.type() === Bd.START_ELEMENT_TYPE && "SPAN" === n.tag() && e.spanCount.push(n),
        e.nextFilter = wm,
        t.startTransaction(),
        e.originalToken = e.openedTag,
        e.commentMode = !0,
        e.openedTag = null,
        t.dropDeferred()) : n.type() === Bd.END_ELEMENT_TYPE && Jd(n) ? (t.defer(n),
        e.spanCount.pop()) : n.type() === Bd.START_ELEMENT_TYPE ? Jd(n) ? (t.defer(n),
        e.spanCount.push(n)) : (e.openedTag && (e.emitter.closeAllLists(),
        t.emitDeferred()),
        e.openedTag = n,
        t.defer(n)) : r()
    }
      , wm = function(t, e, n) {
        var r, o;
        n.type() === Bd.START_ELEMENT_TYPE && "Ignore" === n.getStyle("mso-list") && (e.nextFilter = Em),
        n.type() === Bd.START_ELEMENT_TYPE && "SPAN" === n.tag() ? (e.spanCount.push(n),
        (e.commentMode && "" === n.getAttribute("style") || null === n.getAttribute("style")) && (e.nextFilter = Em)) : "A" === n.tag() ? n.type() === Bd.START_ELEMENT_TYPE ? e.spanCount.push(n) : e.spanCount.pop() : n.type() === Bd.TEXT_TYPE ? e.commentMode ? (e.nextFilter = Em,
        e.nextFilter(t, e, n)) : (r = e.originalToken,
        o = e.spanCount,
        e.emitter.closeAllLists(),
        t.emit(r),
        Nd.each(o, Nd.bind(t.emit, t)),
        t.emit(n),
        t.commit(),
        e.originalToken = r,
        e.nextFilter = ym) : !e.commentMode && n.type() === Bd.COMMENT_TYPE || vm(t, n)
    }
      , Em = function(t, e, n) {
        n.type() === Bd.TEXT_TYPE ? n.isWhitespace() || (e.nextFilter = Sm,
        e.bulletInfo = {
            text: n.text(),
            symbolFont: e.symbolFont
        }) : Jd(n) ? n.type() === Bd.START_ELEMENT_TYPE ? e.spanCount.push(n) : e.spanCount.pop() : n.type() === Bd.START_ELEMENT_TYPE && "IMG" === n.tag() ? (e.nextFilter = Sm,
        e.bulletInfo = {
            text: "\u2202",
            symbolFont: !0
        }) : vm(t, n)
    }
      , Sm = function(t, e, n) {
        n.type() === Bd.START_ELEMENT_TYPE && Jd(n) ? (e.spanCount.push(n),
        e.nextFilter = Am) : n.type() === Bd.END_ELEMENT_TYPE && Jd(n) ? (e.spanCount.pop(),
        e.nextFilter = Im) : n.type() === Bd.END_ELEMENT_TYPE && "IMG" === n.tag() || vm(t, n)
    }
      , Am = function(t, e, n) {
        n.type() === Bd.END_ELEMENT_TYPE && (Jd(n) && e.spanCount.pop(),
        e.nextFilter = Im)
    }
      , Im = function(o, i, u) {
        function t(t) {
            var e, n, r;
            if (i.nextFilter = _m,
            i.commentMode && (i.itemLevel = i.indentGuesser.guessIndentLevel(u, i.originalToken, i.styles.styles, i.bulletInfo)),
            i.listType = sm.guessListType(i.bulletInfo, (e = i.emitter.getCurrentListType(),
            n = i.emitter.getCurrentLevel(),
            r = i.itemLevel,
            n === r ? e : null), i.originalToken),
            i.listType) {
                for (i.emitter.openItem(i.itemLevel, i.originalToken, i.listType, i.skippedPara),
                o.emitDeferred(); 0 < i.spanCount.length; )
                    o.emit(i.spanCount.shift());
                t && o.emit(u)
            } else
                Nd.log("Unknown list type: " + i.bulletInfo.text + " Symbol font? " + i.bulletInfo.symbolFont),
                o.rollback()
        }
        u.type() === Bd.TEXT_TYPE || u.type() === Bd.START_ELEMENT_TYPE ? t(!0) : u.type() === Bd.COMMENT_TYPE ? t("[endif]" !== u.text()) : u.type() === Bd.END_ELEMENT_TYPE ? Jd(u) && i.spanCount.pop() : vm(o, u)
    }
      , _m = function(t, e, n) {
        n.type() === Bd.END_ELEMENT_TYPE && n.tag() === e.originalToken.tag() ? (e.nextFilter = hm,
        e.skippedPara = !1) : t.emit(n)
    }
      , Lm = {
        initial: Tm
    }
      , Om = {};
    bm({});
    function Dm(t, e, n, r) {
        for (var o = Wd(n), i = zd(t, n), u = function(t, e, n, r) {
            for (var o = e, i = t.length - 1; 0 <= i; i--)
                o = t[i](o, n, r);
            return o
        }(r, o, e, n); i.hasNext(); )
            u.receive(i.next());
        return o.dom
    }
    var Nm = [or, nr(function(t, e) {
        Om.styles.check(e) || (Om.symbolFont = sm.checkFont(e, Om.symbolFont),
        Om.nextFilter(t, Om, e))
    }, function(t) {
        bm(t)
    }), rr, er, Rn, Wt]
      , Cm = function(t) {
        return 0 <= t.indexOf("<o:p>") || 0 <= t.indexOf("p.MsoNormal, li.MsoNormal, div.MsoNormal") || 0 <= t.indexOf("MsoListParagraphCxSpFirst") || 0 <= t.indexOf("<w:WordDocument>")
    }
      , Pm = {
        filter: function(t, e, n) {
            var r = Vd.all(t)
              , o = Cm(r);
            e.setWordContent(o);
            t = om;
            return o && (t = Nm.concat(om)),
            Dm(r, e, n, t)
        },
        filterPlainText: function(t, e, n) {
            t = Vd.textOnly(t);
            return Dm(t, e, n, [$d])
        },
        isWordContent: Cm
    }
      , km = {
        openDialog: function(t, e, n) {
            var r = e("cement.dialog.paste.clean")
              , o = e("cement.dialog.paste.merge")
              , o = [{
                text: r,
                ariaLabel: r,
                onclick: function() {
                    i.close(),
                    n("clean")
                }
            }, {
                text: o,
                ariaLabel: o,
                onclick: function() {
                    i.close(),
                    n("merge")
                }
            }]
              , o = {
                title: e("cement.dialog.paste.title"),
                spacing: 10,
                padding: 10,
                items: [{
                    type: "container",
                    html: e("cement.dialog.paste.instructions")
                }],
                buttons: o
            }
              , i = t.windowManager.open(o);
            setTimeout(function() {
                i && i.getEl().focus()
            }, 1)
        }
    }
      , Rm = {
        openDialog: function(t, e, n) {
            var r = e("cement.dialog.paste.clean")
              , o = e("cement.dialog.paste.merge")
              , o = {
                title: e("cement.dialog.paste.title"),
                body: {
                    type: "panel",
                    items: [{
                        type: "htmlpanel",
                        name: "instructions",
                        html: e("cement.dialog.paste.instructions")
                    }]
                },
                buttons: [{
                    text: r,
                    type: "custom",
                    name: "clean"
                }, {
                    text: o,
                    type: "custom",
                    name: "merge"
                }],
                onAction: function(t, e) {
                    switch (e.name) {
                    case "clean":
                        t.close(),
                        n("clean");
                        break;
                    case "merge":
                        t.close(),
                        n("merge")
                    }
                }
            };
            t.windowManager.open(o)
        }
    };
    function Mm(i, u, a) {
        return {
            showDialog: function(o) {
                var t, e = xt(i), n = Tt(i), r = Pm.isWordContent(o) ? e : n, n = function(t) {
                    var e, n, r = Ld(i).sanitizeHtml(o);
                    Ft(r) || (e = {
                        content: r
                    },
                    i.fire("PastePreProcess", {
                        content: e,
                        internal: !1
                    }),
                    t = kd.create(t, t, !0),
                    n = Pm.filter(r, t, i.getDoc()),
                    i.fire("PastePostProcess", {
                        node: n,
                        internal: !1
                    }),
                    i.undoManager.transact(function() {
                        var t = Od(n);
                        i.insertContent(t)
                    }))
                };
                "clean" === (t = r) || "merge" === t ? n(r) : (a ? Rm : km).openDialog(i, u, n)
            }
        }
    }
    function Fm(t, e) {
        return t.hasEventListeners(e)
    }
    function jm(t) {
        return t.plugins.powerpaste
    }
    var Um = function(t, e, n, r, o) {
        var i, u, a, c = e.replace(Ed, "");
        return i = c,
        u = n,
        a = r,
        e = o,
        i = Fm(t = c = t, "PastePreProcess") ? (e = {
            internal: u,
            content: i,
            source: a,
            mode: e = e
        },
        t.fire("PastePreProcess", e).content) : i,
        n = n,
        r = r,
        o = o,
        Fm(c, "PastePostProcess") ? function(t, e, n, r, o) {
            e = t.dom.add(t.getBody(), "div", {
                style: "display:none"
            }, e),
            o = {
                internal: n,
                node: e,
                source: r,
                mode: o
            },
            o = t.fire("PastePostProcess", o).node.innerHTML;
            return t.dom.remove(e),
            o
        }(c, i, n, r, o) : i
    }
      , Hm = function(e) {
        var n = ht(e)
          , r = e.getParam("paste_postprocess");
        n && e.on("PastePreProcess", function(t) {
            return n.call(e, jm(e), t)
        }),
        r && e.on("PastePostProcess", function(t) {
            return r.call(e, jm(e), t)
        })
    }
      , Bm = function(t) {
        var e = t.toLowerCase()
          , t = {
            jpg: "jpeg",
            jpe: "jpeg",
            jfi: "jpeg",
            jif: "jpeg",
            jfif: "jpeg",
            pjpeg: "jpeg",
            pjp: "jpeg",
            svg: "svg+xml"
        };
        return Ct(t, e) ? "image/" + t[e] : "image/" + e
    };
    function Wm(r, t, n, o) {
        var i;
        r.on("dragstart dragend", function(t) {
            i = "dragstart" === t.type
        }),
        r.on("dragover dragend dragleave", function(t) {
            i || t.preventDefault()
        });
        function u(t, e) {
            return e in t && 0 < t[e].length
        }
        function a(t) {
            var n, t = t.target.files || t.dataTransfer.files;
            return st(t, (n = _t(r),
            function(e) {
                return kt(e.type, "image/") && ut(n, function(t) {
                    return Bm(t) === e.type
                })
            }
            ))
        }
        function c(t) {
            En(t).get(function(t) {
                var e = at(t, function(t) {
                    var e = kn.fromTag("img")
                      , t = Bt.cata(t, n.getLocalURL, function(t, e, n) {
                        return e
                    });
                    return Nn(e, "src", t),
                    e.dom.outerHTML
                }).join("");
                r.insertContent(Um(r, e, !1, "imagedrop", "auto"), {
                    merge: St(r)
                }),
                gt(r) && n.uploadImages(t)
            })
        }
        var s = function(t) {
            t = t["text/plain"];
            return !!t && 0 === t.indexOf("file://")
        };
        r.on("drop", function(t) {
            if (!i) {
                var e = tinymce.dom.RangeUtils;
                e && e.getCaretRangeFromPoint && ((n = e.getCaretRangeFromPoint(t.clientX || 0, t.clientY || 0, r.getDoc())) && r.selection.setRng(n));
                e = a(t);
                if (0 < e.length)
                    return c(e),
                    void t.preventDefault();
                var n = function(t) {
                    var e, n = {};
                    if (t && (!t.getData || (e = t.getData("Text")) && 0 < e.length && (n["text/plain"] = e),
                    t.types))
                        for (var r = 0; r < t.types.length; r++) {
                            var o = t.types[r];
                            n[o] = t.getData(o)
                        }
                    return n
                }(t.dataTransfer);
                s(e = n) || !u(e, "text/html") && !u(e, "text/plain") || (Mm(r, Fn, o).showDialog(n["text/html"] || n["text/plain"]),
                t.preventDefault())
            }
        })
    }
    function zm() {
        function n(t) {
            URL.revokeObjectURL(t.objurl())
        }
        var r = {};
        return {
            add: function(t, e, n) {
                e = e,
                n = n,
                n = {
                    id: l(t),
                    imageresult: l(e),
                    objurl: l(n)
                };
                return r[t] = n
            },
            get: function(t) {
                return G.from(r[t])
            },
            remove: function(t) {
                var e = r[t];
                delete r[t],
                void 0 !== e && n(e)
            },
            lookupByData: function(e) {
                return function(t, e) {
                    for (var n = Ot(t), r = 0, o = n.length; r < o; r++) {
                        var i = n[r]
                          , u = t[i];
                        if (e(u, i, t))
                            return G.some(u)
                    }
                    return G.none()
                }(r, function(t) {
                    return Tn(t.imageresult()) === e
                })
            },
            destroy: function() {
                R(r, n),
                r = {}
            }
        }
    }
    function Ym(t, e) {
        return kr(t, "img[" + Km + '="' + e + '"]')
    }
    function qm(t) {
        return kr(t, "img:not([" + Km + "])[" + Gm.blobId() + "]")
    }
    function $m() {
        var o = []
          , i = []
          , t = xr({
            complete: br(["response"])
        })
          , u = function() {
            t.trigger.complete(i),
            i = []
        }
          , a = function() {
            return 0 < o.length
        };
        return {
            findById: Ym,
            findAll: qm,
            register: function(t, e) {
                Nn(t, Km, e),
                o.push(e)
            },
            report: function(t, e, n) {
                var r;
                ct(e, function(t) {
                    var e;
                    He(t, Km),
                    e = n,
                    t = t,
                    i.push({
                        success: e,
                        element: t.dom
                    })
                }),
                r = t,
                o = st(o, function(t, e) {
                    return t !== r
                }),
                a() || u()
            },
            inProgress: a,
            isActive: function(t) {
                return S(o, t)
            },
            events: t.registry
        }
    }
    var Vm, Rn = An("ephox-salmon").resolve, Wt = Rn("upload-image-in-progress"), An = "data-" + Rn("image-blob"), Rn = "data-" + Rn("image-upload"), Gm = {
        uploadInProgress: l(Wt),
        blobId: l(An),
        trackedImage: l(Rn)
    }, Km = Gm.trackedImage();
    (Rn = Vm = Vm || {}).JSON = "json",
    Rn.Blob = "blob",
    Rn.Text = "text",
    Rn.FormData = "formdata",
    Rn.MultipartFormData = "multipart/form-data";
    function Xm(t) {
        return dp(Zt.nu(t))
    }
    function Jm(n) {
        return Zt.nu(function(e) {
            var t = new FileReader;
            t.onload = function(t) {
                t = t.target ? t.target.result : new Blob([]);
                e(t)
            }
            ,
            t.readAsText(n)
        })
    }
    function Zm(t) {
        try {
            var e = JSON.parse(t);
            return Xo.value(e)
        } catch (t) {
            return Xo.error("Response was not JSON.")
        }
    }
    function Qm(t) {
        return Zt.pure(t.response)
    }
    function tp(t, e) {
        switch (t) {
        case Vm.JSON:
            return Zm(e.response).fold(function() {
                return Qm(e)
            }, Zt.pure);
        case Vm.Blob:
            return t = e,
            G.from(t.response).map(Jm).getOr(Zt.pure("no response content"));
        case Vm.Text:
        default:
            return Qm(e)
        }
    }
    function ep(t, e) {
        function n() {
            return pp(e.response)
        }
        function r(t) {
            return gp({
                message: t,
                status: e.status,
                responseText: e.responseText
            })
        }
        switch (t) {
        case Vm.JSON:
            return Zm(e.response).fold(r, pp);
        case Vm.Blob:
        case Vm.Text:
            return n();
        default:
            return r("unknown data type")
        }
    }
    function np(t) {
        var e = (o = t.body,
        G.from(o).bind(function(t) {
            switch (t.type) {
            case Vm.JSON:
                return G.some("application/json");
            case Vm.FormData:
                return G.some("application/x-www-form-urlencoded; charset=UTF-8");
            case Vm.MultipartFormData:
                return G.none();
            case Vm.Text:
            default:
                return G.some("text/plain")
            }
        }))
          , n = !0 === t.credentials ? G.some(!0) : G.none()
          , r = function(t) {
            switch (t) {
            case Vm.Blob:
                return "application/octet-stream";
            case Vm.JSON:
                return "application/json, text/javascript";
            case Vm.Text:
                return "text/plain";
            default:
                return ""
            }
        }(t.responseType) + ", */*; q=0.01"
          , o = void 0 !== t.headers ? t.headers : {};
        return {
            contentType: e,
            responseType: function(t) {
                switch (t) {
                case Vm.JSON:
                    return G.none();
                case Vm.Blob:
                    return G.some("blob");
                case Vm.Text:
                    return G.some("text");
                default:
                    return G.none()
                }
            }(t.responseType),
            credentials: n,
            accept: r,
            headers: o,
            progress: et(t.progress) ? G.some(t.progress) : G.none()
        }
    }
    function rp(t) {
        var n = new FormData;
        return R(t, function(t, e) {
            n.append(e, t)
        }),
        n
    }
    function op(u) {
        return mp(function(r) {
            var n, o = new XMLHttpRequest;
            o.open(u.method, (n = u.url,
            G.from(u.query).map(function(t) {
                var e = F(t, function(t, e) {
                    return encodeURIComponent(e) + "=" + encodeURIComponent(t)
                })
                  , t = Pt(n, "?") ? "&" : "?";
                return 0 < e.length ? n + t + e.join("&") : n
            }).getOr(n)), !0);
            var i, t = np(u);
            i = o,
            (t = t).contentType.each(function(t) {
                return i.setRequestHeader("Content-Type", t)
            }),
            i.setRequestHeader("Accept", t.accept),
            t.credentials.each(function(t) {
                return i.withCredentials = t
            }),
            t.responseType.each(function(t) {
                return i.responseType = t
            }),
            t.progress.each(function(e) {
                return i.upload.addEventListener("progress", function(t) {
                    return e(t.loaded, t.total)
                })
            }),
            R(t.headers, function(t, e) {
                return i.setRequestHeader(e, t)
            });
            function e() {
                var e, t, n;
                e = u.url,
                t = u.responseType,
                tp(t, n = o).map(function(t) {
                    return {
                        message: 0 === n.status ? "Unknown HTTP error (possible cross-domain request)" : "Could not load url " + e + ": " + n.statusText,
                        status: n.status,
                        responseText: t
                    }
                }).get(function(t) {
                    return r(Xo.error(t))
                })
            }
            o.onerror = e,
            o.onload = function() {
                0 === o.status && !kt(u.url, "file:") || o.status < 100 || 400 <= o.status ? e() : ep(u.responseType, o).get(r)
            }
            ,
            t = u.body,
            G.from(t).map(function(t) {
                return t.type === Vm.JSON ? JSON.stringify(t.data) : t.type === Vm.FormData || t.type === Vm.MultipartFormData ? rp(t.data) : t.data
            }).fold(function() {
                return o.send()
            }, function(t) {
                o.send(t)
            })
        })
    }
    function ip(t, e) {
        var n = (e ? vp : hp).exec(t)
          , t = N(["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"], function(t, e) {
            return null !== (e = n[e]) && void 0 !== e ? e : ""
        });
        return jt(jt({}, t), {
            queryKey: function(t) {
                for (var e = {}; ; ) {
                    var n = yp.exec(t);
                    if (null === n)
                        return e;
                    e[n[1]] = n[2]
                }
            }(t.query)
        })
    }
    function up(t, e) {
        return void 0 === e && (e = {}),
        ip(t, null !== (e = e.strictMode) && void 0 !== e && e)
    }
    function ap(t) {
        return B(t, bp(t))
    }
    function cp(t) {
        for (var e, n = t, r = ""; "" !== n; ) {
            kt(n, "../") ? n = H(n, "../") : kt(n, "./") ? n = H(n, "./") : kt(n, "/./") ? n = "/" + H(n, "/./") : "/." === n ? n = "/" : kt(n, "/../") ? (n = "/" + H(n, "/../"),
            r = ap(r)) : "/.." === n ? (n = "/",
            r = ap(r)) : "." === n || ".." === n ? n = "" : (e = n.match(/(^\/?.*?)(\/|$)/)[1],
            n = H(n, e),
            r += e)
        }
        return r
    }
    function sp(t, e) {
        var t = up(t, n = {
            strictMode: !0
        })
          , e = up(e, n)
          , n = {};
        return "" !== e.protocol ? (n.protocol = e.protocol,
        n.authority = e.authority,
        n.path = cp(e.path),
        n.query = e.query) : ("" !== e.authority ? (n.authority = e.authority,
        n.path = cp(e.path),
        n.query = e.query) : ("" === e.path ? (n.path = t.path,
        "" !== e.query ? n.query = e.query : n.query = t.query) : (kt(e.path, "/") ? n.path = cp(e.path) : (n.path = function(t, e, n) {
            if ("" !== n && "" === t)
                return "/" + e;
            n = t.substring(t.lastIndexOf("/") + 1);
            return B(t, n) + e
        }(t.path, e.path, t.authority),
        n.path = cp(n.path)),
        n.query = e.query),
        n.authority = t.authority),
        n.protocol = t.protocol),
        n.anchor = e.anchor,
        n
    }
    function fp(t, e, n) {
        return {
            message: l(t),
            status: l(e),
            contents: l(n)
        }
    }
    function lp(t, e) {
        var n = t.name;
        return J(n) && !Rt(n, ".tmp") ? n : function(t, e) {
            if (J(t.type) && kt(t.type, "image/")) {
                t = t.type.substr("image/".length);
                return S(xp, t) ? e + "." + t : e
            }
            return e
        }(t, e)
    }
    var dp = function(i) {
        return jt(jt({}, i), {
            toCached: function() {
                return dp(i.toCached())
            },
            bindFuture: function(e) {
                return dp(i.bind(function(t) {
                    return t.fold(function(t) {
                        return Zt.pure(Xo.error(t))
                    }, function(t) {
                        return e(t)
                    })
                }))
            },
            bindResult: function(e) {
                return dp(i.map(function(t) {
                    return t.bind(e)
                }))
            },
            mapResult: function(e) {
                return dp(i.map(function(t) {
                    return t.map(e)
                }))
            },
            mapError: function(e) {
                return dp(i.map(function(t) {
                    return t.mapError(e)
                }))
            },
            foldResult: function(e, n) {
                return i.map(function(t) {
                    return t.fold(e, n)
                })
            },
            withTimeout: function(t, o) {
                return dp(Zt.nu(function(e) {
                    var n = !1
                      , r = setTimeout(function() {
                        n = !0,
                        e(Xo.error(o()))
                    }, t);
                    i.get(function(t) {
                        n || (clearTimeout(r),
                        e(t))
                    })
                }))
            }
        })
    }
      , Rn = function(t) {
        return dp(Zt.pure(Xo.value(t)))
    }
      , mp = Xm
      , pp = Rn
      , gp = function(t) {
        return dp(Zt.pure(Xo.error(t)))
    }
      , vp = /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@\/]*)(?::([^:@\/]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/
      , hp = /^(?:(?![^:@\/]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*)(?::([^:@\/]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
      , yp = /(?:^|&)([^&=]+)=?([^&]*)/g
      , bp = function(t) {
        return t.substring(t.lastIndexOf("/"))
    }
      , xp = ["jpg", "png", "gif", "jpeg"];
    function Tp(o) {
        function s(t, e) {
            return t = t.split(/\s+/),
            e = 1 === t.length && "" !== t[0] ? t[0] : e,
            function(t, e) {
                t = sp(t, e);
                return (e = "") !== (t = t).protocol && (e += t.protocol,
                e += ":"),
                "" !== t.authority && (e += "//",
                e += t.authority),
                e += t.path,
                "" !== t.query && (e += "?",
                e += t.query),
                "" !== t.anchor && (e += "#",
                e += t.anchor),
                e
            }(n, e)
        }
        function r(t, e, a) {
            var n, r, c = lp(t, e), t = (n = "image",
            r = t,
            e = c,
            (t = new FormData).append(n, r, e),
            t = t.get("image"),
            {
                type: Vm.Blob,
                data: t
            });
            t = {
                url: o.url,
                body: t,
                responseType: Vm.Text,
                credentials: !0 === o.credentials
            },
            op(jt(jt({}, t), {
                method: "post"
            })).get(function(t) {
                t.fold(function(t) {
                    a(Xo.error(fp(t.message, t.status, t.responseText)))
                }, function(e) {
                    var n, t, r, o;
                    try {
                        var i = JSON.parse(e);
                        if (!J(i.location))
                            return t = "JSON response did not contain a string location",
                            r = 500,
                            o = e,
                            void a(Xo.error(fp(t, r, o)));
                        n = i.location
                    } catch (t) {
                        n = e
                    }
                    var u = s(n, c);
                    a(Xo.value({
                        location: u
                    }))
                })
            })
        }
        var t, e, n = (t = o.url,
        t = 0 < (e = t.lastIndexOf("/")) ? t.substr(0, e) : t,
        t = void 0 === o.basePath ? t : o.basePath,
        Rt(t, "/") ? t : t + "/");
        return {
            upload: function(t, e, n) {
                t = t.imageresult();
                Oe(t).then(function(t) {
                    r(t, e, n)
                })
            }
        }
    }
    function wp(t, e) {
        return {
            image: l(t),
            blobInfo: l(e)
        }
    }
    function Ep(t, n, i, r, u, e, a) {
        function c() {
            var t = "Internal error with blob cache";
            console.error(t, u),
            a(Op.failure(fp(t, 666, u)))
        }
        t.upload(e, u, function(t) {
            var e, o = n.findById(r, u);
            ct(o, (e = Gm.uploadInProgress(),
            function(t) {
                To(t, e)
            }
            )),
            t.fold(function(t) {
                a(Op.failure(t))
            }, function(e) {
                var t, n, r;
                t = i,
                n = u,
                r = e,
                ct(o, function(t) {
                    Nn(t, "src", r.location),
                    He(t, Gm.blobId())
                }),
                Dp(t, n).fold(c, function(t) {
                    a(Op.success(e, o, t))
                })
            }),
            n.report(u, o, t.isValue())
        })
    }
    function Sp(s, e, t) {
        return ft(t, function(t) {
            return Bt.cata(t, function(u, a, c) {
                return ri(e, 'img[src="' + c + '"]').fold(function() {
                    return [Xo.error("Image that was just inserted could not be found: " + c)]
                }, function(t) {
                    return [Xo.value((e = s,
                    n = u,
                    o = c,
                    i = t,
                    t = Tn(r = a),
                    t = e.lookupByData(t).getOrThunk(function() {
                        return e.add(n, r, o)
                    }),
                    Nn(i, Gm.blobId(), t.id()),
                    wp(i, t)))];
                    var e, n, r, o, i
                })
            }, l([]))
        })
    }
    function Ap(t, o, e) {
        return e = t.findAll(e),
        t.inProgress() ? [] : at(e, function(t) {
            return e = o,
            r = Cn(n = t, Gm.blobId()),
            e.get(r).fold(function() {
                return Xo.error(r)
            }, function(t) {
                return Xo.value(wp(n, t))
            });
            var e, n, r
        })
    }
    function Ip(t) {
        return parseInt(t, 10)
    }
    function _p(t, e, n) {
        return {
            major: l(t),
            minor: l(e),
            patch: l(n)
        }
    }
    var Lp = Tp
      , Op = Ut([{
        failure: ["error"]
    }, {
        success: ["result", "images", "blob"]
    }])
      , Dp = function(e, n) {
        return e.get(n).fold(function() {
            return Xo.error("Internal error with blob cache")
        }, function(t) {
            return e.remove(n),
            Xo.value(t)
        })
    }
      , Np = function() {
        return function(t) {
            t = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(t);
            return t ? _p(Ip(t[1]), Ip(t[2]), Ip(t[3])) : _p(0, 0, 0)
        }([tinymce.majorVersion, tinymce.minorVersion].join(".").split(".").slice(0, 3).join("."))
    };
    function Cp(c) {
        function s(t, e) {
            return l(4 === (n = Np()).major() && n.minor() < 6 ? t : t + "." + (e = (t = e).toLowerCase(),
            Ct(t = {
                "image/jpeg": "jpg",
                "image/jpg": "jpg",
                "image/gif": "gif",
                "image/png": "png"
            }, e) ? t[e] : "dat"));
            var n
        }
        return {
            importImages: function(t) {
                t = ft(t, function(t) {
                    return Bt.cata(t, function(t, e, n) {
                        var r, o, i, u, a = Tn(e);
                        return [(r = t,
                        o = e,
                        i = a,
                        u = n,
                        Zt.nu(function(e) {
                            xn(o).then(function(t) {
                                c.editorUpload.blobCache.add({
                                    id: l(r),
                                    name: l(r),
                                    filename: s(r, t.type),
                                    blob: l(t),
                                    base64: l(i.split(",")[1]),
                                    blobUri: l(u),
                                    uri: l(null)
                                }),
                                e(t)
                            })
                        }))]
                    }, l([]))
                });
                return Qt(t)
            },
            uploadImages: function() {
                c.uploadImages()
            },
            prepareImages: y,
            getLocalURL: function(t, e, n) {
                return Tn(e)
            }
        }
    }
    function Pp(e, t, n) {
        function r() {
            return Fn("error.code.images.not.found") + t + Fn("error.full.stop")
        }
        function o() {
            return Fn("error.imageupload") + t + Fn("error.full.stop")
        }
        function i(t) {
            t = 0 === (t = t.status()) || 400 <= t || t < 500 ? r : o,
            n.showDialog(e, t())
        }
        return {
            instance: function() {
                return n = i,
                r = !1,
                function() {
                    for (var t = [], e = 0; e < arguments.length; e++)
                        t[e] = arguments[e];
                    r || (r = !0,
                    n.apply(null, t))
                }
                ;
                var n, r
            }
        }
    }
    function kp(t) {
        To(t, Gm.uploadInProgress())
    }
    var Rp = {
        showDialog: function(t, e) {
            var e = {
                title: "Error",
                spacing: 10,
                padding: 10,
                items: [{
                    type: "container",
                    html: e
                }],
                buttons: [{
                    text: "Ok",
                    onclick: function() {
                        n.close()
                    }
                }]
            }
              , n = t.windowManager.open(e)
        }
    }
      , Mp = function(r, t) {
        function u() {
            return kn.fromDom(r.getBody())
        }
        function a(e, t, n) {
            ct(t, function(t) {
                Nn(t, "data-mce-src", e.location)
            }),
            function(t, e, n) {
                for (var r = 0; r < t.undoManager.data.length; r++)
                    t.undoManager.data[r].content = t.undoManager.data[r].content.split(e.objurl()).join(n.location)
            }(r, n, e)
        }
        var c = zm()
          , s = $m()
          , o = Pp(r, t.url, Rp)
          , f = Lp(t);
        s.events.complete.bind(function(t) {
            !function(t) {
                for (var e = 0; e < t.undoManager.data.length; e++) {
                    var n = t.undoManager.data[e].content
                      , r = kn.fromTag("div");
                    Gr(r, co(n));
                    n = kr(r, "." + Gm.uploadInProgress());
                    ct(n, kp),
                    t.undoManager.data[e].content = r.dom.innerHTML
                }
            }(r)
        });
        function i(r, o) {
            var t, e, n, i;
            t = s,
            e = r.blobInfo().id(),
            n = r.image(),
            i = t.isActive(e),
            t.register(n, e),
            xo(n, Gm.uploadInProgress()),
            (i ? G.none() : G.some(e)).each(function(t) {
                var e, n;
                e = t,
                t = r.blobInfo(),
                n = o,
                Ep(f, s, c, u(), e, t, function(t) {
                    t.fold(function(t) {
                        n(t)
                    }, a)
                })
            })
        }
        return {
            importImages: function() {
                return Zt.pure([])
            },
            uploadImages: function(t) {
                var e, n, r;
                e = o.instance(),
                n = Ap(s, c, u()),
                ct(n, function(t) {
                    t.fold(function(t) {
                        s.report(t, [], !1)
                    }, function(t) {
                        i(t, e)
                    })
                }),
                t = t,
                r = o.instance(),
                t = Sp(c, u(), t),
                ct(t, function(t) {
                    t.fold(function(t) {
                        console.error(t)
                    }, function(t) {
                        i(t, r)
                    })
                })
            },
            prepareImages: y,
            getLocalURL: function(t, e, n) {
                return n
            }
        }
    }
      , Fp = function(o) {
        var t = Cp(o);
        return {
            importImages: function() {
                return Zt.pure([])
            },
            uploadImages: y,
            prepareImages: function(t) {
                ct(t, function(t) {
                    Bt.cata(t, function(t, e, n) {
                        var r = Tn(e);
                        ct(o.dom.select('img[src="' + n + '"]'), function(t) {
                            o.dom.setAttrib(t, "src", r)
                        })
                    }, y)
                })
            },
            getLocalURL: t.getLocalURL
        }
    };
    var jp = function(t) {
        return void 0 !== t.uploadImages
    };
    function Up(t) {
        return (jp(t) ? Cp : function(t) {
            if (mt(t)) {
                var e = {
                    url: dt(t),
                    basePath: wt(t),
                    credentials: Et(t)
                };
                return Mp(t, e)
            }
            return Fp(t)
        }
        )(t)
    }
    function Hp(e, r, t, n) {
        var o, i = e.selection, u = e.dom, a = e.getBody(), c = t.isText();
        if (t.reset(),
        n.clipboardData && n.clipboardData.getData("text/html")) {
            n.preventDefault();
            var t = n.clipboardData.getData("text/html")
              , s = t.match(/<html[\s\S]+<\/html>/i)
              , s = null === s ? t : s[0];
            return r(s)
        }
        if (!u.get("_mcePaste")) {
            if (s = u.add(a, "div", {
                id: "_mcePaste",
                class: "mcePaste"
            }, '\ufeff<br _mce_bogus="1">'),
            a = a !== e.getDoc().body ? u.getPos(e.selection.getStart(), a).y : a.scrollTop,
            u.setStyles(s, {
                position: "absolute",
                left: -1e4,
                top: a,
                width: 1,
                height: 1,
                overflow: "hidden"
            }),
            tinymce.isIE)
                return (f = u.doc.body.createTextRange()).moveToElementText(s),
                f.execCommand("Paste"),
                u.remove(s),
                "\ufeff" === s.innerHTML ? (e.execCommand("mcePasteWord"),
                void n.preventDefault()) : (r(c ? s.innerText : s.innerHTML),
                tinymce.dom.Event.cancel(n));
            var f, l = function(t) {
                t.preventDefault()
            };
            u.bind(e.getDoc(), "mousedown", l),
            u.bind(e.getDoc(), "keydown", l),
            tinymce.isGecko && ((f = e.selection.getRng(!0)).startContainer !== f.endContainer || 3 !== f.startContainer.nodeType || 1 === (n = u.select("p,h1,h2,h3,h4,h5,h6,pre", s)).length && u.remove(n.reverse(), !0)),
            o = e.selection.getRng(),
            s = s.firstChild,
            (f = e.getDoc().createRange()).setStart(s, 0),
            f.setEnd(s, 1),
            i.setRng(f),
            window.setTimeout(function() {
                var n = ""
                  , t = u.select("div.mcePaste");
                Nd.each(t, function(t) {
                    var e = t.firstChild;
                    e && "DIV" === e.nodeName && e.style.marginTop && e.style.backgroundColor && u.remove(e, 1),
                    Nd.each(u.select("div.mcePaste", t), function(t) {
                        u.remove(t, 1)
                    }),
                    Nd.each(u.select("span.Apple-style-span", t), function(t) {
                        u.remove(t, 1)
                    }),
                    Nd.each(u.select("br[_mce_bogus]", t), function(t) {
                        u.remove(t)
                    }),
                    n += t.innerHTML
                }),
                Nd.each(t, function(t) {
                    u.remove(t)
                }),
                o && i.setRng(o),
                r(n),
                u.unbind(e.getDoc(), "mousedown", l),
                u.unbind(e.getDoc(), "keydown", l)
            }, 0)
        }
    }
    var Bp = {
        getOnPasteFunction: function(e, n, r) {
            return function(t) {
                Hp(e, n, r, t)
            }
        },
        getOnKeyDownFunction: function(e, n, r) {
            return function(t) {
                (tinymce.isOpera || 0 < navigator.userAgent.indexOf("Firefox/2")) && ((tinymce.isMac ? t.metaKey : t.ctrlKey) && 86 === t.keyCode || t.shiftKey && 45 === t.keyCode) && Hp(e, n, r, t)
            }
        }
    };
    function Wp(e, t) {
        function n(e) {
            return function(t) {
                e(t)
            }
        }
        var r = this
          , o = Mm(e, Fn, !1)
          , i = Bp.getOnPasteFunction(e, o.showDialog, t);
        e.on("paste", n(i));
        t = Bp.getOnKeyDownFunction(e, o.showDialog, t);
        e.on("keydown", n(t)),
        e.addCommand("mceInsertClipboardContent", function(t, e) {
            o.showDialog(e.content || e)
        }),
        ht(e) && e.on("PastePreProcess", function(t) {
            ht(e).call(r, r, t)
        })
    }
    function zp() {
        function a(t, e, n) {
            function r(n) {
                return function() {
                    for (var t = [], e = 0; e < arguments.length; e++)
                        t[e] = arguments[e];
                    o || (o = !0,
                    null !== i && (clearTimeout(i),
                    i = null),
                    n.apply(null, t))
                }
            }
            void 0 === n && (n = 1e3);
            var o = !1
              , i = null
              , t = r(t)
              , u = r(e);
            return {
                reject: u,
                resolve: t,
                start: function() {
                    for (var t = [], e = 0; e < arguments.length; e++)
                        t[e] = arguments[e];
                    o || (i = setTimeout(function() {
                        return u.apply(null, t)
                    }, n))
                }
            }
        }
        var n = {}
          , c = {};
        tinymce.Resource = {
            add: function(t, e) {
                c[t] && (c[t](e),
                delete c[t]),
                n[t] = Gt.resolve(e)
            },
            load: function(r, o) {
                var i = 'Script at URL "' + o + '" failed to load'
                  , u = 'Script at URL "' + o + "\" did not call `tinymce.Resource.add('" + r + "', data)` within 1 second";
                if (void 0 !== n[r])
                    return n[r];
                var t = new Gt(function(t, e) {
                    var n = a(t, e);
                    c[r] = n.resolve,
                    tinymce.ScriptLoader.loadScripts([o], function() {
                        return n.start(u)
                    }, function() {
                        return n.reject(i)
                    })
                }
                );
                return n[r] = t
            }
        }
    }
    function Yp(t, e, n) {
        var r;
        if (r = t,
        !1 === tinymce.Env.iOS && "function" == typeof (null == r ? void 0 : r.setData))
            try {
                return t.clearData(),
                t.setData("text/html", e),
                t.setData("text/plain", n),
                t.setData(wd(), e),
                1
            } catch (t) {
                return
            }
    }
    function qp(t, e, n, r) {
        Yp(t.clipboardData, e.html, e.text) ? (t.preventDefault(),
        r()) : n(e.html, r)
    }
    function $p(i) {
        return function(t, e) {
            var n = i.dom.create("div", {
                contenteditable: "false",
                "data-mce-bogus": "all"
            })
              , r = i.dom.create("div", {
                contenteditable: "true",
                "data-mce-bogus": "all"
            }, t);
            i.dom.setStyles(n, {
                position: "fixed",
                top: "50%",
                left: "-3000px",
                width: "1000px",
                overflow: "hidden"
            }),
            n.appendChild(r),
            i.dom.add(i.getBody(), n);
            var o = i.selection.getRng();
            r.focus();
            t = i.dom.createRng();
            t.selectNodeContents(r),
            i.selection.setRng(t),
            setTimeout(function() {
                var t;
                i.selection.setRng(o),
                null !== (t = n.parentNode) && void 0 !== t && t.removeChild(n),
                e()
            }, 0)
        }
    }
    function Vp(t) {
        var e = t.selection.getContent({
            contextual: !0
        }).replace(/ contenteditable="([^"]+)"/g, ' data-mce-contenteditable="$1"');
        return {
            html: Ed + e,
            text: t.selection.getContent({
                format: "text"
            })
        }
    }
    function Gp(t) {
        return !t.selection.isCollapsed() || null !== (t = t).dom.getParent(t.selection.getStart(), "td[data-mce-selected],th[data-mce-selected]", t.getBody())
    }
    function Kp(t) {
        return /^https?:\/\/[\w\?\-\/+=.&%@~#]+$/i.test(t)
    }
    function Xp(n) {
        var t = /^<a href="([^"]+)">([^<]+)<\/a>$/.exec(n);
        return G.from(t).bind(function(t) {
            var e = {
                url: t[1],
                html: n
            };
            return yc(t[1] === t[2], e)
        })
    }
    function Jp(t, e, n) {
        return "extra"in t.undoManager ? (t.undoManager.extra(function() {
            og(t, e)
        }, n),
        G.some(!0)) : G.none()
    }
    var Zp = function() {
        return t = function(t) {
            return t.unbind()
        }
        ,
        n = uu(G.none()),
        {
            clear: function() {
                e(),
                n.set(G.none())
            },
            isSet: function() {
                return n.get().isSome()
            },
            set: function(t) {
                e(),
                n.set(G.some(t))
            }
        };
        function e() {
            return n.get().each(t)
        }
        var t, n
    }
      , Qp = function() {
        var e = uu(G.none());
        return {
            clear: function() {
                return e.set(G.none())
            },
            set: function(t) {
                return e.set(G.some(t))
            },
            isSet: function() {
                return e.get().isSome()
            },
            on: function(t) {
                return e.get().each(t)
            }
        }
    }
      , tg = Object.freeze({
        __proto__: null,
        loadScript: function(t, e) {
            return tinymce.Resource || zp(),
            tinymce.Resource.load(t, e)
        }
    })
      , eg = function(t) {
        var n, e;
        t.on("cut", (n = t,
        function(t) {
            Gp(n) && qp(t, Vp(n), $p(n), function() {
                var t, e = hr().browser;
                e.isChrome() || e.isFirefox() ? (t = n.selection.getRng(),
                tinymce.util.Delay.setEditorTimeout(n, function() {
                    n.selection.setRng(t),
                    n.execCommand("Delete")
                }, 0)) : n.execCommand("Delete")
            })
        }
        )),
        t.on("copy", (e = t,
        function(t) {
            Gp(e) && qp(t, Vp(e), $p(e), y)
        }
        ))
    }
      , ng = function(r, t) {
        return Xp(t).bind(function(t) {
            var e, n;
            return !1 === r.selection.isCollapsed() && Kp(t.url) ? Jp(e = r, (n = t).html, function() {
                e.execCommand("mceInsertLink", !1, n.url)
            }) : G.none()
        })
    }
      , rg = function(u, t) {
        return Xp(t).bind(function(t) {
            return r = t.url,
            o = _t(u),
            i = r.toLowerCase(),
            Kp(i) && ut(o, function(t) {
                return Rt(i, "." + t.toLowerCase())
            }) ? Jp(e = u, (n = t).html, function() {
                e.insertContent('<img src="' + n.url + '">')
            }) : G.none();
            var e, n, r, o, i
        })
    }
      , og = function(t, e) {
        return t.insertContent(e, {
            merge: St(t),
            paste: !0
        }),
        G.some(!0)
    }
      , ig = function(e, n, t) {
        return P(t, function(t) {
            return t(e, n)
        })
    };
    var ug = {
        showDialog: function(t, e) {
            e = {
                title: "Error",
                body: {
                    type: "panel",
                    items: [{
                        type: "htmlpanel",
                        html: e
                    }]
                },
                initialData: {},
                buttons: [{
                    text: "OK",
                    type: "cancel",
                    name: "ok",
                    primary: !0
                }]
            };
            t.windowManager.open(e)
        }
    }
      , ag = function() {
        var e = uu([{
            text: "Close",
            name: "close",
            type: "custom",
            primary: !0
        }])
          , r = uu({});
        return {
            setButtons: function(t) {
                var n = {}
                  , t = at(t, function(t) {
                    var e = t.text;
                    return n[e.toLowerCase()] = t.click,
                    {
                        text: e,
                        name: e.toLowerCase(),
                        type: "custom"
                    }
                });
                r.set(n),
                e.set(t)
            },
            getButtons: e.get,
            getAction: function(t) {
                var e = r.get();
                return e.hasOwnProperty(t) ? G.some(e[t]) : G.none()
            }
        }
    };
    function cg(u, a, t, e, s, f) {
        function l(t, e, n) {
            var r, o = pt(t) ? [ng, rg] : [];
            ig(t, e, o.concat([(r = n,
            function(t, e) {
                return t.undoManager.transact(function() {
                    og(t, e),
                    Dd(t.getBody()),
                    s.prepareImages(r)
                }),
                G.some(!0)
            }
            )]))
        }
        function d() {
            p.on(function(t) {
                return u.selection.moveToBookmark(t)
            }),
            p.clear()
        }
        var n, r, m = Zp(), p = Qp(), g = (n = e ? e.jsUrl : t,
        r = "/js",
        n.replace(/\/$/, "") + "/" + r.replace(/^\//, "")), v = Ld(u), h = It(u);
        u.on("init", function() {
            var c, i, t = {
                baseUrl: g,
                cacheSuffix: yt(u),
                officeStyles: xt(u),
                htmlStyles: Tt(u),
                translations: Fn,
                allowLocalImages: bt(u),
                pasteBinAttrs: {
                    "data-mce-bogus": "all"
                },
                intraFlag: {
                    isMarked: Sd,
                    findClipboardTags: function(t) {
                        t = st(t, function(t) {
                            return In(t) && Pt(va(t), wd())
                        });
                        return t.length ? G.some(t) : G.none()
                    }
                },
                keepSrc: vt(u),
                cleanFilteredInlineElements: At(u),
                sanitizer: v,
                tabSpaces: h
            }, e = f ? (i = u,
            {
                createDialog: function() {
                    function e() {
                        t.trigger.close()
                    }
                    var n = ""
                      , r = Qp()
                      , o = ag()
                      , t = xr({
                        close: br([])
                    });
                    return {
                        events: t.registry,
                        setTitle: function(t) {
                            return n = t
                        },
                        setContent: function(t) {
                            return r.set(t)
                        },
                        setButtons: function(t) {
                            o.setButtons(t)
                        },
                        show: function() {
                            r.on(function(t) {
                                t = Od(t.dom),
                                t = {
                                    title: n,
                                    body: {
                                        type: "panel",
                                        items: [{
                                            type: "htmlpanel",
                                            html: t
                                        }]
                                    },
                                    initialData: {},
                                    buttons: o.getButtons(),
                                    onCancel: e,
                                    onAction: function(t, e) {
                                        o.getAction(e.name).each(b),
                                        t.close()
                                    }
                                };
                                i.windowManager.open(t)
                            })
                        },
                        hide: y,
                        destroy: function() {
                            r.clear()
                        },
                        reflow: function() {}
                    }
                }
            }) : (c = u,
            {
                createDialog: function() {
                    function e() {
                        n.trigger.close()
                    }
                    function t() {
                        r.off("close", e),
                        r.close("close")
                    }
                    var r, o = "", i = [], u = [], a = Qp(), n = xr({
                        close: br([])
                    });
                    return {
                        events: n.registry,
                        setTitle: function(t) {
                            o = t
                        },
                        setContent: function(t) {
                            var e = Od(t.dom);
                            i = [{
                                type: "container",
                                html: e
                            }],
                            a.set(t)
                        },
                        setButtons: function(t) {
                            var r = [];
                            t.forEach(function(t, e, n) {
                                r.push({
                                    text: t.text,
                                    ariaLabel: t.text,
                                    onclick: t.click
                                })
                            }),
                            u = r
                        },
                        show: function() {
                            0 === u.length && (u = [{
                                text: "Close",
                                onclick: function() {
                                    r.close()
                                }
                            }]);
                            var t = {
                                title: o,
                                spacing: 10,
                                padding: 10,
                                minWidth: 300,
                                minHeight: 100,
                                layout: "flex",
                                items: i,
                                buttons: u
                            };
                            r = c.windowManager.open(t);
                            var n = kn.fromDom(r.getEl());
                            a.on(function(t) {
                                var e = ri(n, "." + Cn(t, "class")).getOrDie("We must find this element or we cannot continue");
                                Ho(e, t),
                                Wo(e)
                            }),
                            r.on("close", e)
                        },
                        hide: function() {
                            t()
                        },
                        destroy: function() {
                            t()
                        },
                        reflow: function() {}
                    }
                }
            }), n = kn.fromDom(u.getBody()), r = sd(n, e.createDialog, y, t, tg), o = (void 0 === (t = v) && (t = rf),
            wf([ad(h)], cd(), t));
            ct([r, o], function(t) {
                t.events.cancel.bind(function() {
                    d()
                }),
                t.events.error.bind(function(t) {
                    d(),
                    u.notificationManager ? u.notificationManager.open({
                        text: Fn(t.message),
                        type: "error"
                    }) : (f ? ug : Rp).showDialog(u, Fn(t.message))
                }),
                t.events.insert.bind(function(t) {
                    var e = at(t.elements, function(t) {
                        return Od(t.dom)
                    }).join("")
                      , n = Ad(e);
                    u.focus(),
                    s.importImages(t.assets).get(function() {
                        d(),
                        l(u, Um(u, n, t.isInternal, t.source, t.mode), t.assets),
                        gt(u) && s.uploadImages(t.assets)
                    })
                })
            }),
            u.addCommand("mceInsertClipboardContent", function(t, e) {
                void 0 !== e.content ? r.pasteCustom(yf(e.content, v)) : void 0 !== e.text && o.pasteCustom(bf(e.text, v))
            });
            n = Vo(n, "paste", function(t) {
                p.isSet() || p.set(u.selection.getBookmark(1)),
                (a.isText() ? o : r).paste(t.raw),
                a.reset()
            });
            m.set(n),
            eg(u)
        }),
        u.on("remove", function() {
            m.clear()
        })
    }
    var sg = function(n, r) {
        var o = uu(n.getParam("paste_as_text", !1, "boolean"))
          , i = uu(!1);
        n.on("keydown", function(t) {
            var e;
            e = t,
            tinymce.util.VK.metaKeyPressed(e) && 86 === e.keyCode && e.shiftKey && (i.set(!0),
            tinymce.Env.ie && tinymce.Env.ie < 10 && (t.preventDefault(),
            n.fire("paste", {})))
        });
        var u = function() {
            var t = !o.get();
            o.set(t),
            t = t,
            n.fire("PastePlainTextToggle", {
                state: t
            }),
            n.focus()
        };
        return {
            buttonToggle: function(t) {
                var e = !o.get();
                r ? t.setActive(e) : this.active(e),
                u()
            },
            toggle: u,
            reset: function() {
                i.set(!1)
            },
            isText: function() {
                return i.get() || o.get()
            }
        }
    };
    function fg(a) {
        return c(tinymce, "4.0.28") ? (s.error('The "powerpaste" plugin requires at least 4.0.28 version of TinyMCE.'),
        function() {}
        ) : function(n, t) {
            function e(e) {
                function t(t) {
                    e.setActive(t.state)
                }
                return e.setActive(u.isText()),
                n.on("PastePlainTextToggle", t),
                function() {
                    return n.off("PastePlainTextToggle", t)
                }
            }
            function r() {
                var e = this;
                e.active(u.isText()),
                n.on("PastePlainTextToggle", function(t) {
                    e.active(t.state)
                })
            }
            var o, i = !c(tinymce, "5.0.0"), u = sg(n, i);
            tinymce.Env.ie && tinymce.Env.ie < 10 ? Wp(n, u) : (o = Up(n),
            cg(n, u, t, a, o, i),
            lt(n) ? Lt(n) : Wm(n, 0, o, i)),
            Hm(n),
            i ? (n.ui.registry.addToggleButton("pastetext", {
                icon: "paste-text",
                tooltip: "Paste as text",
                onAction: u.buttonToggle,
                onSetup: e
            }),
            n.ui.registry.addToggleMenuItem("pastetext", {
                icon: "paste-text",
                text: "Paste as text",
                onAction: u.buttonToggle,
                onSetup: e
            })) : (n.addButton("pastetext", {
                icon: "pastetext",
                tooltip: "Paste as text",
                onclick: u.buttonToggle,
                onPostRender: r
            }),
            n.addMenuItem("pastetext", {
                text: "Paste as text",
                selectable: !0,
                onclick: u.buttonToggle,
                onPostRender: r
            })),
            f(n, u)
        }
    }
    // tinymce.PluginManager.requireLangPack("powerpaste", "ar,bg_BG,ca,cs,da,de,el,es,eu,fa,fi,fr_FR,he_IL,hr,hu_HU,id,it,ja,kk,ko_KR,nb_NO,nl,pl,pt_BR,pt_PT,ro,ru,sk,sl_SI,sv_SE,th_TH,tr,uk,zh_CN,zh_TW"),
    tinymce.PluginManager.add("powerpaste", fg(void 0))
}();
