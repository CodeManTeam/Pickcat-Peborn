/// <reference path="../_TYPE.d.ts"/>

Extension.metaData = {
    name: "MC 皮肤头像",
    version: "1.1.0",
    description: "从 Minecraft 皮肤 PNG 链接截取头部（自动识别 16/32/64 尺寸），返回 DataURL",
    author: "砂墨&Deepseek",
    docs: ""
};

(async () => {
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;

    await BN.waitBlocklyLoaded();

    BN.regColor("MC_SKIN_HUE", "#44B37F", "#2D7A56");

    const mcSkinBlocks = [
        {
            type: "mc_skin_head",
            message0: "获取 MC 皮肤头像 %1",
            args0: [
                { type: "input_value", name: "URL", check: "String", value: "https://example.com/skin.png" }
            ],
            output: "String",
            colour: "%{BKY_MC_SKIN_HUE}"
        }
    ].map(block => ({ ...block, colour: "%{BKY_MC_SKIN_HUE}" }));

    await BN.waitBlockLoaded();
    BN.regBlocks(mcSkinBlocks);

    const mcSkinXML = [
        Toolbox.title("MC皮肤头像"),
        Toolbox.block("mc_skin_head"),
        Toolbox.flyout_bottom()
    ];

    BN.regIcon(`<symbol id="icon-mc-skin" viewBox="-1500 -1500 4000 4000"><path d="M185.173333 103.424h653.653334a81.706667 81.706667 0 0 1 81.749333 81.706667v653.738666a81.706667 81.706667 0 0 1-81.749333 81.706667H185.173333a81.706667 81.706667 0 0 1-81.749333-81.749333V185.173333A81.706667 81.706667 0 0 1 185.173333 103.381333m81.749334 163.413334v163.456h163.413333V512H348.586667v245.12h81.706666V675.413333h163.413334v81.706667h81.706666V512h-81.706666v-81.706667h163.413333v-163.413333h-163.413333v163.413333h-163.413334v-163.413333z" p-id="7960"></path></symbol>`);

    BN.addToolbox("mc-skin", "icon-mc-skin", "#44B37F", mcSkinXML);

    await BN.waitRunmgrLoaded();

    // 辅助函数：加载图片
    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    // 根据皮肤尺寸计算截取坐标
    function getSkinCoordinates(skinSize) {
        // 标准 Minecraft 皮肤布局：
        // - 头部区域始终在 (8,8) 位置，尺寸为 8×8（相对于 64×64）
        // - 外层头在 (40,8) 位置，尺寸为 8×8（相对于 64×64）
        // 对于不同尺寸的皮肤，坐标按比例缩放
        
        // 基础尺寸 64 时的坐标
        const baseSize = 64;
        const baseHeadX = 8, baseHeadY = 8, baseHeadSize = 8;
        const baseOverlayX = 40, baseOverlayY = 8;
        
        // 计算缩放比例
        const scale = skinSize / baseSize;
        
        return {
            head: {
                x: Math.round(baseHeadX * scale),
                y: Math.round(baseHeadY * scale),
                size: Math.round(baseHeadSize * scale)
            },
            overlay: {
                x: Math.round(baseOverlayX * scale),
                y: Math.round(baseOverlayY * scale),
                size: Math.round(baseHeadSize * scale)
            }
        };
    }

    // 核心：从皮肤截取头部
    async function skinToHeadDataURL(skinUrl) {
        try {
            const img = await loadImage(skinUrl);
            
            // 检查图片尺寸
            const width = img.width;
            const height = img.height;
            
            // 支持的尺寸：必须是正方形，且为 16、32、64 之一
            const supportedSizes = [16, 32, 64];
            if (width !== height || !supportedSizes.includes(width)) {
                BN.error('MC皮肤', `不支持的尺寸: ${width}x${height}，仅支持 16x16、32x32、64x64`);
                return '';
            }

            const skinSize = width;
            
            // 获取截取坐标
            const coords = getSkinCoordinates(skinSize);
            
            // 创建 36×36 画布（输出固定尺寸）
            const canvas = document.createElement('canvas');
            canvas.width = 36;
            canvas.height = 36;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false; // 保持像素风

            // 1. 内层头，缩放到 32×32，居中
            const offset = (36 - 32) / 2; // 2px
            ctx.drawImage(
                img, 
                coords.head.x, coords.head.y, coords.head.size, coords.head.size,
                offset, offset, 32, 32
            );

            // 2. 外层头，缩放到 36×36，覆盖全画布
            ctx.drawImage(
                img,
                coords.overlay.x, coords.overlay.y, coords.overlay.size, coords.overlay.size,
                0, 0, 36, 36
            );

            return canvas.toDataURL('image/png');
        } catch (error) {
            BN.error('MC皮肤', `处理失败: ${error.message}`);
            return '';
        }
    }

    // 积木解释器
    BN.regMethod('mc_skin_head', async (params, uuid, uuid2, utils) => {
        const url = params.URL || '';
        if (!url) {
            BN.error('MC皮肤', 'URL 不能为空');
            return '';
        }
        return await skinToHeadDataURL(url);
    });

    BN.log('MC皮肤', '扩展已加载');
})();