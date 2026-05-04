/// <reference path="../_TYPE.d.ts"/>

Extension.metaData = {
    name: "MDUI控件",
    version: "0.1.0",
    description: "Material Design UI 组件库 - 按钮、卡片、开关",
    author: "皌 & Deepseek",
    docs: ""
};

(async () => {
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;

    await BN.waitBlocklyLoaded();

    // 注册主题色
    BN.regColor("MDUI_HUE", "#1967d2", "#1967d2");

    // ============ 积木定义 ============

    const mduiBlocks = [
        // 通用操作
        {
            type: "mdui_component_delete",
            message0: "删除组件 ID %1",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "component1"
            }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_component_get",
            message0: "获取控件 %1 的 %2",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "component1"
            },
                {
                    type: "field_dropdown", name: "%2", options: [
                        ["X坐标", "x"], ["Y坐标", "y"], ["宽度", "width"], ["高度", "height"],
                        ["是否可见", "visible"], ["Z索引", "zIndex"], ["透明度", "opacity"],
                        ["类型", "type"], ["父容器ID", "parentId"], ["所有属性(JSON)", "all"]
                    ]}],
            output: "String",
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_component_exists",
            message0: "控件 %1 是否存在",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "component1"
            }],
            output: "Boolean",
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_component_show",
            message0: "显示控件 %1",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "component1"
            }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_component_hide",
            message0: "隐藏控件 %1",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "component1"
            }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_component_set_position",
            message0: "设置控件 %1 X %2 Y %3",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "component1"
            },
                {
                    type: "input_value", name: "%2", check: "Number", value: 100
                },
                {
                    type: "input_value", name: "%3", check: "Number", value: 100
                }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_component_set_size",
            message0: "设置控件 %1 宽度 %2 高度 %3",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "component1"
            },
                {
                    type: "input_value", name: "%2", check: "Number", value: 200
                },
                {
                    type: "input_value", name: "%3", check: "Number", value: 150
                }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_component_set_style_color",
            message0: "设置控件 %1 %2 为 %3",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "component1"
            },
                {
                    type: "field_dropdown", name: "%2", options: [
                        ["背景色", "backgroundColor"], ["文字颜色", "color"],
                        ["边框颜色", "borderColor"], ["阴影", "boxShadow"]
                    ]},
                {
                    type: "input_value", name: "%3", check: "String", value: "#E8DEF8"
                }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_component_set_style_number",
            message0: "设置控件 %1 %2 为 %3",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "component1"
            },
                {
                    type: "field_dropdown", name: "%2", options: [
                        ["边框圆角", "borderRadius"], ["边框宽度", "borderWidth"],
                        ["透明度", "opacity"], ["Z索引", "zIndex"],
                        ["旋转角度", "transform"], ["字体大小", "fontSize"], ["内边距", "padding"]
                    ]},
                {
                    type: "input_value", name: "%3", check: "Number", value: 8
                }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_component_set_state",
            message0: "设置控件状态 %1 %2 为 %3",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "component1"
            },
                {
                    type: "field_dropdown", name: "%2", options: [
                        ["显示", "display"], ["隐藏", "hidden"], ["禁用", "disabled"]
                    ]},
                {
                    type: "field_dropdown", name: "%3", options: [["是", "true"], ["否", "false"]]
                }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_component_count",
            message0: "获取控件总数",
            args0: [],
            output: "Number",
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_component_list",
            message0: "获取所有控件ID列表",
            args0: [],
            output: "String",
            colour: "%{BKY_MDUI_HUE}"
        },

        // 按钮组件
        {
            type: "mdui_button_create",
            message0: "创建按钮 %1 文字 %2 X %3 Y %4",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "btn1"
            },
                {
                    type: "input_value", name: "%2", check: "String", value: "按钮"
                },
                {
                    type: "input_value", name: "%3", check: "Number", value: 100
                },
                {
                    type: "input_value", name: "%4", check: "Number", value: 100
                }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_button_set_text",
            message0: "设置按钮 %1 文字为 %2",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "btn1"
            },
                {
                    type: "input_value", name: "%2", check: "String", value: "点击"
                }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_button_get_text",
            message0: "获取按钮 %1 文字",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "btn1"
            }],
            output: "String",
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_button_set_variant",
            message0: "设置按钮 %1 变体为 %2",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "btn1"
            },
                {
                    type: "field_dropdown", name: "%2", options: [
                        ["填充", "filled"], ["浅色填充", "filled-tonal"],
                        ["描边", "outlined"], ["文字", "text"], ["升高", "elevated"]
                    ]}],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_button_get_variant",
            message0: "获取按钮 %1 变体",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "btn1"
            }],
            output: "String",
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_button_set_icon",
            message0: "设置按钮 %1 图标为 %2 位置 %3",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "btn1"
            },
                {
                    type: "input_value", name: "%2", check: "String", value: "favorite"
                },
                {
                    type: "field_dropdown", name: "%3", options: [
                        ["左侧", "left"], ["右侧", "right"], ["无", "none"]
                    ]}],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_button_get_icon",
            message0: "获取按钮 %1 图标",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "btn1"
            }],
            output: "String",
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_button_set_state",
            message0: "设置按钮 %1 交互状态为 %2",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "btn1"
            },
                {
                    type: "field_dropdown", name: "%2", options: [
                        ["正常", "normal"], ["悬停", "hover"], ["聚焦", "focused"],
                        ["按下", "pressed"], ["禁用", "disabled"], ["加载中", "loading"]
                    ]}],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_button_get_state",
            message0: "获取按钮 %1 交互状态",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "btn1"
            }],
            output: "String",
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_button_set_disabled",
            message0: "设置按钮 %1 %2 禁用",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "btn1"
            },
                {
                    type: "field_dropdown", name: "%2", options: [["是", "true"], ["否", "false"]]
                }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_button_is_disabled",
            message0: "按钮 %1 是否禁用",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "btn1"
            }],
            output: "Boolean",
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_button_set_size",
            message0: "设置按钮 %1 大小为 %2",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "btn1"
            },
                {
                    type: "field_dropdown", name: "%2", options: [
                        ["小", "small"], ["中", "medium"], ["大", "large"]
                    ]}],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_button_event",
            message0: "当按钮 ID %1 被 %2",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "btn1"
            },
                {
                    type: "field_dropdown", name: "%2", options: [
                        ["点击", "click"], ["按下", "mousedown"], ["释放", "mouseup"],
                        ["进入", "mouseenter"], ["离开", "mouseleave"], ["聚焦", "focus"],
                        ["失焦", "blur"], ["双击", "dblclick"], ["长按", "longpress"]
                    ]}],
            output: "Boolean",
            colour: "%{BKY_MDUI_HUE}"
        },

        // 卡片组件
        {
            type: "mdui_card_create",
            message0: "创建卡片 %1 标题 %2 内容 %3 X %4 Y %5",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "card1"
            },
                {
                    type: "input_value", name: "%2", check: "String", value: "卡片标题"
                },
                {
                    type: "input_value", name: "%3", check: "String", value: "这里是卡片内容"
                },
                {
                    type: "input_value", name: "%4", check: "Number", value: 150
                },
                {
                    type: "input_value", name: "%5", check: "Number", value: 150
                }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_card_create_with_image",
            message0: "创建卡片 %1 带图片 标题 %2 图片 %3 X %4 Y %5",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "card1"
            },
                {
                    type: "input_value", name: "%2", check: "String", value: "卡片标题"
                },
                {
                    type: "input_value", name: "%3", check: "String", value: "data:image/png;base64,iVBORw0KGgoAA..."
                },
                {
                    type: "input_value", name: "%4", check: "Number", value: 150
                },
                {
                    type: "input_value", name: "%5", check: "Number", value: 150
                }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_card_set_title",
            message0: "设置卡片 %1 标题为 %2",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "card1"
            },
                {
                    type: "input_value", name: "%2", check: "String", value: "新标题"
                }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_card_get_title",
            message0: "获取卡片 %1 标题",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "card1"
            }],
            output: "String",
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_card_set_content",
            message0: "设置卡片 %1 内容为 %2",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "card1"
            },
                {
                    type: "input_value", name: "%2", check: "String", value: "新内容"
                }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_card_get_content",
            message0: "获取卡片 %1 内容",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "card1"
            }],
            output: "String",
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_card_set_image",
            message0: "设置卡片 %1 图片为 %2",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "card1"
            },
                {
                    type: "input_value", name: "%2", check: "String", value: "data:image/png;base64,iVBORw0KGgoAA..."
                }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_card_get_image",
            message0: "获取卡片 %1 图片",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "card1"
            }],
            output: "String",
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_card_has_image",
            message0: "卡片 %1 是否有图片",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "card1"
            }],
            output: "Boolean",
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_card_add_button",
            message0: "卡片 %1 添加按钮 %2 文字 %3",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "card1"
            },
                {
                    type: "input_value", name: "%2", check: "String", value: "操作"
                },
                {
                    type: "input_value", name: "%3", check: "String", value: "card_btn1"
                }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_card_remove_button",
            message0: "卡片 %1 移除按钮 %2",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "card1"
            },
                {
                    type: "input_value", name: "%2", check: "String", value: "card_btn1"
                }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_card_get_buttons",
            message0: "获取卡片 %1 按钮列表",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "card1"
            }],
            output: "String",
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_card_set_variant",
            message0: "设置卡片 %1 变体为 %2",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "card1"
            },
                {
                    type: "field_dropdown", name: "%2", options: [
                        ["升高", "elevated"], ["描边", "outlined"], ["填充", "filled"]
                    ]}],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_card_get_variant",
            message0: "获取卡片 %1 变体",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "card1"
            }],
            output: "String",
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_card_event",
            message0: "当卡片 %1 被 %2",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "card1"
            },
                {
                    type: "field_dropdown", name: "%2", options: [
                        ["点击", "click"], ["双击", "dblclick"], ["进入", "mouseenter"],
                        ["离开", "mouseleave"], ["图片点击", "image-click"],
                        ["标题点击", "title-click"], ["内容点击", "content-click"]
                    ]}],
            output: "Boolean",
            colour: "%{BKY_MDUI_HUE}"
        },

        // 开关组件
        {
            type: "mdui_switch_create",
            message0: "创建开关 %1 标签 %2 X %3 Y %4",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "switch1"
            },
                {
                    type: "input_value", name: "%2", check: "String", value: "开关"
                },
                {
                    type: "input_value", name: "%3", check: "Number", value: 100
                },
                {
                    type: "input_value", name: "%4", check: "Number", value: 100
                }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_switch_set_label",
            message0: "设置开关 %1 标签为 %2",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "switch1"
            },
                {
                    type: "input_value", name: "%2", check: "String", value: "新标签"
                }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_switch_get_label",
            message0: "获取开关 %1 标签",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "switch1"
            }],
            output: "String",
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_switch_set_state",
            message0: "设置开关 %1 状态为 %2",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "switch1"
            },
                {
                    type: "field_dropdown", name: "%2", options: [["开启", "true"], ["关闭", "false"]]
                }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_switch_get_state",
            message0: "获取开关 %1 状态",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "switch1"
            }],
            output: "Boolean",
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_switch_toggle",
            message0: "切换开关 %1 状态",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "switch1"
            }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_switch_set_disabled",
            message0: "设置开关 %1 %2",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "switch1"
            },
                {
                    type: "field_dropdown", name: "%2", options: [["禁用", "true"], ["不禁用", "false"]]
                }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_switch_is_disabled",
            message0: "开关 %1 是否禁用",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "switch1"
            }],
            output: "Boolean",
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_switch_set_colors",
            message0: "设置开关 %1 开启色 %2 关闭色 %3",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "switch1"
            },
                {
                    type: "input_value", name: "%2", check: "String", value: "#E8DEF8"
                },
                {
                    type: "input_value", name: "%3", check: "String", value: "#9E9E9E"
                }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_switch_on_change",
            message0: "当开关 %1 状态改变",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "switch1"
            }],
            output: "Boolean",
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_switch_event",
            message0: "当开关 %1 被 %2",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "switch1"
            },
                {
                    type: "field_dropdown", name: "%2", options: [
                        ["开启", "turn-on"], ["关闭", "turn-off"], ["点击", "click"]
                    ]}],
            output: "Boolean",
            colour: "%{BKY_MDUI_HUE}"
        },

        // 导入导出
        {
            type: "mdui_export_html",
            message0: "导出所有组件为HTML",
            args0: [],
            output: "String",
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_export_json",
            message0: "导出所有组件配置为JSON",
            args0: [],
            output: "String",
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_import_html",
            message0: "从HTML导入组件 %1",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "<div>...</div>"
            }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_import_json",
            message0: "从JSON导入组件 %1 选项 %2",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "{}"
            },
                {
                    type: "field_dropdown", name: "%2", options: [
                        ["替换现有", "replace"], ["合并到现有", "merge"], ["仅创建新ID", "create-new"]
                    ]}],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        },

        // 实用工具
        {
            type: "mdui_random_id",
            message0: "随机生成ID 前缀 %1",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "comp"
            }],
            output: "String",
            colour: "%{BKY_MDUI_HUE}"
        },
        {
            type: "mdui_component_copy",
            message0: "复制组件 %1 为 %2",
            args0: [{
                type: "input_value", name: "%1", check: "String", value: "component1"
            },
                {
                    type: "input_value", name: "%2", check: "String", value: "component2"
                }],
            previousStatement: null, nextStatement: null,
            colour: "%{BKY_MDUI_HUE}"
        }].map((block) => {
            return {
                ...block, colour: "%{BKY_MDUI_HUE}"
            };
        });

    // 注册积木
    await BN.waitBlockLoaded();
    BN.regBlocks(mduiBlocks);

    // 注册图标
    BN.regIcon(`<symbol id="icon-mdui" viewBox="-40 -40 120 120">
        <path d="m21.49,13.56h4.36c1.02,0,1.94.16,2.75.47.81.31,1.51.75,2.09,1.32.58.57,1.02,1.25,1.32,2.04s.46,1.66.46,2.61-.15,1.84-.46,2.63-.75,1.47-1.32,2.03c-.58.56-1.27,1-2.09,1.31-.82.31-1.73.47-2.75.47h-4.36v-12.89Zm4.25,10.58c.71,0,1.33-.1,1.87-.3.54-.2.99-.48,1.35-.84.36-.36.63-.79.81-1.3.18-.51.27-1.08.27-1.7s-.09-1.19-.27-1.7c-.18-.51-.45-.94-.81-1.31-.36-.36-.81-.64-1.35-.84-.54-.2-1.16-.3-1.87-.3h-1.82v8.28h1.82Z" style="stroke-width:0px;"/>
        <path d="m7.26,13.56h2.39l3.94,6.82h.14l3.94-6.82h2.41v12.89h-2.41v-6.35l.14-2.16h-.14l-3.28,5.78h-1.46l-3.29-5.78h-.14l.14,2.16v6.35h-2.39v-12.89Z" style="stroke-width:0px;"/>
        </symbol>`);

    // 积木盒
    const mduiXML = [
        Toolbox.title("MDUI 控件 · Material Design"),
        Toolbox.line("通用操作"),
        Toolbox.block("mdui_component_delete"),
        Toolbox.block("mdui_component_get"),
        Toolbox.block("mdui_component_exists"),
        Toolbox.block("mdui_component_show"),
        Toolbox.block("mdui_component_hide"),
        Toolbox.block("mdui_component_set_position"),
        Toolbox.block("mdui_component_set_size"),
        Toolbox.block("mdui_component_set_style_color"),
        Toolbox.block("mdui_component_set_style_number"),
        Toolbox.block("mdui_component_set_state"),
        Toolbox.block("mdui_component_count"),
        Toolbox.block("mdui_component_list"),

        Toolbox.line("按钮组件"),
        Toolbox.block("mdui_button_create"),
        Toolbox.block("mdui_button_set_text"),
        Toolbox.block("mdui_button_get_text"),
        Toolbox.block("mdui_button_set_variant"),
        Toolbox.block("mdui_button_get_variant"),
        Toolbox.block("mdui_button_set_icon"),
        Toolbox.block("mdui_button_get_icon"),
        Toolbox.block("mdui_button_set_state"),
        Toolbox.block("mdui_button_get_state"),
        Toolbox.block("mdui_button_set_disabled"),
        Toolbox.block("mdui_button_is_disabled"),
        Toolbox.block("mdui_button_set_size"),
        Toolbox.block("mdui_button_event"),

        Toolbox.line("卡片组件"),
        Toolbox.block("mdui_card_create"),
        Toolbox.block("mdui_card_create_with_image"),
        Toolbox.block("mdui_card_set_title"),
        Toolbox.block("mdui_card_get_title"),
        Toolbox.block("mdui_card_set_content"),
        Toolbox.block("mdui_card_get_content"),
        Toolbox.block("mdui_card_set_image"),
        Toolbox.block("mdui_card_get_image"),
        Toolbox.block("mdui_card_has_image"),
        Toolbox.block("mdui_card_add_button"),
        Toolbox.block("mdui_card_remove_button"),
        Toolbox.block("mdui_card_get_buttons"),
        Toolbox.block("mdui_card_set_variant"),
        Toolbox.block("mdui_card_get_variant"),
        Toolbox.block("mdui_card_event"),

        Toolbox.line("开关组件"),
        Toolbox.block("mdui_switch_create"),
        Toolbox.block("mdui_switch_set_label"),
        Toolbox.block("mdui_switch_get_label"),
        Toolbox.block("mdui_switch_set_state"),
        Toolbox.block("mdui_switch_get_state"),
        Toolbox.block("mdui_switch_toggle"),
        Toolbox.block("mdui_switch_set_disabled"),
        Toolbox.block("mdui_switch_is_disabled"),
        Toolbox.block("mdui_switch_set_colors"),
        Toolbox.block("mdui_switch_on_change"),
        Toolbox.block("mdui_switch_event"),

        /*
        Toolbox.line("导入导出"),
        Toolbox.block("mdui_export_html"),
        Toolbox.block("mdui_export_json"),
        Toolbox.block("mdui_import_html"),
        Toolbox.block("mdui_import_json"),
        */

        Toolbox.line("实用工具"),
        Toolbox.block("mdui_random_id"),
        Toolbox.block("mdui_component_copy"),

        Toolbox.flyout_bottom(),
    ];

    // 添加到工具箱
    BN.addToolbox("mdui", "icon-mdui", "#1967d2", mduiXML);

    // ============ 数据结构 ============
    // 存储所有UI组件
    const components = new Map();

    // 事件系统：基于时间非标准UUID队列
    // 结构: Map<"控件ID_事件类型", Array<{id: string, timestamp: number}>>
    const eventQueues = new Map();

    // 事件清理定时器（每秒清理超过3秒的事件）
    setInterval(() => {
        const now = Date.now();
        for (const [key, queue] of eventQueues.entries()) {
            const filtered = queue.filter(item => now - item.timestamp <= 3000);
            if (filtered.length === 0) {
                eventQueues.delete(key);
            } else if (filtered.length !== queue.length) {
                eventQueues.set(key, filtered);
            }
        }
    },
        1000);

    // 生成带时间戳的ID
    function generateTimestampId(prefix = 'comp') {
        return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;
    }

    // 生成事件ID
    function generateEventId() {
        return `${Date.now()}_${Math.random().toString(36).substring(2,
            9)}`;
    }

    // 触发事件
    function triggerEvent(componentId,
        eventType) {
        const queueKey = `${componentId}_${eventType}`;
        if (!eventQueues.has(queueKey)) {
            eventQueues.set(queueKey, []);
        }

        const queue = eventQueues.get(queueKey);
        queue.push({
            id: generateEventId(),
            timestamp: Date.now()
        });

        // 保持队列最多100个事件防止内存溢出
        if (queue.length > 100) {
            queue.shift();
        }
    }

    // 检查并消费事件
    function consumeEvent(componentId, eventType) {
        const queueKey = `${componentId}_${eventType}`;
        const queue = eventQueues.get(queueKey);

        if (queue && queue.length > 0) {
            queue.shift(); // 移除最早的事件
            if (queue.length === 0) {
                eventQueues.delete(queueKey);
            }
            return true;
        }
        return false;
    }

    // ============ 辅助函数 ============
    // 获取transformer容器
    function getTransformer() {
        return document.querySelector('#transformer');
    }

    // 获取组件元素
    function getComponentElement(id) {
        return document.querySelector(`[data-mdui-id="${id}"]`);
    }

    // 检查组件是否存在
    function componentExists(id) {
        return components.has(id);
    }

    // 创建基础样式
    function createBaseStyles() {
        const styleId = 'mdui-base-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
        /* Material Icons 加载 */
        /* @import url('https://fonts.googleapis.com/icon?family=Material+Icons');*/

        /* MDUI 基础样式 */
        .mdui-component {
        position: absolute;
        box-sizing: border-box;
        transition: all 0.2s ease;
        font-family: 'Roboto', sans-serif;
        }


        /* 按钮样式 */
        .mdui-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        border: none;
        border-radius: 20px;
        padding: 0 24px;
        height: 40px;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.1px;
        cursor: pointer;
        transition: all 0.2s;
        position: relative;
        overflow: hidden;
        background-color: #E8DEF8;
        color: #1D1B20;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        vertical-align: top;
        }

        .mdui-btn:disabled {
        opacity: 0.38;
        cursor: not-allowed;
        pointer-events: none;
        }

        .mdui-btn .material-icons {
        font-size: 18px;
        }

        /* 按钮变体 */
        .mdui-btn.filled {
        background-color: #E8DEF8;
        color: #1D1B20;
        }

        .mdui-btn.filled-tonal {
        background-color: #E8DEF8;
        color: #1D1B20;
        opacity: 0.8;
        }

        .mdui-btn.outlined {
        background-color: transparent;
        border: 1px solid #79747E;
        box-shadow: none;
        }

        .mdui-btn.text {
        background-color: transparent;
        box-shadow: none;
        }

        .mdui-btn.elevated {
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        .mdui-btn.hover {
        filter: brightness(0.95);
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }

        .mdui-btn.focused {
        outline: 2px solid #6750A4;
        outline-offset: 2px;
        }

        .mdui-btn.pressed {
        transform: scale(0.98);
        }

        .mdui-btn.loading {
        pointer-events: none;
        }

        .mdui-btn.loading::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top-color: currentColor;
        border-radius: 50%;
        animation: mdui-spin 0.6s linear infinite;
        }

        @keyframes mdui-spin {
        to { transform: rotate(360deg); }
        }

        /* 卡片样式 */
        .mdui-card {
        background: #FFFBFE;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        transition: box-shadow 0.3s;
        display: flex;
        flex-direction: column;
        }

        .mdui-card.elevated {
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .mdui-card.outlined {
        border: 1px solid #CAC4D0;
        box-shadow: none;
        }

        .mdui-card.filled {
        background: #F3EDF7;
        box-shadow: none;
        }

        .mdui-card-media {
        width: 100%;
        height: 120px;
        background-size: cover;
        background-position: center;
        background-color: #E8DEF8;
        }

        .mdui-card-content {
        padding: 16px;
        }

        .mdui-card-title {
        font-size: 16px;
        font-weight: 500;
        margin: 0 0 8px 0;
        color: #1D1B20;
        }

        .mdui-card-text {
        font-size: 14px;
        color: #49454F;
        margin: 0;
        }

        .mdui-card-actions {
        display: flex;
        gap: 8px;
        padding: 8px 16px 16px;
        }

        .mdui-card-actions .mdui-btn {
        height: 36px;
        padding: 0 16px;
        }

        /* 开关样式 */
        .mdui-switch {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        }

        .mdui-switch.disabled {
        opacity: 0.5;
        cursor: not-allowed;
        }

        .mdui-switch-track {
        width: 52px;
        height: 32px;
        background-color: #79747E;
        border-radius: 16px;
        position: relative;
        transition: background-color 0.2s;
        }

        .mdui-switch.checked .mdui-switch-track {
        background-color: #E8DEF8;
        }

        .mdui-switch-thumb {
        width: 24px;
        height: 24px;
        background-color: white;
        border-radius: 50%;
        position: absolute;
        top: 4px;
        left: 4px;
        transition: left 0.2s;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .mdui-switch.checked .mdui-switch-thumb {
        left: 24px;
        background-color: #6750A4;
        }

        .mdui-switch-label {
        font-size: 14px;
        color: #1D1B20;
        }
        `;
        document.head.appendChild(style);
    }

    function clearAllComponents() {
        const transformer = getTransformer();
        if (transformer) {
            const elements = transformer.querySelectorAll('[data-mdui-id]');
            elements.forEach(el => el.remove());
        }
        components.clear();
    }

    // ============ 基础操作积木实现 ============

    // 删除组件
    BN.regMethod('mdui_component_delete', (params) => {
        try {
            const id = String(params['%1'] || 'component1');
            const element = getComponentElement(id);
            if (element) {
                element.remove();
                components.delete(id);

                // 清理该组件相关的事件队列
                for (const key of eventQueues.keys()) {
                    if (key.startsWith(id + '_')) {
                        eventQueues.delete(key);
                    }
                }

                BN.log('mdui', `已删除组件: ${id}`);
            }
        } catch (error) {
            BN.error('mdui', '删除组件失败:', error.message);
        }
    });

    // 获取控件属性
    BN.regMethod('mdui_component_get',
        (params) => {
            try {
                const id = String(params['%1'] || 'component1');
                const prop = params['%2'] || 'x';
                const component = components.get(id);

                if (!component) return '';

                switch (prop) {
                    case 'x': return String(component.x || 0);
                    case 'y': return String(component.y || 0);
                    case 'width': return String(component.width || 0);
                    case 'height': return String(component.height || 0);
                    case 'visible': return component.visible ? 'true': 'false';
                    case 'zIndex': return String(component.zIndex || 1);
                    case 'opacity': return String(component.opacity || 1);
                    case 'type': return component.type || '';
                    case 'parentId': return component.parentId || '';
                    case 'all':
                        return JSON.stringify({
                            id: component.id,
                            type: component.type,
                            x: component.x,
                            y: component.y,
                            width: component.width,
                            height: component.height,
                            visible: component.visible,
                            zIndex: component.zIndex,
                            opacity: component.opacity,
                            parentId: component.parentId,
                            styles: component.styles || {}
                        });
                    default: return '';
                }
            } catch (error) {
                BN.error('mdui', '获取属性失败:', error.message);
                return '';
            }
        });

    // 控件是否存在
    BN.regMethod('mdui_component_exists',
        (params) => {
            try {
                const id = String(params['%1'] || 'component1');
                return componentExists(id);
            } catch (error) {
                return false;
            }
        });

    // 显示控件
    BN.regMethod('mdui_component_show',
        (params) => {
            try {
                const id = String(params['%1'] || 'component1');
                const element = getComponentElement(id);
                if (element) {
                    element.style.display = '';
                    const comp = components.get(id);
                    if (comp) comp.visible = true;
                }
            } catch (error) {
                BN.error('mdui', '显示控件失败:', error.message);
            }
        });

    // 隐藏控件
    BN.regMethod('mdui_component_hide',
        (params) => {
            try {
                const id = String(params['%1'] || 'component1');
                const element = getComponentElement(id);
                if (element) {
                    element.style.display = 'none';
                    const comp = components.get(id);
                    if (comp) comp.visible = false;
                }
            } catch (error) {
                BN.error('mdui', '隐藏控件失败:', error.message);
            }
        });

    // 设置位置
    BN.regMethod('mdui_component_set_position',
        (params) => {
            try {
                const id = String(params['%1'] || 'component1');
                const x = parseInt(params['%2']) || 100;
                const y = parseInt(params['%3']) || 100;

                const element = getComponentElement(id);
                if (element) {
                    element.style.left = x + 'px';
                    element.style.top = y + 'px';

                    const comp = components.get(id);
                    if (comp) {
                        comp.x = x;
                        comp.y = y;
                    }
                }
            } catch (error) {
                BN.error('mdui', '设置位置失败:', error.message);
            }
        });

    // 设置尺寸
    BN.regMethod('mdui_component_set_size',
        (params) => {
            try {
                const id = String(params['%1'] || 'component1');
                const width = parseInt(params['%2']) || 200;
                const height = parseInt(params['%3']) || 150;

                const element = getComponentElement(id);
                if (element) {
                    element.style.width = width + 'px';
                    element.style.height = height + 'px';

                    const comp = components.get(id);
                    if (comp) {
                        comp.width = width;
                        comp.height = height;
                    }
                }
            } catch (error) {
                BN.error('mdui', '设置尺寸失败:', error.message);
            }
        });

    // 设置颜色样式
    BN.regMethod('mdui_component_set_style_color',
        (params) => {
            try {
                const id = String(params['%1'] || 'component1');
                const styleProp = params['%2'] || 'backgroundColor';
                const value = String(params['%3'] || '#E8DEF8');

                const element = getComponentElement(id);
                if (element) {
                    const styleMap = {
                        'backgroundColor': 'background-color',
                        'color': 'color',
                        'borderColor': 'border-color',
                        'boxShadow': 'box-shadow'
                    };

                    if (styleMap[styleProp]) {
                        element.style[styleMap[styleProp]] = value;

                        if (!components.get(id).styles) components.get(id).styles = {};
                        components.get(id).styles[styleProp] = value;
                    }
                }
            } catch (error) {
                BN.error('mdui', '设置颜色样式失败:', error.message);
            }
        });

    // 设置数值样式
    BN.regMethod('mdui_component_set_style_number',
        (params, isSecondVariant) => {
            // 注意：这里有两个同名积木，通过判断参数数量区分
            try {
                const id = String(params['%1'] || 'component1');
                const styleProp = params['%2'] || 'borderRadius';
                const value = parseFloat(params['%3']) || 8;

                const element = getComponentElement(id);
                if (element) {
                    const styleMap = {
                        'borderRadius': 'border-radius',
                        'borderWidth': 'border-width',
                        'opacity': 'opacity',
                        'zIndex': 'z-index',
                        'transform': 'transform',
                        'fontSize': 'font-size',
                        'padding': 'padding'
                    };

                    if (styleMap[styleProp]) {
                        if (styleProp === 'zIndex') {
                            element.style.zIndex = value;
                        } else if (styleProp === 'opacity') {
                            element.style.opacity = value;
                        } else if (styleProp === 'transform') {
                            element.style.transform = `rotate(${value}deg)`;
                        } else {
                            element.style[styleMap[styleProp]] = value + 'px';
                        }

                        if (!components.get(id).styles) components.get(id).styles = {};
                        components.get(id).styles[styleProp] = value;
                    }
                }
            } catch (error) {
                BN.error('mdui', '设置数值样式失败:', error.message);
            }
        });

    // 设置状态
    BN.regMethod('mdui_component_set_state',
        (params) => {
            try {
                const id = String(params['%1'] || 'component1');
                const state = params['%2'] || 'display';
                const value = params['%3'] === true || params['%3'] === 'true';

                const element = getComponentElement(id);
                if (element) {
                    switch (state) {
                    case 'display':
                        element.style.display = value ? '': 'none';
                        break;
                    case 'hidden':
                        element.style.visibility = value ? 'hidden': 'visible';
                        break;
                    case 'disabled':
                        if (element.tagName === 'BUTTON') {
                            element.disabled = value;
                        }
                        if (value) {
                            element.classList.add('disabled');
                        } else {
                            element.classList.remove('disabled');
                        }
                        break;
                    }
                }
            } catch (error) {
                BN.error('mdui', '设置状态失败:', error.message);
            }
        });

    // 获取控件总数
    BN.regMethod('mdui_component_count',
        () => {
            return components.size;
        });

    // 获取所有控件ID列表
    BN.regMethod('mdui_component_list',
        () => {
            return JSON.stringify(Array.from(components.keys()));
        });

    // ============ 按钮组件 ============

    // 创建按钮
    // 创建按钮
    BN.regMethod('mdui_button_create',
        (params) => {
            try {
                createBaseStyles();

                const id = String(params['%1'] || generateTimestampId('btn'));
                const text = String(params['%2'] || '按钮');
                const x = parseInt(params['%3']) || 100;
                const y = parseInt(params['%4']) || 100;

                const transformer = getTransformer();
                if (!transformer) return;

                if (components.has(id)) {
                    BN.error('mdui', `按钮ID "${id}" 已存在`);
                    return;
                }

                const btn = document.createElement('button');
                btn.className = 'mdui-component mdui-btn filled';
                btn.setAttribute('data-mdui-id', id);
                btn.setAttribute('data-mdui-type', 'button');
                btn.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                width: auto;
                height: 40px;
                position: absolute; /* 添加这一行 */
                `;
                btn.textContent = text;

                // 长按计时器
                let pressTimer;

                // 鼠标按下
                btn.addEventListener('mousedown', () => {
                    triggerEvent(id, 'mousedown');

                    // 长按检测
                    pressTimer = setTimeout(() => {
                        triggerEvent(id, 'longpress');
                    }, 500);
                });

                // 鼠标释放
                btn.addEventListener('mouseup', () => {
                    triggerEvent(id, 'mouseup');
                    clearTimeout(pressTimer);
                });

                // 鼠标离开
                btn.addEventListener('mouseleave', () => {
                    clearTimeout(pressTimer);
                    btn.classList.remove('hover');
                });

                // 点击事件
                btn.addEventListener('click', () => triggerEvent(id, 'click'));

                // 鼠标进入
                btn.addEventListener('mouseenter', () => {
                    triggerEvent(id, 'mouseenter');
                    btn.classList.add('hover');
                });

                // 焦点事件
                btn.addEventListener('focus', () => {
                    triggerEvent(id, 'focus');
                    btn.classList.add('focused');
                });

                btn.addEventListener('blur', () => {
                    triggerEvent(id, 'blur');
                    btn.classList.remove('focused');
                });

                // 双击事件
                btn.addEventListener('dblclick', () => triggerEvent(id, 'dblclick'));

                transformer.appendChild(btn);

                // 存储组件信息
                components.set(id, {
                    id,
                    type: 'button',
                    element: btn,
                    text,
                    x,
                    y,
                    width: btn.offsetWidth,
                    height: 40,
                    visible: true,
                    variant: 'filled',
                    icon: null,
                    iconPosition: 'left',
                    state: 'normal',
                    disabled: false,
                    size: 'medium',
                    styles: {},
                    clearPressTimer: () => clearTimeout(pressTimer) // 提供清理方法
                });

                BN.log('mdui', `已创建按钮: ${id}`);

            } catch (error) {
                BN.error('mdui', '创建按钮失败:', error.message);
            }
        });

    // 设置按钮文字
    BN.regMethod('mdui_button_set_text',
        (params) => {
            try {
                const id = String(params['%1'] || 'btn1');
                const text = String(params['%2'] || '点击');

                const element = getComponentElement(id);
                const comp = components.get(id);

                if (element && comp && comp.type === 'button') {
                    // 如果有图标，需要保留图标
                    if (comp.icon && comp.iconElement) {
                        const iconSpan = element.querySelector('.material-icons');
                        if (iconSpan) {
                            element.innerHTML = '';
                            element.appendChild(iconSpan);
                            element.appendChild(document.createTextNode(text));
                        } else {
                            element.textContent = text;
                        }
                    } else {
                        element.textContent = text;
                    }
                    comp.text = text;
                }
            } catch (error) {
                BN.error('mdui', '设置按钮文字失败:', error.message);
            }
        });

    // 获取按钮文字
    BN.regMethod('mdui_button_get_text',
        (params) => {
            try {
                const id = String(params['%1'] || 'btn1');
                const comp = components.get(id);
                return comp && comp.type === 'button' ? comp.text: '';
            } catch (error) {
                return '';
            }
        });

    // 设置按钮变体
    BN.regMethod('mdui_button_set_variant',
        (params) => {
            try {
                const id = String(params['%1'] || 'btn1');
                const variant = params['%2'] || 'filled';

                const element = getComponentElement(id);
                const comp = components.get(id);

                if (element && comp && comp.type === 'button') {
                    // 移除所有变体类
                    element.classList.remove('filled', 'filled-tonal', 'outlined', 'text', 'elevated');
                    element.classList.add(variant);
                    comp.variant = variant;
                }
            } catch (error) {
                BN.error('mdui', '设置按钮变体失败:', error.message);
            }
        });

    // 获取按钮变体
    BN.regMethod('mdui_button_get_variant',
        (params) => {
            try {
                const id = String(params['%1'] || 'btn1');
                const comp = components.get(id);
                return comp && comp.type === 'button' ? comp.variant: '';
            } catch (error) {
                return '';
            }
        });

    // 设置按钮图标
    BN.regMethod('mdui_button_set_icon',
        (params) => {
            try {
                const id = String(params['%1'] || 'btn1');
                const icon = String(params['%2'] || 'favorite');
                const position = params['%3'] || 'left';

                const element = getComponentElement(id);
                const comp = components.get(id);

                if (element && comp && comp.type === 'button') {
                    // 移除旧图标
                    const oldIcon = element.querySelector('.material-icons');
                    if (oldIcon) oldIcon.remove();

                    if (position !== 'none' && icon) {
                        const iconSpan = document.createElement('span');
                        iconSpan.className = 'material-icons';
                        iconSpan.textContent = icon;

                        // 清空并重新添加内容
                        const text = comp.text;
                        element.innerHTML = '';

                        if (position === 'left') {
                            element.appendChild(iconSpan);
                            element.appendChild(document.createTextNode(text));
                        } else {
                            element.appendChild(document.createTextNode(text));
                            element.appendChild(iconSpan);
                        }

                        comp.icon = icon;
                        comp.iconPosition = position;
                        comp.iconElement = iconSpan;
                    } else {
                        element.textContent = comp.text;
                        comp.icon = null;
                        comp.iconPosition = 'none';
                        comp.iconElement = null;
                    }
                }
            } catch (error) {
                BN.error('mdui', '设置按钮图标失败:', error.message);
            }
        });

    // 获取按钮图标
    BN.regMethod('mdui_button_get_icon',
        (params) => {
            try {
                const id = String(params['%1'] || 'btn1');
                const comp = components.get(id);
                return comp && comp.type === 'button' ? (comp.icon || ''): '';
            } catch (error) {
                return '';
            }
        });

    // 设置按钮交互状态
    BN.regMethod('mdui_button_set_state',
        (params) => {
            try {
                const id = String(params['%1'] || 'btn1');
                const state = params['%2'] || 'normal';

                const element = getComponentElement(id);
                const comp = components.get(id);

                if (element && comp && comp.type === 'button') {
                    element.classList.remove('hover', 'focused', 'pressed', 'loading', 'disabled');

                    if (state === 'disabled') {
                        element.disabled = true;
                        element.classList.add('disabled');
                    } else {
                        element.disabled = false;
                        if (state !== 'normal') {
                            element.classList.add(state);
                        }
                    }

                    comp.state = state;
                }
            } catch (error) {
                BN.error('mdui', '设置按钮状态失败:', error.message);
            }
        });

    // 获取按钮交互状态
    BN.regMethod('mdui_button_get_state',
        (params) => {
            try {
                const id = String(params['%1'] || 'btn1');
                const comp = components.get(id);
                return comp && comp.type === 'button' ? comp.state: '';
            } catch (error) {
                return '';
            }
        });

    // 设置按钮禁用
    BN.regMethod('mdui_button_set_disabled',
        (params) => {
            try {
                const id = String(params['%1'] || 'btn1');
                const disabled = params['%2'] === true || params['%2'] === 'true';

                const element = getComponentElement(id);
                const comp = components.get(id);

                if (element && comp && comp.type === 'button') {
                    element.disabled = disabled;
                    if (disabled) {
                        element.classList.add('disabled');
                    } else {
                        element.classList.remove('disabled');
                    }
                    comp.disabled = disabled;
                    comp.state = disabled ? 'disabled': 'normal';
                }
            } catch (error) {
                BN.error('mdui', '设置按钮禁用失败:', error.message);
            }
        });

    // 按钮是否禁用
    BN.regMethod('mdui_button_is_disabled',
        (params) => {
            try {
                const id = String(params['%1'] || 'btn1');
                const comp = components.get(id);
                return !!(comp && comp.type === 'button' && comp.disabled);
            } catch (error) {
                return false;
            }
        });

    // 设置按钮大小
    BN.regMethod('mdui_button_set_size',
        (params) => {
            try {
                const id = String(params['%1'] || 'btn1');
                const size = params['%2'] || 'medium';

                const element = getComponentElement(id);
                const comp = components.get(id);

                if (element && comp && comp.type === 'button') {
                    const sizes = {
                        'small': 32,
                        'medium': 40,
                        'large': 48
                    };

                    element.style.height = sizes[size] + 'px';
                    element.style.fontSize = size === 'small' ? '12px': (size === 'large' ? '16px': '14px');
                    comp.size = size;
                }
            } catch (error) {
                BN.error('mdui', '设置按钮大小失败:', error.message);
            }
        });

    // 当按钮事件
    BN.regMethod('mdui_button_event',
        (params) => {
            try {
                const id = String(params['%1'] || 'btn1');
                const eventType = params['%2'] || 'click';

                return consumeEvent(id, eventType);
            } catch (error) {
                return false;
            }
        });

    // ============ 卡片组件 ============

    // 创建卡片（无图）
    BN.regMethod('mdui_card_create',
        (params) => {
            try {
                createBaseStyles();

                const id = String(params['%1'] || generateTimestampId('card'));
                const title = String(params['%2'] || '卡片标题');
                const content = String(params['%3'] || '这里是卡片内容');
                const x = parseInt(params['%4']) || 150;
                const y = parseInt(params['%5']) || 150;

                const transformer = getTransformer();
                if (!transformer) return;

                if (components.has(id)) {
                    BN.error('mdui', `卡片ID "${id}" 已存在`);
                    return;
                }

                const card = document.createElement('div');
                card.className = 'mdui-component mdui-card elevated';
                card.setAttribute('data-mdui-id', id);
                card.setAttribute('data-mdui-type', 'card');
                card.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                width: 250px;
                min-height: 150px;
                `;

                const contentDiv = document.createElement('div');
                contentDiv.className = 'mdui-card-content';

                const titleEl = document.createElement('h3');
                titleEl.className = 'mdui-card-title';
                titleEl.textContent = title;

                const textEl = document.createElement('p');
                textEl.className = 'mdui-card-text';
                textEl.textContent = content;

                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'mdui-card-actions';

                contentDiv.appendChild(titleEl);
                contentDiv.appendChild(textEl);
                card.appendChild(contentDiv);
                card.appendChild(actionsDiv);

                // 事件监听
                card.addEventListener('click', (e) => {
                    // 防止点击按钮时触发卡片点击
                    if (!e.target.closest('.mdui-btn')) {
                        triggerEvent(id, 'click');
                    }
                });
                card.addEventListener('dblclick',
                    () => triggerEvent(id, 'dblclick'));
                card.addEventListener('mouseenter',
                    () => triggerEvent(id, 'mouseenter'));
                card.addEventListener('mouseleave',
                    () => triggerEvent(id, 'mouseleave'));

                titleEl.addEventListener('click',
                    (e) => {
                        e.stopPropagation();
                        triggerEvent(id, 'title-click');
                    });

                textEl.addEventListener('click',
                    (e) => {
                        e.stopPropagation();
                        triggerEvent(id, 'content-click');
                    });

                transformer.appendChild(card);

                components.set(id,
                    {
                        id,
                        type: 'card',
                        element: card,
                        title,
                        content,
                        x,
                        y,
                        width: 250,
                        height: 150,
                        visible: true,
                        variant: 'elevated',
                        image: null,
                        buttons: [],
                        titleEl,
                        contentEl: textEl,
                        actionsEl: actionsDiv,
                        styles: {}
                    });

                BN.log('mdui',
                    `已创建卡片: ${id}`);

            } catch (error) {
                BN.error('mdui',
                    '创建卡片失败:',
                    error.message);
            }
        });

    // 创建卡片（带图）
    BN.regMethod('mdui_card_create_with_image', (params) => {
        try {
            createBaseStyles();

            const id = String(params['%1'] || generateTimestampId('card'));
            const title = String(params['%2'] || '卡片标题');
            const image = String(params['%3'] || '');
            const x = parseInt(params['%4']) || 150;
            const y = parseInt(params['%5']) || 150;

            const transformer = getTransformer();
            if (!transformer) return;

            if (components.has(id)) {
                BN.error('mdui', `卡片ID "${id}" 已存在`);
                return;
            }

            const card = document.createElement('div');
            card.className = 'mdui-component mdui-card elevated';
            card.setAttribute('data-mdui-id', id);
            card.setAttribute('data-mdui-type', 'card');
            card.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            width: 250px;
            min-height: 270px;
            `;

            const mediaDiv = document.createElement('div');
            mediaDiv.className = 'mdui-card-media';
            if (image) {
                mediaDiv.style.backgroundImage = `url('${image}')`;
            }

            const contentDiv = document.createElement('div');
            contentDiv.className = 'mdui-card-content';

            const titleEl = document.createElement('h3');
            titleEl.className = 'mdui-card-title';
            titleEl.textContent = title;

            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'mdui-card-actions';

            contentDiv.appendChild(titleEl);
            card.appendChild(mediaDiv);
            card.appendChild(contentDiv);
            card.appendChild(actionsDiv);

            // 事件监听
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.mdui-btn')) {
                    triggerEvent(id, 'click');
                }
            });
            card.addEventListener('dblclick',
                () => triggerEvent(id, 'dblclick'));
            card.addEventListener('mouseenter',
                () => triggerEvent(id, 'mouseenter'));
            card.addEventListener('mouseleave',
                () => triggerEvent(id, 'mouseleave'));

            mediaDiv.addEventListener('click',
                (e) => {
                    e.stopPropagation();
                    triggerEvent(id, 'image-click');
                });

            titleEl.addEventListener('click',
                (e) => {
                    e.stopPropagation();
                    triggerEvent(id, 'title-click');
                });

            transformer.appendChild(card);

            components.set(id,
                {
                    id,
                    type: 'card',
                    element: card,
                    title,
                    content: '',
                    x,
                    y,
                    width: 250,
                    height: 270,
                    visible: true,
                    variant: 'elevated',
                    image,
                    buttons: [],
                    mediaEl: mediaDiv,
                    titleEl,
                    actionsEl: actionsDiv,
                    styles: {}
                });

            BN.log('mdui',
                `已创建带图卡片: ${id}`);

        } catch (error) {
            BN.error('mdui',
                '创建带图卡片失败:',
                error.message);
        }
    });

    // 设置卡片标题
    BN.regMethod('mdui_card_set_title', (params) => {
        try {
            const id = String(params['%1'] || 'card1');
            const title = String(params['%2'] || '新标题');

            const comp = components.get(id);
            if (comp && comp.type === 'card') {
                if (comp.titleEl) {
                    comp.titleEl.textContent = title;
                }
                comp.title = title;
            }
        } catch (error) {
            BN.error('mdui', '设置卡片标题失败:', error.message);
        }
    });

    // 获取卡片标题
    BN.regMethod('mdui_card_get_title',
        (params) => {
            try {
                const id = String(params['%1'] || 'card1');
                const comp = components.get(id);
                return comp && comp.type === 'card' ? comp.title: '';
            } catch (error) {
                return '';
            }
        });

    // 设置卡片内容
    BN.regMethod('mdui_card_set_content',
        (params) => {
            try {
                const id = String(params['%1'] || 'card1');
                const content = String(params['%2'] || '新内容');

                const comp = components.get(id);
                if (comp && comp.type === 'card' && comp.contentEl) {
                    comp.contentEl.textContent = content;
                    comp.content = content;
                }
            } catch (error) {
                BN.error('mdui', '设置卡片内容失败:', error.message);
            }
        });

    // 获取卡片内容
    BN.regMethod('mdui_card_get_content',
        (params) => {
            try {
                const id = String(params['%1'] || 'card1');
                const comp = components.get(id);
                return comp && comp.type === 'card' ? comp.content: '';
            } catch (error) {
                return '';
            }
        });

    // 设置卡片图片
    BN.regMethod('mdui_card_set_image',
        (params) => {
            try {
                const id = String(params['%1'] || 'card1');
                const image = String(params['%2'] || '');

                const comp = components.get(id);
                if (comp && comp.type === 'card') {
                    if (!comp.mediaEl) {
                        // 如果没有mediaEl，需要创建
                        const mediaDiv = document.createElement('div');
                        mediaDiv.className = 'mdui-card-media';
                        comp.element.insertBefore(mediaDiv, comp.element.firstChild);
                        comp.mediaEl = mediaDiv;

                        // 调整高度
                        comp.element.style.minHeight = (parseInt(comp.element.style.minHeight) + 120) + 'px';
                    }

                    if (image) {
                        comp.mediaEl.style.backgroundImage = `url('${image}')`;
                        comp.mediaEl.style.display = '';
                    } else {
                        comp.mediaEl.style.display = 'none';
                    }

                    comp.image = image;
                }
            } catch (error) {
                BN.error('mdui', '设置卡片图片失败:', error.message);
            }
        });

    // 获取卡片图片
    BN.regMethod('mdui_card_get_image',
        (params) => {
            try {
                const id = String(params['%1'] || 'card1');
                const comp = components.get(id);
                return comp && comp.type === 'card' ? (comp.image || ''): '';
            } catch (error) {
                return '';
            }
        });

    // 卡片是否有图片
    BN.regMethod('mdui_card_has_image',
        (params) => {
            try {
                const id = String(params['%1'] || 'card1');
                const comp = components.get(id);
                return !!(comp && comp.type === 'card' && comp.image);
            } catch (error) {
                return false;
            }
        });

    // 卡片添加按钮
    BN.regMethod('mdui_card_add_button',
        (params) => {
            try {
                const cardId = String(params['%1'] || 'card1');
                const btnId = String(params['%3'] || generateTimestampId('card_btn'));
                const text = String(params['%2'] || '操作');

                const cardComp = components.get(cardId);
                if (!cardComp || cardComp.type !== 'card') return;

                const btn = document.createElement('button');
                btn.className = 'mdui-btn text';
                btn.setAttribute('data-mdui-id', btnId);
                btn.setAttribute('data-mdui-parent', cardId);
                btn.textContent = text;
                btn.style.height = '36px';
                btn.style.padding = '0 16px';

                // 按钮事件
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    triggerEvent(btnId, 'click');
                });

                cardComp.actionsEl.appendChild(btn);

                // 存储按钮信息
                if (!cardComp.buttons) cardComp.buttons = [];
                cardComp.buttons.push(btnId);

                // 存储按钮组件（但不作为独立组件存储，避免和全局冲突）
                // 可选：也可以存入全局components，方便统一管理
                components.set(btnId, {
                    id: btnId,
                    type: 'card-button',
                    parentId: cardId,
                    element: btn,
                    text,
                    visible: true,
                    styles: {}
                });

            } catch (error) {
                BN.error('mdui', '卡片添加按钮失败:', error.message);
            }
        });

    // 卡片移除按钮
    BN.regMethod('mdui_card_remove_button',
        (params) => {
            try {
                const cardId = String(params['%1'] || 'card1');
                const btnId = String(params['%2'] || 'card_btn1');

                const cardComp = components.get(cardId);
                if (!cardComp || cardComp.type !== 'card') return;

                const btnElement = document.querySelector(`[data-mdui-id="${btnId}"]`);
                if (btnElement) {
                    btnElement.remove();
                    components.delete(btnId);
                }

                if (cardComp.buttons) {
                    cardComp.buttons = cardComp.buttons.filter(id => id !== btnId);
                }

            } catch (error) {
                BN.error('mdui', '卡片移除按钮失败:', error.message);
            }
        });

    // 获取卡片按钮列表
    BN.regMethod('mdui_card_get_buttons',
        (params) => {
            try {
                const id = String(params['%1'] || 'card1');
                const comp = components.get(id);
                return comp && comp.type === 'card' ? JSON.stringify(comp.buttons || []): '[]';
            } catch (error) {
                return '[]';
            }
        });

    // 设置卡片变体
    BN.regMethod('mdui_card_set_variant',
        (params) => {
            try {
                const id = String(params['%1'] || 'card1');
                const variant = params['%2'] || 'elevated';

                const element = getComponentElement(id);
                const comp = components.get(id);

                if (element && comp && comp.type === 'card') {
                    element.classList.remove('elevated', 'outlined', 'filled');
                    element.classList.add(variant);
                    comp.variant = variant;
                }
            } catch (error) {
                BN.error('mdui', '设置卡片变体失败:', error.message);
            }
        });

    // 获取卡片变体
    BN.regMethod('mdui_card_get_variant',
        (params) => {
            try {
                const id = String(params['%1'] || 'card1');
                const comp = components.get(id);
                return comp && comp.type === 'card' ? comp.variant: '';
            } catch (error) {
                return '';
            }
        });

    // 当卡片事件
    BN.regMethod('mdui_card_event',
        (params) => {
            try {
                const id = String(params['%1'] || 'card1');
                const eventType = params['%2'] || 'click';

                return consumeEvent(id, eventType);
            } catch (error) {
                return false;
            }
        });

    // ============ 开关组件 ============

    // 创建开关
    BN.regMethod('mdui_switch_create',
        (params) => {
            try {
                createBaseStyles();

                const id = String(params['%1'] || generateTimestampId('switch'));
                const label = String(params['%2'] || '开关');
                const x = parseInt(params['%3']) || 100;
                const y = parseInt(params['%4']) || 100;

                const transformer = getTransformer();
                if (!transformer) return;

                if (components.has(id)) {
                    BN.error('mdui', `开关ID "${id}" 已存在`);
                    return;
                }

                const switchEl = document.createElement('div');
                switchEl.className = 'mdui-component mdui-switch';
                switchEl.setAttribute('data-mdui-id', id);
                switchEl.setAttribute('data-mdui-type', 'switch');
                switchEl.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                width: auto;
                height: 32px;
                `;

                const track = document.createElement('div');
                track.className = 'mdui-switch-track';

                const thumb = document.createElement('div');
                thumb.className = 'mdui-switch-thumb';

                const labelEl = document.createElement('span');
                labelEl.className = 'mdui-switch-label';
                labelEl.textContent = label;

                track.appendChild(thumb);
                switchEl.appendChild(track);
                switchEl.appendChild(labelEl);

                let checked = false;

                switchEl.addEventListener('click', (e) => {
                    e.stopPropagation();

                    const comp = components.get(id);
                    if (comp && comp.disabled) return;

                    checked = !checked;
                    if (checked) {
                        switchEl.classList.add('checked');
                        triggerEvent(id, 'turn-on');
                    } else {
                        switchEl.classList.remove('checked');
                        triggerEvent(id, 'turn-off');
                    }
                    triggerEvent(id, 'change');
                    triggerEvent(id, 'click');

                    if (comp) comp.checked = checked;
                });

                transformer.appendChild(switchEl);

                components.set(id,
                    {
                        id,
                        type: 'switch',
                        element: switchEl,
                        track,
                        thumb,
                        labelEl,
                        label,
                        x,
                        y,
                        width: switchEl.offsetWidth,
                        height: 32,
                        visible: true,
                        checked: false,
                        disabled: false,
                        onColor: '#E8DEF8',
                        offColor: '#9E9E9E',
                        styles: {}
                    });

                BN.log('mdui',
                    `已创建开关: ${id}`);

            } catch (error) {
                BN.error('mdui',
                    '创建开关失败:',
                    error.message);
            }
        });

    // 设置开关标签
    BN.regMethod('mdui_switch_set_label', (params) => {
        try {
            const id = String(params['%1'] || 'switch1');
            const label = String(params['%2'] || '新标签');

            const comp = components.get(id);
            if (comp && comp.type === 'switch') {
                comp.labelEl.textContent = label;
                comp.label = label;
            }
        } catch (error) {
            BN.error('mdui', '设置开关标签失败:', error.message);
        }
    });

    // 获取开关标签
    BN.regMethod('mdui_switch_get_label',
        (params) => {
            try {
                const id = String(params['%1'] || 'switch1');
                const comp = components.get(id);
                return comp && comp.type === 'switch' ? comp.label: '';
            } catch (error) {
                return '';
            }
        });

    // 设置开关状态
    BN.regMethod('mdui_switch_set_state',
        (params) => {
            try {
                const id = String(params['%1'] || 'switch1');
                const checked = params['%2'] === true || params['%2'] === 'true';

                const element = getComponentElement(id);
                const comp = components.get(id);

                if (element && comp && comp.type === 'switch') {
                    if (checked) {
                        element.classList.add('checked');
                    } else {
                        element.classList.remove('checked');
                    }
                    comp.checked = checked;
                }
            } catch (error) {
                BN.error('mdui', '设置开关状态失败:', error.message);
            }
        });

    // 获取开关状态
    BN.regMethod('mdui_switch_get_state',
        (params) => {
            try {
                const id = String(params['%1'] || 'switch1');
                const comp = components.get(id);
                return !!(comp && comp.type === 'switch' && comp.checked);
            } catch (error) {
                return false;
            }
        });

    // 切换开关状态
    BN.regMethod('mdui_switch_toggle',
        (params) => {
            try {
                const id = String(params['%1'] || 'switch1');

                const element = getComponentElement(id);
                const comp = components.get(id);

                if (element && comp && comp.type === 'switch' && !comp.disabled) {
                    const newState = !comp.checked;

                    if (newState) {
                        element.classList.add('checked');
                        triggerEvent(id, 'turn-on');
                    } else {
                        element.classList.remove('checked');
                        triggerEvent(id, 'turn-off');
                    }
                    triggerEvent(id, 'change');

                    comp.checked = newState;
                }
            } catch (error) {
                BN.error('mdui', '切换开关状态失败:', error.message);
            }
        });

    // 设置开关禁用
    BN.regMethod('mdui_switch_set_disabled',
        (params) => {
            try {
                const id = String(params['%1'] || 'switch1');
                const disabled = params['%2'] === true || params['%2'] === 'true';

                const element = getComponentElement(id);
                const comp = components.get(id);

                if (element && comp && comp.type === 'switch') {
                    if (disabled) {
                        element.classList.add('disabled');
                    } else {
                        element.classList.remove('disabled');
                    }
                    comp.disabled = disabled;
                }
            } catch (error) {
                BN.error('mdui', '设置开关禁用失败:', error.message);
            }
        });

    // 开关是否禁用
    BN.regMethod('mdui_switch_is_disabled',
        (params) => {
            try {
                const id = String(params['%1'] || 'switch1');
                const comp = components.get(id);
                return !!(comp && comp.type === 'switch' && comp.disabled);
            } catch (error) {
                return false;
            }
        });

    // 设置开关颜色
    BN.regMethod('mdui_switch_set_colors',
        (params) => {
            try {
                const id = String(params['%1'] || 'switch1');
                const onColor = String(params['%2'] || '#E8DEF8');
                const offColor = String(params['%3'] || '#9E9E9E');

                const comp = components.get(id);
                if (comp && comp.type === 'switch') {
                    // 通过CSS变量或直接设置样式
                    comp.track.style.backgroundColor = offColor;
                    if (comp.checked) {
                        comp.track.style.backgroundColor = onColor;
                    }
                    // 存储颜色
                    comp.onColor = onColor;
                    comp.offColor = offColor;
                }
            } catch (error) {
                BN.error('mdui', '设置开关颜色失败:', error.message);
            }
        });

    // 当开关状态改变
    BN.regMethod('mdui_switch_on_change',
        (params) => {
            try {
                const id = String(params['%1'] || 'switch1');
                return consumeEvent(id, 'change');
            } catch (error) {
                return false;
            }
        });

    // 当开关特定事件
    BN.regMethod('mdui_switch_event',
        (params) => {
            try {
                const id = String(params['%1'] || 'switch1');
                const eventType = params['%2'] || 'click';

                let mappedEvent = eventType;
                if (eventType === '开启') mappedEvent = 'turn-on';
                if (eventType === '关闭') mappedEvent = 'turn-off';

                return consumeEvent(id, mappedEvent);
            } catch (error) {
                return false;
            }
        });

    // ============ 导入导出 ============

    // 导出所有组件为HTML
    BN.regMethod('mdui_export_html',
        () => {
            try {
                const transformer = getTransformer();
                if (!transformer) return '';

                const elements = transformer.querySelectorAll('[data-mdui-id]');
                let html = '<div class="mdui-export">\n';

                elements.forEach(el => {
                    html += el.outerHTML + '\n';
                });

                html += '</div>';
                return html;
            } catch (error) {
                BN.error('mdui', '导出HTML失败:', error.message);
                return '';
            }
        });

    // 导出所有组件配置为JSON
    BN.regMethod('mdui_export_json',
        () => {
            try {
                const configs = [];

                for (const [id, comp] of components.entries()) {
                    const config = {
                        id: comp.id,
                        type: comp.type,
                        x: comp.x,
                        y: comp.y,
                        width: comp.width,
                        height: comp.height,
                        visible: comp.visible,
                        styles: comp.styles || {}
                    };

                    // 添加类型特定属性
                    if (comp.type === 'button') {
                        config.text = comp.text;
                        config.variant = comp.variant;
                        config.icon = comp.icon;
                        config.iconPosition = comp.iconPosition;
                        config.state = comp.state;
                        config.disabled = comp.disabled;
                        config.size = comp.size;
                    } else if (comp.type === 'card') {
                        config.title = comp.title;
                        config.content = comp.content;
                        config.image = comp.image;
                        config.variant = comp.variant;
                        config.buttons = comp.buttons || [];
                    } else if (comp.type === 'switch') {
                        config.label = comp.label;
                        config.checked = comp.checked;
                        config.disabled = comp.disabled;
                        config.onColor = comp.onColor;
                        config.offColor = comp.offColor;
                    }

                    configs.push(config);
                }

                return JSON.stringify(configs, null, 2);
            } catch (error) {
                BN.error('mdui', '导出JSON失败:', error.message);
                return '[]';
            }
        });

    // 从HTML导入组件（简化实现）
    BN.regMethod('mdui_import_html',
        (params) => {
            try {
                const html = String(params['%1'] || '');
                BN.log('mdui', '从HTML导入组件功能需要手动实现');
                // 实际应用中需要解析HTML并重建组件
            } catch (error) {
                BN.error('mdui', '从HTML导入失败:', error.message);
            }
        });

    // 从JSON导入组件
    BN.regMethod('mdui_import_json',
        (params) => {
            try {
                const json = String(params['%1'] || '[]');
                const option = params['%2'] || 'merge';

                const configs = JSON.parse(json);

                if (option === 'replace') {
                    // 清空现有组件
                    const transformer = getTransformer();
                    if (transformer) {
                        const elements = transformer.querySelectorAll('[data-mdui-id]');
                        elements.forEach(el => el.remove());
                    }
                    components.clear();
                }

                // 这里需要根据configs重建组件
                // 实际应用中需要根据type调用对应的创建方法
                BN.log('mdui', `从JSON导入 ${configs.length} 个组件，模式: ${option}`);

            } catch (error) {
                BN.error('mdui', '从JSON导入失败:', error.message);
            }
        });

    // ============ 实用工具 ============

    // 随机生成ID
    BN.regMethod('mdui_random_id',
        (params) => {
            try {
                const prefix = String(params['%1'] || 'comp');
                return generateTimestampId(prefix);
            } catch (error) {
                return generateTimestampId('comp');
            }
        });

    // 复制组件
    BN.regMethod('mdui_component_copy',
        (params) => {
            try {
                const sourceId = String(params['%1'] || 'component1');
                const targetId = String(params['%2'] || 'component2');

                const sourceComp = components.get(sourceId);
                if (!sourceComp) {
                    BN.error('mdui', `源组件 ${sourceId} 不存在`);
                    return;
                }

                if (components.has(targetId)) {
                    BN.error('mdui', `目标ID ${targetId} 已存在`);
                    return;
                }

                // 根据类型复制
                if (sourceComp.type === 'button') {
                    // 复制按钮
                    BN.regMethod('创建按钮 %1 文字 %2 X %3 Y %4')({
                        '%1': targetId,
                        '%2': sourceComp.text,
                        '%3': (sourceComp.x || 0) + 20,
                        '%4': (sourceComp.y || 0) + 20
                    });

                    // 复制其他属性
                    const newComp = components.get(targetId);
                    if (newComp) {
                        newComp.variant = sourceComp.variant;
                        newComp.size = sourceComp.size;
                        newComp.disabled = sourceComp.disabled;
                        newComp.styles = {
                            ...sourceComp.styles
                        };

                        if (sourceComp.icon) {
                            BN.regMethod('设置按钮 %1 图标为 %2 位置 %3')({
                                '%1': targetId,
                                '%2': sourceComp.icon,
                                '%3': sourceComp.iconPosition || 'left'
                            });
                        }
                    }
                } else if (sourceComp.type === 'card') {
                    // 复制卡片
                    if (sourceComp.image) {
                        BN.regMethod('创建卡片 %1 带图片 标题 %2 图片 %3 X %4 Y %5')({
                            '%1': targetId,
                            '%2': sourceComp.title,
                            '%3': sourceComp.image,
                            '%4': (sourceComp.x || 0) + 20,
                            '%5': (sourceComp.y || 0) + 20
                        });
                    } else {
                        BN.regMethod('创建卡片 %1 标题 %2 内容 %3 X %4 Y %5')({
                            '%1': targetId,
                            '%2': sourceComp.title,
                            '%3': sourceComp.content || '',
                            '%4': (sourceComp.x || 0) + 20,
                            '%5': (sourceComp.y || 0) + 20
                        });
                    }

                    // 复制按钮
                    if (sourceComp.buttons && sourceComp.buttons.length > 0) {
                        sourceComp.buttons.forEach((btnId, index) => {
                            const btnComp = components.get(btnId);
                            if (btnComp) {
                                BN.regMethod('卡片 %1 添加按钮 %2 文字 %3')({
                                    '%1': targetId,
                                    '%3': targetId + '_btn' + index,
                                    '%2': btnComp.text || '操作'
                                });
                            }
                        });
                    }
                } else if (sourceComp.type === 'switch') {
                    BN.regMethod('创建开关 %1 标签 %2 X %3 Y %4')({
                        '%1': targetId,
                        '%2': sourceComp.label,
                        '%3': (sourceComp.x || 0) + 20,
                        '%4': (sourceComp.y || 0) + 20
                    });

                    const newComp = components.get(targetId);
                    if (newComp) {
                        newComp.checked = sourceComp.checked;
                        newComp.disabled = sourceComp.disabled;
                        newComp.onColor = sourceComp.onColor;
                        newComp.offColor = sourceComp.offColor;

                        if (sourceComp.checked) {
                            newComp.element.classList.add('checked');
                        }
                    }
                }

                BN.log('mdui', `已复制组件 ${sourceId} 到 ${targetId}`);

            } catch (error) {
                BN.error('mdui', '复制组件失败:', error.message);
            }
        });



    // 等待运行管理器加载
    await BN.waitRunmgrLoaded();

    BN.log('mdui',
        'MDUI控件扩展已加载');

    // 获取Runtime对象用于监听程序状态
    let Runtime = null;
    try {
        Runtime = (await BN.waitHook('Runtime')).get_webview_runtime();
    } catch (error) {
        BN.error('mdui',
            '获取Runtime失败:',
            error.message);
    }

    // 记录上一次的运行状态
    let lastRunningState = false;

    // 监听程序运行状态变化
    if (Runtime) {
        setInterval(() => {
            try {
                const currentRunningState = Runtime.heart.heart.get_runtime_data().is_running();

                // 检查状态是否从 true 变为 false
                if (lastRunningState === true && currentRunningState === false) {
                    clearAllComponents();
                    BN.log('mdui', '程序停止运行，自动清理所有 组件');
                }

                // 更新上一次的状态
                lastRunningState = currentRunningState;

            } catch (error) {
                // 忽略错误
            }
        },
            100);
    }

})();