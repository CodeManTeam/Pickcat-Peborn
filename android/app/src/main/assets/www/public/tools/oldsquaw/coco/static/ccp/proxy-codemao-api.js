function proxyXMLHttpRequest() {
    let originalOpen = XMLHttpRequest.prototype.open
    XMLHttpRequest.prototype.open = function open(
        /** @type {string} */ method,
        /** @type {string | URL} */ url
    ) {
        if (!(url instanceof window.URL)) {
            url = new window.URL(url, location.href)
        }
        if (needsProxy(url)) {
            Object.defineProperty(this, "__proxy_open__", {
                value: { method, url },
                enumerable: false
            })
            originalOpen.call(this, "POST", "https://ccp.cloudroo.top/omnia/proxy")
        } else {
            originalOpen.apply(this, arguments)
        }
    }
    XMLHttpRequest.prototype.open.toString = originalOpen.toString.bind(originalOpen)

    let originalSend = XMLHttpRequest.prototype.send
    XMLHttpRequest.prototype.send = function send(
        /** @type {Document | XMLHttpRequestBodyInit | null | undefined} */ body
    ) {
        if ("__proxy_open__" in this && this.__proxy_open__ != null) {
            originalSend.call(this, JSON.stringify({
                // @ts-ignore
                method: this.__proxy_open__.method,
                // @ts-ignore
                url: this.__proxy_open__.url,
                body: body
            }))
        } else {
            originalSend.apply(this, arguments)
        }
    }
    XMLHttpRequest.prototype.send.toString = originalSend.toString.bind(originalSend)
}

function proxyFetch() {
    let originalFetch = fetch
    window.fetch = function fetch(
        /** @type {RequestInfo | URL} */ input,
        /** @type {RequestInit | undefined} */ init
    ) {
        if (input instanceof Request) {
            input = input.url
        }
        if (typeof input == "string") {
            input = new window.URL(input, location.href)
        }
        if (needsProxy(input)) {
            return originalFetch.call(this, "https://ccp.cloudroo.top/omnia/proxy", {
                method: "post",
                body: JSON.stringify({
                    method: init == undefined ? "get" : init.method == undefined ? "get" : init.method,
                    url: input.href,
                    body: init == undefined ? undefined : init.body
                })
            })
        } else {
            return originalFetch.apply(this, arguments)
        }
    }
    fetch.toString = originalFetch.toString.bind(originalFetch)
}

/**
 * @param {URL} url
 */
function needsProxy(url) {
    if (url.hostname.endsWith("static.codemao.cn")) return false; // 不对 static.codemao.cn 进行转发
    return url.hostname.endsWith(".codemao.cn")
}

if (!location.hostname.endsWith(".codemao.cn")) {
    proxyXMLHttpRequest()
    proxyFetch()
}
