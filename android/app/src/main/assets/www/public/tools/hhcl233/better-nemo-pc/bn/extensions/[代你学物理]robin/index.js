/// <reference path="../_TYPE.d.ts"/>
Extension.metaData = {
    name: "知更鸟",
    version: "0.0.1",
    description: "你知道，有些鸟儿是注定不会被关在牢笼里的，它们的每一片羽毛都闪耀着自由的光辉",
    author: "Erithacus rubecula",
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
    BN.regColor("ERRU_HUE", "#7b85f7", "#543da5");
    
    const erruBlocks = [
        {
            type: "erru_set_url",
            message0: "设置URL %1 端口 %2",
            args0: [
                {
                    type: "input_value",
                    name: "SERVER",
                    check: "String",
                    value: ""
                },
                {
                    type: "input_value",
                    name: "PORT",
                    check: "Number",
                    value: 7000
                },
            ],
            ...Block.methodBlock
        },
        {
            type: "erru_connect",
            message0: "开始连接",
            ...Block.methodBlock
        },
        {
            type: "erru_disconnect",
            message0: "断开连接",
            ...Block.methodBlock
        },
    ].map(block => {return { ...block, colour: "%{ERRU_HUE}" };});;
    await BN.waitBlockLoaded();
    BN.regBlocks(erruBlocks);
    // --------------------------------积木盒-------------------------------
    const erruXML = [
        Toolbox.title("知更鸟·RISE UP INTO MY WORLD"),
        Toolbox.line("配置"),
        Toolbox.block("erru_set_url"),
        Toolbox.line("连接"),
        Toolbox.block("erru_connect"),
        Toolbox.block("erru_disconnect"),
        Toolbox.flyout_bottom(),
    ];
    BN.addToolbox("erru", "icon-erru", "#7b85f7", erruXML);
    BN.regIcon(`<symbol id="icon-erru" viewBox="-1030 -960 2500 2500"><path d="M224 0c35.3 0 64 21.5 64 48 0 10.4-4.4 20-12 27.9-6.6 6.9-12 15.3-12 24.9 0 15 12.2 27.2 27.2 27.2l44.8 0c26.5 0 48 21.5 48 48l0 44.8c0 15 12.2 27.2 27.2 27.2 9.5 0 18-5.4 24.9-12 7.9-7.5 17.5-12 27.9-12 26.5 0 48 28.7 48 64s-21.5 64-48 64c-10.4 0-20.1-4.4-27.9-12-6.9-6.6-15.3-12-24.9-12-15 0-27.2 12.2-27.2 27.2L384 464c0 26.5-21.5 48-48 48l-56.8 0c-12.8 0-23.2-10.4-23.2-23.2 0-9.2 5.8-17.3 13.2-22.8 11.6-8.7 18.8-20.7 18.8-34 0-26.5-28.7-48-64-48s-64 21.5-64 48c0 13.3 7.2 25.3 18.8 34 7.4 5.5 13.2 13.5 13.2 22.8 0 12.8-10.4 23.2-23.2 23.2L48 512c-26.5 0-48-21.5-48-48L0 343.2c0-12.8 10.4-23.2 23.2-23.2 9.2 0 17.3 5.8 22.8 13.2 8.7 11.6 20.7 18.8 34 18.8 26.5 0 48-28.7 48-64s-21.5-64-48-64c-13.3 0-25.3 7.2-34 18.8-5.5 7.4-13.5 13.2-22.8 13.2-12.8 0-23.2-10.4-23.2-23.2L0 176c0-26.5 21.5-48 48-48l108.8 0c15 0 27.2-12.2 27.2-27.2 0-9.5-5.4-18-12-24.9-7.5-7.9-12-17.5-12-27.9 0-26.5 28.7-48 64-48z"></path></symbol>`);
    // ---------------------------解释器-------------------------------------
    // 等待Runmgr加载完毕
    await BN.waitRunmgrLoaded();
})();