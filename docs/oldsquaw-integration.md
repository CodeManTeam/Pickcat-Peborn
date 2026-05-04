# Oldsquaw 合作接入说明

Pickcat Reborn 将 Oldsquaw 作为合并合作方向纳入创作生态。

Oldsquaw 的公开定位是 AI 控件制作、CoCo 魔改搭建和 Nemo 拓展。重新审计后，Pickcat 不再把 Gitee raw 页面或官网发布页直接当工具嵌入，而是按项目真实结构接入：

- 可静态部署的项目随 Pickcat 打包到 `public/tools/oldsquaw/`，在内部 `tool` 视图从本地资源加载。
- 需要宿主工作区注入的项目按 workspace 资源边界打包，避免把下载页误当工具。
- 外部仓库和官网只作为源码、发布页或兜底入口，不作为默认运行地址。

## 已接入口

- 首页推荐流：加入 Oldsquaw 创作工具精选。
- 发现流：加入作品再创作和编辑工具入口。
- 关注流：预留 Oldsquaw 合作动态入口。
- 喵圈页：加入 Oldsquaw 合作专区。
- 发布弹窗：加入 BetterNemo、CoCo Pro、KN-Oldsquaw、控件编辑器，并通过内部工具页打开。
- 作品详情：编辑器链接区会补充 Oldsquaw 相关打开入口，并优先打开本地部署工具。

## 接入方式审计

| 项目 | 审计结论 | 当前接入 |
| --- | --- | --- |
| CoCo Pro | README 明确支持直接运行 `index.html` 或部署到 Web 服务器，仓库包含完整静态资源。 | 已复制到 `public/tools/oldsquaw/coco/`，路由打开 `index.html`。 |
| KN-Oldsquaw | 仓库主体是静态 HTML 文件，可直接打开。 | 已复制到 `public/tools/oldsquaw/kn/`，路由打开 `1.0.2.html`。 |
| Oldsquaw Widget Editor | 单页 HTML 编辑器，依赖 CDN Ace，可直接运行。 | 已复制到 `public/tools/oldsquaw/widget-editor/`，路由打开 `1.0.0.html`。 |
| BetterNemo | 不是普通网页。`workspace.html` 依赖 assets、theme、extensions、workspace-scripts 和 `extension-loader.js` 注入流程。 | 已复制必要 workspace 资源到 `public/tools/oldsquaw/better-nemo/`，路由打开 `index.html`。 |

BetterNemo 会使用宽屏 workspace 容器，不再沿用 Pickcat 的窄手机壳宽度。

## 内置工具路由

- `?view=tool&tool=nemo`
- `?view=tool&tool=better-nemo`
- `?view=tool&tool=kitten`
- `?view=tool&tool=kn`
- `?view=tool&tool=kn-oldsquaw`
- `?view=tool&tool=coco-pro`
- `?view=tool&tool=widget-editor`

## 本地部署目录

- `public/tools/oldsquaw/coco/`
- `public/tools/oldsquaw/kn/`
- `public/tools/oldsquaw/widget-editor/`
- `public/tools/oldsquaw/better-nemo/`

## 合作项目

- Oldsquaw 组织：https://gitee.com/oldsquaw
- 官网：https://oldsquaw.rth1.xyz/
- BetterNemo：https://gitee.com/oldsquaw/better-nemo
- CoCo Pro：https://gitee.com/oldsquaw/coco
- KN-Oldsquaw：https://gitee.com/oldsquaw/kn-oldsquaw
- Oldsquaw Widget Editor：https://gitee.com/oldsquaw/oldsquaw-widget-editor

## 下一步

- 为 BetterNemo 继续做宿主桥接兼容测试，确认 Android WebView 与 Electron 下的作品保存、导入和播放链路。
- 接入 Oldsquaw 项目更新流或手写维护 JSON。
- 给发布页增加控件、扩展、教程的专用模板。
- 为作品类型建立更准确的 Oldsquaw 打开策略。
- 和 Oldsquaw 侧约定统一项目元数据格式，方便 Pickcat 展示工具、成员、更新日志和精选作品。
