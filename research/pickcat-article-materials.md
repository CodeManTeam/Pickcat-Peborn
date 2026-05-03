# “我们还原了编程猫被遗忘的项目”资料包

> 整理日期：2026-05-03  
> 用途：给宣传文章做素材，不引用本地已有文章稿。  
> 建议标题：我们还原了编程猫被遗忘的项目

## 一句话介绍

Pickcat Reborn 是一个基于残留论坛截图、编程猫社区公开接口、APK 提取资源和现存作品数据重建的移动端编程猫社区体验。它不是简单套壳网页，而是尝试复原 Pickcat 当年的信息结构、底部导航、动态流、喵圈、作品预览、消息回复、用户主页与作品播放器入口。

## 可以写进开头的背景

Pickcat 曾经是编程猫新社区/移动端体验中的一个很特别的项目。现在原应用本体已经不可正常使用，手头只剩一个 `Pickcat_0.6_release.apk`、一些残留论坛帖、少量截图，以及仍可访问的编程猫社区 API。

这次复刻的核心不是“做一个类似社区”，而是尽可能回答三个问题：

- 当年的 Pickcat 长什么样？
- 它和编程猫社区、作品系统、喵圈板块之间是什么关系？
- 在原 APK 加壳、原服务不可完整还原的情况下，能否通过残存资料把体验重新拼起来？

## 重要历史来源

### 1. Pickcat 使用教程帖

来源：

- https://shequ.codemao.cn/community/403032
- API: https://api.codemao.cn/web/forums/posts/403032/details

帖子信息：

- 标题：入新社区初代体验团的所见所闻（十九）（pickcat使用教程）
- 作者：旁观者JErS
- 板块：热门活动
- 创建时间戳：1633060417
- 当前 API 统计：约 882 浏览、6 回复

这篇帖子的价值很高，因为它不只是截图，而是写了 Pickcat 的下载、登录、主页、编辑与发布作品、发表动态等流程。帖子文本里提到：

- Pickcat 可通过新社区初代体验团/内测群文件获取。
- 也可通过“点猫科技”公众号文章获取。
- 如果已安装“点个猫”，Pickcat 可能直接覆盖。
- 无论是否覆盖安装，都需要重新登录。
- 如果账号密码正确但提示密码错误，可能需要切换登录环境。
- Pickcat 主页相较点个猫有明显变化。
- 编辑器入口在主页/底部导航附近。
- 修改已发布作品要从作品管理修改，否则可能创建副本。
- 发布作品时再创作默认开启。
- 喵圈可以不选。
- 作品介绍与操作说明限制 500 字。

已下载到 `screenshots/` 的历史图片：

- `source-403032-01-home-tutorial.jpeg`
- `source-403032-02-bottom-nav.jpeg`
- `source-403032-03-publish.jpeg`
- `source-403032-04-work-form.png`
- `source-403032-05-dynamic.jpeg`
- `source-403032-06-extra.png`

这些图适合放在文章的“考古证据”部分，用来说明复刻不是凭空想象。

### 2. Pickcat 使用小技巧帖

来源：

- https://shequ.codemao.cn/community/419825
- API: https://api.codemao.cn/web/forums/posts/419825/details

帖子信息：

- 标题：入新社区初代体验团的所见所闻（二十）（pickcat使用小技巧）
- 作者：旁观者JErS
- 板块：热门活动
- 创建时间戳：1641777928
- 当前 API 统计：约 441 浏览、3 回复、2 评论

这篇帖子的内容几乎完全由图片组成，适合用于展示 Pickcat 更细碎的交互细节。

已下载到 `screenshots/` 的历史图片：

- `source-419825-01-tip.png`
- `source-419825-02-tip.png`
- `source-419825-03-tip.png`

## 项目复刻依据

### APK

本地原始包：

- `Pickcat_0.6_release.apk`

APK 状态：

