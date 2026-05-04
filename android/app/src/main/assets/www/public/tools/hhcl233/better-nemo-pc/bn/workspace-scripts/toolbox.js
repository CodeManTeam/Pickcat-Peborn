(async () => {
    BetterNemo.log("积木盒", "等待Blockly加载");
    await isBlocklyLoaded();
    BetterNemo.log("积木盒", "等待Workspace加载");
    await isBlocklyMainworkspaceLoaded();
    BetterNemo.log("积木盒", "Blockly, Workspace 加载完成");
    const u = BetterNemo.Toolbox;
    // 定义BetterNemo积木盒
    const bnXML = [
        u.title("BetterNemo 扩展积木"),
        u.block("bn_comment"),
        u.block("bn_get_time_stamp"),
        u.block("bn_var_get"),
        u.block("bn_var_set"),
        u.block("bn_create_video"),
        u.block("bn_play_video"),
        u.block("bn_pause_video"),
        u.block("bn_set_video_current_time"),
        u.block("bn_on_key_down"),
        u.block("bn_on_key_up"),
        u.block("bn_on_key_event_param"),
        u.block("bn_check_down_key"),
        u.block("bn_clipboard_write"),
        u.block("bn_clipboard_read"),
        u.block("bn_eval"),
        u.block("bn_alert"),
        u.block("bn_prompt"),
        u.line("BN运算"),
                u.block("bn_3D_array"),
                u.block("bn_factorial"),
                u.block("bn_trig_common"),
                u.block("bn_3D_rotation"),
                u.block("bn_regular_polygon"),
        u.line("隐藏积木 原版可用"),
        u.block("warp"),
        u.block("calculate", u.textValue("input", "sin(114)")),
        u.block("multiline_text"),
        u.block("color_picker"),
        u.flyout_bottom(),
    ];
    // 定义网络积木盒
    const networkXML = [
        u.title("网络 · Network"),
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
    ];
    const websocketXML = [
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
    ];
    // 注册网络积木盒
    regToolbox(
        "network",
        "icon-widget-http-client",
        "#54c0ff",
        networkXML,
    );
    // 注册WebSocket积木盒
    regToolbox(
        "websocket",
        "icon-websocket",
        "#54c0ff",
        websocketXML,
    );
    // 注册扩展积木盒
    regToolbox(
        "bn",
        "icon-feature",
        "#14B390",
        bnXML,
    );
    // 画笔扩展
    Blockly.mainWorkspace.toolbox_.children_[5].blocks.pop();
    Blockly.mainWorkspace.toolbox_.children_[5].blocks =
        Blockly.mainWorkspace.toolbox_.children_[5].blocks.concat(
            [
                u.line("Better Nemo 扩展积木"),
                u.block("bn_color"),
                u.block("bn_hex_to_array"),
                u.block("bn_set_pen_color_hex"),
                u.block("bn_set_fill_color_hex"),
                u.block("bn_draw_image_stamp"),
                u.block("bn_draw_custom_image_stamp"),
                u.block("bn_draw_video_stamp"),
                u.block("bn_draw_svg"),
                u.block("bn_rectangle_clear"),
                u.block("bn_better_draw_text_stamp"),
                u.block("bn_put_pixel"),
                u.block("bn_fill_polygon"),
                u.sep(),
                u.block("bn_dataURL_actor"),
                u.block("bn_dataURL_stage"),
                //u.block('bn_dataURL_URL', u.textValue('url', '')),
                u.flyout_bottom(),
            ].map((block) => str2xml(block)),
        );
    // 运算扩展
    Blockly.mainWorkspace.toolbox_.children_[7].blocks.pop();
    Blockly.mainWorkspace.toolbox_.children_[7].blocks =
        Blockly.mainWorkspace.toolbox_.children_[7].blocks.concat(
            [
                u.line("Better Nemo 扩展积木"),
                u.block("bn_3D_array"),
                u.block("bn_factorial"),
                u.block("bn_trig_common"),
                u.block("bn_3D_rotation"),
                u.block("bn_regular_polygon"),
                u.flyout_bottom(),
            ].map((block) => str2xml(block)),
        );
    BetterNemo.log("积木盒", "积木盒注入完成");
})();
