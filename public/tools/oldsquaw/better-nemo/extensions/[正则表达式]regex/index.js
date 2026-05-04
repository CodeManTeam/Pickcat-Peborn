/// <reference path="../_TYPE.d.ts"/>

Extension.metaData = {
    name: "正则表达式工具",
    version: "1.0.0",
    description: "正则表达式测试、学习、常用预设",
    author: "砂墨&Deepseek",
    docs: ""
};

(async () => {
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;
    
    await BN.waitBlocklyLoaded();
    
    // 注册颜色 - 使用紫色系，看起来专业
    BN.regColor("REGEX_HUE", "#9C27B0", "#7B1FA2");
    
    const regexBlocks = [
        // ========== 基础测试 ==========
        {
            type: "regex_test",
            message0: "正则 %1 测试文本 %2 选项 %3",
            args0: [
                {
                    type: "input_value",
                    name: "PATTERN",
                    check: "String",
                    value: "\\d+"
                },
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: "abc123def456"
                },
                {
                    type: "input_value",
                    name: "FLAGS",
                    check: "String",
                    value: "g"
                }
            ],
            output: "String",  // 返回匹配结果JSON
            colour: "%{BKY_REGEX_HUE}"
        },
        
        {
            type: "regex_match_count",
            message0: "正则 %1 匹配次数 %2",
            args0: [
                {
                    type: "input_value",
                    name: "PATTERN",
                    check: "String",
                    value: ""
                },
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: ""
                }
            ],
            output: "Number",
            colour: "%{BKY_REGEX_HUE}"
        },
        
        {
            type: "regex_is_match",
            message0: "正则 %1 是否匹配 %2",
            args0: [
                {
                    type: "input_value",
                    name: "PATTERN",
                    check: "String",
                    value: ""
                },
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: ""
                }
            ],
            output: "Boolean",
            colour: "%{BKY_REGEX_HUE}"
        },
        
        // ========== 提取操作 ==========
        {
            type: "regex_extract",
            message0: "提取 %1 中的 %2 组号 %3",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: "姓名:张三,年龄:18"
                },
                {
                    type: "input_value",
                    name: "PATTERN",
                    check: "String",
                    value: "姓名:(\\w+),年龄:(\\d+)"
                },
                {
                    type: "input_value",
                    name: "GROUP",
                    check: "Number",
                    value: 1
                }
            ],
            output: "String",
            colour: "%{BKY_REGEX_HUE}"
        },
        
        {
            type: "regex_extract_all",
            message0: "提取所有 %1 中的 %2",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: "姓名:张三,年龄:18"
                },
                {
                    type: "input_value",
                    name: "PATTERN",
                    check: "String",
                    value: "姓名"
                }
            ],
            output: "String",  // 返回JSON数组
            colour: "%{BKY_REGEX_HUE}"
        },
        
        // ========== 替换操作 ==========
        {
            type: "regex_replace",
            message0: "替换 %1 中 %2 为 %3",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: "Hello 123 World"
                },
                {
                    type: "input_value",
                    name: "PATTERN",
                    check: "String",
                    value: "\\d+"
                },
                {
                    type: "input_value",
                    name: "REPLACEMENT",
                    check: "String",
                    value: "***"
                }
            ],
            output: "String",
            colour: "%{BKY_REGEX_HUE}"
        },
        
        {
            type: "regex_replace_with_ref",
            message0: "高级替换 %1 中 %2 为 %3 使用反向引用",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: "2024-01-01"
                },
                {
                    type: "input_value",
                    name: "PATTERN",
                    check: "String",
                    value: "(\\d{4})-(\\d{2})-(\\d{2})"
                },
                {
                    type: "input_value",
                    name: "REPLACEMENT",
                    check: "String",
                    value: "$3/$2/$1"
                }
            ],
            output: "String",
            colour: "%{BKY_REGEX_HUE}"
        },
        
        // ========== 分割操作 ==========
        {
            type: "regex_split",
            message0: "分割 %1 按 %2",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: "a,b,c;d e"
                },
                {
                    type: "input_value",
                    name: "PATTERN",
                    check: "String",
                    value: "[,;\\s]+"
                }
            ],
            output: "String",  // 返回JSON数组
            colour: "%{BKY_REGEX_HUE}"
        },
        
        // ========== 常用预设 ==========
        {
            type: "regex_preset",
            message0: "常用正则 %1",
            args0: [
                {
                    type: "field_dropdown",
                    name: "PRESET",
                    options: [
                        ["邮箱", "email"],
                        ["手机号（中国大陆）", "phone_cn"],
                        ["URL", "url"],
                        ["IP地址", "ip"],
                        ["IPv6地址", "ipv6"],
                        ["日期 YYYY-MM-DD", "date"],
                        ["时间 HH:MM:SS", "time"],
                        ["中文汉字", "chinese"],
                        ["英文字母", "english"],
                        ["数字", "number"],
                        ["正整数", "positive_int"],
                        ["负整数", "negative_int"],
                        ["浮点数", "float"],
                        ["HTML标签", "html_tag"],
                        ["身份证号（中国大陆）", "id_card"],
                        ["邮政编码", "postcode"],
                        ["QQ号", "qq"],
                        ["微信号", "wechat"],
                        ["车牌号（中国大陆）", "license_plate"],
                        ["颜色 HEX", "color_hex"]
                    ]
                }
            ],
            output: "String",
            colour: "%{BKY_REGEX_HUE}"
        },
        
        // ========== 构建工具 ==========
        {
            type: "regex_builder",
            message0: "构建正则 %1",
            args0: [
                {
                    type: "input_value",
                    name: "PATTERN",
                    check: "String",
                    value: ""
                }
            ],
            output: "String",
            colour: "%{BKY_REGEX_HUE}"
        },
        
        {
            type: "regex_escape",
            message0: "转义特殊字符 %1",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: ".*+?^${}()|[]\\"
                }
            ],
            output: "String",
            colour: "%{BKY_REGEX_HUE}"
        },
        
        // ========== 验证器 ==========
        {
            type: "regex_validator",
            message0: "验证 %1 是否为 %2",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: ""
                },
                {
                    type: "field_dropdown",
                    name: "TYPE",
                    options: [
                        ["邮箱", "email"],
                        ["手机号", "phone"],
                        ["URL", "url"],
                        ["IP地址", "ip"],
                        ["纯数字", "digits"],
                        ["纯字母", "letters"]
                    ]
                }
            ],
            output: "Boolean",
            colour: "%{BKY_REGEX_HUE}"
        },
        
        // ========== 学习工具 ==========
        {
            type: "regex_explain",
            message0: "解释正则 %1",
            args0: [
                {
                    type: "input_value",
                    name: "PATTERN",
                    check: "String",
                    value: "^\\d{3,5}$"
                }
            ],
            output: "String",
            colour: "%{BKY_REGEX_HUE}"
        }
    ].map(block => ({ ...block, colour: "%{BKY_REGEX_HUE}" }));
    
    await BN.waitBlockLoaded();
    BN.regBlocks(regexBlocks);
    
    // --------------------------------积木盒-------------------------------
    const regexXML = [
        Toolbox.title("正则表达式 · Regex"),
        
        Toolbox.line("🔍 测试匹配"),
        Toolbox.block("regex_test"),
        Toolbox.block("regex_match_count"),
        Toolbox.block("regex_is_match"),
        
        Toolbox.line("📤 提取数据"),
        Toolbox.block("regex_extract"),
        Toolbox.block("regex_extract_all"),
        
        Toolbox.line("✏️ 替换操作"),
        Toolbox.block("regex_replace"),
        Toolbox.block("regex_replace_with_ref"),
        
        Toolbox.line("✂️ 分割"),
        Toolbox.block("regex_split"),
        
        Toolbox.line("📚 常用预设"),
        Toolbox.block("regex_preset"),
        
        Toolbox.line("🔨 构建工具"),
        Toolbox.block("regex_builder"),
        Toolbox.block("regex_escape"),
        
        Toolbox.line("✅ 验证器"),
        Toolbox.block("regex_validator"),
        
        Toolbox.line("📖 学习工具"),
        Toolbox.block("regex_explain"),
        
        Toolbox.flyout_bottom()
    ];
    
    // 注册图标
    BN.regIcon(`<symbol id="icon-regex" viewBox="-1500 -1500 4000 4000">
        <path d="M136 836.928c0-32.896 25.088-60.608 58.112-60.608 34.304 0 59.392 27.776 59.392 60.608 0 35.712-25.088 59.456-59.392 59.456-36.992-1.344-58.112-26.432-58.112-59.456zM903.808 398.336l-214.912 42.112 150.336 188.032-92.928 64-120.64-207.744L503.68 692.48l-92.992-64 149.568-188.032-216.32-42.112 37.76-104.576 204.8 78.464-19.648-237.44h116.928l-20.352 237.44 204.8-78.464 35.584 104.576z" p-id="1607"></path>
    </symbol>`);
    
    BN.addToolbox("regex", "icon-regex", "#9C27B0", regexXML);
    
    // ---------------------------解释器-------------------------------------
    await BN.waitRunmgrLoaded();
    
    // 常用正则预设库
    const REGEX_PRESETS = {
        // 邮箱
        email: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        // 中国大陆手机号
        phone_cn: "^1[3-9]\\d{9}$",
        // URL
        url: "^(https?|ftp)://[^\\s/$.?#].[^\\s]*$",
        // IP地址
        ip: "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
        // IPv6
        ipv6: "^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$",
        // 日期 YYYY-MM-DD
        date: "^\\d{4}-\\d{2}-\\d{2}$",
        // 时间 HH:MM:SS
        time: "^([01]\\d|2[0-3]):([0-5]\\d):([0-5]\\d)$",
        // 中文汉字
        chinese: "^[\\u4e00-\\u9fa5]+$",
        // 英文字母
        english: "^[A-Za-z]+$",
        // 数字
        number: "^-?\\d+(\\.\\d+)?$",
        // 正整数
        positive_int: "^[1-9]\\d*$",
        // 负整数
        negative_int: "^-[1-9]\\d*$",
        // 浮点数
        float: "^-?\\d+(\\.\\d+)?$",
        // HTML标签
        html_tag: "^<([a-z]+)([^<]+)*(?:>(.*)<\\/\\1>|\\s+\\/>)$",
        // 中国大陆身份证（18位）
        id_card: "^[1-9]\\d{5}(18|19|20)\\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])\\d{3}[0-9Xx]$",
        // 邮政编码
        postcode: "^[1-9]\\d{5}$",
        // QQ号
        qq: "^[1-9][0-9]{4,10}$",
        // 微信号（字母开头，6-20位）
        wechat: "^[a-zA-Z][a-zA-Z0-9_-]{5,19}$",
        // 中国大陆车牌号
        license_plate: "^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{5}$",
        // 颜色HEX
        color_hex: "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
    };
    
    // 获取常用正则
    BN.regMethod('regex_preset', (params) => {
        const preset = params.PRESET || 'email';
        return REGEX_PRESETS[preset] || '';
    });
    
    // 测试正则
    BN.regMethod('regex_test', (params) => {
        try {
            const pattern = params.PATTERN || '';
            const text = params.TEXT || '';
            const flags = params.FLAGS || 'g';
            
            const regex = new RegExp(pattern, flags);
            const matches = [];
            let match;
            
            // 重置lastIndex（对于g标志）
            regex.lastIndex = 0;
            
            if (flags.includes('g')) {
                while ((match = regex.exec(text)) !== null) {
                    matches.push({
                        full: match[0],
                        index: match.index,
                        groups: match.slice(1),
                        named: match.groups || {}
                    });
                }
            } else {
                match = regex.exec(text);
                if (match) {
                    matches.push({
                        full: match[0],
                        index: match.index,
                        groups: match.slice(1),
                        named: match.groups || {}
                    });
                }
            }
            
            return JSON.stringify({
                count: matches.length,
                matches: matches,
                pattern: pattern,
                flags: flags
            }, null, 2);
        } catch (error) {
            return JSON.stringify({
                error: error.message,
                pattern: params.PATTERN
            });
        }
    });
    
    // 匹配次数
    BN.regMethod('regex_match_count', (params) => {
        try {
            const pattern = params.PATTERN || '';
            const text = params.TEXT || '';
            
            const regex = new RegExp(pattern, 'g');
            const matches = text.match(regex);
            
            return matches ? matches.length : 0;
        } catch (error) {
            BN.error('regex', `匹配次数失败: ${error.message}`);
            return 0;
        }
    });
    
    // 是否匹配
    BN.regMethod('regex_is_match', (params) => {
        try {
            const pattern = params.PATTERN || '';
            const text = params.TEXT || '';
            
            const regex = new RegExp(pattern);
            return regex.test(text);
        } catch (error) {
            BN.error('regex', `匹配测试失败: ${error.message}`);
            return false;
        }
    });
    
    // 提取指定组
    BN.regMethod('regex_extract', (params) => {
        try {
            const text = params.TEXT || '';
            const pattern = params.PATTERN || '';
            const group = parseInt(params.GROUP) || 0;
            
            const regex = new RegExp(pattern);
            const match = text.match(regex);
            
            if (match && match.length > group) {
                return match[group] || '';
            }
            
            return '';
        } catch (error) {
            BN.error('regex', `提取失败: ${error.message}`);
            return '';
        }
    });
    
    // 提取所有
    BN.regMethod('regex_extract_all', (params) => {
        try {
            const text = params.TEXT || '';
            const pattern = params.PATTERN || '';
            
            const regex = new RegExp(pattern, 'g');
            const matches = text.match(regex);
            
            return JSON.stringify(matches || []);
        } catch (error) {
            BN.error('regex', `提取所有失败: ${error.message}`);
            return '[]';
        }
    });
    
    // 替换
    BN.regMethod('regex_replace', (params) => {
        try {
            const text = params.TEXT || '';
            const pattern = params.PATTERN || '';
            const replacement = params.REPLACEMENT || '';
            
            const regex = new RegExp(pattern, 'g');
            return text.replace(regex, replacement);
        } catch (error) {
            BN.error('regex', `替换失败: ${error.message}`);
            return text;
        }
    });
    
    // 高级替换（支持反向引用）
    BN.regMethod('regex_replace_with_ref', (params) => {
        try {
            const text = params.TEXT || '';
            const pattern = params.PATTERN || '';
            const replacement = params.REPLACEMENT || '';
            
            const regex = new RegExp(pattern, 'g');
            return text.replace(regex, replacement);
        } catch (error) {
            BN.error('regex', `高级替换失败: ${error.message}`);
            return text;
        }
    });
    
    // 分割
    BN.regMethod('regex_split', (params) => {
        try {
            const text = params.TEXT || '';
            const pattern = params.PATTERN || '';
            
            const regex = new RegExp(pattern);
            const parts = text.split(regex);
            
            return JSON.stringify(parts);
        } catch (error) {
            BN.error('regex', `分割失败: ${error.message}`);
            return JSON.stringify([text]);
        }
    });
    
    // 构建正则
    BN.regMethod('regex_builder', (params) => {
        return params.PATTERN || '';
    });
    
    // 转义特殊字符
    BN.regMethod('regex_escape', (params) => {
        const text = params.TEXT || '';
        // 转义正则特殊字符
        return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    });
    
    // 验证器
    BN.regMethod('regex_validator', (params) => {
        try {
            const text = params.TEXT || '';
            const type = params.TYPE || 'email';
            
            let pattern;
            switch(type) {
                case 'email':
                    pattern = REGEX_PRESETS.email;
                    break;
                case 'phone':
                    pattern = REGEX_PRESETS.phone_cn;
                    break;
                case 'url':
                    pattern = REGEX_PRESETS.url;
                    break;
                case 'ip':
                    pattern = REGEX_PRESETS.ip;
                    break;
                case 'digits':
                    pattern = '^\\d+$';
                    break;
                case 'letters':
                    pattern = '^[A-Za-z]+$';
                    break;
                default:
                    return false;
            }
            
            const regex = new RegExp(pattern);
            return regex.test(text);
        } catch (error) {
            BN.error('regex', `验证失败: ${error.message}`);
            return false;
        }
    });
    
    // 解释正则（简易版）
    BN.regMethod('regex_explain', (params) => {
        const pattern = params.PATTERN || '';
        
        const explanations = [];
        
        // 简单的解释规则
        if (pattern.includes('\\d')) explanations.push('\\d: 匹配数字 [0-9]');
        if (pattern.includes('\\w')) explanations.push('\\w: 匹配字母、数字、下划线 [a-zA-Z0-9_]');
        if (pattern.includes('\\s')) explanations.push('\\s: 匹配空白字符');
        if (pattern.includes('.')) explanations.push('. : 匹配除换行外的任意字符');
        if (pattern.includes('^')) explanations.push('^ : 匹配开头');
        if (pattern.includes('$')) explanations.push('$ : 匹配结尾');
        if (pattern.includes('*')) explanations.push('* : 重复0次或多次');
        if (pattern.includes('+')) explanations.push('+ : 重复1次或多次');
        if (pattern.includes('?')) explanations.push('? : 重复0次或1次');
        if (pattern.includes('{')) {
            const matches = pattern.match(/\{(\d+)(?:,(\d*))?\}/);
            if (matches) {
                if (matches[2] === '') {
                    explanations.push(`{${matches[1]},}: 至少重复${matches[1]}次`);
                } else if (matches[2]) {
                    explanations.push(`{${matches[1]},${matches[2]}}: 重复${matches[1]}到${matches[2]}次`);
                } else {
                    explanations.push(`{${matches[1]}}: 重复${matches[1]}次`);
                }
            }
        }
        if (pattern.includes('|')) explanations.push('| : 或运算');
        if (pattern.includes('(')) explanations.push('( ) : 捕获分组');
        if (pattern.includes('(?:')) explanations.push('(?: ): 非捕获分组');
        if (pattern.includes('(?=')) explanations.push('(?= ): 正向先行断言');
        if (pattern.includes('(?!')) explanations.push('(?! ): 负向先行断言');
        
        if (explanations.length === 0) {
            return '无法解释该正则表达式（太简单或太复杂）';
        }
        
        return '正则解释:\n' + explanations.join('\n');
    });
    
    BN.log('regex', '正则表达式工具已加载');
})();