- 存在加壳/混淆，无法直接完整脱壳还原业务逻辑。
- 仍然可提取部分 assets、字体、Lottie、WebView 素材、音频和配置文件。

本地提取目录：

- `extracted/`
- `extracted_apk/`

有价值的提取物：

- `extracted/assets/fonts/Montserrat-Regular.otf`
- `extracted/assets/fonts/Montserrat-Light.otf`
- `extracted/assets/loading.json`
- `extracted/assets/load_top.json`
- `extracted/assets/lottie_loading/`
- `extracted/assets/login/login_011.mp4`
- `extracted/assets/login/login_022.mp4`
- `extracted/assets/webview/` 下大量音频、图片和视频资源

文章里可以写成：

> APK 并没有给我们一份可以直接运行或反编译复用的源码，它更像一个废墟。我们能从里面拿到字体、启动动画、登录背景、零散图标和 WebView 资源，但真正的页面结构和数据关系，只能靠截图和接口一点点补。

### Pickcat UI 资源

当前复刻项目里使用的 Pickcat 资源：

- `public/assets/pickcat/ic_home_logo.png`
- `public/assets/pickcat/bg_activity_login_account.png`
- `public/assets/pickcat/mine_bg.png`
- `public/assets/pickcat/ic_search.png`
- `public/assets/pickcat/ic_more_mine_black.png`
- `public/assets/pickcat/imoji_back.png`
- `public/assets/pickcat/imoji_menu_settings.png`
- `public/assets/pickcat/ic_home_comment.png`
- `public/assets/pickcat/ic_comment_normal.png`
- `public/assets/pickcat/ic_collect.png`
- `public/assets/pickcat/ic_view.png`
- `public/assets/pickcat/kitten.png`
- `public/assets/pickcat/nemo.png`
- `public/assets/pickcat/turtle.png`

底部导航图标：

- `public/assets/tab_main_home_normal.png`
- `public/assets/tab_main_home_selected.png`
- `public/assets/tab_main_prefecture_normal.png`
- `public/assets/tab_main_prefecture_selected.png`
- `public/assets/tab_main_msg_nomal.png`
- `public/assets/tab_main_msg_selected.png`
- `public/assets/tab_main_mine_normal.png`
- `public/assets/tab_main_mine_selected.png`
- `public/assets/tab_main_main_create.png`

## 复刻版当前页面截图

已放入：

- `screenshots/01-home-recommend.png`：首页推荐，帖子与作品混排
- `screenshots/02-home-discover.png`：发现页，来自编程猫 discover 作品流
- `screenshots/03-circle-boards.png`：喵圈/板块入口
- `screenshots/04-message-replies.png`：消息与回复列表
- `screenshots/05-mine-profile.png`：我的主页
- `screenshots/06-work-reader.png`：内嵌作品阅览页
- `screenshots/07-user-preview.png`：用户主页预览
- `screenshots/08-post-detail.png`：论坛帖子详情

适合文章插图顺序：

1. 先放历史截图 `source-403032-*`，说明“这是我们能找到的原始依据”。
2. 再放 `01-home-recommend.png` 和 `05-mine-profile.png`，形成“复刻前后对照”。
3. 中段放 `06-work-reader.png`、`02-home-discover.png`，强调它不仅是 UI，还接上了真实作品数据。
4. 结尾放 `03-circle-boards.png`、`04-message-replies.png`，说明仍在补细节。

## 作品截图素材

已下载到 `screenshots/`：

- `work-173534122-richman.png`
  - 作品：我要当富豪-社区第一强
  - 作者：一个屑屑呀
  - 类型：KITTEN4
  - 作品页：https://shequ.codemao.cn/work/173534122
  - API: https://api.codemao.cn/creation-tools/v1/works/173534122
  - 统计：约 596886 浏览、14513 点赞、8163 收藏、1039 评论
  - 播放器：`https://player.codemao.cn/new/173534122`

