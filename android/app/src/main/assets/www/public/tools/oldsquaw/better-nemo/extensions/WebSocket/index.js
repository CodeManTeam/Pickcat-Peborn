/// <reference path="../_TYPE.d.ts"/>
Extension.metaData = {
    name: "WebSocket",
    version: "0.0.1",
    author: "hhcl233"
};

(async () => {
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const u = BN.Toolbox;
    await BN.waitBlocklyLoaded();
    BN.addToolbox("websocket", "icon-websocket", "#54c0ff", [
        u.title("WebSocket"),
        u.block("bn_new_ws"),
        u.block("bn_ws_send"),
        u.block("bn_ws_close"),
        u.simpleEventBlock("bn_on_ws_open"),
        u.simpleEventBlock("bn_on_ws_message", [
            "param",
            "bn_on_ws_message_param",
        ]),
        u.simpleEventBlock("bn_on_ws_error", [
            "param",
            "bn_on_ws_error_param",
        ]),
        u.simpleEventBlock("bn_on_ws_close"),
        u.flyout_bottom(),
    ]);
})();