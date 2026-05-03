# Pickcat Reborn

Pickcat Reborn 是一个以前端为主的 Pickcat 复刻工程。

目标不是修复旧 APK，而是基于现有素材、残留接口和历史痕迹，重新做出一个还能运行、还能继续补完的版本。

## 当前状态

- 已有可运行的 Web 原型
- 已有 Electron 桌面壳
- 已有 Android 调试构建链路
- 已整理接口映射和项目背景文档
- 历史论坛截图索引还在，但截图文件本身目前已损坏
- 当前采用自定义限制许可，禁止商用

## 主要入口

- 原型入口：`index.html`
- 主逻辑：`app.js`
- 样式：`styles.css`
- 桌面入口：`desktop/main.cjs`
- 启动服务：`serve.mjs`
- 项目文章：`pickcat-story.md`

## 常用命令

```bash
pnpm install
pnpm run dev
pnpm run check
pnpm run desktop
pnpm run dist:win
pnpm run android:build
```

## 目录说明

### 建议优先看的目录

- `index.html` / `app.js` / `styles.css`
  - 当前 Web 原型主体
- `public/assets`
  - 当前原型实际使用的资源
- `docs`
  - 项目背景、接口映射、参考说明
- `desktop`
  - Electron 壳
- `android`
  - Android 工程

### 资料目录

- `pickcat assets`
  - 从旧包和资料中整理出的原始素材，数量很多，命名较杂
- `extracted`
  - 从 APK 提取出的原始内容
- `extracted_apk`
  - 二次整理后的提取结果
- `research_downloads`
  - 论坛截图和索引；目前截图文件损坏，只能作为线索保留

### 杂项文件

- `files.txt` / `files2.txt`
  - 历史分析中留下的文件列表
- `native.ts`
  - 预留原生相关实验文件
- `data/setting.json`
  - 本地配置数据

## 文档入口

- 项目背景：[docs/pickcat-community-post.md](./docs/pickcat-community-post.md)
- 接口映射：[docs/api-map.md](./docs/api-map.md)
- 截图对比：[docs/current-vs-reference.md](./docs/current-vs-reference.md)
- 展示文章：[pickcat-story.md](./pickcat-story.md)
- 发版说明：[RELEASE.md](./RELEASE.md)
- 许可说明：[LICENSE.md](./LICENSE.md)

## 当前仓库约定

- `public/assets` 是当前运行时资源，改 UI 优先看这里
- `pickcat assets` 和 `extracted*` 主要是资料仓，不建议随手改名
- `release/`、`dist/`、压缩包属于构建产物，不进仓库
- 如果要继续整理仓库，优先做“补文档和归类”，先不要大规模搬文件

## 下一步建议

- 补一个 `docs/assets-map.md`，把常用素材来源映射清楚
- 把历史分析残留文件继续收进 `docs/` 或 `research/`
- 单独整理 `deliverables/` 或外部 release 包，不和源码目录混放
