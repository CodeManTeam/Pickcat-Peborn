interface BetterNemo {
    /**
     * 打印日志
     * @param moduleName 模块名称
     * @param msgs 信息
     */
    log: (moduleName: any, ...msgs: any[]) => void;
    /**
     * 打印错误
     * @param moduleName 模块名称
     * @param msgs 信息
     */
    error: (moduleName: any, ...msgs: any[]) => void;
    hook: any;
    getHook: (name: string) => Promise<any>;
    /**
     * 一些预设积木类型
     */
    Block: {
        /**
         * 方法积木（无返回值）
         */
        methodBlock: {
            previousStatement: true;
            nextStatement: true;
            inputsInline: true;
        };
        /**
         * 事件积木
         */
        eventBlock: {
            nextStatement: true;
            inputsInline: true;
        };
    };
    /**
     * 用于定义积木盒的一些工具函数
     */
    Toolbox: {
        /**
         * 创建一个标题
         * @param {string} text 标题
         * @returns XML字符串
         */
        title: (text: string) => string;
        /**
         * 创建一个错误提示
         * @param {string} text 错误提示
         * @returns XML字符串
         */
        error: (text: string) => string;
        /**
         * 创建一个分割线
         * @param {string} text 文本
         * @param {number} [height] 高度，可选，建议默认
         * @returns XML字符串
         */
        line: (text: string, height?: number) => string;
        /**
         * 创建一个结束线
         * @param {number} [width] 宽，可选，建议默认
         * @param {number} [height] 高，可选，建议默认
         * @returns XML字符串
         */
        flyout_bottom: (width?: number, height?: number) => string;
        /**
         * 创建一个间隔
         * @param {number} [gap] 间隔，可选
         * @returns XML字符串
         */
        sep: (gap?: number) => string;
        numValue: (name: string, value: number) => string;
        textValue: (name: string, value: string) => string;
        optionValue: (name: string, value: any) => string;
        /**
         * 创建一个积木
         * @param {string} type 积木ID
         * @param {string[]} [values] 其它输入的XML，可选
         * @returns XML字符串
         */
        block: (type: string, ...values: string[]) => string;
        /**
         * 创建一个事件积木
         * @param {string} type 积木ID
         * @param {string[][]} [params] 事件参数，可选，格式：[inputName, paramBlockID]
         * @returns XML字符串
         */
        eventBlock: (type: string, ...params: any[]) => string[];
        /** @deprecated */
        simpleEventBlock;
        /**
         * 创建一个按钮
         * @param {string} key 唯一标识符
         * @param {string} text 文本
         * @param {Function} callback 回调
         * @param {string} [className] 类名，可选
         * @returns XML字符串
         */
        button: (key: string, text: string, callback: Function, className?: string) => string;
    };
    /**
     * 注册新的颜色
     * @param {string} colorID 颜色ID，建议使用XXX_HUE命名
     * @param {string} fill 填充色
     * @param {string} border 边框色
     * @param {string} [layer] 参数色，可选
     */
    regColor: (
        colorID: string,
        fill: string,
        border: string,
        layer?: string,
    ) => void;
    /**
     * 注册新的积木集
     * @param {object[]} blocks 积木定义
     */
    defineBlocks: (blocks: object[]) => void;
    /** @deprecated */
    regBlocks;
    /**
     * 注册一个简单事件积木
     * @param {string} eventBlockId 积木ID
     */
    regEvent: (eventBlockId: string) => void;
    /** @deprecated */
    regSimpleEvent;
    /**
     * 注册新的解释器
     * @param {string} name 积木ID
     * @param {function} func 解释器
     * @param {string} [error_msg] 出错提示，可选
     */
    regDomainFunction: (
        name: string,
        func: Function,
        error_msg?: string,
    ) => Promise<void>;
    /** @deprecated */
    regMethod;
    /**
     * 追加新的积木盒
     * @param {string} name
     * @param {string} icon 图标symbol的id
     * @param {string} color 颜色
     * @param {string[]} blocks 积木XML文本列表
     * @param {boolean} selectedColor 选中时颜色，默认为白
     */
    addToolbox: (
        name: string,
        icon: string,
        color: string,
        blocks: string[],
        selectedColor?: string,
    ) => void;
    /**
     * 注册图标symbol，id建议使用icon-XXX格式命名
     * @param {string} svg svg字符串
     */
    addIcon: (svg: string) => void;
    /** @deprecated */
    regIcon;
    /**
     * 等待Blockly加载完成，请置于颜色定义前。
     */
    waitBlocklyLoaded: () => Promise<void>;
    /**
     * 等待积木加载完成，请置于积木定义前。
     */
    waitBlockLoaded: () => Promise<void>;
    /**
     * 等待RunMgr加载完成，请置于解释器定义前。
     */
    waitRunmgrLoaded: () => Promise<void>;
    /**
     * 触发一个事件
     * @param {string} eventBlockId 事件积木ID
     * @param {object} [params] 参数，可选
     */
    emitSimpleEvent: (eventBlockId: string, params?: object) => void;
    /**
     * 获取事件参数
     * @param {object} utils 解释器参数第4项-utils
     * @returns {object} 参数
     */
    getEventParams: (utils: any) => object;
    /**
     * （异步）加载前置脚本
     * 仅在解释器中使用不要加await影响定义
     * 其它地方使用加await等待加载完成
     * 举例：扩展A加载loadSricpt('res/前置B.js') => extensions/A/res/前置B.js
     * @param url 前置脚本路径
     */
    loadScript: (url: string) => Promise<void>;
}
