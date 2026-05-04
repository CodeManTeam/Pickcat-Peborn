# Oldsquaw 合作接入说明

Pickcat Reborn 将 Oldsquaw 作为合并合作方向纳入创作生态。

Oldsquaw 的公开定位是 AI 控件制作、CoCo 魔改搭建和 Nemo 拓展。当前第一阶段做内置工具容器整合：入口不再只跳外部链接，而是进入 Pickcat 内部 `tool` 视图运行。可嵌入的工具会直接在软件内使用；遇到第三方页面禁止 iframe、登录跳转或跨域能力受限时，工具页保留“新窗口”兜底。

## 已接入口

- 首页推荐流：加入 Oldsquaw 创作工具精选。
- 发现流：加入作品再创作和编辑工具入口。
- 关注流：预留 Oldsquaw 合作动态入口。
- 喵圈页：加入 Oldsquaw 合作专区。
- 发布弹窗：加入 BetterNemo、CoCo Pro、KN-Oldsquaw、控件编辑器，并通过内部工具页打开。
- 作品详情：编辑器链接区会补充 Oldsquaw 相关打开入口，并通过内部工具页打开。

## 内置工具路由

- `?view=tool&tool=nemo`
- `?view=tool&tool=better-nemo`
- `?view=tool&tool=kitten`
- `?view=tool&tool=kn`
- `?view=tool&tool=kn-oldsquaw`
- `?view=tool&tool=coco-pro`
- `?view=tool&tool=widget-editor`

## 合作项目

- Oldsquaw 组织：https://gitee.com/oldsquaw
- 官网：https://oldsquaw.rth1.xyz/
- BetterNemo：https://gitee.com/oldsquaw/better-nemo
- CoCo Pro：https://gitee.com/oldsquaw/coco
- KN-Oldsquaw：https://gitee.com/oldsquaw/kn-oldsquaw
- Oldsquaw Widget Editor：https://gitee.com/oldsquaw/oldsquaw-widget-editor

## 下一步

- 接入 Oldsquaw 项目更新流或手写维护 JSON。
- 给发布页增加控件、扩展、教程的专用模板。
- 为作品类型建立更准确的 Oldsquaw 打开策略。
- 和 Oldsquaw 侧约定统一项目元数据格式，方便 Pickcat 展示工具、成员、更新日志和精选作品。
