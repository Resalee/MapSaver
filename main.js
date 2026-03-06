import * as echarts from "echarts";
import Coloris from "@melloware/coloris";
import "@melloware/coloris/dist/coloris.css";
import "./style.css";

// -----------------------------------------------------------------------------
// DOM Elements
// -----------------------------------------------------------------------------
const chartDom = document.getElementById("mapChart");
const loadingDom = document.getElementById("loading");
let myChart = null;

// Map Data Controls
const presetMapSelect = document.getElementById("presetMap");
const customUrlGroup = document.getElementById("customUrlGroup");
const geoJsonUrlInput = document.getElementById("geoJsonUrl");
const loadMapBtn = document.getElementById("loadMapBtn");

// Style Controls
const transparentBackgroundInput = document.getElementById(
  "transparentBackground",
);
const backgroundColorInput = document.getElementById("backgroundColor");
const backgroundColorGroup = document.getElementById("backgroundColorGroup");

const areaColorInput = document.getElementById("areaColor");
const borderColorInput = document.getElementById("borderColor");
const borderWidthInput = document.getElementById("borderWidth");
const borderWidthVal = document.getElementById("borderWidthVal");

// Label Controls
const showLabelInput = document.getElementById("showLabel");
const labelColorInput = document.getElementById("labelColor");
const labelFontSizeInput = document.getElementById("labelFontSize");
const labelFontSizeVal = document.getElementById("labelFontSizeVal");

let currentMapName = "customMap";

// -----------------------------------------------------------------------------
// Core Functions
// -----------------------------------------------------------------------------

const loadMap = (url) => {
  if (!url) return;

  loadingDom.style.display = "flex";

  if (loadMapBtn) {
    loadMapBtn.disabled = true;
  }

  if (myChart) {
    myChart.dispose();
    myChart = null;
  }

  // Update map name based on URL to avoid caching issues with different maps
  currentMapName = `map_${url.replace(/[^a-zA-Z0-9]/g, "")}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load map data: ${response.statusText}`);
      }
      return response.json();
    })
    .then((geoJson) => {
      echarts.registerMap(currentMapName, geoJson);
      loadingDom.style.display = "none";
      if (loadMapBtn) loadMapBtn.disabled = false;
      initializeChart(currentMapName);
    })
    .catch((error) => {
      console.error("Error loading map:", error);
      const span = loadingDom.querySelector("span");
      if (span) span.innerText = `加载失败: ${error.message}`;
      const spinner = loadingDom.querySelector(".spinner");
      if (spinner) spinner.style.display = "none";
      if (loadMapBtn) loadMapBtn.disabled = false;
    });
};

const initializeChart = (mapName) => {
  if (!echarts.getMap(mapName)) return;

  myChart = echarts.init(chartDom, null, { renderer: "canvas" });

  const initialBackgroundColor = transparentBackgroundInput.checked
    ? "transparent"
    : backgroundColorInput.value;

  const option = {
    backgroundColor: initialBackgroundColor,
    tooltip: {
      trigger: "item",
      formatter: (params) => {
        return `${params.name}<br/>${params.value !== undefined ? params.value : ""}`;
      },
    },
    toolbox: {
      show: true,
      orient: "vertical",
      left: "left",
      top: "top",
      feature: {
        restore: {},
        saveAsImage: {
          pixelRatio: 2,
          backgroundColor: initialBackgroundColor,
        },
      },
    },
    geo: {
      map: mapName,
      roam: true,
      label: {
        show: showLabelInput.checked,
        color: labelColorInput.value,
        fontSize: parseFloat(labelFontSizeInput.value),
        formatter: "{a}",
      },
      itemStyle: {
        areaColor: areaColorInput.value,
        borderColor: borderColorInput.value,
        borderWidth: parseFloat(borderWidthInput.value),
      },
      emphasis: {
        itemStyle: {
          areaColor: "#64748b", // modern muted hover color
        },
        label: {
          show: true,
          color: labelColorInput.value,
          fontSize: parseFloat(labelFontSizeInput.value),
          formatter: "{a}",
        },
      },
    },
  };

  myChart.setOption(option);
  updateBackgroundColorControlsState();
};

