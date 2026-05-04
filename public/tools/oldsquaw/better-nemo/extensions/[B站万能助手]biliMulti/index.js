/// <reference path="../_TYPE.d.ts"/>

Extension.metaData = {
    name: "B站万能助手",
    version: "1.0.0",
    description: "B站粉丝数、视频信息、直播状态查询",
    author: "10000why",
    docs: ""
};

// 代理服务
const PROXY = 'https://api.allorigins.win/raw?url=';

async function biliRequest(url) {
    try {
        const response = await fetch(PROXY + encodeURIComponent(url));
        if (!response.ok) throw new Error('网络错误');
        return await response.json();
    } catch (e) {
        BN.error('Bili', `请求失败: ${e.message}`);
        return null;
    }
}

(async () => {
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;
    
    await BN.waitBlocklyLoaded();
    
    BN.regColor("BILI_HUE", "#3B8BEE", "#2A6BC5");
    
    const biliBlocks = [
        // ========== 用户统计 ==========
        {
            type: "bili_fans",
            message0: "UID %1 的粉丝数",
            args0: [
                { type: "input_value", name: "UID", check: "String", value: "541080936" }
            ],
            output: ["String", "Number"],
            colour: "%{BILI_HUE}"
        },
        {
            type: "bili_following",
            message0: "UID %1 的关注数",
            args0: [
                { type: "input_value", name: "UID", check: "String", value: "541080936" }
            ],
            output: ["String", "Number"],
            colour: "%{BILI_HUE}"
        },
        {
            type: "bili_black",
            message0: "UID %1 的拉黑数",
            args0: [
                { type: "input_value", name: "UID", check: "String", value: "541080936" }
            ],
            output: ["String", "Number"],
            colour: "%{BILI_HUE}"
        },
        {
            type: "bili_video_count",
            message0: "UID %1 的投稿视频数",
            args0: [
                { type: "input_value", name: "UID", check: "String", value: "541080936" }
            ],
            output: ["String", "Number"],
            colour: "%{BILI_HUE}"
        },
        {
            type: "bili_likes",
            message0: "UID %1 历史获赞总量",
            args0: [
                { type: "input_value", name: "UID", check: "String", value: "541080936" }
            ],
            output: ["String", "Number"],
            colour: "%{BILI_HUE}"
        },
        
        // ========== 直播状态 ==========
        {
            type: "bili_is_live",
            message0: "UID %1 是否直播中",
            args0: [
                { type: "input_value", name: "UID", check: "String", value: "541080936" }
            ],
            output: "String", // 返回 "直播中" / "未直播" / "未开通直播间"
            colour: "%{BILI_HUE}"
        },
        {
            type: "bili_live_online",
            message0: "直播间 %1 在线人数",
            args0: [
                { type: "input_value", name: "ROOM", check: "String", value: "21452505" }
            ],
            output: ["String", "Number"],
            colour: "%{BILI_HUE}"
        },
        
        // ========== 视频信息 ==========
        {
            type: "bili_video_info",
            message0: "视频 %1 信息",
            args0: [
                { type: "input_value", name: "BVID", check: "String", value: "BV1arpEz2EcE" }
            ],
            output: "String",
            colour: "%{BILI_HUE}"
        },
        
        // ========== 热门评论 ==========
        {
            type: "bili_hot_comments",
            message0: "获取 %1 热评 %2 条 分隔符 %3",
            args0: [
                { type: "input_value", name: "BVID", check: "String", value: "BV1arpEz2EcE" },
                { 
                    type: "field_dropdown", 
                    name: "COUNT", 
                    options: [
                        ["1", "1"],
                        ["2", "2"],
                        ["3", "3"]
                    ],
                    value: "1"
                },
                { 
                    type: "field_dropdown", 
                    name: "SEP", 
                    options: [
                        ["换行", "\n"],
                        ["空格", " "],
                        ["逗号", "，"],
                        ["无", ""]
                    ],
                    value: "\n"
                }
            ],
            output: "String",
            colour: "%{BILI_HUE}"
        },
        
        // ========== 排行榜 ==========
        {
            type: "bili_rank_top1",
            message0: "分区 %1 日榜 TOP1 标题",
            args0: [
                { type: "input_value", name: "RID", check: "String", value: "0" }
            ],
            output: "String",
            colour: "%{BILI_HUE}"
        },
        
        // ========== 随机表情 ==========
        {
            type: "bili_random_emoji",
            message0: "随机 B 站 Emoji",
            args0: [],
            output: "String",
            colour: "%{BILI_HUE}"
        },
        
        // ========== 工具 ==========
        {
            type: "bili_parse_json",
            message0: "从JSON %1 获取 %2",
            args0: [
                { type: "input_value", name: "JSON", check: "String", value: "{}" },
                { type: "input_value", name: "PATH", check: "String", value: "data.title" }
            ],
            output: "String",
            colour: "%{BILI_HUE}"
        }
    ].map(block => ({ ...block, colour: "%{BILI_HUE}" }));

    await BN.waitBlockLoaded();
    BN.regBlocks(biliBlocks);

    const biliXML = [
        Toolbox.title("📺 B站万能助手"),
        
        Toolbox.line("用户统计"),
        Toolbox.block("bili_fans"),
        Toolbox.block("bili_following"),
        Toolbox.block("bili_black"),
        Toolbox.block("bili_video_count"),
        Toolbox.block("bili_likes"),
        
        Toolbox.line("直播"),
        Toolbox.block("bili_is_live"),
        Toolbox.block("bili_live_online"),
        
        Toolbox.line("视频"),
        Toolbox.block("bili_video_info"),
        Toolbox.block("bili_hot_comments"),
        
        Toolbox.line("排行榜"),
        Toolbox.block("bili_rank_top1"),
        
        Toolbox.line("娱乐"),
        Toolbox.block("bili_random_emoji"),
        
        Toolbox.line("工具"),
        Toolbox.block("bili_parse_json"),
        
        Toolbox.flyout_bottom()
    ];

    BN.regIcon(`<symbol id="icon-bili" viewBox="-1500 -1500 4000 4000"><path d="M977.2 208.2c33.4 36.2 48.8 79.4 46.6 131.4v404.8c-0.8 52.8-18.4 96.2-53 130.2-34.4 34-78.2 51.8-131 53.4H184.04c-52.9-1.6-96.42-19.6-130.56-54.4C19.364 838.8 1.534 793 0 736.4V339.6c1.534-52 19.364-95.2 53.48-131.4C87.62 175.5 131.14 157.54 184.04 156h58.76L192.1 104.38c-11.5-11.46-17.26-26-17.26-43.58 0-17.6 5.76-32.12 17.26-43.594C203.6 5.736 218.2 0 235.8 0s32.2 5.736 43.8 17.206L426.2 156h176l149-138.794C763.4 5.736 778.4 0 796 0c17.6 0 32.2 5.736 43.8 17.206 11.4 11.474 17.2 25.994 17.2 43.594 0 17.58-5.8 32.12-17.2 43.58L789.2 156h58.6c52.8 1.54 96 19.5 129.4 52.2z m-77.6 139.4c-0.8-19.2-7.4-34.8-21.4-47-10.4-12.2-28-18.8-45.4-19.6H192.1c-19.18 0.8-34.9 7.4-47.16 19.6-12.28 12.2-18.8 27.8-19.56 47v388.8c0 18.4 6.52 34 19.56 47s28.76 19.6 47.16 19.6H832.8c18.4 0 34-6.6 46.6-19.6 12.6-13 19.4-28.6 20.2-47V347.6z m-528.6 85.4c12.6 12.6 19.4 28.2 20.2 46.4V546c-0.8 18.4-7.4 33.8-19.6 46.4-12.4 12.6-28 19-47.2 19-19.2 0-35-6.4-47.2-19-12.2-12.6-18.8-28-19.6-46.4v-66.6c0.8-18.2 7.6-33.8 20.2-46.4 12.6-12.6 26.4-19.2 46.6-20 18.4 0.8 34 7.4 46.6 20z m383 0c12.6 12.6 19.4 28.2 20.2 46.4V546c-0.8 18.4-7.4 33.8-19.6 46.4-12.2 12.6-28 19-47.2 19-19.2 0-34.8-6.4-47.2-19-14-12.6-18.8-28-19.4-46.4v-66.6c0.6-18.2 7.4-33.8 20-46.4 12.6-12.6 28.2-19.2 46.6-20 18.4 0.8 34 7.4 46.6 20z" p-id="4037"></path></svg>`);

    BN.addToolbox("bili-helper", "icon-bili", "#3B8BEE", biliXML);

    await BN.waitRunmgrLoaded();

    // ========== 解释器 ==========
    
    // 粉丝数
    BN.regMethod('bili_fans', async (params) => {
        const uid = params.UID || '';
        if (!uid) return '';
        
        const data = await biliRequest(`https://api.bilibili.com/x/relation/stat?vmid=${uid}`);
        return data?.code === 0 ? String(data.data.follower) : '获取失败';
    });

    // 关注数
    BN.regMethod('bili_following', async (params) => {
        const uid = params.UID || '';
        if (!uid) return '';
        
        const data = await biliRequest(`https://api.bilibili.com/x/relation/stat?vmid=${uid}`);
        return data?.code === 0 ? String(data.data.following) : '获取失败';
    });

    // 拉黑数
    BN.regMethod('bili_black', async (params) => {
        const uid = params.UID || '';
        if (!uid) return '';
        
        const data = await biliRequest(`https://api.bilibili.com/x/relation/stat?vmid=${uid}`);
        return data?.code === 0 ? String(data.data.black || 0) : '获取失败';
    });

    // 投稿视频数
    BN.regMethod('bili_video_count', async (params) => {
        const uid = params.UID || '';
        if (!uid) return '';
        
        const data = await biliRequest(`https://api.bilibili.com/x/space/navnum?mid=${uid}`);
        return data?.code === 0 ? String(data.data.video) : '获取失败';
    });

    // 历史获赞
    BN.regMethod('bili_likes', async (params) => {
        const uid = params.UID || '';
        if (!uid) return '';
        
        const data = await biliRequest(`https://api.bilibili.com/x/space/upstat?mid=${uid}`);
        return data?.code === 0 ? String(data.data.likes) : '获取失败';
    });

    // 是否直播
    BN.regMethod('bili_is_live', async (params) => {
        const uid = params.UID || '';
        if (!uid) return '获取失败';
        
        const roomData = await biliRequest(`https://api.live.bilibili.com/room/v1/Room/getRoomIdByUid?uid=${uid}`);
        if (roomData?.code !== 0) return '未开通直播间';
        
        const roomId = roomData.data.room_id;
        const liveData = await biliRequest(`https://api.live.bilibili.com/room/v1/Room/get_info?room_id=${roomId}`);
        return (liveData?.code === 0 && liveData.data.live_status === 1) ? '直播中' : '未直播';
    });

    // 直播间在线人数
    BN.regMethod('bili_live_online', async (params) => {
        const room = params.ROOM || '';
        if (!room) return '';
        
        const data = await biliRequest(`https://api.live.bilibili.com/room/v1/Room/get_info?room_id=${room}`);
        return data?.code === 0 ? String(data.data.online) : '获取失败';
    });

    // 视频信息
    BN.regMethod('bili_video_info', async (params) => {
        const bvid = params.BVID || '';
        if (!bvid) return '';
        
        const data = await biliRequest(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`);
        if (data?.code !== 0) return '视频不存在';
        
        const d = data.data;
        const s = d.stat;
        return `标题：${d.title} | 播放：${s.view} | 弹幕：${s.danmaku} | 点赞：${s.like}`;
    });

    // 热评
    BN.regMethod('bili_hot_comments', async (params) => {
        const bvid = params.BVID || '';
        const count = parseInt(params.COUNT) || 1;
        const sep = params.SEP || '\n';
        
        if (!bvid) return '';
        
        const data = await biliRequest(`https://api.bilibili.com/x/v2/reply?type=1&oid=${bvid}&sort=2&ps=${count}`);
        if (data?.code !== 0 || !data.data.replies) return '获取失败';
        
        return data.data.replies.map(r => r.content.message).join(sep);
    });

    // 分区日榜 TOP1
    BN.regMethod('bili_rank_top1', async (params) => {
        const rid = params.RID || '0';
        
        const data = await biliRequest(`https://api.bilibili.com/x/web-interface/ranking/v2?rid=${rid}&type=all`);
        return (data?.code === 0 && data.data.list[0]) ? data.data.list[0].title : '获取失败';
    });

    // 随机表情
    BN.regMethod('bili_random_emoji', () => {
        const emojis = ['(｡>∀<｡)', '(￣▽￣)', '(°∀°)ﾉ', '(╯°口°)╯', '(｡･ω･｡)', '(*´▽`*)', '(=・ω・=)', '(￣﹃￣)', '╮(￣▽￣)╭', '(￣ε￣；)'];
        return emojis[Math.floor(Math.random() * emojis.length)];
    });

    // JSON解析工具
    BN.regMethod('bili_parse_json', (params) => {
        const jsonStr = params.JSON || '{}';
        const path = params.PATH || '';
        
        try {
            const obj = JSON.parse(jsonStr);
            const parts = path.split('.');
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

    BN.log('Bili', 'B站万能助手扩展已加载');
})();