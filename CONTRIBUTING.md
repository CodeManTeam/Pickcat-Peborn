# Contributing

感谢你关注 Pickcat Reborn。

这个项目不是普通的前端页面仓库，它同时包含：

- 复刻原型
- 历史资料整理
- 接口映射
- 对外叙事内容

所以提交前请尽量先判断你改动的是哪一类内容。

## 建议原则

- 优先保留原始资料，不随意覆盖历史文件
- 优先小步修改，不要把原型、研究资料和宣传文件混在一个提交里
- 接口线索写进 `docs/`，不要只留在代码里
- 新增截图、恢复图或宣传图时，尽量放到对应目录
- 修改 UI 时，尽量对照历史截图而不是纯主观重画

## 提交建议

- `feat:` 新功能或新页面
- `fix:` 修复问题
- `docs:` 文档更新
- `chore:` 杂项整理

示例：

```text
feat: improve work detail page
fix: clean circle board placeholder text
docs: add project readme
```

## 资料目录约定

- `docs/`：项目文档
- `research/`：接口、逆向和研究资料
- `research_downloads/screenshots`：原始截图整理
- `research_downloads/recovered`：恢复后的可展示截图
- `research_downloads/promo`：宣传截图

## 不建议直接提交的内容

- 日志
- 构建产物
- 本地压缩包
- 逆向临时缓存
- 与项目无关的大文件

这些内容应由 `.gitignore` 处理。

## 修改前建议

如果你要改下面这些部分，最好先说明意图：

- `pickcat-story.html`
- `docs/api-map.md`
- `research_downloads/`
- 任何历史截图或恢复图

因为这些内容同时影响项目展示和资料可信度。
