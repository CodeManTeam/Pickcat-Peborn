/// <reference path="../_TYPE.d.ts"/>

Extension.metaData = {
    name: "点猫查询",
    version: "1.0.0",
    description: "根据训练者编号查询用户信息、作品数、粉丝数等",
    author: "砂墨&Deepseek",
    docs: ""
};

(async () => {
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;

    await BN.waitBlocklyLoaded();

    BN.regColor("CODEMAO_USER_HUE", "#FF6B6B", "#C92A2A");

    const userBlocks = [
        // ========== 基础信息 ==========
        {
            type: "codemao_user_info",
            message0: "查询训练者 %1 的信息",
            args0: [
                { type: "input_value", name: "USER_ID", check: ["String", "Number"], value: "123456" }
            ],
            output: "String",
            colour: "%{BKY_CODEMAO_USER_HUE}"
        },
        
        // ========== 字段提取（合并版） ==========
        {
            type: "codemao_user_field",
            message0: "获取用户 %1 的 %2",
            args0: [
                { type: "input_value", name: "USER_ID", check: ["String", "Number"], value: "123456" },
                {
                    type: "field_dropdown",
                    name: "FIELD",
                    options: [
                        ["昵称", "nickname"],
                        ["头像URL", "avatar_url"],
                        ["简介", "user_description"],
                        ["积木数", "block_total"],
                        ["被浏览", "view_times"],
                        ["点赞数", "liked_total"],
                        ["粉丝数", "fans_total"],
                        ["等级", "author_level"],
                        ["创作宣言", "doing"],
                        ["用户ID", "user_id"]
                    ],
                    value: "nickname"
                }
            ],
            output: ["String", "Number"],
            colour: "%{BKY_CODEMAO_USER_HUE}"
        },
        
        // ========== 批量获取（返回JSON） ==========
        {
            type: "codemao_user_batch",
            message0: "批量获取用户 %1 的字段 %2",
            args0: [
                { type: "input_value", name: "USER_ID", check: ["String", "Number"], value: "123456" },
                { type: "input_value", name: "FIELDS", check: "String", value: "nickname,block_total,fans_total" }
            ],
            output: "String",
            colour: "%{BKY_CODEMAO_USER_HUE}"
        },
        
        // ========== 数值比较 ==========
        {
            type: "codemao_user_compare",
            message0: "用户 %1 的 %2 %3 %4",
            args0: [
                { type: "input_value", name: "USER_ID", check: ["String", "Number"], value: "123456" },
                {
                    type: "field_dropdown",
                    name: "FIELD",
                    options: [
                        ["积木数", "block_total"],
                        ["粉丝数", "fans_total"],
                        ["点赞数", "liked_total"],
                        ["被浏览", "view_times"],
                        ["等级", "author_level"]
                    ]
                },
                {
                    type: "field_dropdown",
                    name: "OPERATOR",
                    options: [
                        ["大于", "gt"],
                        ["大于等于", "gte"],
                        ["等于", "eq"],
                        ["小于", "lt"],
                        ["小于等于", "lte"]
                    ]
                },
                { type: "input_value", name: "VALUE", check: "Number", value: "1000" }
            ],
            output: "Boolean",
            colour: "%{BKY_CODEMAO_USER_HUE}"
        },
        
        // ========== 用户是否存在 ==========
        {
            type: "codemao_user_exists",
            message0: "训练者 %1 是否存在",
            args0: [
                { type: "input_value", name: "USER_ID", check: ["String", "Number"], value: "123456" }
            ],
            output: "Boolean",
            colour: "%{BKY_CODEMAO_USER_HUE}"
        },
        
        // ========== 从JSON提取 ==========
        {
            type: "codemao_parse_json",
            message0: "从JSON %1 获取 %2",
            args0: [
                { type: "input_value", name: "JSON", check: "String", value: "{}" },
                { type: "input_value", name: "PATH", check: "String", value: "nickname" }
            ],
            output: "String",
            colour: "%{BKY_CODEMAO_USER_HUE}"
        }
    ].map(block => ({ ...block, colour: "%{BKY_CODEMAO_USER_HUE}" }));

    await BN.waitBlockLoaded();
    BN.regBlocks(userBlocks);

    const userXML = [
        Toolbox.title("👤 点猫创作者查询"),
        
        Toolbox.line("基础查询"),
        Toolbox.block("codemao_user_info"),
        
        Toolbox.line("字段提取"),
        Toolbox.block("codemao_user_field"),
        Toolbox.block("codemao_user_batch"),
        
        Toolbox.line("条件判断"),
        Toolbox.block("codemao_user_compare"),
        Toolbox.block("codemao_user_exists"),
        
        Toolbox.line("工具"),
        Toolbox.block("codemao_parse_json"),
        
        Toolbox.flyout_bottom()
    ];

    BN.regIcon(`<symbol id="icon-codemao-user" viewBox="-1500 -1500 4000 4000"><path d="M626.24 559.04a262.72 262.72 0 1 0-242.56 0C96 631.04 82.56 955.2 82.56 960l64 1.92c0-14.4 14.72-352 358.4-352s371.52 339.2 372.48 353.6l64-4.48c-0.32-4.8-25.92-328-315.2-400z m-320-232.64a198.72 198.72 0 1 1 198.72 198.4 198.72 198.72 0 0 1-198.72-198.4z" p-id="6849"></path></symbol>`);

    BN.addToolbox("codemao-user", "icon-codemao-user", "#FF6B6B", userXML);

    await BN.waitRunmgrLoaded();

    // API 地址
    const API_BASE = "https://api.codemao.cn/creation-tools/v1/user/center/honor?user_id=";

    // 缓存（可选，避免重复请求）
    const userCache = new Map();

    // ========== 辅助函数：获取用户数据 ==========
    async function fetchUserData(userId) {
        if (!userId) return null;
        
        // 检查缓存
        if (userCache.has(userId)) {
            return userCache.get(userId);
        }
        
        try {
            const response = await fetch(API_BASE + userId);
            if (!response.ok) {
                if (response.status === 404) return null;
                throw new Error(`HTTP ${response.status}`);
            }
            const data = await response.json();
            userCache.set(userId, data);
            return data;
        } catch (error) {
            BN.error('Codemao', `查询失败: ${error.message}`);
            return null;
        }
    }

    // ========== 查询完整信息 ==========
    BN.regMethod('codemao_user_info', async (params, uuid, uuid2, utils) => {
        const userId = String(params.USER_ID || '').trim();
        if (!userId) return JSON.stringify({ error: '用户ID不能为空' });
        
        const data = await fetchUserData(userId);
        if (!data) return JSON.stringify({ error: '用户不存在或查询失败' });
        
        return JSON.stringify(data, null, 2);
    });

    // ========== 获取单个字段 ==========
    BN.regMethod('codemao_user_field', async (params, uuid, uuid2, utils) => {
        const userId = String(params.USER_ID || '').trim();
        const field = params.FIELD || 'nickname';
        
        if (!userId) return '';
        
        const data = await fetchUserData(userId);
        if (!data) return '';
        
        const value = data[field];
        return value !== undefined ? String(value) : '';
    });

    // ========== 批量获取字段 ==========
    BN.regMethod('codemao_user_batch', async (params, uuid, uuid2, utils) => {
        const userId = String(params.USER_ID || '').trim();
        const fieldsStr = params.FIELDS || '';
        const fields = fieldsStr.split(',').map(f => f.trim()).filter(f => f);
        
        if (!userId || fields.length === 0) return '{}';
        
        const data = await fetchUserData(userId);
        if (!data) return '{}';
        
        const result = {};
        fields.forEach(field => {
            if (data[field] !== undefined) {
                result[field] = data[field];
            }
        });
        
        return JSON.stringify(result, null, 2);
    });

    // ========== 数值比较 ==========
    BN.regMethod('codemao_user_compare', async (params, uuid, uuid2, utils) => {
        const userId = String(params.USER_ID || '').trim();
        const field = params.FIELD || 'block_total';
        const operator = params.OPERATOR || 'gt';
        const value = parseFloat(params.VALUE) || 0;
        
        if (!userId) return false;
        
        const data = await fetchUserData(userId);
        if (!data) return false;
        
        const fieldValue = data[field];
        if (fieldValue === undefined) return false;
        
        switch(operator) {
            case 'gt': return fieldValue > value;
            case 'gte': return fieldValue >= value;
            case 'eq': return fieldValue == value;
            case 'lt': return fieldValue < value;
            case 'lte': return fieldValue <= value;
            default: return false;
        }
    });

    // ========== 用户是否存在 ==========
    BN.regMethod('codemao_user_exists', async (params, uuid, uuid2, utils) => {
        const userId = String(params.USER_ID || '').trim();
        if (!userId) return false;
        
        const data = await fetchUserData(userId);
        return data !== null;
    });

    // ========== 从JSON提取字段 ==========
    BN.regMethod('codemao_parse_json', (params, uuid, uuid2, utils) => {
        const jsonStr = params.JSON || '{}';
        const path = params.PATH || '';
        
        try {
            const obj = JSON.parse(jsonStr);
            
            // 支持点号路径，如 "data.nickname" 或直接 "nickname"
            const parts = path.split('.');
            let current = obj;
            
            for (const part of parts) {
                if (current === undefined || current === null) return '';
                current = current[part];
            }
            
            return current !== undefined ? String(current) : '';
        } catch (e) {
            BN.error('Codemao', `JSON解析失败: ${e.message}`);
            return '';
        }
    });

    BN.log('Codemao', '点猫查询扩展已加载');
})();