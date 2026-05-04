// ------------------画笔原型注入------------------
(async () => {
    BetterNemo.log('Brush注入', "等待画笔原型,Utils获取");
    const Utils = (await waitHook("Utils"));
    const Brush = (await waitHook("Brush")).Brush;
    BetterNemo.log('Brush注入', "画笔原型注入开始");
    Brush.prototype.put_pixel = function (x, y, r, g, b, a) {
        var ctx = this.ctx;
        if (!ctx) {
            return;
        }
        var _a = this.app.get_app().view, width = _a.width, height = _a.height;
        var center_x = width / 2;
        var center_y = height / 2;

        var imageData = ctx.createImageData(1, 1);
        var data = imageData.data;

        data[0] = r;
        data[1] = g;
        data[2] = b;
        data[3] = a;

        ctx.putImageData(imageData, center_x + x, center_y - y);
        ctx.restore();
        this.actor.parent_scene.should_update_brush();
    };
    Brush.prototype.fill_polygon = function (point, color) {
        var ctx = this.ctx;
        if (!ctx) {
            return;
        }
        var _a = this.app.get_app().view, width = _a.width, height = _a.height;
        var center_x = width / 2;
        var center_y = height / 2;

        var points = 0;

        try {
            points = JSON.parse(point);
        } catch (error) {
            console.error(error + "\n坐标数组字符串格式不合规。格式：\"[[x1, y1], [x2, y2], ...]\"。");
        }

        ctx.beginPath();
        ctx.moveTo(center_x + points[0][0], center_y - points[0][1]);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(center_x + points[i][0], center_y - points[i][1]);
        }
        ctx.closePath();

        var color2 = color;
        if (color2.substring(0, 1) == "[") {
            try {
                color2 = JSON.parse(color2);
                var gradient;
                if (color2[0] == "Linear") {
                    gradient = ctx.createLinearGradient(center_x + color2[1][0], center_y - color2[1][1], center_x + color2[1][2], center_y - color2[1][3]);
                }
                if (color2[0] == "Radial") {
                    gradient = ctx.createRadialGradient(center_x + color2[1][0], center_y - color2[1][1], color2[1][2], center_x + color2[1][3], center_y - color2[1][4], color2[1][5]);
                }
                for (let i = 2; i < color2.length; i++) {
                    gradient.addColorStop(color2[i][0], color2[i][1]);
                }
                ctx.fillStyle = gradient;
            } catch (error) {
                console.error(error + "\n渐变数组/颜色字符串格式不合规。格式：\"[type, [gradient_params], [progress1, \"color1\"], [progress2, \"color2\"], ...]\"，progress∈[0,1]。");
                return;
            }
        } else {
            ctx.fillStyle = color;
        }

        ctx.fill();

        ctx.restore();
        this.actor.parent_scene.should_update_brush();
    };
    Brush.prototype.draw_image = function (image, x, y, width, height) {
        if (!this.ctx) {
            return;
        }
        var _a = this.app.get_app().view, width2 = _a.width, height2 = _a.height;
        var center_x = width2 / 2;
        var center_y = height2 / 2;
        // console.log("draw_image", image, x, y, width, height);
        this.ctx.drawImage(image, center_x + x, center_y - y, width, height);
        this.actor.parent_scene.should_update_brush();
    };
    Brush.prototype.draw_custom_image_stamp = function (url, x, y, w, h) {
        var ctx = this.ctx;
        if (!ctx) {
            return;
        }
        var actor = this.actor;
        var _a = this.app.get_app().view, width2 = _a.width, height2 = _a.height;
        var center_x = width2 / 2;
        var center_y = height2 / 2;

        const source = new Image(100, 200);

        source.onload = function () {
            ctx.save();

            ctx.drawImage(source, center_x + x, center_y - y, w, h);
            ctx.restore();
            actor.parent_scene.should_update_brush();
        };

        //console.log([1, Math.floor(-actor.width / 2), Math.floor(-actor.height / 2)]);

        source.src = url;

    };
    Brush.prototype.better_draw_text_stamp = function (text, color, style, weight, size, font, align, base_line, rotation) {
        var ctx = this.ctx;
        if (!ctx) {
            return;
        }
        var _a = this.app.get_app().stage
            .toGlobal(this.actor.position), x = _a.x, y = _a.y;
        var stamp_rotation = rotation !== undefined ? rotation : this.actor.rotation;
        var _a2 = this.app.get_app().view, width2 = _a2.width, height2 = _a2.height;
        var center_x = width2 / 2;
        var center_y = height2 / 2;
        ctx.save();
        ctx.font = style + ' ' + weight + ' ' + size + "px " + font + ", Arial, 'Microsoft YaHei'";

        var color2 = color;
        if (color2.substring(0, 1) == "[") {
            try {
                color2 = JSON.parse(color2);
                var gradient;
                if (color2[0] == "Linear") {
                    gradient = ctx.createLinearGradient(center_x + color2[1][0], center_y - color2[1][1], center_x + color2[1][2], center_y - color2[1][3]);
                }
                if (color2[0] == "Radial") {
                    gradient = ctx.createRadialGradient(center_x + color2[1][0], center_y - color2[1][1], color2[1][2], center_x + color2[1][3], center_y - color2[1][4], color2[1][5]);
                }
                for (let i = 2; i < color2.length; i++) {
                    gradient.addColorStop(color2[i][0], color2[i][1]);
                }
                ctx.fillStyle = gradient;
            } catch (error) {
                console.error(error + "\n渐变数组/颜色字符串格式不合规。格式：\"[type, [gradient_params], [progress1, \"color1\"], [progress2, \"color2\"], ...]\"，progress∈[0,1]。");
                return;
            }
        } else {
            ctx.fillStyle = color;
        }

        ctx.globalAlpha = this.alpha;
        ctx.textBaseline = base_line;
        ctx.textAlign = align;
        ctx.translate(x, y);
        ctx.rotate(stamp_rotation);
        ctx.fillText(text, 0, 0);
        ctx.restore();
        this.actor.parent_scene.should_update_brush();
    };
    Brush.prototype.rectangle_clear = function (x, y, width, height) {
        var ctx = this.ctx;
        if (!ctx) {
            return;
        }
        var _a = this.app.get_app().view, width2 = _a.width, height2 = _a.height;
        var center_x = width2 / 2;
        var center_y = height2 / 2;

        ctx.clearRect(center_x + x, center_y - y, width, height);
        ctx.restore();
        this.actor.parent_scene.should_update_brush();
    };
    Brush.prototype.draw_svg = function (svg) {
        var ctx = this.ctx;
        if (!ctx) {
            return;
        }
        var actor = this.actor;
        var center_point = Utils.get_actor_center(actor, actor.position);
        var rotation = this.actor.rotation;
        var _a = this.app.get_app().view, view_height = _a.height, view_width = _a.width;

        ctx.translate(center_point.x + view_width / 2, center_point.y + view_height / 2);
        ctx.rotate(rotation);
        ctx.scale(actor.scale.x < 0 ? -1 : 1, actor.scale.y < 0 ? -1 : 1);
        const source = new Image(100, 200);

        var svgString = svg;
        var svgURL = 'data:image/svg+xml;base64,' + btoa(svgString);

        source.onload = function () {
            ctx.save();
            ctx.drawImage(source, Math.floor(-actor.width / 2), Math.floor(-actor.height / 2), Math.floor(actor.width), Math.floor(actor.height));
            ctx.restore();
            actor.parent_scene.should_update_brush();
        };
        source.src = svgURL;
    };
    // 图像处理
    /*
    Brush.prototype.dataURL_actor = function () {
        
        var actor = this.actor;
        const source = actor.texture.baseTexture.getDrawableSource && actor.texture.baseTexture.getDrawableSource();
        
        const canvasD = document.createElement('canvas');
        const ctxD = canvasD.getContext('2d');
        
        canvasD.width = source.width;
        canvasD.height = source.height;
        
        ctxD.drawImage(source, 0, 0);
        
        return canvasD.toDataURL();
        
    };
    */
    Brush.prototype.dataURL_stage = function (imgdata) {
        const source = imgdata;

        const canvasD = document.createElement('canvas');
        const ctxD = canvasD.getContext('2d');

        canvasD.width = source.width;
        canvasD.height = source.height;

        ctxD.putImageData(source, 0, 0);

        return canvasD.toDataURL();

    };
    //舞台长宽
    Brush.prototype.stage_size = function () {
        var _a = this.app.get_app().view, width2 = _a.width, height2 = _a.height;
        var center_x = width2 / 2;
        var center_y = height2 / 2;

        //console.log([2,center_x,center_y]);
        return [center_x, center_y];
    };
    Brush.prototype.dataURL_URL = function (url) {

        var img = new Image();

        img.crossOrigin = 'anonymous';

        const canvasD = document.createElement('canvas');
        const ctxD = canvasD.getContext('2d');

        img.onload = function () {
            canvasD.width = img.width;
            canvasD.height = img.height;

            ctxD.drawImage(img, 0, 0);
            return canvasD.toDataURL();
        };

        img.src = url;
    };
    BetterNemo.log('Brush注入', "画笔原型注入完成");
})();
// ------------------Scene原型注入------------------
(async () => {
    BetterNemo.log('Scene注入', "等待Scene原型获取");
    const Scene = (await waitHook("Scene")).Scene;
    BetterNemo.log('Scene注入', "Scene原型注入开始");
    Scene.prototype.get_brush_gl = function () {
        if (!this.brush_gl) {
            this.brush_gl = this.brush_canvas.getContext('webgl2');
        }
        return this.brush_gl;
    };
    BetterNemo.log('Scene注入', "Scene原型注入完成");
})();
// ------------------OptiCompilerImpl原型注入------------------
(async () => {
    BetterNemo.log('OptiCompilerImpl注入', "等待获取");
    const OptiCompilerImpl = (await waitHook("OptiCompiler")).OptiCompilerImpl;
    BetterNemo.log('OptiCompilerImpl注入', "开始");
    const compile_repeat_forever = OptiCompilerImpl.prototype.compile_repeat_forever;
    OptiCompilerImpl.prototype.compile_repeat_forever = function () {
        // console.log('compile_repeat_forever', arguments);
        return compile_repeat_forever.apply(this, arguments);
    };
    BetterNemo.log('OptiCompilerImpl注入', "完成");
})();