(async () => {
    BetterNemo.log("积木盒", "等待Blockly加载");
    await isBlocklyLoaded();
    BetterNemo.log("积木盒", "等待Workspace加载");
    await isBlocklyMainworkspaceLoaded();
    BetterNemo.log("积木盒", "Blockly, Workspace 加载完成");
    const u = BetterNemo.Toolbox;
    // 定义BetterNemo积木盒
    const bnXML = [
        u.title("隐藏积木 原版可用"),
        u.block("warp"),
        u.block("calculate", u.textValue("input", "sin(114)")),
        u.block("multiline_text"),
        u.block("color_picker"),
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
        u.flyout_bottom(),
    ];
    // 注册扩展积木盒
    regToolbox(
        "bn",
        "icon-feature",
        "#14B390",
        bnXML,
    );
    BetterNemo.log("积木盒", "积木盒注入完成");
})();
