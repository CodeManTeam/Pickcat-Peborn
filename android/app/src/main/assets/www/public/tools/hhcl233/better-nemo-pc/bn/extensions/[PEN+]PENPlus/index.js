/// <reference path="../_TYPE.d.ts"/>
Extension.metaData = {
    name: "PEN+ (画笔扩展)",
    version: "0.0.1",
    author: "方圆圆"
};

(async () => {
    /** @type {BetterNemo} */
    const BN = Extension.API;
    const Toolbox = BN.Toolbox;
    await BN.waitBlocklyLoaded();
    BN.addIcon(`<symbol viewBox="-45 -45 130 130" id="icon-pen-plus"><defs><clipPath id="master_svg0_248_1950"><rect x="0" y="0" width="44" height="44" rx="0"/></clipPath><clipPath id="master_svg1_248_1973"><rect x="0" y="10" width="44" height="24" rx="0"/></clipPath></defs><g clip-path="url(#master_svg0_248_1950)"><g clip-path="url(#master_svg1_248_1973)"><path d="M10,16.461556903125L10,13.692326303125L11.5,13.692326303125L11.5,16.461556903125L10,16.461556903125ZM4,30.307710703125L4,10.923095703125L10,10.923095703125L10,13.692326303125L5.5,13.692326303125L5.5,16.461556903125L10,16.461556903125L10,19.230788203125L5.5,19.230788203125L5.5,30.307710703125L4,30.307710703125ZM13,30.307710703125L13,10.923095703125L20.5,10.923095703125L20.5,13.692326303125L14.5,13.692326303125L14.5,16.461556903125L17.5,16.461556903125L17.5,19.230788203125L14.5,19.230788203125L14.5,27.538480703125L20.5,27.538480703125L20.5,30.307710703125L13,30.307710703125ZM25,19.230788203125L25,16.461556903125L26.5,16.461556903125L26.5,19.230788203125L25,19.230788203125ZM22,30.307710703125L22,10.923095703125L23.5,10.923095703125L23.5,13.692326303125L25,13.692326303125L25,16.461556903125L23.5,16.461556903125L23.5,30.307710703125L22,30.307710703125ZM28,30.307710703125L28,22.000017703125L26.5,22.000017703125L26.5,19.230788203125L28,19.230788203125L28,10.923095703125L29.5,10.923095703125L29.5,30.307710703125L28,30.307710703125ZM34,27.538480703125L34,22.000017703125L31,22.000017703125L31,19.230788203125L34,19.230788203125L34,13.692326303125L35.5,13.692326303125L35.5,19.230788203125L38.5,19.230788203125L38.5,22.000017703125L35.5,22.000017703125L35.5,27.538480703125L34,27.538480703125Z" fill-opacity="1" style="mix-blend-mode:passthrough"/></g></g></symbol>`);
    BN.addToolbox("pen-plus", "icon-pen-plus", "#2BCAA7", [
        Toolbox.title("画笔扩展 · PEN+"),
        Toolbox.block("bn_color"),
        Toolbox.block("bn_hex_to_array"),
        Toolbox.block("bn_set_pen_color_hex"),
        Toolbox.block("bn_set_fill_color_hex"),
        Toolbox.block("bn_draw_image_stamp"),
        Toolbox.block("bn_draw_custom_image_stamp"),
        Toolbox.block("bn_draw_video_stamp"),
        Toolbox.block("bn_draw_svg"),
        Toolbox.block("bn_rectangle_clear"),
        Toolbox.block("bn_better_draw_text_stamp"),
        Toolbox.block("bn_put_pixel"),
        Toolbox.block("bn_fill_polygon"),
        Toolbox.sep(),
        Toolbox.block("bn_dataURL_actor"),
        Toolbox.block("bn_dataURL_stage"),
        Toolbox.flyout_bottom()
    ]);
})();