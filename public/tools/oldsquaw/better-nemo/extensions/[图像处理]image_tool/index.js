/// <reference path="../_TYPE.d.ts"/>

Extension.metaData = {
    name: "图像处理",
    version: "0.0.1",
    description: "图像处理插件",
    author: "方圆圆",
    docs: ""
};

(async () => {
    // 在这里定义了一些必要的API
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Block = BN.Block;
    const Toolbox = BN.Toolbox;
    // --------------------------------积木-------------------------------
    // 这条语句会等待Blockly加载完毕，别动
    await BN.waitBlocklyLoaded();
    // 这条语句会注册一个颜色
    // BN.regColor("IMAGE_HUE", "#00AFC3", "#007E8C");
    // 开始定义你的自定义积木吧
    const imageToolBlocks = [
        {
            type: "get_stage_imageData",
            message0: "从 舞台 获取ImageData 范围 %1",
            args0: [
                { type: "input_value", name: "range", check: "String", value: "[0,0,100,100]" }
            ],
            output: "String",
            colour: "%{BKY_BLUE_6}"
        },
        
        {
            type: "get_actor_imageData",
            message0: "从 角色造型 获取ImageData",
            args0: [],
            output: "String",
            colour: "%{BKY_BLUE_6}"
        },
        
        {
            type: "set_imageData_rgba",
            message0: "设置 ImageData %1 的 %2 通道为 %3",
            args0: [
                { type: "input_value", name: "imageData", check: "String", value: "" },
                { type: "field_dropdown", name: "rgba", options: [
                    [ "红色", "r" ],
                    [ "绿色", "g" ],
                    [ "蓝色", "b" ],
                    [ "透明", "a" ]
                ], value: "r"},
                { type: "input_value", name: "value", check: "Number", value: 255 }
            ],
            output: "String",
            colour: "%{BKY_BLUE_6}"
        },
        
        {
            type: "add_imageData_rgba",
            message0: "使 ImageData %1 的 %2 通道 %4 %3",
            args0: [
                { type: "input_value", name: "imageData", check: "String", value: "" },
                { type: "field_dropdown", name: "rgba", options: [
                    [ "红色", "r" ],
                    [ "绿色", "g" ],
                    [ "蓝色", "b" ],
                    [ "透明", "a" ]
                ], value: "r" },
                { type: "input_value", name: "value", check: "Number", value: 10 },
                { type: "field_dropdown", name: "model", options: [
                    [ "增加", "add" ],
                    [ "减少", "remove" ]
                ], value: "add" }
            ],
            output: "String",
            colour: "%{BKY_BLUE_6}"
        },
        //绘制imgd
        {
            type: "draw_imageData_at",
            message0: "绘制 ImageData %1 范围 %2",
            args0: [
                { type: "input_value", name: "imageData", check: "String", value: "" },
                { type: "input_value", name: "range", check: "String", value: "[0,0,100,100]" }
            ],
            colour: "%{BKY_BLUE_6}",
            ...Block.methodBlock
        },
        //获取imgd数据
        /*
        {
            type: "get_imageData_data",
            message0: "截取 ImageData %1 范围 %2",
            args0: [
                { type: "input_value", name: "imageData", check: "String", value: "" },
                { type: "input_value", name: "range", check: "String", value: "[0,0,100,100]" }
            ],
            output: "String",
            colour: "%{BKY_BLUE_6}"
        }
        */
    ].map((block) => { return { ...block, colour: "%{BKY_BLUE_6}" }; });
    // 等待积木对象加载完毕，别动
    await BN.waitBlockLoaded();
    // 注册你的积木
    BN.regBlocks(imageToolBlocks);
    // --------------------------------积木盒-------------------------------
    // 定义你的积木盒
    const imageToolXML = [
        Toolbox.title("图像处理 · Image Tool"),
        Toolbox.block("get_stage_imageData"),
        Toolbox.block("get_actor_imageData"),
        //Toolbox.block("get_imageData_data"),
        Toolbox.sep(),
        Toolbox.block("set_imageData_rgba"),
        Toolbox.block("add_imageData_rgba"),
        Toolbox.sep(),
        Toolbox.block("draw_imageData_at"),
        Toolbox.flyout_bottom(),
    ];
    // 注册图标（去除所有颜色设置）
    BN.regIcon(`<symbol id="icon-imageTool" viewBox="-75 -75 200 200">
                    <path d="M39 6H9C7.34315 6 6 7.34315 6 9V39C6 40.6569 7.34315 42 9 42H39C40.6569 42 42 40.6569 42 39V9C42 7.34315 40.6569 6 39 6Z" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18 23C20.7614 23 23 20.7614 23 18C23 15.2386 20.7614 13 18 13C15.2386 13 13 15.2386 13 18C13 20.7614 15.2386 23 18 23Z" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M27.7901 26.2194C28.6064 25.1269 30.2528 25.1538 31.0329 26.2725L39.8077 38.8561C40.7322 40.182 39.7835 42.0001 38.1671 42.0001H16L27.7901 26.2194Z" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </symbol>`);

    // 添加积木盒（保持不变）
    BN.addToolbox("imageTool", "icon-imageTool", "#00AFC3", imageToolXML);
    // ---------------------------解释器-------------------------------------
    // 等待Runmgr加载完毕，别动
    await BN.waitRunmgrLoaded();
    const Runtime = (await waitHook('Runtime')).get_webview_runtime();
    function get_stage_target(target_id) {
        const stage = Runtime.stage;
        
        var scene = stage.core.scenes.get_scene(target_id);
        if (!scene.is_error(scene.value)) {
            return scene.value;
        }
        var actor = stage.core.actors.get_actor(target_id);
        if (!actor.is_error(actor.value)) {
            return actor.value;
        }
    }
    // 给你的积木定义一个解释器
    // 舞台imgd
    BN.regMethod('get_stage_imageData', (params, uuid, uuid2, utils) => {
        var actor = get_stage_target(uuid2);
        if (!actor) {
            return;
        }
        var range = [];
        try {
            range = JSON.parse(params.range);
        } catch (error) {
            console.error(error + "\n范围数组不合规。格式：\"[x, y, width, height]\"。");
            return;
        }
        var x = range[0];
        var y = range[1];
        const width = range[2];
        const height = range[3];

        const stageSize = actor.get_brush().stage_size();
        x = stageSize[0] + x;
        y = stageSize[1] - y;
        //console.log([3,x,y]);
        const data = HookRuntime.exports.get_webview_runtime().stage.core.extract_pixels(x, y, width, height);
        
        return JSON.stringify({width: width, height: height, data: data});
    });
    //角色imgd
    BN.regMethod('get_actor_imageData', (params, uuid, uuid2, utils) => {
        var actor = get_stage_target(uuid2);
        if (!actor) {
            return;
        }
        return JSON.stringify(actor.get_brush().get_actor_imageData());
    });
    //设置imgd的rgba通道
    BN.regMethod('set_imageData_rgba', (params, uuid, uuid2, utils) => {
        var imageData = JSON.parse(params.imageData);
        var data = imageData.data;
        const width = imageData.width;
        const height = imageData.height;
        const type = params.rgba;
        const value = params.value;
        
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                const index = (y * width + x) * 4
                
                if (type == "r") data[index] = value;
                if (type == "g") data[index + 1] = value;
                if (type == "b") data[index + 2] = value;
                if (type == "a") data[index + 3] = value;
            }
        }
        imageData.data = data;
        return JSON.stringify(imageData);
    });
    //增加imgd的rgba通道
    BN.regMethod('add_imageData_rgba', (params, uuid, uuid2, utils) => {
        var imageData = JSON.parse(params.imageData);
        var data = imageData.data;
        const width = imageData.width;
        const height = imageData.height;
        const type = params.rgba;
        const model = params.model;
        const value = params.value;
        
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                const index = (y * width + x) * 4
                
                if (model == "add") {
                    if (type == "r") data[index] += value;
                    if (type == "g") data[index + 1] += value;
                    if (type == "b") data[index + 2] += value;
                    if (type == "a") data[index + 3] += value;
                }
                if (model == "remove") {
                    if (type == "r") data[index] -= value;
                    if (type == "g") data[index + 1] -= value;
                    if (type == "b") data[index + 2] -= value;
                    if (type == "a") data[index + 3] -= value;
                }
            }
        }
        imageData.data = data;
        return JSON.stringify(imageData);
    });
    //获取imgd数据
    /*
    BN.regMethod('get_imageData_data', (params, uuid, uuid2, utils) => {
        var imageData = JSON.parse(params.imageData);
        var data = imageData.data;
        const width = imageData.width;
        const height = imageData.height;
        
        const range = JSON.parse(params.range);
        const rangeX = range[0];
        const rangeY = range[1];
        var rangeWidth = range[2];
        var rangeHeight = range[3];
        
        if ((rangeX + rangeWidth) > width) {
            rangeWidth = width - rangeX;
        }
        if ((rangeY + rangeHeight) > height) {
            rangeHeight = height - rangeY;
        }
        
        var getData = {};
        var i = 0;
        for (var y = rangeY; y < rangeHeight + rangeY; y++) {
            for (var x = rangeX; x < rangeWidth + rangeX; x++) {
                const index = (y * width + x) * 4
                
                getData[i] = data[index];
                getData[i + 1] = data[index + 1];
                getData[i + 2] = data[index + 2];
                getData[i + 3] = data[index + 3];
                
                i++;
            }
        }
        
        return JSON.stringify({width: rangeWidth, height: rangeHeight, data: getData});
    });
    */
    //绘制imgd于
    BN.regMethod('draw_imageData_at', (params, uuid, uuid2, utils) => {
        var actor = get_stage_target(uuid2);
        if (!actor) {
            return;
        }
        
        const range = JSON.parse(params.range);
        const imageData = JSON.parse(params.imageData);
        actor.get_brush().draw_imageData_at(imageData, range);
    });
})();



