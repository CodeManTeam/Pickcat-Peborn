console.log(
    "\n%c  Welcome to ❤ BetterNemo - " +
    BetterNemoVersion +
    " ❤ for Nemo o(*￣▽￣*)ブ  %c \n\n",
    "border-radius: 5px; padding: 2px; font-weight: bold;" +
    "background-color: #20A5C4; font-size: 16px; color: white;",
    ""
);
function hook(id, name, getThis = false) {
    var ready = false;
    var map = new Map();
    var proxy = {
        configurable: true,
        get: function () {
            return map.get(this);
        },
        set: function (value) {
            map.set(this, value);
            if (!getThis) window[name] = value;
            else window[name] = this;
            ready = true;
            return void 0;
        },
    };
    Object.defineProperty(Object.prototype, id, proxy);
}
hook("./src/webview/runtime/index.ts", "HookRuntime");
hook("./src/common/redux/index.ts", "HookRedux");
hook("./node_modules/@crc/stage/build/core/actors/brush.js", "HookBrush");
hook("./node_modules/@crc/stage/build/core/utils/index.js", "HookUtils");
hook("./node_modules/@crc/blink/dist/core/di/index.js", "HookDi");
hook("./node_modules/@crc/stage/build/core/scenes/scene.js", "HookScene");
hook("./src/i18n/zh_CN.ts", "HookMsgZhCN");
hook("./src/webview/bridge/index.ts", "HookBridge");
hook("./src/webview/bridge/messages.ts", "HookBridgeMsg");
hook("./node_modules/@crc/heart/build/opti/compiler.js", "HookOptiCompiler");
hook("./node_modules/@crc/stage/build/core/physics/actor_body.js", "HookActorBody");
hook("./node_modules/dsbridge/index.js", "HookDsbridge");
hook("./node_modules/@crc/blink/dist/core/singletons/theme.js", "HookTheme");
function isPhoneTestEnv() {
    return !navigator.userAgent.includes('__TEST_ENV__') && BetterNemoVersion === "999999.99";
}
function isPCTestEnv() {
    return navigator.userAgent.includes('__TEST_ENV__') && BetterNemoVersion === "999999.99";
}
let debugServer;
if (isPhoneTestEnv()) {
    debugServer = new WebSocket("ws://192.168.1.11:1234");
    function reconnect() {
        console.log('重连');
        debugServer = new WebSocket("ws://192.168.1.11:1234");
        debugServer.onclose = reconnect;
    };
    debugServer.onclose = reconnect;
}
function parseJSDocHeader(fileContent) {
    // 匹配文件开头的 /** ... */ 注释块
    const headerCommentRegex = /^\/\*\*[\s\S]*?\*\//;
    const match = fileContent.trim().match(headerCommentRegex);

    if (!match) return null;

    const comment = match[0];
    const metadata = {};

    // 提取 @tag value 格式的内容
    const tagRegex = /@(\w+)\s+(.+)/g;
    let tagMatch;

    while ((tagMatch = tagRegex.exec(comment)) !== null) {
        const tag = tagMatch[1];
        const value = tagMatch[2].trim();
        metadata[tag] = value;
    }

    return metadata;
}
function extensionMgrLog(...msg) {
    console.log(
        `%c BetterNemo %c %c 扩展管理 %c ${msg.join(' ')}`,
        'border-radius:5px;padding:2px;font-weight:bold;background: #20A5C4;color:white;', '',
        'border-radius:5px;padding:2px;font-weight:bold;background: #20A5C4;color:white;', ''
    );
}
function extensionMgrError(...msg) {
    console.log(
        `%c BetterNemo %c %c 扩展管理 %c ${msg.join(' ')}`,
        'border-radius:5px;padding:2px;font-weight:bold;background: #ff0000;color:white;', '',
        'border-radius:5px;padding:2px;font-weight:bold;background: #ff0000;color:white;', ''
    );
}
function get_run_mgr() {
    if (!window['HookRuntime']) return;
    return HookRuntime.exports.get_webview_runtime().heart.runtime_manager.run_mgr;
}
let extensionMetaData = {};
let themeMetaData = {};
function loadScript(src) {
    if (isPhoneTestEnv())
        src = `http://192.168.1.11:8080/${src}`;
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}
function loadStyle(src) {
    if (isPhoneTestEnv())
        src = `http://192.168.1.11:8080/${src}`;
    return new Promise((resolve, reject) => {
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.classList.add('bn-theme');
        style.href = src;
        style.onload = resolve;
        style.onerror = reject;
        document.head.appendChild(style);
    });
}
let ok = false;
setInterval(() => {
    // window._dsInit = true;
    (function () {
        if (window._dsf) {
            const postMessage = _dsf.postMessage;
            _dsf.postMessage = (...args) => {
                if (experimentalConfig.webview_debug) {
                    console.log('[Nemo -> Webview]', ...args);
                    debugServer.send(JSON.stringify({
                        type: 'n2w',
                        data: [...args]
                    }));
                }
                if (args.length === 2)
                    if (args[0] === 'INIT_WEBVIEW_DATA') {
                        let data = JSON.parse(args[1]);
                        console.log('已拦截初始化信息！', data);
                        data.context_menu_with_set_block_visibility = true;
                        data.translucent_block_visible = 'translucent';
                        return postMessage.apply(_dsf, [
                            'INIT_WEBVIEW_DATA',
                            JSON.stringify(data)
                        ]);
                    }
                return postMessage.apply(_dsf, args);
            };
            const postMessageAsyn = _dsaf.postMessageAsyn;
            _dsaf.postMessageAsyn = async (...args) => {
                if (experimentalConfig.webview_debug) {
                    console.log('[Nemo -> Webview] [ASYNC]', ...args);
                    debugServer.send(JSON.stringify({
                        type: 'n2w async',
                        data: [...args]
                    }));
                }
                return postMessageAsyn.apply(_dsaf, args);
            };
        }
        if ((!ok) && window['_dsbridge']) {
            // _dsbridge.call('_dsb.dsinit', "{\"data\":null}");
            const call = _dsbridge.call;
            _dsbridge.call = (...args) => {
                console.log('_dsbridge.call', ...args);
                return call.apply(_dsbridge, args);
            };
            console.log('WOOOOOOOOOOOOOOOOOOOOOOWWWWWWWWWW', 'dsbridge');
            ok = true;
        }
    })
}, 50);
const log = console.log;
// console.log = function (...args) {
//     try {
//         if (args[0])
//             if (args[0].includes('%c')) {
//                 log(...args);
//                 return;
//             }
//     } catch (e) { }
//     log(new Date().toLocaleTimeString(), ...args);
// };
(async () => {
    await loadScript('extensions/_CONFIG.js');
    extensionMgrLog('扩展列表:', EXTENSION_FILES.join(', '));
    await loadScript('theme/_CONFIG.js');
    extensionMgrLog('主题列表:', THEME_FILES.join(', '));
    await loadScript('workspace-scripts/storage.js');
    await loadScript('workspace-scripts/utils.js');
    loadScript('workspace.bundle.79d6432e01ccdecb492a.js');
    await loadScript('workspace-scripts/blocks.js');
    await loadScript('workspace-scripts/prototype-inject.js');
    await loadScript('workspace-scripts/toolbox.js');
    await loadScript('workspace-scripts/domain-functions.js');
    await loadScript('workspace-scripts/cat-block.js');
    await loadScript('workspace-scripts/float-ball.js');
})();
function getBrowserVersion() { return 999 }