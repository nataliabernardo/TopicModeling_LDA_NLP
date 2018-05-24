(function () {
    var n;
    n = !1;
    window.tableau = window.tableau || {},
        function (n) {
            function t() {
                for (var i, n, r = document.getElementsByTagName("script"), t = r.length - 1; t >= 0; t -= 1)
                    if (i = r[t], /viz_v1\.js/.test(i.src)) break;
                return n = new RegExp(".*?[^/:]/").exec(i.src), n && (n[0].toLowerCase().indexOf("http://") !== -1 || n[0].toLowerCase().indexOf("https://") !== -1) || (n = new RegExp(".*?[^/:]/").exec(window.location.href)), n ? n[0].toLowerCase() : ""
            }
            n._apiScripts = n._apiScripts || [];
            n._apiScripts.push(t())
        }(window.tableau);
    window.tableau._apiLoaded || (window.tableau._apiLoaded = !0, function () {
        function b() {
            return typeof pageXOffset != "undefined" ? window.pageXOffset : document.documentElement.scrollLeft
        }

        function k() {
            return typeof pageYOffset != "undefined" ? window.pageYOffset : document.documentElement.scrollTop
        }

        function e(n) {
            return n === undefined || n === null
        }

        function r(n) {
            return n === undefined || n === null || n.length === 0
        }

        function d() {
            return !e(window.postMessage)
        }

        function g(n, t) {
            return n && n.nodeType === ut && n.tagName.toLowerCase() === t.toLowerCase()
        }

        function nt(n, t) {
            return n && (" " + n.className + " ").replace(/[\n\t\r]/g, " ").indexOf(" " + t + " ") > -1
        }

        function ft(n, t, i) {
            var r = n ? n.parentNode : null;
            for (i = i || document.body; r;) {
                if (nt(r, t)) return r;
                r = r === i ? null : r.parentNode
            }
            return r
        }

        function et(n) {
            var i, t, u, r;
            for (r = [
                    [/&/g, "&amp;"],
                    [/</g, "&lt;"],
                    [/>/g, "&gt;"],
                    [/"/g, "&quot;"],
                    [/'/g, "&#39;"],
                    [/\//g, "&#47;"]
                ], i = n || "", t = 0, u = r.length; t < u; t++) i = i.replace(r[t][0], r[t][1]);
            return i
        }

        function f(n, t) {
            return window.getComputedStyle ? window.getComputedStyle(n, t) : n.currentStyle
        }

        function o(n, t) {
            var i;
            return r(n) ? t : (i = n.match(/^(yes|y|true|t|1)$/i), !r(i))
        }

        function ot(n) {
            var t, i, u = [];
            if (r(n.filter)) return "";
            for (t = 0, i = n.filter.length; t < i; t++) u.push("&" + n.filter[t]);
            return u.join("")
        }

        function st(n) {
            return n = n.replace(/^\//, ""), n.charAt(n.length) !== "/" && (n += "/"), n
        }

        function ht(n, t, i) {
            var e, o, f, u = [t];
            f = i.site_root ? i.site_root : "";
            f.length > 0 && (f = st(f));
            r(i.path) ? r(i.ticket) ? u.push(f + "views/" + n) : u.push("trusted/" + i.ticket + "/" + f + "views/" + n) : u.push(i.path);
            u.push("?:embed=y");
            u.push("&:showVizHome=no");
            o = {
                "load-order": 1,
                width: 1,
                height: 1,
                embed: 1,
                filter: 1,
                path: 1,
                ticket: 1,
                serverRoot: 1,
                static_image: 1,
                site_prefix: 1,
                site_root: 1,
                bootstrapWhenNotified: 1
            };
            for (e in i) i.hasOwnProperty(e) && o[e] === undefined && u.push("&:" + e + "=" + i[e]);
            return u.join("")
        }

        function v(n, t) {
            var i, h = n.childNodes,
                s, c, u, f, e = "",
                l;
            for (t = t || {}, s = 0, c = h.length; s < c; s++) i = h[s], g(i, "param") && i.name ? (u = i.name, f = i.value ? i.value : null, u === "name" ? e = f : u === "filter" ? (t.filter = t.filter || [], t.filter.push(f)) : (t[u] = f, u === "mobile" && o(f, !1) && (w = !0))) : i.childNodes && i.childNodes.length > 0 && !g(i, "object") && (l = v(i, t), e = r(e) ? l : e);
            return e
        }

        function tt(n) {
            var u, i, t, f;
            return t = r(n.host_url) ? r(n.serverRoot) ? tableau._apiScripts[0] : n.serverRoot : decodeURIComponent(n.host_url), u = new RegExp(".*//"), f = new RegExp("https?://[-A-Za-z0-9]*public[-A-Za-z0-9]*\\.tableau"), i = u.exec(window.location.href)[0], i.indexOf("file://") === -1 && t.indexOf(i) === -1 && t.match(f) !== null && (t = t.replace(u, i)), t
        }

        function ct(n, t) {
            for (var i = 0; n[i] !== undefined; i += 1)
                if (n[i] === t) return !0;
            return !1
        }

        function lt(n, t) {
            for (var i = 0; n[i] !== undefined; i += 1)
                if (n[i] === t) return n.splice(i, 1), !0;
            return !1
        }

        function l(n) {
            var i = n.getBoundingClientRect(),
                t = f(n),
                r = parseInt(t.paddingLeft, 10) || 0,
                e = parseInt(t.paddingRight, 10) || 0,
                u = parseInt(t.paddingTop, 10) || 0,
                o = parseInt(t.paddingBottom, 10) || 0,
                s = parseInt(t.borderLeftWidth, 10) || 0,
                h = parseInt(t.borderTopWidth, 10) || 0;
            return {
                left: i.left + r + s + b(),
                top: i.top + u + h + k(),
                width: n.clientWidth - (r + e),
                height: n.clientHeight - (u + o)
            }
        }

        function it(n, t) {
            var i = Math.max(n.left, t.left),
                r = Math.max(n.top, t.top),
                u = Math.min(n.left + n.width, t.left + t.width),
                f = Math.min(n.top + n.height, t.top + t.height);
            return u <= i || f <= r ? {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            } : {
                left: i,
                top: r,
                width: u - i,
                height: f - r
            }
        }

        function at(n) {
            for (var u, t, e, r = l(n), i = n.parentElement; i && i.parentElement; i = i.parentElement) u = f(i).overflow, (u === "auto" || u === "scroll" || u === "hidden") && (r = it(r, l(i)));
            return t = l(document.documentElement), e = document.compatMode === "BackCompat", e && (t.height = document.body.clientHeight - t.left, t.width = document.body.clientWidth - t.top), t.left += b(), t.top += k(), it(r, t)
        }

        function vt(n, t) {
            var i = tableau.vizs[n]._loadOrder,
                r = tableau.vizs[t]._loadOrder;
            return i < r ? -1 : i === r ? 0 : 1
        }

        function y(n) {
            var t = n > -1 ? tableau.vizs[u[n]] : null;
            t && t._onLoaded()
        }

        function h(n) {
            var i, r;
            n === t && (r = t + 1, i = tableau.vizs[u[r]], i && (t = r, i.load(), window.postMessage && setTimeout(function () {
                h(t)
            }, 3e3)))
        }

        function yt() {
            return document.baseURI !== document.location.href
        }

        function pt() {
            var n;
            p ? (n = tableau.vizs[u[t]], n && n._iframe.readyState === "complete" && (y(t), h(t))) : (y(t), h(t))
        }

        function rt() {
            setTimeout(pt, 3e3)
        }

        function c(n) {
            var r, i, o, f, e;
            if (n.data && (typeof n.data == "string" || n.data instanceof String))
                if (o = n.data.split(","), f = o[0], f === "tableau.completed" || f === "completed") {
                    if (e = parseInt(o[1], 10), isNaN(e))
                        for (r = 0; r <= t; r++) i = tableau.vizs[u[r]], i && i._hideLoadIndicators();
                    y(e);
                    h(e)
                } else if (f === "tableau.loadIndicatorsLoaded") i = tableau.vizs[u[t]], i && i._hideLoadIndicators();
            else if (f === "layoutInfoReq")
                for (r = 0; r <= t; r++) i = tableau.vizs[u[r]], i && i._sendVisibleRect();
            else f === "tableau.listening" && (i = tableau.vizs[u[t]], i && i._enableVisibleRectCommunication())
        }

        function wt() {
            var n = navigator.userAgent;
            return n.indexOf("iPad") !== -1 ? !0 : n.indexOf("Android") !== -1 ? !0 : n.indexOf("AppleWebKit") !== -1 && n.indexOf("Mobile") !== -1 ? !0 : !1
        }

        function bt() {
            function t(n, t) {
                var i, r, u, f;
                i = 0;
                r = 0;
                u = document.documentElement.clientWidth / window.innerWidth;
                f = "sf," + t + "," + u + "," + i + "," + r;
                n.postMessage(f, "*")
            }

            function i(i) {
                if (typeof i.data == "string" || i.data instanceof String)
                    for (var u = i.data.split(","), r = 0, f; r < u.length;) n || u[r] !== "tableau.completed" && u[r] !== "completed" || (n = !0, t(i.source, -1)), u[r] === "sf?" && (f = u[++r], t(i.source, f)), ++r
            }
            var n = !1;
            return window.addEventListener && window.addEventListener("message", i, !1), this
        }

        function i(n) {
            this._objectElement = n
        }

        function kt() {
            for (var n, r = document.getElementsByTagName("object"), u = [], t = 0, i = r.length; t < i; t++) n = r[t], nt(n, "tableauViz") && !ct(a, n) && (a.push(n), u.push(n));
            return u
        }

        function dt(n) {
            for (var r = window.tableau._apiScripts, t = 0, i = Math.min(n.length, r.length); t < i; t++) n[t].params.serverRoot = r[t]
        }

        function gt() {
            for (var n = document.getElementById("tableau_hide_this"); n;) n.parentNode.removeChild(n), n = document.getElementById("tableau_hide_this")
        }

        function s() {
            var n, o, e, s, i, c, r = [];
            if (s = kt(), s.length !== 0) {
                for (gt(), n = 0, o = s.length; n < o; n++) e = s[n], i = {
                    filter: [],
                    ticket: "",
                    path: ""
                }, c = v(e, i), i.width = parseInt(f(e, null).width, 10), isNaN(i.width) && delete i.width, i.height = parseInt(f(e, null).height, 10), isNaN(i.height) && delete i.height, r.push({
                    name: c,
                    objectElement: e,
                    params: i
                });
                for (dt(r), n = 0, o = r.length; n < o; n++) tableau.createViz(r[n].name, r[n].objectElement, r[n].params);
                u.sort(vt);
                h(t)
            }
        }
        var ut = 1,
            p = navigator.userAgent.indexOf("MSIE") > -1 && !window.opera,
            t = -1,
            w, a = [],
            u = [];
        i._instanceCounter = 0;
        i.prototype.getRootElement = function () {
            return this._ensurePlaceholderDiv() ? this._placeholderDiv : null
        };
        i.prototype.adjustSlopInWidth = function (n, t) {
            return t - 4
        };
        i.prototype.adjustSlopInHeight = function (t, i) {
            var r = 4;
            return o(t.tabs, !1) && (r += 3), (o(t.toolbar, !0) || n) && (r += 5), i - r
        };
        i.prototype.adjustHeightForPublic = function (n, t) {
            return !n.embed_code_version || n.embed_code_version < 3 ? t - 33 : t
        };
        i.prototype.sizeIframeToObjectElement = function (t) {
            var o = this._objectElement,
                u = {},
                r, i;
            e(o) || (v(o, u), r = f(o, null).width, i = f(o, null).height, r.indexOf("%") === -1 && i.indexOf("%") === -1 && (r = parseInt(r, 10), i = parseInt(i, 10), u.embed_code_version || (r = this.adjustSlopInWidth(u, r), i = this.adjustSlopInHeight(u, i)), n && (i = this.adjustHeightForPublic(u, i)), r = r + "px", i = i + "px"), t.style.width = r, t.style.height = i)
        };
        i.prototype.sizeToObjectElement = function (n) {
            var t = this._objectElement,
                i, r;
            e(t) || (i = f(t, null).width, r = f(t, null).height, n.style.width = i, n.style.height = r)
        };
        i.prototype.createLoadingFeedback = function (n, t) {
            var u, e, c, f, l, v = this,
                s, h, a = o(t.display_spinner, !0);
            if (s = yt(), a !== !0 || s || (t.display_spinner = "no"), this._ensurePlaceholderDiv()) return this.sizeToObjectElement(this._placeholderDiv), e = this._placeholderDiv.style, e.position = "relative", e.overflow = "hidden", e.display = "none", u = ['<div style="position:absolute;top:0;left:0;right:0;bottom:0;border:0;padding:0;margin:0">'], h = i._instanceCounter++, s || (u.push('<div style="top:20%;left:0;right:0;text-align:center;position:absolute;z-index:991;box-shadow:none">'), u.push('<style>#tableau-svg-spinner-%instId%,#tableau-svg-spinner-container-%instId%{position:absolute;top:0;bottom:0;left:0;right:0;margin:auto}#tableau-svg-spinner-container-%instId%{width:65px;height:65px;border-radius:10px}#tableau-svg-spinner-%instId%{width:50px;height:50px;-webkit-animation:tableau-svg-spinner-animation 1s linear infinite;animation:tableau-svg-spinner-animation 1s linear infinite}@-webkit-keyframes tableau-svg-spinner-animation{100%{-webkit-transform:rotate(360deg);}}@keyframes tableau-svg-spinner-animation{100%{transform:rotate(360deg)}}<\/style><div id="tableau-svg-spinner-container-%instId%"><div id="tableau-svg-spinner-%instId%"><svg viewBox="0 0 50 50"><g><path d="M42.7,7.3L40,10c3.8,3.8,6.2,9.1,6.2,15c0,11.7-9.5,21.1-21.1,21.1C13.3,46.1,3.9,36.7,3.9,25H0c0,13.8,11.2,25,25,25c13.8,0,25-11.2,25-25C50,18.1,47.2,11.9,42.7,7.3z" style="fill:#616570;"/><\/g><g><defs><path id="tableau-svg-spinner-circle-%instId%" d="M25,50C11.2,50,0,38.8,0,25C0,11.2,11.2,0,25,0c13.8,0,25,11.2,25,25C50,38.8,38.8,50,25,50z M25,3.9C13.3,3.9,3.9,13.3,3.9,25c0,11.7,9.5,21.1,21.1,21.1S46.1,36.7,46.1,25C46.1,13.3,36.7,3.9,25,3.9z"/><\/defs><clipPath id="tableau-svg-spinner-clippath-%instId%"><use xlink:href="#tableau-svg-spinner-circle-%instId%"style="overflow:visible;"/><\/clipPath><linearGradient id="tableau-svg-spinner-gradient-%instId%" gradientUnits="userSpaceOnUse" x1="0" y1="12.4998" x2="50"y2="12.4998"><stop offset="0" style="stop-color:#616570;stop-opacity:0"/><stop offset="0.15" style="stop-color:#616570;stop-opacity:0.04"/><stop offset="0.3" style="stop-color:#616570;stop-opacity:0.16"/><stop offset="0.45" style="stop-color:#616570;stop-opacity:0.36"/><stop offset="0.61" style="stop-color:#616570;stop-opacity:0.64"/><stop offset="0.76" style="stop-color:#616570"/><\/linearGradient><polygon points="25,25 0,25 0,0 50,0" style="clip-path:url(#tableau-svg-spinner-clippath-%instId%);fill:url(#tableau-svg-spinner-gradient-%instId%);"/><\/g><\/svg><\/div><\/div>'.replace(/%instId%/g, h)), u.push("<\/div>")), o(t.display_overlay, !0) && u.push("<div style='position:absolute;top:0;left:0;right:0;bottom:0;z-index:990;background-color:#EBEBEB;opacity:.24'><\/div>"), o(t.display_static_image, !0) && !r(t.static_image) && (u.push("<style>#tableau-svg-spinner-container-%instId%{border-radius:12px;background:rgba(255,255,255,.6);<\/style>".replace(/%instId%/g, h)), t.display_static_image = "no", c = o(t.tabs, !1), l = c ? "23px;" : "1px", u.push('<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; '), u.push("background: transparent url('"), u.push(et(t.static_image)), u.push("') no-repeat scroll 0 0; box-shadow: none; left:0px; top:"), u.push(l), u.push('"><\/div>')), u.push("<\/div>"), f = document.createElement("div"), f.innerHTML = u.join(""), this._glassPaneElement = f.firstChild, this._placeholderDiv.appendChild(this._glassPaneElement), f.innerHTML = "", f = null, this._createAndAppendIframe()
        };
        i.prototype.show = function () {
            this._placeholderDiv && (this._placeholderDiv.style.display = "block")
        };
        i.prototype.dispose = function () {
            if (this._glassPaneElement) {
                var n, t, i;
                n = 150;
                this._glassPaneElement.style.transition = n + "ms opacity";
                this._glassPaneElement.style.opacity = 0;
                t = function (n) {
                    n.innerHTML = "";
                    n.parentNode.removeChild(n);
                    n = null
                };
                i = this._glassPaneElement;
                window.setTimeout(function () {
                    t(i)
                }, n)
            }
            this._objectElement && (lt(a, this._objectElement), this._objectElement.parentNode.removeChild(this._objectElement), this._objectElement = null)
        };
        i.prototype._ensurePlaceholderDiv = function () {
            var n;
            return e(this._placeholderDiv) ? e(this._objectElement) ? !1 : (n = ft(this._objectElement, "tableauPlaceholder"), n || (n = document.createElement("div"), n.className = "tableauPlaceholder", this._objectElement.parentNode.insertBefore(n, this._objectElement), n.appendChild(this._objectElement), this._objectElement.style.display = "none"), this._placeholderDiv = n, !0) : !0
        };
        i.prototype._createAndAppendIframe = function () {
            var i, t, o, n, s, h, c, r, u, l, f;
            if (!e(this._objectElement)) {
                for (i = this._objectElement.attributes, n = document.createElement("iframe"), n.frameBorder = "0", n.marginHeight = "0", n.marginWidth = "0", u = {
                        en: "data visualization",
                        fr: "Visualisation de données",
                        es: "Visualización de datos",
                        pt: "Visualização de dados",
                        ja: "データ ビジュアライゼーション",
                        de: "Datenvisualisierung",
                        ko: "데이터 비주얼리제이션",
                        "zh-CN": "数据可视化"
                    }, f = window.navigator.language, l = u[f] || u[f.substr(0, 2)] || u.en, n.setAttribute("title", l), n.setAttribute("allowTransparency", "true"), n.setAttribute("allowFullScreen", "true"), t = 0, o = i.length; t < o; t++) i[t].specified && n.setAttribute(i[t].name, i[t].value);
                return n.style.cssText = this._objectElement.style.cssText, n.style.margin = "0px", n.style.padding = "0px", n.style.border = "none", this.sizeIframeToObjectElement(n), r = navigator.userAgent, h = r.indexOf("WebKit") >= 0, s = r.indexOf("Chrome") >= 0, c = r.indexOf("Safari") >= 0 || h && !s, c && n.addEventListener("mousewheel", function () {}), this._ensurePlaceholderDiv() && this._placeholderDiv.appendChild(n), n
            }
        };
        window.tableau.Viz = function (n, t, i) {
            this._name = n;
            this._iframe = t;
            this._filterArgs = "";
            this._filterOpts = ot(i);
            this._serverRoot = tt(i);
            this._baseUrl = ht(this._name, this._serverRoot, i);
            this._loadOrder = i["load-order"] ? parseInt(i["load-order"], 10) : 0;
            this._filter = {}
        };
        window.tableau.vizs = [];
        window.tableau.createViz = function (n, t, f) {
            var o, s, h, e;
            h = tt(f);
            s = new i(t);
            o = s.createLoadingFeedback(h, f);
            s.show();
            e = new tableau.Viz(n, o, f);
            e._loadFeedback = s;
            e.show();
            u.push(this.vizs.length);
            this.vizs.push(e);
            r(n) || (this.vizs[n] = e);
            window.postMessage || (p ? o.onreadystatechange = rt : o.onload = rt)
        };
        window.tableau.Viz.prototype.load = function () {
            var n = "&:loadOrderID=" + t,
                i = window.top === window.self ? "" : "&:increment_view_count=no";
            this._iframe.src = this._baseUrl + this._filterOpts + n + i
        };
        window.tableau.Viz.prototype.show = function () {
            this._iframe.style.display = "block"
        };
        window.tableau.Viz.prototype.hide = function () {
            this._iframe.style.display = "none"
        };
        window.tableau.Viz.prototype.refresh = function () {
            this._iframe.src = this._baseUrl + this._filterOpts + this._filterArgs + "&:refresh=true"
        };
        window.tableau.Viz.prototype.revert = function () {
            this._iframe.src = this._baseUrl + "&:revert=all";
            this._filterArgs = "";
            this._filter = {}
        };
        window.tableau.Viz.prototype.filter = function (n) {
            var t;
            if (e(n)) {
                this.revert();
                return
            }
            for (t in n) this._filter[t] = n[t];
            this._filterArgs = "";
            for (t in n) this._filterArgs += "&" + encodeURIComponent(t) + "=", this._filterArgs += typeof n[t] == "string" ? encodeURIComponent(n[t]) : encodeURIComponent(n[t].join(","));
            this._iframe.src = this._baseUrl + this._filterOpts + this._filterArgs
        };
        window.tableau.Viz.prototype._sendVisibleRect = function () {
            var n, t, i;
            d() && this._iframe && this._iframe.contentWindow && (n = at(this._iframe), t = l(this._iframe), i = ["layoutInfoResp", n.left - t.left, n.top - t.top, n.width, n.height].join(","), this._iframe.contentWindow.postMessage(i, "*"))
        };
        window.tableau.Viz.prototype._enableVisibleRectCommunication = function () {
            d() && this._iframe && this._iframe.contentWindow && this._iframe.contentWindow.postMessage("tableau.enableVisibleRectCommunication", "*")
        };
        window.tableau.Viz.prototype._onLoaded = function () {
            this._hideLoadIndicators();
            this._enableVisibleRectCommunication()
        };
        window.tableau.Viz.prototype._hideLoadIndicators = function () {
            this._loadFeedback && (this._loadFeedback.dispose(), this._loadFeedback = null, delete this._loadFeedback)
        };
        document.addEventListener ? (document.addEventListener("DOMContentLoaded", s, !1), document.addEventListener("message", c, !1), window.addEventListener("load", s, !1), window.addEventListener("message", c, !1)) : document.attachEvent ? (document.attachEvent("onreadystatechange", s), document.attachEvent("onmessage", c), window.attachEvent("onload", s), window.attachEvent("onmessage", c)) : (window.onload = s, window.onmessage = c);
        (wt() || w) && bt();
        tableau._createNewVizesAndStartLoading = s
    }());
    document.readyState === "complete" && tableau._createNewVizesAndStartLoading()
})();