/// <reference path="../_TYPE.d.ts"/>
Extension.metaData = {
    name: "AI对话 · Ottama",
    version: "0.2.0",
    description: "与OpenAI兼容的AI模型聊天扩展，支持流式对话、多轮对话、代码生成等高级功能",
    author: "cika",
    docs: ""
};

(async () => {
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;
    
    // --------------------------------积木-------------------------------
    await BN.waitBlocklyLoaded();
    
    // 注册颜色
    BN.regColor("OTTAMA_HUE", "#4A90E2", "#2c6bc1");
    
    const ottamaBlocks = [
        // 配置
        // 配置API密钥
        {
            type: "ottama_set_apikey",
            message0: "配置API密钥 %1",
            args0: [
                {
                    type: "input_value",
                    name: "API_KEY",
                    check: "String",
                    value: ""
                }
            ],
            ...Block.methodBlock
        },

        // 设置全局提示词
        {
            type: "ottama_set_system_prompt",
            message0: "设置全局提示词 %1",
            args0: [
                {
                    type: "input_value",
                    name: "SYSTEM_PROMPT",
                    check: "String",
                    value: "你是一个有用的AI助手"
                }
            ],
            ...Block.methodBlock,
        },
        // 对话
        // 对话积木（简）
        {
            type: "ottama_chat",
            message0: "向 %1 （模型id %2）发送消息 %3 上下文 %4",
            args0: [
                {
                    type: "input_value",
                    name: "API_URL",
                    check: "String",
                    value: "https://api.deepseek.com/v1/chat/completions"
                },
                {
                    type: "input_value",
                    name: "MODEL_ID",
                    check: "String",
                    value: "deepseek-chat"
                },
                {
                    type: "input_value",
                    name: "MESSAGE",
                    check: "String",
                    value: "你好"
                },
                {
                    type: "input_value",
                    name: "CONTEXT",
                    check: "String",
                    value: "[{\"role\":\"user\",\"content\":\"解方程2x-2=0\"},{\"role\":\"assistant\",\"content\":\"x=1\"}]",
                }
            ],
            output: "String",
        },
        // 对话积木（全）
        {
            type: "ottama_chat_advanced",
            message0: "向 %1 （模型id %2）发送消息 %3 温度 %4 最大令牌数 %5 上下文 %6",
            args0: [
                {
                    type: "input_value",
                    name: "API_URL",
                    check: "String",
                    value: "https://api.deepseek.com/v1/chat/completions"
                },
                {
                    type: "input_value",
                    name: "MODEL_ID",
                    check: "String",
                    value: "deepseek-chat"
                },
                {
                    type: "input_value",
                    name: "MESSAGE",
                    check: "String",
                    value: "你好",
                },
                {
                    type: "input_value",
                    name: "TEMPERATURE",    
                    check: "Number",
                    value: 0.7,
                },
                {
                    type: "input_value",
                    name: "MAX_TOKENS",     
                    check: "Number",
                    value: 2048,
                },
                {
                    type: "input_value",
                    name: "CONTEXT",
                    check: "String",
                    value: "[{\"role\":\"user\",\"content\":\"解方程2x-2=0\"},{\"role\":\"assistant\",\"content\":\"x=1\"}]",
                }
            ],
            output: "String",
        },
        // 预设
        {
            type: "ottama_agent_generate_code",
            message0: "代码生成 语言 %1 需求 %2 （API地址 %3 ，模型id %4）",
            args0: [
                {
                    type: "field_dropdown",
                    name: "LANGUAGE",
                    options: [
                        ["Python", "python"],
                        ["JavaScript", "javascript"],
                        ["HTML", "html"],
                        ["CSS", "css"],
                        ["Java", "java"],
                        ["C++", "cpp"],
                        ["TypeScript", "typescript"]
                    ]
                },
                {
                    type: "input_value",
                    name: "REQUIREMENT",
                    check: "String",
                    value: "写一个简单的Hello World程序"
                },
                {
                    type: "input_value",
                    name: "API_URL",
                    check: "String",
                    value: "https://api.deepseek.com/v1/chat/completions"
                },
                {
                    type: "input_value",
                    name: "MODEL_ID",
                    check: "String",
                    value: "deepseek-chat"
                }
            ],
            output: "String",
        },
        // 工具
        {
            type: "ottama_count_tokens",
            message0: "估算Token数量 %1",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                    check: "String",
                    value: ""
                }
            ],
            output: "Number",
        },
        {
            type: "ottama_build_context_part",
            message0: "构建上下文片段 角色 %1 内容 %2",
            args0: [
                {
                    type: "field_dropdown",
                    name: "ROLE",
                    options: [
                        ["system", "system"],
                        ["user", "user"],
                        ["assistant", "assistant"]
                    ]
                },
                {
                    type: "input_value",
                    name: "CONTENT",
                    check: "String",
                    value: ""
                }
            ],
            output: "String",
        }
    ].map(block => {return { ...block, colour: "%{OTTAMA_HUE}" };});;
    await BN.waitBlockLoaded();
    BN.regBlocks(ottamaBlocks);
    // --------------------------------积木盒-------------------------------
    const ottamaXML = [
        Toolbox.title("配置"),
        Toolbox.block("ottama_set_apikey"),
        Toolbox.block("ottama_set_system_prompt"),
        Toolbox.title("对话"),
        Toolbox.block("ottama_chat"),
        Toolbox.block("ottama_chat_advanced"),
        Toolbox.title("预设"),
        Toolbox.block("ottama_agent_generate_code"),
        Toolbox.title("工具"),
        Toolbox.block("ottama_count_tokens"),
        Toolbox.block("ottama_build_context_part"),

        Toolbox.flyout_bottom(),
    ];
    BN.regIcon(`<symbol id="icon-ottama" viewBox="-1430 -1625 4250 4250"><path d="M1342.38540614 109.08164852c-12.94676356-6.47485468-18.53640721 5.86654827-26.09973268 12.13814317-2.57756953 2.02376031-4.77807747 4.65435413-6.9785854 7.08168819-18.91788751 20.63528526-41.02017805 34.19182812-69.92725219 32.57311445-42.23384508-2.42733405-78.29772513 11.12773591-110.16384908 44.10589701-6.77679853-40.66668282-29.28560862-64.94444203-63.55255448-80.5232723-17.95608583-8.09209545-36.06388005-16.1856638-48.63358202-33.78825438-8.74900746-12.5431898-11.12773591-26.50330641-15.52727889-40.26016326-2.7823022-8.29535522-5.56460442-16.79249731-14.92044537-18.20942412-10.19244639-1.61871367-14.16337637 7.08168818-18.15934561 14.36516325-15.93232553 29.74073376-22.12880269 62.51710799-21.49692993 95.69705596 1.36684831 74.65672404 32.27117059 134.13819156 93.62469003 176.42358804 6.9800583 4.8546681 8.77551959 9.71080912 6.57501167 16.7910244-4.17271686 14.56695011-9.18056624 28.7303265-13.55506996 43.29727663-2.78377509 9.30723537-6.95501906 11.32952278-16.74241882 7.28347506-33.66158524-14.36516325-62.745407-35.60875491-88.46513227-61.30196805-43.62425973-43.09548975-83.0772755-90.64060097-132.26613965-127.86659668a581.67054343 581.67054343 0 0 0-35.07703915-24.481019c-50.20074429-49.77065841 6.57501167-90.63912807 19.72650787-95.49526908 13.73181759-5.05792788 4.77955037-22.4572587-39.65480261-22.25547183s-85.07599655 15.3770434-136.87041529 35.60875492c-7.58541892 3.03416756-15.55379103 5.25971475-23.69596497 7.08168819-47.03990759-9.10544849-95.84876434-11.12773591-146.85960188-5.26118764-96.02551195 10.92594905-172.73103555 57.25739323-229.12678414 136.36373875-67.72674425 95.09022244-83.68558192 203.13015422-64.13582166 315.82149433 20.48504978 118.76262107 79.88992666 217.09027084 171.13736116 293.9710692 94.6350973 79.71317902 203.61031862 118.76262107 327.93607115 111.27735912 75.51542292-4.45256725 159.57953934-14.77020989 254.41642352-96.71040901 23.92426399 12.13961607 49.03715574 16.99575708 90.66564022 20.63675815 32.09295007 3.03416756 62.97223311-1.61871367 86.87145787-6.67664152 37.45429471-8.09209545 34.84874013-43.49906349 21.3187094-49.97244528-109.7838417-52.19946535-85.68283009-30.95587367-107.58333375-48.15194474 55.78891504-67.37324899 139.85303146-137.3770918 172.73103558-364.17669887 2.60408167-18.00616433 0.40357375-29.33568711 0-43.90263723-0.20325977-8.90218873 1.76894914-12.34287584 11.75960868-13.3532831 27.49014733-3.23742733 54.19671351-10.92594905 78.70277175-24.68280587 71.11440706-39.65480265 99.81822142-104.80250446 106.59649285-182.89844271 1.01188015-11.9363563-0.20178686-24.27775924-12.56970195-30.54935415M722.55357749 811.94067418c-106.36966673-85.37941333-157.98733782-113.5014334-179.30604723-112.28776638-19.92829476 1.21366703-16.33737217 24.48101902-11.96286845 39.65480263 4.5777635 14.97199677 10.57098089 25.2896394 18.94145388 38.44113563 5.76786417 8.70040186 9.76383341 21.64863831-5.78995764 31.35944742-34.26841876 21.64863831-93.82647692-7.28347506-96.60730623-8.69892897-69.3454579-41.67856295-127.33635378-96.710409-168.17978423-171.97249367-39.45154288-72.43117687-62.33888747-150.1220685-66.13306982-233.07267484-1.01188015-20.02992464 4.77955037-27.11161282 24.27923215-30.75408683a235.19659216 235.19659216 0 0 1 77.91771776-2.0222874c108.59668681 16.18713669 201.05631542 65.75453531 278.54394725 144.25552022 44.23256614 44.71125762 77.69089163 98.12439001 112.18613649 150.32385536 36.64567431 55.43394691 76.0986901 108.24024576 126.2994344 151.53604948 17.72778682 15.17378365 31.86465106 26.7065662 45.41972101 35.20370828-40.84343042 4.65435413-108.99878765 5.66476139-155.60860934-31.96628093m51.00936468-334.83953884c0-8.90218873 6.9815312-15.98387693 15.75557788-15.98387693q2.98408908 0.05155138 5.36134465 1.01188016a15.85720779 15.85720779 0 0 1 10.16740716 14.97199677 15.78061715 15.78061715 0 0 1-15.73053865 15.98387692 15.60386953 15.60386953 0 0 1-15.55379104-15.98387692m158.39238445 82.95060636c-10.1423679 4.24930749-20.30830215 7.89178146-30.09570189 8.29535522-15.12370514 0.81009328-31.66286419-5.46150162-40.61513143-13.15002333-13.96011661-11.93782919-23.92573689-18.61447073-28.09845373-39.45301577-1.79546129-8.90218873-0.81009328-22.65904557 0.78505404-30.54935414 3.59092258-16.99575708-0.40504665-27.92023321-12.13961607-37.8343021-9.55910075-8.09356835-21.72522894-10.31911553-35.07703915-10.31911553-4.98281013 0-9.55910075-2.22407429-12.94823646-4.04604772a13.27669246 13.27669246 0 0 1-5.76639126-18.61299785c1.39041466-2.8323807 8.16868608-9.71228202 9.76236049-10.92594903 18.13136058-10.52090241 39.04649623-7.08021529 58.36795747 0.81009328 17.93104659 7.48526194 31.46107731 21.24359167 51.01083759 40.66668278 19.92829476 23.46913885 23.51921733 29.94399353 34.84874012 47.54511124 8.97877936 13.75685685 17.14746545 27.92023321 22.71206985 44.1044241 3.41270206 10.11732865-0.98684091 18.41121097-12.74644957 23.46913885"/></symbol>`);
    BN.addToolbox("ottama", "icon-ottama", "#4A90E2", ottamaXML);
    // ---------------------------解释器-------------------------------------
    // 等待Runmgr加载完毕
    await BN.waitRunmgrLoaded();
    
    // 存储全局配置
    let globalApiKey = "";
    let globalSystemPrompt = "你是一个有用的AI助手";
    
    
    // 配置API密钥积木解释器
    BN.regMethod('ottama_set_apikey', (params, _, __, ___) => {
        try {
            const apiKey = params.API_KEY || "";
            if (typeof apiKey === 'string' && apiKey.trim() !== "") {
                globalApiKey = apiKey.trim();
                BN.log('ottama', 'API密钥已配置');
                return true;
            } else {
                BN.error('ottama', 'API密钥不能为空');
                return false;
            }
        } catch (error) {
            BN.error('ottama', `配置API密钥失败: ${error.message}`);
            return false;
        }
    });
    

    
    // 设置系统提示词积木解释器
    BN.regMethod('ottama_set_system_prompt', (params, _, __, ___) => {
        try {
            const systemPrompt = params.SYSTEM_PROMPT || "你是一个有用的AI助手";
            if (typeof systemPrompt === 'string') {
                globalSystemPrompt = systemPrompt;
                BN.log('ottama', '系统提示词已设置');
                return true;
            } else {
                BN.error('ottama', '系统提示词必须是字符串');
                return false;
            }
        } catch (error) {
            BN.error('ottama', `设置系统提示词失败: ${error.message}`);
            return false;
        }
    });
    
    // 估算Token数量积木解释器
    BN.regMethod('ottama_count_tokens', (params, _, __, ___) => {
        try {
            const text = params.TEXT || "";
            if (typeof text !== 'string') {
                BN.error('ottama', '文本必须是字符串');
                return 0;
            }
            
            const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
            const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;
            const otherChars = text.length - chineseChars - englishWords * 2.6;
            
            const estimatedTokens = Math.ceil(chineseChars * 1.5 + englishWords * 0.75 + otherChars);
            return estimatedTokens;
        } catch (error) {
            BN.error('ottama', `估算Token数量失败: ${error.message}`);
            return 0;
        }
    });
    
    // 对话积木（简）解释器
    BN.regMethod('ottama_chat', async (params, _, __, ___) => {
        try {
            const apiUrl = params.API_URL || "";
            const modelId = params.MODEL_ID || "";
            const message = params.MESSAGE || "";
            let context = [];

            
            // 解析上下文
            try {
                if (params.CONTEXT && typeof params.CONTEXT === 'string') {
                    context = JSON.parse("[" + params.CONTEXT + "]");
                    if (!Array.isArray(context)) {
                        BN.error('ottama', '上下文格式错误，应为数组');
                        context = [];
                    }
                }
            } catch (e) {
                BN.error('ottama', '上下文解析失败');
                context = [];
            }
            
            // 验证参数
            if (!apiUrl || !modelId || !message) {
                BN.error('ottama', 'API URL、模型ID和消息不能为空');
                return "参数错误";
            }
            
            if (!globalApiKey) {
                BN.error('ottama', '请先配置API密钥');
                return "请先配置API密钥";
            }
            
            // 构建请求体
            const messages = [
                { role: "system", content: globalSystemPrompt },
                ...context,
                { role: "user", content: message }
            ];
            
            const requestBody = {
                model: modelId,
                messages: messages,
                temperature: 0.7,
                max_tokens: 2048,
                stream: false
            };
            
            // 发送请求
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalApiKey}`
                },
                body: JSON.stringify(requestBody)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP错误: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (data.choices && data.choices.length > 0 && data.choices[0].message) {
                return data.choices[0].message.content;
            } else {
                BN.error('ottama', 'API响应格式错误');
                return "API响应格式错误";
            }
        } catch (error) {
            BN.error('ottama', `对话请求失败: ${error.message}`);
            return `对话请求失败: ${error.message}`;
        }
    });
    
    // 对话积木（全）解释器
    BN.regMethod('ottama_chat_advanced', async (params, _, __, ___) => {
        try {
            const apiUrl = params.API_URL || "";
            const modelId = params.MODEL_ID || "";
            const message = params.MESSAGE || "";
            const temperature = parseFloat(params.TEMPERATURE) || 0.7;
            const maxTokens = parseInt(params.MAX_TOKENS) || 2048;
            let context = [];
            
            // 解析上下文
            try {
                if (params.CONTEXT && typeof params.CONTEXT === 'string') {
                    context = JSON.parse("[" + params.CONTEXT + "]");
                    if (!Array.isArray(context)) {
                        BN.error('ottama', '上下文格式错误，应为数组');
                        context = [];
                    }
                }
            } catch (e) {
                BN.error('ottama', '上下文解析失败');
                context = [];
            }
            
            // 验证参数
            if (!apiUrl || !modelId || !message) {
                BN.error('ottama', 'API URL、模型ID和消息不能为空');
                return "参数错误";
            }
            
            if (!globalApiKey) {
                BN.error('ottama', '请先配置API密钥');
                return "请先配置API密钥";
            }
            
            // 验证温度和最大令牌数
            if (temperature < 0 || temperature > 2) {
                BN.error('ottama', '温度参数应在0-2之间');
                return "温度参数应在0-2之间";
            }
            
            if (maxTokens < 1 || maxTokens > 4096) {
                BN.error('ottama', '最大令牌数应在1-4096之间');
                return "最大令牌数应在1-4096之间";
            }


            
            // 构建请求体
            const messages = [
                { role: "system", content: globalSystemPrompt },
                ...context,
                { role: "user", content: message }
            ];
            
            const requestBody = {
                model: modelId,
                messages: messages,
                temperature: temperature,
                max_tokens: maxTokens,
                stream: false
            };
            
            // 发送请求
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalApiKey}`
                },
                body: JSON.stringify(requestBody)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP错误: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (data.choices && data.choices.length > 0 && data.choices[0].message) {
                return data.choices[0].message.content;
            } else {
                BN.error('ottama', 'API响应格式错误');
                return "API响应格式错误";
            }
        } catch (error) {
            BN.error('ottama', `对话请求失败: ${error.message}`);
            return `对话请求失败: ${error.message}`;
        }
    });
    
    // 预设：代码生成积木解释器
    BN.regMethod('ottama_agent_generate_code', async (params, _, __, ___) => {
        try {
            const language = params.LANGUAGE || "python";
            const requirement = params.REQUIREMENT || "";
            
            // 验证参数
            if (!requirement) {
                BN.error('ottama', '代码需求不能为空');
                return "代码需求不能为空";
            }
            
            if (!globalApiKey) {
                BN.error('ottama', '请先配置API密钥');
                return "请先配置API密钥";
            }
            
            // 构建代码生成的系统提示
            const codePrompt = `你是专业 ${language} 程序员，严格遵循该语言的编码规范与最佳实践。请根据用户需求生成高质量、高效、可读性强的 ${language} 代码，关键逻辑添加清晰注释。输出要求：仅返回可直接使用的代码本身，禁止任何多余文字、解释、说明、标题或格式说明。`;
            
            // 构建请求体
            const requestBody = {
                model: params.MODEL_ID || "deepseek-chat", // 默认模型，用户可以通过高级对话积木自定义
                messages: [
                    { role: "system", content: codePrompt },
                    { role: "user", content: requirement }
                ],
                temperature: 0.2, // 代码生成使用较低的温度以保证一致性
                max_tokens: 2048,
                stream: false
            };
            
            // 发送请求到用户指定的API URL或默认的Deepseek API
            const response = await fetch(params.API_URL || 'https://api.deepseek.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${globalApiKey}`
                },
                body: JSON.stringify(requestBody)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP错误: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (data.choices && data.choices.length > 0 && data.choices[0].message) {
                return data.choices[0].message.content;
            } else {
                BN.error('ottama', 'API响应格式错误');
                return "API响应格式错误";
            }
        } catch (error) {
            BN.error('ottama', `代码生成请求失败: ${error.message}`);
            return `代码生成请求失败: ${error.message}`;
        }
    });
    BN.regMethod('ottama_build_context_part', async (params, _, __, ___) => {
        const role = params.ROLE || "user";
        const content = params.CONTENT || "";
        return JSON.stringify({ role: role, content: content });
    });
})();