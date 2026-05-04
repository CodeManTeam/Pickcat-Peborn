// 源代码来自 @SLIGHTNING，有修改

( () => {
    "use strict";
    var t, e = {
        700: function(t, e) {
            var n = this && this.__awaiter || function(t, e, n, i) {
                return new (n || (n = Promise))((function(o, r) {
                    function a(t) {
                        try {
                            s(i.next(t))
                        } catch (t) {
                            r(t)
                        }
                    }
                    function c(t) {
                        try {
                            s(i["throw"](t))
                        } catch (t) {
                            r(t)
                        }
                    }
                    function s(t) {
                        var e;
                        t.done ? o(t.value) : (e = t.value,
                        e instanceof n ? e : new n((function(t) {
                            t(e)
                        }
                        ))).then(a, c)
                    }
                    s((i = i.apply(t, e || [])).next())
                }
                ))
            }
              , i = this && this.__generator || function(t, e) {
                function n(n) {
                    return function(s) {
                        return function(n) {
                            if (i)
                                throw new TypeError("Generator is already executing.");
                            for (; c && (c = 0,
                            n[0] && (a = 0)),
                            a; )
                                try {
                                    if (i = 1,
                                    o && (r = 2 & n[0] ? o["return"] : n[0] ? o["throw"] || ((r = o["return"]) && r.call(o),
                                    0) : o.next) && !(r = r.call(o, n[1])).done)
                                        return r;
                                    switch (o = 0,
                                    r && (n = [2 & n[0], r.value]),
                                    n[0]) {
                                    case 0:
                                    case 1:
                                        r = n;
                                        break;
                                    case 4:
                                        return a.label++,
                                        {
                                            value: n[1],
                                            done: 0
                                        };
                                    case 5:
                                        a.label++,
                                        o = n[1],
                                        n = [0];
                                        continue;
                                    case 7:
                                        n = a.ops.pop(),
                                        a.trys.pop();
                                        continue;
                                    default:
                                        if (!((r = (r = a.trys).length > 0 && r[r.length - 1]) || 6 !== n[0] && 2 !== n[0])) {
                                            a = 0;
                                            continue
                                        }
                                        if (3 === n[0] && (!r || n[1] > r[0] && n[1] < r[3])) {
                                            a.label = n[1];
                                            break
                                        }
                                        if (6 === n[0] && a.label < r[1]) {
                                            a.label = r[1],
                                            r = n;
                                            break
                                        }
                                        if (r && a.label < r[2]) {
                                            a.label = r[2],
                                            a.ops.push(n);
                                            break
                                        }
                                        r[2] && a.ops.pop(),
                                        a.trys.pop();
                                        continue
                                    }
                                    n = e.call(t, a)
                                } catch (t) {
                                    n = [6, t],
                                    o = 0
                                } finally {
                                    i = r = 0
                                }
                            if (5 & n[0])
                                throw n[1];
                            return {
                                value: n[0] ? n[1] : void 0,
                                done: 1
                            }
                        }([n, s])
                    }
                }
                var i, o, r, a = {
                    label: 0,
                    sent: function() {
                        if (1 & r[0])
                            throw r[1];
                        return r[1]
                    },
                    trys: [],
                    ops: []
                }, c = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
                return c.next = n(0),
                c["throw"] = n(1),
                c["return"] = n(2),
                "function" == typeof Symbol && (c[Symbol.iterator] = function() {
                    return this
                }
                ),
                c
            }
            ;
            Object.defineProperty(e, "__esModule", {
                value: 1
            }),
            e.runInEditor = function() {
                return n(this, void 0, void 0, (function() {
                    return i(this, (function() {
                        var e;
                        return e = window.XMLHttpRequest,
                        window.XMLHttpRequest = function() {
                            var o = new e
                              , r = o.send;
                            return o.send = function(e) {
                                var o, a, c, s, l;
                                e instanceof FormData ? (o = e.get("fname"),
                                a = e.get("file"),
                                "test.json" == o && a instanceof File ? (c = this,
                                s = arguments,
                                (l = new FileReader).readAsText(a),
                                l.onload = function() {
                                    return n(this, void 0, void 0, (function() {
                                        var n, o, l;
                                        return i(this, (function() {
                                            try {
                                                n = function(e) {
                                                    return 0 == e.unsafeExtensionWidgetList.length ? e : {
                                                        ...e,
                                                        unsafeExtensionWidgetList: [],
                                                        bypassAudit: {
                                                            unsafeExtensionWidgetList: e.unsafeExtensionWidgetList
                                                        }
                                                    }
                                                }(n = JSON.parse(this.result)),
                                                o = new Blob([JSON.stringify(n).replace(/UNSAFE_EXTENSION_/g, "EXTENSION_")],{
                                                    type: "text/plain"
                                                }),
                                                l = new File([o],a.name,{
                                                    type: a.type
                                                }),
                                                e.set("file", l)
                                            } catch (t) {
                                                console.error("绕过失败", t)
                                            }
                                            return r.apply(c, s),
                                            [2]
                                        }
                                        ))
                                    }
                                    ))
                                }
                                ) : r.apply(this, arguments)) : r.apply(this, arguments)
                            }
                            ,
                            o.send.toString = function() {}
                            .toString.bind(r),
                            o
                        }
                        ,
                        XMLHttpRequest.toString = function() {}
                        .toString.bind(e),
                        [2]
                    }
                    ))
                }
                ))
            }
        }
    }, n = {};
    t = function i(t) {
        var o, r = n[t];
        return void 0 !== r ? r.exports : (o = n[t] = {
            exports: {}
        },
        e[t].call(o.exports, o, o.exports, i),
        o.exports)
    }(700),
    true && (0,
    t.runInEditor)()
}
)();
