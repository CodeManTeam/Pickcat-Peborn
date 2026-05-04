/// <reference path="../_TYPE.d.ts"/>

Extension.metaData = {
    name: "掘隧•Tunnelor",
    version: "1.0.0",
    description: "多隧道联机扩展，支持ngrok/pinggy/portmap等中转服务",
    author: "砂墨&Deepseek",
    docs: ""
};

(async () => {
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;
    
    await BN.waitBlocklyLoaded();
    
    BN.regColor("TUNNELOR_HUE", "#9C27B0", "#6A1B9A");
    
    const tunnelorBlocks = [
        // ========== 隧道管理 ==========
        {
            type: "tunnelor_add",
            message0: "添加隧道 %1 类型 %2 地址 %3",
            args0: [
                { type: "input_value", name: "ID", check: "String", value: "tunnel1" },
                { 
                    type: "field_dropdown", 
                    name: "TYPE", 
                    options: [
                        ["ngrok", "ngrok"],
                        ["pinggy", "pinggy"],
                        ["portmap.io", "portmap"],
                        ["localtunnel", "localtunnel"],
                        ["自定义WebSocket", "custom"]
                    ]
                },
                { type: "input_value", name: "ADDR", check: "String", value: "wss://abc123.ngrok.io" }
            ],
            output: "Boolean",
            colour: "%{TUNNELOR_HUE}"
        },
        
        {
            type: "tunnelor_remove",
            message0: "移除隧道 %1",
            args0: [
                { type: "input_value", name: "ID", check: "String", value: "" }
            ],
            ...Block.methodBlock,
            colour: "%{TUNNELOR_HUE}"
        },
        
        // ========== 连接模式 ==========
        {
            type: "tunnelor_mode",
            message0: "设置连接模式 %1",
            args0: [
                { 
                    type: "field_dropdown", 
                    name: "MODE", 
                    options: [
                        ["首次可用", "first"],
                        ["主备切换", "failover"],
                        ["负载均衡", "balance"],
                        ["广播所有", "broadcast"]
                    ],
                    value: "first"
                }
            ],
            ...Block.methodBlock,
            colour: "%{TUNNELOR_HUE}"
        },
        
        {
            type: "tunnelor_set_primary",
            message0: "设置主隧道 %1 备用 %2",
            args0: [
                { type: "input_value", name: "PRIMARY", check: "String", value: "" },
                { type: "input_value", name: "BACKUP", check: "String", value: "" }
            ],
            ...Block.methodBlock,
            colour: "%{TUNNELOR_HUE}"
        },
        
        // ========== 数据发送 ==========
        {
            type: "tunnelor_send",
            message0: "发送数据 %1 到 %2",
            args0: [
                { type: "input_value", name: "DATA", check: "String", value: "" },
                { type: "input_value", name: "TUNNEL_ID", check: "String", value: "" }
            ],
            output: "Boolean",
            colour: "%{TUNNELOR_HUE}"
        },
        
        {
            type: "tunnelor_send_all",
            message0: "广播数据 %1 到所有隧道",
            args0: [
                { type: "input_value", name: "DATA", check: "String", value: "" }
            ],
            output: "Boolean",
            colour: "%{TUNNELOR_HUE}"
        },
        
        // ========== 消息检测 ==========
        {
            type: "tunnelor_has_message",
            message0: "隧道 %1 是否有新消息",
            args0: [
                { type: "input_value", name: "TUNNEL_ID", check: "String", value: "" }
            ],
            output: "Boolean",
            colour: "%{TUNNELOR_HUE}"
        },
        
        {
            type: "tunnelor_any_message",
            message0: "任何隧道是否有新消息",
            args0: [],
            output: "Boolean",
            colour: "%{TUNNELOR_HUE}"
        },
        
        // ========== 消息获取 ==========
        {
            type: "tunnelor_get_message",
            message0: "获取隧道 %1 的最新消息",
            args0: [
                { type: "input_value", name: "TUNNEL_ID", check: "String", value: "" }
            ],
            output: "String",
            colour: "%{TUNNELOR_HUE}"
        },
        
        {
            type: "tunnelor_get_next",
            message0: "获取隧道 %1 的下一条消息（消费）",
            args0: [
                { type: "input_value", name: "TUNNEL_ID", check: "String", value: "" }
            ],
            output: "String",
            colour: "%{TUNNELOR_HUE}"
        },
        
        {
            type: "tunnelor_get_all",
            message0: "获取隧道 %1 的所有消息",
            args0: [
                { type: "input_value", name: "TUNNEL_ID", check: "String", value: "" }
            ],
            output: "String",
            colour: "%{TUNNELOR_HUE}"
        },
        
        {
            type: "tunnelor_message_from",
            message0: "最新消息的来源隧道",
            args0: [],
            output: "String",
            colour: "%{TUNNELOR_HUE}"
        },
        
        // ========== 消息队列管理 ==========
        {
            type: "tunnelor_clear",
            message0: "清空隧道 %1 的消息队列",
            args0: [
                { type: "input_value", name: "ID", check: "String", value: "" }
            ],
            ...Block.methodBlock,
            colour: "%{TUNNELOR_HUE}"
        },
        
        {
            type: "tunnelor_clear_all",
            message0: "清空所有隧道消息队列",
            args0: [],
            ...Block.methodBlock,
            colour: "%{TUNNELOR_HUE}"
        },
        
        // ========== 状态查询 ==========
        {
            type: "tunnelor_list",
            message0: "获取所有隧道列表",
            args0: [],
            output: "String",
            colour: "%{TUNNELOR_HUE}"
        },
        
        {
            type: "tunnelor_status",
            message0: "隧道 %1 是否已连接",
            args0: [
                { type: "input_value", name: "ID", check: "String", value: "" }
            ],
            output: "Boolean",
            colour: "%{TUNNELOR_HUE}"
        },
        
        {
            type: "tunnelor_count",
            message0: "获取已连接隧道数量",
            args0: [],
            output: "Number",
            colour: "%{TUNNELOR_HUE}"
        },
        
        {
            type: "tunnelor_latency",
            message0: "测试隧道 %1 延迟（毫秒）",
            args0: [
                { type: "input_value", name: "ID", check: "String", value: "" }
            ],
            output: "Number",
            colour: "%{TUNNELOR_HUE}"
        },
        
        // ========== 工具 ==========
        {
            type: "tunnelor_parse",
            message0: "解析JSON %1 获取 %2",
            args0: [
                { type: "input_value", name: "JSON", check: "String", value: "{}" },
                { type: "input_value", name: "KEY", check: "String", value: "data" }
            ],
            output: "String",
            colour: "%{TUNNELOR_HUE}"
        }
    ].map(block => ({ ...block, colour: "%{TUNNELOR_HUE}" }));

    await BN.waitBlockLoaded();
    BN.regBlocks(tunnelorBlocks);

    // 工具箱
    const tunnelorXML = [
        Toolbox.title("🕳️ 掘隧·Tunnelor"),
        
        Toolbox.line("隧道管理"),
        Toolbox.block("tunnelor_add"),
        Toolbox.block("tunnelor_remove"),
        Toolbox.block("tunnelor_list"),
        Toolbox.block("tunnelor_status"),
        Toolbox.block("tunnelor_count"),
        
        Toolbox.line("连接模式"),
        Toolbox.block("tunnelor_mode"),
        Toolbox.block("tunnelor_set_primary"),
        
        Toolbox.line("数据传输"),
        Toolbox.block("tunnelor_send"),
        Toolbox.block("tunnelor_send_all"),
        
        Toolbox.line("消息检测"),
        Toolbox.block("tunnelor_has_message"),
        Toolbox.block("tunnelor_any_message"),
        
        Toolbox.line("消息获取"),
        Toolbox.block("tunnelor_get_message"),
        Toolbox.block("tunnelor_get_next"),
        Toolbox.block("tunnelor_get_all"),
        Toolbox.block("tunnelor_message_from"),
        
        Toolbox.line("队列管理"),
        Toolbox.block("tunnelor_clear"),
        Toolbox.block("tunnelor_clear_all"),
        
        Toolbox.line("诊断工具"),
        Toolbox.block("tunnelor_latency"),
        Toolbox.block("tunnelor_parse"),
        
        Toolbox.flyout_bottom()
    ];

    BN.regIcon(`<symbol id="icon-tunnelor" viewBox="-25.5 -25.5 75 75">
        <circle cx="6" cy="12" r="3" stroke="white" stroke-width="1.5" fill="none"/>
        <circle cx="12" cy="6" r="3" stroke="white" stroke-width="1.5" fill="none"/>
        <circle cx="18" cy="12" r="3" stroke="white" stroke-width="1.5" fill="none"/>
        <circle cx="12" cy="18" r="3" stroke="white" stroke-width="1.5" fill="none"/>
        <path d="M6 12 L12 6 L18 12 L12 18 Z" stroke="white" stroke-width="1.5" fill="none" stroke-dasharray="3 2"/>
        <circle cx="12" cy="12" r="1" fill="white"/>
    </symbol>`);

    BN.addToolbox("tunnelor", "icon-tunnelor", "#9C27B0", tunnelorXML);

    await BN.waitRunmgrLoaded();

    // ========== 解释器 ==========
    
    // 隧道存储
    const tunnels = new Map(); // id -> { ws, type, addr, status, messageQueue }
    let currentMode = 'first';
    let primaryTunnel = null;
    let backupTunnel = null;
    let lastMessageFrom = '';
    
    // 添加隧道
    BN.regMethod('tunnelor_add', (params, uuid, uuid2, utils) => {
        const id = params.ID || '';
        const type = params.TYPE || 'ngrok';
        const addr = params.ADDR || '';
        
        if (!id || !addr) return false;
        if (tunnels.has(id)) return false;
        
        try {
            const ws = new WebSocket(addr);
            const messageQueue = [];
            
            ws.onopen = () => {
                const tunnel = tunnels.get(id);
                if (tunnel) tunnel.status = 'connected';
            };
            
            ws.onmessage = (e) => {
                const tunnel = tunnels.get(id);
                if (tunnel) {
                    tunnel.messageQueue.push({
                        data: e.data,
                        time: Date.now()
                    });
                    if (tunnel.messageQueue.length > 100) {
                        tunnel.messageQueue.shift();
                    }
                }
                lastMessageFrom = id;
            };
            
            ws.onerror = () => {
                const tunnel = tunnels.get(id);
                if (tunnel) tunnel.status = 'error';
            };
            
            ws.onclose = () => {
                const tunnel = tunnels.get(id);
                if (tunnel) tunnel.status = 'closed';
            };
            
            tunnels.set(id, {
                ws,
                type,
                addr,
                status: 'connecting',
                messageQueue,
                lastActive: Date.now()
            });
            
            return true;
        } catch (e) {
            return false;
        }
    });

    // 移除隧道
    BN.regMethod('tunnelor_remove', (params, uuid, uuid2, utils) => {
        const id = params.ID || '';
        const tunnel = tunnels.get(id);
        if (tunnel && tunnel.ws) {
            tunnel.ws.close();
            tunnels.delete(id);
            return true;
        }
        return false;
    });

    // 设置连接模式
    BN.regMethod('tunnelor_mode', (params, uuid, uuid2, utils) => {
        currentMode = params.MODE || 'first';
    });

    // 设置主备隧道
    BN.regMethod('tunnelor_set_primary', (params, uuid, uuid2, utils) => {
        primaryTunnel = params.PRIMARY || null;
        backupTunnel = params.BACKUP || null;
    });

    // 选择隧道
    function selectTunnel(preferredId = '') {
        if (preferredId && tunnels.has(preferredId)) {
            const t = tunnels.get(preferredId);
            if (t.status === 'connected') return preferredId;
        }
        
        const connected = Array.from(tunnels.entries())
            .filter(([id, t]) => t.status === 'connected')
            .map(([id]) => id);
        
        if (connected.length === 0) return null;
        
        switch(currentMode) {
            case 'first':
                return connected[0];
            case 'balance':
                const index = Math.floor(Math.random() * connected.length);
                return connected[index];
            case 'broadcast':
                return 'ALL';
            case 'failover':
                if (primaryTunnel && tunnels.get(primaryTunnel)?.status === 'connected') {
                    return primaryTunnel;
                }
                return backupTunnel || connected[0];
            default:
                return connected[0];
        }
    }

    // 发送数据
    BN.regMethod('tunnelor_send', (params, uuid, uuid2, utils) => {
        const data = params.DATA || '';
        const preferredId = params.TUNNEL_ID || '';
        
        const targetId = selectTunnel(preferredId);
        
        if (targetId === 'ALL') {
            let success = false;
            for (const [id, tunnel] of tunnels) {
                if (tunnel.status === 'connected') {
                    try {
                        tunnel.ws.send(data);
                        success = true;
                    } catch (e) {}
                }
            }
            return success;
        }
        
        if (!targetId) return false;
        
        const tunnel = tunnels.get(targetId);
        if (!tunnel || tunnel.status !== 'connected') return false;
        
        try {
            tunnel.ws.send(data);
            return true;
        } catch (e) {
            return false;
        }
    });

    // 广播到所有
    BN.regMethod('tunnelor_send_all', (params, uuid, uuid2, utils) => {
        const data = params.DATA || '';
        let success = false;
        
        for (const [id, tunnel] of tunnels) {
            if (tunnel.status === 'connected') {
                try {
                    tunnel.ws.send(data);
                    success = true;
                } catch (e) {}
            }
        }
        
        return success;
    });

    // 消息检测
    BN.regMethod('tunnelor_has_message', (params, uuid, uuid2, utils) => {
        const id = params.TUNNEL_ID || '';
        const tunnel = tunnels.get(id);
        return tunnel ? tunnel.messageQueue.length > 0 : false;
    });

    BN.regMethod('tunnelor_any_message', (params, uuid, uuid2, utils) => {
        for (const [id, tunnel] of tunnels) {
            if (tunnel.messageQueue.length > 0) return true;
        }
        return false;
    });

    // 消息获取
    BN.regMethod('tunnelor_get_message', (params, uuid, uuid2, utils) => {
        const id = params.TUNNEL_ID || '';
        const tunnel = tunnels.get(id);
        if (tunnel && tunnel.messageQueue.length > 0) {
            return tunnel.messageQueue[tunnel.messageQueue.length - 1].data;
        }
        return '';
    });

    BN.regMethod('tunnelor_get_next', (params, uuid, uuid2, utils) => {
        const id = params.TUNNEL_ID || '';
        const tunnel = tunnels.get(id);
        if (tunnel && tunnel.messageQueue.length > 0) {
            const msg = tunnel.messageQueue.shift();
            return msg.data;
        }
        return '';
    });

    BN.regMethod('tunnelor_get_all', (params, uuid, uuid2, utils) => {
        const id = params.TUNNEL_ID || '';
        const tunnel = tunnels.get(id);
        if (tunnel && tunnel.messageQueue.length > 0) {
            const messages = tunnel.messageQueue.map(m => m.data);
            return JSON.stringify(messages);
        }
        return '[]';
    });

    BN.regMethod('tunnelor_message_from', (params, uuid, uuid2, utils) => {
        return lastMessageFrom;
    });

    // 消息队列管理
    BN.regMethod('tunnelor_clear', (params, uuid, uuid2, utils) => {
        const id = params.ID || '';
        const tunnel = tunnels.get(id);
        if (tunnel) {
            tunnel.messageQueue = [];
            return true;
        }
        return false;
    });

    BN.regMethod('tunnelor_clear_all', (params, uuid, uuid2, utils) => {
        for (const [id, tunnel] of tunnels) {
            tunnel.messageQueue = [];
        }
    });

    // 状态查询
    BN.regMethod('tunnelor_list', (params, uuid, uuid2, utils) => {
        const list = [];
        for (const [id, tunnel] of tunnels) {
            list.push({
                id,
                type: tunnel.type,
                addr: tunnel.addr,
                status: tunnel.status,
                msgCount: tunnel.messageQueue.length
            });
        }
        return JSON.stringify(list, null, 2);
    });

    BN.regMethod('tunnelor_status', (params, uuid, uuid2, utils) => {
        const id = params.ID || '';
        const tunnel = tunnels.get(id);
        return tunnel ? tunnel.status === 'connected' : false;
    });

    BN.regMethod('tunnelor_count', (params, uuid, uuid2, utils) => {
        let count = 0;
        for (const [id, tunnel] of tunnels) {
            if (tunnel.status === 'connected') count++;
        }
        return count;
    });

    BN.regMethod('tunnelor_latency', async (params, uuid, uuid2, utils) => {
        const id = params.ID || '';
        const tunnel = tunnels.get(id);
        if (!tunnel || tunnel.status !== 'connected') return -1;
        
        const start = Date.now();
        return new Promise((resolve) => {
            const pingMsg = JSON.stringify({ type: 'ping', time: start });
            
            const handler = (e) => {
                try {
                    const data = JSON.parse(e.data);
                    if (data.type === 'pong') {
                        tunnel.ws.removeEventListener('message', handler);
                        resolve(Date.now() - start);
                    }
                } catch (e) {}
            };
            
            tunnel.ws.addEventListener('message', handler);
            tunnel.ws.send(pingMsg);
            
            setTimeout(() => {
                tunnel.ws.removeEventListener('message', handler);
                resolve(-1);
            }, 3000);
        });
    });

    // 工具
    BN.regMethod('tunnelor_parse', (params, uuid, uuid2, utils) => {
        const jsonStr = params.JSON || '{}';
        const key = params.KEY || '';
        
        try {
            const obj = JSON.parse(jsonStr);
            const parts = key.split('.');
            let current = obj;
            
            for (const part of parts) {
                if (current === undefined || current === null) return '';
                current = current[part];
            }
            
            return current !== undefined ? String(current) : '';
        } catch (e) {
            return '';
        }
    });

    BN.log('Tunnelor', '掘隧·Tunnelor 扩展已加载');
})();