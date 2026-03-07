import * as echarts from "echarts";
import Coloris from "@melloware/coloris";
import "@melloware/coloris/dist/coloris.css";
import "./style.css";

// -----------------------------------------------------------------------------
// Constants and Data
// -----------------------------------------------------------------------------
const PROVINCES = [
  { name: "中国", adcode: "100000" },
  { name: "北京市", adcode: "110000" },
  { name: "天津市", adcode: "120000" },
  { name: "河北省", adcode: "130000" },
  { name: "山西省", adcode: "140000" },
  { name: "内蒙古自治区", adcode: "150000" },
  { name: "辽宁省", adcode: "210000" },
  { name: "吉林省", adcode: "220000" },
  { name: "黑龙江省", adcode: "230000" },
  { name: "上海市", adcode: "310000" },
  { name: "江苏省", adcode: "320000" },
  { name: "浙江省", adcode: "330000" },
  { name: "安徽省", adcode: "340000" },
  { name: "福建省", adcode: "350000" },
  { name: "江西省", adcode: "360000" },
  { name: "山东省", adcode: "370000" },
  { name: "河南省", adcode: "410000" },
  { name: "湖北省", adcode: "420000" },
  { name: "湖南省", adcode: "430000" },
  { name: "广东省", adcode: "440000" },
  { name: "广西壮族自治区", adcode: "450000" },
  { name: "海南省", adcode: "460000" },
  { name: "重庆市", adcode: "500000" },
  { name: "四川省", adcode: "510000" },
  { name: "贵州省", adcode: "520000" },
  { name: "云南省", adcode: "530000" },
  { name: "西藏自治区", adcode: "540000" },
  { name: "陕西省", adcode: "610000" },
  { name: "甘肃省", adcode: "620000" },
  { name: "青海省", adcode: "630000" },
  { name: "宁夏回族自治区", adcode: "640000" },
  { name: "新疆维吾尔自治区", adcode: "650000" },
  { name: "台湾省", adcode: "710000" },
  { name: "香港特别行政区", adcode: "810000" },
  { name: "澳门特别行政区", adcode: "820000" },
];

// -----------------------------------------------------------------------------
// DOM Elements
// -----------------------------------------------------------------------------
const chartDom = document.getElementById("mapChart");
const loadingDom = document.getElementById("loading");
let myChart = null;

// Tab controls
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

// Built-in map controls
const provinceSelect = document.getElementById("provinceSelect");
const cityGroup = document.getElementById("cityGroup");
const citySelect = document.getElementById("citySelect");
const loadBuiltinBtn = document.getElementById("loadBuiltinBtn");

// URL controls
const geoJsonUrlInput = document.getElementById("geoJsonUrl");
const loadMapUrlBtn = document.getElementById("loadMapUrlBtn");

// JSON Text controls
const geoJsonText = document.getElementById("geoJsonText");
const loadMapJsonBtn = document.getElementById("loadMapJsonBtn");

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

// Export Controls
const exportRatioSelect = document.getElementById("exportRatio");
const exportFormatSelect = document.getElementById("exportFormat");
const exportMapBtn = document.getElementById("exportMapBtn");

// Color Swatch definitions
const colorSwatches = [
  {
    inputId: "backgroundColor",
    swatchId: "backgroundColor-swatch",
    previewId: "backgroundColor-preview",
  },
  {
    inputId: "areaColor",
    swatchId: "areaColor-swatch",
    previewId: "areaColor-preview",
  },
  {
    inputId: "borderColor",
    swatchId: "borderColor-swatch",
    previewId: "borderColor-preview",
  },
  {
    inputId: "labelColor",
    swatchId: "labelColor-swatch",
    previewId: "labelColor-preview",
  },
];

let currentMapName = "customMap";

// -----------------------------------------------------------------------------
// Core Functions
// -----------------------------------------------------------------------------

const initProvinceDropdown = () => {
  provinceSelect.innerHTML = "";
  PROVINCES.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.adcode;
    opt.textContent = p.name;
    // Default to China national map
    if (p.adcode === "100000") opt.selected = true;
    provinceSelect.appendChild(opt);
  });
};

const getAliyunGeoJsonUrl = (adcode) => {
  return `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`;
};

const setLoading = (isLoading, message = "加载地图数据中...") => {
  if (isLoading) {
    loadingDom.style.display = "flex";
    const span = loadingDom.querySelector("span");
    if (span) span.innerText = message;
    const spinner = loadingDom.querySelector(".spinner");
    if (spinner) spinner.style.display = "block";
  } else {
    loadingDom.style.display = "none";
  }
};

