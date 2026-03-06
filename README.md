# MapSaver 🌍

A simple, fast, and modern web application to generate and download customized Echarts maps from GeoJSON data.

## Features ✨

- **Custom GeoJSON** - Load any valid GeoJSON map data via URL (e.g., from DataV).
- **Preset Maps** - Built-in quick access to common maps (China, Hunan, Zhejiang, Guangdong).
- **Style Customization** - Fully customize area colors, border colors, and border widths.
- **Label Controls** - Toggle map text labels, adjust font sizes, and label colors.
- **Background Options** - Choose between a transparent background or any custom color.
- **Export** - Easily download the customized map as an image.
- **Modern UI** - Clean, responsive, and easy-to-use interface.

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

1. Open the application in your browser.
2. Select a preset map or paste a valid GeoJSON URL.
3. Use the left sidebar controls to tweak colors, borders, and labels.
4. Click the "Save as Image" icon inside the Echarts toolbox (top-left of the map) to download your customized map.

## Contributing 🤝

Contributions, issues, and feature requests are welcome!
Feel free to check out the [issues page](https://github.com/yourusername/MapSaver/issues). Also, review our [Contributing Guidelines](CONTRIBUTING.md).

## License 📝

This project is [MIT](LICENSE) licensed.
