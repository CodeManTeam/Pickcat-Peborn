/// <reference path="../_TYPE.d.ts"/>

Extension.metaData = {
    name: "模板",
    version: "0.0.1",
    description: "嗯对，这是一个模板扩展，你可以复制一份这个，写你自己的扩展",
    author: "写上你的名字",
    docs: ""
};

(async () => {
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Brush = (await BN.getHook("Brush")).Brush;
})();
(async () => {
    // 在这里定义了一些必要的API
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;
    // --------------------------------积木-------------------------------
    // 这条语句会等待Blockly加载完毕，别动
    await BN.waitBlocklyLoaded();
    // 这条语句会注册一个颜色
    BN.regColor("TEMPLATE_HUE", "#ff9900", "#ff9900");
    // 开始定义你的自定义积木吧
    const templateBlocks = [
        {
            type: "template_6",
            message0: "%1 当 触发事件 %2",
            args0: [{
                "type": "field_icon",
                "is_head": true,
                "src": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xOCAzNmM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4UzI3Ljk0MSAwIDE4IDAgMCA4LjA1OSAwIDE4czguMDU5IDE4IDE4IDE4eiIgZmlsbD0iIzU2ODBENSIvPjxwYXRoIGQ9Ik0xOCAzNWM5LjM4OSAwIDE3LTcuNjExIDE3LTE3UzI3LjM4OSAxIDE4IDEgMSA4LjYxMSAxIDE4czcuNjExIDE3IDE3IDE3eiIgZmlsbD0iI0ZGRiIvPjxwYXRoIGQ9Ik0yNS41NiAxNi40NTdjMS45MTUgMS4xMyAxLjkyNSAyLjk1NCAwIDQuMDlsLTEwLjA5NCA1Ljk1N0MxMy41NTIgMjcuNjM0IDEyIDI2Ljc2NiAxMiAyNC41OFYxMi40MjRjMC0yLjE5MiAxLjU0MS0zLjA2IDMuNDY2LTEuOTI0bDEwLjA5NCA1Ljk1N3oiIGZpbGw9IiM2MDhGRUUiLz48L2c+PC9zdmc+Cg==",
                "width": 38,
                "height": 38,
                "alt": "*"
            }, {
                type: "field_dropdown",
                name: "type",
                options: [
                    ["a", "a"],
                    ["b", "b"],
                    ["c", "c"]
                ],
                value: "a"
            }],
            ...Block.eventBlock,
        },
        {
            type: "template_3",
            message0: "触发事件 type %1",
            args0: [{
                type: "field_dropdown",
                name: "arg",
                options: [
                    ["a", "a"],
                    ["b", "b"],
                    ["c", "c"]
                ],
                value: "a"
            }],
            ...Block.methodBlock
        },
        {
            type: "template_4",
            message0: "%1 %2 %3 %4 %5 %6 %7 %8 %9 %10",
            args0: (function () {
                let args = [];
                for (let index = 0; index < 10; index++) {
                    args.push({
                        "type": "field_led_matrix",
                        "name": "value",
                        "custom": true,
                        "value": "0101011111111110111000100"
                    });
                }
                return args;
            })(),
            ...Block.methodBlock
        },
        {
            type: "template_1",
            message0: "电梯选层 %1",
            args0: [{
                "type": "field_number_advanced",
                "custom": true,
                "name": "NUM",
                "value": 1,
                "min": -10,
                "max": 10,
                "editor": "single_number"
            }],
            ...Block.methodBlock
        },
        {
            type: "template_2",
            message0: "%1",
            args0: [{
                "type": "field_image",
                "src": "https://imgsa.baidu.com/forum/w%3D580/sign=4befe2e68c8ba61edfeec827713597cc/0aeeb3fb43166d22b590f1b8482309f79152d2c9.jpg",
                "width": 100,
                "height": 100,
                "alt": "*"
            }],
            ...Block.methodBlock
        },
        {
            type: "template_5",
            message0: "%2 咕咕嘎...%1",
            args0: [{
                "type": "field_gesture",
                "name": "gesture",
                "custom": true
            }, {
                "type": "field_piano",
                "custom": true,
                "name": "note",
                "note": "C4"
            }],
            ...Block.methodBlock
        },
        {
            type: "template_7",
            message0: "下拉框的 %1 匹配",
            args0: [{
                "type": "field_dropdown",
                "name": "dropdown",
                "options": [
                    ["[前缀 和 后缀]", "1"],
                    ["[前缀  后缀]", "2"],
                ]
            }]
        }
    ].map((block) => { return { ...block, colour: "%{BKY_TEMPLATE_HUE}" }; });
    // 等待积木对象加载完毕，别动
    await BN.waitBlockLoaded();
    // 注册你的积木
    BN.regBlocks(templateBlocks);
    // --------------------------------积木盒-------------------------------
    // 定义你的积木盒
    const templateXML = [
        Toolbox.title("模板 · Template"),
        Toolbox.block("template_7"),
        Toolbox.button("template_btn", "HELLO", () => console.log("嗯呃~")),
        Toolbox.eventBlock("template_6"),
        Toolbox.block("template_3"),
        Toolbox.error("这到底是什么啊啊啊？！"),
        Toolbox.block("template_1"),
        Toolbox.block("template_2"),
        Toolbox.block("template_4"),
        Toolbox.block("template_5"),
        Toolbox.flyout_bottom(),
    ];
    // 为你的积木盒注册一个图标
    BN.regIcon(`<symbol id="icon-template" viewBox="-1030 -960 2500 2500"><path d="M224 0c35.3 0 64 21.5 64 48 0 10.4-4.4 20-12 27.9-6.6 6.9-12 15.3-12 24.9 0 15 12.2 27.2 27.2 27.2l44.8 0c26.5 0 48 21.5 48 48l0 44.8c0 15 12.2 27.2 27.2 27.2 9.5 0 18-5.4 24.9-12 7.9-7.5 17.5-12 27.9-12 26.5 0 48 28.7 48 64s-21.5 64-48 64c-10.4 0-20.1-4.4-27.9-12-6.9-6.6-15.3-12-24.9-12-15 0-27.2 12.2-27.2 27.2L384 464c0 26.5-21.5 48-48 48l-56.8 0c-12.8 0-23.2-10.4-23.2-23.2 0-9.2 5.8-17.3 13.2-22.8 11.6-8.7 18.8-20.7 18.8-34 0-26.5-28.7-48-64-48s-64 21.5-64 48c0 13.3 7.2 25.3 18.8 34 7.4 5.5 13.2 13.5 13.2 22.8 0 12.8-10.4 23.2-23.2 23.2L48 512c-26.5 0-48-21.5-48-48L0 343.2c0-12.8 10.4-23.2 23.2-23.2 9.2 0 17.3 5.8 22.8 13.2 8.7 11.6 20.7 18.8 34 18.8 26.5 0 48-28.7 48-64s-21.5-64-48-64c-13.3 0-25.3 7.2-34 18.8-5.5 7.4-13.5 13.2-22.8 13.2-12.8 0-23.2-10.4-23.2-23.2L0 176c0-26.5 21.5-48 48-48l108.8 0c15 0 27.2-12.2 27.2-27.2 0-9.5-5.4-18-12-24.9-7.5-7.9-12-17.5-12-27.9 0-26.5 28.7-48 64-48z"></path></symbol>`);
    // 添加你的积木盒
    BN.addToolbox("template", "icon-template", "#ff9900", templateXML);
    // ---------------------------解释器-------------------------------------
    // 等待Runmgr加载完毕，别动
    await BN.waitRunmgrLoaded();
    (() => {
        const action_type = {
            id: 'template_6',
            entity_specific: false,
            responder_blocks: [{
                id: 'template_6',
                type: "action",
                async: false,
            }],
        };
        const registry = get_run_mgr().registry;
        registry.register_action_type({
            namespace: "",
            id: action_type.id,
        });
        registry.register({
            namespace: "",
            id: action_type.id,
            respond: {
                to_action: {
                    namespace: "",
                    id: action_type.id,
                },
                type: 'action',
                async: false,
                priority: undefined,
                entity_specific: action_type.entity_specific,
                trigger_function: undefined,
                filter_arg_names: undefined,
            },
        });
    })();
    // 给你的积木定义一个解释器
    BN.regMethod('template_3', (params, _, __, ___) => {
        BN.emitSimpleEvent("template_6", params.arg);
    });
})();