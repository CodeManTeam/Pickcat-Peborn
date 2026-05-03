# Pickcat Reborn API Map

这个前端原型优先使用编程猫社区公开接口读取真实残留内容；接口不可用时，会降级到本地保留的 Pickcat 截图引用。

## 已接入

- 帖子详情：`GET /web/forums/posts/<post_id>/details`
- 帖子搜索：`GET /web/forums/posts/search?title=<keyword>&page=1&limit=20`
- 板块列表：`GET /web/forums/boards/simples/all`
- 板块帖子流：`GET /web/forums/boards/<board_id>/posts?offset=0&limit=8`
- 登录尝试：`POST /tiger/v3/web/accounts/login`
- 本地开发代理：`/proxy/codemao/*`、`/proxy/creation/*`、`/proxy/open-service/*`

## 复刻依据

- `403032`：入新社区初代体验团的所见所闻（十九）（pickcat使用教程）
- `419825`：入新社区初代体验团的所见所闻（二十）（pickcat使用小技巧）

这两个帖子包含主页、底部导航、创作入口、作品发布、图文动态等截图。首页的“截图复刻依据”横向卡片会直接引用这些图片，方便边看边还原。

## 映射行为

- Pickcat “动态”使用编程猫论坛帖子流近似。
- Pickcat “喵圈”对应编程猫论坛板块：神奇代码岛 `board_id=3`、源码精灵 `board_id=26`、图书馆 `board_id=6`，入口点击后直接读取对应板块帖子流。
- 发布功能保留真实接口调用，但需要有效登录态和社区权限。
- 作品列表登录后读取 `creation-tools/v1/user/center/work-list`，未登录时显示复刻说明和登录入口。

## 资料来源

- `https://codemao.lambdark.com/forum/details.md`
- `https://codemao.lambdark.com/forum/boards.md`
- `https://codemao.lambdark.com/forum/search-post.md`
- `https://shequ.codemao.cn/community/403032`
- `https://shequ.codemao.cn/community/419825`
