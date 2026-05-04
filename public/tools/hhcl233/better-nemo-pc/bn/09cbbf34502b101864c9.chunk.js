(self["webpackChunknemo"] = self["webpackChunknemo"] || []).push([["demo_plugin_app_tsx"],{

/***/ "./demo/plugin/app.tsx":
/*!*****************************!*\
  !*** ./demo/plugin/app.tsx ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash-es */ "./node_modules/lodash-es/filter.js");
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash-es */ "./node_modules/lodash-es/includes.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var _src_webview_blockly_toolbox_categories_block_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../src/webview/blockly/toolbox/categories/block_data */ "./src/webview/blockly/toolbox/categories/block_data.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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




function MockPluginPanel() {
    var _this = this;
    var _a = __read((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]), 2), types = _a[0], set_types = _a[1];
    var _b = __read((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('#'), 2), img_src = _b[0], set_img_src = _b[1];
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        var new_types = [];
        Object.keys(_src_webview_blockly_toolbox_categories_block_data__WEBPACK_IMPORTED_MODULE_2__.GENERAL_CATEGORIES).forEach(function (c) {
            var blocks = _src_webview_blockly_toolbox_categories_block_data__WEBPACK_IMPORTED_MODULE_2__.GENERAL_CATEGORIES[c];
            var new_list = (0,lodash_es__WEBPACK_IMPORTED_MODULE_3__.default)(blocks, function (b) { return !(0,lodash_es__WEBPACK_IMPORTED_MODULE_4__.default)(b, 'flyout_gap'); });
            new_types = new_types.concat(new_list);
        });
        set_types(new_types);
    }, []);
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: {
            maxHeight: '100vh',
            width: '50vw',
            display: 'flex',
        } },
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: {
                width: '50%',
            } },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", { src: img_src, style: {
                    maxWidth: '100%',
                } })),
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", { style: {
                width: '50%',
                overflow: 'scroll',
            } },
            react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", null, "\u79EF\u6728\u5217\u8868"),
            types.map(function (type) { return (react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", { style: {
                    display: 'block',
                    minWidth: '100px',
                    maxWidth: '100%',
                    height: '40px',
                    marginBottom: '10px',
                    fontSize: '18px',
                }, key: type, onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    var result, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, window.nemo_plugin_bridge.block_type_to_image({
                                        block_type: type,
                                    })];
                            case 1:
                                result = _a.sent();
                                set_img_src(result.data_url);
                                return [3 /*break*/, 3];
                            case 2:
                                err_1 = _a.sent();
                                console.error(err_1);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); } }, type)); }))));
}
var root = document.querySelector('#mock_plugin_root');
if (root) {
    react_dom__WEBPACK_IMPORTED_MODULE_1__.render(react__WEBPACK_IMPORTED_MODULE_0__.createElement(MockPluginPanel, null), root);
}


/***/ }),

/***/ "./src/webview/blockly/toolbox/categories/block_data.ts":
/*!**************************************************************!*\
  !*** ./src/webview/blockly/toolbox/categories/block_data.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SEPARATE_LINE": function() { return /* binding */ SEPARATE_LINE; },
