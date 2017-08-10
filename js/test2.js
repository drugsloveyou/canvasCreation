
webpackJsonp([6], [, , , , , , , function(t, e, n) {
    "use strict";
    function i(t, e) {
        p.jQuery || "function" != typeof window.$ ? (f = document.createElement("script"),
        document.body.appendChild(f),
        f.onload = function() {
            a(t, e)
        }
        ,
        f.onerror = function(t) {
            e && e(t, l)
        }
        ,
        f.src = l) : a(t, e)
    }
    function a(t, e) {
        o(),
        s(t, e)
    }
    function s(t, e) {
        f = document.createElement("script"),
        document.body.appendChild(f),
        f.onload = function() {
            var e = new bbComment(p.selector,p.id,p.type || 8);
            e.init(),
            t && t(e)
        }
        ,
        f.onerror = function(t) {
            e && e(t, d)
        }
        ,
        f.src = d
    }
    function o() {
        h = document.createElement("link"),
        document.body.appendChild(h),
        h.rel = "stylesheet",
        h.href = u,
        p.autoStyle && (v = document.createElement("style"),
        v.type = "text/css",
        v.textContent = p.selector + "{position: relative;margin: 0 auto 40px;padding: 1.5em 2em;width: 850px;background: #fff;border-radius: 4px;z-index: 1;}",
        document.body.appendChild(v))
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(5)
      , c = function(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }(r);
    e.default = function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return new c.default(function(e, n) {
            t.selector || t.id ? (p = t,
            p.jQuery = !p.hasOwnProperty("jQuery") || p.jQuery,
            p.autoStyle = !p.hasOwnProperty("autoStyle") || p.autoStyle) : n("COMMENT ERROR: NO SELECTOR OR ID."),
            i(function(t) {
                e(t)
            }, function(t, e) {
                document.querySelector(p.selector).style.display = "none",
                console.log("%c😲 OPPS! SCRIPT LOAD ERROR", "color:#f33;font-size:14px;font-weight:bold"),
                console.log("%cEVENT TARGET: " + e, "color:#f66")
            })
        }
        )
    }
    ;
    var l = "//static.hdslb.com/live-static/libs/jquery/jquery-1.11.3.min.js"
      , u = "//static.hdslb.com/phoenix/dist/css/comment.min.css"
      , d = "//static.hdslb.com/phoenix/dist/js/comment.min.js"
      , f = void 0
      , h = void 0
      , v = void 0
      , p = void 0
}
, , , , , , , , , , , , , , , , , , , function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(147)
      , a = function(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }(i);
    e.default = {
        computed: {
            usingTransition: function() {
                return !!(0,
                a.default)().match(/(Opera Modern)|(Chrome)|(Firefox)/)
            }
        },
        props: {
            show: {
                default: !1
            },
            backgroundColor: {
                type: String,
                default: "#fff"
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.default = {
        name: "bl-button",
        props: {
            disabled: Boolean,
            type: {
                type: String,
                default: "primary"
            },
            size: {
                type: String,
                default: "size"
            }
        },
        methods: {
            handleClick: function(t) {
                this.$emit("click", t)
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = n(3)
      , s = i(a)
      , o = n(6)
      , r = i(o)
      , c = n(2)
      , l = n(1)
      , u = c.panelName.download;
    e.default = {
        data: function() {
            return {
                downloadItems: c.downloadItems,
                myBrowser: c.myBrowser,
                show: !1
            }
        },
        methods: {
            registerEvents: function() {
                var t = this;
                s.default.$on(c.eventName.showPanel, function(e) {
                    t.show = e === u
                }),
                s.default.$on(c.eventName.hidePanel, function(e) {
                    e === u && (t.show = !1)
                })
            },
            lens: function() {
                var t = new r.default(this.$refs.contentCtnr);
                t && t.observe({
                    deepWatch: !0
                })
            }
        },
        created: function() {
            this.registerEvents()
        },
        mounted: function() {
            this.lens()
        },
        watch: {
            show: function() {
                var t = null;
                return function(e) {
                    e && !/(IE|Edge)/.test(c.myBrowser) && (t || (t = new l.SeqAnimation(Array.prototype.slice.call(this.$refs.contentCtnr.children),"block")),
                    t.reset(),
                    t.seqIn())
                }
            }()
        }
    }
}
, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(1);
    e.default = {
        data: function() {
            return {
                buttons: [{
                    icon: "live-icon weibo-dark",
                    title: "使用微博账号登录",
                    href: "https://passport.bilibili.com/login"
                }, {
                    icon: "live-icon qq-dark",
                    title: "使用 QQ 账号登录",
                    href: "https://passport.bilibili.com/login"
                }, {
                    label: "登录",
                    title: "登录",
                    onClick: i.liveQuickLogin,
                    divider: !0
                }, {
                    label: "注册",
                    title: "注册",
                    href: "http://www.bilibili.com/register"
                }]
            }
        },
        methods: {
            login: function() {
                (0,
                i.liveQuickLogin)()
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.default = {
        props: {
            avatar: {
                type: String,
                default: ""
            },
            link: {
                type: String,
                default: "/"
            },
            username: {
                type: String,
                default: "--"
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.default = {}
}
, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    e.default = {
        props: {
            type: {
                type: Number,
                default: 1
            },
            avatar: {
                type: String,
                default: "//static.hdslb.com/images/member/noface.gif"
            },
            link: {
                type: String,
                default: "/"
            },
            title: {
                type: String,
                default: "--"
            },
            time: {
                type: String,
                default: "刚刚"
            },
            username: {
                type: String,
                default: "--"
            }
        },
        computed: {
            typeText: function() {
                return 1 === this.type ? "小视频" : "相簿"
            },
            isVc: function() {
                return 1 === this.type
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    function a(t) {
        return {
            avatar: (0,
            p.bfsImgLink)(t.face, 50, 50, /\.(jpg|png)$/),
            username: t.uname,
            title: t.title,
            roomID: t.roomid,
            link: t.link
        }
    }
    function s(t) {
        var e = JSON.parse(t.content)
          , n = {
            uid: e.user.uid,
            avatar: (0,
            p.bfsImgLink)(e.user.head_url, 50, 50),
            username: e.user.name,
            type: t.type
        };
        if (1 === t.type)
            (0,
            c.default)(n, {
                uploadTime: "1分钟前" !== e.item.upload_time_text ? e.item.upload_time_text : "刚刚",
                link: "//vc.bilibili.com/video/" + e.item.id,
                title: (e.item.tags.length ? "#" + e.item.tags[0] + "# " : "") + e.item.description
            });
        else if (2 === t.type) {
            var i = new Date(e.item.upload_time)
              , a = Math.ceil((Date.now() - i.getTime()) / 1e3)
              , s = void 0;
            s = a > 31536e3 ? Math.floor(a / 31536e3) + "年前" : a > 2592e3 ? Math.floor(a / 2592e3) + "月前" : a > 86400 ? Math.floor(a / 86400) + "天前" : a > 3600 ? Math.floor(a / 3600) + "小时前" : a > 120 ? Math.floor(a / 60) + "分钟前" : "刚刚",
            (0,
            c.default)(n, {
                uploadTime: s,
                link: "//h.bilibili.com/ywh/" + e.item.doc_id,
                title: (e.item.tags.length ? "#" + e.item.tags[0].tag + "# " : "") + e.item.description
            })
        }
        return n
    }
    function o(t) {
        var e = t.uploadTime;
        return !(~e.indexOf("年前") || ~e.indexOf("月前") || ~e.indexOf("天前") && parseInt(e, 10) > I)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(15)
      , c = i(r)
      , l = n(165)
      , u = i(l)
      , d = n(6)
      , f = i(d)
      , h = n(3)
      , v = i(h)
      , p = n(1)
      , m = n(2)
      , g = n(82)
      , w = i(g)
      , b = n(81)
      , y = i(b)
      , C = n(84)
      , x = i(C)
      , k = n(83)
      , _ = i(k)
      , E = n(17)
      , A = n(18)
      , P = i(A)
      , L = m.panelName.myLink
      , I = 7;
    e.default = {
        data: function() {
            return {
                onLiveAnchors: {
                    list: [],
                    loadError: !1,
                    scrollPage: 1,
                    requestPage: 1,
                    allowHintText: !1,
                    inLoading: !0,
                    hasMore: !0
                },
                vcActivities: {
                    list: [],
                    loadError: !1,
                    hintText: "",
                    allowHintText: !1,
                    resetState: !1,
                    nextOffset: 0,
                    inLoading: !0,
                    psUpdating: !1,
                    hasMore: !0
                },
                show: !1,
                dataInterval: {
                    live: !1,
                    vc: !1
                },
                lastEmpty: !1,
                myBrowser: m.myBrowser
            }
        },
        components: {
            VcItem: x.default,
            VcItemLoading: _.default,
            LiveItem: w.default,
            LiveItemLoading: y.default
        },
        computed: {
            onLiveAnchorsTotalPage: function() {
                return Math.ceil(this.onLiveAnchors.list.length / 4)
            },
            loadingItemCount: function() {
                return {
                    live: this.onLiveAnchors.list.length ? [0] : [0, 1, 2, 3],
                    vc: this.vcActivities.list.length ? [0] : [0, 1, 2]
                }
            },
            angryEmoji: function() {
                return p.randomEmoji.angry()
            },
            happyEmoji: function() {
                return p.randomEmoji.happy()
            },
            helplessEmoji: function() {
                return p.randomEmoji.helpless()
            },
            sadEmoji: function() {
                return p.randomEmoji.sad()
            },
            shockEmoji: function() {
                return p.randomEmoji.shock()
            },
            showEmptyHint: function() {
                return !this.onLiveAnchors.list.length && !this.vcActivities.list.length && this.lastEmpty && !this.onLiveAnchors.loadError && !this.vcActivities.loadError
            }
        },
        methods: {
            initVcPS: function() {
                var t = this
                  , e = this.$refs.activitiesCtnr;
                u.default.initialize(e, {
                    suppressScrollX: !0
                }),
                e.addEventListener("ps-y-reach-end", function() {
                    t.vcActivities.inLoading || t.vcActivities.psUpdating || t.loadVcActivities()
                })
            },
            onLiveAnchorsPrevPage: function() {
                this.onLiveAnchors.scrollPage > 1 && this.onLiveAnchors.scrollPage--
            },
            onLiveAnchorsNextPage: function() {
                this.onLiveAnchors.scrollPage < this.onLiveAnchorsTotalPage && this.onLiveAnchors.scrollPage++
            },
            onLiveAnchorsMouseWheel: function() {
                var t = !0;
                return function(e) {
                    e.preventDefault(),
                    t && (t = !1,
                    e.deltaY > 0 ? this.onLiveAnchorsNextPage() : this.onLiveAnchorsPrevPage(),
                    setTimeout(function() {
                        t = !0
                    }, 400))
                }
            }(),
            showPanel: function() {
                this.show = !0
            },
            hidePanel: function() {
                this.show = !1
            },
            registerEvents: function() {
                var t = this;
                v.default.$on(m.eventName.showPanel, function(e) {
                    e === L && t.showPanel()
                }),
                v.default.$on(m.eventName.hidePanel, function(e) {
                    e === L && t.hidePanel()
                })
            },
            loadOnLiveAnchorsData: function() {
                var t = this;
                this.onLiveAnchors.loadError = !1,
                this.onLiveAnchors.inLoading = !0,
                (0,
                E.getFeedList)(this.onLiveAnchors.requestPage).then(function(e) {
                    if (0 !== e.code)
                        throw new Error(e.code + " - " + e.msg);
                    setTimeout(function() {
                        var n = e.data.list.map(a);
                        t.onLiveAnchors.list = t.onLiveAnchors.list.concat(n),
                        n.length < 10 && (t.onLiveAnchors.hasMore = !1),
                        t.lastEmpty = t.onLiveAnchors.list.length < 1 && t.vcActivities.list.length < 1,
                        t.onLiveAnchors.requestPage++,
                        t.onLiveAnchors.inLoading = !1
                    }, 200)
                }).catch(function(e) {
                    (0,
                    P.default)("直播动态请求", e),
                    setTimeout(function() {
                        t.onLiveAnchors.loadError = !0,
                        t.onLiveAnchors.inLoading = !1
                    }, 400)
                })
            },
            loadVcActivities: function() {
                var t = this;
                this.vcActivities.hasMore && (this.vcActivities.inLoading = !0,
                this.vcActivities.loadError = !1,
                (0,
                E.getVcActivities)(10, this.vcActivities.nextOffset).then(function(e) {
                    var n = e.data;
                    if (0 !== n.code)
                        throw new Error(n.code + " - " + n.msg);
                    setTimeout(function() {
                        if (n.data.list) {
                            var e = n.data.list.map(s).filter(o);
                            e.length ? t.vcActivities.list = t.vcActivities.list.concat(e) : t.vcActivities.hasMore = !1
                        } else
                            t.vcActivities.hasMore = !1;
                        t.lastEmpty = t.onLiveAnchors.list.length < 1 && t.vcActivities.list.length < 1,
                        t.vcActivities.nextOffset = n.data.next_offset,
                        t.updatePS()
                    }, 200)
                }).catch(function(e) {
                    (0,
                    P.default)("小视频动态请求", e),
                    t.vcActivities.loadError = !0,
                    t.vcActivities.hasMore = !1,
                    setTimeout(t.updatePS, 200)
                }))
            },
            setVcNewActivitiesChecker: function() {
                var t = this;
                (0,
                E.isNewVcActivities)().then(function(e) {
                    var n = e.data;
                    if (0 !== n.code)
                        throw new Error(n.code + " - " + n.msg);
                    Boolean(n.data.newVideo) && (t.$parent.setHintCount(n.data.newVideo),
                    t.vcActivities.hasMore = !0,
                    t.vcActivities.resetState = !0)
                }).catch(function(t) {
                    (0,
                    P.default)("小视频动态请求", t)
                }),
                setTimeout(this.setVcNewActivitiesChecker, 96e3)
            },
            setLiveHeartBeatChecker: function() {
                (0,
                E.getHeartBeat)().then(function(t) {
                    if (0 !== t.code)
                        throw new Error(t.code + " - " + t.msg)
                }).catch(function(t) {
                    (0,
                    P.default)("直播心跳请求", t.status + " - " + t.statusText)
                }),
                setTimeout(this.setLiveHeartBeatChecker, 96e3)
            },
            resetLiveState: function() {
                this.onLiveAnchors.list = [],
                this.onLiveAnchors.hasMore = !0,
                this.onLiveAnchors.requestPage = 1,
                this.onLiveAnchors.scrollPage = 1
            },
            resetVcState: function() {
                var t = this.$refs.activitiesCtnr;
                this.$nextTick(function() {
                    t.scrollTop = 0
                })
            },
            updatePS: function() {
                var t = this;
                this.vcActivities.psUpdating = !0,
                this.vcActivities.inLoading = !1;
                var e = this.$refs.activitiesCtnr;
                setTimeout(function() {
                    u.default.update(e),
                    t.vcActivities.psUpdating = !1
                }, 500)
            },
            lens: function() {
                var t = !1;
                return function() {
                    var e = new f.default(this.$refs.contentCtnr);
                    e && !t && (e.observe({
                        deepWatch: !0
                    }),
                    t = !0)
                }
            }()
        },
        created: function() {
            this.registerEvents()
        },
        mounted: function() {
            this.initVcPS(),
            this.setVcNewActivitiesChecker(),
            this.setLiveHeartBeatChecker(),
            this.lens()
        },
        watch: {
            show: function(t) {
                t && (this.resetVcState(),
                this.resetLiveState(),
                this.loadVcActivities(),
                this.loadOnLiveAnchorsData(),
                this.$parent.setHintCount(0))
            },
            "onLiveAnchors.scrollPage": function(t) {
                t === this.onLiveAnchorsTotalPage && this.onLiveAnchors.hasMore && this.loadOnLiveAnchorsData()
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(14)
      , a = function(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }(i);
    e.default = {
        data: function() {
            return {
                hintCount: 0
            }
        },
        computed: {
            computedHintCount: function() {
                return this.hintCount > 99 ? "99+" : this.hintCount
            },
            hintWidth: function() {
                return this.hintCount < 10 ? "14px" : this.hintCount < 99 ? "18px" : "24px"
            },
            hasHint: function() {
                return this.hintCount > 0
            }
        },
        methods: {
            mouseEnter: function() {
                a.default.showPanel("myLink", !0)
            },
            mouseLeave: function() {
                a.default.hidePanel("myLink", !0)
            },
            setHintCount: function(t) {
                this.hintCount = t
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.default = {
        data: function() {
            return {
                arrowUp: !1
            }
        },
        props: {
            name: {
                type: String,
                default: ""
            },
            href: {
                type: String,
                default: ""
            },
            target: {
                type: String,
                default: "_blank"
            },
            label: {
                type: String,
                default: "--"
            },
            showArrow: {
                type: Boolean,
                default: !1
            },
            forceShowArrow: {
                type: Boolean,
                default: !1
            },
            mouseEnter: {
                default: 0
            },
            mouseLeave: {
                default: 0
            },
            selected: {
                type: Boolean,
                default: !1
            }
        },
        methods: {
            active: function() {
                this.mouseEnter && this.mouseEnter()
            },
            deactive: function() {
                this.mouseLeave && this.mouseLeave()
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = n(3)
      , s = i(a)
      , o = n(1)
      , r = n(168)
      , c = n(2)
      , l = n(6)
      , u = i(l)
      , d = c.panelName.live
      , f = {
        link: null,
        staticLink: null
    };
    e.default = {
        data: function() {
            return {
                staticLinks: c.staticLinks,
                hideTimeout: null,
                show: !1,
                areaList: r.areaList,
                myBrowser: c.myBrowser
            }
        },
        methods: {
            registerEvents: function() {
                var t = this;
                s.default.$on(c.eventName.showPanel, function(e) {
                    e === d && (t.show = !0)
                }),
                s.default.$on(c.eventName.hidePanel, function(e) {
                    e === d && (t.show = !1)
                })
            },
            lens: function() {
                var t = !1;
                return function() {
                    var e = new u.default(this.$refs.contentCtnr);
                    !t && e && (e.observe({
                        deepWatch: !0
                    }),
                    t = !0)
                }
            }()
        },
        created: function() {
            this.registerEvents()
        },
        mounted: function() {
            this.lens()
        },
        watch: {
            show: function(t) {
                t && !/(IE|Edge)/.test(c.myBrowser) && (f.link || (f.link = new o.SeqAnimation(Array.prototype.slice.call(this.$refs.areaList.children),"inline-block",40)),
                f.staticLink || (f.staticLink = new o.SeqAnimation(Array.prototype.slice.call(this.$refs.staticList.children),"block",40)),
                f.staticLink.reset(),
                f.link.seqIn().then(function() {
                    return f.staticLink.seqIn()
                }))
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = n(3)
      , s = i(a)
      , o = n(1)
      , r = n(169)
      , c = n(2)
      , l = n(6)
      , u = i(l)
      , d = {
        nav: null,
        area: null
    }
      , f = c.panelName.vc;
    e.default = {
        data: function() {
            return {
                areaList: r.areaList,
                myBrowser: c.myBrowser,
                navItems: r.navItems,
                show: !1
            }
        },
        methods: {
            registerEvents: function() {
                var t = this;
                s.default.$on(c.eventName.showPanel, function(e) {
                    e === f && (t.show = !0)
                }),
                s.default.$on(c.eventName.hidePanel, function(e) {
                    e === f && (t.show = !1)
                })
            },
            lens: function() {
                var t = !1;
                return function() {
                    var e = new u.default(this.$refs.contentCtnr);
                    !t && e && (e.observe({
                        deepWatch: !0
                    }),
                    t = !0)
                }
            }()
        },
        created: function() {
            this.registerEvents()
        },
        mounted: function() {
            this.lens()
        },
        watch: {
            show: function(t) {
                t && !/(IE|Edge)/.test(c.myBrowser) && (d.nav || (d.nav = new o.SeqAnimation(Array.prototype.slice.call(this.$refs.navItems.children),"block")),
                d.area || (d.area = new o.SeqAnimation(Array.prototype.slice.call(this.$refs.areaItems.children),"block")),
                d.nav.reset(),
                d.area.reset(),
                d.nav.seqIn().then(function() {
                    return d.area.seqIn()
                }))
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = n(3)
      , s = i(a)
      , o = n(1)
      , r = n(170)
      , c = n(2)
      , l = n(6)
      , u = i(l)
      , d = {
        nav: null,
        area: null
    }
      , f = c.panelName.wh;
    e.default = {
        data: function() {
            return {
                areaList: r.areaList,
                myBrowser: c.myBrowser,
                navItems: r.navItems,
                show: !1
            }
        },
        methods: {
            registerEvents: function() {
                var t = this;
                s.default.$on(c.eventName.showPanel, function(e) {
                    e === f && (t.show = !0)
                }),
                s.default.$on(c.eventName.hidePanel, function(e) {
                    e === f && (t.show = !1)
                })
            },
            lens: function() {
                var t = !1;
                return function() {
                    var e = new u.default(this.$refs.contentCtnr);
                    !t && e && (e.observe({
                        deepWatch: !0
                    }),
                    t = !0)
                }
            }()
        },
        created: function() {
            this.registerEvents()
        },
        mounted: function() {
            this.lens()
        },
        watch: {
            show: function(t) {
                t && !/(IE|Edge)/.test(c.myBrowser) && (d.nav || (d.nav = new o.SeqAnimation(Array.prototype.slice.call(this.$refs.navItems.children),"block")),
                d.area || (d.area = new o.SeqAnimation(Array.prototype.slice.call(this.$refs.areaItems.children),"block")),
                d.nav.reset(),
                d.area.reset(),
                d.nav.seqIn().then(function() {
                    return d.area.seqIn()
                }))
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(2)
      , a = n(1);
    e.default = {
        data: function() {
            return {
                keyword: "",
                focus: !1,
                minimal: !0,
                placeholder: "许下您的愿望吧 " + a.randomEmoji.happy(),
                myBrowser: i.myBrowser
            }
        },
        methods: {
            focusAction: function() {
                this.focus = !0,
                this.expandSearchbar()
            },
            blurAction: function() {
                this.focus = !1,
                this.closeSearchbar()
            },
            expandSearchbar: function() {
                this.minimal = !1,
                this.$refs.searchInput.focus()
            },
            closeSearchbar: function() {
                this.minimal = !0
            },
            search: function() {
                return this.keyword.length ? this.keyword.replace(/[^\x00-\xff]/g, "aa").length > 50 ? this.linkMsg(this.$refs.searchInput, "汉字不能超过 25 个字喔 " + a.randomEmoji.helpless()) : void this.$refs.form.submit() : this.linkMsg(this.$refs.searchInput, "帅的人写了内容，丑的人还再尝试 " + a.randomEmoji.helpless())
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = n(1)
      , s = n(2)
      , o = n(79)
      , r = i(o)
      , c = n(93)
      , l = i(c);
    e.default = {
        data: function() {
            return {
                shortcuts: s.shortcuts
            }
        },
        components: {
            DownloadPanel: r.default,
            SignPanel: l.default
        },
        methods: {
            clickFunc: function(t) {
                if (t.requireLogin)
                    return void (!(0,
                    a.loginStatus)() && (0,
                    a.liveQuickLogin)())
            },
            showHinter: function(t, e) {
                var n = this;
                this.shortcuts.some(function(i, a) {
                    if (i.name === t)
                        return n.shortcuts[a].showHinter = e,
                        !0
                })
            },
            mouseEnter: function(t) {
                t.mouseEnter && (t.requireLogin && (0,
                a.loginStatus)() || !t.requireLogin) && t.mouseEnter()
            },
            mouseLeave: function(t) {
                t.mouseLeave && (t.requireLogin && (0,
                a.loginStatus)() || !t.requireLogin) && t.mouseLeave()
            }
        },
        props: {
            page: {
                type: String,
                default: "vc"
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = n(6)
      , s = i(a)
      , o = n(3)
      , r = i(o)
      , c = n(1)
      , l = n(2)
      , u = n(166)
      , d = l.panelName.sign;
    e.default = {
        data: function() {
            return {
                myBrowser: l.myBrowser,
                days: ["日", "一", "二", "三", "四", "五", "六"],
                showPanel: !1,
                showSignin: this.$parent.showSignin,
                curMonthDays: [],
                lastMonthDays: [],
                showCurMonth: !0,
                isCheckIn: !1,
                curCheckinInfo: {
                    allDays: "",
                    curYear: "",
                    curMonth: "",
                    curDay: "",
                    curDate: "",
                    hadSignDays: 0,
                    newTask: 0,
                    status: 0,
                    text: "",
                    signDaysList: [],
                    signBonusDaysList: []
                },
                lastCheckinInfo: {
                    month: "",
                    days: "",
                    hadSignDays: 0,
                    signDaysList: [],
                    signBonusDaysList: []
                }
            }
        },
        computed: {
            currentMonth: function() {
                return this.showCurMonth ? this.curCheckinInfo.curMonth : this.lastCheckinInfo.month
            },
            hadSignDays: function() {
                return this.showCurMonth ? this.curCheckinInfo.hadSignDays : this.lastCheckinInfo.hadSignDays
            },
            allDaysInMonth: function() {
                return this.showCurMonth ? this.curCheckinInfo.allDays : this.lastCheckinInfo.days
            }
        },
        methods: {
            registerEvents: function() {
                var t = this;
                r.default.$on(l.eventName.showPanel, function(e) {
                    e === d && (t.showPanel = !0)
                }),
                r.default.$on(l.eventName.hidePanel, function(e) {
                    e === d && (t.showPanel = !1)
                })
            },
            lens: function() {
                var t = !1;
                return function() {
                    if (!t) {
                        var e = new s.default(this.$refs.contentCtnr);
                        e && e.observe({
                            deepWatch: !0
                        }),
                        t = !0
                    }
                }
            }(),
            init: function() {
                var t = this;
                (0,
                c.loginStatus)() && ((0,
                u.getSignInfo)().then(function(e) {
                    t.setData(e.data),
                    t.getCurMonthDays(t.curCheckinInfo.curDate),
                    t.getLastMonthDays(t.curCheckinInfo.curDate)
                }),
                (0,
                u.getLastMonthSignInfo)().then(function(e) {
                    t.lastCheckinInfo = e.data
                }))
            },
            signinAction: function() {
                var t = this;
                (0,
                u.signinAction)().then(function(e) {
                    e.data.status = 1,
                    e.data.isBonusDay ? t.curCheckinInfo.signBonusDaysList.push(parseInt(t.curCheckinInfo.curDay, 10)) : t.curCheckinInfo.signDaysList.push(parseInt(t.curCheckinInfo.curDay, 10)),
                    t.setData(e.data),
                    t.showCurMonth = !0,
                    t.linkMsg(t.$refs.signBtn, "签到成功惹，诶嘿嘿~ " + c.randomEmoji.happy(), "success")
                }).catch(function(e) {
                    t.linkMsg(t.$refs.signBtn, c.randomEmoji.sad() + " 签到失败惹：" + e, "error")
                })
            },
            setData: function(t) {
                for (var e in t)
                    this.curCheckinInfo[e] = t[e];
                this.$parent.showHinter("sign", (0,
                c.loginStatus)() && 1 !== t.status)
            },
            getCurMonthDays: function(t) {
                var e = new Date(t.replace(/-/g, "/"));
                e.setDate(0);
                var n = e.getDate()
                  , i = e.getDay();
                if (6 !== i)
                    for (var a = i; a >= 0; a--)
                        this.curMonthDays.push({
                            value: n - a,
                            isCurMonthDay: !1
                        });
                for (var s = 1; s <= this.curCheckinInfo.allDays; s++)
                    this.curMonthDays.push({
                        value: s,
                        isCurMonthDay: !0
                    })
            },
            getLastMonthDays: function(t) {
                var e = new Date(t.replace(/-/g, "/"));
                e.setDate(0);
                var n = e.getDate(0);
                e.setDate(0);
                for (var i = e.getDate(), a = e.getDay(), s = a; s >= 0; s--)
                    this.lastMonthDays.push({
                        value: i - s,
                        isCurMonthDay: !1
                    });
                for (var o = 1; o <= n; o++)
                    this.lastMonthDays.push({
                        value: o,
                        isCurMonthDay: !0
                    })
            },
            switchMonth: function() {
                this.showCurMonth = !this.showCurMonth
            },
            showCheckInfo: function(t) {
                var e = t.target || t.srcElement;
                (0,
                c.addClass)(e, "show-check-info")
            },
            hideCheckInfo: function(t) {
                var e = t.target || t.srcElement;
                (0,
                c.removeClass)(e, "show-check-info")
            }
        },
        created: function() {
            this.registerEvents(),
            this.init()
        },
        mounted: function() {
            this.lens()
        }
    }
}
, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = n(85)
      , s = i(a)
      , o = n(86)
      , r = i(o)
      , c = n(97)
      , l = i(c);
    e.default = {
        components: {
            LinkPanel: s.default,
            MyLink: r.default,
            UserPanel: l.default
        }
    }
}
, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.default = {
        methods: {
            callFuncInVm: function(t) {
                return t.call(this)
            }
        },
        props: {
            itemData: {
                type: Array,
                default: function() {
                    return []
                }
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.default = {
        props: ["level", "rank", "expLeft", "show"],
        methods: {
            showPanel: function() {
                this.$parent.controlLevelPanel(!0)
            },
            hidePanel: function() {
                this.$parent.controlLevelPanel(!1)
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    function i(t) {
        if (t && t.__esModule)
            return t;
        var e = {};
        if (null != t)
            for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e.default = t,
        e
    }
    function a(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = n(5)
      , o = a(s)
      , r = n(10)
      , c = a(r)
      , l = n(8)
      , u = a(l)
      , d = n(172)
      , f = i(d)
      , h = n(149)
      , v = i(h)
      , p = n(1)
      , m = n(3)
      , g = a(m)
      , w = n(2)
      , b = n(171)
      , y = a(b)
      , C = n(14)
      , x = a(C)
      , k = n(17)
      , _ = n(18)
      , E = a(_)
      , A = n(164)
      , P = a(A)
      , L = n(95)
      , I = a(L)
      , S = n(96)
      , D = a(S)
      , B = n(6)
      , M = a(B)
      , O = w.panelName.user
      , N = null
      , T = {
        InfoItem: I.default,
        LevelDetail: D.default,
        LiveProgress: P.default
    };
    y.default.ctrlBtns.forEach(function(t) {
        t.slot && (T[t.slot.name] = t.slot)
    }),
    e.default = {
        data: function() {
            return {
                timeStamp: 0,
                panelHideTimeout: null,
                loading: !0,
                loadingError: !1,
                show: !1,
                userData: {
                    _achieve: "--",
                    _currency: {
                        gold: "--",
                        silver: "--"
                    },
                    captcha: null,
                    username: "神秘用户 (=・ω・=)",
                    avatar: "",
                    vip: !1,
                    rank: {
                        level: "--",
                        rank: "--",
                        exp: "--",
                        expPercent: 0,
                        levelExp: "--"
                    },
                    msgCount: 0
                },
                myBrowser: w.myBrowser,
                showLevelPanel: !1,
                infoItems: y.default.infoItems,
                ctrlBtns: y.default.ctrlBtns,
                seqElements: null
            }
        },
        computed: {
            getUserData: function() {
                return {
                    currency: this.$store && this.$store.getters.getCurrency ? this.$store.getters.getCurrency : this.userData._currency,
                    achieve: this.$store && this.$store.getters.getAchieve ? this.$store.getters.getAchieve : this.userData._achieve
                }
            },
            quote: function() {
                var t = ["每次想到自己的年纪，就感觉忧伤.", "I'm an Artist ♂, I'm a Performance ♂ Artist.", "在这里卖萌应该没人看见吧 (･∀･)", "土豆每年也会发芽的吧~"];
                return function() {
                    return t[Math.floor(Math.random() * t.length)]
                }
            }(),
            linkUrl: function() {
                return "//link.bilibili.com/p/world/index#/" + p.cookie.getItem("DedeUserID") + "/world/"
            }
        },
        components: T,
        methods: {
            registerEvents: function() {
                var t = this;
                g.default.$on(w.eventName.showPanel, function(e) {
                    t.show = e === O
                }),
                g.default.$on(w.eventName.hidePanel, function(e) {
                    e === O && (t.show = !1)
                })
            },
            callFuncInVm: function(t) {
                return t.call(this)
            },
            userPanelIn: function() {
                x.default.showPanel(O, !0)
            },
            userPanelOut: function() {
                x.default.hidePanel(O, !0)
            },
            seqIn: function() {
                N || (N = new p.SeqAnimation(this.$refs,"block")),
                N.seqIn()
            },
            controlLevelPanel: function() {
                var t = null;
                return function(e) {
                    var n = this;
                    e ? (clearTimeout(t),
                    this.showLevelPanel = !0) : t = setTimeout(function() {
                        n.showLevelPanel = !1
                    }, 200)
                }
            }(),
            dataRequest: function() {
                var t = this;
                this.loading = !0,
                this.loadingError = !1,
                (0,
                k.getUserInfo)().then(function(e) {
                    var n = e.data;
                    if ("REPONSE_OK" !== n.code)
                        return window.console && console.error("[TypeError] 用户账号数据返回错误： " + n.code + " - " + n.msg + ".");
                    var i = n.data
                      , a = t.userData;
                    a.username = i.uname,
                    a.avatar = i.face,
                    a.rank.level = n.data.user_level,
                    a.rank.rank = n.data.user_level_rank,
                    a.rank.levelExp = parseInt(n.data.user_intimacy, 10),
                    a.rank.levelTotalExp = parseInt(n.data.user_next_intimacy, 10),
                    a.rank.expPercent = a.rank.levelExp / a.rank.levelTotalExp * 100 + "%",
                    Boolean(parseInt(i.vip, 10)) && (a.vip = "vip"),
                    Boolean(parseInt(i.svip, 10)) && (a.vip = "svip"),
                    t.$store && (t.$store.getters.getCurrency && t.$store.dispatch("setCurrency", {
                        gold: i.gold,
                        silver: i.silver,
                        achieve: i.achieve
                    }),
                    t.$store.getters.getAchieve && t.$store.dispatch("setAchieve", i.achieve),
                    t.$store.getters.getUserInfo && t.$store.dispatch("setUserInfo", {
                        username: i.uname,
                        avatar: i.face,
                        isVip: i.vip,
                        isSvip: i.svip,
                        level: i.user_level,
                        nextLevel: i.user_next_level,
                        levelExp: i.user_intimacy,
                        levelTotalExp: i.user_next_intimacy
                    })),
                    t.userData._currency.gold = i.gold,
                    t.userData._currency.silver = i.silver,
                    t.userData._achieve = i.achieve,
                    t.timeStamp = Date.now(),
                    t.loading = !1,
                    t.seqIn()
                }).catch(function(e) {
                    "object" === ("undefined" == typeof console ? "undefined" : (0,
                    u.default)(console)) && "function" == typeof console.log && console.error("[Request Error] 用户账号数据返回错误：" + e),
                    setTimeout(function() {
                        t.loading = !1,
                        t.loadingError = !0,
                        t.seqIn()
                    }, 500)
                })
            },
            setAvatar: function() {
                var t = this.getAvatarFromCookie();
                t ? this.userData.avatar = t : this.dataRequest()
            },
            getAvatarFromCookie: function() {
                return p.cookie.getItem("user_face") || ""
            },
            getMsgCount: function() {
                var t = this;
                if (void 0 === window.captcha_key)
                    return window.console && console.error("[Error] 未能获取主站 captcha, 将跳过邮件动态检查.");
                (0,
                k.getMsgCount)(window.captcha_key).then(function(e) {
                    if (0 !== (0,
                    p.toNumber)(e.code))
                        return (0,
                        E.default)("邮件状态获取", "Code - " + e.code);
                    var n = 0;
                    (0,
                    c.default)(e.data).forEach(function(t) {
                        n += (0,
                        p.toNumber)(e.data[t])
                    }),
                    t.userData.msgCount = n
                }).catch(function(t) {
                    (0,
                    E.default)("邮件状态获取", t.status + " - " + t.statusText)
                })
            },
            getMsgCountExec: function() {
                void 0 === window.captcha_key ? (0,
                k.getCaptcha)().then(this.getMsgCount).catch(function() {
                    (0,
                    E.default)("主站 captcha 获取", "网络错误或服务器宕机")
                }) : this.getMsgCount()
            },
            startMsgCountInterval: function() {
                setInterval(this.getMsgCountExec, 6e4),
                this.getMsgCountExec()
            },
            msgCountBlurChecking: function() {
                function t() {
                    e.getMsgCount.call(this),
                    window.removeEventListener("focus", t)
                }
                var e = this;
                window.addEventListener("focus", t)
            },
            logout: function() {
                p.cookie.removeItem("user_face", "/", ".bilibili.com")
            },
            lens: function() {
                var t = !1;
                return function() {
                    var e = new M.default(this.$refs.contentCtnr);
                    e && !t && (e.observe({
                        deepWatch: !0
                    }),
                    t = !0)
                }
            }(),
            enterRoom: function(t) {
                var e = this;
                return new o.default(function(t, n) {
                    e.pauseLiveIndexPlayer();
                    var i = e.createNewWindow();
                    (0,
                    k.enterMyRoom)().then(function(e) {
                        var a = e.data;
                        if (-800 === a.code)
                            return i.close(),
                            f.cellphoneBinding(),
                            n();
                        if (0 === a.code) {
                            var s = a.data;
                            return s ? (i.location.href = "//live.bilibili.com/" + s,
                            t()) : (i.close(),
                            v.show(),
                            n())
                        }
                        return 0 !== a.code ? (f.failure(a.code + " - " + a.msg),
                        n()) : void 0
                    }).catch(function(t) {
                        window.console && console.error("[Error] 进入直播间请求失败: ", t),
                        i.close(),
                        f.failure(t),
                        n()
                    })
                }
                )
            },
            createNewWindow: function() {
                return window.open()
            },
            pauseLiveIndexPlayer: function() {
                window.LivePlayer && "function" == typeof window.LivePlayer.pause_video && window.LivePlayer.pause_video()
            }
        },
        props: ["vipLevel"],
        created: function() {
            this.registerEvents()
        },
        mounted: function() {
            this.setAvatar(),
            this.startMsgCountInterval(),
            this.lens()
        },
        watch: {
            show: function(t, e) {
                if (t)
                    Date.now() - this.timeStamp < 3600 ? this.seqIn() : this.dataRequest();
                else
                    try {
                        N.reset(),
                        this.loadingError = !1
                    } catch (t) {}
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = n(1)
      , s = n(87)
      , o = i(s)
      , r = n(91)
      , c = i(r)
      , l = n(80)
      , u = i(l)
      , d = n(94)
      , f = i(d)
      , h = n(92)
      , v = i(h)
      , p = n(88)
      , m = i(p)
      , g = n(89)
      , w = i(g)
      , b = n(90)
      , y = i(b)
      , C = n(167)
      , x = i(C);
    e.default = {
        data: function() {
            return {
                loggedIn: (0,
                a.loginStatus)()
            }
        },
        props: {
            logoLink: {
                type: String,
                default: "//live.bilibili.com"
            },
            navItems: {
                type: Array,
                default: function() {
                    return x.default
                }
            },
            page: {
                type: String,
                default: ""
            }
        },
        components: {
            NavItem: o.default,
            SearchBar: c.default,
            GuestDoms: u.default,
            UserDoms: f.default,
            NavPanelLive: m.default,
            NavPanelVc: w.default,
            NavPanelWh: y.default,
            Shortcuts: v.default
        },
        computed: {
            isShowSearch: function() {
                return this.page.indexOf("live") > -1
            }
        },
        mounted: function() {}
    }
}
, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = n(8)
      , s = i(a)
      , o = n(4)
      , r = i(o)
      , c = n(132)
      , l = i(c)
      , u = n(20)
      , d = i(u)
      , f = n(98)
      , h = i(f)
      , v = [];
    e.default = {
        data: function() {
            return {
                popups: l.default
            }
        },
        computed: {
            currentPopup: function() {
                var t = this.popups[this.popups.length - 1]
                  , e = t.component;
                if ("object" === (void 0 === e ? "undefined" : (0,
                s.default)(e))) {
                    if (void 0 === t.content && void 0 === t.html || (window.console && console.warn("[LinkPopup] 当使用 Component 方式构建弹窗时，传入的 html 与 content 属性无效."),
                    t.html = null,
                    t.content = null),
                    "object" === (0,
                    s.default)(e._Ctor)) {
                        var n = e.name;
                        if ("string" != typeof n)
                            throw new Error("[Error] 在使用 Component 创建弹窗时必须指定 name.");
                        r.default.component(n, e),
                        v.push(n),
                        t.component.name = n
                    } else {
                        if ("string" != typeof e.name)
                            throw new Error("[Error] 在使用 Component 创建弹窗时必须指定 name.");
                        r.default.component(e.name, e),
                        v.push(e.name)
                    }
                    t.$usingComponent = !0
                }
                return t
            }
        },
        components: {
            LinkBtn: d.default,
            Shell: h.default
        },
        methods: {
            init: function(t) {
                return t.onInited && setTimeout(function() {
                    return t.onInited(t)
                }, 10),
                !0
            },
            confirm: function(t, e) {
                var n = this.currentPopup;
                if (console.log(t),
                !n.$disabled) {
                    if (n.lockWhenConfirm && n.lock(),
                    n.confirmBtn || (n.confirmBtn = e.confirmBtn),
                    n.cancelBtn || (n.cancelBtn = e.cancelBtn),
                    n.closeBtn || (n.closeBtn = e.closeBtn),
                    n.onConfirm)
                        return void n.onConfirm(n);
                    n.removePopup()
                }
            },
            cancel: function(t, e) {
                var n = this.currentPopup;
                n.$disabled || (n.confirmBtn || (n.confirmBtn = e.confirmBtn),
                n.cancelBtn || (n.cancelBtn = e.cancelBtn),
                n.closeBtn || (n.closeBtn = e.closeBtn),
                n.onCancel && n.onCancel(n),
                n.removePopup())
            },
            close: function(t) {
                t.removePopup()
            }
        }
    }
}
, function(t, e, n) {
    "use strict";
    function i() {}
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = n(20)
      , s = function(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }(a)
      , o = document.createElement("div");
    e.default = {
        props: {
            button: {
                default: function() {
                    return {
                        confirm: "确定",
                        cancel: "取消"
                    }
                }
            },
            width: {
                type: Number,
                default: 500
            },
            title: {
                type: String,
                default: ""
            },
            titleCenter: {
                type: Boolean,
                default: !1
            },
            disabled: {
                type: Boolean,
                default: !1
            },
            show: {
                type: Boolean,
                default: !1
            },
            onConfirm: {
                type: Function,
                default: i
            },
            onCancel: {
                type: Function,
                default: i
            }
        },
        components: {
            LinkBtn: s.default
        },
        computed: {
            buttons: function() {
                return {
                    confirmBtn: this.$refs.confirmBtn ? this.$refs.confirmBtn.$el : o,
                    cancelBtn: this.$refs.cancelBtn ? this.$refs.cancelBtn.$el : o,
                    closeBtn: this.$refs.closeBtn
                }
            }
        },
        methods: {
            onConfirmFunc: function(t) {
                this.onConfirm(t, this.buttons)
            },
            onCancelFunc: function(t) {
                this.onCancel(t, this.buttons)
            }
        }
    }
}
, , , function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e, n) {
    n(54);
    var i = n(0)(n(28), n(102), "data-v-1da5da37", null);
    t.exports = i.exports
}
, function(t, e, n) {
    n(52);
    var i = n(0)(n(29), n(100), "data-v-0b75bedc", null);
    t.exports = i.exports
}
, function(t, e, n) {
    n(75);
    var i = n(0)(null, n(119), "data-v-c1632bf6", null);
    t.exports = i.exports
}
, function(t, e, n) {
    n(61);
    var i = n(0)(n(30), n(109), "data-v-447f5eb7", null);
    t.exports = i.exports
}
, function(t, e, n) {
    n(55);
    var i = n(0)(n(31), n(103), "data-v-258c9d24", null);
    t.exports = i.exports
}
, function(t, e, n) {
    n(57);
    var i = n(0)(n(32), n(105), "data-v-305620d6", null);
    t.exports = i.exports
}
, function(t, e, n) {
    n(65),
    n(66),
    n(67),
    n(68);
    var i = n(0)(n(33), n(112), "data-v-5f406080", null);
    t.exports = i.exports
}
, function(t, e, n) {
    n(70);
    var i = n(0)(n(34), n(114), "data-v-65bd4ac2", null);
    t.exports = i.exports
}
, function(t, e, n) {
    n(64);
    var i = n(0)(n(35), n(111), "data-v-4f67156e", null);
    t.exports = i.exports
}
, function(t, e, n) {
    n(60);
    var i = n(0)(n(36), n(108), "data-v-405df026", null);
    t.exports = i.exports
}
, function(t, e, n) {
    n(74);
    var i = n(0)(n(37), n(118), "data-v-ab3b9964", null);
    t.exports = i.exports
}
, function(t, e, n) {
    n(73);
    var i = n(0)(n(38), n(117), "data-v-a744fd1c", null);
    t.exports = i.exports
}
, function(t, e, n) {
    n(58);
    var i = n(0)(n(39), n(106), "data-v-3178447a", null);
    t.exports = i.exports
}
, function(t, e, n) {
    n(59);
    var i = n(0)(n(40), n(107), "data-v-34c35ff1", null);
    t.exports = i.exports
}
, function(t, e, n) {
    n(56);
    var i = n(0)(n(41), n(104), "data-v-295d1b2c", null);
    t.exports = i.exports
}
, function(t, e, n) {
    n(76);
    var i = n(0)(n(42), n(120), "data-v-ce33f752", null);
    t.exports = i.exports
}
, function(t, e, n) {
    n(53);
    var i = n(0)(n(43), n(101), "data-v-16e74af8", null);
    t.exports = i.exports
}
, function(t, e, n) {
    n(72);
    var i = n(0)(n(44), n(116), "data-v-8bf2eb90", null);
    t.exports = i.exports
}
, function(t, e, n) {
    n(62),
    n(63);
    var i = n(0)(n(45), n(110), "data-v-493c4991", null);
    t.exports = i.exports
}
, function(t, e, n) {
    n(78);
    var i = n(0)(n(48), n(122), "data-v-e00e1dbe", null);
    t.exports = i.exports
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("transition", {
                attrs: {
                    name: "fade-out"
                }
            }, [t.popups.length ? n("div", {
                staticClass: "link-popup-ctnr dp-table w-100 h-100 p-fixed p-zero f-family",
                attrs: {
                    role: "alertdialog"
                }
            }, [n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: !t.currentPopup.hideMask,
                    expression: "!currentPopup.hideMask"
                }],
                staticClass: "body-merge w-100 h-100 p-absolute p-zero"
            }), n("div", {
                staticClass: "dp-table-cell v-middle"
            }, [n("shell", {
                attrs: {
                    show: !t.currentPopup.$out,
                    width: t.currentPopup.width,
                    title: t.currentPopup.title,
                    "title-center": t.currentPopup.titleCenter,
                    button: t.currentPopup.button,
                    disabled: t.currentPopup.$disabled,
                    "on-confirm": t.confirm,
                    "on-cancel": t.cancel,
                    init: t.init(t.currentPopup)
                }
            }, [t.currentPopup.$usingComponent ? [n(t.currentPopup.component.name, {
                tag: "component"
            })] : ["string" == typeof t.currentPopup.html ? n("div", {
                staticClass: "popup-content-ctnr",
                attrs: {
                    id: t.currentPopup.$id
                },
                domProps: {
                    innerHTML: t._s(t.currentPopup.html)
                }
            }) : n("div", {
                staticClass: "popup-content-ctnr",
                staticStyle: {
                    "font-size": "13px"
                },
                attrs: {
                    id: t.currentPopup.$id
                },
                domProps: {
                    textContent: t._s(t.currentPopup.content)
                }
            })]], 2)], 1)]) : t._e()])
        },
        staticRenderFns: []
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("div", {
                staticClass: "guest-panel-ctnr dp-table h-100"
            }, [n("div", {
                staticClass: "dp-table-cell v-middle"
            }, [t._l(t.buttons, function(e) {
                return [e.onClick ? n("a", {
                    staticClass: "top-nav-btn dp-i-block v-top none-select",
                    attrs: {
                        role: "button",
                        href: e.href,
                        title: e.title || ""
                    },
                    on: {
                        click: function(t) {
                            t.stopPropagation(),
                            e.onClick(t)
                        }
                    }
                }, [e.icon ? n("i", {
                    staticClass: "v-middle",
                    class: e.icon
                }) : t._e(), n("span", {
                    staticClass: "v-top",
                    domProps: {
                        textContent: t._s(e.label)
                    }
                })]) : n("a", {
                    staticClass: "top-nav-btn dp-i-block v-top none-select",
                    attrs: {
                        role: "button",
                        href: e.href,
                        title: e.title || ""
                    }
                }, [e.icon ? n("i", {
                    staticClass: "v-middle",
                    class: e.icon
                }) : t._e(), n("span", {
                    staticClass: "v-top",
                    domProps: {
                        textContent: t._s(e.label)
                    }
                })]), e.divider ? n("span", {
                    staticClass: "nav-btn-divider dp-i-block"
                }) : t._e()]
            })], 2)])
        },
        staticRenderFns: []
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("div", {
                staticClass: "info-item-ctnr"
            }, [n("div", {
                staticClass: "align-ctnr v-middle"
            }, t._l(t.itemData, function(e, i) {
                return n("div", {
                    staticClass: "info-item w-100"
                }, [n("a", {
                    attrs: {
                        href: e.link,
                        target: "_blank"
                    }
                }, [n("div", {
                    staticClass: "text-node w-100 t-over-hidden f-clear t-nowrap",
                    attrs: {
                        title: e.label + ": " + t.callFuncInVm(e.value)
                    }
                }, [n("span", {
                    staticClass: "left-label v-middle f-left"
                }, [n("i", {
                    staticClass: "live-icon svg-icon v-middle",
                    class: e.iconName
                }), n("span", {
                    staticClass: "item-label v-middle ts-dot-4",
                    domProps: {
                        textContent: t._s(e.label)
                    }
                })]), n("span", {
                    staticClass: "right-label f-right v-middle",
                    class: {
                        "t-right": 1 === t.itemData.length
                    }
                }, [n("span", {
                    staticClass: "v-middle value-text t-over-hidden t-nowrap",
                    domProps: {
                        textContent: t._s(t.callFuncInVm(e.value))
                    }
                })])])])])
            }))])
        },
        staticRenderFns: []
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("div", {
                staticClass: "download-panel-ctnr p-absolute border-box panel-shadow"
            }, [n("transition", {
                attrs: {
                    name: "fade"
                }
            }, [n("ul", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.show,
                    expression: "show"
                }],
                ref: "contentCtnr",
                staticClass: "content-ctnr w-100 p-absolute p-zero border-box over-hidden",
                class: {
                    "ie-fix panel-shadow": t.myBrowser.indexOf("IE") > -1
                }
            }, t._l(t.downloadItems, function(e) {
                return n("li", {
                    staticClass: "download-item a-move-in-left"
                }, [n("a", {
                    attrs: {
                        href: e.link,
                        target: "_blank"
                    }
                }, [n("img", {
                    staticClass: "icon v-middle",
                    attrs: {
                        src: e.icon,
                        alt: "icon"
                    }
                }), n("span", {
                    staticClass: "label v-middle",
                    domProps: {
                        textContent: t._s(e.label)
                    }
                })])])
            }))])], 1)
        },
        staticRenderFns: []
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement;
            t._self._c;
            return t._m(0)
        },
        staticRenderFns: [function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("div", {
                staticClass: "activity-item-loading-ctnr f-clear"
            }, [n("div", {
                staticClass: "user-avatar dp-i-block v-middle b-circle"
            }), n("div", {
                staticClass: "info-ctnr dp-i-block v-middle"
            }, [n("div", {
                staticClass: "first-line"
            }), n("div", {
                staticClass: "second-line"
            })])])
        }
        ]
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("transition", {
                attrs: {
                    name: "fade"
                }
            }, [n("div", {
                staticClass: "calendar-checkin p-absolute ts-dot-4 panel-shadow"
            }, [n("transition", {
                attrs: {
                    name: "fade"
                }
            }, [n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.showPanel,
                    expression: "showPanel"
                }],
                ref: "contentCtnr",
                staticClass: "content-ctnr w-100 p-absolute p-zero",
                class: {
                    "ie-fix panel-shadow": t.myBrowser.indexOf("IE") > -1
                }
            }, [n("div", {
                staticClass: "title none-select"
            }, [n("span", {
                staticClass: "month",
                class: t.showCurMonth ? "cur-month" : "last-month",
                on: {
                    click: t.switchMonth
                }
            }, [t._v(t._s(t.currentMonth) + " 月累计签到")]), n("span", {
                staticClass: "days",
                class: {
                    "f-right": /(IE 9|IE 10)/.test(t.myBrowser)
                }
            }, [t._v(t._s(t.hadSignDays) + " / " + t._s(t.allDaysInMonth))])]), n("div", {
                staticClass: "calendar-wrapper"
            }, [n("div", {
                staticClass: "calendar"
            }, [n("div", {
                staticClass: "week"
            }, t._l(t.days, function(e) {
                return n("span", {
                    staticClass: "weekday",
                    class: {
                        "dp-i-block": "IE 10" === t.myBrowser
                    },
                    domProps: {
                        textContent: t._s(e)
                    }
                })
            })), n("div", {
                staticClass: "calender-content-ctnr"
            }, [n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.showCurMonth,
                    expression: "showCurMonth"
                }],
                staticClass: "date-ctnr this-month a-move-in-left"
            }, t._l(t.curMonthDays, function(e) {
                return n("span", {
                    staticClass: "day-item",
                    class: {
                        hide: !e.isCurMonthDay,
                        "cur-day": e.value === parseInt(t.curCheckinInfo.curDay, 10),
                        checked: -1 !== t.curCheckinInfo.signDaysList.indexOf(e.value),
                        "gift-checked": -1 !== t.curCheckinInfo.signBonusDaysList.indexOf(e.value)
                    },
                    domProps: {
                        textContent: t._s(e.value)
                    },
                    on: {
                        mouseenter: t.showCheckInfo,
                        mouseleave: t.hideCheckInfo
                    }
                })
            })), n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: !t.showCurMonth,
                    expression: "!showCurMonth"
                }],
                staticClass: "date-ctnr last-month a-move-in-right"
            }, t._l(t.lastMonthDays, function(e) {
                return n("span", {
                    staticClass: "day-item",
                    class: {
                        hide: !e.isCurMonthDay,
                        checked: -1 !== t.lastCheckinInfo.signDaysList.indexOf(e.value),
                        "gift-checked": -1 !== t.lastCheckinInfo.signBonusDaysList.indexOf(e.value)
                    },
                    domProps: {
                        textContent: t._s(e.value)
                    },
                    on: {
                        mouseenter: t.showCheckInfo,
                        mouseleave: t.hideCheckInfo
                    }
                })
            }))])]), t.curCheckinInfo.status ? n("div", {
                staticClass: "checkin-rewards t-center"
            }, [n("a", {
                staticClass: "query v-middle",
                attrs: {
                    href: "//link.bilibili.com/p/center/index#/user-center/achievement/task",
                    target: "_blank"
                }
            }, [t._v("?")]), n("div", {
                staticClass: "text-ctnr dp-i-block v-middle t-left"
            }, [n("span", {
                staticClass: "today-rewards dp-block"
            }, [t._v("今日收获: " + t._s(t.curCheckinInfo.text))]), n("span", {
                staticClass: "future-rewards dp-block"
            }, [t._v(t._s(t.curCheckinInfo.specialText))])])]) : n("div", {
                ref: "signBtn",
                staticClass: "checkin-btn t-center",
                on: {
                    click: t.signinAction
                }
            }, [t._v("签到")])])])])], 1)])
        },
        staticRenderFns: []
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("div", {
                staticClass: "activity-item-ctnr f-clear"
            }, [n("a", {
                attrs: {
                    href: t.link,
                    target: "_blank"
                }
            }, [n("div", {
                staticClass: "user-avatar f-left b-circle",
                style: {
                    "background-image": "url(" + t.avatar + ")"
                },
                attrs: {
                    role: "img"
                }
            }), n("div", {
                staticClass: "info-ctnr f-left"
            }, [n("h2", {
                staticClass: "first-line t-no-wrap f-clear"
            }, [n("span", {
                staticClass: "username t-over-hidden f-left",
                domProps: {
                    textContent: t._s(t.username)
                }
            }), n("span", {
                staticClass: "time f-right"
            }, [n("span", [t._v(t._s(t.time) + "发布了")]), n("span", {
                class: {
                    orange: t.isVc,
                    blue: !t.isVc
                }
            }, [t._v(t._s(t.typeText))])])]), n("h4", {
                staticClass: "title-text t-no-wrap t-over-hidden t-left",
                domProps: {
                    textContent: t._s(t.title)
                }
            })])])])
        },
        staticRenderFns: []
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("div", {
                staticClass: "search-bar-ctnr dp-table h-100"
            }, [n("form", {
                ref: "form",
                staticClass: "dp-table-cell v-middle",
                attrs: {
                    action: "//search.bilibili.com/live",
                    name: "search-form",
                    target: "_blank"
                },
                on: {
                    submit: function(e) {
                        e.preventDefault(),
                        t.search(e)
                    }
                }
            }, [n("div", {
                staticClass: "search-bar over-hidden border-box t-nowrap in-foucs"
            }, [n("input", {
                directives: [{
                    name: "model",
                    rawName: "v-model",
                    value: t.keyword,
                    expression: "keyword"
                }],
                ref: "searchInput",
                staticClass: "v-middle",
                class: {
                    "ie-fix": t.myBrowser.indexOf("IE") > -1
                },
                attrs: {
                    type: "text",
                    name: "keyword",
                    "aria-label": "请输入播主或关键字进行搜索",
                    title: t.placeholder,
                    placeholder: t.placeholder,
                    maxlength: "50"
                },
                domProps: {
                    value: t.keyword
                },
                on: {
                    input: function(e) {
                        e.target.composing || (t.keyword = e.target.value)
                    }
                }
            }), t._m(0)])])])
        },
        staticRenderFns: [function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("button", {
                staticClass: "search-btn v-middle pointer",
                attrs: {
                    type: "submit",
                    "aria-label": "搜索",
                    title: "_(:3 」∠)_",
                    role: "search"
                }
            }, [n("i", {
                staticClass: "icon-font icon-search v-middle"
            })])
        }
        ]
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("div", {
                staticClass: "shortcuts-ctnr h-100"
            }, [n("ul", {
                staticClass: "list-none h-100"
            }, t._l(t.shortcuts, function(e) {
                return e.hiddenPage.indexOf(t.page) < 0 ? n("li", {
                    staticClass: "shortcut-item dp-table h-100 p-relative f-left pointer",
                    on: {
                        mouseenter: function(n) {
                            t.mouseEnter(e)
                        },
                        mouseleave: function(n) {
                            t.mouseLeave(e)
                        },
                        click: function(n) {
                            t.clickFunc(e)
                        }
                    }
                }, [n("div", {
                    staticClass: "dp-table-cell v-middle"
                }, [n("span", {
                    staticClass: "label v-middle p-relative"
                }, [e.hinter ? n("i", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.showHinter,
                        expression: "item.showHinter"
                    }],
                    staticClass: "hinter p-absolute a-splashing"
                }) : t._e(), n("i", {
                    staticClass: "icon-font icon dp-i-block v-middle",
                    class: e.icon
                }), n("span", {
                    domProps: {
                        textContent: t._s(e.label)
                    }
                })]), e.slotName ? n(e.slotName, {
                    tag: "component",
                    staticClass: "slot-component"
                }) : t._e()], 1)]) : t._e()
            }))])
        },
        staticRenderFns: []
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("div", {
                staticClass: "nav-panel-live p-absolute over-hidden none-select panel-shadow",
                class: {
                    "ie-fix": t.myBrowser.indexOf("IE") > -1
                }
            }, [n("transition", {
                attrs: {
                    name: "fade"
                }
            }, [n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.show,
                    expression: "show"
                }],
                ref: "contentCtnr",
                staticClass: "main-ctnr w-100 p-absolute p-zero border-box",
                class: {
                    "ie-fix panel-shadow": t.myBrowser.indexOf("IE") > -1
                }
            }, [n("div", {
                ref: "areaList",
                staticClass: "area-list p-relative"
            }, [t._l(t.areaList, function(e, i) {
                return e.skipNav ? t._e() : n("a", {
                    staticClass: "area-list-item dp-i-block t-over-hidden t-nowrap v-top border-box a-move-in-left ts-dot-2",
                    attrs: {
                        href: e.href,
                        target: "_blank"
                    }
                }, [n("i", {
                    staticClass: "v-middle",
                    class: e.iconName
                }), n("span", {
                    staticClass: "v-middle",
                    domProps: {
                        textContent: t._s(e.text)
                    }
                })])
            }), n("div", {
                staticClass: "divider w-100 p-absolute"
            })], 2), n("div", {
                ref: "staticList",
                staticClass: "static-list"
            }, t._l(t.staticLinks, function(e) {
                return n("a", {
                    staticClass: "static-link dp-block t-center v-top a-move-in-left border-box ts-dot-2",
                    attrs: {
                        href: e.href,
                        target: "_blank"
                    },
                    domProps: {
                        textContent: t._s(e.text)
                    }
                })
            }))])])], 1)
        },
        staticRenderFns: []
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("div", {
                staticClass: "user-item dp-i-block"
            }, [n("a", {
                staticClass: "user-item-link",
                attrs: {
                    href: t.link,
                    target: "_blank"
                }
            }, [n("div", {
                staticClass: "avatar p-relative m-auto b-circle bg-cover",
                style: {
                    "background-image": "url(" + t.avatar + ")"
                },
                attrs: {
                    role: "img"
                }
            }, [n("div", {
                staticClass: "hover-fx w-100 h-100 p-absolute p-zero b-circle ts-dot-4"
            })]), n("p", {
                staticClass: "username t-center t-nowrap t-over-hidden",
                domProps: {
                    textContent: t._s(t.username)
                }
            })])])
        },
        staticRenderFns: []
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("div", {
                staticClass: "user-panel-ctnr p-relative",
                on: {
                    mouseenter: function(e) {
                        e.stopPropagation(),
                        t.userPanelIn(e)
                    },
                    mouseleave: function(e) {
                        e.stopPropagation(),
                        t.userPanelOut(e)
                    }
                }
            }, [n("a", {
                attrs: {
                    href: t.linkUrl,
                    target: "_blank"
                }
            }, [n("div", {
                ref: "avatarImg",
                staticClass: "user-avatar p-relative b-circle pointer bg-center bg-no-repeat bg-cover ts-dot-4",
                class: {
                    active: t.show
                },
                style: {
                    "background-image": t.userData.avatar ? "url(" + t.userData.avatar + ")" : ""
                },
                attrs: {
                    role: "img",
                    title: "点击进入link世界查看我的作品  (=・ω・=)"
                }
            }), n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.userData.msgCount,
                    expression: "userData.msgCount"
                }],
                staticClass: "msg-hinter p-absolute b-circle a-splashing ts-dot-4"
            })]), n("div", {
                staticClass: "user-panel p-relative border-box none-select panel-shadow"
            }, [n("transition", {
                attrs: {
                    "leave-active-class": "myBrowser.indexOf('IE') > -1 ? '' : 'a-fade-out'"
                }
            }, [n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.show,
                    expression: "show"
                }],
                ref: "contentCtnr",
                staticClass: "lens-ctnr w-100 p-absolute p-zero",
                class: {
                    "ie-fix panel-shadow": t.myBrowser.indexOf("IE") > -1 && "IE 11" !== t.myBrowser
                }
            }, [n("div", {
                staticClass: "header-node w-100 p-relative border-box over-hidden"
            }, [n("h4", {
                ref: "seqIn1",
                staticClass: "username-info dp-none p-relative t-center a-move-in-left"
            }, [n("span", {
                staticClass: "text dp-i-block v-top t-over-hidden m-auto",
                attrs: {
                    title: t.userData.username
                },
                domProps: {
                    textContent: t._s(t.userData.username)
                }
            }), n("a", {
                attrs: {
                    href: "//link.bilibili.com/p/center/index#/user-center/my-info/operation?vip=true",
                    target: "_blank",
                    title: "要来一发姥爷么？ (=・ω・=)"
                }
            }, [n("i", {
                staticClass: "live-icon dp-i-block",
                class: {
                    "vip-color": "vip" === t.userData.vip,
                    "vip-year-color": "svip" === t.userData.vip,
                    "vip-gray": !t.userData.vip
                },
                staticStyle: {
                    "margin-left": "5px",
                    "margin-top": "2px"
                }
            })])]), n("div", {
                ref: "seqIn2",
                staticClass: "user-level p-absolute dp-none w-100 f-clear t-center pointer border-box a-move-in-left",
                attrs: {
                    title: "升级进度：" + t.userData.rank.expPercent
                },
                on: {
                    mouseenter: function(e) {
                        t.controlLevelPanel(!0)
                    },
                    mouseleave: function(e) {
                        t.controlLevelPanel(!1)
                    }
                }
            }, [n("span", {
                staticClass: "user-level-text t-right f-left",
                domProps: {
                    textContent: t._s("UL." + t.userData.rank.level)
                }
            }), n("span", {
                staticClass: "user-level-text t-left f-right",
                domProps: {
                    textContent: t._s("UL." + (t.userData.rank.level + 1))
                }
            }), n("div", {
                staticClass: "level-progress p-absolute over-hidden"
            }, [n("div", {
                staticClass: "progress-bar h-100",
                style: {
                    width: t.userData.rank.expPercent
                }
            })])])]), n("div", {
                staticClass: "content-ctnr border-box p-relative over-hidden"
            }, [n("div", {
                ref: "seqIn3",
                staticClass: "section-block info-items dp-none a-move-in-left"
            }, t._l(t.infoItems, function(t, e) {
                return n("info-item", {
                    key: e,
                    attrs: {
                        "item-data": t
                    }
                })
            })), n("div", {
                ref: "seqIn5",
                staticClass: "section-block ctrl-btns dp-none a-move-in-left"
            }, [t._l(t.ctrlBtns, function(e, i) {
                return [n("a", {
                    staticClass: "ctrl-btn dp-i-block pointer ts-dot-2",
                    class: {
                        wide: e.wide,
                        colored: e.colored,
                        "t-center": 4 === i
                    },
                    attrs: {
                        href: e.href,
                        target: e.target || "_blank",
                        wide: e.wide
                    },
                    on: {
                        click: function(n) {
                            "function" == typeof e.onClick && t.callFuncInVm(e.onClick)
                        }
                    }
                }, [e.iconName ? n("i", {
                    staticClass: "icon icon-font dp-i-block v-middle",
                    class: e.iconName
                }) : t._e(), n("span", {
                    staticClass: "v-middle",
                    domProps: {
                        textContent: t._s(e.label)
                    }
                }), e.slot ? n(e.slot.name, {
                    tag: "component",
                    staticClass: "v-middle"
                }) : t._e()], 1), 3 === i ? n("hr", {
                    staticStyle: {
                        margin: "5px 0 10px 0"
                    }
                }) : t._e()]
            })], 2)]), n("level-detail", {
                attrs: {
                    level: t.userData.rank.level,
                    rank: t.userData.rank.rank,
                    "exp-left": t.userData.rank.levelTotalExp - t.userData.rank.levelExp,
                    show: t.showLevelPanel
                }
            }), n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.loading,
                    expression: "loading"
                }],
                staticClass: "progress-ctnr w-100 h-100 p-absolute p-zero over-hidden a-move-in-bottom"
            }, [n("live-progress", {
                staticStyle: {
                    "border-radius": "0 0 10px 10px"
                },
                attrs: {
                    show: "true"
                }
            })], 1), n("transition", {
                attrs: {
                    "leave-active-class": "a-move-out-top"
                }
            }, [n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.loadingError,
                    expression: "loadingError"
                }],
                staticClass: "load-error-panel w-100 p-absolute p-zero t-center border-box a-move-in-bottom"
            }, [n("p", {
                staticClass: "text"
            }, [t._v("您的个人信息载入失败惹 Σ(ﾟдﾟ;)")]), n("p", {
                staticClass: "text"
            }, [t._v("真的是非常抱歉 (´；ω；`)")]), n("p", {
                staticClass: "text"
            }, [n("span", [t._v("您可以")]), n("a", {
                staticClass: "request-link pointer",
                attrs: {
                    role: "button"
                },
                on: {
                    click: t.dataRequest
                }
            }, [t._v("点击这里")]), n("span", [t._v("再次尝试 (•̀ᴗ•́)و ̑̑")])]), n("p", {
                staticClass: "text"
            }, [t._v("说不定有奇迹发森喔 ♥(ӦｖӦ｡)")]), n("p", {
                staticClass: "text",
                staticStyle: {
                    color: "#ddd"
                },
                domProps: {
                    innerHTML: t._s(t.quote)
                }
            })])])], 1)])], 1)])
        },
        staticRenderFns: []
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("div", {
                staticClass: "nav-item p-relative pointer",
                class: {
                    selected: t.selected
                },
                on: {
                    mouseenter: function(e) {
                        e.stopPropagation(),
                        t.active(e)
                    },
                    mouseleave: function(e) {
                        e.stopPropagation(),
                        t.deactive(e)
                    }
                }
            }, [n("a", {
                staticClass: "nav-link",
                attrs: {
                    href: t.href,
                    target: t.target
                }
            }, [n("span", {
                staticClass: "label v-top",
                style: {
                    "margin-right": t.showArrow ? "" : "7px"
                },
                domProps: {
                    textContent: t._s(t.label)
                }
            }), t.showArrow || t.forceShowArrow ? n("i", {
                staticClass: "icon-font icon-arrow-down dp-i-block v-middle ts-dot-4"
            }) : t._e()]), t._t("default")], 2)
        },
        staticRenderFns: []
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("div", {
                staticClass: "link-panel-ctnr p-absolute border-box panel-shadow"
            }, [n("transition", {
                attrs: {
                    name: "fade"
                }
            }, [n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.show,
                    expression: "show"
                }],
                ref: "contentCtnr",
                staticClass: "panel-main-ctnr w-100 p-absolute p-zero border-box",
                class: {
                    "ie-fix panel-shadow": t.myBrowser.indexOf("IE") > -1,
                    "empty-height": t.showEmptyHint
                }
            }, [n("section", {
                staticClass: "attention-live p-relative a-move-in-left"
            }, [n("div", {
                staticClass: "section-title"
            }, [n("h2", [t._v("我关注的直播")])]), n("transition", {
                attrs: {
                    "leave-active-class": "a-move-out-top"
                },
                on: {
                    "before-enter": function(e) {
                        t.onLiveAnchors.allowHintText = !1
                    },
                    "after-leave": function(e) {
                        t.onLiveAnchors.allowHintText = !0
                    }
                }
            }, [n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: !(t.onLiveAnchors.loadError || !t.onLiveAnchors.inLoading) || t.onLiveAnchors.list.length,
                    expression: "!onLiveAnchors.loadError && onLiveAnchors.inLoading ? true : (onLiveAnchors.list.length)"
                }],
                staticClass: "content-ctnr live p-relative m-auto over-hidden",
                on: {
                    mousewheel: t.onLiveAnchorsMouseWheel
                }
            }, [n("div", {
                staticClass: "live-items p-absolute p-zero ts-dot-4",
                style: {
                    transform: "translate(" + -1 * (t.onLiveAnchors.scrollPage - 1) * 87 * 4 + "px)"
                }
            }, [t._l(t.onLiveAnchors.list, function(t) {
                return n("live-item", {
                    key: t.roomID,
                    staticClass: "v-middle a-fade-in",
                    attrs: {
                        avatar: t.avatar,
                        username: t.username,
                        link: t.link
                    }
                })
            }), n("transition-group", {
                attrs: {
                    "leave-active-class": "a-move-out-top"
                }
            }, t._l(t.loadingItemCount.live, function(e) {
                return n("live-item-loading", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: t.onLiveAnchors.inLoading,
                        expression: "onLiveAnchors.inLoading"
                    }],
                    key: e,
                    staticClass: "v-middle link-panel-a-move-in-top"
                })
            }))], 2)])]), n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: !t.onLiveAnchors.list.length && !t.onLiveAnchors.inLoading && t.onLiveAnchors.allowHintText,
                    expression: "!onLiveAnchors.list.length && !onLiveAnchors.inLoading && onLiveAnchors.allowHintText"
                }],
                staticClass: "hint-text t-center a-move-in-left",
                staticStyle: {
                    height: "80px",
                    "line-height": "40px",
                    "padding-left": "13px"
                }
            }, [t.onLiveAnchors.loadError ? n("span", [n("span", [t._v("电波木有传达至服务器，是窝坏掉了么？ " + t._s(t.shockEmoji))]), n("br"), n("span", [t._v("要不"), n("a", {
                staticClass: "pointer",
                staticStyle: {
                    color: "#23ade5"
                },
                on: {
                    click: t.loadOnLiveAnchorsData
                }
            }, [t._v("点击这里")]), t._v("再试一次？可能会有新的邂逅喔 " + t._s(t.happyEmoji))])]) : t._e(), t.onLiveAnchors.loadError || t.onLiveAnchors.inLoading ? t._e() : n("span", [t._v("什么都木有，看个球 " + t._s(t.angryEmoji))])]), n("div", {
                staticClass: "btn-ctnr"
            }, [n("button", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.onLiveAnchors.scrollPage > 1,
                    expression: "onLiveAnchors.scrollPage > 1"
                }],
                staticClass: "switch-btn left",
                on: {
                    click: t.onLiveAnchorsPrevPage
                }
            }), n("button", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.onLiveAnchors.scrollPage < t.onLiveAnchorsTotalPage,
                    expression: "onLiveAnchors.scrollPage < onLiveAnchorsTotalPage"
                }],
                staticClass: "switch-btn right",
                on: {
                    click: t.onLiveAnchorsNextPage
                }
            })])], 1), n("div", {
                staticClass: "divider"
            }), n("section", {
                staticClass: "attention-vc link-panel-a-move-in-top"
            }, [n("div", {
                staticClass: "section-title"
            }, [n("h2", [t._v("我关注的动态")])]), n("div", {
                ref: "activitiesCtnr",
                staticClass: "content-ctnr vc p-relative over-hidden"
            }, [[t._l(t.vcActivities.list, function(e, i) {
                return n("vc-item", {
                    key: e.uid,
                    staticClass: "a-fade-in",
                    class: {
                        last: i === t.vcActivities.list.length - 1 && !t.vcActivities.inLoading
                    },
                    attrs: {
                        type: e.type,
                        avatar: e.avatar,
                        title: e.title,
                        username: e.username,
                        time: e.uploadTime,
                        "supporting-text": e.supportingText,
                        link: e.link
                    }
                })
            }), n("transition-group", {
                attrs: {
                    name: "vc-hinter",
                    "leave-active-class": "a-move-out-left"
                },
                on: {
                    "before-enter": function(e) {
                        t.vcActivities.allowHintText = !1
                    },
                    "after-leave": function(e) {
                        t.vcActivities.allowHintText = !0
                    }
                }
            }, t._l(t.loadingItemCount.vc, function(e, i) {
                return t.vcActivities.inLoading ? n("vc-item-loading", {
                    key: e,
                    staticClass: "a-move-in-left",
                    class: {
                        last: i === t.loadingItemCount.vc.length - 1
                    }
                }) : t._e()
            }))], n("p", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: !t.vcActivities.list.length && !t.vcActivities.inLoading && t.vcActivities.allowHintText,
                    expression: "!vcActivities.list.length && !vcActivities.inLoading && vcActivities.allowHintText"
                }],
                staticClass: "hint-text t-center link-panel-a-move-in-top"
            }, [t.vcActivities.loadError ? n("span", {
                staticClass: "dp-block",
                staticStyle: {
                    "max-width": "340px",
                    margin: "0"
                }
            }, [n("span", [t._v("您关注的小视频获取失败惹，非常对不起 " + t._s(t.sadEmoji))]), n("br"), n("br"), n("span", [t._v("或者"), n("a", {
                staticClass: "pointer",
                staticStyle: {
                    color: "#23ade5"
                },
                on: {
                    click: function(e) {
                        t.vcActivities.hasMore = !0,
                        t.loadVcActivities()
                    }
                }
            }, [t._v("点击重试")]), t._v("一下？可能有奇迹发森喔 " + t._s(t.happyEmoji))]), n("br"), n("br"), n("span", {
                staticStyle: {
                    color: "#ddd"
                }
            }, [t._v("你看窝这么萌，就别森气了嘛 " + t._s(t.helplessEmoji))])]) : n("span", [t._v("什么都木有，看个球 " + t._s(t.angryEmoji))])])], 2)]), n("div", {
                staticClass: "divider"
            }), n("section", {
                staticClass: "load-more"
            }, [n("a", {
                attrs: {
                    href: "//link.bilibili.com/p/eden/subscription",
                    target: "_blank"
                }
            }, [n("button", {
                staticClass: "load-more-btn w-100 pointer ts-dot-2"
            }, [t._v("查看更多")])])]), n("transition", {
                attrs: {
                    "enter-active-class": "a-fade-in"
                }
            }, [n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.showEmptyHint,
                    expression: "showEmptyHint"
                }],
                staticClass: "totally-empty-hint w-100 h-100 p-absolute p-zero bg-center bg-no-repeat",
                attrs: {
                    role: "img"
                }
            })])], 1)])], 1)
        },
        staticRenderFns: []
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("nav", {
                staticClass: "link-navbar p-relative"
            }, [n("div", {
                staticClass: "main-ctnr h-100 m-auto f-clear"
            }, [n("div", {
                staticClass: "left-part dp-table f-left"
            }, [n("div", {
                staticClass: "dp-table-cell v-middle"
            }, [n("div", {
                staticClass: "nav-logo dp-i-block v-middle bg-center",
                attrs: {
                    role: "img"
                }
            }), n("div", {
                staticClass: "nav-items-ctnr dp-i-block v-middle"
            }, [n("div", {
                staticClass: "dp-table h-100"
            }, [n("div", {
                staticClass: "dp-table-cell v-middle"
            }, t._l(t.navItems, function(e) {
                return n("nav-item", {
                    key: e.text,
                    attrs: {
                        name: e.name,
                        href: e.href,
                        label: e.label,
                        target: e.target(t.page),
                        "show-arrow": e.showArrow,
                        "mouse-enter": e.mouseEnter ? e.mouseEnter : 0,
                        "mouse-leave": e.mouseLeave ? e.mouseLeave : 0,
                        selected: t.page.indexOf(e.name) > -1
                    }
                }, [n("div", {
                    staticClass: "slot-ctnr p-relative"
                }, [e.slotName ? t._o(n(e.slotName, {
                    tag: "component"
                }), 0, e.text) : t._e()], 1)])
            }))])])])]), n("div", {
                staticClass: "right-part h-100 f-right f-clear"
            }, [t.isShowSearch ? n("search-bar", {
                staticClass: "f-left"
            }) : t._e(), n("shortcuts", {
                staticClass: "f-left",
                attrs: {
                    page: t.page
                }
            }), t.loggedIn ? n("user-doms", {
                staticClass: "f-left"
            }) : n("guest-doms", {
                staticClass: "f-left"
            })], 1)])])
        },
        staticRenderFns: []
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("div", {
                staticClass: "my-link-btn p-relative pointer ts-dot-2 none-select",
                on: {
                    mouseenter: t.mouseEnter,
                    mouseleave: t.mouseLeave
                }
            }, [n("a", {
                attrs: {
                    href: "//link.bilibili.com/p/eden/subscription",
                    target: "_blank"
                }
            }, [n("div", {
                staticClass: "content-ctnr p-relative t-center"
            }, [n("span", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.hasHint,
                    expression: "hasHint"
                }],
                staticClass: "p-absolute hint-count",
                style: {
                    width: t.hintWidth
                }
            }, [t._v(t._s(t.computedHintCount))]), n("i", {
                staticClass: "icon dp-i-block v-middle"
            }), n("span", {
                staticClass: "label v-middle"
            }, [t._v("link 动态")])])]), t._t("default")], 2)
        },
        staticRenderFns: []
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("button", {
                staticClass: "bl-button",
                class: [t.type ? "bl-button--" + t.type : "", t.size ? "bl-button--" + t.size : ""],
                attrs: {
                    disabled: t.disabled
                },
                on: {
                    click: t.handleClick
                }
            }, [n("span", {
                staticClass: "txt"
            }, [t._t("default")], 2)])
        },
        staticRenderFns: []
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("transition", {
                attrs: {
                    name: "fade-out"
                }
            }, [n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.show,
                    expression: "show"
                }],
                staticClass: "user-level-detail p-absolute t-left a-move-in-right",
                on: {
                    mouseenter: t.showPanel,
                    mouseleave: t.hidePanel
                }
            }, [n("div", {
                staticClass: "darkgray",
                staticStyle: {
                    "margin-bottom": "15px"
                }
            }, [n("p", {
                staticStyle: {
                    "margin-top": "0"
                }
            }, [t._v("当前等级：UL." + t._s(t.level))]), n("p", [t._v("当前排名：" + t._s(t.rank))]), n("p", [t._v("升级还需经验：" + t._s(t.expLeft))])]), n("hr"), n("div", {
                staticClass: "lightgray",
                staticStyle: {
                    "margin-top": "10px"
                }
            }, [n("div", {
                staticStyle: {
                    "margin-bottom": "8px",
                    "text-indent": "1em",
                    "line-height": "20px"
                }
            }, [n("p", [t._v("1. 经验值通过投喂道具、观看直播时长提升。")]), n("p", [t._v("2. 每 1 个瓜子提升1点经验，每 5 分钟提升 3000 点经验。")]), n("p", [t._v("3. 老爷身份，在观看直播时经验翻 1 倍。")])])]), n("hr"), n("a", {
                attrs: {
                    href: "//link.bilibili.com/p/eden/news#/newsDetail?id=291",
                    target: "_blank"
                }
            }, [n("div", {
                staticClass: "detail-link t-center ts-dot-2",
                attrs: {
                    role: "button"
                }
            }, [t._v("查看等级说明")])])])])
        },
        staticRenderFns: []
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("div", {
                staticClass: "nav-panel-wh p-absolute border-box panel-shadow"
            }, [n("transition", {
                attrs: {
                    name: "fade"
                }
            }, [n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.show,
                    expression: "show"
                }],
                ref: "contentCtnr",
                staticClass: "main-ctnr w-100 p-absolute p-zero border-box",
                class: {
                    "ie-fix panel-shadow": t.myBrowser.indexOf("IE") > -1
                }
            }, [n("ul", {
                ref: "navItems",
                staticClass: "nav-item-ctnr list-none f-clear"
            }, t._l(t.navItems, function(e, i) {
                return n("a", {
                    attrs: {
                        href: e.link,
                        target: "_blank"
                    }
                }, [n("li", {
                    staticClass: "nav-item f-left t-center a-move-in-top"
                }, [n("i", {
                    staticClass: "icon dp-block m-auto",
                    class: e.icon
                }), n("span", {
                    staticClass: "label",
                    domProps: {
                        textContent: t._s(e.label)
                    }
                })])])
            })), n("div", {
                staticClass: "divider"
            }), n("ul", {
                ref: "areaItems",
                staticClass: "area-item-ctnr list-none f-clear"
            }, t._l(t.areaList, function(e) {
                return n("li", {
                    staticClass: "area-item f-left t-center pointer a-move-in-left"
                }, [n("a", {
                    attrs: {
                        href: e.link,
                        target: "_blank"
                    },
                    domProps: {
                        textContent: t._s(e.label)
                    }
                })])
            }))])])], 1)
        },
        staticRenderFns: []
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("div", {
                staticClass: "nav-panel-vc p-absolute border-box panel-shadow"
            }, [n("transition", {
                attrs: {
                    name: "fade"
                }
            }, [n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.show,
                    expression: "show"
                }],
                ref: "contentCtnr",
                staticClass: "main-ctnr w-100 p-absolute p-zero border-box",
                class: {
                    "ie-fix panel-shadow": t.myBrowser.indexOf("IE") > -1
                }
            }, [n("ul", {
                ref: "navItems",
                staticClass: "nav-item-ctnr list-none f-clear"
            }, t._l(t.navItems, function(e, i) {
                return n("a", {
                    attrs: {
                        href: e.link,
                        target: "_blank"
                    }
                }, [n("li", {
                    staticClass: "nav-item f-left t-center a-move-in-top"
                }, [n("i", {
                    staticClass: "icon dp-block m-auto",
                    class: e.icon
                }), n("span", {
                    staticClass: "label",
                    domProps: {
                        textContent: t._s(e.label)
                    }
                })])])
            })), n("div", {
                staticClass: "divider"
            }), n("ul", {
                ref: "areaItems",
                staticClass: "area-item-ctnr list-none f-clear"
            }, t._l(t.areaList, function(e) {
                return n("li", {
                    staticClass: "area-item f-left t-center pointer a-move-in-left"
                }, [n("a", {
                    attrs: {
                        href: e.link,
                        target: "_blank"
                    },
                    domProps: {
                        textContent: t._s(e.label)
                    }
                })])
            }))])])], 1)
        },
        staticRenderFns: []
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement;
            t._self._c;
            return t._m(0)
        },
        staticRenderFns: [function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("div", {
                staticClass: "user-item-loading dp-i-block"
            }, [n("div", {
                staticClass: "avatar m-auto b-circle"
            }), n("div", {
                staticClass: "username"
            })])
        }
        ]
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("div", {
                staticClass: "user-panel dp-table h-100 p-relative v-top f-clear"
            }, [n("div", {
                staticClass: "align-ctnr dp-table-cell v-middle"
            }, [n("div", {
                staticClass: "link-btn-ctnr dp-i-block v-middle"
            }, [n("my-link", [n("link-panel")], 1)], 1), n("user-panel", {
                staticClass: "dp-i-block v-middle"
            })], 1)])
        },
        staticRenderFns: []
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("div", {
                staticClass: "progress-tv-ctnr"
            }, [t.usingTransition ? n("transition", {
                attrs: {
                    name: "fade"
                }
            }, [n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.show,
                    expression: "show"
                }],
                staticClass: "progress-tv w-100 h-100 p-absolute p-zero",
                style: {
                    "background-color": t.backgroundColor
                },
                attrs: {
                    role: "progress"
                }
            }, [n("div", {
                staticClass: "progress-img bg-no-repeat bg-center p-center"
            })])]) : n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.show,
                    expression: "show"
                }],
                staticClass: "progress-tv w-100 h-100 p-absolute p-zero",
                style: {
                    "background-color": t.backgroundColor
                },
                attrs: {
                    role: "progress"
                }
            }, [n("div", {
                staticClass: "progress-img bg-no-repeat bg-center p-center"
            })])], 1)
        },
        staticRenderFns: []
    }
}
, function(t, e) {
    t.exports = {
        render: function() {
            var t = this
              , e = t.$createElement
              , n = t._self._c || e;
            return n("transition", {
                attrs: {
                    name: "scale-out",
                    "leave-active-class": "a-scale-out"
                }
            }, [n("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.show,
                    expression: "show"
                }],
                staticClass: "link-popup-panel p-relative m-auto a-move-in-top a-forwards",
                style: {
                    width: t.width + "px" || 500
                }
            }, [n("div", {
                staticClass: "title-ctnr p-relative",
                class: {
                    "t-center": t.titleCenter
                }
            }, [n("h2", {
                staticClass: "popup-title",
                domProps: {
                    textContent: t._s(t.title)
                }
            })]), n("div", {
                staticClass: "popup-content-ctnr"
            }, [t._t("default"), !1 !== t.button ? n("div", {
                staticClass: "popup-btn-ctnr t-center"
            }, [!1 !== t.button.confirm ? n("link-btn", {
                ref: "confirmBtn",
                staticClass: "panel-btn",
                attrs: {
                    disabled: t.disabled
                },
                domProps: {
                    textContent: t._s(t.button.confirm || "确定")
                },
                nativeOn: {
                    click: function(e) {
                        t.onConfirmFunc(e)
                    }
                }
            }) : t._e(), !1 !== t.button.cancel ? n("link-btn", {
                ref: "cancelBtn",
                staticClass: "panel-btn",
                attrs: {
                    type: "ghost",
                    disabled: t.disabled
                },
                domProps: {
                    textContent: t._s(t.button.cancel || "取消")
                },
                on: {
                    click: function(e) {
                        if (!("button"in e) && t._k(e.keyCode, "natvie"))
                            return null;
                        t.onCancelFunc(e)
                    }
                }
            }) : t._e()], 1) : t._e()], 2), n("div", {
                ref: "closeBtn",
                staticClass: "close-btn p-absolute bg-center bg-no-repeat pointer t-center",
                class: {
                    disabled: t.disabled
                },
                attrs: {
                    role: "button",
                    title: "关闭面板"
                },
                on: {
                    click: t.onCancelFunc
                }
            }, [n("i", {
                staticClass: "icon-font icon-close"
            })])])])
        },
        staticRenderFns: []
    }
}
, , , , , , , , , , , , , , function(t, e) {}
, , , , , , , , function(t, e) {}
, , , , , , , , , , , function(t, e) {}
, function(t, e) {}
, , , , , , , , , , , , , , , , , , , , , , , function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, function(t, e) {}
, , function(t, e) {
    t.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAB+BJREFUSA1tltlvVPcVxz93nd0znjD2sBjvNhgMBkzD0lQpKaWhC2FTUASJykOlvlVKq0h9qKjUh6p/QPtQNUV9aJtUIk2jJukLiZqQRg1bMKvBxhuYAXv29a49YyOKqh7p+try73eW7/me77kKT5vvK9yvrdEURn3fGvAc/xiGPpzW0LKWh+P7T59+8runKO4KVR3r0JS3rnjqLdfnPKtCcyjKkwvKk9MT2bhmGm/6+AcxA4pcph+bb04+IH19kYu7OngnFEL9n2C+nNtrW7yaeYQVCPJ691ry1ZqvorzjWvZJepOFZgx1KZAEUQ1j0tf0Qziu4lWqjFZLHP/7TcpnymRnXHGigScJenLj8ePJu1MCv/4ww7YAnNdUiqUKivhwxZcWCk4ezWbjy4EELs3nNKqW9Ks1PKm76TBdtyjOWtTNFspegA0TWZJSv78UbPlM89xKOdcRMXik6vwtnsB1vCUfXY06p+YzyZG/fH7alxg6E9k1rq8eoNEgqqu04GNKlhOhCM/vjjL/YYEiAbrG87T3tpGVRP6LN0zoBmNZh7Tnkoq6ZDQNX57v3Z8ne/oDFiz3wEvvX1yjh3RjdMjQlO1T8yTuSdlFycgSTKWPdx65RJQio/tS/LlngBt1X7Be7u9Sq1RFeqZw3QgRmJrhZ4pKTgJb8lbnHvBvOSo3FF91tus/uXZ3HXMqc3c9pgjhCwTCluYJFHGkG2GuX6ixpXGfXH+ayw1BXKKEdI2D1TKHSzn6W4OkvjZELBLAdz2B16PeFWdLX4r33rvE+QvFQeWVN65e8s3YSNP3cpeb76dNQe5iWCX6+mp88tW1XMDkR/lHHDIdugdWYgRM3OYhya7ZwqYp4tCQVhRrDpfHpi7rBKLDy3RvRhIS+s0LT5uPkAkv1MKNiQDbrVkObg6x75kgHb2rsR2X6ZJFpuaRCqqsjWjLwaTqUt2m3rD5+B+XNwrd0axahVrhIbXsHLYlDfp/Jglokvnt6RZWFVT6BtMCk8ts1WO6YGHKlGfqHgVLyCI5Nx9HnF+9OsPk3YyuHD815W/t9UgGcwRNlUUrxadX7KWWS4ue2BIi8kN88+1vhAl2KsQFmszcAp/PFNi5Lk1vW5TOsCq+VJozVhc47+drxGUEVUmS/buCDPcJhdMKu6VIyYeeNp9YSHRCnDdxT4R9klHpgTj46IElkNWYKNY4m5F5y5X54tqcMLApUzArUGpSUkgSScdDXC9a6K78xxPBCJg60UiQkqPRKg63drt8+KWk8thcT+GV5z0e5gSQQAHz2n0cS+auc5h6Mk6pVOX9eZuNkaoQGh7I/76SNGh66EuG0S3b48w/LSKhGKWaT3vM4qdHHGYyULNlHmSeKpbCkc0VNgQzXLw5y7FvreeDP37KeN6l+4DP/PrNdCbCbIlW2CTjPb9Q5Qod/KEYZm9KJWZq6L7v8uW4gy3YH9sNm1bncKrIpNucGNA4fWMV39nmsbOnzM9/e5GRbd1Ek1Fe7dfJX5lGX2NDT42YKsSYXuRXv/+MXNli34vDBLoHKNsJDIFTx3PQJWvDgB0DKh9/MsX4VJ58oUoiGuTHhxNs6zcoVcLs2dmDMz5N4WyN8FA/ieFBlE0D0lJnaQTXpCK8lrvJ9XqA67+5Q+S1Q2irRpnM19GGd/3glCfBwobHd3eYbBxKiQJbNCyX/Xv62d4jGYjYBoRug+vaWW+IJtbqKEN9KMPrwZaKRLEJBERJVOLZDD3Ze+ze0YW3bw91gf1WSYrxXCGhjEgwqhEp5Lh9bozYvQJvnNyDubgA/7qCXyziJ1pQvy7Yjm7CL4sOxQICcXWJkd6tCcx1fWjxGNr+F1ANCbq6jem5PBfdKLmG6+i+a42JNI7I9EG+xIZWjQ0bJVOBzR7PYSefQevswa0WUSoVfEehMPmQyFAXgdhKVF3m47kO6vUyar1AKBFD2TCIPTPPmCzEBwER6WL+qo5vv62p5kg2W+VcOcjO57ZLRoaQQ8EaGiHa3oluSvZWQx7BWjOQmLSnumWFPaa/bNZApAWrnqC4INK8rouPIquZmQFT1kc5l31bGxzYkdI082VHenDus8v09abp6B9Cj7QSbm0Tx/rS/mm+DTMof2sk0+04dgNNVsLTpkqPjEiSqvTldxfvs5DJYmUXZT+pv9Zda+58Y6Eka8NQXLtKQYRVM0wWF7KyC0XDgsGlQJGQDJ+sBlXVaEhvKhVLml/FUG3CscRSxZVKjVA4TDTeSiwawsmU4e6sn4yEvlCaa/bwkV+ccVz/pb5tfWzYu5URCdfavpoVK5KP1Vz2kiryItBZjsPsvUU6OzskqGiarI9m8Galwi3KxRIV2VN/eqRJEqLmk+N/PXHixUNLsnn06C/jbStbJn948oXkpbFp7lgax4dl1yh3ZBGaOA3ZvLIQm73K+0muVdbwbMttcWvLN4Irm0VChOICSpB3p9OUHuZYsSrF+u5otsuv9Ci9o4Un+jwxMRFPlR+9KdkerAUSSsqcpm3xLFVhmS50da2aENOmEUgzYWxnyDorc1qTYRWZCsRQ3RqmfGdcNQ+yPmz74dXJd1mY+r6y5WC+2UfZ28vW29tbEBiPDA3cXTt//t7WSrUyWK7WX/aDrZu0SJtqlW/J1418dnkyU5VpbK0uoiIqLSTRQiHPtawr9XLjLX2FcitcKJ3n2T1zSscWEZ9l+w93+qlstKcgjgAAAABJRU5ErkJggg=="
}
, function(t, e) {
    t.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAACAxJREFUSA19lmtwVOUZx3/nspez92w2JEuChJBMIwhCAUNRsBQBL4y9WJ2ptvbyoZWpztQprTO2tbQf6gdxOp1ebPvBDvQyrXamTgRaaRGVVnGCKAPGoCEkJLAbctnNXs5ez54+7yJTP3Vn3j3vec/7Ppf/83+e59X4yM913bC87pFxt+M4y4vFYjgUCqHr+kd2XZ3WXRjK1Nhzxub1gkFLvcjXe4OF/rB3dGVEH9wQM/dpmpa/dlC7NhElW2X+rIzua2v/73l6oc7Wf+fIVF3CQ4M06nWK3WsguRzN52NT3Bh/ut/82sYWzzElx1R/Hyo5mq+7mrI9aGrMiYBawyXh0yk5LmUHCvKsy9qyoMGhdJVMSdzyaPiO/oH2y8NUI+2c3/U9vPEgb2B235XdePRkxt22vkU7Zn4Il/JEe26yQkQO3tvlY+9wkTZREpf3cduhyzJ4MVVhY9zD968PUBGFNPHQeOg7j/ONtd3YVfjN/ud4/ul91JP9pML7tUcs91nRsVo5oGLSLYNStcaZWZvz+RpzxTL3Lvbwy5F5JnMl1sd0inaJqFZHHerxuqyszPOZYIU9OweYt206r+tg3xPf4oln9rO4fwXMznDi7Ez30Gx1j7F3796fyrkOpUiM5mKugqlr3NLmY12rj0Xi0V2dFn1hDw3HIeHVWBHzEgx5ubMnyJ3tHkrTU9x223YCgQAbN9+C2dJBefWtnLriUC03uLkrENUaTj2v6UaoIvhrokDkUBOlopNSvYHf0JFPMlyZa835aLbCiYvzDKxKYjQEDqfCgQP7uf/++zFdnT+O5Zjzhzjw1ixnpmwe/0S8oGWyWfcnFw0GL1eoVcs4updNpNmVtGjtaKclFhSyXA2HPFDDECvOjc1Qs8usXrWEhbkSa2I+FmYzvJ2rc063sEydo2MFDo7kiBslzGcu6zw1LHT3CBzvv83twQJbu0J4UmGuW9WDJBEVSRrFQHVYnBZoYU1/O38fmuTlM2nqwRCnsnnGzkzS3rcEK6CjuNIWFFLL3oIZwNz7nn0VJ6fGYzs28HCXy4WpS1zni5HOFamGw5RrDTRR0BDXchWHaWFhOl/FkW92sYLVaOB6TBJCBqdcRQv6mp6HhbWawK2MNTVXQFZ4iKREPc/0dBGfFcCpOWi1GhIivLJZxWt0vsKF2SKXJmaIdLQSFIGhkJ+afKuWawQiFvZCsSnPFaEKAVNyUqVBM2GbX2p1rLYk/Z0eHMF+6ux5TjsW6dkGoaBftgh8YlBFPLrHO8PZaoOUE8brC4jFmkp6dMPEY/moS5XwmDIXA00ZqlyZzUiraIvlz45kSE4uYHoNRgLtjE1lWRlYoNTbS6MqUOkm82eGOPCnX1Ceq3Dn7i9R7BvgcjyJT840nAYB8UAYjSNzhZohRqhqomtKiRri6vEFGa1dXFqylDmfsG3kTS4d+jWNt14WQSalgs0X1nawKbqctZc9tJ4YwxOyMCU+VYH6Jk+ZnVEpUyKvpKBXDBUHpLj+zyO1qOBUgZ+U6hBKjWO/d5zRPw+xKxNl5+YbKMYtkuEelu6+h8LyI1xpW8KQGZF41ukz63xyWSvHT52nxzGpt7TwvpQkEdckkmHe++heZYFS5IiLYdHWGzabcXrsge2ER9J0WjaL+nuIL00gASC4tJ1IKIwnEGIqlWXGCnOTmSPik3YhBNm0rI2IvcD7klP/lOJrCIaa/y8TbllVBVGkAvrFnhADCR+zuTIDrS47ZkapnR/Ht+Nm8Ptw8pJ8LUGYz8r+AKVQnMOnP2CgOyFxrHDkldcISynavmUzVcPixkMpsnjQVf1SMVJKYroolAL66rl50mJp6fwEQiT8K/vQIn4aEqPam+9Slhz61WQHB8ZMpjMF+i2HsIR5949/zpNvFNEDUf52+DCNSglpgNScOuYiV6iMJR5JMgqgvz+ZAvHmcwOLOTI2T2hdgraORYyPeLk1USL+8aW8MKpxeEyKrC3MKlxhbcJlbGSEd2ZdiotC/O5CiI5Lab78WZOvdvtI1UsY3/7hj/a8cqnkbXY8oaImSUfVwa8SNZ/j+aE0J4Rhw9Uu/vNBmcW5aV6YT2I3NFrMAvf0WxSLWXpX3cDUuyfxR4UE597jgXVJSrHF7H4zy1fWdhb0pWH/qIKuOVSBUsFaHGNON4SmGhekax6vCBvrGTJGlEdOR3l7NN1MRK+QNhCOqqRhIZfnB48+xIPXe3jmvpV8+rYtPP1OmomGRbvfGNVXRD2DkocC3NVcaioUzwqSgKecAAuGn8+vtLhdIFjI2VzJ2OSzC9IuDLb3mQylaizrXcGViXFm0yk237SOaFsH331tgoN2FF36zqqYd9DcEPfu29hmPfh6qtjdzC5xSMUrI31lPtZCTC4L27sW8brAZzTytEe82NJplVkXbS8D0XlePGvii6wglcly8J0Zhh0Ps0ZSWc+mdmt8XcK/TwHFyUxt684jk0fn7Jqm6kZzUdaVsDVajDUeo1nD+twLJGopfjsc42M3rpJ7icPqYI5/XZljcE52m9KoVA9plvoGrUGv+9KOzm3r26xjsgrr5Ur00o4l27YkrXFdUV2qsSu5Fffo3NHmcvdylyc/5WVa2tbx6Qi7+v08td3Hz+4I8PC2pLSS2NVao0yTeOny3NIZHL+mROm4Zryaq1wKD82W9wxnq3e/Oj7Tm7Nzob9uTTBTsGhLJsiXamQKNdrlzuCT+nbtd98/Jjk2Mc031y0pLIv6R1e0+AY3KLg+coH8LzzamNpmY+ggAAAAAElFTkSuQmCC"
}
, , , function(t, e, n) {
    n(77);
    var i = n(0)(n(26), n(121), "data-v-d21b08a4", null);
    t.exports = i.exports
}
, function(t, e, n) {
    n(71);
    var i = n(0)(n(27), n(115), "data-v-7339e6f1", null);
    t.exports = i.exports
}
, function(t, e, n) {
    n(69);
    var i = n(0)(n(46), n(113), "data-v-60c1f564", null);
    t.exports = i.exports
}
, function(t, e, n) {
    n(51);
    var i = n(0)(n(47), n(99), "data-v-06a6acee", null);
    t.exports = i.exports
}
, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    e.default = {
        DEBUG_MODE: !1,
        CANVAS_CACHES: {
            MAIN_IMAGE: "MAIN_IMAGE"
        },
        CANVAS: {
            WIDTH: "undefined" == typeof window ? 1000 : .8 * window.innerWidth > 1000 ? 1000 : .8 * window.innerWidth,
            HEIGHT: "undefined" == typeof window ? 1000 : .8 * window.innerHeight > 1000 ? 1000 : .8 * window.innerHeight,
            ENABLE_SMOOTHING: !1,
            PIXELS_PER_BLOCK: 1,
            OFFSET_BETWEEN_CURSOR_AND_PIXEL: 1,
            BRUSH_COLOR: {
                0: "#000",
                1: "#fff",
                2: "#fcde6b",
                3: "#fff6d1",
                4: "#7d9591",
                5: "#71bed6",
                6: "#3be5db",
                7: "#fed3c7",
                8: "#b83f27",
                9: "#faac8e",
                A: "#004670",
                B: "#057197",
                C: "#44c95f",
                D: "#7754ff",
                E: "#ff0000",
                F: "#ff9800",
                G: "#97fddc",
                H: "#f8cb8c",
                I: "#2e8faf"
            },
            ASYNC_DRAWING: !0
        },
        IMAGE: {
            WIDTH: 1280,
            HEIGHT: 720,
            FILE_PATH: "image-data.txt"
        },
        MAX_SCALING: 2,
        SCALING_DELTA: 8,
        MAX_BRUSH_SIZE: 16,
        SOCKET: {
            ROOMID: 5446
        }
    }
}
, , , , , , , , , , , , , , , , , , , , , , , , , , function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.basicData = void 0;
    var a = n(175)
      , s = i(a)
      , o = n(8)
      , r = i(o)
      , c = n(268)
      , l = i(c)
      , u = n(174)
      , d = i(u)
      , f = n(316)
      , h = i(f)
      , v = n(4)
      , p = i(v)
      , m = n(366)
      , g = i(m)
      , w = function() {
        var t = h.default || {
            __proto__: []
        }instanceof Array && function(t, e) {
            t.__proto__ = e
        }
        || function(t, e) {
            for (var n in e)
                e.hasOwnProperty(n) && (t[n] = e[n])
        }
        ;
        return function(e, n) {
            function i() {
                this.constructor = e
            }
            t(e, n),
            e.prototype = null === n ? (0,
            d.default)(n) : (i.prototype = n.prototype,
            new i)
        }
    }()
      , b = function(t, e, n, i) {
        var a, o = arguments.length, c = o < 3 ? e : null === i ? i = (0,
        l.default)(e, n) : i;
        if ("object" === ("undefined" == typeof Reflect ? "undefined" : (0,
        r.default)(Reflect)) && "function" == typeof Reflect.decorate)
            c = Reflect.decorate(t, e, n, i);
        else
            for (var u = t.length - 1; u >= 0; u--)
                (a = t[u]) && (c = (o < 3 ? a(c) : o > 3 ? a(e, n, c) : a(e, n)) || c);
        return o > 3 && c && (0,
        s.default)(e, n, c),
        c
    }
      , y = function(t) {
        function e() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.isLogin = !0,
            e.userVaild = !1,
            e.drawStatus = !1,
            e.waitTime = 0,
            e.superUser = !1,
            e.fatalError = !1,
            e.resetDrawStatus = !1,
            e
        }
        return w(e, t),
        e = b([g.default], e)
    }(p.default)
      , C = new y;
    e.basicData = C
}
, function(t, e, n) {
    "use strict";
    function i() {
        d.basicData.fatalError = !0,
        document.querySelector(".fatal-error").style.display = "table"
    }
    function a() {
        l(document.querySelector(".error-hint.please-wait"))
    }
    function s() {
        l(document.querySelector(".error-hint.activity-end"))
    }
    function o(t) {
        var e = document.querySelector(".error-hint.drawing-failure")
          , n = t.message;
        e.textContent = "绘制失败惹 " + u.randomEmoji.sad() + "，还请您再试一次：" + n,
        l(e)
    }
    function r() {
        l(document.querySelector(".error-hint.unavailable"))
    }
    function c() {
        l(document.querySelector(".error-hint.account-limited"))
    }
    function l(t, e) {
        void 0 === e && (e = 3e3),
        t.className.indexOf(" show") > -1 || (t.className += " show",
        setTimeout(function() {
            t.className = t.className.replace(" show", "")
        }, e))
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.fatalError = i,
    e.pleaseWait = a,
    e.activityEnd = s,
    e.drawingFailure = o,
    e.drawingUnavailable = r,
    e.accountCanNotDraw = c,
    e.showAndHideNode = l;
    var u = n(234)
      , d = n(264)
}
, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    function a() {
        return g(this, void 0, void 0, function() {
            var t, e, n;
            return w(this, function(i) {
                switch (i.label) {
                case 0:
                    return i.trys.push([0, 2, , 3]),
                    [4, b.get("/activity/v1/SummerDraw/bitmap")];
                case 1:
                    return t = i.sent(),
                    e = t.data,
                    0 !== e.code ? [2, {
                        error: new Error(e.msg || e.message || "接口状态码非 0."),
                        code: e.code,
                        data: null
                    }] : [2, {
                        error: null,
                        data: e.data,
                        code: 0
                    }];
                case 2:
                    return n = i.sent(),
                    [2, {
                        error: n,
                        data: null,
                        code: null
                    }];
                case 3:
                    return [2]
                }
            })
        })
    }
    function s() {
        return g(this, void 0, void 0, function() {
            var t, e, n;
            return w(this, function(i) {
                switch (i.label) {
                case 0:
                    return i.trys.push([0, 2, , 3]),
                    [4, b.get("/activity/v1/SummerDraw/status")];
                case 1:
                    return t = i.sent(),
                    e = t.data,
                    0 !== e.code ? [2, {
                        error: new Error(e.msg || e.message || "接口状态码非 0."),
                        code: e.code,
                        data: null
                    }] : [2, {
                        error: null,
                        code: 0,
                        data: e.data
                    }];
                case 2:
                    return n = i.sent(),
                    [2, {
                        error: n,
                        data: null,
                        code: null
                    }];
                case 3:
                    return [2]
                }
            })
        })
    }
    function o(t) {
        var e = t.startX
          , n = t.startY
          , i = t.endX
          , a = t.endY
          , s = t.bitmap;
        return g(this, void 0, void 0, function() {
            var t, o, r;
            return w(this, function(c) {
                switch (c.label) {
                case 0:
                    return c.trys.push([0, 2, , 3]),
                    [4, b.post("/activity/v1/SummerDraw/draw", m.default.stringify({
                        x_min: e,
                        y_min: n,
                        x_max: i,
                        y_max: a,
                        color: s
                    }))];
                case 1:
                    return t = c.sent(),
                    o = t.data,
                    0 !== o.code ? [2, {
                        error: new Error(o.msg || o.message || "接口状态码返回错误."),
                        code: o.code,
                        data: null
                    }] : [2, {
                        error: null,
                        data: o.data,
                        code: 0
                    }];
                case 2:
                    return r = c.sent(),
                    [2, {
                        error: r,
                        code: null,
                        data: null
                    }];
                case 3:
                    return [2]
                }
            })
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.drawRequest = e.getUserData = e.getImageBitmap = void 0;
    var r = n(176)
      , c = i(r)
      , l = n(152)
      , u = i(l)
      , d = n(5)
      , f = i(d)
      , h = n(24)
      , v = i(h)
      , p = n(128)
      , m = i(p)
      , g = function(t, e, n, i) {
        return new (n || (n = f.default))(function(a, s) {
            function o(t) {
                try {
                    c(i.next(t))
                } catch (t) {
                    s(t)
                }
            }
            function r(t) {
                try {
                    c(i.throw(t))
                } catch (t) {
                    s(t)
                }
            }
            function c(t) {
                t.done ? a(t.value) : new n(function(e) {
                    e(t.value)
                }
                ).then(o, r)
            }
            c((i = i.apply(t, e || [])).next())
        }
        )
    }
      , w = function(t, e) {
        function n(t) {
            return function(e) {
                return i([t, e])
            }
        }
        function i(n) {
            if (a)
                throw new TypeError("Generator is already executing.");
            for (; l; )
                try {
                    if (a = 1,
                    s && (o = s[2 & n[0] ? "return" : n[0] ? "throw" : "next"]) && !(o = o.call(s, n[1])).done)
                        return o;
                    switch (s = 0,
                    o && (n = [0, o.value]),
                    n[0]) {
                    case 0:
                    case 1:
                        o = n;
                        break;
                    case 4:
                        return l.label++,
                        {
                            value: n[1],
                            done: !1
                        };
                    case 5:
                        l.label++,
                        s = n[1],
                        n = [0];
                        continue;
                    case 7:
                        n = l.ops.pop(),
                        l.trys.pop();
                        continue;
                    default:
                        if (o = l.trys,
                        !(o = o.length > 0 && o[o.length - 1]) && (6 === n[0] || 2 === n[0])) {
                            l = 0;
                            continue
                        }
                        if (3 === n[0] && (!o || n[1] > o[0] && n[1] < o[3])) {
                            l.label = n[1];
                            break
                        }
                        if (6 === n[0] && l.label < o[1]) {
                            l.label = o[1],
                            o = n;
                            break
                        }
                        if (o && l.label < o[2]) {
                            l.label = o[2],
                            l.ops.push(n);
                            break
                        }
                        o[2] && l.ops.pop(),
                        l.trys.pop();
                        continue
                    }
                    n = e.call(t, l)
                } catch (t) {
                    n = [6, t],
                    s = 0
                } finally {
                    a = o = 0
                }
            if (5 & n[0])
                throw n[1];
            return {
                value: n[0] ? n[1] : void 0,
                done: !0
            }
        }
        var a, s, o, r, l = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return r = {
            next: n(0),
            throw: n(1),
            return: n(2)
        },
        "function" == typeof u.default && (r[c.default] = function() {
            return this
        }
        ),
        r
    }
      , b = v.default.create({
        timeout: 1e4,
        baseURL: "//api.live.bilibili.com",
        withCredentials: !0
    });
    e.getImageBitmap = a,
    e.getUserData = s,
    e.drawRequest = o
}
, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    function a() {
        console.log("\n    Live Sketching Board By LancerComet at 16:11, 2017.07.14.\n    Inspired By Reddit Place, thank you for this great event! >ㅂ<ﾉ ☆\n    # Carry Your World #\n    ===\n    Version: 1.0.2\n  ")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.RootVM = void 0;
    var s = n(10)
      , o = i(s)
      , r = n(176)
      , c = i(r)
      , l = n(152)
      , u = i(l)
      , d = n(5)
      , f = i(d)
      , h = n(175)
      , v = i(h)
      , p = n(8)
      , m = i(p)
      , g = n(268)
      , w = i(g)
      , b = n(174)
      , y = i(b)
      , C = n(316)
      , x = i(C)
      , k = n(4)
      , _ = i(k)
      , E = n(366)
      , A = i(E)
      , P = n(129)
      , L = i(P)
      , I = n(160)
      , S = n(234)
      , D = n(238)
      , B = i(D)
      , M = n(503)
      , O = n(502)
      , N = n(501)
      , T = n(264)
      , R = n(265)
      , j = function(t) {
        if (t && t.__esModule)
            return t;
        var e = {};
        if (null != t)
            for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e.default = t,
        e
    }(R)
      , U = n(266)
      , V = n(506)
      , F = n(508)
      , W = n(7)
      , H = i(W)
      , q = function() {
        var t = x.default || {
            __proto__: []
        }instanceof Array && function(t, e) {
            t.__proto__ = e
        }
        || function(t, e) {
            for (var n in e)
                e.hasOwnProperty(n) && (t[n] = e[n])
        }
        ;
        return function(e, n) {
            function i() {
                this.constructor = e
            }
            t(e, n),
            e.prototype = null === n ? (0,
            y.default)(n) : (i.prototype = n.prototype,
            new i)
        }
    }()
      , z = function(t, e, n, i) {
        var a, s = arguments.length, o = s < 3 ? e : null === i ? i = (0,
        w.default)(e, n) : i;
        if ("object" === ("undefined" == typeof Reflect ? "undefined" : (0,
        m.default)(Reflect)) && "function" == typeof Reflect.decorate)
            o = Reflect.decorate(t, e, n, i);
        else
            for (var r = t.length - 1; r >= 0; r--)
                (a = t[r]) && (o = (s < 3 ? a(o) : s > 3 ? a(e, n, o) : a(e, n)) || o);
        return s > 3 && o && (0,
        v.default)(e, n, o),
        o
    }
      , G = function(t, e, n, i) {
        return new (n || (n = f.default))(function(a, s) {
            function o(t) {
                try {
                    c(i.next(t))
                } catch (t) {
                    s(t)
                }
            }
            function r(t) {
                try {
                    c(i.throw(t))
                } catch (t) {
                    s(t)
                }
            }
            function c(t) {
                t.done ? a(t.value) : new n(function(e) {
                    e(t.value)
                }
                ).then(o, r)
            }
            c((i = i.apply(t, e || [])).next())
        }
        )
    }
      , K = function(t, e) {
        function n(t) {
            return function(e) {
                return i([t, e])
            }
        }
        function i(n) {
            if (a)
                throw new TypeError("Generator is already executing.");
            for (; l; )
                try {
                    if (a = 1,
                    s && (o = s[2 & n[0] ? "return" : n[0] ? "throw" : "next"]) && !(o = o.call(s, n[1])).done)
                        return o;
                    switch (s = 0,
                    o && (n = [0, o.value]),
                    n[0]) {
                    case 0:
                    case 1:
                        o = n;
                        break;
                    case 4:
                        return l.label++,
                        {
                            value: n[1],
                            done: !1
                        };
                    case 5:
                        l.label++,
                        s = n[1],
                        n = [0];
                        continue;
                    case 7:
                        n = l.ops.pop(),
                        l.trys.pop();
                        continue;
                    default:
                        if (o = l.trys,
                        !(o = o.length > 0 && o[o.length - 1]) && (6 === n[0] || 2 === n[0])) {
                            l = 0;
                            continue
                        }
                        if (3 === n[0] && (!o || n[1] > o[0] && n[1] < o[3])) {
                            l.label = n[1];
                            break
                        }
                        if (6 === n[0] && l.label < o[1]) {
                            l.label = o[1],
                            o = n;
                            break
                        }
                        if (o && l.label < o[2]) {
                            l.label = o[2],
                            l.ops.push(n);
                            break
                        }
                        o[2] && l.ops.pop(),
                        l.trys.pop();
                        continue
                    }
                    n = e.call(t, l)
                } catch (t) {
                    n = [6, t],
                    s = 0
                } finally {
                    a = o = 0
                }
            if (5 & n[0])
                throw n[1];
            return {
                value: n[0] ? n[1] : void 0,
                done: !0
            }
        }
        var a, s, o, r, l = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return r = {
            next: n(0),
            throw: n(1),
            return: n(2)
        },
        "function" == typeof u.default && (r[c.default] = function() {
            return this
        }
        ),
        r
    }
      , X = {};
    (0,
    o.default)(B.default.CANVAS.BRUSH_COLOR).forEach(function(t) {
        X[B.default.CANVAS.BRUSH_COLOR[t]] = t
    });
    var Y = function(t) {
        function e() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.hideNavbar = !1,
            e.lastScroll = 0,
            e.colors = B.default.CANVAS.BRUSH_COLOR,
            e.sketchingBoard = null,
            e.waitTime = "--",
            e.loading = !0,
            e.scalingRate = 1,
            e.currentPanel = "sketching",
            e
        }
        return q(e, t),
        e.prototype.initNavbar = function() {
            var t = this;
            window.addEventListener("scroll", function(e) {
                var n = document.documentElement.scrollTop || document.body.scrollTop || window.scrollY;
                n - t.lastScroll > 0 && (t.hideNavbar = !0,
                t.lastScroll = n),
                n - t.lastScroll < -50 && (t.hideNavbar = !1,
                t.lastScroll = n)
            })
        }
        ,
        e.prototype.initSketchingBoard = function() {
            var t = this;
            this.sketchingBoard = new M.LiveSketchingBoard({
                selector: "#drawing-canvas"
            }),
            this.sketchingBoard.registerTickEvent(function() {
                t.scalingRate = t.sketchingBoard.scaleLevel + 1
            })
        }
        ,
        e.prototype.initOnDrawing = function() {
            var t = this;
            this.sketchingBoard.onDrawing = function(e) {
                function n() {
                    return G(this, void 0, void 0, function() {
                        var t, e;
                        return K(this, function(n) {
                            switch (n.label) {
                            case 0:
                                return t = X[o],
                                [4, (0,
                                U.drawRequest)({
                                    startX: a,
                                    startY: s,
                                    endX: a + r - 1,
                                    endY: s + r - 1,
                                    bitmap: t
                                })];
                            case 1:
                                return e = n.sent(),
                                e.error ? (-403 === e.code ? j.drawingUnavailable() : j.drawingFailure(e.error),
                                [2, !1]) : (T.basicData.waitTime = e.data.time,
                                [2, !0])
                            }
                        })
                    })
                }
                var i = this
                  , a = e.x
                  , s = e.y
                  , o = e.brushColor
                  , r = e.brushSize;
                return new f.default(function(e, a) {
                    return G(i, void 0, void 0, function() {
                        var i = this;
                        return K(this, function(s) {
                            switch (s.label) {
                            case 0:
                                return T.basicData.fatalError ? [2, a(new Error("页面载入错误, 无法进行绘画."))] : T.basicData.isLogin ? T.basicData.waitTime > 0 ? (j.pleaseWait(),
                                [2, a(new Error("绘画剩余等待时间: " + T.basicData.waitTime + "s"))]) : T.basicData.drawStatus ? T.basicData.userVaild || T.basicData.superUser ? T.basicData.superUser ? [4, n()] : [3, 2] : (j.accountCanNotDraw(),
                                [2, a(new Error("当前账号无绘画权限."))]) : (j.drawingUnavailable(),
                                [2, a(new Error("画板功能暂时被冻结."))]) : [2, (0,
                                I.quickLogin)()];
                            case 1:
                                return s.sent() ? e() : a(),
                                [3, 3];
                            case 2:
                                t.linkPopup({
                                    title: "画一笔 " + S.randomEmoji.helpless(),
                                    html: '<p style="margin: 10px 0 15px 0">3 分钟才能上色一次，需要确认哦！' + S.randomEmoji.happy() + "</p>",
                                    width: 350,
                                    button: {
                                        confirm: "画画画！",
                                        cancel: "取消"
                                    }
                                }).onConfirm(function(t) {
                                    return G(i, void 0, void 0, function() {
                                        return K(this, function(i) {
                                            switch (i.label) {
                                            case 0:
                                                return t.lock(),
                                                [4, n()];
                                            case 1:
                                                return i.sent() ? e() : a(),
                                                t.unlock(),
                                                t.close(),
                                                [2]
                                            }
                                        })
                                    })
                                }).onCancel(function() {
                                    a()
                                }),
                                s.label = 3;
                            case 3:
                                return [2]
                            }
                        })
                    })
                }
                )
            }
        }
        ,
        e.prototype.initData = function() {
            return G(this, void 0, void 0, function() {
                return K(this, function(t) {
                    switch (t.label) {
                    case 0:
                        return [4, (0,
                        O.initUserData)()];
                    case 1:
                        return t.sent(),
                        [4, (0,
                        N.initSketchingBoardData)(this.sketchingBoard)];
                    case 2:
                        return t.sent(),
                        this.initAdminFunc(),
                        this.loadingDone(),
                        [2]
                    }
                })
            })
        }
        ,
        e.prototype.initAdminFunc = function() {
            T.basicData.superUser && (0,
            V.init)(this.sketchingBoard)
        }
        ,
        e.prototype.startTimeCounter = function() {
            var t = this;
            setInterval(function() {
                T.basicData.waitTime > 0 ? T.basicData.waitTime-- : T.basicData.resetDrawStatus && (T.basicData.drawStatus = !0,
                T.basicData.resetDrawStatus = !1),
                t.waitTime = T.basicData.waitTime
            }, 1e3)
        }
        ,
        e.prototype.loadingDone = function() {
            this.loading = !1
        }
        ,
        e.prototype.initComment = function() {
            return G(this, void 0, void 0, function() {
                return K(this, function(t) {
                    switch (t.label) {
                    case 0:
                        return [4, (0,
                        H.default)({
                            selector: "#activity-comment",
                            id: 1005,
                            type: 8
                        })];
                    case 1:
                        return t.sent(),
                        [2]
                    }
                })
            })
        }
        ,
        e.prototype.chooseColor = function(t) {
            this.sketchingBoard.setBrushColor(t)
        }
        ,
        e.prototype.switchPanel = function(t) {
            this.currentPanel = t
        }
        ,
        e.prototype.mounted = function() {
            this.initNavbar(),
            this.initSketchingBoard(),
            this.initData(),
            (0,
            F.init)(this.sketchingBoard),
            this.initOnDrawing(),
            this.startTimeCounter(),
            this.initComment(),
            a()
        }
        ,
        e = z([(0,
        A.default)({
            components: {
                LinkNavbar: L.default
            }
        })], e)
    }(_.default);
    e.RootVM = Y
}
, , , , , , function(t, e) {}
, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    function a(t) {
        return v(this, void 0, void 0, function() {
            var e, n, i;
            return p(this, function(a) {
                switch (a.label) {
                case 0:
                    e = null,
                    a.label = 1;
                case 1:
                    return a.trys.push([1, 3, , 4]),
                    [4, (0,
                    h.getImageBitmap)()];
                case 2:
                    return e = a.sent(),
                    [3, 4];
                case 3:
                    return n = a.sent(),
                    console.error("[Error] 画板数据初始化失败: ", n),
                    [2, f.fatalError()];
                case 4:
                    return i = e.data.bitmap,
                    e.error ? (console.error(e.error),
                    [2, f.fatalError()]) : i ? (t.loadImageByBitmap(i).then(function() {}).catch(function(t) {
                        console.error("[Error] 画布数据载入失败: ", t)
                    }),
                    [2]) : (console.error(new Error("画布数据错误.")),
                    [2, f.fatalError()])
                }
            })
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.initSketchingBoardData = void 0;
    var s = n(176)
      , o = i(s)
      , r = n(152)
      , c = i(r)
      , l = n(5)
      , u = i(l)
      , d = n(265)
      , f = function(t) {
        if (t && t.__esModule)
            return t;
        var e = {};
        if (null != t)
            for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e.default = t,
        e
    }(d)
      , h = n(266)
      , v = function(t, e, n, i) {
        return new (n || (n = u.default))(function(a, s) {
            function o(t) {
                try {
                    c(i.next(t))
                } catch (t) {
                    s(t)
                }
            }
            function r(t) {
                try {
                    c(i.throw(t))
                } catch (t) {
                    s(t)
                }
            }
            function c(t) {
                t.done ? a(t.value) : new n(function(e) {
                    e(t.value)
                }
                ).then(o, r)
            }
            c((i = i.apply(t, e || [])).next())
        }
        )
    }
      , p = function(t, e) {
        function n(t) {
            return function(e) {
                return i([t, e])
            }
        }
        function i(n) {
            if (a)
                throw new TypeError("Generator is already executing.");
            for (; u; )
                try {
                    if (a = 1,
                    s && (r = s[2 & n[0] ? "return" : n[0] ? "throw" : "next"]) && !(r = r.call(s, n[1])).done)
                        return r;
                    switch (s = 0,
                    r && (n = [0, r.value]),
                    n[0]) {
                    case 0:
                    case 1:
                        r = n;
                        break;
                    case 4:
                        return u.label++,
                        {
                            value: n[1],
                            done: !1
                        };
                    case 5:
                        u.label++,
                        s = n[1],
                        n = [0];
                        continue;
                    case 7:
                        n = u.ops.pop(),
                        u.trys.pop();
                        continue;
                    default:
                        if (r = u.trys,
                        !(r = r.length > 0 && r[r.length - 1]) && (6 === n[0] || 2 === n[0])) {
                            u = 0;
                            continue
                        }
                        if (3 === n[0] && (!r || n[1] > r[0] && n[1] < r[3])) {
                            u.label = n[1];
                            break
                        }
                        if (6 === n[0] && u.label < r[1]) {
                            u.label = r[1],
                            r = n;
                            break
                        }
                        if (r && u.label < r[2]) {
                            u.label = r[2],
                            u.ops.push(n);
                            break
                        }
                        r[2] && u.ops.pop(),
                        u.trys.pop();
                        continue
                    }
                    n = e.call(t, u)
                } catch (t) {
                    n = [6, t],
                    s = 0
                } finally {
                    a = r = 0
                }
            if (5 & n[0])
                throw n[1];
            return {
                value: n[0] ? n[1] : void 0,
                done: !0
            }
        }
        var a, s, r, l, u = {
            label: 0,
            sent: function() {
                if (1 & r[0])
                    throw r[1];
                return r[1]
            },
            trys: [],
            ops: []
        };
        return l = {
            next: n(0),
            throw: n(1),
            return: n(2)
        },
        "function" == typeof c.default && (l[o.default] = function() {
            return this
        }
        ),
        l
    };
    e.initSketchingBoardData = a
}
, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    function a() {
        return p(this, void 0, void 0, function() {
            var t, e;
            return m(this, function(n) {
                switch (n.label) {
                case 0:
                    return [4, (0,
                    v.getUserData)()];
                case 1:
                    return t = n.sent(),
                    -101 === t.code ? (d.basicData.isLogin = !1,
                    [2]) : t.error ? (console.error(t.error),
                    [2, h.fatalError()]) : (e = t.data,
                    e.time < 0 ? (console.error(new Error("服务器返回账号剩余时间为负值.")),
                    [2, h.fatalError()]) : (d.basicData.drawStatus = e.draw_status,
                    d.basicData.waitTime = e.time,
                    d.basicData.userVaild = e.user_valid,
                    d.basicData.superUser = e.super_user,
                    e.time > 0 && !e.draw_status && (d.basicData.resetDrawStatus = !0),
                    [2]))
                }
            })
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.initUserData = void 0;
    var s = n(176)
      , o = i(s)
      , r = n(152)
      , c = i(r)
      , l = n(5)
      , u = i(l)
      , d = n(264)
      , f = n(265)
      , h = function(t) {
        if (t && t.__esModule)
            return t;
        var e = {};
        if (null != t)
            for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e.default = t,
        e
    }(f)
      , v = n(266)
      , p = function(t, e, n, i) {
        return new (n || (n = u.default))(function(a, s) {
            function o(t) {
                try {
                    c(i.next(t))
                } catch (t) {
                    s(t)
                }
            }
            function r(t) {
                try {
                    c(i.throw(t))
                } catch (t) {
                    s(t)
                }
            }
            function c(t) {
                t.done ? a(t.value) : new n(function(e) {
                    e(t.value)
                }
                ).then(o, r)
            }
            c((i = i.apply(t, e || [])).next())
        }
        )
    }
      , m = function(t, e) {
        function n(t) {
            return function(e) {
                return i([t, e])
            }
        }
        function i(n) {
            if (a)
                throw new TypeError("Generator is already executing.");
            for (; u; )
                try {
                    if (a = 1,
                    s && (r = s[2 & n[0] ? "return" : n[0] ? "throw" : "next"]) && !(r = r.call(s, n[1])).done)
                        return r;
                    switch (s = 0,
                    r && (n = [0, r.value]),
                    n[0]) {
                    case 0:
                    case 1:
                        r = n;
                        break;
                    case 4:
                        return u.label++,
                        {
                            value: n[1],
                            done: !1
                        };
                    case 5:
                        u.label++,
                        s = n[1],
                        n = [0];
                        continue;
                    case 7:
                        n = u.ops.pop(),
                        u.trys.pop();
                        continue;
                    default:
                        if (r = u.trys,
                        !(r = r.length > 0 && r[r.length - 1]) && (6 === n[0] || 2 === n[0])) {
                            u = 0;
                            continue
                        }
                        if (3 === n[0] && (!r || n[1] > r[0] && n[1] < r[3])) {
                            u.label = n[1];
                            break
                        }
                        if (6 === n[0] && u.label < r[1]) {
                            u.label = r[1],
                            r = n;
                            break
                        }
                        if (r && u.label < r[2]) {
                            u.label = r[2],
                            u.ops.push(n);
                            break
                        }
                        r[2] && u.ops.pop(),
                        u.trys.pop();
                        continue
                    }
                    n = e.call(t, u)
                } catch (t) {
                    n = [6, t],
                    s = 0
                } finally {
                    a = r = 0
                }
            if (5 & n[0])
                throw n[1];
            return {
                value: n[0] ? n[1] : void 0,
                done: !0
            }
        }
        var a, s, r, l, u = {
            label: 0,
            sent: function() {
                if (1 & r[0])
                    throw r[1];
                return r[1]
            },
            trys: [],
            ops: []
        };
        return l = {
            next: n(0),
            throw: n(1),
            return: n(2)
        },
        "function" == typeof c.default && (l[o.default] = function() {
            return this
        }
        ),
        l
    };
    e.initUserData = a
}
, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.LiveSketchingBoard = void 0;
    var a = n(10)
      , s = i(a)
      , o = n(176)
      , r = i(o)
      , c = n(152)
      , l = i(c)
      , u = n(5)
      , d = i(u)
      , f = n(238)
      , h = i(f)
      , v = n(504)
      , p = n(509)
      , m = function(t, e, n, i) {
        return new (n || (n = d.default))(function(a, s) {
            function o(t) {
                try {
                    c(i.next(t))
                } catch (t) {
                    s(t)
                }
            }
            function r(t) {
                try {
                    c(i.throw(t))
                } catch (t) {
                    s(t)
                }
            }
            function c(t) {
                t.done ? a(t.value) : new n(function(e) {
                    e(t.value)
                }
                ).then(o, r)
            }
            c((i = i.apply(t, e || [])).next())
        }
        )
    }
      , g = function(t, e) {
        function n(t) {
            return function(e) {
                return i([t, e])
            }
        }
        function i(n) {
            if (a)
                throw new TypeError("Generator is already executing.");
            for (; u; )
                try {
                    if (a = 1,
                    s && (o = s[2 & n[0] ? "return" : n[0] ? "throw" : "next"]) && !(o = o.call(s, n[1])).done)
                        return o;
                    switch (s = 0,
                    o && (n = [0, o.value]),
                    n[0]) {
                    case 0:
                    case 1:
                        o = n;
                        break;
                    case 4:
                        return u.label++,
                        {
                            value: n[1],
                            done: !1
                        };
                    case 5:
                        u.label++,
                        s = n[1],
                        n = [0];
                        continue;
                    case 7:
                        n = u.ops.pop(),
                        u.trys.pop();
                        continue;
                    default:
                        if (o = u.trys,
                        !(o = o.length > 0 && o[o.length - 1]) && (6 === n[0] || 2 === n[0])) {
                            u = 0;
                            continue
                        }
                        if (3 === n[0] && (!o || n[1] > o[0] && n[1] < o[3])) {
                            u.label = n[1];
                            break
                        }
                        if (6 === n[0] && u.label < o[1]) {
                            u.label = o[1],
                            o = n;
                            break
                        }
                        if (o && u.label < o[2]) {
                            u.label = o[2],
                            u.ops.push(n);
                            break
                        }
                        o[2] && u.ops.pop(),
                        u.trys.pop();
                        continue
                    }
                    n = e.call(t, u)
                } catch (t) {
                    n = [6, t],
                    s = 0
                } finally {
                    a = o = 0
                }
            if (5 & n[0])
                throw n[1];
            return {
                value: n[0] ? n[1] : void 0,
                done: !0
            }
        }
        var a, s, o, c, u = {
            label: 0,
            sent: function() {
                if (1 & o[0])
                    throw o[1];
                return o[1]
            },
            trys: [],
            ops: []
        };
        return c = {
            next: n(0),
            throw: n(1),
            return: n(2)
        },
        "function" == typeof l.default && (c[r.default] = function() {
            return this
        }
        ),
        c
    }
      , w = function() {
        function t(t) {
            this.option = null,
            this.canvas = null,
            this.context = null,
            this.offscreens = {
                base: {
                    image: {
                        canvas: null,
                        context: null,
                        updateInNextTick: !0
                    },
                    sketching: {
                        canvas: null,
                        context: null,
                        updateInNextTick: !0
                    },
                    pointer: {
                        canvas: null,
                        context: null
                    }
                },
                fragments: {
                    image: [],
                    sketching: []
                }
            },
            this.image = null,
            this.drawingPosition = {
                x: 0,
                y: 0
            },
            this.brushSize = 1,
            this.brushColor = h.default.CANVAS.BRUSH_COLOR[2],
            this.lockBrushPosition = !1,
            this.brushInAsync = !1,
            this.enableBrushAfterSpaceUp = !1,
            this.tickEvents = [],
            this.nextTicks = [],
            this.mousePosition = {
                x: 0,
                y: 0
            },
            this.blockPosition = {
                visual: {
                    x: 0,
                    y: 0
                },
                logical: {
                    x: 0,
                    y: 0
                }
            },
            this.cameraOffset = {
                moveStart: {
                    x: 0,
                    y: 0
                },
                current: {
                    x: 0,
                    y: 0
                },
                moveEnd: {
                    x: 0,
                    y: 0
                }
            },
            this.imagePosition = {
                moveStart: {
                    x: 0,
                    y: 0
                },
                current: {
                    x: 0,
                    y: 0
                },
                moveEnd: {
                    x: 0,
                    y: 0
                }
            },
            this.activeKeyboardEvent = !1,
            this._inDrawing = !1,
            this._useBrush = !1,
            this._inMoving = !1,
            this._scaleLevel = 0,
            this.onDrawing = null,
            this.setCanvasScale = function() {
                var t = 1;
                return function() {
                    var e = this
                      , n = e.scaleRate;
                    t !== n && (e.context.scale(n / t, n / t),
                    t = e.scaleRate)
                }
            }(),
            this.option = t,
            this.initBoardMainCanvas(),
            this.initBaseCanvas(),
            this.startTickingLoop(),
            this.initEvents(),
            this.initDrawingEvents(),
            this.registerTicks()
        }
        return Object.defineProperty(t.prototype, "inDrawing", {
            get: function() {
                return this._inDrawing
            },
            set: function(t) {
                this._inDrawing = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "useBrush", {
            get: function() {
                return this._useBrush
            },
            set: function(t) {
                this._useBrush = t,
                t ? this.setCanvasCursor("default") : this.setCanvasCursor("move")
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "inMoving", {
            get: function() {
                return this._inMoving
            },
            set: function(t) {
                this._inMoving = t,
                t && this.setCanvasCursor("move")
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "scaleRate", {
            get: function() {
                return this.scaleLevel * h.default.SCALING_DELTA || 1
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "scaleLevel", {
            get: function() {
                return this._scaleLevel
            },
            set: function(t) {
                t > h.default.MAX_SCALING && (t = h.default.MAX_SCALING),
                t < 0 && (t = 0),
                this._scaleLevel = t
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.loadImageByRawData = function(t) {
            var e = this;
            return void 0 === t && (t = []),
            new d.default(function(n, i) {
                var a = h.default.IMAGE.WIDTH
                  , s = h.default.IMAGE.HEIGHT
                  , o = document.createElement("canvas");
                o.width = a,
                o.height = s;
                for (var r = o.getContext("2d"), c = r.createImageData(a, s), l = new ArrayBuffer(c.data.length), u = new Uint8ClampedArray(l), d = new Uint32Array(l), f = 0; f < s; f++)
                    for (var v = 0; v < a; v++)
                        if (void 0 !== t[f]) {
                            var p = t[f][v];
                            void 0 !== p && null !== p && (d[f * a + v] = 255 << 24 | p[2] << 16 | p[1] << 8 | p[0])
                        }
                c.data.set(u),
                r.putImageData(c, 0, 0),
                e.offscreens.base.image.canvas = o,
                e.offscreens.base.image.context = r,
                e.nextTick(n)
            }
            )
        }
        ,
        t.prototype.loadImageByBitmap = function(t, e) {
            var n = this;
            void 0 === t && (t = "");
            var i = {};
            return (0,
            s.default)(h.default.CANVAS.BRUSH_COLOR).forEach(function(t) {
                i[t] = (0,
                p.hexToRgb)(h.default.CANVAS.BRUSH_COLOR[t])
            }),
            new d.default(function(e, a) {
                var s = h.default.IMAGE.WIDTH
                  , o = h.default.IMAGE.HEIGHT
                  , r = document.createElement("canvas");
                r.width = s,
                r.height = o;
                for (var c = r.getContext("2d"), l = c.createImageData(s, o), u = new ArrayBuffer(l.data.length), d = new Uint8ClampedArray(u), f = new Uint32Array(u), v = 0; v < o; v++)
                    for (var p = 0; p < s; p++) {
                        var m = t[v * s + p];
                        if (void 0 !== m) {
                            var g = i[m];
                            f[v * s + p] = 255 << 24 | g[2] << 16 | g[1] << 8 | g[0]
                        }
                    }
                l.data.set(d),
                c.putImageData(l, 0, 0),
                n.offscreens.base.image.canvas = r,
                n.offscreens.base.image.context = c,
                n.nextTick(e)
            }
            )
        }
        ,
        t.prototype.setBrushSize = function(t) {
            this.brushSize = t
        }
        ,
        t.prototype.setBrushColor = function(t) {
            this.brushColor = t
        }
        ,
        t.prototype.enableBrush = function() {
            this.useBrush = !0
        }
        ,
        t.prototype.disableBrush = function() {
            this.useBrush = !1
        }
        ,
        t.prototype.registerTickEvent = function(t) {
            this.tickEvents.indexOf(t) < 0 && this.tickEvents.push(t)
        }
        ,
        t.prototype.assignDrawingPixel = function(t, e) {
            this.drawingPosition.x = t,
            this.drawingPosition.y = e
        }
        ,
        t.prototype.othersDrawing = function(t, e, n, i) {
            var a = this.offscreens.base.sketching.context;
            (0,
            v.drawMultiPixels)(t, e, n, i, a)
        }
        ,
        t.prototype.draw = function(t, e, n, i) {
            void 0 === t && (t = this.drawingPosition.x),
            void 0 === e && (e = this.drawingPosition.y),
            void 0 === n && (n = this.brushColor),
            void 0 === i && (i = this.brushSize);
            var a = this.offscreens.base.sketching.context;
            this.inDrawing = !0,
            (0,
            v.drawMultiPixels)(t, e, n, i, a),
            this.inDrawing = !1
        }
        ,
        t.prototype.nextTick = function(t) {
            "function" == typeof t && this.nextTicks.push(t)
        }
        ,
        t.prototype.initBoardMainCanvas = function() {
            var t = this
              , e = this.option;
            this.canvas = document.querySelector(e.selector),
            this.context = this.canvas.getContext("2d"),
            ["mozImageSmoothingEnabled", "webkitImageSmoothingEnabled", "msImageSmoothingEnabled", "imageSmoothingEnabled"].forEach(function(e) {
                t.context[e] = h.default.CANVAS.ENABLE_SMOOTHING
            })
        }
        ,
        t.prototype.initBaseCanvas = function() {
            var t = this;
            ["image", "sketching", "pointer"].forEach(function(e) {
                var n = document.createElement("canvas")
                  , i = n.getContext("2d");
                n.width = h.default.IMAGE.WIDTH,
                n.height = h.default.IMAGE.HEIGHT,
                t.offscreens.base[e].canvas = n,
                t.offscreens.base[e].context = i
            })
        }
        ,
        t.prototype.initEvents = function() {
            var t = this
              , e = this.canvas;
            e.addEventListener("mousedown", function(e) {
                t.useBrush || t.startCameraMoving(e)
            }),
            e.addEventListener("mouseup", function(e) {
                t.endCameraMoving(e)
            }),
            e.addEventListener("mousemove", function(e) {
                var n = {
                    x: e.offsetX,
                    y: e.offsetY
                };
                t.mousePosition.x = n.x / t.scaleRate,
                t.mousePosition.y = n.y / t.scaleRate,
                t.moveCamera(e)
            }),
            e.addEventListener("mouseleave", function(e) {
                t.endCameraMoving(e)
            });
            var n = window.navigator.userAgent.indexOf("Firefox") > -1;
            e.addEventListener(n ? "wheel" : "mousewheel", function(e) {
                e.preventDefault();
                var n = e.deltaY || -1 * e.wheelDelta
                  , i = t.blockPosition.logical.x
                  , a = t.blockPosition.logical.y
                  , s = !0;
                n < 0 ? (s = t.scaleLevel < h.default.MAX_SCALING,
                t.scaleIn()) : (s = t.scaleLevel > 0,
                t.scaleOut()),
                s && (t.moveCameraTo(i, a),
                t.mousePosition.x = e.offsetX / t.scaleRate,
                t.mousePosition.y = e.offsetY / t.scaleRate)
            }),
            window.addEventListener("mousedown", function(e) {
                t.activeKeyboardEvent = e.target === t.canvas
            })
        }
        ,
        t.prototype.initDrawingEvents = function() {
            var t = this
              , e = this.canvas;
            window.addEventListener("keydown", function(e) {
                if (t.activeKeyboardEvent)
                    switch (e.preventDefault(),
                    e.keyCode) {
                    case 32:
                        t.useBrush && (t.disableBrush(),
                        t.enableBrushAfterSpaceUp = !0)
                    }
            }),
            window.addEventListener("keyup", function(e) {
                if (t.activeKeyboardEvent)
                    switch (e.preventDefault(),
                    e.keyCode) {
                    case 32:
                        t.enableBrushAfterSpaceUp && (t.enableBrush(),
                        t.enableBrushAfterSpaceUp = !1);
                        break;
                    case 66:
                        !t.inMoving && !t.useBrush && !t.inDrawing && t.enableBrush();
                        break;
                    case 27:
                        !t.inMoving && t.useBrush && !t.inDrawing && t.disableBrush()
                    }
            }),
            e.addEventListener("mousedown", function(e) {
                t.useBrush && !t.brushInAsync && (e.preventDefault(),
                t.lockBrushPosition = !0,
                h.default.CANVAS.ASYNC_DRAWING && (t.brushInAsync = !0))
            }),
            e.addEventListener("mouseup", function(e) {
                return m(t, void 0, void 0, function() {
                    var t, n, i, a, s;
                    return g(this, function(o) {
                        switch (o.label) {
                        case 0:
                            if (!this.useBrush)
                                return [3, 8];
                            if (e.preventDefault(),
                            t = {
                                x: this.blockPosition.logical.x - h.default.CANVAS.OFFSET_BETWEEN_CURSOR_AND_PIXEL,
                                y: this.blockPosition.logical.y - h.default.CANVAS.OFFSET_BETWEEN_CURSOR_AND_PIXEL
                            },
                            this.assignDrawingPixel(t.x, t.y),
                            !h.default.CANVAS.ASYNC_DRAWING)
                                return [3, 7];
                            if (n = this.drawingPosition.x,
                            i = this.drawingPosition.y,
                            a = this.brushColor,
                            "function" != typeof this.onDrawing)
                                return [3, 5];
                            o.label = 1;
                        case 1:
                            return o.trys.push([1, 3, , 4]),
                            [4, this.onDrawing.call(this, {
                                x: this.drawingPosition.x,
                                y: this.drawingPosition.y,
                                brushColor: this.brushColor,
                                brushSize: this.brushSize
                            })];
                        case 2:
                            return o.sent(),
                            this.draw(),
                            this.brushInAsync = !1,
                            [3, 4];
                        case 3:
                            return s = o.sent(),
                            [3, 4];
                        case 4:
                            return [3, 6];
                        case 5:
                            o.label = 6;
                        case 6:
                            return this.lockBrushPosition = !1,
                            [3, 8];
                        case 7:
                            if (this.draw(),
                            "function" == typeof this.onDrawing)
                                try {
                                    this.onDrawing.call(this, {
                                        x: this.drawingPosition.x,
                                        y: this.drawingPosition.y,
                                        brushColor: this.brushColor,
                                        brushSize: this.brushSize
                                    })
                                } catch (t) {
                                    console.error("[Error] onDrawing 执行错误: ", t)
                                }
                            this.lockBrushPosition = !1,
                            o.label = 8;
                        case 8:
                            return [2]
                        }
                    })
                })
            })
        }
        ,
        t.prototype.scaleIn = function() {
            this.scaleLevel++
        }
        ,
        t.prototype.scaleOut = function() {
            this.scaleLevel--
        }
        ,
        t.prototype.updateBlockPosition = function() {
            if (!this.lockBrushPosition) {
                var t = Math.round(this.mousePosition.x / h.default.CANVAS.PIXELS_PER_BLOCK)
                  , e = Math.round(this.mousePosition.y / h.default.CANVAS.PIXELS_PER_BLOCK)
                  , n = t * h.default.CANVAS.PIXELS_PER_BLOCK
                  , i = e * h.default.CANVAS.PIXELS_PER_BLOCK;
                this.blockPosition.visual.x = n,
                this.blockPosition.visual.y = i,
                this.blockPosition.logical.x = Math.abs(this.cameraOffset.current.x) + n,
                this.blockPosition.logical.y = Math.abs(this.cameraOffset.current.y) + i
            }
        }
        ,
        t.prototype.compositePointer = function() {
            if (this.useBrush) {
                var t = this.blockPosition.visual.x - h.default.CANVAS.OFFSET_BETWEEN_CURSOR_AND_PIXEL
                  , e = this.blockPosition.visual.y - h.default.CANVAS.OFFSET_BETWEEN_CURSOR_AND_PIXEL
                  , n = this.brushColor
                  , i = this.brushSize
                  , a = this.offscreens.base.pointer.canvas
                  , s = this.offscreens.base.pointer.context;
                s.clearRect(0, 0, a.width, a.height),
                (0,
                v.drawMultiPixels)(t, e, n, i, s),
                this.context.drawImage(a, 0, 0)
            }
        }
        ,
        t.prototype.compositeImage = function() {
            var t = this.offscreens.base.image.canvas;
            t && this.offscreens.base.image.updateInNextTick && this.context.drawImage(t, this.imagePosition.current.x, this.imagePosition.current.y)
        }
        ,
        t.prototype.compositeSketching = function() {
            var t = this.offscreens.base.sketching.canvas;
            t && this.context.drawImage(t, this.cameraOffset.current.x, this.cameraOffset.current.y)
        }
        ,
        t.prototype.clearCanvas = function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
        ,
        t.prototype.setCanvasCursor = function(t) {
            void 0 === t && (t = "default"),
            this.canvas.style.cursor = t
        }
        ,
        t.prototype.startCameraMoving = function(t) {
            t.preventDefault(),
            this.inMoving = !0,
            this.lockBrushPosition = !0,
            this.cameraOffset.moveStart.x = t.offsetX,
            this.cameraOffset.moveStart.y = t.offsetY
        }
        ,
        t.prototype.moveCamera = function(t) {
            t.preventDefault();
            var e = this.offscreens.base.image.canvas;
            if (this.inMoving && e) {
                var n = {
                    x: t.offsetX,
                    y: t.offsetY
                };
                this.cameraOffset.current.x = n.x,
                this.cameraOffset.current.y = n.y;
                var i = {
                    x: (n.x - this.cameraOffset.moveStart.x) / this.scaleRate,
                    y: (n.y - this.cameraOffset.moveStart.y) / this.scaleRate
                }
                  , a = {
                    x: i.x + this.cameraOffset.moveEnd.x,
                    y: i.y + this.cameraOffset.moveEnd.y
                };
                a.x >= 0 && (a.x = 0),
                a.y >= 0 && (a.y = 0);
                var s = this.getLimitedCameraOffset(a.x, a.y);
                this.cameraOffset.current.x = s[0],
                this.cameraOffset.current.y = s[1]
            }
        }
        ,
        t.prototype.endCameraMoving = function(t) {
            t.preventDefault(),
            this.cameraOffset.moveEnd.x = this.cameraOffset.current.x,
            this.cameraOffset.moveEnd.y = this.cameraOffset.current.y,
            this.syncImagePositionWithCamera(t),
            this.inMoving = !1,
            this.lockBrushPosition = !1
        }
        ,
        t.prototype.syncImagePositionWithCamera = function(t) {
            this.imagePosition.moveEnd.x = this.cameraOffset.moveEnd.x,
            this.imagePosition.moveEnd.y = this.cameraOffset.moveEnd.y
        }
        ,
        t.prototype.updateImagePosition = function() {
            this.imagePosition.current.x = Math.round(this.cameraOffset.current.x),
            this.imagePosition.current.y = Math.round(this.cameraOffset.current.y)
        }
        ,
        t.prototype.moveCameraTo = function(t, e) {
            var n = this.canvas.width / 2 / this.scaleRate
              , i = this.canvas.height / 2 / this.scaleRate
              , a = {
                x: -1 * Math.abs(t - n),
                y: -1 * Math.abs(e - i)
            }
              , s = this.getLimitedCameraOffset(a.x, a.y);
            this.cameraOffset.current.x = this.cameraOffset.moveEnd.x = s[0],
            this.cameraOffset.current.y = this.cameraOffset.moveEnd.y = s[1]
        }
        ,
        t.prototype.getLimitedCameraOffset = function(t, e) {
            var n = [0, 0]
              , i = this.offscreens.base.image.canvas
              , a = -1 * (i.width * this.scaleRate - this.canvas.width)
              , s = -1 * (i.height * this.scaleRate - this.canvas.height);
            return t * this.scaleRate <= a && (t = a / this.scaleRate),
            e * this.scaleRate <= s && (e = s / this.scaleRate),
            n[0] = Math.round(t),
            n[1] = Math.round(e),
            n
        }
        ,
        t.prototype.startTickingLoop = function() {
            for (var t = 0, e = this.tickEvents.length; t < e; t++) {
                var n = this.tickEvents[t];
                n.call(this)
            }
            for (var t = 0, i = this.nextTicks.length; t < i; t++) {
                var n = this.nextTicks.shift();
                "function" == typeof n && n.call(this)
            }
            requestAnimationFrame(this.startTickingLoop.bind(this))
        }
        ,
        t.prototype.registerTicks = function() {
            this.registerTickEvent(this.clearCanvas),
            this.registerTickEvent(this.setCanvasScale),
            this.registerTickEvent(this.updateImagePosition),
            this.registerTickEvent(this.updateBlockPosition),
            this.registerTickEvent(this.compositeImage),
            this.registerTickEvent(this.compositeSketching),
            this.registerTickEvent(this.compositePointer)
        }
        ,
        t
    }();
    e.LiveSketchingBoard = w
}
, function(t, e, n) {
    "use strict";
    function i(t, e, n, i) {
        void 0 === t && (t = 0),
        void 0 === e && (e = 0),
        void 0 === n && (n = "#000"),
        i.fillStyle = n,
        i.fillRect(t, e, 1, 1)
    }
    function a(t, e, n, a, s) {
        void 0 === t && (t = 0),
        void 0 === e && (e = 0),
        void 0 === n && (n = "#000"),
        void 0 === a && (a = 0);
        for (var o = 0; o < a; o++)
            for (var r = 0; r < a; r++)
                i(t + r, e + o, n, s)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.drawSinglePixel = i,
    e.drawMultiPixels = a
}
, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    n(163),
    n(377);
    var a = n(4)
      , s = i(a)
      , o = n(296)
      , r = i(o)
      , c = n(376);
    n(382),
    s.default.use(r.default),
    (new c.RootVM).$mount("#pixel-drawing-app")
}
, function(t, e, n) {
    "use strict";
    function i(t) {
        var e = 1;
        window.addEventListener("keyup", function(n) {
            switch (n.keyCode) {
            case 65:
                if (e >= s.default.MAX_BRUSH_SIZE)
                    break;
                e *= 2;
                break;
            case 83:
                if (e <= 1)
                    break;
                e /= 2
            }
            t.setBrushSize(e)
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.init = void 0;
    var a = n(238)
      , s = function(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }(a);
    e.init = i
}
, function(t, e, n) {
    "use strict";
    function i(t) {
        return window.TextDecoder && t ? new window.TextDecoder : {
            decode: function(t) {
                return decodeURIComponent(window.escape(String.fromCharCode.apply(null, new Uint8Array(t))))
            }
        }
    }
    function a(t, e) {
        var n = new Uint8Array(t)
          , i = new Uint8Array(e)
          , a = new Uint8Array(t.byteLength + e.byteLength);
        return a.set(n, 0),
        a.set(i, t.byteLength),
        a.buffer
    }
    function s(t) {
        var e = t.data
          , n = new DataView(e,0)
          , a = n.getInt32(d)
          , s = n.getInt16(f)
          , o = (n.getInt16(h),
        n.getInt32(v));
        n.getInt32(p);
        switch (o) {
        case 8:
            this.heartBeat(),
            c = setInterval(this.heartBeat.bind(this), 3e4);
            break;
        case 3:
            this._listener && this._listener("online", n.getInt32(16));
            break;
        case 5:
            for (var r, l = n, u = e, g = 0; g < u.byteLength; g += a)
                a = l.getInt32(g),
                s = l.getInt16(g + f),
                r = m.decode(u.slice(g + s, g + a)),
                r || (m = i(!1),
                r = m.decode(u.slice(g + s, g + a))),
                this._listener && this._listener("msg", r)
        }
    }
    function o() {
        c && clearInterval(c);
        var t = Math.floor(3 * Math.random() + 3);
        setTimeout(this.firstConnection.bind(this), 1e3 * t)
    }
    function r() {
        console.error("[Error] Socket 连接失败.")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.DanmuSocket = void 0;
    var c, l = n(151), u = function(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }(l), d = 0, f = 4, h = 6, v = 8, p = 12, m = i(!0), g = function() {
        return window.TextEncoder ? new window.TextEncoder : {
            encode: function(t) {
                for (var e = new ArrayBuffer(t.length), n = new Uint8Array(e), i = 0, a = t.length; i < a; i++)
                    n[i] = t.charCodeAt(i);
                return n
            }
        }
    }(), w = function() {
        function t(t, e, n) {
            this.roomid = null,
            this.connection = null;
            var i = window.location.protocol.indexOf("https") > -1 ? "wss" : "ws"
              , a = n[i];
            this.connection = new WebSocket(i + "://" + e + ":" + a + "/sub"),
            this.connection.binaryType = "arraybuffer",
            this.connection.onopen = this.firstConnection.bind(this),
            this.connection.onmessage = s.bind(this),
            this.connection.onclose = o.bind(this),
            this.connection.onerror = r.bind(this),
            this.roomid = t
        }
        return t.prototype.firstConnection = function() {
            var t = (0,
            u.default)({
                uid: 0,
                roomid: this.roomid
            })
              , e = new ArrayBuffer(16)
              , n = new DataView(e,0)
              , i = g.encode(t);
            n.setInt32(d, 16 + i.byteLength),
            n.setInt16(f, 16),
            n.setInt16(h, 1),
            n.setInt32(v, 7),
            n.setInt32(p, 1),
            this.connection.send(a(e, i))
        }
        ,
        t.prototype.heartBeat = function() {
            var t = new ArrayBuffer(16)
              , e = new DataView(t,0);
            e.setInt32(d, 16),
            e.setInt16(f, 16),
            e.setInt16(h, 1),
            e.setInt32(v, 2),
            e.setInt32(p, 1),
            this.connection.send(t)
        }
        ,
        t.prototype.closeHeartBeat = function() {
            clearInterval(c)
        }
        ,
        t.prototype.send = function(t) {
            this.connection.send(t)
        }
        ,
        t.prototype.close = function() {
            this.connection.close()
        }
        ,
        t.prototype.setListener = function(t) {
            this._listener = t
        }
        ,
        t
    }();
    e.DanmuSocket = w
}
, function(t, e, n) {
    "use strict";
    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    function a(t) {
        var e = !1
          , n = new o.default
          , i = u.default.SOCKET.ROOMID;
        new c.DanmuSocket(i,"broadcastlv.chat.bilibili.com",{
            ws: 2244,
            wss: 2245
        }).setListener(function(i, a) {
            if ("msg" === i) {
                try {
                    a = JSON.parse(a)
                } catch (t) {
                    console.error(new Error("广播 JSON 解析失败")),
                    a = null
                }
                if ("DRAW_UPDATE" === a.cmd && a) {
                    if (e)
                        return;
                    var s = a.data
                      , o = Math.abs(s.x_max - s.x_min) + 1
                      , c = u.default.CANVAS.BRUSH_COLOR[s.color];
                    if (void 0 === c)
                        return e = !0,
                        void n.linkPopup({
                            title: "画板添加了新的颜色！" + r.randomEmoji.happy(),
                            width: 360,
                            content: "刷新一下浏览器可以看到新的颜色喔 " + r.randomEmoji.helpless(),
                            button: {
                                confirm: "刷新",
                                cancel: !1
                            }
                        }).onConfirm(function(t) {
                            window.location.reload()
                        });
                    t.othersDrawing(s.x_min, s.y_min, c, o)
                }
            }
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.init = void 0;
    var s = n(4)
      , o = i(s)
      , r = n(234)
      , c = n(507)
      , l = n(238)
      , u = i(l);
    e.init = a
}
, function(t, e, n) {
    "use strict";
    function i(t) {
        var e = 0
          , n = 0
          , i = 0;
        return "number" == typeof t && (t = t.toString()),
        "#" == t.charAt(0) && (t = t.substr(1)),
        3 === t.length && (t = [t[0], t[0], t[1], t[1], t[2], t[2]].join("")),
        e = parseInt(t.charAt(0) + "" + t.charAt(1), 16),
        n = parseInt(t.charAt(2) + "" + t.charAt(3), 16),
        i = parseInt(t.charAt(4) + "" + t.charAt(5), 16),
        [e, n, i]
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.hexToRgb = i
}
], [505]);
