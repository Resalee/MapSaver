# MapSaver 🌍

**English** | [简体中文](./README_zh.md)

MapSaver is a lightweight, backend-free tool for interactive map visualization and high-resolution exporting. It features built-in Chinese administrative region data with interactive drill-down capabilities from the national level down to cities. Beyond the presets, it allows you to render custom maps via GeoJSON file uploads or raw text, enabling real-time adjustments to colors, labels, and borders for high-resolution (PNG/SVG) exports with a single click.

## Features ✨

- **Built-in Quick Maps**: Includes comprehensive national and provincial map data with support for interactive drill-downs and smooth breadcrumb navigation, simply click on blank areas to quickly navigate back to the previous administrative level. You can also zoom in/out/reset the map.
- **Custom GeoJSON Support**: Effortlessly render maps by uploading local GeoJSON files or pasting raw data code, breaking free from external source limitations.
- **Advanced Customization**: Fully personalize your maps by configuring backgrounds, area colors, border styles, and text labels (including visibility, color, and font size).
- **High-Fidelity Export**: Generate ultra-clear PNG images (up to 4x resolution) or crisp, resolution-independent SVG vector files.
- **Offline Capability**: PWA-ready, allowing the app to run offline and be installed as a standalone application on your device.

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

1. **Select Map Source**: Use the "Data Source" panel on the left to select a built-in province/city, or switch to the "Upload/Paste JSON" tab to import your local map files.
2. **Interactive Drill-down**: Click on any region within the map to drill down into sub-districts. Use the breadcrumb navigation at the top to easily jump back to higher administrative levels.
3. **Custom Styling**: Utilize the "Style Settings" panel to customize map backgrounds, area colors, border thickness, and label typography in real-time.
4. **Export Your Map**: Choose your preferred quality (up to 4x) and format (PNG or SVG) in the "Export Settings" panel, then click the "Export Map" button to save your map.

## License 📝

This project is [MIT](LICENSE) licensed.
