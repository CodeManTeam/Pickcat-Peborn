/// <reference path="../_TYPE.d.ts"/>
Extension.metaData = {
    name: "HTTP与JSON",
    version: "0.0.1",
    author: "BN"
};

(async () => {
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const u = BN.Toolbox;
    await BN.waitBlocklyLoaded();
    BN.addToolbox("network", "icon-widget-http-client", "#54c0ff", [
        u.title("HTTP 与 JSON"),
        u.block("bn_http_get"),
        u.block("bn_http_post"),
        u.block("bn_object_get"),
        u.block("bn_object_set"),
        u.block("bn_object_include_key"),
        u.block("bn_json_get_length"),
        u.block("bn_array_get"),
        u.block("bn_array_set"),
        u.block("bn_array_include_value"),
        u.block("bn_array_length"),
        u.flyout_bottom(),
    ]);
})();