- `work-273988379-now.jpeg`
  - 作品：now-全新主菜单动画
  - 作者：Argon_awa
  - 类型：NEKO / KittenN
  - 作品页：https://shequ.codemao.cn/work/273988379
  - API: https://api.codemao.cn/creation-tools/v1/works/273988379
  - 统计：约 47038 浏览、1264 点赞、666 收藏、392 评论
  - 播放器：`https://kn.codemao.cn/player?type=2&workId=273988379`

- `work-177252027-parkour.png`
  - 作品：2人竞争跑酷
  - 作者：黄蜂战队
  - 出现在首页推荐与 discover 流里
  - 统计：约 913262 浏览、6525 点赞

- `work-180439335-online-catch.png`
  - 作品：联机抓人
  - 作者：黄蜂战队
  - 出现在 discover 流里
  - 统计：约 1165825 浏览、14772 点赞

文章里可以用这些作品说明：复刻版不是放几张假图，而是会读取真实作品流、作品详情、作者信息、评论和播放器地址。

## 编程猫社区接口线索

当前复刻版主要接入这些接口：

### 论坛/帖子

- 板块列表：`GET https://api.codemao.cn/web/forums/boards/simples/all`
- 板块帖子：`GET https://api.codemao.cn/web/forums/boards/{board_id}/posts?offset=0&limit=10`
- 帖子搜索：`GET https://api.codemao.cn/web/forums/posts/search?title={keyword}&page=1&limit=20`
- 帖子详情：`GET https://api.codemao.cn/web/forums/posts/{post_id}/details`
- 帖子回复：`GET https://api.codemao.cn/web/forums/posts/{post_id}/replies?page=1&limit=10`
- 回复评论：`GET https://api.codemao.cn/web/forums/replies/{reply_id}/comments?page=1&limit=5`

### 作品

- 首页推荐作品：`GET https://api.codemao.cn/creation-tools/v1/pc/home/recommend-work?type=1`
- 发现作品：`GET https://api.codemao.cn/creation-tools/v1/pc/discover/subject-work?offset=0&limit=12`
- 作品详情：`GET https://api.codemao.cn/creation-tools/v1/works/{work_id}`
- Nemo 作品详情：`GET https://api.codemao.cn/nemo/v2/works/{work_id}`
- 作品评论：`GET https://api.codemao.cn/web/works/{work_id}/comments?offset=0&limit=10`

### 用户

- 用户作品列表：`GET https://api.codemao.cn/creation-tools/v2/user/center/work-list?type=newest&user_id={user_id}&offset=0&limit=10`
- 用户发布作品：`GET https://api.codemao.cn/web/api/user/works/published?user_id={user_id}&types=1,3,5&limit=10`
- 粉丝/关注：`GET https://api-creation.codemao.cn/creation-tools/v1/user/followers?user_id={user_id}&offset=0&limit=15`
- 用户作品统计：`GET https://api.codemao.cn/nemo/v2/works/business/total?user_id={user_id}`

注意：

- `https://api.codemao.cn/web/users/details?id=635285118` 当前返回 401，因此用户主页不能只依赖这个接口。
- 复刻版采用多接口兜底：作品详情里的 `user_info`、作品列表作者字段、用户作品列表和公开统计互相补。

## 喵圈与编程猫板块映射

从 `GET /web/forums/boards/simples/all` 可确认相关板块：

- `board_id=3`：神奇代码岛
- `board_id=6`：图书馆
- `board_id=26`：源码精灵

复刻逻辑：

- Pickcat 的“喵圈”并不是凭空新系统，而是映射到编程猫论坛里的不同板块。
- 点进喵圈入口后，直接拉对应 board 的帖子流。
- 这比纯关键词搜索更可靠，也更符合“论坛板块”的真实结构。

当前接口返回的其他板块也可作为文章附注：

- `30` KN创作
- `17` 热门活动
- `2` 积木编程乐园
- `27` CoCo应用创作
- `11` Python乐园
- `5` 你问我答
- `13` NOC编程猫比赛
- `10` 工作室&师徒
- `7` 灌水池塘
- `4` 通天塔
- `28` 训练师小课堂

