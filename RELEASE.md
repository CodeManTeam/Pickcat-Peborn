# Release 说明

这个仓库当前不提交构建产物，`release/`、`dist/`、压缩包都被 `.gitignore` 忽略。

## 当前可用发布链路

### GitHub Actions

仓库已补自动工作流：

- `.github/workflows/release-nightly.yml`

行为：

- 推送到 `main` 或 `master` 时自动执行
- 自动安装依赖并运行 `pnpm run check`
- 自动构建 Windows 便携版
- 自动更新 GitHub 上的 `nightly` 预发布
- 同时上传一份 workflow artifact

### Windows

```bash
pnpm install
pnpm run dist:win
```

输出目录：

- `release/windows`

说明：

- 使用 `electron-builder`
- 目标为便携版 Windows 包
- 桌面入口在 `desktop/main.cjs`

### Android

```bash
pnpm install
pnpm run android:build
```

说明：

- 会先执行资源同步
- 再调用 `android/gradlew.bat` 构建调试包
- Android 本地 SDK 目录不提交仓库

## 发版前检查

- `pnpm run check`
- 确认 `index.html`、`app.js`、`styles.css` 已同步最新改动
- 确认 `public/assets` 中新增资源已被引用
- 确认文章或说明文档是否需要同步更新

## 建议的发布物

### 对外展示

- `pickcat-story.md`
- 项目截图或录屏
- 当前功能说明

### 程序包

- Windows 便携版
- Android 调试版

## 版本备注建议

每次发版至少记录这几项：

- 这次主要恢复了哪些页面或交互
- 新接入了哪些接口
- 修了哪些明显问题
- 有哪些历史资料或截图被新增确认

## 后续建议

- 真正发版时单独建 `deliverables/` 或外部网盘目录
- 仓库内只保留源码、文档、研究资料
- 不把临时包、截图压缩包、测试产物直接堆在根目录
