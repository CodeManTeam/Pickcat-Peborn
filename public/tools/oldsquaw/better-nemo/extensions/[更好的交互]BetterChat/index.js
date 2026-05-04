/// <reference path="../_TYPE.d.ts"/>

Extension.metaData = {
    name: "更好的交互",
    version: "1.2.0",
    description: "键盘、手柄、鼠标输入检测，支持点击/按下/放开/滚轮状态",
    author: "砂墨&Deepseek",
    docs: ""
};

// 加载依赖库（如果有）
(async () => {
    /** @type {BetterNemo} */
    const BN = Extension.API;
    
    // 如果有现成的IO库可以在这里加载
    // 例如：加载 WebGPIO 或 Johnny-Five 的Web版本
    // 这里留空，实际使用时可以根据需要添加
    // 当然，啥博弈安卓webview直到141都不能访问硬件
})();

(async () => {
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;
    
    await BN.waitBlocklyLoaded();
    
    // 按键状态选项
    const KEY_STATE_OPTIONS = [
        ["按下", "pressed"],
        ["点击", "justPressed"],
        ["放开", "justReleased"]
    ];
    
    const betterchatBlocks = [
        // ========== 键盘检测 ==========
        {
            type: "bc_key",
            message0: "键盘按键 %1 %2",
            args0: [
                { 
                    type: "field_dropdown", 
                    name: "KEY", 
                    options: [
                        ["A", "KeyA"], ["B", "KeyB"], ["C", "KeyC"], ["D", "KeyD"], 
                        ["E", "KeyE"], ["F", "KeyF"], ["G", "KeyG"], ["H", "KeyH"],
                        ["I", "KeyI"], ["J", "KeyJ"], ["K", "KeyK"], ["L", "KeyL"],
                        ["M", "KeyM"], ["N", "KeyN"], ["O", "KeyO"], ["P", "KeyP"],
                        ["Q", "KeyQ"], ["R", "KeyR"], ["S", "KeyS"], ["T", "KeyT"],
                        ["U", "KeyU"], ["V", "KeyV"], ["W", "KeyW"], ["X", "KeyX"],
                        ["Y", "KeyY"], ["Z", "KeyZ"],
                        ["0", "Digit0"], ["1", "Digit1"], ["2", "Digit2"], ["3", "Digit3"],
                        ["4", "Digit4"], ["5", "Digit5"], ["6", "Digit6"], ["7", "Digit7"],
                        ["8", "Digit8"], ["9", "Digit9"],
                        ["空格", "Space"], ["回车", "Enter"], ["退格", "Backspace"],
                        ["Tab", "Tab"], ["左Shift", "ShiftLeft"], ["右Shift", "ShiftRight"],
                        ["左Ctrl", "ControlLeft"], ["右Ctrl", "ControlRight"],
                        ["左Alt", "AltLeft"], ["右Alt", "AltRight"],
                        ["上箭头", "ArrowUp"], ["下箭头", "ArrowDown"],
                        ["左箭头", "ArrowLeft"], ["右箭头", "ArrowRight"],
                        ["F1", "F1"], ["F2", "F2"], ["F3", "F3"], ["F4", "F4"],
                        ["F5", "F5"], ["F6", "F6"], ["F7", "F7"], ["F8", "F8"],
                        ["F9", "F9"], ["F10", "F10"], ["F11", "F11"], ["F12", "F12"],
                        ["Esc", "Escape"], ["删除", "Delete"], ["Home", "Home"], ["End", "End"],
                        ["PageUp", "PageUp"], ["PageDown", "PageDown"]
                    ]
                },
                {
                    type: "field_dropdown",
                    name: "STATE",
                    options: KEY_STATE_OPTIONS
                }
            ],
            output: "Boolean",
            colour: "%{BKY_EVENTS_HUE}"
        },
        
        {
            type: "bc_any_key",
            message0: "任意键 %1",
            args0: [
                {
                    type: "field_dropdown",
                    name: "STATE",
                    options: KEY_STATE_OPTIONS
                }
            ],
            output: "Boolean",
            colour: "%{BKY_EVENTS_HUE}"
        },
        
        // ========== 鼠标检测 ==========
        {
            type: "bc_mouse_button",
            message0: "鼠标 %1 %2",
            args0: [
                { 
                    type: "field_dropdown", 
                    name: "BUTTON", 
                    options: [
                        ["左键", "left"],
                        ["右键", "right"],
                        ["中键", "middle"],
                        ["前进键", "forward"],
                        ["后退键", "back"]
                    ]
                },
                {
                    type: "field_dropdown",
                    name: "STATE",
                    options: KEY_STATE_OPTIONS
                }
            ],
            output: "Boolean",
            colour: "%{BKY_EVENTS_HUE}"
        },
        
        {
            type: "bc_mouse_position",
            message0: "鼠标位置 %1",
            args0: [
                {
                    type: "field_dropdown",
                    name: "COORD",
                    options: [
                        ["X坐标", "x"],
                        ["Y坐标", "y"],
                        ["舞台X", "stageX"],
                        ["舞台Y", "stageY"]
                    ]
                }
            ],
            output: "Number",
            colour: "%{BKY_EVENTS_HUE}"
        },
        
        {
            type: "bc_mouse_wheel",
            message0: "鼠标滚轮 %1",
            args0: [
                {
                    type: "field_dropdown",
                    name: "DIRECTION",
                    options: [
                        ["向上滚动", "up"],
                        ["向下滚动", "down"],
                        ["向左滚动", "left"],
                        ["向右滚动", "right"]
                    ]
                }
            ],
            output: "Boolean",
            colour: "%{BKY_EVENTS_HUE}"
        },
        
        {
            type: "bc_mouse_wheel_delta",
            message0: "鼠标滚轮滚动距离 %1",
            args0: [
                {
                    type: "field_dropdown",
                    name: "AXIS",
                    options: [
                        ["垂直方向", "deltaY"],
                        ["水平方向", "deltaX"],
                        ["Z方向", "deltaZ"]
                    ]
                }
            ],
            output: "Number",
            colour: "%{BKY_EVENTS_HUE}"
        },
        
        {
            type: "bc_mouse_wheel_delta_mode",
            message0: "鼠标滚轮滚动模式",
            args0: [],
            output: "String",
            colour: "%{BKY_EVENTS_HUE}"
        },
        
        {
            type: "bc_mouse_in_stage",
            message0: "鼠标是否在舞台内",
            args0: [],
            output: "Boolean",
            colour: "%{BKY_EVENTS_HUE}"
        },
        
        // ========== 手柄检测 ==========
        {
            type: "bc_gamepad_connected",
            message0: "手柄 %1 是否已连接",
            args0: [
                { type: "input_value", name: "INDEX", check: "Number", value: 0 }
            ],
            output: "Boolean",
            colour: "%{BKY_EVENTS_HUE}"
        },
        
        {
            type: "bc_gamepad_button",
            message0: "手柄 %1 按键 %2 %3",
            args0: [
                { type: "input_value", name: "INDEX", check: "Number", value: 0 },
                { 
                    type: "field_dropdown", 
                    name: "BUTTON", 
                    options: [
                        ["A", "0"], ["B", "1"], ["X", "2"], ["Y", "3"],
                        ["LB", "4"], ["RB", "5"], ["LT", "6"], ["RT", "7"],
                        ["Back", "8"], ["Start", "9"], ["左摇杆按下", "10"],
                        ["右摇杆按下", "11"], ["上方向", "12"], ["下方向", "13"],
                        ["左方向", "14"], ["右方向", "15"], ["中央", "16"]
                    ]
                },
                {
                    type: "field_dropdown",
                    name: "STATE",
                    options: KEY_STATE_OPTIONS
                }
            ],
            output: "Boolean",
            colour: "%{BKY_EVENTS_HUE}"
        },
        
        {
            type: "bc_gamepad_axis",
            message0: "手柄 %1 %2摇杆 %3轴 的值",
            args0: [
                { type: "input_value", name: "INDEX", check: "Number", value: 0 },
                { 
                    type: "field_dropdown", 
                    name: "STICK", 
                    options: [
                        ["左", "left"],
                        ["右", "right"]
                    ]
                },
                { 
                    type: "field_dropdown", 
                    name: "AXIS", 
                    options: [
                        ["X", "x"],
                        ["Y", "y"]
                    ]
                }
            ],
            output: "Number",
            colour: "%{BKY_EVENTS_HUE}"
        },
        
        {
            type: "bc_gamepad_trigger",
            message0: "手柄 %1 %2扳机 的值",
            args0: [
                { type: "input_value", name: "INDEX", check: "Number", value: 0 },
                { 
                    type: "field_dropdown", 
                    name: "TRIGGER", 
                    options: [
                        ["左", "left"],
                        ["右", "right"]
                    ]
                }
            ],
            output: "Number",
            colour: "%{BKY_EVENTS_HUE}"
        },
        
        // ========== 工具 ==========
        {
            type: "bc_last_input",
            message0: "最后输入来源",
            args0: [],
            output: "String",
            colour: "%{BKY_EVENTS_HUE}"
        },
        
        {
            type: "bc_reset",
            message0: "重置所有输入状态",
            args0: [],
            ...Block.methodBlock,
            colour: "%{BKY_EVENTS_HUE}"
        }
    ].map(block => ({ ...block, colour: "%{BKY_EVENTS_HUE}" }));
    
    await BN.waitBlockLoaded();
    BN.regBlocks(betterchatBlocks);
    
    // --------------------------------积木盒-------------------------------
    const betterchatXML = [
        Toolbox.title("更好的交互"),
        
        Toolbox.line("⌨️ 键盘"),
        Toolbox.block("bc_key"),
        Toolbox.block("bc_any_key"),
        
        Toolbox.line("🖱️ 鼠标"),
        Toolbox.block("bc_mouse_button"),
        Toolbox.block("bc_mouse_position"),
        Toolbox.block("bc_mouse_wheel"),
        Toolbox.block("bc_mouse_wheel_delta"),
        Toolbox.block("bc_mouse_wheel_delta_mode"),
        Toolbox.block("bc_mouse_in_stage"),
        
        Toolbox.line("🎮 手柄"),
        Toolbox.block("bc_gamepad_connected"),
        Toolbox.block("bc_gamepad_button"),
        Toolbox.block("bc_gamepad_axis"),
        Toolbox.block("bc_gamepad_trigger"),
        
        Toolbox.line("🛠️ 工具"),
        Toolbox.block("bc_last_input"),
        Toolbox.block("bc_reset"),
        
        Toolbox.flyout_bottom()
    ];
    
    // 注册图标
    BN.regIcon(`<symbol id="icon-betterchat" viewBox="-1500 -1500 4000 4000"><path d="M207.644444 372.622222h170.666667c48.355556 0 85.333333-36.977778 85.333333-85.333333v-170.666667c0-48.355556-36.977778-85.333333-85.333333-85.333333h-170.666667c-48.355556 0-85.333333 36.977778-85.333333 85.333333v170.666667c0 48.355556 39.822222 85.333333 85.333333 85.333333z m-28.444444-256c0-17.066667 11.377778-28.444444 28.444444-28.444444h170.666667c17.066667 0 28.444444 11.377778 28.444445 28.444444v170.666667c0 17.066667-11.377778 28.444444-28.444445 28.444444h-170.666667c-17.066667 0-28.444444-11.377778-28.444444-28.444444v-170.666667zM850.488889 657.066667h-204.8c-36.977778 0-68.266667 31.288889-68.266667 68.266666v204.8c0 36.977778 31.288889 68.266667 68.266667 68.266667h204.8c36.977778 0 68.266667-31.288889 68.266667-68.266667v-204.8c0-36.977778-31.288889-68.266667-68.266667-68.266666zM859.022222 475.022222h-39.822222l71.111111 122.311111 71.111111-122.311111h-45.511111c-19.911111-201.955556-190.577778-358.4-395.377778-358.4v56.888889c173.511111 0 318.577778 133.688889 338.488889 301.511111zM182.044444 557.511111h39.822223l-71.111111-122.311111-71.111112 122.311111h45.511112c19.911111 199.111111 190.577778 355.555556 395.377777 355.555556v-56.888889c-173.511111 0-318.577778-130.844444-338.488889-298.666667z" p-id="1705"></path>
    </symbol>`);
    
    BN.addToolbox("betterchat", "icon-betterchat", "#608FEE", betterchatXML);
    
    // ---------------------------解释器-------------------------------------
    await BN.waitRunmgrLoaded();
    
    // 获取Runtime和舞台信息
    const Runtime = (await waitHook('Runtime')).get_webview_runtime();
    
    // 按键状态存储
    const keyState = {
        pressed: new Set(),
        justPressed: new Set(),
        justReleased: new Set(),
        lastInput: ""
    };
    
    // 鼠标状态存储
    const mouseState = {
        buttons: {
            left: false,
            right: false,
            middle: false,
            forward: false,
            back: false
        },
        justPressed: {
            left: false,
            right: false,
            middle: false,
            forward: false,
            back: false
        },
        justReleased: {
            left: false,
            right: false,
            middle: false,
            forward: false,
            back: false
        },
        x: 0,
        y: 0,
        stageX: 0,
        stageY: 0,
        wheel: {
            up: false,
            down: false,
            left: false,
            right: false,
            deltaX: 0,
            deltaY: 0,
            deltaZ: 0,
            deltaMode: 0
        },
        inStage: false
    };
    
    // 手柄状态
    let gamepads = [];
    let gamepadConnected = [false, false, false, false];
    let prevGamepadButtons = [];
    
    // 上一帧按键状态
    let prevKeys = new Set();
    let prevMouseButtons = { ...mouseState.buttons };
    
    // ---------- 键盘事件监听 ----------
    window.addEventListener('keydown', (e) => {
        // 避免页面滚动
        if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
            e.preventDefault();
        }
        
        const code = e.code;
        if (!keyState.pressed.has(code)) {
            keyState.pressed.add(code);
            keyState.justPressed.add(code);
            keyState.lastInput = `key:${code}`;
        }
    });
    
    window.addEventListener('keyup', (e) => {
        const code = e.code;
        if (keyState.pressed.has(code)) {
            keyState.pressed.delete(code);
            keyState.justReleased.add(code);
        }
    });
    
    window.addEventListener('blur', () => {
        keyState.pressed.clear();
        keyState.justPressed.clear();
        keyState.justReleased.clear();
    });
    
    // ---------- 鼠标事件监听 ----------
    window.addEventListener('mousedown', (e) => {
        e.preventDefault();
        
        let button = getMouseButtonName(e.button);
        if (!button) return;
        
        if (!mouseState.buttons[button]) {
            mouseState.buttons[button] = true;
            mouseState.justPressed[button] = true;
            keyState.lastInput = `mouse:${button}`;
        }
        
        updateMousePosition(e);
    });
    
    window.addEventListener('mouseup', (e) => {
        e.preventDefault();
        
        let button = getMouseButtonName(e.button);
        if (!button) return;
        
        if (mouseState.buttons[button]) {
            mouseState.buttons[button] = false;
            mouseState.justReleased[button] = true;
        }
        
        updateMousePosition(e);
    });
    
    window.addEventListener('mousemove', (e) => {
        updateMousePosition(e);
    });
    
    window.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        // 记录滚动距离
        mouseState.wheel.deltaX = e.deltaX;
        mouseState.wheel.deltaY = e.deltaY;
        mouseState.wheel.deltaZ = e.deltaZ;
        mouseState.wheel.deltaMode = e.deltaMode;
        
        // 记录滚动方向
        mouseState.wheel.up = e.deltaY < 0;
        mouseState.wheel.down = e.deltaY > 0;
        mouseState.wheel.left = e.deltaX < 0;
        mouseState.wheel.right = e.deltaX > 0;
        
        keyState.lastInput = `mouse:wheel`;
        updateMousePosition(e);
    });
    
    window.addEventListener('mouseleave', () => {
        mouseState.inStage = false;
    });
    
    window.addEventListener('mouseenter', () => {
        mouseState.inStage = true;
    });
    
    // 辅助函数：获取鼠标按钮名称
    function getMouseButtonName(buttonCode) {
        switch(buttonCode) {
            case 0: return 'left';
            case 1: return 'middle';
            case 2: return 'right';
            case 3: return 'back';
            case 4: return 'forward';
            default: return null;
        }
    }
    
    // 辅助函数：更新鼠标位置
    function updateMousePosition(e) {
        mouseState.x = e.clientX;
        mouseState.y = e.clientY;
        
        // 尝试获取舞台容器
        const stageContainer = document.querySelector('.stage-container') || 
                               document.querySelector('.scene-container');
        
        if (stageContainer) {
            const rect = stageContainer.getBoundingClientRect();
            mouseState.stageX = e.clientX - rect.left;
            mouseState.stageY = e.clientY - rect.top;
            mouseState.inStage = true;
        }
    }
    
    // ---------- 手柄事件 ----------
    window.addEventListener('gamepadconnected', (e) => {
        const gp = e.gamepad;
        gamepadConnected[gp.index] = true;
        keyState.lastInput = `gamepad:${gp.index}`;
    });
    
    window.addEventListener('gamepaddisconnected', (e) => {
        const gp = e.gamepad;
        gamepadConnected[gp.index] = false;
    });
    
    // ---------- 更新帧状态 ----------
    function updateFrameState() {
        // 清除just状态
        keyState.justPressed.clear();
        keyState.justReleased.clear();
        
        // 清除鼠标just状态
        for (let btn in mouseState.justPressed) {
            mouseState.justPressed[btn] = false;
        }
        for (let btn in mouseState.justReleased) {
            mouseState.justReleased[btn] = false;
        }
        
        // 清除滚轮方向状态（但保留距离）
        mouseState.wheel.up = false;
        mouseState.wheel.down = false;
        mouseState.wheel.left = false;
        mouseState.wheel.right = false;
        
        // 获取最新手柄状态
        try {
            gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        } catch (e) {}
    }
    
    // ---------- 键盘检测 ----------
    BN.regMethod('bc_key', (params, uuid, uuid2, utils) => {
        updateFrameState();
        const key = params.KEY;
        const state = params.STATE;
        
        switch(state) {
            case 'pressed': return keyState.pressed.has(key);
            case 'justPressed': return keyState.justPressed.has(key);
            case 'justReleased': return keyState.justReleased.has(key);
            default: return false;
        }
    });
    
    BN.regMethod('bc_any_key', (params, uuid, uuid2, utils) => {
        updateFrameState();
        const state = params.STATE;
        
        switch(state) {
            case 'pressed': return keyState.pressed.size > 0;
            case 'justPressed': 
                return keyState.justPressed.size > 0 || keyState.lastInput.startsWith('key:');
            case 'justReleased': return keyState.justReleased.size > 0;
            default: return false;
        }
    });
    
    // ---------- 鼠标检测 ----------
    BN.regMethod('bc_mouse_button', (params, uuid, uuid2, utils) => {
        updateFrameState();
        const button = params.BUTTON;
        const state = params.STATE;
        
        switch(state) {
            case 'pressed': return mouseState.buttons[button] || false;
            case 'justPressed': return mouseState.justPressed[button] || false;
            case 'justReleased': return mouseState.justReleased[button] || false;
            default: return false;
        }
    });
    
    BN.regMethod('bc_mouse_position', (params, uuid, uuid2, utils) => {
        updateFrameState();
        const coord = params.COORD;
        
        switch(coord) {
            case 'x': return mouseState.x;
            case 'y': return mouseState.y;
            case 'stageX': return mouseState.stageX;
            case 'stageY': return mouseState.stageY;
            default: return 0;
        }
    });
    
    BN.regMethod('bc_mouse_wheel', (params, uuid, uuid2, utils) => {
        updateFrameState();
        const direction = params.DIRECTION;
        
        switch(direction) {
            case 'up': return mouseState.wheel.up;
            case 'down': return mouseState.wheel.down;
            case 'left': return mouseState.wheel.left;
            case 'right': return mouseState.wheel.right;
            default: return false;
        }
    });
    
    BN.regMethod('bc_mouse_wheel_delta', (params, uuid, uuid2, utils) => {
        updateFrameState();
        const axis = params.AXIS;
        
        switch(axis) {
            case 'deltaX': return mouseState.wheel.deltaX;
            case 'deltaY': return mouseState.wheel.deltaY;
            case 'deltaZ': return mouseState.wheel.deltaZ;
            default: return 0;
        }
    });
    
    BN.regMethod('bc_mouse_wheel_delta_mode', (params, uuid, uuid2, utils) => {
        updateFrameState();
        const mode = mouseState.wheel.deltaMode;
        
        switch(mode) {
            case 0: return "像素";
            case 1: return "行";
            case 2: return "页";
            default: return "未知";
        }
    });
    
    BN.regMethod('bc_mouse_in_stage', (params, uuid, uuid2, utils) => {
        updateFrameState();
        return mouseState.inStage;
    });
    
    // ---------- 手柄检测 ----------
    BN.regMethod('bc_gamepad_connected', (params, uuid, uuid2, utils) => {
        updateFrameState();
        const index = parseInt(params.INDEX) || 0;
        return gamepadConnected[index] === true;
    });
    
    BN.regMethod('bc_gamepad_button', (params, uuid, uuid2, utils) => {
        updateFrameState();
        const index = parseInt(params.INDEX) || 0;
        const buttonIdx = parseInt(params.BUTTON) || 0;
        const state = params.STATE;
        
        const gp = gamepads[index];
        if (!gp || !gp.buttons) return false;
        
        const button = gp.buttons[buttonIdx];
        if (!button) return false;
        
        // 获取上一帧状态（用于just判断）
        const prevGp = prevGamepadButtons[index];
        const wasPressed = prevGp && prevGp[buttonIdx] && prevGp[buttonIdx].pressed;
        
        switch(state) {
            case 'pressed': return button.pressed;
            case 'justPressed': return button.pressed && !wasPressed;
            case 'justReleased': return !button.pressed && wasPressed;
            default: return false;
        }
    });
    
    BN.regMethod('bc_gamepad_axis', (params, uuid, uuid2, utils) => {
        updateFrameState();
        const index = parseInt(params.INDEX) || 0;
        const stick = params.STICK || 'left';
        const axis = params.AXIS || 'x';
        
        const gp = gamepads[index];
        if (!gp || !gp.axes) return 0;
        
        const axes = gp.axes;
        if (stick === 'left') {
            return axis === 'x' ? (axes[0] || 0) : (axes[1] || 0);
        } else {
            return axis === 'x' ? (axes[2] || 0) : (axes[3] || 0);
        }
    });
    
    BN.regMethod('bc_gamepad_trigger', (params, uuid, uuid2, utils) => {
        updateFrameState();
        const index = parseInt(params.INDEX) || 0;
        const trigger = params.TRIGGER || 'left';
        
        const gp = gamepads[index];
        if (!gp || !gp.buttons) return 0;
        
        if (trigger === 'left') {
            const btn = gp.buttons[6];
            return btn ? btn.value : 0;
        } else {
            const btn = gp.buttons[7];
            return btn ? btn.value : 0;
        }
    });
    
    // ---------- 工具 ----------
    BN.regMethod('bc_last_input', (params, uuid, uuid2, utils) => {
        return keyState.lastInput || "none";
    });
    
    BN.regMethod('bc_reset', (params, uuid, uuid2, utils) => {
        keyState.pressed.clear();
        keyState.justPressed.clear();
        keyState.justReleased.clear();
        keyState.lastInput = "";
        
        // 重置鼠标状态
        for (let btn in mouseState.buttons) {
            mouseState.buttons[btn] = false;
            mouseState.justPressed[btn] = false;
            mouseState.justReleased[btn] = false;
        }
        mouseState.wheel.deltaX = 0;
        mouseState.wheel.deltaY = 0;
        mouseState.wheel.deltaZ = 0;
        
        BN.log('BetterChat', '所有输入状态已重置');
    });
    
    // 保存上一帧手柄状态
    setInterval(() => {
        const currentGamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        prevGamepadButtons = [];
        
        for (let i = 0; i < currentGamepads.length; i++) {
            const gp = currentGamepads[i];
            if (gp && gp.buttons) {
                prevGamepadButtons[i] = [...gp.buttons];
            } else {
                prevGamepadButtons[i] = [];
            }
        }
    }, 16);
    
    BN.log('BetterChat', '更好的交互扩展已加载');
})();