## 播放器/编辑器适配

复刻版需要处理多种作品引擎，不同作品不能使用同一个 iframe 链接：

- Kitten4 / 新播放器：
  - `https://player.codemao.cn/new/{work_id}`
- Kitten3 / 旧播放器：
  - `https://player.codemao.cn/old/{work_id}`
- KittenN / NEKO：
  - `https://kn.codemao.cn/player?workId={work_id}`
  - 有些 API 会返回 `https://kn.codemao.cn/player?type=2&workId={work_id}`
- Nemo：
  - `https://nemo.codemao.cn/w/{work_id}`
  - 也可能出现 `https://nemo.codemao.cn/we/{work_id}`
- Turtle / Python：
  - `https://turtle.codemao.cn/?entry=sharing&channel_type=community&action=open_published_project&work_id={work_id}`

文章里可以写：

> 最难的地方之一是作品页。编程猫作品不是一种播放器就能打开，Kitten、KittenN、Nemo、Turtle 背后是不同的播放地址、横竖屏策略和 UA 兼容问题。复刻版最后没有硬塞一个黑框，而是根据作品类型和 API 返回的 `player_url` 选择对应播放器。

## 当前实现过的体验点

首页：

- PICKCAT 标题栏
- 推荐/发现/关注 tab
- 论坛帖子卡片
- 作品展示卡片
- 滚动加载更多
- 点帖子进入详情
- 点作品进入作品阅览页

发现：

- 接入 `pc/discover/subject-work`
- 支持分页加载
- 展示作品封面、名称、作者、浏览/点赞等

关注：

- 关注页不直接假造固定列表。
- 逻辑为：读取关注者/关注相关用户后，用昵称在论坛中搜索帖子，尽量拼出“我关注的人最近在社区出现过什么”。
- 如果未登录或接口不可用，使用当前可见内容兜底。

喵圈：

- 对应编程猫论坛真实板块。
- 神奇代码岛、源码精灵、图书馆都走 board posts。

消息：

- 展示评论、回复、work comment 等通知类型。
- API 中有些 message 字段本身是 JSON 字符串，复刻版需要解析成可读卡片。

作品阅览：

- 作品播放器 iframe
- 作者卡片
- 浏览/点赞/收藏/评论统计
- 作品简介
- 评论区
- 加载更多评论
- 跳转原站

用户主页：

- 根据用户 ID 尽量聚合用户信息。
- 作品列表、动态、关注关系等通过可用接口兜底。
- 单一用户详情接口 401 时不会直接页面失败。

Android / Windows：

- Android WebView 包装
- 原生返回键适配
- 作品播放器横屏
- KittenN 等播放器使用桌面 UA 以提高兼容性
- Windows Electron 包装

## 可以写成文章结构

### 题目

我们还原了编程猫被遗忘的项目

### 引子

可以从“只有一个打不开的 APK 和几张论坛截图”开始：

> 有些项目不是突然消失的，它只是慢慢变成了链接、截图、群文件和少数人的记忆。Pickcat 就是这样一个项目。它曾经是编程猫移动端社区体验的一次尝试，但后来我们能找到的，只剩一个加壳 APK、几篇残留论坛帖子，以及散落在 CDN 里的几张图。

### 第一部分：找到 Pickcat 的痕迹

可用素材：

- `source-403032-*`
- `source-419825-*`

要点：

- 论坛教程帖证明 Pickcat 确实存在，并有明确下载/登录/发布/动态流程。
- 原帖作者将它称作新社区初代体验团相关内容。
- 截图里出现了首页、底部导航、发布入口、作品发布表单、图文动态等关键页面。

### 第二部分：APK 给了我们什么，又没给什么

要点：

- APK 加壳，业务逻辑不能直接恢复。
- assets 仍有价值：字体、启动动画、登录背景、WebView 素材。
- 真正的页面行为需要通过论坛截图和 API 交叉验证。

