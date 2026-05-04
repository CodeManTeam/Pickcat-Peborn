/// <reference path="../_TYPE.d.ts"/>

Extension.metaData = {
    name: "舞台触屏控件",
    version: "1.2.6",
    description: "按钮、文本、摇杆等触屏控件，支持多触控",
    author: "砂墨&Deepseek",
    docs: ""
};

(async () => {
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;

    await BN.waitBlocklyLoaded();

    BN.regColor("DND_UI_HUE", "#4CAF50", "#2E7D32");

    // 状态选项
    const BTN_STATE_OPTIONS = [
        ["按下", "pressed"],
        ["点击", "clicked"],
        ["放开", "released"]
    ];

    const JOY_AXIS_OPTIONS = [
        ["X轴", "x"],
        ["Y轴", "y"],
        ["角度", "angle"],
        ["力度", "force"]
    ];

    const dndUIBlocks = [
        // ========== 创建按钮（中心点定位）==========
        {
            type: "dnd_ui_button",
            message0: "创建按钮 %1 ID %2 文本 %3 中心X %4 中心Y %5 宽度 %6 高度 %7 颜色 %8",
            args0: [
                { type: "input_dummy" },
                { type: "input_value", name: "ID", check: "String", value: "btn1" },
                { type: "input_value", name: "TEXT", check: "String", value: "按钮" },
                { type: "input_value", name: "X", check: "Number", value: 100 },
                { type: "input_value", name: "Y", check: "Number", value: 100 },
                { type: "input_value", name: "W", check: "Number", value: 80 },
                { type: "input_value", name: "H", check: "Number", value: 40 },
                { type: "input_value", name: "COLOR", check: "String", value: "#2196F3" }
            ],
            ...Block.methodBlock,
            inputsInline: false,
            colour: "%{BKY_DND_UI_HUE}"
        },
        // ========== 创建文本（左上角定位，文本尺寸动态）==========
        {
            type: "dnd_ui_text",
            message0: "创建文本 %1 ID %2 内容 %3 左上X %4 左上Y %5 文本颜色 %6 文本透明度 %7 背景颜色 %8 背景透明度 %9 圆角 %10 阴影 %11",
            args0: [
                { type: "input_dummy" },
                { type: "input_value", name: "ID", check: "String", value: "text1" },
                { type: "input_value", name: "TEXT", check: "String", value: "文本" },
                { type: "input_value", name: "X", check: "Number", value: 100 },
                { type: "input_value", name: "Y", check: "Number", value: 100 },
                { type: "input_value", name: "TEXT_COLOR", check: "String", value: "#FFFFFF" },
                { type: "input_value", name: "TEXT_OPACITY", check: "Number", value: 1 },
                { type: "input_value", name: "BG_COLOR", check: "String", value: "transparent" },
                { type: "input_value", name: "BG_OPACITY", check: "Number", value: 1 },
                { type: "input_value", name: "BORDER_RADIUS", check: "Number", value: 0 },
                { type: "input_value", name: "BOX_SHADOW", check: "String", value: "" }
            ],
            ...Block.methodBlock,
            inputsInline: false,
            colour: "%{BKY_DND_UI_HUE}"
        },
        // ========== 创建摇杆（中心点定位）==========
        {
            type: "dnd_ui_joystick",
            message0: "创建摇杆 %1 ID %2 中心X %3 中心Y %4 半径 %5 颜色 %6",
            args0: [
                { type: "input_dummy" },
                { type: "input_value", name: "ID", check: "String", value: "joy1" },
                { type: "input_value", name: "X", check: "Number", value: 100 },
                { type: "input_value", name: "Y", check: "Number", value: 100 },
                { type: "input_value", name: "R", check: "Number", value: 50 },
                { type: "input_value", name: "COLOR", check: "String", value: "#FF9800" }
            ],
            ...Block.methodBlock,
            inputsInline: false,
            colour: "%{BKY_DND_UI_HUE}"
        },

        // ========== 状态获取 ==========
        {
            type: "dnd_ui_button_state",
            message0: "按钮 %1 %2",
            args0: [
                { type: "input_value", name: "ID", check: "String", value: "" },
                { type: "field_dropdown", name: "STATE", options: BTN_STATE_OPTIONS, value: "pressed" }
            ],
            output: "Boolean",
            colour: "%{BKY_DND_UI_HUE}"
        },
        {
            type: "dnd_ui_joystick_value",
            message0: "摇杆 %1 %2",
            args0: [
                { type: "input_value", name: "ID", check: "String", value: "" },
                { type: "field_dropdown", name: "AXIS", options: JOY_AXIS_OPTIONS, value: "x" }
            ],
            output: "Number",
            colour: "%{BKY_DND_UI_HUE}"
        },
        {
            type: "dnd_ui_text_content",
            message0: "获取文本 %1 内容",
            args0: [{ type: "input_value", name: "ID", check: "String", value: "" }],
            output: "String",
            colour: "%{BKY_DND_UI_HUE}"
        },

        // ========== 控件控制 ==========
        {
            type: "dnd_ui_set_text",
            message0: "设置文本 %1 内容 %2",
            args0: [
                { type: "input_value", name: "ID", check: "String", value: "" },
                { type: "input_value", name: "TEXT", check: "String", value: "" }
            ],
            ...Block.methodBlock,
            colour: "%{BKY_DND_UI_HUE}"
        },
        {
            type: "dnd_ui_set_position",
            message0: "移动控件 %1 到 中心X %2 中心Y %3",
            args0: [
                { type: "input_value", name: "ID", check: "String", value: "" },
                { type: "input_value", name: "X", check: "Number", value: 0 },
                { type: "input_value", name: "Y", check: "Number", value: 0 }
            ],
            ...Block.methodBlock,
            colour: "%{BKY_DND_UI_HUE}"
        },
        {
            type: "dnd_ui_set_size",
            message0: "设置控件 %1 宽度 %2 高度 %3",
            args0: [
                { type: "input_value", name: "ID", check: "String", value: "" },
                { type: "input_value", name: "W", check: "Number", value: 0 },
                { type: "input_value", name: "H", check: "Number", value: 0 }
            ],
            ...Block.methodBlock,
            colour: "%{BKY_DND_UI_HUE}"
        },
        {
            type: "dnd_ui_set_color",
            message0: "设置按钮/文本颜色 %1 颜色 %2",
            args0: [
                { type: "input_value", name: "ID", check: "String", value: "" },
                { type: "input_value", name: "COLOR", check: "String", value: "" }
            ],
            ...Block.methodBlock,
            colour: "%{BKY_DND_UI_HUE}"
        },
        {
            type: "dnd_ui_show",
            message0: "显示控件 %1",
            args0: [{ type: "input_value", name: "ID", check: "String", value: "" }],
            ...Block.methodBlock,
            colour: "%{BKY_DND_UI_HUE}"
        },
        {
            type: "dnd_ui_hide",
            message0: "隐藏控件 %1",
            args0: [{ type: "input_value", name: "ID", check: "String", value: "" }],
            ...Block.methodBlock,
            colour: "%{BKY_DND_UI_HUE}"
        },
        {
            type: "dnd_ui_remove",
            message0: "删除控件 %1",
            args0: [{ type: "input_value", name: "ID", check: "String", value: "" }],
            ...Block.methodBlock,
            colour: "%{BKY_DND_UI_HUE}"
        },
        {
            type: "dnd_ui_remove_all",
            message0: "删除所有UI控件",
            args0: [],
            ...Block.methodBlock,
            colour: "%{BKY_DND_UI_HUE}"
        }
    ].map(block => ({ ...block, colour: "%{BKY_DND_UI_HUE}" }));

    await BN.waitBlockLoaded();
    BN.regBlocks(dndUIBlocks);

    const dndUIXML = [
        Toolbox.title("舞台触屏控件"),
        Toolbox.line("创建"),
        Toolbox.block("dnd_ui_button"),
        Toolbox.block("dnd_ui_text"),
        Toolbox.block("dnd_ui_joystick"),
        Toolbox.line("状态获取"),
        Toolbox.block("dnd_ui_button_state"),
        Toolbox.block("dnd_ui_joystick_value"),
        Toolbox.block("dnd_ui_text_content"),
        Toolbox.line("控制"),
        Toolbox.block("dnd_ui_set_text"),
        Toolbox.block("dnd_ui_set_position"),
        Toolbox.block("dnd_ui_set_size"),
        Toolbox.block("dnd_ui_set_color"),
        Toolbox.block("dnd_ui_show"),
        Toolbox.block("dnd_ui_hide"),
        Toolbox.block("dnd_ui_remove"),
        Toolbox.block("dnd_ui_remove_all"),
        Toolbox.flyout_bottom()
    ];

    BN.regIcon(`<symbol id="icon-dnd-ui" viewBox="-1500 -1500 4000 4000"><path d="M263.529412 869.647059a79.058824 79.058824 0 0 1-78.908236-74.059294l-0.150588-4.99953V263.529412a79.058824 79.058824 0 0 1 74.059294-78.908236l4.99953-0.150588h527.058823a79.058824 79.058824 0 0 1 78.908236 74.059294l0.150588 4.99953v527.058823a79.058824 79.058824 0 0 1-74.059294 78.908236l-4.99953 0.150588H263.529412z m114.176-439.235765H237.176471v367.375059c0 9.697882 9.938824 17.709176 22.768941 18.974118l3.584 0.180705h114.176V430.411294z m439.235764 0H430.411294v386.529882H790.588235c13.342118 0 24.395294-7.228235 26.112-16.564705l0.240941-2.590118V430.381176z" fill="#000000" p-id="5695"></path></symbol>`);

    BN.addToolbox("dnd-ui", "icon-dnd-ui", "#4CAF50", dndUIXML);

    await BN.waitRunmgrLoaded();

    // 容器查找
    function getTransformer() {
        return document.querySelector('#transformer') || document.body;
    }

    // 控件存储
    const uiControls = new Map();
    let nextId = 1;

    // 清理所有控件
    function clearAllUIControls() {
        const elements = document.querySelectorAll('[data-dnd-ui="true"]');
        elements.forEach(el => el.remove());
        uiControls.clear();
    }

    // 自动清理
    let Runtime;
    try {
        Runtime = (await BN.waitHook('Runtime')).get_webview_runtime();
    } catch (e) {
        BN.error('DND-UI', '获取Runtime失败', e);
    }

    if (Runtime) {
        setInterval(() => {
            try {
                if (!Runtime.heart.heart.get_runtime_data().is_running()) {
                    clearAllUIControls();
                }
            } catch (e) {}
        }, 100);
    }

    // ========== 创建按钮（中心点定位）==========
    BN.regMethod('dnd_ui_button', (params, uuid, uuid2, utils) => {
        const id = params.ID || `btn_${nextId++}`;
        if (uiControls.has(id)) {
            BN.error('DND-UI', `ID ${id} 已存在`);
            return;
        }

        const transformer = getTransformer();
        const centerX = parseInt(params.X) || 100;
        const centerY = parseInt(params.Y) || 100;
        const w = parseInt(params.W) || 80;
        const h = parseInt(params.H) || 40;
        const color = params.COLOR || '#2196F3';
        const text = params.TEXT || '按钮';

        // 计算左上角坐标
        const left = centerX - w/2;
        const top = centerY - h/2;

        const btn = document.createElement('div');
        btn.setAttribute('data-dnd-ui', 'true');
        btn.setAttribute('data-dnd-id', id);
        btn.style.cssText = `
            position: absolute;
            left: ${left}px;
            top: ${top}px;
            width: ${w}px;
            height: ${h}px;
            background: ${color};
            color: white;
            border: none;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            user-select: none;
            touch-action: none;
            z-index: 10000;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        `;
        btn.textContent = text;

        transformer.appendChild(btn);

        // 触摸事件
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const control = uiControls.get(id);
            if (control) {
                control.pressed = true;
                control.justPressed = true;
            }
        });

        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            const control = uiControls.get(id);
            if (control && control.pressed) {
                control.clicked = true;
                control.justReleased = true;
                control.pressed = false;
            }
        });

        btn.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            const control = uiControls.get(id);
            if (control) {
                control.pressed = false;
            }
        });

        uiControls.set(id, {
            type: 'button',
            element: btn,
            x: centerX, // 存储中心坐标
            y: centerY,
            w, h, color, text,
            pressed: false,
            justPressed: false,
            justReleased: false,
            clicked: false
        });
    });

    // ========== 创建文本（左上角定位，文本尺寸动态）==========
    BN.regMethod('dnd_ui_text', (params, uuid, uuid2, utils) => {
        const id = params.ID || `text_${nextId++}`;
        if (uiControls.has(id)) {
            BN.error('DND-UI', `ID ${id} 已存在`);
            return;
        }

        const transformer = getTransformer();
        const x = parseInt(params.X) || 100;
        const y = parseInt(params.Y) || 100;
        const textColor = params.TEXT_COLOR || '#FFFFFF';
        const textOpacity = parseFloat(params.TEXT_OPACITY) || 1;
        const bgColor = params.BG_COLOR || 'transparent';
        const bgOpacity = parseFloat(params.BG_OPACITY) || 1;
        const borderRadius = parseInt(params.BORDER_RADIUS) || 0;
        const boxShadow = params.BOX_SHADOW || '';
        const content = params.TEXT || '文本';

        const el = document.createElement('div');
        el.setAttribute('data-dnd-ui', 'true');
        el.setAttribute('data-dnd-id', id);
        el.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            padding: 8px 12px;
            color: ${textColor};
            opacity: ${textOpacity};
            background-color: ${bgColor};
            border-radius: ${borderRadius}px;
            box-shadow: ${boxShadow};
            font-size: 16px;
            font-family: sans-serif;
            white-space: nowrap;
            user-select: none;
            z-index: 10000;
            pointer-events: none;
        `;
        el.textContent = content;

        // 处理背景颜色透明度
        if (bgColor !== 'transparent' && bgColor.startsWith('#')) {
            const r = parseInt(bgColor.slice(1, 3), 16);
            const g = parseInt(bgColor.slice(3, 5), 16);
            const b = parseInt(bgColor.slice(5, 7), 16);
            el.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${bgOpacity})`;
        } else if (bgColor !== 'transparent' && bgColor.startsWith('rgb')) {
            const rgb = bgColor.match(/\d+/g);
            if (rgb && rgb.length >= 3) {
                el.style.backgroundColor = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${bgOpacity})`;
            }
        }

        transformer.appendChild(el);

        uiControls.set(id, {
            type: 'text',
            element: el,
            x, y,
            text: content
        });
    });

    // ========== 创建摇杆（中心点定位，支持多点触控，适配缩放）==========
    BN.regMethod('dnd_ui_joystick', (params, uuid, uuid2, utils) => {
        const id = params.ID || `joy_${nextId++}`;
        if (uiControls.has(id)) {
            BN.error('DND-UI', `ID ${id} 已存在`);
            return;
        }

        const transformer = getTransformer();
        const centerX = parseInt(params.X) || 100;
        const centerY = parseInt(params.Y) || 100;
        const r = parseInt(params.R) || 50;          // 逻辑半径
        const color = params.COLOR || '#FF9800';

        // 容器尺寸（逻辑像素）
        const containerSize = r * 2 + 25;
        const left = centerX - containerSize / 2;
        const top = centerY - containerSize / 2;

        const container = document.createElement('div');
        container.setAttribute('data-dnd-ui', 'true');
        container.setAttribute('data-dnd-id', id);
        container.style.cssText = `
            position: absolute;
            left: ${left}px;
            top: ${top}px;
            width: ${containerSize}px;
            height: ${containerSize}px;
            z-index: 10000;
            touch-action: none;
        `;

        // 外圈（实际摇杆视觉区域）
        const outer = document.createElement('div');
        outer.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: ${r*2}px;
            height: ${r*2}px;
            background: ${color}40;
            border: 2px solid ${color};
            border-radius: 50%;
        `;

        // 摇杆帽
        const knob = document.createElement('div');
        knob.className = 'joystick-knob';
        knob.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 30px;
            height: 30px;
            background: ${color};
            border-radius: 50%;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            transition: transform 0.05s ease;
        `;

        container.appendChild(outer);
        container.appendChild(knob);
        transformer.appendChild(container);

        const activeTouches = new Map(); // touchId -> { xVal, yVal, angle, force }

        // 更新摇杆状态的函数（基于 outer 实际渲染尺寸）
        function updateJoystickForTouch(touch) {
            const outerRect = outer.getBoundingClientRect();
            const centerX = outerRect.left + outerRect.width / 2;
            const centerY = outerRect.top + outerRect.height / 2;
            const maxDist = r;

            const dx = touch.clientX - centerX;
            const dy = touch.clientY - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let xVal, yVal, angle, force;

            if (dist < maxDist) {
                xVal = dx / maxDist;
                yVal = -dy / maxDist; // Y轴向上为正
                angle = Math.atan2(dy, dx) * 180 / Math.PI;
                force = dist / maxDist;
            } else {
                const angleRad = Math.atan2(dy, dx);
                xVal = Math.cos(angleRad);
                yVal = -Math.sin(angleRad);
                angle = angleRad * 180 / Math.PI;
                force = 1;
            }

            activeTouches.set(touch.identifier, { xVal, yVal, angle, force });

            // 更新摇杆帽位置（基于实际像素）
            const lastTouch = Array.from(activeTouches.values()).pop();
            if (lastTouch) {
                knob.style.transform = `translate(calc(-50% + ${lastTouch.xVal * maxDist}px), calc(-50% + ${-lastTouch.yVal * maxDist}px))`;
            }
        }

        // 触摸事件
        container.addEventListener('touchstart', (e) => {
            e.preventDefault();
            Array.from(e.touches).forEach(touch => updateJoystickForTouch(touch));
        });

        container.addEventListener('touchmove', (e) => {
            e.preventDefault();
            Array.from(e.touches).forEach(touch => {
                if (activeTouches.has(touch.identifier)) {
                    updateJoystickForTouch(touch);
                }
            });
        });

        container.addEventListener('touchend', (e) => {
            e.preventDefault();
            const remainingIds = new Set();
            Array.from(e.touches).forEach(touch => remainingIds.add(touch.identifier));

            for (let id of activeTouches.keys()) {
                if (!remainingIds.has(id)) {
                    activeTouches.delete(id);
                }
            }

            if (activeTouches.size === 0) {
                knob.style.transform = 'translate(-50%, -50%)';
            } else {
                // 用剩余的触摸点更新位置（需重新获取实际半径）
                const lastTouch = Array.from(activeTouches.values()).pop();
                const outerRect = outer.getBoundingClientRect();
                const maxDist = outerRect.width / 2;
                knob.style.transform = `translate(calc(-50% + ${lastTouch.xVal * maxDist}px), calc(-50% + ${-lastTouch.yVal * maxDist}px))`;
            }
        });

        container.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            activeTouches.clear();
            knob.style.transform = 'translate(-50%, -50%)';
        });

        // 摇杆状态对象
        uiControls.set(id, {
            type: 'joystick',
            element: container,
            x: centerX,
            y: centerY,
            r, color,
            get xVal() {
                const last = Array.from(activeTouches.values()).pop();
                return last ? last.xVal : 0;
            },
            get yVal() {
                const last = Array.from(activeTouches.values()).pop();
                return last ? last.yVal : 0;
            },
            get angle() {
                const last = Array.from(activeTouches.values()).pop();
                return last ? last.angle : 0;
            },
            get force() {
                const last = Array.from(activeTouches.values()).pop();
                return last ? last.force : 0;
            }
        });
    });

    // ========== 状态获取（消费后立即重置）==========
    BN.regMethod('dnd_ui_button_state', (params, uuid, uuid2, utils) => {
        const id = params.ID;
        const state = params.STATE;
        const c = uiControls.get(id);
        if (!c || c.type !== 'button') return false;

        if (state === 'pressed') return c.pressed;
        if (state === 'clicked') {
            const val = c.clicked;
            c.clicked = false;
            return val;
        }
        if (state === 'released') {
            const val = c.justReleased;
            c.justReleased = false;
            return val;
        }
        return false;
    });

    BN.regMethod('dnd_ui_joystick_value', (params, uuid, uuid2, utils) => {
        const id = params.ID;
        const axis = params.AXIS;
        const c = uiControls.get(id);
        if (!c || c.type !== 'joystick') return 0;
        if (axis === 'x') return c.xVal || 0;
        if (axis === 'y') return c.yVal || 0;
        if (axis === 'angle') return c.angle || 0;
        if (axis === 'force') return c.force || 0;
        return 0;
    });

    BN.regMethod('dnd_ui_text_content', (params, uuid, uuid2, utils) => {
        const id = params.ID;
        const c = uiControls.get(id);
        if (!c || c.type !== 'text') return '';
        return c.text || '';
    });

    // ========== 控件控制 ==========
    BN.regMethod('dnd_ui_set_text', (params, uuid, uuid2, utils) => {
        const id = params.ID;
        const newText = params.TEXT;
        const c = uiControls.get(id);
        if (!c) return;
        if (c.type === 'text') {
            c.element.textContent = newText;
            c.text = newText;
        } else if (c.type === 'button') {
            c.element.textContent = newText;
            c.text = newText;
        }
    });

    BN.regMethod('dnd_ui_set_position', (params, uuid, uuid2, utils) => {
        const id = params.ID;
        const newCenterX = parseInt(params.X);
        const newCenterY = parseInt(params.Y);
        const c = uiControls.get(id);
        if (!c) return;

        if (c.type === 'button') {
            const left = newCenterX - c.w/2;
            const top = newCenterY - c.h/2;
            c.element.style.left = left + 'px';
            c.element.style.top = top + 'px';
            c.x = newCenterX;
            c.y = newCenterY;
        } else if (c.type === 'joystick') {
            const containerSize = c.r * 2 + 25;
            const left = newCenterX - containerSize/2;
            const top = newCenterY - containerSize/2;
            c.element.style.left = left + 'px';
            c.element.style.top = top + 'px';
            c.x = newCenterX;
            c.y = newCenterY;
        } else if (c.type === 'text') {
            c.element.style.left = newCenterX + 'px';
            c.element.style.top = newCenterY + 'px';
            c.x = newCenterX;
            c.y = newCenterY;
        }
    });

    BN.regMethod('dnd_ui_set_size', (params, uuid, uuid2, utils) => {
        const id = params.ID;
        const w = parseInt(params.W);
        const h = parseInt(params.H);
        const c = uiControls.get(id);
        if (!c) return;
        if (c.type === 'button') {
            // 保持中心不变，调整左上角
            const centerX = c.x;
            const centerY = c.y;
            c.element.style.width = w + 'px';
            c.element.style.height = h + 'px';
            c.element.style.left = (centerX - w/2) + 'px';
            c.element.style.top = (centerY - h/2) + 'px';
            c.w = w; c.h = h;
        } else if (c.type === 'text') {
            c.element.style.width = w + 'px';
            c.element.style.height = h + 'px';
        }
    });

    BN.regMethod('dnd_ui_set_color', (params, uuid, uuid2, utils) => {
        const id = params.ID;
        const color = params.COLOR;
        const c = uiControls.get(id);
        if (!c) return;
        if (c.type === 'button') {
            c.element.style.background = color;
            c.color = color;
        } else if (c.type === 'text') {
            c.element.style.color = color;
            c.color = color;
        }
    });

    BN.regMethod('dnd_ui_show', (params, uuid, uuid2, utils) => {
        const id = params.ID;
        const c = uiControls.get(id);
        if (c) c.element.style.display = '';
    });

    BN.regMethod('dnd_ui_hide', (params, uuid, uuid2, utils) => {
        const id = params.ID;
        const c = uiControls.get(id);
        if (c) c.element.style.display = 'none';
    });

    BN.regMethod('dnd_ui_remove', (params, uuid, uuid2, utils) => {
        const id = params.ID;
        const c = uiControls.get(id);
        if (c) {
            c.element.remove();
            uiControls.delete(id);
        }
    });

    BN.regMethod('dnd_ui_remove_all', (params, uuid, uuid2, utils) => {
        clearAllUIControls();
    });

    BN.log('DND-UI', '舞台触屏控件扩展已加载');
})();