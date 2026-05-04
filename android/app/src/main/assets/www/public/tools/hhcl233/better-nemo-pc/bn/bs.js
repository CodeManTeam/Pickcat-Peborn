// 让 workspace.html 在 iframe 环境下模拟原生桥接能力
(function () {
    const BRIDGE_FLAG = '__bn_bridge__';
    const pendingCallbacks = new Map();
    let requestId = 0;

    if (!Number.isFinite(window.dscb)) {
        window.dscb = 0;
    }

    function nextRequestId() {
        requestId += 1;
        return `bn_req_${Date.now()}_${requestId}`;
    }

    function tryParseJSON(value) {
        if (typeof value !== 'string') return value;
        try {
            return JSON.parse(value);
        } catch (_) {
            return value;
        }
    }

    function toJSONString(value) {
        if (typeof value === 'string') return value;
        try {
            return JSON.stringify(value ?? null);
        } catch (_) {
            return 'null';
        }
    }

    function emitToParent(payload) {
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({ [BRIDGE_FLAG]: true, ...payload }, '*');
        }
    }

    if (!window._dsf) {
        console.log('iframe环境：模拟原生APP注入 _dsf');
        window._dsf = {
            postMessage: function (type, data) {
                const parsed = tryParseJSON(data);
                console.log('[Webview -> Host][_dsf.postMessage]', type, parsed);
                emitToParent({
                    direction: 'webview->host',
                    api: '_dsf.postMessage',
                    args: [type, data],
                    type,
                    payload: parsed,
                });
                return '';
            },
        };
    }

    if (!window._dsaf) {
        console.log('iframe环境：模拟原生APP注入 _dsaf');
        window._dsaf = {
            postMessageAsyn: function (type, data, callback) {
                const parsed = tryParseJSON(data);
                console.log('[Webview -> Host][_dsaf.postMessageAsyn]', type, parsed);

                const cbId = typeof callback === 'function' ? nextRequestId() : null;
                if (cbId) {
                    pendingCallbacks.set(cbId, callback);
                }

                emitToParent({
                    direction: 'webview->host',
                    api: '_dsaf.postMessageAsyn',
                    args: [type, data],
                    callbackId: cbId,
                    type,
                    payload: parsed,
                });

                return '';
            },
        };
    }

    if (!window._dsbridge) {
        console.log('iframe环境：模拟原生APP注入 _dsbridge');
        window._dsbridge = {
            call: function (...args) {
                const method = args[0];
                const arg = args[1];
                const callback = typeof args[2] === 'function' ? args[2] : null;
                const parsed = tryParseJSON(arg);

                // 常见初始化调用，给一个稳定返回值，避免 webview 侧 JSON.parse 报错
                if (method === 'postMessageSyn') {
                    const type = parsed && parsed.type;
                    if (type === 'GET_ENV') {
                        return JSON.stringify({
                            env: 'iframe',
                            platform: 'desktop',
                            userAgent: navigator.userAgent,
                        });
                    }
                }

                const cbId = callback ? nextRequestId() : null;
                if (cbId) {
                    pendingCallbacks.set(cbId, callback);
                }

                emitToParent({
                    direction: 'webview->host',
                    api: '_dsbridge.call',
                    args,
                    method,
                    arg: parsed,
                    callbackId: cbId,
                });

                // 同步调用必须立即返回，默认返回可 JSON.parse 的字符串
                return '{}';
            },
        };
    }

    function dispatchNativeMessageToWebview(type, payload) {
        const data = toJSONString(payload);
        if (window._dsf && typeof window._dsf.postMessage === 'function') {
            return window._dsf.postMessage(type, data);
        }
        return undefined;
    }

    function handleHostMessage(data) {
        if (!data || typeof data !== 'object') return;

        // 回调响应：host -> webview
        if (data[BRIDGE_FLAG] && data.direction === 'host->webview-callback' && data.callbackId) {
            const callback = pendingCallbacks.get(data.callbackId);
            if (callback) {
                pendingCallbacks.delete(data.callbackId);
                try {
                    callback(data.result);
                } catch (e) {
                    console.error('[Bridge callback error]', e);
                }
            }
            return;
        }

        // 显式指定要调用哪个桥接 API
        if (data[BRIDGE_FLAG] && data.direction === 'native->webview' && data.api && Array.isArray(data.args)) {
            if (data.api === '_dsf.postMessage' && window._dsf?.postMessage) {
                return window._dsf.postMessage(...data.args);
            }
            if (data.api === '_dsaf.postMessageAsyn' && window._dsaf?.postMessageAsyn) {
                return window._dsaf.postMessageAsyn(...data.args);
            }
            if (data.api === '_dsbridge.call' && window._dsbridge?.call) {
                return window._dsbridge.call(...data.args);
            }
            return;
        }

        // 简写协议：只给 type + payload/data，按原生消息方式喂给 _dsf.postMessage
        if (typeof data.type === 'string' && (Object.prototype.hasOwnProperty.call(data, 'payload') || Object.prototype.hasOwnProperty.call(data, 'data'))) {
            const payload = Object.prototype.hasOwnProperty.call(data, 'payload') ? data.payload : data.data;
            dispatchNativeMessageToWebview(data.type, payload);
        }
    }

    window.addEventListener('message', (event) => {
        if (event.source !== window.parent && event.source !== window) return;
        handleHostMessage(event.data);
    });

    // 便于在 iframe 内调试
    window.BNBridgeMock = {
        dispatchNativeMessageToWebview,
        handleHostMessage,
    };
})();
