window.addEventListener('load', function () {
    const appUrlBtn = document.querySelector(`div.styles_appUrlBtn__1rsjt`);
    if (!appUrlBtn) return;

    // 克隆元素
    const clone = document.createElement('div');
    clone.className = appUrlBtn.className;
    clone.innerHTML = appUrlBtn.innerHTML;

    // 替换原来的
    appUrlBtn.parentElement.appendChild(clone);
    appUrlBtn.remove();

    // 更新元素
    clone.querySelector('img').src = `${ccporigin}/favicon.ico`;
    clone.querySelector('span').innerText = "去CoCoPro制作";

    // 注册点击事件
    clone.addEventListener('click', function (){
        window.open(ccporigin, "_blank");
    })
})

// window.onload = function () {
//     var elements = document.getElementsByClassName('styles_appUrlBtnImg__Ykb7R');
//     for (var i = 0; i < elements.length; i++) {
//         var img = document.createElement('img');
//         img.src = `${ccporigin}/favicon.ico`;
//         img.width = 25;
//         img.height = 25;
//         elements[i].parentNode.replaceChild(img, elements[i]);
//     }
// };

// // 对所有的CoCo说拜拜
// document.addEventListener("DOMContentLoaded", () => {
//     const searchText = "CoCo";
//     const replaceText = "CoCoPro";
//     function replaceTextInNode(node) {
//         if (node.nodeType === Node.TEXT_NODE) {
//             const content = node.nodeValue.replace(searchText, replaceText);
//             node.nodeValue = content;
//         } else if (node.nodeType === Node.ELEMENT_NODE) {
//             node.childNodes.forEach(childNode => replaceTextInNode(childNode));
//         }
//     }

//     replaceTextInNode(document.body);
// });

// // 获取所有类名为styles_appUrlBtn__1rsjt的元素
// var buttons = document.getElementsByClassName('styles_appUrlBtn__1rsjt');

// // 为每个元素添加点击事件监听器
// for (var i = 0; i < buttons.length; i++) {
//     buttons[i].addEventListener('click', function (event) {
//         // 在新窗口打开指定的URL
//         window.open(ccporigin, "_blank");
//     });
// }