(async ()=>{
    const BN = Extension.API;
    const Brush = (await BN.getHook("Brush")).Brush;
    //角色imgd
    Brush.prototype.get_actor_imageData = function () {
        
        var actor = this.actor;
        const source = actor.texture.baseTexture.getDrawableSource && actor.texture.baseTexture.getDrawableSource();
        
        const canvasD = document.createElement('canvas');
        const ctxD = canvasD.getContext('2d');
        
        canvasD.width = source.width;
        canvasD.height = source.height;
        
        ctxD.drawImage(source, 0, 0);
        
        const imageData = ctxD.getImageData(0, 0, canvasD.width, canvasD.height);
        return {width: imageData.width, height: imageData.height, data: imageData.data};
        
    }
    //绘制imgd
    Brush.prototype.draw_imageData_at = function (imageData, range) {
        var ctx = this.ctx;
        if (!ctx) {
            return;
        }
        var _a2 = this.app.get_app().view, width2 = _a2.width, height2 = _a2.height;
        var center_x = width2 / 2;
        var center_y = height2 / 2;
        
        const data = imageData.data;
        
        const length = Object.keys(data).length;
        var imageDataObj = ctx.createImageData(imageData.width, imageData.height);
        for (var i = 0; i < length; i++) {
            imageDataObj.data[i] = data[i];
        }
        
        ctx.putImageData(imageDataObj, center_x + range[0], center_y - range[1]);
        this.actor.parent_scene.should_update_brush();
    }
    
})();
