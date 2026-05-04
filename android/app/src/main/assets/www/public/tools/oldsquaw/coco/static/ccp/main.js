!function () {

    // 版本号写在这
    const OldsquawVersion = '1.8.0';
    window.OldsquawVersion = OldsquawVersion;

    document.title = `Oldsquaw-CoCoPro ${OldsquawVersion}`

    document.addEventListener("DOMContentLoaded", () => {
        const searchText = "通用积木";
        const replaceText = "Oldsquaw-CoCoPro " + OldsquawVersion;

        // Recursive function to replace text in a node and its children
        function replaceTextInNode(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                const content = node.nodeValue.replace(searchText, replaceText);
                node.nodeValue = content;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                node.childNodes.forEach(childNode => replaceTextInNode(childNode));
            }
        }

        replaceTextInNode(document.body);
    });

    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
        // 当前设备是移动设备
        document.addEventListener("DOMContentLoaded", () => {
            const searchText = "绘图动画";
            const replaceText = "手机暂不支持";

            // Recursive function to replace text in a node and its children
            function replaceTextInNode(node) {
                if (node.nodeType === Node.TEXT_NODE) {
                    const content = node.nodeValue.replace(searchText, replaceText);
                    node.nodeValue = content;
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    node.childNodes.forEach(childNode => replaceTextInNode(childNode));
                }
            }

            replaceTextInNode(document.body);
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelector(".style_ReleaseInfoDialog__1tjfC .style_left__2WBVn img").src = `https://coco.codemao.cn/http-widget-proxy/${ccporigin}/static/img/left-side.png`
        document.querySelector(".coco-dialog.style_ReleaseInfoDialog__1tjfC .style_updateInfo__1I4He").innerHTML = `
        <header>Oldsquaw-CoCoPro ${OldsquawVersion}</header>
    <p>1. 修复Editor、预览、分享等</p>
    <p>2. 修复Player</p>
    <p>【贡献：小宏XeLa、青柠、SLIGHTENING】</p>
    `
        document.querySelector('.coco-dialog.style_ReleaseInfoDialog__1tjfC .style_overViewInfo__sq44x > a').href = `${ccporigin}/changelog`
    });

    // 如果有更新，则弹出 “版本更新” 弹窗
    const localVersion = OldsquawVersion + '-1';
    if (localStorage.getItem('ccpversion') !== localVersion) {
        localStorage.setItem('ReleaseVersion', '');
        localStorage.setItem('ccpversion', localVersion);
    }
}();