const updateBackgroundColorControlsState = () => {
  if (transparentBackgroundInput.checked) {
    backgroundColorGroup.classList.add("disabled");
  } else {
    backgroundColorGroup.classList.remove("disabled");
  }
};

const updateDisplays = () => {
  if (borderWidthVal)
    borderWidthVal.textContent = `${borderWidthInput.value}px`;
  if (labelFontSizeVal)
    labelFontSizeVal.textContent = `${labelFontSizeInput.value}px`;
};

const updateChart = () => {
  if (!myChart) return;
  updateDisplays();

  const currentOption = myChart.getOption();

  // Background
  const newBackgroundColor = transparentBackgroundInput.checked
    ? "transparent"
    : backgroundColorInput.value;
  currentOption.backgroundColor = newBackgroundColor;
  if (currentOption.toolbox?.[0]?.feature?.saveAsImage) {
    currentOption.toolbox[0].feature.saveAsImage.backgroundColor =
      newBackgroundColor;
  }

  // Styles
  const newBorderWidth = parseFloat(borderWidthInput.value);
  const newFontSize = parseFloat(labelFontSizeInput.value);

  if (currentOption.geo?.[0]) {
    const geo = currentOption.geo[0];
    geo.itemStyle = {
      ...geo.itemStyle,
      areaColor: areaColorInput.value,
      borderColor: borderColorInput.value,
      borderWidth: newBorderWidth,
    };
    geo.label = {
      ...geo.label,
      show: showLabelInput.checked,
      color: labelColorInput.value,
      fontSize: newFontSize,
    };

    geo.emphasis = geo.emphasis || { itemStyle: {}, label: {} };
    geo.emphasis.itemStyle = {
      ...geo.emphasis.itemStyle,
      areaColor: "#64748b",
    };
    geo.emphasis.label = {
      ...geo.emphasis.label,
      show: true,
      color: labelColorInput.value,
      fontSize: newFontSize,
    };
  }

  myChart.setOption(currentOption, { notMerge: false });
};

// -----------------------------------------------------------------------------
// Event Listeners & Initialization
// -----------------------------------------------------------------------------

const bindGlobalEventListeners = () => {
  // Preset Map Selection
  if (presetMapSelect) {
    presetMapSelect.addEventListener("change", (e) => {
      if (e.target.value === "custom") {
        if (customUrlGroup) customUrlGroup.style.display = "block";
      } else {
        if (customUrlGroup) customUrlGroup.style.display = "none";
        loadMap(e.target.value);
      }
    });
  }

  // Custom Map Load
  if (loadMapBtn) {
    loadMapBtn.addEventListener("click", () => {
      const url = geoJsonUrlInput.value.trim();
      if (url) {
        loadMap(url);
      } else {
        alert("请输入有效的GeoJSON URL");
      }
    });
  }

  // Style Toggles & Inputs
  transparentBackgroundInput.addEventListener("change", () => {
    updateBackgroundColorControlsState();
    updateChart();
  });

  // Attach update event to all style inputs
  const inputs = [
    backgroundColorInput,
    areaColorInput,
    borderColorInput,
    borderWidthInput,
    showLabelInput,
    labelColorInput,
    labelFontSizeInput,
  ];

  inputs.forEach((input) => {
    if (input) {
      input.addEventListener("input", updateChart);
      input.addEventListener("change", updateChart);
    }
  });

  // Handle Resize
  window.addEventListener("resize", () => {
    myChart?.resize();
  });
};

// Initialize
updateDisplays();
const initialUrl =
  presetMapSelect && presetMapSelect.value !== "custom"
    ? presetMapSelect.value
    : geoJsonUrlInput
      ? geoJsonUrlInput.value
      : null;
if (initialUrl) loadMap(initialUrl);

Coloris.init();
Coloris({
  el: "[data-coloris]",
  theme: "polaroid",
  alpha: true,
  format: "mixed",
  wrap: false,
});

bindGlobalEventListeners();