/* harmony export */   "HEAD_BLOCKS": function() { return /* binding */ HEAD_BLOCKS; },
/* harmony export */   "SPECIAL_HEAD_BLOCKS": function() { return /* binding */ SPECIAL_HEAD_BLOCKS; },
/* harmony export */   "category_blocks": function() { return /* binding */ category_blocks; },
/* harmony export */   "GENERAL_CATEGORIES": function() { return /* binding */ GENERAL_CATEGORIES; }
/* harmony export */ });
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
var __spread = (undefined && undefined.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var SEPARATE_LINE = 'flyout_gap_50';
var HEAD_BLOCKS = [
    'start_on_click',
    'self_on_tap',
    'on_phone_shake',
    'on_receive_sound',
    'on_phone_tilt',
    'on_swipe',
    'self_listen',
    'when',
    'on_running_group_activated',
    'start_as_a_mirror',
    'midi__on_play_section',
    'midi__on_play_note',
];
// 这几个积木的结构异常，在执行赋值粘贴的时候，不会出现next标签，而是出现statement标签
var SPECIAL_HEAD_BLOCKS = [
    'self_listen',
    'start_as_a_mirror',
    'midi__on_play_section',
    'midi__on_play_note',
];
// actors
// 第一屏中事件类的积木
var events = [
    'start_on_click',
    'self_on_tap',
    SEPARATE_LINE,
    'on_phone_shake',
    'on_receive_sound',
    'on_phone_tilt',
    'on_swipe',
    'when',
    SEPARATE_LINE,
    'self_listen',
    'self_broadcast',
    SEPARATE_LINE,
    'on_running_group_activated',
    'set_scene_by_index',
    'set_scene_transition',
    SEPARATE_LINE,
    'start_as_a_mirror',
    'mirror',
    'dispose',
    'get_current_clone_index',
    'get_clone_num',
    'get_clone_index_property',
    'stop',
    'restart',
];
// 除第一屏外，其他屏幕中事件类的积木
var events_further_screen = [
    'self_on_tap',
    'on_running_group_activated',
    'set_scene_by_index',
    'set_scene_transition',
    SEPARATE_LINE,
    'on_phone_shake',
    'on_receive_sound',
    'on_phone_tilt',
    'on_swipe',
    'when',
    SEPARATE_LINE,
    'self_listen',
    'self_broadcast',
    SEPARATE_LINE,
    'start_as_a_mirror',
    'mirror',
    'dispose',
    'get_current_clone_index',
    'get_clone_num',
    'get_clone_index_property',
    'stop',
    'restart',
];
var ACTOR_ONLY_EVENTS_BLOCKS = [
    'start_as_a_mirror',
    'dispose',
    'get_current_clone_index',
    'get_clone_num',
    'get_clone_index_property',
];
var control = [
    'repeat_forever',
    'repeat_n_times',
    'repeat_forever_until',
    'break',
    SEPARATE_LINE,
    'controls_if_no_else',
    'controls_if',
    SEPARATE_LINE,
    'wait',
    'wait_until',
];
var actions = [
    'self_go_forward',
    'self_rotate',
    'self_rotate_around',
    'self_bounce_off_edge',
    SEPARATE_LINE,
    'self_point_towards',
    'self_face_to',
    SEPARATE_LINE,
    'self_move_to',
    'self_move_specify',
    SEPARATE_LINE,
    'self_set_position_x',
    'self_set_position_y',
    'self_change_position_x',
    'self_change_position_y',
    SEPARATE_LINE,
    'self_glide_to',
    'self_glide_position_x',
    'self_glide_position_y',
    SEPARATE_LINE,
    'self_set_rotation_type',
    'self_set_role_camp',
];
// - self_rotate_around
// - self_bounce_off_edge
// - self_set_role_camp
var scene_actions = [
    'self_go_forward',
    'self_rotate',
    SEPARATE_LINE,
    'self_point_towards',
    'self_face_to',
    SEPARATE_LINE,
    'self_move_to',
    'self_move_specify',
    SEPARATE_LINE,
    'self_set_position_x',
    'self_set_position_y',
    'self_change_position_x',
    'self_change_position_y',
    SEPARATE_LINE,
    'self_glide_to',
    'self_glide_position_x',
    'self_glide_position_y',
    SEPARATE_LINE,
    'self_set_rotation_type',
];
var appearance = [
    'set_costume_by_index',
    'self_next_or_previous_style',
    SEPARATE_LINE,
    'self_appear',
    'self_disappear',
    'self_gradually_appear',
    'self_gradually_disappear',
    'self_translate_animation',
    SEPARATE_LINE,
    'show_stage_dialog',
    'self_dialog_wait',
    'self_dialog',
    SEPARATE_LINE,
    'self_ask',
    'get_answer',
    'ask_and_choose',
    'get_choice_or_index',
    SEPARATE_LINE,
    'set_scale',
    'self_change_scale',
    'set_width_height_scale',
    'add_width_height_scale',
    SEPARATE_LINE,
    'self_set_effect_2',
    'self_change_effect_2',
    'self_clear_effects',
    SEPARATE_LINE,
    'mobile_change_actor_layer',
    'self_flip',
];
// - self_translate_animation
// - 气泡相关
// - 询问相关
// - 角色属性相关
// - mobile_change_actor_layer
var scene_appearance = [
    'set_costume_by_index',
    'self_next_or_previous_style',
    SEPARATE_LINE,
    'self_appear',
    'self_disappear',
    'self_gradually_appear',
    'self_gradually_disappear',
    SEPARATE_LINE,
    'show_stage_dialog',
    'self_set_effect_2',
    'self_change_effect_2',
    'self_clear_effects',
    SEPARATE_LINE,
    'self_flip',
];
var sound = [
    'audio__play_audio',
    'audio__play_audio_and_wait',
    SEPARATE_LINE,
    'audio__stop_all_audios',
    SEPARATE_LINE,
    'audio__play_words_audio',
    'audio__play_words_audio_wait',
    SEPARATE_LINE,
    'midi__on_play_section',
    'midi__on_play_note',
    'midi__set_program',
    'midi__set_speed_rate',
    'midi__play_section',
    'midi__get_section_notes',
    'midi__get_bpm',
    'midi__get_playing_column',
];
var pen = [
    'self_pen_down',
    'self_pen_up',
    'clear_drawing',
    SEPARATE_LINE,
    'self_set_pen_size',
    'self_set_pen_color',
    'self_set_pen_color_property',
    SEPARATE_LINE,
    'self_change_pen_size',
    'self_change_pen_color_property',
    SEPARATE_LINE,
    'stamp',
    SEPARATE_LINE,
    'set_fill_style',
    'set_fill_path',
];
var sensing = [
    'mouse_down',
    'bump',
    'bump_into_color',
    'self_out_of_boundary',
    'check_sence',
    SEPARATE_LINE,
    'mobile__get',
    'self_distance_to',
    'get_mouse_info',
    'get_stage_info',
    SEPARATE_LINE,
    'get_orientation',
    'mobile__get_voice_volume',
    SEPARATE_LINE,
    'get_time',
    'mobile__set_timer',
    'mobile__show_timer',
    'mobile__timer_value',
];
var operators = [
    'math_arithmetic_common',
    'math_arithmetic_power',
    'random',
    SEPARATE_LINE,
    'math_number_property',
    'divisible_by',
    'logic_operation',
    SEPARATE_LINE,
    'math_single',
    'math_modulo',
    'math_trig_common',
    'math_trig_arc',
    'math_round',
    SEPARATE_LINE,
    'logic_compare',
    'logic_boolean',
    'logic_negate',
    SEPARATE_LINE,
    'mobile__text',
    'text_join',
    'text_length',
    'text_char_at',
    'text_contain',
    'text_split',
];
var cloud_var = [
    'cloud_variables_set',
    'change_cloud_variable',
    'show_hide_cloud_variable',
    'cloud_variables_get',
    SEPARATE_LINE,
    'show_ranking',
    'hide_ranking',
    // v4.8.0 做多语言版本时，产品经理（颢哥）觉得这个积木无用，隐藏
    // 'is_ranking_show_hide',
    SEPARATE_LINE,
    'username_get',
    'connected_users_get',
    'user_id_get',
];
var lists = [
    'lists_append',
    'lists_insert_value',
    'lists_delete',
    'lists_replace',
    'lists_copy',
    SEPARATE_LINE,
    'lists_get_value',
    'lists_length',
    'lists_index_of',
    'lists_is_exist',
    'show_hide_list',
    SEPARATE_LINE,
    'list_get',
];
var variables = [
    'variables_set',
    'change_variable',
    'show_hide_variable',
    'variables_get',
];
var advanced = [
    'warp',
];
var microbit_input = [
    'microbit_button_when',
    'microbit_logo_when',
    SEPARATE_LINE,
    'microbit_button_is_pressed',
    'microbit_logo_is_pressed',
    'microbit_is_gesture',
    SEPARATE_LINE,
    'microbit_light_level',
    'microbit_temperature',
    'microbit_sound_level',
    'microbit_accelerometer',
    'microbit_magnetometer',
    'microbit_compass_heading',
    'microbit_rotation',
];
var microbit_led = [
    'microbit_led_show_number',
    'microbit_led_show_text',
    SEPARATE_LINE,
    'microbit_led_show_icon',
    'microbit_led_show_custom',
    'microbit_led_plot_graph',
    SEPARATE_LINE,
    'microbit_led_clear',
    SEPARATE_LINE,
    'microbit_led_plot',
    'microbit_led_unplot',
    'microbit_led_toggle',
    'microbit_led_is_plot',
];
var microbit_buzzer = [
    'microbit_play_melody',
    SEPARATE_LINE,
    'microbit_play_tone_by_beats',
    'microbit_pause_by_beats',
    'microbit_stop',
    SEPARATE_LINE,
    'microbit_set_bpm',
    'microbit_change_bpm',
    SEPARATE_LINE,
    'microbit_set_volume',
    'microbit_get_volume',
];
var microbit_pin = [
    'microbit_pin_when',
    SEPARATE_LINE,
    'microbit_pin_digital_write',
    'microbit_pin_digital_read',
    SEPARATE_LINE,
    'microbit_pin_analog_write',
    'microbit_pin_analog_read',
    SEPARATE_LINE,
    'microbit_pin_set_touch_mode',
    'microbit_math_map',
];
var microbit_steering_engine = [
    'microbit_servo_set_angle_360',
    'microbit_servo_set_pulse',
];
var microbit = __spread([
    'microbit_input_line'
], microbit_input.filter(function (i) { return i !== SEPARATE_LINE; }), [
    SEPARATE_LINE,
    'microbit_led_line'
], microbit_led.filter(function (i) { return i !== SEPARATE_LINE; }), [
    SEPARATE_LINE,
    'microbit_buzzer_line'
], microbit_buzzer.filter(function (i) { return i !== SEPARATE_LINE; }), [
    SEPARATE_LINE,
    'microbit_pin_line'
], microbit_pin.filter(function (i) { return i !== SEPARATE_LINE; }), [
    SEPARATE_LINE,
    'microbit_steering_engine_line'
], microbit_steering_engine.filter(function (i) { return i !== SEPARATE_LINE; }), [
    SEPARATE_LINE,
]);
var category_blocks = {
    events: events,
    events_further_screen: events_further_screen,
    scene_events_first_screen: events.filter(function (b) { return ACTOR_ONLY_EVENTS_BLOCKS.indexOf(b) < 0; }),
    scene_events_further_screen: events_further_screen.filter(function (b) { return ACTOR_ONLY_EVENTS_BLOCKS.indexOf(b) < 0; }),
    control: control,
    actions: actions,
    scene_actions: scene_actions,
    appearance: appearance,
    scene_appearance: scene_appearance,
    sound: sound,
    pen: pen,
    sensing: sensing,
    operators: operators,
    cloud_var: cloud_var,
    lists: lists,
    variables: variables,
    advanced: advanced,
    extensions: [],
    microbit: microbit,
    microbit_input: microbit_input,
    microbit_led: microbit_led,
    microbit_buzzer: microbit_buzzer,
    microbit_pin: microbit_pin,
    microbit_steering_engine: microbit_steering_engine,
};
/**
 * Nemo中积木的基本分类，不考虑背景与角色之类的的差异
 */
var GENERAL_CATEGORIES = {
    events: events,
    control: control,
    actions: actions,
    appearance: appearance,
    sound: sound,
    pen: pen,
    sensing: sensing,
    operators: operators,
    cloud_var: cloud_var,
    lists: lists,
    variables: variables,
    advanced: advanced,
    /**
     * 函数部分的积木参数来自于 webview/blockly/override
     */
    procedure: [
        'procedures_2_callnoreturn',
        'procedures_2_callreturn',
        'procedures_2_defnoreturn',
        'procedures_2_return_value',
        'procedures_2_parameter',
    ],
    extensions: [],
    microbit: microbit,
};


/***/ })

}]);
//# sourceMappingURL=09cbbf34502b101864c9.chunk.js.map