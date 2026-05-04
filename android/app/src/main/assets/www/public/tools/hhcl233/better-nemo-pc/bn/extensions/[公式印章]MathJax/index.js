/// <reference path="../_TYPE.d.ts"/>

Extension.metaData = {
    name: "MathJax 公式渲染",
    version: "0.3.0",
    description: "使用MathJax直接渲染LaTeX公式为SVG然后画在舞台上，支持数学化学公式，支持多种对齐方式",
    author: "皌 & DeepSeek",
    docs: "https://docs.mathjax.org/"
};

// 先设置MathJax配置
window.MathJax = {
    options: {
        enableMenu: false,
        renderActions: {}
    },
    svg: {
        fontCache: 'none',
        scale: 1,
        minScale: 0.5,
        mtextInheritFont: true
    },
    tex: {
        packages: ['base', 'ams', 'noerrors', 'noundefined', 'mhchem'],
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']]
    }
};

(async () => {
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;
    
    // 现在BN已定义，可以安全使用loadScript
    if (typeof MathJax === 'undefined' || !MathJax.tex2svg) {
        await BN.loadScript('utils/tex-svg-full.js');
    }
    
    await BN.waitBlocklyLoaded();
    
    const mathjaxBlocks = [
        {
            type: "mathjax_render",
            message0: "公式印章 %1 公式 %2 X %3 Y %4 字号 %5 颜色 %6 对齐 %7",
            args0: [
                { type: "input_dummy" },
                { type: "input_value", name: "FORMULA", check: "String", value: "E = mc^2" },
                { type: "input_value", name: "X", check: "Number", value: 0 },
                { type: "input_value", name: "Y", check: "Number", value: 0 },
                { type: "input_value", name: "SIZE", check: "Number", value: 24 },
                { type: "input_value", name: "COLOR", check: "String", value: "#000000" },
                { 
                    type: "field_dropdown", 
                    name: "ALIGN", 
                    options: [
                        ["居中", "center"],
                        ["左对齐", "left"],
                        ["右对齐", "right"],
                        ["上对齐", "top"],
                        ["下对齐", "bottom"],
                        ["左上对齐", "top-left"],
                        ["右上对齐", "top-right"],
                        ["左下对齐", "bottom-left"],
                        ["右下对齐", "bottom-right"]
                    ]
                },
            ],
            ...Block.methodBlock,
            inputsInline: false,
        }
    ].map((block) => ({ ...block, colour: "%{BKY_PEN_HUE}" }));
    
    await BN.waitBlockLoaded();
    BN.regBlocks(mathjaxBlocks);
    
    // 积木盒
    BN.regIcon(`<symbol id="icon-mathjax" viewBox="-800 -844 2400 2576">
<path style="opacity:1" d="M 185.5,166.5 C 195.839,166.334 206.172,166.5 216.5,167C 218.487,168.319 219.654,170.152 220,172.5C 220.826,177.589 220.492,182.589 219,187.5C 218.25,188.126 217.416,188.626 216.5,189C 202.651,189.174 189.318,191.841 176.5,197C 167.725,201.635 160.225,207.801 154,215.5C 151.867,219.232 150.534,223.232 150,227.5C 148.808,273.156 148.142,318.823 148,364.5C 144.236,384.932 133.403,400.432 115.5,411C 108.434,414.853 101.1,418.02 93.5,420.5C 110.787,425.948 125.287,435.615 137,449.5C 142.567,456.971 146.234,465.304 148,474.5C 148.252,519.507 148.918,564.507 150,609.5C 149.834,618.999 153.334,626.832 160.5,633C 176.074,644.944 193.741,650.944 213.5,651C 216.494,651.406 218.661,652.906 220,655.5C 220.667,659.833 220.667,664.167 220,668.5C 219.654,670.848 218.487,672.681 216.5,674C 191.719,676.062 167.719,672.729 144.5,664C 127.476,656.977 114.976,645.144 107,628.5C 105.844,624.877 104.844,621.211 104,617.5C 102.805,572.844 102.138,528.178 102,483.5C 101.234,467.138 94.0674,454.305 80.5,445C 66.7427,436.476 51.7427,432.143 35.5,432C 31.1112,429.471 29.4446,425.637 30.5,420.5C 29.7271,415.949 31.0605,412.282 34.5,409.5C 56.9564,409.187 76.123,401.187 92,385.5C 97.248,378.67 100.581,371.004 102,362.5C 102.333,320.167 102.667,277.833 103,235.5C 103.153,225.749 105.153,216.416 109,207.5C 122.618,188.758 140.785,176.592 163.5,171C 170.987,169.59 178.321,168.09 185.5,166.5 Z"/>
<path style="opacity:1" d="M 581.5,166.5 C 602.228,165.966 622.562,168.466 642.5,174C 659.823,180.664 674.323,191.164 686,205.5C 691.165,214.827 693.498,224.827 693,235.5C 693.546,279.169 694.213,322.835 695,366.5C 698.321,377.659 704.487,386.826 713.5,394C 728.485,403.551 744.819,408.884 762.5,410C 764.978,413.001 765.978,416.501 765.5,420.5C 766.273,425.051 764.94,428.718 761.5,431.5C 739.455,431.455 720.622,439.122 705,454.5C 697.356,464.1 693.689,475.1 694,487.5C 693.667,527.5 693.333,567.5 693,607.5C 693.326,620.219 689.659,631.552 682,641.5C 661.461,661.804 636.627,672.637 607.5,674C 597.733,674.947 588.066,674.613 578.5,673C 577.299,672.097 576.465,670.931 576,669.5C 575.333,664.5 575.333,659.5 576,654.5C 576.374,653.584 576.874,652.75 577.5,652C 592.554,650.922 607.221,647.922 621.5,643C 638.164,635.02 646.664,621.854 647,603.5C 647.333,560.833 647.667,518.167 648,475.5C 656.82,448.512 674.653,430.179 701.5,420.5C 682.651,413.469 667.485,401.802 656,385.5C 653.117,380.401 650.783,375.067 649,369.5C 648.005,320.487 647.005,271.487 646,222.5C 641.5,211.333 633.667,203.5 622.5,199C 607.884,193.645 592.884,190.145 577.5,188.5C 575.55,182.993 575.05,177.326 576,171.5C 577.107,168.887 578.94,167.22 581.5,166.5 Z"/>
<path style="opacity:1" d="M 334.5,327.5 C 401.167,327.333 467.834,327.5 534.5,328C 541.639,330.943 544.972,336.276 544.5,344C 544.594,355.488 539.261,363.154 528.5,367C 505.821,367.793 483.321,368.96 461,370.5C 453.237,407.726 452.57,445.059 459,482.5C 462.992,498.138 467.826,513.471 473.5,528.5C 468.944,549.194 456.277,557.028 435.5,552C 428.736,544.41 424.236,535.576 422,525.5C 420.539,519.194 419.206,512.861 418,506.5C 416.77,459.943 422.603,414.276 435.5,369.5C 420.603,368.177 405.77,368.177 391,369.5C 378.183,425.437 363.183,480.77 346,535.5C 339.078,552.37 326.912,557.87 309.5,552C 305.942,550.108 303.442,547.275 302,543.5C 300.919,538.53 300.586,533.53 301,528.5C 326.508,476.98 348.008,423.813 365.5,369C 335.103,362.708 309.937,371.208 290,394.5C 287.132,397.736 284.632,401.236 282.5,405C 262.686,409.224 257.519,402.724 267,385.5C 279.036,366.462 294.203,350.295 312.5,337C 319.594,332.945 326.927,329.778 334.5,327.5 Z"/>
</symbol>`);
    BN.addToolbox("mathjax", "icon-mathjax", "#2BC9A7", [
        Toolbox.title("公式印章 · MathJax"),
        Toolbox.block("mathjax_render"),
        Toolbox.flyout_bottom(),
    ]);
    
    // ---------------------------解释器-------------------------------------
    await BN.waitRunmgrLoaded();
    
    const Runtime = (await waitHook('Runtime')).get_webview_runtime();
    
    function get_stage_target(target_id) {
        const stage = Runtime.stage;
        var scene = stage.core.scenes.get_scene(target_id);
        if (!scene.is_error(scene.value)) return scene.value;
        var actor = stage.core.actors.get_actor(target_id);
        if (!actor.is_error(actor.value)) return actor.value;
    }
    
    // 缓存已渲染的公式
    const formulaCache = new Map();
    
    // 等待MathJax加载
    async function waitForMathJax() {
        const maxAttempts = 50;
        for (let i = 0; i < maxAttempts; i++) {
            if (typeof MathJax !== 'undefined' && MathJax.tex2svg) {
                return true;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        return false;
    }
    
    // 将ex单位转换为像素
    function exToPx(ex, fontSize) {
        // 1ex 通常等于 0.5em，而 1em = fontSize
        return ex * (fontSize / 2);
    }
    
    // 解析MathJax SVG尺寸
    function parseMathJaxSize(sizeStr, fontSize) {
        if (!sizeStr) return 100;
        
        // 移除单位并转换
        const match = sizeStr.match(/^([\d.]+)([a-z%]*)$/);
        if (!match) return 100;
        
        const value = parseFloat(match[1]);
        const unit = match[2];
        
        switch (unit) {
            case 'ex':
                return exToPx(value, fontSize);
            case 'em':
                return value * fontSize;
            case 'px':
                return value;
            case '%':
                return value / 100 * 500; // 假设容器宽度500px
            default:
                return value;
        }
    }
    
    // 使用MathJax直接渲染为SVG
    function renderFormulaToSVG(formula, fontSize, color) {
        try {
            // 使用MathJax的tex2svg方法
            const svg = MathJax.tex2svg(formula, {
                display: true,
                em: fontSize,
                ex: fontSize / 2,
                containerWidth: 0,
                lineWidth: 1000000,
                scale: 1
            });
            
            // 获取SVG元素
            const svgElement = svg.firstChild;
            
            // 设置颜色 - 修正颜色支持
            if (color) {
                // 设置顶层颜色属性
                svgElement.setAttribute('color', color);
                svgElement.style.color = color;
                
                // 获取所有可能包含路径的元素
                const paths = svgElement.querySelectorAll('path, text, g, use, circle, rect, line, polyline, polygon');
                paths.forEach(path => {
                    // 如果元素没有fill属性或fill不为none，则设置fill
                    const currentFill = path.getAttribute('fill');
                    if (currentFill !== 'none' && currentFill !== 'transparent') {
                        path.setAttribute('fill', color);
                    }
                    // 如果元素有stroke属性且不为none，则设置stroke
                    const currentStroke = path.getAttribute('stroke');
                    if (currentStroke && currentStroke !== 'none' && currentStroke !== 'transparent') {
                        path.setAttribute('stroke', color);
                    }
                });
                
                // 额外处理：某些MathJax生成的SVG可能使用style标签内的类定义颜色
                // 添加内联样式覆盖
                const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
                style.textContent = `* { color: ${color}; fill: ${color}; stroke: ${color}; }`;
                svgElement.insertBefore(style, svgElement.firstChild);
            }
            
            // 获取原始尺寸（可能带单位）
            const widthStr = svgElement.getAttribute('width') || '10ex';
            const heightStr = svgElement.getAttribute('height') || '5ex';
            
            // 转换为像素
            const width = parseMathJaxSize(widthStr, fontSize);
            const height = parseMathJaxSize(heightStr, fontSize);
            
            // 设置明确的像素尺寸
            svgElement.setAttribute('width', width + 'px');
            svgElement.setAttribute('height', height + 'px');
            
            // 确保viewBox存在
            let viewBox = svgElement.getAttribute('viewBox');
            if (!viewBox) {
                viewBox = `0 0 ${width} ${height}`;
                svgElement.setAttribute('viewBox', viewBox);
            }
            
            // 转换为字符串
            const serializer = new XMLSerializer();
            const svgString = serializer.serializeToString(svgElement);
            
            return {
                svg: svgString,
                width: width,
                height: height,
                element: svgElement
            };
            
        } catch (e) {
            console.error('[MathJax] 渲染错误:', e);
            return null;
        }
    }
    
    // 根据对齐方式计算绘制位置
    function calculateDrawPosition(align, x, y, width, height, centerX, centerY) {
        switch (align) {
            case 'left':
                return {
                    x: centerX + x,
                    y: centerY - y - height / 2
                };
            case 'right':
                return {
                    x: centerX + x - width,
                    y: centerY - y - height / 2
                };
            case 'top':
                return {
                    x: centerX + x - width / 2,
                    y: centerY - y
                };
            case 'bottom':
                return {
                    x: centerX + x - width / 2,
                    y: centerY - y - height
                };
            case 'top-left':
                return {
                    x: centerX + x,
                    y: centerY - y
                };
            case 'top-right':
                return {
                    x: centerX + x - width,
                    y: centerY - y
                };
            case 'bottom-left':
                return {
                    x: centerX + x,
                    y: centerY - y - height
                };
            case 'bottom-right':
                return {
                    x: centerX + x - width,
                    y: centerY - y - height
                };
            case 'center':
            default:
                return {
                    x: centerX + x - width / 2,
                    y: centerY - y - height / 2
                };
        }
    }
    
    BN.regMethod('mathjax_render', async (params, uuid, uuid2, utils) => {
        try {
            // 等待MathJax加载
            await waitForMathJax();
            
            var actor = get_stage_target(uuid2);
            if (!actor) return;
            
            const brush = actor.get_brush();
            if (!brush.ctx) return;
            
            // 获取参数
            const x = parseFloat(params.X) || 0;
            const y = parseFloat(params.Y) || 0;
            const formula = params.FORMULA || 'E = mc^2';
            const fontSize = parseFloat(params.SIZE) || 24;
            const color = params.COLOR || '#000000';
            const align = params.ALIGN || 'center';
            
            // 创建缓存key
            const cacheKey = `${formula}_${fontSize}_${color}`;
            
            // 检查缓存
            if (!formulaCache.has(cacheKey)) {
                const result = renderFormulaToSVG(formula, fontSize, color);
                if (result) {
                    formulaCache.set(cacheKey, result);
                } else {
                    throw new Error('MathJax渲染失败');
                }
            }
            
            // 从缓存获取
            const cached = formulaCache.get(cacheKey);
            
            // 获取视图中心
            const view = brush.app.get_app().view;
            const center_x = view.width / 2;
            const center_y = view.height / 2;
            
            // 根据对齐方式计算位置
            const pos = calculateDrawPosition(align, x, y, cached.width, cached.height, center_x, center_y);
            
            // 清空区域
            brush.ctx.save();
            brush.ctx.clearRect(pos.x - 5, pos.y - 5, cached.width + 10, cached.height + 10);
            
            // 绘制SVG
            const img = new Image();
            await new Promise((resolve) => {
                img.onload = () => {
                    brush.ctx.drawImage(
                        img,
                        pos.x,
                        pos.y,
                        cached.width,
                        cached.height
                    );
                    resolve();
                };
                img.onerror = () => {
                    console.warn('[MathJax] SVG加载失败');
                    // 降级到文本
                    brush.ctx.font = `${fontSize}px 'Times New Roman', serif`;
                    brush.ctx.fillStyle = color;
                    brush.ctx.textBaseline = 'middle';
                    brush.ctx.textAlign = 'center';
                    brush.ctx.fillText(formula, center_x + x, center_y - y);
                    resolve();
                };
                img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(cached.svg);
            });
            
            brush.ctx.restore();
            actor.parent_scene.should_update_brush();
            
        } catch (error) {
            console.error('[MathJax] 渲染失败:', error);
            
            // 降级方案
            try {
                var actor = get_stage_target(uuid2);
                if (!actor) return;
                
                const brush = actor.get_brush();
                const view = brush.app.get_app().view;
                const center_x = view.width / 2;
                const center_y = view.height / 2;
                const x = parseFloat(params.X) || 0;
                const y = parseFloat(params.Y) || 0;
                const fontSize = parseFloat(params.SIZE) || 24;
                const formula = params.FORMULA || 'E = mc^2';
                
                brush.ctx.save();
                brush.ctx.font = `${fontSize}px monospace`;
                brush.ctx.fillStyle = '#ff0000';
                brush.ctx.textBaseline = 'middle';
                brush.ctx.textAlign = 'center';
                brush.ctx.fillText('公式错误', center_x + x, center_y - y);
                brush.ctx.restore();
                
                actor.parent_scene.should_update_brush();
            } catch (e) {}
        }
    });
    
})();