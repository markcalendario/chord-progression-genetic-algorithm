import CanvasJSReact from "@canvasjs/react-charts";
import React, { useEffect } from "react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function LineChart({ title, XAxisTitle, YAxisTitle, dataPoints }) {
  useEffect(() => {
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);

  const options = {
    animationEnabled: true,
    backgroundColor: "#0f172a",
    theme: "dark1",
    title: {
      text: title
    },
    axisY: {
      title: YAxisTitle,
      includeZero: true
    },
    axisX: {
      title: XAxisTitle,
      includeZero: true
    },
    data: [
      {
        type: "line",
        dataPoints: dataPoints
      }
    ]
  };

  let chart = null;

  return <CanvasJSChart options={options} onRef={(ref) => (chart = ref)} />;
}

export default LineChart;
