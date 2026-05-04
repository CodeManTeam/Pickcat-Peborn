(self["webpackChunknemo"] = self["webpackChunknemo"] || []).push([["node_modules_crc_stage_build_core_physics_debug_draw_js"],{

/***/ "./node_modules/@crc/stage/build/core/physics/debug_draw.js":
/*!******************************************************************!*\
  !*** ./node_modules/@crc/stage/build/core/physics/debug_draw.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DebugDraw": function() { return /* binding */ DebugDraw; }
/* harmony export */ });
/* harmony import */ var _crc_box2d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @crc/box2d */ "./node_modules/@crc/box2d/build/index.js");
/* harmony import */ var _di_interfaces_physics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../di/interfaces/physics */ "./node_modules/@crc/stage/build/core/di/interfaces/physics.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./node_modules/@crc/stage/build/core/physics/utils.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};



var DebugDraw = /** @class */ (function (_super) {
    __extends(DebugDraw, _super);
    function DebugDraw(canvas) {
        var _this = _super.call(this) || this;
        _this.m_ctx = null;
        _this.half_width = 310;
        _this.half_height = 450;
        _this.m_ctx = canvas.getContext('2d');
        _this.half_width = canvas.width / 2;
        _this.half_height = canvas.height / 2;
        return _this;
    }
    DebugDraw.prototype.set_world = function (world) {
        this.world = world;
    };
    DebugDraw.prototype.PushTransform = function (xf) {
        var ctx = this.m_ctx;
        if (ctx) {
            ctx.save();
            ctx.translate((0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(xf.p.x) + this.half_width, (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(xf.p.y) + this.half_height);
            ctx.rotate(xf.q.GetAngle());
        }
    };
    DebugDraw.prototype.PopTransform = function (xf) {
        var ctx = this.m_ctx;
        if (ctx) {
            ctx.restore();
        }
    };
    DebugDraw.prototype.DrawPolygon = function (vertices, vertexCount, color) {
        var ctx = this.m_ctx;
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo((0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(vertices[0].x), (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(vertices[0].y));
            for (var i = 1; i < vertexCount; i++) {
                ctx.lineTo((0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(vertices[i].x), (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(vertices[i].y));
            }
            ctx.closePath();
            ctx.strokeStyle = color.MakeStyleString(1);
            ctx.stroke();
        }
    };
    DebugDraw.prototype.DrawSolidPolygon = function (vertices, vertexCount, color) {
        // 红色看不清，随手改改
        if (color.r === 0.9) {
            color.SetRGB(0.9, 0.9, 0.9);
        }
        var ctx = this.m_ctx;
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo((0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(vertices[0].x), (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(vertices[0].y));
            for (var i = 1; i < vertexCount; i++) {
                ctx.lineTo((0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(vertices[i].x), (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(vertices[i].y));
            }
            ctx.closePath();
            ctx.fillStyle = color.MakeStyleString(0.1);
            ctx.fill();
            ctx.strokeStyle = color.MakeStyleString(1);
            ctx.stroke();
        }
    };
    DebugDraw.prototype.DrawCircle = function (center, radius, color) {
        var ctx = this.m_ctx;
        if (ctx) {
            ctx.beginPath();
            ctx.arc((0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(center.x), (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(center.y), radius, 0, _crc_box2d__WEBPACK_IMPORTED_MODULE_0__.pi * 2, true);
            ctx.strokeStyle = color.MakeStyleString(1);
            ctx.stroke();
        }
    };
    DebugDraw.prototype.DrawSolidCircle = function (center, radius, axis, color) {
        var ctx = this.m_ctx;
        if (ctx) {
            var cx = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(center.x);
            var cy = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(center.y);
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, _crc_box2d__WEBPACK_IMPORTED_MODULE_0__.pi * 2, true);
            ctx.moveTo(cx, cy);
            ctx.lineTo((cx + axis.x * radius), (cy + axis.y * radius));
            ctx.fillStyle = color.MakeStyleString(0.5);
            ctx.fill();
            ctx.strokeStyle = color.MakeStyleString(1);
            ctx.stroke();
        }
    };
    // #if B2_ENABLE_PARTICLE
    DebugDraw.prototype.DrawParticles = function (centers, radius, colors, count) {
        if (!this.m_ctx)
            return;
        for (var i = 0; i < count; ++i) {
            var center = centers[i];
            var color = (colors === null || colors === void 0 ? void 0 : colors[i]) || new _crc_box2d__WEBPACK_IMPORTED_MODULE_0__.Color(255, 255, 255, 0.5);
            this.m_ctx.fillStyle = color.MakeStyleString();
            this.m_ctx.beginPath();
            this.m_ctx.arc((0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(center.x), (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(center.y), (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(radius), 0, _crc_box2d__WEBPACK_IMPORTED_MODULE_0__.pi * 2, true);
            this.m_ctx.fill();
        }
    };
    DebugDraw.prototype.DrawParticleTriads = function (centers, triangles) {
        var _a;
        if (!this.m_ctx)
            return;
        if ((_a = this.world) === null || _a === void 0 ? void 0 : _a.body_list) {
            triangles = [];
            this.world.body_list.forEach(function (b) {
                var _a;
                var p_body = b.get_current_physics_body();
                if (p_body.type !== _di_interfaces_physics__WEBPACK_IMPORTED_MODULE_1__.PhysicsBodyTypes.ELASTIC) {
                    return;
                }
                var first_idx = p_body.particle_group.m_firstIndex;
                (_a = p_body.soft_filter) === null || _a === void 0 ? void 0 : _a.triangle_top_points.forEach(function (t) {
                    triangles.push([t[0] + first_idx, t[1] + first_idx, t[2] + first_idx]);
                });
            });
        }
        for (var i = 0; i < triangles.length; i++) {
            var _b = __read(triangles[i], 3), a = _b[0], b = _b[1], c = _b[2];
            var pa = centers[a];
            var pb = centers[b];
            var pc = centers[c];
            if (!pa || !pb || !pc) {
                console.error('Invalid triangle: ', triangles[i]);
                continue;
            }
            this.m_ctx.fillStyle = 'rgba(0,0,0,0.5)';
            this.m_ctx.beginPath();
            this.m_ctx.moveTo((0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(pa.x), (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(pa.y));
            this.m_ctx.lineTo((0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(pb.x), (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(pb.y));
            this.m_ctx.lineTo((0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(pc.x), (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(pc.y));
            this.m_ctx.closePath();
            this.m_ctx.stroke();
        }
    };
    // #endif
    DebugDraw.prototype.DrawSegment = function (p1, p2, color) {
        var ctx = this.m_ctx;
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo((0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(p1.x), (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(p1.y));
            ctx.lineTo((0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(p2.x), (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(p2.y));
            ctx.strokeStyle = color.MakeStyleString(1);
            ctx.stroke();
        }
    };
    DebugDraw.prototype.DrawTransform = function (xf) {
        var ctx = this.m_ctx;
        if (ctx) {
            this.PushTransform(xf);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(1, 0);
            ctx.strokeStyle = _crc_box2d__WEBPACK_IMPORTED_MODULE_0__.Color.RED.MakeStyleString(1);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, 1);
            ctx.strokeStyle = _crc_box2d__WEBPACK_IMPORTED_MODULE_0__.Color.GREEN.MakeStyleString(1);
            ctx.stroke();
            this.PopTransform(xf);
        }
    };
    DebugDraw.prototype.DrawPoint = function (p, size, color) {
        var ctx = this.m_ctx;
        if (ctx) {
            ctx.fillStyle = color.MakeStyleString();
            var hsize = size / 2;
            ctx.fillRect(p.x - hsize, p.y - hsize, size, size);
        }
    };
    DebugDraw.prototype.DrawString = function (x, y, message) {
        var ctx = this.m_ctx;
        if (ctx) {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.font = '15px DroidSans';
            var color = DebugDraw.DrawString_s_color;
            ctx.fillStyle = color.MakeStyleString();
            ctx.fillText(message, (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(x), (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(y));
            ctx.restore();
        }
    };
    DebugDraw.prototype.DrawStringWorld = function (x, y, message) {
        var ctx = this.m_ctx;
        if (ctx) {
            var p = DebugDraw.DrawStringWorld_s_p.Set(x, y);
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.font = '15px DroidSans';
            var color = DebugDraw.DrawStringWorld_s_color;
            ctx.fillStyle = color.MakeStyleString();
            ctx.fillText(message, p.x, p.y);
            ctx.restore();
        }
    };
    DebugDraw.prototype.DrawAABB = function (aabb, color) {
        var ctx = this.m_ctx;
        if (ctx) {
            ctx.strokeStyle = color.MakeStyleString();
            var x = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(aabb.lowerBound.x);
            var y = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(aabb.lowerBound.y);
            var w = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(aabb.upperBound.x - aabb.lowerBound.x);
            var h = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.convert_meter_to_pixel)(aabb.upperBound.y - aabb.lowerBound.y);
            ctx.strokeRect(x, y, w, h);
        }
    };
    DebugDraw.DrawString_s_color = new _crc_box2d__WEBPACK_IMPORTED_MODULE_0__.Color(0.9, 0.6, 0.6);
    DebugDraw.DrawStringWorld_s_p = new _crc_box2d__WEBPACK_IMPORTED_MODULE_0__.Vec2();
    DebugDraw.DrawStringWorld_s_color = new _crc_box2d__WEBPACK_IMPORTED_MODULE_0__.Color(0.5, 0.9, 0.5);
    return DebugDraw;
}(_crc_box2d__WEBPACK_IMPORTED_MODULE_0__.Draw));

//# sourceMappingURL=debug_draw.js.map

/***/ })

}]);
//# sourceMappingURL=043f972cddbd2173576b.chunk.js.map