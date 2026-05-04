/// <reference path="../_TYPE.d.ts"/>

Extension.metaData = {
    name: "MarkdownPen",
    version: "0.1.0",
    description: "将Markdown文本渲染为图像并绘制在舞台上，支持多行文本、标题、列表等格式",
    author: "Argon",
    docs: "https://afsweb.qzz.io"
};

// 加载Markdown解析库和html2canvas
(async () => {
    // 加载marked库用于解析Markdown
    if (typeof marked === 'undefined') {
        await new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
            script.onload = resolve;
            document.head.appendChild(script);
        });
    }
    
    // 加载html2canvas用于将HTML转为Canvas
    if (typeof html2canvas === 'undefined') {
        await new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
            script.onload = resolve;
            document.head.appendChild(script);
        });
    }
})();

(async () => {
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;
    
    await BN.waitBlocklyLoaded();
    
    BN.regColor("MARKDOWN_HUE", "#2b5f8a", "#2b5f8a");
    
    const markdownBlocks = [
        {
            type: "markdown_render",
            message0: "Markdown渲染 %1 文本 %2 X %3 Y %4 最大宽度 %5 字号 %6 颜色 %7 对齐 %8",
            args0: [
                { type: "input_dummy" },
                { type: "input_value", name: "TEXT", check: "String", value: "# Hello World\n这是**Markdown**" },
                { type: "input_value", name: "X", check: "Number", value: 0 },
                { type: "input_value", name: "Y", check: "Number", value: 0 },
                { type: "input_value", name: "MAX_WIDTH", check: "Number", value: 400 },
                { type: "input_value", name: "SIZE", check: "Number", value: 16 },
                { type: "input_value", name: "COLOR", check: "String", value: "#000000" },
                { 
                    type: "field_dropdown", 
                    name: "ALIGN", 
                    options: [
                        ["居中", "center"],
                        ["左对齐", "left"],
                        ["右对齐", "right"],
                        ["上对齐", "top"],
                        ["下对齐", "bottom"]
                    ]
                }
            ],
            ...Block.methodBlock,
            inputsInline: false,
        }
    ].map((block) => ({ ...block, colour: "%{BKY_MARKDOWN_HUE}" }));
    
    await BN.waitBlockLoaded();
    BN.regBlocks(markdownBlocks);
    
    // 积木盒图标
    BN.regIcon(`<symbol id="icon-markdown" viewBox="0 0 16 16">
        <path d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15V4.15C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm6 0h-2v-2l-1.5 1.5L10 9V8l2-2 2 2v3z" fill="currentColor"/>
    </symbol>`);
    
    BN.addToolbox("markdown", "icon-markdown", "#2b5f8a", [
        Toolbox.title("Markdown · 文本渲染"),
        Toolbox.block("markdown_render"),
        Toolbox.flyout_bottom(),
    ]);
    
    // 解释器部分
    await BN.waitRunmgrLoaded();
    
    const Runtime = (await waitHook('Runtime')).get_webview_runtime();
    
    function get_stage_target(target_id) {
        const stage = Runtime.stage;
        var scene = stage.core.scenes.get_scene(target_id);
        if (!scene.is_error(scene.value)) return scene.value;
        var actor = stage.core.actors.get_actor(target_id);
        if (!actor.is_error(actor.value)) return actor.value;
    }
    
    // 缓存已渲染的Markdown
    const markdownCache = new Map();
    
    // 等待依赖库加载
    async function waitForLibraries() {
        const maxAttempts = 50;
        for (let i = 0; i < maxAttempts; i++) {
            if (typeof marked !== 'undefined' && typeof html2canvas !== 'undefined') {
                return true;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        return false;
    }
    
    // 创建Markdown的HTML表示
    function createMarkdownHTML(markdown, baseFontSize, color, maxWidth) {
        // 配置marked选项
        marked.setOptions({
            breaks: true,  // 支持GitHub风格的换行
            gfm: true,     // 支持GitHub Flavored Markdown
            headerIds: false,
            mangle: false
        });
        
        // 解析Markdown为HTML
        const htmlContent = marked.parse(markdown);
        
        // 创建完整的HTML文档
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body {
                        margin: 10px;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                        font-size: ${baseFontSize}px;
                        color: ${color};
                        max-width: ${maxWidth}px;
                        line-height: 1.6;
                        background: transparent;
                    }
                    /* 重置样式 */
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    h1 { font-size: ${baseFontSize * 2}px; margin: 0.67em 0; }
                    h2 { font-size: ${baseFontSize * 1.5}px; margin: 0.75em 0; }
                    h3 { font-size: ${baseFontSize * 1.17}px; margin: 0.83em 0; }
                    h4 { font-size: ${baseFontSize}px; margin: 1.12em 0; }
                    h5 { font-size: ${baseFontSize * 0.83}px; margin: 1.5em 0; }
                    h6 { font-size: ${baseFontSize * 0.75}px; margin: 1.67em 0; }
                    p { margin: 1em 0; }
                    ul, ol { margin: 1em 0; padding-left: 40px; }
                    li { margin: 0.5em 0; }
                    code {
                        font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Consolas', monospace;
                        background: rgba(0,0,0,0.05);
                        padding: 0.2em 0.4em;
                        border-radius: 3px;
                        font-size: 0.9em;
                    }
                    pre {
                        background: rgba(0,0,0,0.05);
                        padding: 1em;
                        border-radius: 5px;
                        overflow-x: auto;
                    }
                    pre code {
                        background: none;
                        padding: 0;
                    }
                    blockquote {
                        margin: 1em 0;
                        padding-left: 1em;
                        border-left: 4px solid #ccc;
                        color: #666;
                    }
                    table {
                        border-collapse: collapse;
                        width: 100%;
                        margin: 1em 0;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background: rgba(0,0,0,0.05);
                    }
                    img {
                        max-width: 100%;
                        height: auto;
                    }
                    a {
                        color: #0366d6;
                        text-decoration: none;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                ${htmlContent}
            </body>
            </html>
        `;
    }
    
    // 计算绘制位置（根据对齐方式）
    function calculateDrawPosition(align, x, y, width, height, centerX, centerY) {
        switch (align) {
            case 'left':
                return { x: centerX + x, y: centerY - y - height / 2 };
            case 'right':
                return { x: centerX + x - width, y: centerY - y - height / 2 };
            case 'top':
                return { x: centerX + x - width / 2, y: centerY - y };
            case 'bottom':
                return { x: centerX + x - width / 2, y: centerY - y - height };
            case 'center':
            default:
                return { x: centerX + x - width / 2, y: centerY - y - height / 2 };
        }
    }
    
    BN.regMethod('markdown_render', async (params, uuid, uuid2, utils) => {
        try {
            // 等待依赖库加载
            await waitForLibraries();
            
            var actor = get_stage_target(uuid2);
            if (!actor) return;
            
            const brush = actor.get_brush();
            if (!brush.ctx) return;
            
            // 获取参数
            const x = parseFloat(params.X) || 0;
            const y = parseFloat(params.Y) || 0;
            const markdown = params.TEXT || '# Hello World';
            const maxWidth = parseFloat(params.MAX_WIDTH) || 400;
            const fontSize = parseFloat(params.SIZE) || 16;
            const color = params.COLOR || '#000000';
            const align = params.ALIGN || 'center';
            
            // 创建缓存key
            const cacheKey = `${markdown}_${maxWidth}_${fontSize}_${color}`;
            
            // 检查缓存
            if (!markdownCache.has(cacheKey)) {
                // 创建临时的iframe或div来渲染HTML
                const container = document.createElement('div');
                container.style.position = 'absolute';
                container.style.left = '-9999px';
                container.style.top = '-9999px';
                container.innerHTML = createMarkdownHTML(markdown, fontSize, color, maxWidth);
                document.body.appendChild(container);
                
                try {
                    // 使用html2canvas将HTML转为Canvas
                    const canvas = await html2canvas(container, {
                        backgroundColor: null,  // 透明背景
                        scale: 2,  // 2倍分辨率提高质量
                        logging: false,
                        allowTaint: false,
                        useCORS: true,
                        windowWidth: maxWidth + 20,  // 加上padding
                        windowHeight: container.scrollHeight
                    });
                    
                    document.body.removeChild(container);
                    
                    markdownCache.set(cacheKey, {
                        canvas: canvas,
                        width: canvas.width,
                        height: canvas.height
                    });
                } catch (e) {
                    document.body.removeChild(container);
                    throw e;
                }
            }
            
            // 从缓存获取
            const cached = markdownCache.get(cacheKey);
            
            // 获取视图中心
            const view = brush.app.get_app().view;
            const center_x = view.width / 2;
            const center_y = view.height / 2;
            
            // 计算绘制位置
            const pos = calculateDrawPosition(align, x, y, cached.width, cached.height, center_x, center_y);
            
            // 绘制到舞台
            brush.ctx.save();
            brush.ctx.drawImage(cached.canvas, pos.x, pos.y, cached.width, cached.height);
            brush.ctx.restore();
            
            actor.parent_scene.should_update_brush();
            
        } catch (error) {
            console.error('[Markdown] 渲染失败:', error);
            
            // 降级方案：显示纯文本
            try {
                var actor = get_stage_target(uuid2);
                if (!actor) return;
                
                const brush = actor.get_brush();
                const view = brush.app.get_app().view;
                const center_x = view.width / 2;
                const center_y = view.height / 2;
                const x = parseFloat(params.X) || 0;
                const y = parseFloat(params.Y) || 0;
                const fontSize = parseFloat(params.SIZE) || 16;
                const text = params.TEXT || 'Error';
                
                brush.ctx.save();
                brush.ctx.font = `${fontSize}px sans-serif`;
                brush.ctx.fillStyle = '#ff0000';
                brush.ctx.textBaseline = 'middle';
                brush.ctx.textAlign = 'center';
                brush.ctx.fillText('Markdown渲染失败', center_x + x, center_y - y);
                brush.ctx.restore();
                
                actor.parent_scene.should_update_brush();
            } catch (e) {}
        }
    });
    
})();