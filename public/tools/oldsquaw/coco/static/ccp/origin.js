const ccporigin = (() => {
    let href = location.href;
    if (href.includes('https://coco.codemao.cn/http-widget-proxy/')) {
        href = href.split('https://coco.codemao.cn/http-widget-proxy/')[1]
    }

    const url = new URL(href);

    const localPrefix = '/public/tools/oldsquaw/coco/';
    const localIndex = url.pathname.indexOf(localPrefix);
    if (localIndex >= 0) {
        return url.origin + url.pathname.slice(0, localIndex + localPrefix.length - 1);
    }

    if (url.origin.includes('open.lihouse.xyz')) {
        return url.origin + '/static/ccp'
    }
    return url.origin;
})();
