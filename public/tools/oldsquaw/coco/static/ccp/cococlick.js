/* CoCoClick v1.0.3 Copyright (C) 2023 xiaohong2022 */
(function () {
    'use strict';
    var play = { setData(n, v) { this[n] = v }, getData(n) { return this[n] } }
    setInterval(() => {
        document.querySelectorAll(`*[class*="WidgetList_widgetItem"]`).forEach(e => {
            if (e.cococlick) return;
            e.cococlick = true;
            e.style.cursor = "pointer";
            e.addEventListener("click", function () {
                var sen = document.querySelector(`*[class*="PreviewArea_main"]`);
                var x = sen.offsetLeft + sen.offsetWidth / 2;
                var y = sen.offsetTop + sen.offsetHeight / 2;
                var keys = Object.keys(e);
                var key = keys.find(e => e.startsWith("__reactEventHandlers"));
                e[key].onDragStart({ target: e, dataTransfer: play, persist() { return true }, clientX: x, clientY: y, x: x + 100, y })
                var stage = document.querySelector(`*[class*="PreviewArea_stage"]`);
                var keys2 = Object.keys(stage);
                var key2 = keys2.find(e => e.startsWith("__reactEventHandlers"));
                stage[key2].onDragOver({ preventDefault() { } })
                stage[key2].onDrop({ dataTransfer: play, persist() { return true }, clientX: x + 142, clientY: y - 3, x: x + 100, y })
                if (e.dataset.widgetType == "BRUSH_WIDGET" || e.dataset.widgetType == "ACTOR_WIDGET") {
                    document.querySelectorAll(`*[data-widget-type="CANVAS_WIDGET"][id*="CANVAS_WIDGET"]`).forEach((en, index, array) => {
                        var keys3 = Object.keys(en);
                        var key3 = keys3.find(e => e.startsWith("__reactEventHandlers"));
                        function click(ew) {
                            en[key3].onDragEnter({ dataTransfer: play, persist() { return true }, stopPropagation() { return true } });
                            stage[key2].onDragOver({ preventDefault() { } })
                            en[key3].onDrop({ dataTransfer: play, persist() { return true }, stopPropagation() { return true }, clientX: ew.clientX, clientY: ew.clientY, x: ew.x, y: ew.y });
                            stage[key2].onDrop({ dataTransfer: play, persist() { return true } })
                            array.forEach(e => e.removeEventListener("click", e.cococlickfunc, false))
                            e[key].onDragEnd({})
                        }
                        en.cococlickfunc = click;
                        en.addEventListener("click", click, false);
                    })
                } else {
                    e[key].onDragEnd()
                }
            })
        })
    }, 100);
})();