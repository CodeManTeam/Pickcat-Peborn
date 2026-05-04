/// <reference path="../_TYPE.d.ts"/>
Extension.metaData = {
    name: "IP Tool",
    version: "0.0.1",
    description: "这是一个IP工具扩展",
    author: "IFTC",
    docs: ""
};
(async () => {
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;
    await BN.waitBlocklyLoaded();
    BN.regColor("IPTOOL_BLUE", "#0095ff", "#0095ff");
    await BN.waitBlockLoaded();
    const IPToolBlocks = [
        {
            type: "ip_tool_getip",
            message0: "获取IP地址",
            args0: [],
            output: "String",
            colour: "IPTOOL_BLUE",
            tooltip: "获取用户的IP地址",
            helpUrl: ""
        },
        {
            type: "ip_tool_getlocation",
            message0: "获取 %1 地址位置",
            args0: [
                {
                    type: "input_value",
                    name: "IP",
                    check: "String",
                    value: "0.0.0.0"
                }
            ],
            output: "String",
            colour: "IPTOOL_BLUE",
            tooltip: "获取用户的IP地址位置",
            helpUrl: ""
        }
    ].map((block) => { return { ...block, colour: "%{BKY_IPTOOL_BLUE}" }; });
    BN.regBlocks(IPToolBlocks);
    const IPToolXML = [
        Toolbox.title("IP工具 · IP Tool"),
        Toolbox.block("ip_tool_getip"),
        Toolbox.block("ip_tool_getlocation"),
    ];
    BN.regIcon(`<symbol id="icon-iptool" viewBox="-500 -1450 2050 4000"><path d="M341.333333 128a42.666667 42.666667 0 0 1 4.992 85.034667L341.333333 213.333333H277.333333v640H341.333333a42.666667 42.666667 0 0 1 4.992 85.034667L341.333333 938.666667H128a42.666667 42.666667 0 0 1-4.992-85.034667L128 853.333333h64V213.333333H128a42.666667 42.666667 0 0 1-4.992-85.034666L128 128h213.333333z m426.666667 0a213.333333 213.333333 0 0 1 9.258667 426.453333L768 554.666667h-170.666667v341.333333a42.666667 42.666667 0 0 1-85.034666 4.992L512 896V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667h213.333333z m-170.666667 341.333333h170.666667a128 128 0 0 0 7.509333-255.786666L768 213.333333h-170.666667v256z"></path></symbol>`);
    BN.addToolbox("IP-Tool", "icon-iptool", "#0095ff", IPToolXML);
    await BN.waitRunmgrLoaded();
    BN.regMethod('ip_tool_getip', async (params, _, __, ___) => {
        return await getIP();
    });
    BN.regMethod('ip_tool_getlocation', async (params, _, __, ___) => {
        return await getIPLocation(params.IP);
    });
    async function getIP() {
        const res = await fetch('https://iftc.koyeb.app/api/ip');
        const data = await res.json();
        if (data.code != 200) {
            throw new Error("获取IP失败，原因：" + data.msg);
        }
        return data.ip;
    }
    async function getIPLocation(ip) {
        const res = await fetch(`https://iftc.koyeb.app/api/ip2location?ip=${ip}`);
        const data = await res.json();
        if (data.code != 200) {
            throw new Error("获取IP位置失败，原因：" + data.msg);
        }
        const continent = data.data.continent ? data.data.continent.names["zh-CN"] : "";
        const country = data.data.country ? data.data.country.names["zh-CN"] : "";
        const subdivisions = data.data.subdivisions && data.data.subdivisions.length > 0 ? data.data.subdivisions[0].names["zh-CN"] : "";
        const city = data.data.city ? data.data.city.names["zh-CN"] : "";
        return `${continent}${country}${subdivisions}${city}`;
    }
})();