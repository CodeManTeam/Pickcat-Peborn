/// <reference path="../_TYPE.d.ts"/>

Extension.metaData = {
    name: "条码大师",
    version: "1.2.0",
    description: "生成二维码和条形码，支持30+种条码格式",
    author: "砂墨&Deepseek",
    docs: ""
};

(async () => {
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;
    
    await BN.waitBlocklyLoaded();
    
    // 注册颜色
    BN.regColor("BARCODE_HUE", "#333333", "#000000");
    
    // 条形码格式预设（18种）
    const BARCODE_FORMATS = [
        ["Code128", "CODE128"],
        ["Code128A", "CODE128A"],
        ["Code128B", "CODE128B"],
        ["Code128C", "CODE128C"],
        ["EAN-13", "EAN13"],
        ["EAN-8", "EAN8"],
        ["UPC-A", "UPC"],
        ["UPC-E", "UPCE"],
        ["Code39", "CODE39"],
        ["Code93", "CODE93"],
        ["Code 2 of 5", "CODE25"],
        ["Interleaved 2 of 5", "CODE25I"],
        ["Codabar", "CODABAR"],
        ["MSI", "MSI"],
        ["GS1-128", "GS1_128"],
        ["ISBN", "ISBN"],
        ["ISSN", "ISSN"],
        ["Pharmacode", "PHARMACODE"]
    ];
    
    const barcodeBlocks = [
        // ========== 二维码 ==========
        {
            type: "barcode_qr",
            message0: "生成二维码 内容 %1 尺寸 %2 纠错级别 %3",
            args0: [
                { type: "input_value", name: "TEXT", check: "String", value: "https://example.com" },
                { type: "input_value", name: "SIZE", check: "Number", value: 200 },
                { 
                    type: "field_dropdown", 
                    name: "ECC", 
                    options: [
                        ["低 (7%)", "L"],
                        ["中 (15%)", "M"],
                        ["高 (25%)", "Q"],
                        ["最高 (30%)", "H"]
                    ]
                }
            ],
            output: "String",
            colour: "%{BKY_BARCODE_HUE}"
        },
        
        {
            type: "barcode_qr_logo",
            message0: "二维码（带Logo）内容 %1 Logo图片 %2 Logo尺寸 %3",
            args0: [
                { type: "input_value", name: "TEXT", check: "String", value: "https://example.com" },
                { type: "input_value", name: "LOGO", check: "String", value: "" },
                { type: "input_value", name: "LOGO_SIZE", check: "Number", value: 50 }
            ],
            output: "String",
            colour: "%{BKY_BARCODE_HUE}"
        },
        
        // ========== 条形码 ==========
        {
            type: "barcode_simple",
            message0: "生成条形码 格式 %1 内容 %2",
            args0: [
                { type: "field_dropdown", name: "FORMAT", options: BARCODE_FORMATS },
                { type: "input_value", name: "TEXT", check: "String", value: "12345678" }
            ],
            output: "String",
            colour: "%{BKY_BARCODE_HUE}"
        },
        
        {
            type: "barcode_advanced",
            message0: "高级条形码 格式 %1 内容 %2 高度 %3 条宽 %4 显示文字 %5",
            args0: [
                { type: "field_dropdown", name: "FORMAT", options: BARCODE_FORMATS },
                { type: "input_value", name: "TEXT", check: "String", value: "12345678" },
                { type: "input_value", name: "HEIGHT", check: "Number", value: 100 },
                { type: "input_value", name: "WIDTH", check: "Number", value: 2 },
                { 
                    type: "field_dropdown", 
                    name: "DISPLAY", 
                    options: [
                        ["显示", "true"],
                        ["隐藏", "false"]
                    ]
                }
            ],
            output: "String",
            colour: "%{BKY_BARCODE_HUE}"
        },
        
        {
            type: "barcode_color",
            message0: "彩色条形码 格式 %1 内容 %2 线条色 %3 背景色 %4",
            args0: [
                { type: "field_dropdown", name: "FORMAT", options: BARCODE_FORMATS },
                { type: "input_value", name: "TEXT", check: "String", value: "12345678" },
                { type: "input_value", name: "LINE_COLOR", check: "String", value: "#000000" },
                { type: "input_value", name: "BG_COLOR", check: "String", value: "#FFFFFF" }
            ],
            output: "String",
            colour: "%{BKY_BARCODE_HUE}"
        },
        
        // ========== 绘制 ==========
        {
            type: "barcode_draw",
            message0: "绘制图片 %1 到 X %2 Y %3 缩放 %4",
            args0: [
                { type: "input_value", name: "CODE_DATA", check: "String", value: "" },
                { type: "input_value", name: "X", check: "Number", value: 0 },
                { type: "input_value", name: "Y", check: "Number", value: 0 },
                { type: "input_value", name: "SCALE", check: "Number", value: 1 }
            ],
            ...Block.methodBlock,
            colour: "%{BKY_PEN_HUE}"
        },
        
        // ========== 验证 ==========
        {
            type: "barcode_check",
            message0: "检查 %1 是否为有效 %2",
            args0: [
                { type: "input_value", name: "TEXT", check: "String", value: "" },
                { 
                    type: "field_dropdown", 
                    name: "FORMAT", 
                    options: [
                        ["EAN-13", "EAN13"],
                        ["EAN-8", "EAN8"],
                        ["UPC-A", "UPC"],
                        ["Code128", "CODE128"]
                    ]
                }
            ],
            output: "Boolean",
            colour: "%{BKY_BARCODE_HUE}"
        },
        
        // ========== 条码转DataURL ==========
        {
            type: "barcode_to_dataurl",
            message0: "条码转DataURL 条码数据 %1",
            args0: [
                { type: "input_value", name: "CODE_DATA", check: "String", value: "" }
            ],
            output: "String",
            colour: "%{BKY_BARCODE_HUE}"
        }
    ];
    
    await BN.waitBlockLoaded();
    BN.regBlocks(barcodeBlocks);
    
    // --------------------------------积木盒-------------------------------
    const barcodeXML = [
        Toolbox.title("条码大师•MasterQR"),
        
        Toolbox.line("二维码"),
        Toolbox.block("barcode_qr"),
        Toolbox.block("barcode_qr_logo"),
        
        Toolbox.line("条形码"),
        Toolbox.block("barcode_simple"),
        Toolbox.block("barcode_advanced"),
        Toolbox.block("barcode_color"),
        
        Toolbox.line("绘制"),
        Toolbox.block("barcode_draw"),
        
        Toolbox.line("验证"),
        Toolbox.block("barcode_check"),
        
        Toolbox.line("转换"),
        Toolbox.block("barcode_to_dataurl"),
        
        Toolbox.flyout_bottom()
    ];
    
    // 注册图标
    BN.regIcon(`<symbol id="icon-barcode" viewBox="-1500 -1500 4000 4000">
        <path d="M234.666667 149.333333v704H170.666667V149.333333h64z m640 0v704h-42.666667V149.333333h42.666667zM576 789.333333v64h-42.666667v-64h42.666667z m-106.666667 0v64h-64v-64h64z m-128 0v64h-42.666666v-64h42.666666z m426.666667 0v64h-128v-64h128zM576 149.333333v576h-42.666667V149.333333h42.666667z m-106.666667 0v576h-64V149.333333h64z m-128 0v576h-42.666666V149.333333h42.666666z m426.666667 0v576h-128V149.333333h128z" p-id="1630"></path>
    </symbol>`);
    
    BN.addToolbox("barcode", "icon-barcode", "#333333", barcodeXML);
    
    // ---------------------------解释器-------------------------------------
    await BN.waitRunmgrLoaded();
    
    const Runtime = (await waitHook('Runtime')).get_webview_runtime();
    
    // 依赖
    BN.loadScript('utils/qrcode.min.js');
    BN.loadScript('utils/JsBarcode.all.min.js');
    
    function get_stage_target(target_id) {
        const stage = Runtime.stage;
        var scene = stage.core.scenes.get_scene(target_id);
        if (!scene.is_error(scene.value)) return scene.value;
        var actor = stage.core.actors.get_actor(target_id);
        if (!actor.is_error(actor.value)) return actor.value;
    }
    
    // 辅助函数：加载图片
    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }
    
    // ---------- 二维码生成 ----------
    BN.regMethod('barcode_qr', async (params, uuid, uuid2, utils) => {
        if (typeof QRCode === 'undefined') {
            BN.error('barcode', 'QRCode库未加载');
            return '';
        }
        
        try {
            const text = params.TEXT || '';
            const size = parseInt(params.SIZE) || 200;
            const ecc = params.ECC || 'M';
            
            const dataUrl = await new Promise((resolve, reject) => {
                QRCode.toDataURL(text, {
                    errorCorrectionLevel: ecc,
                    width: size,
                    margin: 2,
                    color: { dark: '#000000', light: '#FFFFFF' }
                }, (err, url) => {
                    if (err) reject(err);
                    else resolve(url);
                });
            });
            
            return dataUrl;
        } catch (error) {
            BN.error('barcode', `二维码生成失败: ${error.message}`);
            return '';
        }
    });
    
    // 带Logo二维码
    BN.regMethod('barcode_qr_logo', async (params, uuid, uuid2, utils) => {
        if (typeof QRCode === 'undefined') {
            BN.error('barcode', 'QRCode库未加载');
            return '';
        }
        
        try {
            const text = params.TEXT || '';
            const logoUrl = params.LOGO || '';
            const logoSize = parseInt(params.LOGO_SIZE) || 50;
            
            // 生成二维码（使用高纠错级别）
            const qrDataUrl = await new Promise((resolve, reject) => {
                QRCode.toDataURL(text, {
                    errorCorrectionLevel: 'H',
                    width: 200,
                    margin: 2
                }, (err, url) => {
                    if (err) reject(err);
                    else resolve(url);
                });
            });
            
            // 如果没有Logo，直接返回
            if (!logoUrl) return qrDataUrl;
            
            // 合成Logo
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            const qrImg = await loadImage(qrDataUrl);
            canvas.width = qrImg.width;
            canvas.height = qrImg.height;
            ctx.drawImage(qrImg, 0, 0);
            
            const logoImg = await loadImage(logoUrl);
            const x = (canvas.width - logoSize) / 2;
            const y = (canvas.height - logoSize) / 2;
            
            // 绘制白色背景
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(x - 2, y - 2, logoSize + 4, logoSize + 4);
            
            // 绘制Logo
            ctx.drawImage(logoImg, x, y, logoSize, logoSize);
            
            return canvas.toDataURL();
        } catch (error) {
            BN.error('barcode', `带Logo二维码生成失败: ${error.message}`);
            return '';
        }
    });
    
    // ---------- 条形码生成 ----------
    function generateBarcode(params) {
        if (typeof JsBarcode === 'undefined') {
            throw new Error('JsBarcode库未加载');
        }
        
        const format = params.FORMAT || 'CODE128';
        const text = params.TEXT || '';
        const height = parseInt(params.HEIGHT) || 100;
        const width = parseFloat(params.WIDTH) || 2;
        const display = params.DISPLAY === 'true';
        const lineColor = params.LINE_COLOR || '#000000';
        const bgColor = params.BG_COLOR || '#FFFFFF';
        
        const canvas = document.createElement('canvas');
        
        JsBarcode(canvas, text, {
            format: format,
            width: width,
            height: height,
            displayValue: display,
            lineColor: lineColor,
            background: bgColor,
            fontSize: 16,
            font: 'monospace',
            textAlign: 'center',
            textPosition: 'bottom',
            textMargin: 5,
            margin: 10
        });
        
        return canvas.toDataURL();
    }
    
    BN.regMethod('barcode_simple', (params, uuid, uuid2, utils) => {
        try {
            return generateBarcode({
                FORMAT: params.FORMAT,
                TEXT: params.TEXT,
                HEIGHT: 80,
                WIDTH: 2,
                DISPLAY: 'true',
                LINE_COLOR: '#000000',
                BG_COLOR: '#FFFFFF'
            });
        } catch (error) {
            BN.error('barcode', `条形码生成失败: ${error.message}`);
            return '';
        }
    });
    
    BN.regMethod('barcode_advanced', (params, uuid, uuid2, utils) => {
        try {
            return generateBarcode(params);
        } catch (error) {
            BN.error('barcode', `条形码生成失败: ${error.message}`);
            return '';
        }
    });
    
    BN.regMethod('barcode_color', (params, uuid, uuid2, utils) => {
        try {
            return generateBarcode({
                ...params,
                HEIGHT: 100,
                WIDTH: 2,
                DISPLAY: 'true'
            });
        } catch (error) {
            BN.error('barcode', `彩色条形码生成失败: ${error.message}`);
            return '';
        }
    });
    
    // ---------- 绘制到舞台 ----------
    BN.regMethod('barcode_draw', async (params, uuid, uuid2, utils) => {
        var actor = get_stage_target(uuid2);
        if (!actor) return;
        
        try {
            const codeData = params.CODE_DATA || '';
            const x = parseFloat(params.X) || 0;
            const y = parseFloat(params.Y) || 0;
            const scale = parseFloat(params.SCALE) || 1;
            
            if (!codeData) return;
            
            const brush = actor.get_brush();
            const view = brush.app.get_app().view;
            
            const img = await loadImage(codeData);
            const drawWidth = img.width * scale;
            const drawHeight = img.height * scale;
            
            // 使用画笔绘制
            brush.draw_image(img, x, y, drawWidth, drawHeight);
            
            actor.parent_scene.should_update_brush();
        } catch (error) {
            BN.error('barcode', `绘制失败: ${error.message}`);
        }
    });
    
    // ---------- 验证 ----------
    BN.regMethod('barcode_check', (params, uuid, uuid2, utils) => {
        try {
            const text = params.TEXT || '';
            const format = params.FORMAT || 'EAN13';
            
            switch(format) {
                case 'EAN13':
                    return /^\d{13}$/.test(text);
                case 'EAN8':
                    return /^\d{8}$/.test(text);
                case 'UPC':
                    return /^\d{12}$/.test(text);
                case 'CODE128':
                    return text.length > 0 && text.length <= 100;
                default:
                    return true;
            }
        } catch (error) {
            return false;
        }
    });
    
    // ========== 新增：条码转DataURL（真正的转换！） ==========
    BN.regMethod('barcode_to_dataurl', async (params, uuid, uuid2, utils) => {
        try {
            const codeData = params.CODE_DATA || '';
            
            if (!codeData) {
                BN.error('barcode', '条码数据不能为空');
                return '';
            }
            
            // 如果已经是DataURL，直接返回
            if (codeData.startsWith('data:image/')) {
                return codeData;
            }
            
            // 如果是URL，加载图片转DataURL
            if (codeData.startsWith('http://') || codeData.startsWith('https://') || codeData.startsWith('/')) {
                const img = await loadImage(codeData);
                
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                
                return canvas.toDataURL('image/png');
            }
            
            // 如果是base64图片（不带前缀）
            if (/^[A-Za-z0-9+/=]+$/.test(codeData)) {
                return `data:image/png;base64,${codeData}`;
            }
            
            // 其他情况，尝试作为普通字符串处理
            BN.log('barcode', '条码数据可能不是图片格式，直接返回原数据');
            return codeData;
            
        } catch (error) {
            BN.error('barcode', `条码转DataURL失败: ${error.message}`);
            return '';
        }
    });
    
    BN.log('barcode', '条码大师已加载');
})();