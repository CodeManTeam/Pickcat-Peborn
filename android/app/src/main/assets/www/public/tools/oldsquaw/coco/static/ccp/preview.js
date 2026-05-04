// document.addEventListener("DOMContentLoaded", () => {
//     function replaceTextInIframes() {
//         const iframeElements = document.querySelectorAll("iframe");

//         iframeElements.forEach(iframe => {
//             if (iframe.COCOMSPS) return;
//             if (iframe.temp) return;
//             const iframeSrc = iframe.getAttribute("src");
//             if (iframeSrc && iframeSrc.includes("editor/")) {
//                 const newSrc = iframeSrc.replace("/editor/", "https://coco.codemao.cn/editor/");
//                 iframe.src = newSrc;
//                 iframe.temp = true;
//             }
//         });
//     }

//     setInterval(replaceTextInIframes, 100);
// });

!function () {
    var y = window.fetch;
    // var loading = false;
    window.fetch = function (input, init) {
        if (typeof input == "string" && input.includes("/editor/service/compile")) {
            //             //var x1 = document.querySelector('.coco-alert')
            //             // x1.innerHTML = `<div data-html2canvas-ignore="true" tabindex="-1" class="coco-dialog style_loadingDialog__1z-ob" style="display: block;">
            //             //     <div class="coco-dialog-mask"></div>
            //             //     <div class="coco-dialog-scroll">
            //             //         <div class="coco-dialog-wrapper show">
            //             //             <div class="coco-dialog-content">
            //             //                 <div class="style_icon__1TIQs">
            //             //                     <i class="coco-iconfont">
            //             //                         <svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
            //             //                             <use xlink:href="#icon-loading2"></use>
            //             //                         </svg>
            //             //                     </i>
            //             //                 </div>
            //             //                 <p>正在加载预览...</p>
            //             //                 <div style="padding: 0 0 30px;"></div>
            //             //                 <button class="coco-button coco-button-circle">取消</button>
            //             //             </div>
            //             //         </div>
            //             //     </div>
            //             // </div>`
            //             if (loading) return;
            //             loading = true;

            //             var x1 = document.createElement("div");

            //             x1.innerHTML = `
            // <div class="CommonToast_wrapper__1vp1G coco-alert hide">
            //     <div class="coco-alert-content">
            //         <div class="coco-alert-icon">
            //             <i class="coco-iconfont">
            //                 <svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" style="
            //                     color: #6e4ff4;
            //                     -webkit-animation: style_spinner__1EcrQ 1.5s linear infinite;
            //                     animation: style_spinner__1EcrQ 1.5s linear infinite;
            //                 ">
            //                     <use xlink:href="#icon-loading2"></use>
            //                 </svg>
            //             </i>
            //         </div>
            //         <span>正在加载预览</span>
            //         <a style="color: #6e4ff4; margin-left: 10px;">取消</a>
            //     </div>
            // </div>`
            //             document.body.append(x1);

            //             setTimeout(() => {
            //                 x1.querySelector('.hide').classList.remove('hide')
            //             }, 17);

            //             let examineInterval, loaded = false;
            //             let cancel = false;
            //             x1.querySelector('a').addEventListener('click', function () {
            //                 cancel = true;
            //                 loading = false;
            //                 x1.remove();
            //                 x.remove();
            //                 clearInterval(examineInterval);
            //             });

            //             return new Promise((r) => {
            //                 var x = document.createElement("iframe");
            //                 x.src = "https://coco.codemao.cn/editor/player/0";
            //                 x.style.cssText = "position:fixed;top:0;left:0;z-index:0;pointer-events:none;visibility:hidden;"
            //                 x.COCOMSPS = true;

            //                 var id = `JSON${Date.now()}${~~(Math.random() * 1e7)}`;
            //                 window[`PreviewCallback${id}`] = function (error = false) {
            //                     if (error) {
            //                         console.log('预览失败，重试ing')
            //                         loaded = false;
            //                         return;
            //                     }
            //                     x1.remove();
            //                     x.remove();
            //                     clearInterval(examineInterval);
            //                     loaded = true;

            //                     if (!cancel) {
            //                         cancel = true;
            //                         loading = false;
            //                         console.log('部署完毕');
            //                         r({});
            //                     };
            //                 };
            //                 window[`PreviewContent${id}`] = init.body;

            //                 examineInterval = setInterval(() => {
            //                     let iframeDocument = (x.contentDocument || x.contentWindow.document);
            //                     if (
            //                         iframeDocument.documentURI == 'https://coco.codemao.cn/editor/player/0'
            //                         &&
            //                         iframeDocument.readyState == 'loading' || iframeDocument.readyState == 'complete'
            //                         &&
            //                         !loaded
            //                     ) {
            //                         loaded = true;
            //                         console.log('预览注入成功，等待部署')
            //                         x.contentWindow.eval(`
            //                         fetch("https://coco.codemao.cn/editor/service/compile",{method:"POST",body:window.top.PreviewContent${id}})
            //                         .then(()=>{window.top.PreviewCallback${id}()},()=>{window.top.PreviewCallback${id}(true)})
            //                         `);
            //                     }
            //                 }, 75);

            //                 // x.onload = function () {
            //                 //     clearInterval(examineInterval);
            //                 // };

            //                 document.body.appendChild(x);
            //             })

            // editor端部署
            const body = JSON.parse(init.body);
            sessionStorage.setItem('PREVIEWCACHE_' + body.id, JSON.stringify(body.data));
            console.log('preview 部署成功', body.id);
            return Promise.resolve(new Response(JSON.stringify({
                id: body.id
            })));
        }
        else if (typeof input == "string" && input.includes("/editor/service/code")) {
            // player端获取
            const id = input.split('code?id=')[1].split('&')[0];
            const data = sessionStorage.getItem('PREVIEWCACHE_' + id);

            if (data) {
                console.log('preview 获取成功', id);
                return Promise.resolve(new Response(data))
            }
            else return Promise.resolve(new Response('{}'));
        }

        return y(input, init);
    }
}()