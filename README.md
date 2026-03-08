# MapSaver 🌍

**English** | [简体中文](./README_zh.md)

MapSaver is a lightweight, backend-free tool for interactive map visualization and high-resolution exporting. It supports interactive drill-down for Chinese administrative regions, custom GeoJSON rendering, real-time styling, and one-click export to high-quality PNG or SVG files.

## Features ✨

- **Preset Maps** - Built-in quick access to common maps (China, Hunan, Zhejiang, Guangdong).
- **Custom GeoJSON** - Load any valid GeoJSON map data via URL (e.g., from DataV) or raw data.
- **Style Customization** - Fully customize area colors, border colors, and border widths.
- **Label Controls** - Toggle map text labels, adjust font sizes, and label colors.
- **Background Options** - Choose between a transparent background or any custom color.
- **Advanced Export** - High-res PNG (up to 4x) and scalable, lossless SVG vector support.
- **PWA Ready** - Fully functional offline and installable as a standalone app.

## Tech Stack 🛠️

- **Vite** - Next Generation Frontend Tooling
- **Echarts** - Powerful charting library
- **Coloris** - Elegant color picker
- **Vanilla JS/CSS** - No heavy frameworks, just clean native web tech.

## Getting Started 🚀

### Prerequisites

You will need [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/MapSaver.git
   ```
2. Navigate into the project directory
   ```bash
   cd MapSaver
   ```
3. Install dependencies
   ```bash
   npm install
   ```

### Development

Run the local development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Building for Production

Build the application for deployment:

```bash
npm run build
```

The output will be generated in the `dist` directory.

## Usage 💡

1. **Select Map Source**: Use the "Data Source" panel on the left to select a built-in province/city, or import your custom data via a URL or raw GeoJSON.
2. **Interactive Drill-down**: Click on any region within the map to drill down into sub-districts. Use the breadcrumb navigation at the top to easily jump back to higher administrative levels.
3. **Custom Styling**: Utilize the "Style Settings" panel to customize map backgrounds, area colors, border thickness, and label typography in real-time.
4. **Export Your Map**: Choose your preferred quality (up to 4x) and format (PNG or SVG) in the "Export Settings" panel, then click the "Export Map" button to save your map.

## License 📝

This project is [MIT](LICENSE) licensed.
