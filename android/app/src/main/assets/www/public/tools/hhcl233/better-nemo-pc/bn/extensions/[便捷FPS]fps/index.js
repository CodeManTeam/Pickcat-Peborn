/// <reference path="../bn.d.ts"/>

Extension.metaData = {
    name: "FPS检测",
    version: "0.1.3",
    description: "获取设备实时FPS",
    author: " U一U",
    docs: ""
};
(async () => {
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;
    await isBlocklyLoaded();

    
    BN.regColor("FPS_HUE", "#4CAF50", "#4CAF50");

    
    let isFPSDetecting = false;
    let currentFPS = 0;
    let frameCount = 0;
    let lastTime = Date.now();
    let fpsTimer = null;

    
    function updateFPS() {
        frameCount++;
        const now = Date.now();
        const delta = now - lastTime;
        if (delta >= 1000) {
            currentFPS = Math.round((frameCount * 1000) / delta);
            frameCount = 0;
            lastTime = now;
        }
        if (isFPSDetecting) fpsTimer = requestAnimationFrame(updateFPS);
    }

    
    const fpsBlocks = [
      
        {
            type: "fps_start_detect",
            message0: "开启FPS检测",
            args0: [],
            ...Block.methodBlock
        },
        
        {
            type: "fps_stop_detect",
            message0: "关闭FPS检测",
            args0: [],
            ...Block.methodBlock
        },
     
        {
            type: "fps_get_value",
            message0: "当前FPS值",
            args0: [],
            output: "Number",
            ...Block.valueBlock
        }
    ].map((block) => { return { ...block, colour: "%{BKY_FPS_HUE}" }; });

    BN.regBlocks(fpsBlocks);

    await (async () => {
        while (window['blockObjects'] == [])
            await new Promise((resolve) => requestAnimationFrame(resolve));
        return;
    })();

    const fpsXML = [
        Toolbox.title("FPS检测 · FPS Detect"),
        Toolbox.block("fps_start_detect"),
        Toolbox.block("fps_stop_detect"),
        Toolbox.block("fps_get_value"),
        Toolbox.flyout_bottom(),
    ];


BN.regIcon(`<symbol id="icon-fps" viewBox="-33 -33 90 90">
<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
fill="none"
stroke="#8FCE89"
stroke-width="1.5"
stroke-linejoin="round"
stroke-linecap="round"/>
</symbol>`);



    BN.addToolbox("fps", "icon-fps", "#4CAF50", fpsXML);

    await isRunmgrHooked();

    BN.regMethod('fps_start_detect', (params) => {
        if (!isFPSDetecting) {
            isFPSDetecting = true;
            frameCount = 0;
            lastTime = Date.now();
            updateFPS();
        }
    });

    BN.regMethod('fps_stop_detect', (params) => {
        if (isFPSDetecting) {
            isFPSDetecting = false;
            cancelAnimationFrame(fpsTimer);
            currentFPS = 0; 
        }
    });

    BN.regMethod('fps_get_value', (params) => {
        return currentFPS;
    });
})();
