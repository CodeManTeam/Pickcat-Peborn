/// <reference path="../_TYPE.d.ts"/>

Extension.metaData = {
    name: "HTML绘制",
    version: "1.0.0",
    description: "将HTML片段直接绘制到舞台上，支持CSS样式和交互模拟",
    author: "砂墨&Deepseek",
    docs: ""
};

(async () => {
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;
    
    await BN.waitBlocklyLoaded();
    
    BN.regColor("HTML_DRAW_HUE", "#42A5F5", "#1976D2");
    
    const htmlDrawBlocks = [
        // ========== HTML容器 ==========
        {
            type: "html_create_container",
            message0: "创建HTML容器 ID %1 尺寸 %2x%3",
            args0: [
                { type: "input_value", name: "ID", check: "String", value: "box1" },
                { type: "input_value", name: "WIDTH", check: "Number", value: 400 },
                { type: "input_value", name: "HEIGHT", check: "Number", value: 300 }
            ],
            ...Block.methodBlock,
            colour: "%{HTML_DRAW_HUE}"
        },
        
        {
            type: "html_set_content",
            message0: "设置HTML容器 %1 内容 %2",
            args0: [
                { type: "input_value", name: "ID", check: "String", value: "box1" },
                { type: "input_value", name: "HTML", check: "String", value: "<h1>Hello</h1>" }
            ],
            ...Block.methodBlock,
            colour: "%{HTML_DRAW_HUE}"
        },
        
        {
            type: "html_append_content",
            message0: "追加HTML容器 %1 内容 %2",
            args0: [
                { type: "input_value", name: "ID", check: "String", value: "box1" },
                { type: "input_value", name: "HTML", check: "String", value: "<p>World</p>" }
            ],
            ...Block.methodBlock,
            colour: "%{HTML_DRAW_HUE}"
        },
        
        {
            type: "html_set_css",
            message0: "设置HTML容器 %1 CSS %2",
            args0: [
                { type: "input_value", name: "ID", check: "String", value: "box1" },
                { type: "input_value", name: "CSS", check: "String", value: "body{background:#f0f0f0}" }
            ],
            ...Block.methodBlock,
            colour: "%{HTML_DRAW_HUE}"
        },
        
        // ========== 绘制 ==========
        {
            type: "html_draw",
            message0: "绘制HTML容器 %1 到位置 X %2 Y %3 缩放 %4",
            args0: [
                { type: "input_value", name: "ID", check: "String", value: "box1" },
                { type: "input_value", name: "X", check: "Number", value: 0 },
                { type: "input_value", name: "Y", check: "Number", value: 0 },
                { type: "input_value", name: "SCALE", check: "Number", value: 1 }
            ],
            output: "Boolean",
            colour: "%{HTML_DRAW_HUE}"
        },
        
        {
            type: "html_draw_with_style",
            message0: "绘制HTML容器 %1 到 X %2 Y %3 背景色 %4 圆角 %5 阴影 %6",
            args0: [
                { type: "input_value", name: "ID", check: "String", value: "box1" },
                { type: "input_value", name: "X", check: "Number", value: 0 },
                { type: "input_value", name: "Y", check: "Number", value: 0 },
                { type: "input_value", name: "BG_COLOR", check: "String", value: "#ffffff" },
                { type: "input_value", name: "RADIUS", check: "Number", value: 8 },
                { type: "input_value", name: "SHADOW", check: "String", value: "5px 5px 10px rgba(0,0,0,0.2)" }
            ],
            output: "Boolean",
            colour: "%{HTML_DRAW_HUE}"
        },
        
        // ========== 元素操作 ==========
        {
            type: "html_get_element",
            message0: "获取HTML容器 %1 中的元素 %2",
            args0: [
                { type: "input_value", name: "ID", check: "String", value: "box1" },
                { type: "input_value", name: "SELECTOR", check: "String", value: "#button" }
            ],
            output: "String", // 返回元素ID
            colour: "%{HTML_DRAW_HUE}"
        },
        
        {
            type: "html_set_text",
            message0: "设置元素 %1 文本为 %2",
            args0: [
                { type: "input_value", name: "ELEMENT_ID", check: "String", value: "" },
                { type: "input_value", name: "TEXT", check: "String", value: "新文本" }
            ],
            ...Block.methodBlock,
            colour: "%{HTML_DRAW_HUE}"
        },
        
        {
            type: "html_set_html",
            message0: "设置元素 %1 HTML为 %2",
            args0: [
                { type: "input_value", name: "ELEMENT_ID", check: "String", value: "" },
                { type: "input_value", name: "HTML", check: "String", value: "<b>加粗</b>" }
            ],
            ...Block.methodBlock,
            colour: "%{HTML_DRAW_HUE}"
        },
        
        {
            type: "html_set_attr",
            message0: "设置元素 %1 属性 %2 为 %3",
            args0: [
                { type: "input_value", name: "ELEMENT_ID", check: "String", value: "" },
                { type: "input_value", name: "ATTR", check: "String", value: "class" },
                { type: "input_value", name: "VALUE", check: "String", value: "btn-active" }
            ],
            ...Block.methodBlock,
            colour: "%{HTML_DRAW_HUE}"
        },
        
        {
            type: "html_set_style",
            message0: "设置元素 %1 样式 %2 为 %3",
            args0: [
                { type: "input_value", name: "ELEMENT_ID", check: "String", value: "" },
                { type: "input_value", name: "PROP", check: "String", value: "color" },
                { type: "input_value", name: "VALUE", check: "String", value: "red" }
            ],
            ...Block.methodBlock,
            colour: "%{HTML_DRAW_HUE}"
        },
        
        {
            type: "html_get_text",
            message0: "获取元素 %1 的文本",
            args0: [
                { type: "input_value", name: "ELEMENT_ID", check: "String", value: "" }
            ],
            output: "String",
            colour: "%{HTML_DRAW_HUE}"
        },
        
        // ========== 交互模拟 ==========
        {
            type: "html_click",
            message0: "点击元素 %1",
            args0: [
                { type: "input_value", name: "ELEMENT_ID", check: "String", value: "" }
            ],
            ...Block.methodBlock,
            colour: "%{HTML_DRAW_HUE}"
        },
        
        {
            type: "html_input",
            message0: "向元素 %1 输入 %2",
            args0: [
                { type: "input_value", name: "ELEMENT_ID", check: "String", value: "" },
                { type: "input_value", name: "VALUE", check: "String", value: "🈚" }
            ],
            ...Block.methodBlock,
            colour: "%{HTML_DRAW_HUE}"
        },
        
        {
            type: "html_focus",
            message0: "聚焦元素 %1",
            args0: [
                { type: "input_value", name: "ELEMENT_ID", check: "String", value: "" }
            ],
            ...Block.methodBlock,
            colour: "%{HTML_DRAW_HUE}"
        },
        
        {
            type: "html_blur",
            message0: "失焦元素 %1",
            args0: [
                { type: "input_value", name: "ELEMENT_ID", check: "String", value: "" }
            ],
            ...Block.methodBlock,
            colour: "%{HTML_DRAW_HUE}"
        },
        
        {
            type: "html_hover",
            message0: "悬停元素 %1",
            args0: [
                { type: "input_value", name: "ELEMENT_ID", check: "String", value: "" }
            ],
            ...Block.methodBlock,
            colour: "%{HTML_DRAW_HUE}"
        },
        
        // ========== 事件监听 ==========
        {
            type: "html_on_click",
            message0: "当元素 %1 被点击时触发",
            args0: [
                { type: "input_value", name: "ELEMENT_ID", check: "String", value: "" }
            ],
            ...Block.eventBlock,
            colour: "%{HTML_DRAW_HUE}"
        },
        
        {
            type: "html_on_change",
            message0: "当元素 %1 的值改变时触发",
            args0: [
                { type: "input_value", name: "ELEMENT_ID", check: "String", value: "" }
            ],
            ...Block.eventBlock,
            colour: "%{HTML_DRAW_HUE}"
        },
        
        {
            type: "html_event_data",
            message0: "获取事件数据",
            args0: [],
            output: "String",
            colour: "%{HTML_DRAW_HUE}"
        },
        
        // ========== 工具 ==========
        {
            type: "html_load_url",
            message0: "从URL %1 加载HTML到容器 %2",
            args0: [
                { type: "input_value", name: "URL", check: "String", value: "https://example.com" },
                { type: "input_value", name: "ID", check: "String", value: "box1" }
            ],
            ...Block.methodBlock,
            colour: "%{HTML_DRAW_HUE}"
        },
        
        {
            type: "html_clear",
            message0: "清空HTML容器 %1",
            args0: [
                { type: "input_value", name: "ID", check: "String", value: "box1" }
            ],
            ...Block.methodBlock,
            colour: "%{HTML_DRAW_HUE}"
        },
        
        {
            type: "html_remove",
            message0: "删除元素 %1",
            args0: [
                { type: "input_value", name: "ELEMENT_ID", check: "String", value: "" }
            ],
            ...Block.methodBlock,
            colour: "%{HTML_DRAW_HUE}"
        },
        
        {
            type: "html_destroy_container",
            message0: "销毁HTML容器 %1",
            args0: [
                { type: "input_value", name: "ID", check: "String", value: "box1" }
            ],
            ...Block.methodBlock,
            colour: "%{HTML_DRAW_HUE}"
        }
    ].map(block => ({ ...block, colour: "%{HTML_DRAW_HUE}" }));
    
    await BN.waitBlockLoaded();
    BN.regBlocks(htmlDrawBlocks);
    
    // --------------------------------积木盒-------------------------------
    const htmlDrawXML = [
        Toolbox.title("📄 HTML绘制"),
        
        Toolbox.line("容器管理"),
        Toolbox.block("html_create_container"),
        Toolbox.block("html_set_content"),
        Toolbox.block("html_append_content"),
        Toolbox.block("html_set_css"),
        Toolbox.block("html_clear"),
        Toolbox.block("html_destroy_container"),
        
        Toolbox.line("绘制"),
        Toolbox.block("html_draw"),
        Toolbox.block("html_draw_with_style"),
        
        Toolbox.line("元素操作"),
        Toolbox.block("html_get_element"),
        Toolbox.block("html_set_text"),
        Toolbox.block("html_set_html"),
        Toolbox.block("html_set_attr"),
        Toolbox.block("html_set_style"),
        Toolbox.block("html_get_text"),
        Toolbox.block("html_remove"),
        
        Toolbox.line("交互模拟"),
        Toolbox.block("html_click"),
        Toolbox.block("html_input"),
        Toolbox.block("html_focus"),
        Toolbox.block("html_blur"),
        Toolbox.block("html_hover"),
        
        Toolbox.line("事件监听"),
        Toolbox.block("html_on_click"),
        Toolbox.block("html_on_change"),
        Toolbox.block("html_event_data"),
        
        Toolbox.line("外部加载"),
        Toolbox.block("html_load_url"),
        
        Toolbox.flyout_bottom()
    ];
    
    BN.regIcon(`<symbol id="icon-html-draw" viewBox="-33 -33 90 90">
<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
fill="none"
stroke="#42A5F5"
stroke-width="1.5"
stroke-linejoin="round"
stroke-linecap="round"/>
</symbol>`);
    
    BN.addToolbox("html-draw", "icon-html-draw", "#42A5F5", htmlDrawXML);
    
    // ---------------------------解释器-------------------------------------
    await BN.waitRunmgrLoaded();
    
    const Runtime = (await waitHook('Runtime')).get_webview_runtime();
    
    // 依赖
    BN.loadScript('utils/html2canvas.min.js');
    
    function get_stage_target(target_id) {
        const stage = Runtime.stage;
        var scene = stage.core.scenes.get_scene(target_id);
        if (!scene.is_error(scene.value)) return scene.value;
        var actor = stage.core.actors.get_actor(target_id);
        if (!actor.is_error(actor.value)) return actor.value;
    }
    
    // 存储HTML容器
    const containers = new Map();
    const elements = new Map();
    let nextElementId = 1;
    
    // 等待条件
    async function waitFor(condition, timeout = 5) {
        const start = Date.now();
        while (Date.now() - start < timeout * 1000) {
            if (await condition()) return true;
            await new Promise(r => setTimeout(r, 100));
        }
        return false;
    }
    
    // 创建HTML容器
    BN.regMethod('html_create_container', (params, uuid, uuid2, utils) => {
        const id = params.ID || '';
        const width = parseInt(params.WIDTH) || 400;
        const height = parseInt(params.HEIGHT) || 300;
        
        // 创建隐藏div容器
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '-9999px';
        container.style.width = width + 'px';
        container.style.height = height + 'px';
        container.style.overflow = 'auto';
        container.style.backgroundColor = '#ffffff';
        
        // 创建内部iframe用于隔离样式
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        container.appendChild(iframe);
        
        document.body.appendChild(container);
        
        // 等待iframe加载
        iframe.onload = () => {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            doc.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body { 
                            margin: 0; 
                            padding: 0;
                            font-family: system-ui, -apple-system, sans-serif;
                            width: 100%;
                            height: 100%;
                            overflow: auto;
                        }
                        * { box-sizing: border-box; }
                    </style>
                </head>
                <body></body>
                </html>
            `);
            doc.close();
        };
        
        containers.set(id, {
            id: id,
            element: container,
            iframe: iframe,
            width: width,
            height: height,
            lastDraw: null
        });
        
        BN.log('html-draw', `容器 ${id} 已创建`);
    });
    
    // 设置HTML内容
    BN.regMethod('html_set_content', (params, uuid, uuid2, utils) => {
        const id = params.ID || '';
        const html = params.HTML || '';
        
        const container = containers.get(id);
        if (!container || !container.iframe) return;
        
        const doc = container.iframe.contentDocument || container.iframe.contentWindow.document;
        const body = doc.body;
        body.innerHTML = html;
    });
    
    // 追加HTML内容
    BN.regMethod('html_append_content', (params, uuid, uuid2, utils) => {
        const id = params.ID || '';
        const html = params.HTML || '';
        
        const container = containers.get(id);
        if (!container || !container.iframe) return;
        
        const doc = container.iframe.contentDocument || container.iframe.contentWindow.document;
        const body = doc.body;
        body.insertAdjacentHTML('beforeend', html);
    });
    
    // 设置CSS
    BN.regMethod('html_set_css', (params, uuid, uuid2, utils) => {
        const id = params.ID || '';
        const css = params.CSS || '';
        
        const container = containers.get(id);
        if (!container || !container.iframe) return;
        
        const doc = container.iframe.contentDocument || container.iframe.contentWindow.document;
        let style = doc.querySelector('style');
        if (!style) {
            style = doc.createElement('style');
            doc.head.appendChild(style);
        }
        style.textContent = css;
    });
    
    // 绘制到舞台
    BN.regMethod('html_draw', async (params, uuid, uuid2, utils) => {
        const id = params.ID || '';
        const x = parseFloat(params.X) || 0;
        const y = parseFloat(params.Y) || 0;
        const scale = parseFloat(params.SCALE) || 1;
        
        const container = containers.get(id);
        if (!container || !container.iframe) return false;
        
        var actor = get_stage_target(uuid2);
        if (!actor) return false;
        
        try {
            const doc = container.iframe.contentDocument || container.iframe.contentWindow.document;
            
            // 等待渲染完成
            await new Promise(r => setTimeout(r, 100));
            
            // 截图
            const canvas = await html2canvas(doc.body, {
                width: container.width,
                height: container.height,
                scale: scale,
                backgroundColor: null,
                allowTaint: true,
                useCORS: true,
                logging: false
            });
            
            // 绘制到舞台
            const drawWidth = container.width * scale;
            const drawHeight = container.height * scale;
            
            actor.get_brush().draw_image(
                canvas,
                x,
                y,
                drawWidth,
                drawHeight
            );
            
            container.lastDraw = Date.now();
            return true;
            
        } catch (e) {
            BN.error('html-draw', `绘制失败: ${e.message}`);
            
            // 绘制错误提示
            const canvas = document.createElement('canvas');
            canvas.width = container.width;
            canvas.height = container.height;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#f8d7da';
            ctx.fillRect(0, 0, container.width, container.height);
            ctx.fillStyle = '#721c24';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('绘制失败', container.width/2, container.height/2);
            
            actor.get_brush().draw_image(canvas, x, y, container.width, container.height);
            return false;
        }
    });
    
    // 带样式的绘制
    BN.regMethod('html_draw_with_style', async (params, uuid, uuid2, utils) => {
        const id = params.ID || '';
        const x = parseFloat(params.X) || 0;
        const y = parseFloat(params.Y) || 0;
        const bgColor = params.BG_COLOR || '#ffffff';
        const radius = parseFloat(params.RADIUS) || 0;
        const shadow = params.SHADOW || '';
        
        const container = containers.get(id);
        if (!container || !container.iframe) return false;
        
        var actor = get_stage_target(uuid2);
        if (!actor) return false;
        
        try {
            const doc = container.iframe.contentDocument || container.iframe.contentWindow.document;
            
            // 应用临时样式
            const originalBg = doc.body.style.backgroundColor;
            doc.body.style.backgroundColor = bgColor;
            
            await new Promise(r => setTimeout(r, 100));
            
            const canvas = await html2canvas(doc.body, {
                width: container.width,
                height: container.height,
                scale: 1,
                backgroundColor: bgColor,
                allowTaint: true,
                useCORS: true
            });
            
            // 恢复样式
            doc.body.style.backgroundColor = originalBg;
            
            // 创建带效果的新画布
            const finalCanvas = document.createElement('canvas');
            finalCanvas.width = container.width;
            finalCanvas.height = container.height;
            const ctx = finalCanvas.getContext('2d');
            
            // 应用阴影
            if (shadow) {
                ctx.shadow = shadow;
            }
            
            // 绘制圆角
            ctx.beginPath();
            ctx.roundRect(0, 0, container.width, container.height, radius);
            ctx.clip();
            
            ctx.drawImage(canvas, 0, 0);
            
            // 绘制到舞台
            actor.get_brush().draw_image(finalCanvas, x, y, container.width, container.height);
            
            return true;
            
        } catch (e) {
            BN.error('html-draw', `样式绘制失败: ${e.message}`);
            return false;
        }
    });
    
    // 获取元素
    BN.regMethod('html_get_element', (params, uuid, uuid2, utils) => {
        const id = params.ID || '';
        const selector = params.SELECTOR || '';
        
        const container = containers.get(id);
        if (!container || !container.iframe) return '';
        
        try {
            const doc = container.iframe.contentDocument || container.iframe.contentWindow.document;
            const element = doc.querySelector(selector);
            
            if (element) {
                const elementId = `elem_${nextElementId++}`;
                
                // 存储元素引用
                elements.set(elementId, {
                    element: element,
                    container: container,
                    doc: doc
                });
                
                return elementId;
            }
        } catch (e) {}
        
        return '';
    });
    
    // 设置文本
    BN.regMethod('html_set_text', (params, uuid, uuid2, utils) => {
        const elementId = params.ELEMENT_ID || '';
        const text = params.TEXT || '';
        
        const elem = elements.get(elementId);
        if (!elem || !elem.element) return;
        
        elem.element.textContent = text;
    });
    
    // 设置HTML
    BN.regMethod('html_set_html', (params, uuid, uuid2, utils) => {
        const elementId = params.ELEMENT_ID || '';
        const html = params.HTML || '';
        
        const elem = elements.get(elementId);
        if (!elem || !elem.element) return;
        
        elem.element.innerHTML = html;
    });
    
    // 设置属性
    BN.regMethod('html_set_attr', (params, uuid, uuid2, utils) => {
        const elementId = params.ELEMENT_ID || '';
        const attr = params.ATTR || '';
        const value = params.VALUE || '';
        
        const elem = elements.get(elementId);
        if (!elem || !elem.element) return;
        
        elem.element.setAttribute(attr, value);
    });
    
    // 设置样式
    BN.regMethod('html_set_style', (params, uuid, uuid2, utils) => {
        const elementId = params.ELEMENT_ID || '';
        const prop = params.PROP || '';
        const value = params.VALUE || '';
        
        const elem = elements.get(elementId);
        if (!elem || !elem.element) return;
        
        elem.element.style[prop] = value;
    });
    
    // 获取文本
    BN.regMethod('html_get_text', (params, uuid, uuid2, utils) => {
        const elementId = params.ELEMENT_ID || '';
        
        const elem = elements.get(elementId);
        if (!elem || !elem.element) return '';
        
        return elem.element.textContent || '';
    });
    
    // 点击元素
    BN.regMethod('html_click', (params, uuid, uuid2, utils) => {
        const elementId = params.ELEMENT_ID || '';
        
        const elem = elements.get(elementId);
        if (!elem || !elem.element) return;
        
        try {
            const event = new MouseEvent('click', {
                view: elem.doc.defaultView,
                bubbles: true,
                cancelable: true
            });
            elem.element.dispatchEvent(event);
        } catch (e) {}
    });
    
    // 输入文本
    BN.regMethod('html_input', (params, uuid, uuid2, utils) => {
        const elementId = params.ELEMENT_ID || '';
        const value = params.VALUE || '';
        
        const elem = elements.get(elementId);
        if (!elem || !elem.element) return;
        
        try {
            if (elem.element.tagName === 'INPUT' || elem.element.tagName === 'TEXTAREA') {
                elem.element.value = value;
                
                const inputEvent = new Event('input', { bubbles: true });
                elem.element.dispatchEvent(inputEvent);
                
                const changeEvent = new Event('change', { bubbles: true });
                elem.element.dispatchEvent(changeEvent);
            }
        } catch (e) {}
    });
    
    // 聚焦
    BN.regMethod('html_focus', (params, uuid, uuid2, utils) => {
        const elementId = params.ELEMENT_ID || '';
        
        const elem = elements.get(elementId);
        if (!elem || !elem.element) return;
        
        try {
            elem.element.focus();
        } catch (e) {}
    });
    
    // 失焦
    BN.regMethod('html_blur', (params, uuid, uuid2, utils) => {
        const elementId = params.ELEMENT_ID || '';
        
        const elem = elements.get(elementId);
        if (!elem || !elem.element) return;
        
        try {
            elem.element.blur();
        } catch (e) {}
    });
    
    // 悬停
    BN.regMethod('html_hover', (params, uuid, uuid2, utils) => {
        const elementId = params.ELEMENT_ID || '';
        
        const elem = elements.get(elementId);
        if (!elem || !elem.element) return;
        
        try {
            const mouseOver = new MouseEvent('mouseover', {
                view: elem.doc.defaultView,
                bubbles: true,
                cancelable: true
            });
            elem.element.dispatchEvent(mouseOver);
        } catch (e) {}
    });
    
    // 从URL加载
    BN.regMethod('html_load_url', async (params, uuid, uuid2, utils) => {
        const url = params.URL || '';
        const id = params.ID || '';
        
        const container = containers.get(id);
        if (!container || !container.iframe) return;
        
        try {
            const response = await fetch(url);
            const html = await response.text();
            
            const doc = container.iframe.contentDocument || container.iframe.contentWindow.document;
            const body = doc.body;
            body.innerHTML = html;
            
        } catch (e) {
            BN.error('html-draw', `加载URL失败: ${e.message}`);
        }
    });
    
    // 清空容器
    BN.regMethod('html_clear', (params, uuid, uuid2, utils) => {
        const id = params.ID || '';
        
        const container = containers.get(id);
        if (!container || !container.iframe) return;
        
        const doc = container.iframe.contentDocument || container.iframe.contentWindow.document;
        doc.body.innerHTML = '';
    });
    
    // 删除元素
    BN.regMethod('html_remove', (params, uuid, uuid2, utils) => {
        const elementId = params.ELEMENT_ID || '';
        
        const elem = elements.get(elementId);
        if (!elem || !elem.element) return;
        
        elem.element.remove();
        elements.delete(elementId);
    });
    
    // 销毁容器
    BN.regMethod('html_destroy_container', (params, uuid, uuid2, utils) => {
        const id = params.ID || '';
        
        const container = containers.get(id);
        if (!container) return;
        
        if (container.element && container.element.parentNode) {
            container.element.parentNode.removeChild(container.element);
        }
        
        containers.delete(id);
    });
    
    // 事件监听（简化）
    BN.regSimpleEvent('html_element_click');
    BN.regSimpleEvent('html_element_change');
    
    BN.regMethod('html_on_click', (params, uuid, uuid2, utils) => {
        // 注册事件监听
    });
    
    BN.regMethod('html_on_change', (params, uuid, uuid2, utils) => {
        // 注册事件监听
    });
    
    BN.regMethod('html_event_data', (params, uuid, uuid2, utils) => {
        const eventParams = BN.getEventParams(utils);
        return JSON.stringify(eventParams);
    });
    
    // 添加roundRect方法
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.moveTo(x + r, y);
        this.lineTo(x + w - r, y);
        this.quadraticCurveTo(x + w, y, x + w, y + r);
        this.lineTo(x + w, y + h - r);
        this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        this.lineTo(x + r, y + h);
        this.quadraticCurveTo(x, y + h, x, y + h - r);
        this.lineTo(x, y + r);
        this.quadraticCurveTo(x, y, x + r, y);
        return this;
    };
    
    BN.log('html-draw', 'HTML绘制扩展已加载');
})();