
(async () => {
    BetterNemo.log("积木", "等待Blockly加载");
    await isBlocklyLoaded();
    BetterNemo.log("积木", "等待Workspace加载");
    await isBlocklyMainworkspaceLoaded();
    BetterNemo.log("积木", "积木注入开始");
    Blockly.mainWorkspace.add_change_listener(() => {
        rootBlockChecks.forEach((check) => {
            checkRootBlock(check);
        });
        function getRealParent(block) {
            const parent = block.get_parent();
            if (!parent) return undefined;
            const self = parent.get_next_block();
            if (self) {
                if (block.id === self.id)
                    return getRealParent(parent);
                return parent;
            } else return parent;
        }
        const allBlocks = Blockly.mainWorkspace.get_all_blocks();
        // 实验性功能：禁用一步执行中的死循环
        if (experimentalConfig.disable_repeat_forever_in_warp)
            allBlocks.filter((block) => block.type == "repeat_forever")
                .forEach((block) => {
                    const parent = getRealParent(block);
                    if (parent)
                        if (parent.type == "warp") {
                            block._disabled = true;
                            setTimeout(() => {
                                block.dispose();
                            }, 1000);
                        }
                });
        // C口注释积木
        allBlocks.forEach(block => {
            let rootParent = getRealParent(block);
            while (rootParent) {
                if (rootParent.type == "bn_comment") {
                    block._disabled = true;
                    return;
                }
                rootParent = getRealParent(rootParent);
            }
            block._disabled = false;
        });
        allBlocks.forEach(block => {
            if (block.get_colour() != Blockly.theme.disabled_color.fill)
                block._color = block.get_colour();
            if (block._disabled)
                block.set_colour(Blockly.theme.disabled_color.fill);
            else if (block._color)
                block.set_colour(block._color);
        });
    });
    (function regToolboxIcon() {
        document
            .querySelector("#__SVG_SPRITE_NODE__")
            .insertAdjacentHTML(
                "beforeend",
                '<symbol id="icon-feature" viewBox="-1100 -1050 3200 3200"><path d="M484.352 199.918933a55.296 55.296 0 0 1 50.517333-2.4576l4.778667 2.4576 228.795733 132.096c15.5648 8.977067 25.668267 24.8832 27.409067 42.530134l0.238933 5.358933v264.192a55.296 55.296 0 0 1-23.1424 44.987733l-4.5056 2.901334-228.795733 132.096a55.296 55.296 0 0 1-50.517333 2.4576l-4.778667-2.4576-228.795733-132.096a55.296 55.296 0 0 1-27.409067-42.530134l-0.238933-5.358933v-264.192c0-17.954133 8.704-34.679467 23.1424-44.987733l4.5056-2.901334 228.795733-132.096z m27.648 54.954667l-222.651733 128.580267v257.092266L512 769.092267l222.651733-128.546134v-257.092266L512 254.907733z m120.900267 147.319467a30.72 30.72 0 0 1 2.628266 40.311466l-2.730666 3.140267-88.507734 87.9616v102.570667a30.72 30.72 0 0 1-61.201066 3.857066l-0.238934-3.857066v-101.5808l-88.576-89.088a30.72 30.72 0 0 1 40.413867-46.08l3.140267 2.7648 75.298133 75.741866 76.322133-75.844266a30.72 30.72 0 0 1 43.451734 0.1024z"></path></symbol>',
            );
        document
            .querySelector("#__SVG_SPRITE_NODE__")
            .insertAdjacentHTML(
                "beforeend",
                '<symbol id="icon-widget-http-client" viewBox="-2000 -2000 5000 5000"><path d="M512 98.133333c143.914667 0 266.837333 99.882667 301.653333 237.781334l2.56 10.965333 9.301334 2.730667c105.6 33.450667 181.12 131.669333 185.472 246.528l0.213333 10.496c0 145.237333-113.066667 263.808-254.848 268.970666l-9.685333 0.213334-164.352-0.042667 40.746666 42.154667a29.866667 29.866667 0 0 1 2.517334 38.570666l-3.242667 3.626667a29.866667 29.866667 0 0 1-38.570667 2.517333l-3.626666-3.242666-89.6-92.714667a29.866667 29.866667 0 0 1-2.901334-37.973333l3.029334-3.712 89.6-91.306667a29.866667 29.866667 0 0 1 45.781333 38.058667l-3.114667 3.754666-39.850666 40.533334H746.666667c112.981333 0 204.8-93.610667 204.8-209.408 0-98.005333-66.261333-181.845333-157.525334-203.818667l-9.216-2.005333-20.778666-3.968-3.114667-20.906667C742.144 251.050667 636.586667 157.866667 512 157.866667c-135.722667 0-246.613333 109.909333-251.605333 246.357333l-0.085334 10.88 1.28 27.946667-27.776 3.114666c-91.306667 10.24-161.28 89.472-161.28 184.405334 0 99.541333 76.586667 180.608 172.544 185.301333l8.789334 0.213333h23.466666a29.866667 29.866667 0 0 1 4.053334 59.434667l-4.053334 0.298667h-23.466666C120.576 875.818667 12.8 765.866667 12.8 630.570667c0-115.072 78.293333-212.949333 185.344-238.677334l3.285333-0.768 0.597334-7.082666c15.018667-156.970667 142.549333-280.533333 299.690666-285.738667L512 98.133333z m55.978667 374.912c13.269333 0 23.253333 0.853333 30.72 2.133334 10.794667 1.706667 19.925333 5.632 28.202666 11.221333 7.893333 5.589333 14.506667 13.781333 19.114667 23.68 4.949333 10.325333 7.04 21.546667 6.613333 32.298667 0 19.84-6.229333 37.077333-18.645333 50.432-12.458667 14.208-33.237333 21.077333-63.914667 21.077333h-35.285333v78.421333l-49.792 0.426667v-219.733333h82.986667z m145.237333 0v219.690667H663.04v-219.733333h50.218667z m-319.957333 0l86.741333 219.690667H423.978667l-21.973334-58.581333H342.186667l-20.352 58.581333H267.946667l81.322666-219.733333h43.989334z m-21.546667 76.672l-12.885333 37.034667h26.154666l-12.885333-35.754667-0.426667-1.28z m198.357333-27.562666h-34.858666v42.666666h35.242666c16.64 0 22.826667-3.925333 25.344-6.058666 3.712-3.413333 5.802667-9.045333 5.802667-15.957334a22.613333 22.613333 0 0 0-3.328-12.928 16.981333 16.981333 0 0 0-8.704-6.4c-1.28-0.469333-5.418667-1.322667-19.498667-1.322666z"></path></symbol>',
            );
        document
            .querySelector("#__SVG_SPRITE_NODE__")
            .insertAdjacentHTML(
                "beforeend",
                '<symbol id="icon-cubes" viewBox="-1200 -1230 3000 3000"><path d="M290.8 48.6l78.4 29.7L288 109.5 206.8 78.3l78.4-29.7c1.8-.7 3.8-.7 5.7 0zM136 92.5l0 112.2c-1.3 .4-2.6 .8-3.9 1.3l-96 36.4C14.4 250.6 0 271.5 0 294.7L0 413.9c0 22.2 13.1 42.3 33.5 51.3l96 42.2c14.4 6.3 30.7 6.3 45.1 0L288 457.5l113.5 49.9c14.4 6.3 30.7 6.3 45.1 0l96-42.2c20.3-8.9 33.5-29.1 33.5-51.3l0-119.1c0-23.3-14.4-44.1-36.1-52.4l-96-36.4c-1.3-.5-2.6-.9-3.9-1.3l0-112.2c0-23.3-14.4-44.1-36.1-52.4l-96-36.4c-12.8-4.8-26.9-4.8-39.7 0l-96 36.4C150.4 48.4 136 69.3 136 92.5zM392 210.6l-82.4 31.2 0-89.2L392 121l0 89.6zM154.8 250.9l78.4 29.7L152 311.7 70.8 280.6l78.4-29.7c1.8-.7 3.8-.7 5.7 0zm18.8 204.4l0-100.5L256 323.2l0 95.9-82.4 36.2zM421.2 250.9c1.8-.7 3.8-.7 5.7 0l78.4 29.7L424 311.7l-81.2-31.1 78.4-29.7zM523.2 421.2l-77.6 34.1 0-100.5L528 323.2l0 90.7c0 3.2-1.9 6-4.8 7.3z"></path></symbol>',
            );
        document
            .querySelector("#__SVG_SPRITE_NODE__")
            .insertAdjacentHTML(
                "beforeend",
                '<symbol id="icon-websocket" viewBox="-2000 -2000 5000 5000"><path d="M1020.329474 56.127926l-53.203442-53.203442a10.316693 10.316693 0 0 0-14.324004 0l-95.408095 95.408096A249.817445 249.817445 0 0 0 716.797016 55.445831c-64.202231 0-128.404461 24.470173-177.344807 73.49578l-127.89289 127.722366a10.060907 10.060907 0 0 0 0 14.238742l340.79192 340.706658a9.890383 9.890383 0 0 0 7.07674 2.984168c2.557858 0 5.115716-1.023143 7.162002-2.984168l127.807628-127.722366a251.096373 251.096373 0 0 0 30.438507-318.026985l95.408096-95.493358a10.231431 10.231431 0 0 0 0-14.238742zM595.469294 555.08072a10.060907 10.060907 0 0 0-14.153479 0l-83.556688 83.556688-113.313101-113.142577 83.727212-83.727211a10.060907 10.060907 0 0 0 0-14.15348l-45.700392-45.615131a10.060907 10.060907 0 0 0-14.15348 0l-83.556688 83.64195-53.9708-53.970799a9.805122 9.805122 0 0 0-7.162001-2.898906 10.657741 10.657741 0 0 0-7.162002 2.898906L128.745509 539.477787a251.096373 251.096373 0 0 0-30.438508 318.026986l-95.408096 95.493358a10.060907 10.060907 0 0 0 0 14.068218l53.118181 53.203442c4.007311 3.836787 10.316693 3.836787 14.324003 0l95.408096-95.408096a249.817445 249.817445 0 0 0 140.596917 43.057273c64.202231 0 128.404461-24.555435 177.515331-73.581043L611.583799 766.530298a10.060907 10.060907 0 0 0 0-14.238742l-53.885538-53.800276 83.556688-83.727212a10.060907 10.060907 0 0 0 0-14.153479l-45.785655-45.444607z" p-id="5808"></path></symbol>',
            );
    })();
    const Color = {
        video: "%{BKY_VIDEO_HUE}",
        mqtt: "%{BKY_MQTT_HUE}",
        feature: "%{BKY_GREEN_5}",
        var: "%{BKY_VARIABLES_HUE}",
    };
    Blockly.theme.block_color["DISABLED_COLOR"] = {
        fill: "#9399a4",
        border: "#9399a4",
    };
    const method_block = {
        previousStatement: true,
        nextStatement: true,
        inputsInline: true,
    };
    const event_block = {
        nextStatement: true,
        inputsInline: true,
    };
    const keyboard_event_icon_field = {
        type: "field_icon",
        is_head: true,
        src: "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgNDAgNDAiIHZlcnNpb249IjEuMSI+CiAgICA8ZyBpZD0i5Zu+5qCHL+S6i+S7tuenr+acqF/mkq3mlL4iPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMCwzOSBDMzAuNDkzNDEwMiwzOSAzOSwzMC40OTM0MTA1IDM5LDIwIEMzOSw5LjUwNjU4OTgxIDMwLjQ5MzQxMDIsMSAyMCwxIEM5LjUwNjU4OTgxLDEgMSw5LjUwNjU4OTgxIDEsMjAgQzEsMzAuNDkzNDEwNSA5LjUwNjU4OTgxLDM5IDIwLDM5IFoiIGlkPSJwYXRoLTEiIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIvPgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE5Ljc1LDUgQzIwLjk5MjY0MDcsNSAyMiw2LjAwNzM1OTMxIDIyLDcuMjUgTDIyLDE2Ljc1IEMyMiwxNy45OTI2NDA3IDIwLjk5MjY0MDcsMTkgMTkuNzUsMTkgTDQuMjUsMTkgQzMuMDA3MzU5MzEsMTkgMiwxNy45OTI2NDA3IDIsMTYuNzUgTDIsNy4yNSBDMiw2LjAwNzM1OTMxIDMuMDA3MzU5MzEsNSA0LjI1LDUgTDE5Ljc1LDUgWiBNMTcuMjUsMTUgTDYuNzUsMTUgQzYuMTk3NzE1MjUsMTUgNiwxNS41IDYsMTUuNzUgQzYsMTUuOTgwNzY5MiA2LjE2ODQ2NzQzLDE2LjQyNDU1NjIgNi42Mjg3NzI0MSwxNi40OTE0NjU2IEw2Ljc1LDE2LjUgTDE3LjI1LDE2LjUgQzE3LjgwMjI4NDcsMTYuNSAxOCwxNiAxOCwxNS43NSBDMTgsMTUuNSAxNy44MDIyODQ3LDE1IDE3LjI1LDE1IFogTTYsMTEgQzUuNDQ3NzE1MjUsMTEgNSwxMS40NDc3MTUzIDUsMTIgQzUsMTIuNTUyMjg0NyA1LjQ0NzcxNTI1LDEzIDYsMTMgQzYuNTUyMjg0NzUsMTMgNywxMi41NTIyODQ3IDcsMTIgQzcsMTEuNDQ3NzE1MyA2LjU1MjI4NDc1LDExIDYsMTEgWiBNMTAsMTEgQzkuNDQ3NzE1MjUsMTEgOSwxMS40NDc3MTUzIDksMTIgQzksMTIuNTUyMjg0NyA5LjQ0NzcxNTI1LDEzIDEwLDEzIEMxMC41NTIyODQ3LDEzIDExLDEyLjU1MjI4NDcgMTEsMTIgQzExLDExLjQ0NzcxNTMgMTAuNTUyMjg0NywxMSAxMCwxMSBaIE0xNCwxMSBDMTMuNDQ3NzE1MywxMSAxMywxMS40NDc3MTUzIDEzLDEyIEMxMywxMi41NTIyODQ3IDEzLjQ0NzcxNTMsMTMgMTQsMTMgQzE0LjU1MjI4NDcsMTMgMTUsMTIuNTUyMjg0NyAxNSwxMiBDMTUsMTEuNDQ3NzE1MyAxNC41NTIyODQ3LDExIDE0LDExIFogTTE4LDExIEMxNy40NDc3MTUzLDExIDE3LDExLjQ0NzcxNTMgMTcsMTIgQzE3LDEyLjU1MjI4NDcgMTcuNDQ3NzE1MywxMyAxOCwxMyBDMTguNTUyMjg0NywxMyAxOSwxMi41NTIyODQ3IDE5LDEyIEMxOSwxMS40NDc3MTUzIDE4LjU1MjI4NDcsMTEgMTgsMTEgWiBNNiw3IEM1LjQ0NzcxNTI1LDcgNSw3LjQ0NzcxNTI1IDUsOCBDNSw4LjU1MjI4NDc1IDUuNDQ3NzE1MjUsOSA2LDkgQzYuNTUyMjg0NzUsOSA3LDguNTUyMjg0NzUgNyw4IEM3LDcuNDQ3NzE1MjUgNi41NTIyODQ3NSw3IDYsNyBaIE0xMCw3IEM5LjQ0NzcxNTI1LDcgOSw3LjQ0NzcxNTI1IDksOCBDOSw4LjU1MjI4NDc1IDkuNDQ3NzE1MjUsOSAxMCw5IEMxMC41NTIyODQ3LDkgMTEsOC41NTIyODQ3NSAxMSw4IEMxMSw3LjQ0NzcxNTI1IDEwLjU1MjI4NDcsNyAxMCw3IFogTTE0LDcgQzEzLjQ0NzcxNTMsNyAxMyw3LjQ0NzcxNTI1IDEzLDggQzEzLDguNTUyMjg0NzUgMTMuNDQ3NzE1Myw5IDE0LDkgQzE0LjU1MjI4NDcsOSAxNSw4LjU1MjI4NDc1IDE1LDggQzE1LDcuNDQ3NzE1MjUgMTQuNTUyMjg0Nyw3IDE0LDcgWiBNMTgsNyBDMTcuNDQ3NzE1Myw3IDE3LDcuNDQ3NzE1MjUgMTcsOCBDMTcsOC41NTIyODQ3NSAxNy40NDc3MTUzLDkgMTgsOSBDMTguNTUyMjg0Nyw5IDE5LDguNTUyMjg0NzUgMTksOCBDMTksNy40NDc3MTUyNSAxOC41NTIyODQ3LDcgMTgsNyBaIiBpZD0i5b2i54q257uT5ZCIIiBmaWxsPSIjMTRCMzkwIi8+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgCjwvc3ZnPg==",
        width: 38,
        height: 38,
        alt: "*",
    };

    const connect_event_icon_field = {
        type: "field_icon",
        is_head: true,
        src: "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBmaWxsPSJub25lIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIzOCIgaGVpZ2h0PSIzOCIgdmlld0JveD0iMCAwIDM4IDM4Ij48ZGVmcz48Y2xpcFBhdGggaWQ9Im1hc3Rlcl9zdmcwXzIzMl8xOTI2Ij48cmVjdCB4PSItMC41NDAwMDAwMjE0NTc2NzIxIiB5PSItMC41NDAwMDAwMjE0NTc2NzIxIiB3aWR0aD0iMzkuMDgwMDAwMDQyOTE1MzQ0IiBoZWlnaHQ9IjM5LjA4MDAwMDA0MjkxNTM0NCIgcng9IjAiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBjbGlwLXBhdGg9InVybCgjbWFzdGVyX3N2ZzBfMjMyXzE5MjYpIj48ZWxsaXBzZSBjeD0iMTguOTk5OTk5MTA1OTMwMzMiIGN5PSIxOC45OTk5OTkxMDU5MzAzMyIgcng9IjE4LjcyOTk5OTA5NTIwMTQ5MiIgcnk9IjE4LjcyOTk5OTA5NTIwMTQ5MiIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1vcGFjaXR5PSIxIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6cGFzc3Rocm91Z2giLz48ZWxsaXBzZSBjeD0iMTguOTk5OTk5MTA1OTMwMzMiIGN5PSIxOC45OTk5OTkxMDU5MzAzMyIgcng9IjE4LjE4OTk5OTA3Mzc0MzgyIiByeT0iMTguMTg5OTk5MDczNzQzODIiIGZpbGwtb3BhY2l0eT0iMCIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZT0iIzY4Q0RGRiIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjA4MDAwMDA0MjkxNTM0NDIiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpwYXNzdGhyb3VnaCIvPjxwYXRoIGQ9Ik0xNC4wNjMyOTE1LDI5QzEyLjc5NzQ2ODcsMjksMTEuNTMxNjQ1OCwyOC40OTM2NzEsMTAuNTE4OTg3NSwyNy40ODEwMTRDOC40OTM2NzA4OCwyNS40NTU2OTYsOC40OTM2NzA4OCwyMi4yOTExNDEsMTAuNTE4OTg3NSwyMC4yNjU4MjI5OTk5OTk5OTdMMTMuMTc3MjE1NiwxNy42MDc1OTU0TDE0Ljk0OTM2NzUwMDAwMDAwMSwxOS4zNzk3NDcwMDAwMDAwMDJMMTIuMjkxMTM5NCwyMi4wMzc5NzRDMTEuMjc4NDgxMiwyMy4wNTA2MzI5OTk5OTk5OTgsMTEuMjc4NDgxMiwyNC41Njk2MiwxMi4yOTExMzk0LDI1LjU4MjI3OUMxMy4zMDM3OTc3LDI2LjU5NDkzOCwxNC44MjI3ODU0LDI2LjU5NDkzOCwxNS44MzU0NDM1LDI1LjU4MjI3OUwxOS4zNzk3NDgsMjIuMDM3OTc0QzE5Ljg4NjA3NywyMS41MzE2NDYwMDAwMDAwMDIsMjAuMTM5MjQzLDIwLjg5ODczNTAwMDAwMDAwMiwyMC4xMzkyNDMsMjAuMjY1ODIyOTk5OTk5OTk3QzIwLjEzOTI0MywxOS42MzI5MTE5OTk5OTk5OTcsMTkuODg2MDc3LDE5LDE5LjUwNjMyOSwxOC40OTM2NzE0TDE4LjExMzkyNTAwMDAwMDAwMiwxNy4yMjc4NDgxTDE5Ljg4NjA3NywxNS40NTU2OTYxTDIxLjI3ODQ4MywxNi44NDgxMDExQzIyLjE2NDU1NzAwMDAwMDAwMiwxNy43MzQxNzc2MDAwMDAwMDIsMjIuNjcwODg2LDE5LDIyLjY3MDg4NiwyMC4zOTI0MDZDMjIuNjcwODg2LDIxLjc4NDgxMjAwMDAwMDAwMiwyMi4xNjQ1NTcwMDAwMDAwMDIsMjMuMDUwNjM0MDAwMDAwMDAyLDIxLjE1MTg5OTk5OTk5OTk5OCwyMy45MzY3MDk5OTk5OTk5OThMMTcuNjA3NTk1NCwyNy40ODEwMTRDMTYuNzIxNTE5NSwyOC40OTM2NzEsMTUuMzI5MTE0NCwyOSwxNC4wNjMyOTE1LDI5Wk0xOC4xMTM5MjUwMDAwMDAwMDIsMjIuNTQ0MzA1TDE2LjcyMTUxOTUsMjEuMjc4NDgxQzE0LjY5NjIwMzIsMTkuMjUzMTYzOTk5OTk5OTk4LDE0LjY5NjIwMzIsMTYuMDg4NjA4MywxNi43MjE1MTk1LDE0LjA2MzI5MTVMMjAuMjY1ODIyOTk5OTk5OTk3LDEwLjUxODk4NzVDMjIuMjkxMTQxLDguNDkzNjcwODgsMjUuNDU1Njk4LDguNDkzNjcwODgsMjcuNDgxMDE0LDEwLjUxODk4NzVDMjkuNTA2MzI5LDEyLjU0NDMwNDQsMjkuNTA2MzI5LDE1LjcwODg2MTQsMjcuNDgxMDE0LDE3LjczNDE3NzYwMDAwMDAwMkwyNC44MjI3ODYsMjAuMzkyNDA2TDIzLjA1MDYzNDAwMDAwMDAwMiwxOC42MjAyNTM1OTk5OTk5OThMMjUuNzA4ODYyLDE1Ljk2MjAyNTZDMjYuNzIxNTIzLDE0Ljk0OTM2NzUwMDAwMDAwMSwyNi43MjE1MjMsMTMuNDMwMzc5OSwyNS43MDg4NjIsMTIuNDE3NzIxN0MyNC42OTYyMDYsMTEuNDA1MDYzNiwyMy4wNTA2MzQwMDAwMDAwMDIsMTEuNDA1MDYzNiwyMi4xNjQ1NiwxMi40MTc3MjE3TDE4LjQ5MzY3MTQsMTUuODM1NDQzQzE3LjQ4MTAxMzMsMTYuODQ4MTAxNiwxNy40ODEwMTMzLDE4LjM2NzA4OTMsMTguNDkzNjcxNCwxOS4zNzk3NDcwMDAwMDAwMDJMMTkuODg2MDc3LDIwLjc3MjE1M0wxOC4xMTM5MjUwMDAwMDAwMDIsMjIuNTQ0MzA1WiIgZmlsbD0iIzY4Q0RGRiIgZmlsbC1vcGFjaXR5PSIxIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6cGFzc3Rocm91Z2giLz48L2c+PC9zdmc+",
        width: 38,
        height: 38,
        alt: "*",
    };
    const var_icon_field = {
        type: "field_image",
        src: "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBmaWxsPSJub25lIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIyMS4wNjg0MDEzMzY2Njk5MjIiIGhlaWdodD0iMTguNjU5OTk5ODQ3NDEyMTEiIHZpZXdCb3g9IjAgMCAyMS4wNjg0MDEzMzY2Njk5MjIgMTguNjU5OTk5ODQ3NDEyMTEiPjxwYXRoIGQ9Ik0xOS45ODg0MDEsNS4zNjQ0MThlLTdDMjAuNTMyNDk3LC0wLjAwMDA3MjQxOTY0MywyMC45OTE2ODYsMC40MDQ2MTIzLDIxLjA2MDAwMSwwLjk0NDQwMDQzTDIxLjA2ODQwMSwxLjA4TDIxLjA2NzIwNCwxMy41MDM1OTlMMjEuMDYwMDAzLDE0LjA3MzU5OUwyMS4wNDgwMDQsMTQuNTgxMkwyMS4wMjY0MDUsMTUuMDMyMzk4TDIwLjk5NjQwNSwxNS40MzE5OThDMjAuODg4NDA1LDE2LjU2MjM5OSwyMC42MzI4MDUsMTcuMDc5NTk3LDIwLjAzMjgwNiwxNy42NjM5OThDMTkuNDczNjA2LDE4LjIwODc5NiwxOC45NzY4MDUsMTguNDU5NTk5LDE3Ljk1MzIwNSwxOC41NzIzOTVMMTcuNTY5MjA0LDE4LjYwNTk5OUwxNy4xMzcyMDMsMTguNjI5OTk3TDE2LjM4MTIwMywxOC42NTE1OTZMMTUuNDgyNDA0LDE4LjY2TDEzLjkzODAwMywxOC42NkMxMy4zNjc0NjQsMTguNjYwNjE0LDEyLjg5NDg2NiwxOC4yMTczNCwxMi44NTg5OCwxNy42NDc5M0MxMi44MjMwOTQsMTcuMDc4NTIsMTMuMjM2MywxNi41Nzk0MjIsMTMuODAyNDAyLDE2LjUwODM5OEwxMy45MzgwMDMsMTYuNDk5OTk4TDE1LjcyMjQwNCwxNi40OTg3OThMMTYuMjMzNjAzLDE2LjQ5MjhMMTYuODc0NDAxLDE2LjQ3NzJMMTcuMjI0OCwxNi40NjA0TDE3LjUyMTIsMTYuNDM3NTk5TDE3LjY1MDgwMSwxNi40MjU2TDE3Ljg3NjQsMTYuMzkyTDE3Ljk3MzU5OCwxNi4zNzM5OTlMMTguMTQxNiwxNi4zMzA3OTdDMTguMjA5NDk0LDE2LjMxMTAxMiwxOC4yNzUzODMsMTYuMjg0ODk5LDE4LjMzODM5OCwxNi4yNTI3OThMMTguNDQwMzk3LDE2LjE4OTE5OEwxOC40ODQ3OTgsMTYuMTUzMTk2TDE4LjU2Mzk5NywxNi4wNzc1OTdMMTguNjMxMTk3LDE1Ljk4ODc5N0MxOC42NTMzNDMsMTUuOTU1MDc2LDE4LjY3Mjk5NywxNS45MTk3ODMsMTguNjg5OTk3LDE1Ljg4MzE5OEwxOC43NDAzOTYsMTUuNzUxMTk5QzE4Ljc1Njg5NSwxNS42OTg2ODgsMTguNzcwOTEyLDE1LjY0NTQzLDE4Ljc4MjM5NiwxNS41OTE1OTlMMTguODI1NTk2LDE1LjM0MDc5OUwxOC44NTc5OTYsMTUuMDI0TDE4Ljg4NTU5NywxNC41MzkyMDFMMTguODk3NTk2LDE0LjE0NDQwMUwxOC45MDQ3OTUsMTMuNjg2MDAxTDE4LjkwODM5NiwxMi44NjUxOTlMMTguOTA4Mzk2LDIuMTYwMDAxM0wxMy45Mzc5OTYsMi4xNjAwMDEzQzEzLjM5MzkwMywyLjE2MDA3NTIsMTIuOTM0NzExLDEuNzU1Mzg5OSwxMi44NjYzOTYsMS4yMTU2MDA3TDEyLjg1Nzk5NSwxLjA4MDAwMTFDMTIuODU3OTIyLDAuNTM1OTA3NTEsMTMuMjYyNjA2LDAuMDc2NzE2MDA2LDEzLjgwMjM5NSwwLjAwODQwMTIxNTFMMTMuOTM3OTk0LDAuMDAwMDAxMDcyODgzNkwxOS45ODg0MDEsNS4zNjQ0MThlLTdaTTcuMTMxNjAwNCw1LjM2NDQxOGUtN0M3LjcwMjE0MDgsLTAuMDAwNjEzNjg5NDIsOC4xNzQ3NDA4LDAuNDQyNjU5OTcsOC4yMTA2MjY2LDEuMDEyMDcwNEM4LjI0NjUxMjQsMS41ODE0ODA5LDcuODMzMzAzLDIuMDgwNTgwOSw3LjI2NzIsMi4xNTE2MDA0TDcuMTMxNjAwNCwyLjE2MDAwMDFMNS4zNDcyMDA5LDIuMTYxMjAwNUw0LjgzNjAwMDksMi4xNjcyMDAxTDQuMTk1MjAwOSwyLjE4Mjc5OThMMy44NDQ4MDEyLDIuMTk5NjAwMkwzLjU0ODQwMTEsMi4yMjI0MDAyTDMuNDE4ODAxMSwyLjIzNDQwMDNMMy4xOTMyMDE1LDIuMjY3OTk5NkwzLjAwNzIwMSwyLjMwNjM5OTNDMi44NTI1Njg0LDIuMzM4OTU1OSwyLjcwNzgyOSwyLjQwNzYyNTksMi41ODQ4MDE0LDIuNTA2Nzk5TDIuNTQ0MDAxOCwyLjU0Mzk5OTJDMi40NTkwNjE2LDIuNjI2ODM5NiwyLjM5Mzg1MDYsMi43Mjc3MzE1LDIuMzUzMjAyMywyLjgzOTE5ODZMMi4zMDc2MDI2LDIuOTgzMTk5MUwyLjI4NzIwMjgsMy4wNjcxOTkyTDIuMjUxMjAzMywzLjI2Mzk5OTVMMi4yMzY4MDMxLDMuMzc2Nzk5MUwyLjIxMTYwMzIsMy42MzU5OTkyTDIuMTkxMjAzNCwzLjk0NTU5OTFMMi4xNzY4MDMxLDQuMzEwMzk5MUwyLjE2ODQwMzQsNC43MzYzOTkyTDIuMTYxMjAzNCw1Ljc5NDc5ODlMMi4xNjEyMDM0LDE2LjVMNy4xMzE2MDI4LDE2LjVDNy42NzU2OTY0LDE2LjQ5OTkyOCw4LjEzNDg4ODYsMTYuOTA0NjEsOC4yMDMyMDMyLDE3LjQ0NDM5OUw4LjIxMTYwMzIsMTcuNThDOC4yMTE2NzY2LDE4LjEyNDA5NCw3LjgwNjk5MTYsMTguNTgzMjg0LDcuMjY3MjAyNCwxOC42NTE2TDcuMTMxNjAyOCwxOC42NkwxLjA4LDE4LjY2QzAuNTM1OTA2OTcsMTguNjYwMDc2LDAuMDc2NzE0OTMzLDE4LjI1NTM5LDAuMDA4NDAwMTQyMiwxNy43MTU2MDFMMCwxNy41ODAwMDJMMC4wMDEyMDAwMjAzLDUuMTU2NDAyMUwwLjAxMzIwMDIyMyw0LjMyNjAwMjFMMC4wMjk5OTk5NzEsMy44NDYwMDIzTDAuMDU2Mzk5ODgyLDMuNDIxMjAyN0MwLjE0MTU5OTcxLDIuMjg4NDAyOCwwLjM1MTYwMDA1LDEuNzM1MjAyNiwwLjg0ODM5OTg4LDEuMTg5MjAyNEwxLjAzNTU5OTgsMC45OTcyMDI0TDEuMTMzOTk5OCwwLjkwMzYwMTg4TDEuMzI4Mzk5OSwwLjczNTYwMjI2QzEuNzg2ODAwMSwwLjM2NzIwMTkyLDIuMjcyODAwNCwwLjE4MTIwMjUzLDMuMTE1MTk5NiwwLjA4NzYwMjAxOUwzLjQ5OTE5OTYsMC4wNTQwMDE5ODdMMy45MzExOTk2LDAuMDMwMDAyMTE3TDQuNjg3MTk5NiwwLjAwODQwMjI4OEw1LjU4NTk5OSwwLjAwMDAwMjE0NTc2NzJMNy4xMzAzOTg4LDAuMDAwMDAyMTQ1NzY3Mkw3LjEzMTYwMDQsNS4zNjQ0MThlLTdaTTguNjAyODAwNCw0Ljc5ODgwMTRMOC42OTg4MDAxLDQuOTA5MjAxMUwxMC42ODg0MDEsNy41NTA0MDEyTDEyLjcyNDgwMSw0Ljk0NTIwMDRDMTMuMDc2ODY1LDQuNTAwMTE1OSwxMy43MTMzNDcsNC40MDM0MywxNC4xODE3MDQsNC43MjM4ODUxQzE0LjY1MDA2MSw1LjA0NDM0MDEsMTQuNzkwNTE0LDUuNjcyNjE0NiwxNC41MDMyLDYuMTYyMDAwN0wxNC40MjY0MDEsNi4yNzQ4MDAzTDEyLjAzMzYsOS4zMzYwMDA0TDE0LjM3MzYsMTIuNDM5MkMxNC43MTg4OSwxMi44OTI3ODMsMTQuNjUyMiwxMy41MzY2MjMsMTQuMjIxMjcyLDEzLjkwOThDMTMuNzkwMzQxLDE0LjI4Mjk3NCwxMy4xNDM1NzgsMTQuMjU2OTY5LDEyLjc0Mzk5OSwxMy44NTA0MDFMMTIuNjQ4LDEzLjc0MDAwMUwxMC42NTYsMTEuMDk3Nkw4LjYyMTk5OTcsMTMuNzA0MDAxQzguMjcwNjIwMywxNC4xNTIxMTUsNy42MzE2NzkxLDE0LjI1MDQxNSw3LjE2MTg1NTcsMTMuOTI4NjM5QzYuNjkyMDMyOCwxMy42MDY4NjUsNi41NTI3NjY4LDEyLjk3NTU4NCw2Ljg0MzU5OTgsMTIuNDg2MDAyTDYuOTIwNDAwMSwxMi4zNzQ0MDJMOS4zMTIwMDEyLDkuMzEyMDAyMkw2Ljk3MjAwMDYsNi4yMTAwMDA1QzYuNjI2NzE4NSw1Ljc1NjQxOTcsNi42OTM0MTQ3LDUuMTEyNTg3NSw3LjEyNDM0MDUsNC43Mzk0MTUyQzcuNTU1MjY2NCw0LjM2NjI0MjQsOC4yMDIwMjA2LDQuMzkyMjQxNSw4LjYwMTYwMDYsNC43OTg4MDA1TDguNjAyODAwNCw0Ljc5ODgwMTRaIiBmaWxsPSIjRkZGRkZGIiBmaWxsLW9wYWNpdHk9IjEiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpwYXNzdGhyb3VnaCIvPjwvc3ZnPg==",
        width: 20,
        height: 17.71,
    };
    const ANY_TYPE = ["Number", "String", "Boolean", "Array"];
    // 定义自定义代码块对象数组
    const featureBlocks = [
        {
            type: "bn_get_time_stamp",
            message0: "获取 时间戳",
            args0: [],
            colour: Color.feature,
            inputsInline: true,
            output: "Number",
        },
        // 注释
        {
            type: "bn_comment",
            message0: "%3 %1 %2",
            args0: [
                { type: "input_dummy", align: "CENTRE", },
                { type: "input_statement", name: "DO", },
                { type: "field_input", name: "comment", text: "注释" }
            ],
            colour: "",
            ...method_block,
        },
        // eval
        {
            type: "bn_eval",
            message0: "执行JavaScript %1",
            args0: [
                {
                    type: "input_value",
                    name: "js",
                    check: "String",
                    value: 'console.log("Hello world!")',
                },
            ],
            colour: Color.feature,
            ...method_block,
        },
        {
            type: "bn_eval",
            message0: "执行JavaScript %1",
            args0: [
                {
                    type: "input_value",
                    name: "js",
                    check: "String",
                    value: '1+1',
                },
            ],
            colour: Color.feature,
            inputsInline: true,
            output: ANY_TYPE,
        },
        // 剪切板
        {
            type: "bn_clipboard_write",
            message0: "写入 剪切板 %1",
            args0: [
                {
                    type: "input_value",
                    name: "value",
                    check: ["String", "Number"],
                    value: "(～￣▽￣)～",
                },
            ],
            colour: Color.feature,
            ...method_block,
        },
        {
            type: "bn_clipboard_read",
            message0: "获取 剪切板",
            args0: [],
            colour: Color.feature,
            inputsInline: true,
            output: "String",
        },
        // 输入输出
        {
            type: "bn_alert",
            message0: "调用 提示 %1",
            args0: [
                {
                    type: "input_value",
                    name: "param",
                    check: ["String", "Number"],
                    value: "WOW",
                },
            ],
            colour: Color.feature,
            ...method_block,
        },
        {
            type: "bn_prompt",
            message0: "调用 询问 %1",
            args0: [
                {
                    type: "input_value",
                    name: "param",
                    check: ["String", "Number"],
                    value: "请输入文本",
                },
            ],
            colour: Color.feature,
            inputsInline: true,
            output: "String",
        },
        // 按键
        {
            type: "bn_on_key_down",
            message0: "%1 当 (按键) 被按下",
            args0: [keyboard_event_icon_field],
            nextStatement: true,
            colour: Color.feature,
            inputsInline: true,
        },
        {
            type: "bn_on_key_up",
            message0: "%1 当 (按键) 被放开",
            args0: [keyboard_event_icon_field],
            nextStatement: true,
            colour: Color.feature,
            inputsInline: true,
        },
        {
            type: "bn_on_key_event_param",
            message0: "按下/放开的键Code",
            args0: [],
            colour: Color.feature,
            inputsInline: true,
            output: "String",
        },
        {
            type: "bn_check_down_key",
            message0: "按下 %1",
            args0: [
                {
                    type: "field_dropdown",
                    name: "style",
                    options: [
                        ["A", "KeyA"],
                        ["B", "KeyB"],
                        ["C", "KeyC"],
                        ["D", "KeyD"],
                        ["E", "KeyE"],
                        ["F", "KeyF"],
                        ["G", "KeyG"],
                        ["H", "KeyH"],
                        ["I", "KeyI"],
                        ["J", "KeyJ"],
                        ["K", "KeyK"],
                        ["L", "KeyL"],
                        ["M", "KeyM"],
                        ["N", "KeyN"],
                        ["O", "KeyO"],
                        ["P", "KeyP"],
                        ["Q", "KeyQ"],
                        ["R", "KeyR"],
                        ["S", "KeyS"],
                        ["T", "KeyT"],
                        ["U", "KeyU"],
                        ["V", "KeyV"],
                        ["W", "KeyW"],
                        ["X", "KeyX"],
                        ["Y", "KeyY"],
                        ["Z", "KeyZ"],
                    ],
                    value: "KeyA",
                },
            ],
            colour: Color.feature,
            inputsInline: true,
            output: "Boolean",
        },
        // 快速变量
        {
            type: "bn_var_set",
            message0: "%1 %2 设为 %3",
            args0: [
                var_icon_field,
                {
                    type: "input_value",
                    name: "key",
                    check: "String",
                    value: "temp",
                },
                {
                    type: "input_value",
                    name: "value",
                    check: ANY_TYPE,
                    value: "",
                },
            ],
            colour: Color.var,
            ...method_block,
        },
        {
            type: "bn_var_get",
            message0: "%1 %2",
            args0: [
                var_icon_field,
                {
                    type: "input_value",
                    name: "key",
                    check: "String",
                    value: "temp",
                },
            ],
            colour: Color.var,
            inputsInline: true,
            output: ANY_TYPE,
        },
    ];
    const httpAndJsonBlocks = [
        // 网络
        {
            type: "bn_http_get",
            message0: "网络 GET URL %1",
            args0: [
                {
                    type: "input_value",
                    name: "param",
                    check: ["String", "Number"],
                    value: "",
                },
            ],
            colour: Color.feature,
            inputsInline: true,
            output: "String",
        },
        {
            type: "bn_http_post",
            message0: "网络 POST URL %1 body %2 headers %3",
            args0: [
                {
                    type: "input_value",
                    name: "param",
                    check: ["String", "Number"],
                    value: "",
                },
                {
                    type: "input_value",
                    name: "body",
                    check: ["String", "Number"],
                    value: "",
                },
                {
                    type: "input_value",
                    name: "headers",
                    check: ["String", "Number"],
                    value: "",
                },
            ],
            colour: Color.feature,
            inputsInline: true,
            output: "String",
        },
        // 对象操作
        {
            type: "bn_object_include_key",
            message0: "%1 包含键 %2",
            args0: [
                {
                    type: "input_value",
                    name: "obj",
                    check: "String",
                    value: '{"abc":114514}',
                },
                {
                    type: "input_value",
                    name: "key",
                    check: ["String", "Number"],
                    value: "abc",
                },
            ],
            colour: "%{BKY_SOUND_HUE}",
            inputsInline: true,
            output: "Boolean",
        },
        {
            type: "bn_object_get",
            message0: "%1 键 %2 的值",
            args0: [
                {
                    type: "input_value",
                    name: "obj",
                    check: "String",
                    value: '{"abc":114514}',
                },
                {
                    type: "input_value",
                    name: "key",
                    check: ["String", "Number"],
                    value: "abc",
                },
            ],
            colour: "%{BKY_SOUND_HUE}",
            inputsInline: true,
            output: ANY_TYPE,
        },
        {
            type: "bn_object_set",
            message0: "%1 键 %2 设为 %3",
            args0: [
                {
                    type: "input_value",
                    name: "obj",
                    check: "String",
                    value: '{"abc":114514}',
                },
                {
                    type: "input_value",
                    name: "key",
                    check: ["String", "Number"],
                    value: "abc",
                },
                {
                    type: "input_value",
                    name: "value",
                    check: ["String", "Number"],
                    value: "1919810",
                },
            ],
            colour: "%{BKY_SOUND_HUE}",
            inputsInline: true,
            output: "String",
        },
        {
            type: "bn_json_get_length",
            message0: "获取 对象 %1 键值数量",
            args0: [
                {
                    type: "input_value",
                    name: "json",
                    check: "String",
                    value: '{\"name\": \"test\", \"value\": 123}'
                }
            ],
            colour: "%{BKY_SOUND_HUE}",
            output: "Number"
        },
        // 数组操作
        {
            type: "bn_array_include_value",
            message0: "%1 包含 %2",
            args0: [
                {
                    type: "input_value",
                    name: "arr",
                    check: "String",
                    value: "[1, 2, 3]",
                },
                {
                    type: "input_value",
                    name: "value",
                    check: ["String", "Number"],
                    value: "4",
                },
            ],
            colour: "%{BKY_SOUND_HUE}",
            inputsInline: true,
            output: "Boolean",
        },
        {
            type: "bn_array_get",
            message0: "%1 第 %2 项",
            args0: [
                {
                    type: "input_value",
                    name: "arr",
                    check: "String",
                    value: "[1, 2, 3]",
                },
                {
                    type: "input_value",
                    name: "index",
                    check: "Number",
                    value: "1",
                },
            ],
            colour: "%{BKY_SOUND_HUE}",
            inputsInline: true,
            output: ANY_TYPE,
        },
        {
            type: "bn_array_set",
            message0: "%1 第 %2 项设为 %3",
            args0: [
                {
                    type: "input_value",
                    name: "arr",
                    check: "String",
                    value: "[1, 2, 3]",
                },
                {
                    type: "input_value",
                    name: "index",
                    check: "Number",
                    value: "3",
                },
                {
                    type: "input_value",
                    name: "value",
                    check: ["String", "Number"],
                    value: "6",
                },
            ],
            colour: "%{BKY_SOUND_HUE}",
            inputsInline: true,
            output: "String",
        },
        {
            type: "bn_array_length",
            message0: "%1 的长度",
            args0: [
                {
                    type: "input_value",
                    name: "arr",
                    check: "String",
                    value: "[1, 2, 3]",
                },
            ],
            colour: "%{BKY_SOUND_HUE}",
            inputsInline: true,
            output: "Number",
        },
    ];
    const mathBlocks = [
        // 运算扩展
        {
            type: "bn_factorial",
            message0: "[B] 阶乘 %1",
            args0: [
                {
                    type: "input_value",
                    name: "num",
                    check: "Number",
                    value: "5",
                },
            ],
            colour: "%{BKY_MATH_HUE}",
            inputsInline: true,
            output: "Number",
        },
        {
            type: "bn_trig_common",
            message0: "%1 %2",
            args0: [
                {
                    type: "field_dropdown",
                    name: "ttype",
                    options: [
                        ["Math.sin", "SIN"],
                        ["Math.cos", "COS"],
                        ["Math.tan", "TAN"],
                        ["Math.asin", "ASIN"],
                        ["Math.acos", "ACOS"],
                        ["Math.atan", "ATAN"],
                    ],
                    value: "SIN",
                },
                {
                    type: "input_value",
                    name: "xita",
                    check: "Number",
                    value: "45",
                },
            ],
            colour: "%{BKY_MATH_HUE}",
            inputsInline: true,
            output: "Number",
        },
    ];
    const videoBlock = [
        // 视频
        {
            type: "bn_create_video",
            message0: "创建视频 %1 URL %2",
            args0: [
                {
                    type: "input_value",
                    name: "id",
                    check: "String",
                    value: "example",
                },
                {
                    type: "input_value",
                    name: "src",
                    check: "String",
                    // value: "https://static.codemao.cn/coco/course/lesson1.mp4",
                    value: "https://creation.bcmcdn.com/445/kitten/d2ViXzIwMDJfMTIxNzczMTdfMjkyMzgxNDY4XzE3NzA3OTgxOTk1MzVfMmJmOTBmMjU=.mp4",
                },
            ],
            colour: Color.video,
            ...method_block,
        },
        {
            type: "bn_play_video",
            message0: "播放视频 %1",
            args0: [
                {
                    type: "input_value",
                    name: "id",
                    check: "String",
                    value: "example",
                },
            ],
            colour: Color.video,
            ...method_block,
        },
        {
            type: "bn_pause_video",
            message0: "暂停视频 %1",
            args0: [
                {
                    type: "input_value",
                    name: "id",
                    check: "String",
                    value: "example",
                },
            ],
            colour: Color.video,
            ...method_block,
        },
        {
            type: "bn_set_video_current_time",
            message0: "设置视频 %1 位置 %2 秒",
            args0: [
                {
                    type: "input_value",
                    name: "id",
                    check: "String",
                    value: "example",
                },
                {
                    type: "input_value",
                    name: "time",
                    check: "Number",
                    value: 10,
                },
            ],
            colour: Color.video,
            ...method_block,
        },
    ];
    const penBlocks = [
        // 画笔扩展
        {
            type: "bn_draw_image_stamp",
            message0: "[B] 图像印章",
            args0: [],
            colour: "%{BKY_PEN_HUE}",
            ...method_block,
        },
        {
            type: "bn_draw_custom_image_stamp",
            message0: "网络图像印章 URL %1",
            args0: [
                {
                    type: "input_value",
                    name: "src",
                    check: "String",
                    value: "https://www.runoob.com/try/demo_source/smiley-2.gif",
                },
            ],
            colour: "%{BKY_PEN_HUE}",
            ...method_block,
        },
        {
            type: "bn_draw_video_stamp",
            message0: "视频印章 ID %1 x %2 y %3 缩放 %4",
            args0: [
                {
                    type: "input_value",
                    name: "id",
                    check: "String",
                    value: "example",
                },
                {
                    type: "input_value",
                    name: "x",
                    check: "Number",
                    value: -200,
                },
                { type: "input_value", name: "y", check: "Number", value: 200 },
                {
                    type: "input_value",
                    name: "scale",
                    check: "Number",
                    value: 0.5,
                },
            ],
            colour: "%{BKY_PEN_HUE}",
            ...method_block,
        },
        {
            type: "bn_put_pixel",
            message0: "放置像素 x %1 y %2 HEX/RGB数组 %3 不透明度 %4",
            args0: [
                { type: "input_value", name: "x", check: "Number", value: 0 },
                { type: "input_value", name: "y", check: "Number", value: 0 },
                {
                    type: "input_value",
                    name: "hex",
                    check: ["String", "Array"],
                    value: "#000000",
                },
                { type: "input_value", name: "a", check: "Number", value: 255 },
            ],
            colour: "%{BKY_PEN_HUE}",
            ...method_block,
        },
        {
            type: "bn_fill_polygon",
            message0: "绘制多边形 坐标数组 %1 颜色 %2",
            args0: [
                {
                    type: "input_value",
                    name: "point",
                    check: "String",
                    value: "[[-100, 100], [100, 100], [-100, -100]",
                },
                {
                    type: "input_value",
                    name: "color",
                    check: "String",
                    value: "#000000",
                },
            ],
            colour: "%{BKY_PEN_HUE}",
            ...method_block,
        },
        {
            type: "bn_better_draw_text_stamp",
            message0:
                "样式文字印章 文本 %1 颜色 %2 %3 粗细 %4 大小 %5 字体 %6 对齐方式 %7 %8",
            // 文本 颜色 样式 粗细 大小 字体 水平 垂直
            args0: [
                {
                    type: "input_value",
                    name: "text",
                    check: ["String", "Number"],
                    value: "BetterNemo",
                },
                {
                    type: "input_value",
                    name: "color",
                    check: "String",
                    value: "#000000",
                },
                {
                    type: "field_dropdown",
                    name: "style",
                    options: [
                        ["正常", "normal"],
                        ["斜体", "italic"],
                        ["强制斜体", "oblique"],
                    ],
                    value: "normal",
                },
                {
                    type: "input_value",
                    name: "weight",
                    check: ["String", "Number"],
                    value: "bold",
                },
                {
                    type: "input_value",
                    name: "size",
                    check: "Number",
                    value: 24,
                },
                {
                    type: "input_value",
                    name: "font",
                    check: "String",
                    value: "Arial",
                },
                {
                    type: "field_dropdown",
                    name: "align",
                    options: [
                        ["居中对齐", "center"],
                        ["左对齐", "left"],
                        ["右对齐", "right"],
                    ],
                    value: "center",
                },
                {
                    type: "field_dropdown",
                    name: "base_line",
                    options: [
                        ["居中对齐", "middle"],
                        ["顶部对齐", "top"],
                        ["底部对齐", "bottom"],
                    ],
                    value: "middle",
                },
            ],
            colour: "%{BKY_PEN_HUE}",
            ...method_block,
        },
        {
            type: "bn_rectangle_clear",
            message0: "擦除矩形区域 起始点 x %1 y %2 宽度 %3 高度 %4",
            args0: [
                { type: "input_value", name: "x", check: "Number", value: 0 },
                { type: "input_value", name: "y", check: "Number", value: 0 },
                {
                    type: "input_value",
                    name: "width",
                    check: "Number",
                    value: 100,
                },
                {
                    type: "input_value",
                    name: "height",
                    check: "Number",
                    value: 100,
                },
            ],
            colour: "%{BKY_PEN_HUE}",
            ...method_block,
        },
        {
            type: "bn_draw_svg",
            message0: "绘制矢量图 XML %1",
            args0: [
                {
                    type: "input_value",
                    name: "svg",
                    check: "String",
                    value: "",
                },
            ],
            colour: "%{BKY_PEN_HUE}",
            ...method_block,
        },
        {
            type: "bn_color",
            message0: "[B]%1",
            args0: [{ type: "field_colour", name: "color", colour: "#cc66cc" }],
            colour: "%{BKY_PEN_HUE}",
            inputsInline: true,
            output: "String",
        },
        {
            type: "bn_hex_to_array",
            message0: "HEX %1 转 %2 数组",
            args0: [
                {
                    type: "input_value",
                    name: "hex",
                    check: "String",
                    value: "#FFFFFF",
                },
                {
                    type: "field_dropdown",
                    name: "pattern",
                    options: [
                        ["RGB", "rgb"],
                        ["HSV", "hsv"],
                        ["HSL", "hsl"],
                    ],
                    value: "rgb",
                },
            ],
            colour: "%{BKY_PEN_HUE}",
            inputsInline: true,
            output: "Array",
        },
        {
            type: "bn_set_pen_color_hex",
            message0: "设置画笔颜色为 HEX/RGB数组 %1 不透明度 %2",
            args0: [
                {
                    type: "input_value",
                    name: "hex",
                    check: ["String", "Array"],
                    value: "#FFFFFF",
                },
                { type: "input_value", name: "a", check: "Number", value: 255 },
            ],
            colour: "%{BKY_PEN_HUE}",
            ...method_block,
        },
        {
            type: "bn_set_fill_color_hex",
            message0: "设置填充颜色为 HEX/RGB数组 %1",
            args0: [
                {
                    type: "input_value",
                    name: "hex",
                    check: ["String", "Array"],
                    value: "#000000",
                },
            ],
            colour: "%{BKY_PEN_HUE}",
            ...method_block,
        },
        {
            type: "bn_regular_polygon",
            message0: "正多边形 中心 %1 半径 %2 边数 %3 起始角 %4",
            args0: [
                {
                    type: "input_value",
                    name: "center",
                    check: "String",
                    value: "[0,0]",
                },
                { type: "input_value", name: "r", check: "Number", value: 100 },
                { type: "input_value", name: "n", check: "Number", value: 8 },
                {
                    type: "input_value",
                    name: "start",
                    check: "Number",
                    value: 0,
                },
            ],
            colour: "%{BKY_MATH_HUE}",
            inputsInline: true,
            output: "String",
        },
        {
            type: "bn_dataURL_actor",
            message0: "从 角色造型 获取DataURL",
            args0: [],
            colour: "%{BKY_APPEARANCE_HUE}",
            inputsInline: true,
            output: "String",
        },
        {
            type: "bn_dataURL_stage",
            message0: "从 舞台 获取DataURL 范围 %1",
            args0: [
                {
                    type: "input_value",
                    name: "range",
                    check: "String",
                    value: "",
                },
            ],
            colour: "%{BKY_APPEARANCE_HUE}",
            inputsInline: true,
            output: "String",
        },
        /*{
            type: "bn_dataURL_URL",
            message0: "从 HttpURL 获取DataURL URL %1",
            args0: [
                { type: "input_value", name: "url", check: "String" }
            ],
            colour: "%{BKY_APPEARANCE_HUE}",
            inputsInline: true,
            output: "String"
        },*/
    ];
    const _3dBlocks = [
        {
            type: "bn_3D_rotation",
            message0: "三维旋转矩阵 点坐标 %1 相机坐标 %2 欧拉角 %3",
            args0: [
                {
                    type: "input_value",
                    name: "point",
                    check: ["String", "Array"],
                    value: "[0,0,0]",
                },
                {
                    type: "input_value",
                    name: "camera",
                    check: ["String", "Array"],
                    value: "[0,0,0]",
                },
                {
                    type: "input_value",
                    name: "angles",
                    check: ["String", "Array"],
                    value: "[0,0,0]",
                },
            ],
            colour: "%{BKY_MATH_HUE}",
            inputsInline: true,
            output: "Array",
        },
        {
            type: "bn_3D_array",
            message0: "3D %1 %2 %3",
            args0: [
                { type: "input_value", name: "x", check: "Number", value: 0 },
                { type: "input_value", name: "y", check: "Number", value: 0 },
                { type: "input_value", name: "z", check: "Number", value: 0 },
            ],
            colour: "%{BKY_MATH_HUE}",
            inputsInline: true,
            output: "String",
        },
    ];
    const websocketBlocks = [
        {
            type: "bn_new_ws",
            message0: "创建 WebSocket 连接 URL %1",
            args0: [
                {
                    type: "input_value",
                    name: "url",
                    check: "String",
                    value: "",
                },
            ],
            ...method_block,
        },
        {
            type: "bn_ws_send",
            message0: "WebSocket 发送消息 %1",
            args0: [
                {
                    type: "input_value",
                    name: "message",
                    check: "String",
                    value: "",
                },
            ],
            ...method_block,
        },
        {
            type: "bn_ws_close",
            message0: "关闭 WebSocket 连接 Code %1 Param %2",
            args0: [
                {
                    type: "input_value",
                    name: "code",
                    check: "Number",
                    value: "",
                },
                {
                    type: "input_value",
                    name: "param",
                    check: "String",
                    value: "",
                },
            ],
            ...method_block,
        },
        {
            type: "bn_on_ws_open",
            message0: "%1 当 打开 WebSocket 连接",
            args0: [connect_event_icon_field],
            ...event_block,
        },
        {
            type: "bn_on_ws_message",
            message0: "%1 当 WebSocket 收到消息 %2",
            args0: [
                connect_event_icon_field,
                { type: "input_value", name: "param", check: "undefined" },
            ],
            ...event_block,
        },
        {
            type: "bn_on_ws_message_param",
            text: "消息",
            output: "String",
            EventParam: {
                eventBlockId: "bn_on_ws_message",
                colorId: "BLUE_1",
            },
        },
        {
            type: "bn_on_ws_error",
            message0: "%1 当 WebSocket 发生错误 %2",
            args0: [
                connect_event_icon_field,
                { type: "input_value", name: "param", check: "undefined" },
            ],
            ...event_block,
        },
        {
            type: "bn_on_ws_error_param",
            text: "错误详情",
            EventParam: {
                eventBlockId: "bn_on_ws_error",
                colorId: "BLUE_1",
            },
            output: "String",
        },
        {
            type: "bn_on_ws_close",
            message0: "%1 当 关闭 WebSocket 连接",
            args0: [connect_event_icon_field],
            ...event_block,
        },
    ].map((block) => {
        return { ...block, colour: "%{BKY_BLUE_1}" };
    });
    // 定义积木
    blockObjects = [
        ...featureBlocks,
        ...httpAndJsonBlocks,
        ...mathBlocks,
        ...videoBlock,
        ...penBlocks,
        ..._3dBlocks,
        ...websocketBlocks,
    ];
    regBlocks(blockObjects);

    BetterNemo.log("积木", "积木注入完成");
})();
