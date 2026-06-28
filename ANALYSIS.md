# 🌸 Mizuki 博客项目深度分析报告

> 分析日期：2026-06-23 | 项目版本：9.0 | 总文件数：300+

---

## 一、项目概览

Mizuki 是一个基于 **Astro 6** + **Svelte 5** + **Tailwind CSS 4** 构建的现代化、功能极其丰富的静态博客模板。它从 [Fuwari](https://github.com/saicaca/fuwari) 模板演化而来，融合了 Yukina、Firefly、Twilight 等多个优秀博客项目的设计理念，形成了独特的功能体系。

**技术栈核心：**

| 层级     | 技术                  | 版本   |
| -------- | --------------------- | ------ |
| 框架     | Astro（静态站点生成） | 6.4.6  |
| UI 交互  | Svelte 5              | 5.56.3 |
| 样式     | Tailwind CSS 4        | 4.3.0  |
| 包管理   | pnpm                  | 11.1.3 |
| 类型系统 | TypeScript            | 6.0.3  |
| Node     | 要求 ≥22             | -      |

---

## 二、架构设计分析

### 2.1 目录结构

```
Mizuki-master/
├── src/
│   ├── assets/          # 静态资源（头像等）
│   ├── components/      # 组件库（核心）
│   │   ├── atoms/       # 原子组件（Badge, Button, Chip, Icon, Image, Link, Loader 等）
│   │   ├── comment/     # 评论系统（Twikoo, Giscus）
│   │   ├── common/      # 通用组件
│   │   ├── control/     # 控制类组件（主题切换、回到顶部、TOC、分页、进度条等）
│   │   ├── features/    # 特色功能组件（相册、番剧、归档、认证、日记、友链等）
│   │   ├── layout/      # 布局组件（Banner, Navbar, Sidebar, Footer 等）
│   │   ├── misc/        # 杂项（Markdown 渲染、版权、壁纸等）
│   │   ├── organisms/   # 有机体组件（导航栏、底部）
│   │   └── widgets/     # 侧边栏部件系统 ★
│   │       ├── announcement/  # 公告
│   │       ├── calendar/      # 日历
│   │       ├── card-toc/      # 卡片式目录
│   │       ├── categories/    # 分类
│   │       ├── common/        # 公共 Widget 组件
│   │       ├── music-player/  # 音乐播放器（原子化设计）
│   │       ├── music-sidebar/ # 侧边栏音乐
│   │       ├── profile/       # 个人资料
│   │       ├── sidebar/       # 侧边栏主组件
│   │       ├── site-stats/    # 站点统计
│   │       ├── tags/          # 标签云
│   │       └── toc/           # 目录
│   ├── config/          # 配置中心 ★（19+ 个配置文件）
│   ├── constants/       # 常量定义
│   ├── content/         # 内容（文章、特殊页面）
│   ├── i18n/            # 国际化（中/英/日）
│   ├── layouts/         # 页面布局
│   ├── pages/           # 路由页面（20+ 个页面）
│   ├── plugins/         # 自定义 Astro/Remark/Rehype 插件（12+）
│   ├── scripts/         # 客户端脚本（Swup 管理器、特效、事件处理）
│   ├── stores/          # Svelte Store（音乐播放器状态管理）
│   ├── styles/          # 全局样式（20+ 个 CSS 文件）
│   ├── types/           # TypeScript 类型定义
│   └── utils/           # 工具函数（25+ 个工具模块）
├── scripts/             # 构建/维护脚本
├── docs/                # 项目文档（含架构规范）
├── public/              # 公共静态资源
├── tests/               # 测试文件
├── astro.config.mjs     # Astro 配置（核心配置文件）
└── vercel.json          # Vercel 部署配置
```

### 2.2 组件架构：原子设计模式

Mizuki 采用 **Atomic Design（原子设计）** 模式组织组件：

```
atoms/     → 基础不可分割组件 (Badge, Button, Icon, Image, Link, Loader, Chip)
features/  → 功能组合组件 (posts, anime, albums, archive, diary, friends, auth...)
widgets/   → 侧边栏 Widget 组件 (profile, calendar, music-player, tags, toc...)
organisms/ → 有机体组件 (navbar, footer)
layout/    → 布局组件 (Banner, SideBar, RightSideBar, SidebarColumn)
misc/      → 杂项组件 (Markdown, License, Wallpaper, ConfigCarrier...)
```

**关键设计亮点：**

- 每个组件目录包含 `index.ts`（导出）、`types.ts`（类型定义）、组件文件本身
- `.astro` 组件用于服务端渲染，`.svelte` 组件用于客户端交互
- 清晰的职责划分：Astro 负责静态结构，Svelte 负责动态交互

### 2.3 音乐播放器：原子化设计典范

`widgets/music-player/` 是项目中最复杂的组件之一，采用了完整的**原子化+分子化+有机体**设计：

```
music-player/
├── atoms/          # 原子组件：PlayButton, CoverImage, ProgressBar 等
├── molecules/      # 分子组件：PlayerControls, ProgressControl, VolumeControl
├── organisms/      # 有机体：MiniPlayer, PlayerBar, Playlist
├── hooks/          # 逻辑钩子：useAudioPlayer, usePlaylist, useVolumeControl
└── MusicPlayer.svelte  # 根组件（状态编排 + 布局协调）
```

音乐播放器拥有**完整的自定义状态管理**（`stores/musicPlayerStore.ts`），实现了：

- 播放/暂停/上一首/下一首
- 随机播放/循环模式
- 音量控制（支持键盘快捷键、拖拽、静音）
- 播放列表可视化
- Mini 播放器 ↔ 完整播放器切换
- 错误处理和自动跳过错误歌曲
- 触摸设备优化（44px 最小触摸目标）

---

## 三、配置系统分析（最核心的设计）

### 3.1 配置中心架构

Mizuki 的配置系统是其最杰出的设计之一，实现了**高度模块化**：

```
config/
├── index.ts              # 配置导出入口（统一导出所有配置 + widgetConfigs 聚合）
├── siteConfig.ts         # 站点核心配置
├── navBarConfig.ts       # 导航栏配置
├── profileConfig.ts      # 个人资料
├── sidebarConfig.ts      # 侧边栏布局配置 ★
├── backgroundWallpaper.ts# 全屏壁纸配置
├── effectsConfig.ts      # 特效配置（樱花）
├── musicConfig.ts        # 音乐播放器
├── commentConfig.ts      # 评论系统
├── pioConfig.ts          # Live2D 看板娘
├── permalinkConfig.ts    # 固定链接
├── licenseConfig.ts      # 许可协议
├── expressiveCodeConfig.ts # 代码高亮
├── footerConfig.ts       # 页脚
├── shareConfig.ts        # 分享
├── announcementConfig.ts # 公告
├── relatedPostsConfig.ts # 相关文章
└── randomPostsConfig.ts  # 随机文章
```

### 3.2 侧边栏 Widget 管理器（核心创新）

这是项目中最精妙的设计。`sidebarLayoutConfig` 实现了**完全配置驱动的侧边栏组件加载**：

```typescript
// src/types/config.ts 中的核心类型
export type WidgetComponentType =
  | "profile" | "announcement" | "categories" | "tags"
  | "toc" | "card-toc" | "music-player" | "music-sidebar"
  | "pio" | "site-stats" | "calendar" | "custom";
```

`WidgetManager` 类（`src/utils/widget-manager.ts`）负责：

- 根据设备类型（mobile/tablet/desktop）动态决定组件显示
- 根据位置（left/right/drawer）分配到不同侧边栏
- 管理组件动画延迟
- 响应式断点控制（mobile: <768px, tablet: <1280px, desktop: ≥1280px）

配置示例：

```typescript
components: {
  left:   ["profile", "announcement", "tags", "card-toc"],
  right:  ["site-stats", "calendar", "categories", "music-sidebar"],
  drawer: ["profile", "announcement", "music-sidebar", "categories", "tags"],
}
```

这意味着用户可以**完全通过修改配置文件**来重排侧边栏，无需修改任何组件代码。

### 3.3 类型安全保障

所有配置都有完整的 TypeScript 接口定义（`src/types/config.ts`，576 行），包括：

| 接口                          | 说明                                                               |
| ----------------------------- | ------------------------------------------------------------------ |
| `SiteConfig`                | 站点核心配置（标题、语言、主题色、特色页面开关、字体、壁纸模式等） |
| `SidebarLayoutConfig`       | 侧边栏布局（组件列表、布局、动画、响应式断点）                     |
| `FullscreenWallpaperConfig` | 全屏壁纸（图片源、轮播、透明度、模糊、覆盖层）                     |
| `PioConfig`                 | 看板娘配置（模型、位置、对话、菜单）                               |
| `MusicPlayerConfig`         | 音乐播放器（Meting API / 本地模式）                                |
| `RelatedPostsConfig`        | 相关文章推荐（多算法加权评分）                                     |
| `PermalinkConfig`           | 固定链接模板                                                       |

---

## 四、页面体系分析

### 4.1 路由架构

```
/                          → 首页（文章列表 + 分页）
/[...page]/                → 分页列表
/[...permalink]/           → 文章详情（支持自定义/全局 permalink）
/posts/[...slug]/          → 传统路径文章详情
/about/                    → 关于页
/friends/                  → 友链页
/anime/                    → 番剧追踪页
/diary/                    → 日记页
/archive/                  → 归档页
/albums/                   → 相册列表
/albums/[id]/              → 相册详情
/projects/                 → 项目展示
/skills/                   → 技能页
/timeline/                 → 时间线
/devices/                  → 设备展示
/rss.xml                   → RSS 订阅
/atom.xml                  → Atom 订阅
/og/[...slug].png          → OG 图片动态生成
/api/allPostMeta.json      → 文章元数据 API
/api/calendar-data.json    → 日历数据 API
404                        → 自定义 404 页
```

### 4.2 特色页面

| 页面               | 功能                      | 数据来源                              |
| ------------------ | ------------------------- | ------------------------------------- |
| **番剧追踪** | 追踪动画观看进度和评分    | Bangumi API / Bilibili API / 本地数据 |
| **友链页面** | 精美卡片展示朋友网站      | `src/content/spec/friends.md`       |
| **日记页面** | 动态时间线（类社交媒体）  | 支持 Memos API 远程获取               |
| **归档页面** | 文章时间线视图 + 日历热图 | 文章集合聚合                          |
| **相册页面** | 图片画廊浏览              | `public/images/albums/` 扫描        |
| **项目展示** | 项目卡片展示              | 前端配置                              |
| **设备展示** | 个人设备展示              | 前端配置                              |

### 4.3 文章系统

每篇文章是一个 `.md` 文件，存放在 `src/content/posts/` 目录下。文件顶部的 YAML frontmatter 定义了文章的元数据。

#### Frontmatter 字段详解

| 字段             | 必填  | 类型     | 含义                                                                                         | 示例                                  |
| ---------------- | ----- | -------- | -------------------------------------------------------------------------------------------- | ------------------------------------- |
| `title`        | ✅ 是 | string   | 文章标题，显示在列表卡片和详情页顶部                                                         | `"我的第一篇文章"`                  |
| `published`    | ✅ 是 | Date     | 发布日期，决定文章排序顺序（`YYYY-MM-DD`）                                                 | `2026-06-23`                        |
| `tags`         | 否    | string[] | 文章标签，用于侧边栏标签云和相关文章推荐。标签是自由定义的，系统会自动收集所有标签并统计频次 | `[Astro, 前端, 教程]`               |
| `category`     | 否    | string   | 文章分类，用于分类导航条和分类筛选。所有出现过的分类会自动生成分类页面                       | `前端`                              |
| `description`  | 否    | string   | 文章摘要，用于 SEO`<meta>` 标签和列表页卡片预览文案。不填则自动提取首段文本                | `"本文介绍了..."`                   |
| `image`        | 否    | string   | 封面图片路径，相对于文章所在目录。也会用于 OG 社交分享卡片                                   | `./cover.jpg`                       |
| `draft`        | 否    | boolean  | 草稿模式。`true` 时开发环境可见，生产环境（`pnpm build`）自动隐藏                        | `false`                             |
| `pinned`       | 否    | boolean  | 置顶文章。`true` 的文章始终排在列表最前面，无视发布日期                                    | `false`                             |
| `priority`     | 否    | number   | 置顶优先级。多篇置顶文章时，数字越小越靠前（需`pinned: true` 才生效）                      | `1`                                 |
| `comment`      | 否    | boolean  | 当前文章是否显示评论区（需在`commentConfig.ts` 中全局启用评论系统）                        | `true`                              |
| `lang`         | 否    | string   | 文章语言代码。仅在与站点默认语言不同时需要设置，值如`en` / `ja` / `zh_CN`              | `en`                                |
| `encrypted`    | 否    | boolean  | 加密文章。设为`true` 时必须同时设置 `password`，读者需输入密码才能查看内容               | `true`                              |
| `password`     | 否    | string   | 加密密码。使用客户端 AES 解密，密码不会传输到服务器                                          | `"mypassword"`                      |
| `passwordHint` | 否    | string   | 密码提示语，显示在密码输入框上方                                                             | `"我的生日"`                        |
| `permalink`    | 否    | string   | 自定义文章 URL 路径。优先级高于全局 permalink 模板                                           | `"my-custom-url"`                   |
| `author`       | 否    | string   | 文章作者。仅在当前文章作者与站点默认作者不同时填写                                           | `"张三"`                            |
| `sourceLink`   | 否    | string   | 原文链接。转载文章用于标注原始出处                                                           | `"https://example.com/original"`    |
| `licenseName`  | 否    | string   | 文章单独使用的许可协议名称，覆盖全局许可设置                                                 | `"CC BY-NC-SA 4.0"`                 |
| `licenseUrl`   | 否    | string   | 许可协议对应的链接地址                                                                       | `"https://creativecommons.org/..."` |

#### 最小配置

只需要 `title` + `published`，其余全部可选：

```yaml
---
title: 随便写什么都可以
published: 2026-06-23
---
```

#### 完整示例

```yaml
---
title: 使用 Astro 搭建个人博客
published: 2026-06-23
description: 从零开始，一步步用 Mizuki 模板搭建属于自己的动漫风格博客。
image: ./cover.webp
tags: [Astro, 教程, 博客]
category: 前端
draft: false
pinned: true
priority: 1
comment: true
lang: zh_CN
---
```

#### 排序规则

文章列表的排序逻辑（`src/utils/content-utils.ts`）：

1. **置顶文章优先**（`pinned: true`）
2. 置顶文章内部按 `priority` 升序（数字越小越靠前）
3. 非置顶文章按 `published` 降序（最新的在前）

#### Permalink 系统

全局 permalink 功能由 `src/config/permalinkConfig.ts` 控制。启用后所有文章 URL 按模板生成，支持的占位符：

| 占位符         | 说明                                  | 示例输出          |
| -------------- | ------------------------------------- | ----------------- |
| `%year%`     | 4 位年份                              | `2026`          |
| `%monthnum%` | 2 位月份                              | `06`            |
| `%day%`      | 2 位日期                              | `23`            |
| `%hour%`     | 2 位小时                              | `14`            |
| `%minute%`   | 2 位分钟                              | `30`            |
| `%second%`   | 2 位秒数                              | `45`            |
| `%post_id%`  | 文章序号（按发布时间升序编号）        | `42`            |
| `%postname%` | 文章文件名（slug）                    | `my-first-post` |
| `%category%` | 分类名（无分类时为`uncategorized`） | `frontend`      |

模板示例：`"%year%-%monthnum%-%postname%"` → 生成 `/2026-06-my-first-post/`

> **注意**：自定义 `permalink` 字段优先级高于全局模板。如果文章设置了 `permalink: "custom-path"`，则直接使用 `/custom-path/`。

#### 创建新文章

```bash
pnpm new-post 文章文件名    # 在 src/content/posts/ 下生成模板文件
```

---

## 五、插件系统分析

### 5.1 Remark 插件（Markdown 解析阶段）

| 插件                              | 功能                       |
| --------------------------------- | -------------------------- |
| `remark-math`                   | 数学公式语法解析           |
| `remark-content`                | 阅读时间/字数统计/CJK 优化 |
| `remark-fix-github-admonitions` | GitHub 风格提示框修复      |
| `remark-directive`              | 自定义指令语法解析         |
| `remark-sectionize`             | 自动包裹章节               |
| `remark-mermaid`                | Mermaid 图表支持           |
| `remark-directive-rehype`       | 指令转 rehype 组件         |

### 5.2 Rehype 插件（HTML 转换阶段）

| 插件                         | 功能                                  |
| ---------------------------- | ------------------------------------- |
| `rehype-katex`             | KaTeX 数学公式渲染                    |
| `rehype-external-links`    | 外部链接（target=_blank, nofollow）   |
| `rehype-slug`              | 标题自动生成 ID                       |
| `rehype-autolink-headings` | 标题锚点链接                          |
| `rehype-components`        | 自定义组件（Admonition, GitHub Card） |
| `rehype-mermaid`           | Mermaid 图表渲染                      |
| `rehype-wrap-table`        | 表格响应式包裹                        |
| `rehype-image-width`       | 图片宽度优化                          |

### 5.3 自定义内容插件

- **`remark-content.mjs`**：智能阅读时间计算，针对 CJK 字符使用 400字/分钟（英文 200词/分钟），支持 `<!--more-->` 摘要分隔符，跳过代码块不计入字数
- **`rehype-component-admonition.mjs`**：支持 `> [!NOTE]` / `> [!TIP]` / `> [!WARNING]` 等 GitHub 风格的提示框
- **`rehype-component-github-card.mjs`**：`::github{repo="user/repo"}` 语法渲染 GitHub 仓库卡片

---

## 六、交互系统分析

### 6.1 Swup 页面过渡系统

Mizuki 使用 [Swup](https://swup.js.org/) 实现 **SPA 式页面过渡**，核心架构：

```
scripts/
├── swup-manager.ts        # SwupManager 主入口（统一协调）
├── core/
│   ├── swup-config.ts     # Swup 配置常量
│   └── swup-hooks.ts      # Swup 生命周期钩子管理
├── effects/
│   ├── sakura-effect.ts   # 樱花飘落特效
│   └── transition-effect.ts # 页面过渡效果
└── handlers/
    ├── fancybox-handler.ts     # 图片灯箱
    ├── back-to-top-handler.ts  # 回到顶部
    ├── panel-handler.ts        # 面板管理
    └── scroll-handler.ts       # 滚动优化
```

**SwupManager** 采用单例模式，统一管理所有 Swup 相关功能：

- 页面过渡动画控制
- 代码块主题切换
- Fancybox 初始化/清理
- 自定义滚动条初始化
- KaTeX 公式检测和渲染
- 面板状态管理

### 6.2 主题系统

- **明暗主题切换**：支持 Light/Dark，自动检测系统偏好
- **动态主题色**：支持色相选择器（hue 0-360），CSS 变量驱动
- **壁纸模式**：四种模式 — `banner`（横幅）/ `fullscreen`（全屏）/ `overlay`（覆盖层）/ `none`（无）
- **导航栏透明模式**：`semi` / `full` / `semifull`
- **代码块主题**：自动跟随系统明暗主题

### 6.3 特效系统

| 特效              | 实现                               | 可配置项                       |
| ----------------- | ---------------------------------- | ------------------------------ |
| 🌸 樱花飘落       | Canvas 粒子动画                    | 数量、大小、透明度、速度、开关 |
| 🌊 波浪动画       | CSS/SVG 动画                       | GPU 加速、移动端禁用、开关     |
| 🔄 页面过渡       | Swup + CSS transitions             | 过渡动画类名                   |
| 📊 阅读进度条     | Intersection Observer              | 开关、高度、动画时长           |
| ⌨️ 打字机效果   | JS 定时器                          | 速度、删除速度                 |
| 🎵 音乐播放器动画 | CSS keyframes + Svelte transitions | -                              |

---

## 七、性能优化策略

### 7.1 构建时优化

1. **静态生成**：`output: "static"`，所有页面预渲染为静态 HTML
2. **图片优化**：支持 AVIF/WebP 格式输出，智能裁剪分发
3. **字体压缩**：自定义 `scripts/compress-fonts/` 工具，按需提取字体子集
4. **CSS 优化**：`cssCodeSplit: true`，`cssMinify: "esbuild"`，内联小型 CSS
5. **生产环境净化**：自动移除 `console.log` 和 `debugger`

### 7.2 运行时优化

1. **Vite 预热**：开发环境预打包常用依赖（Iconify, Svelte, OverlayScrollbars 等）
2. **Vite 预热入口**：`server.warmup.clientFiles` 配置关键入口文件
3. **懒加载**：Pio 看板娘使用 `client:visible` 按需加载
4. **MusicPlayer**：使用 `client:idle` 延迟加载
5. **Swup 缓存**：页面缓存 + 智能预加载
6. **小图片优化**：`assetsInlineLimit: 4096`（4KB 以下 Base64 内联）

### 7.3 CSS 架构优化

- Tailwind CSS 4 的 `@layer` 分层（base → components → utilities）
- CSS 变量驱动的主题系统
- `@reference` 避免重复导入
- GPU 加速动画（`transform: translateZ(0)`, `will-change`, `backface-visibility`）

---

## 八、部署与 DevOps

### 8.1 支持的部署平台

| 平台             | 配置                                           |
| ---------------- | ---------------------------------------------- |
| GitHub Pages     | `.github/workflows/deploy.yml`               |
| Vercel           | `vercel.json`（安全头、缓存策略、cleanUrls） |
| Netlify          | 文档指南                                       |
| Cloudflare Pages | 文档指南                                       |

### 8.2 内容仓库分离模式

Mizuki 支持**代码和内容分离到两个独立仓库**：

- 通过 `ENABLE_CONTENT_SYNC=true` 环境变量启用
- 支持公开和私有仓库
- 开发前自动同步最新内容（`predev` 钩子）
- 完整的迁移指南和故障排查文档

### 8.3 构建管线

```bash
pnpm build:
  1. node scripts/update-anime.mjs    # 更新番剧数据
  2. astro build                       # Astro 静态构建
  3. pagefind --site dist              # Pagefind 搜索索引
  4. node scripts/compress-fonts/index.js  # 字体子集压缩
```

---

## 九、Markdown 扩展语法

Mizuki 支持超越标准 GFM 的增强语法：

| 语法                                                                                    | 功能            |
| --------------------------------------------------------------------------------------- | --------------- |
| `> [!NOTE]` / `> [!TIP]` / `> [!WARNING]` / `> [!CAUTION]` / `> [!IMPORTANT]` | 提示框          |
| `$E=mc^2$` / `$$\int_0^\infty$$`                                                    | KaTeX 数学公式  |
| `::github{repo="user/repo"}`                                                          | GitHub 仓库卡片 |
| `\`\`\`mermaid`                                                                       | Mermaid 图表    |
| `<!--more-->`                                                                         | 手动摘要分隔符  |
| `permalink: custom-path`                                                              | 自定义永久链接  |

---

## 十、国际化（i18n）

支持 **5 种语言**（简体中文、繁体中文、英语、日语），架构清晰：

```
i18n/
├── i18nKey.ts          # 翻译键枚举
├── translation.ts      # 翻译函数（i18n）
└── languages/
    ├── zh_CN.ts        # 简体中文
    ├── zh_TW.ts        # 繁体中文
    ├── en.ts           # 英语
    └── ja.ts           # 日语
```

---

## 十一、CMS/编辑器集成

`docs/editor/` 目录提供了**自定义 Markdown 编辑器**：

- `editor.html`：可视化编辑界面
- `editor.js`：编辑器逻辑
- `editor.css`：编辑器样式

这表明项目不仅是一个模板，还提供了**完整的内容创作工具链**。

---

## 十二、值得学习的技术亮点

### 12.1 架构层面

1. **配置驱动架构**：`WidgetManager` + `sidebarLayoutConfig` 实现了纯配置的 UI 布局管理
2. **原子设计模式**：完整的 atoms → molecules → organisms → templates 分层
3. **关注点分离**：Astro（SSR 结构）+ Svelte（客户端交互）各司其职
4. **模块化 Swup 管理**：将复杂的页面过渡逻辑拆分为独立处理器

### 12.2 工程化层面

1. **完整的 TypeScript 类型覆盖**：576 行的类型定义文件，零 `any` 逃逸
2. **统一的配置文件注释风格**：`config/index.ts` 的文档级注释非常清晰
3. **CSS 架构设计**：CSS 变量驱动 + Tailwind 4 分层 + Stylus 混合使用
4. **多平台部署适配**：GitHub Actions、Vercel、Netlify、Cloudflare Pages 全覆盖

### 12.3 用户体验层面

1. **阅读时间计算**：CJK 400字/分钟，英文 200词/分钟，混合文本智能计算
2. **相关文章推荐**：多算法加权评分（标签 IDF 加权 + Jaccard 相似度 + 时间衰减）
3. **密码保护文章**：客户端 AES 解密，支持密码提示
4. **OG 图片自动生成**：使用 Satori 库动态生成社交分享卡片

### 12.4 性能层面

1. **Vite 预热策略**：预打包常用依赖 + 预热关键入口文件
2. **智能懒加载**：`client:idle` / `client:visible` 指令按需加载
3. **字体子集化**：自定义脚本扫描页面实际使用的字符生成压缩字体

---

## 十三、改进建议

1. **测试覆盖**：当前仅有 3 个测试文件，建议增加组件测试和端到端测试
2. **文档网站代码分离**：`docs/editor/` 中的编辑器实现可考虑独立为单独包
3. **Stores 扩展**：目前只有 `musicPlayerStore` 一个 Svelte Store，主题/壁纸状态可考虑统一管理
4. **CSS 混合**：同时使用了 Stylus 和 Tailwind CSS 4，可考虑完全迁移到 Tailwind
5. **组件文档**：可增加 Storybook 或类似工具来可视化组件库

---

## 十四、总结

Mizuki 是一个**高度工程化、功能极其完善**的静态博客项目。它的核心优势在于：

1. **配置驱动**：几乎所有功能都可以通过修改配置文件来定制，无需触碰组件代码
2. **架构优雅**：原子设计 + 关注点分离 + 模块化管理，代码可维护性极高
3. **功能完整**：从番剧追踪到音乐播放器，从加密文章到友链页面，覆盖了博客的所有需求
4. **性能优秀**：静态生成 + 图片优化 + 字体压缩 + 智能懒加载，Lighthouse 满分可期
5. **文档详尽**：多语言 README + 完整的 docs 目录 + 架构规范文档

这个项目适合作为学习 **Astro 全栈开发**、**组件化架构设计**、**TypeScript 类型系统设计**的优秀范例。

---

## 十五、个性化配置指南（新手上手）

> 以下是一份**零代码**的配置清单。所有个性化操作只需修改配置文件或替换图片文件，无需触碰组件源码。

### 15.1 核心身份配置（必改）

**文件：`src/config/siteConfig.ts`**

| 行号    | 字段                  | 原值                             | 改为你的                                 |
| ------- | --------------------- | -------------------------------- | ---------------------------------------- |
| 4       | `SITE_LANG`         | `"en"`                         | `"zh_CN"`（中文）/ `"ja"`（日文）等  |
| 7       | `title`             | `"Mizuki"`                     | 你的博客标题                             |
| 8       | `subtitle`          | `"One demo website"`           | 你的副标题                               |
| 9       | `siteURL`           | `"https://mizuki.mysqil.com/"` | 你的域名（先不改，部署前再改）           |
| 10      | `siteStartDate`     | `"2025-01-01"`                 | 你的建站日期                             |
| 15      | `hue`               | `240`                          | 主题色相：0=红, 200=青, 250=蓝绿, 345=粉 |
| 150     | `homeText.title`    | `"わたしの部屋"`               | 首页 Banner 标题                         |
| 153-158 | `homeText.subtitle` | 日语数组                         | 你的副标题文案数组（打字机轮播）         |

**特色页面开关**（第 20-29 行）：不需要的页面设为 `false`，导航栏会自动隐藏。

```typescript
featurePages: {
  anime: false,    // 不追番就关掉
  diary: false,    // 不写日记就关掉
  // ... 按需开关
},
```

**文件：`src/config/profileConfig.ts`**

```typescript
avatar: "assets/images/avatar.webp",  // ← 头像路径
name: "你的昵称",                      // ← 显示在侧边栏
bio: "你的签名/简介",                   // ← 支持打字机效果
links: [                               // ← 社交链接，随意增删
  { name: "GitHub",  icon: "fa7-brands:github",   url: "https://github.com/你的ID" },
  { name: "Bilibili", icon: "fa7-brands:bilibili", url: "https://space.bilibili.com/你的ID" },
],
```

**文件：`src/content/spec/about.md`**

完整替换为你的自我介绍，支持 Markdown 语法。

### 15.2 背景壁纸替换

**桌面端横幅** → 替换 `public/assets/desktop-banner/` 下的图片：

```
1.webp  2.webp  3.webp  4.webp
```

将你的动漫壁纸转为 `.webp` 格式，建议分辨率 **1920×1080**，覆盖原文件即可。

**手机端横幅** → 替换 `public/assets/mobile-banner/` 下的图片（建议 750×1334）。

**轮播设置**（`siteConfig.ts` 第 126-130 行）：

```typescript
carousel: { enable: true, interval: 3, switchable: true }
```

> 💡 如果只有一张壁纸，把 `src` 改成单个字符串：`src: "/assets/desktop-banner/1.webp"`，轮播自动关闭。

**全屏壁纸模式**（`src/config/backgroundWallpaper.ts`）：与横幅共用图片路径，切换壁纸模式即可生效。

### 15.3 头像与 Logo 图片

| 文件路径                                 | 说明                         | 建议尺寸 |
| ---------------------------------------- | ---------------------------- | -------- |
| `src/assets/images/avatar.webp`        | 侧边栏头像                   | 200×200 |
| `public/assets/home/home.webp`         | 导航栏小图标                 | 32×32   |
| `public/assets/home/default-logo.webp` | 网站 Logo（logo 模式时使用） | 200×60  |
| `public/favicon/favicon.ico`           | 浏览器标签页图标             | 32×32   |

### 15.4 导航栏菜单

**文件：`src/config/navBarConfig.ts`**

内置了 `LinkPreset` 预设——直接用预设即可自动获得正确的名称、URL 和图标：

```typescript
links: [
  LinkPreset.Home,       // 首页
  LinkPreset.Archive,    // 归档
  LinkPreset.Anime,      // 番剧
  LinkPreset.Friends,    // 友链
  LinkPreset.About,      // 关于
],
```

也支持自定义链接和下拉菜单（完整文档在配置文件中，含详细注释）。

### 15.5 特色页面数据

所有特色页面都有对应的**数据文件**，位于 `src/data/`：

| 文件                     | 页面路由       | 修改内容                                 |
| ------------------------ | -------------- | ---------------------------------------- |
| `src/data/anime.ts`    | `/anime/`    | 追番列表（标题、封面、评分、进度、分类） |
| `src/data/projects.ts` | `/projects/` | 项目列表（名称、描述、技术栈、链接）     |
| `src/data/skills.ts`   | `/skills/`   | 技能列表（名称、分类、熟练度）           |
| `src/data/timeline.ts` | `/timeline/` | 个人经历（教育、工作、项目、成就）       |
| `src/data/diary.ts`    | `/diary/`    | 生活动态（内容、日期、标签、图片）       |
| `src/data/devices.ts`  | `/devices/`  | 电子设备展示                             |
| `src/data/friends.ts`  | `/friends/`  | 友链数据                                 |

不需要的页面在 `siteConfig.ts` → `featurePages` 中设为 `false` 即可关闭。

**番剧数据示例** (`src/data/anime.ts`)：

```typescript
export const animeList: AnimeItem[] = [
  {
    title: "葬送的芙莉莲",
    cover: "/assets/anime/frieren.webp",
    status: "watched",     // planned/watching/watched/dropped
    rating: 10,
    progress: 28,
    totalEpisodes: 28,
    genre: ["奇幻", "冒险", "治愈"],
    year: "2023",
  },
  // ... 继续添加
];
```

番剧有三种数据源模式（`siteConfig.ts` 中 `anime.mode`）：

- `"local"`：使用 `src/data/anime.ts` 本地数据（默认）
- `"bangumi"`：从 Bangumi 自动获取，需配置 `bangumi.userId`
- `"bilibili"`：从 B 站自动获取，需配置 `bilibili.vmid`

**相册数据**：存放在 `public/images/albums/` 目录下，采用**文件夹 + info.json** 的方式组织——不需要写代码，创建文件夹和配置文件就行。

目录结构示例：

```
public/images/albums/
├── MyTravel/             # 文件夹名 = 相册 ID（URL 里会用到）
│   ├── info.json         # 相册配置（标题、日期、标签等）
│   ├── cover.webp        # 封面图
│   ├── photo1.webp       # 照片（任意命名）
│   └── photo2.webp       #  支持 jpg/png/webp/avif/gif
└── AnotherAlbum/
    ├── info.json
    ├── cover.webp
    └── ...
```

每个相册的 `info.json` 写法：

```json
{
  "title": "我的旅行相册",           // 相册标题（不填则用文件夹名）
  "description": "2025年日本之旅",   // 相册描述
  "date": "2025-08-01",             // 日期
  "location": "东京",                // 拍摄地点
  "tags": ["旅行", "风景", "日本"],   // 标签（用于筛选）
  "hidden": false                   // true = 隐藏此相册
}
```

额外支持三种模式：

| 模式                       | 说明             | info.json 写法                                           |
| -------------------------- | ---------------- | -------------------------------------------------------- |
| **本地模式**（默认） | 照片直接放文件夹 | 不需要特殊字段                                           |
| **外链模式**         | 图片来自外部 URL | `"mode": "external"` + `"cover"` + `"photos"` 数组 |
| **加密模式**         | 需要密码才能查看 | `"password": "123456"` + `"passwordHint": "提示"`    |

> 项目自带 `AcgExample`、`ExternalExample`、`HiddenExample`、`EncryptedExample` 四个示例相册，参照着改就行。

**日记数据**：`src/data/diary.ts`，每个条目代表一条动态：

```typescript
export const diaryData: DiaryItem[] = [
  {
    id: 1,                              // 唯一 ID
    content: "今天去了秋叶原，太开心了！",  // 日记内容
    date: "2025-01-15T10:30:00Z",        // 发布时间
    images: ["/images/diary/1.webp"],     // 配图（可选，支持多张）
    location: "秋叶原",                    // 地点（可选）
    mood: "开心",                          // 心情（可选）
    tags: ["旅行", "日常"],                // 标签（可选，用于筛选）
  },
  // ... 继续添加
];
```

日记支持**静态数据**（直接写 `diary.ts`）和 **Memos API** 两种模式。在 `siteConfig.ts` 中设置：

```typescript
diaryApiUrl: "",  // 留空 = 使用 src/data/diary.ts 静态数据
// diaryApiUrl: "https://memos.example.com/api/v1/memo?creatorId=1",  // 填写 = 使用 Memos API 远程获取
```

### 15.6 功能开关与配置

| 功能       | 配置文件                             | 关键字段                                                                   |
| ---------- | ------------------------------------ | -------------------------------------------------------------------------- |
| 音乐播放器 | `src/config/musicConfig.ts`        | `enable` / `mode`（local=本地MP3, meting=网易云API）/ `id`（歌单ID） |
| 评论系统   | `src/config/commentConfig.ts`      | `enable` / `system`（twikoo/giscus）                                   |
| 樱花特效   | `src/config/effectsConfig.ts`      | `enable` / `sakuraNum`（花瓣数量）                                     |
| 看板娘     | `src/config/pioConfig.ts`          | `enable` / `position` / `dialog.welcome`（欢迎词）                   |
| 公告栏     | `src/config/announcementConfig.ts` | `content`（公告内容）/ `link`（链接）                                  |
| 页脚备案   | `src/config/footerConfig.ts`       | `enable` / `customHtml`（备案号 HTML）                                 |
| 分享按钮   | `src/config/shareConfig.ts`        | `enable`                                                                 |
| 相关文章   | `src/config/relatedPostsConfig.ts` | `enable` / `maxCount`                                                  |
| 侧边栏排序 | `src/config/sidebarConfig.ts`      | `components.left/right/drawer` 数组                                      |

**音乐播放器本地模式**：将 MP3 文件放入 `public/assets/music/url/`，封面放入 `public/assets/music/cover/`。

**评论系统**：推荐 Twikoo（免费），部署到 Vercel 后填入 `envId` 即可。

**看板娘**：`src/config/pioConfig.ts`，每个字段的含义：

```typescript
export const pioConfig: PioConfig = {
  enable: true,                                          // 总开关
  models: ["/pio/models/NOIR/noir.model3.json"],         // 模型文件路径（可传多个）
  position: "left",                                      // 显示位置："left" | "right"
  width: 280,                                            // 画布宽度（px）
  height: 250,                                           // 画布高度（px）
  mode: "draggable",                                     // 展现模式："static" 固定 / "fixed" 跟随滚动 / "draggable" 可拖拽
  hiddenOnMobile: true,                                  // 手机上隐藏（推荐 true，省空间）
  hideAboutMenu: false,                                  // 隐藏内置 "About" 菜单按钮

  dialog: {
    welcome: "欢迎来到我的博客！",                         // ★ 首次打开时的欢迎词
    touch: [                                              // ★ 点击/触碰看板娘时的台词（随机播放）
      "别碰我！",
      "HENTAI！",
      "再摸我要生气了！",
    ],
    home: "点这里回到首页哦~",                              // 首页提示
    skin: ["想看我换新衣服吗？", "新衣服好看吗~"],          // 换装提示 [换之前, 换之后]
    close: "下次再见~",                                    // 关闭时的台词
    link: "https://github.com/LyraVoid/Mizuki",           // 点击 "About" 跳转的链接
  },

  tips: {                                                // 循环提示（可选）
    welcomeMessage: ["你好呀！", "今天也是美好的一天~"],    // 每次刷新时随机选一条
    messages: [                                           // 循环播报的提示内容
      "可以点击左下角切换壁纸模式哦",
      "右下角有音乐播放器~",
    ],
    duration: 5000,                                       // 每条提示展示时长（ms）
    interval: 8000,                                       // 两条提示间的间隔（ms）
  },

  menus: {                                               // 自定义菜单（可选）
    items: [
      { icon: "material-symbols:home", label: "首页", action: "home" },
      { icon: "material-symbols:info",  label: "关于", action: "about" },
    ],
    align: "left",                                       // 菜单对齐方向
  },
};
```

**看板娘个性化三步走：**

1. **开/关** → `enable: true/false`
2. **改台词** → 把 `dialog` 里带 ★ 的字段改成你自己的话
3. **换模型** → 去 [Pio 模型库](https://github.com/Dreamer-Paul/Pio) 下载喜欢的模型，放到 `public/pio/models/` 下，然后改 `models` 路径

**模型替换与多模型切换：**

模型文件在 `public/pio/models/NOIR/` 目录下，是一套 Live2D 模型。`models` 是一个数组，支持填多个模型路径：

```
public/pio/models/
├── NOIR/                       # 默认角色
│   └── noir.model3.json
├── Haru/                       # 第二个角色
│   └── haru.model3.json
└── Shizuku/                    # 第三个角色
    └── shizuku.model3.json
```

```typescript
models: [
  "/pio/models/NOIR/noir.model3.json",
  "/pio/models/Haru/haru.model3.json",
  "/pio/models/Shizuku/shizuku.model3.json",
],
```

默认显示第一个模型，用户点击看板娘时**自动在多个模型间循环切换**（换装效果）。意味着一次配置就能用上所有下载的模型，不需要改配置重启。

**模型格式要求：** 需要 **Live2D Cubism 3** 格式（`.model3.json`），每个模型必须包含：

```
模型文件夹/
├── 角色名.model3.json      ← 入口文件（必需）
├── 角色名.moc3             ← 骨骼/网格数据（必需）
├── 角色名.physics3.json    ← 物理效果（必需）
├── texture_00.png          ← 贴图（必需）
└── 表情名.exp3.json        ← 表情动画（可选，可有多个）
```

⚠️ Cubism 2 格式（`.model.json`）不兼容，下载时注意区分。Mizuki 使用的引擎 `l2d-widget` 仅支持 Cubism 3。

**实现原理：** `Pio.astro` 生成一个 `<iframe>` 加载 `/pio/live2d-host.html`，iframe 内通过 `l2d-widget.min.js` 渲染 Live2D 模型。模型加载、换装、点击交互都在 iframe 沙盒内完成，通过 `postMessage` 与外层页面通信（如告知模型高度、响应用户动作跳转页面）。与 Swup 页面过渡系统深度集成，页面切换时自动重新初始化。

### 15.7 添加博客文章

```bash
pnpm new-post my-first-post    # 创建新文章
```

编辑生成的 `src/content/posts/my-first-post.md`：

```markdown
---
title: 我的第一篇文章
published: 2026-06-23
description: 这是文章描述
image: ./cover.jpg           # 可选，封面图片
tags: [生活, 技术]
category: 博客
draft: false                 # true = 草稿，生产环境不显示
pinned: false                # true = 置顶
comment: true                # 是否开启评论
---

文章正文内容（Markdown 格式）...
```

### 15.8 启动与预览

```bash
pnpm install    # 首次安装依赖
pnpm dev        # 启动开发服务器 → http://localhost:3000
pnpm build      # 构建生产版本 → ./dist/
```

### 15.9 配置修改速查表

| 要改什么                     | 去哪里改                                |
| ---------------------------- | --------------------------------------- |
| 博客标题、语言、主题色、字体 | `src/config/siteConfig.ts`            |
| 头像、昵称、社交链接         | `src/config/profileConfig.ts`         |
| 桌面壁纸图片                 | `public/assets/desktop-banner/*.webp` |
| 手机壁纸图片                 | `public/assets/mobile-banner/*.webp`  |
| 全屏壁纸参数（模糊、透明度） | `src/config/backgroundWallpaper.ts`   |
| 导航栏菜单                   | `src/config/navBarConfig.ts`          |
| 关于页面                     | `src/content/spec/about.md`           |
| 番剧列表                     | `src/data/anime.ts`                   |
| 项目列表                     | `src/data/projects.ts`                |
| 技能列表                     | `src/data/skills.ts`                  |
| 个人经历                     | `src/data/timeline.ts`                |
| 日记动态                     | `src/data/diary.ts`                   |
| 设备展示                     | `src/data/devices.ts`                 |
| 友链数据                     | `src/data/friends.ts`                 |
| 音乐播放器                   | `src/config/musicConfig.ts`           |
| 评论系统                     | `src/config/commentConfig.ts`         |
| 樱花特效                     | `src/config/effectsConfig.ts`         |
| 看板娘                       | `src/config/pioConfig.ts`             |
| 公告栏                       | `src/config/announcementConfig.ts`    |
| 页脚备案号                   | `src/config/footerConfig.ts`          |
| 侧边栏组件排序               | `src/config/sidebarConfig.ts`         |
| 博客文章                     | `src/content/posts/`                  |

> ⚠️ **注意**：`.env` 文件仅在需要「内容仓库分离」或「B站追番进度」等高级功能时才需配置。个人博客直接从 `pnpm dev` 开始即可，无需创建 `.env` 文件。

---

## 十六、附录：关键文件索引

| 分类               | 文件路径                                         | 说明                                                       |
| ------------------ | ------------------------------------------------ | ---------------------------------------------------------- |
| **入口配置** | `astro.config.mjs`                             | Astro 构建配置、插件注册、Vite 优化                        |
|                    | `package.json`                                 | 依赖列表、脚本命令                                         |
|                    | `tsconfig.json`                                | TypeScript 编译配置                                        |
| **全局类型** | `src/types/config.ts`                          | 所有配置接口定义（576 行）                                 |
|                    | `src/types/album.ts`                           | 相册类型定义                                               |
| **全局常量** | `src/constants/constants.ts`                   | 页面宽度、Banner 高度、壁纸模式常量                        |
|                    | `src/constants/link-presets.ts`                | 导航栏预设链接映射                                         |
| **布局**     | `src/layouts/Layout.astro`                     | 根布局（HTML 骨架、OG 标签、全局样式变量）                 |
|                    | `src/layouts/MainGridLayout.astro`             | 主网格布局（Banner + Navbar + Sidebar + Content + Footer） |
| **核心页面** | `src/pages/[...page].astro`                    | 首页/分页列表                                              |
|                    | `src/pages/[...permalink].astro`               | 文章详情页（permalink 路由）                               |
|                    | `src/pages/posts/[...slug].astro`              | 文章详情页（传统 slug 路由）                               |
| **核心工具** | `src/utils/content-utils.ts`                   | 文章排序、分类、标签、相关文章推荐算法                     |
|                    | `src/utils/widget-manager.ts`                  | 侧边栏组件管理器                                           |
|                    | `src/utils/grid-layout-utils.ts`               | 网格布局计算                                               |
|                    | `src/utils/permalink-utils.ts`                 | 固定链接生成                                               |
| **插件**     | `src/plugins/remark-content.mjs`               | 阅读时间/字数/CJK 优化/摘要提取                            |
|                    | `src/plugins/rehype-component-admonition.mjs`  | 提示框渲染                                                 |
|                    | `src/plugins/rehype-component-github-card.mjs` | GitHub 仓库卡片                                            |
| **状态管理** | `src/stores/musicPlayerStore.ts`               | 音乐播放器全局状态                                         |
| **入口脚本** | `src/scripts/swup-manager.ts`                  | Swup 页面过渡主管理器                                      |
| **样式入口** | `src/styles/main.css`                          | 全局样式入口                                               |
|                    | `src/styles/variables.styl`                    | Stylus 变量定义                                            |

---

## 十七、本地开发与测试指南

> 在把博客部署上线之前，先在本地把效果调完美。

### 17.1 环境准备

Mizuki 只需要两个东西，不存在与 Python/Conda 的环境冲突：

| 依赖    | 版本要求   | 安装方式                                            |
| ------- | ---------- | --------------------------------------------------- |
| Node.js | ≥ 22      | [nodejs.org](https://nodejs.org) 或 `nvm install 22` |
| pnpm    | 任意最新版 | `npm install -g pnpm`                             |

```bash
# 先确认环境就绪
node --version   # 应输出 v22.x.x
pnpm --version   # 应输出版本号

# 进入项目目录，安装依赖（仅首次）
cd d:/二次元/动漫博客/Mizuki-master
pnpm install
```

> **Conda 用户注意**：你不需要激活或退出 Conda 环境。Node.js 和 Conda 是两套完全独立的体系，互不影响。`(base)` 前缀不影响 pnpm 使用。

### 17.2 三个核心命令

| 命令             | 端口           | 用途       | 特点                                 |
| ---------------- | -------------- | ---------- | ------------------------------------ |
| `pnpm dev`     | **3000** | 日常开发   | 毫秒级热更新，修改即刷新             |
| `pnpm build`   | —             | 生产构建   | 生成`dist/` 目录                   |
| `pnpm preview` | **4321** | 上线前验证 | 预览生产构建结果，和上线效果完全一致 |

### 17.3 热更新行为

`pnpm dev` 启动后，修改以下任何文件浏览器都会自动刷新：

| 文件类型                           | 刷新方式               | 延迟   |
| ---------------------------------- | ---------------------- | ------ |
| `src/config/*.ts`（配置）        | 自动重载页面           | ~1s    |
| `src/content/posts/*.md`（文章） | 自动重载页面           | ~1s    |
| `src/data/*.ts`（番剧/项目数据） | 自动重载页面           | ~1s    |
| `.astro` 组件                    | HMR 热替换（不刷新）   | 毫秒级 |
| `.svelte` 组件                   | HMR 热替换（不刷新）   | 毫秒级 |
| `src/styles/*.css`               | HMR 即时生效（不刷新） | 毫秒级 |
| `public/` 图片                   | 自动重载页面           | ~1s    |

> 💡 **HMR（Hot Module Replacement）**：只替换修改的模块，不刷新整个页面，开发体验极快。

### 17.4 高频测试场景

**场景 A：调试文章排版**

```bash
pnpm dev
# → 浏览器打开 http://localhost:3000
# → 找到你的文章，边改边看效果
# → Ctrl+S 保存，浏览器瞬间刷新
```

**场景 B：调整主题色**

```bash
pnpm dev
# → 打开 src/config/siteConfig.ts
# → 改 hue: 240 → 350（粉色系）→ 保存
# → 浏览器立刻看到整个博客变色
```

**场景 C：换壁纸看效果**

```bash
# → 把新壁纸放到 public/assets/desktop-banner/1.webp
# → 浏览器自动刷新，看新壁纸上身效果
```

**场景 D：上线前最终验证**

```bash
pnpm build       # 1. 确认构建无报错
pnpm preview     # 2. 打开 http://localhost:4321 逐页检查：
                 #    - 首页 Banner 和文章列表
                 #    - 文章详情页排版
                 #    - 特色页面（番剧/友链/关于等）
                 #    - 明暗主题切换
                 #    - 手机端效果（F12 → 手机模拟）
```

**场景 E：检查类型错误**

```bash
pnpm check       # 等价于 astro check，检查所有 .astro 和 .ts 文件的类型
```

### 17.5 开发环境 vs 生产环境的差异

| 行为         | `pnpm dev`                    | `pnpm build` + `pnpm preview` |
| ------------ | ------------------------------- | --------------------------------- |
| 字体子集压缩 | ❌ 不生效（显示浏览器默认字体） | ✅ 生效（加载压缩后的字体子集）   |
| console.log  | ✅ 保留                         | ❌ 自动移除                       |
| 图片优化     | ❌ 不压缩                       | ✅ AVIF/WebP 转换和压缩           |
| 热更新       | ✅ 毫秒级                       | ❌ 静态文件，需重新构建           |
| 草稿文章     | ✅ 可见                         | ❌ 隐藏（`draft: true` 的文章） |
| 加载速度     | 正常                            | 极快（静态 HTML）                 |

### 17.6 实用调试技巧

**① 手机端预览**

```
pnpm dev
# 浏览器 F12 → 点击"手机/平板"图标（Ctrl+Shift+M）
# 选择 iPhone 14 / iPad 等设备模拟
# 检查响应式布局、汉堡菜单、移动端壁纸
```

**② 多页面同时开**

```
pnpm dev 启动后，可以在多个浏览器标签页分别打开：
  http://localhost:3000/              （首页）
  http://localhost:3000/posts/        （传统路径文章）
  http://localhost:3000/anime/        （番剧页）
  http://localhost:3000/about/        （关于页）
  http://localhost:3000/archive/      （归档页）
```

**③ 查看编译数据**

```bash
# 开发时终端会输出类似：
#   [remark-content] 字数: 1284, 阅读时间: 3分钟
#   astro dev started in 1.2s
```

**④ 遇到缓存问题**

```bash
# 停止服务器 (Ctrl+C)，清除 Astro 缓存后重启
rm -rf node_modules/.astro
pnpm dev
```

### 17.7 完整开发工作流

```
┌────────────────────────────────────────────────────┐
│              1. 修改配置 / 内容 / 图片               │
│          src/config/  +  src/data/  +  public/     │
└────────────────┬───────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────┐
│              2. pnpm dev 实时预览                   │
│        http://localhost:3000 → 边改边看             │
└────────────────┬───────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────┐
│              3. pnpm check 类型检查                 │
│        确保没有 TypeScript / Astro 编译错误         │
└────────────────┬───────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────┐
│           4. pnpm build 生产构建验证                │
│        确认 dist/ 目录生成正常，无报错              │
└────────────────┬───────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────┐
│           5. pnpm preview 最终效果确认              │
│   http://localhost:4321 → 模拟上线环境逐页检查       │
└────────────────┬───────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────┐
│              6. git commit && git push              │
│            推送 → 自动部署 → 30秒后上线             │
└────────────────────────────────────────────────────┘
```

---

## 十八、部署指南

> 将你的个人博客从本地代码变成全世界可以访问的网站。

### 18.1 准备工作

以下两项是你部署前真正需要做的：

**① 确认个性化内容已配置好**

头像、昵称、壁纸、番剧数据等参照第十五章全部改完。

**② 本地构建验证**

```bash
pnpm build   # 确认无报错，dist/ 目录生成正常
```

---

**关于 siteURL — 部署后再填即可**

`src/config/siteConfig.ts` 第 9 行的 `siteURL` 用于生成站点地图（sitemap）、RSS 订阅、OG 社交分享卡片等 SEO 相关功能。它不是博客"能不能跑"的前提——不填或填错**不影响博客显示**。

部署完成、拿到真实域名后，再回来改即可：

```typescript
// Vercel 部署后 → 填 Vercel 给的地址
siteURL: "https://myblog.vercel.app/",

// GitHub Pages 部署后 → 填 Pages 地址
siteURL: "https://用户名.github.io/仓库名/",

// 绑定了自己的域名后 → 填自定义域名
siteURL: "https://你的域名.com/",
```

> ⚠️ URL 末尾的 `/` 不能省略。

---

### 18.2 方案一：Vercel 部署（⭐ 强烈推荐）

**最简单、最稳定、完全免费**，国内访问速度也不错。

#### Step 1：将代码推送到 GitHub

```bash
cd d:/二次元/动漫博客/Mizuki-master

# 初始化 Git 仓库
git init
git add .
git commit -m "🎉 初始化我的个人博客"

# 关联远程仓库（先在 GitHub 网页上创建一个空仓库）
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

> ⚠️ 在 GitHub 创建仓库时**不要勾选** "Add a README file"，否则会冲突。

#### Step 2：Vercel 一键导入

1. 打开 [vercel.com](https://vercel.com)，用 **GitHub 账号**直接登录
2. 点击右上角 **"Add New..."** → **"Project"**
3. 从列表中选择你刚推送的仓库 → 点 **"Import"**
4. 配置页面**一个字都不用改**（Vercel 会自动识别 Astro 项目）：
   - Framework Preset: `Astro`（自动识别）
   - Build Command: `pnpm build`
   - Output Directory: `dist`
   - Install Command: `pnpm install`
5. 点击 **"Deploy"** → 等待约 30 秒
6. 🎉 部署完成！你会看到一个 `https://你的项目名.vercel.app` 地址

#### Step 3：绑定自定义域名（可选）

1. Vercel 项目 → **Settings** → **Domains**
2. 输入你的域名（如 `blog.example.com`）→ 点 **"Add"**
3. 按 Vercel 提示去你的域名服务商（阿里云/腾讯云/Cloudflare）添加 DNS 记录：
   - 类型：`CNAME`
   - 主机记录：`blog`
   - 记录值：`cname.vercel-dns.com`
4. DNS 生效后（1-10 分钟），回到 `src/config/siteConfig.ts` 改成 `https://blog.example.com/`，重新 push 即可。

#### Vercel 优点总结

- ✅ 零配置，自动识别 Astro 项目
- ✅ `git push` 即自动部署，无需手动操作
- ✅ 每次部署保留历史版本，支持一键回滚
- ✅ 自带 HTTPS，免费 SSL 证书
- ✅ 全球 CDN 加速
- ✅ 每天 100GB 流量（个人博客够用）

---

### 18.3 方案二：GitHub Pages 部署

项目自带 GitHub Actions 工作流，推送到 `main` 分支自动触发部署。

#### Step 1：推送代码到 GitHub（同上）

#### Step 2：启用 GitHub Pages

1. GitHub 仓库 → **Settings** → **Pages**（左侧菜单）
2. **Source** 选择 **"Deploy from a branch"**
3. **Branch** 选 **`pages`**，目录选 **`/ (root)`**
4. 点 **"Save"**

#### Step 3：触发首次部署

```bash
# 你的任何一次 push 都会触发自动部署
git push origin main
```

在仓库 **Actions** 标签页观察 `Deploy to Pages Branch` 工作流运行，成功后：

> 访问地址：`https://你的用户名.github.io/你的仓库名/`

#### Step 4：自定义域名（可选）

1. Settings → Pages → **Custom domain** 输入你的域名
2. 去域名服务商添加 DNS 记录：
   - 类型：`CNAME`
   - 主机记录：`@`（或 `blog`）
   - 记录值：`你的用户名.github.io`
3. 勾选 **"Enforce HTTPS"**

#### 工作流说明

`.github/workflows/deploy.yml` 会执行：

1. 拉取代码 → 安装 pnpm → 安装依赖
2. `pnpm build`（包含番剧数据更新 + Astro 构建 + Pagefind 搜索索引 + 字体压缩）
3. 将 `dist/` 推送到 `pages` 分支
4. GitHub Pages 自动从 `pages` 分支部署

---

### 18.4 方案三：Netlify / Cloudflare Pages

原理与 Vercel 一致，操作几乎相同：

|                            | Netlify                         | Cloudflare Pages                                |
| -------------------------- | ------------------------------- | ----------------------------------------------- |
| **入口**             | [netlify.com](https://netlify.com) | [dash.cloudflare.com](https://dash.cloudflare.com) |
| **导入方式**         | Import from Git → 选仓库       | Workers & Pages → Pages → Connect Git         |
| **Build Command**    | `pnpm build`                  | `pnpm build`                                  |
| **Output Directory** | `dist`                        | `dist`                                        |
| **特殊注意**         | —                              | 不支持 Git Submodule                            |

---

### 18.5 日后更新流程

部署完成后，日常发布新文章只需三步：

```bash
# 1. 编辑内容（改文章、配置、图片等）
# 2. 本地预览确认
pnpm dev

# 3. 提交并推送 → 自动部署
git add .
git commit -m "发布新文章：XXX"
git push
```

去 Vercel / GitHub Actions 看一眼部署状态，30-60 秒后刷新你的博客即可看到更新。

---

### 18.6 常见问题排查

| 问题                           | 原因                                 | 解决                                                  |
| ------------------------------ | ------------------------------------ | ----------------------------------------------------- |
| 部署后图片 404                 | 图片路径不对，或未 push 到仓库       | 确保路径以`/` 开头，图片已提交到 Git                |
| 首页正常，文章页 404           | GitHub Pages 不支持 SPA fallback     | 项目已配置`trailingSlash: "always"` 解决此问题      |
| 主题色/头像改了没生效          | 浏览器缓存                           | `Ctrl+Shift+R` 强制刷新，或等几分钟 CDN 缓存过期    |
| Vercel 部署失败                | 构建报错                             | 本地先跑`pnpm build` 排查问题                       |
| GitHub Pages 白屏              | `siteURL` 路径不匹配               | 检查`siteURL` 是否与 Pages 的实际路径一致           |
| Node.js 版本不兼容             | 平台默认 Node 版本太低               | 本项目要求 Node ≥22，Vercel 会自动识别`.npmrc`     |
| `content/` 被 gitignore 忽略 | `.gitignore` 里有 `/content/` 行 | 正常现象，本地内容在`src/content/` 下，不受影响     |
| 构建超时                       | 番剧/字体处理耗时                    | Vercel 超时 45 分钟足够，GitHub Actions 默认 360 分钟 |

---

### 18.7 部署平台对比

| 特性       | Vercel ⭐ | GitHub Pages | Netlify   | Cloudflare Pages |
| ---------- | --------- | ------------ | --------- | ---------------- |
| 上手难度   | 极低      | 低           | 低        | 中               |
| 免费额度   | 100GB/月  | 100GB/月     | 100GB/月  | 无限*            |
| 自动部署   | ✅        | ✅           | ✅        | ✅               |
| HTTPS      | 自动      | 自动         | 自动      | 自动             |
| 国内速度   | ⭐⭐⭐⭐  | ⭐⭐         | ⭐⭐      | ⭐⭐⭐           |
| 自定义域名 | ✅        | ✅           | ✅        | ✅               |
| 环境变量   | ✅ Web UI | ✅ Secrets   | ✅ Web UI | ✅ Web UI        |
| 一键回滚   | ✅        | ❌           | ✅        | ✅               |

> 结论：**个人博客首推 Vercel**。如果已有 Cloudflare 域名，CF Pages 也是很好的选择。

---

### 18.8 完整部署流程图

```
┌──────────────────────────────────────────────────────┐
│                 1. 本地个性化配置                      │
│  src/config/*.ts  +  src/data/*.ts  +  图片替换       │
└──────────────────────┬───────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────┐
│                 2. 推送到 GitHub                      │
│     git init → add → commit → push                   │
└──────────────────────┬───────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────┐
│              3. 选择部署平台并导入                     │
│  Vercel / GitHub Pages / Netlify / Cloudflare Pages   │
└──────────────────────┬───────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────┐
│              4. 访问博客，验证效果                     │
│     修改 siteURL → 绑定自定义域名（可选）              │
└──────────────────────┬───────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────┐
│              5. 日常维护：写文章 → git push            │
│       自动部署，30 秒后全世界可见                      │
└──────────────────────────────────────────────────────┘
```