### 第三部分：把“截图”变成“可用的 App”

可用截图：

- `01-home-recommend.png`
- `02-home-discover.png`
- `05-mine-profile.png`

要点：

- 复刻不只是画 UI。
- 首页要同时承载帖子和作品。
- 发现页要接真实作品流。
- 关注页要通过关注者昵称搜索论坛内容。
- 底部导航、发布按钮、我的页背景和头像层级都要贴近原图。

### 第四部分：作品页是最复杂的地方

可用截图：

- `06-work-reader.png`
- `work-173534122-richman.png`
- `work-273988379-now.jpeg`

要点：

- 作品系统存在 Kitten、KittenN、Nemo、Turtle 等多种引擎。
- 每种播放器 URL 不一样。
- 有的作品需要横屏。
- 有的播放器在移动 UA 下不兼容。
- 复刻版需要选择正确播放器，而不是统一塞 iframe。

### 第五部分：喵圈不是“圈子”，而是论坛板块的另一种入口

可用截图：

- `03-circle-boards.png`

要点：

- 神奇代码岛、源码精灵、图书馆都能在编程猫论坛 board API 中找到对应。
- 复刻版直接读取对应 board posts。

### 第六部分：为什么这件事值得做

可以写得感性一点：

- 因为儿童编程社区里有许多用户自发形成的历史。
- App 消失后，作品和讨论仍然留在 CDN、API、论坛残页里。
- 复刻不是为了替代官方，而是为了保存一种曾经存在过的社区界面和使用方式。
- 对后来的人来说，能打开、能滑动、能点进作品，比一张孤零零的截图更能理解当时发生了什么。

### 结尾

可以落在“复刻不是复活全部，但能让记忆重新可操作”：

> 我们没有拿回 Pickcat 的源码，也没有恢复它当年的服务器。但当首页重新出现帖子流，当喵圈重新指向那些老板块，当作品卡片能打开真实的编程猫作品时，它就不再只是一段传闻。它变成了一个可以再次被触摸的界面。

## 可引用来源清单

- Pickcat 使用教程帖：https://shequ.codemao.cn/community/403032
- Pickcat 使用教程 API：https://api.codemao.cn/web/forums/posts/403032/details
- Pickcat 使用小技巧帖：https://shequ.codemao.cn/community/419825
- Pickcat 使用小技巧 API：https://api.codemao.cn/web/forums/posts/419825/details
- 编程猫论坛板块 API：https://api.codemao.cn/web/forums/boards/simples/all
- 编程猫 discover：https://shequ.codemao.cn/discover
- Discover API：https://api.codemao.cn/creation-tools/v1/pc/discover/subject-work?offset=0&limit=12
- 首页推荐作品 API：https://api.codemao.cn/creation-tools/v1/pc/home/recommend-work?type=1
- 示例作品 173534122：https://shequ.codemao.cn/work/173534122
- 示例作品 173534122 API：https://api.codemao.cn/creation-tools/v1/works/173534122
- 示例作品 273988379：https://shequ.codemao.cn/work/273988379
- 示例作品 273988379 API：https://api.codemao.cn/creation-tools/v1/works/273988379
- 示例用户：https://shequ.codemao.cn/user/635285118
- BCMAPI 项目页：https://codemao.lambdark.com/?id=main

## 写作时可以避免的坑

- 不要说“完整还原源码”。更准确的说法是“基于可见资料复刻体验”。
- 不要说“官方复活”。这是民间/个人复刻。
- 不要把 API 当前统计写死成永久数据，可以写“抓取时约为”。
- 不要把所有播放器都说成 Nemo。现在至少有 Kitten4、KittenN/NEKO、Nemo、Turtle 几类。
- 不要把喵圈写成独立社交系统，它更接近论坛板块入口的移动端包装。
- 可以强调“不可抗力导致原项目不可用”，但文章重点最好放在考古和复刻过程，而不是抱怨消失。
