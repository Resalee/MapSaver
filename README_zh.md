# MapSaver 🌍 (中文介绍)

[English](./README.md) | **简体中文**

一个简单、快速、现代化的 Web 应用程序，可基于 GeoJSON 数据在线生成并渲染高质量专属 Echarts 地图。

## 功能特性 ✨

- **内置快捷地图** - 一键切换中国省市级联地图（全国、湖南、浙江、广东等）。
- **自定义 GeoJSON 源** - 支持通过有效的 GeoJSON URL (如 DataV 的数据链接) 加载任何地图。
- **纯文本解析** - 支持直接复制粘贴 GeoJSON 原始数据进行可视化渲染。
- **外观高度定制** - 自由配置地图背景、区块颜色、边框颜色及边框宽度。
- **直观标签控制** - 支持显示/隐藏地图地名标签，调整标签配色与大小。
- **支持下钻联动 (Drill-down)** - 在大地图上点击任意省份，即可平滑切换至该省份对应的地级市地图。
- **高阶导出能力** - 高频支持导出高达 4x 的超清 PNG 高清长图，或者无限放大不失真的纯 SVG 矢量图产物。
- **PWA 离线支持** - 即使断开网络，已访问过的应用依然可离线使用或作为独立应用安装。

## 技术栈 🛠️

- **Vite** - 极速的下一代前端构建工具
- **Echarts 5** - 强大的开源可视化图表库
- **Coloris** - 优雅轻量化的取色器组件
- **原生 JS/CSS** - 纯纯的 Vanilla Web Tech，无沉重框架负担，极速轻简。

## 快速运行 🚀

### 环境要求

请确保你的电脑上已经安装了 [Node.js](https://nodejs.org/) 环境。

### 初始化安装

1. 克隆代码库
   ```bash
   git clone https://github.com/yourusername/MapSaver.git
   ```
2. 进入工程目录
   ```bash
   cd MapSaver
   ```
3. 安装关联依赖
   ```bash
   npm install
   ```

### 本地开发

运行以下命令唤起本地调试服务器：

```bash
npm run dev
```

并在浏览器中打开 [http://localhost:5173](http://localhost:5173)。

### 生产环境构建

执行编译打包命令：

```bash
npm run build
```

最后的成品将被输出至 `dist` 目录下。

### 部署到 Vercel 🚀

由于本项目是由 Vite 构建的纯静态前端网页，部署至 [Vercel](https://vercel.com) 只需要零配置且完全免费，是用于个人展示或博客案例的最佳去处。

1. 确保将完整代码 push (推送) 到你的个人 GitHub 仓库。
2. 登录 [Vercel](https://vercel.com)，点击 **Add New Project**。
3. 从对应列表中 Import (导入) 该 GitHub 项目。
4. Vercel 会智能识别出 Vite 框架。所有默认构建命令 `npm run build` 均可保持不变。
5. 点击 **Deploy**，不到 1 分钟，你的专属 MapSaver 就上线啦！

## 开源协议 📝

本开源项目遵循 [MIT 协议](LICENSE)。