const handleLoadError = (errorMsg) => {
  const span = loadingDom.querySelector("span");
  if (span) span.innerText = `加载失败: ${errorMsg}`;
  const spinner = loadingDom.querySelector(".spinner");
  if (spinner) spinner.style.display = "none";
};

// Main entry point for rendering
const renderGeoJson = (geoJson, mapName) => {
  if (myChart) {
    myChart.dispose();
    myChart = null;
  }

  echarts.registerMap(mapName, geoJson);
  setLoading(false);
  initializeChart(mapName);
};

// Fetch and render map from URL
const loadMapFromUrl = async (url, isDropdownCheck = false) => {
  if (!url) return;
  setLoading(true);

  currentMapName = `map_${url.replace(/[^a-zA-Z0-9]/g, "")}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    const geoJson = await response.json();

    // Check if this is a province load, to populate cities
    if (
      url.includes("datav.aliyun.com") &&
      url.includes("_full.json") &&
      isDropdownCheck
    ) {
      populateCityDropdown(geoJson);
    }

    renderGeoJson(geoJson, currentMapName);
  } catch (error) {
    console.error("Error loading map:", error);
    handleLoadError(error.message);
  }
};

// Populate the secondary city dropdown from the province GeoJSON features
const populateCityDropdown = (geoJson) => {
  citySelect.innerHTML = '<option value="all">-- 全省 --</option>';

  // Municipalities (directly-administered cities) have districts, not city-level areas
  // They should NOT show city dropdown as their sub-features are county/district level
  const MUNICIPALITIES = ["100000", "110000", "120000", "310000", "500000"];
  if (MUNICIPALITIES.includes(provinceSelect.value)) {
    cityGroup.style.display = "none";
    return;
  }

  if (geoJson && geoJson.features && geoJson.features.length > 0) {
    const hasSubRegions = geoJson.features.some(
      (f) => f.properties && f.properties.adcode,
    );
    if (hasSubRegions) {
      cityGroup.style.display = "flex";
      geoJson.features.forEach((feature) => {
        const props = feature.properties;
        if (props && props.name && props.adcode) {
          const opt = document.createElement("option");
          opt.value = props.adcode;
          opt.textContent = props.name;
          citySelect.appendChild(opt);
        }
      });
    } else {
      cityGroup.style.display = "none";
    }
  } else {
    cityGroup.style.display = "none";
  }
};

// Direct JSON loading
const loadMapFromJsonString = (jsonString) => {
  if (!jsonString.trim()) {
    alert("请粘贴 GeoJSON 文本！");
    return;
  }
  setLoading(true, "解析地图数据...");

  try {
    const geoJson = JSON.parse(jsonString);
    currentMapName = `custom_json_${Date.now()}`;
    renderGeoJson(geoJson, currentMapName);
  } catch (e) {
    console.error("JSON parse error", e);
    handleLoadError("无效的 JSON 格式 (请检查是否包含语法错误)");
  }
};

const initializeChart = (mapName) => {
  if (!echarts.getMap(mapName)) return;

  myChart = echarts.init(chartDom, null, { renderer: "canvas" });

  // Map Drill-down click handler
  myChart.on("click", (params) => {
    if (!params.name) return;

    // 1. Check if clicked region is a Province (drilling down from National)
    const clickedProvince = PROVINCES.find(
      (p) => p.name.includes(params.name) || params.name.includes(p.name),
    );
    if (clickedProvince && provinceSelect.value !== clickedProvince.adcode) {
      provinceSelect.value = clickedProvince.adcode;
      provinceSelect.dispatchEvent(new Event("change"));
      return;
    }

    // 2. Check if clicked region is a City (drilling down from Province)
    if (cityGroup.style.display !== "none") {
      let matchedCityAdcode = null;
      for (const opt of citySelect.options) {
        if (
          opt.value !== "all" &&
          (opt.text.includes(params.name) || params.name.includes(opt.text))
        ) {
          matchedCityAdcode = opt.value;
          break;
        }
      }
      if (matchedCityAdcode && citySelect.value !== matchedCityAdcode) {
        citySelect.value = matchedCityAdcode;
        loadBuiltinBtn.click(); // Trigger the map load for the city
      }
    }
  });

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
          areaColor: "#BFDBFE", // modern light blue hover color
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

  // Styles
  const newBorderWidth = parseFloat(borderWidthInput.value);
  const newFontSize = parseFloat(labelFontSizeInput.value);

  if (currentOption.geo && currentOption.geo[0]) {
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
      areaColor: "#BFDBFE",
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
  // Tab Switching
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Remove active classes
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));
      // Add active class
      const targetId = e.target.getAttribute("data-target");
      e.target.classList.add("active");
      document.getElementById(targetId).classList.add("active");
    });
  });

  // Province change - automatically load province map to get cities
  provinceSelect.addEventListener("change", () => {
    const adcode = provinceSelect.value;
    cityGroup.style.display = "none"; // Hide city until loaded
    loadMapFromUrl(getAliyunGeoJsonUrl(adcode), true);
  });

  // Load Built-in Button
  loadBuiltinBtn.addEventListener("click", () => {
    const pCode = provinceSelect.value;
    const cCode = citySelect.value;

    if (cCode === "all" || cityGroup.style.display === "none") {
      // Load Province
      loadMapFromUrl(getAliyunGeoJsonUrl(pCode), true);
    } else {
      // Load Specific City
      loadMapFromUrl(getAliyunGeoJsonUrl(cCode), false);
    }
  });

  // Load Custom URL Button
  if (loadMapUrlBtn) {
    loadMapUrlBtn.addEventListener("click", () => {
      const url = geoJsonUrlInput.value.trim();
      if (url) {
        loadMapFromUrl(url, false);
      } else {
        alert("请输入有效的 GeoJSON URL");
      }
    });
  }

  // Load JSON String Button
  if (loadMapJsonBtn) {
    loadMapJsonBtn.addEventListener("click", () => {
      loadMapFromJsonString(geoJsonText.value);
    });
  }

  // Advanced Export
  if (exportMapBtn) {
    exportMapBtn.addEventListener("click", () => {
      if (!myChart) return;
      const format = exportFormatSelect.value;
      const ratio = parseInt(exportRatioSelect.value, 10);
      const bg = transparentBackgroundInput.checked
        ? "transparent"
        : backgroundColorInput.value;

      const currentOption = myChart.getOption();
      const exportOption = JSON.parse(JSON.stringify(currentOption));
      if (exportOption.toolbox) exportOption.toolbox[0].show = false;

      let filename = `${currentMapName}_export`;

      if (format === "png") {
        // Temporarily hide toolbox from export image
        myChart.setOption({ toolbox: { show: false } });
        const downloadUrl = myChart.getDataURL({
          type: "png",
          pixelRatio: ratio,
          backgroundColor: bg,
        });
        myChart.setOption({ toolbox: { show: true } });

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = filename + ".png";
        link.click();
      } else if (format === "svg") {
        // Create an offline SVG chart instance
        const tempDiv = document.createElement("div");
        tempDiv.style.width = chartDom.clientWidth + "px";
        tempDiv.style.height = chartDom.clientHeight + "px";
        const svgChart = echarts.init(tempDiv, null, { renderer: "svg" });
        exportOption.backgroundColor = bg;
        svgChart.setOption(exportOption);

        const svgString = svgChart.renderToSVGString();
        svgChart.dispose();

        const blob = new Blob([svgString], {
          type: "image/svg+xml;charset=utf-8",
        });
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = filename + ".svg";
        link.click();
        URL.revokeObjectURL(downloadUrl);
      }
    });
  }

  // Color Swatch - Open Coloris on click + update preview on change
  colorSwatches.forEach(({ inputId, swatchId, previewId }) => {
    const input = document.getElementById(inputId);
    const swatch = document.getElementById(swatchId);
    const preview = document.getElementById(previewId);
    if (!input || !swatch || !preview) return;

    // Clicking swatch opens color picker
    swatch.addEventListener("click", () => {
      input.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // When Coloris updates the value, update the preview and chart
    input.addEventListener("change", () => {
      preview.style.background = input.value;
      updateChart();
    });
    input.addEventListener("input", () => {
      preview.style.background = input.value;
    });
  });

  // Style Toggles & Inputs
  transparentBackgroundInput.addEventListener("change", () => {
    updateBackgroundColorControlsState();
    updateChart();
  });

  const inputs = [borderWidthInput, showLabelInput, labelFontSizeInput];

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
initProvinceDropdown();
updateDisplays();

// Initial Load (China)
loadMapFromUrl(getAliyunGeoJsonUrl("100000"), true);

Coloris.init();
Coloris({
  el: "[data-coloris]",
  theme: "polaroid",
  alpha: true,
  format: "mixed",
  wrap: false,
});

bindGlobalEventListeners();
