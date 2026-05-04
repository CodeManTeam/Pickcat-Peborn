(function () {
    'use strict';

    // 设置头部样式
    document.querySelector("#root > div > header > div > div.Header_right__3m7KF > div.Header_otWrapper__1Q0pY > div.style_users__1_LCz").style = 'width: 306px;height: 36px;margin-right: 16px;margin-top: 2px;position: relative;display: flex;justify-content: flex-end';

    // 设置超宽屏幕按钮和运行作品按钮
    document.querySelector("#root > div > header > div > div.Header_right__3m7KF > div.Header_otWrapper__1Q0pY > div.style_users__1_LCz").innerHTML = `
        <button class="style_playButton___kJLc" style="background: #f304cb; margin-right:10px; display:none; width: 127px;">运行作品</button>
        <button class="style_playButton___kJLc" style="background: #f304cb; width: 127px;">超宽屏幕</button>
    `;

    // 超宽屏幕功能实现
    var wk = document.querySelector("#root > div > header > div > div.Header_right__3m7KF > div.Header_otWrapper__1Q0pY > div.style_users__1_LCz > button:nth-child(2)");
    var j = 0;
    var scrennwid = '';
    wk.onclick = function () {
        if (j % 2 == 0) {
            scrennwid = document.querySelector("#previewAreaWrapper > section > div.ScreenList_wrapper__nhsQ3").style.width;
            document.querySelector("#previewAreaWrapper").style.width = "100%";
            document.querySelector("#COCO_APP_ZONE").style.width = "66vw";
            document.querySelector("#COCO_APP_ZONE").style.height = "640px";
            document.querySelector("#root > div > header > div > div.Header_center__3KSi7 > div.style_playBox__G3pSb ").style.display = "none";
            document.querySelector("#root > div > header > div > div.Header_right__3m7KF > div.Header_otWrapper__1Q0pY > div.style_users__1_LCz > button:nth-child(1)").style.display = "inline";
            document.querySelector("#previewAreaWrapper > section > div.ScreenList_wrapper__nhsQ3").style.width = "66vw";
        } else {
            document.querySelector("#previewAreaWrapper").style.width = "640px";
            document.querySelector("#COCO_APP_ZONE").style.width = "360px";
            document.querySelector("#COCO_APP_ZONE").style.height = "640px";
            document.querySelector("#root > div > header > div > div.Header_center__3KSi7 > div.style_playBox__G3pSb ").style.display = "";
            document.querySelector("#root > div > header > div > div.Header_right__3m7KF > div.Header_otWrapper__1Q0pY > div.style_users__1_LCz > button:nth-child(1)").style.display = "none";
            document.querySelector("#previewAreaWrapper > section > div.ScreenList_wrapper__nhsQ3").style.width = scrennwid;
        }
        j += 1;
    };

    // 运行作品按钮功能实现
    var ck = document.querySelector("#root > div > header > div > div.Header_right__3m7KF > div.Header_otWrapper__1Q0pY > div.style_users__1_LCz > button:nth-child(1)");
    ck.onclick = function () {
        document.querySelector("#root > div > header > div > div.Header_center__3KSi7 > div.style_playBox__G3pSb > button").click(); // 点击播放按钮

        // 设置延时，以确保预览窗口已经打开
        // setTimeout(() => {
        //     // 打开新窗口进行作品预览
        //     var iframeSrc = document.querySelector("#previewAreaWrapper > section > div.Player_wrapper__2nUp9 > div.Player_deviceFrameWrapper__2Slra > div > div > iframe").src;
        //     var windowObjectReference = window.open(iframeSrc, "CoCo作品预览", "height=700px, width=1500px, top=100, left=100, toolbar=no, menubar=no,scrollbars=no,resizable=no, location=no, status=no");

        //     // 关闭预览窗口
        //     document.querySelector("#root > div > header > div > div.Header_center__3KSi7 > div.style_playBox__G3pSb > button").click();
        // }, 100); // 延迟100毫秒


        // 确保预览窗口打开了
        const interval = setInterval(() => {
            var iframe = document.querySelector("#previewAreaWrapper > section > div.Player_wrapper__2nUp9 > div.Player_deviceFrameWrapper__2Slra > div > div > iframe");
            if (!iframe) return;

            clearInterval(interval);

            window.open(iframe.src, "CoCo作品预览", "height=700px, width=1500px, top=100, left=100, toolbar=no, menubar=no,scrollbars=no,resizable=no, location=no, status=no");

            // 关闭预览窗口
            document.querySelector("#root > div > header > div > div.Header_center__3KSi7 > div.style_playBox__G3pSb > button").click();
        })
    };
})();

