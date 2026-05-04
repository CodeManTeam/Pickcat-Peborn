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
hook("./src/i18n/index.ts", "HookI18n");

// --------------- Player检测 & 加载动画 ---------------
const PLAYER = (new URLSearchParams(window.location.search)).get('player');
if (PLAYER)
    (async function () {
        while (!document['body']) await new Promise(resolve => setTimeout(resolve, 100));
        document.body.insertAdjacentHTML("afterbegin", `<div class="loader-mask"><div class="loader">${'<div class="text"><span>Better Nemo</span></div>'.repeat(9)}<div class="line"></div></div></div>`);
    })();
function hideLoader() {
    if (!document.querySelector(".loader-mask")) return;
    document.querySelector(".loader-mask").style.display = "none";
}
function setLoaderInfo(info, id = 1) {
    if (id == 1) document.title = info;
    if (!document.querySelector(".loader")) return;
    if (!document.querySelector(`.loader > .info.info-${id}`))
        document.querySelector(".loader").insertAdjacentHTML("beforeend",
            `<div class="info info-${id}" style="top:calc(50% + ${20 + id * 20}px)"><span>${info}</span></div>`);
    document.querySelector(`.loader > .info.info-${id}`).innerHTML = `<span>${info}</span>`;
}

// --------------- 环境检测 ---------------
function isPhoneTestEnv() {
    if (PLAYER) return false;
    return !navigator.userAgent.includes('__TEST_ENV__') && BetterNemoVersion === "999999.99";
}
function isPCTestEnv() {
    return navigator.userAgent.includes('__TEST_ENV__') && BetterNemoVersion === "999999.99";
}
function isCloudflareEnv() {
    return window.location.hostname == 'bn-p.pages.dev';
}
// --------------- Webview调试服务器 ---------------
let debugServer = { send: () => { } };
if (isPhoneTestEnv()) {
    debugServer = new WebSocket("ws://192.168.1.11:1234");
    function reconnect() {
        console.log('重连');
        debugServer = new WebSocket("ws://192.168.1.11:1234");
        debugServer.onclose = reconnect;
    };
    debugServer.onclose = reconnect;
}
// --------------- 工具函数 ---------------
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
function loadScript(src) {
    // if (isCloudflareEnv())
    //     src = `https://gitee.com/oldsquaw/better-nemo/raw/main/${src}`;
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
    // if (isCloudflareEnv())
    //     src = `https://gitee.com/oldsquaw/better-nemo/raw/main/${src}`;
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
loadStyle('style.css');
// --------------- 电脑端测试编辑器时隐藏舞台 ---------------
if (!PLAYER && isPCTestEnv()) {
    setInterval(() => {
        if (document.querySelector("#theatre_container")) {
            document.querySelector("#theatre_container").style.display = "none";
        }
    }, 100);
}
// --------------- 扩展、主题数据初始化 ---------------
let extensionMetaData = {};
let themeMetaData = {};
// --------------- 加载页面 ---------------
(async () => {
    setLoaderInfo('获取扩展列表...');
    await loadScript('extensions/_CONFIG.js');
    extensionMgrLog('扩展列表:', EXTENSION_FILES.join(', '));
    setLoaderInfo('获取主题列表...');
    await loadScript('theme/_CONFIG.js');
    extensionMgrLog('主题列表:', THEME_FILES.join(', '));
    setLoaderInfo('初始化存储...');
    await loadScript('workspace-scripts/storage.js');
    await loadScript('workspace-scripts/utils.js');
    setLoaderInfo('加载核心脚本...');
    if (isCloudflareEnv())
        loadScript('https://db0l8fnn8oqtof.database.nocode.cn/storage/v1/object/public/wenjian/anonymous/1776601566193_aowalndxrwh.js');
    else loadScript('assets/workspace.bundle.79d6432e01ccdecb492a.js');
    setLoaderInfo('加载自定义积木...');
    await loadScript('workspace-scripts/blocks.js');
    setLoaderInfo('注入原型...');
    await loadScript('workspace-scripts/prototype-inject.js');
    setLoaderInfo('加载自定义积木盒...');
    await loadScript('workspace-scripts/toolbox.js');
    setLoaderInfo('加载自定义解释器...');
    await loadScript('workspace-scripts/domain-functions.js');
    setLoaderInfo('喵~');
    await loadScript('workspace-scripts/cat-block.js');
    setLoaderInfo('加载悬浮球...');
    await loadScript('workspace-scripts/float-ball.js');
    setLoaderInfo('资源加载完成！');
    document.title = "BN Player";
})();
function getBrowserVersion() { return parseInt((new UAParser()).getResult().browser.version); }